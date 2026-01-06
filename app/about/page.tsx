import { Metadata } from 'next';
import Link from 'next/link';
import AppFooter from '@/components/AppFooter';

export const metadata: Metadata = {
    title: 'About | asclepius.us',
    description: 'Learn about asclepius.us, a medical rate data explorer built to help Americans search official healthcare price transparency filings.',
};

export default function AboutPage() {
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
                {/* Mission Section */}
                <section className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm font-mono text-[13px] mb-4">
                    <div className="border-b border-dashed border-stone-300 pb-3 mb-4">
                        <div className="flex items-center gap-2">
                            <span className="text-lg">🎯</span>
                            <span className="font-bold text-stone-900 text-[14px] font-sans">OUR MISSION</span>
                        </div>
                    </div>
                    <div className="space-y-4 text-stone-600 text-[14px] font-sans leading-relaxed">
                        <p>
                            <strong className="text-stone-900">Healthcare costs should never be a surprise.</strong>
                        </p>
                        <p>
                            asclepius.us was built to solve a simple problem: Americans deserve to know how much
                            their medical procedures will cost <em>before</em> they receive care — not after.
                        </p>
                        <p>
                            We aggregate publicly available price transparency data mandated by the
                            <a
                                href="https://www.cms.gov/hospital-price-transparency"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-emerald-600 hover:underline mx-1"
                            >
                                Hospital Price Transparency Rule
                            </a>
                            and make it searchable for research purposes.
                        </p>
                    </div>
                </section>

                {/* Creator Section */}
                <section className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm font-mono text-[13px] mb-4">
                    <div className="border-b border-dashed border-stone-300 pb-3 mb-4">
                        <div className="flex items-center gap-2">
                            <span className="text-lg">👤</span>
                            <span className="font-bold text-stone-900 text-[14px] font-sans">ABOUT THE CREATOR</span>
                        </div>
                    </div>
                    <div className="space-y-4 text-stone-600 text-[14px] font-sans leading-relaxed">
                        <p>
                            <strong className="text-stone-900">Mankwe Mokgabudi</strong> — Software Engineer & Data Scientist
                        </p>
                        <p>
                            I built asclepius.us because I believe data transparency is a fundamental right,
                            especially when it comes to healthcare. With a background in software engineering
                            and data science, I specialize in transforming complex datasets into tools that
                            empower everyday people to make informed decisions.
                        </p>
                        <p>
                            This project aggregates and processes millions of data points from CMS price
                            transparency files to deliver accurate, real-time cost estimates for medical
                            procedures across the United States.
                        </p>
                    </div>
                </section>

                {/* Data & Methodology Section */}
                <section className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm font-mono text-[13px] mb-4">
                    <div className="border-b border-dashed border-stone-300 pb-3 mb-4">
                        <div className="flex items-center gap-2">
                            <span className="text-lg">📊</span>
                            <span className="font-bold text-stone-900 text-[14px] font-sans">DATA & METHODOLOGY</span>
                        </div>
                    </div>
                    <div className="space-y-4 text-stone-600 text-[14px] font-sans leading-relaxed">
                        <p>Our data is sourced from:</p>
                        <ul className="space-y-2 ml-4">
                            <li className="flex items-start gap-2">
                                <span className="text-emerald-500">✓</span>
                                <span><strong>CMS Price Transparency Data</strong> — Negotiated rates between hospitals and insurers</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-emerald-500">✓</span>
                                <span><strong>CPT Code Mapping</strong> — Standardized procedure codes for accurate matching</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-emerald-500">✓</span>
                                <span><strong>Insurance Plan Modeling</strong> — Deductible, co-insurance, and out-of-pocket calculations</span>
                            </li>
                        </ul>
                        <p className="text-stone-400 text-[12px] mt-4">
                            Data is updated regularly as hospitals publish new transparency files.
                        </p>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm font-mono text-[13px]">
                    <div className="border-b border-dashed border-stone-300 pb-3 mb-4">
                        <div className="flex items-center gap-2">
                            <span className="text-lg">📧</span>
                            <span className="font-bold text-stone-900 text-[14px] font-sans">CONTACT</span>
                        </div>
                    </div>
                    <div className="text-stone-600 text-[14px] font-sans leading-relaxed">
                        <p>
                            Questions, feedback, or partnership inquiries? Reach out at:
                        </p>
                        <p className="mt-2">
                            <a
                                href="mailto:hello@asclepius.us"
                                className="text-emerald-600 font-mono hover:underline"
                            >
                                hello@asclepius.us
                            </a>
                        </p>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <AppFooter />
        </div >
    );
}
