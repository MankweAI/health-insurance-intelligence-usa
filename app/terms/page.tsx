import { Metadata } from 'next';
import Link from 'next/link';
import AppFooter from '@/components/AppFooter';

export const metadata: Metadata = {
    title: 'Terms of Service | asclepius.us',
    description: 'Terms of service for asclepius.us. Read our terms and conditions for using our medical cost estimation service.',
};

export default function TermsPage() {
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
                        <h1 className="font-bold text-stone-900 text-[24px] font-sans mb-2">Terms of Service</h1>
                        <p className="text-stone-400 text-[12px] font-sans">
                            Last updated: {lastUpdated}
                        </p>
                    </div>
                </section>

                {/* Terms Content */}
                <section className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm font-mono text-[13px]">
                    <div className="space-y-6 text-stone-600 text-[14px] font-sans leading-relaxed">

                        {/* Acceptance */}
                        <div>
                            <h2 className="font-bold text-stone-900 text-[16px] mb-2">1. Acceptance of Terms</h2>
                            <p>
                                By accessing or using asclepius.us ("the Service"), you agree to be bound by these
                                Terms of Service. If you do not agree to these terms, please do not use our Service.
                            </p>
                        </div>

                        {/* Service Description */}
                        <div className="border-t border-dashed border-stone-200 pt-4">
                            <h2 className="font-bold text-stone-900 text-[16px] mb-2">2. Service Description</h2>
                            <p>
                                asclepius.us provides estimated healthcare costs based on publicly available price
                                transparency data. Our Service is designed to help users understand potential
                                out-of-pocket costs for medical procedures.
                            </p>
                        </div>

                        {/* Medical Disclaimer */}
                        <div className="border-t border-dashed border-stone-200 pt-4">
                            <h2 className="font-bold text-stone-900 text-[16px] mb-2">3. Medical Disclaimer</h2>
                            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                                <p className="text-amber-800 text-[13px]">
                                    <strong>Important:</strong> asclepius.us does NOT provide medical advice, diagnosis,
                                    or treatment recommendations. Our cost estimates are for informational purposes only.
                                    Always consult with qualified healthcare providers and your insurance company for
                                    actual costs and medical decisions.
                                </p>
                            </div>
                        </div>

                        {/* Accuracy */}
                        <div className="border-t border-dashed border-stone-200 pt-4">
                            <h2 className="font-bold text-stone-900 text-[16px] mb-2">4. Accuracy of Information</h2>
                            <p className="mb-3">
                                While we strive to provide accurate cost estimates, we cannot guarantee:
                            </p>
                            <ul className="space-y-2 ml-4">
                                <li>The accuracy or completeness of pricing data from third-party sources</li>
                                <li>That estimates will match your actual out-of-pocket costs</li>
                                <li>The timeliness of data updates from hospitals and insurers</li>
                            </ul>
                            <p className="mt-3">
                                Actual costs may vary based on your specific insurance plan, provider charges,
                                additional services required, and other factors.
                            </p>
                        </div>

                        {/* User Responsibilities */}
                        <div className="border-t border-dashed border-stone-200 pt-4">
                            <h2 className="font-bold text-stone-900 text-[16px] mb-2">5. User Responsibilities</h2>
                            <p className="mb-3">By using our Service, you agree to:</p>
                            <ul className="space-y-2 ml-4">
                                <li>Provide accurate information when using our tools</li>
                                <li>Verify all estimates with your healthcare provider and insurer</li>
                                <li>Not rely solely on our estimates for financial or medical decisions</li>
                                <li>Use the Service for lawful purposes only</li>
                            </ul>
                        </div>

                        {/* Lead Generation */}
                        <div className="border-t border-dashed border-stone-200 pt-4">
                            <h2 className="font-bold text-stone-900 text-[16px] mb-2">6. Lead Generation Services</h2>
                            <p>
                                When you submit your information through our "Plan Review" form, you consent to
                                being contacted by licensed insurance advisors or brokers. You may opt out of
                                such communications at any time.
                            </p>
                        </div>

                        {/* Intellectual Property */}
                        <div className="border-t border-dashed border-stone-200 pt-4">
                            <h2 className="font-bold text-stone-900 text-[16px] mb-2">7. Intellectual Property</h2>
                            <p>
                                All content, features, and functionality of the Service are owned by asclepius.us
                                and are protected by intellectual property laws. You may not reproduce, distribute,
                                or create derivative works without our written permission.
                            </p>
                        </div>

                        {/* Limitation of Liability */}
                        <div className="border-t border-dashed border-stone-200 pt-4">
                            <h2 className="font-bold text-stone-900 text-[16px] mb-2">8. Limitation of Liability</h2>
                            <p>
                                To the maximum extent permitted by law, asclepius.us shall not be liable for any
                                indirect, incidental, special, consequential, or punitive damages arising from
                                your use of the Service, including but not limited to financial decisions made
                                based on our cost estimates.
                            </p>
                        </div>

                        {/* Changes to Terms */}
                        <div className="border-t border-dashed border-stone-200 pt-4">
                            <h2 className="font-bold text-stone-900 text-[16px] mb-2">9. Changes to Terms</h2>
                            <p>
                                We reserve the right to modify these Terms at any time. Changes will be effective
                                immediately upon posting. Your continued use of the Service after changes constitutes
                                acceptance of the modified Terms.
                            </p>
                        </div>

                        {/* Contact */}
                        <div className="border-t border-dashed border-stone-200 pt-4">
                            <h2 className="font-bold text-stone-900 text-[16px] mb-2">10. Contact</h2>
                            <p>
                                For questions about these Terms, please contact us at{' '}
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
