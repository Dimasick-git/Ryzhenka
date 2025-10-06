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
    args = parser.parse_args()

    tag = args.tag
    repo = os.getenv('GITHUB_REPOSITORY')
    if not repo:
        print('GITHUB_REPOSITORY env var required')
        sys.exit(2)
    release = fetch_release(repo, tag)
    md = build_md_block(release, check_assets=args.check_assets)
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
