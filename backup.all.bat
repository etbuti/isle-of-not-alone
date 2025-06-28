@echo off
setlocal

:: 定义需要备份的文件列表，用空格分隔
set FILES=music.html index.html budcup2025.html budcup2025-cn.html

:: 定义备份存放目录
set BACKUPDIR=backups

:: 获取当前日期时间，格式为 YYYYMMDD-HHMMSS
for /f "tokens=1-4 delims=/- " %%a in ('date /t') do set DATE=%%c%%a%%b
for /f "tokens=1-2 delims=: " %%a in ('time /t') do set TIME=%%a%%b
set DATETIME=%DATE%-%TIME%

:: 创建备份文件夹（如果不存在）
if not exist "%BACKUPDIR%" mkdir "%BACKUPDIR%"

:: 遍历文件列表并备份
for %%F in (%FILES%) do (
    if exist "%%F" (
        copy "%%F" "%BACKUPDIR%\%%F_%DATETIME%.bak" >nul
        echo Backed up %%F as %BACKUPDIR%\%%F_%DATETIME%.bak
    ) else (
        echo File %%F not found, skipping...
    )
)

echo All backups complete!
endlocal
pause
