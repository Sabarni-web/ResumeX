import re

def check_keyword_density(resume_text: str, jd_text: str):
    """
    Evaluates the density of keywords from the JD in the resume text.
    Penalizes both missing keywords and keyword stuffing.
    """
    score = 100
    feedback = []
    
    # Extremely basic keyword extraction (ideally use NLP here)
    jd_words = set(re.findall(r'\b[a-zA-Z]{5,}\b', jd_text.lower()))
    resume_words = re.findall(r'\b[a-zA-Z]{5,}\b', resume_text.lower())
    
    if not jd_words:
        return {"score": 100, "feedback": ["No keywords found in JD to compare."]}
        
    matched_keywords = {}
    for word in resume_words:
        if word in jd_words:
            matched_keywords[word] = matched_keywords.get(word, 0) + 1
            
    # Calculate coverage
    coverage = len(matched_keywords) / len(jd_words)
    if coverage < 0.3:
        score -= 30
        feedback.append("Low keyword match. Incorporate more relevant terms from the job description.")
    elif coverage > 0.8:
        feedback.append("Excellent keyword coverage.")
        
    # Check for keyword stuffing
    stuffing = [word for word, count in matched_keywords.items() if count > 7]
    if stuffing:
        score -= 20
        feedback.append(f"Possible keyword stuffing detected for: {', '.join(stuffing)}. Use keywords naturally.")
        
    return {
        "score": max(0, score),
        "feedback": feedback
    }
