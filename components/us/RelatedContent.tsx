'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, TrendingDown, TrendingUp, Minus } from 'lucide-react';
import {
    getCPTBySlug,
    getProviderBySlug,
    getRelatedProcedures,
    getNearbyProviders,
    getRatesForProcedureByPlan,
    getNegotiatedRate,
    CPT_ENCYCLOPEDIA,
    PROVIDERS
} from '@/data';

interface Props {
    currentProcedure: string;
    currentProvider: string;
    currentPlan: string;
}

/**
 * Contextual Related Content Component
 * 
 * Generates related content links based on actual data relationships:
 * - Related procedures (from CPT code relationships)
 * - Nearby providers (geographic proximity)
 * - Price comparison with other providers
 */
export function RelatedContent({ currentProcedure, currentProvider, currentPlan }: Props) {
    const procedure = getCPTBySlug(currentProcedure);
    const provider = getProviderBySlug(currentProvider);

    if (!procedure || !provider) return null;

    // ========================================================================
    // 1. GET RELATED PROCEDURES (from CPT code relationships)
    // ========================================================================
    const relatedProcedures = getRelatedProcedures(procedure.code);

    // If no related codes, fall back to same-category procedures
    const sameCategoryProcedures = relatedProcedures.length > 0
        ? relatedProcedures
        : CPT_ENCYCLOPEDIA.filter(p => p.category === procedure.category && p.code !== procedure.code).slice(0, 3);

    // ========================================================================
    // 2. GET NEARBY PROVIDERS (geographic proximity)
    // ========================================================================
    const nearbyProviders = provider.address.coordinates
        ? getNearbyProviders(
            provider.address.coordinates.lat,
            provider.address.coordinates.lng,
            100, // 100 mile radius
            provider.npi
        ).slice(0, 3)
        : PROVIDERS.filter(p => p.npi !== provider.npi).slice(0, 3);

    // ========================================================================
    // 3. GET PRICE COMPARISON DATA
    // ========================================================================
    const currentRate = getNegotiatedRate(procedure.code, provider.npi, currentPlan);
    const allRatesForProcedure = getRatesForProcedureByPlan(procedure.code, currentPlan);

    // Calculate price comparison for nearby providers
    const providerPriceComparison = nearbyProviders.map(p => {
        const rate = getNegotiatedRate(procedure.code, p.npi, currentPlan);
        const priceDiff = rate && currentRate
            ? ((rate.negotiatedRate - currentRate.negotiatedRate) / currentRate.negotiatedRate) * 100
            : null;

        return {
            ...p,
            rate: rate?.negotiatedRate,
            priceDiff
        };
    });

    // Calculate average and rank
    const avgPrice = allRatesForProcedure.length > 0
        ? allRatesForProcedure.reduce((sum, r) => sum + r.negotiatedRate, 0) / allRatesForProcedure.length
        : null;

    const priceRank = currentRate && allRatesForProcedure.length > 0
        ? allRatesForProcedure.filter(r => r.negotiatedRate < currentRate.negotiatedRate).length + 1
        : null;

    return (
        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm">
            {/* Header */}
            <div className="border-b border-dashed border-stone-300 pb-3 mb-4">
                <div className="flex items-center gap-2">
                    <span className="text-lg">🔗</span>
                    <span className="font-bold text-stone-900 text-[14px] font-sans">COMPARE & EXPLORE</span>
                </div>
            </div>

            <div className="space-y-5">
                {/* Price Ranking Banner */}
                {priceRank && avgPrice && currentRate && (
                    <div className={`rounded-lg p-4 ${priceRank <= 3
                            ? 'bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-100'
                            : priceRank <= 6
                                ? 'bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-100'
                                : 'bg-gradient-to-r from-red-50 to-orange-50 border border-red-100'
                        }`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-stone-500 text-[10px] uppercase tracking-wider mb-1">Price Ranking</p>
                                <p className="font-bold text-stone-900 text-[15px] font-sans">
                                    #{priceRank} of {allRatesForProcedure.length} providers
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-stone-500 text-[10px] uppercase tracking-wider mb-1">vs. Average</p>
                                <p className={`font-bold text-[15px] font-sans ${currentRate.negotiatedRate < avgPrice ? 'text-emerald-600' : 'text-red-600'
                                    }`}>
                                    {currentRate.negotiatedRate < avgPrice ? '-' : '+'}
                                    ${Math.abs(Math.round(currentRate.negotiatedRate - avgPrice)).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Same Procedure at Other Providers */}
                {providerPriceComparison.length > 0 && (
                    <div>
                        <p className="text-stone-400 text-[10px] uppercase tracking-wider mb-3">
                            {procedure.name} at Nearby Hospitals
                        </p>
                        <div className="space-y-2">
                            {providerPriceComparison.map((p) => (
                                <Link
                                    key={p.slug}
                                    href={`/cost/${currentProcedure}/${p.slug}/${currentPlan}`}
                                    className="flex items-center justify-between p-3 bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors group"
                                >
                                    <div className="min-w-0 flex-1">
                                        <span className="text-stone-700 text-[13px] font-sans block truncate">{p.name}</span>
                                        <span className="text-stone-400 text-[11px]">{p.address.city}, {p.address.state}</span>
                                    </div>
                                    <div className="flex items-center gap-3 ml-3">
                                        {p.rate && (
                                            <div className="flex items-center gap-1 text-right">
                                                <span className="text-stone-900 text-[13px] font-medium font-sans">
                                                    ${p.rate.toLocaleString()}
                                                </span>
                                                {p.priceDiff !== null && (
                                                    <span className={`flex items-center text-[11px] ${p.priceDiff < 0
                                                            ? 'text-emerald-600'
                                                            : p.priceDiff > 0
                                                                ? 'text-red-500'
                                                                : 'text-stone-400'
                                                        }`}>
                                                        {p.priceDiff < 0 ? (
                                                            <TrendingDown className="w-3 h-3" />
                                                        ) : p.priceDiff > 0 ? (
                                                            <TrendingUp className="w-3 h-3" />
                                                        ) : (
                                                            <Minus className="w-3 h-3" />
                                                        )}
                                                        {Math.abs(Math.round(p.priceDiff))}%
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                        <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-600 transition-colors" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Related Procedures */}
                {sameCategoryProcedures.length > 0 && (
                    <div className="border-t border-dashed border-stone-200 pt-4">
                        <p className="text-stone-400 text-[10px] uppercase tracking-wider mb-3">
                            Related Procedures at {provider.name.split(' ').slice(0, 2).join(' ')}
                        </p>
                        <div className="space-y-2">
                            {sameCategoryProcedures.slice(0, 3).map((proc) => {
                                const rate = getNegotiatedRate(proc.code, provider.npi, currentPlan);
                                return (
                                    <Link
                                        key={proc.slug}
                                        href={`/cost/${proc.slug}/${currentProvider}/${currentPlan}`}
                                        className="flex items-center justify-between p-3 bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors group"
                                    >
                                        <div className="min-w-0 flex-1">
                                            <span className="text-stone-700 text-[13px] font-sans block truncate">{proc.name}</span>
                                            <span className="text-stone-400 text-[11px]">CPT {proc.code} • {proc.category}</span>
                                        </div>
                                        <div className="flex items-center gap-3 ml-3">
                                            {rate && (
                                                <span className="text-stone-900 text-[13px] font-medium font-sans">
                                                    ${rate.negotiatedRate.toLocaleString()}
                                                </span>
                                            )}
                                            <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-600 transition-colors" />
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
