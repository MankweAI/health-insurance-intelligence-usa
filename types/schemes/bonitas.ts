// Stub types for legacy South African medical aid code (Bonitas)
// This file exists only to satisfy type imports in utils/db.ts and utils/risk/engines/bonitas.ts
// These types are not actively used in the US-focused application

export interface BonitasPlan {
    id: string;
    name: string;
    pmbExemption: {
        noCopaymentForPMB: boolean;
    };
    copayments: {
        mriCtScan: number;
        cataractNonDsp: number;
        nonNetworkHospitalPercent: number;
    };
    [key: string]: unknown;
}

export interface BonitasProcedure {
    id: string;
    name: string;
    category: string;
    base_cost_estimate: number;
    [key: string]: unknown;
}
