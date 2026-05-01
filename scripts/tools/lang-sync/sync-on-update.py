#!/usr/bin/env python3
"""
sync-on-update.py — Article-update triggered translation refresh detection

When a zh article is updated/committed, this tool identifies which language
translations need refresh (became stale) so they can be opt-in synced.

Use cases:
  1. Pre-commit hook: warn when zh changes invalidate N translations
  2. Post-commit cron: auto-prepare a small batch for stale translations
  3. Manual: sync-on-update.py --since 'last week' to bulk-prep refresh batch

Usage:
    # Recent changes (default since 1 day ago)
    python3 scripts/tools/lang-sync/sync-on-update.py

    # Specific commit range
    python3 scripts/tools/lang-sync/sync-on-update.py --since HEAD~10

    # Specific zh article
    python3 scripts/tools/lang-sync/sync-on-update.py --article Lifestyle/合作社.md

    # Output mini-manifest for specific lang
    python3 scripts/tools/lang-sync/sync-on-update.py --lang en --output-manifest .lang-sync-tasks/en/_micro.json

    # Show summary for all active langs
    python3 scripts/tools/lang-sync/sync-on-update.py --all-langs
"""
import argparse, json, subprocess, sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent.parent.parent
KNOWLEDGE = REPO / "knowledge"
ACTIVE_LANGS = ["en", "ja", "ko"]  # from src/config/languages.ts active list


def get_changed_zh_articles(since="1 day ago"):
    """Return list of zh article paths changed since given ref."""
    result = subprocess.run(
        ["git", "log", f"--since={since}", "--name-only", "--pretty=format:", "--", "knowledge/"],
        cwd=REPO, capture_output=True, text=True
    )
    paths = set()
    for line in result.stdout.splitlines():
        line = line.strip()
        if not line or "/" not in line:
            continue
        # Filter to zh articles (knowledge/Category/X.md, not knowledge/en/...)
        if line.startswith("knowledge/") and not any(
            line.startswith(f"knowledge/{lang}/") for lang in ACTIVE_LANGS + ["es", "fr"]
        ):
            zh_path = line[len("knowledge/"):]
            if zh_path.endswith(".md") and "/" in zh_path:
                paths.add(zh_path)
    return sorted(paths)


def get_translations_for_zh(zh_path, langs):
    """Return {lang: {status, en_path}} for given zh article."""
    data = json.load(open(KNOWLEDGE / "_translation-status.json"))
    arts = data["byArticle"]
    info = arts.get(zh_path)
    if not info:
        return {}
    result = {}
    for lang in langs:
        t = info.get("translations", {}).get(lang, {})
        result[lang] = {
            "status": t.get("status", "missing"),
            "path": t.get("path", ""),
        }
    return result


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--since", default="1 day ago", help="git ref/since for changed articles")
    ap.add_argument("--article", help="Specific zh article path (overrides --since)")
    ap.add_argument("--lang", default=None, help="Single lang to focus on (default: all active)")
    ap.add_argument("--all-langs", action="store_true", help="Show all active langs")
    ap.add_argument("--output-manifest", help="Write mini-manifest JSON to path")
    ap.add_argument("--summary-only", action="store_true", help="Just print counts")
    args = ap.parse_args()

    langs = [args.lang] if args.lang else ACTIVE_LANGS

    if args.article:
        articles = [args.article]
    else:
        articles = get_changed_zh_articles(args.since)

    if not articles:
        print(f"No zh articles changed in '{args.since}'")
        return

    print(f"📋 Changed zh articles: {len(articles)}")
    print(f"📋 Active langs to check: {', '.join(langs)}\n")

    needs_refresh = {lang: [] for lang in langs}
    for zh in articles:
        trans = get_translations_for_zh(zh, langs)
        for lang in langs:
            t = trans.get(lang, {})
            if t.get("status") in ("stale", "missing"):
                needs_refresh[lang].append({
                    "zh_path": zh,
                    "status": t["status"],
                    "en_path": t.get("path", ""),
                })

    print("=== Refresh needed by language ===\n")
    for lang in langs:
        items = needs_refresh[lang]
        print(f"  {lang}: {len(items)} need refresh")
        if not args.summary_only:
            for item in items[:10]:
                marker = "🆕" if item["status"] == "missing" else "🔄"
                print(f"    {marker} {item['zh_path']} ({item['status']})")
            if len(items) > 10:
                print(f"    ... +{len(items)-10} more")
        print()

    # Write mini-manifest if requested
    if args.output_manifest:
        if not args.lang:
            print("⚠️ --output-manifest requires --lang", file=sys.stderr)
            sys.exit(1)
        # Write a list file the prepare-batch.py --input can consume
        out = Path(args.output_manifest)
        out.parent.mkdir(parents=True, exist_ok=True)
        with open(out, "w") as f:
            for item in needs_refresh[args.lang]:
                f.write(item["zh_path"] + "\n")
        print(f"\n✅ Wrote {len(needs_refresh[args.lang])} paths to {out}")
        print(f"   Next: python3 scripts/tools/lang-sync/prepare-batch.py --lang {args.lang} --input {out} --groups 5")


if __name__ == "__main__":
    main()
