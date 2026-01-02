'use client';

import React from 'react';
import { X } from 'lucide-react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export function BottomSheet({ isOpen, onClose, title, children }: Props) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Sheet Content */}
            <div className="relative w-full max-w-md bg-white rounded-t-[32px] sm:rounded-[32px] p-6 shadow-2xl animate-in slide-in-from-bottom-10 fade-in duration-200">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-[20px] font-bold text-stone-900">{title}</h3>
                    <button
                        onClick={onClose}
                        className="p-2 bg-stone-100 rounded-full hover:bg-stone-200 transition-colors"
                    >
                        <X className="w-5 h-5 text-stone-500" />
                    </button>
                </div>

                {/* content */}
                <div className="text-stone-600 leading-relaxed text-[15px]">
                    {children}
                </div>

                {/* Safe Area Spacer for mobile */}
                <div className="h-4 sm:hidden" />
            </div>
        </div>
    );
}
