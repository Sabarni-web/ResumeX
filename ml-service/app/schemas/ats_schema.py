from pydantic import BaseModel
from typing import List

class ATSScoreRequest(BaseModel):
    resume_text: str
    job_description: str

class ATSScoreResponse(BaseModel):
    ats_score: int
    feedback: List[str]
