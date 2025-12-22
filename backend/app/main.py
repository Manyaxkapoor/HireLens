from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse

from .core.config import settings
from .api.scoring import router as scoring_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Explainable Resume Screening Platform API"
)

app.include_router(scoring_router, prefix="/api/v1", tags=["scoring"])


@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}


@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc: HTTPException):
    """Handle HTTP exceptions"""
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail}
    )


@app.exception_handler(Exception)
async def general_exception_handler(request, exc: Exception):
    """Handle general exceptions"""
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"}
    )