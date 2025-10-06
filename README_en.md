# Ryzhenka CFW — Custom Firmware for Nintendo Switch 🎮

[![Releases](https://img.shields.io/github/v/release/Dimasick-git/Ryzhenka?style=for-the-badge)](https://github.com/Dimasick-git/Ryzhenka/releases)
[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENCE)

Ryzhenka is a curated custom firmware (CFW) build for the Nintendo Switch focused on stability, theme customization, EmuNAND support and easy-to-use tuning tools for overclocking and system tweaks.

Quick links
- Releases: https://github.com/Dimasick-git/Ryzhenka/releases
- Main repo: https://github.com/Dimasick-git/Ryzhenka
- Telegram: https://t.me/Ryazhenkabestcfw (@Ryazhenkabestcfw)
- Changelog: `CHANGELOG.md`

---

## What Ryzhenka contains
Ryzhenka bundles and configures a set of components to provide a complete, ready-to-use CFW experience:

- Bootloader: Hekate / Fusee configuration and launch menu
- Core CFW: Atmosphère with curated patches and compatibility fixes
- EmuNAND: ready-made profiles for isolated testing and development
- UI / Themes: resources and theme integration for Ultrahand and related tools
- Tuner: Ryazhenkabestcfw Tuner — profiles, backups and live tuning
- Sysmodules & Homebrew: recommended system modules and homebrew utilities
- Overlays: sys-clk / Tesla overlay for monitoring and on-the-fly frequency control
- Scripts & configs: automation for backups, updates and recovery

If you need an exact module list and versions, check the release ZIPs (they contain manifests and the definitive file list).

---

## Highlights (what makes this distribution special)

- EmuNAND support and safe profiles for testing homebrew
- Preset overclock/undervolt profiles for Handheld/Docked/Battery Saver modes
- Full integration with Ultrahand / Tuner for in-device configuration
- A tested set of sysmodules and homebrew utilities shipped together
- Simple install and recovery procedures

---

## Quick install (summary)

Warning: Using custom firmware can void warranty and may result in bans for online use. Proceed at your own risk.

1. Download the release archive from: https://github.com/Dimasick-git/Ryzhenka/releases
2. Extract the archive to the root of your SD card (backup first).
3. Verify presence of `hekate_ipl.ini`, `payloads`, `atmosphere/` folder, etc.
4. Boot the console into your chosen payload (Hekate / Fusee, RCM method of your choice).
5. Select the desired profile (SysNAND / EmuNAND) and boot.
6. On first boot, open Ultrahand / Tuner and confirm sysmodules are installed and active.

Tips:
- Keep a copy of your NAND or emuMMC before making major changes.
- Do not go online from a modified SysNAND unless you know what protections you're using.

---

## EmuNAND (short guide)

EmuNAND creates an isolated NAND copy for experiments and homebrew testing.

1. Boot into Hekate / bootloader.
2. Choose EmuNAND → Create EmuNAND from SysNAND (or the equivalent option).
3. Wait until creation finishes and reboot into EmuNAND.
4. Check EmuNAND status in Ryzhenka Settings → System Info → NAND Type.

Keep saves and important backups outside the device while experimenting.

---

## Tuner (Ryazhenkabestcfw Tuner) — features

- Overclock/undervolt CPU, GPU and RAM with preset profiles
- Save and load tuning profiles and backups
- Live integration with sys-clk and overlays for real-time monitoring
- Preset quick actions: Performance, Economy, Standard (v8.0+)

Always apply tuning changes gradually and monitor temperature and system stability.

---

## Modules and versions (verified highlights)

Below is a concise list of important modules and tools that are included or referenced in release notes. For an authoritative list, inspect the release ZIP manifests.

- Atmosphère — compatible versions referenced in releases (v1.9.x+)
- sys-clk — custom tuned version (integration from Kirill-git / Sys-clk-for-RYZ)
- Ryazhenkabestcfw Tuner — Tuner tool (v8.0+ mentioned in v5.0.0)
- Ultrahand — theme and module manager (packaged/referenced)
- nx-ovlloader+ — overlay loader (used by Ultrahand / overlays)
- EdiZon — save editor and mod tools
- Status Monitor — temperature and battery monitoring module
- FPSLocker — FPS control utility
- ReverseNX-RT, Fizeau — performance and optimization utilities

Notes: release notes mention updated sys-clk, Tuner v8.0 in v5.0.0 and Atmosphère 1.9.5+ compatibility in the latest releases.

---

## Confirmed release assets (v4.0.0, v4.5.0, v5.0.0)

I scanned GitHub Releases and confirmed these assets (use them for README images and download links):

- v4.0.0 (published 2025-09-06)
  - bbootlogo.png — https://github.com/Dimasick-git/Ryzhenka/releases/download/v4.0.0/bbootlogo.png
  - Ryazhenkabestcfw.zip — https://github.com/Dimasick-git/Ryzhenka/releases/download/v4.0.0/Ryazhenkabestcfw.zip
  - Ryazhenka_AIO.zip — https://github.com/Dimasick-git/Ryzhenka/releases/download/v4.0.0/Ryazhenka_AIO.zip
  - Ryazhenka_lite.zip — https://github.com/Dimasick-git/Ryzhenka/releases/download/v4.0.0/Ryazhenka_lite.zip

- v4.5.0 (published 2025-09-26)
  - bbootlogo.png — https://github.com/Dimasick-git/Ryzhenka/releases/download/v4.5.0/bbootlogo.png
  - Ryazhenkabestcfw.zip — https://github.com/Dimasick-git/Ryzhenka/releases/download/v4.5.0/Ryazhenkabestcfw.zip
  - Ryazhenka_AIO.zip — https://github.com/Dimasick-git/Ryzhenka/releases/download/v4.5.0/Ryazhenka_AIO.zip
  - Ryazhenka_lite.zip — https://github.com/Dimasick-git/Ryzhenka/releases/download/v4.5.0/Ryazhenka_lite.zip

- v5.0.0 (published 2025-10-03)
  - bbootlogo.png — https://github.com/Dimasick-git/Ryzhenka/releases/download/v5.0.0/bbootlogo.png
  - Ryazhenkabestcfw.zip — https://github.com/Dimasick-git/Ryzhenka/releases/download/v5.0.0/Ryazhenkabestcfw.zip
  - Ryazhenka_AIO.zip — https://github.com/Dimasick-git/Ryzhenka/releases/download/v5.0.0/Ryazhenka_AIO.zip
  - Ryazhenka_lite.zip — https://github.com/Dimasick-git/Ryzhenka/releases/download/v5.0.0/Ryazhenka_lite.zip

The releases section is maintained automatically by the included GitHub Action: when a release is published, the README files are updated with the new release assets.

<!-- RELEASES_START -->
<!-- The releases list below is maintained automatically by .github/workflows/update-readme-on-release.yml -->
- v5.0.0 (published 2025-10-03)
  - bbootlogo.png — https://github.com/Dimasick-git/Ryzhenka/releases/download/v5.0.0/bbootlogo.png
  - Ryazhenkabestcfw.zip — https://github.com/Dimasick-git/Ryzhenka/releases/download/v5.0.0/Ryazhenkabestcfw.zip
  - Ryazhenka_AIO.zip — https://github.com/Dimasick-git/Ryzhenka/releases/download/v5.0.0/Ryazhenka_AIO.zip
  - Ryazhenka_lite.zip — https://github.com/Dimasick-git/Ryzhenka/releases/download/v5.0.0/Ryazhenka_lite.zip

<!-- RELEASES_END -->

---

## Troubleshooting (common issues)

- Firmware won't boot: check payload and `hekate_ipl.ini` correctness
- EmuNAND issues: restore backup and recreate EmuNAND
- High temperature after tuning: reduce the profile and test stability
- Homebrew not visible: check `switch/` folder on SD and file integrity

If you need help, open an Issue or write in Telegram (@Ryazhenkabestcfw).

---

## Releases & signing

All official builds are published in GitHub Releases: https://github.com/Dimasick-git/Ryzhenka/releases

Verify checksums (SHA256) where provided before installing.

---

## Contributing

Contributions are welcome:

1. Fork the repository
2. Create a branch feature/your-feature
3. Make changes and open a Pull Request with a description

Note: changes affecting bootloader or low-level configs should include compatibility notes and testing information.

---

## Contact / Support

- Telegram: https://t.me/Ryazhenkabestcfw (@Ryazhenkabestcfw)
- Releases: https://github.com/Dimasick-git/Ryzhenka/releases
- Issues: use the repository Issues for bug reports and feature requests

---

## License

This project is licensed according to the `LICENCE` file in the project root.

---

Next steps I can help with (choose any):
- Add `CONTRIBUTING.md`, issue/PR templates and a release template.
- Add a GitHub Action to validate README asset links and mark unavailable items.

Tell me which of the above you'd like and I'll implement it.
