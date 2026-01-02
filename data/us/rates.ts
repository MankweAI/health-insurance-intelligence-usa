/**
 * Negotiated Rates (TiC Data)
 * 
 * This is the core "edge" data connecting procedures, providers, and plans.
 * Structure mirrors actual CMS Machine-Readable File format.
 * 
 * Phase 1: Generated sample rates with realistic variance
 * Phase 2: Replace with parsed MRF data from payers
 */

import { NegotiatedRate, RegionalStats } from '@/types/us-tic';
import { CPT_ENCYCLOPEDIA } from './cpt-encyclopedia';
import { PROVIDERS } from './providers';
import { PLANS } from './plans';

// Generate realistic rates based on procedure category and provider tier
function generateRate(
    cptCode: string,
    providerNpi: string,
    planSlug: string,
    category: string,
    providerName: string
): NegotiatedRate {
    // Base prices by category (realistic CMS averages)
    const basePrices: Record<string, number> = {
        'Inpatient': 45000,
        'Outpatient': 3500,
        'Imaging': 1200,
        'Laboratory': 500,
        'Emergency': 8000
    };

    const basePrice = basePrices[category] || 5000;

    // Provider tier multiplier (major academic centers cost more)
    const premiumProviders = ['mayo', 'cedars', 'cleveland', 'johns-hopkins', 'stanford'];
    const providerMultiplier = premiumProviders.some(p => providerName.toLowerCase().includes(p)) ? 1.35 : 1.0;

    // Plan network discount (HMOs negotiate harder)
    const plan = PLANS.find(p => p.slug === planSlug);
    const networkDiscount = plan?.networkType === 'HMO' ? 0.85 : plan?.networkType === 'EPO' ? 0.90 : 0.95;

    // Regional variance (+/- 25%)
    const regionalVariance = 0.75 + (Math.random() * 0.5);

    // Calculate final rate
    const finalRate = Math.round(basePrice * providerMultiplier * networkDiscount * regionalVariance);

    return {
        procedureCpt: cptCode,
        providerNpi: providerNpi,
        planSlug: planSlug,
        negotiatedRate: finalRate,
        contractType: 'negotiated',
        modifier: null,
        placeOfService: category === 'Inpatient' ? 'inpatient' : 'outpatient',
        source: {
            extractedAt: '2025-12-15T00:00:00Z',
            mrfVersion: '1.0.0',
            reportingPeriod: '2025-Q4'
        }
    };
}

// Generate all rate combinations
function generateAllRates(): NegotiatedRate[] {
    const rates: NegotiatedRate[] = [];

    for (const procedure of CPT_ENCYCLOPEDIA) {
        for (const provider of PROVIDERS) {
            for (const plan of PLANS) {
                rates.push(generateRate(
                    procedure.code,
                    provider.npi,
                    plan.slug,
                    procedure.category,
                    provider.name
                ));
            }
        }
    }

    return rates;
}

// Pre-generate rates for consistent data
export const NEGOTIATED_RATES = generateAllRates();

/**
 * Get specific negotiated rate
 */
export function getNegotiatedRate(
    cptCode: string,
    providerNpi: string,
    planSlug: string
): NegotiatedRate | undefined {
    return NEGOTIATED_RATES.find(
        r => r.procedureCpt === cptCode &&
            r.providerNpi === providerNpi &&
            r.planSlug === planSlug
    );
}

/**
 * Get all rates for a procedure at a provider
 */
export function getRatesForProcedureAtProvider(
    cptCode: string,
    providerNpi: string
): NegotiatedRate[] {
    return NEGOTIATED_RATES.filter(
        r => r.procedureCpt === cptCode && r.providerNpi === providerNpi
    );
}

/**
 * Get all rates for a procedure across all providers (for a given plan)
 */
export function getRatesForProcedureByPlan(
    cptCode: string,
    planSlug: string
): NegotiatedRate[] {
    return NEGOTIATED_RATES.filter(
        r => r.procedureCpt === cptCode && r.planSlug === planSlug
    );
}

/**
 * Get price statistics for a procedure within a plan
 */
export function getProcedurePriceStats(cptCode: string, planSlug: string): {
    min: number;
    max: number;
    median: number;
    mean: number;
    count: number;
} | null {
    const rates = getRatesForProcedureByPlan(cptCode, planSlug);
    if (rates.length === 0) return null;

    const prices = rates.map(r => r.negotiatedRate).sort((a, b) => a - b);
    const sum = prices.reduce((a, b) => a + b, 0);

    return {
        min: prices[0],
        max: prices[prices.length - 1],
        median: prices[Math.floor(prices.length / 2)],
        mean: Math.round(sum / prices.length),
        count: prices.length
    };
}

/**
 * Get provider's price ranking for a procedure (within a plan)
 */
export function getProviderPriceRanking(
    cptCode: string,
    providerNpi: string,
    planSlug: string
): { rank: number; total: number; percentile: number } | null {
    const rates = getRatesForProcedureByPlan(cptCode, planSlug)
        .sort((a, b) => a.negotiatedRate - b.negotiatedRate);

    const index = rates.findIndex(r => r.providerNpi === providerNpi);
    if (index === -1) return null;

    return {
        rank: index + 1,
        total: rates.length,
        percentile: Math.round((1 - index / rates.length) * 100)
    };
}

/**
 * Compare provider's rate to regional average
 */
export function getPriceVsAverage(
    cptCode: string,
    providerNpi: string,
    planSlug: string
): { rate: number; average: number; difference: number; percentDiff: number } | null {
    const rate = getNegotiatedRate(cptCode, providerNpi, planSlug);
    const stats = getProcedurePriceStats(cptCode, planSlug);

    if (!rate || !stats) return null;

    const difference = rate.negotiatedRate - stats.mean;
    const percentDiff = Math.round((difference / stats.mean) * 100);

    return {
        rate: rate.negotiatedRate,
        average: stats.mean,
        difference,
        percentDiff
    };
}

// Generate regional statistics
export const REGIONAL_STATS: RegionalStats[] = (() => {
    const statsByStateAndCode: Map<string, RegionalStats> = new Map();

    for (const procedure of CPT_ENCYCLOPEDIA) {
        // Group rates by state
        const stateRates: Map<string, number[]> = new Map();

        for (const provider of PROVIDERS) {
            const state = provider.address.state;
            const rates = PLANS.map(plan => {
                const rate = getNegotiatedRate(procedure.code, provider.npi, plan.slug);
                return rate?.negotiatedRate;
            }).filter((r): r is number => r !== undefined);

            if (!stateRates.has(state)) {
                stateRates.set(state, []);
            }
            stateRates.get(state)!.push(...rates);
        }

        // Calculate stats for each state
        for (const [state, prices] of stateRates) {
            if (prices.length === 0) continue;

            const sorted = prices.sort((a, b) => a - b);
            const sum = prices.reduce((a, b) => a + b, 0);

            statsByStateAndCode.set(`${state}-${procedure.code}`, {
                state,
                cptCode: procedure.code,
                stats: {
                    min: sorted[0],
                    max: sorted[sorted.length - 1],
                    median: sorted[Math.floor(sorted.length / 2)],
                    mean: Math.round(sum / sorted.length),
                    percentile25: sorted[Math.floor(sorted.length * 0.25)],
                    percentile75: sorted[Math.floor(sorted.length * 0.75)],
                    providerCount: Math.ceil(prices.length / PLANS.length)
                }
            });
        }
    }

    return Array.from(statsByStateAndCode.values());
})();

/**
 * Get regional stats for a procedure in a state
 */
export function getRegionalStats(cptCode: string, state: string): RegionalStats | undefined {
    return REGIONAL_STATS.find(s => s.cptCode === cptCode && s.state === state);
}
