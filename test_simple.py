import requests

# Test simple API calls
BASE_URL = "http://localhost:8000"

def test():
    print("🧪 Testing API...")
    
    # Test GET jobs
    try:
        response = requests.get(f"{BASE_URL}/jobs")
        print(f"GET /jobs: {response.status_code}")
        print(f"Response: {response.json()}")
    except Exception as e:
        print(f"❌ Error: {e}")
    
    # Test POST job
    job_data = {
        "title": "AI Engineer",
        "company": "TechCorp", 
        "link": "https://example.com/job"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/jobs", json=job_data)
        print(f"POST /jobs: {response.status_code}")
        print(f"Response: {response.json()}")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    test()
