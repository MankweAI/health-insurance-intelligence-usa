import { Metadata } from 'next';
import Link from 'next/link';
import { FileText, Database, Shield, ExternalLink, CheckCircle } from 'lucide-react';
import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';
import { UHC_NY_METADATA } from '@/data/uhc_ny';

export const metadata: Metadata = {
    title: 'Methodology | Asclepius.US',
    description: 'Learn how Asclepius sources, processes, and displays healthcare pricing data from official CMS Machine-Readable Files (MRF).',
};

export default function MethodologyPage() {
    return (
        <div className="min-h-screen" style={{ background: '#FAF9F6' }}>
            <AppHeader />

            <main className="max-w-3xl mx-auto px-5 py-12">
                {/* Header */}
                <div className="mb-10">
                    <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-[12px] font-medium mb-4">
                        <FileText className="w-3.5 h-3.5" />
                        Technical Documentation
                    </div>
                    <h1 className="text-[32px] font-black text-stone-900 leading-tight mb-4">
                        Methodology & Data Sources
                    </h1>
                    <p className="text-stone-600 text-[15px] leading-relaxed">
                        Transparency in how we source, process, and display healthcare pricing data.
                    </p>
                </div>

                {/* Data Source Section */}
                <section className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-emerald-100 p-2 rounded-lg">
                            <Database className="w-5 h-5 text-emerald-600" />
                        </div>
                        <h2 className="text-[18px] font-bold text-stone-800">Data Source</h2>
                    </div>
                    <div className="bg-white border border-stone-200 rounded-xl p-5 space-y-4">
                        <p className="text-stone-600 text-[14px] leading-relaxed">
                            All pricing data displayed on Asclepius is extracted directly from <strong>Machine-Readable Files (MRF)</strong> published
                            by health insurance payers as mandated by the <a href="https://www.cms.gov/healthplan-price-transparency" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">CMS Transparency in Coverage Rule</a>.
                        </p>
                        <div className="bg-stone-50 rounded-lg p-4 space-y-2">
                            <div className="flex justify-between text-[13px]">
                                <span className="text-stone-500">Current Data Source</span>
                                <span className="font-bold text-stone-800">{UHC_NY_METADATA.payer} ({UHC_NY_METADATA.region})</span>
                            </div>
                            <div className="flex justify-between text-[13px]">
                                <span className="text-stone-500">Extraction Date</span>
                                <span className="font-bold text-stone-800">{UHC_NY_METADATA.mrfSource.extractedDate}</span>
                            </div>
                            <div className="flex justify-between text-[13px]">
                                <span className="text-stone-500">Rate Records</span>
                                <span className="font-bold text-stone-800">{UHC_NY_METADATA.rateCount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-[13px]">
                                <span className="text-stone-500">Providers</span>
                                <span className="font-bold text-stone-800">{UHC_NY_METADATA.providerCount.toLocaleString()}</span>
                            </div>
                        </div>
                        <a
                            href={UHC_NY_METADATA.mrfSource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-[13px] text-blue-600 hover:underline font-medium"
                        >
                            View Official MRF Portal <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                    </div>
                </section>

                {/* Processing Pipeline */}
                <section className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-blue-100 p-2 rounded-lg">
                            <Shield className="w-5 h-5 text-blue-600" />
                        </div>
                        <h2 className="text-[18px] font-bold text-stone-800">Data Processing</h2>
                    </div>
                    <div className="bg-white border border-stone-200 rounded-xl p-5">
                        <ol className="space-y-4">
                            <li className="flex gap-3">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-[12px] font-bold">1</div>
                                <div>
                                    <p className="font-bold text-stone-800 text-[14px]">Download MRF Files</p>
                                    <p className="text-stone-500 text-[13px]">We download the in-network-rates JSON files from official payer portals.</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-[12px] font-bold">2</div>
                                <div>
                                    <p className="font-bold text-stone-800 text-[14px]">Filter by CPT Code</p>
                                    <p className="text-stone-500 text-[13px]">We extract rates for common procedures (e.g., colonoscopy, MRI, joint replacement).</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-[12px] font-bold">3</div>
                                <div>
                                    <p className="font-bold text-stone-800 text-[14px]">Aggregate by Provider</p>
                                    <p className="text-stone-500 text-[13px]">Multiple rates per provider are aggregated to min, max, median, and mean statistics.</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-[12px] font-bold">4</div>
                                <div>
                                    <p className="font-bold text-stone-800 text-[14px]">Enrich with NPI Data</p>
                                    <p className="text-stone-500 text-[13px]">Provider names and addresses are enriched via the NPPES NPI Registry.</p>
                                </div>
                            </li>
                        </ol>
                    </div>
                </section>

                {/* Limitations */}
                <section className="mb-10">
                    <h2 className="text-[18px] font-bold text-stone-800 mb-4">Limitations & Disclaimers</h2>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 space-y-3">
                        <div className="flex gap-2">
                            <CheckCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                            <p className="text-stone-700 text-[13px]">Rates shown are <strong>negotiated rates</strong> between payers and providers, not your out-of-pocket cost.</p>
                        </div>
                        <div className="flex gap-2">
                            <CheckCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                            <p className="text-stone-700 text-[13px]">Your actual cost depends on your deductible, coinsurance, and out-of-pocket maximum.</p>
                        </div>
                        <div className="flex gap-2">
                            <CheckCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                            <p className="text-stone-700 text-[13px]">This tool is for research purposes only. It is not financial or medical advice.</p>
                        </div>
                        <div className="flex gap-2">
                            <CheckCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                            <p className="text-stone-700 text-[13px]">Always verify with your healthcare provider and insurer before making decisions.</p>
                        </div>
                    </div>
                </section>

                {/* Report Error */}
                <section className="mb-10">
                    <div className="bg-stone-100 rounded-xl p-5 text-center">
                        <p className="text-stone-600 text-[13px] mb-3">
                            Found an error in our data? We want to know.
                        </p>
                        <a
                            href="mailto:data@asclepius.us?subject=Data%20Error%20Report"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-stone-800 text-white rounded-lg text-[13px] font-medium hover:bg-stone-700 transition-colors"
                        >
                            Report a Data Error
                        </a>
                    </div>
                </section>

                {/* Back Link */}
                <div className="text-center">
                    <Link href="/" className="text-blue-600 text-[13px] hover:underline">
                        ← Back to Home
                    </Link>
                </div>
            </main>

            <AppFooter />
        </div>
    );
}
