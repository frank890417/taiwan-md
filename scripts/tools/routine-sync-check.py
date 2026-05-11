#!/usr/bin/env python3
"""
routine-sync-check.py — Routine 飛輪 SSOT vs mirror drift detector

per MANIFESTO §指標 over 複寫 §薄殼鐵律
per DNA #38 status drift = silent killer
per DNA #52 immune system fail-loud
per ROUTINE.md §同步來源 — promised tool, finally written 2026-05-11

Compares docs/semiont/ROUTINE.md SSOT vs
~/.claude/scheduled-tasks/twmd-*/SKILL.md mirrors. Detects:

  ✗ missing mirror   (SSOT lists task but no mirror dir)
  ✗ orphan mirror    (mirror exists but not in SSOT)
  ✗ skill drift      (mirror's name field != SSOT's task title)
  ✗ thick mirror     (mirror > 30 lines = warn, > 50 = hard)
                     per 薄殼鐵律 1: mirrors must be thin pointers

Mirrors should pointer back to ROUTINE.md + canonical pipeline, not
inline Stage steps / quality gates / escalation logic.

Usage:
    python3 scripts/tools/routine-sync-check.py
    python3 scripts/tools/routine-sync-check.py --format=json
    python3 scripts/tools/routine-sync-check.py --warn-lines=30 --hard-lines=50

Exit code: 0 = pass, 1 = drift / thick mirror found
"""

import argparse
import json
import os
import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent.parent
ROUTINE_SSOT = REPO_ROOT / "docs" / "semiont" / "ROUTINE.md"
MIRROR_ROOT = Path(os.path.expanduser("~/.claude/scheduled-tasks"))

DEFAULT_WARN_LINES = 30
DEFAULT_HARD_LINES = 50


def parse_routine_table(ssot_path):
    """Extract routine task rows from §10 條核心 routine 排程表 markdown table."""
    text = ssot_path.read_text(encoding="utf-8")
    tasks = {}
    in_table = False
    for line in text.splitlines():
        if line.startswith("| TaskId"):
            in_table = True
            continue
        if in_table:
            if not line.startswith("|") or line.startswith("| ---"):
                if line.strip() == "" and tasks:
                    break
                continue
            cells = [c.strip() for c in line.split("|")[1:-1]]
            if len(cells) < 6:
                continue
            task_id_raw = cells[0].strip("`")
            if not task_id_raw.startswith("twmd-"):
                continue
            tasks[task_id_raw] = {
                "title": re.sub(r"\s+¹.*$", "", cells[1]),
                "cron": cells[2].strip("`"),
                "skill": cells[3].strip("`"),
                "model": cells[4],
                "cadence": cells[5],
            }
    return tasks


def parse_mirror_frontmatter(skill_path):
    """Extract frontmatter name + description from SKILL.md."""
    text = skill_path.read_text(encoding="utf-8")
    fm = {}
    m = re.match(r"^---\n(.*?)\n---", text, re.DOTALL)
    if not m:
        return fm, len(text.splitlines())
    for line in m.group(1).splitlines():
        if ":" in line:
            k, v = line.split(":", 1)
            fm[k.strip()] = v.strip()
    return fm, len(text.splitlines())


def audit(warn_lines, hard_lines):
    results = {"missing": [], "orphan": [], "drift": [], "thick": [], "ok": []}

    if not ROUTINE_SSOT.exists():
        print(f"❌ ROUTINE SSOT not found: {ROUTINE_SSOT}", file=sys.stderr)
        return results, 2

    ssot_tasks = parse_routine_table(ROUTINE_SSOT)

    mirror_dirs = (
        {p.name: p for p in MIRROR_ROOT.glob("twmd-*") if p.is_dir()}
        if MIRROR_ROOT.exists()
        else {}
    )

    for task_id, meta in ssot_tasks.items():
        mirror_dir = mirror_dirs.get(task_id)
        if mirror_dir is None:
            results["missing"].append({"task_id": task_id, "meta": meta})
            continue

        skill_md = mirror_dir / "SKILL.md"
        if not skill_md.exists():
            results["missing"].append(
                {"task_id": task_id, "meta": meta, "reason": "no SKILL.md"}
            )
            continue

        fm, line_count = parse_mirror_frontmatter(skill_md)

        if fm.get("name") != task_id:
            results["drift"].append(
                {
                    "task_id": task_id,
                    "field": "name",
                    "ssot": task_id,
                    "mirror": fm.get("name", "<missing>"),
                }
            )

        thick_severity = None
        if line_count > hard_lines:
            thick_severity = "hard"
        elif line_count > warn_lines:
            thick_severity = "warn"

        if thick_severity:
            results["thick"].append(
                {
                    "task_id": task_id,
                    "lines": line_count,
                    "threshold_warn": warn_lines,
                    "threshold_hard": hard_lines,
                    "severity": thick_severity,
                }
            )
        else:
            results["ok"].append({"task_id": task_id, "lines": line_count})

    ssot_ids = set(ssot_tasks.keys())
    for mirror_id in mirror_dirs.keys():
        if mirror_id not in ssot_ids:
            results["orphan"].append({"task_id": mirror_id})

    exit_code = 0
    if results["missing"] or results["orphan"] or results["drift"]:
        exit_code = 1
    if any(t["severity"] == "hard" for t in results["thick"]):
        exit_code = 1

    return results, exit_code


def print_human(results, exit_code):
    print("🧬 routine-sync-check — ROUTINE.md SSOT vs ~/.claude/scheduled-tasks/ mirrors")
    print()

    if results["ok"]:
        print(f"✅ {len(results['ok'])} routine 薄殼合規:")
        for r in results["ok"]:
            print(f"   {r['task_id']:32s} {r['lines']:>3} lines")
        print()

    if results["missing"]:
        print(f"❌ MISSING ({len(results['missing'])}) — SSOT 有但 mirror 缺:")
        for r in results["missing"]:
            print(f"   {r['task_id']}  ({r.get('reason', 'dir missing')})")
        print()

    if results["orphan"]:
        print(f"❌ ORPHAN ({len(results['orphan'])}) — mirror 有但 SSOT 缺:")
        for r in results["orphan"]:
            print(f"   {r['task_id']}")
        print()

    if results["drift"]:
        print(f"❌ DRIFT ({len(results['drift'])}) — SSOT vs mirror 欄位不一致:")
        for r in results["drift"]:
            print(
                f"   {r['task_id']:32s} {r['field']}: ssot='{r['ssot']}' mirror='{r['mirror']}'"
            )
        print()

    if results["thick"]:
        print(f"⚠️  THICK ({len(results['thick'])}) — mirror 違反薄殼鐵律 (per MANIFESTO §指標 over 複寫):")
        for r in sorted(results["thick"], key=lambda x: -x["lines"]):
            marker = "🔴" if r["severity"] == "hard" else "🟡"
            print(
                f"   {marker} {r['task_id']:32s} {r['lines']:>3} lines "
                f"(warn>{r['threshold_warn']} hard>{r['threshold_hard']})"
            )
        print()

    total_routines = len(results["ok"]) + len(results["thick"]) + len(results["missing"])
    hard_thick = sum(1 for t in results["thick"] if t["severity"] == "hard")
    print(
        f"Summary: {total_routines} routines  "
        f"ok={len(results['ok'])}  thick(warn)={len(results['thick']) - hard_thick}  "
        f"thick(hard)={hard_thick}  missing={len(results['missing'])}  "
        f"orphan={len(results['orphan'])}  drift={len(results['drift'])}  "
        f"exit={exit_code}"
    )


def main():
    parser = argparse.ArgumentParser(
        description="Routine 飛輪 SSOT vs mirror drift detector"
    )
    parser.add_argument(
        "--warn-lines",
        type=int,
        default=DEFAULT_WARN_LINES,
        help="mirror line threshold for warn (default 30)",
    )
    parser.add_argument(
        "--hard-lines",
        type=int,
        default=DEFAULT_HARD_LINES,
        help="mirror line threshold for hard fail (default 50)",
    )
    parser.add_argument(
        "--format",
        choices=["human", "json"],
        default="human",
        help="output format",
    )
    args = parser.parse_args()

    results, exit_code = audit(args.warn_lines, args.hard_lines)

    if args.format == "json":
        print(json.dumps({"results": results, "exit_code": exit_code}, indent=2))
    else:
        print_human(results, exit_code)

    sys.exit(exit_code)


if __name__ == "__main__":
    main()
