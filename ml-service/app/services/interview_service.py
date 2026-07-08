from app.answer_evaluator.evaluator import AnswerEvaluator

def evaluate_answer(question: str, answer: str, keywords: list):
    evaluator = AnswerEvaluator()
    return evaluator.evaluate(question, answer, keywords)
