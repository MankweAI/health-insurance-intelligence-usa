-- Discovery Health Database Migration
-- Run this in Supabase SQL Editor

-- ============================================================================
-- 1. DISCOVERY PLANS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS discovery_plans (
    id TEXT PRIMARY KEY,           -- e.g., 'discovery-smart-classic-2026'
    slug TEXT NOT NULL UNIQUE,     -- SEO slug e.g., 'smart-classic'
    series TEXT NOT NULL,          -- 'smart', 'core', 'keycare', etc.
    data JSONB NOT NULL,           -- Full DiscoveryPlan object
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_discovery_plans_series ON discovery_plans(series);
CREATE INDEX IF NOT EXISTS idx_discovery_plans_slug ON discovery_plans(slug);

-- Enable RLS (Row Level Security)
ALTER TABLE discovery_plans ENABLE ROW LEVEL SECURITY;

-- Allow public read access (for static site generation)
CREATE POLICY "Allow public read access on discovery_plans"
    ON discovery_plans FOR SELECT
    TO public
    USING (true);

-- ============================================================================
-- 2. DISCOVERY PROCEDURES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS discovery_procedures (
    id TEXT PRIMARY KEY,           -- e.g., 'gastroscopy'
    category TEXT NOT NULL,        -- 'scope', 'dental', 'ophthalmology', etc.
    data JSONB NOT NULL,           -- Full Procedure object
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_discovery_procedures_category ON discovery_procedures(category);

-- Enable RLS
ALTER TABLE discovery_procedures ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access on discovery_procedures"
    ON discovery_procedures FOR SELECT
    TO public
    USING (true);

-- ============================================================================
-- 3. UPDATED_AT TRIGGER (Auto-update timestamp on changes)
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for discovery_plans
DROP TRIGGER IF EXISTS update_discovery_plans_updated_at ON discovery_plans;
CREATE TRIGGER update_discovery_plans_updated_at
    BEFORE UPDATE ON discovery_plans
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger for discovery_procedures
DROP TRIGGER IF EXISTS update_discovery_procedures_updated_at ON discovery_procedures;
CREATE TRIGGER update_discovery_procedures_updated_at
    BEFORE UPDATE ON discovery_procedures
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- VERIFICATION
-- ============================================================================
-- After running this script, verify tables exist:
-- SELECT * FROM discovery_plans LIMIT 1;
-- SELECT * FROM discovery_procedures LIMIT 1;
