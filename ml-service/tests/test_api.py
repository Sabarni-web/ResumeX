from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to ResumeX ML Service API"}

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

def test_ats_score():
    response = client.post(
        "/api/v1/ats/score",
        json={
            "resume_text": "I am a frontend developer with experience in React, JavaScript, and Tailwind.",
            "job_description": "Looking for a React developer with frontend skills."
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert "ats_score" in data
    assert "feedback" in data

def test_interview_eval():
    response = client.post(
        "/api/v1/interview/evaluate",
        json={
            "question": "What is React?",
            "user_answer": "React is a JavaScript library for building user interfaces, often used for single-page applications.",
            "ideal_keywords": ["JavaScript", "library", "UI", "single-page"]
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert "score" in data
    assert "strengths" in data
