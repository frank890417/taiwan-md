"""quote_fidelity — 引語逐字保真 + superlative 原子清單 (REWRITE Stage 3.6.1).

儀器化 REFLEXES #15：把 REWRITE-PIPELINE v7.0 Step 3.6.1「成品總驗・引號逐字
diff」的手動比對升級為 plugin gate（memory 是自律，plugin 才是閘門）。

來源事件（2026-06-09/10 台灣嘻哈與饒舌發展）：
    Stage 3.1-3.5 全綠 ship 後，讀者老莫（文章引用來源作者本人）抓到一處詮釋
    gloss 錯誤（寶哥=宋岳庭，實為 MV 導演黃信佳）。成品全文原子重驗再抓 14 處，
    其中兩種 drift 本 plugin 可機器攔截：
      (a) writer 縮寫 quote / 改句型但保留引號 —— 壞特陳述句被改成反問句、
          楊舒雅 quote 漏「在音樂中」「才能憤怒」。引號 = 逐字承諾。
      (b) superlative（首位/唯一/第一）是 writer 自漂移高發區 ——「曾獲報導」
          寫成「唯一」、SSOT 正確仍寫錯。

偵測兩條 rule：
    QF1（WARN，soft-launch）：正文中「…」引語（CJK ≥ 12 字、後面 12 字內有
        [^n] 腳註 = 有來源承諾的直接引語），逐字比對 frontmatter
        `researchReport` 指向的研究報告全文（SSOT 引語庫所在）。引語含「…」
        省略號時按段切開逐段比對。比不到 = writer 可能縮寫/改寫，回 SSOT
        §4 引語庫核對。
    QF2（INFO）：列出全文 superlative 原子（首位/唯一/第一位/史上第一/最早/
        首座/首張/首次/首度），作為 Step 3.6.1 原子重驗 fan-out 的優先驗證
        清單 —— 不擋 gate，純 surface。

邊界：
    - frontmatter 無 `researchReport` → QF1 skip（INFO 提示一次），QF2 照跑。
    - 引語不含 [^n]（scare quote / 口號 /  slogan）→ 不當直接引語，QF1 skip。
    - 翻譯版 / Hub / memory / diary / reports 不掃。

Canonical:
  - docs/pipelines/REWRITE-PIPELINE.md §Step 3.6 成品總驗三關
  - reports/research/2026-06/台灣嘻哈與饒舌發展.md §9（worked example）
  - MANIFESTO §10 幻覺鐵律 + REFLEXES #31（sub-agent claim 是線索不是 oracle）
"""

from __future__ import annotations

import os
import re
from typing import Any, Iterator

from ..langs import TRANSLATION_LANGS
from ..types import FileTarget, Severity, Violation


CHECK_NAME = "quote-fidelity"
DIMENSION = "factcheck"
# Soft-launch WARN：legacy 文章的 research report 可能缺 §4 引語庫（v6.4 之前），
# 逐字庫不全會誤報。待 vc≥3 production case 後評估升 HARD（per chronicle-lead pattern）。
DEFAULT_SEVERITY = Severity.WARN
EDITORIAL_REF = "REWRITE-PIPELINE.md §Step 3.6.1 成品總驗・引號逐字 diff"
APPLIES_TO = ["zh-TW"]

# 直接引語：「…」內 ≥ 12 CJK 字，閉引號後 12 字內出現 [^n]
_QUOTE_RX = re.compile(r"「([^「」]{12,})」(?P<tail>[^「]{0,12}?)\[\^\d+\]")
# superlative 原子（writer 自漂移高發區）
_SUPERLATIVE_RX = re.compile(
    r"(史上第一[位個張座次]?|第一[位個張座]|首位|首座|首張|首度|首次|唯一|最早)"
)
_ELLIPSIS_SPLIT_RX = re.compile(r"[…⋯]+|……")
_MIN_SEGMENT_CJK = 6
_MAX_SUPERLATIVE_REPORTED = 12


def _is_excluded_path(path: str) -> bool:
    p = str(path)
    # 語言清單吃 langs.py SSOT，不寫死（2026-07-24：原本停在出生戰役前的五語）。
    if any(f"/knowledge/{lg}/" in p for lg in TRANSLATION_LANGS):
        return True
    if os.path.basename(p).startswith("_") and p.endswith(".md"):
        return True
    if "/memory/" in p or "/diary/" in p or "/reports/" in p:
        return True
    return False


_HALF2FULL = str.maketrans({",": "，", "!": "！", "?": "？", ";": "；", ":": "："})
_TRAILING_PUNCT_RX = re.compile(r"[。．，！？；：…⋯、]+$")


def _normalize(text: str) -> str:
    """逐字比對前的正規化：去空白 / markdown 強調符 / 半形標點轉全形。

    字級 drift（「以及」vs「獻給」）仍會被抓；半形↔全形逗號是轉錄習慣差，
    統一後再比（dogfood 校準：老莫 quote 半形 comma 誤報）。
    """
    return re.sub(r"[\s　*_]+", "", text).translate(_HALF2FULL)


def _strip_edge_punct(seg: str) -> str:
    """needle 段落去頭尾標點 — 句號收在引號內/外是轉錄習慣，非逐字 drift。"""
    return _TRAILING_PUNCT_RX.sub("", seg)


def _resolve_report_path(target: FileTarget) -> str | None:
    rr = target.frontmatter.get("researchReport")
    if not rr or not isinstance(rr, str):
        return None
    if os.path.exists(rr):
        return rr
    # fallback：從文章路徑往上找 repo root（含 reports/ 的目錄）
    d = os.path.dirname(os.path.abspath(str(target.path)))
    for _ in range(6):
        cand = os.path.join(d, rr)
        if os.path.exists(cand):
            return cand
        d = os.path.dirname(d)
    return None


def check(target: FileTarget, config: dict[str, Any]) -> Iterator[Violation]:
    """QF1 引語逐字保真（against researchReport SSOT）+ QF2 superlative 清單。"""
    if _is_excluded_path(str(target.path)):
        return

    body = target.body_without_protected()
    if not body.strip():
        return
    # 腳註定義區（[^n]: ...）的描述常合理壓縮引語，不掃 QF1/QF2（保留行號：以空白佔位）
    body = "\n".join(
        ("" if re.match(r"\s*\[\^\d+\]:", ln) else ln) for ln in body.split("\n")
    )

    # ── QF1: 引語逐字保真 ───────────────────────────────────────────────
    report_path = _resolve_report_path(target)
    report_norm: str | None = None
    if report_path:
        try:
            with open(report_path, encoding="utf-8") as fh:
                report_norm = _normalize(fh.read())
        except OSError:
            report_norm = None

    quotes = list(_QUOTE_RX.finditer(body))
    if quotes and report_norm is None:
        rr = target.frontmatter.get("researchReport")
        yield Violation(
            check=CHECK_NAME,
            severity=Severity.INFO,
            message=(
                f"找到 {len(quotes)} 句帶腳註直接引語，但"
                + (
                    f"research report 讀不到（{rr}）"
                    if rr
                    else "frontmatter 無 researchReport"
                )
                + " — QF1 逐字保真 skip。Step 3.6.1 請人工對 SSOT §4 引語庫。"
            ),
            line=1,
            snippet="",
            editorial_ref=EDITORIAL_REF,
            fix_suggestion="depth 文補 frontmatter `researchReport:` 指向 SSOT 研究報告。",
        )
    elif report_norm is not None:
        for m in quotes:
            quote = m.group(1)
            segments = [
                _strip_edge_punct(s)
                for s in _ELLIPSIS_SPLIT_RX.split(quote)
                if len(re.sub(r"[^一-鿿]", "", s)) >= _MIN_SEGMENT_CJK
            ]
            if not segments:
                continue
            missing = [s for s in segments if _normalize(s) not in report_norm]
            if not missing:
                continue
            line_no = body.count("\n", 0, m.start()) + 1
            yield Violation(
                check=CHECK_NAME,
                severity=DEFAULT_SEVERITY,
                message=(
                    f"引語逐字比對不到 research report：「{missing[0][:32]}…」 — "
                    "writer 可能縮寫 / 改句型 / 換字（引號 = 逐字承諾）。"
                    "回 SSOT §4 引語庫核對原文，或這句根本不在報告裡（新增來源要先進報告）。"
                ),
                line=line_no,
                snippet=f"「{quote[:60]}…」" if len(quote) > 60 else f"「{quote}」",
                editorial_ref=EDITORIAL_REF,
                fix_suggestion=(
                    "三選一：(1) 改回報告逐字 (2) 拿掉引號改轉述 (3) 引語是新查證 → "
                    "先 append 報告 §4 引語庫（含 URL + Ctrl-F 狀態）再引用。"
                ),
            )

    # ── QF2: superlative 原子清單（INFO，3.6.1 優先驗證對象）──────────────
    reported = 0
    for m in _SUPERLATIVE_RX.finditer(body):
        if reported >= _MAX_SUPERLATIVE_REPORTED:
            break
        line_no = body.count("\n", 0, m.start()) + 1
        line_text = body.split("\n")[line_no - 1].strip()
        yield Violation(
            check=CHECK_NAME,
            severity=Severity.INFO,
            message=(
                f"superlative 原子「{m.group(0)}」 — writer 自漂移高發區，"
                "Step 3.6.1 原子重驗優先驗證（≥2 源；單源請軟化措辭）。"
            ),
            line=line_no,
            snippet=line_text[:90],
            editorial_ref=EDITORIAL_REF,
            fix_suggestion="驗不到第二來源 → 軟化（唯一→曾獲 / 第一位→早期少數）。",
        )
        reported += 1
