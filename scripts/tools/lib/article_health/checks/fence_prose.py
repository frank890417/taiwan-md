"""fence-prose — 正文被包進 code fence，整段以原始碼的樣子印給讀者。

## 為什麼存在（2026-08-14）

譯文裡出現這種東西：

    ````
    > **30 秒概覽：** 馬祖國際藝術島 2022 年開辦……
    ```tw-figure
    …
    ```
    ````

外層那個四撇 fence 沒有 info string，把整段正文包成程式碼。讀者看到的不是引言塊，
是攤開的原始碼——`> **30 秒概覽：**` 連星號帶大於號原封不動印在頁面上。中文原文
沒有這一層，是翻譯打包時多加的。

這種病**判定不需要判斷力**：fence 裡出現引言塊或腳註定義，就是正文被包進去了。
它之所以能活到讀者眼前，是因為 `format-structure`（唯一在管結構的檢查）
`APPLIES_TO = ["zh-TW"]`——十一個語系的結構層從來沒有任何檢查器看過。

發現經過：PR #1336（唐鳳）修 CJK 粗體的引擎缺口，審查時把全站渲染一遍數殘留的
字面 `**`。扣掉刻意保留的塗銷書名與粗話之後，剩下的全部是這個病。引擎那半修好
了，這半沒有任何東西在看。對應 MANIFESTO §14「能機械化檢查的一律做成儀器」＋
REFLEXES #83「檢查器兩把尺」。

## 判準（刻意窄）

fence 的 info string 是空的或 `markdown`／`md`，且 fence 內容含引言塊行（`^> `）
或腳註定義（`^[^N]:`）→ 命中。

**排除**站上的視覺模組（```tw-figure / tw-stat / tw-timeline / tw-bars / tw-note …
凡有 info string 的都不看），因為那些 fence 本來就裝著結構化內容。

判準寫窄不寫寬，是因為假陽性的代價不對稱：閘門誤報時，最省事的消音方式是把被
誤報的內容改掉——判準不準會誘導寫手把好東西改壞（LESSONS
`gate-triggers-content-degradation-incentive`，2026-08-09）。

## 另外兩條（2026-10-28，對應 issue #1904）

同一個家族還有兩種形狀，判準不同但病灶一樣：fence 自己壞了。

- **四撇以上的 fence**（`^`````）。renderer 的模組擷取只認三撇那一行，於是
  四撇開、四撇收的 `tw-timeline` 會一路掃到下一個三撇行，把中間的 `##` 標題、
  正文、甚至另一個模組整個吞進去；三撇開、四撇收的則永遠沒關上。
  存量 2026-10-25 量到 7 檔 / 14 行，2026-10-28 重測已歸零（產線重翻清掉了），
  所以這條直接上 HARD。真的要示範巢狀 fence 請改用 `~~~` 外層。
- **遺失開頭的殘行**：` ```tw-heatmap ` 掉了前五個字元，只剩一行 `-heatmap`，
  資料列就當成普通段落印給讀者。判準是「整行剛好等於 `-` + 一個已知模組名」。
"""

from __future__ import annotations

import re
from typing import Any, Iterator

from ..types import FileTarget, Severity, Violation

CHECK_NAME = "fence-prose"
DIMENSION = "structure"
DEFAULT_SEVERITY = Severity.HARD
EDITORIAL_REF = "EDITORIAL §三 結構 + MANIFESTO §14 高儀器化"
APPLIES_TO = ["*"]

# CommonMark: fence 前最多 3 個空白，3 個以上的 ` 或 ~，開場可帶 info string。
_FENCE = re.compile(r"^ {0,3}(?P<delim>`{3,}|~{3,})(?P<info>.*)$")
# 四撇以上的 fence 行（開場或收尾都算）。
_LONG_FENCE = re.compile(r"^ {0,3}`{4,}")
# 已知的視覺模組名（`knowledge/` 現用 21 種）。
_MODULES = (
    "arc article bars dot figure heatmap iso line multiples note "
    "pyramid quote slope source stack stat tiles timeline versus waffle"
).split()
# ` ```tw-heatmap ` 掉了開頭，只剩 `-heatmap`。
_LOST_OPENING = re.compile(
    r"^-(?:" + "|".join(re.escape(m) for m in _MODULES) + r")$"
)
# 只有這兩型算「正文被包進去」的證據。
_BLOCKQUOTE = re.compile(r"^ {0,3}>\s")
_FOOTNOTE_DEF = re.compile(r"^ {0,3}\[\^[^\]]+\]:")
# 空 info 或宣稱自己是 markdown 的 fence 才看；tw-* 等視覺模組一律略過。
_PROSE_INFO = {"", "markdown", "md"}


def _blocks(text: str):
    """走 CommonMark fence 規則，吐出 (開場行號, info, 內容行 list, 有沒有收尾)。"""
    open_char: str | None = None
    open_len = 0
    open_line = 0
    open_info = ""
    body: list[str] = []

    for lineno, line in enumerate(text.splitlines(), start=1):
        m = _FENCE.match(line)
        if m:
            delim = m.group("delim")
            char, length = delim[0], len(delim)
            info = m.group("info").strip()
            if open_char is None:
                open_char, open_len, open_line, open_info = char, length, lineno, info
                body = []
                continue
            # 只有同字元、長度不短於開場、且無 info string 才算收尾
            if char == open_char and length >= open_len and not info:
                yield open_line, open_info, body, True
                open_char, open_len, open_line, open_info = None, 0, 0, ""
                body = []
                continue
        if open_char is not None:
            body.append(line)

    if open_char is not None:  # 沒收尾的也交出去判
        yield open_line, open_info, body, False


def check(target: FileTarget, config: dict[str, Any]) -> Iterator[Violation]:
    # ── 規則 2/3：fence 自己壞了（issue #1904）──────────────────────────
    for lineno, line in enumerate(target.body.split("\n"), start=1):
        if _LONG_FENCE.match(line):
            yield Violation(
                check=CHECK_NAME,
                severity=Severity.HARD,
                message=(
                    f"第 {lineno} 行的 fence 用了四個以上的反引號——"
                    "renderer 的模組擷取只認三撇那一行，這個 fence 不會被當成收尾"
                    "（模組會一路吞掉後面的標題與正文）"
                ),
                line=lineno,
                snippet=line.strip()[:80],
                fix_suggestion="改成三個反引號；真的要示範巢狀 fence 請用 `~~~` 當外層",
                editorial_ref=EDITORIAL_REF,
            )
        elif _LOST_OPENING.match(line.strip()):
            yield Violation(
                check=CHECK_NAME,
                severity=Severity.HARD,
                message=(
                    f"第 {lineno} 行只剩模組 fence 的後半截 `{line.strip()}`——"
                    "開頭的三撇與 `tw` 不見了，模組的資料列會當成普通段落印給讀者"
                ),
                line=lineno,
                snippet=line.strip()[:80],
                fix_suggestion=f"補回開頭，改成 ```tw{line.strip()}",
                editorial_ref=EDITORIAL_REF,
            )

    # ── 規則 1：正文被包進 fence ─────────────────────────────────────────
    # ── 規則 4：fence 沒有收尾（孤立的三撇行）──────────────────────────
    for open_line, _info, _body, closed in _blocks(target.body):
        if closed:
            continue
        yield Violation(
            check=CHECK_NAME,
            severity=Severity.HARD,
            message=(
                f"第 {open_line} 行的 fence 沒有收尾——"
                "後面整段都會被當成程式碼，以原始碼的樣子印給讀者"
            ),
            line=open_line,
            snippet=target.body.split("\n")[open_line - 1].strip()[:80],
            fix_suggestion="補上收尾的三個反引號；若是多出來的孤立 fence 行，直接刪掉那一行",
            editorial_ref=EDITORIAL_REF,
        )

    for open_line, info, body, _closed in _blocks(target.text):
        if info.lower() not in _PROSE_INFO:
            continue
        quoted = [i for i, l in enumerate(body) if _BLOCKQUOTE.match(l)]
        notes = [i for i, l in enumerate(body) if _FOOTNOTE_DEF.match(l)]
        if not quoted and not notes:
            continue
        first = body[(quoted or notes)[0]].strip()
        kind = "引言塊" if quoted else "腳註定義"
        yield Violation(
            check=CHECK_NAME,
            severity=Severity.HARD,
            message=(
                f"第 {open_line} 行的 code fence 把正文包進去了"
                f"（裡面有 {len(quoted) or len(notes)} 行{kind}）——"
                f"這段會以原始碼的樣子印給讀者，引言塊、粗體、連結全部失效"
            ),
            line=open_line,
            snippet=first[:80],
            fix_suggestion="刪掉這一對多餘的 fence（對照中文原文的結構），讓正文回到正常段落",
            editorial_ref=EDITORIAL_REF,
        )
