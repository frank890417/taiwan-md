#!/usr/bin/env python3
"""
sync-translations-json.py — 從翻譯檔的 frontmatter 重建 knowledge/_translations.json

設計反轉：之前 _translations.json 是 SSOT，現在 file-level translatedFrom 是 SSOT。
這個工具掃描所有 knowledge/{lang}/ 翻譯檔，讀取 frontmatter 的 translatedFrom，
然後重新生成 _translations.json 作為 derived cache。

用法:
  python3 scripts/tools/sync-translations-json.py [--dry-run] [--check]

  --dry-run: 只顯示會寫入什麼，不實際寫
  --check:   檢查現有 _translations.json 是否與 frontmatter 一致（CI 用）

退出碼:
  0 — 成功（或一致）
  1 — 不一致 / 錯誤
  2 — 偵測到孤兒（檔案存在但 translatedFrom 指向不存在的中文檔）
"""
import argparse
import json
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent.parent
KNOWLEDGE = REPO / "knowledge"
TRANSLATIONS = KNOWLEDGE / "_translations.json"

LANG_DIRS = ["en", "ja", "ko", "es", "fr"]


def parse_frontmatter(content: str) -> dict:
    """Extract YAML-ish frontmatter as a dict (only flat string fields)."""
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


def collect_from_frontmatter() -> tuple[dict, list, list]:
    """
    Scan all translation files and build the mapping.
    Returns (mapping, missing_tf_files, orphan_files).
    """
    mapping = {}
    missing_tf = []
    orphans = []

    for lang in LANG_DIRS:
        lang_dir = KNOWLEDGE / lang
        if not lang_dir.exists():
            continue
        for md_file in lang_dir.rglob("*.md"):
            # Skip Hub/Home files
            if md_file.name.startswith("_"):
                continue
            try:
                content = md_file.read_text(encoding="utf-8")
            except Exception:
                continue

            fm = parse_frontmatter(content)
            tf = fm.get("translatedFrom")

            rel_path = str(md_file.relative_to(KNOWLEDGE))

            if not tf:
                missing_tf.append(rel_path)
                continue

            # Strip any 'knowledge/' prefix (legacy bug)
            tf = tf.replace("knowledge/", "")

            # Verify the source file exists
            source_path = KNOWLEDGE / tf
            if not source_path.exists():
                orphans.append((rel_path, tf))

            mapping[rel_path] = tf

    return mapping, missing_tf, orphans


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument(
        "--check", action="store_true", help="Compare existing JSON against frontmatter"
    )
    args = parser.parse_args()

    mapping, missing_tf, orphans = collect_from_frontmatter()

    print(f"📊 Scanned: {len(mapping) + len(missing_tf)} translation files")
    print(f"   With translatedFrom:    {len(mapping)}")
    print(f"   Missing translatedFrom: {len(missing_tf)}")
    print(f"   Orphans (source gone):  {len(orphans)}")

    if missing_tf:
        print(f"\n⚠️  Files missing translatedFrom (showing 10):")
        for f in missing_tf[:10]:
            print(f"   - {f}")
        if len(missing_tf) > 10:
            print(f"   ... and {len(missing_tf) - 10} more")

    if orphans:
        print(f"\n🔴 Orphan translations (source file deleted):")
        for trans, src in orphans[:10]:
            print(f"   - {trans} → {src} (source missing)")
        if len(orphans) > 10:
            print(f"   ... and {len(orphans) - 10} more")

    if args.check:
        # Compare with existing JSON
        existing = json.loads(TRANSLATIONS.read_text())
        existing_keys = set(existing.keys())
        new_keys = set(mapping.keys())

        added = new_keys - existing_keys
        removed = existing_keys - new_keys
        changed = {k for k in new_keys & existing_keys if existing[k] != mapping[k]}

        if added or removed or changed:
            print(f"\n❌ _translations.json out of sync with frontmatter:")
            if added:
                print(f"   Would add ({len(added)}):")
                for k in list(added)[:5]:
                    print(f"     + {k} → {mapping[k]}")
            if removed:
                print(f"   Would remove ({len(removed)}):")
                for k in list(removed)[:5]:
                    print(f"     - {k}")
            if changed:
                print(f"   Would update ({len(changed)}):")
                for k in list(changed)[:5]:
                    print(f"     ~ {k}: {existing[k]} → {mapping[k]}")
            print(f"\n💡 Run without --check to update _translations.json")
            sys.exit(1)
        else:
            print(f"\n✅ _translations.json is in sync with frontmatter")
            sys.exit(2 if orphans else 0)

    # Sort for stable output
    sorted_mapping = dict(sorted(mapping.items()))

    if args.dry_run:
        print(f"\n🔍 DRY RUN — would write {len(sorted_mapping)} entries")
        sys.exit(0)

    TRANSLATIONS.write_text(
        json.dumps(sorted_mapping, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"\n✅ Wrote {TRANSLATIONS} ({len(sorted_mapping)} entries)")
    sys.exit(2 if orphans else 0)


if __name__ == "__main__":
    main()
