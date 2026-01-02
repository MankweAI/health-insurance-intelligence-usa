import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Star, MapPin, Building2 } from 'lucide-react';
import { PROVIDERS } from '@/data';
import { HubBreadcrumb, BreadcrumbSchema } from '@/components/hub/HubBreadcrumb';
import { QualityBadge } from '@/components/hub/QualityScoreCard';
import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';

export const metadata: Metadata = {
    title: 'Browse Healthcare Providers | Asclepius',
    description: 'Compare hospitals and healthcare facilities. View CMS quality ratings, patient experience scores, and procedure pricing across top medical centers.',
    alternates: {
        canonical: '/provider',
    },
};

export default function ProviderIndexPage() {
    const breadcrumbItems = [{ label: 'Providers' }];

    // Group providers by state
    const states = [...new Set(PROVIDERS.map(p => p.address.state))].sort();
    const providersByState = states.map(state => ({
        state,
        providers: PROVIDERS.filter(p => p.address.state === state)
    }));

    // Sort providers by rating within each state
    providersByState.forEach(group => {
        group.providers.sort((a, b) =>
            (b.metrics.cmsStarRating || 0) - (a.metrics.cmsStarRating || 0)
        );
    });

    return (
        <>
            <BreadcrumbSchema items={breadcrumbItems} />

            <div className="min-h-screen pb-24" style={{ background: '#FAF9F6' }}>
                <AppHeader />

                <main className="max-w-5xl mx-auto px-5 py-6">
                    {/* Breadcrumb */}
                    <HubBreadcrumb items={breadcrumbItems} />

                    {/* Hero */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl px-6 py-8 text-white mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold mb-2">Healthcare Providers</h1>
                        <p className="text-blue-100 text-[15px] max-w-2xl">
                            Compare {PROVIDERS.length} hospitals with CMS quality ratings,
                            patient experience scores, and transparent pricing for common procedures.
                        </p>
                    </div>

                    {/* Providers by State */}
                    <div className="space-y-8">
                        {providersByState.map(({ state, providers }) => (
                            <div key={state}>
                                <h2 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-stone-400" />
                                    {state}
                                </h2>

                                <div className="grid gap-3">
                                    {providers.map(provider => (
                                        <Link
                                            key={provider.slug}
                                            href={`/provider/${provider.slug}`}
                                            className="flex items-center justify-between p-4 bg-white border border-stone-200 rounded-xl hover:shadow-md transition-all"
                                        >
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-medium text-stone-800 text-[15px]">
                                                        {provider.name}
                                                    </span>
                                                    {provider.traumaLevel && provider.traumaLevel !== 'Not Designated' && (
                                                        <span className="px-1.5 py-0.5 bg-red-100 text-red-700 text-[10px] rounded font-medium">
                                                            {provider.traumaLevel}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-3 text-stone-500 text-[12px]">
                                                    <span className="flex items-center gap-1">
                                                        <MapPin className="w-3 h-3" />
                                                        {provider.address.city}
                                                    </span>
                                                    {provider.bedCount && (
                                                        <span className="flex items-center gap-1">
                                                            <Building2 className="w-3 h-3" />
                                                            {provider.bedCount.toLocaleString()} beds
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <QualityBadge
                                                    rating={provider.metrics.cmsStarRating}
                                                    score={provider.metrics.patientExperienceScore}
                                                />
                                                <ArrowRight className="w-5 h-5 text-stone-300" />
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
