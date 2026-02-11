#!/usr/bin/env python3
import os
import urllib.request
import json
import subprocess

OWNER = os.environ.get('GITHUB_REPOSITORY_OWNER', 'Dimasick-git')
API_URL = f'https://api.github.com/users/{OWNER}/repos?per_page=200'
HEADERS = {'User-Agent': 'update-downloads-script'}

def get_json(url, token=None):
    req = urllib.request.Request(url, headers=HEADERS)
    if token:
        req.add_header('Authorization', f'token {token}')
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r)

def sum_downloads(token=None):
    repos = get_json(API_URL, token=token)
    total = 0
    for r in repos:
        name = r['name']
        try:
            releases = get_json(f'https://api.github.com/repos/{OWNER}/{name}/releases?per_page=100', token=token)
        except Exception:
            continue
        for rel in releases:
            for a in rel.get('assets', []):
                total += a.get('download_count', 0)
    return total

def update_readme(total):
    path = 'README.md'
    with open(path, 'r', encoding='utf-8') as f:
        data = f.read()
    start = '<!--TOTAL_DOWNLOADS-->'
    end = '<!--/TOTAL_DOWNLOADS-->'
    if start in data and end in data:
        pre, rest = data.split(start, 1)
        _, post = rest.split(end, 1)
        new = f"{pre}{start}**{total}**{end}{post}"
        if new != data:
            with open(path, 'w', encoding='utf-8') as f:
                f.write(new)
            return True
    return False

def git_commit_push(token=None):
    # configure git
    subprocess.run(['git', 'config', 'user.name', 'github-actions'], check=False)
    subprocess.run(['git', 'config', 'user.email', 'actions@github.com'], check=False)
    subprocess.run(['git', 'add', 'README.md'], check=True)
    status = subprocess.run(['git', 'diff', '--cached', '--quiet'])
    if status.returncode == 0:
        return False
    msg = 'chore: update total downloads badge'
    subprocess.run(['git', 'commit', '-m', msg], check=True)
    # push using token
    repo = os.environ.get('GITHUB_REPOSITORY')
    if not token:
        subprocess.run(['git', 'push', 'origin', 'main'], check=True)
    else:
        url = f'https://{token}@github.com/{repo}.git'
        subprocess.run(['git', 'push', url, 'HEAD:main'], check=True)
    return True

def main():
    token = os.environ.get('GITHUB_TOKEN')
    total = sum_downloads(token=token)
    changed = update_readme(total)
    if changed:
        git_commit_push(token=token)

if __name__ == '__main__':
    main()
