 # Внесение изменений в Ryazhenka

1) Форк и клонирование
- Форкните репозиторий на GitHub.
- Клонируйте форк: `git clone https://github.com/<your-username>/Ryzhenka.git`
- Добавьте upstream: `git remote add upstream https://github.com/Dimasick-git/Ryzhenka.git`

2) Ветки
- Обновите `main`: `git fetch upstream && git checkout main && git merge upstream/main`
- Создайте ветку: `git checkout -b feature/короткое-описание` или `fix/issue-<номер>`

3) Правила изменений
- Один PR — одна логическая задача.
- Документация должна содержать шаги воспроизведения и ожидаемый результат.
- Для изменений, влияющих на загрузчик/CFW, указывайте совместимость и тест-кейсы.
- Обновляйте `CHANGELOG.md` для пользовательских изменений.

4) Коммиты
- Чёткие сообщения: `feat:`, `fix:`, `docs:`.

5) Pull request
- Запушьте ветку в ваш форк и создайте PR в `main` upstream.
- В описании укажите: что, зачем, как тестировали, связанные issue.

6) Общение
- Баги и предложения — через GitHub Issues.
- Быстрая координация — канал Telegram: https://t.me/Ryazhenkacfw

Соблюдайте профессиональное поведение и конструктивный формат ревью.
