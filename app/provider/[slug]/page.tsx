import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
    getProviderBySlug,
    CPT_ENCYCLOPEDIA,
    PLANS,
    getNegotiatedRate,
    PROVIDERS
} from '@/data';
import { NegotiatedRate } from '@/types/us-tic';
import { ProviderHero } from '@/components/provider/ProviderHero';
import { ProcedurePricingTable } from '@/components/provider/ProcedurePricingTable';
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
    const provider = getProviderBySlug(resolvedParams.slug);

    if (!provider) return { title: 'Provider Not Found' };

    const title = `${provider.name} - Procedure Pricing | Asclepius`;
    const description = `View procedure costs at ${provider.name} in ${provider.address.city}, ${provider.address.state}. Compare prices across insurance plans with CMS quality ratings and transparent pricing.`;

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
            canonical: `/provider/${resolvedParams.slug}`,
        },
    };
}

export function generateStaticParams() {
    return PROVIDERS.map((provider) => ({
        slug: provider.slug,
    }));
}

// JSON-LD Structured Data
function ProviderSchema({ provider, procedures }: {
    provider: { name: string; npi: string; address: { street: string; city: string; state: string; zip: string }; metrics: { cmsStarRating: number | null } };
    procedures: { name: string; code: string }[];
}) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Hospital",
        "name": provider.name,
        "identifier": provider.npi,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": provider.address.street,
            "addressLocality": provider.address.city,
            "addressRegion": provider.address.state,
            "postalCode": provider.address.zip,
            "addressCountry": "US"
        },
        "aggregateRating": provider.metrics.cmsStarRating ? {
            "@type": "AggregateRating",
            "ratingValue": provider.metrics.cmsStarRating,
            "bestRating": 5,
            "worstRating": 1,
            "ratingCount": 1
        } : undefined,
        "availableService": procedures.map(p => ({
            "@type": "MedicalProcedure",
            "name": p.name,
            "code": {
                "@type": "MedicalCode",
                "codeValue": p.code,
                "codingSystem": "CPT"
            }
        }))
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

export default async function ProviderHubPage({ params }: Props) {
    const resolvedParams = await params;
    const provider = getProviderBySlug(resolvedParams.slug);

    if (!provider) return notFound();

    // Get all rates for procedures at this provider
    const proceduresWithPricing = CPT_ENCYCLOPEDIA.map(procedure => {
        const rates: NegotiatedRate[] = [];

        // Get rates across all plans
        PLANS.forEach(plan => {
            const rate = getNegotiatedRate(procedure.code, provider.npi, plan.slug);
            if (rate) rates.push(rate);
        });

        const prices = rates.map(r => r.negotiatedRate);

        return {
            procedure,
            rates,
            minPrice: prices.length > 0 ? Math.min(...prices) : 0,
            maxPrice: prices.length > 0 ? Math.max(...prices) : 0,
            avgPrice: prices.length > 0 ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : 0
        };
    }).filter(p => p.rates.length > 0);

    const breadcrumbItems = [
        { label: 'Providers', href: '/provider' },
        { label: provider.name }
    ];

    return (
        <>
            <ProviderSchema
                provider={provider}
                procedures={proceduresWithPricing.map(p => ({
                    name: p.procedure.name,
                    code: p.procedure.code
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
                        <ProviderHero provider={provider} />
                    </section>

                    {/* Procedure Pricing Table */}
                    <section className="mb-6">
                        <ProcedurePricingTable
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
