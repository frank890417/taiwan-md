r"""footnote-reference — 抓「正文引用了 `[^N]`，但站上渲染不出對應腳註」的斷腳註。

## 為什麼要有這一支

`footnote-format` 驗的是**定義行的形狀**（`[^N]: [Title](URL) — desc`），
`footnote-density` 數的是**定義與引用的數量比**。兩支都不問同一個問題：

    正文引用 `[^12]`，讀者在站上到底看得到那條腳註嗎？

答案是「沒人問」。於是一篇 43 處引用全部落空的文章可以拿到兩個綠燈——
這正是 2026-10 的全庫掃描結果：708 處斷腳註、116 個檔。

站上怎麼看：`src/utils/article-render.ts` 的 `processFootnotes()` 遇到找不到
定義的標籤，會把 `[^12]` **原樣留在正文**（`if (!definitions[label]) return
`[${raw}]`;`）。讀者看到的是一串沒有上下文的方括號數字，點不下去，也沒有
文末條目——它不像壞掉的連結那樣會被讀者回報，因為它看起來「像文章的一部分」。

## 判準必須跟 renderer 一致（2026-10-21 改寫的關鍵）

這一支的每一條規則都是從 `processFootnotes()` 的**真實程式碼**抄下來的，
不是「腳註語法看起來應該怎樣」。理由很硬：2026-08-28「徹底處理那一輪」用
Python 重寫 renderer 的規則去估算影響範圍，得到「零風險」的錯答案——
兩邊 regex 長得一樣，量出的卻是完全不同的行為（見
`docs/semiont/memory/2026-08-28-005518-footnote-cards.md`）。**測試與檢查
都必須對齊正式站在用的那支函式，否則綠燈只是自我安慰。**

`tests/article-footnote.test.mjs` 直接 import `renderArticleHtml()` 跑真實
渲染結果來驗同一組邊界；這裡的 Python 常數是它的鏡像。

### 對齊怎麼驗證的（不是「看起來一樣」）

1. **全庫逐檔比對**：拿真實 renderer 跑全庫 15,045 檔，抽出「讀者看得到
   的殘留 label」跟「文末腳註條目」當 ground truth，再跟這支 check 的輸出
   逐檔比。2026-10-21 結果：renderer 端 131 檔 / 764 個殘留 label，
   check 端 119 檔 / 752 個——差額 12 檔**全部**是 `[^N]` 這個刻意的
   字面說明例外（見下），其餘每一個 label、每一個檔都對得上，
   共同檔案的 label 差集 = 0。
2. **差分模糊測試**：用 JS 端「逐字複製 renderer 演算法」產生 11,459 個
   隨機 markdown 案例（含未收尾的 `[^`、純空白定義、縮排定義、code fence、
   全形/半形冒號、跨行 label），跟 Python 端逐案比對 → **0 分歧**。
   這個過程抓出三個真 bug：空白定義被算成有定義、逐行掃描把跨行 label
   誤拆、以及「先把 `[^N]` 換成空白再掃」會截斷跨行 label。

### 跟 renderer 對齊的四件事

1. **定義行**：renderer 的正則是
   `/^\[\^([^\]]+)\]:\s*(.+?)(?=\n\[\^|\n\n|\n#|\n---|\s*$)/gms`——
   label 是**任何非 `]` 字元**（不是只有 ASCII 數字/字母），
   必須在**行首**，而且**冒號後要有東西**（`.+?`）。
   空白內容的 `[^N]:` 在 renderer 眼裡是**未定義**。
2. **引用**：renderer 掃的是**移除定義區塊之後**的 body，
   正則 `/\[(\^[^\]]+)\]/g`——**不看後面有沒有冒號**。
   （舊版這裡有 `(?!:)`，那是 907 檔斷腳註的根因，已於 2026-10-21 修掉。）
3. **label 集合**：renderer 認得 `[^台灣]`、`[^剩食-新聞市場]` 這種非 ASCII
   label。舊版這裡用 `[0-9a-zA-Z_-]+`，比 renderer 窄 → 漏報 143 處。
4. **code fence**：renderer **不跳** code fence（fence 裡的 `[^N]` 若有定義
   一樣會被轉成 `<sup>`）。舊版這裡跳 fence → 兩邊對不上。
   實測全庫有 451 檔的 fence 裡有 `[^N]`，其中 13 檔的 label 沒有定義。
5. **空內容定義**：renderer 是 `definitions[label] = content.trim()` 再用
   `if (!definitions[label])` 判斷 → **純空白的定義等於沒定義**。
6. **全文沒有任何定義時**：renderer 直接 `return md`（early return）→
   所有引用原樣保留，全部落空。

## 誤報防護

- 只算**正文**裡的引用；定義區塊本身不算引用（renderer 先把定義區塊從
  body 移除，掃的時候它們已經不在了）。
- 跳過 provenance 註腳裡的**字面說明**：`[^N]` 這串字是作者在描述
  「12 條 ## 參考資料 全部 inline 化為 [^N] 腳註」——那是在**講**腳註這個
  機制，不是在引用。全庫有 12 處這種寫法（zh-TW + 11 個譯本），不跳就
  全部變假陽性。
- **不跳 code fence**（跟 renderer 一致）。fence 裡的 `[^N]` 若沒有對應
  定義，在站上同樣是字面殘留、讀者同樣點不到 → 應該報。

## 嚴重度

WARN（不是 HARD）。理由跟 `gh-footnote-leak` 同一條路：全庫存量要先
清乾淨，否則全站掃描會被自己擋死。存量清完、只剩新造的斷腳註時再升 HARD。

WARN 也不代表可以放著不管——它跟 `footnote-format` 的 WARN 是同一個量級的
「引用層品質債」，而斷腳註比格式不對更嚴重：格式不對的腳註**還在**，
斷腳註是**連線都沒有**。
"""

from __future__ import annotations

import re
from typing import Any, Iterator

from ..types import FileTarget, Severity, Violation


CHECK_NAME = "footnote-reference"
DIMENSION = "citation"
DEFAULT_SEVERITY = Severity.WARN
EDITORIAL_REF = "docs/editorial/CITATION-GUIDE.md §腳註格式（每個 `[^N]` 引用都要有對應的 `[^N]:` 定義）"
APPLIES_TO = ["*"]


# ── 跟 renderer 對齊的規則（見模組 docstring）────────────────────────────

# 定義區塊：**逐字抄自** renderer's `processFootnotes()`：
#   /^\[\^([^\]]+)\]:\s*(.+?)(?=\n\[\^|\n\n|\n#|\n---|\s*$)/gms
# label 是任何非 `]` 字元；必須在行首；冒號後要有東西（空白 = 未定義）。
# 內容可以跨行，直到下一個 `[^`、空行、`#`、`---` 或行尾為止。
_RE_DEF_BLOCK = re.compile(
    r"^\[\^([^\]]+)\]:\s*(.+?)(?=\n\[\^|\n\n|\n#|\n---|\s*$)",
    re.MULTILINE | re.DOTALL,
)

# 引用：label 為任意非 `]` 字元。renderer 不看後面有沒有冒號，因為
# 定義行在掃描前就已經被移除。
_RE_REF = re.compile(r"\[\^([^\]]+)\]")

# provenance 註腳裡講到腳註機制本身的那種寫法：
# 「12 條 ## 參考資料 全部 inline 化為 [^N] 腳註」
# 這裡的 `N` 是**字面量**說明（意思是「N 這條」），不是真的引用第 N 條。
# 判準：抓到的 token 就**剛好**是 `[^N]`（label 精確等於 "N"）→ 視為字面說明。
# 全庫 12 處這種寫法（zh-TW + 11 個譯本），不跳就全部變假陽性。
# 全庫 0 個檔案定義 `[^N]:`，所以這個例外不會吃掉任何真的腳註。
#
# 這裡**不能**用「先把文字裡的 `[^N]` 換成空白再掃」的做法：那會把一個
# 未收尾的 `[^` typo 切斷，讓 label 從「橫跨多行」變成「被空白截斷」，
# 掃出來的 label 就跟 renderer 不一樣了（fuzz 實測 59 例分歧，全部是這個原因）。
# 正確做法是**先照 renderer 的規則抓到 token，再看 token 本身**。
_LITERAL_LABEL = "N"


def _iter_dangling(body: str) -> Iterator[tuple[str, int]]:
    r"""Yield (label, line_number) for every reference the site cannot render.

    Mirrors `processFootnotes()`: collect definitions, strip the definition
    blocks from the body, then scan what is left for references whose label
    has no definition.

    掃描必須在**整段文字**上做，不能逐行：renderer 的 label 字符集
    `[^\]]+` 會連換行一起吃，所以一個「忘了收尾的 `[^`」typo 會讓 label
    橫跨好幾行（實測全庫 12 例）。逐行掃會把它誤拆成好幾個短 label。
    """
    defined: set[str] = set()
    for m in _RE_DEF_BLOCK.finditer(body):
        # renderer 是 `definitions[m[1]] = m[2].trim();` 再用
        # `if (!definitions[label])` 判斷有沒有定義 → **純空白的定義等於
        # 沒定義**（trim 後是空字串，falsy）。這裡要照抄，不能只看有沒有
        # 抓到這一行，否則 `[^1]:   ` 會被算成有定義 → 漏報。
        if m.group(2).strip():
            defined.add(m.group(1))

    # 定義區塊整段從 body 移除（跟 renderer 的 `md.replace(defRegex, '')` 一致）
    remaining = _RE_DEF_BLOCK.sub("", body)

    # offset → 行號的對照表（只在有 dangling 時才建，避免浪費）
    line_starts: list[int] | None = None

    for m in _RE_REF.finditer(remaining):
        label = m.group(1)
        if label in defined:
            continue
        # 字面量機制說明（`[^N]`）不是引用
        if label == _LITERAL_LABEL:
            continue
        if line_starts is None:
            line_starts = [0]
            for i, ch in enumerate(remaining):
                if ch == "\n":
                    line_starts.append(i + 1)
        # 二分找行號
        lo, hi = 0, len(line_starts) - 1
        while lo < hi:
            mid = (lo + hi + 1) // 2
            if line_starts[mid] <= m.start():
                lo = mid
            else:
                hi = mid - 1
        yield label, lo + 1


def dangling_refs(body: str) -> dict[str, int]:
    """Return {label → first line number} for every reference with no definition.

    Public so sweep tools and calibration scripts can count precisely without
    parsing the human-facing violation message.
    """
    dangling: dict[str, int] = {}
    for label, line_no in _iter_dangling(body):
        dangling.setdefault(label, line_no)
    return dangling


def check(target: FileTarget, config: dict[str, Any]) -> Iterator[Violation]:
    body = target.body
    if not body or "[^" not in body:
        return

    dangling = dangling_refs(body)

    if not dangling:
        return

    labels = sorted(dangling)
    shown = ", ".join(f"[^{k}]" for k in labels[:10])
    more = f"…（另 {len(labels) - 10} 個）" if len(labels) > 10 else ""
    yield Violation(
        check=CHECK_NAME,
        severity=DEFAULT_SEVERITY,
        message=(
            f"{len(labels)} 個腳註引用沒有對應的定義：{shown}{more}。"
            "斷掉的腳註在站上會原樣顯示成方括號數字（沒有上標、沒有文末條目），"
            "讀者點不到也看不出它引的是什麼。"
            "修：補上對應的腳註定義行（`[^標號]: [Title](URL) — desc`），"
            "或移除那個引用標記。"
        ),
        line=min(dangling.values()),
        editorial_ref=EDITORIAL_REF,
    )
