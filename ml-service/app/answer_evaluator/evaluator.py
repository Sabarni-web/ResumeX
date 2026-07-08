from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from app.utils.helpers import clean_text

class AnswerEvaluator:
    def __init__(self):
        self.vectorizer = TfidfVectorizer(stop_words='english')

    def evaluate(self, question: str, answer: str, keywords: list):
        clean_ans = clean_text(answer)
        
        # Evaluate length
        words = clean_ans.split()
        if len(words) < 20:
            return {
                "score": 3,
                "strengths": [],
                "weaknesses": ["Answer is too short. Try to elaborate using the STAR method."],
                "feedback": "Your answer lacks depth. Provide specific examples."
            }
            
        # Keyword matching
        matched_keywords = [kw for kw in keywords if kw.lower() in clean_ans]
        score = 5 + (len(matched_keywords) / max(1, len(keywords))) * 5
        score = min(10, int(score))
        
        return {
            "score": score,
            "strengths": [f"Mentioned relevant keyword: {kw}" for kw in matched_keywords],
            "weaknesses": [f"Missed keyword: {kw}" for kw in keywords if kw not in matched_keywords],
            "feedback": "Good effort. Try to cover all technical keywords mentioned in the prompt."
        }
