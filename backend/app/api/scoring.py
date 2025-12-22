import os
import tempfile
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import Dict

from ..services.resume_parser import extract_text_from_pdf
from ..services.ats_scorer import calculate_ats_score
from ..services.explanation_generator import generate_explanations

router = APIRouter()


@router.post("/score", response_model=Dict)
async def score_resume(
    resume: UploadFile = File(...),
    job_description: str = Form(...),
    role: str = Form("backend developer")
):
    """
    Score resume against job description and provide explainable feedback.

    Args:
        resume: PDF resume file
        job_description: Job description text
        role: Job role for context (default: backend developer)

    Returns:
        Scoring results with explanations
    """
    if not resume.filename.lower().endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")

    # Extract text from uploaded resume
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp_file:
            content = await resume.read()
            tmp_file.write(content)
            tmp_path = tmp_file.name

        resume_text = extract_text_from_pdf(tmp_path)

        # Clean up temp file
        os.unlink(tmp_path)

        if not resume_text:
            raise HTTPException(status_code=400, detail="Could not extract text from resume")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing resume: {str(e)}")

    # Calculate ATS score
    try:
        score_result = calculate_ats_score(resume_text, job_description)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error calculating score: {str(e)}")

    # Generate explanations
    try:
        explanations = generate_explanations(score_result, role)
    except Exception as e:
        explanations = ["Error generating explanations"]

    # Return combined result
    return {
        **score_result,
        "explanations": explanations,
        "role": role
    }