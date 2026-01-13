import re
from typing import Dict, List
from sentence_transformers import SentenceTransformer, util

# Try to load spaCy model (optional)
try:
    import spacy
    nlp = spacy.load("en_core_web_sm")
    SPACY_AVAILABLE = True
except (OSError, ImportError, Exception):
    spacy = None
    nlp = None
    SPACY_AVAILABLE = False
    print("Warning: spaCy model 'en_core_web_sm' not found. Using fallback text processing.")

# Load sentence transformer model
try:
    model = SentenceTransformer('all-MiniLM-L6-v2')
except Exception:
    model = None
    print("Warning: SentenceTransformer model not loaded. Semantic similarity will be disabled.")


# Default role configuration for backend developer (can be extended for other roles)
DEFAULT_ROLE_CONFIG = {
    "python": 10,
    "javascript": 8,
    "sql": 9,
    "react": 7,
    "api": 6,
    "database": 6,
    "git": 4,
    "docker": 5,
    "aws": 5,
    "rest": 6,
    "json": 3,
    "html": 3,
    "css": 3,
    "linux": 4,
    "testing": 5,
    "agile": 4,
}


def extract_skills(text: str) -> List[str]:
    """
    Extract potential skills from text using spaCy POS tagging or fallback regex.

    Args:
        text: Input text to extract skills from

    Returns:
        List of unique skill keywords
    """
    if not text:
        return []

    if SPACY_AVAILABLE and nlp:
        # Use spaCy for advanced NLP processing
        doc = nlp(text.lower())
        skills = [
            token.lemma_
            for token in doc
            if token.pos_ in ['NOUN', 'PROPN', 'ADJ']
            and not token.is_stop
            and len(token.lemma_) > 2
            and token.lemma_.isalnum()
        ]
        return list(set(skills))
    else:
        # Fallback: simple regex-based extraction
        text_lower = text.lower()
        # Common technical skills and keywords
        skill_patterns = [
            r'\b(python|javascript|java|c\+\+|c#|ruby|php|go|rust|typescript|swift|kotlin)\b',
            r'\b(react|angular|vue|django|flask|fastapi|spring|express|laravel)\b',
            r'\b(sql|mysql|postgresql|mongodb|redis|elasticsearch|cassandra)\b',
            r'\b(aws|azure|gcp|docker|kubernetes|jenkins|git|linux|windows)\b',
            r'\b(html|css|sass|scss|bootstrap|tailwind)\b',
            r'\b(machine learning|ai|nlp|computer vision|deep learning)\b',
            r'\b(api|rest|graphql|microservices|serverless)\b'
        ]

        skills = []
        for pattern in skill_patterns:
            matches = re.findall(pattern, text_lower)
            skills.extend(matches)

        # Also extract capitalized words that might be technologies
        cap_words = re.findall(r'\b[A-Z][a-zA-Z0-9]*\b', text)
        skills.extend([word.lower() for word in cap_words if len(word) > 2])

        return list(set(skills))


def compute_semantic_similarity(text1: str, text2: str) -> float:
    """
    Compute semantic similarity between two texts using sentence embeddings.

    Args:
        text1: First text
        text2: Second text

    Returns:
        Similarity score as percentage (0-100)
    """
    if not model or not text1 or not text2:
        return 0.0

    embeddings = model.encode([text1, text2])
    similarity = util.cos_sim(embeddings[0], embeddings[1]).item()
    return similarity * 100


def calculate_ats_score(resume_text: str, jd_text: str, role_config: Dict[str, float] = None) -> Dict:
    """
    Calculate ATS compatibility score combining keyword matching and semantic similarity.

    Args:
        resume_text: Extracted text from resume
        jd_text: Extracted text from job description
        role_config: Dictionary of skill weights for the role (optional)

    Returns:
        Dictionary with keyword score, semantic score, combined score, and skill analysis
    """
    if role_config is None:
        role_config = DEFAULT_ROLE_CONFIG

    resume_skills = extract_skills(resume_text)
    jd_skills = extract_skills(jd_text)

    # Calculate keyword-based score
    matched_weight = sum(
        role_config.get(skill, 0)
        for skill in resume_skills
        if skill in jd_skills
    )
    total_weight = sum(role_config.values())

    keyword_score = (matched_weight / total_weight) * 100 if total_weight > 0 else 0

    # Calculate semantic similarity
    semantic_score = compute_semantic_similarity(resume_text, jd_text)

    # Combine scores (60% keyword, 40% semantic)
    combined_score = (keyword_score * 0.6) + (semantic_score * 0.4)

    # Find matched and missing skills
    matched_skills = [skill for skill in resume_skills if skill in jd_skills]
    missing_skills = [skill for skill in jd_skills if skill not in resume_skills]

    return {
        "keyword_score": round(keyword_score, 2),
        "semantic_score": round(semantic_score, 2),
        "combined_score": round(combined_score, 2),
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "total_possible_weight": total_weight,
        "matched_weight": matched_weight
    }