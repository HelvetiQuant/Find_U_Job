# ======================================================
# ADZUNA API SETUP GUIDE
# ======================================================

"""
ADZUNA API - FREE TIER SETUP

1. Go to: https://developer.adzuna.com/
2. Sign up for free account
3. Get your App ID and App Key
4. Update the credentials below
5. Run: python job_fetcher_complete.py

Free tier limits:
- 1,000 requests per day
- Access to UK, US, Germany, France, Australia, Poland jobs
- No cost for development/testing
"""

# UPDATE THESE WITH YOUR CREDENTIALS
ADZUNA_APP_ID = "YOUR_APP_ID_HERE"
ADZUNA_APP_KEY = "YOUR_APP_KEY_HERE"

def test_adzuna_credentials():
    """Test if Adzuna credentials work"""
    import requests
    
    if ADZUNA_APP_ID == "YOUR_APP_ID_HERE" or ADZUNA_APP_KEY == "YOUR_APP_KEY_HERE":
        print("❌ Please update ADZUNA_APP_ID and ADZUNA_APP_KEY in this file")
        return False
    
    url = "https://api.adzuna.com/v1/api/jobs/gb/search/1"
    params = {
        'app_id': ADZUNA_APP_ID,
        'app_key': ADZUNA_APP_KEY,
        'what': 'python',
        'where': 'london',
        'results_per_page': 5
    }
    
    try:
        response = requests.get(url, params=params)
        if response.status_code == 200:
            data = response.json()
            jobs = data.get('results', [])
            print(f"✅ Adzuna credentials work! Found {len(jobs)} jobs")
            return True
        else:
            print(f"❌ Adzuna error: {response.status_code} - {response.text}")
            return False
    except Exception as e:
        print(f"❌ Adzuna connection error: {e}")
        return False

if __name__ == "__main__":
    test_adzuna_credentials()
