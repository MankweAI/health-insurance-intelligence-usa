'use client';

import React from 'react';

export default function AppHeader() {
    return (
        <header className="pt-5 pb-2 ">
            <div className="p-4 font-mono text-[13px]">
                <div className="flex items-center justify-between">
                    {/* Logo & Brand - "The Receipt" Style */}
                    <div className="flex items-center gap-3">
                        {/* Dollar Sign Icon in Rounded Square */}
                        <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shadow-sm">
                            <span className="text-white font-bold text-[18px] font-sans">$</span>
                        </div>
                        <div>
                            <span className="font-bold text-stone-900 text-[14px] font-mono tracking-tight">asclepius.us</span>
                            <p className="text-stone-400 text-[10px] uppercase tracking-wider font-sans">Transparency Data Explorer</p>
                        </div>
                    </div>

                    {/* Date */}
                    <div className="text-right">
                        <p className="text-stone-400 text-[10px]">
                            2026 validated data
                        </p>
                    </div>
                </div>
            </div>

            {/* Gradient separator line - concentrated in center, fades on sides */}
            <div
                className="h-[2px] w-full mt-2"
                style={{
                    background: 'linear-gradient(90deg, transparent 0%, #10B981 30%, #10B981 70%, transparent 100%)'
                }}
            />
        </header>
    );
}