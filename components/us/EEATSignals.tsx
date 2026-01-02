'use client';

import React from 'react';
import { Database, RefreshCw, Shield, ExternalLink } from 'lucide-react';
import { STORE_METADATA } from '@/data';

interface Props {
    procedureName?: string;
    providerName?: string;
}

/**
 * Data Source Badge Component
 * 
 * Shows data provenance and freshness for E-E-A-T signals.
 * Critical for YMYL (healthcare) content to establish credibility.
 */
export function DataSourceBadge({ procedureName, providerName }: Props) {
    const lastUpdated = new Date(STORE_METADATA.lastUpdated).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
    });

    return (
        <div className="bg-gradient-to-r from-slate-50 to-stone-50 border border-stone-200 rounded-xl p-4 text-[12px]">
            {/* Header */}
            <div className="flex items-center gap-2 mb-3">
                <Database className="w-4 h-4 text-slate-500" />
                <span className="font-semibold text-slate-700 uppercase tracking-wider text-[10px]">
                    Data Sources
                </span>
            </div>

            {/* Source Items */}
            <div className="space-y-2 text-slate-600">
                <div className="flex items-start gap-2">
                    <Shield className="w-3.5 h-3.5 mt-0.5 text-emerald-500 flex-shrink-0" />
                    <div>
                        <span className="font-medium text-slate-700">CMS Price Transparency Data</span>
                        <p className="text-slate-500 text-[11px] mt-0.5">
                            Negotiated rates from payer Machine-Readable Files (MRFs) as required by the Transparency in Coverage final rule.
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-2">
                    <Shield className="w-3.5 h-3.5 mt-0.5 text-emerald-500 flex-shrink-0" />
                    <div>
                        <span className="font-medium text-slate-700">CMS Hospital Compare</span>
                        <p className="text-slate-500 text-[11px] mt-0.5">
                            Quality metrics including star ratings and patient experience scores from Medicare & Medicaid Services.
                        </p>
                    </div>
                </div>
            </div>

            {/* Freshness Indicator */}
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-stone-200">
                <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-500 text-[11px]">
                    Data last updated: <span className="font-medium text-slate-700">{lastUpdated}</span>
                </span>
            </div>

            {/* CMS Link */}
            <a
                href="https://www.cms.gov/hospital-price-transparency"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 mt-2 text-blue-600 hover:text-blue-700 text-[11px] font-medium"
            >
                Learn about CMS Price Transparency
                <ExternalLink className="w-3 h-3" />
            </a>
        </div>
    );
}

/**
 * Medical Disclaimer Component
 * 
 * Required disclaimer for YMYL healthcare content.
 */
export function MedicalDisclaimer() {
    return (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-[12px]">
            <div className="flex items-start gap-2">
                <span className="text-lg">⚠️</span>
                <div>
                    <p className="font-semibold text-amber-800 mb-1">Medical Disclaimer</p>
                    <p className="text-amber-700 leading-relaxed text-[11px]">
                        Cost estimates are for informational purposes only and do not constitute medical or financial advice.
                        Actual costs may vary based on your specific medical situation, additional services required,
                        complications, and your insurance plan's current terms. Always verify coverage directly with your
                        insurance provider and obtain a detailed estimate from the healthcare facility before any procedure.
                    </p>
                </div>
            </div>
        </div>
    );
}

/**
 * Editorial Transparency Component
 * 
 * Shows who created/reviewed the content for E-E-A-T.
 */
export function EditorialNote() {
    return (
        <div className="bg-white border border-stone-200 rounded-xl p-4 text-[12px]">
            <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-[11px]">
                    AS
                </div>
                <div className="flex-1">
                    <p className="font-semibold text-stone-800 text-[13px]">Asclepius Research Team</p>
                    <p className="text-stone-500 text-[11px] mt-0.5">
                        Healthcare cost transparency specialists
                    </p>
                    <p className="text-stone-600 text-[11px] mt-2 leading-relaxed">
                        Our team analyzes publicly available price transparency data to help patients understand
                        and compare healthcare costs. We do not provide medical advice.
                    </p>
                </div>
            </div>

            {/* Methodology Link */}
            <div className="mt-3 pt-3 border-t border-stone-100">
                <a
                    href="/how-it-works"
                    className="text-emerald-600 hover:text-emerald-700 text-[11px] font-medium"
                >
                    View our methodology →
                </a>
            </div>
        </div>
    );
}

/**
 * Combined Trust Footer Component
 * 
 * All E-E-A-T signals in one component for easy placement.
 */
export function EEATFooter({ procedureName, providerName }: Props) {
    return (
        <div className="space-y-4">
            <DataSourceBadge procedureName={procedureName} providerName={providerName} />
            <MedicalDisclaimer />
            <EditorialNote />
        </div>
    );
}
