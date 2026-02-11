# Contributing to Ryazhenka

This document describes the required workflow for contributions. Keep changes focused and documented.

1) Fork and clone
- Fork the repository on GitHub.
- Clone your fork: `git clone https://github.com/<your-username>/Ryzhenka.git`
- Add upstream: `git remote add upstream https://github.com/Dimasick-git/Ryzhenka.git`

2) Branching
- Update local main: `git fetch upstream && git checkout main && git merge upstream/main`
- Create a feature branch: `git checkout -b feature/short-description` or `fix/issue-<number>`

3) Changes and style
- Keep commits small and focused: one logical change per PR.
- Documentation changes must include examples and expected outcomes.
- For changes affecting bootloader/CFW behavior, include compatibility notes and test steps.
- Update `CHANGELOG.md` with a concise entry for user-visible changes.

4) Commits
- Use clear commit messages. Examples:
  - `feat: add overlay preset for controller profiles`
  - `fix: correct profile application in Ryazha-clk`
  - `docs: document install procedure for Mariko`

5) Pull Request
- Push your branch to your fork: `git push -u origin feature/short-description`
- Create a PR targeting `main` in the upstream repository.
- PR description must state: what changed, why, how it was tested, and include linked issues.

6) Review
- Respond to review comments in the same branch.
- Do not merge your own PR into `main` unless explicitly authorized.

7) Communication
- Use GitHub Issues for bugs and enhancement requests.
- For operational coordination use the project Telegram channel: https://t.me/Ryazhenka

Code of conduct: maintain professional conduct and constructive review comments.

The project maintainers will process PRs according to priority and release schedule.
