What is the work of ResumeX?

ResumeX is an AI-powered career preparation platform that helps students, fresh graduates, and job seekers improve their resumes, evaluate their job readiness, and prepare for interviews using Artificial Intelligence.

Workflow of ResumeX
1. User Registration & Login
Users create an account and log in securely.
Their resumes, reports, and interview history are stored in their profile.
2. Resume Upload
The user uploads a resume in PDF or DOCX format.
The system extracts the text from the resume.
3. AI Resume Analysis (Python)

The AI analyzes the resume and extracts:

Personal Information
Technical Skills
Education
Work Experience
Projects
Certifications
Languages

The extracted data is then stored in MongoDB.

4. Job Description Matching

The user pastes a job description.

The AI compares the resume with the job description and provides:

Job Match Percentage (e.g., 85%)
Matching Skills
Missing Skills
Strengths
Weaknesses
Improvement Suggestions
5. ATS Resume Score

ResumeX checks whether the resume is ATS-friendly by analyzing:

Resume structure
Keywords
Section headings
Formatting
Skill relevance

The user receives:

ATS Score
Missing Keywords
Formatting Suggestions
Resume Improvement Tips
6. AI Mock Interview

Based on:

Resume
Skills
Projects
Job Role
Job Description

The AI generates personalized:

Technical Questions
HR Questions
Project-Based Questions
Behavioral Questions
7. Answer Evaluation

The user answers the interview questions.

The AI evaluates answers based on:

Relevance
Technical Accuracy
Completeness
Grammar
Communication Quality

The system provides:

Individual Scores
Overall Interview Score
Detailed Feedback
Suggestions for Better Answers
8. Dashboard

The dashboard displays:

Resume Analysis
ATS Score
Job Match Reports
Interview Scores
Skill Gap Analysis
Previous Interview History
Progress Over Time
MERN + Python Collaboration
MERN Stack
React.js: User interface
Node.js & Express.js: Authentication, APIs, file handling
MongoDB: Stores users, resumes, reports, and interview history
Python AI Service
Resume Parsing
NLP-based Skill Extraction
Job Description Matching
ATS Scoring
Interview Question Generation
Answer Evaluation

Node.js communicates with the Python service through REST APIs and returns the AI-generated results to the frontend.

Overall Flow
User Registers/Login
        │
        ▼
Upload Resume (PDF/DOCX)
        │
        ▼
Python Extracts Resume Information
        │
        ▼
Resume Stored in MongoDB
        │
        ▼
Paste Job Description
        │
        ▼
AI Compares Resume with JD
        │
        ▼
Generate Match Score + Skill Gap + ATS Score
        │
        ▼
Generate Personalized Interview Questions
        │
        ▼
User Answers Questions
        │
        ▼
AI Evaluates Answers
        │
        ▼
Generate Feedback & Interview Score
        │
        ▼
Display Dashboard with Reports & Progress
Real-World Problem Solved

ResumeX solves several common problems faced by job seekers:

📄 Poor Resume Quality: Helps users improve resumes with AI-generated suggestions.
🎯 Job-Specific Resume Matching: Shows how well a resume fits a particular job and identifies missing skills.
🤖 ATS Optimization: Improves the chances of passing Applicant Tracking Systems used by recruiters.
💬 Personalized Interview Preparation: Generates interview questions based on the user's own resume instead of generic question banks.
📊 Performance Tracking: Allows users to monitor their resume quality, interview scores, and improvement over time.
End Goal


Developed by **Urmi Paul** and **Sabarni Mukherjee** .

The primary goal of ResumeX is to provide an all-in-one AI-powered platform where users can build stronger resumes, identify skill gaps, optimize for ATS, practice personalized interviews, receive intelligent feedback, and improve their chances of securing internships and jobs. This makes it a practical, real-world project that combines full-stack web development (MERN) with AI, NLP, and machine learning (Python).
