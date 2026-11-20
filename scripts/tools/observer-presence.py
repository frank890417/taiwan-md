#!/usr/bin/env python3
"""
observer-presence.py — 觀察者在場 / 缺席量測儀器（缺席協議 presence signal）

per reports/fortnight-deep-review-2026-09-05.md §4.2 C（哲宇 2026-09-05 拍板選 A）：
自主權邊界的設計假設哲宇在場——他不在場的兩週證明了同一套邊界只剩維護能力。
「缺席協議」把「哲宇不在」變成一個系統知道、有預設行為的狀態，本工具是它的
量測核心：連續 7 天無 in-session 痕跡 → ABSENT，交給 WEEKLY-REPORT-PIPELINE
Stage 2.7 桶 3 與 OBSERVER-QUEUE 執行對應規則。

兩個訊號，任一命中即算在場（取兩者最新日期）：

  訊號 1 — memory 檔名 handle 非 routine handle
    docs/semiont/memory/YYYY-MM-DD-HHMMSS-{handle}.md，handle 不在 ROUTINE.md
    §核心 routine 排程表機械解析出的 taskId 集合裡、也不是 `twmd-` 前綴。

  訊號 2 — git log 裡 mailmap 後作者為 Che-Yu Wu 的非例行 commit
    subject 不以 🧬 開頭（routine / semiont 自動化一律有這個水印），也不是
    `Merge pull request` / `Merge branch`（PR 收割不算哲宇本人動手）。
    用 `%aN`（mailmap 解析後的作者名），不是 `--author`（不吃 mailmap，會漏
    frank890417@gmail.com 這個舊 identity 的別名合併）。

缺席天數 = 今天 − max(兩訊號最新日期)。≥ threshold_days（7）= ABSENT。

routine handle 清單機械解析自 ROUTINE.md，不寫死——新增 routine 或 taskId
改名不需要同步改這支工具。ROUTINE.md 註 ¹：`twmd-maintainer-am` 是
`twmd-maintainer-daily` 的簽名別名（scheduled-tasks 不支援 taskId 改名），
額外收進集合；`twmd-` 前綴本身已是 catch-all，兩者疊加是刻意的雙保險
（未來若排程表格式改到解析失敗，至少前綴判斷還在）。

fail-loud：讀不到 ROUTINE.md、解析不到任何 taskId、或 memory/ 目錄不存在
→ exit 2 並印原因，不靜默回報「一切正常」。

用法：
  python3 scripts/tools/observer-presence.py                  # 人讀一行
  python3 scripts/tools/observer-presence.py --json           # JSON
  python3 scripts/tools/observer-presence.py --since-days 90  # 放寬 git log 掃描範圍
"""
import argparse
import json
import re
import subprocess
import sys
from datetime import date, timedelta
from pathlib import Path

# Windows cp950 console 強制 UTF-8（不影響 Linux/macOS）
if sys.stdout.encoding and sys.stdout.encoding.lower() not in ("utf-8", "utf8"):
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")

REPO = Path(__file__).resolve().parents[2]
ROUTINE_MD = REPO / "docs" / "semiont" / "ROUTINE.md"
MEMORY_DIR = REPO / "docs" / "semiont" / "memory"

THRESHOLD_DAYS = 7
DEFAULT_SINCE_DAYS = 60

# ROUTINE.md 註 ¹：taskId 仍是 twmd-maintainer-daily，commit 標記與 memory handle
# 一律簽 twmd-maintainer-am；已是 twmd- 前綴 catch-all 的子集，這裡明列只為對照
# 註 ¹ 的說法，不是唯一防線。
#
# semiont-heartbeat：哲宇那台 mac 的 Claude Desktop 排程任務（6 小時一次跑完整
# 心跳），不在 ROUTINE.md 的 twmd- 排程表裡，也沒有 twmd- 前綴。2026-09-17 三輪
# 心跳各留一個 memory 檔，本工具把它讀成「哲宇在場（0 天前）」——一條排程器起的
# session 被當成真人，缺席協議的七天時鐘就永遠歸零（REFLEXES #82 proxy signal）。
EXPLICIT_ALIASES = {"twmd-maintainer-am", "semiont-heartbeat"}

FILE_HANDLE_RE = re.compile(r"^(20\d\d-\d\d-\d\d)-\d{6}-(.+)\.md$")
TABLE_TASKID_RE = re.compile(r"^\|\s*`(twmd-[A-Za-z0-9-]+)`")
MERGE_RE = re.compile(r"^Merge (pull request|branch)\b")


def fail(msg):
    print(f"⚠️ observer-presence: {msg}", file=sys.stderr)
    sys.exit(2)


def load_routine_handles():
    """機械解析 ROUTINE.md『## 核心 routine 排程表』區段（含已退休子表）的
    taskId 欄——只認 `| \\`twmd-xxx\\` |` 這個既有格式，不寫死清單。"""
    if not ROUTINE_MD.exists():
        fail(f"讀不到 {ROUTINE_MD.relative_to(REPO)}")
    lines = ROUTINE_MD.read_text(encoding="utf-8").split("\n")
    start = next(
        (i for i, l in enumerate(lines) if l.startswith("## ") and "核心 routine 排程表" in l),
        None,
    )
    if start is None:
        fail("ROUTINE.md 找不到『## 核心 routine 排程表』錨點——標題被改名或搬走？")
    end = next((j for j in range(start + 1, len(lines)) if lines[j].startswith("## ")), len(lines))
    handles = set()
    for l in lines[start:end]:
        m = TABLE_TASKID_RE.match(l.strip())
        if m:
            handles.add(m.group(1))
    if not handles:
        fail("ROUTINE.md 排程表區段解析到 0 個 taskId——表格格式是否改變？")
    return handles | EXPLICIT_ALIASES


def is_routine_handle(handle, routine_handles):
    return handle.startswith("twmd-") or handle in routine_handles


def signal_memory(routine_handles):
    """訊號 1：memory 檔名 handle 非 routine handle 裡最新的一筆。"""
    if not MEMORY_DIR.is_dir():
        fail(f"讀不到 {MEMORY_DIR.relative_to(REPO)} 目錄")
    best_date, best_handle = None, None
    for p in MEMORY_DIR.glob("*.md"):
        m = FILE_HANDLE_RE.match(p.name)
        if not m:
            continue
        d, handle = m.group(1), m.group(2)
        if is_routine_handle(handle, routine_handles):
            continue
        if best_date is None or d > best_date:
            best_date, best_handle = d, handle
    return best_date, best_handle


def signal_git(since_days):
    """訊號 2：git log 裡 mailmap 作者 Che-Yu Wu、非 🧬 開頭、非 merge 的最新一筆。"""
    since = (date.today() - timedelta(days=since_days)).isoformat()
    try:
        r = subprocess.run(
            [
                "git", "log", f"--since={since}", "--date=format:%Y-%m-%d",
                "--pretty=format:%h\x1f%aN\x1f%ad\x1f%s",
            ],
            cwd=REPO, capture_output=True, text=True, encoding="utf-8", errors="replace", timeout=30, check=True,
        )
    except Exception as e:  # noqa: BLE001 — git 不可用要現形，不能靜默回報「無訊號」
        fail(f"git log 執行失敗：{e}")
        return None, None, None  # pragma: no cover — fail() 已 exit，這行只安撫 linter
    best_date, best_hash, best_subject = None, None, None
    for line in r.stdout.split("\n"):
        if not line.strip():
            continue
        parts = line.split("\x1f")
        if len(parts) != 4:
            continue
        h, author, d, subject = parts
        if author != "Che-Yu Wu":
            continue
        if subject.startswith("🧬"):
            continue
        if MERGE_RE.match(subject):
            continue
        if best_date is None or d > best_date:
            best_date, best_hash, best_subject = d, h, subject
    return best_date, best_hash, best_subject


def truncate(s, n=32):
    return s if len(s) <= n else s[: n - 1] + "…"


def build(since_days):
    routine_handles = load_routine_handles()
    mem_date, mem_handle = signal_memory(routine_handles)
    git_date, git_hash, git_subject = signal_git(since_days)

    candidates = []
    if mem_date:
        candidates.append((mem_date, f"memory handle {mem_handle}"))
    if git_date:
        candidates.append((git_date, f"git commit {git_hash} {truncate(git_subject)}"))

    today = date.today()
    if candidates:
        last_date, signal_desc = max(candidates, key=lambda t: t[0])
        days_absent = (today - date.fromisoformat(last_date)).days
    else:
        last_date, signal_desc, days_absent = (
            None,
            f"無訊號（git 掃描範圍 {since_days} 天內、memory 全歷史皆無非 routine 痕跡）",
            None,
        )

    mode = "ABSENT" if days_absent is None or days_absent >= THRESHOLD_DAYS else "present"

    return {
        "last_present_date": last_date,
        "days_absent": days_absent,
        "mode": mode,
        "signal": signal_desc,
        "threshold_days": THRESHOLD_DAYS,
    }


def render_human(result):
    mode, last_date, days_absent, signal_desc = (
        result["mode"], result["last_present_date"], result["days_absent"], result["signal"],
    )
    if mode == "present":
        return f"👤 observer | 最後在場 {last_date}（{days_absent} 天前，訊號：{signal_desc}）· mode=present"
    suffix = "缺席協議生效：到期預設必執行、🔒閾值類可代理、四紅線不動"
    if last_date is None:
        return f"👤 observer | mode=ABSENT（無法判定最後在場日）· {signal_desc} · {suffix}"
    return (
        f"👤 observer | 最後在場 {last_date}（{days_absent} 天前，訊號：{signal_desc}）"
        f"· mode=ABSENT（{days_absent} 天）· {suffix}"
    )


def main():
    ap = argparse.ArgumentParser(description="觀察者在場/缺席量測（缺席協議 presence signal）")
    ap.add_argument("--json", action="store_true", help="輸出 JSON 而非人讀一行")
    ap.add_argument(
        "--since-days", type=int, default=DEFAULT_SINCE_DAYS,
        help=f"git log 掃描範圍天數（預設 {DEFAULT_SINCE_DAYS}）",
    )
    args = ap.parse_args()

    result = build(args.since_days)
    if args.json:
        print(json.dumps(result, ensure_ascii=False, indent=2))
    else:
        print(render_human(result))
    return 0


if __name__ == "__main__":
    sys.exit(main())
