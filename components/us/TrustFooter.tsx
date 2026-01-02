'use client';

import React from 'react';

export function TrustFooter() {
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm font-mono text-[13px]">
            {/* Header */}
            <div className="border-b border-dashed border-stone-300 pb-3 mb-4">
                <div className="flex items-center gap-2">
                    <span className="text-lg">🔒</span>
                    <span className="font-bold text-stone-900 text-[14px] font-sans">DATA & DISCLAIMER</span>
                </div>
            </div>

            <div className="space-y-4 text-stone-500 text-[12px] font-sans leading-relaxed">
                {/* Data Sources */}
                <div>
                    <p className="text-stone-400 text-[10px] uppercase tracking-wider mb-1">Data Sources</p>
                    <p>
                        Pricing data is aggregated from CMS Price Transparency files as required by the{' '}
                        <a
                            href="https://www.cms.gov/hospital-price-transparency"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-600 hover:underline"
                        >
                            Hospital Price Transparency Rule
                        </a>
                        . Rates shown are negotiated amounts between providers and insurance plans.
                    </p>
                </div>

                {/* Last Updated */}
                <div>
                    <p className="text-stone-400 text-[10px] uppercase tracking-wider mb-1">Last Updated</p>
                    <p>{currentDate}</p>
                </div>

                {/* Medical Disclaimer */}
                <div className="border-t border-dashed border-stone-200 pt-4">
                    <p className="text-stone-400 text-[10px] uppercase tracking-wider mb-1">Medical Disclaimer</p>
                    <p className="text-[11px]">
                        This tool provides cost estimates for informational purposes only and should not be considered
                        medical or financial advice. Actual costs may vary based on your specific situation, additional
                        services required, and changes to your insurance coverage. Always confirm costs with your
                        healthcare provider and insurance company before scheduling any procedure. This site does not
                        provide medical advice, diagnosis, or treatment.
                    </p>
                </div>
            </div>
        </div>
    );
}
