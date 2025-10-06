- sys-clk — управление частотами и power-profiles (пример: 2.0.1+r9)
- Status Monitor — мониторинг температур/заряда (пример: 1.1.9+r6)
- FPSLocker — блокировка/ограничение FPS (пример: 2.3.0)
- EdiZon — инструменты для работы с сохранениями и модами (пример: v1.0.10)
- ReverseNX-RT — runtime оптимизации (пример: 2.1.0)
- Fizeau — оптимизации и ускорение (пример: 2.8.1)
- Switchcraft (Loader OC) — вспомогательный загрузчик/инструмент (пример: v1.6.4)

Примечание: приведённые версии — примеры, обнаруженные в документации/скриншотах в репозитории. Окончательные версии и точный список модулей находятся в релизных архивах — проверяйте ZIP/manifest при скачивании.

---

## Подробная информация по релизам

Ниже — развернутые карточки релизов. Встраиваются только официальные заставки (`bbootlogo.png`) из релизов, а под ними — список ассетов и ссылки.

## Автоматический список релизов (обновляется автоматически)

<!-- RELEASES_START -->
<!-- RELEASES_END -->

<!-- end of automated block -->

### v5.0.0 — опубликован 2025-10-03
![bbootlogo v5.0.0](https://github.com/Dimasick-git/Ryzhenka/releases/download/v5.0.0/bbootlogo.png)

Краткое: основный релиз, включающий обновлённый Tuner и набор предварительно настроенных профилей.

Ассеты:
- bbootlogo.png — https://github.com/Dimasick-git/Ryzhenka/releases/download/v5.0.0/bbootlogo.png
- Ryazhenkabestcfw.zip — https://github.com/Dimasick-git/Ryzhenka/releases/download/v5.0.0/Ryazhenkabestcfw.zip
- Ryazhenka_AIO.zip — https://github.com/Dimasick-git/Ryzhenka/releases/download/v5.0.0/Ryazhenka_AIO.zip
- Ryazhenka_lite.zip — https://github.com/Dimasick-git/Ryzhenka/releases/download/v5.0.0/Ryazhenka_lite.zip

Страница релиза: https://github.com/Dimasick-git/Ryzhenka/releases/tag/v5.0.0

Подробнее: смотрите заметки релиза и `CHANGELOG.md` для полного списка изменений.

---

Полное описание и важные изменения (v5.0.0)
- Tuner: обновлён до v8.0 — добавлены профили Performance/Standard/Economy, улучшенная система сохранения и отката профилей.
- Atmosphère: совместимость с версиями 1.9.5+; внесены корректировки патчей для безопасности сетевого стека.
- sys-clk: переработка power-profiles, улучшенная интеграция с Tuner, добавлены новые режимы энергосбережения.
- Новые и обновлённые модули: Ultrahand (улучшенное управление темами), Status Monitor (более точный монитор температур и батареи), FPSLocker обновлён для избежания дрожания fps в некоторых играх.
- Улучшены сценарии установки: автоматическое резервирование `emummc` при создании EmuNAND, проверка наличия критичных конфигов перед установкой.

Рекомендации по обновлению с предыдущих версий:
- Сделайте полный бэкап `emummc`/NAND и SD-образа перед обновлением.
- Проверьте `hekate_ipl.ini` и `payloads` на предмет индивидуальных правок — некоторые старые настройки могут конфликтовать с новыми профилями.
- После установки зайдите в Ultrahand → Tuner и загрузите рекомендуемый профиль для вашей конфигурации (Handheld/Docked).

Проверка целостности и подписи:
- Рекомендуется сверять SHA256 архива: если релиз содержит `SHA256SUMS` или подписи — используйте их.
- Пример (локально):
	- powershell: `Get-FileHash .\Ryazhenkabestcfw.zip -Algorithm SHA256`

Известные проблемы:
- Некоторым пользователям требуется вручную пересоздать профиль sys-clk после обновления (если старые настройки конфликтуют).
- В редких случаях старые версии модулей homebrew могут конфликтовать с новыми sysmodules — проверьте совместимость в `CHANGELOG.md`.


### v4.5.0 — опубликован 2025-09-26
![bbootlogo v4.5.0](https://github.com/Dimasick-git/Ryzhenka/releases/download/v4.5.0/bbootlogo.png)

Краткое: промежуточный релиз с фиксом для overlay и обновлениями модулей.

Ассеты:
- bbootlogo.png — https://github.com/Dimasick-git/Ryzhenka/releases/download/v4.5.0/bbootlogo.png
- Ryazhenkabestcfw.zip — https://github.com/Dimasick-git/Ryzhenka/releases/download/v4.5.0/Ryazhenkabestcfw.zip
- Ryazhenka_AIO.zip — https://github.com/Dimasick-git/Ryzhenka/releases/download/v4.5.0/Ryazhenka_AIO.zip
- Ryazhenka_lite.zip — https://github.com/Dimasick-git/Ryzhenka/releases/download/v4.5.0/Ryazhenka_lite.zip

Страница релиза: https://github.com/Dimasick-git/Ryzhenka/releases/tag/v4.5.0

---

### v4.0.0 — опубликован 2025-09-06
![bbootlogo v4.0.0](https://github.com/Dimasick-git/Ryzhenka/releases/download/v4.0.0/bbootlogo.png)

Краткое: начальный публичный релиз серии, содержит базовый набор модулей и шаблонов конфигурации.

Ассеты:
- bbootlogo.png — https://github.com/Dimasick-git/Ryzhenka/releases/download/v4.0.0/bbootlogo.png
- Ryazhenkabestcfw.zip — https://github.com/Dimasick-git/Ryzhenka/releases/download/v4.0.0/Ryazhenkabestcfw.zip
- Ryazhenka_AIO.zip — https://github.com/Dimasick-git/Ryzhenka/releases/download/v4.0.0/Ryazhenka_AIO.zip
- Ryazhenka_lite.zip — https://github.com/Dimasick-git/Ryzhenka/releases/download/v4.0.0/Ryazhenka_lite.zip

Страница релиза: https://github.com/Dimasick-git/Ryzhenka/releases/tag/v4.0.0

---

## Troubleshooting — частые проблемы и решения

- Прошивка не загружается: проверьте payload и корректность `hekate_ipl.ini`.
- Проблемы с EmuNAND: откатитесь на бэкап и повторите создание EmuNAND.
- Высокая температура при разгоне: снизьте профиль на Tuner и проверьте вентили/условия эксплуатации.
- Homebrew не виден: проверьте папку `switch` на SD и корректность прав/файлов.

Если не помогло — создайте Issue с подробным описанием и логами или напишите в Telegram (@Ryazhenkabestcfw).

---

## Релизы и подписи

Все официальные сборки публикуются в разделе Releases на GitHub: https://github.com/Dimasick-git/Ryzhenka/releases

Рекомендуется проверять контрольные суммы (SHA256) для загружаемых архивов — если подписи/контрольные суммы предоставлены в релизе, сверяйте их перед установкой.

---

## Вклад и разработка

Хотите помочь или предложить улучшение? Отлично.

1. Форкните репозиторий.
2. Создайте ветку feature/bugfix.
3. Внесите изменения и откройте Pull Request с описанием.

Обратите внимание: любые изменения, затрагивающие конфигурации загрузчика или ядра, должны иметь подробное обоснование и тесты на совместимость.

---

## Контакты и поддержка

- Telegram: https://t.me/Ryazhenkabestcfw (@Ryazhenkabestcfw) — основное место для обсуждений, вопросов и анонсов релизов.
- GitHub Releases: https://github.com/Dimasick-git/Ryzhenka/releases — скачивание сборок и архивов.
- Issues: используйте раздел Issues этого репозитория для баг-репортов и предложений.

---

## Лицензия

Проект распространяется в соответствии с файлом `LICENCE` в корне репозитория.

---

## Спасибо и кредиты

Большое спасибо всем, кто тестировал и помогал с интеграцией модулей и тем. Dimaick-git.