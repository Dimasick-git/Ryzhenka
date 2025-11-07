@echo off
chcp 65001 > nul
color 0D
cls

echo.
echo     ╔═══════════════════════════════════════════════════════════╗
echo     ║                                                           ║
echo     ║      🎮 БЫСТРАЯ СБОРКА .NRO ДЛЯ SWITCH! 🥛              ║
echo     ║                                                           ║
echo     ║         Автоматическая сборка за 1 клик! ⚡               ║
echo     ║                                                           ║
echo     ╚═══════════════════════════════════════════════════════════╝
echo.
echo.

REM Проверка DevkitPro
if not defined DEVKITPRO (
    color 0C
    echo ❌ DevkitPro НЕ УСТАНОВЛЕН!
    echo.
    echo 📥 Скачай: https://github.com/devkitPro/installer/releases
    echo.
    echo 🌐 Открываю страницу загрузки...
    start https://github.com/devkitPro/installer/releases
    echo.
    pause
    exit
)

echo ✅ DevkitPro: %DEVKITPRO%
echo.

REM Переход в папку
cd switch-app
if %errorlevel% neq 0 (
    color 0C
    echo ❌ Папка switch-app не найдена!
    pause
    exit
)

echo 🔨 Собираем ryazha-ai.nro...
echo.

REM Очистка и сборка
make clean >nul 2>&1
make

if %errorlevel% equ 0 (
    echo.
    echo ╔═══════════════════════════════════════════════════════════╗
    echo ║                                                           ║
    echo ║              ✅ ГОТОВО! ✅                               ║
    echo ║                                                           ║
    echo ╚═══════════════════════════════════════════════════════════╝
    echo.
    
    if exist ryazha-ai.nro (
        echo 🎉 Файл ryazha-ai.nro создан!
        echo.
        echo 📱 УСТАНОВКА НА SWITCH:
        echo    1. Скопируй на SD: /switch/ryazha-ai/ryazha-ai.nro
        echo    2. Запусти Homebrew Menu
        echo    3. Найди "RYAZHA AI"
        echo    4. Запусти!
        echo.
        start explorer .
    )
) else (
    color 0C
    echo ❌ ОШИБКА СБОРКИ!
    echo.
    echo Проверь ошибки выше.
)

cd..
echo.
pause
