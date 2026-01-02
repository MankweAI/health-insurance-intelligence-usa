import {
    DiscoveryPlan,
    ProcedureContext,
    CopaymentLiabilityResult,
    DiscoveryNetworkType,
    ScopesProcedureRule
} from '@/types/schemes/discovery';

/**
 * Discovery Health Risk Engine (2026 Rules)
 * Pure function implementation that calculates financial liability based strictly on
 * the scheme's brochure rules.
 */
export class DiscoveryRiskEngine {

    /**
     * Main Entry Point: Calculates the liability for a specific scenario.
     */
    static evaluate(plan: DiscoveryPlan, context: ProcedureContext): CopaymentLiabilityResult {
        // 1. Initialize Baseline (Assume Scheme Pays 100% unless a rule triggers)
        let result: CopaymentLiabilityResult = {
            totalEstimatedCost: 0, // In a real app, this comes from a tariff file
            schemePays: 0,
            memberLiability: 0,
            breakdown: {},
            appliedRules: [],
            warnings: []
        };

        // 2. CHECK: Global Network Penalty (The "Gatekeeper" Rule)
        // If the member goes to a non-network hospital for a non-emergency, 
        // the "Upfront Payment" applies immediately.
        const isNetworkViolation = !context.facilityInNetwork && !context.isEmergency;

        if (isNetworkViolation) {
            const penalty = plan.hospitalBenefit.outOfNetworkUpfrontPayment || 0;
            if (penalty > 0) {
                result.memberLiability += penalty;
                result.breakdown.upfrontPayment = penalty;
                result.appliedRules.push("Out-of-Network Upfront Payment");
                result.warnings.push(`You are using a non-${plan.hospitalNetwork} facility. This attracts a specific deductible.`);
            }
        }

        // 3. CHECK: Specific Procedure Rules (Scopes, Day Surgery, etc.)
        // These specific rules often override the general hospital benefit.

        // A. SCOPES (Gastroscopy, Colonoscopy, etc.)
        const scopeRule = this.findScopeRule(plan, context.procedureName);
        if (scopeRule) {
            return this.calculateScopeLiability(plan, scopeRule, context, result);
        }

        // B. DAY SURGERY NETWORK PROCEDURES (Tonsils, Hernia, Cataract)
        if (this.isDaySurgeryProcedure(plan, context.procedureName)) {
            return this.calculateDaySurgeryLiability(plan, context, result);
        }

        // 4. Default Fallback: Standard Hospital Benefit
        // If no specific rule matched, we assume standard cover subject to network rules calculated in step 2.
        if (result.memberLiability === 0 && !isNetworkViolation) {
            result.appliedRules.push("Standard Hospital Benefit (Unlimited)");
        }

        return result;
    }

    // ==========================================================================
    // LOGIC HANDLERS
    // ==========================================================================

    /**
     * Handles the complex 3-tier logic for Scopes (Day Clinic vs Hospital vs Rooms)
     */
    private static calculateScopeLiability(
        plan: DiscoveryPlan,
        rule: ScopesProcedureRule,
        context: ProcedureContext,
        currentResult: CopaymentLiabilityResult
    ): CopaymentLiabilityResult {
        let liability = 0;
        const isDayClinic = context.facilityType === "Day Clinic";
        const isHospital = context.facilityType === "Hospital";
        const isRooms = context.facilityType === "In-rooms";

        // 1. In-Rooms Logic
        if (isRooms) {
            liability = context.facilityInNetwork
                ? rule.inRoomsScopesCopayment.singleScope
                : rule.nonNetworkInRoomsCopayment.singleScope;

            currentResult.appliedRules.push("In-Rooms Scope Deductible");
        }

        // 2. Day Clinic Logic (The Preferred Route)
        else if (isDayClinic) {
            liability = rule.daySurgeryNetworkDayClinicCopayment;
            currentResult.appliedRules.push("Day Clinic Deductible");

            // Value-Based Network Reduction? (Only if configured in context/plan)
            if (rule.valueBasedNetworkReduction.applicableToClassicEssential && context.healthcareProfessionalHasPaymentArrangement) {
                // Logic to reduce cost if applicable (simplified here)
            }
        }

        // 3. Acute Hospital Logic (The Penalized Route)
        else if (isHospital) {
            liability = rule.hospitalAccountCopayment;
            currentResult.appliedRules.push("Hospital Admission Deductible (Scope)");
            currentResult.warnings.push("Using an acute hospital for this scope attracts a higher deductible than a Day Clinic.");
        }

        // 4. Apply the Network Penalty on top? 
        // For Scopes, the brochure says "Upfront payment" applies INSTEAD of the deductible if out of network.
        if (!context.facilityInNetwork && !context.isEmergency) {
            // Override the deductible with the massive penalty (e.g., R12,650)
            liability = rule.outOfNetworkUpfrontPayment;
            currentResult.appliedRules.push("Non-Network Scope Upfront Payment");
            currentResult.breakdown.upfrontPayment = liability;
            // Clear previous breakdown to avoid double counting
            currentResult.breakdown.dayClinicAccountCopayment = 0;
            currentResult.breakdown.hospitalAccountCopayment = 0;
        } else {
            // Assign breakdown for standard deductibles
            if (isDayClinic) currentResult.breakdown.dayClinicAccountCopayment = liability;
            if (isHospital) currentResult.breakdown.hospitalAccountCopayment = liability;
        }

        currentResult.memberLiability = liability;
        return currentResult;
    }

    /**
     * Handles "Day Surgery Network" procedures (e.g. Cataract, Hernia)
     */
    private static calculateDaySurgeryLiability(
        plan: DiscoveryPlan,
        context: ProcedureContext,
        currentResult: CopaymentLiabilityResult
    ): CopaymentLiabilityResult {
        // Logic: If user is in a Hospital (not Day Clinic), do they pay a penalty?
        // On Smart plans, "Day Surgery" procedures MUST be done in a Day Clinic.

        const isHospital = context.facilityType === "Hospital";
        const isDayClinic = context.facilityType === "Day Clinic";

        if (isHospital) {
            // If performed in acute hospital, member usually pays the facility fee or a standard deductible?
            // For Smart Series: "You pay a deductible of R7,750 if these procedures are done in hospital" (Generalizing 2026 rule)
            // Note: We need to pull this specific value from the plan constants in a real scenario.
            // For now, we assume the specific Day Surgery Upfront Payment applies if out of network/wrong facility.

            if (!context.facilityInNetwork) {
                const penalty = plan.daySurgeryBenefit.upfrontPayments.outOfNetworkUpfrontPayment;
                currentResult.memberLiability = penalty;
                currentResult.breakdown.upfrontPayment = penalty;
                currentResult.appliedRules.push("Day Surgery Out-of-Network Penalty");
            } else {
                // In network hospital but should be Day Clinic?
                // Often attracts the standard deductible.
                currentResult.appliedRules.push("Standard Hospital Deductible applies");
                currentResult.memberLiability = 7750; // Hardcoded example from brochure context
            }
        }

        return currentResult;
    }

    // ==========================================================================
    // HELPERS
    // ==========================================================================

    private static findScopeRule(plan: DiscoveryPlan, procName: string): ScopesProcedureRule | undefined {
        // Fuzzy match or exact match
        return plan.scopesBenefit.find(s =>
            procName.toLowerCase().includes(s.procedureName.toLowerCase()) ||
            s.procedureName.toLowerCase().includes(procName.toLowerCase())
        );
    }

    private static isDaySurgeryProcedure(plan: DiscoveryPlan, procName: string): boolean {
        return plan.daySurgeryBenefit.coveredProcedures.some(p =>
            p.procedureName.toLowerCase().includes(procName.toLowerCase())
        );
    }
}