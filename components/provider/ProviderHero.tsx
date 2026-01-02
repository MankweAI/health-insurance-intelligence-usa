'use client';

import React from 'react';
import { MapPin, Building2, Clock, Award, ExternalLink } from 'lucide-react';
import { UsProvider } from '@/types/us-tic';
import { QualityScoreCard } from '@/components/hub/QualityScoreCard';

interface Props {
    provider: UsProvider;
}

/**
 * Provider Hero Component
 * 
 * Displays comprehensive provider information including
 * quality metrics, certifications, and facility details.
 */
export function ProviderHero({ provider }: Props) {
    const {
        name,
        address,
        facilityType,
        traumaLevel,
        bedCount,
        specializations,
        certifications,
        metrics,
        averageWaitDays
    } = provider;

    const fullAddress = `${address.street}, ${address.city}, ${address.state} ${address.zip}`;
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;

    return (
        <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5 text-white">
                <div className="flex items-start justify-between flex-wrap gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-0.5 bg-white/20 rounded text-[11px] font-medium">
                                {facilityType}
                            </span>
                            {traumaLevel && traumaLevel !== 'Not Designated' && (
                                <span className="px-2 py-0.5 bg-red-500/80 rounded text-[11px] font-medium">
                                    {traumaLevel} Trauma
                                </span>
                            )}
                        </div>
                        <h1 className="text-2xl font-bold mb-2">{name}</h1>
                        <a
                            href={mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-blue-100 hover:text-white transition-colors text-[14px]"
                        >
                            <MapPin className="w-4 h-4" />
                            {fullAddress}
                            <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="px-6 py-5 space-y-5">
                {/* Quality Metrics */}
                <QualityScoreCard metrics={metrics} />

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {bedCount && (
                        <div className="bg-slate-50 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-1">
                                <Building2 className="w-4 h-4 text-slate-500" />
                                <span className="text-slate-500 text-[10px] uppercase tracking-wider">Beds</span>
                            </div>
                            <p className="text-slate-800 font-medium text-[14px]">{bedCount.toLocaleString()}</p>
                        </div>
                    )}

                    {averageWaitDays && (
                        <div className="bg-slate-50 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-1">
                                <Clock className="w-4 h-4 text-slate-500" />
                                <span className="text-slate-500 text-[10px] uppercase tracking-wider">Avg Wait</span>
                            </div>
                            <p className="text-slate-800 font-medium text-[14px]">{averageWaitDays} days</p>
                        </div>
                    )}

                    <div className="bg-slate-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                            <MapPin className="w-4 h-4 text-slate-500" />
                            <span className="text-slate-500 text-[10px] uppercase tracking-wider">State</span>
                        </div>
                        <p className="text-slate-800 font-medium text-[14px]">{address.state}</p>
                    </div>

                    <div className="bg-slate-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                            <Award className="w-4 h-4 text-slate-500" />
                            <span className="text-slate-500 text-[10px] uppercase tracking-wider">Certifications</span>
                        </div>
                        <p className="text-slate-800 font-medium text-[14px]">{certifications.length}</p>
                    </div>
                </div>

                {/* Specializations */}
                {specializations.length > 0 && (
                    <div>
                        <h3 className="text-stone-500 text-[11px] uppercase tracking-wider mb-2">Specializations</h3>
                        <div className="flex flex-wrap gap-2">
                            {specializations.map((spec, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-emerald-50 text-emerald-700 text-[12px] rounded-full font-medium"
                                >
                                    {spec}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Certifications */}
                {certifications.length > 0 && (
                    <div>
                        <h3 className="text-stone-500 text-[11px] uppercase tracking-wider mb-2">Accreditations</h3>
                        <div className="flex flex-wrap gap-2">
                            {certifications.map((cert, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 text-[12px] rounded-full font-medium"
                                >
                                    <Award className="w-3 h-3" />
                                    {cert}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
