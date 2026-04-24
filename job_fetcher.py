# ======================================================
# JOB FETCHER - FREE JOB SOURCES INTEGRATION
# ======================================================

import requests
import json
from bs4 import BeautifulSoup
import time
import random

class JobFetcher:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
    
    def fetch_github_jobs(self, keywords="python", location="remote"):
        """Fetch jobs from GitHub Jobs API"""
        try:
            url = f"https://jobs.github.com/positions.json?description={keywords}&location={location}"
            response = self.session.get(url)
            if response.status_code == 200:
                jobs = response.json()
                return [{
                    'title': job.get('title', ''),
                    'company': job.get('company', ''),
                    'location': job.get('location', ''),
                    'description': job.get('description', ''),
                    'link': job.get('url', ''),
                    'source': 'GitHub Jobs'
                } for job in jobs[:10]]  # Limit to 10 jobs
        except Exception as e:
            print(f"GitHub Jobs error: {e}")
        return []
    
    def fetch_jobicy_jobs(self):
        """Fetch remote jobs from Jobicy API"""
        try:
            url = "https://jobicy.com/api/v2/remote-jobs"
            response = self.session.get(url)
            if response.status_code == 200:
                data = response.json()
                jobs = data.get('jobs', [])
                return [{
                    'title': job.get('title', ''),
                    'company': job.get('companyName', ''),
                    'location': job.get('jobGeo', 'Remote'),
                    'description': job.get('jobDescription', ''),
                    'link': job.get('url', ''),
                    'source': 'Jobicy'
                } for job in jobs[:10]]
        except Exception as e:
            print(f"Jobicy error: {e}")
        return []
    
    def fetch_adzuna_jobs(self, app_id, app_key, keywords="ai engineer", location="London"):
        """Fetch jobs from Adzuna API"""
        try:
            url = f"https://api.adzuna.com/v1/api/jobs/gb/search/1"
            params = {
                'app_id': app_id,
                'app_key': app_key,
                'what': keywords,
                'where': location,
                'results_per_page': 10
            }
            response = self.session.get(url, params=params)
            if response.status_code == 200:
                data = response.json()
                jobs = data.get('results', [])
                return [{
                    'title': job.get('title', ''),
                    'company': job.get('company', {}).get('display_name', ''),
                    'location': job.get('location', {}).get('display_name', ''),
                    'description': job.get('description', ''),
                    'link': job.get('redirect_url', ''),
                    'source': 'Adzuna'
                } for job in jobs]
        except Exception as e:
            print(f"Adzuna error: {e}")
        return []
    
    def fetch_indeed_jobs(self, keywords="ai engineer", location="New York"):
        """Scrape jobs from Indeed (use with caution)"""
        try:
            url = f"https://www.indeed.com/jobs"
            params = {
                'q': keywords,
                'l': location,
                'limit': 10
            }
            response = self.session.get(url, params=params)
            if response.status_code == 200:
                soup = BeautifulSoup(response.content, 'html.parser')
                jobs = []
                
                # This is a simplified example - real implementation needs more robust parsing
                job_cards = soup.find_all('div', class_='job_seen_beacon')[:10]
                for card in job_cards:
                    title_elem = card.find('h2', class_='jobTitle')
                    company_elem = card.find('span', class_='companyName')
                    
                    if title_elem and company_elem:
                        jobs.append({
                            'title': title_elem.get_text(strip=True),
                            'company': company_elem.get_text(strip=True),
                            'location': location,
                            'description': 'Visit Indeed for full description',
                            'link': 'https://www.indeed.com' + (title_elem.find('a')['href'] if title_elem.find('a') else ''),
                            'source': 'Indeed'
                        })
                
                return jobs
        except Exception as e:
            print(f"Indeed scraping error: {e}")
        return []
    
    def add_jobs_to_database(self, jobs, api_base="http://localhost:8001"):
        """Add fetched jobs to local database"""
        added_count = 0
        for job in jobs:
            try:
                job_data = {
                    "title": job['title'],
                    "company": job['company'],
                    "link": job['link'],
                    "description": job['description'][:500] + "..." if len(job['description']) > 500 else job['description']
                }
                
                response = requests.post(f"{api_base}/jobs", json=job_data)
                if response.status_code == 200:
                    added_count += 1
                    print(f"✅ Added: {job['title']} at {job['company']}")
                
                # Rate limiting
                time.sleep(1)
                
            except Exception as e:
                print(f"❌ Error adding job {job['title']}: {e}")
        
        return added_count

def main():
    """Example usage"""
    fetcher = JobFetcher()
    
    print("🔍 Fetching jobs from free sources...")
    
    # GitHub Jobs (no API key needed)
    github_jobs = fetcher.fetch_github_jobs("python", "remote")
    print(f"📊 GitHub: {len(github_jobs)} jobs found")
    
    # Jobicy (no API key needed)
    jobicy_jobs = fetcher.fetch_jobicy_jobs()
    print(f"📊 Jobicy: {len(jobicy_jobs)} jobs found")
    
    # Adzuna (requires API key - get free at adzuna.com)
    # adzuna_jobs = fetcher.fetch_adzuna_jobs("YOUR_APP_ID", "YOUR_APP_KEY")
    
    # Add to database
    all_jobs = github_jobs + jobicy_jobs
    if all_jobs:
        added = fetcher.add_jobs_to_database(all_jobs)
        print(f"🎉 Successfully added {added} jobs to database!")
    else:
        print("❌ No jobs found")

if __name__ == "__main__":
    main()
