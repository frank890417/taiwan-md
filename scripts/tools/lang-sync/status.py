#!/usr/bin/env python3
"""
status.py — zh-TW SSOT × translation projection 狀態檢視

對每篇 zh-TW canonical (knowledge/Category/*.md) 檢查每個 active 語言的翻譯狀態：

  fresh   = en sourceCommitSha 等於 zh latest commit OR en 在 zh 之後
  stale   = zh 在 en sourceCommitSha 之後有 ≥ 1 個 commit
  missing = zh 存在、translation 不存在
  orphan  = translation 存在、zh 不存在

輸入：knowledge/ + git log + frontmatter 三欄位 (sourceCommitSha + sourceContentHash + translatedAt)
輸出：knowledge/_translation-status.json (derived cache) + console table

用法：
  python3 scripts/tools/lang-sync/status.py                    # 全語言全狀態
  python3 scripts/tools/lang-sync/status.py --lang en          # 只看英文
  python3 scripts/tools/lang-sync/status.py --status stale     # 只看 stale
  python3 scripts/tools/lang-sync/status.py --json             # JSON only (給 dashboard)
  python3 scripts/tools/lang-sync/status.py --top 30 --lang en --status missing,stale  # 待辦 list
  python3 scripts/tools/lang-sync/status.py --no-write         # 不寫 _translation-status.json

退出碼：
  0 — 成功
  1 — 內部錯誤
"""
import argparse
import hashlib
import json
import re
import subprocess
import sys
from datetime import datetime
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent.parent.parent
KNOWLEDGE = REPO / "knowledge"
STATUS_JSON = KNOWLEDGE / "_translation-status.json"
LANG_DIRS = ["en", "ja", "ko", "es", "fr"]


# ---------- frontmatter parsing (no yaml dep, single-line scalar only) ----------

def parse_frontmatter(content: str) -> dict:
    if not content.startswith("---"):
        return {}
    end = content.find("---", 3)
    if end == -1:
        return {}
    fm_text = content[3:end]
    result = {}
    for line in fm_text.splitlines():
        m = re.match(r"^(\w+):\s*['\"]?([^'\"\n]+?)['\"]?\s*$", line)
        if m:
            result[m.group(1)] = m.group(2)
    return result


# ---------- git helpers ----------

def git(*args: str, cwd: Path = REPO) -> str:
    try:
        out = subprocess.run(
            ["git", *args], cwd=cwd, capture_output=True, text=True, check=False
        )
        return out.stdout.strip()
    except Exception:
        return ""


# ---------- 2026-05-01 γ-late3: batched git log cache ----------
# Performance optimization: replace ~4000 per-file `git log` invocations with
# ONE `git log --name-only` scan that populates a {file_path: history[]} map.
#
# Before: 94s (641 zh + 1400 translations × multiple git calls each)
# After:  ~2s (single git log + dict lookups)
#
# Graph theory was the brief — real bottleneck is git syscalls, not algorithm.
# At 640-article × 5-lang scale, dict + linear scan beats graph framework
# overhead. Re-evaluate if scale ever exceeds 10K articles or multi-hop
# translation chains (en → ja → ko) become common.

_GIT_HISTORY_CACHE = None  # {rel_path: [(sha8, sha40)]} newest-first


def _build_git_history_cache():
    """One git log call → {file_path: [(sha8, sha40)]} newest-first."""
    global _GIT_HISTORY_CACHE
    if _GIT_HISTORY_CACHE is not None:
        return _GIT_HISTORY_CACHE
    out = subprocess.run(
        ["git", "log", "--name-only", "--format=__COMMIT__|%H|%aI", "HEAD"],
        cwd=REPO, capture_output=True, text=True, check=False,
    ).stdout
    history = {}  # rel_path → list of (sha8, sha40, iso_date)
    cur_sha = None
    cur_date = None
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


def git_last_commit(file_path: Path) -> tuple[str, str]:
    """Returns (sha8, iso8601 date) of the last commit that touched file."""
    rel = str(file_path.relative_to(REPO))
    cache = _build_git_history_cache()
    hist = cache.get(rel)
    if hist:
        sha8, _sha40, date = hist[0]  # newest-first
        return (sha8, date)
    return ("", "")


def git_commits_between(sha: str, file_path: Path) -> int:
    """Count commits touching file since sha (exclusive). Returns -1 if sha not found."""
    rel = str(file_path.relative_to(REPO))
    cache = _build_git_history_cache()
    hist = cache.get(rel)
    if not hist:
        return 0
    # Find sha (compare against sha8 prefix or sha40 startswith — git short shas
    # may be 7-12 chars depending on repo size; match by either field)
    sha_norm = sha.strip()
    for i, (sha8, sha40, _date) in enumerate(hist):
        if sha8 == sha_norm or sha40.startswith(sha_norm) or sha_norm.startswith(sha8):
            # commits 0..i-1 are AFTER sha (newer), so count = i
            return i
    return -1  # sha not found in this file's history (rebase/squash drift)


def git_diff_summary(sha: str, file_path: Path) -> str:
    """Returns +N -M summary since sha."""
    rel = str(file_path.relative_to(REPO))
    out = git("diff", "--shortstat", f"{sha}..HEAD", "--", rel)
    # e.g. " 1 file changed, 12 insertions(+), 3 deletions(-)"
    ins = re.search(r"(\d+) insertion", out)
    dele = re.search(r"(\d+) deletion", out)
    return f"+{ins.group(1) if ins else 0} -{dele.group(1) if dele else 0}"


# ---------- content hash ----------

def body_hash(content: str) -> str:
    """SHA256 of content body (after frontmatter)."""
    if content.startswith("---"):
        end = content.find("---", 3)
        if end != -1:
            content = content[end + 3:]
    return "sha256:" + hashlib.sha256(content.encode("utf-8")).hexdigest()[:16]


# ---------- main scan ----------

def scan_zh() -> dict:
    """
    Returns: { 'Category/file.md': {'path': Path, 'sha': str, 'date': str, 'hash': str} }
    """
    result = {}
    for md in KNOWLEDGE.glob("*/*.md"):
        # Skip lang dirs (handled separately)
        if md.parent.name in LANG_DIRS:
            continue
        # Skip _Home.md / _* files
        if md.name.startswith("_"):
            continue
        rel = str(md.relative_to(KNOWLEDGE))
        content = md.read_text(encoding="utf-8")
        sha, date = git_last_commit(md)
        result[rel] = {
            "path": str(md),
            "lastCommit": sha,
            "lastModified": date,
            "contentHash": body_hash(content),
        }
    return result


def scan_translations(lang: str) -> dict:
    """
    Returns: { 'Category/file.md' (zh path): {lang_data} }
    """
    result = {}
    lang_dir = KNOWLEDGE / lang
    if not lang_dir.exists():
        return result
    for md in lang_dir.rglob("*.md"):
        if md.name.startswith("_"):
            continue
        try:
            content = md.read_text(encoding="utf-8")
        except Exception:
            continue
        fm = parse_frontmatter(content)
        tf = fm.get("translatedFrom", "").replace("knowledge/", "")
        if not tf:
            continue
        sha, date = git_last_commit(md)
        result[tf] = {
            "lang": lang,
            "path": str(md.relative_to(KNOWLEDGE)),
            "translatedFrom": tf,
            "sourceCommitSha": fm.get("sourceCommitSha", ""),
            "sourceContentHash": fm.get("sourceContentHash", ""),
            "translatedAt": fm.get("translatedAt", ""),
            "translationLastCommit": sha,
            "translationLastModified": date,
            "inferred": fm.get("translatedFromInferred", "") in ("true", "True"),
        }
    return result


def classify(zh_data: dict, trans_data: dict) -> dict:
    """
    Returns dict with 'status', 'commitsBehind', 'reason', 'diffSummary' (when stale)
    """
    if not trans_data:
        return {"status": "missing"}
    zh_sha = zh_data["lastCommit"]
    zh_hash = zh_data["contentHash"]
    src_sha = trans_data["sourceCommitSha"]
    src_hash = trans_data["sourceContentHash"]

    # Case A: no sourceCommitSha at all (frontmatter not yet backfilled)
    if not src_sha:
        return {"status": "stale", "reason": "no-source-sha"}

    # Case B: pre-toolkit marker (backfill couldn't infer)
    if src_sha == "pre-toolkit":
        return {"status": "stale", "reason": "pre-toolkit"}

    # Case C: try git ancestry — count commits in zh since src_sha
    zh_path = REPO / "knowledge" / trans_data["translatedFrom"]
    if not zh_path.exists():
        return {"status": "orphan"}

    behind = git_commits_between(src_sha, zh_path)

    # Case D: src_sha vanished from git (rebase/squash) → fall back to hash
    if behind < 0:
        if src_hash and src_hash == zh_hash:
            return {"status": "fresh", "reason": "hash-match-sha-lost"}
        return {"status": "stale", "reason": "sha-lost-hash-mismatch"}

    # Case E: still on same commit → fresh
    if behind == 0:
        return {"status": "fresh", "reason": "same-commit"}

    # Case F: zh moved forward → stale
    diff = git_diff_summary(src_sha, zh_path)
    return {
        "status": "stale",
        "reason": "zh-moved-forward",
        "commitsBehind": behind,
        "diffSummary": diff,
    }


def build_status(active_langs: list[str]) -> dict:
    zh_files = scan_zh()
    by_article = {}
    summary = {lang: {"total_zh": len(zh_files), "fresh": 0, "stale": 0, "missing": 0, "orphan": 0}
                for lang in active_langs}

    # Index translations per language
    trans_by_lang = {lang: scan_translations(lang) for lang in active_langs}

    # Track orphans (translations whose zh is missing)
    orphans = {lang: [] for lang in active_langs}
    for lang, trans_map in trans_by_lang.items():
        for tf, data in trans_map.items():
            if tf not in zh_files:
                orphans[lang].append(data["path"])
                summary[lang]["orphan"] += 1

    # Walk every zh article × every language
    for zh_rel, zh_info in zh_files.items():
        entry = {
            "zh": {
                "lastCommit": zh_info["lastCommit"],
                "lastModified": zh_info["lastModified"],
                "contentHash": zh_info["contentHash"],
            },
            "translations": {},
        }
        for lang in active_langs:
            trans = trans_by_lang[lang].get(zh_rel)
            cls = classify(zh_info, trans)
            tdata = {**(trans or {}), **cls}
            # Strip 'lang' key (already keyed)
            tdata.pop("lang", None)
            entry["translations"][lang] = tdata
            summary[lang][cls["status"]] = summary[lang].get(cls["status"], 0) + 1
        by_article[zh_rel] = entry

    head = git("rev-parse", "--short", "HEAD")
    return {
        "_meta": {
            "lastUpdated": datetime.now().astimezone().isoformat(timespec="seconds"),
            "zhCommitHead": head,
            "totalZh": len(zh_files),
            "activeLanguages": active_langs,
            "summary": summary,
            "orphans": orphans,
        },
        "byArticle": by_article,
    }


# ---------- output formatting ----------

def print_summary_table(status: dict, lang_filter: str | None):
    print(f"\n📊 Translation status @ {status['_meta']['zhCommitHead']}")
    print(f"   zh-TW canonical articles: {status['_meta']['totalZh']}")
    print(f"   Updated: {status['_meta']['lastUpdated']}\n")

    print(f"{'Lang':<6} {'Fresh':>6} {'Stale':>6} {'Missing':>8} {'Orphan':>7} {'Coverage':>10}")
    print("-" * 50)
    for lang, s in status["_meta"]["summary"].items():
        if lang_filter and lang != lang_filter:
            continue
        translated = s["fresh"] + s["stale"]
        coverage = (translated / s["total_zh"] * 100) if s["total_zh"] else 0
        print(f"{lang:<6} {s['fresh']:>6} {s['stale']:>6} {s['missing']:>8} {s['orphan']:>7} {coverage:>9.1f}%")
    print()


def print_article_list(status: dict, lang: str, status_filter: set[str], top: int | None):
    rows = []
    for zh_rel, entry in status["byArticle"].items():
        t = entry["translations"].get(lang, {})
        if t.get("status") in status_filter:
            rows.append((zh_rel, t))
    # Sort: NEWEST first (cheyu 2026-04-30: 「預設抓最新的翻譯不是最舊的」).
    # Both stale and missing ordered by zh lastModified descending — recent
    # zh edits get translated first while context is fresh in cheyu's mind,
    # avoiding long-tail backlog accumulation.
    #
    # Implementation uses Python's stable sort + two-pass:
    #   pass 1: sort all rows by zh lastModified DESC (newest first)
    #   pass 2: sort by status priority (stale=0, missing=1, other=2);
    #           stable sort preserves the DESC order from pass 1 inside groups.
    rows.sort(
        key=lambda r: status["byArticle"][r[0]]["zh"]["lastModified"],
        reverse=True,
    )

    def status_priority(t):
        s = t.get("status")
        return 0 if s == "stale" else 1 if s == "missing" else 2

    rows.sort(key=lambda r: status_priority(r[1]))
    if top:
        rows = rows[:top]

    if not rows:
        print(f"   (no articles match filter)")
        return

    print(f"\n📋 {len(rows)} articles ({', '.join(status_filter)}) for [{lang}]")
    print(f"{'Status':<10} {'Behind':>7} {'Diff':<14} {'zh-TW article'}")
    print("-" * 80)
    for rel, t in rows:
        s = t.get("status", "?")
        behind = str(t.get("commitsBehind", "")) if s == "stale" else ""
        diff = t.get("diffSummary", "") if s == "stale" else ""
        print(f"{s:<10} {behind:>7} {diff:<14} {rel}")
    print()


# ---------- main ----------

def main():
    p = argparse.ArgumentParser()
    p.add_argument("--lang", default="", help="Filter by language code (default: all)")
    p.add_argument("--status", default="", help="Comma-separated: fresh,stale,missing,orphan")
    p.add_argument("--top", type=int, default=None, help="Show top N articles in list")
    p.add_argument("--json", action="store_true", help="Print JSON to stdout (no table)")
    p.add_argument("--no-write", action="store_true", help="Don't write _translation-status.json")
    p.add_argument("--list", action="store_true", help="Print article list (requires --lang)")
    args = p.parse_args()

    active = LANG_DIRS if not args.lang else [args.lang]
    if args.lang and args.lang not in LANG_DIRS:
        print(f"❌ Unknown lang: {args.lang}. Available: {LANG_DIRS}", file=sys.stderr)
        sys.exit(1)

    # Always scan all 5 langs for the JSON cache; --lang filter is for display only
    status = build_status(LANG_DIRS)

    if not args.no_write:
        STATUS_JSON.write_text(
            json.dumps(status, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )

    if args.json:
        print(json.dumps(status, ensure_ascii=False, indent=2))
        return

    print_summary_table(status, args.lang or None)

    if args.list or args.status:
        if not args.lang:
            print("⚠️  --list / --status needs --lang to be useful. Showing 'en' by default.")
            args.lang = "en"
        sf = set(args.status.split(",")) if args.status else {"stale", "missing"}
        print_article_list(status, args.lang, sf, args.top)


if __name__ == "__main__":
    main()
