param(
  [switch]$Docker
)

if ($Docker) {
  Write-Host "=== ANWESHAN Platform Launcher (Docker) ===" -ForegroundColor Cyan
  Write-Host ""
  Write-Host "Starting with Docker Compose..." -ForegroundColor Green
  docker compose up --build -d
  Write-Host ""
  Write-Host "Access the app at: http://localhost:8080" -ForegroundColor Cyan
  Write-Host "Backend API at: http://localhost:5000" -ForegroundColor Cyan
  Write-Host ""
  Write-Host "Run 'docker compose down' to stop." -ForegroundColor Magenta
  return
}

Write-Host "=== ANWESHAN Platform Launcher ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Starting Backend..." -ForegroundColor Green
$backendJob = Start-Job -ScriptBlock {
  Set-Location "D:\sos app\ANWESHAN-main\backend"
  npm run dev
}
Write-Host "Backend starting on http://localhost:5000" -ForegroundColor Yellow

Write-Host "Starting Frontend..." -ForegroundColor Green
$frontendJob = Start-Job -ScriptBlock {
  Set-Location "D:\sos app\ANWESHAN-main"
  npm run dev
}
Write-Host "Frontend starting on http://localhost:8080" -ForegroundColor Yellow
Write-Host ""
Write-Host "Access the app at: http://localhost:8080" -ForegroundColor Cyan
Write-Host "Backend API at: http://localhost:5000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to stop both servers..." -ForegroundColor Magenta
Read-Host
Stop-Job $backendJob
Stop-Job $frontendJob
Remove-Job $backendJob
Remove-Job $frontendJob
