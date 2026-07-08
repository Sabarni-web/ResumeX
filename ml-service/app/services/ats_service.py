from app.ats.ats_score import ATSScoreCalculator

def get_ats_score(resume_text: str, jd_text: str):
    scorer = ATSScoreCalculator()
    return scorer.calculate_overall_score(resume_text, jd_text)
