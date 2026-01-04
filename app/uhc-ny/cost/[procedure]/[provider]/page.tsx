import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCMSCostPageData } from '@/data/cms/enriched';
import CostPageContent from '@/components/us/CostPageContent';

interface Props {
    params: Promise<{
        procedure: string;
        provider: string;
    }>;
}

// Default plan for UHC-NY (used for data layer, not in URL)
const UHC_NY_DEFAULT_PLAN = 'uhc-choice-plus';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const { procedure: procedureSlug, provider: providerSlug } = resolvedParams;

    const cmsData = getCMSCostPageData(procedureSlug, providerSlug, UHC_NY_DEFAULT_PLAN);

    if (!cmsData) return { title: 'Cost Estimate Not Found' };

    const { procedure: proc, provider: prov, rate } = cmsData;

    const title = `${proc.name} at ${prov.name} - UHC NY Cost | Asclepius`;
    const description = `${proc.name} costs $${rate.negotiatedRate.toLocaleString()} at ${prov.name} with UHC New York. Calculate your out-of-pocket cost with real CMS pricing data.`;

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
            canonical: `/uhc-ny/cost/${procedureSlug}/${providerSlug}`,
        },
    };
}

// JSON-LD Structured Data Component
function StructuredData({ proc, prov, procedureSlug, providerSlug, rate }: {
    proc: { name: string; code: string };
    prov: { name: string; address: { city: string; state: string } };
    procedureSlug: string;
    providerSlug: string;
    rate: number;
}) {
    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "MedicalWebPage",
                "name": `${proc.name} Cost at ${prov.name}`,
                "description": `${proc.name} costs $${rate.toLocaleString()} at ${prov.name} with UHC New York.`,
                "about": {
                    "@type": "MedicalProcedure",
                    "name": proc.name,
                    "code": {
                        "@type": "MedicalCode",
                        "codeValue": proc.code,
                        "codingSystem": "CPT"
                    }
                },
                "mainEntity": {
                    "@type": "Hospital",
                    "name": prov.name,
                    "address": {
                        "@type": "PostalAddress",
                        "addressLocality": prov.address.city,
                        "addressRegion": prov.address.state
                    }
                }
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "UHC New York",
                        "item": "https://asclepius.us/uhc-ny"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": proc.name,
                        "item": `https://asclepius.us/uhc-ny/procedure/${procedureSlug}`
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": prov.name,
                        "item": `https://asclepius.us/uhc-ny/provider/${providerSlug}`
                    },
                    {
                        "@type": "ListItem",
                        "position": 4,
                        "name": "Cost Estimate",
                        "item": `https://asclepius.us/uhc-ny/cost/${procedureSlug}/${providerSlug}`
                    }
                ]
            }
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

export default async function UhcNyCostPage({ params }: Props) {
    const resolvedParams = await params;
    const { procedure: procedureSlug, provider: providerSlug } = resolvedParams;

    const cmsData = getCMSCostPageData(procedureSlug, providerSlug, UHC_NY_DEFAULT_PLAN);

    if (!cmsData) return notFound();

    const { procedure, provider, rate, priceContext } = cmsData;

    return (
        <>
            <StructuredData
                proc={procedure}
                prov={provider}
                procedureSlug={procedureSlug}
                providerSlug={providerSlug}
                rate={rate.negotiatedRate}
            />
            <CostPageContent
                procedure={procedure}
                provider={provider}
                planName="UHC Choice Plus"
                planSlug={UHC_NY_DEFAULT_PLAN}
                rate={rate.negotiatedRate}
                priceStats={rate.priceStats}
                priceContext={priceContext}
            />
        </>
    );
}
