# 🎮 RYAZHA AI для Nintendo Switch

Нативное .nro приложение для доступа к AI помощнику прямо с Nintendo Switch!

## ✨ Возможности

- 🥛 **Открывает RYAZHA AI** в браузере Switch
- 🎮 **Нативное приложение** для Homebrew Menu
- 📱 **Поддержка тач-скрина** и геймпада
- 🌐 **Работает через WiFi** - нужно подключение к интернету
- 💜 **Стиль Ryazhenka** - красивый интерфейс

## 📋 Требования

### Для сборки:
- Windows/Linux/macOS
- [DevkitPro](https://github.com/devkitPro/installer/releases) с Nintendo Switch Development
- make (входит в DevkitPro)

### Для запуска на Switch:
- Nintendo Switch с CFW (Ryazhenka/Atmosphere)
- Homebrew Menu (hbmenu)
- WiFi подключение
- SD карта

## 🔨 Сборка

### Windows (автоматически):
```batch
BUILD_SWITCH.bat
```

### Вручную:
```bash
cd switch-app
make clean
make
```

## 📱 Установка

1. Скопируй `ryazha-ai.nro` на SD карту:
   ```
   /switch/ryazha-ai/ryazha-ai.nro
   ```

2. Вставь SD карту в Switch

3. Запусти Homebrew Menu

4. Найди "RYAZHA AI" и запусти!

## 🎮 Управление

- **[A]** - Открыть RYAZHA AI в браузере
- **[+]** - Выход из приложения

## 🌐 Настройка URL

Перед сборкой измени URL в `source/main.cpp`:

```cpp
const char* websiteUrl = "https://твой-сайт.netlify.app";
```

## 📊 Технические детали

- **Размер**: ~100-200 KB
- **Версия**: 2.0.0
- **Title ID**: 0x0100000000001000
- **Язык**: C++ с libnx

## 🔧 Структура проекта

```
switch-app/
├── Makefile              # Конфигурация сборки
├── ai-ryaha.json         # Метаданные приложения
├── source/
│   └── main.cpp          # Исходный код
└── build/                # Временные файлы (создаётся при сборке)
```

## 🎨 Кастомизация

### Изменить название:
Отредактируй `ai-ryaha.json`:
```json
{
  "name": "ТВОЁ НАЗВАНИЕ"
}
```

### Добавить иконку:
1. Создай `icon.jpg` (256x256)
2. Положи в папку `switch-app/`
3. Пересобери

### Изменить цвета:
В `main.cpp` найди ANSI escape коды:
```cpp
printf("\x1b[36m"); // Cyan
printf("\x1b[32m"); // Green
// и т.д.
```

## ❓ Решение проблем

### "DEVKITPRO not set"
- Установи DevkitPro
- Перезапусти компьютер
- Проверь переменные окружения

### "make not found"
- Переустанови DevkitPro
- Выбери "Nintendo Switch Development"

### Приложение не запускается на Switch
- Проверь что CFW установлен
- Убедись что файл в `/switch/ryazha-ai/`
- Проверь что есть WiFi подключение

### Браузер не открывается
- Проверь URL в `main.cpp`
- Убедись что сайт доступен
- Проверь WiFi подключение

## 💜 Авторы

Создано командой **Ryazhenka**:
- Dimasick-git
- Ryazha-Helper-01

## 🔗 Ссылки

- GitHub: [Dimasick-git/Ryzhenka](https://github.com/Dimasick-git/Ryzhenka)
- Telegram: [@Ryazhenkabestcfw](https://t.me/Ryazhenkabestcfw)
- Boosty: [boosty.to/dimasick-git](https://boosty.to/dimasick-git)

## 📄 Лицензия

MIT License - используй свободно!

---

🥛 **RYAZHA AI** - Умный помощник для Nintendo Switch!
