import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock, Stethoscope } from 'lucide-react';
import { getProceduresWithCMSData } from '@/data/cms/enriched';
import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';

export const metadata: Metadata = {
    title: 'All Procedures - UHC New York | Asclepius',
    description: 'Browse all medical procedures with real negotiated pricing from UnitedHealthcare New York.',
};

export default function UhcNyProcedureHubPage() {
    const procedures = getProceduresWithCMSData();

    // Group by category
    const byCategory = procedures.reduce((acc, proc) => {
        if (!acc[proc.category]) acc[proc.category] = [];
        acc[proc.category].push(proc);
        return acc;
    }, {} as Record<string, typeof procedures>);

    return (
        <div className="min-h-screen" style={{ background: '#FAF9F6' }}>
            <AppHeader />

            {/* Header */}
            <section className="px-5 pt-8 pb-6">
                <div className="max-w-3xl mx-auto">
                    <nav className="text-[12px] text-stone-500 mb-4">
                        <Link href="/uhc-ny" className="hover:text-stone-700">UHC New York</Link>
                        <span className="mx-2">›</span>
                        <span className="text-stone-700">Procedures</span>
                    </nav>
                    <h1 className="text-[28px] font-black text-stone-900 mb-2">
                        Medical Procedures
                    </h1>
                    <p className="text-stone-600 text-[14px]">
                        {procedures.length} procedures with real UHC New York pricing
                    </p>
                </div>
            </section>

            {/* Procedures by Category */}
            <section className="px-5 pb-10">
                <div className="max-w-3xl mx-auto space-y-6">
                    {Object.entries(byCategory).map(([category, procs]) => (
                        <div key={category}>
                            <h2 className="text-[14px] font-bold text-stone-700 mb-3 flex items-center gap-2">
                                <Stethoscope className="w-4 h-4 text-stone-400" />
                                {category}
                                <span className="text-stone-400 font-normal">({procs.length})</span>
                            </h2>
                            <div className="bg-white border border-stone-200 rounded-xl divide-y divide-stone-100">
                                {procs.map((proc) => (
                                    <Link
                                        key={proc.code}
                                        href={`/uhc-ny/procedure/${proc.slug}`}
                                        className="flex items-center justify-between px-5 py-4 hover:bg-stone-50 transition-colors"
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium text-stone-800 text-[14px]">
                                                    {proc.name}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3 mt-1 text-[12px] text-stone-500">
                                                <span>CPT {proc.code}</span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {proc.typicalDuration}
                                                </span>
                                            </div>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-stone-300" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <AppFooter />
        </div>
    );
}
