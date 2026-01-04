'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowUpDown, ArrowRight, MapPin, Search, X } from 'lucide-react';
import { UsProvider, NegotiatedRate } from '@/types/us-tic';
import { QualityBadge } from '@/components/hub/QualityScoreCard';

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

const DISPLAY_INCREMENT = 5;

/**
 * UHC-NY Provider Pricing Table Component
 * 
 * Displays providers offering a procedure with pricing comparison.
 * Links to /uhc-ny/cost/[proc]/[prov] (no plan param needed).
 */
export function UhcNyProviderPricingTable({ procedureSlug, providers }: Props) {
    const [sortKey, setSortKey] = useState<SortKey>('price');
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
    const [searchQuery, setSearchQuery] = useState('');
    const [displayCount, setDisplayCount] = useState(DISPLAY_INCREMENT);

    // Calculate average price across all providers
    const overallAvg = providers.length > 0
        ? Math.round(providers.reduce((sum, p) => sum + p.avgPrice, 0) / providers.length)
        : 0;

    // Filter providers based on search query
    const filteredProviders = useMemo(() => {
        if (!searchQuery.trim()) return providers;

        const query = searchQuery.toLowerCase().trim();

        const priceSearch = query.startsWith('$')
            ? parseFloat(query.slice(1).replace(/,/g, ''))
            : !isNaN(parseFloat(query)) ? parseFloat(query.replace(/,/g, '')) : null;

        return providers.filter(item => {
            const name = item.provider.name.toLowerCase();
            const city = item.provider.address.city.toLowerCase();
            const state = item.provider.address.state.toLowerCase();
            const price = item.avgPrice;

            if (name.includes(query) || city.includes(query) || state.includes(query)) {
                return true;
            }

            if (priceSearch !== null && !isNaN(priceSearch)) {
                const tolerance = priceSearch * 0.2;
                if (price >= priceSearch - tolerance && price <= priceSearch + tolerance) {
                    return true;
                }
            }

            return false;
        });
    }, [providers, searchQuery]);

    // Sort providers
    const sortedProviders = useMemo(() => {
        return [...filteredProviders].sort((a, b) => {
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
    }, [filteredProviders, sortKey, sortOrder]);

    // Apply display limit
    const displayedProviders = sortedProviders.slice(0, displayCount);
    const hasMore = sortedProviders.length > displayCount;

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

    return (
        <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
            {/* Header */}
            <div className="px-5 py-4 border-b border-stone-100">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <h2 className="font-bold text-stone-800 text-[16px]">Compare Providers</h2>
                        <p className="text-stone-500 text-[12px] mt-0.5">
                            {filteredProviders.length} of {providers.length} providers • Average: ${overallAvg.toLocaleString()}
                        </p>
                    </div>
                    <div className="text-[12px] text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        UHC New York Rates
                    </div>
                </div>

                {/* Search Input */}
                <div className="mt-3 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setDisplayCount(DISPLAY_INCREMENT);
                        }}
                        placeholder="Search by provider name, city, state, or price (e.g., $15000)"
                        className="w-full pl-10 pr-10 py-2 text-[13px] border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
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
                {displayedProviders.length === 0 ? (
                    <div className="px-5 py-8 text-center text-stone-500">
                        <p className="text-[14px]">No providers match your search.</p>
                        <button
                            onClick={() => setSearchQuery('')}
                            className="mt-2 text-emerald-600 text-[13px] hover:underline"
                        >
                            Clear search
                        </button>
                    </div>
                ) : (
                    displayedProviders.map((item, index) => {
                        const price = item.avgPrice;
                        const priceDiff = price && overallAvg ? price - overallAvg : 0;
                        const isLowest = index === 0 && sortKey === 'price' && sortOrder === 'asc' && !searchQuery;

                        return (
                            <Link
                                key={item.provider.npi}
                                href={`/uhc-ny/cost/${procedureSlug}/${item.provider.slug}`}
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
                    })
                )}
            </div>

            {/* Load More */}
            {hasMore && (
                <div className="px-5 py-3 border-t border-stone-100 text-center">
                    <button
                        onClick={() => setDisplayCount(prev => prev + DISPLAY_INCREMENT)}
                        className="text-emerald-600 text-[13px] font-medium hover:underline"
                    >
                        Load more ({Math.min(DISPLAY_INCREMENT, sortedProviders.length - displayCount)} of {sortedProviders.length - displayCount} remaining)
                    </button>
                </div>
            )}

            {/* Footer */}
            <div className="px-5 py-3 bg-stone-50 border-t border-stone-100 text-center">
                <p className="text-stone-500 text-[11px]">
                    Prices shown are median negotiated rates from UHC New York. Your actual cost depends on your deductible and coinsurance.
                </p>
            </div>
        </div>
    );
}
