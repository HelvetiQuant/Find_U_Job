# ======================================================
# API TESTING SCRIPT
# ======================================================

import requests
import json

BASE_URL = "http://localhost:8000"

def test_api():
    """Test all API endpoints"""
    print("🧪 Testing API endpoints...")
    
    # Test 1: Get jobs (should be empty initially)
    print("\n1️⃣ Testing GET /jobs")
    try:
        response = requests.get(f"{BASE_URL}/jobs")
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}")
    except Exception as e:
        print(f"❌ Error: {e}")
    
    # Test 2: Add a job
    print("\n2️⃣ Testing POST /jobs")
    job_data = {
        "title": "AI Engineer",
        "company": "TechCorp",
        "link": "https://example.com/job"
    }
    try:
        response = requests.post(f"{BASE_URL}/jobs", json=job_data)
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}")
    except Exception as e:
        print(f"❌ Error: {e}")
    
    # Test 3: Get jobs again (should have the new job)
    print("\n3️⃣ Testing GET /jobs (after adding)")
    try:
        response = requests.get(f"{BASE_URL}/jobs")
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}")
    except Exception as e:
        print(f"❌ Error: {e}")
    
    # Test 4: Test apply endpoint
    print("\n4️⃣ Testing POST /apply")
    apply_data = {
        "job_id": 1,
        "cv": "Experienced AI engineer with Python and ML skills"
    }
    try:
        response = requests.post(f"{BASE_URL}/apply", json=apply_data)
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    test_api()
