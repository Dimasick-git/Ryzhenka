#!/usr/bin/env python3
"""Simple README link checker.

Finds HTTP links in README.md and README_en.md and checks status; if any are non-200,
prints them (the workflow can turn this into an Issue).
"""
import re
import requests
from pathlib import Path

def find_links(text):
    # simple markdown link matcher and plain URLs
    urls = re.findall(r"https?://[\w\-./?&=%#]+", text)
    return set(urls)

def check(url):
    try:
        r = requests.head(url, allow_redirects=True, timeout=5)
        return r.status_code
    except Exception:
        return None

def main():
    files = ['README.md','README_en.md']
    bad = []
    for f in files:
        p = Path(f)
        if not p.exists():
            continue
        txt = p.read_text(encoding='utf-8')
        for u in find_links(txt):
            status = check(u)
            if status != 200:
                bad.append((f,u,status))
    if bad:
        print('BROKEN LINKS FOUND')
        for f,u,s in bad:
            print(f'{f} -> {u} : {s}')
        exit(1)
    else:
        print('All links OK')
        exit(0)

if __name__ == '__main__':
    main()
