# ============================================
# CHECK MRF FILE METADATA
# Identify the source of your 7.7GB file
# ============================================

from google.colab import drive
import json
import os

drive.mount('/content/drive')

FILE_PATH = '/content/drive/MyDrive/health-insurance-data/raw-extracts/negotiated_rates.json'

print(f"📂 File: {FILE_PATH}")
print(f"📊 Size: {os.path.getsize(FILE_PATH) / (1024**3):.2f} GB")
print("\n" + "="*60)
print("🔍 Reading file header to identify source...")
print("="*60 + "\n")

# Method 1: Read first few KB to get metadata
with open(FILE_PATH, 'r') as f:
    # Read first 10KB - should contain all header metadata
    header = f.read(10000)
    
print("📋 RAW HEADER (first 10KB):")
print("-" * 40)
print(header[:5000])  # Print first 5KB for readability
print("-" * 40)

# Method 2: Try to parse as JSON and extract top-level keys
print("\n\n🔑 Attempting to extract metadata fields...")
print("-" * 40)

try:
    with open(FILE_PATH, 'r') as f:
        # Read incrementally to find metadata
        content = ""
        for i, line in enumerate(f):
            content += line
            if i > 50:  # First 50 lines should have metadata
                break
        
        # Try to find key fields
        import re
        
        # Look for reporting_entity_name
        match = re.search(r'"reporting_entity_name"\s*:\s*"([^"]+)"', content)
        if match:
            print(f"✅ Reporting Entity: {match.group(1)}")
        
        # Look for last_updated_on
        match = re.search(r'"last_updated_on"\s*:\s*"([^"]+)"', content)
        if match:
            print(f"✅ Last Updated: {match.group(1)}")
        
        # Look for version
        match = re.search(r'"version"\s*:\s*"([^"]+)"', content)
        if match:
            print(f"✅ Version: {match.group(1)}")
            
        # Look for plan info
        match = re.search(r'"plan_name"\s*:\s*"([^"]+)"', content)
        if match:
            print(f"✅ Plan Name: {match.group(1)}")
            
        match = re.search(r'"plan_id"\s*:\s*"([^"]+)"', content)
        if match:
            print(f"✅ Plan ID: {match.group(1)}")

except Exception as e:
    print(f"⚠️ Error parsing: {e}")

print("\n" + "="*60)
print("💡 Compare the 'Reporting Entity' and 'Plan Name' above")
print("   with the Table of Contents to identify which file this is!")
print("="*60)
