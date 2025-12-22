import spacy
from typing import Dict, List

# Load spaCy model (assumes en_core_web_sm is installed)
try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    nlp = None
    print("Warning: spaCy model 'en_core_web_sm' not found. Install with: python -m spacy download en_core_web_sm")


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
    Extract potential skills from text using spaCy POS tagging.

    Args:
        text: Input text to extract skills from

    Returns:
        List of unique skill keywords
    """
    if not nlp or not text:
        return []

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


def calculate_ats_score(resume_text: str, jd_text: str, role_config: Dict[str, float] = None) -> Dict:
    """
    Calculate ATS compatibility score based on weighted keyword matching.

    Args:
        resume_text: Extracted text from resume
        jd_text: Extracted text from job description
        role_config: Dictionary of skill weights for the role (optional)

    Returns:
        Dictionary with score, matched skills, and missing skills
    """
    if role_config is None:
        role_config = DEFAULT_ROLE_CONFIG

    resume_skills = extract_skills(resume_text)
    jd_skills = extract_skills(jd_text)

    # Calculate weighted score
    matched_weight = sum(
        role_config.get(skill, 0)
        for skill in resume_skills
        if skill in jd_skills
    )
    total_weight = sum(role_config.values())

    score = (matched_weight / total_weight) * 100 if total_weight > 0 else 0

    # Find matched and missing skills
    matched_skills = [skill for skill in resume_skills if skill in jd_skills]
    missing_skills = [skill for skill in jd_skills if skill not in resume_skills]

    return {
        "score": round(score, 2),
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "total_possible_weight": total_weight,
        "matched_weight": matched_weight
    }