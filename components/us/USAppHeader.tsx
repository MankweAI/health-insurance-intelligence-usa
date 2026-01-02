'use client';

import Link from 'next/link';

export default function USAppHeader() {
    return (
        <header className="sticky top-0 z-50 w-full">
            <div className="container">
                <div className="flex items-center justify-between py-4">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-md">
                            <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 2L12 6M12 18L12 22M2 12L6 12M18 12L22 12" strokeLinecap="round" />
                                <circle cx="12" cy="12" r="4" />
                            </svg>
                        </div>
                        <span className="font-bold text-lg text-stone-900 hidden sm:block">Asclepius</span>
                    </Link>

                    {/* Status Badge */}
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-100">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                        </span>
                        <span className="text-xs font-semibold text-orange-700">Live Rates</span>
                    </div>

                </div>
            </div>

            {/* Gradient Accent Line */}
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-60" />
        </header>
    );
}
