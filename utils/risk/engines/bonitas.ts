/**
 * Bonitas Risk Engine
 * 
 * Calculates member liability for Bonitas plans based on:
 * - Procedure type
 * - Network status (30% penalty for non-network)
 * - PMB applicability
 */

import { BonitasPlan, BonitasProcedure } from '@/types/schemes/bonitas';

export interface BonitasRiskResult {
    liability: number;
    breakdown: {
        base_rate: number;
        scheme_pays: number;
        shortfall: number;
        deductibles: {
            procedure_copayment: number;
            non_network_penalty: number;
            total_deductible: number;
        };
        variants?: {
            network_hospital: number;
            non_network_hospital: number;
        };
    };
    meta: {
        is_pmb_applicable: boolean;
        requires_pre_auth: boolean;
        warning_label: string | null;
    };
}

export class BonitasRiskEngine {
    static evaluate(
        plan: BonitasPlan,
        procedure: BonitasProcedure,
        inNetwork: boolean = true,
        isPMB: boolean = false
    ): BonitasRiskResult {
        const baseRate = procedure.base_cost_estimate;

        // PMB conditions are covered at 100% at DSP
        if (isPMB && plan.pmbExemption.noCopaymentForPMB) {
            return {
                liability: 0,
                breakdown: {
                    base_rate: baseRate,
                    scheme_pays: baseRate,
                    shortfall: 0,
                    deductibles: {
                        procedure_copayment: 0,
                        non_network_penalty: 0,
                        total_deductible: 0,
                    },
                },
                meta: {
                    is_pmb_applicable: true,
                    requires_pre_auth: true,
                    warning_label: null,
                },
            };
        }

        // Calculate procedure-specific co-payment
        let procedureCopayment = 0;

        // Imaging has specific co-payment
        if (procedure.category === 'imaging') {
            procedureCopayment = plan.copayments.mriCtScan;
        }

        // Cataract has specific co-payment at non-DSP
        if (procedure.id === 'cataract-surgery' && !inNetwork) {
            procedureCopayment = plan.copayments.cataractNonDsp;
        }

        // Calculate non-network penalty (30% of base rate)
        let nonNetworkPenalty = 0;
        if (!inNetwork) {
            nonNetworkPenalty = Math.round(baseRate * (plan.copayments.nonNetworkHospitalPercent / 100));
        }

        const totalDeductible = procedureCopayment + nonNetworkPenalty;
        const schemePays = baseRate - totalDeductible;

        // Calculate variants
        const networkLiability = procedureCopayment;
        const nonNetworkLiability = procedureCopayment + Math.round(baseRate * 0.30);

        return {
            liability: inNetwork ? networkLiability : nonNetworkLiability,
            breakdown: {
                base_rate: baseRate,
                scheme_pays: schemePays,
                shortfall: 0, // No tariff shortfall in capitation
                deductibles: {
                    procedure_copayment: procedureCopayment,
                    non_network_penalty: nonNetworkPenalty,
                    total_deductible: totalDeductible,
                },
                variants: {
                    network_hospital: networkLiability,
                    non_network_hospital: nonNetworkLiability,
                },
            },
            meta: {
                is_pmb_applicable: false,
                requires_pre_auth: true,
                warning_label: !inNetwork
                    ? '30% co-payment applies at non-network hospitals'
                    : null,
            },
        };
    }
}
