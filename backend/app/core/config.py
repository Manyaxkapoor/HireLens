from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = "ATSense AI"
    VERSION: str = "0.1.0"
    # Add database and other configs as needed

    class Config:
        env_file = ".env"


settings = Settings()