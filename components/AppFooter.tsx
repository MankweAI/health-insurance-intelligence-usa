'use client';

import React from 'react';
import Link from 'next/link';

export default function AppFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-8 px-5 pb-8">
            <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm font-mono text-[13px]">
                {/* Navigation Links */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    {/* Resources */}
                    <div>
                        <p className="text-stone-400 text-[10px] uppercase tracking-wider mb-2">Resources</p>
                        <nav className="space-y-1.5">
                            <Link href="/how-it-works" className="block text-stone-600 text-[13px] font-sans hover:text-emerald-600 transition-colors">
                                How It Works
                            </Link>
                            <Link href="/glossary" className="block text-stone-600 text-[13px] font-sans hover:text-emerald-600 transition-colors">
                                Glossary
                            </Link>
                            <Link href="/about" className="block text-stone-600 text-[13px] font-sans hover:text-emerald-600 transition-colors">
                                About Us
                            </Link>
                        </nav>
                    </div>

                    {/* Legal */}
                    <div>
                        <p className="text-stone-400 text-[10px] uppercase tracking-wider mb-2">Legal</p>
                        <nav className="space-y-1.5">
                            <Link href="/privacy" className="block text-stone-600 text-[13px] font-sans hover:text-emerald-600 transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="block text-stone-600 text-[13px] font-sans hover:text-emerald-600 transition-colors">
                                Terms of Service
                            </Link>
                        </nav>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-dashed border-stone-200 my-4" />

                {/* Copyright & Branding */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-emerald-600 flex items-center justify-center">
                            <span className="text-white font-bold text-[10px] font-sans">$</span>
                        </div>
                        <span className="font-mono text-stone-500 text-[11px]">asclepius.us</span>
                    </div>
                    <p className="text-stone-400 text-[11px]">
                        © {currentYear}
                    </p>
                </div>

                {/* Disclaimer */}
                <p className="text-stone-400 text-[10px] mt-3 leading-relaxed">
                    This tool displays data from official price transparency filings. It is not financial or medical advice. Verify all information with your healthcare provider and insurer.
                </p>
            </div>
        </footer>
    );
}
