"""
Vercel Serverless API Entrypoint
FastAPI app for Vercel deployment
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sys
import os

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

app = FastAPI(
    title="Find U Job API",
    description="AI-Powered Job Matching",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "message": "Find U Job API",
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/health")
def health():
    return {"status": "healthy"}

# Vercel serverless handler
from fastapi import Request
from fastapi.responses import JSONResponse

async def handler(request: Request):
    """Vercel serverless handler"""
    from mangum import Mangum
    handler = Mangum(app)
    return await handler(request)
