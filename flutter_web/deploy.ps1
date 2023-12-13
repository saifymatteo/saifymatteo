#!/usr/local/bin/pwsh

param($env)

# Check for deploy token
$NETLIFY_TOKEN = [Environment]::GetEnvironmentVariable('NETLIFY_TOKEN')
if ([String]::IsNullOrWhiteSpace($NETLIFY_TOKEN))
{
    Write-Error "NETLIFY_TOKEN is not set"
    exit 1
}

Write-Output "NETLIFY_TOKEN: $NETLIFY_TOKEN"

# Set variable
$filePath = 'pubspec.yaml'
$pattern = 'version: ([0-9.]+.)(\d+)'
$newVersion = ''

# BUILD VERSION ---------------------------------------------------------------------------------------------------
function Build-Version
{
    # Increase Build number
    Write-Output 'Setting build number'
    # Get current version
    $currentVersion = Get-Content $filePath | Select-String $pattern
    # Split and increase build number
    $versionNumber = $currentVersion.Matches.Groups[1].Value
    $versionBuild = $currentVersion.Matches.Groups[2].Value.ToInt16($versionBuild) + 1
    # Combine both version number and build number and set the file
    $newName = "version: ${versionNumber}${versionBuild}"
    (Get-Content $filePath) -replace $pattern, $newName | Set-Content $filePath
    Write-Output 'OK'
    Write-Output ''

    # Update global variable
    $b = [Ref]$newVersion
    $b.Value = "$versionNumber$versionBuild"
}

function Build-Commit
{
    Write-Output ''
    Write-Output ''

    # Prompt user to stage the new pubspec version changes
    Read-Host -Prompt "Please stage the new pubspec version changes and press any key once done"

    git commit -m "[flutter_web] chore: bump version > $newVersion"
    git push origin

    git tag "release/flutter-web/v$newVersion"
    git push origin "refs/tags/release/flutter-web/v$newVersion"
}

# PRODUCTION ------------------------------------------------------------------------------------------------------
# Build command
function Production-Build
{
    fvm flutter build web -v -t lib/main.dart --release --csp --base-href=/ `
    --output="build/web/production/" --web-renderer canvaskit
    # Check for error
    if ($? -eq $false)
    {
        exit 1
    }

    # To make Flutter Deeplink works on Netlify
    "/*    /index.html  200" | Out-File -FilePath "build/web/production/_redirects"
}

# Archive files
function Production-Archive
{
    Compress-Archive -Path .\build\web\production -DestinationPath .\build\web\production.zip -Force
    # Check for error
    if ($? -eq $false)
    {
        exit 1
    }
}

# Deploy
function Production-Deploy
{
    curl -X POST `
    -H "Content-Type: application/zip" `
    -H "Authorization: Bearer $NETLIFY_TOKEN" `
    --data-binary "@build\web\production.zip" `
    https://api.netlify.com/api/v1/sites/48ab6a76-80cb-4fe3-9b7e-182d0f03f2f0/deploys
    # Check for error
    if ($? -eq $false)
    {
        exit 1
    }
}


Build-Version

Production-Build

Write-Host 'Archiving the build files...'
Production-Archive

Write-Host 'Deploying to Netlify...'
Production-Deploy

Build-Commit

exit 0
