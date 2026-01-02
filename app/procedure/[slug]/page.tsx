import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
    getCPTBySlug,
    PROVIDERS,
    getRatesForProcedureByPlan,
    PLANS,
    CPT_ENCYCLOPEDIA
} from '@/data';
import { NegotiatedRate } from '@/types/us-tic';
import { ProcedureHero, ProcedureDetails, ProcedureFAQs } from '@/components/procedure/ProcedureHero';
import { ProviderPricingTable } from '@/components/procedure/ProviderPricingTable';
import { HubBreadcrumb, BreadcrumbSchema } from '@/components/hub/HubBreadcrumb';
import { EEATFooter } from '@/components/us/EEATSignals';
import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const procedure = getCPTBySlug(resolvedParams.slug);

    if (!procedure) return { title: 'Procedure Not Found' };

    const title = `${procedure.name} Cost Comparison | Asclepius`;
    const description = `Compare ${procedure.name} (CPT ${procedure.code}) prices across ${PROVIDERS.length} hospitals. View negotiated rates, quality ratings, and find the best value for your procedure.`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'website',
            siteName: 'Asclepius',
        },
        twitter: {
            card: 'summary',
            title,
            description,
        },
        alternates: {
            canonical: `/procedure/${resolvedParams.slug}`,
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
    providers: { name: string; slug: string }[];
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
        "availableService": providers.map(p => ({
            "@type": "MedicalClinic",
            "name": p.name,
            "url": `https://asclepius.us/provider/${p.slug}`
        }))
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

export default async function ProcedureHubPage({ params }: Props) {
    const resolvedParams = await params;
    const procedure = getCPTBySlug(resolvedParams.slug);

    if (!procedure) return notFound();

    // Get all rates for this procedure across all plans
    const allRates: NegotiatedRate[] = [];
    PLANS.forEach(plan => {
        const rates = getRatesForProcedureByPlan(procedure.code, plan.slug);
        allRates.push(...rates);
    });

    // Group rates by provider
    const providersWithPricing = PROVIDERS.map(provider => {
        const providerRates = allRates.filter(r => r.providerNpi === provider.npi);
        const prices = providerRates.map(r => r.negotiatedRate);

        return {
            provider,
            rates: providerRates,
            minPrice: prices.length > 0 ? Math.min(...prices) : 0,
            maxPrice: prices.length > 0 ? Math.max(...prices) : 0,
            avgPrice: prices.length > 0 ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : 0
        };
    }).filter(p => p.rates.length > 0);

    const breadcrumbItems = [
        { label: 'Procedures', href: '/procedure' },
        { label: procedure.name }
    ];

    return (
        <>
            <ProcedureSchema
                procedure={procedure}
                providers={providersWithPricing.map(p => ({
                    name: p.provider.name,
                    slug: p.provider.slug
                }))}
            />
            <BreadcrumbSchema items={breadcrumbItems} />

            <div className="min-h-screen pb-24" style={{ background: '#FAF9F6' }}>
                <AppHeader />

                <main className="max-w-5xl mx-auto px-5 py-6">
                    {/* Breadcrumb */}
                    <HubBreadcrumb items={breadcrumbItems} />

                    {/* Hero Section */}
                    <section className="mb-6">
                        <ProcedureHero procedure={procedure} />
                    </section>

                    {/* Preparation & Risks */}
                    <section className="mb-6">
                        <ProcedureDetails procedure={procedure} />
                    </section>

                    {/* Provider Pricing Table */}
                    <section className="mb-6">
                        <ProviderPricingTable
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
