@echo off
chcp 65001 > nul
color 0D
cls

echo.
echo     ╔═══════════════════════════════════════════════════════════╗
echo     ║                                                           ║
echo     ║      🚀 ДЕПЛОЙ НА GITHUB - ПОШАГОВАЯ ИНСТРУКЦИЯ! 🔥     ║
echo     ║                                                           ║
echo     ╚═══════════════════════════════════════════════════════════╝
echo.
echo.

echo ═══════════════════════════════════════════════════════════
echo ШАГ 1: Проверка Git
echo ═══════════════════════════════════════════════════════════
echo.

where git >nul 2>nul
if %errorlevel% neq 0 (
    color 0C
    echo ❌ Git не установлен!
    echo.
    echo 📥 Установи Git: https://git-scm.com/download/win
    echo.
    pause
    exit
)

echo ✅ Git установлен
git --version
echo.

echo ═══════════════════════════════════════════════════════════
echo ШАГ 2: Проверка репозитория
echo ═══════════════════════════════════════════════════════════
echo.

git remote -v
if %errorlevel% neq 0 (
    echo.
    echo ⚠️ Репозиторий не настроен!
    echo.
    echo 💡 Настрой репозиторий:
    echo    git init
    echo    git remote add origin https://github.com/Dimasick-git/Ryzhenka.git
    echo.
    pause
    exit
)

echo.
echo ✅ Репозиторий настроен
echo.

echo ═══════════════════════════════════════════════════════════
echo ШАГ 3: Добавление файлов
echo ═══════════════════════════════════════════════════════════
echo.

git add .
echo ✅ Файлы добавлены
echo.

echo ═══════════════════════════════════════════════════════════
echo ШАГ 4: Коммит
echo ═══════════════════════════════════════════════════════════
echo.

git commit -m "RYAZHA AI v2.0 - GitHub Pages готов! 🚀🥛"
echo ✅ Коммит создан
echo.

echo ═══════════════════════════════════════════════════════════
echo ШАГ 5: Push на GitHub
echo ═══════════════════════════════════════════════════════════
echo.

echo 🚀 Отправляем на GitHub...
echo.

git push -u origin main
if %errorlevel% neq 0 (
    echo.
    echo ⚠️ Попробуем master ветку...
    git push -u origin master
)

if %errorlevel% equ 0 (
    echo.
    echo ╔═══════════════════════════════════════════════════════════╗
    echo ║                                                           ║
    echo ║              ✅ УСПЕШНО ЗАГРУЖЕНО! ✅                    ║
    echo ║                                                           ║
    echo ╚═══════════════════════════════════════════════════════════╝
    echo.
    echo 🎉 Файлы загружены на GitHub!
    echo.
    echo 📋 ТЕПЕРЬ ВКЛЮЧИ GITHUB PAGES:
    echo.
    echo 1. Открой: https://github.com/Dimasick-git/Ryzhenka
    echo 2. Settings → Pages
    echo 3. Source: GitHub Actions
    echo 4. Save
    echo.
    echo 🌐 Сайт будет доступен через 2-3 минуты:
    echo    https://dimasick-git.github.io/Ryzhenka
    echo.
    echo 🌐 Открываю GitHub...
    start https://github.com/Dimasick-git/Ryzhenka/settings/pages
    echo.
) else (
    color 0C
    echo.
    echo ❌ Ошибка push!
    echo.
    echo 💡 Возможные причины:
    echo    • Нет доступа к репозиторию
    echo    • Неправильный remote URL
    echo    • Нужна авторизация
    echo.
    echo 🔑 Настрой авторизацию:
    echo    git config --global user.name "Dimasick-git"
    echo    git config --global user.email "твой@email.com"
    echo.
)

echo.
pause
