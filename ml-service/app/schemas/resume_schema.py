from pydantic import BaseModel
from typing import List, Optional

class ResumeUploadResponse(BaseModel):
    message: str
    filename: str
    
class ParsedResumeResult(BaseModel):
    skills: List[str]
    experience: List[str]
    education: List[str]
    raw_text: str
