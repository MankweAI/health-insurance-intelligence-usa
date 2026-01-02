/**
 * Slug Utilities for V1 ↔ V2 Slug Resolution
 * 
 * This module provides centralized slug mapping between:
 * - V1 Technical Slugs (e.g., bestmed-pace1-risk-exclusion-acceptance-2026)
 * - V2 Intent-Based Slugs (e.g., bestmed-pace1-senior-budget)
 * 
 * The mapping is derived from the redirect configuration in next.config.ts
 */

import { Persona } from './persona';

/**
 * Complete V1 → V2 slug mapping
 * Source: next.config.ts redirects array
 */
export const V1_TO_V2_SLUG_MAP: Record<string, string> = {
    // Bestmed Pace Plans
    'bestmed-pace1-risk-exclusion-acceptance-2026': 'bestmed-pace1-senior-budget',
    'bestmed-pace1-family-adhd-management-2026': 'bestmed-pace1-family-chronic',
    'bestmed-pace2-senior-joint-funder-2026': 'bestmed-pace2-senior-joint-care',
    'bestmed-pace3-biologic-bridge-funding-2026': 'bestmed-pace3-maximum-biological',
    'bestmed-pace4-executive-risk-transfer-2026': 'bestmed-pace4-executive',
    'bestmed-pace4-type1-diabetes-tech-funding-2026': 'bestmed-pace4-chronic',

    // Bestmed Beat Plans
    'bestmed-beat1-network-budget-starter-2026': 'bestmed-beat1-starter',
    'bestmed-beat1-network-large-family-capped-2026': 'bestmed-beat1-family',
    'bestmed-beat1-fullchoice-senior-joint-risk-2026': 'bestmed-beat1-senior-joint-care',
    'bestmed-beat1-network-maternity-basic-2026': 'bestmed-beat1-maternity',
    'bestmed-beat1-network-cdl-chronic-only-2026': 'bestmed-beat1-chronic',
    'bestmed-beat2-network-savings-single-starter-2026': 'bestmed-beat2-starter-single',
    'bestmed-beat2-network-savings-family-3child-2026': 'bestmed-beat2-family',
    'bestmed-beat2-fullchoice-savings-senior-joint-risk-2026': 'bestmed-beat2-senior-joint-care',
    'bestmed-beat2-network-savings-maternity-basic-2026': 'bestmed-beat2-maternity',
    'bestmed-beat3-network-maternity-enhanced-2026': 'bestmed-beat3-maternity',
    'bestmed-beat3-network-savings-noncdl-chronic-2026': 'bestmed-beat3-chronic',
    'bestmed-beat3-network-savings-family-maternity-2026': 'bestmed-beat3-family-maternity',
    'bestmed-beat3-plus-savings-enhanced-maternity-family-2026': 'bestmed-beat3-plus-family-maternity',
    'bestmed-beat4-savings-daytoday-comprehensive-single-2026': 'bestmed-beat4-executive-single',
    'bestmed-beat4-savings-daytod-ay-family-comprehensive-2026': 'bestmed-beat4-family-executive',
    'bestmed-beat4-savings-daytod-ay-senior-comprehensive-2026': 'bestmed-beat4-senior-executive',

    // Bestmed Rhythm Plans
    'bestmed-rhythm1-network-entry-level-2026': 'bestmed-rhythm1-starter-budget',
    'bestmed-rhythm1-network-maternity-basic-2026': 'bestmed-rhythm1-maternity',
    'bestmed-rhythm2-network-high-income-arbitrage-2026': 'bestmed-rhythm2-network-compliance-arbitrage',
    'bestmed-rhythm2-network-maternity-enhanced-2026': 'bestmed-rhythm2-maternity',
    'bestmed-rhythm2-network-senior-dental-2026': 'bestmed-rhythm2-senior-dental',
    'bestmed-rhythm1-network-family-capped-2026': 'bestmed-rhythm1-family',

    // Bonitas BonCap Plans
    'boncap-network-income-band-1-single-starter-2026': 'bonitas-boncap-starter-budget',
    'boncap-network-income-band-2-family-leverage-2026': 'bonitas-boncap-family-budget',
    'boncap-network-income-band-3-maternity-planning-2026': 'bonitas-boncap-maternity',
    'boncap-network-income-band-4-chronic-management-2026': 'bonitas-boncap-chronic',
    'boncap-network-young-adult-contraceptive-budget-2026': 'bonitas-boncap-starter-budget',

    // Bonitas BonCore Plans
    'boncore-network-strict-single-disaster-2026': 'bonitas-boncore-single',
    'boncore-network-family-disaster-child-cap-2026': 'bonitas-boncore-family',

    // Bonitas BonEssential Plans
    'bonessential-network-hospital-pmb-single-2026': 'bonitas-bonessential-single',
    'bonessential-select-network-budget-family-2026': 'bonitas-bonessential-select-family-budget',

    // Bonitas BonComplete Plans
    'boncomplete-network-savings-single-msa-2026': 'bonitas-boncomplete-single',
    'boncomplete-network-savings-family-chronic-2026': 'bonitas-boncomplete-family-chronic',
    'boncomplete-network-family-maternity-young-parent-2026': 'bonitas-boncomplete-family-maternity',

    // Bonitas BonClassic Plans
    'bonclassic-network-savings-family-moderate-chronic-2026': 'bonitas-bonclassic-family-chronic',
    'bonclassic-network-savings-senior-joint-replacement-2026': 'bonitas-bonclassic-senior-joint-care',
    'bonclassic-network-savings-young-adult-contraceptive-2026': 'bonitas-bonclassic-starter',
    'bonclassic-network-savings-young-family-childcare-2026': 'bonitas-bonclassic-family-starter',

    // Bonitas BonComprehensive Plans
    'boncomprehensive-full-choice-savings-senior-comprehensive-2026': 'bonitas-boncomprehensive-senior-executive',
    'boncomprehensive-full-choice-savings-dental-implant-2026': 'bonitas-boncomprehensive-executive-dental',
    'boncomprehensive-full-choice-cancer-biologic-funding-2026': 'bonitas-boncomprehensive-executive',
    'boncomprehensive-full-choice-orthodox-teen-family-2026': 'bonitas-boncomprehensive-family-executive',
    'boncomprehensive-full-choice-savings-child-specialist-2026': 'bonitas-boncomprehensive-executive',

    // Bonitas BonSave Plans
    'bonsave-network-savings-single-msa-max-2026': 'bonitas-bonsave-single',
    'bonsave-network-family-dental-orthodontics-2026': 'bonitas-bonsave-family-dental',

    // Bonitas BonFit & BonPrime Plans
    'bonfit-network-budget-family-child-cap-2026': 'bonitas-bonfit-family-budget',
    'bonprime-network-savings-maternity-planning-2026': 'bonitas-bonprime-maternity',
    'bonprime-network-savings-chronic-management-2026': 'bonitas-bonprime-chronic',

    // Bonitas BonStart Plans
    'bonstart-network-edge-single-co-payment-disaster-2026': 'bonitas-bonstart-single',
    'bonstart-plus-network-edge-family-maternity-enhanced-2026': 'bonitas-bonstart-family-maternity',
    'bonstart-plus-network-edge-family-child-cap-sports-injury-2026': 'bonitas-bonstart-family',

    // Hospital Standard & Primary Plans
    'primary-network-day-to-day-family-moderate-2026': 'primary-network-family',
    'standard-full-choice-day-to-day-family-chronic-45-2026': 'standard-full-family-chronic',
    'standard-select-network-day-to-day-family-chronic-45-nominated-gp-2026': 'standard-select-family-chronic',
    'standard-full-choice-senior-hip-knee-replacement-2026': 'standard-full-senior-joint-care',
    'standard-full-choice-type-1-diabetes-child-insulin-pump-2026': 'standard-full-chronic',
    'hospital-standard-network-disaster-single-pmb-2026': 'hospital-standard-single',
    'hospital-standard-network-family-maternity-emergency-2026': 'hospital-standard-family-maternity',

    // Discovery Smart Plans
    'discovery-smart-saver-classic-msa-hybrid-2026': 'discovery-smart-saver-budget',
    'discovery-smart-saver-essential-budget-msa-2026': 'discovery-smart-saver-executive-budget',
    'discovery-smart-classic-risk-funded-2026': 'discovery-smart-classic-high-usage-primary-care-sports',
    'discovery-smart-essential-budget-risk-2026': 'discovery-smart-essential-executive-budget',
    'discovery-smart-essential-dynamic-efficiency-2026': 'discovery-smart-essential-dynamic-network-optimisation',
    'discovery-smart-active-ultra-budget-2026': 'discovery-smart-active-budget',

    // Discovery Saver Plans
    'discovery-saver-classic-msa-high-day2day-2026': 'discovery-saver-classic-budget',
    'discovery-saver-delta-network-discount-2026': 'discovery-saver-delta-budget',
    'discovery-saver-essential-budget-msa-2026': 'discovery-saver-essential-budget',
    'discovery-saver-coastal-regional-resident-2026': 'discovery-saver-coastal-budget',

    // Discovery KeyCare Plans
    'discovery-keycare-plus-income-banded-network-2026': 'discovery-keycare-plus-network-income-subsidy',
    'discovery-keycare-start-budget-network-2026': 'discovery-keycare-start-budget',
    'discovery-keycare-start-regional-online-practice-2026': 'discovery-keycare-start-telemedicine-driven-cost-reduction',

    // Discovery Priority Plans
    'discovery-priority-classic-limited-atb-2026': 'discovery-priority-classic-msa-phf-atb-capped',
    'discovery-priority-essential-budget-limited-atb-2026': 'discovery-priority-essential-budget',

    // Discovery Executive Plans
    'discovery-executive-multi-chronic-atb-unlimited-2026': 'discovery-executive-executive-chronic',
    'discovery-executive-oncology-innovation-extended-2026': 'discovery-executive-executive',
    'discovery-executive-global-traveller-2026': 'discovery-executive-executive',
    'discovery-executive-dental-ortho-high-limits-2026': 'discovery-executive-executive-dental',

    // Discovery Classic Plans
    'discovery-classic-core-single-hospital-only-2026': 'discovery-classic-core-single',
    'discovery-classic-delta-core-young-family-2026': 'discovery-classic-delta-family-starter',
    'discovery-coastal-core-resident-2026': 'discovery-coastal-core-geo-network-optimisation',
    'discovery-essential-core-oncology-budget-2026': 'discovery-essential-core-budget',
    'discovery-classic-comprehensive-family-day2day-msa-atb-2026': 'discovery-classic-comprehensive-family-executive',
    'discovery-classic-smart-comprehensive-urban-network-2026': 'discovery-classic-smart-executive',
    'discovery-classic-comprehensive-adl-mental-health-2026': 'discovery-classic-comprehensive-executive-chronic',
    'discovery-classic-comprehensive-oncology-extended-2026': 'discovery-classic-comprehensive-executive-budget',

    // Fedhealth FlexiFed Plans
    'fedhealth-flexifed3-d2d-plus-health-risk-assessment-savings-unlock-2026': 'fedhealth-flexifed3-behavioral-risk-pooling',
    'fedhealth-flexifed3-grid-10percent-savings-maternity-family-childhood-benefits-2026': 'fedhealth-flexifed3-family-maternity',
    'fedhealth-flexifed3-elect-25percent-savings-excess-acceptor-young-healthy-2026': 'fedhealth-flexifed3-fixed-excess-risk-transfer',
    'fedhealth-flexifed3-hospital-backup-savings-activation-threshold-race-2026': 'fedhealth-flexifed3-optionality-preservation',
    'fedhealth-flexifed1-savings-budget-starter-single-2026': 'fedhealth-flexifed1-starter-budget',
    'fedhealth-flexifed1-elect-excess-acceptor-young-2026': 'fedhealth-flexifed1-cost-reduced-hospital-transfer',
    'fedhealth-flexifed1-savings-threshold-accumulator-chronic-2026': 'fedhealth-flexifed1-chronic',
    'fedhealth-flexifed2-savings-pregnancy-planner-first-baby-2026': 'fedhealth-flexifed2-maternity',
    'fedhealth-flexifed2-grid-network-compliant-family-builder-2026': 'fedhealth-flexifed2-family',
    'fedhealth-flexifed4-savings-network-gp-maximizer-family-2026': 'fedhealth-flexifed4-day-to-day-certainty',
    'fedhealth-flexifed4-grid-large-family-child-cap-optimizer-2026': 'fedhealth-flexifed4-family',
    'fedhealth-flexifed4-elect-young-family-contraceptive-phase-2026': 'fedhealth-flexifed4-family',

    // Fedhealth myFed & FlexiFedSavvy Plans
    'fedhealth-myfed-income-band1-entrylevel-corporate-unlimited-gp-2026': 'fedhealth-myfed-starter-budget',
    'fedhealth-myfed-income-band4-cliff-corporate-escalation-constrained-2026': 'fedhealth-myfed-affordability-constraint-escalation',
    'fedhealth-myfed-dispensing-gp-acute-medicine-unlimited-formulary-2026': 'fedhealth-myfed-formulary-integrated-care',
    'fedhealth-flexifedsavvy-hospital-under35-virtual-gp-maximizer-2026': 'fedhealth-flexifedsavvy-day-to-day-certainty',
    'fedhealth-flexifedsavvy-savings-under35-young-family-cesarean-risk-2026': 'fedhealth-flexifedsavvy-family-starter',

    // Fedhealth Maxima Plans
    'fedhealth-maximaplus-oheb-threshold-savings-mature-triple-pool-2026': 'fedhealth-maximaplus-defined-benefit-cycling',
    'fedhealth-maximaplus-58chronic-biologic-osteo-senior-2026': 'fedhealth-maximaplus-chronic',
    'fedhealth-maximaexec-executive-threshold-10copay-reduced-chronic-2026': 'fedhealth-maximaexec-risk-management-constraint',
    'fedhealth-maximaexec-lower-oncology-core-protocol-family-2026': 'fedhealth-maximaexec-family',

    // Medihelp MedPrime Plans
    'medihelp-medprime-elect-network-single-starter-2026': 'medihelp-medprime-starter-single',
    'medihelp-medprime-fullchoice-family-core-2026': 'medihelp-medprime-family',
    'medihelp-medprime-family-large-children-cap-arbitrage-2026': 'medihelp-medprime-family',
    'medihelp-medprime-dependent-u26-rate-maximiser-2026': 'medihelp-medprime-family',
    'medihelp-medprime-preventive-contraceptive-young-adult-2026': 'medihelp-medprime-starter',
    'medihelp-medprime-maternity-enhanced-funding-2026': 'medihelp-medprime-maternity',
    'medihelp-medprime-new-parent-baby-u2-consult-optimiser-2026': 'medihelp-medprime-day-to-day-certainty',
    'medihelp-medprime-mental-health-transfer-enhanced-2026': 'medihelp-medprime-mental-health-risk-transfer-enhanced',
    'medihelp-medprime-defined-cancer-transfer-family-2026': 'medihelp-medprime-family',
    'medihelp-medprime-chronic-cdl-pmb-transfer-2026': 'medihelp-medprime-chronic',
    'medihelp-medprime-vision-dental-network-maximiser-2026': 'medihelp-medprime-dental',
    'medihelp-medprime-refractive-surgery-18-50-optimiser-2026': 'medihelp-medprime-high-cost-technology',
    'medihelp-medprime-senior-joint-degeneration-exclusion-risk-2026': 'medihelp-medprime-senior-joint-care',
    'medihelp-medprime-savings-rollover-interest-maximiser-2026': 'medihelp-medprime-msa-maximisation-roll-over',
    'medihelp-medprime-elect-post-savings-daytoday-network-router-2026': 'medihelp-medprime-risk-mitigation-copayment',

    // Medshield Mediphila Plans
    'medshield-mediphila-hospital-starter-2026': 'medshield-mediphila-starter',
    'medshield-mediphila-family-daylimit-child-sickness-2026': 'medshield-mediphila-family',
    'medshield-mediphila-network-copay-avoidance-2026': 'medshield-mediphila-risk-mitigation-copayment',
    'medshield-mediphila-young-woman-contraception-script-max-2026': 'medshield-mediphila-starter',
    'medshield-mediphila-young-woman-iud-device-arbitrage-2026': 'medshield-mediphila-starter',
    'medshield-mediphila-maternity-compact-network-planner-2026': 'medshield-mediphila-maternity',
    'medshield-mediphila-chronic-cdlplusdepression-dsp-discipline-2026': 'medshield-mediphila-chronic',
    'medshield-mediphila-mentalhealth-pmb-only-cap-2026': 'medshield-mediphila-mental-health-risk-transfer',
    'medshield-mediphila-oncology-icon-dsp-lock-2026': 'medshield-mediphila-defined-cancer-risk-transfer',
    'medshield-mediphila-dental-wisdomteeth-copay-avoid-2026': 'medshield-mediphila-dental',

    // Momentum Ingwe Plans
    'momentum-ingwe-connect-starter-2026': 'momentum-ingwe-starter',
    'momentum-ingwe-network-family-gp-unlimited-2026': 'momentum-ingwe-family',
    'momentum-ingwe-any-hospital-network-penalty-guard-2026': 'momentum-ingwe-risk-mitigation-copayment',

    // Momentum Evolve Plans
    'momentum-evolve-strict-network-starter-2026': 'momentum-evolve-chronic-starter',
    'momentum-evolve-maternity-copay-exception-2026': 'momentum-evolve-maternity',

    // Momentum Incentive Plans
    'momentum-incentive-associated-network-saver-2026': 'momentum-incentive-chronic-budget',
    'momentum-incentive-oncology-limit-manager-2026': 'momentum-incentive-defined-cancer-risk-transfer',

    // Momentum Extender & Summit & Custom Plans
    'momentum-extender-family-threshold-activator-2026': 'momentum-extender-family',
    'momentum-extender-large-family-child-cap-leverage-2026': 'momentum-extender-family',
    'momentum-extender-associated-gp-compliance-2026': 'momentum-extender-chronic',
    'momentum-summit-full-choice-specialist-max-2026': 'momentum-summit-defined-specialist',
    'momentum-custom-associated-hospital-penalty-avoid-2026': 'momentum-custom-risk-mitigation-copayment',

    // Sizwe Hosmed Access Core Plans
    'sizwehosmed-access-core-young-dsp-hospital-starter-2026': 'sizwehosmed-access-core-disaster',
    'sizwehosmed-access-core-non-dsp-usage-penalty-risk-2026': 'sizwehosmed-access-core-risk-mitigation-copayment',
    'sizwehosmed-access-core-maternity-bambino-registration-2026': 'sizwehosmed-access-core-maternity',
    'sizwehosmed-access-core-senior-55plus-amd-joint-constraint-2026': 'sizwehosmed-access-core-risk-management-constraint',

    // Sizwe Hosmed Access Saver Plans
    'sizwehosmed-access-saver-upfront-msa-liquidity-starter-2026': 'sizwehosmed-access-saver-savings-and-risk-hybrid',
    'sizwehosmed-access-saver-msa-exhaustion-cliff-budget-2026': 'sizwehosmed-access-saver-budget',
    'sizwehosmed-access-saver-dsp-optical-dental-arbitrage-2026': 'sizwehosmed-access-saver-network-compliance-arbitrage',
    'sizwehosmed-access-saver-day-procedure-deductible-scheduler-2026': 'sizwehosmed-access-saver-risk-mitigation-copayment',

    // Sizwe Hosmed Gold Ascend Plans
    'sizwehosmed-gold-ascend-family-full-choice-core-cover-2026': 'sizwehosmed-gold-ascend-family',
    'sizwehosmed-gold-ascend-oncology-limit-copay-guardrail-2026': 'sizwehosmed-gold-ascend-defined-cancer-risk-transfer',
    'sizwehosmed-gold-ascend-diagnostic-mri-ct-nonpmb-copay-2026': 'sizwehosmed-gold-ascend-diagnostic-risk-transfer',
    'sizwehosmed-gold-ascend-edo-network-hospital-price-leverage-2026': 'sizwehosmed-gold-ascend-network-compliance-arbitrage',

    // Sizwe Hosmed Value Platinum Plans
    'sizwehosmed-value-platinum-family-full-choice-high-cover-2026': 'sizwehosmed-value-platinum-budget',
    'sizwehosmed-value-platinum-core-network-hospital-leverage-2026': 'sizwehosmed-value-platinum-budget',
    'sizwehosmed-value-platinum-specialised-radiology-event-copay-2026': 'sizwehosmed-value-platinum-budget',
    'sizwehosmed-value-platinum-oncology-overlimit-20percent-copay-2026': 'sizwehosmed-value-platinum-budget',

    // Sizwe Hosmed Titanium Executive Plans
    'sizwehosmed-titanium-executive-multi-chronic-high-transfer-2026': 'sizwehosmed-titanium-executive-chronic',
    'sizwehosmed-titanium-executive-biologic-bridge-non-cancer-limit-2026': 'sizwehosmed-titanium-executive-biologic-bridge',
    'sizwehosmed-titanium-executive-orthodontics-9to21-dental-strategy-2026': 'sizwehosmed-titanium-executive-dental',
    'sizwehosmed-titanium-executive-senior-55plus-amd-diagnostics-2026': 'sizwehosmed-titanium-executive-preventative-maximisation',
    'sizwehosmed-titanium-executive-prosthesis-joint-spine-limit-planner-2026': 'sizwehosmed-titanium-executive-internal-device-risk-transfer',
};

/**
 * Build reverse lookup map (V2 → V1)
 */
const V2_TO_V1_SLUG_MAP: Record<string, string> = Object.entries(V1_TO_V2_SLUG_MAP)
    .reduce((acc, [v1, v2]) => {
        // Only keep first mapping if multiple V1 slugs map to same V2
        if (!acc[v2]) {
            acc[v2] = v1;
        }
        return acc;
    }, {} as Record<string, string>);

/**
 * Get V2 (intent-based) slug from V1 (technical) slug
 * Returns the input if no mapping exists
 */
export function getV2Slug(v1Slug: string): string {
    return V1_TO_V2_SLUG_MAP[v1Slug] || v1Slug;
}

/**
 * Get V1 (technical) slug from V2 (intent-based) slug
 * Returns the input if no mapping exists
 */
export function getV1Slug(v2Slug: string): string {
    return V2_TO_V1_SLUG_MAP[v2Slug] || v2Slug;
}

/**
 * Check if a slug is in V1 format (technical slug with -2026 suffix)
 */
export function isV1Slug(slug: string): boolean {
    return slug.endsWith('-2026');
}

/**
 * Check if a slug is in V2 format (intent-based, no year suffix)
 */
export function isV2Slug(slug: string): boolean {
    return !slug.endsWith('-2026') && Object.values(V1_TO_V2_SLUG_MAP).includes(slug);
}

/**
 * Resolve a persona by either V1 or V2 slug
 * This ensures the application works regardless of which URL format is used
 * @param slug - The slug to resolve (V1 or V2 format)
 * @param personas - Array of personas to search in (required)
 */
export function resolvePersona(slug: string, personas: Persona[]): Persona | undefined {
    // First try exact match on V1 slug (stored in persona.slug)
    let persona = personas.find(p => p.slug === slug);

    if (persona) {
        return persona;
    }

    // If not found, try to resolve as V2 slug by finding corresponding V1
    const v1Slug = getV1Slug(slug);
    if (v1Slug !== slug) {
        persona = personas.find(p => p.slug === v1Slug);
    }

    return persona;
}

/**
 * Get all V2 slugs for sitemap generation
 */
export function getAllV2Slugs(): string[] {
    return Object.values(V1_TO_V2_SLUG_MAP);
}

/**
 * Validate that a slug exists in either format
 * @param slug - The slug to validate
 * @param personas - Array of personas to search in (required)
 */
export function isValidSlug(slug: string, personas: Persona[]): boolean {
    return resolvePersona(slug, personas) !== undefined;
}
