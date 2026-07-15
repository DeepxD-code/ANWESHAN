param([switch]$InstallOnly)

$ErrorActionPreference = "Stop"
$PSScriptRoot = if ($PSScriptRoot) { $PSScriptRoot } else { Split-Path -Parent $MyInvocation.MyCommand.Path }
$envPath = Join-Path $PSScriptRoot "backend\.env"
$tunnelUrlFile = Join-Path $PSScriptRoot "backend\.tunnel-url"
$logFile = Join-Path $PSScriptRoot "backend\.tunnel-log"

# Find or download cloudflared
$cfExe = $null
$installed = Get-Command "cloudflared" -ErrorAction SilentlyContinue
if ($installed) { $cfExe = $installed.Source }
elseif (Test-Path "$env:ProgramFiles\cloudflared\cloudflared.exe") { $cfExe = "$env:ProgramFiles\cloudflared\cloudflared.exe" }
elseif (Test-Path "${env:ProgramFiles(x86)}\cloudflared\cloudflared.exe") { $cfExe = "${env:ProgramFiles(x86)}\cloudflared\cloudflared.exe" }
else {
    $local = Join-Path $PSScriptRoot "cloudflared.exe"
    if (-not (Test-Path $local)) {
        Write-Host "[TUNNEL] Downloading cloudflared..."
        $url = "https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe"
        Invoke-WebRequest -Uri $url -OutFile $local -UseBasicParsing
    }
    $cfExe = $local
}
if ($InstallOnly) { exit 0 }

Write-Host "[TUNNEL] Starting tunnel to http://localhost:5000 ..."
Remove-Item $logFile, $tunnelUrlFile -ErrorAction SilentlyContinue

# Start cloudflared, redirect stderr to log file (URL appears on stderr)
$proc = Start-Process -FilePath $cfExe -ArgumentList "tunnel --url http://localhost:5000" -WindowStyle Hidden -PassThru -RedirectStandardError $logFile

# Poll log file for tunnel URL
$url = $null
for ($i = 0; $i -lt 60; $i++) {
    if (Test-Path $logFile) {
        $content = Get-Content $logFile -Raw
        if ($content -match 'https://[a-zA-Z0-9-]+\.trycloudflare\.com') {
            $url = $matches[0]
            break
        }
    }
    Start-Sleep -Milliseconds 500
}

if (-not $url) {
    Write-Host "[TUNNEL] ERROR: Could not get tunnel URL"
    if (Test-Path $logFile) { Write-Host (Get-Content $logFile -Raw) }
    exit 1
}

Write-Host "[TUNNEL] URL: $url"
$url | Out-File -FilePath $tunnelUrlFile -Encoding ASCII

# Update PUBLIC_URL in .env
if (Test-Path $envPath) {
    $envContent = Get-Content $envPath -Raw
    if ($envContent -match 'PUBLIC_URL=.*') {
        $envContent = $envContent -replace 'PUBLIC_URL=.*', "PUBLIC_URL=$url"
    } else {
        $envContent += "`r`nPUBLIC_URL=$url"
    }
    Set-Content $envPath $envContent -NoNewline
    Write-Host "[TUNNEL] PUBLIC_URL set in .env"
}
