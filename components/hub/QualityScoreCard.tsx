'use client';

import React from 'react';
import { Star, TrendingDown, TrendingUp, Minus } from 'lucide-react';
import { ProviderMetrics } from '@/types/us-tic';

interface Props {
    metrics: ProviderMetrics;
    compact?: boolean;
}

/**
 * Quality Score Card Component
 * 
 * Displays CMS quality metrics with visual indicators.
 */
export function QualityScoreCard({ metrics, compact = false }: Props) {
    const { cmsStarRating, patientExperienceScore, hacScore, readmissionRate, metricsAsOf } = metrics;

    // Star rating display
    const StarRating = ({ rating }: { rating: number | null }) => {
        if (!rating) return <span className="text-stone-400 text-[12px]">Not rated</span>;
        return (
            <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`w-4 h-4 ${star <= rating
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-stone-200'
                            }`}
                    />
                ))}
            </div>
        );
    };

    if (compact) {
        return (
            <div className="inline-flex items-center gap-2">
                <StarRating rating={cmsStarRating} />
                {patientExperienceScore && (
                    <span className="text-stone-500 text-[12px]">
                        {patientExperienceScore}/100
                    </span>
                )}
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
                <span className="text-amber-700 text-[10px] uppercase tracking-wider font-medium">
                    CMS Quality Metrics
                </span>
                <span className="text-amber-500 text-[10px]">
                    Updated {metricsAsOf}
                </span>
            </div>

            <div className="space-y-3">
                {/* Star Rating */}
                <div className="flex items-center justify-between">
                    <span className="text-stone-600 text-[13px]">Hospital Rating</span>
                    <StarRating rating={cmsStarRating} />
                </div>

                {/* Patient Experience */}
                {patientExperienceScore && (
                    <div className="flex items-center justify-between">
                        <span className="text-stone-600 text-[13px]">Patient Experience</span>
                        <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-stone-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-emerald-500 rounded-full"
                                    style={{ width: `${patientExperienceScore}%` }}
                                />
                            </div>
                            <span className="text-stone-700 text-[13px] font-medium w-12 text-right">
                                {patientExperienceScore}/100
                            </span>
                        </div>
                    </div>
                )}

                {/* Readmission Rate */}
                {readmissionRate && (
                    <div className="flex items-center justify-between">
                        <span className="text-stone-600 text-[13px]">Readmission Rate</span>
                        <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${readmissionRate === 'Below'
                                ? 'bg-green-100 text-green-700'
                                : readmissionRate === 'Above'
                                    ? 'bg-red-100 text-red-700'
                                    : 'bg-stone-100 text-stone-600'
                            }`}>
                            {readmissionRate === 'Below' && <TrendingDown className="w-3 h-3 inline mr-1" />}
                            {readmissionRate === 'Above' && <TrendingUp className="w-3 h-3 inline mr-1" />}
                            {readmissionRate === 'Average' && <Minus className="w-3 h-3 inline mr-1" />}
                            {readmissionRate} National Average
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}

/**
 * Compact inline quality indicator
 */
export function QualityBadge({ rating, score }: { rating: number | null; score?: number | null }) {
    if (!rating) return null;

    return (
        <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-amber-50 rounded-md">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-amber-700 text-[12px] font-medium">{rating}.0</span>
            {score && (
                <>
                    <span className="text-amber-300">•</span>
                    <span className="text-amber-600 text-[11px]">{score}/100</span>
                </>
            )}
        </div>
    );
}
