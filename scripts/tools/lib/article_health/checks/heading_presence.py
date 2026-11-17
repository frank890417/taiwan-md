"""heading-presence — 整篇沒有任何標題，通常代表 Markdown 結構在投稿途中掉光了。

## 為什麼存在（2026-11-03，對應 issue #1951）

讀者菜國人回報〈戰鬥陀螺〉「格式錯誤」。打開檔案，整篇一個 `#` 都沒有：八個
H2 變成裸段落、三張圖只剩 alt 文字、引言卡與兩個資料模組攤成用 `|` 串起來的
行、十二條腳註的連結與 `[^N]` 標記全部消失。原因是投稿者把**渲染後**的文字貼
進 GitHub 網頁編輯器，Markdown 從來沒有進到檔案裡。這篇在站上這樣躺了兩個半月
（2026-08-19 合併 → 11-03 讀者回報），期間 `article-health` 對它回 `hard=0`，
十二個語系也照著這份沒有結構的母稿翻了十二遍。

既有的 `format-structure` 其實有發出聲音（缺 30 秒概覽 blockquote、缺
`## 延伸閱讀`、缺 `## 參考資料` 三條 WARN），但它們是 WARN，而 WARN 不擋任何
東西，也沒有人在讀。`heading-format`（issue #1882）管的是 `##標題` 少一個空白
的那種壞法，剛好是本條的鏡像：那是標題寫壞了，這是標題整個不在。

## 判準（刻意窄）

`body` 裡（code fence 外）**一個 ATX 標題都沒有**，且 body 去掉空白後仍有
400 字元以上 → 命中。400 字元那條線是為了不罰真正的短檔與未來可能出現的
stub；本 corpus 實測 15,018 個 md 裡命中 12 個，全部來自上面那一篇的母稿與
它的十二語譯文（母稿修好後剩譯文，等翻譯產線重跑就會歸零）。

母稿是 HARD、譯文是 WARN：缺陷從母稿進來，譯文只是忠實地把它帶過去，而且會在
下一輪重翻時被換掉。擋母稿才擋得住源頭；對譯文用 HARD 只會在產線還沒追上的
那幾天擋住所有人的 push。
"""

from __future__ import annotations

import re
from typing import Any, Iterator

from ..types import FileTarget, Severity, Violation

CHECK_NAME = "heading-presence"
DIMENSION = "structure"
DEFAULT_SEVERITY = Severity.HARD
EDITORIAL_REF = "EDITORIAL §三 結構 + issue #1951"
APPLIES_TO = ["*"]

# 正文最少要這麼長才值得要求標題（字元，去空白後）。
MIN_BODY_CHARS = 400

_FENCE = re.compile(r"^ {0,3}(?P<delim>`{3,}|~{3,})(?P<info>.*)$")
_ATX_HEADING = re.compile(r"^ {0,3}#{1,6}\s")


def _has_heading(body: str) -> bool:
    open_char: str | None = None
    open_len = 0
    for line in body.split("\n"):
        fence = _FENCE.match(line)
        if fence:
            delim = fence.group("delim")
            char, length = delim[0], len(delim)
            if open_char is None:
                open_char, open_len = char, length
                continue
            if (
                char == open_char
                and length >= open_len
                and not fence.group("info").strip()
            ):
                open_char, open_len = None, 0
                continue
        if open_char is not None:
            continue
        if _ATX_HEADING.match(line):
            return True
    return False


def check(target: FileTarget, config: dict[str, Any]) -> Iterator[Violation]:
    body = target.body
    if len("".join(body.split())) < MIN_BODY_CHARS:
        return
    if _has_heading(body):
        return

    is_translation = target.lang != "zh-TW"
    severity = Severity.WARN if is_translation else Severity.HARD
    tail = (
        "（譯文：母稿修好後重翻就會跟著回來，所以這裡只提醒不擋）"
        if is_translation
        else ""
    )
    yield Violation(
        check=CHECK_NAME,
        severity=severity,
        message=(
            "整篇沒有任何 Markdown 標題——通常是把渲染後的文字貼進編輯器，"
            f"結構（標題／圖片／腳註／模組）在途中掉光了{tail}"
        ),
        line=1,
        snippet=body.strip().split("\n")[0][:80],
        fix_suggestion=(
            "對照站上或原稿把 `## 小標`、`![alt](path)`、`[^N]` 腳註與 "
            "```tw-*``` 模組補回來；如果本來就是純段落的短文，"
            "至少要有 `## 參考資料` 這類結構節"
        ),
        editorial_ref=EDITORIAL_REF,
    )
