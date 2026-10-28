#!/usr/bin/env python3
"""GitHub 渲染式腳註 → Markdown 腳註轉換器。

貢獻者用 GitHub 網頁編輯器貼上「已渲染」的文章時，帶進來的不是 `[^1]` 語法，
而是 GitHub 自己產生的 HTML 錨點：正文 `[1](#user-content-fn-9)`、文末
`1. 來源敘述 [↩](#user-content-fnref-9)`。這在 GitHub 上看起來完全正常，
Astro 卻不認得那些錨點——站上會渲染成一串指向不存在片段的死連結，而
footnote-format / footnote-density 兩道閘門都只看 `[^N]` 語法，看不見它。

轉換規則：
  正文 `[顯示序號](#user-content-fn-M)`            → `[^M]`
  文末 `1. TEXT [↩](#user-content-fnref-M) …`      → `[^M]: TEXT`

TEXT 會再被拆成 canonical 的 `[標題](URL) — 描述`：來源敘述慣用
`作者 ，〈標題〉，《媒體》，日期。[URL](URL)` 這種排法，標題進連結文字，
其餘欄位併成破折號後的描述。拆不出來的就原樣保留，讓 article-health
的 footnote-format 去報，不猜。

用法：
    python3 scripts/tools/gh-footnote-convert.py <file.md> [--apply]

預設 dry-run，只印會改什麼（per 神經迴路「批次修正必須先 dry-run」）。
"""

import argparse
import re
import sys
from pathlib import Path

# 正文引用的四種寫法都要吃（2026-10-28 補）：
#   [1](#user-content-fn-9)            GitHub 複製貼上的原形
#   [^1](#user-content-fn-9)           譯者已改 label、destination 沒換的混合形
#   [1]( #user-content-fn-9)           destination 前夾空白（機翻貼上）
#   [1](\u200a#user-content-fn-9)      destination 前夾隱形字元（ZWSP / HAIR SPACE）
# 後兩種的雜訊會讓舊版 `\(#user-content-fn-…\)` 整條認不出來，於是檔案「看起來」
# 沒有殘留，實際上點下去還是死的。雜訊一律隨連結一起丟掉。
# 注意：`#user-content-fn-` 不會誤吃 `#user-content-fnref-`（後者 fn 後面不是 `-`）。
# 錨點前綴另有壞掉的一種：`#user-int-fnref-2`（`content` 掉字，見 ko/Society/betel-nut
# 的實例）。只認 `content` 的話那顆回跳箭頭會留在原地變成死連結，而且定義編號會
# 被下一個回跳箭頭帶走（`fnref-2-2` → `[^2-2]`）。
_USER_PREFIX = r"#user-(?:content|int)-fn"
REF_RE = re.compile(
    rf"\[(?:\^)?\d+\]\([^)]*{_USER_PREFIX}-([0-9A-Za-z_-]+)[^)]*\)"
)
BACKREF_RE = re.compile(
    rf"\s*\[↩(?:\d+)?\]\([^)]*{_USER_PREFIX}ref-[0-9A-Za-z_-]+[^)]*\)"
)
DEF_RE = re.compile(
    rf"^\s*\d+\.\s+(?P<text>.*?)\s*(?P<backrefs>\[↩(?:\d+)?\]\([^)]*{_USER_PREFIX}ref-(?P<id>[0-9A-Za-z_-]+)[^)]*\).*)$"
)
# 來源敘述慣用排法：作者 ，〈標題〉，《媒體》，日期。[URL](URL)
SOURCE_RE = re.compile(
    r"^(?P<pre>.*?)〈(?P<title>[^〉]+)〉(?P<mid>.*?)\[(?P<url>https?://[^\]]+)\]\((?P=url)\)\s*$"
)
BARE_LINK_RE = re.compile(r"\[(?P<url>https?://[^\]]+)\]\((?P=url)\)\s*$")


def _clean(fragment: str) -> str:
    """把「，《媒體》，2020-05-11。」這類殘段收成乾淨的描述欄位。"""
    text = fragment.replace("《", "").replace("》", "")
    text = re.sub(r"[，,、。\s]+", " ", text).strip()
    return text


def build_definition(fid: str, text: str) -> str:
    """把一條來源敘述組成 `[^id]: [Title](URL) — description`。"""
    match = SOURCE_RE.match(text)
    if match:
        title = match.group("title").strip()
        url = match.group("url").strip()
        desc = " ".join(
            part for part in (_clean(match.group("pre")), _clean(match.group("mid"))) if part
        ).strip()
        if len(desc) < 10:
            # 描述欄位有 ≥10 字的硬性下限，補不出來就用媒體/作者原句撐住語意
            desc = (desc + " " + _clean(match.group("pre"))).strip() or title
        return f"[^{fid}]: [{title}]({url}) — {desc}"

    bare = BARE_LINK_RE.search(text)
    if bare:
        url = bare.group("url")
        title = text[: bare.start()].strip().rstrip("。，,")
        title = title.replace("〈", "").replace("〉", "")
        if title:
            return f"[^{fid}]: [{title}]({url}) — {_clean(title)}"

    # 拆不出結構就原樣搬過去，交給 footnote-format 報，不自己編造欄位
    return f"[^{fid}]: {text}"


def _pick_id(raw: str, body_ids: set[str]) -> str:
    """回跳箭頭的 id 對回正文實際引用的腳註編號。

    GitHub 的多重回跳箭頭長成 `fnref-2`、`fnref-2-2`、`fnref-2-3`（後綴是第幾顆
    回跳，不是腳註編號）。若第一個回跳箭頭壞掉、只剩 `fnref-2-2`，直接拿它當 id
    會生出 `[^2-2]`，而正文引用是 `[^2]`——一條誰也對不上的腳註。以正文用到的
    id 為準：先看原樣，再剝掉一層 `-<數字>` 後綴。
    """
    if raw in body_ids:
        return raw
    stripped = re.sub(r"-\d+$", "", raw)
    if stripped and stripped in body_ids:
        return stripped
    return raw


def convert(source: str) -> tuple[str, int, int]:
    body_ids = set(REF_RE.findall(source))
    refs_converted = 0
    defs_converted = 0

    def _ref(match: re.Match) -> str:
        nonlocal refs_converted
        refs_converted += 1
        return f"[^{match.group(1)}]"

    body = REF_RE.sub(_ref, source)

    out_lines = []
    for line in body.split("\n"):
        match = DEF_RE.match(line)
        if match:
            defs_converted += 1
            text = BACKREF_RE.sub("", match.group("text")).strip()
            out_lines.append(build_definition(_pick_id(match.group("id"), body_ids), text))
        else:
            out_lines.append(BACKREF_RE.sub("", line))

    return "\n".join(out_lines), refs_converted, defs_converted


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("files", nargs="+", type=Path)
    parser.add_argument("--apply", action="store_true", help="真的寫回檔案（預設 dry-run）")
    args = parser.parse_args()

    total_refs = total_defs = touched = 0
    for path in args.files:
        original = path.read_text(encoding="utf-8")
        if not re.search(r"#user-(?:content|int)-fn", original):
            continue
        converted, refs, defs = convert(original)
        if converted == original:
            continue
        touched += 1
        total_refs += refs
        total_defs += defs
        print(f"  {'✓' if args.apply else '·'} {path}: {refs} 處引用 / {defs} 條定義")
        if args.apply:
            path.write_text(converted, encoding="utf-8")

    mode = "APPLY" if args.apply else "DRY-RUN"
    print(f"\n📊 [{mode}] {touched} 檔 / {total_refs} 處引用 / {total_defs} 條定義")
    if not args.apply and touched:
        print("   加 --apply 才會寫回。")
    return 0


if __name__ == "__main__":
    sys.exit(main())
