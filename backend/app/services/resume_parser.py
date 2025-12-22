import re
import pdfplumber


def extract_text_from_pdf(file_path: str) -> str:
    """
    Extract text from a PDF file.

    Args:
        file_path: Path to the PDF file

    Returns:
        Extracted and normalized text, or empty string if extraction fails
    """
    try:
        with pdfplumber.open(file_path) as pdf:
            text = ""
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
        return normalize_text(text)
    except Exception:
        # Handle malformed PDFs gracefully by returning empty string
        return ""


def normalize_text(text: str) -> str:
    """
    Normalize and clean extracted text.

    Args:
        text: Raw extracted text

    Returns:
        Cleaned and normalized text
    """
    if not text:
        return ""

    # Remove extra whitespace and normalize spaces
    text = re.sub(r'\s+', ' ', text)

    # Remove leading/trailing whitespace
    text = text.strip()

    return text