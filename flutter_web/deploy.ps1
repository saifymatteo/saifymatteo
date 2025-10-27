#!/usr/local/bin/pwsh

if (-Not (Get-Command "npx" -ErrorAction SilentlyContinue)) {
    return Write-Output 'NodeJs is not installed.'
}
if (-Not (Get-Command "git" -ErrorAction SilentlyContinue)) {
    return Write-Output 'Git is not installed.'
}
if (-Not (Get-Command "flutter" -ErrorAction SilentlyContinue)) {
    return Write-Output 'Flutter is not installed.'
}

# Set variable
$filePath = 'pubspec.yaml'
$pattern = 'version: ([0-9.]+.)(\d+)'
$newVersion = ''

# BUILD VERSION ---------------------------------------------------------------------------------------------------
function Build-Version {
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

function Build-Commit {
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
function Build-Production {
    flutter build web --wasm -v -t lib/main.dart --release --csp --base-href=/ `
        --output="build/web/production/"
    # Check for error
    if ($? -eq $false) {
        exit 1
    }

    # Copy sitemap.xml
    Copy-Item "./sitemap.xml" -Destination "build/web/production/"
}

Build-Version

Build-Production

Write-Host 'Deploying to Cloudflare...'
npx wrangler deploy

Build-Commit

exit 0
