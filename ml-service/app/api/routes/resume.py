from fastapi import APIRouter, UploadFile, File, HTTPException
from app.schemas.resume_schema import ParsedResumeResult
from app.services.resume_service import process_pdf, parse_resume_text

router = APIRouter()

@router.post("/parse", response_model=ParsedResumeResult)
async def parse_resume(file: UploadFile = File(...)):
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")
    
    try:
        text = await process_pdf(file)
        result = parse_resume_text(text)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
