// utils/types.ts

// 1. Defined Pricing Types (These were missing/inlined previously)
export interface FixedPricing {
    main: number;
    adult: number;
    child: number;
}

export interface IncomeBand {
    min: number;
    max: number | null;
    main: number;
    adult: number;
    child: number;
}

export type PricingMatrix = FixedPricing | IncomeBand[];

// 2. Contribution Interface using the types above
export interface Contribution {
    pricing_model: 'Fixed' | 'Income_Banded';
    pricing_matrix: PricingMatrix;
    msa_structure?: {
        type: 'Percentage' | 'Fixed' | 'None' | string;
        value: number | string;
    };
}

export interface FamilyComposition {
    main: number;
    adult: number;
    child: number;
}

// 3. The Super Schema Plan Interface
export interface Plan {
    id: string;
    price: number;
    savings_annual: number;

    identity: {
        scheme_name: string;
        plan_name: string;
        plan_series: string;
        plan_type: string;
    };

    contributions: Contribution[];

    network_restriction: string;

    network_details: {
        hospitals: string;
        gps: string;
        specialists: string;
    };

    coverage_rates: {
        hospital_account: number;
        specialist_in_hospital: number;
        specialist_out_hospital: number;
        gp_network_consults: number | string;
    };

    limits: {
        oncology: {
            status: 'PMB Only' | 'Limited' | 'Unlimited' | string;
            value: number;
            copay_percentage?: number;
        };
        casualty: {
            status: 'Savings' | 'Risk' | 'No Benefit' | string;
            value: number;
        };
        internal_prosthesis: {
            sublimit: number;
        };
    };

    defined_baskets: {
        maternity: {
            antenatal_consults: number;
            ultrasounds_2d: number;
            paediatrician_visits: number;
        };
        preventative: {
            vaccinations: boolean;
            contraceptives: number;
            wellness_screening?: boolean;
        };
    };

    chronic_conditions: number;

    procedure_copays: {
        scope_in_hospital: number;
        scope_out_hospital: number;
        mri_scan: number;
        joint_replacement: number | string;
        admission_penalty_non_network?: number | string;
    };

    gap_cover_rating: 'Mandatory' | 'Recommended' | 'Optional' | string;
    red_flag?: string;

    faq?: {
        question: string;
        answer: string;
    }[];

    // Optional/Legacy fields
    features?: any;
    benefits?: any[];
}