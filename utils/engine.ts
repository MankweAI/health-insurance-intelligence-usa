import { Plan, Contribution, IncomeBand, FixedPricing } from './types';
import { Persona } from './persona'; // Ensure this import exists

export interface FinancialProfile {
    monthlyPremium: number;
    savings: {
        isPooled: boolean;
        annualAllocation: number;
    };
}

export const PricingEngine = {

    // 1. Existing Calculator
    calculateProfile: (
        contribution: Contribution,
        members: { main: number; adult: number; child: number },
        income: number
    ): FinancialProfile => {
        let rates = { main: 0, adult: 0, child: 0 };

        if (contribution.pricing_model === 'Fixed') {
            rates = contribution.pricing_matrix as FixedPricing;
        } else if (contribution.pricing_model === 'Income_Banded') {
            const bands = contribution.pricing_matrix as IncomeBand[];
            const activeBand = bands.find((band) =>
                income >= band.min && (band.max === null || band.max === 0 || income <= band.max)
            ) || bands[bands.length - 1];
            rates = activeBand;
        }

        const monthlyPremium =
            (members.main * rates.main) +
            (members.adult * rates.adult) +
            (members.child * rates.child);

        const hasSavings = !!(contribution.msa_structure && contribution.msa_structure.type !== 'None');
        let annualAllocation = 0;

        if (hasSavings && contribution.msa_structure) {
            if (contribution.msa_structure.type === 'Percentage') {
                const val = typeof contribution.msa_structure.value === 'number' ? contribution.msa_structure.value : parseFloat(contribution.msa_structure.value.toString());
                annualAllocation = (monthlyPremium * (val / 100)) * 12;
            } else if (contribution.msa_structure.type === 'Fixed') {
                if (typeof contribution.msa_structure.value === 'number') {
                    annualAllocation = contribution.msa_structure.value;
                }
            }
        }

        return {
            monthlyPremium,
            savings: { isPooled: hasSavings, annualAllocation }
        };
    },

    // 2. NEW: The Consideration Set Selector
    selectConsiderationSet: (
        allPlans: Plan[],
        persona: Persona,
        excludedIds: string[] = []
    ): Plan[] => {
        if (!persona.actuarial_logic) return [];

        const { target_plan_id, brand_lock } = persona.actuarial_logic;

        // A. DETERMINISTIC BRAND LOCKING
        // If persona says "Discovery", we ONLY show Discovery.
        let allowedScheme = brand_lock;

        // Fallback: sniff the slug if explicit lock is missing
        if (!allowedScheme) {
            const slug = persona.slug.toLowerCase();
            if (slug.includes('discovery')) allowedScheme = 'Discovery';
            else if (slug.includes('bestmed')) allowedScheme = 'Bestmed';
            else if (slug.includes('bonitas')) allowedScheme = 'Bonitas';
        }

        // B. FILTER UNIVERSE
        let candidates = allPlans.filter(p => {
            // 1. Exclude removed items
            if (excludedIds.includes(p.id)) return false;

            // 2. Apply Brand Lock
            if (allowedScheme) {
                // Fuzzy match scheme name
                return p.identity.scheme_name.toLowerCase().includes(allowedScheme.toLowerCase());
            }
            return true;
        });

        // C. IDENTIFY ANCHOR (The "Perfect Match")
        const anchorPlan = candidates.find(p => p.id === target_plan_id);

        // If anchor was removed by user, we need a new "Best Alternative"
        // We'll just sort the remaining candidates by price similarity to the ORIGINAL target
        // to find the next closest sibling.
        const originalTarget = allPlans.find(p => p.id === target_plan_id);
        const referencePrice = originalTarget ? originalTarget.price : 2000; // Default fallback

        // Sort by proximity to the reference price (The "Cluster" Strategy)
        candidates.sort((a, b) =>
            Math.abs(a.price - referencePrice) - Math.abs(b.price - referencePrice)
        );

        // D. RETURN TOP 3
        // If anchor exists and wasn't filtered, allow it to float to top. 
        // Our sort above puts closest priced items first, so anchor (diff=0) is naturally first.
        return candidates.slice(0, 3);
    }
};

export const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
        style: 'currency',
        currency: 'ZAR',
        maximumFractionDigits: 0,
    }).format(amount);
};