# ✅ Resumind Deployment Checklist

## Pre-Deployment Checklist
- [x] Project builds successfully
- [x] Git repository initialized
- [x] All files committed
- [x] .gitignore configured
- [x] Environment variables documented

## Step 1: GitHub Repository
- [ ] Go to https://github.com/new
- [ ] Repository name: `resumind`
- [ ] Description: `AI-powered resume analysis and optimization tool`
- [ ] Make it **Public**
- [ ] **Don't** initialize with README
- [ ] Click "Create Repository"

## Step 2: Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/resumind.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy Frontend (Vercel)
- [ ] Go to https://vercel.com
- [ ] Sign up with GitHub
- [ ] Click "New Project"
- [ ] Import `resumind` repository
- [ ] Configure:
  - **Root Directory**: `frontend`
  - **Framework Preset**: Vite
  - **Build Command**: `npm run build`
  - **Output Directory**: `dist`
- [ ] Add Environment Variable:
  - **Name**: `VITE_API`
  - **Value**: `https://your-backend-url.onrender.com` (update after backend deployment)
- [ ] Click "Deploy"
- [ ] **Copy your Vercel URL** (e.g., `https://resumind-abc123.vercel.app`)

## Step 4: Deploy Backend (Render)
- [ ] Go to https://render.com
- [ ] Sign up with GitHub
- [ ] Click "New" → "Web Service"
- [ ] Connect `resumind` repository
- [ ] Configure:
  - **Root Directory**: `backend`
  - **Build Command**: `pip install -r requirements.txt`
  - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- [ ] Add Environment Variables:
  - `SUPABASE_URL`: Your Supabase URL
  - `SUPABASE_SERVICE_KEY`: Your Supabase service key
  - `SUPABASE_BUCKET`: `resumes`
  - `CORS_ORIGINS`: `https://your-frontend-url.vercel.app`
- [ ] Click "Create Web Service"
- [ ] **Copy your Render URL** (e.g., `https://resumind-backend.onrender.com`)

## Step 5: Update URLs
- [ ] Update Render CORS_ORIGINS with your Vercel URL
- [ ] Update Vercel VITE_API with your Render URL
- [ ] Redeploy both services

## Step 6: Test Deployment
- [ ] Visit your Vercel URL
- [ ] Test resume upload
- [ ] Test job description analysis
- [ ] Test ATS compliance check
- [ ] Test all navigation

## Troubleshooting
- **Build fails**: Check console logs
- **CORS errors**: Verify CORS_ORIGINS includes your frontend URL
- **File upload fails**: Check Supabase credentials
- **Environment variables**: Ensure all required variables are set

## Support
If you encounter issues:
1. Check deployment logs
2. Verify environment variables
3. Test API endpoints directly
4. Check browser console for errors
