# ======================================================
# ADD TEST JOBS WITH DESCRIPTIONS
# ======================================================

import requests

def add_test_jobs():
    """Add test jobs with full descriptions"""
    
    # Flask server (port 8001)
    flask_jobs = [
        {
            "title": "Senior AI Engineer",
            "company": "TechStartup",
            "link": "https://example.com/job1",
            "description": "Looking for a Senior AI Engineer to lead our ML team. Responsibilities include developing cutting-edge AI solutions, mentoring junior engineers, and driving innovation in our products. Requirements: 5+ years experience in ML, strong Python skills, experience with deep learning frameworks. We offer competitive salary, equity, and the opportunity to work on groundbreaking AI projects."
        },
        {
            "title": "Machine Learning Researcher",
            "company": "AI Labs",
            "link": "https://example.com/job2", 
            "description": "Join our research team working on next-generation AI models. You'll be responsible for designing and implementing novel machine learning algorithms, publishing research papers, and collaborating with leading AI researchers worldwide. PhD in Computer Science or related field required. Experience with transformer architectures and reinforcement learning preferred."
        },
        {
            "title": "AI Product Manager",
            "company": "DataCorp",
            "link": "https://example.com/job3",
            "description": "We're seeking an AI Product Manager to bridge the gap between technical teams and business stakeholders. You'll define product strategy for AI-powered solutions, work with engineering teams to deliver features, and analyze market opportunities. Strong understanding of AI technologies combined with business acumen essential."
        }
    ]
    
    # FastAPI server (port 8000) 
    fastapi_jobs = [
        {
            "title": "Deep Learning Engineer",
            "company": "NeuralTech",
            "link": "https://example.com/job4",
            "description": "Join our deep learning team working on computer vision and NLP projects. You'll implement state-of-the-art neural networks, optimize models for production, and collaborate with data scientists. Experience with PyTorch, TensorFlow, and cloud deployment required. We work on autonomous driving and medical imaging applications."
        },
        {
            "title": "AI Ethics Specialist",
            "company": "EthicalAI",
            "link": "https://example.com/job5",
            "description": "Help us build responsible AI systems. As an AI Ethics Specialist, you'll develop frameworks for ethical AI deployment, conduct bias audits, and work with cross-functional teams to ensure our AI systems align with human values. Background in philosophy, law, or computer science with focus on AI ethics required."
        }
    ]
    
    print("🚀 Adding test jobs with descriptions...")
    
    # Add to Flask (port 8001)
    print("\n📊 Adding jobs to Flask server (port 8001):")
    for i, job in enumerate(flask_jobs, 1):
        try:
            response = requests.post("http://localhost:8001/jobs", json=job)
            if response.status_code == 200:
                print(f"   ✅ Added: {job['title']} at {job['company']}")
            else:
                print(f"   ❌ Error adding {job['title']}: {response.status_code}")
        except Exception as e:
            print(f"   ❌ Exception adding {job['title']}: {e}")
    
    # Add to FastAPI (port 8000)
    print("\n📊 Adding jobs to FastAPI server (port 8000):")
    for i, job in enumerate(fastapi_jobs, 1):
        try:
            response = requests.post("http://localhost:8000/jobs", json=job)
            if response.status_code == 200:
                print(f"   ✅ Added: {job['title']} at {job['company']}")
            else:
                print(f"   ❌ Error adding {job['title']}: {response.status_code}")
        except Exception as e:
            print(f"   ❌ Exception adding {job['title']}: {e}")
    
    print("\n🎉 Test jobs added! Now you can click on job cards to see full descriptions.")

if __name__ == "__main__":
    add_test_jobs()
