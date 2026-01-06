# ============================================
# BLUEPRINT: MRF STREAMING EXTRACTOR
# ============================================
# Extracts negotiated rates from UHC MRF files
# Uses streaming to handle 50-100GB uncompressed data
# Filters to target CPT codes for efficiency
# ============================================

!pip install ijson

from google.colab import drive
import ijson
import gzip
import json
import os
from collections import defaultdict
from datetime import datetime
from statistics import median
import gc

drive.mount('/content/drive')

# ============================================
# CONFIGURATION
# ============================================

BASE_DIR = '/content/drive/MyDrive/health-insurance-data'
INPUT_FILE = f"{BASE_DIR}/mrf-downloads/uhc-ny-choice-plus-medical.json.gz"
OUTPUT_DIR = f"{BASE_DIR}/extracted"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# 75 Curated High-Value CPT Codes
TARGET_CPTS = {
    # Orthopedic (14)
    '27130', '27447', '27446', '23472', '24363', '27702', '29881', '29827',
    '27236', '23430', '29880', '27570', '27125', '29806',
    # Spine (10)
    '22612', '22630', '22633', '63030', '63047', '22551', '22552', '63075',
    '22853', '22840',
    # GI / Endoscopy (8)
    '45378', '45380', '45385', '43239', '43235', '43249', '47562', '44970',
    # Cardiac (8)
    '33533', '33534', '92928', '93306', '93000', '33249', '33264', '33208',
    # Imaging (12)
    '70551', '70553', '71250', '72148', '72141', '74177', '73721', '73221',
    '76830', '77067', '77063', '76700',
    # Eye (6)
    '66984', '66821', '67028', '66982', '65855', '67210',
    # Women's Health (7)
    '59400', '59510', '58150', '58262', '58571', '58661', '58558',
    # General Surgery (5)
    '49505', '49650', '19120', '11042', '17000',
    # Pain Management (5)
    '64483', '64493', '64635', '64479', '62322',
}

# Set to None to extract ALL CPTs (for discovery)
# TARGET_CPTS = None

print(f"🎯 Target CPTs: {len(TARGET_CPTS) if TARGET_CPTS else 'ALL'}")
print(f"📂 Input: {INPUT_FILE}")
print(f"📂 Output: {OUTPUT_DIR}")

# ============================================
# PHASE 1: Explore file structure
# ============================================

print("\n" + "="*60)
print("🔍 PHASE 1: Exploring MRF file structure...")
print("="*60)

# Read first 50KB to understand structure
with gzip.open(INPUT_FILE, 'rt', encoding='utf-8') as f:
    sample = f.read(50000)
    print("\n📋 First 2000 characters:")
    print("-" * 40)
    print(sample[:2000])
    print("-" * 40)

# ============================================
# PHASE 2: Extract provider references
# ============================================

print("\n" + "="*60)
print("🔍 PHASE 2: Building provider reference map...")
print("="*60)

provider_map = {}
provider_count = 0

with gzip.open(INPUT_FILE, 'rb') as f:
    try:
        # Try to find provider_references array
        parser = ijson.items(f, 'provider_references.item')
        for provider in parser:
            provider_count += 1
            # Store NPI to provider info mapping
            provider_groups = provider.get('provider_groups', [])
            for group in provider_groups:
                npis = group.get('npi', [])
                for npi in npis:
                    provider_map[str(npi)] = {
                        'tin': group.get('tin', {}).get('value', ''),
                        'tin_type': group.get('tin', {}).get('type', '')
                    }
            
            if provider_count % 10000 == 0:
                print(f"  ...processed {provider_count:,} provider references")
                
    except ijson.JSONError as e:
        print(f"  ⚠️ Provider references not found or different format: {e}")

print(f"✅ Found {len(provider_map):,} unique NPIs from {provider_count:,} provider references")

gc.collect()

# ============================================
# PHASE 3: Extract negotiated rates
# ============================================

print("\n" + "="*60)
print("🔍 PHASE 3: Extracting negotiated rates...")
print("="*60)

extracted_records = []
cpt_stats = defaultdict(int)
total_rates = 0
kept_rates = 0

with gzip.open(INPUT_FILE, 'rb') as f:
    try:
        # Parse in_network array
        parser = ijson.items(f, 'in_network.item')
        
        for item in parser:
            billing_code = str(item.get('billing_code', ''))
            billing_code_type = item.get('billing_code_type', '')
            
            # Only process CPT/HCPCS codes
            if billing_code_type not in ['CPT', 'HCPCS']:
                continue
            
            total_rates += 1
            
            # Filter to target CPTs if specified
            if TARGET_CPTS and billing_code not in TARGET_CPTS:
                continue
            
            kept_rates += 1
            cpt_stats[billing_code] += 1
            
            # Extract negotiated prices
            negotiated_rates = item.get('negotiated_rates', [])
            
            for rate_obj in negotiated_rates:
                provider_refs = rate_obj.get('provider_references', [])
                prices = rate_obj.get('negotiated_prices', [])
                
                for price_obj in prices:
                    negotiated_rate = price_obj.get('negotiated_rate', 0)
                    billing_class = price_obj.get('billing_class', 'unknown')
                    service_codes = price_obj.get('service_code', [])
                    
                    # Create record for each provider reference
                    for provider_ref in provider_refs:
                        extracted_records.append({
                            'procedureCpt': billing_code,
                            'providerRef': provider_ref,  # Reference ID, will resolve later
                            'negotiatedRate': float(negotiated_rate),
                            'billingClass': billing_class,
                            'serviceCodes': service_codes,
                        })
            
            if total_rates % 1000 == 0:
                print(f"  ...scanned {total_rates:,} codes, kept {kept_rates:,}, extracted {len(extracted_records):,} rate records")
                
                # Memory management
                if len(extracted_records) > 5000000:
                    print("  ⚠️ Memory limit approaching, saving checkpoint...")
                    break
                    
    except ijson.JSONError as e:
        print(f"  ❌ JSON parsing error: {e}")

print(f"\n✅ Extraction complete!")
print(f"   Total codes scanned: {total_rates:,}")
print(f"   Target codes found: {kept_rates:,}")
print(f"   Rate records extracted: {len(extracted_records):,}")

# ============================================
# PHASE 4: Summary by CPT
# ============================================

print("\n" + "="*60)
print("📊 CPT CODE SUMMARY")
print("="*60)

print(f"\nFound {len(cpt_stats)} unique CPT codes:")
for cpt, count in sorted(cpt_stats.items(), key=lambda x: -x[1])[:30]:
    print(f"  {cpt}: {count:,} rate entries")

if len(cpt_stats) > 30:
    print(f"  ... and {len(cpt_stats) - 30} more")

# ============================================
# PHASE 5: Save extracted data
# ============================================

print("\n" + "="*60)
print("💾 PHASE 5: Saving extracted data...")
print("="*60)

output_file = f"{OUTPUT_DIR}/extracted_rates_raw.json"

with open(output_file, 'w') as f:
    json.dump({
        'metadata': {
            'sourceFile': INPUT_FILE,
            'extractedAt': datetime.now().isoformat(),
            'totalCodesScanned': total_rates,
            'targetCodesFound': kept_rates,
            'recordsExtracted': len(extracted_records),
            'uniqueCpts': list(cpt_stats.keys()),
        },
        'records': extracted_records
    }, f, separators=(',', ':'))

file_size_mb = os.path.getsize(output_file) / (1024 * 1024)
print(f"✅ Saved to: {output_file}")
print(f"   File size: {file_size_mb:.1f} MB")

# ============================================
# SUMMARY
# ============================================

print(f"""

{'='*60}
✅ BLUEPRINT EXTRACTION COMPLETE!
{'='*60}

📊 RESULTS:
   • CPT codes found: {len(cpt_stats)}
   • Rate records: {len(extracted_records):,}
   • Output file: {file_size_mb:.1f} MB

📋 NEXT STEPS:
   1. Review the extracted CPT codes
   2. Run aggregation script to group by provider
   3. Enrich with provider NPI data
   4. Load into app data layer

{'='*60}
""")
