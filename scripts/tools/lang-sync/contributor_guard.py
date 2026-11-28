#!/usr/bin/env python3
"""contributor_guard.py — babel 產線不覆蓋投稿者翻好的譯文（OBSERVER-QUEUE #67，2026-10-10 哲宇拍板 B）。

兩道門，三支取 target 的工具共用（babel-dispatch.py / prepare-batch.py / patch-translate.py）：

1. **open-PR 過濾**：目標檔被 frank890417/taiwan-md 任何一個開著的 PR 碰到，就跳過。
   `gh pr list --state open --json number,files` 每個 run 只打一次（長 run 超過
   BABEL_OPEN_PR_REFRESH_MIN 分鐘再打）；gh 不在／失敗只留一行警告、過濾關掉，
   產線照跑——這道門絕不能弄垮正在翻的 dispatcher。
   擋的是 #1697／#1775／#1776 那一型：投稿者 PR 開著，babel 同篇翻完推上 main，
   撞出 add/add 衝突或靜默蓋掉。

2. **人寫的譯文不直接覆蓋**：既有譯文判 stale 時，先看它現在的 `translatedAt`
   是哪個 commit 寫進去的（`git log -1 -S<translatedAt> -- <file>`，一檔一次、快取）。
   作者不是機器（見 is_machine_author：bot 身份、產線專用標題、或操作者推的 🧬 簽名
   commit 才算機器）→ 不重翻，改記一筆提議到
   `reports/babel/human-translation-stale.tsv`（path、zh sha、原因、作者）讓維護班
   去請投稿者更新或由人決定。擋的是 steve-chen 那一型：zh 改一條腳註，babel 判
   stale 整篇重翻，把投稿者寫對的 1,65 Milliarden 改成 165 Millionen，兩天沒有東西叫。

   為什麼看 translatedAt 的 commit 而不是檔案最後一個 commit：哲宇或 routine 做分類
   改名之類的 heal 會碰到十三語的 frontmatter，那不是「這份譯文是誰翻的」。
   translatedAt 只有翻譯本身會寫，是最便宜的作者證據。沒有 translatedAt 的舊檔退回
   看最後一個 commit。

「機器」的定義：bot 身份、產線專用標題（🧬 [semiont] babel／🧬 [routine]），或生命體
操作者（哲宇）推的 🧬 簽名 commit——早期巴別塔批次是他的終端機推的。投稿者偶爾也寫
🧬 [semiont] 前綴，所以 🧬 本身不是機器證據；判不出來的一律視為人寫的。

安全閥：環境變數 `BABEL_CONTRIBUTOR_GUARD=0` 整個關掉（兩道門都關）。
"""
import json
import os
import re
import subprocess
import threading
import time
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import Callable, Optional

REPO = Path(__file__).resolve().parent.parent.parent.parent
REPO_SLUG = "frank890417/taiwan-md"
PROPOSALS_TSV = REPO / "reports" / "babel" / "human-translation-stale.tsv"
OPEN_PR_REFRESH_MIN = int(os.environ.get("BABEL_OPEN_PR_REFRESH_MIN", "60"))
GH_TIMEOUT_S = 40

MACHINE_NAMES = ("taiwan.md semiont", "taiwanmd-semiont", "github-actions", "dependabot")
MACHINE_EMAIL_MARKS = ("[bot]", "github-actions", "noreply@anthropic.com")
# 這些標題只有產線會寫，不論誰的終端機推的都算機器。
MACHINE_SUBJECT_PREFIXES = ("🧬 [semiont] babel", "🧬 [routine]", "🧬 [造橋鋪路] 巴別塔")
# 生命體的操作者：他們推的 🧬 簽名 commit 是生命體自己的產出（早期巴別塔批次是哲宇的
# 終端機推的）。投稿者也會寫 🧬 [semiont] 前綴（HHQ／idlccp1984 都寫過），所以 🧬 本身
# 不能當機器證據，要跟操作者身份一起看。fork 時改這兩個 tuple（或環境變數
# BABEL_OPERATOR_IDENTITIES，逗號分隔 name／email）。
OPERATOR_IDENTITIES = tuple(
    s.strip().lower() for s in os.environ.get(
        "BABEL_OPERATOR_IDENTITIES",
        "Che-Yu Wu,Wu Che Yu,cheyu.wu@monoame.com,frank890417@gmail.com",
    ).split(",") if s.strip()
)

TRANSLATED_AT_RE = re.compile(r"^translatedAt:\s*['\"]?([^'\"\n]+?)['\"]?\s*$", re.M)
PROPOSAL_COLUMNS = ("recorded_at", "lang", "path", "zh_path", "zh_sha", "author", "reason")


def guard_enabled() -> bool:
    return os.environ.get("BABEL_CONTRIBUTOR_GUARD", "1").strip() not in ("0", "false", "no", "off")


def is_machine_author(name: str, email: str, subject: str) -> bool:
    """bot 身份、產線專用標題、或操作者推的 🧬 簽名 commit = 機器；
    其餘一律當人寫的（寧可少翻一篇也不蓋掉人的貢獻）。"""
    n = (name or "").strip().lower()
    e = (email or "").strip().lower()
    s = (subject or "").strip()
    if any(mark in n for mark in MACHINE_NAMES):
        return True
    if any(mark in e for mark in MACHINE_EMAIL_MARKS):
        return True
    if s.startswith(MACHINE_SUBJECT_PREFIXES):
        return True
    return s.startswith("🧬") and (n in OPERATOR_IDENTITIES or e in OPERATOR_IDENTITIES)


@dataclass(frozen=True)
class Authorship:
    sha: str
    name: str
    email: str
    subject: str
    via: str            # "translatedAt" | "last-commit"

    @property
    def machine(self) -> bool:
        return is_machine_author(self.name, self.email, self.subject)

    def label(self) -> str:
        return f"{self.name} <{self.email}> {self.sha[:9]} «{self.subject[:60]}»"


@dataclass(frozen=True)
class Decision:
    ok: bool
    reason: str = ""          # "" | "open-pr" | "human-authored"
    detail: str = ""


def _run_git(repo: Path, args: list[str]) -> str:
    r = subprocess.run(["git", *args], cwd=repo, capture_output=True, text=True, encoding="utf-8", errors="replace")
    return r.stdout if r.returncode == 0 else ""


def translation_authorship(repo: Path, rel_path: str, cache: Optional[dict] = None) -> Optional[Authorship]:
    """`rel_path` 是 repo 相對路徑（knowledge/de/...）。沒進版控的檔回 None。"""
    if cache is not None and rel_path in cache:
        return cache[rel_path]
    fmt = "%H%x09%an%x09%ae%x09%s"
    out = ""
    via = "last-commit"
    full = repo / rel_path
    try:
        text = full.read_text(encoding="utf-8", errors="replace")[:4000]
    except OSError:
        text = ""
    m = TRANSLATED_AT_RE.search(text)
    if m and m.group(1).strip():
        out = _run_git(repo, ["log", "-1", f"--format={fmt}", f"-S{m.group(1).strip()}", "--", rel_path])
        if out.strip():
            via = "translatedAt"
    if not out.strip():
        out = _run_git(repo, ["log", "-1", f"--format={fmt}", "--", rel_path])
    result: Optional[Authorship] = None
    line = out.strip().splitlines()[0] if out.strip() else ""
    parts = line.split("\t", 3)
    if len(parts) == 4:
        result = Authorship(parts[0], parts[1], parts[2], parts[3], via)
    if cache is not None:
        cache[rel_path] = result
    return result


class OpenPRIndex:
    """開著的 PR 碰到哪些檔。`gh` 失敗 → available=False、空索引、一行警告，不丟例外。"""

    def __init__(self, repo_slug: str = REPO_SLUG, log: Optional[Callable[[str], None]] = None,
                 runner: Optional[Callable[[], str]] = None):
        self.repo_slug = repo_slug
        self.log = log or (lambda s: None)
        self._runner = runner
        self.files: dict[str, list[int]] = {}
        self.available: Optional[bool] = None
        self.loaded_at: Optional[float] = None

    def _default_runner(self) -> str:
        r = subprocess.run(
            ["gh", "pr", "list", "--repo", self.repo_slug, "--state", "open",
             "--json", "number,files", "--limit", "200"],
            capture_output=True, text=True, encoding="utf-8", errors="replace", timeout=GH_TIMEOUT_S,
        )
        if r.returncode != 0:
            raise RuntimeError((r.stderr or r.stdout).strip()[-300:] or f"exit={r.returncode}")
        return r.stdout

    def load(self, force: bool = False) -> "OpenPRIndex":
        if self.loaded_at is not None and not force:
            if (time.time() - self.loaded_at) / 60 < OPEN_PR_REFRESH_MIN:
                return self
        files: dict[str, list[int]] = {}
        try:
            raw = (self._runner or self._default_runner)()
            for pr in json.loads(raw or "[]"):
                num = int(pr.get("number", 0))
                for f in pr.get("files", []) or []:
                    p = f.get("path") if isinstance(f, dict) else f
                    if p:
                        files.setdefault(p, []).append(num)
            self.files = files
            self.available = True
            self.log(f"  open-PR 過濾：{len(files)} 個檔被 {len({n for v in files.values() for n in v})} 個開著的 PR 碰到（OBSERVER-QUEUE #67）")
        except Exception as e:  # noqa: BLE001 — gh 不在／沒登入／逾時都不能弄垮產線
            self.files = {}
            self.available = False
            self.log(f"  ⚠️ open-PR 過濾關閉：gh pr list 失敗（{str(e)[:200]}）— 本 run 看不見投稿 PR，照常翻譯")
        self.loaded_at = time.time()
        return self

    def prs_touching(self, rel_path: str) -> list[int]:
        return self.files.get(rel_path, [])

    def prs_touching_slug(self, lang: str, slug: str) -> list[int]:
        """缺頁（missing）還沒有目標路徑，用 knowledge/<lang>/*/<slug>.md 比對。"""
        if not slug or "TBD-NEEDS-SLUG" in slug:
            return []
        prefix = f"knowledge/{lang}/"
        hits: list[int] = []
        for p, nums in self.files.items():
            if p.startswith(prefix) and p.endswith(f"/{slug}.md"):
                hits.extend(nums)
        return sorted(set(hits))


class ContributorGuard:
    def __init__(self, repo: Path = REPO, log: Optional[Callable[[str], None]] = None,
                 open_prs: Optional[OpenPRIndex] = None, proposals_tsv: Optional[Path] = None,
                 enabled: Optional[bool] = None):
        self.repo = repo
        self.log = log or (lambda s: None)
        self.enabled = guard_enabled() if enabled is None else enabled
        self.open_prs = open_prs or OpenPRIndex(log=self.log)
        self.proposals_tsv = proposals_tsv or (repo / PROPOSALS_TSV.relative_to(REPO))
        self._author_cache: dict = {}
        self._logged: set = set()
        self._lock = threading.Lock()   # dispatcher 主執行緒與 top-up 可能同時問
        self.skipped: dict[str, int] = {"open-pr": 0, "human-authored": 0}

    # ── 判斷 ──────────────────────────────────────────────────────────────
    def check(self, lang: str, zh_path: str, status: str, trans_rel: Optional[str],
              slug: Optional[str] = None, zh_sha: str = "") -> Decision:
        """trans_rel：既有譯文的 repo 相對路徑（knowledge/de/...）；缺頁給 None 並帶 slug。"""
        if not self.enabled:
            return Decision(True)
        with self._lock:
            return self._check(lang, zh_path, status, trans_rel, slug, zh_sha)

    def _check(self, lang: str, zh_path: str, status: str, trans_rel: Optional[str],
               slug: Optional[str], zh_sha: str) -> Decision:
        self.open_prs.load()
        nums = self.open_prs.prs_touching(trans_rel) if trans_rel else []
        if not nums and slug:
            nums = self.open_prs.prs_touching_slug(lang, slug)
        if nums:
            d = Decision(False, "open-pr", "PR #" + ", #".join(str(n) for n in sorted(set(nums))))
            self._log_skip(lang, zh_path, d)
            return d
        if status in ("stale", "metadata-stale") and trans_rel and (self.repo / trans_rel).exists():
            a = translation_authorship(self.repo, trans_rel, self._author_cache)
            if a is not None and not a.machine:
                d = Decision(False, "human-authored", a.label())
                if self._log_skip(lang, zh_path, d):
                    self.record_proposal(lang, trans_rel, zh_path, zh_sha, a)
                return d
        return Decision(True)

    def _log_skip(self, lang: str, zh_path: str, d: Decision) -> bool:
        key = (lang, zh_path, d.reason, d.detail)
        if key in self._logged:
            return False
        self._logged.add(key)
        self.skipped[d.reason] = self.skipped.get(d.reason, 0) + 1
        if d.reason == "open-pr":
            self.log(f"⏭️  skip {zh_path} ({lang}): 開著的投稿 {d.detail} 正在碰這篇 — 等 PR 收掉再翻（#67）")
        else:
            self.log(f"🙇 skip {zh_path} ({lang}): 現行譯文是人寫的（{d.detail}）— "
                     f"不覆蓋，記提議到 {self.proposals_tsv.relative_to(self.repo)}（#67）")
        return True

    # ── 提議檔 ────────────────────────────────────────────────────────────
    def record_proposal(self, lang: str, trans_rel: str, zh_path: str, zh_sha: str, a: Authorship) -> bool:
        """同一 (path, zh_sha) 只記一次。寫檔失敗只 log。回 True = 新記一筆。"""
        try:
            self.proposals_tsv.parent.mkdir(parents=True, exist_ok=True)
            existing = self.proposals_tsv.read_text(encoding="utf-8") if self.proposals_tsv.exists() else ""
            for line in existing.splitlines():
                cols = line.split("\t")
                if len(cols) >= 5 and cols[2] == trans_rel and cols[4] == (zh_sha or ""):
                    return False
            row = (datetime.now().astimezone().isoformat(timespec="seconds"), lang, trans_rel, zh_path,
                   zh_sha or "", f"{a.name} <{a.email}> {a.sha[:9]}",
                   f"zh 已更新但現行譯文由人翻（{a.via}）；請投稿者更新或由維護班決定，產線不覆蓋")
            with self.proposals_tsv.open("a", encoding="utf-8") as f:
                if not existing:
                    f.write("# " + "\t".join(PROPOSAL_COLUMNS) + "\n")
                f.write("\t".join(c.replace("\t", " ").replace("\n", " ") for c in row) + "\n")
            return True
        except OSError as e:
            self.log(f"  ⚠️ 提議檔寫入失敗（{e}）：{trans_rel}")
            return False
