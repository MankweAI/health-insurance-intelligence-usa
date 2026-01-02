// utils/persona.ts
import { Plan } from './types';

export type PersonaSlug = string;

export interface UserProfile {
    slug: PersonaSlug;
    code: string;
    display_title?: string;
    human_insight?: string;
    hero_image_tag?: string;
    ui_priority?: 'Price_First' | 'Clinical_First';
    updatedAt?: string;
    meta: {
        title: string;
        marketing_heading: string;
        description: string;
        category: string;
        strategic_intent?: 'Affordability_Constraint_Escalation' | 'Affordability_Network_Lockdown' | 'Age_Optimized_Exclusion' | 'Behavioral_Risk_Pooling' | 'Biologic_Bridge_Funding' | 'Budget_ATB_Cap' | 'Budget_Optimisation_Minimum_Day2Day' | 'Catastrophic_Oncology_Risk_Transfer' | 'Catastrophic_Only_with_Min_Day2Day' | 'Complex_Clinical_Funding' | 'Cost_Reduced_Hospital_Transfer' | 'Day2Day_Limit_Extraction' | 'Day_to_Day_Certainty' | 'Defined_Benefit_Cycling' | 'Defined_Benefit_Funding' | 'Defined_Cancer_Risk_Transfer' | 'Defined_Dental_Funding' | 'Defined_Specialist_Funding' | 'Diagnostic_Risk_Transfer' | 'Disaster_Cover_Only' | 'Dynamic_Network_Optimisation' | 'Enhanced_Maternity_Funding' | 'Extended_Chronic_Cover' | 'Extreme_Cost_Constraint' | 'Family_Cost_Leverage' | 'Family_Disaster_Leverage' | 'Fixed_Excess_Risk_Transfer' | 'Formulary_Integrated_Care' | 'Geo_Network_Optimisation' | 'Global_Risk_Transfer' | 'High_Cost_Surgical_Risk_Transfer' | 'High_Cost_Technology_Funding' | 'High_Liquidity_and_Control' | 'High_Oncology_Value_without_Exec' | 'High_Risk_Transfer' | 'High_Usage_Primary_Care_Sports' | 'Hospital_Risk_Transfer' | 'Internal_Device_Risk_Transfer' | 'Liquidity_Buffer' | 'Low_Premium_Smart_MSA' | 'Low_Premium_Smart_Primary_Care' | 'MSA_Maximisation_Roll_Over' | 'MSA_PHF_ATB_Capped' | 'MSA_and_PHF_Day2Day_Maximisation' | 'MSA_plus_Smart_Risk_Day2Day' | 'Maternity_Risk_Transfer' | 'Max_Risk_Transfer_All_Care' | 'Maximise_Subsidies' | 'Maximum_Biological_Funding' | 'Maximum_Diagnostic_Funding' | 'Mental_Health_Risk_Transfer' | 'Mental_Health_Risk_Transfer_Enhanced' | 'Minimum_Cost_PMB_Focus' | 'Minimum_Cost_Strict_Network' | 'Minimum_Maternity_Funding' | 'Multi_Chronic_Management' | 'Network_Compliance_Arbitrage' | 'Network_Compliance_Savings' | 'Network_Discount_Arbitrage' | 'Network_Income_Subsidy' | 'Non_CDL_Partial_Funding' | 'Oncology_Budget_Cap' | 'Optionality_Preservation' | 'Preventative_Maximisation' | 'Risk_Exclusion_Acceptance' | 'Risk_Management_Constraint' | 'Risk_Mitigation_CoPayment' | 'Risk_Transfer_and_Day_to_Day' | 'Savings_and_Risk_Hybrid' | 'Specialist_Dental_Funding' | 'Specific_Defined_Dental_Funding' | 'Strict_Budget_Management' | 'Structured_Day2Day_Optimisation' | 'Telemedicine_Driven_Cost_Reduction' | 'Disaster_Cover_Only_Liquidity' | 'Biologic_Risk_Transfer' | 'Catastrophic_Risk_Transfer' | 'High_Chronic_Funding' | 'Maximum_Mental_Health_Risk' | 'Minimum_Savings_Buffer' | 'Maximum_Specialized_Drug_Funding' | 'Liquidity_Aggressor' | 'Specialist_Surgery_Funding' | 'Maximum_Savings_Liquidity' | 'Lifestyle_Rewards' | 'High_Liquidity_Arbitrage' | 'Maternity_Risk_Transfer_No_Network';
    };

    defaults: {
        income: number;
        family_composition: { main: number; adult: number; child: number };
        age?: number;
        location_zone?: 'Any' | 'Coastal' | 'Dynamic_Smart_Area' | 'GRID Network Area' | 'KeyCare_Network_Area' | 'KeyCare_Regional_Town' | 'KeyCare_Start_Region' | 'Near_Delta_Network' | 'Network Area' | 'Select Network Area' | 'Smart_Area' | 'Smart_Network_Area' | 'Specific Network Area' | 'myFED Dispensing GP Area' | 'myFED Network Area' | 'Inland';
    };

    search_profile: {
        // UPDATE: Synced with data/personas.ts
        network_tolerance: 'Any' | 'Any Hospital' | 'Coastal' | 'Coastal Network Only' | 'DSP Oncology Network' | 'Delta Network' | 'Delta Network Only' | 'Dynamic Smart Hospital and GP Network Only' | 'Full Choice' | 'Full Choice (Except Joint Replacement)' | 'GRID Network' | 'KeyCare Network' | 'KeyCare Start Network Only' | 'KeyCare Start Regional Network Only' | 'Mixed (network for Delta variants)' | 'Network' | 'Network for Chronic' | 'Network for Hospital/Chronic' | 'Network for Hospital/GP' | 'Network for Threshold Benefits' | 'Smart Hospital and GP Network Only' | 'Smart Network Only' | 'Standard' | 'State' | 'Strict Network' | 'Strict Network for Hospital/GP' | 'myFED Contracted Network' | 'myFED Dispensing GP' | null;
        min_savings_allocation: number;
        chronic_needs: '27 CDL' | '27 CDL + Depression' | '27 CDL Only' | '32 Conditions' | '45 Conditions' | '46 Conditions' | '5 Non-CDL Conditions' | '61 Conditions' | '7 Non-CDL Conditions' | '9 Non-CDL Conditions' | 'ADL Mental + Autoimmune' | 'Active Cancer' | 'Basic' | 'CDL + ADL + Specialised Med' | 'CDL + Depression' | 'CDL + Some ADL' | 'CDL Only' | 'CDL basic' | 'CDL only' | 'CDL only, low intensity' | 'Comprehensive' | 'Low' | 'Low Biologic Need' | 'Moderate' | 'None' | 'PMB Only' | 'Single Cancer Episode' | 'Specialized' | 'Type 1 Diabetes' | 'CDL + Limited Biologic' | null;
        required_benefits: string[];
        priority_tag: string | null;
    };

    actuarial_logic?: {
        target_plan_id: string;
        brand_lock?: string;
        mathematical_basis: string;
        primary_risk_warning: string;

        utilization_assumptions?: {
            gp_visits_frequency: 'High' | 'High (2 children = frequent acute illnesses)' | 'High (Smart GP network)' | 'High (cancer follow-up)' | 'High (compliance with nominated GP required)' | 'High (due to child sickness)' | 'High (due to infant)' | 'High (entry-level likely higher morbidity due to stress, lifestyle)' | 'High (maternity + young child)' | 'High (multiple chronic scripts)' | 'High (network GP)' | 'High (online practice)' | 'High (strategy: self-fund GP to accumulate threshold, then use D2D+ for non-accumulating claims)' | 'High (unlimited benefit)' | 'High (unlimited network benefit)' | 'High (unlimited network visits benefit)' | 'High (unlimited virtual benefit)' | 'High (within Smart GP network)' | 'High-Moderate' | 'Low' | 'Low (Self-funded)' | 'Low (non-pregnancy related)' | 'Low (relies on 3 GP visits + unlimited virtual GP)' | 'Low (relies on 3 GP visits per beneficiary)' | 'Low (self-funded from savings)' | 'Low (self-funded)' | 'Low-Moderate' | 'Low-Moderate (relies on Benefit Booster)' | 'Low-Moderate (relies on savings)' | 'Low-Moderate (young healthy profile)' | 'Medium' | 'Moderate' | 'Moderate (4-8 visits/year)' | 'Moderate (must not exceed R2,330 limit)' | 'Moderate (non-pregnancy related)' | 'Moderate (relies on savings)' | 'Moderate (strategic self-funding to reach threshold)' | 'Moderate-High' | 'Moderate-High (family with child)' | 'Very High (maximizes unlimited benefit)' | 'Very Low (rely on public sector/cash)' | 'Zero' | 'Zero (rely on emergency room benefit)';
            chronic_script_consistency: number;
            break_even_point?: string;

        };

        inflection_risks?: {
            income_cliff_sensitivity: boolean;
            deductible_trigger_event?: string;
            benefit_cap_warning?: string;
        };
    };


}

// utils/persona.ts update
export interface Risk {
    level: 'HIGH' | 'MEDIUM' | 'LOW';
    warning: string;
    details: string;
}

export type Persona = UserProfile;





/**
 * THE ACTUARIAL JUDGE
 * Compares a Plan (Supply) against a Persona (Demand)
 * Returns a list of risks/warnings.
 */
export const validatePlan = (plan: Plan, persona: Persona): Risk[] => {
    const risks: Risk[] = [];
    if (!persona.search_profile) return risks;
    const { network_tolerance, min_savings_allocation, chronic_needs, required_benefits } = persona.search_profile;

    // 1. NETWORK MISMATCH
    if (network_tolerance === 'Any' && plan.network_restriction !== 'Any') {
        risks.push({
            level: 'MEDIUM',
            warning: 'Network Restriction',
            details: `You requested 'Any Hospital' access, but this plan restricts you to the ${plan.network_restriction} list.`
        });
    }
    // If user tolerates 'Network' but plan is 'State' (e.g. KeyCare Start Chronic)
    if (network_tolerance !== 'State' && plan.network_restriction === 'State') {
        risks.push({
            level: 'HIGH',
            warning: 'State Facility Access',
            details: 'Chronic medication and certain treatments are restricted to State facilities only, despite private hospital cover.'
        });
    }

    // 2. SAVINGS DEFICIT (The "Liquidity" Risk)
    if (min_savings_allocation > 0) {
        const annualSavings = plan.savings_annual || 0;
        // Calculate monthly equivalent for comparison
        const monthlySavings = annualSavings / 12;

        if (monthlySavings < min_savings_allocation * 0.5) {
            // Severe deficit (< 50% of need)
            risks.push({
                level: 'HIGH',
                warning: 'Insufficient Savings',
                details: `Your profile suggests high day-to-day needs. This plan offers R${Math.round(monthlySavings)} pm, which is likely to run out before June.`
            });
        } else if (monthlySavings < min_savings_allocation) {
            // Mild deficit
            risks.push({
                level: 'LOW',
                warning: 'Low Savings Buffer',
                details: `Savings allocation (R${Math.round(monthlySavings)} pm) is lower than your target. You may face self-funding gaps late in the year.`
            });
        }
    }

    // 3. CHRONIC FORMULARY GAP (The "Clinical" Risk)
    if (chronic_needs === 'Comprehensive' || chronic_needs === 'Specialized') {
        const isBasicPlan = plan.identity.plan_type === 'Hospital Plan' || plan.identity.plan_series === 'Beat';

        if (isBasicPlan) {
            risks.push({
                level: 'MEDIUM',
                warning: 'Basic Chronic Cover',
                details: 'This plan covers CDL (27 PMB conditions) only. It may not cover biological drugs or non-formulary brands required for complex conditions.'
            });
        }
    }

    // 4. BENEFIT BASKET CHECKS (The "Specific" Risk)
    if (required_benefits.includes('maternity')) {
        if (plan.defined_baskets.maternity.antenatal_consults === 0) {
            risks.push({
                level: 'HIGH',
                warning: 'No Maternity Basket',
                details: 'Pregnancy visits are not funded from risk. You will pay for all gynae visits from your own pocket or savings.'
            });
        }
    }

    // 5. RED FLAGS
    if (plan.red_flag) {
        risks.push({
            level: 'MEDIUM',
            warning: 'Plan Rule Warning',
            details: plan.red_flag
        });
    }

    return risks;
};