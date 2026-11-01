#!/usr/bin/env python3
"""heading-space-check.py — ATX 標題 `#` 後面缺空白的結構檢查（唯讀）。

## 為什麼需要這一支

Markdown 的 ATX 標題規定 `#` 後面要有空白才算標題。寫成 `##延伸阅读`
（`#` 直接接文字）時 `marked` 把整行當**一般段落**，渲染出來是
`<p>##延伸阅读</p>`：

    marked.lexer('##延伸阅读\\n')[0].type   → 'paragraph'
    marked.lexer('## 더 읽을거리\\n')[0].type → 'heading'

後果有三層，而三層都不會讓任何現有閘門變紅：

1. **目錄抓不到這一節**。`src/components/TableOfContents.astro` 的
   `extractHeadings()` 是從**已渲染的 HTML** 撈 `<h2>`／`<h3>`，壞掉的標題
   在 HTML 裡是 `<p>`，所以整節從目錄消失。
2. **版面上是一段突兀的原始 markdown**：讀者看到字面的 `##` 加文字。
3. **錨點不存在**，任何指向該節的內部連結都會落空。

## 為什麼現有的檢查器都看不到它

全庫 34 條 `article-health` check 沒有一條在驗**來源 Markdown 的標題結構**：
`test-frontmatter.mjs` 只看 frontmatter；`article-heading-id.test.mjs` 驗的是
**已渲染的** h2/h3 的 id 產生規則（它拿到的輸入已經是 heading，壞掉的那行
根本沒進到它面前）；`format-structure` 管的是章節順序與必備段落，不管 `#`
後面那個空白。所以一個壞掉的標題可以一路走到 `dist/` 沒人攔。

這是 REFLEXES #82 的形狀：**「有一支在驗標題 id」不等於「有人在守標題結構」**。

## 病史

- **2026-10-20** 投稿者 tboydar 審 PR #1880 時順手掃到，開 issue #1882：
  全庫 77 檔／80 行，其中 ko 佔 68 行。抓到它的是人眼，不是儀器。
- **2026-10-20** PR #1880（dreamline2）把 `##延伸阅读` 改成 `## 더 읽을거리`，
  同時修掉缺空白與簡體殘留——一個檔案修好，另外 75 個還在。
- **2026-10-21** `twmd-maintainer-daily` 修掉 10 檔／13 行純缺空白的，造本檔。

## 兩個族群刻意分開數

缺空白的行分兩種，處置完全不同，所以本檔分開報（REFLEXES #38 不混維度）：

- **`plain`**：單純少一個空白的真標題（`##147 Hari Hai Kun`、
  `###《Richard》nama itu…`）。補一個空白就對了，零判斷。
- **`zh-residue`**：`延伸阅读` 家族。它疊了三個缺陷——缺空白、**簡體字形**、
  **沒翻成目標語言**。只補空白會把一段簡體中文正式升格成標題，讓它更顯眼而
  不是更正確，所以這族不能用補空白了事；它跟 ko/ja 正文簡體殘留
  （OBSERVER-QUEUE #112）是同一個家族，修法要一起決定。

## 本檔不是閘門

唯讀、永遠 exit 0（`--strict` 才回 1）。新增硬閘門屬 BECOME 鐵律 10
（quality gate 數值／新閘門需觀察者拍板），所以本檔只負責把數字量出來、
讓那一格有人看得見，升閘門的決定留在佇列裡。
"""

from __future__ import annotations

import argparse
import pathlib
import re
import sys

# `#` 之後直接接非空白、非 `#` 的字元 = 缺空白的 ATX 標題。
# 排掉 `#` 本身（`####` 這種只有井字號的行不是標題也不是病）。
HEADING_NO_SPACE = re.compile(r"^(#{1,6})([^\s#].*)$")

# 這一族疊了簡體字形與未翻譯，不能用「補一個空白」了事。
ZH_RESIDUE_MARKERS = ("延伸阅读", "延伸閱讀")

REPO = pathlib.Path(__file__).resolve().parents[2]


def _display(path: pathlib.Path) -> str:
    """repo 內顯示相對路徑，repo 外（fixture / 任意 --root）顯示絕對路徑。

    寫死 `relative_to(REPO)` 會讓 --root 指到 repo 外面時直接 ValueError 炸掉，
    而 fixture 正控制恰好都在 repo 外——尺自己在正控制那一步壞掉，
    等於沒有正控制（REFLEXES #99 尺先驗再用）。
    """
    try:
        return str(path.relative_to(REPO))
    except ValueError:
        return str(path)


def _body_lines(text: str) -> tuple[list[str], int]:
    """回傳 (全部行, 正文起始 index)。frontmatter 不掃。"""
    lines = text.split("\n")
    if lines and lines[0].strip() == "---":
        for i in range(1, len(lines)):
            if lines[i].strip() == "---":
                return lines, i + 1
    return lines, 0


def scan(root: pathlib.Path) -> list[dict]:
    findings: list[dict] = []
    for path in sorted(root.rglob("*.md")):
        try:
            text = path.read_text(encoding="utf-8")
        except (OSError, UnicodeDecodeError):
            # 讀不到就說讀不到，不當成沒事（REFLEXES #85）
            findings.append(
                {"path": _display(path), "line": 0,
                 "kind": "unreadable", "raw": "", "fixed": ""}
            )
            continue
        lines, start = _body_lines(text)
        in_fence = False
        for i in range(start, len(lines)):
            stripped = lines[i].lstrip()
            if stripped.startswith("```") or stripped.startswith("~~~"):
                in_fence = not in_fence
                continue
            if in_fence:
                # fence 裡的 `#` 是註解或樣例，不是標題
                continue
            m = HEADING_NO_SPACE.match(lines[i])
            if not m:
                continue
            body = m.group(2)
            kind = (
                "zh-residue"
                if any(mk in body for mk in ZH_RESIDUE_MARKERS)
                else "plain"
            )
            findings.append({
                "path": _display(path),
                "line": i + 1,
                "kind": kind,
                "raw": lines[i].strip(),
                "fixed": f"{m.group(1)} {body}".strip(),
            })
    return findings


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--root", default="knowledge", help="掃描根目錄")
    ap.add_argument("--kind", choices=["plain", "zh-residue", "all"],
                    default="all", help="只看某一族")
    ap.add_argument("--strict", action="store_true",
                    help="有命中就 exit 1（預設永遠 exit 0，本檔不是閘門）")
    ap.add_argument("--quiet", action="store_true", help="只印總結")
    args = ap.parse_args()

    root = (REPO / args.root) if not pathlib.Path(args.root).is_absolute() else pathlib.Path(args.root)
    if not root.exists():
        print(f"⛔ 掃不到 {root} — 這不是通過，是沒量到", file=sys.stderr)
        return 2

    findings = scan(root)
    shown = [f for f in findings
             if args.kind == "all" or f["kind"] == args.kind]

    print("════════ ATX 標題缺空白檢查（唯讀） ════════")
    if not args.quiet:
        for f in shown:
            if f["kind"] == "unreadable":
                print(f"  ⚠️  {f['path']}  讀不到，沒量到")
                continue
            tag = "簡體殘留" if f["kind"] == "zh-residue" else "缺空白"
            print(f"  {tag}  {f['path']}:{f['line']}")
            print(f"      {f['raw'][:72]}")
            if f["kind"] == "plain":
                print(f"   →  {f['fixed'][:72]}")

    plain = [f for f in findings if f["kind"] == "plain"]
    resid = [f for f in findings if f["kind"] == "zh-residue"]
    unread = [f for f in findings if f["kind"] == "unreadable"]
    files = len({f["path"] for f in findings if f["kind"] != "unreadable"})

    print("────────────────────────────────────────────")
    print(f"  {files} 檔 / {len(plain) + len(resid)} 行")
    print(f"  plain（補一個空白就對了，零判斷）     : {len(plain)}")
    print(f"  zh-residue（延伸阅读族，簡體＋未翻譯）: {len(resid)}")
    if unread:
        print(f"  ⚠️ 讀不到 {len(unread)} 檔——沒量到，不算綠")
    if not plain and not resid:
        print("  ✅ 沒有缺空白的標題")
    else:
        print("  ℹ️  本檔是唯讀尺，不擋任何東西。plain 族可直接補空白；")
        print("     zh-residue 族要連簡體與未翻譯一起決定（OBSERVER-QUEUE #112 同家族）。")

    if args.strict and (plain or resid or unread):
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
