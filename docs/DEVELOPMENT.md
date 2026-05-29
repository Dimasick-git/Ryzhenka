# Development Workflow / Руководство по разработке

Руководство по процессу разработки Ryazhenka с использованием автоматизации CI/CD.

---

## Структура веток

```
main (стабильный релиз)
  ↑
  └─ develop (интеграция всех изменений)
       ↓
    feature/* (новые функции)
    fix/* (исправления)
    docs/* (документация)
```

| Ветка | Назначение | Правила |
|-------|-----------|--------|
| `main` | Стабильный код, готовый к релизу | Только PR из develop, теги для релизов |
| `develop` | Основная ветка разработки | Автоматическая сборка при каждом push |
| `feature/*` | Новые функции | Одна функция = одна ветка |
| `fix/*` | Исправления багов | Ссылка на Issue обязательна |
| `docs/*` | Обновления документации | Может быть merged прямо в develop |

---

## Процесс разработки

### 1. Начало работы

```bash
git fetch upstream
git checkout develop
git pull upstream develop
git checkout -b feature/my-feature
```

### 2. Разработка и коммиты

```bash
git commit -m "feat: add cool feature"
bash scripts/build.sh
```

### 3. Обновление CHANGELOG

Добавьте изменение в `CHANGELOG.md` в секцию последней версии:

```markdown
## [X.Y.Z] — TBD
- Ваше изменение
```

### 4. Pull Request

```bash
git push -u origin feature/my-feature
# Создайте PR в GitHub: что изменено, зачем, как тестировалось, связанные Issues
```

---

## Автоматизация CI/CD

### Workflow: Update Downloads (`update-downloads.yml`)

Запускается по расписанию (каждые 6 часов), при публикации релиза и вручную.

- Скрипт `scripts/update_downloads.py` считает загрузки по списку из `scripts/repos.txt`.
- Обновляет счётчик `<!--TOTAL_DOWNLOADS-->` в `README.md`.
- Workflow делает git-коммит и пуш через встроенный шаг CI.

### Локальный запуск скрипта

```bash
GITHUB_TOKEN=<ваш_токен> python3 scripts/update_downloads.py
```

### Workflow: Build / Release

После push в develop:
- Собирает архив проекта.
- Генерирует контрольные суммы.
- Выгружает артефакты.

Деплой в main:
```bash
# GitHub UI: Actions → Deploy to Main → Run workflow
gh workflow run deploy.yml -f branch=develop -f merge_type=squash
```

Создание релиза:
```bash
gh workflow run release.yml -f version=7.3.0 -f release_type=minor
```

---

## Локальная сборка

```bash
bash scripts/build.sh
```

Результаты в `dist/`:
- `Ryazhenka-X.Y.Z.zip` — архив проекта
- `checksums-sha256.txt` — SHA256 хеши
- `BUILD_REPORT.md` — отчёт о сборке

---

## Соглашения

### Commit Messages

```
feat:     новая функция
fix:      исправление бага
docs:     обновление документации
refactor: переработка без изменения поведения
perf:     улучшение производительности
chore:    изменения сборки, зависимостей
ci:       изменения CI/CD
```

### PR Titles

```
[FEATURE] Краткое описание
[BUGFIX]  Краткое описание
[DOCS]    Краткое описание
```

---

## Статусы сборки

| Статус | Описание |
|--------|----------|
| ✅ Passed | Сборка успешна, артефакты готовы |
| ⏳ In Progress | Сборка идёт |
| ❌ Failed | Ошибка — проверь логи Actions |
| ⊘ Cancelled | Сборка отменена вручную |

---

## Checklist перед релизом

- [ ] Все функции завершены и протестированы
- [ ] `CHANGELOG.md` обновлён
- [ ] `README.md` актуален
- [ ] Код залит в develop и прошёл CI
- [ ] Подготовлено объявление (Telegram)
- [ ] Версия в формате `X.Y.Z`

---

## Troubleshooting

**Сборка не запускается:**
```bash
git add . && git commit -m "..." && git push origin develop
```

**Скрипт update_downloads падает с ошибкой git identity:**
- Это ожидаемо при локальном запуске без git-конфига.
- В CI git-конфиг настраивается workflow автоматически.

**Релиз не создаётся:**
- Проверь, что main обновлён из develop.
- Версия должна быть в формате `X.Y.Z`.

---

## Полезные ссылки

- [GitHub Actions](https://docs.github.com/en/actions)
- [GitHub CLI](https://cli.github.com/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
