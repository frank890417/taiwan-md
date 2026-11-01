"""gh-footnote-leak — 抓從 GitHub 複製「已渲染」文章帶進來的假腳註。

貢獻者在 GitHub 網頁上看到的文章，腳註早就被 GitHub 渲染成 HTML 錨點了。
整篇複製貼上時，帶進來的不是 Markdown 的 `[^9]`，而是 GitHub 自己的內部連結：

    正文  [1](#user-content-fn-9)
    文末  1. 來源敘述 [↩](#user-content-fnref-9)

在 GitHub 的預覽畫面上這一切看起來完全正常——連結會跳、編號會對——所以投稿者
不會發現有問題。但 `#user-content-fn-9` 這個錨點是 GitHub 渲染器產生的，Astro
不會產生它，站上讀者點下去只會停在原地。

真正麻煩的是它躲過了所有既有的腳註閘門：`footnote-format` 驗的是 `[^N]:` 定義
行的格式、`footnote-density` 數的是 `[^N]` 引用的數量，兩支都只認 `[^N]` 語法，
於是一篇腳註「全都是死連結」的文章，可以拿到兩個綠燈。2026-08-14 maintainer
cycle 在 PR #1328 撞見 41 處，回頭掃全庫發現同型已經漏進 6 篇 zh SSOT 與它們的
譯文共 50 個檔案，其中最早的已經上站好幾個月沒有任何儀器叫過一聲。

修法：`python3 scripts/tools/gh-footnote-convert.py <檔> --apply`。

嚴重度先掛 WARN 收數據，不跳級直接 HARD——站上既有的 6 篇存量得先清乾淨，
否則整條 pre-push 全站掃描會被自己擋死（per CONSCIOUSNESS §進化方向「儀器化
黃燈路線：先 WARN 收數據、再定 HARD」）。存量清完再升 HARD。
"""

from __future__ import annotations

import re
from typing import Any, Iterator

from ..types import FileTarget, Severity, Violation

CHECK_NAME = "gh-footnote-leak"
DIMENSION = "citation"
DEFAULT_SEVERITY = Severity.WARN
EDITORIAL_REF = "CITATION-GUIDE §腳註格式（腳註用 [^N] Markdown 語法，不是 GitHub 渲染後的錨點）"
APPLIES_TO = ["*"]

# 正文引用：[1](#user-content-fn-9)，以及譯本裡的兩種變形——
# `[^1](#user-content-fn-9)`（label 改了、destination 沒換）與 destination 前後
# 夾了空白／隱形字元的 `[1]( #user-content-fn-9)`。舊版只認第一種，後兩者在檔案
# 裡「看不見」：check 綠燈、Astro 站上點下去不會動。
# 錨點前綴另有壞掉的一種 `#user-int-fnref-2`（`content` 掉字，實際出現在
# ko/Society/betel-nut），一起認。
_USER_PREFIX = r"#user-(?:content|int)-fn"
_REF = re.compile(rf"\[\^?\d+\]\([^)]*{_USER_PREFIX}-[0-9A-Za-z_-]+[^)]*\)")
# 文末定義行尾巴的回跳箭頭：[↩](#user-content-fnref-9) / [↩2](#user-content-fnref-9-2)
_BACKREF = re.compile(rf"\[↩(?:\d+)?\]\([^)]*{_USER_PREFIX}ref-[0-9A-Za-z_-]+[^)]*\)")


def check(target: FileTarget, config: dict[str, Any]) -> Iterator[Violation]:
    text = target.text
    if not text or not re.search(r"#user-(?:content|int)-fn", text):
        return

    ref_lines: list[int] = []
    backref_lines: list[int] = []

    for line_no, line in enumerate(text.split("\n"), start=1):
        if _REF.search(line):
            ref_lines.append(line_no)
        if _BACKREF.search(line):
            backref_lines.append(line_no)

    if not ref_lines and not backref_lines:
        return

    total = len(ref_lines) + len(backref_lines)
    first = min(ref_lines + backref_lines)

    yield Violation(
        check=CHECK_NAME,
        severity=Severity.WARN,
        message=(
            f"GitHub 渲染式腳註殘留 {total} 行"
            f"（引用 {len(ref_lines)} 行 / 定義 {len(backref_lines)} 行）："
            "`#user-content-fn-N` 是 GitHub 自己的錨點，Astro 不會產生，站上點了不會動。"
            "多半是從 GitHub 網頁複製已渲染的文章貼進來的。"
            "修：`python3 scripts/tools/gh-footnote-convert.py <檔> --apply` 轉成 `[^N]` 語法。"
        ),
        line=first,
    )
