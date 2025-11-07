#include <string.h>
#include <stdio.h>
#include <stdlib.h>

#include <switch.h>

// Простое .nro приложение для доступа к AI RYAHA с Nintendo Switch
// Использует встроенный веб-апплет для открытия сайта

int main(int argc, char* argv[])
{
    // Инициализация сервисов Switch
    socketInitializeDefault();
    nxlinkStdio();
    
    // Инициализация консоли для вывода
    consoleInit(NULL);
    
    // Инициализация контроллера
    PadState pad;
    padConfigureInput(1, HidNpadStyleSet_NpadStandard);
    padInitializeDefault(&pad);
    
    printf("\x1b[2J"); // Очистка экрана
    printf("\x1b[1;1H"); // Позиция курсора
    
    // Заголовок в стиле Ryazhenka
    printf("\x1b[36m"); // Cyan цвет
    printf("    ╔═══════════════════════════════════════╗\n");
    printf("    ║                                       ║\n");
    printf("    ║      🥛 RYAZHA AI for Switch 🎮      ║\n");
    printf("    ║                                       ║\n");
    printf("    ║  Умный помощник для Nintendo Switch!  ║\n");
    printf("    ║                                       ║\n");
    printf("    ╚═══════════════════════════════════════╝\n");
    printf("\x1b[0m\n"); // Сброс цвета
    
    printf("\x1b[32m"); // Зеленый цвет
    printf("  ✨ Возможности:\n");
    printf("     • AI помощник для Switch CFW\n");
    printf("     • Ответы на вопросы о Ryazhenka\n");
    printf("     • FAQ и помощь по взлому\n");
    printf("\x1b[0m\n");
    
    printf("\x1b[33m"); // Желтый цвет
    printf("  📡 Требования:\n");
    printf("     • WiFi подключение\n");
    printf("     • Ryazhenka CFW или Atmosphere\n");
    printf("     • Homebrew Menu (hbmenu)\n");
    printf("\x1b[0m\n");
    
    printf("\x1b[35m"); // Magenta цвет
    printf("  🎮 Управление:\n");
    printf("     [A] - Открыть RYAZHA AI в браузере\n");
    printf("     [+] - Выход\n");
    printf("\x1b[0m\n");
    
    printf("\x1b[90m"); // Серый цвет
    printf("  💜 Создано командой Ryazhenka\n");
    printf("  👨‍💻 Автор: Dimasick-git\n");
    printf("  🌐 github.com/Dimasick-git/Ryzhenka\n");
    printf("  📱 Telegram: @Ryazhenkabestcfw\n");
    printf("  ✨ v2.0.0 | 2025\n");
    printf("\x1b[0m\n");
    
    // URL сайта AI RYAHA на GitHub Pages (БЕСПЛАТНО!)
    const char* websiteUrl = "https://dimasick-git.github.io/Ryzhenka";
    
    printf("\n\x1b[36m  🚀 Автоматический запуск через 2 секунды...\x1b[0m\n");
    printf("\x1b[90m  Нажми [+] для отмены\x1b[0m\n");
    
    // Задержка 2 секунды с возможностью отмены
    bool autoLaunch = true;
    for(int i = 0; i < 20; i++) {
        padUpdate(&pad);
        u64 kDown = padGetButtonsDown(&pad);
        if (kDown & HidNpadButton_Plus) {
            autoLaunch = false;
            break;
        }
        svcSleepThread(100000000); // 0.1 секунды
        consoleUpdate(NULL);
    }
    
    if (autoLaunch) {
        printf("\n\x1b[36m  🚀 Запуск RYAZHA AI...\x1b[0m\n");
        printf("\x1b[33m  📱 Открываем браузер Switch...\x1b[0m\n\n");
        
        // Конфигурация веб-апплета
        WebCommonConfig config;
        WebCommonReply reply;
        
        // Инициализация конфига для показа веб-страницы
        Result rc = webPageCreate(&config, websiteUrl);
        
        if (R_SUCCEEDED(rc))
        {
            // Настройка опций
            webConfigSetWhitelist(&config, "^http*");
            webConfigSetFooter(&config, true); // Показать футер с кнопками
            webConfigSetPointer(&config, true); // Включить pointer
            webConfigSetKeyRepeatFrame(&config, 4, 8);
            
            printf("\x1b[32m  ✅ Загрузка интерфейса...\x1b[0m\n");
            printf("\x1b[90m  URL: %s\x1b[0m\n\n", websiteUrl);
            
            // Показать веб-страницу
            rc = webConfigShow(&config, &reply);
            
            if (R_SUCCEEDED(rc))
            {
                printf("\x1b[32m  ✅ Веб-апплет закрыт\x1b[0m\n");
            }
            else
            {
                printf("\x1b[31m  ❌ Ошибка показа веб-страницы: 0x%x\x1b[0m\n", rc);
            }
        }
        else
        {
            printf("\x1b[31m  ❌ Ошибка создания веб-апплета: 0x%x\x1b[0m\n", rc);
            printf("\x1b[33m  💡 Проверь подключение к интернету!\x1b[0m\n");
        }
    }
    
    // Ждем нажатия для выхода
    printf("\n\x1b[37m  Нажми [+] для выхода\x1b[0m\n");
    while(appletMainLoop())
    {
        padUpdate(&pad);
        u64 kDown = padGetButtonsDown(&pad);
        
        if (kDown & HidNpadButton_Plus)
            break;
        
        consoleUpdate(NULL);
    }
    
    // Завершение
    printf("\n\x1b[36m  👋 До встречи в RYAZHA AI!\x1b[0m\n");
    printf("\x1b[35m  💜 Спасибо что используешь Ryazhenka!\x1b[0m\n");
    consoleUpdate(NULL);
    
    consoleExit(NULL);
    socketExit();
    
    return 0;
}
