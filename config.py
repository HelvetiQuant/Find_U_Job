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
    
    # Railway Configuration
    RAILWAY_TOKEN = os.getenv("RAILWAY_TOKEN", "")
    RAILWAY_PROJECT_ID = os.getenv("RAILWAY_PROJECT_ID", "")
    
    # Production Configuration
    PORT = int(os.getenv("PORT", "8000"))
    ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
    
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
    def get_railway_config(cls):
        """Get Railway configuration as dictionary"""
        return {
            "token": cls.RAILWAY_TOKEN,
            "project_id": cls.RAILWAY_PROJECT_ID
        }
    
    @classmethod
    def get_production_config(cls):
        """Get production configuration as dictionary"""
        return {
            "port": cls.PORT,
            "environment": cls.ENVIRONMENT
        }
    
    @classmethod
    def validate_github_config(cls):
        """Validate GitHub configuration"""
        if not cls.GITHUB_TOKEN:
            raise ValueError("GITHUB_TOKEN not configured")
        if not cls.GITHUB_USERNAME:
            raise ValueError("GITHUB_USERNAME not configured")
        return True
    
    @classmethod
    def validate_railway_config(cls):
        """Validate Railway configuration"""
        if not cls.RAILWAY_TOKEN:
            raise ValueError("RAILWAY_TOKEN not configured")
        return True
    
    @classmethod
    def is_production(cls):
        """Check if running in production"""
        return cls.ENVIRONMENT == "production"
