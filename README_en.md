# Ryzhenka CFW — Gallery and quick reference

Ryzhenka — curated custom firmware for Nintendo Switch. Below are embedded screenshots and short captions so you can see the firmware without downloading release assets.

---

## Detailed release notes and assets

Below are expanded release cards with the official boot splash (`bbootlogo.png`) embedded and a list of release assets.

---

## Automated releases list (maintained by workflow)

<!-- RELEASES_START -->
<!-- RELEASES_END -->
<!-- end of automated block -->

### v5.0.0 — published 2025-10-03

![bbootlogo v5.0.0](https://github.com/Dimasick-git/Ryzhenka/releases/download/v5.0.0/bbootlogo.png)

Summary: major release including updated Tuner and tuned performance profiles.

Assets:
- bbootlogo.png — https://github.com/Dimasick-git/Ryzhenka/releases/download/v5.0.0/bbootlogo.png
- Ryazhenkabestcfw.zip — https://github.com/Dimasick-git/Ryzhenka/releases/download/v5.0.0/Ryazhenkabestcfw.zip
- Ryazhenka_AIO.zip — https://github.com/Dimasick-git/Ryzhenka/releases/download/v5.0.0/Ryazhenka_AIO.zip
- Ryazhenka_lite.zip — https://github.com/Dimasick-git/Ryzhenka/releases/download/v5.0.0/Ryazhenka_lite.zip

Release page: https://github.com/Dimasick-git/Ryzhenka/releases/tag/v5.0.0

---

Full changes and important notes (v5.0.0)

- Tuner: upgraded to v8.0 — added Performance/Standard/Economy profiles, better profile save/rollback.
- Atmosphère: compatibility with 1.9.5+; security patches for network stack applied.
- sys-clk: reworked power-profiles, improved integration with Tuner, added new power-saving modes.
- Modules updated: Ultrahand (theme management improvements), Status Monitor (better temp/battery telemetry), FPSLocker (fixes for jitter in some titles).
- Installer: automatic `emummc` backup on EmuNAND creation and preflight checks for critical configs.

Upgrade recommendations:

- Take a full backup of emummc/NAND and your SD image before upgrading.
- Review `hekate_ipl.ini` and `payloads` for custom edits — some legacy settings may conflict with new profiles.
- After install, open Ultrahand → Tuner and select the recommended profile for your device (Handheld/Docked).

Verification and signatures:

- Verify SHA256 of archives if provided in the release (look for `SHA256SUMS` or signatures).
- Example (PowerShell):
	- `Get-FileHash .\Ryazhenkabestcfw.zip -Algorithm SHA256`

Known issues:

- Some users may need to recreate sys-clk profiles manually after upgrade if old settings conflict.
- Older homebrew modules may be incompatible with newer sysmodules — check `CHANGELOG.md` for compatibility notes.

### v4.5.0 — published 2025-09-26

![bbootlogo v4.5.0](https://github.com/Dimasick-git/Ryzhenka/releases/download/v4.5.0/bbootlogo.png)

Summary: maintenance release with overlay fixes and module updates.

Assets:
- bbootlogo.png — https://github.com/Dimasick-git/Ryzhenka/releases/download/v4.5.0/bbootlogo.png
- Ryazhenkabestcfw.zip — https://github.com/Dimasick-git/Ryzhenka/releases/download/v4.5.0/Ryazhenkabestcfw.zip
- Ryazhenka_AIO.zip — https://github.com/Dimasick-git/Ryzhenka/releases/download/v4.5.0/Ryazhenka_AIO.zip
- Ryazhenka_lite.zip — https://github.com/Dimasick-git/Ryzhenka/releases/download/v4.5.0/Ryazhenka_lite.zip

Release page: https://github.com/Dimasick-git/Ryzhenka/releases/tag/v4.5.0

---

### v4.0.0 — published 2025-09-06

![bbootlogo v4.0.0](https://github.com/Dimasick-git/Ryzhenka/releases/download/v4.0.0/bbootlogo.png)

Summary: initial public release with a base set of modules and configuration templates.

Assets:
- bbootlogo.png — https://github.com/Dimasick-git/Ryzhenka/releases/download/v4.0.0/bbootlogo.png
- Ryazhenkabestcfw.zip — https://github.com/Dimasick-git/Ryzhenka/releases/download/v4.0.0/Ryazhenkabestcfw.zip
- Ryazhenka_AIO.zip — https://github.com/Dimasick-git/Ryzhenka/releases/download/v4.0.0/Ryazhenka_AIO.zip
- Ryazhenka_lite.zip — https://github.com/Dimasick-git/Ryzhenka/releases/download/v4.0.0/Ryazhenka_lite.zip

Release page: https://github.com/Dimasick-git/Ryzhenka/releases/tag/v4.0.0

---

---

## 💖 Support the Project

If you like Ryazhenka Best CFW, support the project:

- 💰 **[Support on Boosty](https://boosty.to/dimasick-git/donate)** — primary way to support the project
- ⭐ Star on GitHub
- 🔄 Share with friends
- 🐛 Report bugs and suggest improvements
- 💬 Participate in discussions
- 📝 Improve documentation

---

## Quick links

- Releases: https://github.com/Dimasick-git/Ryzhenka/releases
- Telegram: https://t.me/Ryazhenkabestcfw (@Ryazhenkabestcfw)
- Changelog: `CHANGELOG.md`

---

If you want different captions, a different image order or additional metadata under each image (version / release link / file size), tell me the exact format and I'll update both READMEs accordingly.
