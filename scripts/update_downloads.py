#!/usr/bin/env python3
"""Update the total-downloads counter in README.md from GitHub release assets."""
import json
import os
import subprocess
import time
import urllib.error
import urllib.request

OWNER = os.environ.get("GITHUB_REPOSITORY_OWNER", "")
if not OWNER:
    repo_env = os.environ.get("GITHUB_REPOSITORY", "")
    OWNER = repo_env.split("/")[0] if "/" in repo_env else "Dimasick-git"

HEADERS = {"User-Agent": "update-downloads-script/2.0"}
MAX_RETRIES = 4


def get_json(url: str, token: str = None) -> object:
    """Fetch JSON from GitHub API with exponential-backoff retry on rate-limit / transient errors."""
    headers = dict(HEADERS)
    if token:
        headers["Authorization"] = f"Bearer {token}"
    delay = 2
    last_exc = None
    for attempt in range(MAX_RETRIES):
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=30) as r:
                return json.load(r)
        except urllib.error.HTTPError as e:
            last_exc = e
            if e.code in (403, 429):
                # respect Retry-After header if present, else exponential backoff
                retry_after = int(e.headers.get("Retry-After", delay))
                print(f"  Rate-limited on {url} — waiting {retry_after}s (attempt {attempt + 1})")
                time.sleep(retry_after)
                delay = min(delay * 2, 60)
            elif e.code in (404, 451):
                raise  # not worth retrying
            else:
                print(f"  HTTP {e.code} on {url} — retrying in {delay}s (attempt {attempt + 1})")
                time.sleep(delay)
                delay *= 2
        except Exception as e:
            last_exc = e
            print(f"  Request failed for {url}: {e} — retrying in {delay}s (attempt {attempt + 1})")
            time.sleep(delay)
            delay *= 2
    raise RuntimeError(f"All {MAX_RETRIES} attempts failed for {url}: {last_exc}")


def get_all_pages(url: str, token: str = None) -> list:
    """Fetch all pages of a paginated GitHub API endpoint by following Link headers.

    Each page request uses the same exponential-backoff retry as get_json so that
    a transient error mid-pagination does not silently truncate results.
    """
    results = []
    next_url = url
    headers_store = dict(HEADERS)
    if token:
        headers_store["Authorization"] = f"Bearer {token}"

    while next_url:
        delay = 2
        last_exc = None
        link_header = ""
        data = None

        for attempt in range(MAX_RETRIES):
            try:
                req = urllib.request.Request(next_url, headers=headers_store)
                with urllib.request.urlopen(req, timeout=30) as r:
                    data = json.load(r)
                    link_header = r.headers.get("Link", "")
                break  # success
            except urllib.error.HTTPError as e:
                last_exc = e
                if e.code in (403, 429):
                    retry_after = int(e.headers.get("Retry-After", delay))
                    print(f"  Rate-limited on {next_url} — waiting {retry_after}s (attempt {attempt + 1})")
                    time.sleep(retry_after)
                    delay = min(delay * 2, 60)
                elif e.code in (404, 451):
                    raise
                else:
                    print(f"  HTTP {e.code} on {next_url} — retrying in {delay}s (attempt {attempt + 1})")
                    time.sleep(delay)
                    delay *= 2
            except Exception as e:
                last_exc = e
                print(f"  Request failed for {next_url}: {e} — retrying in {delay}s (attempt {attempt + 1})")
                time.sleep(delay)
                delay *= 2
        else:
            raise RuntimeError(f"All {MAX_RETRIES} attempts failed for {next_url}: {last_exc}")

        if isinstance(data, list):
            results.extend(data)

        # Parse Link header for rel="next"
        next_url = None
        if link_header:
            for part in link_header.split(","):
                part = part.strip()
                if 'rel="next"' in part:
                    url_part = part.split(";")[0].strip()
                    if url_part.startswith("<") and url_part.endswith(">"):
                        next_url = url_part[1:-1]
                    break

    return results


def load_repos_list(path: str = "scripts/repos.txt") -> list:
    if os.path.isfile(path):
        with open(path, "r", encoding="utf-8") as f:
            lines = [ln.strip() for ln in f]
        return [ln for ln in lines if ln and not ln.startswith("#")]
    return None


def sum_downloads(token: str = None, repo_list: list = None) -> tuple:
    """Return (total_downloads, errors) across all repos."""
    total = 0
    errors = []
    if repo_list is None:
        try:
            repos = get_all_pages(
                f"https://api.github.com/users/{OWNER}/repos?per_page=100&type=public",
                token=token,
            )
            repo_list = [r["name"] for r in repos]
        except Exception as e:
            print(f"ERROR fetching repo list: {e}")
            return 0, [str(e)]

    for name in repo_list:
        try:
            releases = get_all_pages(
                f"https://api.github.com/repos/{OWNER}/{name}/releases?per_page=100",
                token=token,
            )
            for rel in releases:
                for asset in rel.get("assets", []):
                    total += asset.get("download_count", 0)
        except urllib.error.HTTPError as e:
            if e.code == 404:
                errors.append(f"{name}: not found (404)")
            else:
                errors.append(f"{name}: HTTP {e.code}")
        except Exception as e:
            errors.append(f"{name}: {e}")
    return total, errors


def update_readme(total: int) -> bool:
    path = "README.md"
    with open(path, "r", encoding="utf-8") as f:
        data = f.read()
    start = "<!--TOTAL_DOWNLOADS-->"
    end = "<!--/TOTAL_DOWNLOADS-->"
    if start not in data or end not in data:
        print("WARNING: download markers not found in README.md — skipping update")
        return False
    pre, rest = data.split(start, 1)
    _, post = rest.split(end, 1)
    new = f"{pre}{start}**{total}**{end}{post}"
    if new == data:
        return False
    with open(path, "w", encoding="utf-8") as f:
        f.write(new)
    return True


def git_commit_push(token: str = None) -> bool:
    subprocess.run(["git", "add", "README.md"], check=True)
    if subprocess.run(["git", "diff", "--cached", "--quiet"]).returncode == 0:
        return False
    subprocess.run(["git", "commit", "-m", "chore: update total downloads badge [skip ci]"], check=True)
    repo = os.environ.get("GITHUB_REPOSITORY")
    if token and repo:
        remote_url = f"https://x-access-token:{token}@github.com/{repo}.git"
        subprocess.run(["git", "remote", "set-url", "origin", remote_url], check=True)
        subprocess.run(["git", "push", "origin", "HEAD:main"], check=True)
        subprocess.run(["git", "remote", "set-url", "origin", f"https://github.com/{repo}.git"], check=True)
    else:
        subprocess.run(["git", "push", "origin", "main"], check=True)
    return True


def main() -> None:
    token = os.environ.get("GITHUB_TOKEN", "")
    repo_list = load_repos_list()
    print(f"Counting downloads for owner: {OWNER}")
    if repo_list:
        print(f"Using repos.txt ({len(repo_list)} repos)")

    total, errors = sum_downloads(token=token, repo_list=repo_list)
    print(f"Total downloads: {total}")
    if errors:
        print(f"Errors ({len(errors)} repos skipped):")
        for e in errors:
            print(f"  - {e}")

    changed = update_readme(total)
    if changed:
        print("README.md updated.")
    else:
        print("No change in count — skipping commit.")


if __name__ == "__main__":
    main()
