import { Metadata } from 'next';
import Link from 'next/link';
import AppFooter from '@/components/AppFooter';

export const metadata: Metadata = {
    title: 'Privacy Policy | asclepius.us',
    description: 'Privacy policy for asclepius.us. Learn how we collect, use, and protect your information.',
};

export default function PrivacyPage() {
    const lastUpdated = 'January 1, 2026';

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
                        <h1 className="font-bold text-stone-900 text-[24px] font-sans mb-2">Privacy Policy</h1>
                        <p className="text-stone-400 text-[12px] font-sans">
                            Last updated: {lastUpdated}
                        </p>
                    </div>
                </section>

                {/* Policy Content */}
                <section className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm font-mono text-[13px]">
                    <div className="space-y-6 text-stone-600 text-[14px] font-sans leading-relaxed">

                        {/* Introduction */}
                        <div>
                            <h2 className="font-bold text-stone-900 text-[16px] mb-2">Introduction</h2>
                            <p>
                                asclepius.us ("we", "our", or "us") is committed to protecting your privacy.
                                This Privacy Policy explains how we collect, use, and safeguard your information
                                when you use our medical cost estimation service.
                            </p>
                        </div>

                        {/* Information We Collect */}
                        <div className="border-t border-dashed border-stone-200 pt-4">
                            <h2 className="font-bold text-stone-900 text-[16px] mb-2">Information We Collect</h2>
                            <p className="mb-3">We may collect the following types of information:</p>
                            <ul className="space-y-2 ml-4">
                                <li><strong>Contact Information:</strong> Email address, phone number, and ZIP code when you submit our lead form.</li>
                                <li><strong>Usage Data:</strong> Information about how you interact with our website, including pages visited and features used.</li>
                                <li><strong>Device Information:</strong> Browser type, operating system, and device identifiers.</li>
                            </ul>
                        </div>

                        {/* How We Use Information */}
                        <div className="border-t border-dashed border-stone-200 pt-4">
                            <h2 className="font-bold text-stone-900 text-[16px] mb-2">How We Use Your Information</h2>
                            <ul className="space-y-2 ml-4">
                                <li>To provide cost estimates and personalized healthcare pricing information</li>
                                <li>To connect you with licensed insurance advisors (with your consent)</li>
                                <li>To improve our services and user experience</li>
                                <li>To communicate updates and respond to your inquiries</li>
                            </ul>
                        </div>

                        {/* Data Sharing */}
                        <div className="border-t border-dashed border-stone-200 pt-4">
                            <h2 className="font-bold text-stone-900 text-[16px] mb-2">Information Sharing</h2>
                            <p className="mb-3">We may share your information with:</p>
                            <ul className="space-y-2 ml-4">
                                <li><strong>Licensed Insurance Advisors:</strong> When you request a plan review, your contact information may be shared with licensed insurance professionals.</li>
                                <li><strong>Service Providers:</strong> Third-party vendors who help us operate our website and services.</li>
                                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights.</li>
                            </ul>
                        </div>

                        {/* Data Security */}
                        <div className="border-t border-dashed border-stone-200 pt-4">
                            <h2 className="font-bold text-stone-900 text-[16px] mb-2">Data Security</h2>
                            <p>
                                We implement appropriate technical and organizational measures to protect your
                                personal information. However, no method of transmission over the Internet is
                                100% secure, and we cannot guarantee absolute security.
                            </p>
                        </div>

                        {/* Your Rights */}
                        <div className="border-t border-dashed border-stone-200 pt-4">
                            <h2 className="font-bold text-stone-900 text-[16px] mb-2">Your Rights</h2>
                            <p className="mb-3">You have the right to:</p>
                            <ul className="space-y-2 ml-4">
                                <li>Access the personal information we hold about you</li>
                                <li>Request correction of inaccurate information</li>
                                <li>Request deletion of your information</li>
                                <li>Opt out of marketing communications</li>
                            </ul>
                        </div>

                        {/* Cookies */}
                        <div className="border-t border-dashed border-stone-200 pt-4">
                            <h2 className="font-bold text-stone-900 text-[16px] mb-2">Cookies</h2>
                            <p>
                                We use cookies and similar technologies to analyze website traffic and improve
                                your experience. You can control cookies through your browser settings.
                            </p>
                        </div>

                        {/* Contact */}
                        <div className="border-t border-dashed border-stone-200 pt-4">
                            <h2 className="font-bold text-stone-900 text-[16px] mb-2">Contact Us</h2>
                            <p>
                                If you have questions about this Privacy Policy, please contact us at{' '}
                                <a href="mailto:hello@asclepius.us" className="text-emerald-600 hover:underline">
                                    hello@asclepius.us
                                </a>
                            </p>
                        </div>

                    </div>
                </section>
            </main>

            {/* Footer */}
            <AppFooter />
        </div>
    );
}
