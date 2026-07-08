# pyrefly: ignore [missing-import]
from pydantic import BaseModel
from typing import List

class AnswerEvaluationRequest(BaseModel):
    question: str
    user_answer: str
    ideal_keywords: List[str] = []

class AnswerEvaluationResponse(BaseModel):
    score: int
    strengths: List[str]
    weaknesses: List[str]
    feedback: str
