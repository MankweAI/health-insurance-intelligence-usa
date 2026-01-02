/**
 * Seed Discovery Health Data to Supabase
 * 
 * Run with: npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/seed-discovery.ts
 * Or: npx tsx scripts/seed-discovery.ts
 * 
 * This script reads all local plan and procedure data and upserts to Supabase.
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Import all Discovery Plans
import { CLASSIC_SMART_2026, ESSENTIAL_SMART_2026, ESSENTIAL_DYNAMIC_SMART_2026, ACTIVE_SMART_2026 } from '../data/discovery/smart-series-plans';
import { CLASSIC_SMART_SAVER_2026, ESSENTIAL_SMART_SAVER_2026 } from '../data/discovery/smart-saver-series-plans';
import { EXECUTIVE_PLAN_2026 } from '../data/discovery/executive-plan';
import { CLASSIC_COMPREHENSIVE_2026, CLASSIC_SMART_COMPREHENSIVE_2026 } from '../data/discovery/comprehensive-series-plans';
import { CLASSIC_CORE_2026, CLASSIC_DELTA_CORE_2026, ESSENTIAL_CORE_2026, ESSENTIAL_DELTA_CORE_2026, COASTAL_CORE_2026 } from '../data/discovery/core-series-plans';
import { KEYCARE_PLUS_2026, KEYCARE_CORE_2026, KEYCARE_START_2026, KEYCARE_START_REGIONAL_2026 } from '../data/discovery/keycare-series-plans';
import { PRIORITY_CLASSIC_2026, PRIORITY_CLASSIC_ESSENTIAL_2026 } from '../data/discovery/priority-series-plans';
import { CLASSIC_SAVER_2026, CLASSIC_DELTA_SAVER_2026, ESSENTIAL_SAVER_2026, ESSENTIAL_DELTA_SAVER_2026, COASTAL_SAVER_2026 } from '../data/discovery/saver-series-plans';

// Import all Procedures
import { ALL_PROCEDURES } from '../data/discovery/procedures';

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
    data: any;
}

const PLANS: PlanEntry[] = [
    // Smart Series (4 plans)
    { id: 'discovery-smart-classic-2026', slug: 'smart-classic', series: 'smart', data: CLASSIC_SMART_2026 },
    { id: 'discovery-smart-essential-2026', slug: 'smart-essential', series: 'smart', data: ESSENTIAL_SMART_2026 },
    { id: 'discovery-smart-essential-dynamic-2026', slug: 'smart-essential-dynamic', series: 'smart', data: ESSENTIAL_DYNAMIC_SMART_2026 },
    { id: 'discovery-smart-active-2026', slug: 'smart-active', series: 'smart', data: ACTIVE_SMART_2026 },

    // Smart Saver Series (2 plans)
    { id: 'discovery-smart-saver-classic-2026', slug: 'smart-saver-classic', series: 'smart-saver', data: CLASSIC_SMART_SAVER_2026 },
    { id: 'discovery-smart-saver-essential-2026', slug: 'smart-saver-essential', series: 'smart-saver', data: ESSENTIAL_SMART_SAVER_2026 },

    // Executive (1 plan)
    { id: 'discovery-executive-2026', slug: 'executive', series: 'executive', data: EXECUTIVE_PLAN_2026 },

    // Comprehensive Series (2 plans)
    { id: 'discovery-comprehensive-classic-2026', slug: 'comprehensive-classic', series: 'comprehensive', data: CLASSIC_COMPREHENSIVE_2026 },
    { id: 'discovery-comprehensive-classic-smart-2026', slug: 'comprehensive-classic-smart', series: 'comprehensive', data: CLASSIC_SMART_COMPREHENSIVE_2026 },

    // Core Series (5 plans)
    { id: 'discovery-core-classic-2026', slug: 'core-classic', series: 'core', data: CLASSIC_CORE_2026 },
    { id: 'discovery-core-classic-delta-2026', slug: 'core-classic-delta', series: 'core', data: CLASSIC_DELTA_CORE_2026 },
    { id: 'discovery-core-essential-2026', slug: 'core-essential', series: 'core', data: ESSENTIAL_CORE_2026 },
    { id: 'discovery-core-essential-delta-2026', slug: 'core-essential-delta', series: 'core', data: ESSENTIAL_DELTA_CORE_2026 },
    { id: 'discovery-core-coastal-2026', slug: 'core-coastal', series: 'core', data: COASTAL_CORE_2026 },

    // KeyCare Series (4 plans)
    { id: 'discovery-keycare-plus-2026', slug: 'keycare-plus', series: 'keycare', data: KEYCARE_PLUS_2026 },
    { id: 'discovery-keycare-core-2026', slug: 'keycare-core', series: 'keycare', data: KEYCARE_CORE_2026 },
    { id: 'discovery-keycare-start-2026', slug: 'keycare-start', series: 'keycare', data: KEYCARE_START_2026 },
    { id: 'discovery-keycare-start-regional-2026', slug: 'keycare-start-regional', series: 'keycare', data: KEYCARE_START_REGIONAL_2026 },

    // Priority Series (2 plans)
    { id: 'discovery-priority-classic-2026', slug: 'priority-classic', series: 'priority', data: PRIORITY_CLASSIC_2026 },
    { id: 'discovery-priority-classic-essential-2026', slug: 'priority-classic-essential', series: 'priority', data: PRIORITY_CLASSIC_ESSENTIAL_2026 },

    // Saver Series (5 plans)
    { id: 'discovery-saver-classic-2026', slug: 'saver-classic', series: 'saver', data: CLASSIC_SAVER_2026 },
    { id: 'discovery-saver-classic-delta-2026', slug: 'saver-classic-delta', series: 'saver', data: CLASSIC_DELTA_SAVER_2026 },
    { id: 'discovery-saver-essential-2026', slug: 'saver-essential', series: 'saver', data: ESSENTIAL_SAVER_2026 },
    { id: 'discovery-saver-essential-delta-2026', slug: 'saver-essential-delta', series: 'saver', data: ESSENTIAL_DELTA_SAVER_2026 },
    { id: 'discovery-saver-coastal-2026', slug: 'saver-coastal', series: 'saver', data: COASTAL_SAVER_2026 },
];

// ============================================================================
// SEED FUNCTIONS
// ============================================================================

async function seedPlans() {
    console.log('📦 Seeding discovery_plans...');

    for (const plan of PLANS) {
        const { error } = await supabase
            .from('discovery_plans')
            .upsert({
                id: plan.id,
                slug: plan.slug,
                series: plan.series,
                data: plan.data,
            }, { onConflict: 'id' });

        if (error) {
            console.error(`❌ Failed to upsert plan ${plan.id}:`, error.message);
        } else {
            console.log(`  ✅ ${plan.slug} (${plan.series})`);
        }
    }

    console.log(`\n📊 Total plans: ${PLANS.length}`);
}

async function seedProcedures() {
    console.log('\n🔬 Seeding discovery_procedures...');

    for (const proc of ALL_PROCEDURES) {
        const { error } = await supabase
            .from('discovery_procedures')
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

    console.log(`\n📊 Total procedures: ${ALL_PROCEDURES.length}`);
}

async function main() {
    console.log('🚀 Starting Discovery Health data migration...\n');
    console.log(`📍 Supabase URL: ${supabaseUrl}\n`);

    await seedPlans();
    await seedProcedures();

    console.log('\n✨ Migration complete!');
}

main().catch(console.error);
