// Stub types for legacy South African medical aid code (Bestmed)
// This file exists only to satisfy type imports in utils/db.ts and utils/risk/engines/bestmed.ts
// These types are not actively used in the US-focused application

export interface BestmedPlan {
    id: string;
    name: string;
    pmbExemption: {
        noCopaymentForPMB: boolean;
    };
    copayments: {
        nonNetworkHospital: number;
        dayProcedureAtAcuteHospital: number;
        mriCtScan: number;
        procedures: {
            gastroscopy: number;
            colonoscopy: number;
            sigmoidoscopy: number;
            cystoscopy: number;
            hysteroscopy: number;
            arthroscopic: number;
            backNeckSurgery: number;
            laparoscopic: number;
            nasalSinus: number;
        };
    };
    [key: string]: unknown;
}

export interface BestmedProcedure {
    id: string;
    name: string;
    category: string;
    base_cost_estimate: number;
    [key: string]: unknown;
}

export interface BestmedProcedureContext {
    facilityInNetwork: boolean;
    facilityType: string;
    isPrescribedMinimumBenefit: boolean;
}
