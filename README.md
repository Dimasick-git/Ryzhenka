<div align="center">

![Ryazhenka Logo](assets/Ryazhalogo.png)

[![Telegram](https://img.shields.io/badge/Telegram-@Ryazhenkacfw-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white&labelColor=000000)](https://t.me/Ryazhenkacfw) [![Release](https://img.shields.io/badge/Release-latest-blue?style=for-the-badge&logo=github&logoColor=white&labelColor=000000)](https://github.com/Dimasick-git/Ryzhenka/releases/latest) [![Repo downloads](https://img.shields.io/github/downloads/Dimasick-git/Ryzhenka/total?style=for-the-badge)](https://github.com/Dimasick-git/Ryzhenka/releases) [![License](https://img.shields.io/badge/License-MIT-black?style=for-the-badge)](LICENCE) [![Website](https://img.shields.io/badge/Website-Visit-brightgreen?style=for-the-badge&logo=google-chrome&logoColor=white&labelColor=000000)](https://dimasick-git.github.io/Ryzhenka/)

</div>

# Ryazhenka CFW

**Ryazhenka** is a custom firmware (CFW) package for Nintendo Switch, built on top of Atmosphere and Hekate. It bundles a curated set of homebrew tools, overlays, performance modules and quality-of-life tweaks — all developed and maintained by [Dimasick-git](https://github.com/Dimasick-git).

> Full documentation is in Russian below. | Полная документация на русском ниже.

---

**Содержание**
- [Назначение](#назначение)
- [Ключевые компоненты](#ключевые-компоненты)
- [Установка](#установка-микро-инструкция)
- [Статистика](#сводная-статистика)
- [Основные модули](#основные-модули)
- [Все репозитории](#все-репозитории-относящиеся-к-проекту)
- [Особая благодарность](#особая-благодарность)
- [Лицензия](#лицензия)

---

**Назначение**

Этот репозиторий содержит релизы и документацию для Ryazhenka CFW — комплексной сборки кастомной прошивки для Nintendo Switch. Объединяет проверенные компоненты (Atmosphere, Hekate) с собственными модулями производительности, системными оверлеями и утилитами настройки.

---

**Ключевые компоненты**

- `Ryazhahand-Overlay` — система управления оверлеями и пользовательскими настройками. Основан на базе Ultrahand. Переработано: Dimasick-git.
- `Ryazha-clk` — модуль управления частотами CPU/GPU/MEM/LCD, профилями производительности и VRR. Разработано: Dimasick-git.
- `Ryazhenka Tuner` — инструмент тонкой настройки прошивки и системных параметров. Основан на базе Ultra Tuner. Переработано: Dimasick-git.
- `RyazhaTune` — расширенный инструмент настройки системы нового поколения. Разработано: Dimasick-git.
- `Ryazha-Status-Monitor` — оверлей мониторинга системных показателей в реальном времени (температура, частоты, RAM). Разработано: Dimasick-git.
- `ovlSysmodules` — оверлей управления системными модулями (sysmodules), включение/выключение без перезагрузки. Адаптировано: Dimasick-git.
- `FPSLocker` — патчер частоты кадров для игр Nintendo Switch. Адаптировано: Dimasick-git.
- `Fizeau` — управление цветовым профилем и гаммой дисплея. Адаптировано: Dimasick-git.
- `EdiZon` — редактор сохранений и чит-движок для Nintendo Switch. Адаптировано: Dimasick-git.
- `AIO-Switch-Updater` — обновление всех компонентов CFW из одного приложения. Адаптировано: Dimasick-git.
- `Mission-Control` — поддержка сторонних Bluetooth-контроллеров (PS4/PS5/Xbox и др.). Адаптировано: Dimasick-git.
- `PPSSPP` — PSP-эмулятор, пересобранный под HOS 21. Адаптировано: Dimasick-git.
- `ReverseNX-RT` — переключение между dock/handheld режимами на лету. Адаптировано: Dimasick-git.
- `SwitchWave` — медиаплеер и аудиоплеер для Nintendo Switch. Адаптировано: Dimasick-git.
- `Minecraft-Online-for-switch` — онлайн-функциональность для Minecraft на Switch. Адаптировано: Dimasick-git.

---

**Сводная статистика**

- Суммарные загрузки всех релизов: <!--TOTAL_DOWNLOADS-->**16445**<!--/TOTAL_DOWNLOADS-->
- Последний релиз Ryazhenka: [releases/latest](https://github.com/Dimasick-git/Ryzhenka/releases/latest)

---

**Основные модули**

| Модуль | Описание | Скачивания | Ссылка |
|---|---|---:|---|
| `Ryzhenka` | Основной пакет CFW | [![downloads](https://img.shields.io/github/downloads/Dimasick-git/Ryzhenka/total?style=flat-square)](https://github.com/Dimasick-git/Ryzhenka/releases) | [releases/latest](https://github.com/Dimasick-git/Ryzhenka/releases/latest) |
| `Ryazhahand-Overlay` | Оверлей управления системой и настройками (Tesla menu) | [![downloads](https://img.shields.io/github/downloads/Dimasick-git/Ryazhahand-Overlay/total?style=flat-square)](https://github.com/Dimasick-git/Ryazhahand-Overlay/releases) | [Ryazhahand-Overlay](https://github.com/Dimasick-git/Ryazhahand-Overlay) |
| `Ryazha-clk` | Управление частотами CPU/GPU/MEM/LCD и VRR | [![downloads](https://img.shields.io/github/downloads/Dimasick-git/Sys-clk/total?style=flat-square)](https://github.com/Dimasick-git/Sys-clk/releases) | [Sys-clk](https://github.com/Dimasick-git/Sys-clk) |
| `Ryazhenka Tuner` | Тонкая настройка прошивки и диагностика | [![downloads](https://img.shields.io/github/downloads/Dimasick-git/Ryazhenkabestcfw-Tuner/total?style=flat-square)](https://github.com/Dimasick-git/Ryazhenkabestcfw-Tuner/releases) | [Ryazhenkabestcfw-Tuner](https://github.com/Dimasick-git/Ryazhenkabestcfw-Tuner) |
| `RyazhaTune` | Расширенный инструмент настройки системы | [![downloads](https://img.shields.io/github/downloads/Dimasick-git/RyazhaTune/total?style=flat-square)](https://github.com/Dimasick-git/RyazhaTune/releases) | [RyazhaTune](https://github.com/Dimasick-git/RyazhaTune) |
| `AIO-Switch-Updater` | Обновление всех компонентов CFW из одного приложения | [![downloads](https://img.shields.io/github/downloads/Dimasick-git/AIO-Switch-Updater/total?style=flat-square)](https://github.com/Dimasick-git/AIO-Switch-Updater/releases) | [AIO-Switch-Updater](https://github.com/Dimasick-git/AIO-Switch-Updater) |
| `Mission-Control` | Поддержка сторонних Bluetooth-контроллеров (PS4/PS5/Xbox и др.) | [![downloads](https://img.shields.io/github/downloads/Dimasick-git/Mission-Control/total?style=flat-square)](https://github.com/Dimasick-git/Mission-Control/releases) | [Mission-Control](https://github.com/Dimasick-git/Mission-Control) |
| `Ryazha-Status-Monitor` | Мониторинг температуры, частот, RAM в реальном времени | [![downloads](https://img.shields.io/github/downloads/Dimasick-git/Ryazha-Status-Monitor/total?style=flat-square)](https://github.com/Dimasick-git/Ryazha-Status-Monitor/releases) | [Ryazha-Status-Monitor](https://github.com/Dimasick-git/Ryazha-Status-Monitor) |
| `ovlSysmodules` | Управление sysmodules через оверлей | [![downloads](https://img.shields.io/github/downloads/Dimasick-git/ovlSysmodules/total?style=flat-square)](https://github.com/Dimasick-git/ovlSysmodules/releases) | [ovlSysmodules](https://github.com/Dimasick-git/ovlSysmodules) |
| `FPSLocker` | Патчер частоты кадров для игр | [![downloads](https://img.shields.io/github/downloads/Dimasick-git/FPSLocker/total?style=flat-square)](https://github.com/Dimasick-git/FPSLocker/releases) | [FPSLocker](https://github.com/Dimasick-git/FPSLocker) |
| `Fizeau` | Управление цветовым профилем дисплея | [![downloads](https://img.shields.io/github/downloads/Dimasick-git/Fizeau/total?style=flat-square)](https://github.com/Dimasick-git/Fizeau/releases) | [Fizeau](https://github.com/Dimasick-git/Fizeau) |
| `ReverseNX-RT` | Переключение dock/handheld режимов на лету | [![downloads](https://img.shields.io/github/downloads/Dimasick-git/ReverseNX-RT/total?style=flat-square)](https://github.com/Dimasick-git/ReverseNX-RT/releases) | [ReverseNX-RT](https://github.com/Dimasick-git/ReverseNX-RT) |
| `EdiZon` | Редактор сохранений и чит-движок | [![downloads](https://img.shields.io/github/downloads/Dimasick-git/EdiZon/total?style=flat-square)](https://github.com/Dimasick-git/EdiZon/releases) | [EdiZon](https://github.com/Dimasick-git/EdiZon) |
| `SwitchWave` | Медиаплеер для Nintendo Switch | [![downloads](https://img.shields.io/github/downloads/Dimasick-git/SwitchWave/total?style=flat-square)](https://github.com/Dimasick-git/SwitchWave/releases) | [SwitchWave](https://github.com/Dimasick-git/SwitchWave) |
| `PPSSPP` | PSP-эмулятор, пересобранный под HOS 21 | [![downloads](https://img.shields.io/github/downloads/Dimasick-git/PPSSPP/total?style=flat-square)](https://github.com/Dimasick-git/PPSSPP/releases) | [PPSSPP](https://github.com/Dimasick-git/PPSSPP) |
| `Minecraft-Online-for-switch` | Онлайн-функциональность для Minecraft на Switch | [![downloads](https://img.shields.io/github/downloads/Dimasick-git/Minecraft-Online-for-switch/total?style=flat-square)](https://github.com/Dimasick-git/Minecraft-Online-for-switch/releases) | [Minecraft-Online-for-switch](https://github.com/Dimasick-git/Minecraft-Online-for-switch) |

---

## Все репозитории относящиеся к проекту

| Репозиторий | Скачивания | Последний релиз |
|---|---|---|
| Ryzhenka | [![downloads](https://img.shields.io/github/downloads/Dimasick-git/Ryzhenka/total?style=flat-square)](https://github.com/Dimasick-git/Ryzhenka/releases) | [![release](https://img.shields.io/github/v/release/Dimasick-git/Ryzhenka?style=flat-square)](https://github.com/Dimasick-git/Ryzhenka/releases/latest) |
| Ryazhahand-Overlay | [![downloads](https://img.shields.io/github/downloads/Dimasick-git/Ryazhahand-Overlay/total?style=flat-square)](https://github.com/Dimasick-git/Ryazhahand-Overlay/releases) | [![release](https://img.shields.io/github/v/release/Dimasick-git/Ryazhahand-Overlay?style=flat-square)](https://github.com/Dimasick-git/Ryazhahand-Overlay/releases/latest) |
| Ryazha-clk (Sys-clk) | [![downloads](https://img.shields.io/github/downloads/Dimasick-git/Sys-clk/total?style=flat-square)](https://github.com/Dimasick-git/Sys-clk/releases) | [![release](https://img.shields.io/github/v/release/Dimasick-git/Sys-clk?style=flat-square)](https://github.com/Dimasick-git/Sys-clk/releases/latest) |
| Ryazhenka-Tuner | [![downloads](https://img.shields.io/github/downloads/Dimasick-git/Ryazhenkabestcfw-Tuner/total?style=flat-square)](https://github.com/Dimasick-git/Ryazhenkabestcfw-Tuner/releases) | [![release](https://img.shields.io/github/v/release/Dimasick-git/Ryazhenkabestcfw-Tuner?style=flat-square)](https://github.com/Dimasick-git/Ryazhenkabestcfw-Tuner/releases/latest) |
| RyazhaTune | [![downloads](https://img.shields.io/github/downloads/Dimasick-git/RyazhaTune/total?style=flat-square)](https://github.com/Dimasick-git/RyazhaTune/releases) | [![release](https://img.shields.io/github/v/release/Dimasick-git/RyazhaTune?style=flat-square)](https://github.com/Dimasick-git/RyazhaTune/releases/latest) |
| AIO-Switch-Updater | [![downloads](https://img.shields.io/github/downloads/Dimasick-git/AIO-Switch-Updater/total?style=flat-square)](https://github.com/Dimasick-git/AIO-Switch-Updater/releases) | [![release](https://img.shields.io/github/v/release/Dimasick-git/AIO-Switch-Updater?style=flat-square)](https://github.com/Dimasick-git/AIO-Switch-Updater/releases/latest) |
| Mission-Control | [![downloads](https://img.shields.io/github/downloads/Dimasick-git/Mission-Control/total?style=flat-square)](https://github.com/Dimasick-git/Mission-Control/releases) | [![release](https://img.shields.io/github/v/release/Dimasick-git/Mission-Control?style=flat-square)](https://github.com/Dimasick-git/Mission-Control/releases/latest) |
| Ryazha-Status-Monitor | [![downloads](https://img.shields.io/github/downloads/Dimasick-git/Ryazha-Status-Monitor/total?style=flat-square)](https://github.com/Dimasick-git/Ryazha-Status-Monitor/releases) | [![release](https://img.shields.io/github/v/release/Dimasick-git/Ryazha-Status-Monitor?style=flat-square)](https://github.com/Dimasick-git/Ryazha-Status-Monitor/releases/latest) |
| ovlSysmodules | [![downloads](https://img.shields.io/github/downloads/Dimasick-git/ovlSysmodules/total?style=flat-square)](https://github.com/Dimasick-git/ovlSysmodules/releases) | [![release](https://img.shields.io/github/v/release/Dimasick-git/ovlSysmodules?style=flat-square)](https://github.com/Dimasick-git/ovlSysmodules/releases/latest) |
| FPSLocker | [![downloads](https://img.shields.io/github/downloads/Dimasick-git/FPSLocker/total?style=flat-square)](https://github.com/Dimasick-git/FPSLocker/releases) | [![release](https://img.shields.io/github/v/release/Dimasick-git/FPSLocker?style=flat-square)](https://github.com/Dimasick-git/FPSLocker/releases/latest) |
| Fizeau | [![downloads](https://img.shields.io/github/downloads/Dimasick-git/Fizeau/total?style=flat-square)](https://github.com/Dimasick-git/Fizeau/releases) | [![release](https://img.shields.io/github/v/release/Dimasick-git/Fizeau?style=flat-square)](https://github.com/Dimasick-git/Fizeau/releases/latest) |
| ReverseNX-RT | [![downloads](https://img.shields.io/github/downloads/Dimasick-git/ReverseNX-RT/total?style=flat-square)](https://github.com/Dimasick-git/ReverseNX-RT/releases) | [![release](https://img.shields.io/github/v/release/Dimasick-git/ReverseNX-RT?style=flat-square)](https://github.com/Dimasick-git/ReverseNX-RT/releases/latest) |
| EdiZon | [![downloads](https://img.shields.io/github/downloads/Dimasick-git/EdiZon/total?style=flat-square)](https://github.com/Dimasick-git/EdiZon/releases) | [![release](https://img.shields.io/github/v/release/Dimasick-git/EdiZon?style=flat-square)](https://github.com/Dimasick-git/EdiZon/releases/latest) |
| SwitchWave | [![downloads](https://img.shields.io/github/downloads/Dimasick-git/SwitchWave/total?style=flat-square)](https://github.com/Dimasick-git/SwitchWave/releases) | [![release](https://img.shields.io/github/v/release/Dimasick-git/SwitchWave?style=flat-square)](https://github.com/Dimasick-git/SwitchWave/releases/latest) |
| PPSSPP | [![downloads](https://img.shields.io/github/downloads/Dimasick-git/PPSSPP/total?style=flat-square)](https://github.com/Dimasick-git/PPSSPP/releases) | [![release](https://img.shields.io/github/v/release/Dimasick-git/PPSSPP?style=flat-square)](https://github.com/Dimasick-git/PPSSPP/releases/latest) |
| Minecraft-Online-for-switch | [![downloads](https://img.shields.io/github/downloads/Dimasick-git/Minecraft-Online-for-switch/total?style=flat-square)](https://github.com/Dimasick-git/Minecraft-Online-for-switch/releases) | [![release](https://img.shields.io/github/v/release/Dimasick-git/Minecraft-Online-for-switch?style=flat-square)](https://github.com/Dimasick-git/Minecraft-Online-for-switch/releases/latest) |

---

**Установка (микро-инструкция)**

1. Скачайте последний релиз: [releases/latest](https://github.com/Dimasick-git/Ryzhenka/releases/latest)
2. Скопируйте содержимое архива в корень SD-карты.
3. Запустите устройство в RCM → Hekate → Launch → Atmosphere.

Полная инструкция: [docs/INSTALL.md](docs/INSTALL.md)

---

## Особая благодарность

Спасибо всем, кто участвовал и участвует в этом проекте. Спасибо за помощь в написании кода, а также благодарность сообществу за отличные идеи!

---

**Лицензия**

Проект распространяется под лицензией MIT. Полная версия лицензии в файле [`LICENCE`](./LICENCE).
