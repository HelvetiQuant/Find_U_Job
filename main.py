# ======================================================
# PRODUCTION READY FASTAPI APPLICATION
# ======================================================

from fastapi import FastAPI, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3
import datetime
import requests
import os
from config import Config

app = FastAPI(title="AI Job Fundraising Platform", version="1.0.0")

# ======================================================
# CORS MIDDLEWARE - Enable frontend communication
# ======================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# ======================================================
# LOCAL AI (OLLAMA REQUIRED)
# ======================================================

def local_ai(prompt):
    """AI function with production error handling"""
    try:
        # Use production Ollama URL if available
        ollama_url = Config.OLLAMA_API_URL
        if Config.is_production():
            # In production, you might want to use a different AI service
            # For now, we'll keep Ollama but add error handling
            pass
            
        res = requests.post(f"{ollama_url}/api/generate", json={
            "model": Config.OLLAMA_MODEL,
            "prompt": prompt,
            "stream": False
        }, timeout=30)
        
        if res.status_code == 200:
            return res.json()["response"]
        else:
            return f"AI Service Error: {res.status_code}"
            
    except Exception as e:
        return f"AI Error: {str(e)}"

# ======================================================
# DATABASE
# ======================================================

def db():
    """Database connection with production handling"""
    if Config.is_production():
        # In production, you might want to use PostgreSQL
        # For now, we'll keep SQLite but ensure it's in a writable directory
        db_path = os.environ.get('DATABASE_PATH', '/tmp/saas.db')
        return sqlite3.connect(db_path)
    return sqlite3.connect("saas.db")

# ======================================================
# MODELS
# ======================================================

class Job(BaseModel):
    title: str
    company: str
    link: str
    description: str = ""

class Apply(BaseModel):
    job_id: int
    cv: str

# ======================================================
# AI FUNCTIONS
# ======================================================

def parse_cv(cv):
    return local_ai(f"Extract skills and experience from CV: {cv}")

def match(cv, job):
    return local_ai(f"Score 0-100 match CV vs job: {cv} | {job}")

def email_job(cv, job):
    return local_ai(f"Write short friendly but professional job email. CV:{cv} JOB:{job}")

# ======================================================
# API ROUTES
# ======================================================

@app.get("/")
def root():
    """Health check endpoint"""
    return {
        "message": "AI Job Fundraising Platform",
        "version": "1.0.0",
        "environment": Config.ENVIRONMENT,
        "status": "running"
    }

@app.get("/health")
def health_check():
    """Detailed health check"""
    try:
        # Test database
        conn = db()
        conn.execute("SELECT 1")
        conn.close()
        db_status = "healthy"
    except:
        db_status = "unhealthy"
    
    return {
        "status": "healthy" if db_status == "healthy" else "degraded",
        "database": db_status,
        "ai_service": "configured",
        "environment": Config.ENVIRONMENT
    }

@app.post("/jobs")
def add(job: Job):
    conn = db()
    c = conn.cursor()
    c.execute("CREATE TABLE IF NOT EXISTS jobs (id INTEGER PRIMARY KEY, title TEXT, company TEXT, description TEXT, score INT, status TEXT)")
    c.execute("INSERT INTO jobs(title,company,description,score,status) VALUES (?,?,?,?,?)",(job.title,job.company,job.description,0,"new"))
    conn.commit()
    conn.close()
    return {"ok": True, "job_id": c.lastrowid}

@app.get("/jobs")
def get():
    conn = db()
    c = conn.cursor()
    c.execute("SELECT * FROM jobs ORDER BY score DESC")
    d = c.fetchall()
    conn.close()
    return d

@app.post("/apply")
def apply(req: Apply, bg: BackgroundTasks):
    conn = db()
    c = conn.cursor()
    c.execute("SELECT title,company FROM jobs WHERE id=?",(req.job_id,))
    job = c.fetchone()
    
    if not job:
        conn.close()
        return {"error": "Job not found"}
    
    cv = parse_cv(req.cv)
    score = match(cv, job)
    
    # Improved score parsing
    try:
        # Extract numeric score from AI response
        import re
        score_match = re.search(r'(\d+)', score)
        numeric_score = int(score_match.group(1)) if score_match else 0
        
        if numeric_score >= 80:
            mail = email_job(cv, job)
            bg.add_task(lambda: print("SEND:", mail))
            c.execute("UPDATE jobs SET score=?,status=? WHERE id=?",(numeric_score,"applied",req.job_id))
            conn.commit()
            conn.close()
            return {"applied": True, "score": score, "numeric_score": numeric_score}
        else:
            conn.close()
            return {"skip": True, "score": score, "numeric_score": numeric_score}
    except:
        # Fallback to original logic if parsing fails
        if "80" in score or "90" in score:
            mail = email_job(cv, job)
            bg.add_task(lambda: print("SEND:", mail))
            c.execute("UPDATE jobs SET score=?,status=? WHERE id=?",(85,"applied",req.job_id))
            conn.commit()
            conn.close()
            return {"applied": True, "score": score}
        else:
            conn.close()
            return {"skip": True, "score": score}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=Config.PORT)
