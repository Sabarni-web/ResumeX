import spacy
import fitz  # PyMuPDF
from fastapi import UploadFile
from app.resume_parser.parser import ResumeParser

# Load spacy lazily
nlp = None

def get_nlp():
    global nlp
    if nlp is None:
        try:
            nlp = spacy.load("en_core_web_sm")
        except:
            spacy.cli.download("en_core_web_sm")
            nlp = spacy.load("en_core_web_sm")
    return nlp

async def process_pdf(file: UploadFile) -> str:
    content = await file.read()
    doc = fitz.open(stream=content, filetype="pdf")
    text = ""
    for page in doc:
        text += page.get_text()
    return text

def parse_resume_text(text: str):
    parser = ResumeParser(get_nlp())
    return parser.parse(text)
