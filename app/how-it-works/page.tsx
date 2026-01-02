import { Metadata } from 'next';
import Link from 'next/link';
import AppFooter from '@/components/AppFooter';

export const metadata: Metadata = {
    title: 'How It Works | asclepius.us',
    description: 'Learn how asclepius.us calculates your medical procedure costs using CMS price transparency data and your insurance plan details.',
};

export default function HowItWorksPage() {
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
                            <p className="text-stone-400 text-[10px] uppercase tracking-wider font-sans">Medical Price Intelligence</p>
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
                        <h1 className="font-bold text-stone-900 text-[24px] font-sans mb-2">How It Works</h1>
                        <p className="text-stone-500 text-[14px] font-sans">
                            Three steps to understanding your true medical costs
                        </p>
                    </div>
                </section>

                {/* Step 1 */}
                <section className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm font-mono text-[13px] mb-4">
                    <div className="border-b border-dashed border-stone-300 pb-3 mb-4">
                        <div className="flex items-center gap-2">
                            <span className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-[14px] flex items-center justify-center">1</span>
                            <span className="font-bold text-stone-900 text-[14px] font-sans">WE AGGREGATE PRICE DATA</span>
                        </div>
                    </div>
                    <div className="space-y-3 text-stone-600 text-[14px] font-sans leading-relaxed">
                        <p>
                            Under the <strong>Hospital Price Transparency Rule</strong>, hospitals must publish
                            their negotiated rates with insurance companies. We collect this data from thousands
                            of facilities across the United States.
                        </p>
                        <div className="bg-stone-50 rounded-lg p-4 mt-3">
                            <p className="text-stone-400 text-[11px] uppercase tracking-wider mb-2">Data Sources</p>
                            <ul className="space-y-1 text-[13px]">
                                <li>• CMS Machine-Readable Files</li>
                                <li>• Hospital Price Transparency Files</li>
                                <li>• Transparency in Coverage (TIC) Data</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Step 2 */}
                <section className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm font-mono text-[13px] mb-4">
                    <div className="border-b border-dashed border-stone-300 pb-3 mb-4">
                        <div className="flex items-center gap-2">
                            <span className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-[14px] flex items-center justify-center">2</span>
                            <span className="font-bold text-stone-900 text-[14px] font-sans">WE MATCH YOUR PROCEDURE</span>
                        </div>
                    </div>
                    <div className="space-y-3 text-stone-600 text-[14px] font-sans leading-relaxed">
                        <p>
                            Every medical procedure has a unique <strong>CPT code</strong> (Current Procedural Terminology).
                            We match your procedure to the exact negotiated rate your insurance company has
                            agreed to pay your chosen provider.
                        </p>
                        <div className="bg-stone-50 rounded-lg p-4 mt-3">
                            <p className="text-stone-400 text-[11px] uppercase tracking-wider mb-2">Example</p>
                            <div className="font-mono text-[12px] text-stone-700">
                                <p>Procedure: Total Hip Replacement</p>
                                <p>CPT Code: 27130</p>
                                <p>Provider: Mayo Clinic Rochester</p>
                                <p>Negotiated Rate: $32,450</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Step 3 */}
                <section className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm font-mono text-[13px] mb-4">
                    <div className="border-b border-dashed border-stone-300 pb-3 mb-4">
                        <div className="flex items-center gap-2">
                            <span className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-[14px] flex items-center justify-center">3</span>
                            <span className="font-bold text-stone-900 text-[14px] font-sans">WE CALCULATE YOUR COST</span>
                        </div>
                    </div>
                    <div className="space-y-3 text-stone-600 text-[14px] font-sans leading-relaxed">
                        <p>
                            Using your insurance plan details, we calculate exactly what <strong>you</strong> will
                            owe out of pocket. This includes your deductible, co-insurance, and any applicable
                            out-of-pocket maximums.
                        </p>
                        <div className="bg-stone-50 rounded-lg p-4 mt-3">
                            <p className="text-stone-400 text-[11px] uppercase tracking-wider mb-2">Your Cost Breakdown</p>
                            <div className="space-y-2 font-mono text-[12px]">
                                <div className="flex justify-between">
                                    <span className="text-stone-600">Negotiated Rate</span>
                                    <span className="text-stone-900">$32,450</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-stone-600">Your Deductible</span>
                                    <span className="text-stone-900">$2,000</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-stone-600">Co-insurance (20%)</span>
                                    <span className="text-stone-900">$6,090</span>
                                </div>
                                <div className="flex justify-between border-t border-dashed border-stone-300 pt-2 mt-2">
                                    <span className="text-stone-900 font-bold">Your Total</span>
                                    <span className="text-emerald-600 font-bold">$8,090</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm font-mono text-[13px] mb-4">
                    <div className="text-center">
                        <p className="text-stone-600 text-[14px] font-sans mb-4">
                            Ready to see your estimated costs?
                        </p>
                        <Link
                            href="/"
                            className="inline-block px-6 py-3 bg-emerald-600 text-white font-bold text-[14px] font-sans rounded-lg hover:bg-emerald-700 transition-colors"
                        >
                            Try the Cost Estimator
                        </Link>
                    </div>
                </section>
            </main>

            {/* HowTo Schema for Rich Results */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "HowTo",
                        "name": "How to Estimate Your Medical Procedure Costs",
                        "description": "Learn how asclepius.us calculates your medical procedure costs using CMS price transparency data and your insurance plan details.",
                        "totalTime": "PT5M",
                        "step": [
                            {
                                "@type": "HowToStep",
                                "position": 1,
                                "name": "We Aggregate Price Data",
                                "text": "Under the Hospital Price Transparency Rule, hospitals must publish their negotiated rates with insurance companies. We collect this data from thousands of facilities across the United States.",
                                "url": "https://asclepius.us/how-it-works#step-1"
                            },
                            {
                                "@type": "HowToStep",
                                "position": 2,
                                "name": "We Match Your Procedure",
                                "text": "Every medical procedure has a unique CPT code. We match your procedure to the exact negotiated rate your insurance company has agreed to pay your chosen provider.",
                                "url": "https://asclepius.us/how-it-works#step-2"
                            },
                            {
                                "@type": "HowToStep",
                                "position": 3,
                                "name": "We Calculate Your Cost",
                                "text": "Using your insurance plan details, we calculate exactly what you will owe out of pocket. This includes your deductible, co-insurance, and any applicable out-of-pocket maximums.",
                                "url": "https://asclepius.us/how-it-works#step-3"
                            }
                        ]
                    })
                }}
            />

            {/* Footer */}
            <AppFooter />
        </div>
    );
}
