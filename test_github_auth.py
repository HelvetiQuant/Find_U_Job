# ======================================================
# GITHUB AUTHENTICATION TEST
# ======================================================

import requests
from config import Config

def test_github_auth():
    """Test GitHub token authentication"""
    try:
        # Load configuration
        Config.validate_github_config()
        github_config = Config.get_github_config()
        
        print("🔑 Testing GitHub authentication...")
        print(f"Token: {github_config['token'][:20]}...")
        
        # Test API call to get user info
        headers = {
            "Authorization": f"token {github_config['token']}",
            "Accept": "application/vnd.github.v3+json"
        }
        
        response = requests.get("https://api.github.com/user", headers=headers)
        
        if response.status_code == 200:
            user_data = response.json()
            print(f"✅ Authentication successful!")
            print(f"👤 User: {user_data.get('login')}")
            print(f"📧 Email: {user_data.get('email')}")
            print(f"🏢 Name: {user_data.get('name')}")
            return True
        else:
            print(f"❌ Authentication failed: {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def create_repo(repo_name, description="AI Job Fundraising Platform"):
    """Create a new GitHub repository"""
    try:
        github_config = Config.get_github_config()
        
        headers = {
            "Authorization": f"token {github_config['token']}",
            "Accept": "application/vnd.github.v3+json"
        }
        
        data = {
            "name": repo_name,
            "description": description,
            "private": False,
            "auto_init": True
        }
        
        response = requests.post("https://api.github.com/user/repos", 
                               headers=headers, json=data)
        
        if response.status_code == 201:
            repo_data = response.json()
            print(f"✅ Repository '{repo_name}' created successfully!")
            print(f"🔗 URL: {repo_data['html_url']}")
            print(f"📝 Clone: {repo_data['clone_url']}")
            return repo_data
        else:
            print(f"❌ Failed to create repo: {response.status_code}")
            print(f"Response: {response.text}")
            return None
            
    except Exception as e:
        print(f"❌ Error creating repo: {e}")
        return None

if __name__ == "__main__":
    # Test authentication first
    if test_github_auth():
        print("\n🚀 Ready to create repository!")
        # Uncomment to create repo
        # create_repo("ai-job-fundraising-platform")
    else:
        print("\n❌ Please check your GitHub token configuration")
