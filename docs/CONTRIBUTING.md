# Contributing to Ryazhenka / Внесение изменений

---

## Быстрый старт

### 1. Форк и клонирование

```bash
# Форкните репозиторий на GitHub
git clone https://github.com/<your-username>/Ryzhenka.git
cd Ryzhenka
git remote add upstream https://github.com/Dimasick-git/Ryzhenka.git
```

### 2. Ветки

```bash
# Обновите main
git fetch upstream && git checkout main && git merge upstream/main

# Создайте ветку
git checkout -b feature/короткое-описание
# или
git checkout -b fix/issue-<номер>
```

### 3. Правила изменений

- **Один PR — одна задача.**
- Описание PR должно содержать: что изменено, зачем, как тестировалось, связанные Issues.
- Для изменений, затрагивающих CFW/загрузчик, укажите совместимость и тест-кейсы.
- Обновляйте `CHANGELOG.md` для пользовательских изменений.

### 4. Коммиты

```
feat:  добавляет новую функцию
fix:   исправляет баг
docs:  обновляет документацию
```

### 5. Pull Request

```bash
git push -u origin feature/короткое-описание
# Создайте PR в GitHub на ветку main upstream
```

---

## Что можно улучшать

- Документация и переводы
- Конфигурации модулей и профили производительности
- Скрипты автоматизации и CI/CD
- Описания и CHANGELOG для новых релизов
- Сообщения об ошибках с логами (Issues)

---

## Общение

- Баги и предложения → [GitHub Issues](https://github.com/Dimasick-git/Ryzhenka/issues)
- Быстрая координация → [Telegram](https://t.me/Ryazhenkacfw)

Соблюдайте профессиональное поведение и конструктивный формат ревью.
