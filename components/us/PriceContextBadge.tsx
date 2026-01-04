'use client';

import React from 'react';
import { TrendingDown, TrendingUp, Award, BarChart3 } from 'lucide-react';

interface Props {
    rank: number;
    total: number;
    percentile: number;
    difference: number;
    percentDiff: number;
    average: number;
}

/**
 * Price Context Badge Component
 * 
 * Displays contextual price comparison information to help users
 * understand if the current price is good or bad relative to market.
 * 
 * This adds unique SEO value by providing comparative context
 * that differentiates each page beyond raw data.
 */
export function PriceContextBadge({
    rank,
    total,
    percentile,
    difference,
    percentDiff,
    average
}: Props) {
    const isGoodDeal = difference < 0;
    const isNearAverage = Math.abs(percentDiff) <= 5;

    // Determine tier based on price comparison (primary) and rank (secondary)
    const getTier = () => {
        // Best deals: significantly below average OR in top 3
        if (rank <= 3) return { label: 'Best Price', color: 'emerald', icon: Award };
        if (percentDiff <= -15) return { label: 'Great Value', color: 'emerald', icon: TrendingDown };
        if (percentDiff < -5) return { label: 'Below Average', color: 'emerald', icon: TrendingDown };

        // Near average
        if (isNearAverage) return { label: 'Market Rate', color: 'blue', icon: BarChart3 };

        // Above average
        if (percentDiff < 15) return { label: 'Slightly Above', color: 'amber', icon: BarChart3 };
        return { label: 'Above Market', color: 'red', icon: TrendingUp };
    };

    const tier = getTier();
    const TierIcon = tier.icon;

    // Color classes based on tier
    const colorClasses: Record<string, { bg: string; border: string; text: string; badge: string }> = {
        emerald: {
            bg: 'bg-gradient-to-r from-emerald-50 to-green-50',
            border: 'border-emerald-200',
            text: 'text-emerald-700',
            badge: 'bg-emerald-100 text-emerald-800'
        },
        blue: {
            bg: 'bg-gradient-to-r from-blue-50 to-indigo-50',
            border: 'border-blue-200',
            text: 'text-blue-700',
            badge: 'bg-blue-100 text-blue-800'
        },
        amber: {
            bg: 'bg-gradient-to-r from-amber-50 to-yellow-50',
            border: 'border-amber-200',
            text: 'text-amber-700',
            badge: 'bg-amber-100 text-amber-800'
        },
        red: {
            bg: 'bg-gradient-to-r from-red-50 to-orange-50',
            border: 'border-red-200',
            text: 'text-red-700',
            badge: 'bg-red-100 text-red-800'
        }
    };

    const colors = colorClasses[tier.color];

    // Use consistent locale for hydration
    const formatUSD = (value: number) => value.toLocaleString('en-US');

    return (
        <div className={`${colors.bg} ${colors.border} border rounded-xl p-4 mt-4`}>
            {/* Main Value Proposition */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <div className={`${colors.badge} p-1.5 rounded-lg`}>
                        <TierIcon className="w-4 h-4" />
                    </div>
                    <span className={`font-semibold text-[13px] ${colors.text}`}>
                        {tier.label}
                    </span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${colors.badge}`}>
                    #{rank} of {total} providers
                </span>
            </div>

            {/* Comparison Details */}
            <div className="grid grid-cols-2 gap-3">
                {/* vs Average */}
                <div className="bg-white/60 rounded-lg p-3">
                    <p className="text-stone-400 text-[10px] uppercase tracking-wider mb-1">
                        vs. Market Average
                    </p>
                    <div className="flex items-center gap-1.5">
                        {isGoodDeal ? (
                            <TrendingDown className="w-4 h-4 text-emerald-500" />
                        ) : isNearAverage ? (
                            <BarChart3 className="w-4 h-4 text-amber-500" />
                        ) : (
                            <TrendingUp className="w-4 h-4 text-red-500" />
                        )}
                        <span className={`font-bold text-[14px] ${isGoodDeal ? 'text-emerald-600' : isNearAverage ? 'text-amber-600' : 'text-red-600'
                            }`}>
                            {isGoodDeal ? '' : '+'}${formatUSD(Math.abs(Math.round(difference)))}
                        </span>
                        <span className={`text-[11px] ${isGoodDeal ? 'text-emerald-500' : isNearAverage ? 'text-amber-500' : 'text-red-500'
                            }`}>
                            ({isGoodDeal ? '' : '+'}{percentDiff}%)
                        </span>
                    </div>
                </div>

                {/* Market Average Reference */}
                <div className="bg-white/60 rounded-lg p-3">
                    <p className="text-stone-400 text-[10px] uppercase tracking-wider mb-1">
                        Market Average
                    </p>
                    <p className="font-medium text-stone-700 text-[14px]">
                        ${formatUSD(Math.round(average))}
                    </p>
                </div>
            </div>

            {/* Contextual Message */}
            <p className="text-stone-500 text-[11px] mt-3 leading-relaxed">
                {isGoodDeal ? (
                    <>
                        This provider's negotiated rate is <span className="font-medium text-emerald-600">${formatUSD(Math.abs(Math.round(difference)))} below</span> the
                        average across {total} in-network providers for your plan.
                    </>
                ) : isNearAverage ? (
                    <>
                        This provider's rate is <span className="font-medium text-amber-600">near the market average</span> across {total} in-network providers.
                    </>
                ) : (
                    <>
                        This provider's rate is <span className="font-medium text-red-600">${formatUSD(Math.round(difference))} above</span> the
                        average. Consider comparing with nearby options below.
                    </>
                )}
            </p>
        </div>
    );
}
