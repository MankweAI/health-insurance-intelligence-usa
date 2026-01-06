import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Building2, Stethoscope } from 'lucide-react';
import { getProceduresWithCMSData, getAllCMSProviders } from '@/data/cms/enriched';
import { UHC_NY_METADATA } from '@/data/uhc_ny';
import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';
import DataSourceBadge from '@/components/DataSourceBadge';

export const metadata: Metadata = {
    title: 'UHC New York Healthcare Costs | Asclepius',
    description: 'Compare real negotiated healthcare costs from UnitedHealthcare New York. Browse procedures, providers, and get accurate cost estimates.',
};

export default function UhcNyLandingPage() {
    const procedures = getProceduresWithCMSData();
    const providers = getAllCMSProviders();

    return (
        <div className="min-h-screen" style={{ background: '#FAF9F6' }}>
            <AppHeader />

            {/* Hero Section */}
            <section className="px-5 pt-8 pb-10">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-[12px] font-medium mb-4">
                        <Building2 className="w-3.5 h-3.5" />
                        UnitedHealthcare New York Network
                    </div>
                    <h1 className="text-[32px] font-black text-stone-900 leading-tight mb-4">
                        Real Healthcare Costs,<br />Transparent Pricing
                    </h1>
                    <p className="text-stone-600 text-[15px] leading-relaxed max-w-xl mx-auto">
                        Browse negotiated rates from UHC New York's Machine-Readable File.
                        See what hospitals actually charge for procedures in the UHC network.
                    </p>
                </div>
            </section>

            {/* Stats */}
            <section className="px-5 pb-8">
                <div className="max-w-3xl mx-auto grid grid-cols-3 gap-4">
                    <div className="bg-white border border-stone-200 rounded-xl p-4 text-center">
                        <div className="text-[28px] font-bold text-blue-600">{providers.length}</div>
                        <div className="text-stone-500 text-[12px]">Providers</div>
                    </div>
                    <div className="bg-white border border-stone-200 rounded-xl p-4 text-center">
                        <div className="text-[28px] font-bold text-emerald-600">{procedures.length}</div>
                        <div className="text-stone-500 text-[12px]">Procedures</div>
                    </div>
                    <div className="bg-white border border-stone-200 rounded-xl p-4 text-center">
                        <div className="text-[28px] font-bold text-amber-600">Real</div>
                        <div className="text-stone-500 text-[12px]">CMS Prices</div>
                    </div>
                </div>
            </section>

            {/* Browse By Section */}
            <section className="px-5 pb-10">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-[18px] font-bold text-stone-800 mb-4">Browse By</h2>

                    <div className="grid md:grid-cols-2 gap-4">
                        {/* Procedures Card */}
                        <Link
                            href="/uhc-ny/procedure"
                            className="bg-white border border-stone-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all group"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-3">
                                        <Stethoscope className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <h3 className="font-bold text-stone-800 text-[15px] mb-1">Procedures</h3>
                                    <p className="text-stone-500 text-[13px]">
                                        Compare costs for {procedures.length} medical procedures
                                    </p>
                                </div>
                                <ArrowRight className="w-5 h-5 text-stone-300 group-hover:text-blue-500 transition-colors" />
                            </div>
                        </Link>

                        {/* Providers Card */}
                        <Link
                            href="/uhc-ny/provider"
                            className="bg-white border border-stone-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all group"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center mb-3">
                                        <Building2 className="w-5 h-5 text-emerald-600" />
                                    </div>
                                    <h3 className="font-bold text-stone-800 text-[15px] mb-1">Providers</h3>
                                    <p className="text-stone-500 text-[13px]">
                                        View pricing at {providers.length} hospitals and facilities
                                    </p>
                                </div>
                                <ArrowRight className="w-5 h-5 text-stone-300 group-hover:text-emerald-500 transition-colors" />
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Popular Procedures */}
            <section className="px-5 pb-10">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-[18px] font-bold text-stone-800 mb-4">Popular Procedures</h2>
                    <div className="bg-white border border-stone-200 rounded-xl divide-y divide-stone-100">
                        {procedures.slice(0, 5).map((proc) => (
                            <Link
                                key={proc.code}
                                href={`/uhc-ny/procedure/${proc.slug}`}
                                className="flex items-center justify-between px-5 py-4 hover:bg-stone-50 transition-colors"
                            >
                                <div>
                                    <span className="font-medium text-stone-800 text-[14px]">{proc.name}</span>
                                    <span className="text-stone-400 text-[12px] ml-2">CPT {proc.code}</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-stone-300" />
                            </Link>
                        ))}
                    </div>
                    <Link
                        href="/uhc-ny/procedure"
                        className="block text-center text-blue-600 text-[13px] font-medium mt-3 hover:underline"
                    >
                        View all {procedures.length} procedures →
                    </Link>
                </div>
            </section>

            {/* Data Source */}
            <section className="px-5 pb-10">
                <div className="max-w-3xl mx-auto">
                    <DataSourceBadge
                        recordCount={UHC_NY_METADATA.rateCount}
                        providerCount={UHC_NY_METADATA.providerCount}
                        extractedDate={UHC_NY_METADATA.mrfSource.extractedDate}
                        sourceUrl={UHC_NY_METADATA.mrfSource.url}
                        sourceName={UHC_NY_METADATA.mrfSource.displayName}
                        dataYear={UHC_NY_METADATA.mrfSource.dataYear}
                    />
                </div>
            </section>

            <AppFooter />
        </div>
    );
}
