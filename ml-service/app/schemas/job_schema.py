from pydantic import BaseModel
from typing import List

class JobDescriptionInput(BaseModel):
    title: str
    description: str
    
class JobMatchRequest(BaseModel):
    resume_text: str
    job_description: str
    
class JobMatchResult(BaseModel):
    match_score: float
    matching_skills: List[str]
    missing_skills: List[str]
