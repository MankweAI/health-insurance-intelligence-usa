'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpDown, ArrowRight, Clock } from 'lucide-react';
import { CPTEntry, NegotiatedRate } from '@/types/us-tic';

interface ProcedureWithPricing {
    procedure: CPTEntry;
    rates: NegotiatedRate[];
    minPrice: number;
    maxPrice: number;
    avgPrice: number;
}

interface Props {
    providerSlug: string;
    procedures: ProcedureWithPricing[];
}

type SortKey = 'name' | 'category' | 'price';
type SortOrder = 'asc' | 'desc';

/**
 * UHC-NY Procedure Pricing Table Component
 * 
 * Displays all procedures offered at a provider with pricing.
 * Links to /uhc-ny/cost/[proc]/[prov] (no plan param).
 */
export function UhcNyProcedurePricingTable({ providerSlug, procedures }: Props) {
    const [sortKey, setSortKey] = useState<SortKey>('category');
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
    const [categoryFilter, setCategoryFilter] = useState<string>('all');

    // Get unique categories
    const categories = [...new Set(procedures.map(p => p.procedure.category))];

    // Filter and sort procedures
    const filteredProcedures = categoryFilter === 'all'
        ? procedures
        : procedures.filter(p => p.procedure.category === categoryFilter);

    const sortedProcedures = [...filteredProcedures].sort((a, b) => {
        let comparison = 0;
        switch (sortKey) {
            case 'name':
                comparison = a.procedure.name.localeCompare(b.procedure.name);
                break;
            case 'category':
                comparison = a.procedure.category.localeCompare(b.procedure.category);
                break;
            case 'price':
                comparison = a.minPrice - b.minPrice;
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

    const categoryColors: Record<string, string> = {
        'Inpatient': 'bg-red-50 text-red-700',
        'Outpatient': 'bg-blue-50 text-blue-700',
        'Imaging': 'bg-purple-50 text-purple-700',
        'Laboratory': 'bg-green-50 text-green-700',
        'Emergency': 'bg-orange-50 text-orange-700'
    };

    return (
        <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
            {/* Header */}
            <div className="px-5 py-4 border-b border-stone-100">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <h2 className="font-bold text-stone-800 text-[16px]">Procedures & Pricing</h2>
                        <p className="text-stone-500 text-[12px] mt-0.5">
                            {procedures.length} procedures available
                        </p>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                        {/* Category Filter */}
                        <div className="flex items-center gap-2">
                            <label className="text-stone-500 text-[12px]">Category:</label>
                            <select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="text-[13px] border border-stone-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            >
                                <option value="all">All</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        {/* UHC NY badge */}
                        <div className="text-[12px] text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                            UHC New York Rates
                        </div>
                    </div>
                </div>
            </div>

            {/* Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 bg-stone-50 border-b border-stone-100">
                <div className="col-span-5">
                    <SortButton label="Procedure" sortKeyValue="name" />
                </div>
                <div className="col-span-2 text-center">
                    <SortButton label="Category" sortKeyValue="category" />
                </div>
                <div className="col-span-2 text-center">
                    <span className="text-stone-500 text-[11px] uppercase tracking-wider">Duration</span>
                </div>
                <div className="col-span-2 text-right">
                    <SortButton label="Price" sortKeyValue="price" />
                </div>
                <div className="col-span-1"></div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-stone-100">
                {sortedProcedures.map((item) => {
                    const price = item.avgPrice;

                    return (
                        <Link
                            key={item.procedure.code}
                            href={`/uhc-ny/cost/${item.procedure.slug}/${providerSlug}`}
                            className="block hover:bg-stone-50 transition-colors"
                        >
                            <div className="grid grid-cols-12 gap-4 px-5 py-4 items-center">
                                {/* Procedure Name */}
                                <div className="col-span-12 md:col-span-5">
                                    <span className="font-medium text-stone-800 text-[14px] block">
                                        {item.procedure.name}
                                    </span>
                                    <span className="text-stone-500 text-[12px]">
                                        CPT {item.procedure.code}
                                    </span>
                                    {/* Mobile category */}
                                    <div className="md:hidden flex items-center gap-2 mt-1">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${categoryColors[item.procedure.category] || 'bg-stone-50 text-stone-700'}`}>
                                            {item.procedure.category}
                                        </span>
                                        <span className="text-stone-400 text-[11px]">{item.procedure.typicalDuration}</span>
                                    </div>
                                </div>

                                {/* Category (desktop) */}
                                <div className="hidden md:flex col-span-2 justify-center">
                                    <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${categoryColors[item.procedure.category] || 'bg-stone-50 text-stone-700'}`}>
                                        {item.procedure.category}
                                    </span>
                                </div>

                                {/* Duration (desktop) */}
                                <div className="hidden md:flex col-span-2 items-center justify-center gap-1 text-stone-500 text-[13px]">
                                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                                    {item.procedure.typicalDuration}
                                </div>

                                {/* Price */}
                                <div className="col-span-8 md:col-span-2 flex items-center justify-between md:justify-end">
                                    {price ? (
                                        <span className="font-bold text-stone-900 text-[15px]">
                                            ${price.toLocaleString()}
                                        </span>
                                    ) : (
                                        <span className="text-stone-400 text-[13px]">Not available</span>
                                    )}
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
                    Prices shown are median negotiated rates from UHC New York. Your actual cost depends on your deductible and coinsurance.
                </p>
            </div>
        </div>
    );
}
