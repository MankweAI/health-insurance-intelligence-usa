"""
MRF CPT Code Extraction Script

This script extracts negotiated rates for a target list of high-value 
shoppable procedures from a UnitedHealthcare Machine-Readable File (MRF).

Usage:
    python extract_target_cpts.py <path_to_mrf.json.gz> <output_directory>

Output:
    - aggregated_rates.json: Rates aggregated by procedure+provider with price stats
    - unique_npis.txt: List of unique provider NPIs for NPPES enrichment
"""

import json
import gzip
import sys
import os
from collections import defaultdict
from statistics import mean, median

# ============================================================================
# TARGET CPT CODES - High-Value Shoppable Procedures
# ============================================================================

TARGET_CPT_CODES = {
    # ----- ORTHOPEDIC SURGERIES -----
    "27447": {"name": "Total Knee Replacement", "category": "Orthopedic"},
    "27130": {"name": "Total Hip Replacement", "category": "Orthopedic"},
    "23472": {"name": "Total Shoulder Replacement", "category": "Orthopedic"},
    "22551": {"name": "Cervical Spinal Fusion", "category": "Spine"},
    "22612": {"name": "Lumbar Spinal Fusion", "category": "Spine"},
    "27446": {"name": "Knee Arthroplasty Revision", "category": "Orthopedic"},
    "27236": {"name": "Hip Fracture Repair", "category": "Orthopedic"},
    "29881": {"name": "Knee Arthroscopy with Meniscectomy", "category": "Orthopedic"},
    "29827": {"name": "Rotator Cuff Repair", "category": "Orthopedic"},
    "27702": {"name": "Ankle Replacement", "category": "Orthopedic"},
    
    # ----- CARDIAC PROCEDURES -----
    "33361": {"name": "TAVR (Aortic Valve Replacement)", "category": "Cardiac"},
    "33533": {"name": "Coronary Bypass (CABG)", "category": "Cardiac"},
    "92928": {"name": "Cardiac Stent Placement", "category": "Cardiac"},
    "93458": {"name": "Heart Catheterization", "category": "Cardiac"},
    "33249": {"name": "Pacemaker Implantation", "category": "Cardiac"},
    "33264": {"name": "Defibrillator Implantation", "category": "Cardiac"},
    "33430": {"name": "Mitral Valve Replacement", "category": "Cardiac"},
    
    # ----- GI PROCEDURES -----
    "43239": {"name": "Upper GI Endoscopy with Biopsy", "category": "GI"},
    "45378": {"name": "Colonoscopy Diagnostic", "category": "GI"},
    "45380": {"name": "Colonoscopy with Biopsy", "category": "GI"},
    "45385": {"name": "Colonoscopy with Polyp Removal", "category": "GI"},
    "47562": {"name": "Laparoscopic Cholecystectomy", "category": "GI"},
    "43775": {"name": "Gastric Sleeve (Bariatric)", "category": "GI"},
    "43644": {"name": "Gastric Bypass (Bariatric)", "category": "GI"},
    
    # ----- IMAGING -----
    "70553": {"name": "MRI Brain with Contrast", "category": "Imaging"},
    "72148": {"name": "MRI Lumbar Spine", "category": "Imaging"},
    "74177": {"name": "CT Abdomen/Pelvis with Contrast", "category": "Imaging"},
    "78815": {"name": "PET Scan", "category": "Imaging"},
    "77067": {"name": "Screening Mammography", "category": "Imaging"},
    "71271": {"name": "CT Chest Low-Dose (Lung Screening)", "category": "Imaging"},
    
    # ----- GENERAL SURGERY -----
    "49505": {"name": "Inguinal Hernia Repair", "category": "General Surgery"},
    "49650": {"name": "Laparoscopic Inguinal Hernia Repair", "category": "General Surgery"},
    "47600": {"name": "Open Cholecystectomy", "category": "General Surgery"},
    "44120": {"name": "Small Bowel Resection", "category": "General Surgery"},
    "44140": {"name": "Partial Colectomy", "category": "General Surgery"},
    
    # ----- MATERNITY -----
    "59510": {"name": "Cesarean Delivery", "category": "Maternity"},
    "59400": {"name": "Vaginal Delivery (Global)", "category": "Maternity"},
    "59025": {"name": "Fetal Non-Stress Test", "category": "Maternity"},
    
    # ----- OPHTHALMOLOGY -----
    "66984": {"name": "Cataract Surgery with IOL", "category": "Ophthalmology"},
    "67028": {"name": "Retinal Injection", "category": "Ophthalmology"},
    "65855": {"name": "Glaucoma Laser Treatment", "category": "Ophthalmology"},
    
    # ----- UROLOGY -----
    "52601": {"name": "TURP (Prostate Surgery)", "category": "Urology"},
    "55866": {"name": "Robotic Prostatectomy", "category": "Urology"},
    "50590": {"name": "Kidney Stone Lithotripsy", "category": "Urology"},
    
    # ----- ONCOLOGY -----
    "38571": {"name": "Lymph Node Dissection", "category": "Oncology"},
    "19301": {"name": "Partial Mastectomy", "category": "Oncology"},
    "19303": {"name": "Total Mastectomy", "category": "Oncology"},
    "44150": {"name": "Total Colectomy", "category": "Oncology"},
    
    # ----- NEUROSURGERY -----
    "61510": {"name": "Craniotomy for Tumor", "category": "Neurosurgery"},
    "63030": {"name": "Lumbar Discectomy", "category": "Neurosurgery"},
    "61312": {"name": "Craniotomy for Hematoma", "category": "Neurosurgery"},
}

print(f"Target CPT codes: {len(TARGET_CPT_CODES)}")

# ============================================================================
# EXTRACTION LOGIC
# ============================================================================

def extract_rates(mrf_path: str, output_dir: str):
    """Extract rates for target CPT codes from MRF file."""
    
    print(f"Reading MRF from: {mrf_path}")
    
    # Data structures
    rates_by_proc_prov = defaultdict(list)
    unique_npis = set()
    
    # Open MRF (gzipped JSON)
    opener = gzip.open if mrf_path.endswith('.gz') else open
    
    with opener(mrf_path, 'rt', encoding='utf-8') as f:
        data = json.load(f)
    
    # Navigate MRF structure (UHC format)
    in_network_files = data.get("in_network_files", data.get("in_network", []))
    
    for item in in_network_files:
        billing_code = str(item.get("billing_code", ""))
        billing_code_type = item.get("billing_code_type", "")
        
        # Only process target CPT codes
        if billing_code_type != "CPT" or billing_code not in TARGET_CPT_CODES:
            continue
        
        print(f"Processing CPT {billing_code}: {TARGET_CPT_CODES[billing_code]['name']}")
        
        negotiated_rates = item.get("negotiated_rates", [])
        
        for rate_obj in negotiated_rates:
            negotiated_type = rate_obj.get("negotiated_type", "")
            if negotiated_type not in ["negotiated", "fee schedule"]:
                continue
            
            negotiated_price = rate_obj.get("negotiated_price")
            if not negotiated_price or negotiated_price <= 0:
                continue
            
            provider_groups = rate_obj.get("provider_groups", [])
            for group in provider_groups:
                npis = group.get("npi", [])
                for npi in npis:
                    npi_str = str(npi)
                    unique_npis.add(npi_str)
                    rates_by_proc_prov[(billing_code, npi_str)].append({
                        "price": negotiated_price,
                        "type": negotiated_type
                    })
    
    print(f"\nUnique procedure+provider combinations: {len(rates_by_proc_prov)}")
    print(f"Unique provider NPIs: {len(unique_npis)}")
    
    # Aggregate rates
    aggregated_rates = []
    for (cpt, npi), prices in rates_by_proc_prov.items():
        price_values = [p["price"] for p in prices]
        aggregated_rates.append({
            "procedureCpt": cpt,
            "providerNpi": npi,
            "priceStats": {
                "min": min(price_values),
                "max": max(price_values),
                "median": round(median(price_values), 2),
                "mean": round(mean(price_values), 2),
                "count": len(price_values)
            }
        })
    
    # Sort by CPT, then by median price
    aggregated_rates.sort(key=lambda x: (x["procedureCpt"], x["priceStats"]["median"]))
    
    # Write outputs
    os.makedirs(output_dir, exist_ok=True)
    
    rates_path = os.path.join(output_dir, "rates.json")
    with open(rates_path, 'w') as f:
        json.dump(aggregated_rates, f, indent=2)
    print(f"\nWrote {len(aggregated_rates)} aggregated rates to {rates_path}")
    
    npis_path = os.path.join(output_dir, "unique_npis.txt")
    with open(npis_path, 'w') as f:
        f.write('\n'.join(sorted(unique_npis)))
    print(f"Wrote {len(unique_npis)} unique NPIs to {npis_path}")
    
    # Print summary by CPT code
    print("\n" + "="*60)
    print("EXTRACTION SUMMARY")
    print("="*60)
    cpt_counts = defaultdict(int)
    for rate in aggregated_rates:
        cpt_counts[rate["procedureCpt"]] += 1
    
    for cpt, count in sorted(cpt_counts.items()):
        info = TARGET_CPT_CODES.get(cpt, {})
        print(f"{cpt}: {info.get('name', 'Unknown'):40s} - {count:5d} providers")
    
    print(f"\nTotal: {len(aggregated_rates)} rates across {len(cpt_counts)} procedures")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python extract_target_cpts.py <mrf_path> <output_dir>")
        print("Example: python extract_target_cpts.py uhc_ny_mrf.json.gz ./data/uhc_ny")
        sys.exit(1)
    
    extract_rates(sys.argv[1], sys.argv[2])
