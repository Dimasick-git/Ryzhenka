# 📥 Установка Ryzhenka CFW (Nintendo Switch)

Добро пожаловать! Этот гайд поможет установить и запустить Ryazhenka — современную сборку CFW на базе Atmosphere и Hekate. Выполняйте шаги по порядку.

—

## ✅ Требования
- Совместимая консоль: Switch (Erista/Mariko), Switch Lite — с модчипом; Unpatched — без модчипа
- SD-карта: рекомендовано 64–256 ГБ, формат FAT32
- ПК с USB и инструментом для отправки payload (TegraRcmGUI/NS-USBloader/rcm-payload)
- Последний релиз Ryazhenka: https://github.com/Dimasick-git/Ryzhenka/releases/latest

—

## 1) Подготовка SD-карты
1. Сохраните важные данные с карты на ПК
2. Форматируйте SD-карту в FAT32 (гуайд: guiformat или стандартные средства macOS/Linux)
3. Убедитесь, что карта чистая и без ошибок (по желанию — chkdsk/fsck)

—

## 2) Загрузка файлов
1. Скачайте архив последнего релиза Ryazhenka
2. Распакуйте архив и скопируйте ВСЕ файлы в корень SD-карты
3. Структура должна содержать папки: /bootloader, /atmosphere, /switch, /config и т.д.

Совет: не вкладывайте файлы в дополнительную папку — копируйте именно в корень SD.

—

## 3) Запуск через RCM/Hekate
1. Переведите Switch в RCM:
   - Unpatched: удерживайте Vol+ и используйте jig при включении
   - С модчипом: следуйте инструкции модчипа (обычно авто-RCM)
2. Отправьте payload hekate_ctcaer.bin с ПК на консоль
3. В меню Hekate выберите: Launch → Atmosphere (emuMMC при наличии)

—

## 4) Первый запуск и базовая настройка
1. Если используете emuMMC: в Hekate → emuMMC → Create emuMMC (по инструкции) → Enable
2. В системе откройте Homebrew Menu (обычно через Album или удерживая R при запуске игры)
3. Откройте Tesla Menu (комбинация кнопок: обычно L + D-Pad Down + R3) и убедитесь, что оверлеи работают
4. В настройках Atmosphere проверьте:
   - Вкл. нужные sysmodules (по умолчанию включены только безопасные)
   - Обновите сигпатчи при необходимости

—

## 5) Обновления
- Обновление Ryazhenka: скачайте новый релиз и замените файлы на SD (сделайте резервную копию своих настроек: /atmosphere, /switch)
- Обновление прошивки консоли: используйте Daybreak (из Homebrew) и следуйте официальным гайдам Atmosphere
- После обновлений — обязательно обновляйте sigpatches для совместимости

—

## 6) Советы и лучшие практики
- Делайте бэкап NAND и BOOT0/1 через Hekate до любых изменений
- Используйте emuMMC для безопасной игры и экспериментов
- Не заходите в онлайн на модифицированной системе — риск бана
- Храните payload и важные файлы дублированно (на ПК/облаке)
- При ошибках читайте лог Atmosphere (sd:/atmosphere/…/fatal_reports)

—

## 7) Частые ошибки (кратко)
- Black screen при запуске: проверьте версию Atmosphere и сигпатчи
- Не открывается Homebrew Menu: запускайте через Album или удерживайте R при запуске игры
- Оверлей не работает: проверьте Tesla и соответствующие sysmodules; обновите
- NSP не устанавливаются: проверьте сигпатчи и место на SD

Полный FAQ: см. файл FAQ.md

—

## 8) Полезные ссылки
- Atmosphere: https://github.com/Atmosphere-NX/Atmosphere
- Hekate: https://github.com/CTCaer/hekate
- Tesla Menu: https://github.com/WerWolv/Tesla-Menu
- Sigpatches: https://github.com/ITotalJustice/patches
- Поддержка: https://t.me/Ryazhenkabestcfw

—

Готово! Теперь ты на Ryazhenka. Наслаждайся и будь осторожен ⚠️
