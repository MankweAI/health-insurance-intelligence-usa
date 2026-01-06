'use client';

import React, { useState } from 'react';
import { LiabilityCalculator } from '@/components/us/LiabilityCalculator';
import { LeadCaptureForm } from '@/components/us/LeadCaptureForm';
import { ProcedureInfo } from '@/components/us/ProcedureInfo';
import { ProviderInfo } from '@/components/us/ProviderInfo';
import { FAQSection } from '@/components/us/FAQSection';
import { RelatedContent } from '@/components/us/RelatedContent';
import { EEATFooter } from '@/components/us/EEATSignals';
import { PriceContextBadge } from '@/components/us/PriceContextBadge';
import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';
import DataSourceBadge from '@/components/DataSourceBadge';
import { UHC_NY_METADATA } from '@/data/uhc_ny';
import { CPTEntry } from '@/types/us-tic';

interface CostPageContentProps {
    procedure: CPTEntry;
    provider: {
        npi: string;
        name: string;
        slug: string;
        providerType: 'organization' | 'individual';
        address: {
            street: string;
            city: string;
            state: string;
            zip: string;
        };
        specialty: string;
        phone: string;
    };
    planName: string;
    planSlug: string;
    rate: number;
    priceStats: {
        min: number;
        max: number;
        median: number;
        mean: number;
        count: number;
    };
    priceContext: {
        rank: number;
        total: number;
        percentile: number;
        average: number;
        difference: number;
        percentDiff: number;
    };
}

/**
 * Cost Page Content Component
 * 
 * Displays cost estimate for a procedure at a specific provider.
 * Accepts CMS data via props - no internal data fetching.
 */
export default function CostPageContent({
    procedure,
    provider,
    planName,
    planSlug,
    rate,
    priceStats,
    priceContext
}: CostPageContentProps) {
    const [liability, setLiability] = useState(0);

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
                            Your Estimated {procedure.name} Cost
                        </p>
                        <div className="font-black text-[42px] tracking-tight leading-none text-stone-900 font-sans">
                            ${liability > 0 ? Math.round(liability).toLocaleString('en-US') : Math.round(rate).toLocaleString('en-US')}
                        </div>
                        <p className="text-stone-400 text-[11px] mt-2 font-sans">
                            Median Negotiated Rate: ${rate.toLocaleString('en-US')}
                        </p>
                    </div>

                    {/* Footer Note */}
                    <div className="border-t border-dashed border-stone-300 pt-3 mt-2">
                        <p className="text-stone-400 text-[11px] leading-relaxed text-center mb-2">
                            Based on CMS Price Transparency data. Your actual cost depends on your deductible and coinsurance.
                        </p>
                        <div className="flex justify-center">
                            <DataSourceBadge
                                recordCount={priceStats.count}
                                extractedDate={UHC_NY_METADATA.mrfSource.extractedDate}
                                sourceUrl={UHC_NY_METADATA.mrfSource.url}
                                sourceName={UHC_NY_METADATA.mrfSource.displayName}
                                dataYear={UHC_NY_METADATA.mrfSource.dataYear}
                                compact={true}
                            />
                        </div>
                    </div>

                    {/* Price Context Badge - Market Comparison */}
                    <PriceContextBadge
                        rank={priceContext.rank}
                        total={priceContext.total}
                        percentile={priceContext.percentile}
                        difference={priceContext.difference}
                        percentDiff={priceContext.percentDiff}
                        average={priceContext.average}
                    />
                </div>
            </section>

            {/* 3. CALCULATOR CARD */}
            <section className="px-0">
                <div className="p-6 shadow-sm border border-stone-100 relative z-20">
                    <LiabilityCalculator
                        baseRate={rate}
                        procedureName={procedure.name}
                        providerName={provider.name}
                        onLiabilityChange={setLiability}
                    />
                </div>
            </section>

            {/* 4. LEAD CAPTURE CTA */}
            <section className="px-5 mt-4">
                <LeadCaptureForm
                    procedureName={procedure.name}
                    currentPlanName={planName}
                    estimatedCost={liability || rate}
                />
            </section>

            {/* 5. ABOUT THIS PROCEDURE */}
            <section className="px-5 mt-4">
                <ProcedureInfo
                    name={procedure.name}
                    cptCode={procedure.code}
                    category={procedure.category}
                />
            </section>

            {/* 6. ABOUT THIS PROVIDER */}
            <section className="px-5 mt-4">
                <ProviderInfo
                    name={provider.name}
                    npi={provider.npi}
                    address={provider.address}
                />
            </section>

            {/* 7. FAQ SECTION */}
            <section className="px-5 mt-4">
                <FAQSection
                    procedureName={procedure.name}
                    providerName={provider.name}
                    planName={planName}
                    estimatedCost={liability || rate}
                    procedureSlug={procedure.slug}
                    providerSlug={provider.slug}
                    planSlug={planSlug}
                />
            </section>

            {/* 8. RELATED CONTENT */}
            <section className="px-5 mt-4">
                <RelatedContent
                    currentProcedure={procedure.slug}
                    currentProvider={provider.slug}
                    currentPlan={planSlug}
                />
            </section>

            {/* 9. E-E-A-T SIGNALS */}
            <section className="px-5 mt-6">
                <EEATFooter
                    procedureName={procedure.name}
                    providerName={provider.name}
                />
            </section>

            {/* 10. SITE NAVIGATION FOOTER */}
            <AppFooter />

        </div>
    );
}
