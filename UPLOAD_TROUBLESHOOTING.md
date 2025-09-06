# 🔧 Resume Upload Troubleshooting Guide

## Quick Fix Steps

### 1. **Check Backend Status**
Test if your backend is running:
```bash
# Replace with your actual backend URL
curl https://your-backend-url.onrender.com/health
```
Should return: `{"ok": true}`

### 2. **Test Upload with HTML Tool**
1. Open `test-upload.html` in your browser
2. Enter your backend URL
3. Click "Test Backend Connection"
4. Select a resume file and click "Upload Resume"

### 3. **Common Issues & Solutions**

#### Issue A: Backend Not Running
**Symptoms:** Connection refused, 404 errors
**Solution:**
- Check if backend deployed successfully
- Verify environment variables are set
- Check deployment logs

#### Issue B: CORS Errors
**Symptoms:** "CORS policy" errors in browser console
**Solution:**
- Update `CORS_ORIGINS` in backend with your frontend URL
- Restart backend service

#### Issue C: File Upload Fails
**Symptoms:** "Missing boundary" or "multipart" errors
**Solution:**
- Ensure frontend doesn't set Content-Type header manually
- Check file size limits
- Verify Supabase credentials

#### Issue D: Environment Variables
**Symptoms:** "VITE_API" not defined
**Solution:**
- Set `VITE_API` in Vercel environment variables
- Redeploy frontend

## Step-by-Step Fix

### Step 1: Verify Backend URL
1. Go to your backend service dashboard (Render/Railway)
2. Copy the service URL
3. Test: `https://your-backend-url/health`

### Step 2: Update Frontend Configuration
1. Go to Vercel dashboard
2. Settings → Environment Variables
3. Add/Update: `VITE_API = https://your-backend-url`
4. Redeploy

### Step 3: Update Backend CORS
1. Go to backend dashboard
2. Environment Variables
3. Update: `CORS_ORIGINS = https://your-frontend-url.vercel.app`
4. Restart service

### Step 4: Test Upload
1. Use the test tool: `test-upload.html`
2. Check browser console for errors
3. Verify file uploads to Supabase

## Debug Information

### Frontend Console Errors
Check browser console for:
- Network errors
- CORS errors
- API response errors

### Backend Logs
Check deployment logs for:
- Startup errors
- Database connection issues
- File upload errors

### Common Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| `CORS policy` | Frontend URL not in CORS_ORIGINS | Update CORS_ORIGINS |
| `Missing boundary` | Content-Type header issue | Remove manual Content-Type |
| `VITE_API is not defined` | Environment variable missing | Set VITE_API in Vercel |
| `Connection refused` | Backend not running | Check deployment status |
| `File too large` | File size limit exceeded | Check Supabase limits |

## Test Commands

### Test Backend Health
```bash
curl -X GET https://your-backend-url/health
```

### Test Upload (with curl)
```bash
curl -X POST https://your-backend-url/api/upload \
  -F "file=@test-resume.pdf"
```

### Test CORS
```bash
curl -H "Origin: https://your-frontend-url.vercel.app" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: X-Requested-With" \
  -X OPTIONS https://your-backend-url/api/upload
```

## Still Having Issues?

1. **Check deployment logs** in your platform dashboard
2. **Verify all environment variables** are set correctly
3. **Test with the HTML tool** to isolate the issue
4. **Check browser network tab** for failed requests
5. **Verify Supabase credentials** and bucket permissions
