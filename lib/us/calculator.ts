export interface LiabilityParams {
    negotiatedRate: number;
    remainingDeductible: number;
    coInsuranceRate: number; // 0.20 for 20%
    outOfPocketMaxRemaining: number;
}

export interface LiabilityResult {
    totalLiability: number;
    breakdown: {
        deductiblePaid: number;
        coInsurancePaid: number;
        planPays: number;
    };
}

export function calculateLiability(params: LiabilityParams): LiabilityResult {
    const { negotiatedRate, remainingDeductible, coInsuranceRate, outOfPocketMaxRemaining } = params;

    // 1. Pay Deductible first
    const deductiblePayment = Math.min(negotiatedRate, remainingDeductible);
    const remainingBillAfterDeductible = Math.max(0, negotiatedRate - deductiblePayment);

    // 2. Pay Co-insurance on the remainder
    let coInsurancePayment = remainingBillAfterDeductible * coInsuranceRate;

    // 3. Cap at Out-of-Pocket Max (OOPM)
    // The Total User Cost so far is (Deductible + CoInsurance). 
    // We need to ensure we don't exceed the OOPM remaining.
    // NOTE: deductiblePayment usually counts towards OOPM.

    // Real world logic: 
    // User pays Deductible.
    // Then User pays Co-insurance.
    // Total cannot exceed OOPM.

    let totalUserCost = deductiblePayment + coInsurancePayment;

    if (totalUserCost > outOfPocketMaxRemaining) {
        totalUserCost = outOfPocketMaxRemaining;
        // Back-calculate co-insurance if capped
        coInsurancePayment = Math.max(0, totalUserCost - deductiblePayment);
    }

    const planPays = negotiatedRate - totalUserCost;

    return {
        totalLiability: totalUserCost,
        breakdown: {
            deductiblePaid: deductiblePayment,
            coInsurancePaid: coInsurancePayment,
            planPays: planPays
        }
    };
}
