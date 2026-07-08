from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from app.utils.helpers import clean_text

class JobMatcher:
    def __init__(self):
        self.vectorizer = TfidfVectorizer(stop_words='english')

    def calculate_match(self, resume_text: str, jd_text: str):
        clean_resume = clean_text(resume_text)
        clean_jd = clean_text(jd_text)
        
        if not clean_resume or not clean_jd:
            return 0.0
            
        tfidf_matrix = self.vectorizer.fit_transform([clean_resume, clean_jd])
        cosine_sim = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])
        score = cosine_sim[0][0] * 100
        
        return round(score, 2)
