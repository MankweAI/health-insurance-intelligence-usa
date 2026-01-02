import { Metadata } from 'next';
import { getProcedure, getProvider, getPlan, getRate } from '@/data';
import CostPageClient from '@/components/us/CostPageClient';

interface Props {
    params: Promise<{
        procedure: string;
        provider: string;
        plan: string;
    }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const { procedure: procedureSlug, provider: providerSlug, plan: planSlug } = resolvedParams;

    const proc = getProcedure(procedureSlug);
    const prov = getProvider(providerSlug);
    const plan = getPlan(planSlug);

    if (!proc || !prov || !plan) return { title: 'Cost Estimate Not Found' };

    const title = `${proc.name} Cost at ${prov.name} | Asclepius`;
    const description = `Calculate your out-of-pocket cost for ${proc.name} at ${prov.name} with ${plan.payerName} ${plan.planName}. Free cost estimator with transparent pricing data.`;

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
            canonical: `/cost/${procedureSlug}/${providerSlug}/${planSlug}`,
        },
    };
}

// JSON-LD Structured Data Component
function StructuredData({ proc, prov, plan, procedureSlug, providerSlug, planSlug }: {
    proc: { name: string; code: string };
    prov: { name: string; address: { city: string; state: string } };
    plan: { payerName: string; planName: string };
    procedureSlug: string;
    providerSlug: string;
    planSlug: string;
}) {
    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "MedicalWebPage",
                "name": `${proc.name} Cost at ${prov.name}`,
                "description": `Calculate your out-of-pocket cost for ${proc.name} at ${prov.name} with ${plan.payerName}.`,
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
                        "name": "Home",
                        "item": "https://asclepius.us"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Cost Estimator",
                        "item": "https://asclepius.us/cost"
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": proc.name,
                        "item": `https://asclepius.us/cost/${procedureSlug}`
                    },
                    {
                        "@type": "ListItem",
                        "position": 4,
                        "name": prov.name,
                        "item": `https://asclepius.us/cost/${procedureSlug}/${providerSlug}`
                    },
                    {
                        "@type": "ListItem",
                        "position": 5,
                        "name": plan.planName,
                        "item": `https://asclepius.us/cost/${procedureSlug}/${providerSlug}/${planSlug}`
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

export default async function CostPage({ params }: Props) {
    const resolvedParams = await params;
    const { procedure: procedureSlug, provider: providerSlug, plan: planSlug } = resolvedParams;

    const proc = getProcedure(procedureSlug);
    const prov = getProvider(providerSlug);
    const plan = getPlan(planSlug);

    return (
        <>
            {proc && prov && plan && (
                <StructuredData
                    proc={proc}
                    prov={prov}
                    plan={plan}
                    procedureSlug={procedureSlug}
                    providerSlug={providerSlug}
                    planSlug={planSlug}
                />
            )}
            <CostPageClient
                procedure={procedureSlug}
                provider={providerSlug}
                plan={planSlug}
            />
        </>
    );
}
