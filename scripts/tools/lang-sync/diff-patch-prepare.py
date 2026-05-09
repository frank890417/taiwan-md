#!/usr/bin/env python3
"""diff-patch-prepare.py — prepare patch-translate batch for Sonnet sub-agents

設計：對 P2 stale (small body diff) 文章不重翻，改 patch existing translation
with the zh diff applied to the corresponding lang. 比 full re-translation 快 5-10x，
preserves unchanged paragraphs (避免 LLM drift)，cheaper token cost。

Tier 0 in cascade (前於 Tier 1 owl-alpha):
  - P0 missing → Tier 1+ (full translation)
  - P1 major   → Tier 1+ (full translation)
  - P2 minor   → **Tier 0 diff-patch** (new — this script)
  - P2.5 metadata → bump-source-sha.py (deterministic, no LLM)
  - P3 old     → 視內容決定

## Algorithm

For each (zh_path, lang) pair:
  1. Read translation frontmatter to get sourceCommitSha (old zh state)
  2. Compute git diff old_sha..HEAD on knowledge/{zh_path}
  3. Read current zh source + existing translation file
  4. Output per-pair task JSON:
     {
       "zh_path": "People/聶永真.md",
       "lang": "en",
       "translation_path": "knowledge/en/People/nieh-yung-jen.md",
       "old_sha": "5b9e5b9e",
       "zh_diff": "<unified diff text>",
       "current_zh": "<full zh content>",
       "current_translation": "<existing en content>",
       "expected_new_sha": "<current zh latest commit>",
       "expected_new_content_hash": "...",
       "expected_new_body_hash": "..."
     }

## Sub-agent prompt template

Each task spawns one Sonnet agent with prompt:
  "Apply this zh diff to the {lang} translation, preserving unchanged parts.
   Update sourceCommitSha/sourceContentHash/sourceBodyHash/translatedAt frontmatter."

## Usage

  python3 diff-patch-prepare.py --input batch1.txt --lang en --out tasks/

Where batch1.txt is one zh_path per line (P2 stale candidates).

## Safety

- zh_diff size > 100 lines → flag/skip (probably not "minor", route to full retranslate)
- Translation file missing → skip (route to full translate)
- old_sha not in git history → skip (route to full)
"""

import argparse
import hashlib
import json
import re
import subprocess
from pathlib import Path

REPO = Path(__file__).resolve().parents[3]
LANGS = ["en", "ja", "ko", "es", "fr"]


def git_show(sha, path):
    """Return file content at given sha. Raises on failure."""
    result = subprocess.run(
        ["git", "show", f"{sha}:{path}"],
        capture_output=True, text=True, cwd=REPO,
    )
    if result.returncode != 0:
        raise FileNotFoundError(f"git show {sha}:{path} failed: {result.stderr.strip()}")
    return result.stdout


def git_diff(old_sha, new_sha, path):
    """Return unified diff between old and new sha for path."""
    result = subprocess.run(
        ["git", "diff", f"{old_sha}..{new_sha}", "--", path],
        capture_output=True, text=True, cwd=REPO,
    )
    return result.stdout


def git_latest_commit():
    result = subprocess.run(["git", "rev-parse", "HEAD"], capture_output=True, text=True, cwd=REPO)
    return result.stdout.strip()


def parse_translation_frontmatter(path):
    """Read translation frontmatter, return dict with sourceCommitSha + translation_path."""
    text = path.read_text(encoding="utf-8")
    if not text.startswith("---"):
        return None
    end = text.find("---", 3)
    if end == -1:
        return None
    fm_text = text[3:end]
    fields = {}
    for key in ("translatedFrom", "sourceCommitSha", "sourceContentHash", "sourceBodyHash"):
        m = re.search(rf"^{key}:\s*['\"]?([^'\"\n]+)", fm_text, re.MULTILINE)
        if m:
            fields[key] = m.group(1).strip().strip("'\"")
    return fields


def find_translation_file(zh_path, lang):
    """Find knowledge/{lang}/.../slug.md by translatedFrom match."""
    base = REPO / "knowledge" / lang
    if not base.exists():
        return None
    for tf in base.rglob("*.md"):
        try:
            text = tf.read_text(encoding="utf-8", errors="replace")[:1500]
        except OSError:
            continue
        if f"translatedFrom: '{zh_path}'" in text or f"translatedFrom: \"{zh_path}\"" in text:
            return tf
        # Also try without quotes (legacy)
        if re.search(rf"^translatedFrom:\s*{re.escape(zh_path)}\b", text, re.MULTILINE):
            return tf
    return None


def hash_content(text):
    return "sha256:" + hashlib.sha256(text.encode("utf-8")).hexdigest()[:16]


def strip_frontmatter(text):
    if not text.startswith("---"):
        return text
    end = text.find("---", 3)
    if end == -1:
        return text
    return text[end + 3:].lstrip("\n")


def build_task(zh_path, lang, max_diff_lines=100):
    """Build one (zh_path, lang) patch task. Returns dict or None if skip."""
    tf = find_translation_file(zh_path, lang)
    if tf is None:
        return {"skip_reason": f"translation file missing for {lang}", "zh_path": zh_path, "lang": lang}

    fm = parse_translation_frontmatter(tf)
    if not fm or "sourceCommitSha" not in fm:
        return {"skip_reason": "translation has no sourceCommitSha", "zh_path": zh_path, "lang": lang}

    old_sha = fm["sourceCommitSha"]
    latest_sha = git_latest_commit()

    try:
        old_zh = git_show(old_sha, f"knowledge/{zh_path}")
    except FileNotFoundError as e:
        return {"skip_reason": f"old_sha not in git: {e}", "zh_path": zh_path, "lang": lang}

    diff = git_diff(old_sha, latest_sha, f"knowledge/{zh_path}")
    diff_lines = diff.count("\n")
    if diff_lines > max_diff_lines:
        return {"skip_reason": f"diff too large ({diff_lines} lines > {max_diff_lines})", "zh_path": zh_path, "lang": lang}

    current_zh_path = REPO / "knowledge" / zh_path
    current_zh = current_zh_path.read_text(encoding="utf-8") if current_zh_path.exists() else ""
    current_translation = tf.read_text(encoding="utf-8")

    body = strip_frontmatter(current_zh)
    return {
        "zh_path": zh_path,
        "lang": lang,
        "translation_path": str(tf.relative_to(REPO)),
        "old_sha": old_sha,
        "expected_new_sha": latest_sha[:8],
        "expected_new_content_hash": hash_content(current_zh),
        "expected_new_body_hash": hash_content(body),
        "zh_diff": diff,
        "diff_lines": diff_lines,
        "current_zh": current_zh,
        "current_translation": current_translation,
    }


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--input", required=True, help="File with one zh_path per line")
    ap.add_argument("--lang", default="all", help="Single lang or 'all' for all 5")
    ap.add_argument("--max-diff-lines", type=int, default=100)
    ap.add_argument("--out-dir", default=".lang-sync-tasks/diff-patch", help="Output dir")
    args = ap.parse_args()

    zh_paths = [l.strip() for l in Path(args.input).read_text().splitlines() if l.strip()]
    langs = LANGS if args.lang == "all" else [args.lang]

    out_dir = REPO / args.out_dir
    out_dir.mkdir(parents=True, exist_ok=True)

    tasks = []
    skips = []
    for zh in zh_paths:
        for lang in langs:
            t = build_task(zh, lang, args.max_diff_lines)
            if "skip_reason" in t:
                skips.append(t)
            else:
                tasks.append(t)

    # Write per-lang task files
    for lang in langs:
        lang_tasks = [t for t in tasks if t["lang"] == lang]
        if not lang_tasks:
            continue
        out_file = out_dir / f"{lang}-patch-tasks.json"
        out_file.write_text(json.dumps(lang_tasks, ensure_ascii=False, indent=2))
        print(f"  {lang}: {len(lang_tasks)} patch tasks → {out_file.relative_to(REPO)}")

    if skips:
        print(f"\n⏩ Skipped {len(skips)}:")
        for s in skips[:10]:
            print(f"  {s['lang']}/{s['zh_path']}: {s['skip_reason']}")
        if len(skips) > 10:
            print(f"  ... ({len(skips) - 10} more)")

    print(f"\n📊 Total: {len(tasks)} patchable / {len(skips)} need full re-translate")


if __name__ == "__main__":
    main()
