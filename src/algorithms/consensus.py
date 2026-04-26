"""
================================================================================
ADAPTIVE CONSENSUS ALGORITHM - NATALIA Engine for Job Matching
================================================================================
Based on: Helvetiquant Trading System - PROPRIETARY AND CONFIDENTIAL
Copyright (C) 2025 Riccardo Gaetti. All Rights Reserved.

ADAPTED FOR: Find U Job - AI-Powered Job Matching System
Academic Foundation: Multi-factor consensus ranking with dynamic weights

PATENT PENDING - Core Algorithm for Multi-AI Job Recommendation
================================================================================
"""

from dataclasses import dataclass
from datetime import datetime
from enum import Enum
from typing import Dict, List, Optional, Tuple
import numpy as np
from collections import defaultdict


class CredibilityLevel(Enum):
    """Livelli di credibilità per fonti di dati"""
    EXTREME_HIGH = 1.0  # LinkedIn, Glassdoor verified
    VERY_HIGH = 0.85    # Major job boards (Indeed, LinkedIn)
    HIGH = 0.7          # Company career pages
    MEDIUM_HIGH = 0.6   # Niche job boards
    MEDIUM = 0.5        # Aggregator sites
    LOW = 0.3           # Unknown sources
    VERY_LOW = 0.1      # Unverified listings


class SourceCategory(Enum):
    """Categorie di fonti per job data"""
    JOB_BOARD = "job_board"
    COMPANY_SITE = "company_site"
    SOCIAL_MEDIA = "social_media"
    PROFESSIONAL_NETWORK = "professional_network"
    AGGREGATOR = "aggregator"


@dataclass
class JobSource:
    """Profilo di una fonte di job"""
    name: str
    category: SourceCategory
    base_credibility: CredibilityLevel
    historical_accuracy: float  # 0-1
    update_frequency: str  # daily, weekly, realtime
    last_update: datetime
    trend_score: float  # -1 to 1


@dataclass
class MatchFactor:
    """Fattore di matching individuale"""
    name: str
    score: float  # 0-1
    weight: float  # Peso dinamico
    confidence: float  # 0-1
    source: str


class AdaptiveConsensusAlgorithm:
    """
    Algoritmo di consenso adattivo per job matching
    
    Combina multiple fonti di matching con pesi dinamici:
    - Skill matching (40%)
    - Experience alignment (25%)
    - Culture fit (15%)
    - Salary compatibility (10%)
    - Location preference (10%)
    """
    
    def __init__(self):
        # Peso base per il motore principale NATALIA
        self.natalia_weight = 0.40
        
        # Pesi dei moduli di matching
        self.module_weights = {
            "skill_semantic": 0.25,      # Semantic skill matching
            "experience_temporal": 0.15,  # Experience timeline analysis
            "culture_vector": 0.10,      # Company culture vectorization
            "salary_range": 0.05,        # Salary compatibility
            "location_geo": 0.05,        # Geographic preferences
        }
        
        # Fonti di job con credibilità
        self.source_profiles = self._initialize_sources()
        
        # Storia dei consensi per learning
        self.consensus_history = []
        self.learning_rate = 0.05
        
    def _initialize_sources(self) -> Dict[str, JobSource]:
        """Inizializza profili delle fonti job"""
        return {
            "linkedin": JobSource(
                "LinkedIn",
                SourceCategory.PROFESSIONAL_NETWORK,
                CredibilityLevel.EXTREME_HIGH,
                0.95,
                "realtime",
                datetime.now(),
                0.0
            ),
            "indeed": JobSource(
                "Indeed",
                SourceCategory.JOB_BOARD,
                CredibilityLevel.VERY_HIGH,
                0.90,
                "daily",
                datetime.now(),
                0.0
            ),
            "glassdoor": JobSource(
                "Glassdoor",
                SourceCategory.JOB_BOARD,
                CredibilityLevel.HIGH,
                0.85,
                "daily",
                datetime.now(),
                0.0
            ),
            "adzuna": JobSource(
                "Adzuna",
                SourceCategory.AGGREGATOR,
                CredibilityLevel.MEDIUM_HIGH,
                0.75,
                "daily",
                datetime.now(),
                0.0
            ),
            "github_jobs": JobSource(
                "GitHub Jobs",
                SourceCategory.COMPANY_SITE,
                CredibilityLevel.HIGH,
                0.80,
                "weekly",
                datetime.now(),
                0.0
            ),
        }
    
    def calculate_match_consensus(
        self,
        user_profile: Dict,
        job_listing: Dict,
        factors: List[MatchFactor]
    ) -> Dict:
        """
        Calcola il punteggio di consenso per un match job-candidato
        
        Returns:
            Dict con: overall_score, confidence, factor_breakdown, recommendation
        """
        # Peso dinamico basato sulla qualità dei dati
        adjusted_weights = self._adjust_weights_for_data_quality(factors)
        
        # Calcola weighted score
        weighted_scores = []
        total_confidence = 0
        
        for factor in factors:
            weight = adjusted_weights.get(factor.name, factor.weight)
            weighted_score = factor.score * weight * factor.confidence
            weighted_scores.append(weighted_score)
            total_confidence += factor.confidence * weight
        
        # Normalizza per confidence totale
        if total_confidence > 0:
            overall_score = sum(weighted_scores) / total_confidence
        else:
            overall_score = 0.5
        
        # Calcola confidence complessiva
        confidence = self._calculate_overall_confidence(factors, overall_score)
        
        # Determina raccomandazione
        recommendation = self._generate_recommendation(overall_score, confidence)
        
        # Aggiorna pesi per learning
        self._update_weights_from_feedback(factors, overall_score)
        
        return {
            "overall_score": round(overall_score, 3),
            "confidence": round(confidence, 3),
            "natalia_contribution": round(self.natalia_weight * overall_score, 3),
            "factor_breakdown": [
                {
                    "name": f.name,
                    "score": round(f.score, 3),
                    "weight": round(adjusted_weights.get(f.name, f.weight), 3),
                    "contribution": round(f.score * adjusted_weights.get(f.name, f.weight), 3)
                }
                for f in factors
            ],
            "recommendation": recommendation,
            "timestamp": datetime.now().isoformat()
        }
    
    def _adjust_weights_for_data_quality(
        self,
        factors: List[MatchFactor]
    ) -> Dict[str, float]:
        """Aggiusta pesi basato sulla qualità dei dati disponibili"""
        adjusted = {}
        
        for factor in factors:
            base_weight = self.module_weights.get(
                factor.name.replace("_factor", ""),
                factor.weight
            )
            
            # Aumenta peso se confidence è alta
            if factor.confidence > 0.8:
                adjusted[factor.name] = base_weight * 1.2
            # Diminuisci se confidence è bassa
            elif factor.confidence < 0.4:
                adjusted[factor.name] = base_weight * 0.7
            else:
                adjusted[factor.name] = base_weight
        
        # Normalizza per somma = 1 - natalia_weight
        total = sum(adjusted.values())
        if total > 0:
            target_total = 1 - self.natalia_weight
            for key in adjusted:
                adjusted[key] = (adjusted[key] / total) * target_total
        
        return adjusted
    
    def _calculate_overall_confidence(
        self,
        factors: List[MatchFactor],
        score: float
    ) -> float:
        """Calcola confidence complessiva basata su multiple fattori"""
        if not factors:
            return 0.5
        
        # Media pesata delle confidence individuali
        avg_confidence = np.mean([f.confidence for f in factors])
        
        # Penalizza se score è agli estremi (0 o 1) con poca evidenza
        if (score < 0.1 or score > 0.9) and avg_confidence < 0.7:
            return avg_confidence * 0.9
        
        # Bonus per consistenza tra fattori
        scores = [f.score for f in factors]
        std_dev = np.std(scores)
        if std_dev < 0.2:  # Fattori consistenti
            return min(avg_confidence * 1.1, 1.0)
        
        return avg_confidence
    
    def _generate_recommendation(
        self,
        score: float,
        confidence: float
    ) -> str:
        """Genera raccomandazione basata su score e confidence"""
        if score >= 0.85 and confidence >= 0.7:
            return "STRONG_MATCH"
        elif score >= 0.70 and confidence >= 0.6:
            return "GOOD_MATCH"
        elif score >= 0.55 and confidence >= 0.5:
            return "POTENTIAL_MATCH"
        elif score < 0.4:
            return "POOR_MATCH"
        else:
            return "NEEDS_REVIEW"
    
    def _update_weights_from_feedback(
        self,
        factors: List[MatchFactor],
        actual_outcome: float
    ):
        """Aggiorna pesi basandosi sul feedback/outcome reale"""
        for factor in factors:
            predicted = factor.score
            error = actual_outcome - predicted
            
            # Aggiorna peso con gradient descent semplice
            current_weight = self.module_weights.get(factor.name, factor.weight)
            new_weight = current_weight + self.learning_rate * error * factor.confidence
            
            # Clamp tra 0.01 e 0.5
            new_weight = max(0.01, min(0.5, new_weight))
            self.module_weights[factor.name] = new_weight
        
        # Normalizza pesi
        total = sum(self.module_weights.values())
        if total > 0:
            for key in self.module_weights:
                self.module_weights[key] /= total
                self.module_weights[key] *= (1 - self.natalia_weight)


class MultiJobConsensusRanker:
    """
    Ranks multiple job listings using consensus algorithm
    Implements "Whale Detection" concept for high-value opportunities
    """
    
    def __init__(self, consensus_engine: AdaptiveConsensusAlgorithm):
        self.consensus = consensus_engine
        self.opportunity_threshold = 0.80  # Threshold for "whale" jobs
    
    def rank_jobs(
        self,
        user_profile: Dict,
        job_listings: List[Dict]
    ) -> List[Dict]:
        """
        Rank jobs by match quality using consensus
        
        Returns:
            List of jobs with match scores, sorted by relevance
        """
        ranked_jobs = []
        
        for job in job_listings:
            # Extract match factors
            factors = self._extract_match_factors(user_profile, job)
            
            # Calculate consensus
            result = self.consensus.calculate_match_consensus(
                user_profile, job, factors
            )
            
            # Flag high-value opportunities ("whale detection")
            is_whale = result["overall_score"] >= self.opportunity_threshold
            
            ranked_jobs.append({
                **job,
                "match_data": result,
                "is_premium_opportunity": is_whale,
                "rank": 0  # Will be set after sorting
            })
        
        # Sort by overall score
        ranked_jobs.sort(key=lambda x: x["match_data"]["overall_score"], reverse=True)
        
        # Assign ranks
        for i, job in enumerate(ranked_jobs):
            job["rank"] = i + 1
        
        return ranked_jobs
    
    def _extract_match_factors(
        self,
        user_profile: Dict,
        job: Dict
    ) -> List[MatchFactor]:
        """Estrae fattori di matching da profilo e job"""
        factors = []
        
        # 1. Skill Semantic Match
        user_skills = set(user_profile.get("skills", []))
        job_skills = set(job.get("required_skills", []))
        
        if job_skills:
            skill_overlap = len(user_skills & job_skills) / len(job_skills)
            factors.append(MatchFactor(
                "skill_semantic",
                skill_overlap,
                0.25,
                0.9 if user_skills else 0.5,
                "skill_analysis"
            ))
        
        # 2. Experience Temporal Match
        user_years = user_profile.get("years_experience", 0)
        job_required = job.get("years_experience_required", 0)
        
        if job_required > 0:
            exp_ratio = min(user_years / job_required, 1.5) / 1.5
            factors.append(MatchFactor(
                "experience_temporal",
                exp_ratio,
                0.15,
                0.85,
                "experience_analysis"
            ))
        
        # 3. Location Match
        user_location = user_profile.get("location_preference", "any")
        job_location = job.get("location", "")
        
        location_score = 1.0 if user_location == "any" or user_location in job_location else 0.5
        factors.append(MatchFactor(
            "location_geo",
            location_score,
            0.05,
            0.8,
            "location_analysis"
        ))
        
        # 4. Salary Compatibility
        user_salary = user_profile.get("salary_expectation", {})
        job_salary = job.get("salary_range", {})
        
        salary_score = self._calculate_salary_compatibility(user_salary, job_salary)
        factors.append(MatchFactor(
            "salary_range",
            salary_score,
            0.05,
            0.7 if job_salary else 0.3,
            "salary_analysis"
        ))
        
        return factors
    
    def _calculate_salary_compatibility(
        self,
        user_salary: Dict,
        job_salary: Dict
    ) -> float:
        """Calcola compatibilità salariale"""
        if not job_salary or not user_salary:
            return 0.5  # Neutrale se dati mancanti
        
        user_min = user_salary.get("min", 0)
        user_max = user_salary.get("max", float('inf'))
        job_min = job_salary.get("min", 0)
        job_max = job_salary.get("max", float('inf'))
        
        # Sovrapposizione range
        overlap_min = max(user_min, job_min)
        overlap_max = min(user_max, job_max)
        
        if overlap_max < overlap_min:
            return 0.2  # Range incompatibili
        
        overlap_size = overlap_max - overlap_min
        user_range = user_max - user_min
        job_range = job_max - job_min
        
        if user_range == 0 or job_range == 0:
            return 0.5
        
        # Score basato sulla sovrapposizione
        overlap_ratio = overlap_size / min(user_range, job_range)
        return min(overlap_ratio, 1.0)


# Singleton instance
_consensus_engine = None

def get_consensus_engine() -> AdaptiveConsensusAlgorithm:
    """Get or create singleton consensus engine"""
    global _consensus_engine
    if _consensus_engine is None:
        _consensus_engine = AdaptiveConsensusAlgorithm()
    return _consensus_engine
