# 🚨 QUICK FIX: Network Error & Upload Fail

## IMMEDIATE STEPS (5 minutes)

### Step 1: Test Your Backend
1. **Open `diagnose-upload.html` in your browser**
2. **Enter your backend URL** (from Render/Railway dashboard)
3. **Click "Test Backend Health"**
4. **If it fails, your backend is not running**

### Step 2: Check Backend Status
**Go to your backend dashboard:**
- **Render**: https://dashboard.render.com
- **Railway**: https://railway.app/dashboard

**Look for:**
- ✅ Service status: "Live" or "Running"
- ❌ Service status: "Failed" or "Error"

### Step 3: Most Common Fixes

#### Fix A: Backend Not Running
**If backend shows "Failed" or "Error":**
1. **Check deployment logs**
2. **Restart the service**
3. **Verify environment variables are set**

#### Fix B: Wrong Backend URL
**If you get "Cannot connect to backend":**
1. **Copy the correct URL from your dashboard**
2. **Update Vercel environment variable:**
   - Go to Vercel dashboard
   - Settings → Environment Variables
   - Update `VITE_API` with correct URL
   - Redeploy

#### Fix C: CORS Error
**If you get CORS errors:**
1. **Update backend CORS_ORIGINS:**
   ```
   CORS_ORIGINS=https://your-vercel-url.vercel.app
   ```
2. **Restart backend service**

#### Fix D: Supabase Issues
**If upload fails after backend connects:**
1. **Check Supabase credentials:**
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_KEY`
   - `SUPABASE_BUCKET=resumes`
2. **Verify Supabase bucket exists**
3. **Check bucket permissions**

## Quick Commands

### Test Backend Health
```bash
# Replace with your actual URL
curl https://your-backend-url.onrender.com/health
```

### Test from Browser
Open: `https://your-backend-url.onrender.com/health`

Should return: `{"ok": true}`

## Emergency Fix: Deploy to Railway

If Render keeps failing, try Railway:

1. **Go to [railway.app](https://railway.app)**
2. **New Project → Deploy from GitHub**
3. **Select your repository**
4. **Set Root Directory: `backend`**
5. **Add environment variables**
6. **Deploy**

Railway is more reliable for FastAPI applications.

## What to Tell Me

Please run the diagnostic tool and tell me:

1. **What's your backend URL?**
2. **Does "Test Backend Health" pass or fail?**
3. **What error messages do you see?**
4. **Is your backend service showing as "Live" in the dashboard?**

I'll help you fix it immediately!
