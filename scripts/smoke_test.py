from pathlib import Path
import re

root = Path(__file__).resolve().parents[1]
html = (root / "index.html").read_text(encoding="utf-8")
required = [
    "docs/INSTALL.md",
    "docs/FAQ.md",
    "docs/CONTRIBUTING.md",
    "<!--CURRENT_VERSION-->",
    "<!--TOTAL_DOWNLOADS-->",
    'id="menu"',
    'id="releaseList"',
    "const API='https://api.github.com/repos/'+OWNER+'/'+REPO",
]
for value in required:
    assert value in html, f"missing: {value}"

for relative in re.findall(r'(?:src|href)="(assets/[^"#?]+|docs/[^"#?]+)"', html):
    assert (root / relative).is_file(), f"missing local file: {relative}"

repo_names = [
    line.strip() for line in (root / "scripts/repos.txt").read_text(encoding="utf-8").splitlines()
    if line.strip() and not line.lstrip().startswith("#")
]
assert len(repo_names) == len(set(repo_names)), "duplicate repository in scripts/repos.txt"
assert "RyazhaAI" in repo_names
assert "Atmosphere-RYZ" in repo_names

workflow = (root / ".github/workflows/update-downloads.yml").read_text(encoding="utf-8")
assert 'git config user.name "Dimasick-git"' in workflow
assert 'git config user.email "dimaorynchukk@gmail.com"' in workflow
assert not (root / ".github/workflows/pages.yml").exists(), "duplicate Pages workflow remains"

print("smoke tests: passed")
