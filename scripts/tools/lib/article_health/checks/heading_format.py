"""heading-format — ATX 標題的 `#` 後面沒有空白，整行不會被解析成標題。

## 為什麼存在（2026-10-28，對應 issue #1882）

CommonMark 的 ATX 標題要求 `#` 後面接空白。寫成 `##延伸阅读`（井字號直接接
文字）時，`marked` 判成**一般段落**：

    marked.lexer('##延伸阅读\\n')[0].type   // → 'paragraph'

於是這一節在站上同時壞三件事：目錄抓不到（`TableOfContents.astro` 是從渲染後
的 `<h2>` 抓）、頁面直接印出字面的 `##延伸阅读`、任何指向該節的錨點都 404。

這種病能活到讀者眼前，是因為結構層的檢查器只有 `format-structure`，而它
`APPLIES_TO = ["zh-TW"]`——十一個語系的標題結構從來沒有任何儀器看過。
全庫掃描時 81 處全部長在譯文裡，母稿一處都沒有。

## 判準（刻意窄）

`^#{1,6}` 後面**不是空白也不是 `#`**，且**不是 ASCII 字母**，且不在 code fence
裡 → 命中。

排除 ASCII 字母開頭是為了避開假陽性：段落行首的 `#MeToo` 本來就該是字面文字，
不是壞掉的標題。代價是漏掉 `##Chapter 3` 這種 ASCII 開頭的打字失誤——這個 corpus
裡一例都沒有（81 處全是 CJK／韓文／數字／引號開頭），而誤報的代價不對稱：
閘門誤報時最省事的消音方式是把內容改壞（LESSONS
`gate-triggers-content-degradation-incentive`）。判準寫窄不寫寬。
"""

from __future__ import annotations

import re
from typing import Any, Iterator

from ..types import FileTarget, Severity, Violation

CHECK_NAME = "heading-format"
DIMENSION = "structure"
DEFAULT_SEVERITY = Severity.HARD
EDITORIAL_REF = "EDITORIAL §三 結構 + issue #1882"
APPLIES_TO = ["*"]

# CommonMark fence：前最多 3 空白，3 個以上的 ` 或 ~，開場可帶 info string。
_FENCE = re.compile(r"^ {0,3}(?P<delim>`{3,}|~{3,})(?P<info>.*)$")
# `#` 群組後面直接接非空白、非 `#`、且不是 ASCII 字母 → 壞掉的標題行。
_BROKEN_HEADING = re.compile(r"^(?P<hashes>#{1,6})(?P<rest>[^\s#])(?P<tail>.*)$")


def _broken(line: str) -> re.Match[str] | None:
    m = _BROKEN_HEADING.match(line)
    if not m:
        return None
    first = m.group("rest")
    if first.isascii() and first.isalpha():
        return None
    return m


def check(target: FileTarget, config: dict[str, Any]) -> Iterator[Violation]:
    open_char: str | None = None
    open_len = 0

    for lineno, line in enumerate(target.body.split("\n"), start=1):
        fence = _FENCE.match(line)
        if fence:
            delim = fence.group("delim")
            char, length = delim[0], len(delim)
            if open_char is None:
                open_char, open_len = char, length
                continue
            if char == open_char and length >= open_len and not fence.group("info").strip():
                open_char, open_len = None, 0
                continue
        if open_char is not None:
            continue

        m = _broken(line)
        if not m:
            continue

        hashes = m.group("hashes")
        yield Violation(
            check=CHECK_NAME,
            severity=Severity.HARD,
            message=(
                f"標題行 `{hashes}` 後面沒有空白，這一行不會被解析成標題"
                "（會變成一般段落：目錄抓不到、頁面印出字面的井字號、錨點 404）"
            ),
            line=lineno,
            snippet=line.strip()[:80],
            fix_suggestion=(
                f"在 `{hashes}` 後面補一個空白"
                f"（`{hashes}{m.group('rest')}{m.group('tail')}` → "
                f"`{hashes} {m.group('rest')}{m.group('tail')}`）"
            ),
            editorial_ref=EDITORIAL_REF,
        )
