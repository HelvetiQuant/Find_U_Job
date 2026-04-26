"""
================================================================================
FIND U JOB - FastAPI Backend
================================================================================
AI-Powered Job Matching API with Academic Research Integration

Endpoints:
- /jobs/search - Search jobs with AI matching
- /jobs/whales - Get whale opportunities
- /match/analyze - Analyze match for job
- /user/profile - User profile management
- /applications - Application tracking
================================================================================
"""

from fastapi import FastAPI, HTTPException, Query, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Optional
import uvicorn

# Import algorithms
import sys
sys.path.append('..')
from algorithms import (
    AcademicJobMatcher,
    get_consensus_engine,
    get_risk_scorer,
    get_whale_detector,
    MatchResult
)

# Initialize FastAPI
app = FastAPI(
    title="Find U Job API",
    description="AI-Powered Job Matching with Academic Research Foundation",
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

# Initialize algorithms
matcher = AcademicJobMatcher()
consensus = get_consensus_engine()
risk_scorer = get_risk_scorer()
whale_detector = get_whale_detector()

# ============== MODELS ==============

class UserProfile(BaseModel):
    name: str
    email: str
    title: str
    skills: List[str]
    experience: List[Dict]
    education: List[Dict]
    location: str
    preferences: Optional[Dict] = {}

class JobListing(BaseModel):
    id: str
    title: str
    company: Dict
    location: Dict
    salary_range: Optional[Dict] = None
    required_skills: List[str]
    essential_skills: Optional[List[str]] = []
    experience_requirements: Optional[Dict] = {}
    description: str

class MatchRequest(BaseModel):
    user_profile: UserProfile
    job: JobListing

class MatchResponse(BaseModel):
    overall_score: float
    skill_match_score: float
    experience_match_score: float
    education_match_score: float
    location_match_score: float
    recommendation: str
    detailed_breakdown: Dict
    top_matching_skills: List[Dict]
    missing_essential_skills: List[str]

class WhaleResponse(BaseModel):
    job_id: str
    whale_score: float
    tier: str
    reasons: List[str]
    recommended_action: str
    expires_in_hours: Optional[int]

# ============== ENDPOINTS ==============

@app.get("/")
def root():
    return {
        "message": "Find U Job API",
        "version": "1.0.0",
        "algorithms": [
            "consensus_engine",
            "academic_matcher",
            "risk_scorer", 
            "whale_detector"
        ]
    }

@app.post("/match/analyze", response_model=MatchResponse)
def analyze_match(request: MatchRequest):
    """
    Analyze job match using academic research algorithms
    
    Combines:
    - Probabilistic LSA (25%)
    - TF-IDF matching (35%)
    - Semantic skill matching (40%)
    - NATALIA consensus engine
    """
    try:
        # Convert to dict format
        user_dict = request.user_profile.dict()
        job_dict = request.job.dict()
        
        # Run academic matcher
        result = matcher.comprehensive_match(user_dict, job_dict)
        
        # Get consensus score
        from algorithms import MatchFactor
        factors = [
            MatchFactor("skill_semantic", result.skill_match_score, 0.40, 0.9, "matcher"),
            MatchFactor("experience_temporal", result.experience_match_score, 0.25, 0.85, "matcher"),
            MatchFactor("education_match", result.education_match_score, 0.15, 0.8, "matcher"),
            MatchFactor("location_geo", result.location_match_score, 0.10, 0.9, "matcher"),
        ]
        
        consensus_result = consensus.calculate_match_consensus(
            user_dict, job_dict, factors
        )
        
        # Combine scores
        final_score = (result.overall_score * 0.6) + (consensus_result['overall_score'] * 0.4)
        
        # Generate recommendation
        if final_score >= 0.8:
            recommendation = "STRONG_MATCH"
        elif final_score >= 0.65:
            recommendation = "GOOD_MATCH"
        elif final_score >= 0.5:
            recommendation = "POTENTIAL_MATCH"
        else:
            recommendation = "POOR_MATCH"
        
        return MatchResponse(
            overall_score=round(final_score, 3),
            skill_match_score=result.skill_match_score,
            experience_match_score=result.experience_match_score,
            education_match_score=result.education_match_score,
            location_match_score=result.location_match_score,
            recommendation=recommendation,
            detailed_breakdown=result.detailed_breakdown,
            top_matching_skills=[
                {
                    "skill_name": s.skill_name,
                    "match_score": s.match_score,
                    "is_essential": s.is_essential
                }
                for s in result.top_matching_skills
            ],
            missing_essential_skills=result.missing_essential_skills
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/match/risk-assessment")
def assess_risk(request: MatchRequest):
    """
    Assess application success probability
    """
    try:
        user_dict = request.user_profile.dict()
        job_dict = request.job.dict()
        
        # Get match result for context
        match_result = matcher.comprehensive_match(user_dict, job_dict)
        match_dict = {
            "skill_match_score": match_result.skill_match_score,
            "missing_essential_skills": match_result.missing_essential_skills
        }
        
        # Calculate risk
        risk = risk_scorer.calculate_success_probability(
            user_dict, job_dict, match_dict
        )
        
        return {
            "success_probability": risk.success_probability,
            "risk_level": risk.risk_level,
            "confidence": risk.confidence_score,
            "key_factors": [
                {
                    "factor": f[0],
                    "impact": f[1],
                    "recommendation": f[2]
                }
                for f in risk.key_factors
            ],
            "suggested_actions": risk.suggested_actions
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/jobs/whales", response_model=List[WhaleResponse])
def detect_whales(jobs: List[JobListing], market_context: Optional[Dict] = None):
    """
    Detect whale (premium) opportunities from job list
    """
    try:
        market_context = market_context or {}
        job_dicts = [j.dict() for j in jobs]
        
        whales = whale_detector.scan_for_whales(
            job_dicts, 
            market_context,
            top_n=20
        )
        
        return [
            WhaleResponse(
                job_id=w.job_id,
                whale_score=w.whale_score,
                tier=w.tier,
                reasons=w.reasons,
                recommended_action=w.recommended_action,
                expires_in_hours=w.expires_in_hours
            )
            for w in whales
        ]
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/jobs/rank")
def rank_jobs(user_profile: UserProfile, jobs: List[JobListing]):
    """
    Rank jobs by match quality using consensus algorithm
    """
    try:
        from algorithms import MultiJobConsensusRanker
        
        ranker = MultiJobConsensusRanker(consensus)
        user_dict = user_profile.dict()
        job_dicts = [j.dict() for j in jobs]
        
        ranked = ranker.rank_jobs(user_dict, job_dicts)
        
        return {
            "ranked_jobs": [
                {
                    "job_id": j.get('id'),
                    "rank": j.get('rank'),
                    "match_score": j.get('match_data', {}).get('overall_score'),
                    "is_whale": j.get('is_premium_opportunity'),
                    "recommendation": j.get('match_data', {}).get('recommendation')
                }
                for j in ranked[:50]
            ],
            "total_jobs": len(ranked)
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "algorithms_loaded": {
            "matcher": matcher is not None,
            "consensus": consensus is not None,
            "risk_scorer": risk_scorer is not None,
            "whale_detector": whale_detector is not None
        }
    }

# ============== MAIN ==============

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
