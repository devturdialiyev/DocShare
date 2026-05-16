@echo off
echo Syncing DocShare to GitHub...
cd /d C:\Users\user\OneDrive\Desktop\DocShare\Opencode\docshare
git add .
git commit -m "Update from OpenCode - %date% %time%"
git push
echo Done!
pause
