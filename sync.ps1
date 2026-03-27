Write-Host "🔄 Syncing DocShare to GitHub..." -ForegroundColor Cyan
cd C:\Users\user\OneDrive\Desktop\DocShare\Opencode\docshare
git add .
git commit -m "Update from OpenCode - $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
git push
Write-Host "✅ Done!" -ForegroundColor Green
Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
