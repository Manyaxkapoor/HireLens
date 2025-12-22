from typing import Dict, List


def generate_explanations(score_result: Dict, role: str = "backend developer") -> List[str]:
    """
    Generate human-readable explanations for ATS score and skill gaps.

    Args:
        score_result: Result from calculate_ats_score
        role: Job role for context

    Returns:
        List of explanation strings
    """
    explanations = []

    combined_score = score_result.get("combined_score", 0)
    keyword_score = score_result.get("keyword_score", 0)
    semantic_score = score_result.get("semantic_score", 0)
    missing_skills = score_result.get("missing_skills", [])
    matched_skills = score_result.get("matched_skills", [])

    # Overall score explanation
    if combined_score >= 80:
        explanations.append(f"Excellent match! Your resume scored {combined_score:.1f}% overall compatibility for a {role} position.")
    elif combined_score >= 60:
        explanations.append(f"Good match with room for improvement. Your resume scored {combined_score:.1f}% overall compatibility.")
    elif combined_score >= 40:
        explanations.append(f"Moderate match. Your resume scored {combined_score:.1f}% - consider addressing the gaps below.")
    else:
        explanations.append(f"Significant gaps identified. Your resume scored {combined_score:.1f}% - focus on the missing skills listed.")

    # Keyword vs semantic breakdown
    if keyword_score > semantic_score + 10:
        explanations.append("Strong keyword matching but lower semantic alignment suggests you have the right terms but may need better context or examples.")
    elif semantic_score > keyword_score + 10:
        explanations.append("Good semantic understanding but missing key terms - consider incorporating more industry-specific keywords.")

    # Missing skills explanations
    if missing_skills:
        explanations.append(f"Identified {len(missing_skills)} missing or weak skills that could improve your ATS score:")
        for skill in missing_skills[:5]:  # Limit to top 5 for readability
            explanations.append(f"• '{skill}' - Important for {role} roles; consider adding relevant experience or projects")
    else:
        explanations.append("Great job covering most required skills! Your resume demonstrates strong technical alignment.")

    # Matched skills positive feedback
    if matched_skills:
        top_matches = matched_skills[:3]
        explanations.append(f"Strong matches found: {', '.join(top_matches)} - these are working in your favor!")

    # Semantic similarity insights
    if semantic_score < 50:
        explanations.append("Low semantic similarity indicates your resume content may not closely align with job expectations. Consider tailoring your experience descriptions.")

    return explanations


def identify_weak_skills(score_result: Dict, threshold: float = 0.3) -> List[str]:
    """
    Identify skills that are present but may be underrepresented.

    Args:
        score_result: Result from calculate_ats_score
        threshold: Minimum weight ratio to consider as weak

    Returns:
        List of potentially weak skills
    """
    # This is a placeholder for more advanced weak skill detection
    # Could be enhanced with frequency analysis or section-specific scoring
    matched_skills = score_result.get("matched_skills", [])
    total_weight = score_result.get("total_possible_weight", 1)

    # For now, consider all matched skills as adequately represented
    # Future enhancement: analyze skill frequency in text
    return []  # No weak skills identified with current logic