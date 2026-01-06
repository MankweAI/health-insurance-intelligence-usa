import { Metadata } from 'next';
import Link from 'next/link';
import AppFooter from '@/components/AppFooter';

export const metadata: Metadata = {
    title: 'Healthcare Glossary | asclepius.us',
    description: 'Understand healthcare and insurance terminology. Learn what deductibles, co-insurance, CPT codes, and other medical billing terms mean.',
};

const GLOSSARY_TERMS = [
    {
        term: 'Allowed Amount',
        definition: 'The maximum amount your insurance plan will pay for a covered healthcare service. Also called "eligible expense" or "negotiated rate."',
    },
    {
        term: 'Co-insurance',
        definition: 'The percentage of costs you pay for a covered healthcare service after you\'ve met your deductible. For example, if your co-insurance is 20%, you pay 20% and your insurance pays 80%.',
    },
    {
        term: 'Co-pay (Copayment)',
        definition: 'A fixed amount you pay for a covered healthcare service at the time of service. For example, $25 for a doctor visit.',
    },
    {
        term: 'CPT Code',
        definition: 'Current Procedural Terminology code. A standardized 5-digit code that identifies a specific medical procedure or service for billing purposes.',
    },
    {
        term: 'Deductible',
        definition: 'The amount you pay for covered healthcare services before your insurance plan starts to pay. For example, with a $2,000 deductible, you pay the first $2,000 of covered services yourself.',
    },
    {
        term: 'EOB (Explanation of Benefits)',
        definition: 'A statement from your insurance company explaining what was covered, what you owe, and how the payment was calculated.',
    },
    {
        term: 'In-Network',
        definition: 'A provider or facility that has a contract with your insurance company to provide services at a negotiated rate. Using in-network providers usually costs less.',
    },
    {
        term: 'Negotiated Rate',
        definition: 'The discounted price your insurance company has agreed to pay a healthcare provider for a specific service. This is typically lower than the provider\'s standard charges.',
    },
    {
        term: 'NPI (National Provider Identifier)',
        definition: 'A unique 10-digit identification number assigned to healthcare providers in the United States. Used for billing and tracking purposes.',
    },
    {
        term: 'Out-of-Network',
        definition: 'A provider or facility that does not have a contract with your insurance company. Services from out-of-network providers typically cost more.',
    },
    {
        term: 'Out-of-Pocket Maximum',
        definition: 'The most you have to pay for covered services in a plan year. After you reach this amount, your insurance pays 100% of covered services.',
    },
    {
        term: 'Premium',
        definition: 'The amount you pay monthly (or per paycheck) to maintain your health insurance coverage, regardless of whether you use healthcare services.',
    },
    {
        term: 'Prior Authorization',
        definition: 'Approval from your insurance company required before receiving certain procedures or medications. Without it, your insurance may not cover the service.',
    },
    {
        term: 'Price Transparency',
        definition: 'Federal rules requiring hospitals and insurers to publicly disclose their prices. This data powers cost estimation tools like asclepius.us.',
    },
];

export default function GlossaryPage() {
    return (
        <div className="min-h-screen pb-24" style={{ background: '#FAF9F6' }}>
            {/* Header */}
            <header className="pt-5 pb-2">
                <div className="p-4 font-mono text-[13px]">
                    <Link href="/" className="flex items-center gap-3 w-fit">
                        <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shadow-sm">
                            <span className="text-white font-bold text-[18px] font-sans">$</span>
                        </div>
                        <div>
                            <span className="font-bold text-stone-900 text-[14px] font-mono tracking-tight">asclepius.us</span>
                            <p className="text-stone-400 text-[10px] uppercase tracking-wider font-sans">Transparency Data Explorer</p>
                        </div>
                    </Link>
                </div>
                <div
                    className="h-[1px] w-full mt-2"
                    style={{
                        background: 'linear-gradient(90deg, transparent 0%, #10B981 30%, #10B981 70%, transparent 100%)'
                    }}
                />
            </header>

            {/* Content */}
            <main className="px-5 pt-6 max-w-2xl mx-auto">
                {/* Hero */}
                <section className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm font-mono text-[13px] mb-4">
                    <div className="text-center py-4">
                        <h1 className="font-bold text-stone-900 text-[24px] font-sans mb-2">Healthcare Glossary</h1>
                        <p className="text-stone-500 text-[14px] font-sans">
                            Understanding healthcare and insurance terminology
                        </p>
                    </div>
                </section>

                {/* Glossary Terms */}
                <section className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm font-mono text-[13px]">
                    <div className="border-b border-dashed border-stone-300 pb-3 mb-4">
                        <div className="flex items-center gap-2">
                            <span className="text-lg">📖</span>
                            <span className="font-bold text-stone-900 text-[14px] font-sans">TERMS A-Z</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {GLOSSARY_TERMS.map((item, index) => (
                            <div
                                key={item.term}
                                className={`${index !== GLOSSARY_TERMS.length - 1 ? 'border-b border-dashed border-stone-100 pb-4' : ''}`}
                            >
                                <h3 className="font-bold text-stone-900 text-[14px] font-sans mb-1">
                                    {item.term}
                                </h3>
                                <p className="text-stone-600 text-[13px] font-sans leading-relaxed">
                                    {item.definition}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* JSON-LD for Glossary */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "DefinedTermSet",
                        "name": "Healthcare Glossary",
                        "description": "A glossary of healthcare and insurance terminology",
                        "hasDefinedTerm": GLOSSARY_TERMS.map(item => ({
                            "@type": "DefinedTerm",
                            "name": item.term,
                            "description": item.definition
                        }))
                    })
                }}
            />

            {/* Footer */}
            <AppFooter />
        </div>
    );
}
