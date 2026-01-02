/**
 * Bestmed Risk Engine
 * 
 * Calculates member liability for procedures based on
 * Bestmed plan rules, network status, and PMB exemptions.
 */

import { BestmedPlan, BestmedProcedure, BestmedProcedureContext } from '@/types/schemes/bestmed';

export interface BestmedRiskResult {
    totalEstimatedCost: number;
    schemePays: number;
    memberLiability: number;
    copaymentBreakdown: {
        procedureCopayment: number;
        dayHospitalCopayment: number;
        nonNetworkPenalty: number;
    };
    warnings: string[];
    isPMBExempt: boolean;
}

export class BestmedRiskEngine {

    /**
     * Main evaluation method
     */
    static evaluate(
        plan: BestmedPlan,
        procedure: BestmedProcedure,
        context: BestmedProcedureContext
    ): BestmedRiskResult {

        const warnings: string[] = [];
        let memberLiability = 0;
        let procedureCopayment = 0;
        let dayHospitalCopayment = 0;
        let nonNetworkPenalty = 0;

        // PMB exemption check
        const isPMBExempt = context.isPrescribedMinimumBenefit && plan.pmbExemption.noCopaymentForPMB;

        if (isPMBExempt) {
            warnings.push('PMB: No co-payment required for this condition.');
            return {
                totalEstimatedCost: procedure.base_cost_estimate,
                schemePays: procedure.base_cost_estimate,
                memberLiability: 0,
                copaymentBreakdown: { procedureCopayment: 0, dayHospitalCopayment: 0, nonNetworkPenalty: 0 },
                warnings,
                isPMBExempt: true,
            };
        }

        // 1. Non-network hospital penalty
        if (!context.facilityInNetwork) {
            nonNetworkPenalty = plan.copayments.nonNetworkHospital;
            warnings.push(`Non-network penalty: R${nonNetworkPenalty.toLocaleString()}`);
        }

        // 2. Day procedure at acute hospital (instead of day hospital)
        if (context.facilityType === 'Acute Hospital') {
            dayHospitalCopayment = plan.copayments.dayProcedureAtAcuteHospital;
            warnings.push(`Day procedure at acute hospital: R${dayHospitalCopayment.toLocaleString()} co-payment`);
        }

        // 3. Procedure-specific co-payments
        procedureCopayment = this.getProcedureCopayment(plan, procedure);

        if (procedureCopayment > 0) {
            warnings.push(`Procedure co-payment: R${procedureCopayment.toLocaleString()}`);
        }

        // Calculate total liability
        memberLiability = procedureCopayment + dayHospitalCopayment + nonNetworkPenalty;

        const schemePays = procedure.base_cost_estimate - memberLiability;

        return {
            totalEstimatedCost: procedure.base_cost_estimate,
            schemePays: Math.max(0, schemePays),
            memberLiability,
            copaymentBreakdown: {
                procedureCopayment,
                dayHospitalCopayment,
                nonNetworkPenalty,
            },
            warnings,
            isPMBExempt: false,
        };
    }

    /**
     * Get procedure-specific co-payment based on category
     */
    private static getProcedureCopayment(plan: BestmedPlan, procedure: BestmedProcedure): number {
        const copayments = plan.copayments.procedures;

        switch (procedure.category) {
            case 'scope':
                // Map to specific scope procedure
                if (procedure.id === 'gastroscopy') return copayments.gastroscopy;
                if (procedure.id === 'colonoscopy') return copayments.colonoscopy;
                if (procedure.id === 'sigmoidoscopy') return copayments.sigmoidoscopy;
                if (procedure.id === 'cystoscopy') return copayments.cystoscopy;
                if (procedure.id === 'hysteroscopy') return copayments.hysteroscopy;
                return copayments.gastroscopy; // Default scope amount

            case 'orthopedic':
                return copayments.arthroscopic;

            case 'spinal':
                return copayments.backNeckSurgery;

            case 'laparoscopic':
                return copayments.laparoscopic;

            case 'nasal':
                return copayments.nasalSinus;

            case 'imaging':
                return plan.copayments.mriCtScan;

            case 'joint_replacement':
                // Joint replacement typically covered at scheme tariff (no extra copayment)
                // but prosthesis limits apply
                return 0;

            default:
                return 0;
        }
    }
}
