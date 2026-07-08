# pyrefly: ignore [missing-import]
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings

from app.api.routes import resume, ats, interview

app = FastAPI(title=settings.PROJECT_NAME, description="FastAPI service for Resume parsing and ML matching")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(resume.router, prefix=f"{settings.API_V1_STR}/resume", tags=["Resume"])
app.include_router(ats.router, prefix=f"{settings.API_V1_STR}/ats", tags=["ATS"])
app.include_router(interview.router, prefix=f"{settings.API_V1_STR}/interview", tags=["Interview"])

@app.get("/")
def read_root():
    return {"message": "Welcome to ResumeX ML Service API"}

@app.get("/health")
def health_check():
    return {"status": "ok"}
