# ============================================
# BLUEPRINT: MRF AGGREGATOR & RESOLVER
# ============================================
# 1. Rebuilds Provider Map (Reference -> NPI) from source
# 2. Joins with Extracted Rates
# 3. Aggregates stats per (CPT, Provider)
# ============================================

!pip install ijson

from google.colab import drive
import ijson
import gzip
import json
import os
from collections import defaultdict
from statistics import median, mean
import gc
from datetime import datetime

drive.mount('/content/drive')

# ============================================
# CONFIGURATION
# ============================================

BASE_DIR = '/content/drive/MyDrive/uhc-ny/medical'
SOURCE_FILE = f"{BASE_DIR}/uhc-ny-choice-plus-medical.json.gz"
EXTRACTED_FILE = f"{BASE_DIR}/extracted_rates_uhc-ny-choice-plus-medical.json"
OUTPUT_FILE = f"{BASE_DIR}/aggregated_rates_75.json"

PROVIDER_LIMIT_PER_CPT = 100  # Keep top N providers per CPT to control file size

print(f"📂 Source MRF: {SOURCE_FILE}")
print(f"📂 Extracted Rates: {EXTRACTED_FILE}")
print(f"🎯 Output: {OUTPUT_FILE}")

# ============================================
# PHASE 1: Rebuild Provider Map
# ============================================

print("\n" + "="*60)
print("🔍 PHASE 1: Rebuilding Provider Map (Ref ID -> NPI)...")
print("="*60)

# Map: reference_id -> {npi: [...], tin: ...}
provider_map = {}
count = 0

with gzip.open(SOURCE_FILE, 'rb') as f:
    # Stream only provider_references
    provider_refs = ijson.items(f, 'provider_references.item')
    
    for group_idx, group_list in enumerate(provider_refs):
        # The index in the array is the reference ID used in rates
        # Note: In some MRFs, it's 'provider_group_id', in others it's array index
        # UHC usually uses array index as the implicit ID referenced in rate objects
        
        # Structure is typically:
        # { "provider_group_id": 123, "provider_groups": [...] }
        
        ref_id = group_list.get('provider_group_id', group_idx)
        
        npis = set()
        tins = set()
        
        for group in group_list.get('provider_groups', []):
            for npi in group.get('npi', []):
                npis.add(str(npi))
            
            tin = group.get('tin', {}).get('value')
            if tin:
                tins.add(tin)
        
        if npis:
            provider_map[str(ref_id)] = {
                'npis': list(npis),
                'tins': list(tins)
            }
            
        count += 1
        if count % 10000 == 0:
            print(f"  ...mapped {count:,} provider groups")

print(f"✅ Mapped {len(provider_map):,} provider groups")
gc.collect()

# ============================================
# PHASE 2: Load Extracted Rates
# ============================================

print("\n" + "="*60)
print("📥 PHASE 2: Loading Extracted Rates...")
print("="*60)

with open(EXTRACTED_FILE, 'r') as f:
    data = json.load(f)
    raw_rates = data['records']

print(f"✅ Loaded {len(raw_rates):,} raw rate records")

# ============================================
# PHASE 3: Join & Aggregate
# ============================================

print("\n" + "="*60)
print("🔄 PHASE 3: Joining & Aggregating...")
print("="*60)

# Dictionary: CPT -> NPI -> List of Rates
# aggregated[cpt][npi] = [rate1, rate2...]
cpt_npi_rates = defaultdict(lambda: defaultdict(list))

matched = 0
unmatched = 0

for record in raw_rates:
    cpt = record['procedureCpt']
    rate = record['negotiatedRate']
    ref_id = str(record['providerRef'])
    
    # Resolve Provider
    provider_info = provider_map.get(ref_id)
    
    if not provider_info:
        unmatched += 1
        continue
        
    matched += 1
    
    # Distribute rate to all NPIs in the group
    # (A negotiated rate typically applies to all providers in the group)
    for npi in provider_info['npis']:
        cpt_npi_rates[cpt][npi].append(rate)

print(f"✅ Matched {matched:,} records (Unmatched: {unmatched:,})")
print(f"   CPTs processed: {len(cpt_npi_rates)}")

del raw_rates
del provider_map
gc.collect()

# ============================================
# PHASE 4: Calculate Statistics & Filter
# ============================================

print("\n" + "="*60)
print("📊 PHASE 4: Calculating Statistics...")
print("="*60)

final_output = []

for cpt, providers in cpt_npi_rates.items():
    
    # Calculate variance for ranking
    # We want providers with meaningful pricing data
    provider_stats = []
    
    for npi, rates in providers.items():
        if not rates: continue
        
        min_price = min(rates)
        max_price = max(rates)
        
        stat = {
            "procedureCpt": cpt,
            "providerNpi": npi,
            "planSlug": "uhc-choice-plus-ny",
            "priceStats": {
                "min": round(min_price, 2),
                "max": round(max_price, 2),
                "median": round(median(rates), 2),
                "mean": round(mean(rates), 2),
                "count": len(rates)
            },
            "aggregatedAt": datetime.now().strftime("%Y-%m-%d"),
            "dataSource": "uhc-mrf-blueprint"
        }
        
        # Scoring for selection:
        # Prioritize providers with variation (more interesting) or volume
        variance = max_price - min_price
        score = variance + (len(rates) * 1) 
        
        provider_stats.append((score, stat))
    
    # Sort by score and keep top N
    provider_stats.sort(key=lambda x: x[0], reverse=True)
    top_providers = [x[1] for x in provider_stats[:PROVIDER_LIMIT_PER_CPT]]
    
    final_output.extend(top_providers)
    print(f"  CPT {cpt}: Kept {len(top_providers)} providers (from {len(providers)} total)")

# ============================================
# PHASE 5: Save
# ============================================

print("\n" + "="*60)
print("💾 PHASE 5: Saving Aggregated Data...")
print("="*60)

with open(OUTPUT_FILE, 'w') as f:
    json.dump(final_output, f, separators=(',', ':'))

file_size_mb = os.path.getsize(OUTPUT_FILE) / (1024 * 1024)

print(f"""
✅ AGGREGATION COMPLETE!
------------------------
Output: {OUTPUT_FILE}
Size:   {file_size_mb:.2f} MB
Records: {len(final_output):,}
CPTs:    {len(cpt_npi_rates)}
""")
