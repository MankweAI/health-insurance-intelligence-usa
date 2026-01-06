import Link from 'next/link';
import { ArrowRight, Shield, Building2, DollarSign, CheckCircle } from 'lucide-react';
import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';
import { getProceduresWithCMSData, getAllCMSProviders } from '@/data/cms/enriched';

export default function HomePage() {
  // Get stats for UHC NY
  const uhcNyProcedures = getProceduresWithCMSData();
  const uhcNyProviders = getAllCMSProviders();

  // Define available payer modules
  const payerModules = [
    {
      id: 'uhc-ny',
      name: 'UnitedHealthcare',
      region: 'New York',
      href: '/uhc-ny',
      available: true,
      procedureCount: uhcNyProcedures.length,
      providerCount: uhcNyProviders.length,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      borderColor: 'border-blue-200 hover:border-blue-400',
    },
    {
      id: 'aetna-ca',
      name: 'Aetna',
      region: 'California',
      href: '#',
      available: false,
      procedureCount: 0,
      providerCount: 0,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      borderColor: 'border-stone-200',
    },
    {
      id: 'cigna-tx',
      name: 'Cigna',
      region: 'Texas',
      href: '#',
      available: false,
      procedureCount: 0,
      providerCount: 0,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      borderColor: 'border-stone-200',
    },
    {
      id: 'bcbs-fl',
      name: 'Blue Cross Blue Shield',
      region: 'Florida',
      href: '#',
      available: false,
      procedureCount: 0,
      providerCount: 0,
      color: 'from-sky-500 to-sky-600',
      bgColor: 'bg-sky-50',
      textColor: 'text-sky-600',
      borderColor: 'border-stone-200',
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#FAF9F6' }}>
      <AppHeader />

      {/* Hero Section */}
      <section className="px-5 pt-10 pb-8 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-[12px] font-medium mb-5">
            <Shield className="w-4 h-4" />
            Official Transparency Data
          </div>
          <h1 className="text-[36px] font-black text-stone-900 leading-tight mb-4">
            Search Hospital<br />Rate Filings
          </h1>
          <p className="text-stone-600 text-[16px] leading-relaxed max-w-md mx-auto">
            Browse negotiated rates from publicly filed Machine-Readable Files.
            Explore what hospitals report to the government.
          </p>
        </div>
      </section>

      {/* Payer Selector */}
      <section className="px-5 pb-10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-[13px] font-bold uppercase tracking-wider text-stone-500 mb-4 text-center">
            Select Your Insurance Network
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {payerModules.map((payer) => (
              <div key={payer.id} className="relative">
                {payer.available ? (
                  <Link
                    href={payer.href}
                    className={`block bg-white border-2 ${payer.borderColor} rounded-xl p-5 transition-all hover:shadow-lg group`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className={`w-12 h-12 ${payer.bgColor} rounded-xl flex items-center justify-center mb-3`}>
                          <Building2 className={`w-6 h-6 ${payer.textColor}`} />
                        </div>
                        <h3 className="font-bold text-stone-800 text-[17px] mb-0.5">
                          {payer.name}
                        </h3>
                        <p className="text-stone-500 text-[13px]">
                          {payer.region}
                        </p>
                      </div>
                      <ArrowRight className={`w-5 h-5 ${payer.textColor} opacity-0 group-hover:opacity-100 transition-opacity`} />
                    </div>
                    <div className="mt-4 flex items-center gap-4 text-[12px]">
                      <span className="flex items-center gap-1 text-stone-600">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                        {payer.procedureCount} procedures
                      </span>
                      <span className="flex items-center gap-1 text-stone-600">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                        {payer.providerCount.toLocaleString()} providers
                      </span>
                    </div>
                  </Link>
                ) : (
                  <div className={`bg-stone-50 border ${payer.borderColor} rounded-xl p-5 opacity-60`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className={`w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center mb-3`}>
                          <Building2 className="w-6 h-6 text-stone-400" />
                        </div>
                        <h3 className="font-bold text-stone-600 text-[17px] mb-0.5">
                          {payer.name}
                        </h3>
                        <p className="text-stone-400 text-[13px]">
                          {payer.region}
                        </p>
                      </div>
                      <span className="bg-stone-200 text-stone-500 text-[10px] font-bold uppercase px-2 py-1 rounded">
                        Coming Soon
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-5 pb-10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-[13px] font-bold uppercase tracking-wider text-stone-500 mb-4 text-center">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white border border-stone-200 rounded-xl p-5 text-center">
              <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-3 text-emerald-600 font-bold">
                1
              </div>
              <h3 className="font-bold text-stone-800 text-[14px] mb-1">Select Insurance</h3>
              <p className="text-stone-500 text-[12px]">Choose your insurer to see their negotiated rates</p>
            </div>
            <div className="bg-white border border-stone-200 rounded-xl p-5 text-center">
              <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-3 text-emerald-600 font-bold">
                2
              </div>
              <h3 className="font-bold text-stone-800 text-[14px] mb-1">Find Procedure</h3>
              <p className="text-stone-500 text-[12px]">Browse or search for your medical procedure</p>
            </div>
            <div className="bg-white border border-stone-200 rounded-xl p-5 text-center">
              <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-3 text-emerald-600 font-bold">
                3
              </div>
              <h3 className="font-bold text-stone-800 text-[14px] mb-1">Compare Costs</h3>
              <p className="text-stone-500 text-[12px]">See real prices and calculate your out-of-pocket</p>
            </div>
          </div>
        </div>
      </section>

      {/* Data Source */}
      <section className="px-5 pb-10">
        <div className="max-w-3xl mx-auto bg-stone-100 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <DollarSign className="w-5 h-5 text-stone-500 mt-0.5" />
            <div>
              <h3 className="font-bold text-stone-700 text-[13px] mb-1">Real Pricing Data</h3>
              <p className="text-stone-500 text-[12px] leading-relaxed">
                All prices are extracted from Machine-Readable Files (MRFs) published by insurance companies
                as required by the CMS Price Transparency Rule. Provider information is verified via the
                NPPES NPI Registry.
              </p>
            </div>
          </div>
        </div>
      </section>

      <AppFooter />
    </div>
  );
}