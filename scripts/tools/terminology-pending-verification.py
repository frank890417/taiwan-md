#!/usr/bin/env python3
"""terminology-pending-verification.py — 詞庫裡「查證還沒做完」的那幾條。

## 為什麼存在

`data/terminology/*.yaml` 的 `notes` 常帶「⚠️ 查證分歧誠信標註」。那段文字有兩種
用途，而它們在字面上長得一模一樣：

1. **查證做完了**，標註永久記錄當初爭議與結論（「查證結論：…」）——多數是這種
2. **查證還沒做**，標註是一張欠條，通常還對著一位在 issue 裡等回覆的讀者

拿 `grep 查證分歧誠信標註` 去找第二種，會把第一種一起撈出來（2026-09-13 實測
7 命中只有 1 條真的還欠著，6/7 假陽性）。所以第二種需要自己的記號，不能借用
第一種的那個——[REFLEXES #85](../../docs/semiont/REFLEXES.md)「『不知道』需要自己
的符號」。本工具只認結構化欄位 `pending_verification`，一個字都不從散文推論。

## 誕生

issue #1609：讀者蘇洛 2026-08-23 以白色恐怖受難者郭淑姿的日記挑戰 `無語` 的斷代
主張。維護者兩輪（08-28／08-31）都誠實處理並把出處定位到《郭淑姿日記》第一、二冊
（國家人權博物館出版），兩輪都寫「查證工作排進用語趨勢 routine」。而
`TERMINOLOGY-TRENDS-PIPELINE` 的七個 stage 全部在講**新詞入庫**，沒有任何一步會回頭
讀既有條目的欠條——承諾寫在 yaml 註解與 GitHub 留言裡，被指名的執行者沒有對應的
步驟。這是 §神經迴路「承諾的物理位置決定它會不會被實現／memory 是自律，canonical
SOP 才是閘門」在詞庫這一層的 instance。

## 欄位長相

    pending_verification:
      question: 一句話說還沒定的是什麼
      needs: 要做什麼才分得出來（調閱哪一本、搜哪個庫）
      issue: 'https://github.com/frank890417/taiwan-md/issues/1609'
      opened: '2026-08-28'

## 殘餘盲點（明寫）

只有散文標註、沒有這個欄位的條目，本工具**看不到**。兩層要靠
`TERMINOLOGY-TRENDS-PIPELINE` Stage 4 的規則維持同步：誠信標註留下真正未決的問題時
必須同時補這個欄位。工具不會替那條規則把關，所以這裡不假裝它會。

## 用法

    python3 scripts/tools/terminology-pending-verification.py
    python3 scripts/tools/terminology-pending-verification.py --json
    python3 scripts/tools/terminology-pending-verification.py --older-than 30

Exit code：0 = 沒有欠條，或有但都還在 `--older-than` 天數內；
1 = 有欠條超過 `--older-than` 天（預設 0，所以預設只要有欠條就 exit 1）；
3 = 工具本身壞掉（讀不到目錄 / yaml 壞檔）。「讀不到」不是綠燈。
"""

from __future__ import annotations

import argparse
import json
import sys
from datetime import date, datetime
from pathlib import Path

import yaml

REPO_ROOT = Path(__file__).resolve().parent.parent.parent
TERM_DIR = REPO_ROOT / "data" / "terminology"
FIELD = "pending_verification"


def fail_loud(message: str) -> None:
    print(f"❌ terminology-pending-verification: {message}", file=sys.stderr)
    sys.exit(3)


def parse_opened(raw) -> date | None:
    """`opened` 可能是 YAML 自動轉成的 date，也可能是字串。兩種都接，壞的回 None。"""
    if isinstance(raw, date) and not isinstance(raw, datetime):
        return raw
    if isinstance(raw, datetime):
        return raw.date()
    if isinstance(raw, str):
        try:
            return date.fromisoformat(raw.strip())
        except ValueError:
            return None
    return None


def collect(term_dir: Path, today: date) -> list[dict]:
    if not term_dir.is_dir():
        fail_loud(f"讀不到 {term_dir}")

    items: list[dict] = []
    for path in sorted(term_dir.glob("*.yaml")):
        try:
            parsed = yaml.safe_load(path.read_text(encoding="utf-8"))
        except (OSError, yaml.YAMLError) as exc:
            fail_loud(f"{path.name} 讀取／parse 失敗：{exc}")
        if not isinstance(parsed, dict):
            continue
        block = parsed.get(FIELD)
        if not block:
            continue
        if not isinstance(block, dict):
            fail_loud(f"{path.name} 的 {FIELD} 不是對應表（實際是 {type(block).__name__}）")

        opened = parse_opened(block.get("opened"))
        items.append(
            {
                "file": path.name,
                "id": parsed.get("id") or path.stem,
                "display_taiwan": (parsed.get("display") or {}).get("taiwan"),
                "display_china": (parsed.get("display") or {}).get("china"),
                "question": block.get("question"),
                "needs": block.get("needs"),
                "issue": block.get("issue"),
                "opened": opened.isoformat() if opened else None,
                "days_open": (today - opened).days if opened else None,
            }
        )

    # 久的排前面；沒有 opened 的排最後（但仍然列出，不靜默丟掉）
    items.sort(key=lambda i: (i["days_open"] is None, -(i["days_open"] or 0)))
    return items


def human_report(items: list[dict], older_than: int, today: date) -> str:
    if not items:
        return "✅ 詞庫沒有掛著的查證欠條（無 pending_verification 欄位）"

    lines = [f"📌 詞庫查證欠條 {len(items)} 條（{today.isoformat()}）", ""]
    for i in items:
        age = f"{i['days_open']} 天" if i["days_open"] is not None else "未寫 opened"
        lines.append(f"  {i['id']}（{i['file']}）— 掛著 {age}")
        if i["display_taiwan"] or i["display_china"]:
            lines.append(f"      台灣：{i['display_taiwan']}　中國：{i['display_china']}")
        if i["question"]:
            lines.append(f"      未決：{i['question']}")
        if i["needs"]:
            lines.append(f"      要做：{i['needs']}")
        if i["issue"]:
            lines.append(f"      讀者在等：{i['issue']}")
        lines.append("")
    lines.append(
        "每輪 TERMINOLOGY-TRENDS 必須逐條寫出處置（查了／查不到／要調閱實體書），"
        "「這輪沒碰」也要寫成一句話，不能靜默跳過。"
    )
    lines.append(
        "只有散文標註、沒有 pending_verification 欄位的條目本工具看不到；"
        "兩層同步靠 Stage 4 的規則，不靠這支工具。"
    )
    return "\n".join(lines)


def main() -> None:
    ap = argparse.ArgumentParser(description="列出詞庫裡還沒做完的查證欠條")
    ap.add_argument("--json", action="store_true", help="輸出 JSON")
    ap.add_argument(
        "--older-than",
        type=int,
        default=0,
        help="只有掛著超過 N 天的欠條才讓 exit code 變 1（預設 0：有欠條就 1）",
    )
    ap.add_argument("--today", type=str, default=None, help="ISO 日期，給測試與回溯用")
    args = ap.parse_args()

    if args.today:
        try:
            today = date.fromisoformat(args.today)
        except ValueError:
            fail_loud(f"--today 不是 ISO 日期：{args.today}")
    else:
        today = date.today()

    items = collect(TERM_DIR, today)

    if args.json:
        print(json.dumps({"checked_on": today.isoformat(), "pending": items}, ensure_ascii=False, indent=2))
    else:
        print(human_report(items, args.older_than, today))

    overdue = [i for i in items if (i["days_open"] or 0) >= args.older_than]
    sys.exit(1 if overdue else 0)


if __name__ == "__main__":
    main()
