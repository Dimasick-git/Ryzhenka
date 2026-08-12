# Ryazhenka CFW

Ryazhenka is a Nintendo Switch custom-firmware ecosystem built around Atmosphere and Hekate. This repository publishes the main Ryazhenka bundle, installation guidance, release links, and the project website.

> Краткая версия на русском: Ryazhenka — экосистема кастомной прошивки Nintendo Switch на базе Atmosphere и Hekate. Здесь находятся основной пакет, инструкции, ссылки на релизы и исходный код сайта.

[Website](https://dimasick-git.github.io/Ryzhenka/) · [Latest release](https://github.com/Dimasick-git/Ryzhenka/releases/latest) · [Telegram](https://t.me/Ryazhenkacfw) · [License](LICENCE)

## English

### What is included

The Ryazhenka ecosystem combines a distributable CFW package with optional overlays, system utilities, monitoring tools, and related Switch projects. The exact contents and compatibility notes are defined by each release; review the release notes before installing or updating.

### Installation

1. Create a backup of the console's important data and verify that the release supports your Switch model.
2. Download the archive from [Releases](https://github.com/Dimasick-git/Ryzhenka/releases/latest) and copy its contents to the root of a FAT32-formatted SD card.
3. Boot through RCM and Hekate on an unpatched V1 console, or use a compatible modchip on patched V1, V2, Lite, and OLED models.
4. Launch the Atmosphere configuration supplied with the release and confirm that all modules are compatible.

Read the complete guide in [docs/INSTALL.md](docs/INSTALL.md). This project is intended for users who understand the risks of custom firmware; never install files from an unverified source.

### Core repositories

| Project | Purpose | Repository |
|---|---|---|
| Ryazhenka | Main CFW bundle and releases | [Ryzhenka](https://github.com/Dimasick-git/Ryzhenka) |
| Ryazhahand-Overlay | Tesla overlay menu and package management | [Ryazhahand-Overlay](https://github.com/Dimasick-git/Ryazhahand-Overlay) |
| Ryazha-Status-Monitor | Configurable system monitoring overlay | [Ryazha-Status-Monitor](https://github.com/Dimasick-git/Ryazha-Status-Monitor) |
| Ryazha-clk / Sys-clk | CPU, GPU, memory, display, and VRR profiles | [Sys-clk](https://github.com/Dimasick-git/Sys-clk) |
| RCU | Clock utility and game profiles | [RCU](https://github.com/Dimasick-git/RCU) |
| RyazhaTune | Ryazhenka audio and utility project | [RyazhaTune](https://github.com/Dimasick-git/RyazhaTune) |
| RyazhaAI | Assistant for CFW and Switch projects | [RyazhaAI](https://github.com/Dimasick-git/RyazhaAI) |
| Atmosphere-RYZ | Ryazhenka-related Atmosphere work | [Atmosphere-RYZ](https://github.com/Dimasick-git/Atmosphere-RYZ) |
| AIO-Switch-Updater | Updating Switch components from one app | [AIO-Switch-Updater](https://github.com/Dimasick-git/AIO-Switch-Updater) |
| Mission-Control | Bluetooth controller support | [Mission-Control](https://github.com/Dimasick-git/Mission-Control) |
| Fizeau | Display colour and gamma controls | [Fizeau](https://github.com/Dimasick-git/Fizeau) |
| FPSLocker | Frame-rate patching for compatible games | [FPSLocker](https://github.com/Dimasick-git/FPSLocker) |
| ReverseNX-RT | Runtime dock and handheld mode switching | [ReverseNX-RT](https://github.com/Dimasick-git/ReverseNX-RT) |
| SwitchWave | Media and audio player | [SwitchWave](https://github.com/Dimasick-git/SwitchWave) |
| EdiZon | Save editor and cheat tools | [EdiZon](https://github.com/Dimasick-git/EdiZon) |
| ovlSysmodules | Sysmodule management overlay | [ovlSysmodules](https://github.com/Dimasick-git/ovlSysmodules) |
| PPSSPP | PSP emulator build for HOS 21 | [PPSSPP](https://github.com/Dimasick-git/PPSSPP) |
| Minecraft Online for Switch | Minecraft-related Switch project | [Minecraft-Online-for-switch](https://github.com/Dimasick-git/Minecraft-Online-for-switch) |

The list above covers the public projects currently presented as part of the Ryazhenka ecosystem. Experimental, private, archived, or unrelated owner repositories are intentionally excluded. Release availability varies by repository; use the linked repository's Releases page for the current version.

## Русский

### Что такое Ryazhenka

Ryazhenka объединяет основную сборку CFW для Nintendo Switch и дополнительные проекты: оверлеи, мониторинг, управление частотами, обновление компонентов и утилиты. Состав архива и совместимость определяются конкретным релизом, поэтому перед установкой обязательно читайте release notes.

### Установка

Сделайте резервную копию важных данных консоли, скачайте архив из [последнего релиза](https://github.com/Dimasick-git/Ryzhenka/releases/latest) и скопируйте его содержимое в корень FAT32 SD-карты. Непатченная V1 запускается через RCM и Hekate; для patched V1, V2, Lite и OLED нужен совместимый модчип. Затем запустите конфигурацию Atmosphere из релиза и проверьте совместимость всех модулей.

Подробная инструкция находится в [docs/INSTALL.md](docs/INSTALL.md), ответы на частые вопросы — в [docs/FAQ.md](docs/FAQ.md), а правила разработки — в [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md). Используйте только проверенные релизы и учитывайте риски кастомной прошивки.

### Релизы и статистика

Актуальные версии, release notes и файлы загрузки публикуются на страницах релизов соответствующих репозиториев. Сводный счётчик загрузок обновляется автоматизацией из списка [scripts/repos.txt](scripts/repos.txt):

- суммарные загрузки: <!--TOTAL_DOWNLOADS-->17941<!--/TOTAL_DOWNLOADS-->
- основной релиз: [Ryzhenka Releases](https://github.com/Dimasick-git/Ryzhenka/releases)

## Документация и участие

- [Установка](docs/INSTALL.md)
- [FAQ](docs/FAQ.md)
- [Разработка и автоматизации](docs/DEVELOPMENT.md)
- [Участие в проекте](docs/CONTRIBUTING.md)
- [История деплоя](README-DEPLOY.md)

Вопросы и сообщения об ошибках можно отправить через [Issues](https://github.com/Dimasick-git/Ryzhenka/issues) или [Telegram](https://t.me/Ryazhenkacfw). Лицензия проекта находится в файле [LICENCE](LICENCE).

## References

[1]: https://github.com/Dimasick-git/Ryzhenka/releases "Ryazhenka releases"
[2]: https://github.com/Dimasick-git/Ryzhenka/blob/main/docs/INSTALL.md "Ryazhenka installation guide"
[3]: https://github.com/Dimasick-git/Ryzhenka/blob/main/scripts/repos.txt "Ryazhenka repository list"
