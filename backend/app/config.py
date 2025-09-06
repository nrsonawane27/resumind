import os
from dotenv import load_dotenv
load_dotenv()


load_dotenv()


SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_KEY", "")
SUPABASE_BUCKET = os.getenv("SUPABASE_BUCKET", "resumes")
CORS_ORIGINS = [o.strip() for o in os.getenv("CORS_ORIGINS", "").split(",") if o.strip()] + [
    "https://your-frontend-url.vercel.app",
    "https://resumind.vercel.app",
    "https://your-frontend-url.netlify.app",
    "https://*.vercel.app",
    "https://*.railway.app"
]
print("SUPABASE_URL:", SUPABASE_URL)
