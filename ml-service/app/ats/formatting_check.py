import re

def check_formatting(resume_text: str):
    """
    Evaluates the resume's formatting by checking length, 
    presence of key sections, and readability.
    """
    score = 100
    feedback = []
    
    # Check length
    word_count = len(resume_text.split())
    if word_count < 200:
        score -= 20
        feedback.append("Resume is too short. Try to elaborate on your experience.")
    elif word_count > 1000:
        score -= 10
        feedback.append("Resume is quite long. Ensure it is concise and relevant.")
        
    # Check for standard sections
    text_lower = resume_text.lower()
    sections = ['experience', 'education', 'skills']
    missing_sections = [s for s in sections if s not in text_lower]
    
    if missing_sections:
        score -= (10 * len(missing_sections))
        feedback.append(f"Missing key sections: {', '.join(missing_sections).title()}.")
        
    # Check for excessive special characters (bad formatting)
    special_chars = re.sub(r'[a-zA-Z0-9\s]', '', resume_text)
    if len(special_chars) > len(resume_text) * 0.1:
        score -= 15
        feedback.append("Detected excessive special characters. Make sure the text is clean and readable.")
        
    return {
        "score": max(0, score),
        "feedback": feedback
    }
