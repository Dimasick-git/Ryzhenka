# 🥛 Ryazhenka Best CFW

> **Продуманная, оптимизированная CFW на базе Atmosphère для Nintendo Switch**

[![GitHub release](https://img.shields.io/github/v/release/Dimasick-git/Ryzhenka?style=for-the-badge&logo=github&color=ff6b6b)](https://github.com/Dimasick-git/Ryzhenka/releases/latest)
[![Downloads](https://img.shields.io/github/downloads/Dimasick-git/Ryzhenka/total?style=for-the-badge&logo=github&color=4ecdc4)](https://github.com/Dimasick-git/Ryzhenka/releases)
[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)

---

## 📖 Описание

**Ryazhenka Best CFW** — это тщательно подобранный набор кастомной прошивки, созданный для обеспечения **стабильности**, **производительности** и **простоты использования**. Включает в себя лучшие homebrew модули, предварительно настроенные профили мощности и умные оптимизации времени выполнения — всё это в чистой и удобной оболочке.

> *Nice try for you.* 🎮

---

## ✨ Преимущества

- 🚀 **Максимальная производительность** — оптимизированные профили разгона и управления частотами
- 🛡️ **Стабильность и надёжность** — проверенные временем модули без конфликтов
- 🎯 **Простота установки** — готовая к использованию конфигурация из коробки
- 🔧 **Гибкая настройка** — полный контроль над системными параметрами
- 📊 **Мониторинг в реальном времени** — температура, FPS, частоты, заряд батареи
- 🎨 **Красивый интерфейс** — кастомные загрузочные экраны и удобное меню
- 🔄 **Регулярные обновления** — актуальные версии всех компонентов

---

## 🎯 Как начать

### Требования

- Nintendo Switch (Erista/Mariko)
- microSD карта (рекомендуется 64GB+)
- Возможность запуска payload (RCM для Erista или modchip для Mariko)

### Установка

1. **Скачайте** последний релиз из раздела [Releases](https://github.com/Dimasick-git/Ryzhenka/releases/latest)
2. **Выберите** нужную версию:
   - `Ryazhenka_AIO.zip` — полная версия со всеми модулями
   - `Ryazhenkabestcfw.zip` — стандартная версия
   - `Ryazhenka_lite.zip` — облегчённая версия
3. **Распакуйте** содержимое архива в корень microSD карты
4. **Вставьте** карту в Switch и загрузите CFW через payload
5. **Готово!** Наслаждайтесь оптимизированной системой

---

## 🔥 Основные возможности

### 🎮 Включённые модули

| Модуль | Описание | Версия |
|--------|----------|--------|
| **sys-clk** | Управление частотами CPU/GPU и профилями мощности | 2.0.1+r9 |
| **Status Monitor** | Мониторинг температуры, заряда и системных параметров | 1.1.9+r6 |
| **FPSLocker** | Разблокировка и ограничение FPS в играх | 2.3.0 |
| **EdiZon** | Редактирование сохранений и управление модами | v1.0.10 |
| **ReverseNX-RT** | Runtime оптимизации для режимов Dock/Handheld | 2.1.0 |
| **Fizeau** | Дополнительные оптимизации и ускорения | 2.8.1 |
| **Switchcraft (Loader OC)** | Вспомогательный загрузчик с разгоном | v1.6.4 |

> ⚠️ **Примечание:** Версии указаны ориентировочно. Актуальные версии смотрите в релизах.

---

## ⚙️ Tuner & sys-clk

### 🎛️ Tuner v8.0

Встроенный инструмент для тонкой настройки системы:

- **Performance** — максимальная производительность для требовательных игр
- **Standard** — сбалансированный режим для повседневного использования
- **Economy** — энергосберегающий режим для увеличения времени автономной работы

### ⚡ sys-clk профили

Автоматическое переключение частот для каждой игры:

```
📊 Handheld Mode:
CPU: 1020-1785 MHz
GPU: 307-460 MHz
MEM: 1331-1600 MHz

📺 Docked Mode:
CPU: 1020-1785 MHz
GPU: 307-768 MHz
MEM: 1600 MHz
```

---

## 🔗 Полезные ссылки

- 📦 [Releases](https://github.com/Dimasick-git/Ryzhenka/releases) — скачать последнюю версию
- 📝 [Changelog](CHANGELOG.md) — история изменений
- 🐛 [Issues](https://github.com/Dimasick-git/Ryzhenka/issues) — сообщить о проблеме
- 💬 [Discussions](https://github.com/Dimasick-git/Ryzhenka/discussions) — обсуждения и вопросы
- 📚 [Wiki](https://github.com/Dimasick-git/Ryzhenka/wiki) — документация и гайды

---

## 📋 Релизы

### 🎉 v5.0.0 — опубликован 2025-10-03

![bbootlogo v5.0.0](https://github.com/Dimasick-git/Ryzhenka/releases/download/v5.0.0/bbootlogo.png)

#### 🆕 Что нового:

- ✅ **Tuner** обновлён до v8.0
- ✅ Добавлены профили Performance/Standard/Economy
- ✅ Улучшенная система сохранения и отката профилей
- ✅ Обновлены все основные модули до последних стабильных версий
- ✅ Оптимизация загрузочного процесса

#### 📦 Доступные варианты:

- [Ryazhenka_AIO.zip](https://github.com/Dimasick-git/Ryzhenka/releases/download/v5.0.0/Ryazhenka_AIO.zip) — Полная версия
- [Ryazhenkabestcfw.zip](https://github.com/Dimasick-git/Ryzhenka/releases/download/v5.0.0/Ryazhenkabestcfw.zip) — Стандарт
- [Ryazhenka_lite.zip](https://github.com/Dimasick-git/Ryzhenka/releases/download/v5.0.0/Ryazhenka_lite.zip) — Облегчённая
- [bbootlogo.png](https://github.com/Dimasick-git/Ryzhenka/releases/download/v5.0.0/bbootlogo.png) — Загрузочный экран

[📖 Полные заметки к релизу](https://github.com/Dimasick-git/Ryzhenka/releases/tag/v5.0.0)

<!-- RELEASES_START -->
<!-- RELEASES_END -->

---

## 📝 Changelog

Полную историю изменений смотрите в файле [CHANGELOG.md](CHANGELOG.md)

### Последние изменения:

**v5.0.0** (2025-10-03)
- Tuner v8.0 с профилями производительности
- Обновлённые модули homebrew
- Улучшенная стабильность системы
- Новые загрузочные экраны

---

## 🙏 Благодарности

Огромная благодарность разработчикам и сообществу:

- **Atmosphère Team** — за великолепную CFW
- **retendo** — за sys-clk
- **masagrator** — за FPSLocker и Status Monitor
- **WerWolv** — за EdiZon
- **Fizeau Team** — за оптимизации
- **Shadow256** — за Switchcraft
- Всем контрибьюторам и тестерам!

---

## 💖 Поддержка проекта

Если вам нравится Ryazhenka Best CFW, поддержите проект:

- ⭐ Поставьте звезду на GitHub
- 🔄 Поделитесь с друзьями
- 🐛 Сообщайте о багах и предлагайте улучшения
- 💬 Участвуйте в обсуждениях
- 📝 Улучшайте документацию

---

## ⚠️ Отказ от ответственности

Этот проект предназначен **только для образовательных целей**. Использование кастомной прошивки может привести к:

- Потере гарантии устройства
- Блокировке консоли в онлайн-сервисах
- Потере данных при неправильной установке

Автор не несёт ответственности за любой ущерб, причинённый использованием данного ПО. Используйте на свой страх и риск.

---

## 📜 Лицензия

MIT License — смотрите файл [LICENSE](LICENSE) для подробностей.

---

<div align="center">

**Made with ❤️ by Dimasick-git**

[🏠 Home](https://github.com/Dimasick-git/Ryzhenka) • [📦 Releases](https://github.com/Dimasick-git/Ryzhenka/releases) • [📖 Wiki](https://github.com/Dimasick-git/Ryzhenka/wiki) • [💬 Discussions](https://github.com/Dimasick-git/Ryzhenka/discussions)

</div>
