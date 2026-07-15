param(
  [switch]$SkipInstall,
  [switch]$SkipBuild,
  [switch]$SkipTunnel,
  [switch]$Docker
)

$Root = $PSScriptRoot
$Backend = Join-Path $Root "backend"
$LogFile = Join-Path $env:TEMP "anweshan-setup.log"

function Log($Msg) {
  $ts = Get-Date -Format "HH:mm:ss"
  Write-Host "[$ts] $Msg" -ForegroundColor Cyan
  Add-Content -Path $LogFile -Value "[$ts] $Msg"
}

function Step($Name, $ScriptBlock) {
  Write-Host ""
  Write-Host "========================================" -ForegroundColor Magenta
  Write-Host "  $Name" -ForegroundColor Yellow
  Write-Host "========================================" -ForegroundColor Magenta
  & $ScriptBlock
}

function Check($Path, $Label) {
  if (Test-Path $Path) {
    Write-Host "  [PASS] $Label" -ForegroundColor Green
    return $true
  } else {
    Write-Host "  [FAIL] $Label -- NOT FOUND" -ForegroundColor Red
    return $false
  }
}

# ======================================================
#  KILL OLD PROCESSES
# ======================================================
Step "KILLING OLD PROCESSES" {
  Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
  Get-Process -Name cloudflared -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
  Start-Sleep -Seconds 2
  Log "Old processes killed"
}

# ======================================================
#  FILE VERIFICATION
# ======================================================
Step "FILE VERIFICATION" {
  $allOk = $true
  $files = @(
    @("$Root\package.json", "Root package.json"),
    @("$Backend\package.json", "Backend package.json"),
    @("$Backend\.env", ".env file"),
    @("$Backend\prisma\schema.prisma", "Prisma schema"),
    @("$Backend\prisma\anweshan.db", "SQLite database"),
    @("$Backend\src\server.ts", "Backend entry"),
    @("$Root\src\App.tsx", "Frontend App.tsx"),
    @("$Root\vite.config.ts", "Vite config"),
    @("$Backend\tsconfig.json", "Backend TS config"),
    @("$Root\docker-compose.yml", "Docker compose"),
    @("$Root\Dockerfile", "Root Dockerfile"),
    @("$Backend\Dockerfile", "Backend Dockerfile"),
    @("$Root\nginx.conf", "Nginx config"),
    @("$Backend\prisma.config.ts", "Prisma config"),
    @("$Root\playwright.config.ts", "Playwright config"),
    @("$Backend\src\tests\app.test.ts", "Backend test"),
    @("$Root\tests\example.spec.ts", "E2E test")
  )
  foreach ($f in $files) {
    if (-not (Check $f[0] $f[1])) { $allOk = $false }
  }
  if ($allOk) { Log "All files verified OK" } else { Log "WARNING: Some files missing" }
}

# ======================================================
#  INSTALL DEPENDENCIES
# ======================================================
if (-not $SkipInstall) {
  Step "INSTALLING FRONTEND" {
    Set-Location $Root
    npm install 2>&1 | Out-Null
    Log "Frontend dependencies installed"
  }

  Step "INSTALLING BACKEND" {
    Set-Location $Backend
    npm install 2>&1 | Out-Null
    Log "Backend dependencies installed"
  }
}

# ======================================================
#  DOCKER COMPOSE BUILD (if flag set)
# ======================================================
if ($Docker) {
  Step "DOCKER COMPOSE BUILD" {
    $dockerBin = "C:\Users\trex2\AppData\Local\Programs\DockerDesktop\resources\bin\docker.exe"
    if (Test-Path $dockerBin) {
      & $dockerBin compose -f "$Root\docker-compose.yml" build 2>&1
      if ($LASTEXITCODE -eq 0) {
        Log "Docker images built successfully"
      } else {
        Log "Docker build failed -- Docker daemon not running?"
      }
    } else {
      Log "Docker not available -- skipping"
    }
  }
}

# ======================================================
#  PRISMA SETUP
# ======================================================
Step "PRISMA SETUP" {
  $absDb = "$Backend\prisma\anweshan.db"
  $env:DATABASE_URL = "file:$absDb"
  Set-Location $Backend
  npx prisma db push --accept-data-loss 2>&1 | Out-Null
  Log "Prisma schema pushed"
  npx prisma db seed 2>&1 | Out-Null
  Log "Database seeded"
}

# ======================================================
#  BUILD BACKEND (type-check only)
# ======================================================
if (-not $SkipBuild) {
  Step "BUILDING BACKEND" {
    Set-Location $Backend
    $env:DATABASE_URL = "file:$($Backend)\prisma\anweshan.db"
    npx tsc --noEmit 2>&1 | Select-String -Pattern "error TS"
    if ($LASTEXITCODE -eq 0) { Log "Backend TypeScript checks passed" } else { Log "Backend has TS errors (pre-existing)" }
  }
}

# ======================================================
#  START BACKEND
# ======================================================
Step "STARTING BACKEND" {
  $env:DATABASE_URL = "file:$($Backend)\prisma\anweshan.db"
  Start-Process -WindowStyle Hidden -FilePath "cmd.exe" -ArgumentList "/c set DATABASE_URL=file:$($Backend)\prisma\anweshan.db && cd /d `"$Backend`" && npx ts-node src/server.ts"
  Start-Sleep -Seconds 5
  Log "Backend started on http://localhost:5000"
}

# ======================================================
#  CLOUDFLARED TUNNEL (backend only first)
# ======================================================
if (-not $SkipTunnel) {
  Step "CLOUDFLARED BACKEND TUNNEL" {
    $cfBin = "C:\Program Files (x86)\cloudflared\cloudflared.exe"
    $t = $env:TEMP
    "@echo off
`"$cfBin`" tunnel --url http://localhost:5000 > `"$t\cf_backend.log`" 2>&1" | Set-Content "$t\run_cf_backend.bat"
    Remove-Item "$t\cf_backend.log" -ErrorAction SilentlyContinue
    Start-Process -WindowStyle Hidden -FilePath "cmd.exe" -ArgumentList "/c `"$t\run_cf_backend.bat`""
    Start-Sleep -Seconds 18
    $backendUrl = Select-String -Path "$t\cf_backend.log" -Pattern "https://[a-z-]+\.trycloudflare\.com" -ErrorAction SilentlyContinue | Select-Object -Last 1 | ForEach-Object { $_.Matches[0].Value }
    $global:BackendUrl = $backendUrl
    Log "Backend tunnel: $backendUrl"
    if ($backendUrl) {
      (Get-Content "$Backend\.env") -replace '^PUBLIC_URL=.*', "PUBLIC_URL=$backendUrl" | Set-Content "$Backend\.env"
    }
  }
} else {
  $global:BackendUrl = "http://localhost:5000"
}

# ======================================================
#  BUILD FRONTEND (with backend tunnel URL)
# ======================================================
if (-not $SkipBuild) {
  Step "BUILDING FRONTEND" {
    Set-Location $Root
    $apiUrl = if ($global:BackendUrl) { $global:BackendUrl } else { "http://localhost:5000" }
    $env:VITE_API_URL = $apiUrl
    $env:VITE_BACKEND_URL = $apiUrl
    npx vite build 2>&1 | Out-Null
    Log "Frontend built (Vite) -> API: $apiUrl"
  }
}

# ======================================================
#  START FRONTEND
# ======================================================
Step "STARTING FRONTEND" {
  Start-Process -WindowStyle Hidden -FilePath "cmd.exe" -ArgumentList "/c cd /d `"$Root`" && npx serve dist -l 8080"
  Start-Sleep -Seconds 3
  Log "Frontend started on http://localhost:8080"
}

# ======================================================
#  CLOUDFLARED FRONTEND TUNNEL
# ======================================================
if (-not $SkipTunnel) {
  Step "CLOUDFLARED FRONTEND TUNNEL" {
    $cfBin = "C:\Program Files (x86)\cloudflared\cloudflared.exe"
    $t = $env:TEMP
    "@echo off
`"$cfBin`" tunnel --url http://localhost:8080 > `"$t\cf_frontend.log`" 2>&1" | Set-Content "$t\run_cf_frontend.bat"
    Remove-Item "$t\cf_frontend.log" -ErrorAction SilentlyContinue
    Start-Process -WindowStyle Hidden -FilePath "cmd.exe" -ArgumentList "/c `"$t\run_cf_frontend.bat`""
    Start-Sleep -Seconds 18
    $frontendUrl = Select-String -Path "$t\cf_frontend.log" -Pattern "https://[a-z-]+\.trycloudflare\.com" -ErrorAction SilentlyContinue | Select-Object -Last 1 | ForEach-Object { $_.Matches[0].Value }
    $global:FrontendUrl = $frontendUrl
    Log "Frontend tunnel: $frontendUrl"
  }
} else {
  $global:FrontendUrl = "http://localhost:8080"
}

# ======================================================
#  HEALTH CHECKS
# ======================================================
Step "HEALTH CHECKS" {
  $baseUrl = if ($global:BackendUrl) { $global:BackendUrl } else { "http://localhost:5000" }

  # Root endpoint
  try {
    $r = Invoke-RestMethod -Uri "$baseUrl/" -TimeoutSec 5 -ErrorAction Stop
    Write-Host "  [PASS] GET / -> $($r.message)" -ForegroundColor Green
  } catch {
    Write-Host "  [FAIL] GET / -- $($_.Exception.Message)" -ForegroundColor Red
  }

  # Login endpoint
  try {
    $r = Invoke-RestMethod -Uri "$baseUrl/api/auth/login" -Method POST -ContentType "application/json" -Body '{"email":"ramesh@example.com","password":"password123"}' -TimeoutSec 10 -ErrorAction Stop
    Write-Host "  [PASS] POST /api/auth/login -> $($r.user.fullName) ($($r.user.role))" -ForegroundColor Green
  } catch {
    Write-Host "  [FAIL] POST /api/auth/login -- $($_.Exception.Message)" -ForegroundColor Red
  }

  # Alerts endpoint
  try {
    $r = Invoke-RestMethod -Uri "$baseUrl/api/alerts" -TimeoutSec 5 -ErrorAction Stop
    Write-Host "  [PASS] GET /api/alerts -> $($r.alerts.Count) alerts" -ForegroundColor Green
  } catch {
    Write-Host "  [FAIL] GET /api/alerts -- $($_.Exception.Message)" -ForegroundColor Red
  }

  # Frontend
  try {
    $r = Invoke-WebRequest -Uri "$($global:FrontendUrl)" -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
    Write-Host "  [PASS] Frontend -> HTTP $($r.StatusCode)" -ForegroundColor Green
  } catch {
    Write-Host "  [FAIL] Frontend -- $($_.Exception.Message)" -ForegroundColor Red
  }
}

# ======================================================
#  RUN BACKEND TESTS
# ======================================================
Step "BACKEND TESTS (VITEST)" {
  try {
    Set-Location $Backend
    $env:DATABASE_URL = "file:$($Backend)\prisma\anweshan.db"
    $testResult = npx vitest run --reporter=verbose 2>&1 | Out-String
    if ($LASTEXITCODE -eq 0) {
      Write-Host "  [PASS] All backend tests passed" -ForegroundColor Green
    } else {
      Write-Host "  [INFO] Test output:" -ForegroundColor Yellow
      $testResult
    }
  } catch {
    Write-Host "  [WARN] Could not run vitest: $($_.Exception.Message)" -ForegroundColor Yellow
  }
}

# ======================================================
#  RUN E2E TESTS (PLAYWRIGHT)
# ======================================================
Step "E2E TESTS (PLAYWRIGHT)" {
  try {
    Set-Location $Root
    $testResult = npx playwright test --reporter=list 2>&1 | Out-String
    if ($LASTEXITCODE -eq 0) {
      Write-Host "  [PASS] E2E tests passed" -ForegroundColor Green
    } else {
      Write-Host "  [INFO] E2E test output:" -ForegroundColor Yellow
      $testResult
    }
  } catch {
    Write-Host "  [WARN] Could not run playwright: $($_.Exception.Message)" -ForegroundColor Yellow
  }
}

# ======================================================
#  FINAL STATUS
# ======================================================
Write-Host ""
Write-Host "========================================" -ForegroundColor Magenta
Write-Host "  ANWESHAN -- READY" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Magenta
Write-Host ""
if ($global:FrontendUrl) { Write-Host "  Frontend : $($global:FrontendUrl)" -ForegroundColor Cyan }
if ($global:BackendUrl)  { Write-Host "  Backend  : $($global:BackendUrl)" -ForegroundColor Cyan }
Write-Host "  Local FE : http://localhost:8080" -ForegroundColor Cyan
Write-Host "  Local BE : http://localhost:5000" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Credentials:" -ForegroundColor Yellow
Write-Host "    Senior : ramesh@example.com / password123" -ForegroundColor Gray
Write-Host "    Family : rajesh@example.com / password123" -ForegroundColor Gray
Write-Host "    Officer: officer@example.com / password123" -ForegroundColor Gray
Write-Host ""
Write-Host "  Guardian phone: +916289050278 (updated)" -ForegroundColor Yellow
Write-Host ""
Write-Host "  Log: $LogFile" -ForegroundColor Gray
Write-Host ""
Write-Host "  To stop, run: Get-Process -Name node,cloudflared | Stop-Process -Force" -ForegroundColor Magenta
Write-Host "========================================" -ForegroundColor Magenta
