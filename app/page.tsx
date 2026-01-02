import Link from 'next/link';
import { MOCK_DB } from '@/data';
import { ArrowRight, Search } from 'lucide-react';
import AppHeader from '@/components/AppHeader';

export default function HomePage() {
  const featuredProcedures = MOCK_DB.procedures.slice(0, 4);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #F0FDF4 0%, #FFFFFF 100%)' }}>

      {/* Header */}
      <AppHeader />

      {/* Hero Section - EXACT REPLICA */}
      <section className="px-6 pb-12 text-center relative overflow-hidden">
        {/* Intense Peach Glow Gradient */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[400px] -z-10"
          style={{
            background: 'radial-gradient(50% 50% at 50% 40%, rgba(167, 243, 208, 0.6) 0%, rgba(240, 253, 244, 0) 100%)',
            filter: 'blur(40px)'
          }}
        />

        {/* Headline - All Dark */}
        <h1 className="text-[32px] font-black leading-[1.1] mb-4 tracking-tight" style={{ color: '#1C1917' }}>
          Know Your Medical Bill<br />
          Before the Surgery
        </h1>

        <p className="text-[15px] mb-8 max-w-[260px] mx-auto font-medium" style={{ color: '#78716C' }}>
          Using real insurer negotiated rates
        </p>

        {/* Button - Exact styling */}
        <Link
          href="/cost/total-hip-replacement/mayo-clinic-rochester/uhc-choice-plus"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-bold text-[16px] shadow-xl hover:scale-105 transition-transform"
          style={{
            background: 'linear-gradient(135deg, #10B981, #059669)',
            boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.4)'
          }}
        >
          Estimate My Bill <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* Stacked Cards - "HOW IT WORKS" */}
      <section className="px-5">
        <p className="text-[11px] font-bold uppercase tracking-wider mb-4 pl-1" style={{ color: '#A8A29E' }}>
          HOW IT WORKS
        </p>

        <div className="relative space-y-[-10px]">
          {/* Card 1 */}
          <div className="relative z-30 bg-white rounded-2xl p-5 border border-emerald-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-emerald-50 text-emerald-600 font-bold text-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
            </div>
            <div>
              <h3 className="font-bold text-stone-900">Select Procedure</h3>
              <p className="text-sm text-stone-500">Shoppable services</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative z-20 bg-white rounded-2xl p-5 border border-emerald-100 shadow-sm flex items-center gap-4 scale-[0.98] opacity-95">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-teal-50 text-teal-600 font-bold text-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            </div>
            <div>
              <h3 className="font-bold text-stone-900">Choose Hospital</h3>
              <p className="text-sm text-stone-500">Compare nearby prices</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative z-10 bg-white rounded-2xl p-5 border border-emerald-100 shadow-sm flex items-center gap-4 scale-[0.96] opacity-90">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-cyan-50 text-cyan-600 font-bold text-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <h3 className="font-bold text-stone-900">See Your Cost</h3>
              <p className="text-sm text-stone-500">Actual liability estimate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Procedures */}
      <section className="mt-10 px-5">
        <p className="text-[11px] font-bold uppercase tracking-wider mb-4 pl-1" style={{ color: '#A8A29E' }}>
          POPULAR PROCEDURES
        </p>
        <div className="flex gap-3 overflow-x-auto pb-6 -mx-5 px-5 no-scrollbar">
          {featuredProcedures.map((proc) => (
            <Link
              key={proc.slug}
              href={`/cost/${proc.slug}/mayo-clinic-rochester/uhc-choice-plus`}
              className="shrink-0 w-[140px] bg-white rounded-2xl p-4 border border-stone-100 shadow-sm active:scale-95 transition-transform"
            >
              <h3 className="font-bold text-[14px] leading-tight text-stone-900 mb-1">
                {proc.name}
              </h3>
              <p className="text-[12px] text-stone-500">$8k - $45k</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Floating Search - Glassmorphism */}
      <div
        className="fixed bottom-8 left-6 right-6 flex items-center gap-3 px-5 py-4 rounded-full shadow-2xl z-50 transition-transform active:scale-98"
        style={{
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.8)'
        }}
      >
        <Search className="w-5 h-5 text-stone-400" />
        <input
          type="text"
          placeholder="Search procedures..."
          className="flex-1 bg-transparent border-none outline-none text-[16px] placeholder-stone-400 text-stone-800"
        />
      </div>
    </div>
  );
}