/**
 * CMS-Enriched Data Layer
 * 
 * Provides functions that combine CMS real pricing data with
 * the rich CPT encyclopedia metadata for complete provider-procedure info.
 */

import { CPT_ENCYCLOPEDIA, getCPTBySlug, getCPTEntry } from '@/data/us';
import {
    CMS_RATES,
    CMS_PROVIDERS,
    getCMSRatesForProcedure,
    getCMSRatesForProvider,
    getCMSProvider,
    getCMSProviderBySlug,
    generateProviderSlug
} from '@/data/cms';
import { AggregatedRate, CMSProvider, CPTEntry } from '@/types/us-tic';

// ============================================================================
// TYPES FOR UI COMPONENTS
// ============================================================================

export interface ProviderWithCMSPricing {
    npi: string;
    name: string;
    slug: string;
    providerType: 'organization' | 'individual';
    address: {
        city: string;
        state: string;
        zip: string;
        line1?: string;
    };
    phone: string;
    specialty: string;
    priceStats: {
        min: number;
        max: number;
        median: number;
        mean: number;
        count: number;
    };
}

export interface ProcedureWithCMSProviders {
    procedure: CPTEntry;
    providers: ProviderWithCMSPricing[];
    overallStats: {
        min: number;
        max: number;
        median: number;
        providerCount: number;
    };
}

export interface ProviderWithCMSProcedures {
    provider: CMSProvider;
    npi: string;
    slug: string;
    procedures: Array<{
        procedure: CPTEntry;
        priceStats: AggregatedRate['priceStats'];
    }>;
    overallStats: {
        procedureCount: number;
        avgMedianPrice: number;
    };
}

// ============================================================================
// PROCEDURE HUB DATA ACCESS
// ============================================================================

/**
 * Get all providers with CMS pricing for a procedure
 */
export function getCMSProvidersForProcedureHub(cptCode: string): ProviderWithCMSPricing[] {
    const rates = getCMSRatesForProcedure(cptCode);
    const providerRates = rates.filter(r => r.providerNpi !== '0');

    const providersWithPricing: ProviderWithCMSPricing[] = [];

    for (const rate of providerRates) {
        const cmsProvider = getCMSProvider(rate.providerNpi);

        if (cmsProvider) {
            providersWithPricing.push({
                npi: cmsProvider.npi,
                name: cmsProvider.name,
                slug: generateProviderSlug(cmsProvider.name),
                providerType: cmsProvider.providerType,
                address: {
                    city: cmsProvider.address.city,
                    state: cmsProvider.address.state,
                    zip: cmsProvider.address.zip,
                    line1: cmsProvider.address.line1,
                },
                phone: cmsProvider.phone,
                specialty: cmsProvider.specialty,
                priceStats: rate.priceStats,
            });
        }
    }

    return providersWithPricing.sort((a, b) => a.priceStats.median - b.priceStats.median);
}

/**
 * Get complete procedure data with CMS providers
 */
export function getProcedureWithCMSProviders(procedureSlug: string): ProcedureWithCMSProviders | null {
    const procedure = getCPTBySlug(procedureSlug);
    if (!procedure) return null;

    const providers = getCMSProvidersForProcedureHub(procedure.code);
    if (providers.length === 0) return null;

    const medians = providers.map(p => p.priceStats.median);
    const allMins = providers.map(p => p.priceStats.min);
    const allMaxs = providers.map(p => p.priceStats.max);

    return {
        procedure,
        providers,
        overallStats: {
            min: Math.min(...allMins),
            max: Math.max(...allMaxs),
            median: medians[Math.floor(medians.length / 2)],
            providerCount: providers.length,
        },
    };
}

// ============================================================================
// PROVIDER HUB DATA ACCESS
// ============================================================================

/**
 * Get provider with all procedures from CMS data
 */
export function getProviderWithCMSProcedures(providerSlug: string): ProviderWithCMSProcedures | null {
    const result = getCMSProviderBySlug(providerSlug);
    if (!result) return null;

    const { npi, provider } = result;

    // Get all rates for this provider
    const providerRates = getCMSRatesForProvider(npi);

    // Map to procedures
    const procedures = providerRates
        .map(rate => {
            const procedure = getCPTEntry(rate.procedureCpt);
            if (!procedure) return null;
            return {
                procedure,
                priceStats: rate.priceStats,
            };
        })
        .filter((p): p is NonNullable<typeof p> => p !== null)
        .sort((a, b) => a.priceStats.median - b.priceStats.median);

    const avgMedianPrice = procedures.length > 0
        ? Math.round(procedures.reduce((sum, p) => sum + p.priceStats.median, 0) / procedures.length)
        : 0;

    return {
        provider,
        npi,
        slug: providerSlug,
        procedures,
        overallStats: {
            procedureCount: procedures.length,
            avgMedianPrice,
        },
    };
}

/**
 * Get list of all CMS providers (for static params and listings)
 */
export function getAllCMSProviders(): Array<{
    npi: string;
    name: string;
    slug: string;
    providerType: 'organization' | 'individual';
    city: string;
    state: string;
}> {
    const seenSlugs = new Set<string>();
    const providers: Array<{
        npi: string;
        name: string;
        slug: string;
        providerType: 'organization' | 'individual';
        city: string;
        state: string;
    }> = [];

    for (const [npi, provider] of Object.entries(CMS_PROVIDERS)) {
        const slug = generateProviderSlug(provider.name);
        if (!seenSlugs.has(slug)) {
            seenSlugs.add(slug);
            providers.push({
                npi,
                name: provider.name,
                slug,
                providerType: provider.providerType,
                city: provider.address.city,
                state: provider.address.state,
            });
        }
    }

    return providers.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Get procedures that have CMS data available
 */
export function getProceduresWithCMSData(): CPTEntry[] {
    const cmsCptCodes = new Set(CMS_RATES.map(r => r.procedureCpt));
    return CPT_ENCYCLOPEDIA.filter(proc => cmsCptCodes.has(proc.code));
}

// ============================================================================
// COST PAGE DATA ACCESS
// ============================================================================

export interface CMSCostPageData {
    procedure: CPTEntry;
    provider: {
        npi: string;
        name: string;
        slug: string;
        providerType: 'organization' | 'individual';
        address: {
            street: string;
            city: string;
            state: string;
            zip: string;
        };
        specialty: string;
        phone: string;
    };
    rate: {
        negotiatedRate: number;
        priceStats: {
            min: number;
            max: number;
            median: number;
            mean: number;
            count: number;
        };
    };
    planSlug: string;
    priceContext: {
        rank: number;
        total: number;
        percentile: number;
        average: number;
        difference: number;
        percentDiff: number;
    };
}

/**
 * Get all data needed for a cost leaf page
 */
export function getCMSCostPageData(
    procedureSlug: string,
    providerSlug: string,
    planSlug: string
): CMSCostPageData | null {
    // Get procedure
    const procedure = getCPTBySlug(procedureSlug);
    if (!procedure) return null;

    // Get provider
    const providerResult = getCMSProviderBySlug(providerSlug);
    if (!providerResult) return null;
    const { npi, provider: cmsProvider } = providerResult;

    // Get rate for this procedure-provider combination
    const rates = getCMSRatesForProcedure(procedure.code);
    const providerRate = rates.find(r => r.providerNpi === npi);
    if (!providerRate) return null;

    // Calculate price context (ranking among all providers for this procedure)
    const allProviderRates = rates.filter(r => r.providerNpi !== '0');
    const sortedByPrice = [...allProviderRates].sort((a, b) => a.priceStats.median - b.priceStats.median);
    const rank = sortedByPrice.findIndex(r => r.providerNpi === npi) + 1;
    const total = sortedByPrice.length;
    const percentile = Math.round((1 - rank / total) * 100);

    // Calculate average and difference
    const allMedians = allProviderRates.map(r => r.priceStats.median);
    const average = Math.round(allMedians.reduce((sum, m) => sum + m, 0) / allMedians.length);
    const difference = providerRate.priceStats.median - average;
    const percentDiff = Math.round((difference / average) * 100);

    return {
        procedure,
        provider: {
            npi,
            name: cmsProvider.name,
            slug: providerSlug,
            providerType: cmsProvider.providerType,
            address: {
                street: cmsProvider.address.line1 || '',
                city: cmsProvider.address.city,
                state: cmsProvider.address.state,
                zip: cmsProvider.address.zip,
            },
            specialty: cmsProvider.specialty,
            phone: cmsProvider.phone,
        },
        rate: {
            negotiatedRate: providerRate.priceStats.median,
            priceStats: providerRate.priceStats,
        },
        planSlug,
        priceContext: {
            rank,
            total,
            percentile,
            average,
            difference,
            percentDiff,
        },
    };
}
