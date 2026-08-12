# Deployment and troubleshooting

The site is deployed to GitHub Pages by `.github/workflows/deploy.yml` after pushes to `main` or a manual workflow run. The workflow installs npm dependencies, builds `dist/output.css`, retrieves the latest release and aggregate downloads, injects the HTML markers, uploads the repository as a Pages artifact, and deploys it.

## Local verification

```bash
npm install
npm run build
python3 -m http.server 4173
```

Open `http://127.0.0.1:4173/` and verify the navigation, installation link, ecosystem links, compatibility table, release list, GitHub fallback, and mobile menu. The page uses GitHub's public API and caches successful responses in `localStorage` for 15 minutes.

## Known failure modes

If GitHub API requests are rate-limited or temporarily unavailable, the page keeps its static content and shows a manual Releases link instead of failing completely. If the API data is stale, clear the `ryazhenka-pages-v1` local-storage entry and reload.

If a deployment fails, check the build step first, then the release lookup and download aggregation steps, and finally the Pages environment. A zero download result is intentionally not injected into the HTML. The workflow must not rely on files that are absent from this repository, such as `scripts/build.sh`, `release.yml`, or root-level `INSTALL.md`.

## Documentation paths

The canonical documents are `docs/INSTALL.md`, `docs/FAQ.md`, `docs/DEVELOPMENT.md`, and `docs/CONTRIBUTING.md`. Links from the website must point to these paths.
