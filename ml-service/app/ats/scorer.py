from app.job_matcher.matcher import JobMatcher

class ATSScorer:
    def __init__(self):
        self.matcher = JobMatcher()

    def score_resume(self, resume_text: str, jd_text: str):
        # Heuristic ATS scoring based on tf-idf match + keywords
        base_match = self.matcher.calculate_match(resume_text, jd_text)
        
        # Penalties/Bonuses can go here
        feedback = []
        if base_match < 50:
            feedback.append("Consider adding more keywords directly from the job description.")
        else:
            feedback.append("Good keyword overlap with the job description.")
            
        return {
            "ats_score": int(base_match),
            "feedback": feedback
        }
