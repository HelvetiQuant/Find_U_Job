"""
================================================================================
WHALE DETECTION ALGORITHM - High-Value Opportunity Identification
================================================================================
Based on: HelvetiQuant Whale-Enhanced Algorithm (85-90% accuracy)
Adapted for: Identifying premium job opportunities

Detects "whale" jobs - high-value opportunities with:
- Above-market compensation
- Rare skill requirements
- Low applicant-to-position ratio
- Premium company indicators
================================================================================
"""

import numpy as np
from typing import Dict, List, Tuple, Optional
from dataclasses import dataclass
from datetime import datetime


@dataclass
class WhaleIndicators:
    """Indicatori di un'opportunità premium ("whale")"""
    salary_premium: float  # % above market rate
    rarity_score: float  # 0-1 skill rarity
    competition_ratio: float  # applicants per slot
    company_premium: float  # company prestige score
    growth_potential: float  # role growth score
    timing_urgency: float  # how urgent to apply


@dataclass
class WhaleJob:
    """Rappresentazione di un job 'whale'"""
    job_id: str
    whale_score: float  # 0-1 overall score
    tier: str  # PLATINUM, GOLD, SILVER
    indicators: WhaleIndicators
    reasons: List[str]  # Why it's a whale
    recommended_action: str
    expires_in_hours: Optional[int]  # Urgency


class WhaleDetectionAlgorithm:
    """
    Algoritmo per identificare opportunità di lavoro premium ("whale jobs")
    
    Adattato dall'algoritmo originale di HelvetiQuant per il trading,
    applicato al job market per identificare le migliori opportunità.
    """
    
    # Soglie per categorie whale
    THRESHOLDS = {
        'PLATINUM': 0.90,  # Top 1% opportunities
        'GOLD': 0.80,      # Top 5% opportunities
        'SILVER': 0.70,    # Top 15% opportunities
    }
    
    # Pesi per il calcolo whale score
    WEIGHTS = {
        'salary_premium': 0.25,
        'rarity_score': 0.20,
        'competition_ratio': 0.20,
        'company_premium': 0.15,
        'growth_potential': 0.10,
        'timing_urgency': 0.10,
    }
    
    def __init__(self):
        self.market_data = {}
        self.historical_whales = []
        
    def analyze_job(self, job: Dict, market_context: Dict) -> Optional[WhaleJob]:
        """
        Analizza un job listing per determinare se è un "whale"
        
        Returns:
            WhaleJob se l'opportunità è premium, None altrimenti
        """
        indicators = self._extract_indicators(job, market_context)
        
        # Calcola whale score
        whale_score = self._calculate_whale_score(indicators)
        
        # Se sotto soglia minima, non è un whale
        if whale_score < self.THRESHOLDS['SILVER']:
            return None
        
        # Determina tier
        tier = self._determine_tier(whale_score)
        
        # Genera ragioni
        reasons = self._generate_whaleness_reasons(indicators, job)
        
        # Determina azione raccomandata
        action = self._recommend_action(whale_score, tier, indicators)
        
        # Calcola scadenza (se urgente)
        expires_in = self._calculate_urgency(job, indicators)
        
        return WhaleJob(
            job_id=job.get('id', ''),
            whale_score=round(whale_score, 3),
            tier=tier,
            indicators=indicators,
            reasons=reasons,
            recommended_action=action,
            expires_in_hours=expires_in
        )
    
    def scan_for_whales(
        self,
        jobs: List[Dict],
        market_context: Dict,
        top_n: int = 10
    ) -> List[WhaleJob]:
        """
        Scansiona una lista di job e identifica i whale
        
        Returns:
            Lista di WhaleJob ordinati per score
        """
        whales = []
        
        for job in jobs:
            whale = self.analyze_job(job, market_context)
            if whale:
                whales.append(whale)
        
        # Ordina per whale score
        whales.sort(key=lambda w: w.whale_score, reverse=True)
        
        return whales[:top_n]
    
    def _extract_indicators(
        self,
        job: Dict,
        market_context: Dict
    ) -> WhaleIndicators:
        """Estrae indicatori whale da un job listing"""
        
        # 1. Salary Premium
        salary_premium = self._calculate_salary_premium(
            job.get('salary_range', {}),
            market_context.get('avg_salary_for_role', {}),
            job.get('title', '')
        )
        
        # 2. Skill Rarity
        rarity = self._calculate_skill_rarity(
            job.get('required_skills', []),
            market_context.get('skill_demand_stats', {})
        )
        
        # 3. Competition Ratio
        competition = self._calculate_competition_ratio(
            job.get('applicants_count', 0),
            job.get('max_applicants', None),
            job.get('days_since_posted', 0)
        )
        
        # 4. Company Premium
        company_premium = self._calculate_company_premium(
            job.get('company', {}),
            market_context.get('company_ratings', {})
        )
        
        # 5. Growth Potential
        growth = self._estimate_growth_potential(job)
        
        # 6. Timing Urgency
        urgency = self._calculate_timing_urgency(
            job.get('posted_date'),
            job.get('application_deadline'),
            job.get('urgency_indicators', [])
        )
        
        return WhaleIndicators(
            salary_premium=salary_premium,
            rarity_score=rarity,
            competition_ratio=competition,
            company_premium=company_premium,
            growth_potential=growth,
            timing_urgency=urgency
        )
    
    def _calculate_salary_premium(
        self,
        job_salary: Dict,
        market_avg: Dict,
        role: str
    ) -> float:
        """Calcola premium salariale rispetto al mercato"""
        if not job_salary or not market_avg:
            return 0.5  # Neutrale
        
        job_max = job_salary.get('max', 0)
        market_avg_val = market_avg.get('average', 1)
        
        if market_avg_val == 0:
            return 0.5
        
        premium = (job_max - market_avg_val) / market_avg_val
        
        # Normalizza a 0-1 (premium 50% = 1.0)
        normalized = min(max(premium / 0.5, 0), 1)
        return normalized
    
    def _calculate_skill_rarity(
        self,
        skills: List[str],
        demand_stats: Dict
    ) -> float:
        """Calcola rarità delle skill richieste"""
        if not skills:
            return 0.5
        
        rarity_scores = []
        for skill in skills:
            # Skill con bassa offerta = alta rarità
            supply_ratio = demand_stats.get(skill, {}).get('supply_ratio', 0.5)
            rarity_scores.append(1 - supply_ratio)  # Inverso: meno supply = più raro
        
        return np.mean(rarity_scores) if rarity_scores else 0.5
    
    def _calculate_competition_ratio(
        self,
        applicants: int,
        max_applicants: Optional[int],
        days_posted: int
    ) -> float:
        """
        Calcola ratio competizione (inverted: più basso è meglio)
        Returns: 0-1 dove 1 = poca competizione
        """
        if max_applicants and applicants >= max_applicants:
            return 0.0  # Position filled
        
        # Competition per day
        if days_posted > 0:
            apps_per_day = applicants / days_posted
        else:
            apps_per_day = applicants
        
        # Scale: <5 apps/day = excellent, >50 apps/day = poor
        if apps_per_day < 5:
            return 1.0
        elif apps_per_day > 50:
            return 0.2
        else:
            # Linear interpolation
            return 1.0 - ((apps_per_day - 5) / 45) * 0.8
    
    def _calculate_company_premium(
        self,
        company: Dict,
        ratings: Dict
    ) -> float:
        """Calcola punteggio premium dell'azienda"""
        scores = []
        
        # Rating generale
        rating = company.get('rating', 0)
        if rating > 4.5:
            scores.append(1.0)
        elif rating > 4.0:
            scores.append(0.8)
        elif rating > 3.5:
            scores.append(0.6)
        else:
            scores.append(0.4)
        
        # Dimensione azienda ( FAANG e simili = premium)
        size = company.get('size', '')
        if size in ['10000+', 'Enterprise']:
            scores.append(0.9)
        elif size in ['1000-9999', 'Large']:
            scores.append(0.7)
        else:
            scores.append(0.5)
        
        # Funding/Stage (startup ben finanziate = premium)
        funding = company.get('funding_stage', '')
        if funding in ['IPO', 'Series D+', 'Profitable']:
            scores.append(1.0)
        elif funding in ['Series B', 'Series C']:
            scores.append(0.8)
        else:
            scores.append(0.5)
        
        return np.mean(scores) if scores else 0.5
    
    def _estimate_growth_potential(self, job: Dict) -> float:
        """Stima potenziale di crescita del ruolo"""
        scores = []
        
        # Seniority level
        level = job.get('level', '')
        if level in ['Senior', 'Lead', 'Principal']:
            scores.append(0.9)  # High growth potential
        elif level in ['Mid-level', 'Manager']:
            scores.append(0.7)
        else:
            scores.append(0.5)
        
        # Department
        dept = job.get('department', '')
        high_growth_depts = ['Engineering', 'Product', 'Data', 'AI/ML', 'Research']
        if dept in high_growth_depts:
            scores.append(0.9)
        else:
            scores.append(0.6)
        
        # Mentions of growth in description
        desc = job.get('description', '').lower()
        growth_keywords = ['growth', 'career progression', 'promote', 'develop']
        if any(kw in desc for kw in growth_keywords):
            scores.append(0.8)
        else:
            scores.append(0.5)
        
        return np.mean(scores) if scores else 0.5
    
    def _calculate_timing_urgency(
        self,
        posted_date: Optional[str],
        deadline: Optional[str],
        urgency_indicators: List[str]
    ) -> float:
        """Calcola urgenza di candidatura"""
        urgency = 0.5
        
        # Se c'è deadline imminente
        if deadline:
            try:
                deadline_dt = datetime.fromisoformat(deadline.replace('Z', '+00:00'))
                days_to_deadline = (deadline_dt - datetime.now()).days
                
                if days_to_deadline <= 3:
                    urgency = 1.0
                elif days_to_deadline <= 7:
                    urgency = 0.8
                elif days_to_deadline <= 14:
                    urgency = 0.6
            except:
                pass
        
        # Indicatori di urgenza
        if 'urgent' in urgency_indicators or 'immediate' in urgency_indicators:
            urgency = max(urgency, 0.9)
        
        if 'quick_hire' in urgency_indicators:
            urgency = max(urgency, 0.8)
        
        return urgency
    
    def _calculate_whale_score(self, indicators: WhaleIndicators) -> float:
        """Calcola punteggio whale finale pesato"""
        score = (
            self.WEIGHTS['salary_premium'] * indicators.salary_premium +
            self.WEIGHTS['rarity_score'] * indicators.rarity_score +
            self.WEIGHTS['competition_ratio'] * indicators.competition_ratio +
            self.WEIGHTS['company_premium'] * indicators.company_premium +
            self.WEIGHTS['growth_potential'] * indicators.growth_potential +
            self.WEIGHTS['timing_urgency'] * indicators.timing_urgency
        )
        return score
    
    def _determine_tier(self, whale_score: float) -> str:
        """Determina tier basato sul punteggio"""
        if whale_score >= self.THRESHOLDS['PLATINUM']:
            return 'PLATINUM'
        elif whale_score >= self.THRESHOLDS['GOLD']:
            return 'GOLD'
        else:
            return 'SILVER'
    
    def _generate_whaleness_reasons(
        self,
        indicators: WhaleIndicators,
        job: Dict
    ) -> List[str]:
        """Genera ragioni per cui questo job è un whale"""
        reasons = []
        
        if indicators.salary_premium >= 0.8:
            reasons.append(f"Premium salary: {int(indicators.salary_premium * 50)}% above market")
        
        if indicators.rarity_score >= 0.7:
            rare_skills = job.get('rare_skills_highlighted', [])
            if rare_skills:
                reasons.append(f"Rare skills required: {', '.join(rare_skills[:2])}")
            else:
                reasons.append("High-demand specialized skills")
        
        if indicators.competition_ratio >= 0.8:
            reasons.append("Low competition - high chance of success")
        
        if indicators.company_premium >= 0.8:
            company_name = job.get('company', {}).get('name', 'Company')
            reasons.append(f"Premium employer: {company_name}")
        
        if indicators.growth_potential >= 0.8:
            reasons.append("Excellent career growth trajectory")
        
        if indicators.timing_urgency >= 0.8:
            reasons.append("Urgent hire - apply immediately")
        
        return reasons if reasons else ["Strong overall opportunity match"]
    
    def _recommend_action(
        self,
        whale_score: float,
        tier: str,
        indicators: WhaleIndicators
    ) -> str:
        """Genera azione raccomandata"""
        if tier == 'PLATINUM' and indicators.timing_urgency >= 0.8:
            return "APPLY_IMMEDIATELY"
        elif tier == 'PLATINUM':
            return "APPLY_TODAY"
        elif tier == 'GOLD':
            return "APPLY_THIS_WEEK"
        else:
            return "ADD_TO_PRIORITY_LIST"
    
    def _calculate_urgency(
        self,
        job: Dict,
        indicators: WhaleIndicators
    ) -> Optional[int]:
        """Calcola ore rimanenti prima della scadenza"""
        deadline = job.get('application_deadline')
        if deadline and indicators.timing_urgency >= 0.7:
            try:
                deadline_dt = datetime.fromisoformat(deadline.replace('Z', '+00:00'))
                hours_left = int((deadline_dt - datetime.now()).total_seconds() / 3600)
                return max(hours_left, 1)
            except:
                pass
        return None


# Singleton
_whale_detector = None

def get_whale_detector() -> WhaleDetectionAlgorithm:
    """Get or create singleton whale detector"""
    global _whale_detector
    if _whale_detector is None:
        _whale_detector = WhaleDetectionAlgorithm()
    return _whale_detector
