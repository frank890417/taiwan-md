#!/usr/bin/env python3
"""
backfill-frontmatter.py — 批次補 frontmatter missing fields

Modes:
  --field category    從 path 推導（純機械，cheapest）
  --field date        從 zh source 抄
  --field description 標記待 LLM 翻譯（生 manifest，不直接寫）
  --field title       標記待 LLM 翻譯（生 manifest，不直接寫）
  --all-mechanical    跑 category + date（不需 LLM）

Reads cross-lang-audit JSON to know which files need which fields.

Usage:
  python3 scripts/tools/lang-sync/backfill-frontmatter.py --audit reports/cross-lang-audit-YYYY-MM-DD.json --field category --apply
  python3 scripts/tools/lang-sync/backfill-frontmatter.py --audit ... --all-mechanical --apply
"""

import argparse
import json
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent.parent.parent

# Path → Category 推導（capitalized folder name 對應 12 大主題）
PATH_TO_CATEGORY = {
    "About": "About",
    "History": "History",
    "Geography": "Geography",
    "Culture": "Culture",
    "Food": "Food",
    "Art": "Art",
    "Music": "Music",
    "Technology": "Technology",
    "Nature": "Nature",
    "People": "People",
    "Society": "Society",
    "Economy": "Economy",
    "Lifestyle": "Lifestyle",
    "Resources": "Resources",
    "Language": "Language",
}


def parse_frontmatter(text: str):
    if not text.startswith("---"):
        return "", text, ""
    end = text.find("\n---", 3)
    if end == -1:
        return "", text, ""
    return text[: end + 4], text[end + 4 :], text[3:end]


def get_field(fm_body: str, key: str) -> str:
    m = re.search(rf"^{re.escape(key)}:\s*(.+?)\s*$", fm_body, re.M)
    if not m:
        return ""
    val = m.group(1).strip()
    if val.startswith(("'", '"')) and val.endswith(("'", '"')):
        val = val[1:-1]
    return val


def derive_category_from_path(rel_path: str) -> str:
    """rel_path = 'es/Art/foo.md' → 'Art'"""
    parts = rel_path.split("/")
    if len(parts) >= 3:
        cat_folder = parts[1]
        return PATH_TO_CATEGORY.get(cat_folder, "")
    return ""


def insert_frontmatter_field(fm_full: str, key: str, value: str) -> str:
    """Insert key:value into frontmatter. fm_full includes leading/trailing ---"""
    # Insert before closing ---
    lines = fm_full.split("\n")
    # Find closing ---
    closing_idx = -1
    for i in range(len(lines) - 1, -1, -1):
        if lines[i].strip() == "---":
            closing_idx = i
            break
    if closing_idx == -1:
        return fm_full
    # Build new line; quote string values containing special chars
    if re.search(r"[:#'\"]", value) or value != value.strip():
        new_line = f"{key}: '{value}'"
    else:
        new_line = f"{key}: {value}"
    lines.insert(closing_idx, new_line)
    return "\n".join(lines)


def get_zh_source_value(zh_path: str, key: str) -> str:
    """Read field from zh source frontmatter."""
    full = REPO / "knowledge" / zh_path
    if not full.exists():
        return ""
    text = full.read_text(encoding="utf-8", errors="replace")
    _, _, fm_body = parse_frontmatter(text)
    return get_field(fm_body, key)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--audit", required=True, help="Path to cross-lang-audit JSON")
    ap.add_argument("--field", choices=["category", "date", "description", "title"])
    ap.add_argument("--all-mechanical", action="store_true",
                    help="Run category + date (no LLM needed)")
    ap.add_argument("--apply", action="store_true",
                    help="Apply changes (default: dry-run)")
    ap.add_argument("--output-manifest", default=None,
                    help="For description/title: output LLM translation manifest")
    args = ap.parse_args()

    if not args.field and not args.all_mechanical:
        print("Need --field or --all-mechanical", file=sys.stderr)
        sys.exit(2)

    fields_to_run = []
    if args.all_mechanical:
        fields_to_run = ["category", "date"]
    else:
        fields_to_run = [args.field]

    audit = json.load(open(args.audit, encoding="utf-8"))
    issues = audit.get("issues", [])

    # Group by file path; collect missing fields per file
    file_missing: dict = {}
    for entry in issues:
        for iss in entry["issues"]:
            if iss["type"] != "frontmatter_missing":
                continue
            m = re.search(r"\[(.+?)\]", iss["msg"])
            if not m:
                continue
            fields = [f.strip().strip("'") for f in m.group(1).split(",")]
            file_missing.setdefault(entry["path"], {
                "zh_source": entry["zh_source"],
                "missing": set(),
            })
            file_missing[entry["path"]]["missing"].update(fields)

    plan = []
    llm_manifest = []

    for rel_path, info in file_missing.items():
        full = REPO / "knowledge" / rel_path
        if not full.exists():
            continue

        for field in fields_to_run:
            if field not in info["missing"]:
                continue

            if field == "category":
                value = derive_category_from_path(rel_path)
                if value:
                    plan.append((rel_path, "category", value))

            elif field == "date":
                value = get_zh_source_value(info["zh_source"], "date")
                if value:
                    plan.append((rel_path, "date", value))

            elif field in ("description", "title"):
                # Need LLM translation; emit to manifest
                zh_value = get_zh_source_value(info["zh_source"], field)
                if zh_value:
                    llm_manifest.append({
                        "target_file": rel_path,
                        "field": field,
                        "zh_value": zh_value,
                        "target_lang": rel_path.split("/")[0],
                        "zh_source": info["zh_source"],
                    })

    # Print plan summary
    by_field = {}
    for _, f, _ in plan:
        by_field[f] = by_field.get(f, 0) + 1
    print(f"📋 Plan: {len(plan)} mechanical fixes across {len(set(p[0] for p in plan))} files")
    for f, n in by_field.items():
        print(f"   {f}: {n}")
    if llm_manifest:
        print(f"📝 LLM manifest: {len(llm_manifest)} entries (description/title needing translation)")

    if not args.apply:
        print("\n(dry-run; pass --apply to write changes)")
        if plan:
            for p in plan[:5]:
                print(f"  → {p[0]}: {p[1]}={p[2]}")
            if len(plan) > 5:
                print(f"  ... ({len(plan) - 5} more)")
        return

    # Apply
    files_modified = set()
    for rel_path, field, value in plan:
        full = REPO / "knowledge" / rel_path
        text = full.read_text(encoding="utf-8", errors="replace")
        fm_full, body, fm_body = parse_frontmatter(text)
        if not fm_full:
            continue
        # Skip if field already exists (race-safe)
        if get_field(fm_body, field):
            continue
        new_fm = insert_frontmatter_field(fm_full, field, value)
        full.write_text(new_fm + body, encoding="utf-8")
        files_modified.add(rel_path)

    print(f"\n✅ Applied: {len(plan)} field insertions across {len(files_modified)} files")

    # Write LLM manifest if any
    if llm_manifest and args.output_manifest:
        Path(args.output_manifest).write_text(
            json.dumps(llm_manifest, ensure_ascii=False, indent=2), encoding="utf-8"
        )
        print(f"💾 LLM manifest: {args.output_manifest}")


if __name__ == "__main__":
    main()
