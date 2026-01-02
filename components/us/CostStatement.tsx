'use client';

import React from 'react';

interface LineItem {
    label: string;
    amount: number;
    isSubtraction?: boolean;
    isBold?: boolean;
    isTotal?: boolean;
}

interface Props {
    procedureName: string;
    providerName: string;
    lineItems: LineItem[];
    totalDue: number;
}

export function CostStatement({ procedureName, providerName, lineItems, totalDue }: Props) {
    const today = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    const formatCurrency = (amount: number, isSubtraction?: boolean) => {
        const formatted = `$${Math.abs(amount).toLocaleString()}`;
        return isSubtraction ? `-${formatted}` : formatted;
    };

    return (
        <div className="border border-stone-200 rounded-2xl p-5 shadow-sm font-mono text-[13px]">
            {/* Header */}
            <div className="border-b border-dashed border-stone-300 pb-4 mb-4">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">🏥</span>
                    <span className="font-bold text-stone-900 text-[14px] font-sans">{providerName}</span>
                </div>
                <p className="text-stone-600 font-sans text-[13px]">{procedureName}</p>
                <p className="text-stone-400 text-[11px] mt-1">{today}</p>
            </div>

            {/* Line Items */}
            <div className="space-y-2">
                {lineItems.map((item, idx) => (
                    <div
                        key={idx}
                        className={`flex justify-between items-center ${item.isTotal ? 'border-t-2 border-double border-stone-400 pt-3 mt-3' : ''}`}
                    >
                        <span className={`${item.isBold ? 'font-bold text-stone-900' : 'text-stone-600'} ${item.isTotal ? 'font-sans text-[15px]' : ''}`}>
                            {item.label}
                            {!item.isTotal && !item.isBold && (
                                <span className="text-stone-300 mx-1">{'·'.repeat(Math.max(2, 30 - item.label.length))}</span>
                            )}
                        </span>
                        <span className={`
              ${item.isSubtraction ? 'text-emerald-600' : 'text-stone-900'}
              ${item.isBold || item.isTotal ? 'font-bold' : ''}
              ${item.isTotal ? 'text-[18px] font-sans' : ''}
              tracking-wide
            `}>
                            {formatCurrency(item.amount, item.isSubtraction)}
                        </span>
                    </div>
                ))}
            </div>

            {/* Total Due */}
            <div className="border-t-2 border-double border-emerald-500 mt-4 pt-4">
                <div className="flex justify-between items-center">
                    <span className="font-bold text-stone-900 font-sans text-[16px]">YOUR TOTAL DUE</span>
                    <span className="font-black text-emerald-600 text-[22px] font-sans tracking-tight">
                        ${totalDue.toLocaleString()}
                    </span>
                </div>
            </div>
        </div>
    );
}
