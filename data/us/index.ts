/**
 * US Healthcare Data Store
 * 
 * Unified export of all US healthcare data.
 * This is the main entry point for the data layer.
 * 
 * Phase 1: In-memory dummy data modeled after CMS structure
 * Phase 2: Replace with database/API calls to real CMS data
 */

// Re-export types
export type {
    CPTEntry,
    UsProvider,
    UsPayerPlan,
    NegotiatedRate,
    RegionalStats,
    ProcedureCategory,
    AnesthesiaType,
    TraumaLevel,
    FacilityType,
    NetworkType,
    PlanMetal,
    ContractType,
    ProviderAddress,
    ProviderMetrics
} from '@/types/us-tic';

// Import data sources
import { CPT_ENCYCLOPEDIA, getCPTEntry, getCPTBySlug, getRelatedProcedures } from './cpt-encyclopedia';
import { PROVIDERS, getProviderByNpi, getProviderBySlug, getNearbyProviders, getProvidersByState } from './providers';
import { PLANS, getPlanBySlug, getPlansByPayer, getAllPlans } from './plans';
import {
    NEGOTIATED_RATES,
    getNegotiatedRate,
    getRatesForProcedureAtProvider,
    getRatesForProcedureByPlan,
    getProcedurePriceStats,
    getProviderPriceRanking,
    getPriceVsAverage,
    REGIONAL_STATS,
    getRegionalStats
} from './rates';

// Re-export data arrays
export { CPT_ENCYCLOPEDIA, PROVIDERS, PLANS, NEGOTIATED_RATES, REGIONAL_STATS };

// Re-export accessor functions
export {
    // CPT Encyclopedia
    getCPTEntry,
    getCPTBySlug,
    getRelatedProcedures,

    // Providers
    getProviderByNpi,
    getProviderBySlug,
    getNearbyProviders,
    getProvidersByState,

    // Plans
    getPlanBySlug,
    getPlansByPayer,
    getAllPlans,

    // Rates
    getNegotiatedRate,
    getRatesForProcedureAtProvider,
    getRatesForProcedureByPlan,
    getProcedurePriceStats,
    getProviderPriceRanking,
    getPriceVsAverage,
    getRegionalStats
};

// Convenience aliases for backward compatibility with old dummy-seed
export const getProcedure = getCPTBySlug;
export const getProvider = getProviderBySlug;
export const getPlan = getPlanBySlug;

/**
 * Get rate using slugs (backward compatible with old API)
 */
export function getRate(procedureSlug: string, providerSlug: string, planSlug: string) {
    const procedure = getCPTBySlug(procedureSlug);
    const provider = getProviderBySlug(providerSlug);

    if (!procedure || !provider) return undefined;

    const rate = getNegotiatedRate(procedure.code, provider.npi, planSlug);

    // Return in old format for backward compatibility
    if (rate) {
        return {
            procedure_cpt: rate.procedureCpt,
            provider_npi: rate.providerNpi,
            plan_slug: rate.planSlug,
            negotiated_rate: rate.negotiatedRate,
            contract_type: rate.contractType
        };
    }

    return undefined;
}

// Store metadata
export const STORE_METADATA = {
    lastUpdated: '2025-12-15T00:00:00Z',
    dataVersion: '1.0.0',
    source: 'Sample data modeled after CMS Machine-Readable Files',
    procedureCount: CPT_ENCYCLOPEDIA.length,
    providerCount: PROVIDERS.length,
    planCount: PLANS.length,
    rateCount: NEGOTIATED_RATES.length
};

// Legacy MOCK_DB export for backward compatibility
export const MOCK_DB = {
    procedures: CPT_ENCYCLOPEDIA.map(p => ({
        name: p.name,
        slug: p.slug,
        cpt_code: p.code,
        category: p.category
    })),
    providers: PROVIDERS.map(p => ({
        name: p.name,
        slug: p.slug,
        npi: p.npi,
        address: {
            street: p.address.street,
            city: p.address.city,
            state: p.address.state,
            zip: p.address.zip
        }
    })),
    plans: PLANS.map(p => ({
        payer_name: p.payerName,
        plan_name: p.planName,
        slug: p.slug,
        network_type: p.networkType
    })),
    rates: NEGOTIATED_RATES.map(r => ({
        procedure_cpt: r.procedureCpt,
        provider_npi: r.providerNpi,
        plan_slug: r.planSlug,
        negotiated_rate: r.negotiatedRate,
        contract_type: r.contractType
    }))
};
