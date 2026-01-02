'use client';

import React, { useState } from 'react';
import { notFound } from 'next/navigation';
import { getProcedure, getProvider, getPlan, getRate } from '@/data';
import { LiabilityCalculator } from '@/components/us/LiabilityCalculator';
import { LeadCaptureForm } from '@/components/us/LeadCaptureForm';
import { ProcedureInfo } from '@/components/us/ProcedureInfo';
import { ProviderInfo } from '@/components/us/ProviderInfo';
import { FAQSection } from '@/components/us/FAQSection';
import { RelatedContent } from '@/components/us/RelatedContent';
import { EEATFooter } from '@/components/us/EEATSignals';
import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';

interface PageProps {
    procedure: string;
    provider: string;
    plan: string;
}

export default function CostPageClient({ procedure: procedureSlug, provider: providerSlug, plan: planSlug }: PageProps) {
    const [liability, setLiability] = useState(0);
    const proc = getProcedure(procedureSlug);
    const prov = getProvider(providerSlug);
    const plan = getPlan(planSlug);

    if (!proc || !prov || !plan) return notFound();

    const rate = getRate(procedureSlug, providerSlug, planSlug);
    if (!rate) return <div className="p-10 text-center">Rate not found</div>;

    return (
        <div className="min-h-screen pb-24" style={{ background: '#FAF9F6' }}>

            {/* 1. HEADER - Minimal */}
            <AppHeader />

            {/* 2. HERO - Bank Statement Style */}
            <section className="px-5 pt-4 pb-6">
                <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm font-mono text-[13px]">


                    {/* Liability Amount */}
                    <div className="text-center py-4">
                        <p className="text-stone-500 text-[11px] uppercase tracking-widest mb-2 font-sans">
                            Your Estimated {proc.name} Cost
                        </p>
                        <div className="font-black text-[42px] tracking-tight leading-none text-stone-900 font-sans">
                            ${liability > 0 ? Math.round(liability).toLocaleString() : '8,420'}
                        </div>
                    </div>

                    {/* Footer Note */}
                    <div className="border-t border-dashed border-stone-300 pt-3 mt-2">
                        <p className="text-stone-400 text-[11px] leading-relaxed text-center">
                            Estimated patient responsibility based on average procedure costs and your current plan coverage.
                        </p>
                    </div>
                </div>
            </section>

            {/* 3. CALCULATOR CARD */}
            <section className="px-0">
                <div className="p-6 shadow-sm border border-stone-100 relative z-20">
                    <LiabilityCalculator
                        baseRate={rate.negotiated_rate}
                        procedureName={proc.name}
                        providerName={prov.name}
                        onLiabilityChange={setLiability}
                    />
                </div>
            </section>

            {/* 4. LEAD CAPTURE CTA */}
            <section className="px-5 mt-4">
                <LeadCaptureForm
                    procedureName={proc.name}
                    currentPlanName={plan.planName}
                    estimatedCost={liability}
                />
            </section>

            {/* 5. ABOUT THIS PROCEDURE */}
            <section className="px-5 mt-4">
                <ProcedureInfo
                    name={proc.name}
                    cptCode={proc.code}
                    category={proc.category}
                />
            </section>

            {/* 6. ABOUT THIS PROVIDER */}
            <section className="px-5 mt-4">
                <ProviderInfo
                    name={prov.name}
                    npi={prov.npi}
                    address={prov.address}
                />
            </section>

            {/* 7. FAQ SECTION */}
            <section className="px-5 mt-4">
                <FAQSection
                    procedureName={proc.name}
                    providerName={prov.name}
                    planName={plan.planName}
                    estimatedCost={liability}
                    procedureSlug={procedureSlug}
                    providerSlug={providerSlug}
                    planSlug={planSlug}
                />
            </section>

            {/* 8. RELATED CONTENT */}
            <section className="px-5 mt-4">
                <RelatedContent
                    currentProcedure={procedureSlug}
                    currentProvider={providerSlug}
                    currentPlan={planSlug}
                />
            </section>

            {/* 9. E-E-A-T SIGNALS (Data Sources, Disclaimer, Editorial) */}
            <section className="px-5 mt-6">
                <EEATFooter
                    procedureName={proc.name}
                    providerName={prov.name}
                />
            </section>

            {/* 10. SITE NAVIGATION FOOTER */}
            <AppFooter />

        </div>
    );
}
