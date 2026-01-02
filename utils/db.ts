/**
 * Database Access Layer
 * 
 * Centralized Supabase data access functions for personas and plans.
 * Use these functions instead of importing from local data files.
 */

import { createClient } from '@/utils/supabase/server';
import { Persona } from '@/utils/persona';
import { Plan } from '@/utils/types';

// ============================================================================
// PERSONAS
// ============================================================================

/**
 * Fetch all personas from database
 */
export async function getPersonas(): Promise<Persona[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('personas')
        .select('data')
        .order('slug');

    if (error) {
        console.error('Error fetching personas:', error.message);
        return [];
    }

    // Extract the full persona object from the JSONB 'data' column
    return (data || []).map(row => row.data as Persona);
}

/**
 * Fetch a single persona by V1 slug
 */
export async function getPersonaBySlug(slug: string): Promise<Persona | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('personas')
        .select('data')
        .eq('slug', slug)
        .single();

    if (error) {
        // Not found is expected for invalid slugs
        if (error.code !== 'PGRST116') {
            console.error('Error fetching persona:', error.message);
        }
        return null;
    }

    return data?.data as Persona || null;
}

/**
 * Fetch personas by category
 */
export async function getPersonasByCategory(category: string): Promise<Persona[]> {
    const supabase = await createClient();

    // Since category is nested in the JSONB 'data' column, we need to filter on it
    const { data, error } = await supabase
        .from('personas')
        .select('data')
        .order('slug');

    if (error) {
        console.error('Error fetching personas by category:', error.message);
        return [];
    }

    // Filter by category client-side (category is nested in data.meta.category)
    return (data || [])
        .map(row => row.data as Persona)
        .filter(p => p.meta.category.toLowerCase() === category.toLowerCase());
}

// ============================================================================
// PLANS
// ============================================================================

/**
 * Fetch all plans from database
 */
export async function getPlans(): Promise<Plan[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('plans')
        .select('data')
        .order('id');

    if (error) {
        console.error('Error fetching plans:', error.message);
        return [];
    }

    // Extract the full plan object from the JSONB 'data' column
    return (data || []).map(row => row.data as Plan);
}

/**
 * Fetch a single plan by ID
 */
export async function getPlanById(id: string): Promise<Plan | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('plans')
        .select('data')
        .eq('id', id)
        .single();

    if (error) {
        if (error.code !== 'PGRST116') {
            console.error('Error fetching plan:', error.message);
        }
        return null;
    }

    return data?.data as Plan || null;
}

/**
 * Fetch multiple plans by IDs
 */
export async function getPlansByIds(ids: string[]): Promise<Plan[]> {
    if (ids.length === 0) return [];

    const supabase = await createClient();

    const { data, error } = await supabase
        .from('plans')
        .select('data')
        .in('id', ids);

    if (error) {
        console.error('Error fetching plans by IDs:', error.message);
        return [];
    }

    // Extract the full plan object from the JSONB 'data' column
    return (data || []).map(row => row.data as Plan);
}

// ============================================================================
// DISCOVERY HEALTH (Plans & Procedures for /discovery-health cluster)
// Uses build-time client to avoid cookies requirement in generateStaticParams
// ============================================================================

import { DiscoveryPlan, Procedure } from '@/types/schemes/discovery';
import { createBuildTimeClient } from '@/utils/supabase/build-client';

/**
 * Fetch all Discovery plans from database (build-time compatible)
 */
export async function getDiscoveryPlans(): Promise<DiscoveryPlan[]> {
    const supabase = createBuildTimeClient();

    const { data, error } = await supabase
        .from('discovery_plans')
        .select('data')
        .order('id') as { data: { data: DiscoveryPlan }[] | null; error: any };

    if (error) {
        console.error('Error fetching discovery plans:', error.message);
        return [];
    }

    return (data || []).map(row => row.data);
}

/**
 * Fetch a single Discovery plan by ID (build-time compatible)
 */
export async function getDiscoveryPlanById(id: string): Promise<DiscoveryPlan | null> {
    const supabase = createBuildTimeClient();

    const { data, error } = await supabase
        .from('discovery_plans')
        .select('data')
        .eq('id', id)
        .single() as { data: { data: DiscoveryPlan } | null; error: any };

    if (error) {
        if (error?.code !== 'PGRST116') {
            console.error('Error fetching discovery plan:', error?.message);
        }
        return null;
    }

    return data?.data || null;
}

/**
 * Fetch a Discovery plan by SEO slug (build-time compatible)
 */
export async function getDiscoveryPlanBySlug(slug: string): Promise<{ id: string; plan: DiscoveryPlan } | null> {
    const supabase = createBuildTimeClient();

    const { data, error } = await supabase
        .from('discovery_plans')
        .select('id, data')
        .eq('slug', slug)
        .single() as { data: { id: string; data: DiscoveryPlan } | null; error: any };

    if (error) {
        if (error?.code !== 'PGRST116') {
            console.error('Error fetching discovery plan by slug:', error?.message);
        }
        return null;
    }

    return data ? { id: data.id, plan: data.data } : null;
}

/**
 * Fetch all Discovery plan slugs (for static generation, build-time compatible)
 */
export async function getDiscoveryPlanSlugs(): Promise<{ id: string; slug: string; series: string }[]> {
    const supabase = createBuildTimeClient();

    const { data, error } = await supabase
        .from('discovery_plans')
        .select('id, slug, series')
        .order('series') as { data: { id: string; slug: string; series: string }[] | null; error: any };

    if (error) {
        console.error('Error fetching discovery plan slugs:', error?.message);
        return [];
    }

    return data || [];
}

/**
 * Fetch all Discovery procedures from database (build-time compatible)
 */
export async function getDiscoveryProcedures(): Promise<Procedure[]> {
    const supabase = createBuildTimeClient();

    const { data, error } = await supabase
        .from('discovery_procedures')
        .select('data')
        .order('id') as { data: { data: Procedure }[] | null; error: any };

    if (error) {
        console.error('Error fetching discovery procedures:', error?.message);
        return [];
    }

    return (data || []).map(row => row.data);
}

/**
 * Fetch a single Discovery procedure by ID (build-time compatible)
 */
export async function getDiscoveryProcedureById(id: string): Promise<Procedure | null> {
    const supabase = createBuildTimeClient();

    const { data, error } = await supabase
        .from('discovery_procedures')
        .select('data')
        .eq('id', id)
        .single() as { data: { data: Procedure } | null; error: any };

    if (error) {
        if (error?.code !== 'PGRST116') {
            console.error('Error fetching discovery procedure:', error?.message);
        }
        return null;
    }

    return data?.data || null;
}

/**
 * Fetch Discovery procedures by category (build-time compatible)
 */
export async function getDiscoveryProceduresByCategory(category: string): Promise<Procedure[]> {
    const supabase = createBuildTimeClient();

    const { data, error } = await supabase
        .from('discovery_procedures')
        .select('data')
        .eq('category', category)
        .order('id') as { data: { data: Procedure }[] | null; error: any };

    if (error) {
        console.error('Error fetching discovery procedures by category:', error?.message);
        return [];
    }

    return (data || []).map(row => row.data);
}

// ============================================================================
// BESTMED (Plans & Procedures for /bestmed cluster)
// Uses build-time client to avoid cookies requirement in generateStaticParams
// ============================================================================

import { BestmedPlan, BestmedProcedure } from '@/types/schemes/bestmed';

/**
 * Fetch all Bestmed plans from database (build-time compatible)
 */
export async function getBestmedPlans(): Promise<BestmedPlan[]> {
    const supabase = createBuildTimeClient();

    const { data, error } = await supabase
        .from('bestmed_plans')
        .select('data')
        .order('id') as { data: { data: BestmedPlan }[] | null; error: any };

    if (error) {
        console.error('Error fetching bestmed plans:', error?.message);
        return [];
    }

    return (data || []).map(row => row.data);
}

/**
 * Fetch a single Bestmed plan by ID (build-time compatible)
 */
export async function getBestmedPlanById(id: string): Promise<BestmedPlan | null> {
    const supabase = createBuildTimeClient();

    const { data, error } = await supabase
        .from('bestmed_plans')
        .select('data')
        .eq('id', id)
        .single() as { data: { data: BestmedPlan } | null; error: any };

    if (error) {
        if (error?.code !== 'PGRST116') {
            console.error('Error fetching bestmed plan:', error?.message);
        }
        return null;
    }

    return data?.data || null;
}

/**
 * Fetch a Bestmed plan by SEO slug (build-time compatible)
 */
export async function getBestmedPlanBySlug(slug: string): Promise<{ id: string; plan: BestmedPlan } | null> {
    const supabase = createBuildTimeClient();

    const { data, error } = await supabase
        .from('bestmed_plans')
        .select('id, data')
        .eq('slug', slug)
        .single() as { data: { id: string; data: BestmedPlan } | null; error: any };

    if (error) {
        if (error?.code !== 'PGRST116') {
            console.error('Error fetching bestmed plan by slug:', error?.message);
        }
        return null;
    }

    return data ? { id: data.id, plan: data.data } : null;
}

/**
 * Fetch all Bestmed plan slugs (for static generation, build-time compatible)
 */
export async function getBestmedPlanSlugs(): Promise<{ id: string; slug: string; series: string; tier: number }[]> {
    const supabase = createBuildTimeClient();

    const { data, error } = await supabase
        .from('bestmed_plans')
        .select('id, slug, series, tier')
        .order('series') as { data: { id: string; slug: string; series: string; tier: number }[] | null; error: any };

    if (error) {
        console.error('Error fetching bestmed plan slugs:', error?.message);
        return [];
    }

    return data || [];
}

/**
 * Fetch all Bestmed procedures from database (build-time compatible)
 */
export async function getBestmedProcedures(): Promise<BestmedProcedure[]> {
    const supabase = createBuildTimeClient();

    const { data, error } = await supabase
        .from('bestmed_procedures')
        .select('data')
        .order('id') as { data: { data: BestmedProcedure }[] | null; error: any };

    if (error) {
        console.error('Error fetching bestmed procedures:', error?.message);
        return [];
    }

    return (data || []).map(row => row.data);
}

/**
 * Fetch a single Bestmed procedure by ID (build-time compatible)
 */
export async function getBestmedProcedureById(id: string): Promise<BestmedProcedure | null> {
    const supabase = createBuildTimeClient();

    const { data, error } = await supabase
        .from('bestmed_procedures')
        .select('data')
        .eq('id', id)
        .single() as { data: { data: BestmedProcedure } | null; error: any };

    if (error) {
        if (error?.code !== 'PGRST116') {
            console.error('Error fetching bestmed procedure:', error?.message);
        }
        return null;
    }

    return data?.data || null;
}

// ============================================================================
// BONITAS PLAN & PROCEDURE ACCESS (build-time compatible)
// ============================================================================

import { BonitasProcedure } from '@/types/schemes/bonitas';

/**
 * Fetch all Bonitas plan slugs from database (build-time compatible)
 */
export async function getBonitasPlanSlugs(): Promise<{ id: string; slug: string; series: string }[]> {
    const supabase = createBuildTimeClient();

    const { data, error } = await supabase
        .from('bonitas_plans')
        .select('id, slug, series')
        .order('series') as { data: { id: string; slug: string; series: string }[] | null; error: any };

    if (error) {
        console.error('Error fetching bonitas plan slugs:', error?.message);
        return [];
    }

    return data || [];
}

/**
 * Fetch all Bonitas procedures from database (build-time compatible)
 */
export async function getBonitasProcedures(): Promise<BonitasProcedure[]> {
    const supabase = createBuildTimeClient();

    const { data, error } = await supabase
        .from('bonitas_procedures')
        .select('data')
        .order('id') as { data: { data: BonitasProcedure }[] | null; error: any };

    if (error) {
        console.error('Error fetching bonitas procedures:', error?.message);
        return [];
    }

    return (data || []).map(row => row.data);
}

