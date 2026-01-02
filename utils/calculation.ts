import { Contribution, FamilyComposition, IncomeBand } from './types';

export function calculateMonthlyPremium(
    contribution: Contribution,
    income: number,
    family: FamilyComposition
): number {
    const { pricing_model, pricing_matrix } = contribution;

    let rates = { main: 0, adult: 0, child: 0 };

    if (pricing_model === 'Fixed') {
        // Direct mapping for Fixed plans (e.g., Classic Comprehensive)
        rates = pricing_matrix as any;
    }
    else if (pricing_model === 'Income_Banded') {
        // Logic for KeyCare / BonCap 
        const bands = pricing_matrix as IncomeBand[];
        // Find the correct band
        const activeBand = bands.find(band => income >= band.min && (band.max === null || income <= band.max));

        if (activeBand) {
            rates = activeBand;
        } else {
            // Fallback to the highest band if income exceeds all max values
            rates = bands[bands.length - 1];
        }
    }

    // Calculate Total
    const total =
        (family.main * rates.main) +
        (family.adult * rates.adult) +
        (family.child * rates.child);

    return total;
}

export const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
        style: 'currency',
        currency: 'ZAR',
        maximumFractionDigits: 0,
    }).format(amount);
};
