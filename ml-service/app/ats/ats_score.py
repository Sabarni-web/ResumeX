from app.ats.formatting_check import check_formatting
from app.ats.keyword_density import check_keyword_density
from app.ats.resume_quality_checks import check_resume_quality
from app.job_matcher.matcher import JobMatcher

class ATSScoreCalculator:
    def __init__(self):
        self.matcher = JobMatcher()

    def calculate_overall_score(self, resume_text: str, jd_text: str):
        # 1. Base Similarity Match (from scikit-learn)
        base_match = self.matcher.calculate_match(resume_text, jd_text)
        
        # 2. Formatting Check
        format_results = check_formatting(resume_text)
        
        # 3. Keyword Density Check
        keyword_results = check_keyword_density(resume_text, jd_text)
        
        # 4. Quality Check
        quality_results = check_resume_quality(resume_text)
        
        # Aggregate Score (Weighted)
        # Similarity: 40%, Formatting: 20%, Keywords: 20%, Quality: 20%
        final_score = (
            (base_match * 0.4) +
            (format_results["score"] * 0.2) +
            (keyword_results["score"] * 0.2) +
            (quality_results["score"] * 0.2)
        )
        
        # Aggregate Feedback
        all_feedback = []
        all_feedback.extend(format_results["feedback"])
        all_feedback.extend(keyword_results["feedback"])
        all_feedback.extend(quality_results["feedback"])
        
        if base_match < 50:
            all_feedback.append("Your resume text has low semantic similarity to the job description.")
            
        return {
            "ats_score": min(100, int(final_score)),
            "feedback": all_feedback
        }
