import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
    getCPTBySlug,
    CPT_ENCYCLOPEDIA
} from '@/data';
import { getProcedureWithCMSProviders, ProviderWithCMSPricing } from '@/data/cms/enriched';
import { ProcedureHero, ProcedureDetails, ProcedureFAQs } from '@/components/procedure/ProcedureHero';
import { EEATFooter } from '@/components/us/EEATSignals';
import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';
import { UhcNyProviderPricingTable } from '@/components/uhc-ny/ProviderPricingTable';

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const procedure = getCPTBySlug(resolvedParams.slug);

    if (!procedure) return { title: 'Procedure Not Found' };

    const cmsData = getProcedureWithCMSProviders(resolvedParams.slug);
    const providerCount = cmsData?.providers.length || 0;

    const title = `${procedure.name} Cost - UHC New York | Asclepius`;
    const description = `Compare ${procedure.name} (CPT ${procedure.code}) prices across ${providerCount} UHC New York providers. Real CMS negotiated rates from $${cmsData?.overallStats.min.toLocaleString() || 'N/A'} to $${cmsData?.overallStats.max.toLocaleString() || 'N/A'}.`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'website',
            siteName: 'Asclepius',
        },
        alternates: {
            canonical: `/uhc-ny/procedure/${resolvedParams.slug}`,
        },
    };
}

export function generateStaticParams() {
    return CPT_ENCYCLOPEDIA.map((procedure) => ({
        slug: procedure.slug,
    }));
}

// JSON-LD Structured Data
function ProcedureSchema({ procedure, providers }: {
    procedure: { name: string; code: string; description: string; slug: string };
    providers: ProviderWithCMSPricing[];
}) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "MedicalProcedure",
        "name": procedure.name,
        "description": procedure.description,
        "code": {
            "@type": "MedicalCode",
            "codeValue": procedure.code,
            "codingSystem": "CPT"
        },
        "availableService": providers.slice(0, 10).map(p => ({
            "@type": "MedicalClinic",
            "name": p.name,
            "url": `https://asclepius.us/uhc-ny/provider/${p.slug}`
        }))
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

export default async function UhcNyProcedureSlugPage({ params }: Props) {
    const resolvedParams = await params;
    const procedure = getCPTBySlug(resolvedParams.slug);

    if (!procedure) return notFound();

    const cmsData = getProcedureWithCMSProviders(resolvedParams.slug);

    // Convert CMS providers to format expected by table
    const providersWithPricing = cmsData?.providers.map(p => ({
        provider: {
            npi: p.npi,
            name: p.name,
            slug: p.slug,
            facilityType: p.providerType === 'organization' ? 'Hospital' as const : 'Clinic' as const,
            address: {
                street: p.address.line1 || '',
                city: p.address.city,
                state: p.address.state,
                zip: p.address.zip,
            },
            traumaLevel: 'Not Designated' as const,
            bedCount: null,
            specializations: p.specialty ? [p.specialty] : [],
            certifications: [],
            metrics: {
                cmsStarRating: null,
                patientExperienceScore: null,
                hacScore: null,
                readmissionRate: null,
                metricsAsOf: '2026-01'
            },
            averageWaitDays: null
        },
        rates: [],
        minPrice: p.priceStats.min,
        maxPrice: p.priceStats.max,
        avgPrice: Math.round(p.priceStats.median)
    })) || [];

    return (
        <>
            <ProcedureSchema
                procedure={procedure}
                providers={cmsData?.providers || []}
            />

            <div className="min-h-screen pb-24" style={{ background: '#FAF9F6' }}>
                <AppHeader />

                <main className="max-w-5xl mx-auto px-5 py-6">
                    {/* Breadcrumb */}
                    <nav className="text-[12px] text-stone-500 mb-4">
                        <Link href="/uhc-ny" className="hover:text-stone-700">UHC New York</Link>
                        <span className="mx-2">›</span>
                        <Link href="/uhc-ny/procedure" className="hover:text-stone-700">Procedures</Link>
                        <span className="mx-2">›</span>
                        <span className="text-stone-700">{procedure.name}</span>
                    </nav>

                    {/* Hero Section */}
                    <section className="mb-6">
                        <ProcedureHero procedure={procedure} />
                    </section>

                    {/* Preparation & Risks */}
                    <section className="mb-6">
                        <ProcedureDetails procedure={procedure} />
                    </section>

                    {/* Provider Pricing Table - UHC-NY specific */}
                    <section className="mb-6">
                        <UhcNyProviderPricingTable
                            procedureSlug={resolvedParams.slug}
                            providers={providersWithPricing}
                        />
                    </section>

                    {/* Procedure FAQs */}
                    <section className="mb-6">
                        <ProcedureFAQs procedure={procedure} />
                    </section>

                    {/* E-E-A-T Footer */}
                    <section className="mb-6">
                        <EEATFooter procedureName={procedure.name} />
                    </section>
                </main>

                <AppFooter />
            </div>
        </>
    );
}
