/**
 * US Healthcare Payer Plans
 * 
 * Insurance plan data with cost-sharing details.
 * 
 * Phase 1: Sample data for 7 major payers
 * Phase 2: Integrate with CMS Plan Finder / Healthcare.gov API
 */

import { UsPayerPlan } from '@/types/us-tic';

export const PLANS: UsPayerPlan[] = [
    {
        slug: 'uhc-choice-plus',
        payerName: 'UnitedHealthcare',
        planName: 'Choice Plus',
        networkType: 'PPO',
        metalTier: 'Gold',
        planYear: 2025,
        costSharing: {
            typicalDeductible: 1500,
            typicalCoinsurance: 20,
            outOfPocketMax: 7500
        }
    },
    {
        slug: 'bcbs-blue-card-ppo',
        payerName: 'Blue Cross Blue Shield',
        planName: 'Blue Card PPO',
        networkType: 'PPO',
        metalTier: 'Gold',
        planYear: 2025,
        costSharing: {
            typicalDeductible: 2000,
            typicalCoinsurance: 20,
            outOfPocketMax: 8000
        }
    },
    {
        slug: 'aetna-open-access',
        payerName: 'Aetna',
        planName: 'Open Access Select',
        networkType: 'HMO',
        metalTier: 'Silver',
        planYear: 2025,
        costSharing: {
            typicalDeductible: 3000,
            typicalCoinsurance: 30,
            outOfPocketMax: 8500
        }
    },
    {
        slug: 'cigna-open-access',
        payerName: 'Cigna',
        planName: 'Open Access Plus',
        networkType: 'PPO',
        metalTier: 'Gold',
        planYear: 2025,
        costSharing: {
            typicalDeductible: 1750,
            typicalCoinsurance: 20,
            outOfPocketMax: 7000
        }
    },
    {
        slug: 'humana-gold-plus',
        payerName: 'Humana',
        planName: 'Gold Plus HMO',
        networkType: 'HMO',
        metalTier: 'Gold',
        planYear: 2025,
        costSharing: {
            typicalDeductible: 1000,
            typicalCoinsurance: 15,
            outOfPocketMax: 6500
        }
    },
    {
        slug: 'kaiser-hmo-gold',
        payerName: 'Kaiser Permanente',
        planName: 'Gold HMO',
        networkType: 'HMO',
        metalTier: 'Gold',
        planYear: 2025,
        costSharing: {
            typicalDeductible: 0,
            typicalCoinsurance: 20,
            outOfPocketMax: 6000
        }
    },
    {
        slug: 'anthem-pathway-enhanced',
        payerName: 'Anthem',
        planName: 'Pathway X Enhanced',
        networkType: 'EPO',
        metalTier: 'Silver',
        planYear: 2025,
        costSharing: {
            typicalDeductible: 2500,
            typicalCoinsurance: 25,
            outOfPocketMax: 8500
        }
    }
];

/**
 * Get plan by slug
 */
export function getPlanBySlug(slug: string): UsPayerPlan | undefined {
    return PLANS.find(p => p.slug === slug);
}

/**
 * Get plans by payer
 */
export function getPlansByPayer(payerName: string): UsPayerPlan[] {
    return PLANS.filter(p => p.payerName.toLowerCase().includes(payerName.toLowerCase()));
}

/**
 * Get plans by network type
 */
export function getPlansByNetworkType(networkType: UsPayerPlan['networkType']): UsPayerPlan[] {
    return PLANS.filter(p => p.networkType === networkType);
}

/**
 * Get all plans
 */
export function getAllPlans(): UsPayerPlan[] {
    return [...PLANS];
}
