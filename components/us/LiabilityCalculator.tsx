'use client';

import React, { useState, useEffect } from 'react';
import { calculateLiability, LiabilityResult } from '@/lib/us/calculator';
import { Info } from 'lucide-react';
import { BottomSheet } from './BottomSheet';
import { CostStatement } from './CostStatement';

interface Props {
    baseRate: number;
    procedureName: string;
    providerName: string;
    onLiabilityChange?: (liability: number) => void;
}

const DEFINITIONS = {
    deductible: "The amount you pay for covered health care services before your insurance plan starts to pay. For example, with a $2,000 deductible, you pay the first $2,000 of covered services yourself.",
    coinsurance: "The percentage of costs of a covered health care service you pay (20%, for example) after you've paid your deductible."
};

export function LiabilityCalculator({ baseRate, procedureName, providerName, onLiabilityChange }: Props) {
    const [deductibleLeft, setDeductibleLeft] = useState(2000);
    const [coInsurance, setCoInsurance] = useState(20);
    const [maxPocket, setMaxPocket] = useState(7500);
    const [result, setResult] = useState<LiabilityResult | null>(null);

    // Tooltip State
    const [activeTooltip, setActiveTooltip] = useState<'deductible' | 'coinsurance' | null>(null);

    useEffect(() => {
        const res = calculateLiability({
            negotiatedRate: baseRate,
            remainingDeductible: deductibleLeft,
            coInsuranceRate: coInsurance / 100,
            outOfPocketMaxRemaining: maxPocket
        });
        setResult(res);
        onLiabilityChange?.(res.totalLiability);
    }, [baseRate, deductibleLeft, coInsurance, maxPocket, onLiabilityChange]);

    if (!result) return null;

    const coInsuranceOptions = [0, 10, 20, 30];

    // Helper for linear gradient calc (still used for slider track)
    const getGradient = (val: number, max: number) => {
        const pct = Math.min((val / max) * 100, 100);
        return `linear-gradient(to right, #10B981 0%, #10B981 ${pct}%, #D1FAE5 ${pct}%, #D1FAE5 100%)`;
    };

    // Build line items for the Cost Statement
    const insuranceAdjustment = baseRate * 0.15; // ~15% discount assumption
    const negotiatedRate = baseRate - insuranceAdjustment;

    const lineItems = [
        { label: 'Facility Fee', amount: Math.round(baseRate * 0.62) },
        { label: 'Surgeon Fee', amount: Math.round(baseRate * 0.18) },
        { label: 'Anesthesia', amount: Math.round(baseRate * 0.07) },
        { label: 'Implant/Hardware', amount: Math.round(baseRate * 0.13) },
        { label: 'GROSS CHARGES', amount: baseRate, isBold: true },
        { label: 'Insurance Adjustment', amount: insuranceAdjustment, isSubtraction: true },
        { label: 'NEGOTIATED RATE', amount: Math.round(negotiatedRate), isBold: true },
        { label: `Deductible (You Pay)`, amount: result.breakdown.deductiblePaid },
        { label: `Co-insurance (${coInsurance}%)`, amount: result.breakdown.coInsurancePaid },
    ];

    return (
        <div className="space-y-4">
            {/* 1. Bank Statement Style Cost Breakdown */}
            <CostStatement
                procedureName={procedureName}
                providerName={providerName}
                lineItems={lineItems}
                totalDue={Math.round(result.totalLiability)}
            />

            {/* 2. Your Plan Details - Bank Statement Card */}
            <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm font-mono text-[13px]">
                {/* Section Header */}
                <div className="border-b border-dashed border-stone-300 pb-3 mb-4">
                    <div className="flex items-center gap-2">
                        <span className="text-lg">⚙️</span>
                        <span className="font-bold text-stone-900 text-[14px] font-sans">ADJUST YOUR PLAN</span>
                    </div>
                    <p className="text-stone-400 text-[11px] mt-1">Customize to match your insurance details</p>
                </div>

                {/* Remaining Deductible */}
                <div className="mb-5">
                    <div className="flex justify-between items-center mb-3">
                        <button
                            onClick={() => setActiveTooltip('deductible')}
                            className="flex items-center gap-2 text-stone-600 hover:text-emerald-600 transition-colors"
                        >
                            <span className="font-sans text-[13px]">Remaining Deductible</span>
                            <Info className="w-3.5 h-3.5 text-stone-400" />
                        </button>
                        <span className="font-bold text-stone-900 font-sans text-[15px]">
                            ${deductibleLeft.toLocaleString()}
                        </span>
                    </div>

                    {/* Slider Track */}
                    <div className="relative h-8 flex items-center">
                        <input
                            type="range"
                            min="0"
                            max="5000"
                            step="100"
                            value={deductibleLeft}
                            onChange={(e) => setDeductibleLeft(Number(e.target.value))}
                            className="w-full absolute z-20 opacity-0 cursor-pointer h-full"
                        />
                        <div
                            className="w-full h-1.5 rounded-full absolute z-10 pointer-events-none"
                            style={{ background: getGradient(deductibleLeft, 5000) }}
                        />
                        <div
                            className="w-5 h-5 rounded-full border-2 border-emerald-500 shadow-md absolute z-20 pointer-events-none top-1/2 -translate-y-1/2"
                            style={{
                                left: `calc(${(deductibleLeft / 5000) * 100}% - 10px)`,
                                background: '#FFFFFF'
                            }}
                        />
                    </div>
                    <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                        <span>$0</span>
                        <span>$5,000</span>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-dashed border-stone-200 my-4" />

                {/* Co-Insurance */}
                <div>
                    <button
                        onClick={() => setActiveTooltip('coinsurance')}
                        className="flex items-center gap-2 text-stone-600 hover:text-emerald-600 transition-colors mb-3"
                    >
                        <span className="font-sans text-[13px]">Co-insurance Rate</span>
                        <Info className="w-3.5 h-3.5 text-stone-400" />
                    </button>
                    <div className="flex gap-2">
                        {coInsuranceOptions.map((opt) => (
                            <button
                                key={opt}
                                onClick={() => setCoInsurance(opt)}
                                className={`flex-1 py-2 rounded-lg text-[13px] font-medium font-sans border transition-all ${coInsurance === opt
                                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                                    : 'bg-stone-50 text-stone-600 border-stone-200 hover:border-stone-300'
                                    }`}
                            >
                                {opt}%
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tooltips Bottom Sheet */}
            <BottomSheet
                isOpen={!!activeTooltip}
                onClose={() => setActiveTooltip(null)}
                title={activeTooltip === 'deductible' ? 'Remaining Deductible' : 'Co-insurance'}
            >
                {activeTooltip && DEFINITIONS[activeTooltip]}
            </BottomSheet>
        </div>
    );
}
