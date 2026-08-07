#!/usr/bin/env python3
"""
memory-index-lint.py — MEMORY.md §心跳日誌 index row 150 字 hard gate 檢查

MEMORY-PIPELINE §Index row 寫法 規定「摘要欄 + 教訓欄合計 ≤ 150 字」，但 husky
pre-commit 只驗 frontmatter、不驗 index row 長度。2026-06-19 distill 收官時手寫的
index row 估三次長度都超標（138→189→286 字），是臨時加的 len() check 抓到、不是
husky——這把尺缺自動化。本工具補上（REFLEXES #69：self-report 的長度估算也需要外部尺）。

只 hard-fail「最新一列」（剛寫的才 enforce）；歷史層超標只 warn 不回頭改
（per MANIFESTO §時間是結構修補協議）。

「最新一列」的判定不寫死方向：MEMORY 索引新在下、DIARY 索引新在上，v1.0 假設
rows[-1] 必為最新，--diary 從出廠起驗的其實是最舊列（2026-07-10 elections finale
LESSONS index-lint-validates-wrong-row-end；2026-07-11 dna-checkup 抓到 BECOME §1.3
tail -20 同病並一起修）。v1.1 起比較首末列日期自適應方向，量之前先看檔案自己的慣例。

用途：memory 收官 commit 前跑 `memory-index-lint.py`；`--diary` 驗 DIARY.md 最新列
（標題欄 ≤60 + 核心思考欄 ≤150，per DIARY-PIPELINE §Index row。2026-07-05 dna-audit
S5 殼核不對稱修補：memory 有尺 diary 沒有，是 DIARY.md 274KB 的根因）。
已 wire 進 husky pre-commit（staged 含 MEMORY.md / DIARY.md 時觸發）。
exit 1 = 最新列超標。對應 MEMORY-PIPELINE §Index row 寫法。
"""
import re
import sys
from pathlib import Path

# Windows cp950 console 強制 UTF-8（不影響 Linux/macOS）
if sys.stdout.encoding and sys.stdout.encoding.lower() not in ("utf-8", "utf8"):
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")

REPO = Path(__file__).resolve().parents[2]
DEFAULT = REPO / "docs/semiont/MEMORY.md"
DIARY = REPO / "docs/semiont/DIARY.md"
GATE = 150
TITLE_GATE = 60
DATE_RE = re.compile(r"^\s*20\d\d-\d\d-\d\d\s*$")


def index_rows(lines, diary=False):
    """回傳 index rows。row 格式：| date | session/handle | 摘要/標題 | 教訓/核心思考 | [→](link) |
    memory 模式：(line_no, session, 摘要+教訓字數, date)。diary 模式：(line_no, handle, 標題字數, 核心思考字數, date)。"""
    rows = []
    for i, l in enumerate(lines):
        parts = l.split("|")
        # 前後空 cell → ['', date, session, summary, lesson, link, ''] = 7 parts
        if len(parts) < 7 or not DATE_RE.match(parts[1]):
            continue
        date = parts[1].strip()
        session = parts[2].strip()
        if diary:
            rows.append((i + 1, session, len(parts[3].strip()), len(parts[4].strip()), date))
        else:
            n = len(parts[3].strip()) + len(parts[4].strip())
            rows.append((i + 1, session, n, date))
    return rows


def newest_row(rows):
    """方向自適應取最新列：首列日期 > 末列日期 → 新在上（DIARY 慣例）取 rows[0]；
    否則新在下（MEMORY 慣例）取 rows[-1]。同日內排序跟隨檔案整體方向，端點列即最新。"""
    if len(rows) == 1 or rows[0][-1] <= rows[-1][-1]:
        return rows[-1]
    return rows[0]


def lint_diary():
    lines = DIARY.read_text(encoding="utf-8").split("\n")
    rows = index_rows(lines, diary=True)
    if not rows:
        print("（DIARY.md 找不到 index row — 檔案結構異常？）", file=sys.stderr)
        return 0
    ln, handle, tlen, clen, _ = newest_row(rows)
    hist_over = sum(1 for r in rows if r[0] != ln and (r[2] > TITLE_GATE or r[3] > GATE))
    if tlen <= TITLE_GATE and clen <= GATE:
        note = f"（歷史層 {hist_over} 列超標 = gate 儀器化前舊風格，不回頭改）" if hist_over else ""
        print(f"✅ DIARY 最新 index row L{ln} 標題 {tlen}≤{TITLE_GATE} / 核心思考 {clen}≤{GATE}{note}")
        return 0
    print(f"❌ DIARY 最新 index row L{ln}「{handle[:20]}」超標：標題 {tlen}（gate {TITLE_GATE}）/ 核心思考 {clen}（gate {GATE}）")
    print("   索引是 navigation aid，細節留 diary file。重寫後再 commit。")
    if hist_over:
        print(f"   （另有 {hist_over} 歷史層超標列，非最新，不回頭改）")
    return 1


def main():
    argv = sys.argv[1:]
    if "--diary" in argv:
        return lint_diary()
    path = argv[0] if argv else str(DEFAULT)
    lines = Path(path).read_text(encoding="utf-8").split("\n")
    rows = index_rows(lines)
    if not rows:
        print("（找不到 index row — 檔案結構異常？）", file=sys.stderr)
        return 0

    newest = newest_row(rows)
    newest_ln = newest[0]
    over = [(ln, s, n) for ln, s, n, _ in rows if n > GATE]
    newest_over = next((r for r in over if r[0] == newest_ln), None)

    hist_over = len(over) - (1 if newest_over else 0)
    # handoff 寫入端 warn（2026-07-11 wake-evolution：wake-context 驗「撈得到」，
    # 這裡補「有沒有寫」——最新 memory raw 檔缺 Handoff 段就提醒，warn-only 不擋 commit）
    mem_dir = REPO / "docs/semiont/memory"
    latest = max((p for p in mem_dir.glob("20*.md")), key=lambda p: p.name, default=None)
    if latest and "## Handoff" not in latest.read_text(encoding="utf-8") and "Handoff 三態" not in latest.read_text(encoding="utf-8"):
        print(f"⚠️ 最新 memory（{latest.name}）沒有 Handoff 段——下個甦醒的 walk-back 會撲空，收官漏了嗎？（warn-only）")

    if not newest_over:
        # pass path：只 enforce 最新列，歷史超標一行帶過（不回頭改）
        note = f"（歷史層 {hist_over} 列超標 = 2026-05-12 gate 前舊風格，不回頭改）" if hist_over else ""
        print(f"✅ 最新 index row L{newest_ln} ≤ {GATE} 字{note}")
        return 0

    print(f"❌ 最新 index row L{newest_ln}「{newest[1][:28]}」超標 {newest_over[2]} 字（gate {GATE}）")
    print(f"   摘要 ≤100 / 教訓 ≤50，細節留 memory file。重寫後再 commit。")
    if hist_over:
        print(f"   （另有 {hist_over} 歷史層超標列，非最新，不回頭改）")
    return 1


if __name__ == "__main__":
    sys.exit(main())
