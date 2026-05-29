# Installation Guide / Руководство по установке

**Ryazhenka CFW** — Nintendo Switch custom firmware based on Atmosphere + Hekate.

---

## Требования

| Компонент | Детали |
|---|---|
| Консоль | Switch Erista/Mariko, Switch Lite — с модчипом; Unpatched Switch (до 2018) — без модчипа |
| SD-карта | 64–256 ГБ, формат FAT32 |
| ПК | USB-кабель + инструмент отправки payload (TegraRcmGUI / NS-USBloader) |
| Прошивка | Последний релиз: [releases/latest](https://github.com/Dimasick-git/Ryzhenka/releases/latest) |

---

## Шаг 1 — Подготовка SD-карты

1. Сохраните важные данные с карты на ПК.
2. Отформатируйте SD-карту в FAT32:
   - Windows: `guiformat` или встроенный форматировщик (для карт >32 ГБ используйте guiformat)
   - macOS/Linux: стандартные утилиты Disk Utility / `mkfs.fat`
3. По желанию — проверьте карту на ошибки: `chkdsk` (Windows) / `fsck` (Linux/macOS).

---

## Шаг 2 — Загрузка и копирование файлов

1. Скачайте последний архив Ryazhenka: [releases/latest](https://github.com/Dimasick-git/Ryzhenka/releases/latest)
2. Распакуйте архив и скопируйте **все файлы** в корень SD-карты.
3. Итоговая структура SD-карты должна содержать:
   ```
   /atmosphere/
   /bootloader/
   /config/
   /switch/
   /overlay/
   hekate_ctcaer.bin
   ```

> Копируйте файлы именно в **корень** SD, без вложенных папок.

---

## Шаг 3 — Запуск через RCM / Hekate

**Unpatched Switch:**
1. Вставьте jig в правый Joy-Con rail.
2. Удерживайте `Vol+` и нажмите кнопку питания → консоль войдёт в RCM.
3. Подключите Switch к ПК и отправьте payload `hekate_ctcaer.bin` через TegraRcmGUI.

**Switch с модчипом:**
1. Следуйте инструкции вашего модчипа (обычно автоматический RCM при включении).

**В меню Hekate:**
- `Launch → Atmosphere` — запуск основной системы (sysNAND).
- `Launch → Atmosphere (emuMMC)` — запуск с виртуальной карты памяти (рекомендовано).

---

## Шаг 4 — Первый запуск и настройка

1. **emuMMC (рекомендовано):** Hekate → emuMMC → Create emuMMC → Enable.
2. Откройте **Homebrew Menu (Sphaira)**: через Альбом или удерживайте `R` при запуске игры.
3. Откройте **Ryazhahand-Overlay** горячей клавишей `L + D-Pad Down + R`.
4. В **ovlSysmodules**: убедитесь, что нужные модули включены.
5. В разделе тюнера (ПО и утилиты): обновите компоненты при необходимости, затем перезагрузите консоль.

---

## Шаг 5 — Обновление

**Обновление Ryazhenka:**
- Скачайте новый релиз, сделайте бэкап папок `/atmosphere` и `/config`, замените файлы на SD.
- Или используйте встроенный AIO-обновлятор прямо с консоли.

**Обновление прошивки консоли:**
- Используйте **Daybreak** из Homebrew Menu.
- После обновления прошивки — обновите Ryazhenka до актуальной версии.

---

## Советы и лучшие практики

- Делайте **бэкап NAND и BOOT0/1** через Hekate перед любыми изменениями.
- Используйте **emuMMC** для безопасных экспериментов.
- Не заходите в онлайн на модифицированной системе — риск бана.
- Храните payload и резервные копии на ПК и в облаке.
- При ошибках Atmosphere — смотрите логи: `sd:/atmosphere/fatal_reports/`

---

## Частые ошибки

| Симптом | Решение |
|---|---|
| Чёрный экран при запуске | Проверьте актуальность Atmosphere/Hekate и sigpatches |
| Не открывается Homebrew Menu | Запустите через Альбом или `R` при старте игры |
| Оверлей не работает | Обновите Ryazhahand-Overlay и соответствующие sysmodules |
| NSP не устанавливается | Проверьте sigpatches и свободное место на SD |
| Консоль зависает на логотипе | Зажмите кнопку питания на 30 секунд, затем короткое нажатие |

---

## Полезные ссылки

- Atmosphere: https://github.com/Atmosphere-NX/Atmosphere
- Hekate: https://github.com/CTCaer/hekate
- Telegram: https://t.me/Ryazhenkabestcfw
- Issues: https://github.com/Dimasick-git/Ryzhenka/issues

---

Готово! Теперь ты на Ryazhenka. Наслаждайся и будь осторожен.
