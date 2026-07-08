from fastapi import APIRouter
from app.schemas.interview_schema import AnswerEvaluationRequest, AnswerEvaluationResponse
from app.services.interview_service import evaluate_answer

router = APIRouter()

@router.post("/evaluate", response_model=AnswerEvaluationResponse)
def evaluate(request: AnswerEvaluationRequest):
    result = evaluate_answer(request.question, request.user_answer, request.ideal_keywords)
    return result
