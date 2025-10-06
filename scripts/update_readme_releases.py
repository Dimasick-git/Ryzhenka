#!/usr/bin/env python3
"""
Update README files releases section when a new release is published.

This script expects two environment variables:
- GITHUB_REPOSITORY (owner/repo)
- GITHUB_TOKEN (with repo permissions to push)

It fetches the release by tag name (provided as first arg) using the GitHub API,
builds a markdown list of assets and replaces the section between
<!-- RELEASES_START --> and <!-- RELEASES_END --> in README.md and README_en.md.
"""
import os
import sys
import argparse
import requests
import json
from pathlib import Path


def check_url(url, timeout=5):
    try:
        r = requests.head(url, allow_redirects=True, timeout=timeout)
        return r.status_code
    except Exception:
        return None

API = "https://api.github.com"

def fetch_release(repo, tag):
    url = f"{API}/repos/{repo}/releases/tags/{tag}"
    token = os.getenv('GITHUB_TOKEN')
    headers = {'Accept': 'application/vnd.github+json'}
    if token:
        headers['Authorization'] = f"token {token}"
    r = requests.get(url, headers=headers)
    r.raise_for_status()
    return r.json()

def build_md_block(release, check_assets=False):
    lines = []
    name = release.get('tag_name') or release.get('name')
    published = release.get('published_at','unknown')[:10]
    lines.append(f"- {name} (published {published})")
    for a in release.get('assets',[]):
        url = a.get('browser_download_url')
        note = ''
        if check_assets and url:
            status = check_url(url)
            if status != 200:
                note = f' (UNAVAILABLE: {status})'
        lines.append(f"\t- {a['name']} — {url}{note}")
    return "\n".join(lines)


def fetch_and_parse_manifests(release, token=None, download_zips=False):
    """Find JSON manifest assets or inside ZIPs and return parsed module/version summaries."""
    results = {}
    headers = {'Accept': 'application/octet-stream'}
    if token:
        headers['Authorization'] = f"token {token}"

    # Direct JSON or manifest-like assets
    for a in release.get('assets', []):
        name = a.get('name', '')
        url = a.get('browser_download_url')
        if not url:
            continue
        if name.lower().endswith('.json') or 'manifest' in name.lower():
            try:
                r = requests.get(url, headers=headers, timeout=10)
                if r.status_code == 200:
                    try:
                        data = r.json()
                        mods = extract_modules_from_manifest(data)
                        results[name] = mods or ['(no modules detected)']
                    except Exception as e:
                        results[name] = [f'(failed to parse JSON: {e})']
                else:
                    results[name] = [f'(unavailable: {r.status_code})']
            except Exception as e:
                results[name] = [f'(error fetching: {e})']

    # Optionally inspect ZIP assets for embedded manifests
    if download_zips:
        import io, zipfile
        for a in release.get('assets', []):
            name = a.get('name', '')
            url = a.get('browser_download_url')
            if not url or not name.lower().endswith('.zip'):
                continue
            try:
                r = requests.get(url, headers=headers, timeout=30)
                if r.status_code == 200:
                    bio = io.BytesIO(r.content)
                    try:
                        with zipfile.ZipFile(bio) as z:
                            for candidate in ('manifest.json','manifest.txt','release_manifest.json'):
                                if candidate in z.namelist():
                                    with z.open(candidate) as mf:
                                        try:
                                            data = json.load(mf)
                                            mods = extract_modules_from_manifest(data)
                                            results[f'{name}:{candidate}'] = mods or ['(no modules detected)']
                                        except Exception as e:
                                            results[f'{name}:{candidate}'] = [f'(failed to parse inside zip: {e})']
                                    break
                    except zipfile.BadZipFile:
                        results[name] = ['(not a zip or corrupted)']
                else:
                    results[name] = [f'(zip unavailable: {r.status_code})']
            except Exception as e:
                results[name] = [f'(error downloading zip: {e})']

    return results


def extract_modules_from_manifest(data):
    """Heuristic: extract module/version pairs from common manifest structures."""
    modules = []
    if isinstance(data, dict):
        for key in ('modules','components','packages','files'):
            if key in data and isinstance(data[key], (list, dict)):
                items = data[key]
                if isinstance(items, dict):
                    items = items.values()
                for it in items:
                    if isinstance(it, str):
                        modules.append(it)
                    elif isinstance(it, dict):
                        name = it.get('name') or it.get('id') or it.get('filename')
                        ver = it.get('version') or it.get('ver') or it.get('version_string')
                        if name and ver:
                            modules.append(f"{name} ({ver})")
                        elif name:
                            modules.append(name)
    elif isinstance(data, list):
        for it in data:
            if isinstance(it, str):
                modules.append(it)
            elif isinstance(it, dict):
                name = it.get('name') or it.get('id')
                ver = it.get('version')
                if name and ver:
                    modules.append(f"{name} ({ver})")
    return modules

def replace_block(path: Path, block_md: str, dry_run=False):
    txt = path.read_text(encoding='utf-8')
    start = '<!-- RELEASES_START -->'
    end = '<!-- RELEASES_END -->'
    if start in txt and end in txt:
        pre, rest = txt.split(start,1)
        _, post = rest.split(end,1)
        new = pre + start + '\n' + block_md + '\n' + end + post
        if dry_run:
            print(f"--- DRY RUN: would update {path} ---\n")
            # show small preview
            old_section = txt.split(start,1)[1].split(end,1)[0]
            print("OLD SECTION:\n" + old_section[:1000] + ('\n...\n' if len(old_section)>1000 else '\n'))
            print("NEW SECTION:\n" + (block_md[:1000] + ('\n...\n' if len(block_md)>1000 else '\n')))
            return True
        else:
            path.write_text(new, encoding='utf-8')
            return True
    else:
        return False

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('tag')
    parser.add_argument('--dry-run', action='store_true', help='Do not modify files; print preview')
    parser.add_argument('--commit', action='store_true', help='Commit & push changes (use with care; CI may prefer creating a PR)')
    parser.add_argument('--check-assets', action='store_true', help='Check asset URLs for availability')
    parser.add_argument('--include-manifests', action='store_true', help='Fetch and parse JSON manifest assets attached to the release and include module/version summaries')
    parser.add_argument('--download-zip-manifests', action='store_true', help='(Heavier) Download release ZIPs and try to find manifest.json inside to extract module lists')
    args = parser.parse_args()

    tag = args.tag
    repo = os.getenv('GITHUB_REPOSITORY')
    if not repo:
        print('GITHUB_REPOSITORY env var required')
        sys.exit(2)
    release = fetch_release(repo, tag)
    md = build_md_block(release, check_assets=args.check_assets)
    # Optionally include parsed manifests/module lists
    if args.include_manifests:
        token = os.getenv('GITHUB_TOKEN')
        manifests = fetch_and_parse_manifests(release, token=token, download_zips=args.download_zip_manifests)
        if manifests:
            md += "\n\n\tParsed manifests:\n"
            for mname, mods in manifests.items():
                md += f"\t- {mname}:\n"
                for mod in mods:
                    md += f"\t\t- {mod}\n"
    changed = False
    for fname in ['README.md','README_en.md']:
        p = Path(fname)
        if p.exists():
            ok = replace_block(p, md, dry_run=args.dry_run)
            if ok:
                if args.dry_run:
                    print(f'(dry-run) would update {fname}')
                else:
                    print(f'Updated {fname}')
                changed = True
    # Committing/pushing is now opt-in. CI workflows can either set --commit to push directly
    # (may be blocked by branch protection) or run without --commit and use an action to
    # create a pull request from the updated working tree.
    if changed and not args.dry_run and args.commit:
        # Commit changes if requested and if a token is available
        token = os.getenv('GITHUB_TOKEN')
        if token:
            os.system('git config user.name "github-actions[bot]"')
            os.system('git config user.email "41898282+github-actions[bot]@users.noreply.github.com"')
            os.system('git add README.md README_en.md')
            os.system(f'git commit -m "chore: update README releases for {tag}" || true')
            os.system('git push')
    else:
        if not changed:
            print('No README markers found or no changes applied')


if __name__ == '__main__':
    main()
