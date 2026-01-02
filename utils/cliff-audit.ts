// utils/cliff-logic.ts
import { Plan, IncomeBand } from './types';

export interface CliffAudit {
    currentPremium: number;
    nextCliff: number | null;
    premiumJump: number;
    isDangerZone: boolean;
    marginalTaxRate: number; // The "Tax" on a R1 raise
    annualImpact: number;
}

export const auditIncomeCliff = (income: number, plan: Plan): CliffAudit | null => {
    const contribution = plan.contributions[0];
    if (contribution.pricing_model !== 'Income_Banded') return null;

    const bands = contribution.pricing_matrix as IncomeBand[];

    // 1. Identify current band
    const currentBand = bands.find(b => income >= b.min && (b.max === null || income <= b.max));
    if (!currentBand) return null;

    const currentPremium = currentBand.main;

    // 2. Identify the next cliff
    const currentBandIndex = bands.indexOf(currentBand);
    const nextBand = bands[currentBandIndex + 1];

    if (!nextBand) {
        return {
            currentPremium,
            nextCliff: null,
            premiumJump: 0,
            isDangerZone: false,
            marginalTaxRate: 0,
            annualImpact: 0
        };
    }

    const nextCliff = nextBand.min;
    const premiumJump = nextBand.main - currentPremium;

    return {
        currentPremium,
        nextCliff,
        premiumJump,
        // Danger zone is within R500 of a cliff where marginal cost is highest [cite: 1568]
        isDangerZone: (nextCliff - income) <= 500,
        // A R1 increase triggers the full premium jump 
        marginalTaxRate: (premiumJump / 1) * 100,
        annualImpact: premiumJump * 12
    };
};