@echo off
chcp 65001 > nul
color 0B
cls

echo.
echo     ╔═══════════════════════════════════════════════════════════╗
echo     ║                                                           ║
echo     ║      🌐 ДЕПЛОЙ НА GITHUB PAGES! 🚀                      ║
echo     ║                                                           ║
echo     ║         Автоматический деплой сайта! ⚡                   ║
echo     ║                                                           ║
echo     ╚═══════════════════════════════════════════════════════════╝
echo.
echo.

echo ═══════════════════════════════════════════════════════════
echo [1/4] Проверка Node.js...
echo ═══════════════════════════════════════════════════════════
echo.

where node >nul 2>nul
if %errorlevel% neq 0 (
    color 0C
    echo ❌ Node.js не установлен!
    echo.
    echo 📥 Установи Node.js: https://nodejs.org
    echo.
    pause
    exit
)

echo ✅ Node.js установлен
node --version
echo.

echo ═══════════════════════════════════════════════════════════
echo [2/4] Установка зависимостей...
echo ═══════════════════════════════════════════════════════════
echo.

call npm install
if %errorlevel% neq 0 (
    color 0C
    echo ❌ Ошибка установки зависимостей!
    pause
    exit
)

echo.
echo ✅ Зависимости установлены
echo.

echo ═══════════════════════════════════════════════════════════
echo [3/4] Сборка проекта...
echo ═══════════════════════════════════════════════════════════
echo.

call npm run build
if %errorlevel% neq 0 (
    color 0C
    echo ❌ Ошибка сборки!
    pause
    exit
)

echo.
echo ✅ Проект собран
echo.

echo ═══════════════════════════════════════════════════════════
echo [4/4] Git commit и push...
echo ═══════════════════════════════════════════════════════════
echo.

git add .
git commit -m "Deploy to GitHub Pages 🚀"
git push

if %errorlevel% equ 0 (
    echo.
    echo ╔═══════════════════════════════════════════════════════════╗
    echo ║                                                           ║
    echo ║              ✅ ДЕПЛОЙ УСПЕШЕН! ✅                       ║
    echo ║                                                           ║
    echo ╚═══════════════════════════════════════════════════════════╝
    echo.
    echo 🌐 Сайт будет доступен через 2-3 минуты:
    echo    https://dimasick-git.github.io/Ryzhenka
    echo.
    echo 💡 Не забудь включить GitHub Pages:
    echo    Settings → Pages → Source: GitHub Actions
    echo.
) else (
    color 0C
    echo ❌ Ошибка git push!
    echo.
    echo Проверь что репозиторий настроен:
    echo git remote -v
)

echo.
pause
