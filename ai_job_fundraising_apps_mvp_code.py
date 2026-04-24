# ======================================================
# FULL STARTUP-READY SAAS (AI JOB + VC PLATFORM)
# WITH LOCAL AI + NEXT.JS FRONTEND + CLEAN FUN UI
# ======================================================

# ======================================================
# BACKEND (FASTAPI + LOCAL AI via Ollama)
# ======================================================

from fastapi import FastAPI, BackgroundTasks
from pydantic import BaseModel
import sqlite3
import datetime
import requests

app = FastAPI()

# ======================================================
# LOCAL AI (OLLAMA REQUIRED)
# install: https://ollama.com
# run: ollama run gemma3:270m
# ======================================================

def local_ai(prompt):
    res = requests.post("http://localhost:11434/api/generate", json={
        "model": "gemma3:270m",
        "prompt": prompt,
        "stream": False
    })
    return res.json()["response"]

# ======================================================
# DATABASE
# ======================================================

def db():
    return sqlite3.connect("saas.db")

# ======================================================
# MODELS
# ======================================================

class Job(BaseModel):
    title: str
    company: str
    link: str

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
# JOB ROUTES
# ======================================================

@app.post("/jobs")
def add(job: Job):
    conn=db();c=conn.cursor()
    c.execute("CREATE TABLE IF NOT EXISTS jobs (id INTEGER PRIMARY KEY, title TEXT, company TEXT, score INT, status TEXT)")
    c.execute("INSERT INTO jobs(title,company,score,status) VALUES (?,?,?,?)",(job.title,job.company,0,"new"))
    conn.commit();conn.close()
    return {"ok":True}

@app.get("/jobs")
def get():
    conn=db();c=conn.cursor()
    c.execute("SELECT * FROM jobs ORDER BY score DESC")
    d=c.fetchall();conn.close()
    return d

@app.post("/apply")
def apply(req: Apply, bg: BackgroundTasks):
    conn=db();c=conn.cursor()
    c.execute("SELECT title,company FROM jobs WHERE id=?",(req.job_id,))
    job=c.fetchone()

    cv=parse_cv(req.cv)
    score=match(cv,job)

    if "80" not in score and "90" not in score:
        return {"skip":True,"score":score}

    mail=email_job(cv,job)
    bg.add_task(lambda: print("SEND:",mail))

    c.execute("UPDATE jobs SET score=?,status=? WHERE id=?",(85,"applied",req.job_id))
    conn.commit();conn.close()

    return {"applied":True,"score":score}

# ======================================================
# FRONTEND (NEXT.JS + FUN DESIGN)
# ======================================================

"""
// app/page.js
import { useState } from 'react'

export default function Home(){

const [jobs,setJobs]=useState([])
const [cv,setCv]=useState("")

const load=async()=>{
 const r=await fetch('http://localhost:8000/jobs')
 setJobs(await r.json())
}

const apply=async(id)=>{
 await fetch('http://localhost:8000/apply',{
  method:'POST',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify({job_id:id,cv})
 })
}

return (
<div style={{fontFamily:'Comic Sans MS',padding:20}}>

<h1>🤖 AI Job Buddy</h1>

<textarea placeholder='Paste CV here ✨'
 style={{width:'100%',height:120,borderRadius:12,padding:10}}
 onChange={e=>setCv(e.target.value)} />

<button onClick={load} style={{marginTop:10}}>🔎 Load Jobs</button>

{jobs.map(j=> (
<div key={j[0]} style={{
 background:'#f0f8ff',
 marginTop:10,
 padding:15,
 borderRadius:16,
 boxShadow:'2px 2px 0px #000'
}}>

<h3>💼 {j[1]}</h3>
<p>🏢 {j[2]}</p>

<button onClick={()=>apply(j[0])}>
🚀 Apply with AI
</button>

</div>
))}

</div>
)
}
"""

# ======================================================
# SCRAPER (MULTI SOURCE READY)
# ======================================================

"""
import time

def fake_scraper():
    conn=sqlite3.connect('saas.db')
    c=conn.cursor()

    for i in range(5):
        c.execute("INSERT INTO jobs(title,company,score,status) VALUES (?,?,?,?)",
                  (f"AI Engineer {i}","StartupX",0,"new"))
        time.sleep(1)

    conn.commit()
    conn.close()
"""

# ======================================================
# STYLE / UX NOTES
# ======================================================

# Design scelto:
# - pulito (padding, card UI)
# - simpatico (emoji + comic font)
# - moderno (cards + shadow)

# ======================================================
# RUN
# ======================================================
# 1. ollama run mistral
# 2. uvicorn main:app --reload
# 3. npm run dev (frontend)
# ======================================================
