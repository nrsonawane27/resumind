from pydantic import BaseModel
from typing import List, Dict, Optional

class UploadResponse(BaseModel):
    resume_id: str
    message: str

class AnalyzeRequest(BaseModel):
    resume_id: str
    job_title: Optional[str] = None
    jd_text: str

class AnalyzeResponse(BaseModel):
    analysis_id: str
    job_title: Optional[str]
    matched_keywords: List[str]
    missing_keywords: List[str]
    suggestions: Dict[str, list]

class TailorQuery(BaseModel):
    analysis_id: str
    format: str = "docx"  # or "pdf"
