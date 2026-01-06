// Stub types for legacy South African medical aid code (Discovery Health)
// This file exists only to satisfy type imports in utils/db.ts and utils/risk/engines/discovery.ts
// These types are not actively used in the US-focused application

export interface DiscoveryPlan {
    id: string;
    name: string;
    hospitalNetwork: string;
    hospitalBenefit: {
        outOfNetworkUpfrontPayment?: number;
    };
    scopesBenefit: ScopesProcedureRule[];
    daySurgeryBenefit: {
        coveredProcedures: { procedureName: string }[];
        upfrontPayments: {
            outOfNetworkUpfrontPayment: number;
        };
    };
    [key: string]: unknown;
}

export interface Procedure {
    id: string;
    name: string;
    [key: string]: unknown;
}

export interface ProcedureContext {
    procedureName: string;
    facilityInNetwork: boolean;
    facilityType: string;
    isEmergency: boolean;
    healthcareProfessionalHasPaymentArrangement?: boolean;
}

export interface CopaymentLiabilityResult {
    totalEstimatedCost: number;
    schemePays: number;
    memberLiability: number;
    breakdown: {
        upfrontPayment?: number;
        dayClinicAccountCopayment?: number;
        hospitalAccountCopayment?: number;
    };
    appliedRules: string[];
    warnings: string[];
}

export type DiscoveryNetworkType = 'Network' | 'Non-Network';

export interface ScopesProcedureRule {
    procedureName: string;
    inRoomsScopesCopayment: { singleScope: number };
    nonNetworkInRoomsCopayment: { singleScope: number };
    daySurgeryNetworkDayClinicCopayment: number;
    hospitalAccountCopayment: number;
    outOfNetworkUpfrontPayment: number;
    valueBasedNetworkReduction: {
        applicableToClassicEssential: boolean;
    };
}
