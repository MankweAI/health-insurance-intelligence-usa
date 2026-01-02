'use client';

import React from 'react';
import { ExternalLink, Star, Award, Clock, Building2 } from 'lucide-react';
import { getProviderBySlug, type UsProvider, type ProviderAddress } from '@/data';

interface Props {
    name: string;
    npi: string;
    address: ProviderAddress;
}

/**
 * Rich Provider Information Component
 * 
 * Displays provider details including CMS quality metrics.
 * This provides unique, valuable content that differentiates each provider.
 */
export function ProviderInfo({ name, npi, address }: Props) {
    // Look up provider by NPI to get enriched data
    const provider = getProviderBySlug(name.toLowerCase().replace(/[\s-]+/g, '-'));

    const fullAddress = `${address.street}, ${address.city}, ${address.state} ${address.zip}`;
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;

    // Star rating component
    const StarRating = ({ rating }: { rating: number | null }) => {
        if (!rating) return <span className="text-stone-400 text-[12px]">Not rated</span>;
        return (
            <div className="flex items-center gap-1">
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

    return (
        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm">
            {/* Header */}
            <div className="border-b border-dashed border-stone-300 pb-3 mb-4">
                <div className="flex items-center gap-2">
                    <span className="text-lg">🏥</span>
                    <span className="font-bold text-stone-900 text-[14px] font-sans">ABOUT THIS PROVIDER</span>
                </div>
            </div>

            {/* Content */}
            <div className="space-y-4">
                {/* Name and Address */}
                <div>
                    <h3 className="font-bold text-stone-900 text-[15px] font-sans mb-2">{name}</h3>
                    <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-stone-600 text-[13px] font-sans leading-relaxed hover:text-emerald-600 transition-colors"
                    >
                        {fullAddress}
                    </a>
                </div>

                {/* CMS Quality Rating */}
                {provider?.metrics && (
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-amber-700 text-[10px] uppercase tracking-wider font-medium">CMS Quality Rating</span>
                            <span className="text-amber-500 text-[10px]">
                                Updated {provider.metrics.metricsAsOf}
                            </span>
                        </div>
                        <StarRating rating={provider.metrics.cmsStarRating} />
                        {provider.metrics.patientExperienceScore && (
                            <p className="text-amber-700 text-[11px] mt-2">
                                Patient Experience Score: <span className="font-bold">{provider.metrics.patientExperienceScore}/100</span>
                            </p>
                        )}
                    </div>
                )}

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-stone-50 rounded-lg p-3">
                        <p className="text-stone-400 text-[10px] uppercase tracking-wider mb-1">NPI Number</p>
                        <p className="font-bold text-stone-900 text-[14px]">{npi}</p>
                    </div>
                    {provider?.traumaLevel && provider.traumaLevel !== 'Not Designated' && (
                        <div className="bg-red-50 rounded-lg p-3">
                            <p className="text-red-400 text-[10px] uppercase tracking-wider mb-1">Trauma Center</p>
                            <p className="font-bold text-red-700 text-[14px] font-sans">{provider.traumaLevel}</p>
                        </div>
                    )}
                </div>

                {/* Facility Info */}
                {provider && (
                    <div className="grid grid-cols-2 gap-3">
                        {provider.bedCount && (
                            <div className="bg-stone-50 rounded-lg p-3 flex items-center gap-2">
                                <Building2 className="w-4 h-4 text-stone-400" />
                                <div>
                                    <p className="text-stone-400 text-[10px] uppercase tracking-wider">Beds</p>
                                    <p className="font-medium text-stone-900 text-[13px]">{provider.bedCount.toLocaleString()}</p>
                                </div>
                            </div>
                        )}
                        {provider.averageWaitDays && (
                            <div className="bg-stone-50 rounded-lg p-3 flex items-center gap-2">
                                <Clock className="w-4 h-4 text-stone-400" />
                                <div>
                                    <p className="text-stone-400 text-[10px] uppercase tracking-wider">Avg Wait</p>
                                    <p className="font-medium text-stone-900 text-[13px]">{provider.averageWaitDays} days</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Specializations */}
                {provider?.specializations && provider.specializations.length > 0 && (
                    <div className="border-t border-dashed border-stone-200 pt-4">
                        <p className="text-stone-400 text-[10px] uppercase tracking-wider mb-2">Specializations</p>
                        <div className="flex flex-wrap gap-1.5">
                            {provider.specializations.map((spec, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 bg-emerald-50 text-emerald-700 text-[11px] rounded-md font-sans"
                                >
                                    {spec}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Certifications */}
                {provider?.certifications && provider.certifications.length > 0 && (
                    <div className="border-t border-dashed border-stone-200 pt-4">
                        <p className="text-stone-400 text-[10px] uppercase tracking-wider mb-2">Certifications</p>
                        <div className="flex flex-wrap gap-2">
                            {provider.certifications.map((cert, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-[11px] rounded-md font-sans"
                                >
                                    <Award className="w-3 h-3" />
                                    {cert}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Readmission Rate */}
                {provider?.metrics?.readmissionRate && (
                    <div className="border-t border-dashed border-stone-200 pt-4">
                        <div className="flex items-center justify-between">
                            <span className="text-stone-500 text-[12px] font-sans">Hospital Readmission Rate</span>
                            <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${provider.metrics.readmissionRate === 'Below'
                                    ? 'bg-green-100 text-green-700'
                                    : provider.metrics.readmissionRate === 'Above'
                                        ? 'bg-red-100 text-red-700'
                                        : 'bg-stone-100 text-stone-600'
                                }`}>
                                {provider.metrics.readmissionRate} National Average
                            </span>
                        </div>
                    </div>
                )}

                {/* Map Link */}
                <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
                >
                    <span className="font-medium text-emerald-700 text-[13px] font-sans">View on Map</span>
                    <ExternalLink className="w-4 h-4 text-emerald-600" />
                </a>
            </div>
        </div>
    );
}
