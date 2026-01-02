/**
 * Seed Bestmed Data to Supabase
 * 
 * Run with: npx tsx scripts/seed-bestmed.ts
 * 
 * This script reads all local plan and procedure data and upserts to Supabase.
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Import Bestmed Plans
import { BEAT1_NETWORK_2026 } from '../data/bestmed/beat1-plan';
// import { BEAT2_NETWORK_2026 } from '../data/bestmed/beat2-plan';
// import { BEAT3_PLUS_2026, BEAT3_NETWORK_2026 } from '../data/bestmed/beat3-plan';
// import { BEAT4_2026 } from '../data/bestmed/beat4-plan';
// import { PACE1_2026 } from '../data/bestmed/pace1-plan';
// import { PACE2_2026 } from '../data/bestmed/pace2-plan';
// import { PACE3_2026 } from '../data/bestmed/pace3-plan';
// import { PACE4_2026 } from '../data/bestmed/pace4-plan';
// import { RHYTHM1_2026 } from '../data/bestmed/rhythm1-plan';
// import { RHYTHM2_2026 } from '../data/bestmed/rhythm2-plan';

// Import Bestmed Procedures
import { ALL_BESTMED_PROCEDURES } from '../data/bestmed/procedures';
import { ADDITIONAL_PROCEDURES } from '../data/bestmed/procedures/additional';

// Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// ============================================================================
// PLAN DATA WITH SLUG MAPPING
// ============================================================================

interface PlanEntry {
    id: string;
    slug: string;
    series: string;
    tier: number;
    data: any;
}

const PLANS: PlanEntry[] = [
    // Beat Series
    {
        id: 'bestmed-beat1-network-2026',
        slug: 'beat1-network',
        series: 'beat',
        tier: 1,
        data: BEAT1_NETWORK_2026
    },
    // {
    //     id: 'bestmed-beat2-network-2026',
    //     slug: 'beat2-network',
    //     series: 'beat',
    //     tier: 2,
    //     data: BEAT2_NETWORK_2026
    // },
    // {
    //     id: 'bestmed-beat3-plus-2026',
    //     slug: 'beat3-plus',
    //     series: 'beat',
    //     tier: 3,
    //     data: BEAT3_PLUS_2026
    // },
    // {
    //     id: 'bestmed-beat3-network-2026',
    //     slug: 'beat3-network',
    //     series: 'beat',
    //     tier: 3,
    //     data: BEAT3_NETWORK_2026
    // },
    // {
    //     id: 'bestmed-beat4-2026',
    //     slug: 'beat4',
    //     series: 'beat',
    //     tier: 4,
    //     data: BEAT4_2026
    // },
    // // Pace Series
    // {
    //     id: 'bestmed-pace1-2026',
    //     slug: 'pace1',
    //     series: 'pace',
    //     tier: 1,
    //     data: PACE1_2026
    // },
    // {
    //     id: 'bestmed-pace2-2026',
    //     slug: 'pace2',
    //     series: 'pace',
    //     tier: 2,
    //     data: PACE2_2026
    // },
    // {
    //     id: 'bestmed-pace3-2026',
    //     slug: 'pace3',
    //     series: 'pace',
    //     tier: 3,
    //     data: PACE3_2026
    // },
    // {
    //     id: 'bestmed-pace4-2026',
    //     slug: 'pace4',
    //     series: 'pace',
    //     tier: 4,
    //     data: PACE4_2026
    // },
    // // Rhythm Series
    // {
    //     id: 'bestmed-rhythm1-2026',
    //     slug: 'rhythm1',
    //     series: 'rhythm',
    //     tier: 1,
    //     data: RHYTHM1_2026
    // },
    // {
    //     id: 'bestmed-rhythm2-2026',
    //     slug: 'rhythm2',
    //     series: 'rhythm',
    //     tier: 2,
    //     data: RHYTHM2_2026
    // },
    // More plans will be added here as brochures are provided
];

// ============================================================================
// SEED FUNCTIONS
// ============================================================================

async function seedPlans() {
    console.log('📦 Seeding bestmed_plans...');

    for (const plan of PLANS) {
        const { error } = await supabase
            .from('bestmed_plans')
            .upsert({
                id: plan.id,
                slug: plan.slug,
                series: plan.series,
                tier: plan.tier,
                data: plan.data,
            }, { onConflict: 'id' });

        if (error) {
            console.error(`❌ Failed to upsert plan ${plan.id}:`, error.message);
        } else {
            console.log(`  ✅ ${plan.slug} (${plan.series} tier ${plan.tier})`);
        }
    }

    console.log(`\n📊 Total plans: ${PLANS.length}`);
}

async function seedProcedures() {
    console.log('\n🔬 Seeding bestmed_procedures...');

    const combinedProcedures = [...ALL_BESTMED_PROCEDURES, ...ADDITIONAL_PROCEDURES];

    for (const proc of combinedProcedures) {
        const { error } = await supabase
            .from('bestmed_procedures')
            .upsert({
                id: proc.id,
                category: proc.category,
                data: proc,
            }, { onConflict: 'id' });

        if (error) {
            console.error(`❌ Failed to upsert procedure ${proc.id}:`, error.message);
        } else {
            console.log(`  ✅ ${proc.label} (${proc.category})`);
        }
    }

    console.log(`\n📊 Total procedures: ${combinedProcedures.length}`);
}

async function main() {
    console.log('🚀 Starting Bestmed data migration...\n');
    console.log(`📍 Supabase URL: ${supabaseUrl}\n`);

    await seedPlans();
    await seedProcedures();

    console.log('\n✨ Migration complete!');
}

main().catch(console.error);
