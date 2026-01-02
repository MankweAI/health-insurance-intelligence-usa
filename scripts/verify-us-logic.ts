import { getProcedure, getProvider, getPlan, getRate, MOCK_DB } from '@/data';
import { calculateLiability } from '@/lib/us/calculator';

async function runVerification() {
    console.log('--- Starting Verification ---');

    // 1. Verify Data Loading
    const proc = getProcedure('total-hip-replacement');
    const prov = getProvider('mayo-clinic-rochester');
    const plan = getPlan('uhc-choice-plus');

    if (!proc || !prov || !plan) {
        console.error('FAILED: Could not load dummy entities.');
        return;
    }
    console.log(`PASS: Loaded Entities: ${proc.name}, ${prov.name}, ${plan.payer_name}`);

    // 2. Verify Rate Existence
    const rate = getRate(proc.cpt_code, prov.npi, plan.slug);
    if (!rate) {
        console.error('FAILED: No rate found for defined combo.');
        return;
    }
    console.log(`PASS: Found Rate: $${rate.negotiated_rate}`);

    // 3. Verify Math Logic
    // Scenario: Rate $25,000. Deductible $5,000. Co-insurance 20%. OOP Max $10,000.
    // Expect: Pay $5000 (deductible). Remaining $20,000. Pay 20% of $20k = $4,000. Total $9,000.
    const scenario = calculateLiability({
        negotiatedRate: 25000,
        remainingDeductible: 5000,
        coInsuranceRate: 0.20,
        outOfPocketMaxRemaining: 10000
    });

    const expectedTotal = 9000;

    if (scenario.totalLiability === expectedTotal) {
        console.log(`PASS: Math Logic Check. Expected $9000, Got $${scenario.totalLiability}`);
    } else {
        console.error(`FAILED: Math Logic Check. Expected $9000, Got $${scenario.totalLiability}`);
        console.log(JSON.stringify(scenario, null, 2));
    }

    // 4. Verify Capping Logic
    // Scenario: Same but OOP Max is $6,000.
    // Expect: Pay $5000 (deductible). Remaining is $1000 to cap. Total $6000.
    const cappedScenario = calculateLiability({
        negotiatedRate: 25000,
        remainingDeductible: 5000,
        coInsuranceRate: 0.20,
        outOfPocketMaxRemaining: 6000
    });

    if (cappedScenario.totalLiability === 6000) {
        console.log(`PASS: OOP Capping Check. Expected $6000, Got $${cappedScenario.totalLiability}`);
    } else {
        console.error(`FAILED: OOP Capping Check. Expected $6000, Got $${cappedScenario.totalLiability}`);
    }

    console.log('--- Verification Complete ---');
}

runVerification();
