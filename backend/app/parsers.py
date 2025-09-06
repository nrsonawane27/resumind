import io, os, re
from typing import Tuple
from pdfminer.high_level import extract_text as pdf_extract_text
from docx import Document

EMAIL_RE = re.compile(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}")
PHONE_RE = re.compile(r"(\+?\d[\d\-\s()]{7,}\d)")

def parse_resume(filename: str, content: bytes) -> Tuple[str, str]:
    """Return (text, mimetype). Support PDF/DOCX/TXT."""
    ext = os.path.splitext(filename)[1].lower()
    if ext == ".pdf":
        text = pdf_extract_text(io.BytesIO(content)) or ""
        return text, "application/pdf"
    if ext == ".docx":
        doc = Document(io.BytesIO(content))
        text = "\n".join(p.text for p in doc.paragraphs)
        return text, "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    if ext == ".txt":
        return content.decode("utf-8", errors="ignore"), "text/plain"
    raise ValueError("Unsupported file type. Use PDF, DOCX, or TXT.")

def quick_contacts(text: str):
    email = EMAIL_RE.search(text)
    phone = PHONE_RE.search(text)
    return (email.group(0) if email else None, phone.group(0) if phone else None)
