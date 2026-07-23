"""correction_meta — 校正焦慮 / errata-as-prose detection (REWRITE Stage 3.2-bis).

儀器化 REFLEXES #15：把 REWRITE-PIPELINE v6.2 Step 3.2-bis 的「校正焦慮掃描」
手動 grep 升級為 plugin gate（memory 是自律，plugin 才是閘門）。

來源事件（2026-06-01）：
    配樂專業讀者 peilinwu0702 第二輪 callout —— `台灣影視配樂` callout-triggered
    EVOLVE 後事實層修對（25 footnote 全一手），但「整篇充滿 AI 道歉/澄清、架構從
    頭就有問題」。根因：舊文 body + 舊 callout 同在 session context → 觀點變成校正
    清單的昇華 → 正文散出「把 X 掛在他名下其實是錯的」「常被誤記成 Y」式的校正型句。
    「別人會搞錯」的那個「別人」就是這篇文章的前一版。

偵測（DEFAULT WARN — dual-use 句式 + legacy soft-launch；callout-triggered EVOLVE
由 REWRITE-PIPELINE Step 3.2-bis 視為 must-fix）：
    把 X 掛在/記到/算在...名下          ← 誤植-然後-更正 frame
    反而(抹掉|蓋掉|掩蓋|蓋過)            ← 「歸錯抹掉了真正的」frame
    誤記成 / 常被(誤記|誤認|混淆|搞混)   ← 「常被誤記成 Y，其實是 Z」
    別/不要(搞錯|弄錯|搞混|叫錯) / 搞錯名字 / 叫錯名字
    (值得|得|要)(說|講)清楚 / 把...分清楚 / 順帶...分清楚  ← 澄清 frame

自檢句（canonical）：
    「如果這篇文章第一次就寫對了，這個句子還會存在嗎？只為回應過去的錯誤、或
      為了澄清一個混淆而存在的 → 刪。」

Canonical:
  - docs/pipelines/REWRITE-PIPELINE.md §Step 0.2-bis 拆除防火牆 + §Step 3.2-bis 校正焦慮掃描
  - reports/reader-callout-pipeline-diagnosis-2026-06-01.md
  - feedback_red_line_anxiety_leak (架構級放大)
"""

from __future__ import annotations
import os
import re
from typing import Any, Iterator

from ..langs import TRANSLATION_LANGS
from ..types import FileTarget, Severity, Violation


CHECK_NAME = "correction-meta"
DIMENSION = "editorial-voice"
# Soft-launch WARN：句式 dual-use（少數 legit 教學語境會用「常被混淆」），且 legacy
# 文章可能含 violation。callout-triggered EVOLVE 在 REWRITE Step 3.2-bis 視為 must-fix。
# 待 vc≥3 production case 後評估是否對特定 profile 升 HARD（per chronicle-lead pattern）。
DEFAULT_SEVERITY = Severity.WARN
EDITORIAL_REF = "REWRITE-PIPELINE.md §Step 0.2-bis 拆除防火牆 + §Step 3.2-bis 校正焦慮掃描"
APPLIES_TO = ["zh-TW"]


# ── 校正型句式 patterns（errata-driven defensive correction）──────────────────
_PATTERNS: list[tuple[re.Pattern[str], str]] = [
    # 誤植-然後-更正：把 X 掛在/記到/算在 ... 名下
    (re.compile(r"[把將][^，。！？\n]{0,40}(掛|記|算)(在|到)[^，。！？\n]{0,20}名下"),
     "誤植-更正 frame（把 X 記到他名下）"),
    # 「歸錯抹掉了真正的」frame
    (re.compile(r"反而(抹掉|蓋掉|掩蓋|蓋過)"),
     "歸錯抹掉真實 frame（反而抹掉/蓋掉）"),
    # 常被誤記/誤認/混淆
    (re.compile(r"(常|容易|經常|往往)(被|會被)?(誤記|誤認|誤植|搞混|混淆|叫錯)"),
     "常被誤記/混淆 frame"),
    (re.compile(r"誤記(成|為)"), "誤記成 Y frame"),
    # 別/不要搞錯，搞錯名字，叫錯名字
    (re.compile(r"(別|不要|不該)[^，。！？\n]{0,6}(搞錯|弄錯|搞混|叫錯|認錯)"),
     "別搞錯 frame"),
    (re.compile(r"(搞錯|叫錯|認錯|弄錯)[^，。！？\n]{0,6}(名字|了名|人|對象)"),
     "搞錯名字 frame"),
    # 把 X 跟/和 Y 搞混（誤認兩者 frame）
    (re.compile(r"[把將][^，。！？\n]{0,24}(跟|和|與|同)[^，。！？\n]{0,24}(搞混|混為|弄混|混淆)"),
     "把 X 跟 Y 搞混 frame"),
    # 澄清 frame：值得/得/要 說/講清楚、把...分清楚、順帶...分清楚
    (re.compile(r"(值得|得|要|需要)[^，。！？\n]{0,10}(說|講|分|釐|弄)清楚"),
     "澄清 frame（值得說清楚）"),
    (re.compile(r"[把將][^，。！？\n]{0,30}分(清楚|開)"),
     "把 X 分清楚 frame"),
    (re.compile(r"順帶[^，。！？\n]{0,12}(分清楚|說清楚|釐清|澄清)"),
     "順帶澄清 frame"),
]


def _is_excluded_path(path: str) -> bool:
    p = str(path)
    # 語言清單吃 langs.py SSOT，不寫死（2026-07-24：原本停在出生戰役前的五語）。
    if any(f"/knowledge/{lg}/" in p for lg in TRANSLATION_LANGS):
        return True
    if os.path.basename(p).startswith("_") and p.endswith(".md"):
        return True
    if "/SPORE-BLUEPRINTS/" in p or "/SPORE-HARVESTS/" in p:
        return True
    if "/memory/" in p or "/diary/" in p:
        return True
    if "/reports/" in p:
        return True
    return False


def check(target: FileTarget, config: dict[str, Any]) -> Iterator[Violation]:
    """Detect errata-as-prose (校正焦慮) — REWRITE Stage 3.2-bis backstop.

    Scans body with protected regions (code / link-url / html) masked so URLs
    and code never false-match. Line numbers align with file (body is padded).
    """
    if _is_excluded_path(str(target.path)):
        return

    masked = target.body_without_protected()
    if not masked.strip():
        return

    for line_no, line in enumerate(masked.split("\n"), start=1):
        if not line.strip():
            continue
        for rx, label in _PATTERNS:
            m = rx.search(line)
            if not m:
                continue
            yield Violation(
                check=CHECK_NAME,
                severity=DEFAULT_SEVERITY,
                message=(
                    f"校正焦慮句式（{label}）：「{m.group(0)[:30]}」 — "
                    f"自檢『如果第一次就寫對，這句還會存在嗎？』只為回應過去錯誤而存在的，刪。"
                ),
                line=line_no,
                snippet=line.strip()[:90],
                editorial_ref=EDITORIAL_REF,
                fix_suggestion=(
                    "改成正面敘述（直接講對的事實，不講『別人搞錯了什麼』）。"
                    "callout-triggered EVOLVE 必修；論點脊椎也別建立在『歸屬要正確』上。"
                ),
            )
            break  # one violation per line is enough signal
