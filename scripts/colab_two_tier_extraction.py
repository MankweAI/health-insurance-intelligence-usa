# ============================================
# TWO-TIER EXTRACTION: Optimal Strategy
# ============================================
# Pass 1: Split 7.7GB into per-CPT files (preserve ALL data)
# Pass 2: Aggregate only 75 target CPTs (immediate use)
# ============================================

from google.colab import drive
import os
import json
from collections import defaultdict
from statistics import median
from datetime import datetime
import gc

# ============================================
# CONFIGURATION
# ============================================

# 75 Curated High-Value CPT Codes (for Pass 2 aggregation)
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

# ============================================
# SETUP
# ============================================

drive.mount('/content/drive')

BASE_DIR = '/content/drive/MyDrive/health-insurance-data'
INPUT_FILE = f"{BASE_DIR}/raw-extracts/negotiated_rates.json"

# Output directories
RAW_BY_CPT_DIR = f"{BASE_DIR}/raw-by-cpt"      # Per-CPT raw files
AGGREGATED_DIR = f"{BASE_DIR}/aggregated"      # Aggregated outputs

os.makedirs(RAW_BY_CPT_DIR, exist_ok=True)
os.makedirs(AGGREGATED_DIR, exist_ok=True)

print(f"📂 Input:  {INPUT_FILE}")
print(f"📂 Output: {RAW_BY_CPT_DIR} (per-CPT files)")
print(f"📂 Output: {AGGREGATED_DIR} (aggregated)")
print(f"🎯 Target: {len(TARGET_CPTS)} CPTs for aggregation")

# ============================================
# PASS 1: Split into per-CPT files
# ============================================

print("\n" + "="*60)
print("🚀 PASS 1: Splitting 7.7GB into per-CPT files...")
print("="*60)

cpt_files = {}       # File handles
cpt_counts = {}      # Record counts per CPT
total_records = 0
errors = 0

with open(INPUT_FILE, 'r') as f:
    # Skip opening bracket
    first_line = f.readline().strip()
    if first_line != '[':
        # File might not start with [, seek back
        f.seek(0)
    
    for line in f:
        line = line.strip().rstrip(',')
        if not line or line == '[' or line == ']':
            continue
        
        try:
            record = json.loads(line)
            cpt = record.get('procedureCpt', 'UNKNOWN')
            
            # Open file handle if first time seeing this CPT
            if cpt not in cpt_files:
                filepath = f"{RAW_BY_CPT_DIR}/{cpt}.jsonl"
                cpt_files[cpt] = open(filepath, 'w')
                cpt_counts[cpt] = 0
                print(f"  📁 New CPT: {cpt}")
            
            # Write record to CPT-specific file
            cpt_files[cpt].write(json.dumps(record, separators=(',', ':')) + '\n')
            cpt_counts[cpt] += 1
            total_records += 1
            
            # Progress update
            if total_records % 500000 == 0:
                print(f"  ...{total_records:,} records → {len(cpt_files)} CPTs")
                gc.collect()
                
        except json.JSONDecodeError:
            errors += 1
            continue

# Close all file handles
for f in cpt_files.values():
    f.close()

# ============================================
# Save Manifest (all CPTs found)
# ============================================

manifest = {
    "extractedAt": datetime.now().isoformat(),
    "sourceFile": INPUT_FILE,
    "totalRecords": total_records,
    "totalCPTs": len(cpt_counts),
    "cptCounts": dict(sorted(cpt_counts.items(), key=lambda x: -x[1])),
    "targetCPTs": list(TARGET_CPTS),
    "targetCPTsFound": [cpt for cpt in TARGET_CPTS if cpt in cpt_counts],
    "targetCPTsMissing": [cpt for cpt in TARGET_CPTS if cpt not in cpt_counts],
}

manifest_path = f"{AGGREGATED_DIR}/manifest.json"
with open(manifest_path, 'w') as f:
    json.dump(manifest, f, indent=2)

print(f"\n✅ PASS 1 COMPLETE!")
print(f"   Total records:  {total_records:,}")
print(f"   Total CPTs:     {len(cpt_counts)}")
print(f"   Parse errors:   {errors}")
print(f"   Manifest:       {manifest_path}")

# Show top 20 CPTs by volume
print(f"\n📊 Top 20 CPTs by record count:")
for cpt, count in sorted(cpt_counts.items(), key=lambda x: -x[1])[:20]:
    marker = "🎯" if cpt in TARGET_CPTS else "  "
    print(f"   {marker} {cpt}: {count:,}")

# Show target CPT status
found_targets = [cpt for cpt in TARGET_CPTS if cpt in cpt_counts]
missing_targets = [cpt for cpt in TARGET_CPTS if cpt not in cpt_counts]
print(f"\n🎯 Target CPTs: {len(found_targets)}/{len(TARGET_CPTS)} found")
if missing_targets:
    print(f"   ⚠️  Missing: {missing_targets[:10]}{'...' if len(missing_targets) > 10 else ''}")

gc.collect()

# ============================================
# PASS 2: Aggregate target CPTs only
# ============================================

print("\n" + "="*60)
print("🚀 PASS 2: Aggregating 75 target CPTs...")
print("="*60)

all_aggregated = []

for cpt in sorted(found_targets):
    cpt_file = f"{RAW_BY_CPT_DIR}/{cpt}.jsonl"
    
    if not os.path.exists(cpt_file):
        print(f"  ⚠️  Skipping {cpt}: file not found")
        continue
    
    # Aggregate: group by (providerNpi, planSlug)
    aggregated = defaultdict(list)
    
    with open(cpt_file, 'r') as f:
        for line in f:
            try:
                record = json.loads(line.strip())
                key = (record['providerNpi'], record['planSlug'])
                price = record.get('negotiatedRate', 0)
                if price > 0:
                    aggregated[key].append(price)
            except:
                continue
    
    # Build aggregated records
    cpt_record_count = 0
    for (npi, plan), prices in aggregated.items():
        sorted_prices = sorted(prices)
        all_aggregated.append({
            "procedureCpt": cpt,
            "providerNpi": npi,
            "planSlug": plan,
            "priceStats": {
                "min": round(sorted_prices[0], 2),
                "max": round(sorted_prices[-1], 2),
                "median": round(median(sorted_prices), 2),
                "mean": round(sum(sorted_prices) / len(sorted_prices), 2),
                "count": len(sorted_prices)
            },
            "aggregatedAt": datetime.now().strftime("%Y-%m-%d"),
            "dataSource": "cms-mrf-uhc-ny"
        })
        cpt_record_count += 1
    
    print(f"  ✓ CPT {cpt}: {cpt_record_count:,} provider-plan combinations")
    gc.collect()

# ============================================
# Save Aggregated Output
# ============================================

output_path = f"{AGGREGATED_DIR}/aggregated_75.json"

print(f"\n💾 Saving {len(all_aggregated):,} aggregated records...")

with open(output_path, 'w') as f:
    json.dump(all_aggregated, f, separators=(',', ':'))

file_size_mb = os.path.getsize(output_path) / (1024 * 1024)

# ============================================
# FINAL SUMMARY
# ============================================

print("\n" + "="*60)
print("✅ TWO-TIER EXTRACTION COMPLETE!")
print("="*60)

print(f"""
📊 PASS 1 RESULTS (Raw Split):
   • Source file:      7.7 GB
   • Total records:    {total_records:,}
   • CPTs extracted:   {len(cpt_counts)}
   • Output location:  {RAW_BY_CPT_DIR}/

📊 PASS 2 RESULTS (Aggregation):
   • Target CPTs:      {len(TARGET_CPTS)}
   • CPTs found:       {len(found_targets)}
   • CPTs missing:     {len(missing_targets)}
   • Aggregated recs:  {len(all_aggregated):,}
   • File size:        {file_size_mb:.2f} MB
   • Output file:      {output_path}

📁 OUTPUT STRUCTURE:
   {BASE_DIR}/
   ├── raw-by-cpt/           # {len(cpt_counts)} per-CPT files
   │   ├── 27130.jsonl
   │   ├── 22612.jsonl
   │   └── ...
   ├── aggregated/
   │   ├── manifest.json     # Extraction metadata
   │   └── aggregated_75.json # Ready for your app
""")

if missing_targets:
    print(f"⚠️  MISSING CPTs ({len(missing_targets)}):")
    for cpt in sorted(missing_targets):
        print(f"   • {cpt}")

print("\n🎉 You can now download aggregated_75.json for your app!")
print("   Future expansion: Just aggregate any CPT from raw-by-cpt/")
