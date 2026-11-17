@echo off
title SkillSpring AI - Adaptive Learning Platform Launcher
color 0b

echo ========================================================
echo   SkillSpring AI - Adaptive Gamified Learning Platform
echo   Stack: HTML5, CSS3, JavaScript, Express.js & MySQL
echo ========================================================
echo.

cd /d "%~dp0"

rem Check for Node.js (Express.js Backend on Port 4000)
where node >nul 2>&1
if %ERRORLEVEL% equ 0 (
    echo [1/2] Opening application in your default browser...
    start "" "http://localhost:4000"
    echo [2/2] Node.js found! Starting Express.js Backend Server on port 4000...
    echo.
    node backend/server.js
    goto end
)

rem Fallback to Python if Node.js is not yet installed in PATH
echo [1/2] Opening Landing Page directly in your browser...
start "" "frontend\index.html"
echo.
echo [2/2] Node.js not detected in PATH. Starting Python server on port 3000...
where python >nul 2>&1
if %ERRORLEVEL% equ 0 (
    cd frontend
    python -m http.server 3000
    goto end
)

if exist "C:\Program Files\Python310\python.exe" (
    cd frontend
    "C:\Program Files\Python310\python.exe" -m http.server 3000
    goto end
)

pause
:end
