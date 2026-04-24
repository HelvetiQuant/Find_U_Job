# ======================================================
# CONFIGURATION MANAGER
# ======================================================

import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class Config:
    """Configuration class for the application"""
    
    # Ollama Configuration
    OLLAMA_API_URL = os.getenv("OLLAMA_API_URL", "http://localhost:11434")
    OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "mistral")
    OLLAMA_SSH_KEY = os.getenv("OLLAMA_SSH_KEY", "")
    
    # Database
    DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///saas.db")
    
    # GitHub Configuration
    GITHUB_TOKEN = os.getenv("GITHUB_TOKEN", "")
    GITHUB_USERNAME = os.getenv("GITHUB_USERNAME", "")
    
    @classmethod
    def get_ollama_config(cls):
        """Get Ollama configuration as dictionary"""
        return {
            "api_url": cls.OLLAMA_API_URL,
            "model": cls.OLLAMA_MODEL,
            "ssh_key": cls.OLLAMA_SSH_KEY
        }
    
    @classmethod
    def get_github_config(cls):
        """Get GitHub configuration as dictionary"""
        return {
            "token": cls.GITHUB_TOKEN,
            "username": cls.GITHUB_USERNAME
        }
    
    @classmethod
    def validate_ollama_config(cls):
        """Validate Ollama configuration"""
        if not cls.OLLAMA_API_URL:
            raise ValueError("OLLAMA_API_URL not configured")
        if not cls.OLLAMA_MODEL:
            raise ValueError("OLLAMA_MODEL not configured")
        return True
    
    @classmethod
    def validate_github_config(cls):
        """Validate GitHub configuration"""
        if not cls.GITHUB_TOKEN:
            raise ValueError("GITHUB_TOKEN not configured")
        if not cls.GITHUB_USERNAME:
            raise ValueError("GITHUB_USERNAME not configured")
        return True
