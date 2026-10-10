#!/usr/bin/env python3
"""
observer-queue-lint.py — OBSERVER-QUEUE.md §待決 每一列都要帶預設選項與 default-action

OBSERVER-QUEUE §規則寫「每項必填：問題一句話、預設選項、不決策的代價、default-action
日期」，但沒有任何機器在驗。2026-09-18 heartbeat 讀佇列時發現 #60〜#66 七列只有
三個欄位——決策欄把整段分析塞完就結束，沒有預設選項、沒有代價、沒有 default-action。
哲宇看到的是一整頁分析而不是「讀兩行選一個」（§神經迴路「Scope 化未決定事項」），
而 #64 那條其實是單檔勘誤、在自主權內，因為缺 default-action 欄就跟十七條 🔒 項目
排在一起躺了八天，直到有人逐列讀。

本工具做的事很窄：對 §待決 表格每一列數欄位，欄數不足或「預設選項」「default-action」
兩欄為空就報。到期判斷已由 generate-dashboard-alerts.mjs 管，這裡不重做。

2026-10-11 self-evolve 加兩道（源 REFLEXES #68 共享計數器、distill-weekly 10-11 交接）：
- **編號唯一**：09-17 本機與 origin 各自從下一個空號往下編，同一個 #56 兩邊指兩件事，
  三十三份未推送的交接文引用的名字到了觀察者那側會解析成別的決策。§待決 內重號報錯；
  跟 §已決 開頭的 `#N` 撞號另報一行（§已決 允許同號多列，是部分拍板，不算錯）。
  順手印出下一個可用編號，寫新列的人照抄就不會撞。
- **列要以 `| ` 起頭**：09-13 #50 少了開頭的分隔符，解析器整列看不見，一個到期可執行
  的預設消失一週。§待決 段內帶數字與多個 `|` 卻不是表格列的行，報出來。

黃燈起步：預設只 WARN（exit 0）；`--strict` 才 exit 1。接進 husky 時先 WARN 收數據，
再決定升 HARD（CONSCIOUSNESS §進化方向「儀器化黃燈路線」）。
"""
import argparse
import re
import sys
from pathlib import Path

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ("utf-8", "utf8"):
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")

REPO = Path(__file__).resolve().parents[2]
DEFAULT = REPO / "docs/semiont/OBSERVER-QUEUE.md"
EXPECTED_COLS = 6  # # / 進佇列日 / 決策 / 預設選項 / 不決策的代價 / default-action
PENDING_HEADER = re.compile(r"^##\s+待決\s*$")
NEXT_H2 = re.compile(r"^##\s+")
ROW_ID = re.compile(r"^\|\s*(\d+)\s*\|")


def split_cells(line: str) -> list[str]:
    """把一列 markdown table 拆成欄位。`\\|` 是跳脫的管線，不當分隔。"""
    body = line.strip()
    if body.startswith("|"):
        body = body[1:]
    if body.endswith("|"):
        body = body[:-1]
    cells = re.split(r"(?<!\\)\|", body)
    return [c.strip() for c in cells]


def pending_rows(text: str) -> list[tuple[int, str]]:
    """回傳 §待決 段內、以數字編號開頭的資料列（行號從 1 起）。"""
    rows: list[tuple[int, str]] = []
    inside = False
    for lineno, line in enumerate(text.splitlines(), start=1):
        if PENDING_HEADER.match(line):
            inside = True
            continue
        if inside and NEXT_H2.match(line):
            break
        if inside and ROW_ID.match(line):
            rows.append((lineno, line))
    return rows


DECIDED_HEADER = re.compile(r"^##\s+已決\s*$")
DECIDED_ID = re.compile(r"^\|\s*[0-9-]+\s*\|\s*#(\d+)")
LOOKS_LIKE_ROW = re.compile(r"^\s*[|｜]?\s*\d+\s*[|｜].*\|.*\|")


def section_lines(text: str, header: re.Pattern) -> list[tuple[int, str]]:
    out: list[tuple[int, str]] = []
    inside = False
    for lineno, line in enumerate(text.splitlines(), start=1):
        if header.match(line):
            inside = True
            continue
        if inside and NEXT_H2.match(line):
            break
        if inside:
            out.append((lineno, line))
    return out


def lint_numbering(text: str, rows: list[tuple[int, str]]) -> tuple[list[str], int]:
    """§待決 編號唯一、跟 §已決 撞號提示、壞掉的列。回傳 (問題, 下一個可用編號)。"""
    problems: list[str] = []
    seen: dict[str, int] = {}
    for lineno, line in rows:
        rid = split_cells(line)[0]
        if rid in seen:
            problems.append(f"L{lineno} #{rid}: 編號跟 L{seen[rid]} 重複（REFLEXES #68 共享計數器；改用下一個可用編號）")
        else:
            seen[rid] = lineno
    decided: set[str] = set()
    for _, line in section_lines(text, DECIDED_HEADER):
        m = DECIDED_ID.match(line)
        if m:
            decided.add(m.group(1))
    for rid, lineno in seen.items():
        if rid in decided:
            problems.append(f"L{lineno} #{rid}: §已決 也有 #{rid}——若是同一件事的剩餘部分請在決策欄寫明，若是新事項請換號")
    for lineno, line in section_lines(text, PENDING_HEADER):
        if ROW_ID.match(line):
            continue
        if LOOKS_LIKE_ROW.match(line):
            problems.append(f"L{lineno}: 看起來是一列但不是以 `| ` 起頭，解析器看不見它：{line[:40]}…")
    all_ids = [int(x) for x in seen] + [int(x) for x in decided]
    return problems, (max(all_ids) + 1 if all_ids else 1)


def lint_rows(rows: list[tuple[int, str]]) -> list[str]:
    problems: list[str] = []
    for lineno, line in rows:
        cells = split_cells(line)
        rid = cells[0] if cells else "?"
        if len(cells) < EXPECTED_COLS:
            problems.append(
                f"L{lineno} #{rid}: 只有 {len(cells)} 欄（要 {EXPECTED_COLS}：# / 進佇列日 / 決策 / 預設選項 / 不決策的代價 / default-action）"
            )
            continue
        default_option, _cost, default_action = cells[3], cells[4], cells[5]
        if not default_option:
            problems.append(f"L{lineno} #{rid}: 預設選項欄是空的")
        if not default_action:
            problems.append(f"L{lineno} #{rid}: default-action 欄是空的（填日期、「無」或 🔒紅線／🔒閾值）")
    return problems


def main() -> int:
    ap = argparse.ArgumentParser(description="OBSERVER-QUEUE §待決 列形狀檢查")
    ap.add_argument("path", nargs="?", default=str(DEFAULT))
    ap.add_argument("--strict", action="store_true", help="有問題就 exit 1（預設只 WARN）")
    args = ap.parse_args()

    path = Path(args.path)
    if not path.exists():
        print(f"❌ observer-queue-lint: 找不到 {path}")
        return 2
    rows = pending_rows(path.read_text(encoding="utf-8"))
    if not rows:
        print("⚠️  observer-queue-lint: §待決 段沒解析到任何列（標題改名？）")
        return 2 if args.strict else 0
    text = path.read_text(encoding="utf-8")
    problems = lint_rows(rows)
    num_problems, next_id = lint_numbering(text, rows)
    problems += num_problems
    if not problems:
        print(f"✅ observer-queue-lint: §待決 {len(rows)} 列都帶預設選項與 default-action，編號不重複（下一個可用編號 #{next_id}）")
        return 0
    tag = "❌" if args.strict else "⚠️ "
    print(f"{tag} observer-queue-lint: §待決 {len(rows)} 列中 {len(problems)} 個缺口——沒有預設選項的待決項不是決策，是分析")
    for p in problems:
        print(f"   {p}")
    print(f"   下一個可用編號 #{next_id}")
    return 1 if args.strict else 0


if __name__ == "__main__":
    sys.exit(main())
