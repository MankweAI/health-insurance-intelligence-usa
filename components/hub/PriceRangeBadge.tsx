'use client';

import React from 'react';
import { TrendingDown, TrendingUp, Minus } from 'lucide-react';

interface Props {
    low: number;
    high: number;
    median?: number;
    comparisonLabel?: string;
    size?: 'sm' | 'md' | 'lg';
}

/**
 * Price Range Badge Component
 * 
 * Displays a price range with optional median and comparison indicator.
 */
export function PriceRangeBadge({ low, high, median, comparisonLabel, size = 'md' }: Props) {
    const sizeClasses = {
        sm: 'text-[13px]',
        md: 'text-[15px]',
        lg: 'text-[18px]'
    };

    return (
        <div className="inline-flex items-center gap-2">
            <span className={`font-bold text-stone-900 font-sans ${sizeClasses[size]}`}>
                ${low.toLocaleString()} – ${high.toLocaleString()}
            </span>
            {median && (
                <span className="text-stone-400 text-[11px]">
                    (median: ${median.toLocaleString()})
                </span>
            )}
        </div>
    );
}

interface SinglePriceProps {
    price: number;
    previousPrice?: number;
    size?: 'sm' | 'md' | 'lg';
}

/**
 * Single Price Badge with optional change indicator
 */
export function PriceBadge({ price, previousPrice, size = 'md' }: SinglePriceProps) {
    const sizeClasses = {
        sm: 'text-[13px]',
        md: 'text-[15px]',
        lg: 'text-[18px]'
    };

    const percentChange = previousPrice
        ? Math.round(((price - previousPrice) / previousPrice) * 100)
        : null;

    return (
        <div className="inline-flex items-center gap-2">
            <span className={`font-bold text-stone-900 font-sans ${sizeClasses[size]}`}>
                ${price.toLocaleString()}
            </span>
            {percentChange !== null && percentChange !== 0 && (
                <span className={`flex items-center gap-0.5 text-[11px] font-medium ${percentChange < 0 ? 'text-emerald-600' : 'text-red-500'
                    }`}>
                    {percentChange < 0 ? (
                        <TrendingDown className="w-3 h-3" />
                    ) : (
                        <TrendingUp className="w-3 h-3" />
                    )}
                    {Math.abs(percentChange)}%
                </span>
            )}
        </div>
    );
}

interface PriceComparisonProps {
    currentPrice: number;
    averagePrice: number;
    label?: string;
}

/**
 * Price vs Average Comparison Badge
 */
export function PriceVsAverageBadge({ currentPrice, averagePrice, label }: PriceComparisonProps) {
    const difference = currentPrice - averagePrice;
    const percentDiff = Math.round((difference / averagePrice) * 100);
    const isBelow = difference < 0;

    return (
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-medium ${isBelow
                ? 'bg-emerald-50 text-emerald-700'
                : difference === 0
                    ? 'bg-stone-100 text-stone-600'
                    : 'bg-red-50 text-red-700'
            }`}>
            {isBelow ? (
                <TrendingDown className="w-3.5 h-3.5" />
            ) : difference === 0 ? (
                <Minus className="w-3.5 h-3.5" />
            ) : (
                <TrendingUp className="w-3.5 h-3.5" />
            )}
            <span>
                {isBelow ? '' : '+'}${difference.toLocaleString()} ({isBelow ? '' : '+'}{percentDiff}%)
            </span>
            {label && <span className="text-stone-400 ml-1">{label}</span>}
        </div>
    );
}
