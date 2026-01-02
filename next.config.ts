import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/personas/bestmed-pace1-risk-exclusion-acceptance-2026',
        destination: '/personas/bestmed-pace1-senior-budget',
        permanent: true,
      },
      {
        source: '/personas/bestmed-pace1-family-adhd-management-2026',
        destination: '/personas/bestmed-pace1-family-chronic',
        permanent: true,
      },
      {
        source: '/personas/bestmed-pace2-senior-joint-funder-2026',
        destination: '/personas/bestmed-pace2-senior-joint-care',
        permanent: true,
      },
      {
        source: '/personas/bestmed-pace3-biologic-bridge-funding-2026',
        destination: '/personas/bestmed-pace3-maximum-biological',
        permanent: true,
      },
      {
        source: '/personas/bestmed-pace4-executive-risk-transfer-2026',
        destination: '/personas/bestmed-pace4-executive',
        permanent: true,
      },
      {
        source: '/personas/bestmed-pace4-type1-diabetes-tech-funding-2026',
        destination: '/personas/bestmed-pace4-chronic',
        permanent: true,
      },
      {
        source: '/personas/bestmed-beat1-network-budget-starter-2026',
        destination: '/personas/bestmed-beat1-starter',
        permanent: true,
      },
      {
        source: '/personas/bestmed-beat1-network-large-family-capped-2026',
        destination: '/personas/bestmed-beat1-family',
        permanent: true,
      },
      {
        source: '/personas/bestmed-beat1-fullchoice-senior-joint-risk-2026',
        destination: '/personas/bestmed-beat1-senior-joint-care',
        permanent: true,
      },
      {
        source: '/personas/bestmed-beat1-network-maternity-basic-2026',
        destination: '/personas/bestmed-beat1-maternity',
        permanent: true,
      },
      {
        source: '/personas/bestmed-beat1-network-cdl-chronic-only-2026',
        destination: '/personas/bestmed-beat1-chronic',
        permanent: true,
      },
      {
        source: '/personas/bestmed-beat2-network-savings-single-starter-2026',
        destination: '/personas/bestmed-beat2-starter-single',
        permanent: true,
      },
      {
        source: '/personas/bestmed-beat2-network-savings-family-3child-2026',
        destination: '/personas/bestmed-beat2-family',
        permanent: true,
      },
      {
        source: '/personas/bestmed-beat2-fullchoice-savings-senior-joint-risk-2026',
        destination: '/personas/bestmed-beat2-senior-joint-care',
        permanent: true,
      },
      {
        source: '/personas/bestmed-beat2-network-savings-maternity-basic-2026',
        destination: '/personas/bestmed-beat2-maternity',
        permanent: true,
      },
      {
        source: '/personas/bestmed-beat3-network-maternity-enhanced-2026',
        destination: '/personas/bestmed-beat3-maternity',
        permanent: true,
      },
      {
        source: '/personas/bestmed-beat3-network-savings-noncdl-chronic-2026',
        destination: '/personas/bestmed-beat3-chronic',
        permanent: true,
      },
      {
        source: '/personas/bestmed-beat3-network-savings-family-maternity-2026',
        destination: '/personas/bestmed-beat3-family-maternity',
        permanent: true,
      },
      {
        source: '/personas/bestmed-beat3-plus-savings-enhanced-maternity-family-2026',
        destination: '/personas/bestmed-beat3-plus-family-maternity',
        permanent: true,
      },
      {
        source: '/personas/bestmed-beat4-savings-daytoday-comprehensive-single-2026',
        destination: '/personas/bestmed-beat4-executive-single',
        permanent: true,
      },
      {
        source: '/personas/bestmed-beat4-savings-daytod-ay-family-comprehensive-2026',
        destination: '/personas/bestmed-beat4-family-executive',
        permanent: true,
      },
      {
        source: '/personas/bestmed-beat4-savings-daytod-ay-senior-comprehensive-2026',
        destination: '/personas/bestmed-beat4-senior-executive',
        permanent: true,
      },
      {
        source: '/personas/bestmed-rhythm1-network-entry-level-2026',
        destination: '/personas/bestmed-rhythm1-starter-budget',
        permanent: true,
      },
      {
        source: '/personas/bestmed-rhythm1-network-maternity-basic-2026',
        destination: '/personas/bestmed-rhythm1-maternity',
        permanent: true,
      },
      {
        source: '/personas/bestmed-rhythm2-network-high-income-arbitrage-2026',
        destination: '/personas/bestmed-rhythm2-network-compliance-arbitrage',
        permanent: true,
      },
      {
        source: '/personas/bestmed-rhythm2-network-maternity-enhanced-2026',
        destination: '/personas/bestmed-rhythm2-maternity',
        permanent: true,
      },
      {
        source: '/personas/bestmed-rhythm2-network-senior-dental-2026',
        destination: '/personas/bestmed-rhythm2-senior-dental',
        permanent: true,
      },
      {
        source: '/personas/bestmed-rhythm1-network-family-capped-2026',
        destination: '/personas/bestmed-rhythm1-family',
        permanent: true,
      },
      {
        source: '/personas/boncap-network-income-band-1-single-starter-2026',
        destination: '/personas/bonitas-boncap-starter-budget',
        permanent: true,
      },
      {
        source: '/personas/boncap-network-income-band-2-family-leverage-2026',
        destination: '/personas/bonitas-boncap-family-budget',
        permanent: true,
      },
      {
        source: '/personas/boncap-network-income-band-3-maternity-planning-2026',
        destination: '/personas/bonitas-boncap-maternity',
        permanent: true,
      },
      {
        source: '/personas/boncap-network-income-band-4-chronic-management-2026',
        destination: '/personas/bonitas-boncap-chronic',
        permanent: true,
      },
      {
        source: '/personas/boncore-network-strict-single-disaster-2026',
        destination: '/personas/bonitas-boncore-single',
        permanent: true,
      },
      {
        source: '/personas/boncore-network-family-disaster-child-cap-2026',
        destination: '/personas/bonitas-boncore-family',
        permanent: true,
      },
      {
        source: '/personas/bonessential-network-hospital-pmb-single-2026',
        destination: '/personas/bonitas-bonessential-single',
        permanent: true,
      },
      {
        source: '/personas/bonessential-select-network-budget-family-2026',
        destination: '/personas/bonitas-bonessential-select-family-budget',
        permanent: true,
      },
      {
        source: '/personas/boncomplete-network-savings-single-msa-2026',
        destination: '/personas/bonitas-boncomplete-single',
        permanent: true,
      },
      {
        source: '/personas/boncomplete-network-savings-family-chronic-2026',
        destination: '/personas/bonitas-boncomplete-family-chronic',
        permanent: true,
      },
      {
        source: '/personas/bonclassic-network-savings-family-moderate-chronic-2026',
        destination: '/personas/bonitas-bonclassic-family-chronic',
        permanent: true,
      },
      {
        source: '/personas/bonclassic-network-savings-senior-joint-replacement-2026',
        destination: '/personas/bonitas-bonclassic-senior-joint-care',
        permanent: true,
      },
      {
        source: '/personas/boncomprehensive-full-choice-savings-senior-comprehensive-2026',
        destination: '/personas/bonitas-boncomprehensive-senior-executive',
        permanent: true,
      },
      {
        source: '/personas/boncomprehensive-full-choice-savings-dental-implant-2026',
        destination: '/personas/bonitas-boncomprehensive-executive-dental',
        permanent: true,
      },
      {
        source: '/personas/boncomprehensive-full-choice-cancer-biologic-funding-2026',
        destination: '/personas/bonitas-boncomprehensive-executive',
        permanent: true,
      },
      {
        source: '/personas/boncomplete-network-family-maternity-young-parent-2026',
        destination: '/personas/bonitas-boncomplete-family-maternity',
        permanent: true,
      },
      {
        source: '/personas/bonclassic-network-savings-young-adult-contraceptive-2026',
        destination: '/personas/bonitas-bonclassic-starter',
        permanent: true,
      },
      {
        source: '/personas/boncap-network-young-adult-contraceptive-budget-2026',
        destination: '/personas/bonitas-boncap-starter-budget',
        permanent: true,
      },
      {
        source: '/personas/boncomprehensive-full-choice-orthodox-teen-family-2026',
        destination: '/personas/bonitas-boncomprehensive-family-executive',
        permanent: true,
      },
      {
        source: '/personas/bonclassic-network-savings-young-family-childcare-2026',
        destination: '/personas/bonitas-bonclassic-family-starter',
        permanent: true,
      },
      {
        source: '/personas/boncomprehensive-full-choice-savings-child-specialist-2026',
        destination: '/personas/bonitas-boncomprehensive-executive',
        permanent: true,
      },
      {
        source: '/personas/bonsave-network-savings-single-msa-max-2026',
        destination: '/personas/bonitas-bonsave-single',
        permanent: true,
      },
      {
        source: '/personas/bonsave-network-family-dental-orthodontics-2026',
        destination: '/personas/bonitas-bonsave-family-dental',
        permanent: true,
      },
      {
        source: '/personas/bonfit-network-budget-family-child-cap-2026',
        destination: '/personas/bonitas-bonfit-family-budget',
        permanent: true,
      },
      {
        source: '/personas/bonprime-network-savings-maternity-planning-2026',
        destination: '/personas/bonitas-bonprime-maternity',
        permanent: true,
      },
      {
        source: '/personas/bonprime-network-savings-chronic-management-2026',
        destination: '/personas/bonitas-bonprime-chronic',
        permanent: true,
      },
      {
        source: '/personas/primary-network-day-to-day-family-moderate-2026',
        destination: '/personas/primary-network-family',
        permanent: true,
      },
      {
        source: '/personas/standard-full-choice-day-to-day-family-chronic-45-2026',
        destination: '/personas/standard-full-family-chronic',
        permanent: true,
      },
      {
        source: '/personas/standard-select-network-day-to-day-family-chronic-45-nominated-gp-2026',
        destination: '/personas/standard-select-family-chronic',
        permanent: true,
      },
      {
        source: '/personas/standard-full-choice-senior-hip-knee-replacement-2026',
        destination: '/personas/standard-full-senior-joint-care',
        permanent: true,
      },
      {
        source: '/personas/standard-full-choice-type-1-diabetes-child-insulin-pump-2026',
        destination: '/personas/standard-full-chronic',
        permanent: true,
      },
      {
        source: '/personas/hospital-standard-network-disaster-single-pmb-2026',
        destination: '/personas/hospital-standard-single',
        permanent: true,
      },
      {
        source: '/personas/hospital-standard-network-family-maternity-emergency-2026',
        destination: '/personas/hospital-standard-family-maternity',
        permanent: true,
      },
      {
        source: '/personas/bonstart-network-edge-single-co-payment-disaster-2026',
        destination: '/personas/bonitas-bonstart-single',
        permanent: true,
      },
      {
        source: '/personas/bonstart-plus-network-edge-family-maternity-enhanced-2026',
        destination: '/personas/bonitas-bonstart-family-maternity',
        permanent: true,
      },
      {
        source: '/personas/bonstart-plus-network-edge-family-child-cap-sports-injury-2026',
        destination: '/personas/bonitas-bonstart-family',
        permanent: true,
      },
      {
        source: '/personas/discovery-smart-saver-classic-msa-hybrid-2026',
        destination: '/personas/discovery-smart-saver-budget',
        permanent: true,
      },
      {
        source: '/personas/discovery-smart-saver-essential-budget-msa-2026',
        destination: '/personas/discovery-smart-saver-executive-budget',
        permanent: true,
      },
      {
        source: '/personas/discovery-smart-classic-risk-funded-2026',
        destination: '/personas/discovery-smart-classic-high-usage-primary-care-sports',
        permanent: true,
      },
      {
        source: '/personas/discovery-smart-essential-budget-risk-2026',
        destination: '/personas/discovery-smart-essential-executive-budget',
        permanent: true,
      },
      {
        source: '/personas/discovery-smart-essential-dynamic-efficiency-2026',
        destination: '/personas/discovery-smart-essential-dynamic-network-optimisation',
        permanent: true,
      },
      {
        source: '/personas/discovery-smart-active-ultra-budget-2026',
        destination: '/personas/discovery-smart-active-budget',
        permanent: true,
      },
      {
        source: '/personas/discovery-saver-classic-msa-high-day2day-2026',
        destination: '/personas/discovery-saver-classic-budget',
        permanent: true,
      },
      {
        source: '/personas/discovery-saver-delta-network-discount-2026',
        destination: '/personas/discovery-saver-delta-budget',
        permanent: true,
      },
      {
        source: '/personas/discovery-saver-essential-budget-msa-2026',
        destination: '/personas/discovery-saver-essential-budget',
        permanent: true,
      },
      {
        source: '/personas/discovery-saver-coastal-regional-resident-2026',
        destination: '/personas/discovery-saver-coastal-budget',
        permanent: true,
      },
      {
        source: '/personas/discovery-keycare-plus-income-banded-network-2026',
        destination: '/personas/discovery-keycare-plus-network-income-subsidy',
        permanent: true,
      },
      {
        source: '/personas/discovery-keycare-start-budget-network-2026',
        destination: '/personas/discovery-keycare-start-budget',
        permanent: true,
      },
      {
        source: '/personas/discovery-keycare-start-regional-online-practice-2026',
        destination: '/personas/discovery-keycare-start-telemedicine-driven-cost-reduction',
        permanent: true,
      },
      {
        source: '/personas/discovery-priority-classic-limited-atb-2026',
        destination: '/personas/discovery-priority-classic-msa-phf-atb-capped',
        permanent: true,
      },
      {
        source: '/personas/discovery-priority-essential-budget-limited-atb-2026',
        destination: '/personas/discovery-priority-essential-budget',
        permanent: true,
      },
      {
        source: '/personas/discovery-executive-multi-chronic-atb-unlimited-2026',
        destination: '/personas/discovery-executive-executive-chronic',
        permanent: true,
      },
      {
        source: '/personas/discovery-executive-oncology-innovation-extended-2026',
        destination: '/personas/discovery-executive-executive',
        permanent: true,
      },
      {
        source: '/personas/discovery-executive-global-traveller-2026',
        destination: '/personas/discovery-executive-executive',
        permanent: true,
      },
      {
        source: '/personas/discovery-executive-dental-ortho-high-limits-2026',
        destination: '/personas/discovery-executive-executive-dental',
        permanent: true,
      },
      {
        source: '/personas/discovery-classic-core-single-hospital-only-2026',
        destination: '/personas/discovery-classic-core-single',
        permanent: true,
      },
      {
        source: '/personas/discovery-classic-delta-core-young-family-2026',
        destination: '/personas/discovery-classic-delta-family-starter',
        permanent: true,
      },
      {
        source: '/personas/discovery-coastal-core-resident-2026',
        destination: '/personas/discovery-coastal-core-geo-network-optimisation',
        permanent: true,
      },
      {
        source: '/personas/discovery-essential-core-oncology-budget-2026',
        destination: '/personas/discovery-essential-core-budget',
        permanent: true,
      },
      {
        source: '/personas/discovery-classic-comprehensive-family-day2day-msa-atb-2026',
        destination: '/personas/discovery-classic-comprehensive-family-executive',
        permanent: true,
      },
      {
        source: '/personas/discovery-classic-smart-comprehensive-urban-network-2026',
        destination: '/personas/discovery-classic-smart-executive',
        permanent: true,
      },
      {
        source: '/personas/discovery-classic-comprehensive-adl-mental-health-2026',
        destination: '/personas/discovery-classic-comprehensive-executive-chronic',
        permanent: true,
      },
      {
        source: '/personas/discovery-classic-comprehensive-oncology-extended-2026',
        destination: '/personas/discovery-classic-comprehensive-executive-budget',
        permanent: true,
      },
      {
        source: '/personas/fedhealth-flexifed3-d2d-plus-health-risk-assessment-savings-unlock-2026',
        destination: '/personas/fedhealth-flexifed3-behavioral-risk-pooling',
        permanent: true,
      },
      {
        source: '/personas/fedhealth-flexifed3-grid-10percent-savings-maternity-family-childhood-benefits-2026',
        destination: '/personas/fedhealth-flexifed3-family-maternity',
        permanent: true,
      },
      {
        source: '/personas/fedhealth-flexifed3-elect-25percent-savings-excess-acceptor-young-healthy-2026',
        destination: '/personas/fedhealth-flexifed3-fixed-excess-risk-transfer',
        permanent: true,
      },
      {
        source: '/personas/fedhealth-flexifed3-hospital-backup-savings-activation-threshold-race-2026',
        destination: '/personas/fedhealth-flexifed3-optionality-preservation',
        permanent: true,
      },
      {
        source: '/personas/fedhealth-myfed-income-band1-entrylevel-corporate-unlimited-gp-2026',
        destination: '/personas/fedhealth-myfed-starter-budget',
        permanent: true,
      },
      {
        source: '/personas/fedhealth-myfed-income-band4-cliff-corporate-escalation-constrained-2026',
        destination: '/personas/fedhealth-myfed-affordability-constraint-escalation',
        permanent: true,
      },
      {
        source: '/personas/fedhealth-myfed-dispensing-gp-acute-medicine-unlimited-formulary-2026',
        destination: '/personas/fedhealth-myfed-formulary-integrated-care',
        permanent: true,
      },
      {
        source: '/personas/fedhealth-flexifedsavvy-hospital-under35-virtual-gp-maximizer-2026',
        destination: '/personas/fedhealth-flexifedsavvy-day-to-day-certainty',
        permanent: true,
      },
      {
        source: '/personas/fedhealth-flexifedsavvy-savings-under35-young-family-cesarean-risk-2026',
        destination: '/personas/fedhealth-flexifedsavvy-family-starter',
        permanent: true,
      },
      {
        source: '/personas/fedhealth-maximaplus-oheb-threshold-savings-mature-triple-pool-2026',
        destination: '/personas/fedhealth-maximaplus-defined-benefit-cycling',
        permanent: true,
      },
      {
        source: '/personas/fedhealth-maximaplus-58chronic-biologic-osteo-senior-2026',
        destination: '/personas/fedhealth-maximaplus-chronic',
        permanent: true,
      },
      {
        source: '/personas/fedhealth-maximaexec-executive-threshold-10copay-reduced-chronic-2026',
        destination: '/personas/fedhealth-maximaexec-risk-management-constraint',
        permanent: true,
      },
      {
        source: '/personas/fedhealth-maximaexec-lower-oncology-core-protocol-family-2026',
        destination: '/personas/fedhealth-maximaexec-family',
        permanent: true,
      },
      {
        source: '/personas/fedhealth-flexifed1-savings-budget-starter-single-2026',
        destination: '/personas/fedhealth-flexifed1-starter-budget',
        permanent: true,
      },
      {
        source: '/personas/fedhealth-flexifed1-elect-excess-acceptor-young-2026',
        destination: '/personas/fedhealth-flexifed1-cost-reduced-hospital-transfer',
        permanent: true,
      },
      {
        source: '/personas/fedhealth-flexifed1-savings-threshold-accumulator-chronic-2026',
        destination: '/personas/fedhealth-flexifed1-chronic',
        permanent: true,
      },
      {
        source: '/personas/fedhealth-flexifed2-savings-pregnancy-planner-first-baby-2026',
        destination: '/personas/fedhealth-flexifed2-maternity',
        permanent: true,
      },
      {
        source: '/personas/fedhealth-flexifed2-grid-network-compliant-family-builder-2026',
        destination: '/personas/fedhealth-flexifed2-family',
        permanent: true,
      },
      {
        source: '/personas/fedhealth-flexifed4-savings-network-gp-maximizer-family-2026',
        destination: '/personas/fedhealth-flexifed4-day-to-day-certainty',
        permanent: true,
      },
      {
        source: '/personas/fedhealth-flexifed4-grid-large-family-child-cap-optimizer-2026',
        destination: '/personas/fedhealth-flexifed4-family',
        permanent: true,
      },
      {
        source: '/personas/fedhealth-flexifed4-elect-young-family-contraceptive-phase-2026',
        destination: '/personas/fedhealth-flexifed4-family',
        permanent: true,
      },
      {
        source: '/personas/medihelp-medprime-elect-network-single-starter-2026',
        destination: '/personas/medihelp-medprime-starter-single',
        permanent: true,
      },
      {
        source: '/personas/medihelp-medprime-fullchoice-family-core-2026',
        destination: '/personas/medihelp-medprime-family',
        permanent: true,
      },
      {
        source: '/personas/medihelp-medprime-family-large-children-cap-arbitrage-2026',
        destination: '/personas/medihelp-medprime-family',
        permanent: true,
      },
      {
        source: '/personas/medihelp-medprime-dependent-u26-rate-maximiser-2026',
        destination: '/personas/medihelp-medprime-family',
        permanent: true,
      },
      {
        source: '/personas/medihelp-medprime-preventive-contraceptive-young-adult-2026',
        destination: '/personas/medihelp-medprime-starter',
        permanent: true,
      },
      {
        source: '/personas/medihelp-medprime-maternity-enhanced-funding-2026',
        destination: '/personas/medihelp-medprime-maternity',
        permanent: true,
      },
      {
        source: '/personas/medihelp-medprime-new-parent-baby-u2-consult-optimiser-2026',
        destination: '/personas/medihelp-medprime-day-to-day-certainty',
        permanent: true,
      },
      {
        source: '/personas/medihelp-medprime-mental-health-transfer-enhanced-2026',
        destination: '/personas/medihelp-medprime-mental-health-risk-transfer-enhanced',
        permanent: true,
      },
      {
        source: '/personas/medihelp-medprime-defined-cancer-transfer-family-2026',
        destination: '/personas/medihelp-medprime-family',
        permanent: true,
      },
      {
        source: '/personas/medihelp-medprime-chronic-cdl-pmb-transfer-2026',
        destination: '/personas/medihelp-medprime-chronic',
        permanent: true,
      },
      {
        source: '/personas/medihelp-medprime-vision-dental-network-maximiser-2026',
        destination: '/personas/medihelp-medprime-dental',
        permanent: true,
      },
      {
        source: '/personas/medihelp-medprime-refractive-surgery-18-50-optimiser-2026',
        destination: '/personas/medihelp-medprime-high-cost-technology',
        permanent: true,
      },
      {
        source: '/personas/medihelp-medprime-senior-joint-degeneration-exclusion-risk-2026',
        destination: '/personas/medihelp-medprime-senior-joint-care',
        permanent: true,
      },
      {
        source: '/personas/medihelp-medprime-savings-rollover-interest-maximiser-2026',
        destination: '/personas/medihelp-medprime-msa-maximisation-roll-over',
        permanent: true,
      },
      {
        source: '/personas/medihelp-medprime-elect-post-savings-daytoday-network-router-2026',
        destination: '/personas/medihelp-medprime-risk-mitigation-copayment',
        permanent: true,
      },
      {
        source: '/personas/medshield-mediphila-hospital-starter-2026',
        destination: '/personas/medshield-mediphila-starter',
        permanent: true,
      },
      {
        source: '/personas/medshield-mediphila-family-daylimit-child-sickness-2026',
        destination: '/personas/medshield-mediphila-family',
        permanent: true,
      },
      {
        source: '/personas/medshield-mediphila-network-copay-avoidance-2026',
        destination: '/personas/medshield-mediphila-risk-mitigation-copayment',
        permanent: true,
      },
      {
        source: '/personas/medshield-mediphila-young-woman-contraception-script-max-2026',
        destination: '/personas/medshield-mediphila-starter',
        permanent: true,
      },
      {
        source: '/personas/medshield-mediphila-young-woman-iud-device-arbitrage-2026',
        destination: '/personas/medshield-mediphila-starter',
        permanent: true,
      },
      {
        source: '/personas/medshield-mediphila-maternity-compact-network-planner-2026',
        destination: '/personas/medshield-mediphila-maternity',
        permanent: true,
      },
      {
        source: '/personas/medshield-mediphila-chronic-cdlplusdepression-dsp-discipline-2026',
        destination: '/personas/medshield-mediphila-chronic',
        permanent: true,
      },
      {
        source: '/personas/medshield-mediphila-mentalhealth-pmb-only-cap-2026',
        destination: '/personas/medshield-mediphila-mental-health-risk-transfer',
        permanent: true,
      },
      {
        source: '/personas/medshield-mediphila-oncology-icon-dsp-lock-2026',
        destination: '/personas/medshield-mediphila-defined-cancer-risk-transfer',
        permanent: true,
      },
      {
        source: '/personas/medshield-mediphila-dental-wisdomteeth-copay-avoid-2026',
        destination: '/personas/medshield-mediphila-dental',
        permanent: true,
      },
      {
        source: '/personas/momentum-ingwe-connect-starter-2026',
        destination: '/personas/momentum-ingwe-starter',
        permanent: true,
      },
      {
        source: '/personas/momentum-ingwe-network-family-gp-unlimited-2026',
        destination: '/personas/momentum-ingwe-family',
        permanent: true,
      },
      {
        source: '/personas/momentum-ingwe-any-hospital-network-penalty-guard-2026',
        destination: '/personas/momentum-ingwe-risk-mitigation-copayment',
        permanent: true,
      },
      {
        source: '/personas/momentum-evolve-strict-network-starter-2026',
        destination: '/personas/momentum-evolve-chronic-starter',
        permanent: true,
      },
      {
        source: '/personas/momentum-evolve-maternity-copay-exception-2026',
        destination: '/personas/momentum-evolve-maternity',
        permanent: true,
      },
      {
        source: '/personas/momentum-incentive-associated-network-saver-2026',
        destination: '/personas/momentum-incentive-chronic-budget',
        permanent: true,
      },
      {
        source: '/personas/momentum-incentive-oncology-limit-manager-2026',
        destination: '/personas/momentum-incentive-defined-cancer-risk-transfer',
        permanent: true,
      },
      {
        source: '/personas/momentum-extender-family-threshold-activator-2026',
        destination: '/personas/momentum-extender-family',
        permanent: true,
      },
      {
        source: '/personas/momentum-extender-large-family-child-cap-leverage-2026',
        destination: '/personas/momentum-extender-family',
        permanent: true,
      },
      {
        source: '/personas/momentum-extender-associated-gp-compliance-2026',
        destination: '/personas/momentum-extender-chronic',
        permanent: true,
      },
      {
        source: '/personas/momentum-summit-full-choice-specialist-max-2026',
        destination: '/personas/momentum-summit-defined-specialist',
        permanent: true,
      },
      {
        source: '/personas/momentum-custom-associated-hospital-penalty-avoid-2026',
        destination: '/personas/momentum-custom-risk-mitigation-copayment',
        permanent: true,
      },
      {
        source: '/personas/sizwehosmed-access-core-young-dsp-hospital-starter-2026',
        destination: '/personas/sizwehosmed-access-core-disaster',
        permanent: true,
      },
      {
        source: '/personas/sizwehosmed-access-core-non-dsp-usage-penalty-risk-2026',
        destination: '/personas/sizwehosmed-access-core-risk-mitigation-copayment',
        permanent: true,
      },
      {
        source: '/personas/sizwehosmed-access-core-maternity-bambino-registration-2026',
        destination: '/personas/sizwehosmed-access-core-maternity',
        permanent: true,
      },
      {
        source: '/personas/sizwehosmed-access-core-senior-55plus-amd-joint-constraint-2026',
        destination: '/personas/sizwehosmed-access-core-risk-management-constraint',
        permanent: true,
      },
      {
        source: '/personas/sizwehosmed-access-saver-upfront-msa-liquidity-starter-2026',
        destination: '/personas/sizwehosmed-access-saver-savings-and-risk-hybrid',
        permanent: true,
      },
      {
        source: '/personas/sizwehosmed-access-saver-msa-exhaustion-cliff-budget-2026',
        destination: '/personas/sizwehosmed-access-saver-budget',
        permanent: true,
      },
      {
        source: '/personas/sizwehosmed-access-saver-dsp-optical-dental-arbitrage-2026',
        destination: '/personas/sizwehosmed-access-saver-network-compliance-arbitrage',
        permanent: true,
      },
      {
        source: '/personas/sizwehosmed-access-saver-day-procedure-deductible-scheduler-2026',
        destination: '/personas/sizwehosmed-access-saver-risk-mitigation-copayment',
        permanent: true,
      },
      {
        source: '/personas/sizwehosmed-gold-ascend-family-full-choice-core-cover-2026',
        destination: '/personas/sizwehosmed-gold-ascend-family',
        permanent: true,
      },
      {
        source: '/personas/sizwehosmed-gold-ascend-oncology-limit-copay-guardrail-2026',
        destination: '/personas/sizwehosmed-gold-ascend-defined-cancer-risk-transfer',
        permanent: true,
      },
      {
        source: '/personas/sizwehosmed-gold-ascend-diagnostic-mri-ct-nonpmb-copay-2026',
        destination: '/personas/sizwehosmed-gold-ascend-diagnostic-risk-transfer',
        permanent: true,
      },
      {
        source: '/personas/sizwehosmed-gold-ascend-edo-network-hospital-price-leverage-2026',
        destination: '/personas/sizwehosmed-gold-ascend-network-compliance-arbitrage',
        permanent: true,
      },
      {
        source: '/personas/sizwehosmed-value-platinum-family-full-choice-high-cover-2026',
        destination: '/personas/sizwehosmed-value-platinum-budget',
        permanent: true,
      },
      {
        source: '/personas/sizwehosmed-value-platinum-core-network-hospital-leverage-2026',
        destination: '/personas/sizwehosmed-value-platinum-budget',
        permanent: true,
      },
      {
        source: '/personas/sizwehosmed-value-platinum-specialised-radiology-event-copay-2026',
        destination: '/personas/sizwehosmed-value-platinum-budget',
        permanent: true,
      },
      {
        source: '/personas/sizwehosmed-value-platinum-oncology-overlimit-20percent-copay-2026',
        destination: '/personas/sizwehosmed-value-platinum-budget',
        permanent: true,
      },
      {
        source: '/personas/sizwehosmed-titanium-executive-multi-chronic-high-transfer-2026',
        destination: '/personas/sizwehosmed-titanium-executive-chronic',
        permanent: true,
      },
      {
        source: '/personas/sizwehosmed-titanium-executive-biologic-bridge-non-cancer-limit-2026',
        destination: '/personas/sizwehosmed-titanium-executive-biologic-bridge',
        permanent: true,
      },
      {
        source: '/personas/sizwehosmed-titanium-executive-orthodontics-9to21-dental-strategy-2026',
        destination: '/personas/sizwehosmed-titanium-executive-dental',
        permanent: true,
      },
      {
        source: '/personas/sizwehosmed-titanium-executive-senior-55plus-amd-diagnostics-2026',
        destination: '/personas/sizwehosmed-titanium-executive-preventative-maximisation',
        permanent: true,
      },
      {
        source: '/personas/sizwehosmed-titanium-executive-prosthesis-joint-spine-limit-planner-2026',
        destination: '/personas/sizwehosmed-titanium-executive-internal-device-risk-transfer',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
