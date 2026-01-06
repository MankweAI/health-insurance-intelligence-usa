# ============================================
# STRATEGIC MRF FILE DOWNLOADER
# Downloads key UHC NY in-network rate files
# ============================================

from google.colab import drive
import requests
import gzip
import os
import shutil
from datetime import datetime

drive.mount('/content/drive')

# ============================================
# CONFIGURATION
# ============================================

OUTPUT_DIR = '/content/drive/MyDrive/health-insurance-data/mrf-downloads'
os.makedirs(OUTPUT_DIR, exist_ok=True)

# BLUEPRINT APPROACH: Start with 1 file to build complete pipeline
# Once proven, add more files (dental, vision, other medical)
FILES_TO_DOWNLOAD = [
    {
        "url": "https://mrfstorageprod.blob.core.windows.net/public-mrf/2026-01-01/2026-01-01_UnitedHealthcare-Insurance-Company-of-New-York_Insurer_PS1-50_C2_in-network-rates.json.gz",
        "name": "uhc-ny-choice-plus-medical.json.gz",
        "description": "Choice Plus POS - Main Medical Network (Blueprint File)"
    },
]

# FUTURE FILES (uncomment when ready to scale):
# {
#     "url": "https://mrfstorageprod.blob.core.windows.net/public-mrf/2026-01-01/2026-01-01_UnitedHealthcare-Insurance-Company-of-New-York_Insurer_EP1-50_C1_in-network-rates.json.gz",
#     "name": "uhc-ny-choice-epo-medical.json.gz",
#     "description": "Choice EPO - Main Medical Network"
# },
# {
#     "url": "https://mrfstorageprod.blob.core.windows.net/public-mrf/2026-01-01/2026-01-01_UnitedHealthcare-Insurance-Company-of-New-York_Insurer_UHC---Embedded-Dental_UHC-Dental_in-network-rates.json.gz",
#     "name": "uhc-ny-dental.json.gz",
#     "description": "Dental Network"
# },
# {
#     "url": "https://mrfstorageprod.blob.core.windows.net/public-mrf/2026-01-01/2026-01-01_UnitedHealthcare-Insurance-Company-of-New-York_Insurer_UHC---Embedded-Vision_UHC-Vision_in-network-rates.json.gz",
#     "name": "uhc-ny-vision.json.gz",
#     "description": "Vision Network"
# },
# {
#     "url": "https://mrfstorageprod.blob.core.windows.net/public-mrf/2026-01-01/2026-01-01_UnitedHealthcare-Insurance-Company-of-New-York_Insurer_CMC_Transplant_MRRF_in-network-rates.json.gz",
#     "name": "uhc-ny-transplant-surgical.json.gz",
#     "description": "CMC Transplant - Surgical Procedures"
# },

# ============================================
# DOWNLOAD FUNCTION
# ============================================

def download_mrf_file(url, output_name, description):
    """Download a MRF file with progress tracking"""
    output_path = os.path.join(OUTPUT_DIR, output_name)
    
    print(f"\n{'='*60}")
    print(f"📥 Downloading: {description}")
    print(f"   URL: {url[:80]}...")
    print(f"   Saving as: {output_name}")
    print(f"{'='*60}")
    
    try:
        # Stream download with progress
        response = requests.get(url, stream=True, timeout=30)
        response.raise_for_status()
        
        total_size = int(response.headers.get('content-length', 0))
        downloaded = 0
        
        with open(output_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192 * 100):  # 800KB chunks
                if chunk:
                    f.write(chunk)
                    downloaded += len(chunk)
                    
                    if total_size > 0:
                        pct = (downloaded / total_size) * 100
                        mb_done = downloaded / (1024 * 1024)
                        mb_total = total_size / (1024 * 1024)
                        print(f"\r   Progress: {pct:.1f}% ({mb_done:.1f} / {mb_total:.1f} MB)", end='')
        
        file_size = os.path.getsize(output_path) / (1024 * 1024)
        print(f"\n   ✅ Downloaded: {file_size:.1f} MB (compressed)")
        return True
        
    except requests.exceptions.RequestException as e:
        print(f"   ❌ Failed: {e}")
        return False

# ============================================
# MAIN DOWNLOAD LOOP
# ============================================

print(f"""
{'='*60}
🚀 UHC NEW YORK MRF FILE DOWNLOADER
{'='*60}
📂 Output Directory: {OUTPUT_DIR}
📋 Files to Download: {len(FILES_TO_DOWNLOAD)}
⏰ Started: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

⚠️  NOTE: These files are LARGE (often 1-10 GB compressed)
    Full download may take 30-60 minutes depending on connection
{'='*60}
""")

successful = 0
failed = 0

for file_info in FILES_TO_DOWNLOAD:
    if download_mrf_file(file_info['url'], file_info['name'], file_info['description']):
        successful += 1
    else:
        failed += 1

# ============================================
# SUMMARY
# ============================================

print(f"""

{'='*60}
✅ DOWNLOAD COMPLETE!
{'='*60}
   Successful: {successful}
   Failed: {failed}
   
📂 Files saved to: {OUTPUT_DIR}
""")

# List downloaded files
print("📋 Downloaded Files:")
for f in os.listdir(OUTPUT_DIR):
    if f.endswith('.gz'):
        size = os.path.getsize(os.path.join(OUTPUT_DIR, f)) / (1024 * 1024)
        print(f"   • {f}: {size:.1f} MB")

print(f"""
{'='*60}
📝 NEXT STEPS:
{'='*60}
1. Run the extraction script on each downloaded file
2. Filter for your 75 target CPT codes
3. Aggregate the results

Note: Each .gz file may expand to 10-50 GB when parsed!
Consider processing one at a time to manage memory.
{'='*60}
""")
