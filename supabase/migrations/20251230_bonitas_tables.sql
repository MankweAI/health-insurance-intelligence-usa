-- Bonitas Medical Scheme Tables
-- Created: 2025-12-30
-- 
-- Tables for Bonitas plans and procedures

-- ============================================================================
-- PLANS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS bonitas_plans (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    series TEXT NOT NULL,
    data JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for slug lookups
CREATE INDEX IF NOT EXISTS idx_bonitas_plans_slug ON bonitas_plans(slug);
CREATE INDEX IF NOT EXISTS idx_bonitas_plans_series ON bonitas_plans(series);

-- ============================================================================
-- PROCEDURES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS bonitas_procedures (
    id TEXT PRIMARY KEY,
    category TEXT NOT NULL,
    data JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for category lookups
CREATE INDEX IF NOT EXISTS idx_bonitas_procedures_category ON bonitas_procedures(category);

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE bonitas_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE bonitas_procedures ENABLE ROW LEVEL SECURITY;

-- Public read access (for static generation)
CREATE POLICY "Allow public read access on bonitas_plans"
    ON bonitas_plans FOR SELECT
    TO public
    USING (true);

CREATE POLICY "Allow public read access on bonitas_procedures"
    ON bonitas_procedures FOR SELECT
    TO public
    USING (true);

-- ============================================================================
-- UPDATE TRIGGERS
-- ============================================================================

CREATE OR REPLACE FUNCTION update_bonitas_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_bonitas_plans_updated_at
    BEFORE UPDATE ON bonitas_plans
    FOR EACH ROW
    EXECUTE FUNCTION update_bonitas_updated_at();

CREATE TRIGGER trigger_bonitas_procedures_updated_at
    BEFORE UPDATE ON bonitas_procedures
    FOR EACH ROW
    EXECUTE FUNCTION update_bonitas_updated_at();
