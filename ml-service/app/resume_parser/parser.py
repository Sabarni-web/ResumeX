import spacy
from app.utils.helpers import clean_text

class ResumeParser:
    def __init__(self, nlp_model):
        self.nlp = nlp_model

    def parse(self, text: str):
        doc = self.nlp(text)
        
        skills = []
        experience = []
        education = []
        
        # Extremely basic heuristic parsing (in production, use a trained NER model or LLM)
        for ent in doc.ents:
            if ent.label_ in ['ORG', 'PRODUCT', 'GPE']: # Proxy for skills/tech
                skills.append(ent.text)
            elif ent.label_ == 'DATE':
                experience.append(ent.text)
            elif ent.label_ == 'ORG' and ('university' in ent.text.lower() or 'college' in ent.text.lower()):
                education.append(ent.text)
                
        return {
            "skills": list(set(skills)),
            "experience": list(set(experience)),
            "education": list(set(education)),
            "raw_text": text
        }
