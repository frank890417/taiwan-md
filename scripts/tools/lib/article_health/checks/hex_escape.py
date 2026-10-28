"""hex-escape — 正文裡出現字面的 `<0xNN>` 位元組轉義殘留。

## 為什麼存在（2026-10-28，對應 issue #1924）

譯本裡有一種產線殘渣：非 ASCII 位元組被寫成字面的十六進位轉義，直接印在頁面上。

    201<0xC2>7년          應該是 2017년
    [^1<0xC2>9]           腳註引用被切成兩半，站上連不到任何定義
    maje<0xB9>ures        應該是 majeures
    | <0xC2><0xA0> | …    表格第一個 cell 是轉義字串，整列右移一格

全庫掃到 1,039 個 token / 101 個譯本檔（ko 41、fr 27、es 17、en 13、ja 2、vi 1），
母稿一處都沒有。`grep -rn '<0x' scripts` 是空的——產生它的程式在 repo 外。

## 為什麼是 WARN 而不是 HARD

存量清不掉。這批殘留**不能機械修**：其中 77 個 token 根本不是完整的位元組序列
（`화<0xEB><0xA1>`、孤立的 `<0xC2>`），另外 320 個雖然解得剛好一個字元，但位元組
已經被改過（`뤼슈<0xEB><0xA1><0xAA>` 解成 `롪`，正確是 `롄`；`18<0xE3><0x80><0xB0>`
解成 `18〰`，正確是 1800）。照著解會把看起來合理的錯字寫進正文。

存量要靠產線重新輸出（issue #1924 §建議），在那之前這支只收數據：
先 WARN，等存量歸零再談 HARD（CONSCIOUSNESS §進化方向「儀器化黃燈路線」）。

## 判準

body 內出現 `<0x` + 兩位十六進位 + `>` 就算。零假陽性——正常文章不會有這種字串。
"""

from __future__ import annotations

import re
from typing import Any, Iterator

from ..types import FileTarget, Severity, Violation

CHECK_NAME = "hex-escape"
DIMENSION = "structure"
DEFAULT_SEVERITY = Severity.WARN
EDITORIAL_REF = "issue #1924 + MANIFESTO §14 高儀器化"
APPLIES_TO = ["*"]

_ESCAPE = re.compile(r"<0x[0-9A-Fa-f]{2}>")


def check(target: FileTarget, config: dict[str, Any]) -> Iterator[Violation]:
    hits: list[int] = []
    first_snippet = ""

    for lineno, line in enumerate(target.body.split("\n"), start=1):
        found = _ESCAPE.findall(line)
        if not found:
            continue
        hits.append(lineno)
        if not first_snippet:
            idx = line.find(found[0])
            first_snippet = line[max(0, idx - 20) : idx + 30].strip()

    if not hits:
        return

    total = sum(len(_ESCAPE.findall(l)) for l in target.body.split("\n"))
    yield Violation(
        check=CHECK_NAME,
        severity=Severity.WARN,
        message=(
            f"正文有 {total} 個字面的 `<0xNN>` 位元組轉義殘留（{len(hits)} 行）——"
            "這些會直接印在頁面上，數字、腳註引用、網址都會被切開。"
            "不能機械解碼（位元組已被改過），需要從譯文產線重新輸出。"
        ),
        line=hits[0],
        snippet=first_snippet[:80],
        fix_suggestion="從譯文產線重新產生這一篇（issue #1924），不要在 corpus 上手改",
        editorial_ref=EDITORIAL_REF,
    )
