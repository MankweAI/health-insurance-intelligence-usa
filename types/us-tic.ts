/**
 * US Healthcare Price Transparency Types
 * 
 * These types model the actual CMS Machine-Readable File (MRF) format
 * as specified by the Transparency in Coverage (TiC) final rule.
 * 
 * Phase 1: Populated with realistic dummy data
 * Phase 2: Swap for real CMS MRF ingestion
 */

// ============================================================================
// PROCEDURE / CPT CODE TYPES
// ============================================================================

export type ProcedureCategory = 'Inpatient' | 'Outpatient' | 'Imaging' | 'Laboratory' | 'Emergency';
export type AnesthesiaType = 'General' | 'Regional' | 'Local' | 'Sedation' | 'None';

export interface CPTEntry {
  /** CPT code (e.g., "27130") */
  code: string;

  /** Human-readable name (e.g., "Total Hip Replacement") */
  name: string;

  /** URL-friendly slug */
  slug: string;

  /** Service category */
  category: ProcedureCategory;

  /** Medical description of the procedure */
  description: string;

  /** Typical procedure duration (e.g., "2-3 hours") */
  typicalDuration: string;

  /** Expected recovery time (e.g., "4-6 weeks") */
  recoveryTime: string;

  /** Type of anesthesia typically used */
  anesthesiaType: AnesthesiaType;

  /** Pre-procedure preparation instructions */
  preparation: string[];

  /** Potential risks and complications */
  risks: string[];

  /** Related CPT codes (for internal linking) */
  relatedCodes: string[];

  /** National average cost statistics (from CMS data) */
  nationalStats: {
    low: number;
    median: number;
    high: number;
    sampleSize: number;
    dataYear: number;
  };

  /** Procedure-specific FAQ content */
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

// ============================================================================
// PROVIDER TYPES
// ============================================================================

export type TraumaLevel = 'Level I' | 'Level II' | 'Level III' | 'Level IV' | 'Not Designated';
export type FacilityType = 'Hospital' | 'Ambulatory Surgery Center' | 'Imaging Center' | 'Clinic';

export interface ProviderAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
  /** For geographic proximity calculations */
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface ProviderMetrics {
  /** CMS Hospital Compare star rating (1-5) */
  cmsStarRating: number | null;

  /** HCAHPS patient experience score (0-100) */
  patientExperienceScore: number | null;

  /** Hospital-acquired condition score (lower is better) */
  hacScore: number | null;

  /** Readmission rate comparison to national average */
  readmissionRate: 'Below' | 'Average' | 'Above' | null;

  /** Data freshness */
  metricsAsOf: string;
}

export interface UsProvider {
  /** National Provider Identifier (10-digit) */
  npi: string;

  /** Legal name of the provider */
  name: string;

  /** URL-friendly slug */
  slug: string;

  /** Facility type */
  facilityType: FacilityType;

  /** Physical address */
  address: ProviderAddress;

  /** Trauma center designation */
  traumaLevel: TraumaLevel;

  /** Number of licensed beds (hospitals only) */
  bedCount: number | null;

  /** Clinical specializations */
  specializations: string[];

  /** Certifications and accreditations */
  certifications: string[];

  /** Quality metrics from CMS */
  metrics: ProviderMetrics;

  /** Approximate wait time for scheduling (days) */
  averageWaitDays: number | null;
}

// ============================================================================
// PAYER / PLAN TYPES
// ============================================================================

export type NetworkType = 'PPO' | 'HMO' | 'EPO' | 'POS' | 'HDHP';
export type PlanMetal = 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Catastrophic' | null;

export interface UsPayerPlan {
  /** Unique plan identifier */
  slug: string;

  /** Insurance company name */
  payerName: string;

  /** Specific plan name */
  planName: string;

  /** Network type */
  networkType: NetworkType;

  /** ACA metal tier (if applicable) */
  metalTier: PlanMetal;

  /** Plan year */
  planYear: number;

  /** Standard cost-sharing details */
  costSharing: {
    /** Typical individual deductible */
    typicalDeductible: number;
    /** Typical coinsurance rate after deductible */
    typicalCoinsurance: number;
    /** Individual out-of-pocket maximum */
    outOfPocketMax: number;
  };
}

// ============================================================================
// NEGOTIATED RATE TYPES (Core TiC Data)
// ============================================================================

export type ContractType = 'negotiated' | 'derived' | 'fee_schedule' | 'per_diem' | 'percent_of_billed';

export interface NegotiatedRate {
  /** CPT/HCPCS code */
  procedureCpt: string;

  /** Provider NPI */
  providerNpi: string;

  /** Plan slug */
  planSlug: string;

  /** Negotiated rate in dollars */
  negotiatedRate: number;

  /** Type of rate arrangement */
  contractType: ContractType;

  /** Billing code modifier (if applicable) */
  modifier: string | null;

  /** Service setting */
  placeOfService: 'inpatient' | 'outpatient' | 'professional';

  /** Data source information */
  source: {
    /** When this rate was extracted */
    extractedAt: string;
    /** MRF file version */
    mrfVersion: string;
    /** Payer reporting period */
    reportingPeriod: string;
  };
}

// ============================================================================
// CMS AGGREGATED RATE TYPES (Real Extracted Data)
// ============================================================================

export interface PriceStats {
  /** Minimum negotiated rate */
  min: number;
  /** Maximum negotiated rate */
  max: number;
  /** Median negotiated rate */
  median: number;
  /** Mean negotiated rate */
  mean: number;
  /** Number of rate observations */
  count: number;
}

export interface AggregatedRate {
  /** CPT/HCPCS code */
  procedureCpt: string;

  /** Provider NPI */
  providerNpi: string;

  /** Plan slug */
  planSlug: string;

  /** Aggregated price statistics */
  priceStats: PriceStats;

  /** When this data was aggregated */
  aggregatedAt: string;

  /** Data source identifier */
  dataSource: string;
}

// ============================================================================
// CMS PROVIDER TYPES (NPPES Enriched)
// ============================================================================

export interface CMSProviderAddress {
  line1: string;
  line2: string;
  city: string;
  state: string;
  zip: string;
}

export interface CMSProvider {
  /** National Provider Identifier */
  npi: string;

  /** Provider name (organization or individual) */
  name: string;

  /** Provider type */
  providerType: 'organization' | 'individual';

  /** Credential/specialty */
  specialty: string;

  /** Physical address */
  address: CMSProviderAddress;

  /** Contact phone */
  phone: string;
}

// ============================================================================
// REGIONAL / GEOGRAPHIC TYPES
// ============================================================================

export interface RegionalStats {
  /** State abbreviation */
  state: string;

  /** CPT code */
  cptCode: string;

  /** Regional price statistics */
  stats: {
    min: number;
    max: number;
    median: number;
    mean: number;
    percentile25: number;
    percentile75: number;
    providerCount: number;
  };
}

// ============================================================================
// STORE / REPOSITORY TYPES
// ============================================================================

export interface UsStore {
  procedures: CPTEntry[];
  providers: UsProvider[];
  plans: UsPayerPlan[];
  rates: NegotiatedRate[];
  regionalStats: RegionalStats[];

  /** Metadata about the data */
  metadata: {
    lastUpdated: string;
    dataVersion: string;
    source: string;
  };
}
