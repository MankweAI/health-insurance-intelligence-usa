'use client';

import { ArrowRight } from 'lucide-react';

interface Props {
    liability: number;
    ctaText?: string;
    onCtaClick?: () => void;
}

export default function FloatingActionBar({ liability, ctaText = "Get 0% Financing", onCtaClick }: Props) {
    return (
        <div className="floating-bar glass animate-slideUp">
            {/* Liability Display */}
            <div className="flex flex-col">
                <span className="text-xs text-stone-500 font-medium">Your Liability</span>
                <span className="text-xl font-black text-stone-900">
                    ${Math.round(liability).toLocaleString()}
                </span>
            </div>

            {/* CTA Button */}
            <button
                onClick={onCtaClick}
                className="btn-primary flex items-center gap-2 whitespace-nowrap text-sm py-3 px-5"
                style={{ background: 'linear-gradient(135deg, #F97316, #EA580C)' }}
            >
                {ctaText}
                <ArrowRight className="w-4 h-4" />
            </button>
        </div>
    );
}
