/**
 * Supabase Client for Build Time / Static Generation
 * 
 * This client is used during `generateStaticParams` and other build-time
 * contexts where cookies are not available. It uses the service role key
 * for server-side operations without authentication context.
 */

import { createClient as createSupabaseClient } from '@supabase/supabase-js';

let buildTimeClient: ReturnType<typeof createSupabaseClient> | null = null;

/**
 * Create a Supabase client for build-time operations.
 * This doesn't require cookies or request context.
 */
export function createBuildTimeClient() {
    if (buildTimeClient) return buildTimeClient;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        throw new Error('Missing Supabase environment variables');
    }

    buildTimeClient = createSupabaseClient(supabaseUrl, supabaseKey);
    return buildTimeClient;
}
