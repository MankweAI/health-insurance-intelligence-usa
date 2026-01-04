/**
 * CMS Data Layer
 * 
 * Central aggregator for all CMS MRF data sources.
 * Each payer+region gets its own directory (e.g., uhc_ny, aetna_ca, etc.)
 * 
 * Current Data Sources:
 * - uhc_ny: UnitedHealthcare New York (~5,000 rates, ~2,400 providers)
 * 
 * Future Sources (to add):
 * - uhc_ca: UnitedHealthcare California
 * - aetna_ny: Aetna New York
 * - cigna_tx: Cigna Texas
 * - etc.
 */

import { AggregatedRate, CMSProvider, PriceStats } from '@/types/us-tic';

// Re-export from individual data sources
export * from '../uhc_ny';

// Import all data sources
import {
    UHC_NY_RATES,
    UHC_NY_PROVIDERS,
    UHC_NY_METADATA,
    getUhcNyRate,
    getUhcNyProvider,
    getUhcNyRatesForProcedure,
    getUhcNyRatesForProvider,
    getUhcNyProviderNpis,
    getUhcNyProcedureCodes,
    getUhcNyProviderBySlug,
    generateProviderSlug
} from '../uhc_ny';

// ============================================================================
// COMBINED DATA ACCESS (Aggregates all sources)
// ============================================================================

/**
 * All rates across all data sources
 */
export const CMS_RATES: AggregatedRate[] = [
    ...UHC_NY_RATES,
    // Add more sources here as they're added
];

/**
 * All providers across all data sources
 */
export const CMS_PROVIDERS: Record<string, CMSProvider> = {
    ...UHC_NY_PROVIDERS,
    // Add more sources here
};

/**
 * Available data sources
 */
export const CMS_SOURCES = [
    UHC_NY_METADATA,
    // Add more sources here
];

// ============================================================================
// GENERIC DATA ACCESS FUNCTIONS
// ============================================================================

export function getCMSRate(procedureCpt: string, providerNpi: string, planSlug?: string): AggregatedRate | undefined {
    return CMS_RATES.find(
        r => r.procedureCpt === procedureCpt &&
            r.providerNpi === providerNpi &&
            (!planSlug || r.planSlug === planSlug)
    );
}

export function getCMSProvider(npi: string): CMSProvider | undefined {
    return CMS_PROVIDERS[npi];
}

export function getCMSRatesForProcedure(procedureCpt: string): AggregatedRate[] {
    return CMS_RATES.filter(r => r.procedureCpt === procedureCpt);
}

export function getCMSRatesForProvider(providerNpi: string): AggregatedRate[] {
    return CMS_RATES.filter(r => r.providerNpi === providerNpi);
}

export function getCMSProcedureCodes(): string[] {
    return [...new Set(CMS_RATES.map(r => r.procedureCpt))];
}

export function getCMSProviderNpis(): string[] {
    return [...new Set(CMS_RATES.map(r => r.providerNpi).filter(npi => npi !== '0'))];
}

export function getCMSProviderBySlug(slug: string): { npi: string; provider: CMSProvider } | undefined {
    return getUhcNyProviderBySlug(slug);
}

export function getCMSProcedureStats(procedureCpt: string): PriceStats | null {
    const rates = getCMSRatesForProcedure(procedureCpt);
    if (rates.length === 0) return null;

    const aggregateRate = rates.find(r => r.providerNpi === '0');
    if (aggregateRate) return aggregateRate.priceStats;

    const prices = rates.map(r => r.priceStats.median);
    const sorted = prices.sort((a, b) => a - b);
    const sum = prices.reduce((a, b) => a + b, 0);

    return {
        min: sorted[0],
        max: sorted[sorted.length - 1],
        median: sorted[Math.floor(sorted.length / 2)],
        mean: Math.round(sum / prices.length),
        count: prices.length
    };
}

// Re-export slug generator
export { generateProviderSlug };

// ============================================================================
// METADATA
// ============================================================================

export const CMS_METADATA = {
    totalRates: CMS_RATES.length,
    totalProviders: Object.keys(CMS_PROVIDERS).length,
    totalProcedures: getCMSProcedureCodes().length,
    sources: CMS_SOURCES.map(s => `${s.payerCode}_${s.regionCode}`),
    lastUpdated: new Date().toISOString().split('T')[0]
};
