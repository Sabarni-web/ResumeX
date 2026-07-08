# pyrefly: ignore [missing-import]
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "ResumeX ML Service"
    API_V1_STR: str = "/api/v1"
    
    # ML Models config
    SPACY_MODEL: str = "en_core_web_sm"

    # Env vars
    ENVIRONMENT: str = "development"
    LOG_LEVEL: str = "info"
    HOST: str = "0.0.0.0"
    PORT: int = 8000

    model_config = {
        "env_file": ".env",
        "extra": "ignore"
    }

settings = Settings()
