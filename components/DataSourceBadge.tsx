'use client';

import { ExternalLink, Database, Calendar, AlertTriangle } from 'lucide-react';

interface DataSourceBadgeProps {
    recordCount: number;
    providerCount?: number;
    extractedDate: string;
    sourceUrl: string;
    sourceName: string;
    dataYear?: string;
    compact?: boolean;
}

/**
 * DataSourceBadge - Shows data provenance information for YMYL defensibility
 * 
 * Displays:
 * - Number of rate records the data is based on
 * - When the data was extracted
 * - Link to the official MRF source
 */
export default function DataSourceBadge({
    recordCount,
    providerCount,
    extractedDate,
    sourceUrl,
    sourceName,
    dataYear,
    compact = false,
}: DataSourceBadgeProps) {
    // Format date for display
    const formattedDate = new Date(extractedDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    if (compact) {
        return (
            <div className="inline-flex items-center gap-3 text-[11px] text-stone-500">
                <span className="flex items-center gap-1">
                    <Database className="w-3 h-3" />
                    {recordCount.toLocaleString()} records
                </span>
                <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formattedDate}
                </span>
                <a
                    href={sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-emerald-600 hover:underline"
                >
                    Source
                    <ExternalLink className="w-3 h-3" />
                </a>
                <a
                    href="mailto:data@asclepius.us?subject=Data%20Error%20Report"
                    className="flex items-center gap-1 text-amber-600 hover:underline"
                >
                    Report Error
                    <AlertTriangle className="w-3 h-3" />
                </a>
            </div>
        );
    }

    return (
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
                <div className="bg-emerald-100 p-2 rounded-lg">
                    <Database className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                        Data Source
                    </p>
                    <div className="space-y-1 text-[13px] text-stone-600">
                        <p>
                            Based on <strong className="text-stone-900">{recordCount.toLocaleString()}</strong> rate records
                            {providerCount && (
                                <> from <strong className="text-stone-900">{providerCount.toLocaleString()}</strong> providers</>
                            )}
                        </p>
                        <p className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-stone-400" />
                            Extracted: {formattedDate}
                            {dataYear && <span className="text-stone-400">({dataYear} rates)</span>}
                        </p>
                    </div>
                    <a
                        href={sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 mt-2 text-[12px] text-emerald-600 hover:text-emerald-700 hover:underline font-medium"
                    >
                        View official source: {sourceName}
                        <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <a
                        href="mailto:data@asclepius.us?subject=Data%20Error%20Report"
                        className="inline-flex items-center gap-1.5 mt-1 text-[11px] text-amber-600 hover:text-amber-700 hover:underline"
                    >
                        <AlertTriangle className="w-3 h-3" />
                        Report a data error
                    </a>
                </div>
            </div>
        </div>
    );
}
