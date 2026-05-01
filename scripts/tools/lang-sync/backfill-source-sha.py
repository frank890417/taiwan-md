#!/usr/bin/env python3
"""
backfill-source-sha.py — 批次補 stale `no-source-sha` 翻譯的 frontmatter metadata

不重新翻譯，只補 sourceCommitSha + sourceContentHash + translatedAt 三欄位
（指向 zh source 當前 HEAD）。把「pre-toolkit 時代」的翻譯升級成 manifest-trackable。

Usage:
  python3 scripts/tools/lang-sync/backfill-source-sha.py --lang en
  python3 scripts/tools/lang-sync/backfill-source-sha.py --lang en --dry-run
  python3 scripts/tools/lang-sync/backfill-source-sha.py --lang en,ko,fr,es

設計來源：2026-05-01 γ-late4 session 完成 ja 100% sync 後，發現 en/ko/fr/es
有 ~1300 篇 stale 主要是 no-source-sha（pre-toolkit 翻譯）。重新翻譯成本高
（API call 大量），但 metadata backfill 成本 ~0（只是 file I/O）。
"""
import argparse, hashlib, json, os, re, subprocess, sys
from datetime import datetime, timezone, timedelta
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent.parent.parent
KNOWLEDGE = REPO / "knowledge"
STATUS_JSON = KNOWLEDGE / "_translation-status.json"


# 2026-05-01 γ-late4: batched git history cache (mirror of status.py)
_GIT_HISTORY_CACHE = None


def _build_git_history_cache():
    """ONE git log call → {file: [(sha8, sha40, iso_date)]} newest-first."""
    global _GIT_HISTORY_CACHE
    if _GIT_HISTORY_CACHE is not None:
        return _GIT_HISTORY_CACHE
    out = subprocess.run(
        ["git", "log", "--name-only", "--format=__COMMIT__|%H|%aI", "HEAD"],
        cwd=REPO, capture_output=True, text=True, check=False,
    ).stdout
    history = {}
    cur_sha = cur_date = None
    for line in out.splitlines():
        if line.startswith("__COMMIT__|"):
            parts = line.split("|", 2)
            if len(parts) >= 3:
                cur_sha = parts[1]
                cur_date = parts[2]
        elif line.strip() and cur_sha:
            history.setdefault(line, []).append((cur_sha[:8], cur_sha, cur_date))
    _GIT_HISTORY_CACHE = history
    return history


def zh_sha_at_or_before(zh_rel_path: str, en_iso_date: str) -> tuple[str, str]:
    """Find the most recent zh commit at-or-before en's iso date.

    Returns (sha8, iso_date). If zh has no history before en, fall back to
    oldest zh commit (i.e., zh was created after en, weird but possible).
    """
    cache = _build_git_history_cache()
    full_path = f"knowledge/{zh_rel_path}"
    hist = cache.get(full_path)
    if not hist:
        return ("", "")
    # hist is newest-first. Walk from newest to oldest, return first commit
    # with date <= en_iso_date.
    for sha8, _sha40, date in hist:
        if date <= en_iso_date:
            return (sha8, date)
    # all zh commits are after en's date → return oldest zh commit
    sha8, _, date = hist[-1]
    return (sha8, date)


def body_hash(content: str) -> str:
    """SHA256 of body (after frontmatter)."""
    if content.startswith("---"):
        end = content.find("---", 3)
        if end != -1:
            content = content[end + 3:]
    return "sha256:" + hashlib.sha256(content.encode("utf-8")).hexdigest()[:16]


def patch_frontmatter(content: str, fields: dict) -> str:
    """Insert/update fields in YAML frontmatter (preserve other lines)."""
    if not content.startswith("---"):
        return content
    end = content.find("\n---", 4)
    if end == -1:
        return content
    fm_block = content[4:end]
    body = content[end + 4:]  # skip \n---
    lines = fm_block.split("\n")
    existing_keys = {}
    for i, line in enumerate(lines):
        m = re.match(r"^([a-zA-Z_][a-zA-Z0-9_]*):", line)
        if m:
            existing_keys[m.group(1)] = i
    for key, value in fields.items():
        # Format value: quote strings unless already quoted/numeric
        v_str = str(value)
        if not (v_str.startswith('"') or v_str.startswith("'") or v_str.replace(".","").isdigit()):
            v_str = f'"{value}"'
        new_line = f"{key}: {v_str}"
        if key in existing_keys:
            lines[existing_keys[key]] = new_line
        else:
            lines.append(new_line)
    new_fm = "\n".join(lines)
    return f"---\n{new_fm}\n---{body}"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--lang", required=True, help="comma-sep, e.g. en or en,ko,fr,es")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--limit", type=int, default=None, help="process at most N per lang")
    args = ap.parse_args()

    langs = [l.strip() for l in args.lang.split(",") if l.strip()]
    data = json.load(open(STATUS_JSON))
    by_article = data["byArticle"]

    now_iso = datetime.now(timezone(timedelta(hours=8))).isoformat(timespec="seconds")

    overall_patched = 0
    overall_skipped = 0
    overall_errored = 0

    for lang in langs:
        print(f"\n=== {lang} ===")
        candidates = []
        for zh_path, entry in by_article.items():
            t = entry["translations"].get(lang, {})
            if t.get("status") == "stale" and t.get("reason") == "no-source-sha":
                candidates.append((zh_path, entry, t))
        print(f"  candidates: {len(candidates)}")
        if args.limit:
            candidates = candidates[:args.limit]
            print(f"  limit applied: {len(candidates)}")

        patched = skipped = errored = 0
        for zh_path, entry, t in candidates:
            trans_path_rel = t.get("path")
            if not trans_path_rel:
                skipped += 1
                continue
            trans_full = KNOWLEDGE / trans_path_rel
            if not trans_full.exists():
                skipped += 1
                continue
            zh_full = KNOWLEDGE / zh_path
            if not zh_full.exists():
                skipped += 1
                continue

            # Honest backfill: use zh sha at-or-before en file's last commit.
            # status.py will then detect drift if zh has commits since.
            en_lastmod = t.get("translationLastModified")
            if en_lastmod:
                zh_sha, _zh_date = zh_sha_at_or_before(zh_path, en_lastmod)
                if not zh_sha:
                    # no history pre-en → use current zh sha (translation must
                    # post-date all zh commits, treat as fresh)
                    zh_sha = entry["zh"]["lastCommit"]
            else:
                # No mtime info → use current (fall-back, optimistic)
                zh_sha = entry["zh"]["lastCommit"]

            zh_content = zh_full.read_text(encoding="utf-8")
            zh_hash = body_hash(zh_content)

            # translatedAt: prefer existing if any, else en file's last commit
            translated_at = t.get("translatedAt") or en_lastmod or now_iso

            new_fields = {
                "translatedFrom": zh_path,
                "sourceCommitSha": zh_sha,
                "sourceContentHash": zh_hash,
                "translatedAt": translated_at,
            }

            try:
                trans_content = trans_full.read_text(encoding="utf-8")
                new_content = patch_frontmatter(trans_content, new_fields)
                if new_content == trans_content:
                    skipped += 1
                    continue
                if not args.dry_run:
                    trans_full.write_text(new_content, encoding="utf-8")
                patched += 1
                if patched <= 3 or patched % 20 == 0:
                    print(f"    [{patched}] {trans_path_rel} ← sha={zh_sha[:8]}")
            except Exception as e:
                errored += 1
                print(f"    ❌ {trans_path_rel}: {e}", file=sys.stderr)

        print(f"  → patched={patched} skipped={skipped} errored={errored}" + (" (dry-run)" if args.dry_run else ""))
        overall_patched += patched
        overall_skipped += skipped
        overall_errored += errored

    print(f"\n=== TOTAL ===")
    print(f"patched={overall_patched} skipped={overall_skipped} errored={overall_errored}")
    if args.dry_run:
        print("DRY RUN — no files written")


if __name__ == "__main__":
    main()
