'use client';

import React from 'react';
import { Clock, Heart, Shield, AlertTriangle } from 'lucide-react';
import { CPTEntry } from '@/types/us-tic';
import { PriceRangeBadge } from '@/components/hub/PriceRangeBadge';

interface Props {
    procedure: CPTEntry;
}

/**
 * Procedure Hero Component
 * 
 * Displays comprehensive procedure information including
 * medical content, duration, recovery, and national pricing.
 */
export function ProcedureHero({ procedure }: Props) {
    const {
        name,
        code,
        category,
        description,
        typicalDuration,
        recoveryTime,
        anesthesiaType,
        nationalStats
    } = procedure;

    const categoryColors: Record<string, string> = {
        'Inpatient': 'bg-red-50 text-red-700 border-red-200',
        'Outpatient': 'bg-blue-50 text-blue-700 border-blue-200',
        'Imaging': 'bg-purple-50 text-purple-700 border-purple-200',
        'Laboratory': 'bg-green-50 text-green-700 border-green-200',
        'Emergency': 'bg-orange-50 text-orange-700 border-orange-200'
    };

    return (
        <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-5 text-white">
                <div className="flex items-start justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className={`px-2 py-0.5 rounded text-[11px] font-medium border ${categoryColors[category] || 'bg-stone-50 text-stone-700'}`}>
                                {category}
                            </span>
                            <span className="px-2 py-0.5 bg-white/20 rounded text-[11px] font-mono">
                                CPT {code}
                            </span>
                        </div>
                        <h1 className="text-2xl font-bold">{name}</h1>
                    </div>
                    <div className="text-right">
                        <p className="text-emerald-100 text-[11px] uppercase tracking-wider mb-1">
                            National Average
                        </p>
                        <PriceRangeBadge
                            low={nationalStats.low}
                            high={nationalStats.high}
                            size="lg"
                        />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="px-6 py-5">
                {/* Description */}
                <p className="text-stone-600 text-[14px] leading-relaxed mb-5">
                    {description}
                </p>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-slate-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                            <Clock className="w-4 h-4 text-slate-500" />
                            <span className="text-slate-500 text-[10px] uppercase tracking-wider">Duration</span>
                        </div>
                        <p className="text-slate-800 font-medium text-[14px]">{typicalDuration}</p>
                    </div>

                    <div className="bg-slate-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                            <Heart className="w-4 h-4 text-slate-500" />
                            <span className="text-slate-500 text-[10px] uppercase tracking-wider">Recovery</span>
                        </div>
                        <p className="text-slate-800 font-medium text-[14px]">{recoveryTime.split(';')[0]}</p>
                    </div>

                    <div className="bg-slate-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                            <Shield className="w-4 h-4 text-slate-500" />
                            <span className="text-slate-500 text-[10px] uppercase tracking-wider">Anesthesia</span>
                        </div>
                        <p className="text-slate-800 font-medium text-[14px]">{anesthesiaType}</p>
                    </div>

                    <div className="bg-slate-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                            <AlertTriangle className="w-4 h-4 text-slate-500" />
                            <span className="text-slate-500 text-[10px] uppercase tracking-wider">Setting</span>
                        </div>
                        <p className="text-slate-800 font-medium text-[14px]">{category}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

/**
 * Preparation & Risks Section
 */
export function ProcedureDetails({ procedure }: Props) {
    const { preparation, risks } = procedure;

    return (
        <div className="grid md:grid-cols-2 gap-4">
            {/* Preparation */}
            <div className="bg-white border border-stone-200 rounded-xl p-5">
                <h3 className="font-bold text-stone-800 text-[15px] mb-3 flex items-center gap-2">
                    <span className="text-lg">📋</span>
                    Preparation
                </h3>
                <ul className="space-y-2">
                    {preparation.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-[13px] text-stone-600">
                            <span className="text-emerald-500 mt-0.5">✓</span>
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Risks */}
            <div className="bg-white border border-stone-200 rounded-xl p-5">
                <h3 className="font-bold text-stone-800 text-[15px] mb-3 flex items-center gap-2">
                    <span className="text-lg">⚠️</span>
                    Potential Risks
                </h3>
                <div className="flex flex-wrap gap-2">
                    {risks.map((risk, index) => (
                        <span
                            key={index}
                            className="px-2 py-1 bg-red-50 text-red-700 text-[12px] rounded-md"
                        >
                            {risk}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

/**
 * Procedure FAQs from CPT Encyclopedia
 */
export function ProcedureFAQs({ procedure }: Props) {
    const { faqs, name } = procedure;
    const [openIndex, setOpenIndex] = React.useState<number | null>(0);

    if (!faqs || faqs.length === 0) return null;

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <div className="bg-white border border-stone-200 rounded-xl p-5">
                <h3 className="font-bold text-stone-800 text-[15px] mb-4 flex items-center gap-2">
                    <span className="text-lg">❓</span>
                    Frequently Asked Questions about {name}
                </h3>
                <div className="space-y-2">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border border-stone-100 rounded-lg overflow-hidden">
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-4 text-left hover:bg-stone-50 transition-colors"
                            >
                                <span className="font-medium text-stone-800 text-[13px] pr-4">{faq.question}</span>
                                <span className={`text-stone-400 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}>
                                    ▼
                                </span>
                            </button>
                            {openIndex === index && (
                                <div className="px-4 pb-4">
                                    <p className="text-stone-600 text-[13px] leading-relaxed">{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
