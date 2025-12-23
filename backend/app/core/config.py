from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = "ATSense AI"
    VERSION: str = "0.1.0"
    ENV: str = "development"
    JWT_SECRET: str = "hirelens_dev_secret_key"
    DATABASE_URL: str = "postgresql://postgres:postgres@db:5432/hirelens"
    BACKEND_HOST: str = "0.0.0.0"
    BACKEND_PORT: int = 8000

    class Config:
        env_file = ".env"


settings = Settings()