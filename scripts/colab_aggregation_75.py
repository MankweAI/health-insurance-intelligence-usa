# ============================================
# MEMORY-EFFICIENT AGGREGATION (Chunked)
# Filtered to 75 High-Value CPT Codes
# ============================================

from google.colab import drive
import os
import json
from collections import defaultdict
from statistics import median
from datetime import datetime
import gc

# ============================================
# CONFIGURATION: 75 Curated High-Value CPTs
# ============================================

TARGET_CPTS = {
    # Orthopedic (14 procedures)
    '27130', '27447', '27446', '23472', '24363', '27702', '29881', '29827',
    '27236', '23430', '29880', '27570', '27125', '29806',
    # Spine (10 procedures)
    '22612', '22630', '22633', '63030', '63047', '22551', '22552', '63075',
    '22853', '22840',
    # GI / Endoscopy (8 procedures)
    '45378', '45380', '45385', '43239', '43235', '43249', '47562', '44970',
    # Cardiac (8 procedures)
    '33533', '33534', '92928', '93306', '93000', '33249', '33264', '33208',
    # Imaging (12 procedures)
    '70551', '70553', '71250', '72148', '72141', '74177', '73721', '73221',
    '76830', '77067', '77063', '76700',
    # Eye (6 procedures)
    '66984', '66821', '67028', '66982', '65855', '67210',
    # Women's Health (7 procedures)
    '59400', '59510', '58150', '58262', '58571', '58661', '58558',
    # General Surgery (5 procedures)
    '49505', '49650', '19120', '11042', '17000',
    # Pain Management (5 procedures)
    '64483', '64493', '64635', '64479', '62322',
}

print(f"🎯 Targeting {len(TARGET_CPTS)} high-value CPT codes")

# ============================================
# SETUP
# ============================================

drive.mount('/content/drive')

input_dir = '/content/drive/MyDrive/health-insurance-data/raw-extracts'
output_dir = '/content/drive/MyDrive/health-insurance-data/aggregated'
os.makedirs(output_dir, exist_ok=True)

INPUT_FILE = f"{input_dir}/negotiated_rates.json"
OUTPUT_FILE = f"{output_dir}/aggregated_rates_75.json"  # Renamed for 75 CPTs
TEMP_DIR = f"{output_dir}/temp_chunks"
os.makedirs(TEMP_DIR, exist_ok=True)

# ============================================
# PASS 1: Chunk by CPT code (FILTERED)
# ============================================

print("🚀 PASS 1: Splitting by CPT code (filtered to target CPTs)...")

cpt_files = {}
record_count = 0
kept_count = 0
skipped_count = 0

with open(INPUT_FILE, 'r') as f:
    f.readline()  # Skip [
    
    for line in f:
        line = line.strip().rstrip(',')
        if not line or line == ']':
            continue
        
        try:
            record = json.loads(line)
            cpt = record['procedureCpt']
            record_count += 1
            
            # ⚡ KEY FILTER: Only process target CPTs
            if cpt not in TARGET_CPTS:
                skipped_count += 1
                if record_count % 500000 == 0:
                    print(f"  ...{record_count:,} scanned, {kept_count:,} kept, {skipped_count:,} skipped")
                continue
            
            kept_count += 1
            
            # Write to CPT-specific temp file
            if cpt not in cpt_files:
                cpt_files[cpt] = open(f"{TEMP_DIR}/{cpt}.jsonl", 'w')
                print(f"  📁 Found target CPT: {cpt}")
            
            cpt_files[cpt].write(line + '\n')
            
            if record_count % 500000 == 0:
                print(f"  ...{record_count:,} scanned, {kept_count:,} kept, {skipped_count:,} skipped")
                gc.collect()
                
        except:
            continue

# Close all temp files
for f in cpt_files.values():
    f.close()

print(f"\n✅ PASS 1 Complete!")
print(f"   Scanned:  {record_count:,} total records")
print(f"   Kept:     {kept_count:,} records ({len(cpt_files)} CPTs found)")
print(f"   Skipped:  {skipped_count:,} records (non-target CPTs)")
print(f"   Missing:  {len(TARGET_CPTS) - len(cpt_files)} CPTs not found in data")

# Show which target CPTs were found
found_cpts = set(cpt_files.keys())
missing_cpts = TARGET_CPTS - found_cpts
if missing_cpts:
    print(f"\n⚠️  Missing CPTs: {sorted(missing_cpts)}")

# ============================================
# PASS 2: Aggregate each CPT file separately
# ============================================

print("\n🚀 PASS 2: Aggregating each CPT...")

all_aggregated = []

for cpt in sorted(cpt_files.keys()):
    temp_file = f"{TEMP_DIR}/{cpt}.jsonl"
    
    # Aggregate this CPT
    aggregated = defaultdict(list)
    
    with open(temp_file, 'r') as f:
        for line in f:
            record = json.loads(line.strip())
            key = (record['providerNpi'], record['planSlug'])
            price = record.get('negotiatedRate', 0)
            if price > 0:
                aggregated[key].append(price)
    
    # Build output for this CPT
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
    
    print(f"  CPT {cpt}: {cpt_record_count:,} provider-plan combinations")
    
    # Clean up temp file
    os.remove(temp_file)
    gc.collect()

# ============================================
# SAVE FINAL OUTPUT
# ============================================

print(f"\n💾 Saving {len(all_aggregated):,} aggregated records...")

with open(OUTPUT_FILE, 'w') as f:
    json.dump(all_aggregated, f, separators=(',', ':'))  # Compact JSON

file_size_mb = os.path.getsize(OUTPUT_FILE) / (1024 * 1024)

print(f"\n{'='*50}")
print(f"✅ AGGREGATION COMPLETE!")
print(f"{'='*50}")
print(f"Target CPTs:    {len(TARGET_CPTS)}")
print(f"CPTs Found:     {len(cpt_files)}")
print(f"Total Records:  {len(all_aggregated):,}")
print(f"File Size:      {file_size_mb:.2f} MB")
print(f"Output:         {OUTPUT_FILE}")

# Cleanup temp directory
try:
    os.rmdir(TEMP_DIR)
except:
    pass

# ============================================
# SUMMARY BY CATEGORY
# ============================================

print(f"\n📊 Records by CPT:")
from collections import Counter
cpt_counts = Counter(r['procedureCpt'] for r in all_aggregated)
for cpt, count in sorted(cpt_counts.items(), key=lambda x: -x[1])[:20]:
    print(f"   {cpt}: {count:,}")
if len(cpt_counts) > 20:
    print(f"   ... and {len(cpt_counts) - 20} more")
