import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProviderWithCMSProcedures, getAllCMSProviders, ProviderWithCMSProcedures } from '@/data/cms/enriched';
import { ProviderHero } from '@/components/provider/ProviderHero';
import { EEATFooter } from '@/components/us/EEATSignals';
import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';
import { UsProvider } from '@/types/us-tic';
import { UhcNyProcedurePricingTable } from '@/components/uhc-ny/ProcedurePricingTable';

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const cmsData = getProviderWithCMSProcedures(resolvedParams.slug);

    if (!cmsData) return { title: 'Provider Not Found' };

    const { provider, procedures, overallStats } = cmsData;

    const title = `${provider.name} - UHC New York Pricing | Asclepius`;
    const description = `View ${overallStats.procedureCount} procedure costs at ${provider.name} in ${provider.address.city}, ${provider.address.state}. Average negotiated rate: $${overallStats.avgMedianPrice.toLocaleString()}.`;

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
            canonical: `/uhc-ny/provider/${resolvedParams.slug}`,
        },
    };
}

export function generateStaticParams() {
    return getAllCMSProviders().map((provider) => ({
        slug: provider.slug,
    }));
}

// JSON-LD Structured Data  
function ProviderSchema({ cmsData }: { cmsData: ProviderWithCMSProcedures }) {
    const { provider, npi, procedures, slug } = cmsData;

    const schema = {
        "@context": "https://schema.org",
        "@type": provider.providerType === 'organization' ? "Hospital" : "Physician",
        "name": provider.name,
        "identifier": npi,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": provider.address.line1,
            "addressLocality": provider.address.city,
            "addressRegion": provider.address.state,
            "postalCode": provider.address.zip,
            "addressCountry": "US"
        },
        "medicalSpecialty": provider.specialty || undefined,
        "availableService": procedures.slice(0, 10).map(p => ({
            "@type": "MedicalProcedure",
            "name": p.procedure.name,
            "url": `https://asclepius.us/uhc-ny/cost/${p.procedure.slug}/${slug}`
        }))
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

/**
 * Convert CMS provider to UsProvider format for ProviderHero component
 */
function cmsToUsProvider(cmsData: ProviderWithCMSProcedures): UsProvider {
    const { provider, npi, slug } = cmsData;

    return {
        npi,
        name: provider.name,
        slug,
        facilityType: provider.providerType === 'organization' ? 'Hospital' : 'Clinic',
        address: {
            street: provider.address.line1 || '',
            city: provider.address.city,
            state: provider.address.state,
            zip: provider.address.zip,
        },
        traumaLevel: 'Not Designated',
        bedCount: null,
        specializations: provider.specialty ? [provider.specialty] : [],
        certifications: [],
        metrics: {
            cmsStarRating: null,
            patientExperienceScore: null,
            hacScore: null,
            readmissionRate: null,
            metricsAsOf: '2026-01'
        },
        averageWaitDays: null
    };
}

export default async function UhcNyProviderSlugPage({ params }: Props) {
    const resolvedParams = await params;
    const cmsData = getProviderWithCMSProcedures(resolvedParams.slug);

    if (!cmsData) return notFound();

    const { provider, procedures } = cmsData;

    const usProvider = cmsToUsProvider(cmsData);

    const proceduresWithPricing = procedures.map(p => ({
        procedure: p.procedure,
        rates: [],
        minPrice: p.priceStats.min,
        maxPrice: p.priceStats.max,
        avgPrice: Math.round(p.priceStats.median)
    }));

    return (
        <>
            <ProviderSchema cmsData={cmsData} />

            <div className="min-h-screen pb-24" style={{ background: '#FAF9F6' }}>
                <AppHeader />

                <main className="max-w-5xl mx-auto px-5 py-6">
                    {/* Breadcrumb */}
                    <nav className="text-[12px] text-stone-500 mb-4">
                        <Link href="/uhc-ny" className="hover:text-stone-700">UHC New York</Link>
                        <span className="mx-2">›</span>
                        <Link href="/uhc-ny/provider" className="hover:text-stone-700">Providers</Link>
                        <span className="mx-2">›</span>
                        <span className="text-stone-700">{provider.name}</span>
                    </nav>

                    {/* Hero Section */}
                    <section className="mb-6">
                        <ProviderHero provider={usProvider} />
                    </section>

                    {/* Procedure Pricing Table */}
                    <section className="mb-6">
                        <UhcNyProcedurePricingTable
                            providerSlug={resolvedParams.slug}
                            procedures={proceduresWithPricing}
                        />
                    </section>

                    {/* E-E-A-T Footer */}
                    <section className="mb-6">
                        <EEATFooter providerName={provider.name} />
                    </section>
                </main>

                <AppFooter />
            </div>
        </>
    );
}
