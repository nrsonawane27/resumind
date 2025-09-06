@echo off
echo 🚀 Resumind Deployment Script
echo ==============================

REM Check if git is initialized
if not exist ".git" (
    echo ❌ Git not initialized. Please run 'git init' first.
    pause
    exit /b 1
)

REM Check if we're in the right directory
if not exist "frontend\package.json" (
    echo ❌ Please run this script from the project root directory.
    pause
    exit /b 1
)

if not exist "backend\requirements.txt" (
    echo ❌ Please run this script from the project root directory.
    pause
    exit /b 1
)

echo ✅ Project structure looks good!

REM Build frontend
echo 📦 Building frontend...
cd frontend
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Frontend build failed!
    pause
    exit /b 1
)
echo ✅ Frontend build successful!
cd ..

echo.
echo 🎯 Next Steps:
echo ==============
echo.
echo 1. Create GitHub Repository:
echo    - Go to https://github.com/new
echo    - Repository name: resumind
echo    - Make it public
echo    - Don't initialize with README
echo.
echo 2. Push to GitHub:
echo    git remote add origin https://github.com/YOUR_USERNAME/resumind.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo 3. Deploy Frontend (Vercel):
echo    - Go to https://vercel.com
echo    - Sign up with GitHub
echo    - Import resumind repository
echo    - Set Root Directory: frontend
echo    - Add Environment Variable: VITE_API = https://your-backend-url.onrender.com
echo.
echo 4. Deploy Backend (Render):
echo    - Go to https://render.com
echo    - Sign up with GitHub
echo    - Create Web Service
echo    - Connect resumind repository
echo    - Set Root Directory: backend
echo    - Build Command: pip install -r requirements.txt
echo    - Start Command: uvicorn app.main:app --host 0.0.0.0 --port %PORT%
echo    - Add your Supabase environment variables
echo.
echo 5. Update URLs:
echo    - Copy Vercel URL and add to Render CORS_ORIGINS
echo    - Copy Render URL and add to Vercel VITE_API
echo.
echo 📚 For detailed instructions, see DEPLOYMENT.md
pause
