from pydantic_settings import BaseSettings
import os


class Settings(BaseSettings):
    PROJECT_NAME: str = "HireLens"
    VERSION: str = "1.0.0"
    ENV: str = "development"
    JWT_SECRET: str = "hirelens_dev_secret_key"
    DATABASE_URL: str = "postgresql://postgres:postgres@db:5432/hirelens"
    BACKEND_HOST: str = "0.0.0.0"
    BACKEND_PORT: int = 8000
    ALLOWED_ORIGINS: str = "http://localhost:3000,http://localhost:3001"

    @property
    def cors_origins(self) -> list:
        """Parse ALLOWED_ORIGINS string into list"""
        return [origin.strip() for origin in self.ALLOWED_ORIGINS.split(",")]

    class Config:
        env_file = ".env"


settings = Settings()