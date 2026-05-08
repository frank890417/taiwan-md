#!/usr/bin/env python3
"""
extract-spore-metrics.py — narrative → struct cols auto-derive (TRANSITIONAL after Phase 0-3)

## Status (2026-05-08 Phase 4 cleanup)

After SSOT cleanup, this script is **transitional fallback**:
  - Primary path: SPORE-HARVESTS body table → generate-dashboard-spores.py (Phase 2)
  - Fallback: SPORE-LOG narrative → struct cols → generator (this script)

When SPORE-LOG narrative is up to date but struct cols stale, this script bridges
the gap. Phase 5 candidate for removal once all harvest workflows write
SPORE-HARVESTS body tables canonically.

NOT removed yet because (a) covers all historical spores #1-#46 that pre-date
canonical batch logs, (b) extract-spore-metrics is faster than re-parsing all
SPORE-HARVESTS body tables every refresh.

Original 2026-05-03 design notes follow.

---

哲宇 2026-05-03「造橋鋪路進化，讓未來不會發生，SSOT」push 的具體 instantiation：

## 為什麼存在

SPORE-LOG.md 「成效追蹤」table 的 schema:
- **SSOT (narrative)**: `最後 harvest` column — 人類 harvest 寫進這 rich-text，含
  D+0 / D+3 / D+7 / D+30 多 segment 完整 history + reflection
- **Derived (structured)**: `7d 觸及 / 7d 互動 / 7d 導流 / 30d 觸及 / 30d 互動 / 30d 導流`
  6 個 column — dashboard generator 跟下游分析用的 fast-path

問題：harvest 寫進 narrative 後，structured columns 仍是 placeholder「—（待 D+7）」。
Dashboard generator 看 7d 結構列為主 → 判 OVERDUE / engagementRate=null，即使
narrative 已有完整 D+7 數字。

例：5/3 dashboard 顯示 #45 壞特 65K views 但 — Rate / 互動，且仍標 OVERDUE，
明明 narrative 已有「**65,400 views** / 1,000♥ / 23🔁 / 13💬 / 115📮 = 1,151
engagements / **rate 1.8%**」完整 D+7 backfill。

## 解法（造橋）

跑此工具 auto-parse narrative → fill structured columns。加進 refresh-data.sh
讓每次心跳都同步 derived layer。SSOT 仍是 narrative，但 derived 自動更新。

DNA #15「反覆浮現要儀器化」第 N+5 次 instantiation。

## Strategy

For each row in 成效追蹤 table:
1. Parse `最後 harvest` cell for D+7 segment（首次出現的 D+7 backfill 數字組）
2. Parse same cell for D+30 segment（如有）
3. Extract: views, likes♥, reposts🔁, replies💬, bookmarks/shares📮, engagements, rate
4. Write back to structured columns:
   - `7d 觸及` ← D+7 views
   - `7d 互動` ← D+7 engagements (likes+reposts+replies+bookmarks)
   - `30d 觸及` ← D+30 views
   - `30d 互動` ← D+30 engagements

Skip if structured columns already have non-placeholder values (preserve manual override).

Usage:
  python3 scripts/tools/extract-spore-metrics.py --dry-run  # show what would change
  python3 scripts/tools/extract-spore-metrics.py --apply    # write back
"""

import argparse
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent.parent
SPORE_LOG = REPO / "docs/factory/SPORE-LOG.md"


def parse_number(s):
    """'65,400' / '65.4K' / '180K' / '1,000' → int."""
    if not s:
        return None
    s = s.strip().replace(",", "").replace("*", "").replace(" ", "")
    m = re.match(r"^([\d.]+)([KkMm]?)", s)
    if not m:
        return None
    try:
        num = float(m.group(1))
    except ValueError:
        return None
    suffix = m.group(2).upper()
    if suffix == "K":
        num *= 1_000
    elif suffix == "M":
        num *= 1_000_000
    return int(num)


def extract_metrics_segment(text, day_marker):
    """Given full narrative text + day_marker (e.g. 'D+7' or 'D+30'),
    return (views, engagements) for the FIRST occurrence of that marker.

    Pattern variations across history:
      'D+7 backfill (...)：65,400 views / 1,000♥ / 23🔁 / 13💬 / 115📮 = 1,151 engagements / rate 1.8%'
      'D+7 backfill (...)：827 views / 60♥ / 1🔁 / 1💬 = 62 engagements / rate 7.5%'
      'D+30 backfill (...)：65,400 views / ...' (rare)

    Returns (views: int|None, engagements: int|None).
    Skips D+0 / D+3 segments — only matches exact marker.
    """
    # Split text into segments by D+N markers; find segment starting with day_marker
    # Each segment ends at next 'D+N' or end-of-text.
    pattern = rf"\b{re.escape(day_marker)}\b[^]]*?(\d+(?:\.\d+)?[KMkm]|\d{{1,3}}(?:,\d{{3}})+|\d+)\s+views?\b"
    m = re.search(pattern, text)
    views = None
    if m:
        views = parse_number(m.group(1))

    # Engagements: scan for 'N engagements' within ~500 chars after the day_marker
    eng = None
    seg_start = re.search(rf"\b{re.escape(day_marker)}\b", text)
    if seg_start:
        seg_text = text[seg_start.start() : seg_start.start() + 800]
        # End at next D+N marker
        next_marker = re.search(r"\bD\+\d+\b", seg_text[len(day_marker) :])
        if next_marker:
            seg_text = seg_text[: len(day_marker) + next_marker.start()]
        e = re.search(r"=\s*(\d+(?:\.\d+)?[KMkm]?|\d{1,3}(?:,\d{3})+)\s+engagements?\b", seg_text)
        if e:
            eng = parse_number(e.group(1))
    return views, eng


def is_placeholder(cell):
    """Cell is placeholder if empty / dash / '—（待 D+7）' / etc."""
    if not cell:
        return True
    s = cell.strip()
    if s in ("—", "-", ""):
        return True
    if "—" in s and "待" in s:
        return True
    return False


def split_table_row(line):
    """Split markdown table row by | and strip cells."""
    # Lines start/end with |; split returns ['', cell1, cell2, ..., '']
    parts = line.split("|")
    if len(parts) < 3:
        return None
    cells = [p.strip() for p in parts[1:-1]]
    return cells, parts


def join_table_row(cells, original_parts):
    """Rebuild row preserving leading/trailing | and original whitespace where possible."""
    # We rebuild with single space padding; original spacing varies
    return "| " + " | ".join(cells) + " |"


def format_cell_padded(value, width):
    """Right-pad a cell content to roughly match column width."""
    s = str(value) if value is not None else "—"
    if len(s) < width:
        s = s + " " * (width - len(s))
    return s


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--apply", action="store_true", help="Write changes back to SPORE-LOG.md")
    ap.add_argument("--dry-run", action="store_true", help="Show what would change (default)")
    args = ap.parse_args()

    text = SPORE_LOG.read_text(encoding="utf-8")
    lines = text.split("\n")

    # Find 成效追蹤 table boundaries
    in_section = False
    in_table = False
    header_idx = -1
    rows_indices = []
    for i, line in enumerate(lines):
        if line.startswith("## 成效追蹤"):
            in_section = True
            continue
        if in_section and line.startswith("## "):
            break
        if in_section:
            if not in_table:
                if line.startswith("| #") or line.startswith("|#"):
                    header_idx = i
                    in_table = True
                continue
            # In table: skip separator row
            if re.match(r"^\|\s*-+", line):
                continue
            if line.startswith("|"):
                rows_indices.append(i)

    if header_idx < 0 or not rows_indices:
        print("❌ 成效追蹤 table not found", file=sys.stderr)
        return 1

    # Parse header to find column indices
    header_cells = [c.strip() for c in lines[header_idx].split("|")[1:-1]]
    col_idx = {name: idx for idx, name in enumerate(header_cells)}

    required_cols = ["#", "7d 觸及", "7d 互動", "30d 觸及", "30d 互動", "最後 harvest"]
    for c in required_cols:
        if c not in col_idx:
            print(f"❌ Missing column: {c} in header {header_cells}", file=sys.stderr)
            return 1

    print(f"📋 成效追蹤 table: {len(rows_indices)} rows")
    changes = []

    for row_i in rows_indices:
        line = lines[row_i]
        result = split_table_row(line)
        if not result:
            continue
        cells, original_parts = result
        if len(cells) != len(header_cells):
            continue

        n = cells[col_idx["#"]]
        harvest = cells[col_idx["最後 harvest"]]
        if not harvest:
            continue

        # Extract D+7 / D+30 segments from narrative
        v7, e7 = extract_metrics_segment(harvest, "D+7")
        v30, e30 = extract_metrics_segment(harvest, "D+30")

        # Also try D+10 (treated as 7d since past 7-day mark)
        if v7 is None:
            v10, e10 = extract_metrics_segment(harvest, "D+10")
            if v10 is not None:
                v7, e7 = v10, e10

        # Plan updates: only fill if structured cell is placeholder
        new_cells = list(cells)
        row_changed = False

        if v7 is not None and is_placeholder(cells[col_idx["7d 觸及"]]):
            old_w = len(cells[col_idx["7d 觸及"]])
            new_cells[col_idx["7d 觸及"]] = format_cell_padded(f"{v7:,}", old_w)
            row_changed = True
        if e7 is not None and is_placeholder(cells[col_idx["7d 互動"]]):
            old_w = len(cells[col_idx["7d 互動"]])
            new_cells[col_idx["7d 互動"]] = format_cell_padded(f"{e7:,}", old_w)
            row_changed = True
        if v30 is not None and is_placeholder(cells[col_idx["30d 觸及"]]):
            old_w = len(cells[col_idx["30d 觸及"]])
            new_cells[col_idx["30d 觸及"]] = format_cell_padded(f"{v30:,}", old_w)
            row_changed = True
        if e30 is not None and is_placeholder(cells[col_idx["30d 互動"]]):
            old_w = len(cells[col_idx["30d 互動"]])
            new_cells[col_idx["30d 互動"]] = format_cell_padded(f"{e30:,}", old_w)
            row_changed = True

        if row_changed:
            new_line = "| " + " | ".join(new_cells) + " |"
            changes.append((row_i, n, line, new_line, {"v7": v7, "e7": e7, "v30": v30, "e30": e30}))

    print(f"📊 Changes planned: {len(changes)} rows")
    for row_i, n, _old, _new, m in changes[:15]:
        marker = "v7=" + (str(m["v7"]) if m["v7"] else "—")
        marker += " e7=" + (str(m["e7"]) if m["e7"] else "—")
        if m["v30"]:
            marker += f" v30={m['v30']}"
        print(f"  #{n}: {marker}")
    if len(changes) > 15:
        print(f"  ... ({len(changes) - 15} more)")

    if not args.apply:
        print("\n(dry-run; pass --apply to write changes)")
        return 0

    # Apply changes
    for row_i, n, old, new, _ in changes:
        lines[row_i] = new

    SPORE_LOG.write_text("\n".join(lines), encoding="utf-8")
    print(f"\n✅ Applied: {len(changes)} rows updated in SPORE-LOG.md")
    return 0


if __name__ == "__main__":
    sys.exit(main())
