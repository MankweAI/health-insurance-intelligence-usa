import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';
import { CPT_ENCYCLOPEDIA } from '@/data';
import { HubBreadcrumb, BreadcrumbSchema } from '@/components/hub/HubBreadcrumb';
import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';

export const metadata: Metadata = {
    title: 'Browse Medical Procedures | Asclepius',
    description: 'Compare costs for medical procedures across hospitals. View prices for surgeries, imaging, and outpatient procedures with transparent pricing data.',
    alternates: {
        canonical: '/procedure',
    },
};

export default function ProcedureIndexPage() {
    const breadcrumbItems = [{ label: 'Procedures' }];

    // Group procedures by category
    const categories = ['Inpatient', 'Outpatient', 'Imaging'] as const;
    const proceduresByCategory = categories.map(category => ({
        category,
        procedures: CPT_ENCYCLOPEDIA.filter(p => p.category === category)
    }));

    const categoryColors: Record<string, string> = {
        'Inpatient': 'border-red-200 bg-red-50',
        'Outpatient': 'border-blue-200 bg-blue-50',
        'Imaging': 'border-purple-200 bg-purple-50'
    };

    const categoryDescriptions: Record<string, string> = {
        'Inpatient': 'Procedures requiring hospital admission and overnight stays',
        'Outpatient': 'Same-day procedures performed without overnight stay',
        'Imaging': 'Diagnostic imaging including MRI, CT, and X-ray scans'
    };

    return (
        <>
            <BreadcrumbSchema items={breadcrumbItems} />

            <div className="min-h-screen pb-24" style={{ background: '#FAF9F6' }}>
                <AppHeader />

                <main className="max-w-5xl mx-auto px-5 py-6">
                    {/* Breadcrumb */}
                    <HubBreadcrumb items={breadcrumbItems} />

                    {/* Hero */}
                    <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl px-6 py-8 text-white mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold mb-2">Medical Procedures</h1>
                        <p className="text-emerald-100 text-[15px] max-w-2xl">
                            Compare prices for {CPT_ENCYCLOPEDIA.length} common medical procedures across hospitals.
                            Find the best value for your care with transparent pricing data.
                        </p>
                    </div>

                    {/* Categories */}
                    <div className="space-y-8">
                        {proceduresByCategory.map(({ category, procedures }) => (
                            <div key={category}>
                                <div className="mb-4">
                                    <h2 className="text-lg font-bold text-stone-800">{category} Procedures</h2>
                                    <p className="text-stone-500 text-[13px]">{categoryDescriptions[category]}</p>
                                </div>

                                <div className="grid gap-3 md:grid-cols-2">
                                    {procedures.map(procedure => (
                                        <Link
                                            key={procedure.slug}
                                            href={`/procedure/${procedure.slug}`}
                                            className={`flex items-center justify-between p-4 rounded-xl border transition-all hover:shadow-md ${categoryColors[category]}`}
                                        >
                                            <div>
                                                <span className="font-medium text-stone-800 text-[14px] block">
                                                    {procedure.name}
                                                </span>
                                                <span className="text-stone-500 text-[12px]">
                                                    CPT {procedure.code} • {procedure.typicalDuration}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="text-right hidden sm:block">
                                                    <span className="text-stone-400 text-[10px] uppercase tracking-wider block">
                                                        National Avg
                                                    </span>
                                                    <span className="font-bold text-stone-700 text-[13px]">
                                                        ${procedure.nationalStats.median.toLocaleString()}
                                                    </span>
                                                </div>
                                                <ArrowRight className="w-5 h-5 text-stone-400" />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </main>

                <AppFooter />
            </div>
        </>
    );
}
