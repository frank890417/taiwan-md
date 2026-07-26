#!/usr/bin/env python3
"""生成 i18n 翻譯進度 JSON"""
import json
import os
from pathlib import Path

# Repo root (3 levels up from scripts/utils/i18n-status.py)
repo_root = Path(__file__).resolve().parents[2]
knowledge_dir = repo_root / "knowledge"


def rel_posix(root: Path, base: Path) -> str:
    rel = os.path.relpath(root, base)
    if rel == ".":
        return ""
    return Path(rel).as_posix()


# 掃描中文文章
zh_articles: set[str] = set()
for root, dirs, files in os.walk(knowledge_dir):
    root_path = Path(root)
    rel = rel_posix(root_path, knowledge_dir)
    if rel.startswith("en") or rel.startswith("about") or rel.startswith("_"):
        continue
    dirs[:] = [
        d
        for d in dirs
        if not d.startswith("_") and d not in ("en", "about")
    ]
    for f in files:
        if f.endswith(".md") and not f.startswith("_"):
            zh_articles.add(f"{rel}/{f}" if rel else f)

# 掃描英文文章
en_dir = knowledge_dir / "en"
en_articles: set[str] = set()
if en_dir.is_dir():
    for root, dirs, files in os.walk(en_dir):
        dirs[:] = [d for d in dirs if not d.startswith("_")]
        rel = rel_posix(Path(root), en_dir)
        for f in files:
            if f.endswith(".md") and not f.startswith("_"):
                en_articles.add(f"{rel}/{f}" if rel else f)

# 按分類統計
categories = {}
for art in zh_articles:
    cat = art.split('/')[0] if '/' in art else 'root'
    if cat not in categories:
        categories[cat] = {'zh': 0, 'en': 0}
    categories[cat]['zh'] += 1

for art in en_articles:
    cat = art.split('/')[0] if '/' in art else 'root'
    if cat not in categories:
        categories[cat] = {'zh': 0, 'en': 0}
    categories[cat]['en'] += 1

progress = {
    'total_zh': len(zh_articles),
    'total_en': len(en_articles),
    'coverage_en': round(len(en_articles) / max(len(zh_articles), 1) * 100, 1),
    'categories': categories,
    'updated': __import__('datetime').datetime.now().isoformat()[:10]
}

print(json.dumps(progress, ensure_ascii=False, indent=2))

# 也寫入檔案
out = repo_root / "src" / "data" / "i18n-progress.json"
out.parent.mkdir(parents=True, exist_ok=True)
out.write_text(json.dumps(progress, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"\nWritten to {out}")