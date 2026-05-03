#!/usr/bin/env python3
"""
bump-source-sha.py — 把 metadata-stale 翻譯 frontmatter 升級到 zh latest commit。

Body 已 valid（DNA #38 第 2 次 instantiation：bodyHash 沒變），不重翻只 bump metadata：
  sourceCommitSha → zh latest commit
  sourceContentHash → zh latest contentHash
  sourceBodyHash → zh latest bodyHash（同一個值）

對 metadata-stale 翻譯（依 status.py classify 結果）批次 bump。**不動 body content**。
省下不需要的 cascade translation cost（70 篇 × 5 langs scope）。

Usage:
  python3 bump-source-sha.py --dry-run                 # show plan
  python3 bump-source-sha.py --apply                   # write
  python3 bump-source-sha.py --apply --lang en         # 限定 single lang
"""
import argparse
import hashlib
import json
import re
import subprocess
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent.parent.parent
KNOWLEDGE = REPO / "knowledge"
LANGS = ["en", "ja", "ko", "es", "fr"]


def run_status_json() -> dict:
    out = subprocess.check_output(
        ["python3", str(REPO / "scripts/tools/lang-sync/status.py"), "--json", "--no-write"],
        cwd=REPO,
    )
    return json.loads(out.decode())


def find_metadata_stale(status: dict, lang_filter: str | None = None) -> list[dict]:
    """Return list of {lang, zh_path, target_path, new_src_sha, new_content_hash, new_body_hash}."""
    out = []
    by_article = status["byArticle"]
    for zh_path, entry in by_article.items():
        zh_data = entry["zh"]
        for lang, t in entry["translations"].items():
            if lang_filter and lang != lang_filter:
                continue
            if t.get("status") != "metadata-stale":
                continue
            out.append({
                "lang": lang,
                "zh_path": zh_path,
                "target_path": t.get("path", ""),
                "new_src_sha": zh_data["lastCommit"],
                "new_content_hash": zh_data["contentHash"],
                "new_body_hash": zh_data["bodyHash"],
            })
    return out


def bump_one(target_md: Path, new_sha: str, new_content_hash: str, new_body_hash: str, apply: bool) -> bool:
    """Update frontmatter sourceCommitSha + sourceContentHash + sourceBodyHash. Returns True if changed."""
    content = target_md.read_text(encoding="utf-8")
    if not content.startswith("---"):
        return False
    end = content.find("---", 3)
    if end == -1:
        return False
    fm_text = content[3:end]
    body = content[end + 3:]

    # Replace or insert each key
    def upsert(text: str, key: str, val: str) -> str:
        if re.search(rf"^{re.escape(key)}:\s.*$", text, flags=re.MULTILINE):
            return re.sub(rf"^{re.escape(key)}:\s.*$", f"{key}: '{val}'", text, count=1, flags=re.MULTILINE)
        # Append at end of frontmatter
        return text.rstrip() + f"\n{key}: '{val}'\n"

    new_fm = fm_text
    new_fm = upsert(new_fm, "sourceCommitSha", new_sha)
    new_fm = upsert(new_fm, "sourceContentHash", new_content_hash)
    new_fm = upsert(new_fm, "sourceBodyHash", new_body_hash)

    new_content = "---" + new_fm + "---" + body
    if new_content == content:
        return False
    if apply:
        target_md.write_text(new_content, encoding="utf-8")
    return True


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--apply", action="store_true")
    ap.add_argument("--lang", default=None)
    ap.add_argument("--quiet", action="store_true")
    args = ap.parse_args()

    print("📊 Fetching status.json...")
    status = run_status_json()
    targets = find_metadata_stale(status, args.lang)
    print(f"📋 {len(targets)} metadata-stale translation(s) to bump")

    if not targets:
        print("✅ Nothing to bump")
        return

    counts = {"bumped": 0, "skipped": 0}
    for t in targets:
        target_md = KNOWLEDGE / t["target_path"]
        if not target_md.exists():
            counts["skipped"] += 1
            continue
        changed = bump_one(target_md, t["new_src_sha"], t["new_content_hash"], t["new_body_hash"], args.apply)
        if changed:
            counts["bumped"] += 1
            if not args.quiet:
                action = "✓ bumped" if args.apply else "~ would-bump"
                print(f"  {action} {t['lang']}/{t['target_path'].replace(t['lang']+'/', '')} → {t['new_src_sha'][:8]}")
        else:
            counts["skipped"] += 1

    print()
    mode = "APPLY" if args.apply else "DRY-RUN"
    print(f"📊 bump-source-sha [{mode}]")
    print(f"  {'bumped' if args.apply else 'would-bump'}: {counts['bumped']}")
    print(f"  skipped: {counts['skipped']}")


if __name__ == "__main__":
    main()
