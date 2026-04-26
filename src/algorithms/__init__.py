"""
Find U Job - Algorithms Package
===============================

Core algorithms for AI-powered job matching:

1. consensus.py - NATALIA Adaptive Consensus Engine
2. job_matching.py - Academic Research-based Matching (pLSA, TF-IDF, Semantic)
3. risk_scoring.py - Application Success Prediction
4. whale_detection.py - High-Value Opportunity Identification

Usage:
    from src.algorithms import AcademicJobMatcher, get_consensus_engine
    
    matcher = AcademicJobMatcher()
    result = matcher.comprehensive_match(user_profile, job)
"""

from .consensus import (
    AdaptiveConsensusAlgorithm,
    MultiJobConsensusRanker,
    get_consensus_engine,
    MatchFactor
)

from .job_matching import (
    AcademicJobMatcher,
    ProbabilisticLSA,
    TFIDFMatcher,
    SemanticSkillMatcher,
    create_matcher,
    MatchResult,
    SkillMatch
)

__all__ = [
    # Consensus
    'AdaptiveConsensusAlgorithm',
    'MultiJobConsensusRanker',
    'get_consensus_engine',
    'MatchFactor',
    
    # Job Matching
    'AcademicJobMatcher',
    'ProbabilisticLSA',
    'TFIDFMatcher',
    'SemanticSkillMatcher',
    'create_matcher',
    'MatchResult',
    'SkillMatch',
]
