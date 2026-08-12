# Development Guide

## Project structure

The website is a static single-page site. `index.html` contains the page markup, styles, and client-side GitHub API integration. `assets/` contains the logo and fallback icon. `src/input.css` and `tailwind.config.js` provide the Tailwind build input, while the generated `dist/output.css` is created during deployment and is not committed. Documentation lives in `docs/`; release and download helpers live in `scripts/`.

## Local development

Use Node.js 20 or newer and npm. Install dependencies and build the stylesheet with:

```bash
npm install
npm run build
```

For watch mode during CSS work, run `npm run dev`. The page is static, so serve it through a local HTTP server; opening it directly from `file://` may block GitHub API requests.

## Verification before a commit

A website or documentation change is ready only after the production build succeeds, all local asset paths exist, the links to `docs/` resolve, and the page works with both successful and failed GitHub API responses. Check responsive navigation at desktop and mobile widths, keyboard focus, reduced-motion behaviour, release rendering, cache fallback, and external links.

```bash
npm run build
python3 - <<'PY'
from pathlib import Path
text = Path('index.html').read_text(encoding='utf-8')
for marker in ('docs/INSTALL.md', 'docs/FAQ.md', 'docs/CONTRIBUTING.md', '<!--CURRENT_VERSION-->', '<!--TOTAL_DOWNLOADS-->'):
    assert marker in text, marker
print('static assertions: ok')
PY
```

## GitHub Actions

The canonical Pages pipeline is `.github/workflows/deploy.yml`. It builds CSS, retrieves the latest release and aggregate download count, injects values into the HTML markers, uploads a Pages artifact, and deploys it. `.github/workflows/update-downloads.yml` updates the aggregate value in `README.md` on a six-hour schedule, manually, or after a published release. Generated commits use the repository owner's identity.

Do not introduce a second Pages deployment workflow or commit generated `dist/` output unless the deployment design changes deliberately. Keep `scripts/repos.txt` limited to public Ryazhenka ecosystem repositories that have release assets and should contribute to the aggregate counter.

## Release checklist

Before publishing a release, verify the archive contents, compatibility notes, installation instructions, and links in the release description. After publishing, confirm that the download workflow can update `README.md`, the Pages workflow completes, the live page displays the release list, and the repository Actions page contains no new failures.

## Documentation policy

The README contains a short English overview followed by a Russian overview. Detailed procedures belong in `docs/INSTALL.md`, `docs/FAQ.md`, and this guide. Avoid duplicating the complete repository table in multiple files; link to the canonical repository or release page instead.

## Commit conventions

Use a short conventional prefix such as `docs:`, `fix:`, `ci:`, or `chore:`. Commits made for this repository must use the repository owner's configured author identity, not an assistant or automation identity.
