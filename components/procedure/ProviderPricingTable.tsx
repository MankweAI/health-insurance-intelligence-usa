'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpDown, ArrowRight, Star, MapPin } from 'lucide-react';
import { UsProvider, NegotiatedRate } from '@/types/us-tic';
import { QualityBadge } from '@/components/hub/QualityScoreCard';
import { PLANS } from '@/data';

interface ProviderWithPricing {
    provider: UsProvider;
    rates: NegotiatedRate[];
    minPrice: number;
    maxPrice: number;
    avgPrice: number;
}

interface Props {
    procedureSlug: string;
    providers: ProviderWithPricing[];
}

type SortKey = 'name' | 'price' | 'rating' | 'location';
type SortOrder = 'asc' | 'desc';

/**
 * Provider Pricing Table Component
 * 
 * Displays all providers offering a procedure with pricing comparison.
 * Sortable by name, price, rating, or location.
 */
export function ProviderPricingTable({ procedureSlug, providers }: Props) {
    const [sortKey, setSortKey] = useState<SortKey>('price');
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
    const [selectedPlan, setSelectedPlan] = useState<string>(PLANS[0]?.slug || '');

    // Calculate average price across all providers
    const overallAvg = providers.length > 0
        ? Math.round(providers.reduce((sum, p) => sum + p.avgPrice, 0) / providers.length)
        : 0;

    // Sort providers
    const sortedProviders = [...providers].sort((a, b) => {
        let comparison = 0;
        switch (sortKey) {
            case 'name':
                comparison = a.provider.name.localeCompare(b.provider.name);
                break;
            case 'price':
                comparison = a.minPrice - b.minPrice;
                break;
            case 'rating':
                comparison = (b.provider.metrics.cmsStarRating || 0) - (a.provider.metrics.cmsStarRating || 0);
                break;
            case 'location':
                comparison = a.provider.address.state.localeCompare(b.provider.address.state);
                break;
        }
        return sortOrder === 'asc' ? comparison : -comparison;
    });

    const handleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortOrder('asc');
        }
    };

    const SortButton = ({ label, sortKeyValue }: { label: string; sortKeyValue: SortKey }) => (
        <button
            onClick={() => handleSort(sortKeyValue)}
            className={`flex items-center gap-1 text-[11px] uppercase tracking-wider font-medium hover:text-emerald-600 transition-colors ${sortKey === sortKeyValue ? 'text-emerald-600' : 'text-stone-500'
                }`}
        >
            {label}
            <ArrowUpDown className="w-3 h-3" />
        </button>
    );

    // Get price for currently selected plan
    const getPriceForPlan = (providerData: ProviderWithPricing) => {
        const rate = providerData.rates.find(r => r.planSlug === selectedPlan);
        return rate?.negotiatedRate;
    };

    return (
        <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
            {/* Header */}
            <div className="px-5 py-4 border-b border-stone-100">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <h2 className="font-bold text-stone-800 text-[16px]">Compare Providers</h2>
                        <p className="text-stone-500 text-[12px] mt-0.5">
                            {providers.length} providers • Average: ${overallAvg.toLocaleString()}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="text-stone-500 text-[12px]">Insurance:</label>
                        <select
                            value={selectedPlan}
                            onChange={(e) => setSelectedPlan(e.target.value)}
                            className="text-[13px] border border-stone-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                            {PLANS.map(plan => (
                                <option key={plan.slug} value={plan.slug}>
                                    {plan.payerName} - {plan.planName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 bg-stone-50 border-b border-stone-100">
                <div className="col-span-4">
                    <SortButton label="Provider" sortKeyValue="name" />
                </div>
                <div className="col-span-2 text-center">
                    <SortButton label="Rating" sortKeyValue="rating" />
                </div>
                <div className="col-span-3">
                    <SortButton label="Location" sortKeyValue="location" />
                </div>
                <div className="col-span-2 text-right">
                    <SortButton label="Price" sortKeyValue="price" />
                </div>
                <div className="col-span-1"></div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-stone-100">
                {sortedProviders.map((item, index) => {
                    const price = getPriceForPlan(item);
                    const priceDiff = price && overallAvg ? price - overallAvg : 0;
                    const isLowest = index === 0 && sortKey === 'price' && sortOrder === 'asc';

                    return (
                        <Link
                            key={item.provider.npi}
                            href={`/cost/${procedureSlug}/${item.provider.slug}/${selectedPlan}`}
                            className="block hover:bg-stone-50 transition-colors"
                        >
                            <div className="grid grid-cols-12 gap-4 px-5 py-4 items-center">
                                {/* Provider Name */}
                                <div className="col-span-12 md:col-span-4">
                                    <div className="flex items-center gap-2">
                                        {isLowest && (
                                            <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-700 text-[9px] uppercase tracking-wider font-bold rounded">
                                                Lowest
                                            </span>
                                        )}
                                        <span className="font-medium text-stone-800 text-[14px]">
                                            {item.provider.name}
                                        </span>
                                    </div>
                                    <div className="md:hidden flex items-center gap-3 mt-1 text-[12px] text-stone-500">
                                        <QualityBadge
                                            rating={item.provider.metrics.cmsStarRating}
                                            score={item.provider.metrics.patientExperienceScore}
                                        />
                                        <span>{item.provider.address.city}, {item.provider.address.state}</span>
                                    </div>
                                </div>

                                {/* Rating (desktop) */}
                                <div className="hidden md:flex col-span-2 justify-center">
                                    <QualityBadge
                                        rating={item.provider.metrics.cmsStarRating}
                                        score={item.provider.metrics.patientExperienceScore}
                                    />
                                </div>

                                {/* Location (desktop) */}
                                <div className="hidden md:flex col-span-3 items-center gap-1 text-stone-600 text-[13px]">
                                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                                    {item.provider.address.city}, {item.provider.address.state}
                                </div>

                                {/* Price */}
                                <div className="col-span-8 md:col-span-2 flex items-center justify-between md:justify-end gap-2">
                                    <div className="text-right">
                                        {price ? (
                                            <>
                                                <span className="font-bold text-stone-900 text-[15px]">
                                                    ${price.toLocaleString()}
                                                </span>
                                                {priceDiff !== 0 && (
                                                    <span className={`block text-[11px] ${priceDiff < 0 ? 'text-emerald-600' : 'text-red-500'
                                                        }`}>
                                                        {priceDiff > 0 ? '+' : ''}${priceDiff.toLocaleString()} vs avg
                                                    </span>
                                                )}
                                            </>
                                        ) : (
                                            <span className="text-stone-400 text-[13px]">Not available</span>
                                        )}
                                    </div>
                                </div>

                                {/* Arrow */}
                                <div className="col-span-4 md:col-span-1 flex justify-end">
                                    <ArrowRight className="w-5 h-5 text-stone-300" />
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Footer */}
            <div className="px-5 py-3 bg-stone-50 border-t border-stone-100 text-center">
                <p className="text-stone-500 text-[11px]">
                    Prices shown are negotiated rates for the selected insurance plan. Your actual cost depends on your deductible and coinsurance.
                </p>
            </div>
        </div>
    );
}
