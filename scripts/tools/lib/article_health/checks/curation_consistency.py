"""curation_consistency — 查證狀態欄位一致性看守。

設計 canonical：reports/design-curation-tier-2026-08-04.md。
三態語意：curation: 'verified'（🔎 已深度查證徽章）/ 缺省（一般文章）/
'incubating'（🌱 進化中說明條，社群貢獻待深度查證）。

看守三件事：
  1. 取值合法性 — 'verified' / 'incubating' 之外的值 → HARD（template 靜默不渲染，
     打錯字會變成「以為標了其實沒標」的 silent failure）
  2. incubating 與 featured 互斥 — incubating 不進精選（策展規則 canonical 在
     MAINTAINER-PIPELINE §1b），首頁精選邏輯不另設 filter，靠這條 lint 守 → HARD
  3. verified 應同步 lastHumanReview: true — 轉正 SOP 兩欄一起動
     （dashboard human-reviewed% 靠後者）→ WARN

審庫存 provenance 欄位（2026-10-10，MAINTAINER-PIPELINE §1d / reports/design-review-stock-2026-09-05.md）：
  4. preReview 指向的查證單必須真的存在於 repo — 手誤或搬檔留下斷指標 → WARN
  5. verifiedVia 只能是 'editorial' / 'community' → HARD（同 1 的 silent failure 理由）
  6. verifiedVia: community 必須有 preReview（社群路徑的判準之一就是查證單存在）→ WARN
  4-6 不以 curation 存在為前提：preReview 在轉正前就會掛上。

說明條種類（2026-11-04 全站普查 §五.5，reports/article-health-census-2026-11-04.md）：
  7. curationReason 只能是 'unverified'（待查證）/ 'thin'（待擴寫）→ HARD（同 1：模板對
     非法值會退回預設文案，打錯字＝以為換了說明條其實沒換）
  8. curationReason 只在 curation: incubating 時有意義 → 其他狀態帶著它 WARN（轉正後
     忘了拿掉的過期欄位；curation-tag.py --set verified 會自動拿掉）
"""

from __future__ import annotations
from pathlib import Path
from typing import Any, Iterator

from ..types import FileTarget, Severity, Violation


CHECK_NAME = "curation-consistency"
DIMENSION = "frontmatter"
DEFAULT_SEVERITY = Severity.WARN
EDITORIAL_REF = "reports/design-curation-tier-2026-08-04.md + MAINTAINER-PIPELINE §1b / §1d + reports/article-health-census-2026-11-04.md §五.5"
APPLIES_TO = ["zh-TW"]

_VALID = {"verified", "incubating"}
_VALID_VIA = {"editorial", "community"}
_VALID_REASON = {"unverified", "thin"}
_REPO_ROOT = Path(__file__).resolve().parents[5]


def _fm_line(target: FileTarget, key: str) -> int:
    for idx, line in enumerate(target.frontmatter_raw.splitlines(), start=2):
        if line.startswith(f"{key}:"):
            return idx
    return 1


def _check_provenance(target: FileTarget) -> Iterator[Violation]:
    fm = target.frontmatter
    pre = fm.get("preReview")
    if pre is not None:
        pre_s = str(pre).strip()
        if not pre_s or not (_REPO_ROOT / pre_s).is_file():
            yield Violation(
                check=CHECK_NAME,
                severity=Severity.WARN,
                message=(
                    f"preReview 指向的查證單不存在：{pre_s!r}"
                    "（應為 reports/review-stock/YYYY-MM/{slug}.md；斷指標 = 讀者點不進查證單）"
                ),
                line=_fm_line(target, "preReview"),
                editorial_ref=EDITORIAL_REF,
            )

    via = fm.get("verifiedVia")
    if via is not None:
        if via not in _VALID_VIA:
            yield Violation(
                check=CHECK_NAME,
                severity=Severity.HARD,
                message=(
                    f"verifiedVia 取值非法：{via!r}（合法值 editorial / community；"
                    "provenance 寫錯 = 徽章 hover 說謊）"
                ),
                line=_fm_line(target, "verifiedVia"),
                editorial_ref=EDITORIAL_REF,
            )
        elif via == "community" and pre is None:
            yield Violation(
                check=CHECK_NAME,
                severity=Severity.WARN,
                message=(
                    "verifiedVia: community 但沒有 preReview——社群路徑轉正的判準之一"
                    "就是查證單存在（§1d Stage 5），缺指標 = 無法追溯"
                ),
                line=_fm_line(target, "verifiedVia"),
                editorial_ref=EDITORIAL_REF,
            )


def _check_reason(target: FileTarget) -> Iterator[Violation]:
    fm = target.frontmatter
    reason = fm.get("curationReason")
    if reason is None:
        return
    if reason not in _VALID_REASON:
        yield Violation(
            check=CHECK_NAME,
            severity=Severity.HARD,
            message=(
                f"curationReason 取值非法：{reason!r}（合法值 unverified / thin；"
                "模板對非法值退回預設文案 = 以為換了說明條其實沒換）"
            ),
            line=_fm_line(target, "curationReason"),
            editorial_ref=EDITORIAL_REF,
        )
    elif fm.get("curation") != "incubating":
        yield Violation(
            check=CHECK_NAME,
            severity=Severity.WARN,
            message=(
                f"curationReason: {reason} 只在 curation: incubating 時有意義，"
                f"目前 curation 是 {fm.get('curation')!r}——轉正後忘了拿掉的過期欄位"
            ),
            line=_fm_line(target, "curationReason"),
            editorial_ref=EDITORIAL_REF,
        )


def check(target: FileTarget, config: dict[str, Any]) -> Iterator[Violation]:
    fm = target.frontmatter
    yield from _check_provenance(target)
    yield from _check_reason(target)
    cur = fm.get("curation")
    if cur is None:
        return

    if cur not in _VALID:
        yield Violation(
            check=CHECK_NAME,
            severity=Severity.HARD,
            message=(
                f"curation 取值非法：{cur!r}（合法值 verified / incubating；"
                "template 對非法值靜默不渲染 = silent failure）"
            ),
            line=_fm_line(target, "curation"),
            editorial_ref=EDITORIAL_REF,
        )
        return

    featured = fm.get("featured")
    if cur == "incubating" and featured in (True, "true"):
        yield Violation(
            check=CHECK_NAME,
            severity=Severity.HARD,
            message=(
                "curation: incubating 與 featured: true 互斥"
                "（進化中文章不進精選；首頁精選無另設 filter，靠本條看守）"
            ),
            line=_fm_line(target, "featured"),
            editorial_ref=EDITORIAL_REF,
        )

    lhr = fm.get("lastHumanReview")
    if cur == "verified" and lhr not in (True, "true"):
        yield Violation(
            check=CHECK_NAME,
            severity=Severity.WARN,
            message=(
                "curation: verified 但 lastHumanReview 不是 true——轉正時兩欄"
                "一起動（dashboard human-reviewed% 讀後者）"
            ),
            line=_fm_line(target, "curation"),
            editorial_ref=EDITORIAL_REF,
        )
