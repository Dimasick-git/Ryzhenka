<div align="center">

<a href="https://dimasick-git.github.io/Ryzhenka/">
  <img src="./assets/Ryazhalogo.png" alt="Ryazhenka CFW" width="100%">
</a>

# Ryazhenka CFW

**Nintendo Switch custom-firmware ecosystem built around Atmosphere and Hekate**

[![Latest release](https://img.shields.io/github/v/release/Dimasick-git/Ryzhenka?style=for-the-badge&logo=github&logoColor=white&label=Latest%20release)](https://github.com/Dimasick-git/Ryzhenka/releases/latest)
[![Ryazhenka downloads](https://img.shields.io/github/downloads/Dimasick-git/Ryzhenka/total?style=for-the-badge&label=Ryazhenka%20downloads)](https://github.com/Dimasick-git/Ryzhenka/releases)
[![Website](https://img.shields.io/badge/Website-Open-2ea44f?style=for-the-badge&logo=googlechrome&logoColor=white)](https://dimasick-git.github.io/Ryzhenka/)
[![Telegram](https://img.shields.io/badge/Telegram-Community-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/Ryazhenkacfw)
[![License](https://img.shields.io/badge/License-MIT-black?style=for-the-badge)](LICENCE)

</div>

> **Aggregate downloads:** the counter below is updated automatically from every release asset across all repositories listed in [`scripts/repos.txt`](scripts/repos.txt), not only the main Ryazhenka repository.

## Project statistics

| Metric | Current value |
|---|---:|
| **Downloads across all tracked releases** | **<!--TOTAL_DOWNLOADS-->18059<!--/TOTAL_DOWNLOADS-->** |
| Tracked repositories | **18** |
| Main release | [Open latest release](https://github.com/Dimasick-git/Ryzhenka/releases/latest) |
| Website | [dimasick-git.github.io/Ryzhenka](https://dimasick-git.github.io/Ryzhenka/) |

## English

Ryazhenka is a curated Nintendo Switch CFW ecosystem combining the main distribution package with overlays, performance controls, monitoring, system utilities, and related projects. Release contents and compatibility are defined by each release, so read its notes before installing or updating.

### Installation

1. Back up important console data and verify compatibility for your model.
2. Download the archive from [Ryazhenka Releases](https://github.com/Dimasick-git/Ryzhenka/releases/latest).
3. Copy the archive contents to the root of a FAT32-formatted SD card.
4. Use RCM and Hekate on an unpatched V1, or a compatible modchip on patched V1, V2, Lite, and OLED models.
5. Launch the Atmosphere configuration supplied with the release and verify the installed modules.

Read the complete guide in [docs/INSTALL.md](docs/INSTALL.md), with additional compatibility and safety information in [docs/FAQ.md](docs/FAQ.md).

### Ecosystem

| Component | Role | Repository |
|---|---|---|
| Ryazhenka | Main CFW bundle and release archive | [Ryzhenka](https://github.com/Dimasick-git/Ryzhenka) |
| Ryazhahand-Overlay | Tesla overlay menu and package management | [Ryazhahand-Overlay](https://github.com/Dimasick-git/Ryazhahand-Overlay) |
| Ryazha-Status-Monitor | Configurable system monitoring overlay | [Ryazha-Status-Monitor](https://github.com/Dimasick-git/Ryazha-Status-Monitor) |
| Ryazha-clk | CPU, GPU, memory, display, and VRR profiles | [Sys-clk](https://github.com/Dimasick-git/Sys-clk) |
| RyazhaAI | CFW and Switch project assistant | [RyazhaAI](https://github.com/Dimasick-git/RyazhaAI) |
| Atmosphere-RYZ | Ryazhenka-related Atmosphere distribution | [Atmosphere-RYZ](https://github.com/Dimasick-git/Atmosphere-RYZ) |
| RyazhaTune | Utility and audio project | [RyazhaTune](https://github.com/Dimasick-git/RyazhaTune) |
| AIO-Switch-Updater | In-console component updater | [AIO-Switch-Updater](https://github.com/Dimasick-git/AIO-Switch-Updater) |
| Mission-Control | Bluetooth controller support | [Mission-Control](https://github.com/Dimasick-git/Mission-Control) |
| Fizeau | Display colour and gamma controls | [Fizeau](https://github.com/Dimasick-git/Fizeau) |
| FPSLocker | Frame-rate patching for compatible games | [FPSLocker](https://github.com/Dimasick-git/FPSLocker) |
| ReverseNX-RT | Runtime dock and handheld switching | [ReverseNX-RT](https://github.com/Dimasick-git/ReverseNX-RT) |
| SwitchWave | Media and audio player | [SwitchWave](https://github.com/Dimasick-git/SwitchWave) |
| EdiZon | Save editor and cheat tools | [EdiZon](https://github.com/Dimasick-git/EdiZon) |
| ovlSysmodules | Sysmodule management overlay | [ovlSysmodules](https://github.com/Dimasick-git/ovlSysmodules) |
| PPSSPP | PSP emulator build for HOS 21 | [PPSSPP](https://github.com/Dimasick-git/PPSSPP) |
| Minecraft Online for Switch | Minecraft-related Switch project | [Minecraft-Online-for-switch](https://github.com/Dimasick-git/Minecraft-Online-for-switch) |

## Русский

Ryazhenka — экосистема кастомной прошивки Nintendo Switch на базе Atmosphere и Hekate. Она объединяет основной пакет CFW, оверлеи, управление производительностью, мониторинг и системные утилиты.

### Установка

Сделайте резервную копию важных данных консоли и проверьте совместимость модели. Скачайте архив из [последнего релиза](https://github.com/Dimasick-git/Ryzhenka/releases/latest), распакуйте его в корень FAT32 SD-карты и запустите Atmosphere через Hekate. Непатченная V1 использует RCM; для patched V1, V2, Lite и OLED нужен совместимый модчип.

Подробная инструкция находится в [docs/INSTALL.md](docs/INSTALL.md), а ответы на частые вопросы — в [docs/FAQ.md](docs/FAQ.md). Перед обновлением сверяйтесь с описанием конкретного релиза.

### Счётчик скачиваний

<div align="center">

### **<!--TOTAL_DOWNLOADS-->18059<!--/TOTAL_DOWNLOADS-->**

**Скачивания всех release assets отслеживаемых репозиториев**

[Все релизы и файлы](https://github.com/Dimasick-git/Ryzhenka/releases)

</div>

Список репозиториев для подсчёта находится в [`scripts/repos.txt`](scripts/repos.txt). Автоматизация запускается по расписанию, вручную и после публикации релиза.

## Documentation and contribution

| Document | Link |
|---|---|
| Installation | [docs/INSTALL.md](docs/INSTALL.md) |
| FAQ | [docs/FAQ.md](docs/FAQ.md) |
| Development and automation | [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) |
| Contributing | [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) |
| Deployment notes | [README-DEPLOY.md](README-DEPLOY.md) |

Issues and suggestions are welcome through [GitHub Issues](https://github.com/Dimasick-git/Ryzhenka/issues) or [Telegram](https://t.me/Ryazhenkacfw). The project is distributed under the [MIT License](LICENCE).

## References

[1]: https://github.com/Dimasick-git/Ryzhenka/releases "Ryazhenka releases"
[2]: https://github.com/Dimasick-git/Ryzhenka/blob/main/scripts/repos.txt "Repositories included in the aggregate counter"
[3]: https://docs.github.com/en/rest/releases/releases "GitHub Releases API"
