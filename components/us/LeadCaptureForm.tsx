'use client';

import React, { useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface Props {
    procedureName: string;
    currentPlanName: string;
    estimatedCost: number;
}

export function LeadCaptureForm({ procedureName, currentPlanName, estimatedCost }: Props) {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [zip, setZip] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // TODO: Send to your lead capture endpoint
        // await fetch('/api/leads', {
        //     method: 'POST',
        //     body: JSON.stringify({ email, phone, zip, procedureName, currentPlanName, estimatedCost })
        // });

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        setLoading(false);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm font-mono text-[13px]">
                <div className="text-center py-6">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="font-bold text-stone-900 text-[16px] font-sans mb-2">You're All Set!</h3>
                    <p className="text-stone-500 text-[13px] font-sans leading-relaxed">
                        A licensed advisor will reach out within 24 hours to review your options.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm font-mono text-[13px]">
            {/* Header */}
            <div className="border-b border-dashed border-stone-300 pb-3 mb-4">
                <div className="flex items-center gap-2">
                    <span className="text-lg">🔍</span>
                    <span className="font-bold text-stone-900 text-[14px] font-sans">PAYING TOO MUCH?</span>
                </div>
                <p className="text-stone-500 text-[12px] mt-1 font-sans leading-relaxed">
                    Your current plan may not be the best fit. A licensed advisor can help you find coverage that costs less — or covers more.
                </p>
            </div>

            {/* Benefits */}
            <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2">
                    <span className="text-emerald-500 text-[14px]">✓</span>
                    <p className="text-stone-600 text-[12px] font-sans">Free, no-obligation plan review</p>
                </div>
                <div className="flex items-start gap-2">
                    <span className="text-emerald-500 text-[14px]">✓</span>
                    <p className="text-stone-600 text-[12px] font-sans">Compare plans from 50+ carriers</p>
                </div>
                <div className="flex items-start gap-2">
                    <span className="text-emerald-500 text-[14px]">✓</span>
                    <p className="text-stone-600 text-[12px] font-sans">Takes 5 minutes</p>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-stone-200 text-[14px] font-sans placeholder:text-stone-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
                <input
                    type="tel"
                    placeholder="Phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-stone-200 text-[14px] font-sans placeholder:text-stone-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
                <input
                    type="text"
                    placeholder="ZIP code"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    required
                    maxLength={5}
                    className="w-full px-4 py-3 rounded-lg border border-stone-200 text-[14px] font-sans placeholder:text-stone-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-lg bg-emerald-600 text-white font-bold text-[14px] font-sans flex items-center justify-center gap-2 hover:bg-emerald-700 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        'Submitting...'
                    ) : (
                        <>Get My Free Plan Review <ArrowRight className="w-4 h-4" /></>
                    )}
                </button>
            </form>

            {/* Trust Signal */}
            <p className="text-stone-400 text-[10px] text-center mt-3">
                No spam • Unsubscribe anytime
            </p>
        </div>
    );
}
