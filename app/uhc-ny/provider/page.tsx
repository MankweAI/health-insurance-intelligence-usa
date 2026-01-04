import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Building2, MapPin, Search } from 'lucide-react';
import { getAllCMSProviders } from '@/data/cms/enriched';
import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';

export const metadata: Metadata = {
    title: 'All Providers - UHC New York | Asclepius',
    description: 'Browse all healthcare providers with real negotiated pricing from UnitedHealthcare New York.',
};

export default function UhcNyProviderHubPage() {
    const providers = getAllCMSProviders();

    // Group by state
    const byState = providers.reduce((acc, prov) => {
        if (!acc[prov.state]) acc[prov.state] = [];
        acc[prov.state].push(prov);
        return acc;
    }, {} as Record<string, typeof providers>);

    // Sort states alphabetically
    const sortedStates = Object.keys(byState).sort();

    return (
        <div className="min-h-screen" style={{ background: '#FAF9F6' }}>
            <AppHeader />

            {/* Header */}
            <section className="px-5 pt-8 pb-6">
                <div className="max-w-3xl mx-auto">
                    <nav className="text-[12px] text-stone-500 mb-4">
                        <Link href="/uhc-ny" className="hover:text-stone-700">UHC New York</Link>
                        <span className="mx-2">›</span>
                        <span className="text-stone-700">Providers</span>
                    </nav>
                    <h1 className="text-[28px] font-black text-stone-900 mb-2">
                        Healthcare Providers
                    </h1>
                    <p className="text-stone-600 text-[14px]">
                        {providers.length} providers in the UHC New York network
                    </p>
                </div>
            </section>

            {/* Providers by State */}
            <section className="px-5 pb-10">
                <div className="max-w-3xl mx-auto space-y-6">
                    {sortedStates.map((state) => (
                        <div key={state}>
                            <h2 className="text-[14px] font-bold text-stone-700 mb-3 flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-stone-400" />
                                {state}
                                <span className="text-stone-400 font-normal">({byState[state].length})</span>
                            </h2>
                            <div className="bg-white border border-stone-200 rounded-xl divide-y divide-stone-100">
                                {byState[state].slice(0, 10).map((prov) => (
                                    <Link
                                        key={prov.npi}
                                        href={`/uhc-ny/provider/${prov.slug}`}
                                        className="flex items-center justify-between px-5 py-4 hover:bg-stone-50 transition-colors"
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <Building2 className="w-4 h-4 text-stone-400" />
                                                <span className="font-medium text-stone-800 text-[14px]">
                                                    {prov.name}
                                                </span>
                                            </div>
                                            <div className="text-[12px] text-stone-500 mt-1 ml-6">
                                                {prov.city}, {prov.state}
                                            </div>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-stone-300" />
                                    </Link>
                                ))}
                                {byState[state].length > 10 && (
                                    <div className="px-5 py-3 text-center text-stone-500 text-[12px]">
                                        +{byState[state].length - 10} more providers in {state}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <AppFooter />
        </div>
    );
}
