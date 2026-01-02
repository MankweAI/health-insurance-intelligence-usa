'use client';

import Link from 'next/link';
import { ShieldCheck, Lock, ExternalLink } from 'lucide-react';

export default function USFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-50 border-t border-slate-100 mt-16">
            <div className="container py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* Column 1: Authority Signal */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white rounded-full border border-slate-200 shadow-sm">
                                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                            </div>
                            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                                Transparency Data
                            </span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">
                            Asclepius.US uses publicly available Transparency in Coverage (TiC) data
                            mandated by CMS. We are not a healthcare provider or insurer.
                        </p>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 bg-white/50 px-3 py-2 rounded-lg border border-slate-100 w-fit">
                            <Lock className="w-3 h-3" />
                            <span>SSL Secured</span>
                        </div>
                    </div>

                    {/* Column 2: Data Source */}
                    <div className="space-y-4">
                        <h6 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Data Source</h6>
                        <p className="text-xs text-slate-500 leading-relaxed">
                            Negotiated rates are sourced from machine-readable files published by insurers
                            under the
                            <a
                                href="https://www.cms.gov/healthplan-price-transparency"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-emerald-600 hover:underline font-medium ml-1"
                            >
                                CMS Price Transparency Rule <ExternalLink className="w-3 h-3" />
                            </a>
                            . Data is for informational purposes only.
                        </p>
                    </div>

                    {/* Column 3: Links */}
                    <div className="space-y-2">
                        <h6 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Resources</h6>
                        <nav className="flex flex-col gap-2 text-xs font-medium text-slate-500">
                            <Link href="/" className="hover:text-emerald-600 transition-colors">
                                Home
                            </Link>
                            <Link href="/cost/total-hip-replacement/mayo-clinic-rochester/uhc-choice-plus" className="hover:text-emerald-600 transition-colors">
                                Example Calculator
                            </Link>
                        </nav>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-slate-200/60">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

                        {/* Legal Links */}
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            <span>© {currentYear} Asclepius.US</span>
                        </div>

                        {/* Disclaimer */}
                        <div className="md:max-w-lg text-[10px] text-slate-400 leading-relaxed md:text-right">
                            <span className="font-bold">Disclaimer:</span> Estimates are based on publicly available data and
                            may not reflect your actual costs. This is not a Good Faith Estimate.
                            Consult your insurer for official cost information.
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
