"""curation_gap — 應標 🌱 進化中卻沒標（全站普查 A 級規則的單檔版）。

設計與校準：reports/article-health-census-2026-11-04.md §三、§四
規則 SSOT：lib/article_health/census.py 的 tier_a()＋THRESHOLDS（本檔不寫任何門檻）

一篇文章沒有 `curation` 欄位，而且：
  A1 找不到任何查證流程證據（Taiwan.md 自己跑的 REWRITE／FACTCHECK commit、research
     報告、ARTICLE-DONE-LOG、preReview 查證單都沒有）∧ 腳註或字數低於「走過流程的文章
     幾乎都會到的高度」或腳註定義了卻零引用；或
  A2 走 PR 進站、進站日在 MAINTAINER-PIPELINE §1b 規則生效（2026-08-04）之後、進站後
     沒走過查證——heal 步驟漏標。
→ WARN，附一行可以直接貼的 curation-tag.py 指令（含建議的 `--reason`：只有字數失守
帶 thin，其餘帶 unverified，規則在 census.suggested_reason）。

A1／A2 各出一條 violation。options `a2_severity`（預設 warn）讓 profile 把 A2 升 HARD：
pre-commit 已升（2026-11-04 第一波補標後，§1b 漏標從此觸檔即擋），ci-deploy 維持 WARN。

為什麼 A1 是 WARN 不是 HARD：標不標是策展決定（design-curation-tier §五 #3「補標範圍」），
這把尺只負責讓缺口被看見；普查第一次跑就有一百多篇，升 HARD 等於讓 CI 全紅。

git 證據：整個行程只跑一次 bulk `git log`（census.git_histories），不逐檔 fork。
淺 clone 或沒有 git 時證據不全，會把有走過流程的文章誤判成零證據——此時降成 INFO
並在訊息裡講明，不冒充 WARN。options `git_evidence = false` 可關掉 git 層（測試用）。
"""

from __future__ import annotations

import os
import subprocess
from typing import Any, Iterator

from .. import census
from ..types import FileTarget, Severity, Violation

CHECK_NAME = "curation-gap"
DIMENSION = "curation"
DEFAULT_SEVERITY = Severity.WARN
EDITORIAL_REF = "reports/article-health-census-2026-11-04.md §三 A 級 + reports/design-curation-tier-2026-08-04.md"
APPLIES_TO = ["zh-TW"]

_CACHE: dict[str, Any] = {}


def _repo_evidence() -> census.RepoEvidence:
    if "ev" not in _CACHE:
        _CACHE["ev"] = census.RepoEvidence.load()
    return _CACHE["ev"]


def _git_state() -> tuple[dict[str, census.ArticleHistory], bool]:
    """(histories, complete)。complete=False＝沒有 git 或淺 clone，證據不可信。"""
    if "hist" not in _CACHE:
        hist = census.git_histories()
        complete = bool(hist)
        if complete:
            try:
                shallow = subprocess.run(
                    ["git", "rev-parse", "--is-shallow-repository"], cwd=census.REPO_ROOT,
                    capture_output=True, text=True, check=True,
                ).stdout.strip() == "true"
            except (OSError, subprocess.CalledProcessError):
                shallow = True
            complete = not shallow
        _CACHE["hist"], _CACHE["complete"] = hist, complete
    return _CACHE["hist"], _CACHE["complete"]


def reset_cache() -> None:
    """測試用：清掉行程內快取。"""
    _CACHE.clear()


def _rel_path(target: FileTarget) -> str | None:
    p = str(target.path).replace("\\", "/")
    i = p.rfind("knowledge/")
    if i < 0:
        return None
    rel = p[i:]
    return rel if census._is_zh_article(rel) else None


def check(target: FileTarget, config: dict[str, Any]) -> Iterator[Violation]:
    rel = _rel_path(target)
    if rel is None:
        return
    fm = target.frontmatter
    if fm.get("curation") not in (None, ""):
        return  # 已經有查證狀態（任何值），合法性歸 curation-consistency 管
    if rel.split("/")[1] == "About":
        return

    opts = config or {}
    use_git = bool(opts.get("git_evidence", True))
    hists, complete = _git_state() if use_git else ({}, False)
    row = census.build_row(rel, fm, target.body, _repo_evidence(), hists.get(rel))
    reasons = census.tier_a(row)
    if not reasons:
        return
    reason = census.suggested_reason(row) or "unverified"
    cmd = f"python3 scripts/tools/curation-tag.py --set incubating --reason {reason} {rel}"
    caveat = "" if complete else "（沒有完整 git 史，commit 層證據沒算進來，僅供參考）"

    for r in reasons:
        if not complete:
            severity = Severity.INFO
        elif r.startswith("A2") and not _in_ci():
            # A2 是「§1b 先標再審」這條規則沒照做，不是策展判斷 → profile 可升 HARD
            # （pre-commit：觸到漏標的投稿就得先補標）。A1 是判斷題，永遠 WARN。
            # CI 裡不升：pr-frontmatter-gate 對投稿 PR 逐檔跑同一個 pre-commit profile，
            # 投稿者的新文在 PR 裡就會中 A2——標記是維護者 merge 後 heal 的事（merge-first），
            # 不能讓每一個投稿 PR 因此變紅。
            severity = _sev(opts.get("a2_severity"), Severity.WARN)
        else:
            severity = Severity.WARN
        yield Violation(
            check=CHECK_NAME,
            severity=severity,
            message=f"應標 🌱 進化中但沒標{caveat}：{r}。套用前先 dry-run：{cmd}",
            line=1,
            editorial_ref=EDITORIAL_REF,
            fix_suggestion=reason,
        )


def _in_ci() -> bool:
    return os.environ.get("GITHUB_ACTIONS") == "true" or os.environ.get("CI", "").lower() in ("1", "true")


def _sev(value: Any, fallback: Severity) -> Severity:
    if isinstance(value, Severity):
        return value
    try:
        return Severity(str(value).lower()) if value else fallback
    except ValueError:
        return fallback
