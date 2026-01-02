-- Bestmed Database Migration
-- Run this in Supabase SQL Editor

-- ============================================================================
-- 1. BESTMED PLANS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS bestmed_plans (
    id TEXT PRIMARY KEY,           -- e.g., 'bestmed-beat1-network-2026'
    slug TEXT NOT NULL UNIQUE,     -- SEO slug e.g., 'beat1-network'
    series TEXT NOT NULL,          -- 'beat', 'pace', 'rhythm'
    tier INTEGER NOT NULL,         -- 1, 2, 3, 4
    data JSONB NOT NULL,           -- Full BestmedPlan object
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_bestmed_plans_series ON bestmed_plans(series);
CREATE INDEX IF NOT EXISTS idx_bestmed_plans_slug ON bestmed_plans(slug);
CREATE INDEX IF NOT EXISTS idx_bestmed_plans_tier ON bestmed_plans(tier);

-- Enable RLS (Row Level Security)
ALTER TABLE bestmed_plans ENABLE ROW LEVEL SECURITY;

-- Allow public read access (for static site generation)
CREATE POLICY "Allow public read access on bestmed_plans"
    ON bestmed_plans FOR SELECT
    TO public
    USING (true);

-- ============================================================================
-- 2. BESTMED PROCEDURES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS bestmed_procedures (
    id TEXT PRIMARY KEY,           -- e.g., 'gastroscopy'
    category TEXT NOT NULL,        -- 'scope', 'orthopedic', etc.
    data JSONB NOT NULL,           -- Full BestmedProcedure object
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_bestmed_procedures_category ON bestmed_procedures(category);

-- Enable RLS
ALTER TABLE bestmed_procedures ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access on bestmed_procedures"
    ON bestmed_procedures FOR SELECT
    TO public
    USING (true);

-- ============================================================================
-- 3. UPDATED_AT TRIGGER
-- ============================================================================

-- Trigger for bestmed_plans
DROP TRIGGER IF EXISTS update_bestmed_plans_updated_at ON bestmed_plans;
CREATE TRIGGER update_bestmed_plans_updated_at
    BEFORE UPDATE ON bestmed_plans
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger for bestmed_procedures
DROP TRIGGER IF EXISTS update_bestmed_procedures_updated_at ON bestmed_procedures;
CREATE TRIGGER update_bestmed_procedures_updated_at
    BEFORE UPDATE ON bestmed_procedures
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
