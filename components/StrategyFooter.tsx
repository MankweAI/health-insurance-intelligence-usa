// components/StrategyFooter.tsx
'use client';

import { Plan } from '@/utils/types';
import { Persona } from '@/utils/persona';
import { ContentGenerator } from '@/utils/seo-content';
import SemanticGlossary from '@/components/SemanticGlossary';
import PeopleAlsoAsk from '@/components/PeopleAlsoAsk';
import RelatedPersonas from '@/components/RelatedPersonas';
import { ArrowRight, TrendingDown, TrendingUp, Scale, Users, BookOpen, HelpCircle, FileText } from 'lucide-react';
import Link from 'next/link';

interface PivotItem {
    plan: Plan;
    persona: Persona;
}

export interface Pivots {
    cheaper: PivotItem | null;
    richer: PivotItem | null;
}

interface Props {
    plan: Plan;
    persona: Persona;
    pivots: Pivots;
    allPersonas: Persona[];
}

export default function StrategyFooter({ plan, persona, pivots, allPersonas }: Props) {
    const glossary = ContentGenerator.generateGlossary(plan);
    const faq = ContentGenerator.generateFAQ(plan, persona);

    return (
        <div className="mt-2 space-y-6 animate-in slide-in-from-bottom-8 duration-700">
            {/* 1. PRICE ALTERNATIVES */}
            <section>
                <div className="flex items-center gap-2 mb-3">
                    <div className="bg-slate-100 p-1.5 rounded-lg">
                        <Scale className="w-4 h-4 text-slate-600" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">Compare Alternatives</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {pivots.cheaper?.persona ? (
                        <Link href={`/personas/${pivots.cheaper.persona.slug}`} className="block group">
                            <div className="p-4 rounded-2xl bg-white border border-slate-100 hover:border-emerald-200 transition-all shadow-sm group-hover:shadow-md h-full">
                                <div className="flex items-center gap-2 mb-3 text-emerald-600">
                                    <TrendingDown className="w-4 h-4" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider">Save R{plan.price - pivots.cheaper.plan.price}/mo</span>
                                </div>
                                <div className="text-xs font-bold text-slate-400 uppercase mb-0.5">{pivots.cheaper.plan.identity.scheme_name}</div>
                                <div className="font-black text-slate-900 text-base leading-tight mb-1 flex items-center justify-between">
                                    {pivots.cheaper.plan.identity.plan_name}
                                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2" />
                                </div>
                                <p className="text-xs text-slate-500 font-medium truncate">{pivots.cheaper.persona.display_title || pivots.cheaper.persona.meta.title}</p>
                            </div>
                        </Link>
                    ) : (
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 opacity-70 flex flex-col justify-center">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Most Affordable</p>
                            <p className="text-sm font-medium text-slate-500">Lowest-cost option for your profile.</p>
                        </div>
                    )}

                    {pivots.richer?.persona ? (
                        <Link href={`/personas/${pivots.richer.persona.slug}`} className="block group">
                            <div className="p-4 rounded-2xl bg-white border border-slate-100 hover:border-blue-200 transition-all shadow-sm group-hover:shadow-md h-full">
                                <div className="flex items-center gap-2 mb-3 text-blue-600">
                                    <TrendingUp className="w-4 h-4" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider">+R{pivots.richer.plan.price - plan.price}/mo for more cover</span>
                                </div>
                                <div className="text-xs font-bold text-slate-400 uppercase mb-0.5">{pivots.richer.plan.identity.scheme_name}</div>
                                <div className="font-black text-slate-900 text-base leading-tight mb-1 flex items-center justify-between">
                                    {pivots.richer.plan.identity.plan_name}
                                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2" />
                                </div>
                                <p className="text-xs text-slate-500 font-medium truncate">{pivots.richer.persona.display_title || pivots.richer.persona.meta.title}</p>
                            </div>
                        </Link>
                    ) : (
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 opacity-70 flex flex-col justify-center">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Top-Tier Option</p>
                            <p className="text-sm font-medium text-slate-500">Most comprehensive plan available.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* 2. ACTUARIAL BASIS (NEW) */}
            <section className="p-5 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl">
                <div className="flex items-center gap-2 mb-4">
                    <div className="bg-slate-800 p-1.5 rounded-lg">
                        <FileText className="w-4 h-4 text-emerald-400" />
                    </div>
                    <h3 className="text-sm font-bold">Actuarial Strategy Reference</h3>
                </div>
                <div className="space-y-3">
                    <p className="text-xs text-slate-300 leading-relaxed">
                        This strategy is generated based on the <span className="text-emerald-400 font-bold">2026 Council for Medical Schemes (CMS)</span> registered rules and actuarial pricing matrices.
                    </p>
                    <div className="text-[10px] text-slate-500 font-mono">
                        VERIFIED: 2025-12-20 | SOURCE: SCHEME_BENEFIT_GUIDE_2026
                    </div>
                </div>
            </section>

            {/* 3. RELATED STRATEGIES */}
            <section>
                <div className="flex items-center gap-2 mb-3">
                    <div className="bg-emerald-50 p-1.5 rounded-lg">
                        <Users className="w-4 h-4 text-emerald-600" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">Similar Situations</h3>
                </div>
                <RelatedPersonas currentPersona={persona} allPersonas={allPersonas} embedded={true} />
            </section>

            {/* 4. THE KNOWLEDGE GRAPH */}
            <section>
                <div className="flex items-center gap-2 mb-3">
                    <div className="bg-blue-50 p-1.5 rounded-lg">
                        <BookOpen className="w-4 h-4 text-blue-600" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">Key Terms Explained</h3>
                </div>
                <SemanticGlossary terms={glossary} />
            </section>

            {/* 5. FAQ */}
            <section>
                <div className="flex items-top gap-2 mb-0">
                    <div className="bg-amber-50 p-1.5 rounded-lg">
                        <HelpCircle className="w-4 h-4 text-amber-600" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">Common Questions</h3>
                </div>
                <PeopleAlsoAsk questions={faq} />
            </section>
        </div>
    );
}