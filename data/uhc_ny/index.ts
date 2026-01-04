/**
 * UHC NY Data Layer
 * 
 * Loads CMS MRF data for UnitedHealthcare New York.
 * This is organized per payer+region for easy expansion.
 */

import { AggregatedRate, CMSProvider } from '@/types/us-tic';

// Import the JSON data from uhc_ny directory
import ratesData from './rates.json';
import providersData from './providers.json';

// Type the imported data
export const UHC_NY_RATES: AggregatedRate[] = ratesData as AggregatedRate[];
export const UHC_NY_PROVIDERS: Record<string, CMSProvider> = providersData as Record<string, CMSProvider>;

// Metadata
export const UHC_NY_METADATA = {
    payer: 'UnitedHealthcare',
    payerCode: 'uhc',
    region: 'New York',
    regionCode: 'ny',
    rateCount: UHC_NY_RATES.length,
    providerCount: Object.keys(UHC_NY_PROVIDERS).length,
    planSlug: 'uhc-choice-plus',
};

/**
 * Get rate for a specific CPT-NPI combination
 */
export function getUhcNyRate(procedureCpt: string, providerNpi: string): AggregatedRate | undefined {
    return UHC_NY_RATES.find(
        r => r.procedureCpt === procedureCpt && r.providerNpi === providerNpi
    );
}

/**
 * Get provider by NPI
 */
export function getUhcNyProvider(npi: string): CMSProvider | undefined {
    return UHC_NY_PROVIDERS[npi];
}

/**
 * Get all rates for a procedure
 */
export function getUhcNyRatesForProcedure(procedureCpt: string): AggregatedRate[] {
    return UHC_NY_RATES.filter(r => r.procedureCpt === procedureCpt);
}

/**
 * Get all rates for a provider
 */
export function getUhcNyRatesForProvider(providerNpi: string): AggregatedRate[] {
    return UHC_NY_RATES.filter(r => r.providerNpi === providerNpi);
}

/**
 * Get all unique CPT codes
 */
export function getUhcNyProcedureCodes(): string[] {
    return [...new Set(UHC_NY_RATES.map(r => r.procedureCpt))];
}

/**
 * Get all provider NPIs (excluding aggregates)
 */
export function getUhcNyProviderNpis(): string[] {
    return [...new Set(UHC_NY_RATES.map(r => r.providerNpi).filter(npi => npi !== '0'))];
}

/**
 * Generate slug from provider name
 */
export function generateProviderSlug(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .substring(0, 50);
}

/**
 * Get provider by slug
 */
export function getUhcNyProviderBySlug(slug: string): { npi: string; provider: CMSProvider } | undefined {
    for (const [npi, provider] of Object.entries(UHC_NY_PROVIDERS)) {
        if (generateProviderSlug(provider.name) === slug) {
            return { npi, provider };
        }
    }
    return undefined;
}
