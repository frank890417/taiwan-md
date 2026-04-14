#!/usr/bin/env bash
# compress-memory.sh — 把過去 N 天的 memory entries 壓縮成 weekly digest
#
# MEMORY.md 規範是 ≤80 行，現在 257 行膨脹了 3 倍。
# 心跳每天 append 但沒有人 prune。這個工具把舊的 entries 合併成 weekly digest。
#
# 用法:
#   bash scripts/tools/compress-memory.sh [--days 7] [--dry-run]
#
# 規則：
#  - 預設壓縮 7 天前的 entries
#  - 一週內的 entries 保持原樣
#  - 一週前的 entries 合併成「YYYY-WeekNN: 標題列表」單一行
#  - 壓縮後的單行包含日記檔案的清單，方便回溯
#
# 來源：2026-04-14 η session, Tier 2 #8
set -uo pipefail
cd "$(dirname "$0")/../.."

DRY_RUN=false
DAYS=7
while [[ $# -gt 0 ]]; do
  case "$1" in
    --dry-run) DRY_RUN=true; shift ;;
    --days) DAYS="$2"; shift 2 ;;
    -h|--help)
      head -16 "$0" | tail -15 | sed 's/^# \?//'
      exit 0
      ;;
    *) echo "unknown: $1"; exit 1 ;;
  esac
done

MEMORY_FILE="docs/semiont/MEMORY.md"
MEMORY_DIR="docs/semiont/memory"

# Cutoff date
CUTOFF=$(date -v-${DAYS}d +%Y-%m-%d 2>/dev/null || date -d "$DAYS days ago" +%Y-%m-%d)

echo "🗜️  compress-memory — entries before $CUTOFF will be compressed"
echo ""

# Use Python for the line-by-line table parsing (bash is too painful)
python3 <<PYEOF
import re
import sys
from datetime import datetime, timedelta
from collections import defaultdict
from pathlib import Path

MEMORY = Path("$MEMORY_FILE")
CUTOFF = datetime.strptime("$CUTOFF", "%Y-%m-%d").date()
DRY_RUN = "$DRY_RUN" == "true"

text = MEMORY.read_text()
lines = text.splitlines()

# Find the table region. It starts with "| 日期" header.
table_start = None
table_end = None
for i, line in enumerate(lines):
    if table_start is None and line.startswith("| 日期"):
        table_start = i
        continue
    if table_start is not None and table_end is None:
        # Table ends at first non-table line after start
        if not line.startswith("|") and line.strip() != "":
            table_end = i
            break

if table_start is None:
    print("❌ Could not find table in MEMORY.md")
    sys.exit(1)
if table_end is None:
    table_end = len(lines)

# Header (2 lines: title + separator)
header = lines[table_start:table_start+2]
table_rows = lines[table_start+2:table_end]

# Parse each row: extract date
old_rows_by_week = defaultdict(list)  # ISO week → list of (date, session, file_link, summary_short)
new_rows = []

for row in table_rows:
    if not row.startswith("|"):
        continue
    cells = [c.strip() for c in row.split("|")[1:-1]]
    if len(cells) < 5:
        new_rows.append(row)
        continue
    date_str = cells[0]
    try:
        d = datetime.strptime(date_str, "%Y-%m-%d").date()
    except ValueError:
        new_rows.append(row)
        continue

    if d >= CUTOFF:
        new_rows.append(row)
    else:
        iso_year, iso_week, _ = d.isocalendar()
        week_key = f"{iso_year}-W{iso_week:02d}"
        # Extract diary link (last cell)
        diary_link = cells[-1]
        session = cells[1]
        summary = cells[2]
        # Take first 60 chars of summary
        summary_short = re.sub(r"\*\*", "", summary)[:60]
        old_rows_by_week[week_key].append({
            "date": date_str,
            "session": session,
            "diary": diary_link,
            "summary": summary_short,
        })

# Build digest rows for each compressed week
digest_rows = []
for week in sorted(old_rows_by_week.keys()):
    entries = old_rows_by_week[week]
    titles = " · ".join(f"{e['date'][5:]}{e['session']}: {e['summary'][:30]}" for e in entries[:8])
    if len(entries) > 8:
        titles += f" · +{len(entries) - 8} more"
    diaries = " ".join(e["diary"] for e in entries[:5])
    digest_rows.append(
        f"| {week}     | digest   | **{len(entries)} sessions** {titles} | (compressed) | {diaries} |"
    )

# Reassemble: header + digest_rows + new_rows
new_table = header + digest_rows + new_rows
new_lines = lines[:table_start] + new_table + lines[table_end:]

print(f"📊 Compression summary:")
print(f"   Total rows in table:        {len(table_rows)}")
print(f"   Recent rows (kept):         {len(new_rows)}")
print(f"   Compressed weeks:           {len(old_rows_by_week)}")
print(f"   Old rows (compressed):      {sum(len(v) for v in old_rows_by_week.values())}")
print(f"   New row count:              {len(digest_rows) + len(new_rows)}")
print(f"   Line count: {len(lines)} → {len(new_lines)}")
print()

if DRY_RUN:
    print("🔍 DRY RUN — no changes written")
    print()
    print("Would compress these weeks:")
    for week in sorted(old_rows_by_week.keys()):
        print(f"  {week}: {len(old_rows_by_week[week])} sessions")
else:
    MEMORY.write_text("\n".join(new_lines) + "\n")
    print(f"✅ Wrote {MEMORY}")
    print(f"   Original entries are preserved in {MEMORY.parent}/memory/ (this only compresses the index)")
PYEOF
