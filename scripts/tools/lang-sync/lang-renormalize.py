#!/usr/bin/env python3
"""
lang-renormalize.py — 統一跨語系 slug 為 en canonical（slug consistency batch rename）

URL convention (post Tailwind-Phase-6 fix, 2026-04-12)：所有 locales 用 EN slug
為 URL path。如果非 en lang 翻譯 file 用 native slug（如 ja/Music/ktv.md vs en
canonical ktv-culture），dropdown 切換時會 404，因為 build 從 file slug 生 URL。

Fix：把 lang file rename 成 en canonical slug。Frontmatter `translatedFrom` 不變
（仍指向 zh source），_translations.json 由 sync-translations-json.py 從
frontmatter 重建。

Output:
- Rename plan: `.lang-sync-tasks/renormalize/rename-plan.json`
- Redirect candidates: `.lang-sync-tasks/renormalize/redirects-needed.json`
  （old URL → new URL，可選擇性加進 astro.config.mjs）

Usage:
  python3 scripts/tools/lang-sync/lang-renormalize.py --audit reports/cross-lang-audit-YYYY-MM-DD.json
  python3 scripts/tools/lang-sync/lang-renormalize.py --audit ... --apply
  python3 scripts/tools/lang-sync/lang-renormalize.py --audit ... --apply --skip-conflict
"""

import argparse
import json
import sys
from collections import defaultdict
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent.parent.parent
KNOWLEDGE = REPO / "knowledge"

CATEGORY_FOLDER_TO_SLUG = {
    "About": "about",
    "History": "history",
    "Geography": "geography",
    "Culture": "culture",
    "Food": "food",
    "Art": "art",
    "Music": "music",
    "Technology": "technology",
    "Nature": "nature",
    "People": "people",
    "Society": "society",
    "Economy": "economy",
    "Lifestyle": "lifestyle",
    "Resources": "resources",
    "Language": "language",
}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--audit", required=True, help="cross-lang-audit JSON path")
    ap.add_argument("--apply", action="store_true", help="apply renames (default dry-run)")
    ap.add_argument("--skip-conflict", action="store_true",
                    help="skip rename if target already exists")
    ap.add_argument("--lang", help="filter by lang")
    args = ap.parse_args()

    audit = json.load(open(args.audit, encoding="utf-8"))
    issues = audit.get("issues", [])

    # Collect rename plan: { current_path: target_path }
    rename_plan = {}
    redirects_needed = []  # list of {old_url, new_url}
    conflicts = []
    duplicates_per_zh = defaultdict(list)  # zh_source → [lang files]

    for entry in issues:
        for iss in entry["issues"]:
            if iss["type"] != "slug_mismatch":
                continue
            if args.lang and entry["lang"] != args.lang:
                continue

            current_rel = entry["path"]  # e.g. 'ja/Music/ktv.md'
            current_full = KNOWLEDGE / current_rel
            if not current_full.exists():
                continue

            # Build target path: same lang/category but en canonical slug
            parts = current_rel.split("/")
            if len(parts) < 3:
                continue
            lang = parts[0]
            cat = parts[1]
            new_filename = f"{iss['canonical']}.md"
            target_rel = f"{lang}/{cat}/{new_filename}"
            target_full = KNOWLEDGE / target_rel

            duplicates_per_zh[entry["zh_source"]].append((current_rel, target_rel))

            # Skip if already at canonical
            if current_rel == target_rel:
                continue

            # Conflict check
            if target_full.exists() and current_full != target_full:
                conflicts.append({
                    "current": current_rel,
                    "target": target_rel,
                    "reason": "target file already exists",
                    "zh_source": entry["zh_source"],
                })
                if args.skip_conflict:
                    break
                # else: keep in plan but mark conflict

            rename_plan[current_rel] = {
                "target": target_rel,
                "zh_source": entry["zh_source"],
                "actual": iss["actual"],
                "canonical": iss["canonical"],
            }

            # Redirect: old URL → new URL（for indexed inbound links）
            cat_slug = CATEGORY_FOLDER_TO_SLUG.get(cat, cat.lower())
            old_url = f"/{lang}/{cat_slug}/{iss['actual']}"
            new_url = f"/{lang}/{cat_slug}/{iss['canonical']}/"
            redirects_needed.append({"old": old_url, "new": new_url})
            break

    # Detect duplicates: same zh source has multiple lang files for same lang
    multi_file_per_lang_zh = []
    for zh, files in duplicates_per_zh.items():
        # Group by lang
        by_lang = defaultdict(list)
        for cur, tgt in files:
            lang = cur.split("/")[0]
            by_lang[lang].append((cur, tgt))
        for lang, lst in by_lang.items():
            if len(lst) > 1:
                multi_file_per_lang_zh.append({"zh": zh, "lang": lang, "files": lst})

    # Output dir
    out_dir = REPO / ".lang-sync-tasks" / "renormalize"
    out_dir.mkdir(parents=True, exist_ok=True)

    # Write plan + redirects + conflicts
    (out_dir / "rename-plan.json").write_text(
        json.dumps(rename_plan, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    (out_dir / "redirects-needed.json").write_text(
        json.dumps(redirects_needed, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    (out_dir / "conflicts.json").write_text(
        json.dumps(conflicts, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    if multi_file_per_lang_zh:
        (out_dir / "multi-file-per-lang.json").write_text(
            json.dumps(multi_file_per_lang_zh, ensure_ascii=False, indent=2), encoding="utf-8"
        )

    # Print summary
    print(f"📋 Slug renormalize plan:")
    print(f"   Renames: {len(rename_plan)}")
    print(f"   Redirects needed: {len(redirects_needed)}")
    print(f"   Conflicts (target exists): {len(conflicts)}")
    print(f"   Multi-file-per-lang (1 zh → multi lang slugs): {len(multi_file_per_lang_zh)}")
    print(f"   Output: {out_dir}/")

    # Per-lang breakdown
    by_lang = defaultdict(int)
    for cur in rename_plan:
        by_lang[cur.split("/")[0]] += 1
    print()
    for l, n in sorted(by_lang.items(), key=lambda x: -x[1]):
        print(f"   {l}: {n}")

    if not args.apply:
        print("\n(dry-run; pass --apply to rename files)")
        for cur in list(rename_plan.keys())[:5]:
            tgt = rename_plan[cur]["target"]
            print(f"  → mv {cur} → {tgt}")
        return 0

    # Build set of (lang, target) pairs that have multiple sources mapped to them
    # — these are the dup-collision cases that must be skipped (manual review).
    target_collision_count = defaultdict(int)
    for cur, info in rename_plan.items():
        target_collision_count[info["target"]] += 1
    target_collisions = {t for t, n in target_collision_count.items() if n > 1}

    # Apply renames
    applied = 0
    skipped = 0
    failed = []
    deferred_collisions = []
    for cur, info in rename_plan.items():
        cur_full = KNOWLEDGE / cur
        tgt_full = KNOWLEDGE / info["target"]

        if not cur_full.exists():
            skipped += 1
            continue

        # Multi-file-per-lang collision: skip both files (manual dedup needed)
        if info["target"] in target_collisions:
            deferred_collisions.append({
                "current": cur,
                "target": info["target"],
                "zh_source": info["zh_source"],
            })
            continue

        if tgt_full.exists() and cur_full != tgt_full:
            if args.skip_conflict:
                skipped += 1
                continue
            failed.append({"file": cur, "reason": "target exists, refusing overwrite"})
            continue

        try:
            tgt_full.parent.mkdir(parents=True, exist_ok=True)
            cur_full.rename(tgt_full)
            applied += 1
        except Exception as e:
            failed.append({"file": cur, "reason": str(e)})

    if deferred_collisions:
        (out_dir / "deferred-collisions.json").write_text(
            json.dumps(deferred_collisions, ensure_ascii=False, indent=2), encoding="utf-8"
        )
        print(f"⏭️  Deferred (multi-file collision): {len(deferred_collisions)} (manual dedup)")

    print(f"\n✅ Applied: {applied} renames")
    print(f"⏭️  Skipped: {skipped}")
    if failed:
        print(f"❌ Failed: {len(failed)}")
        for f in failed[:5]:
            print(f"   {f['file']}: {f['reason']}")
        (out_dir / "failed.json").write_text(
            json.dumps(failed, ensure_ascii=False, indent=2), encoding="utf-8"
        )

    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
