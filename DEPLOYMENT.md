# 🚀 Resumind Deployment Guide

## 100% FREE Deployment Options

### Option 1: Vercel (Frontend) + Render (Backend) - RECOMMENDED

#### Frontend Deployment (Vercel)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/resumind.git
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Set **Root Directory** to `frontend`
   - Add Environment Variable: `VITE_API` = `https://your-backend-url.onrender.com`
   - Click "Deploy"

#### Backend Deployment (Render)

1. **Deploy to Render:**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Set **Root Directory** to `backend`
   - Set **Build Command** to `pip install -r requirements.txt`
   - Set **Start Command** to `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - Add Environment Variables:
     ```
     SUPABASE_URL=your_supabase_url
     SUPABASE_SERVICE_KEY=your_supabase_key
     SUPABASE_BUCKET=resumes
     CORS_ORIGINS=https://your-frontend-url.vercel.app
     ```
   - Click "Create Web Service"

### Option 2: Netlify (Frontend) + Render (Backend)

#### Frontend Deployment (Netlify)

1. **Build the project:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `frontend/dist` folder
   - Or connect GitHub for auto-deployments

#### Backend Deployment (Render)

1. **Deploy to Render:**
   - Go to [render.com](https://render.com)
   - Create "Web Service"
   - Connect GitHub repository
   - Set **Root Directory** to `backend`
   - Add environment variables
   - Deploy

## Environment Variables

### Frontend (.env.production)
```
VITE_API=https://your-backend-url.railway.app
```

### Backend
```
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_supabase_key
SUPABASE_BUCKET=resumes
CORS_ORIGINS=https://your-frontend-url.vercel.app
```

## Post-Deployment Steps

1. **Update CORS origins** in backend config
2. **Test all functionality:**
   - Resume upload
   - Job description analysis
   - ATS compliance check
   - User stories management

3. **Set up custom domain** (optional):
   - Vercel: Add custom domain in project settings
   - Railway: Add custom domain in service settings

## Troubleshooting

### Common Issues:

1. **CORS Errors:**
   - Update `CORS_ORIGINS` in backend config
   - Restart backend service

2. **File Upload Issues:**
   - Check Supabase bucket permissions
   - Verify file size limits

3. **Environment Variables:**
   - Ensure all required variables are set
   - Check variable names (case-sensitive)

## Cost Breakdown (100% FREE Tiers)

- **Vercel**: Free (unlimited static sites)
- **Render**: Free (750 hours/month = 31 days)
- **Netlify**: Free (100GB bandwidth/month)
- **Total Cost**: $0/month

## Support

If you encounter issues:
1. Check deployment logs
2. Verify environment variables
3. Test API endpoints directly
4. Check browser console for errors
