import re

def check_resume_quality(resume_text: str):
    """
    Evaluates the overall content quality of the resume.
    Checks for action verbs, quantifiable achievements, and concise bullet points.
    """
    score = 100
    feedback = []
    
    # Check for numbers/quantifiable achievements
    numbers = re.findall(r'\b\d+\b', resume_text)
    if len(numbers) < 3:
        score -= 15
        feedback.append("Add more quantifiable achievements (numbers, metrics, percentages) to demonstrate your impact.")
        
    # Check for strong action verbs (simple heuristic)
    action_verbs = ['developed', 'managed', 'led', 'created', 'designed', 'improved', 'increased', 'reduced']
    text_lower = resume_text.lower()
    verbs_used = [v for v in action_verbs if v in text_lower]
    
    if len(verbs_used) < 2:
        score -= 15
        feedback.append("Use more strong action verbs (e.g., 'managed', 'developed', 'improved') at the start of bullet points.")
        
    # Check for overly long paragraphs (heuristic: very long stretches without newlines)
    paragraphs = resume_text.split('\n')
    long_paragraphs = [p for p in paragraphs if len(p.split()) > 40]
    if long_paragraphs:
        score -= 10
        feedback.append("Some sections are too dense. Break long paragraphs into concise bullet points.")
        
    return {
        "score": max(0, score),
        "feedback": feedback
    }
