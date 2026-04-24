# ======================================================
# COMPLETE CV WORKFLOW TEST
# ======================================================

import requests
import PyPDF2

BASE_URL = "http://localhost:8000"
CV_PATH = r"C:\Users\natal\Downloads\cv_Riccardo_Gaetti.pdf"

def extract_cv_text(pdf_path):
    """Extract text from CV PDF"""
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
    return text

def test_complete_workflow():
    """Test complete CV application workflow"""
    print("🧪 Testing complete CV workflow...")
    
    # Step 1: Extract CV text
    print("\n1️⃣ Extracting CV text...")
    try:
        cv_text = extract_cv_text(CV_PATH)
        print(f"✅ CV text extracted ({len(cv_text)} characters)")
    except Exception as e:
        print(f"❌ Error extracting CV: {e}")
        return
    
    # Step 2: Get available jobs
    print("\n2️⃣ Getting available jobs...")
    try:
        response = requests.get(f"{BASE_URL}/jobs")
        jobs = response.json()
        print(f"✅ Found {len(jobs)} jobs")
        for job in jobs:
            print(f"   - Job {job[0]}: {job[1]} at {job[2]}")
    except Exception as e:
        print(f"❌ Error getting jobs: {e}")
        return
    
    # Step 3: Test application for each job
    print("\n3️⃣ Testing applications...")
    for job in jobs:
        job_id = job[0]
        job_title = job[1]
        company = job[2]
        
        print(f"\n   📋 Applying for: {job_title} at {company}")
        
        apply_data = {
            "job_id": job_id,
            "cv": cv_text[:2000]  # Send first 2000 chars to avoid too long requests
        }
        
        try:
            response = requests.post(f"{BASE_URL}/apply", json=apply_data)
            result = response.json()
            
            print(f"   Status: {response.status_code}")
            if "applied" in result and result["applied"]:
                print(f"   ✅ Application successful! Score: {result.get('score', 'N/A')}")
            elif "skip" in result and result["skip"]:
                print(f"   ⏭️  Application skipped (low score). Score: {result.get('score', 'N/A')}")
            else:
                print(f"   📊 Result: {result}")
                
        except Exception as e:
            print(f"   ❌ Error applying: {e}")
    
    # Step 4: Check final job status
    print("\n4️⃣ Final job status...")
    try:
        response = requests.get(f"{BASE_URL}/jobs")
        final_jobs = response.json()
        print("📊 Final job list:")
        for job in final_jobs:
            status_emoji = "✅" if job[4] == "applied" else "📋" if job[4] == "new" else "❓"
            print(f"   {status_emoji} Job {job[0]}: {job[1]} at {job[2]} - Score: {job[3]} - Status: {job[4]}")
    except Exception as e:
        print(f"❌ Error getting final status: {e}")

if __name__ == "__main__":
    test_complete_workflow()
