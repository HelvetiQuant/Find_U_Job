# ======================================================
# ADD REAL JOB OPPORTUNITIES TO DATABASE
# ======================================================

import requests

BASE_URL = "http://localhost:8000"

def add_real_jobs():
    """Add real job opportunities from Milan, Mountain View, and New York"""
    print("🌍 Adding real job opportunities...")
    
    # Milan Jobs
    milan_jobs = [
        {
            "title": "Machine Learning Engineer - iGenius",
            "company": "iGenius",
            "link": "https://startup.jobs/machine-learning-engineer-igenius-3854640"
        },
        {
            "title": "AI Engineer - FinTech Labs",
            "company": "FinTech Labs srl", 
            "link": "https://www.f6s.com/jobs/machine-learning-jobs-in-italy"
        },
        {
            "title": "Senior ML Engineer - PROXIMA GROUP",
            "company": "PROXIMA GROUP",
            "link": "https://www.glassdoor.com/Job/italy-machine-learning-engineer-jobs-SRCH_IL.0,5_IN120_KO6,31.htm"
        }
    ]
    
    # Mountain View Jobs
    mountain_view_jobs = [
        {
            "title": "Machine Learning Engineer - AI Research (PhD)",
            "company": "GM - Mountain View Technical Center",
            "link": "https://search-careers.gm.com/en/jobs/jr-202519114/machine-learning-engineer-ai-research-phd-early-career/"
        },
        {
            "title": "AI/ML Engineer - Tech Company",
            "company": "Tech Startup",
            "link": "https://www.indeed.com/q-machine-learning-engineer-l-mountain-view,-ca-jobs.html"
        },
        {
            "title": "Machine Learning Scientist - Research Lab",
            "company": "AI Research Lab",
            "link": "https://www.linkedin.com/jobs/machine-learning-engineer-jobs-san-francisco-bay-area"
        }
    ]
    
    # New York Jobs
    new_york_jobs = [
        {
            "title": "Senior Machine Learning Engineer - Capital One",
            "company": "Capital One",
            "link": "https://www.indeed.com/q-machine-learning-engineer-l-new-york,-ny-jobs.html"
        },
        {
            "title": "AI/ML Engineer - Financial Services",
            "company": "FinTech Company NYC",
            "link": "https://www.builtinnyc.com/jobs/data-analytics/machine-learning"
        },
        {
            "title": "Machine Learning Engineer - Enterprise",
            "company": "Enterprise Tech Company",
            "link": "https://www.glassdoor.com/Job/new-york-machine-learning-engineer-jobs-SRCH_IL.0,8_IC1132348_KO9,34.htm"
        }
    ]
    
    all_jobs = [
        *milan_jobs,
        *mountain_view_jobs, 
        *new_york_jobs
    ]
    
    print(f"\n📋 Adding {len(all_jobs)} jobs to database...")
    
    for i, job in enumerate(all_jobs, 1):
        print(f"\n{i}. Adding: {job['title']} at {job['company']}")
        
        try:
            response = requests.post(f"{BASE_URL}/jobs", json=job)
            if response.status_code == 200:
                print(f"   ✅ Added successfully")
            else:
                print(f"   ❌ Error: {response.status_code} - {response.text}")
        except Exception as e:
            print(f"   ❌ Exception: {e}")
    
    # Show final job list
    print("\n📊 Final job database:")
    try:
        response = requests.get(f"{BASE_URL}/jobs")
        jobs = response.json()
        print(f"Total jobs: {len(jobs)}")
        
        for job in jobs:
            print(f"   📋 Job {job[0]}: {job[1]} at {job[2]} - Score: {job[3]} - Status: {job[4]}")
            
    except Exception as e:
        print(f"❌ Error getting final list: {e}")

if __name__ == "__main__":
    add_real_jobs()
