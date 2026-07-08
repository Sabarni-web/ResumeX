from fastapi import APIRouter
from app.schemas.ats_schema import ATSScoreRequest, ATSScoreResponse
from app.services.ats_service import get_ats_score

router = APIRouter()

@router.post("/score", response_model=ATSScoreResponse)
def score_resume(request: ATSScoreRequest):
    result = get_ats_score(request.resume_text, request.job_description)
    return result
