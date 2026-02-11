#!/usr/bin/env python3
import os
import urllib.request
import json
import subprocess

OWNER = os.environ.get('GITHUB_REPOSITORY_OWNER', '')
if not OWNER:
    # fallback to parse from GITHUB_REPOSITORY if provided (owner/repo)
    repo_env = os.environ.get('GITHUB_REPOSITORY', '')
    if repo_env and '/' in repo_env:
        OWNER = repo_env.split('/')[0]
    else:
        OWNER = 'Dimasick-git'
API_URL = f'https://api.github.com/users/{OWNER}/repos?per_page=200'
HEADERS = {'User-Agent': 'update-downloads-script'}

def get_json(url, token=None):
    req = urllib.request.Request(url, headers=HEADERS)
    if token:
        req.add_header('Authorization', f'token {token}')
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r)

def load_repos_list(path='scripts/repos.txt'):
    if os.path.isfile(path):
        with open(path, 'r', encoding='utf-8') as f:
            lines = [l.strip() for l in f.readlines()]
        # filter out empty lines and comments
        return [l for l in lines if l and not l.startswith('#')]
    return None


def sum_downloads(token=None, repo_list=None):
    total = 0
    if repo_list is None:
        repos = get_json(API_URL, token=token)
        repo_names = [r['name'] for r in repos]
    else:
        repo_names = repo_list

    for name in repo_names:
        try:
            releases = get_json(f'https://api.github.com/repos/{OWNER}/{name}/releases?per_page=100', token=token)
        except Exception:
            # skip repos that are not found or have no releases
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
    repo_list = load_repos_list()
    total = sum_downloads(token=token, repo_list=repo_list)
    changed = update_readme(total)
    if changed:
        git_commit_push(token=token)

if __name__ == '__main__':
    main()
