'use client';

import { useState } from 'react';
import { Phone } from 'lucide-react';
import ExpertModal from '@/components/ExpertModal';

interface ExpertCTAProps {
    planName: string;
    question: string;
    context: string;
    compact?: boolean;
}

/**
 * Client-side CTA component that triggers ExpertModal
 * For use in server-rendered pages (procedure, provider hubs)
 */
export default function ExpertCTA({ planName, question, context, compact = false }: ExpertCTAProps) {
    const [isOpen, setIsOpen] = useState(false);

    if (compact) {
        return (
            <>
                <button
                    onClick={() => setIsOpen(true)}
                    className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold text-[13px] hover:bg-emerald-700 active:scale-95 transition-all"
                >
                    <Phone className="w-4 h-4" />
                    Get Expert Help
                </button>

                <ExpertModal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    planName={planName}
                    initialQuestion={question}
                    expertContext={context}
                />
            </>
        );
    }

    return (
        <>
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-5 text-white shadow-lg">
                <div className="text-center">
                    <p className="text-emerald-100 text-[12px] uppercase tracking-wider font-medium mb-2">
                        Need Help Deciding?
                    </p>
                    <h3 className="text-[18px] font-bold mb-2">
                        Talk to a Licensed Specialist
                    </h3>
                    <p className="text-emerald-100 text-[13px] mb-4 max-w-sm mx-auto">
                        Get personalized guidance on your healthcare coverage options.
                    </p>
                    <button
                        onClick={() => setIsOpen(true)}
                        className="inline-flex items-center gap-2 bg-white text-emerald-700 px-6 py-3 rounded-xl font-bold text-[14px] hover:bg-emerald-50 active:scale-95 transition-all shadow-md"
                    >
                        <Phone className="w-4 h-4" />
                        Request Free Callback
                    </button>
                    <p className="text-emerald-200 text-[10px] mt-3">
                        No obligation • Licensed professionals • 24h response
                    </p>
                </div>
            </div>

            <ExpertModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                planName={planName}
                initialQuestion={question}
                expertContext={context}
            />
        </>
    );
}
