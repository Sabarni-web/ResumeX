# Section headers commonly found in resumes
RESUME_SECTIONS = [
    "education", "experience", "work experience", "professional experience",
    "skills", "technical skills", "projects", "certifications",
    "achievements", "awards", "summary", "objective", "profile",
    "publications", "languages", "hobbies", "interests",
    "volunteer", "references", "training", "courses",
]

# Question types
QUESTION_TYPES = ["technical", "hr", "project", "behavioral"]

# Difficulty levels
DIFFICULTY_LEVELS = ["easy", "medium", "hard"]

# Scoring weights
ATS_WEIGHTS = {
    "formatting": 0.2,
    "keyword_density": 0.3,
    "section_completeness": 0.3,
    "readability": 0.2,
}

JOB_MATCH_WEIGHTS = {
    "keyword_match": 0.4,
    "semantic_similarity": 0.4,
    "experience_match": 0.2,
}

ANSWER_EVAL_WEIGHTS = {
    "relevance": 0.25,
    "completeness": 0.25,
    "technical_depth": 0.25,
    "grammar": 0.15,
    "confidence": 0.10,
}

# Required resume sections for ATS
REQUIRED_SECTIONS = ["education", "experience", "skills"]

# Common tech skills dictionary categories
SKILL_CATEGORIES = {
    "programming_languages": [
        "python", "java", "javascript", "typescript", "c++", "c#", "c",
        "ruby", "go", "rust", "swift", "kotlin", "php", "scala", "r",
        "matlab", "perl", "dart", "lua", "haskell",
    ],
    "web_frameworks": [
        "react", "angular", "vue", "next.js", "nuxt", "express", "django",
        "flask", "fastapi", "spring", "spring boot", "rails", "laravel",
        "asp.net", "svelte", "gatsby", "remix",
    ],
    "databases": [
        "mysql", "postgresql", "mongodb", "redis", "sqlite", "oracle",
        "cassandra", "dynamodb", "firebase", "elasticsearch", "neo4j",
        "couchdb", "mariadb", "mssql",
    ],
    "cloud_devops": [
        "aws", "azure", "gcp", "docker", "kubernetes", "terraform",
        "jenkins", "github actions", "gitlab ci", "circleci", "ansible",
        "nginx", "apache", "linux", "bash",
    ],
    "data_ml": [
        "tensorflow", "pytorch", "scikit-learn", "pandas", "numpy",
        "keras", "opencv", "nltk", "spacy", "hugging face",
        "machine learning", "deep learning", "nlp", "computer vision",
        "data analysis", "data science", "tableau", "power bi",
    ],
    "tools": [
        "git", "github", "gitlab", "bitbucket", "jira", "confluence",
        "slack", "figma", "postman", "vs code", "intellij", "vim",
        "webpack", "vite", "babel", "npm", "yarn", "pip",
    ],
}
