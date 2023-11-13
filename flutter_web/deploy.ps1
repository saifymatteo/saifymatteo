#!/usr/local/bin/pwsh

Write-Output '**************************************************'
Write-Output 'Incrementing build number'
Write-Output '**************************************************'
Write-Output ''
Write-Output ''

$FilePath = 'pubspec.yaml'
$Pattern = 'version: ([0-9.]+.)(\d+)'
$CurrentVersion = Get-Content $FilePath | Select-String $Pattern

$VersionNumber = $CurrentVersion.Matches.Groups[1].Value
$VersionBuild = $CurrentVersion.Matches.Groups[2].Value.ToInt16($VersionBuild) + 1

$NewVersion = "version: ${VersionNumber}${VersionBuild}"

Write-Output $CurrentVersion
Write-Output $NewVersion

(Get-Content $FilePath) -replace $Pattern, $NewVersion | Set-Content $FilePath
Write-Output ''
Write-Output ''
Write-Output ''
Write-Output ''


Write-Output      '###########################################################################'
Read-Host -Prompt 'Please stage the new pubspec version changes and press any key once done...'
Write-Output      '###########################################################################'


Write-Output '**************************************************'
Write-Output 'Build local for CI/CD'
Write-Output '**************************************************'
Write-Output ''
Write-Output ''

fvm flutter build web -v -t lib/main.dart --release --csp --base-href=/ `
    --output="../build/" --web-renderer canvaskit
Write-Output ''
Write-Output ''
Write-Output ''
Write-Output ''



Write-Output '**************************************************'
Write-Output 'Adding and pushing Git commit'
Write-Output '**************************************************'
Write-Output ''
Write-Output ''

git commit -m "[flutter-web] chore: bump version > $VersionNumber$VersionBuild"
git push origin
Write-Output ''
Write-Output ''
Write-Output ''
Write-Output ''



Write-Output '**************************************************'
Write-Output 'Adding and pushing Git tags'
Write-Output '**************************************************'
Write-Output ''
Write-Output ''

git tag "release/flutter-web/v$VersionNumber$VersionBuild"
git push origin "refs/tags/release/flutter-web/v$VersionNumber$VersionBuild"
