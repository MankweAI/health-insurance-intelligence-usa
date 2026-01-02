'use client';

import { ChevronDown } from 'lucide-react';

interface FAQ {
    question: string;
    answer: string;
}

interface Props {
    title?: string;
    questions: FAQ[];
}

export default function FAQAccordion({ title, questions }: Props) {
    if (!questions || questions.length === 0) return null;

    return (
        <section className="py-8">
            {title && (
                <h3 className="text-lg font-bold text-slate-800 mb-4">{title}</h3>
            )}
            <div className="space-y-3">
                {questions.map((faq, i) => (
                    <details
                        key={i}
                        className="group bg-white rounded-xl border border-slate-100 open:border-emerald-200 open:shadow-sm transition-all duration-200"
                    >
                        <summary className="flex items-center justify-between p-4 font-semibold text-slate-700 cursor-pointer list-none select-none text-sm">
                            <span className="pr-4">{faq.question}</span>
                            <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform shrink-0" />
                        </summary>
                        <div className="px-4 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-50">
                            <div className="pt-3">
                                {faq.answer}
                            </div>
                        </div>
                    </details>
                ))}
            </div>
        </section>
    );
}
