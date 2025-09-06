import uuid, os
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from .config import CORS_ORIGINS, SUPABASE_BUCKET
from .supabase_client import supabase
from .models import UploadResponse, AnalyzeRequest, AnalyzeResponse, TailorQuery
from .parsers import parse_resume
from .analyzer import extract_keywords, build_suggestions
from .generators import make_docx, make_pdf
from io import BytesIO

app = FastAPI(title="Resumind API", version="0.1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS or ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"ok": True}

# 1) Upload resume (store file in Storage, text in Postgres)
# 1) Upload resume (store file in Storage, text in Postgres)
@app.post("/api/upload", response_model=UploadResponse)
async def upload_resume(file: UploadFile = File(...)):
    raw = await file.read()

    try:
        text, mimetype = parse_resume(file.filename, raw)  # returns (text, mimetype)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    doc_id = str(uuid.uuid4())
    user_id = "demo-user"
    storage_path = f"resumes/{user_id}/{doc_id}/{file.filename}"

    # ---- FIX: httpx headers must be strings ----
    # Use a safe fallback for content-type and make "upsert" a string header.
    content_type = str(mimetype or "application/octet-stream")

    try:
        supabase.storage.from_(SUPABASE_BUCKET).upload(
            path=storage_path,
            file=raw,
            file_options={
                "content-type": content_type,  # must be a string
                "x-upsert": "true",           # must be a string (not True)
                # optional: "cache-control": "3600"
            },
        )
    except Exception as e:
        # surfaces storage errors (e.g., wrong bucket name, bad credentials)
        raise HTTPException(status_code=500, detail=f"Storage upload failed: {e}")

    # Insert metadata + parsed text in Postgres
    try:
        supabase.table("resumes").insert({
            "id": doc_id,
            "user_id": user_id,
            "file_name": file.filename,
            "mime_type": content_type,
            "storage_path": storage_path,
            "parsed_text": text,
            "characters": len(text),
        }).execute()
    except Exception as e:
        # If DB insert fails, you could optionally delete the uploaded blob to keep things tidy
        # _ = supabase.storage.from_(SUPABASE_BUCKET).remove([storage_path])
        raise HTTPException(status_code=500, detail=f"Database insert failed: {e}")

    return UploadResponse(resume_id=doc_id, message="Uploaded & parsed")


# 2) Analyze (resume + pasted JD)
@app.post("/api/analyze", response_model=AnalyzeResponse)
def analyze(req: AnalyzeRequest):
    res = supabase.table("resumes").select("parsed_text").eq("id", req.resume_id).single().execute()
    if not res.data: raise HTTPException(404, "Resume not found")
    resume_text = res.data["parsed_text"]

    kw = extract_keywords(req.jd_text, resume_text)
    suggestions = build_suggestions(kw["missing"], kw["matched"])

    analysis_id = str(uuid.uuid4())
    supabase.table("analyses").insert({
        "id": analysis_id,
        "resume_id": req.resume_id,
        "job_title": req.job_title or None,
        "jd_text": req.jd_text,
        "matched_keywords": kw["matched"],
        "missing_keywords": kw["missing"],
        "suggestions": suggestions
    }).execute()

    return AnalyzeResponse(
        analysis_id=analysis_id,
        job_title=req.job_title,
        matched_keywords=kw["matched"],
        missing_keywords=kw["missing"],
        suggestions=suggestions
    )

# 3) Download tailored resume (docx/pdf)
@app.get("/api/download/{analysis_id}")
def download(analysis_id: str, format: str = "docx"):
    an = supabase.table("analyses").select("*").eq("id", analysis_id).single().execute()
    if not an.data: raise HTTPException(404, "Analysis not found")
    resume_row = supabase.table("resumes").select("parsed_text").eq("id", an.data["resume_id"]).single().execute()
    resume_text = resume_row.data["parsed_text"]

    job_title = an.data.get("job_title")
    suggestions = an.data.get("suggestions") or {}

    if format == "pdf":
        blob = make_pdf(resume_text, job_title, suggestions)
        media = "application/pdf"; fname = "tailored_resume.pdf"
    else:
        blob = make_docx(resume_text, job_title, suggestions)
        media = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        fname = "tailored_resume.docx"

    return StreamingResponse(BytesIO(blob), media_type=media, headers={
        "Content-Disposition": f'attachment; filename="{fname}"'
    })
