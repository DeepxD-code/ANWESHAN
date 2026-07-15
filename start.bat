@echo off
title ANWESHAN Platform
cd /d "%~dp0"

echo ========================================
echo        ANWESHAN Platform Launcher
echo ========================================
echo.

:: Find Node.js - check multiple locations
setlocal enabledelayedexpansion
set "NODE_EXE="

:: Check if node is in PATH
where node >nul 2>nul && set "NODE_EXE=node" && goto :node_found

:: Check common install locations
for %%D in (
    "%ProgramFiles%\nodejs\node.exe"
    "%ProgramFiles(x86)%\nodejs\node.exe"
    "%LOCALAPPDATA%\Programs\nodejs\node.exe"
    "%APPDATA%\npm\node.exe"
) do (
    if exist %%D (
        set "NODE_EXE=%%D"
        goto :node_found
    )
)

echo [ERROR] Node.js not found in PATH or common locations.
echo Please ensure Node.js is installed and added to PATH.
echo Download from: https://nodejs.org
pause
exit /b 1

:node_found
echo [OK] Node.js found: !NODE_EXE!
echo.

:: Kill leftover cloudflared processes from previous runs
taskkill /f /im cloudflared.exe >nul 2>nul

:: Clean old tunnel files
if exist "backend\.tunnel-url" del "backend\.tunnel-url" 2>nul
if exist "backend\.tunnel-log" del "backend\.tunnel-log" 2>nul

:: Install frontend dependencies
if not exist "node_modules" (
    echo Installing frontend dependencies...
    call !NODE_EXE! -v
    call npm install
    if %ERRORLEVEL% neq 0 (
        echo [ERROR] Frontend install failed
        pause
        exit /b 1
    )
)
echo [OK] Frontend dependencies

:: Install backend dependencies
if not exist "backend\node_modules" (
    echo Installing backend dependencies...
    cd backend
    call npm install
    if %ERRORLEVEL% neq 0 (
        echo [ERROR] Backend install failed
        cd ..
        pause
        exit /b 1
    )
    cd ..
)
echo [OK] Backend dependencies

:: Prisma setup
cd backend
echo Generating Prisma client...
call npx prisma generate >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Prisma generate failed
    cd ..
    pause
    exit /b 1
)
echo Setting up database...
call npx prisma db push --skip-generate --accept-data-loss >nul 2>nul
call npx ts-node prisma/seed.ts >nul 2>nul
cd ..
echo [OK] Database ready

:: Start tunnel for Twilio webhook callback (Optional - if you need it)
echo.
echo Starting public tunnel for voice callbacks...
echo [INFO] Attempting to start Cloudflare tunnel...
powershell -NoProfile -ExecutionPolicy Bypass -File "tunnel.ps1" >nul 2>&1
if not exist "backend\.tunnel-url" (
    echo [WARN] Tunnel failed or not available - voice callbacks won't work without it.
    echo         You can still test the app locally.
) else (
    set /p TUNNEL_URL=<"backend\.tunnel-url"
    echo [OK] Tunnel URL: !TUNNEL_URL!
)
echo.

:: Start backend
echo Starting Backend on http://localhost:5000...
start "ANWESHAN-Backend" /D "backend" cmd /c "npx.cmd ts-node src/server.ts || pause"

:: Wait for backend to start
timeout /t 6 /nobreak >nul

:: Quick health check for backend
echo Checking backend health...
powershell -NoProfile -Command "try { $r = Invoke-WebRequest -Uri 'http://localhost:5000/' -UseBasicParsing -TimeoutSec 3; if ($r.StatusCode -eq 200) { Write-Host '[OK] Backend is running' } else { Write-Host '[WARN] Backend responded with status' $r.StatusCode } } catch { Write-Host '[WARN] Backend health check failed - it may still be starting' }"

:: Start frontend
echo Starting Frontend on http://localhost:8080...
start "ANWESHAN-Frontend" cmd /c "npx.cmd --yes vite --host 0.0.0.0 --port 8080 || pause"

echo.
echo ========================================
echo  ANWESHAN is running!
echo.
echo  Frontend : http://localhost:8080
echo  Backend  : http://localhost:5000
echo.
if defined TUNNEL_URL (
    echo  Voice Webhook URL: !TUNNEL_URL!
) else (
    echo  Voice Webhook: NOT CONFIGURED - local testing only
)
echo.
echo  Test Credentials:
echo    Senior : ramesh@example.com / password123
echo    Family : rajesh@example.com / password123
echo    Officer: officer@example.com / password123
echo.
echo  To stop, close these windows or press Ctrl+C.
echo ========================================
echo.

pause
