"""article_health.census — 全站文章普查的量尺、查證流程證據與四級分級規則。

設計與校準報告：reports/article-health-census-2026-11-04.md
三態查證狀態 canonical：reports/design-curation-tier-2026-08-04.md

誰在用：
  - scripts/tools/article-census.py（全站普查 CLI，週跑）
  - lib/article_health/checks/curation_gap.py（article-health plugin：應標 🌱 卻沒標）

兩邊吃同一份規則，門檻只住在本檔 THRESHOLDS（不在 plugin、不在 CLI 各寫一份）。

量尺來源（同一把尺，不另造）：
  - CJK 字數：checks/word_count._count_cjk_in_body（word-count plugin 的同一支）
  - 段落：checks/paragraph_rhythm 的 _strip_for_prose_analysis / _split_paragraphs /
    _is_prose_block（paragraph-rhythm plugin 的同一支）
  - tw-* 模組：行首 ```tw-xxx（paragraph-rhythm / viz-health 同一條 regex）

判定原則（design-curation-tier §1.4）：分級看「這篇走過哪些查證流程」，不看誰寫的。
作者欄只記錄、不進任何一條規則；唯一例外是 MAINTAINER-PIPELINE §1b 的既有規則
「新 merged 貢獻文章 → incubating」，那條判的是「進站後沒走過查證」這個流程事實，
貢獻者身分只是用來找出哪些文章是走 PR 進站的。
"""

from __future__ import annotations

import re
import statistics
import subprocess
import urllib.parse
from dataclasses import dataclass, field
from datetime import date
from pathlib import Path
from typing import Any, Iterable

from .checks.word_count import _count_cjk_in_body
from .checks import paragraph_rhythm as _pr
from .langs import TRANSLATION_LANGS

REPO_ROOT = Path(__file__).resolve().parents[4]
KNOWLEDGE = REPO_ROOT / "knowledge"

# ── 門檻（2026-11-04 用全站分布校準，依據見報告 §四）────────────────────────────
# 數字改這裡，plugin 與 CLI 同時生效。每一條都寫了它對應的分位數，下次重校準時
# 先跑 `article-census.py --distribution` 看分布再動。
THRESHOLDS: dict[str, Any] = {
    # 校準母體（2026-11-04，排除 About 9 篇站務頁）：
    #   全站 n=1,147｜走過 REWRITE（2026-04-24 後的 rewrite commit 或有 research 報告）n=395
    #   ｜零查證證據 n=596。分位數全表：`article-census.py --distribution`。
    #
    # A 級（應標 🌱）地板：零查證證據之外，還要「低於走過流程的文章幾乎都會到的高度」。
    #   a_fn_floor 5    ＝ 走過 REWRITE 腳註 p5（=5）；全站 p10=0／p25=7
    #   a_cjk_floor 2000 ＝ 走過 REWRITE 字數 p10（=2,018）；全站 p25=2,043
    #   兩條 OR：任一條失守就算。2026-07-16 審核用 AND（2,500 且 5），那次不看流程證據；
    #   這次另外要求零證據，所以地板可以改 OR、高度往下收到「走過流程的底部一成」。
    "a_fn_floor": 5,
    "a_cjk_floor": 2000,
    # D 級（內文簡陋、該進 REWRITE）五條軸，弱 ≥3 條才算：
    #   d_cjk 2500       ≈ 全站 p33（2,434）；同 2026-07-16 嚴重門檻
    #   d_fn 8           ≈ 全站 p30（p25=7／p33=9）；同 2026-07-16 次一級門檻
    #   d_h2 3           正文章節 < 3（全站 p10=2）＝ 一兩節就講完的單節文
    #   零媒體           正文零圖零影片零模組、也沒封面（全站 p50 就是 0，所以單獨不判，只當一軸）
    #   d_para_median 55 段落中位 < 55 字（EDITORIAL §段落呼吸鐵律 1；全站 p5–p10）或散文段 < 8
    "d_cjk": 2500,
    "d_fn": 8,
    "d_h2": 3,
    "d_para_median": 55,
    "d_para_count": 8,
    "d_min_weak_axes": 3,
    # B 級（已標 🌱、可人審轉正）地板＝走過 REWRITE 文章的 p25：腳註 11、字數 3,097→3000。
    "b_fn": 11,
    "b_cjk": 3000,
    # 「現代流程」起算日：Stage 3.6 STORY ATOM AUDIT 誕生（2026-04-24）之後的 rewrite
    # 才帶逐條查證；之前的只記錄、不當 B 級證據。
    "modern_pipeline_since": "2026-04-24",
    # 貢獻者 PR 進站自動標 🌱 的規則生效日（MAINTAINER-PIPELINE §1b，2026-08-04）。
    "heal_rule_since": "2026-08-04",
}

# 維護者／Semiont 的 git 身分（mailmap 之後的 %aN）。只用在 heal 漏標偵測：
# 不在這張表裡的首次提交者 = 走 PR 或外部投稿進站。
MAINTAINER_IDENTITIES = {"Che-Yu Wu", "Taiwan.md Semiont", "Taiwan.md", "taiwan-md-bot"}

# 參考資料類小標——不算正文 H2。
_TAIL_H2_PREFIXES = (
    "延伸閱讀", "參考資料", "參考文獻", "圖片來源", "註釋", "附註", "資料來源",
    "相關文章", "相關閱讀", "影像來源", "圖片出處", "延伸資源",
)

_RE_FENCE = re.compile(r"```.*?```", re.DOTALL)
_RE_TW = re.compile(r"(?m)^```tw-[a-z-]+")
_RE_FN_DEF = re.compile(r"(?m)^\[\^([^\]\s]+)\]:")
_RE_FN_REF = re.compile(r"\[\^([^\]\s]+)\](?!:)")
_RE_H2 = re.compile(r"(?m)^##\s+(?!#)(.+?)\s*$")
_RE_H3 = re.compile(r"(?m)^###\s+(?!#)(.+?)\s*$")
_RE_MD_IMG = re.compile(r"!\[[^\]]*\]\(\s*<?([^)\s>]+)")
_RE_HTML_IMG = re.compile(r"<img\b[^>]*?\bsrc=[\"']([^\"']+)", re.IGNORECASE)
_RE_IFRAME = re.compile(r"<iframe[\s>]", re.IGNORECASE)
_RE_OVERVIEW = re.compile(r"(?m)^>\s*\*\*\s*30\s*秒概覽")

# ── 查證流程 commit 分類 ──────────────────────────────────────────────────────
# REWRITE pipeline 的 commit 慣例：`🧬 [semiont] rewrite: X`／`[routine] twmd-rewrite`／
# `new:`／`evolve:`／舊式 `rewrite: X`。FACTCHECK：巡邏（月度抽樣）／FACTCHECK／事實查核。
_RE_REWRITE_SUBJ = re.compile(
    r"\]\s*(?:rewrite|new|article-rewrite|rewrite-evolve)\s*[:：]"
    r"|^rewrite\s*[:：]|twmd-rewrite|REWRITE|深度重寫|全面重寫|重寫",
)
# `evolve:` 同時用在「文章 EVOLVE」與「系統自我進化」（例：改腳註閘門順手修了一篇當案例），
# 所以只有主旨點名這篇時才算。
_RE_EVOLVE_SUBJ = re.compile(r"\]\s*evolve\s*[:：]|EVOLVE")
_RE_FACTCHECK_SUBJ = re.compile(
    r"FACTCHECK|[Ff]act-?[Cc]heck|事實查核|查核|巡邏|review-stock|預審",
)
# 一個 commit 動到的中文文章數 ≤ 這個數、或主旨點名了這篇，才算「這篇走過」。
# 防的是批次 commit（例：一次動 200 篇的格式 heal）把 rewrite 字樣灑到每一篇。
_TARGETED_MAX_FILES = 2


def zh_category_dirs(knowledge: Path = KNOWLEDGE) -> list[str]:
    """knowledge/ 底下的中文分類目錄（排除譯文語言目錄與小寫的資源目錄）。"""
    out = []
    for d in sorted(knowledge.iterdir()):
        if not d.is_dir() or d.name in TRANSLATION_LANGS:
            continue
        if not d.name[:1].isupper():  # knowledge/resources 不是分類
            continue
        out.append(d.name)
    return out


def list_zh_articles(knowledge: Path = KNOWLEDGE) -> list[Path]:
    files = []
    for cat in zh_category_dirs(knowledge):
        for md in sorted((knowledge / cat).glob("*.md")):
            if not md.name.startswith("_"):
                files.append(md)
    return files


# ── 內文量尺 ────────────────────────────────────────────────────────────────


def _is_tail_h2(title: str) -> bool:
    t = title.strip().lstrip("#").strip()
    return t.startswith(_TAIL_H2_PREFIXES)


def body_metrics(body: str) -> dict[str, Any]:
    """一篇正文（不含 frontmatter）的結構量尺。純函式，測試直接餵字串。"""
    no_fence = _RE_FENCE.sub("", body)
    defs = _RE_FN_DEF.findall(no_fence)
    def_set = list(dict.fromkeys(defs))  # 保序去重
    prose_lines = "\n".join(l for l in no_fence.split("\n") if not _RE_FN_DEF.match(l))
    refs = set(_RE_FN_REF.findall(prose_lines))
    h2_titles = _RE_H2.findall(no_fence)
    h3_titles = _RE_H3.findall(no_fence)
    md_imgs = _RE_MD_IMG.findall(no_fence)
    html_imgs = _RE_HTML_IMG.findall(no_fence)
    imgs = md_imgs + html_imgs
    stripped = _pr._strip_for_prose_analysis(body)
    paras = [p for p in _pr._split_paragraphs(stripped) if _pr._is_prose_block(p)]
    para_cjk = [_pr._count_cjk(p) for p in paras]
    return {
        "cjk": _count_cjk_in_body(body),
        "fn_defs": len(def_set),
        "fn_referenced": sum(1 for d in def_set if d in refs),
        "h2": len(h2_titles),
        "h2_content": sum(1 for t in h2_titles if not _is_tail_h2(t)),
        "h3": len(h3_titles),
        "images": len(imgs),
        "images_local": sum(1 for s in imgs if s.startswith("/")),
        "images_remote": sum(1 for s in imgs if s.startswith(("http://", "https://", "//"))),
        "first_local_image": next((s for s in imgs if s.startswith("/")), None),
        "iframes": len(_RE_IFRAME.findall(no_fence)),
        "tw_modules": len(_RE_TW.findall(body)),
        "paragraphs": len(paras),
        "para_median_cjk": int(statistics.median(para_cjk)) if para_cjk else 0,
        "has_overview": bool(_RE_OVERVIEW.search(body)),
    }


def truthy(v: Any) -> bool:
    """frontmatter 布林：YAML true 與字串 'true' 都算（dashboard 曾把 'false' 當 truthy）。"""
    if isinstance(v, bool):
        return v
    return str(v).strip().lower() == "true"


def cover_info(fm: dict[str, Any], repo_root: Path = REPO_ROOT) -> dict[str, Any]:
    """封面圖（frontmatter image）狀態：none / local / local-missing / remote。"""
    img = fm.get("image")
    img = img.strip() if isinstance(img, str) else ""
    if not img:
        return {"cover": "none", "cover_path": None}
    if img.startswith(("http://", "https://", "//")):
        return {"cover": "remote", "cover_path": img}
    local = repo_root / "public" / urllib.parse.unquote(img.lstrip("/"))
    return {"cover": "local" if local.is_file() else "local-missing", "cover_path": img}


# ── 查證流程證據：repo 檔案層（plugin 與 CLI 都用）──────────────────────────────


@dataclass
class RepoEvidence:
    """repo 裡讀得到、不用 git 的查證證據索引（research 報告／DONE-LOG／INBOX）。"""

    research_by_stem: dict[str, list[str]] = field(default_factory=dict)
    research_audit: set[str] = field(default_factory=set)  # 含 FACTCHECK audit trail 的 research 檔
    done_log_paths: set[str] = field(default_factory=set)  # 'Cat/stem.md'
    inbox_open_paths: set[str] = field(default_factory=set)  # ARTICLE-INBOX 未勾的條目
    hold_paths: dict[str, str] = field(default_factory=dict)  # config/babel-hold.tsv（凍結中的文章）

    @classmethod
    def load(cls, repo_root: Path = REPO_ROOT) -> "RepoEvidence":
        ev = cls()
        rdir = repo_root / "reports" / "research"
        if rdir.is_dir():
            for f in rdir.rglob("*.md"):
                rel = f.relative_to(repo_root).as_posix()
                ev.research_by_stem.setdefault(f.stem, []).append(rel)
                try:
                    head = f.read_text(encoding="utf-8", errors="replace")[:20000]
                except OSError:
                    continue
                if re.search(r"(?m)^status:\s*['\"]?audit", head) or re.search(
                    r"(?m)^#+\s*§?\s*audit\b|audit 前 HEAD", head
                ):
                    ev.research_audit.add(rel)
        done = repo_root / "docs" / "semiont" / "ARTICLE-DONE-LOG.md"
        if done.is_file():
            ev.done_log_paths = _knowledge_refs(done.read_text(encoding="utf-8"))
        inbox = repo_root / "docs" / "semiont" / "ARTICLE-INBOX.md"
        if inbox.is_file():
            open_lines = [
                ln for ln in inbox.read_text(encoding="utf-8").splitlines()
                if not ln.lstrip().startswith(("- [x]", "- [X]"))
            ]
            ev.inbox_open_paths = _knowledge_refs("\n".join(open_lines))
        hold = repo_root / "config" / "babel-hold.tsv"
        if hold.is_file():
            for ln in hold.read_text(encoding="utf-8").splitlines():
                if not ln.strip() or ln.startswith("#"):
                    continue
                cols = ln.split("\t")
                if len(cols) >= 5:
                    ev.hold_paths[cols[1]] = f"{cols[2][:10]}～{cols[3][:10]} {cols[4]}"
        return ev

    def research_for(self, stem: str, fm_report: str | None) -> list[str]:
        out = list(self.research_by_stem.get(stem, []))
        if fm_report:
            out.insert(0, str(fm_report))
        return list(dict.fromkeys(out))


_RE_KREF = re.compile(r"knowledge/([A-Z][A-Za-z]+)/([^)\s\]>'\"`|]+?\.md)")


def _knowledge_refs(text: str) -> set[str]:
    """文字裡提到的 `knowledge/{Cat}/{stem}.md`，回 'Cat/stem.md'（URL 解碼）。"""
    out = set()
    for cat, name in _RE_KREF.findall(text):
        out.add(f"{cat}/{urllib.parse.unquote(name)}")
    return out


# ── 查證流程證據：git 層（一次 bulk log，不逐篇 fork）────────────────────────────


@dataclass
class Commit:
    sha: str
    author: str
    date: str  # ISO date YYYY-MM-DD
    subject: str
    n_zh: int  # 這個 commit 動到的中文文章數


@dataclass
class ArticleHistory:
    commits: list[Commit] = field(default_factory=list)  # 新 → 舊
    path_first_author: str | None = None  # 這個路徑第一次出現（含改名進來）的 commit 作者
    path_first_date: str | None = None


def _zh_pathspecs(repo_root: Path) -> list[str]:
    return [f"knowledge/{c}" for c in zh_category_dirs(repo_root / "knowledge")]


def is_partial_clone(repo_root: Path = REPO_ROOT) -> bool:
    """CI 的 deploy checkout 是 blobless（`--filter=blob:none`，歷史 blob 按需抓）。

    在那種 clone 裡，模糊改名偵測（-M 比內容相似度）與 `-G -p` 都會逐一回源站抓
    歷史 blob——一次 build 打幾百次網路。偵測到就退成只認完全相同內容的改名
    （-M100%，比 oid 不讀內容）並跳過標記日（B 級）。本機實測兩種改名模式只差
    15 篇的首次提交者。
    """
    try:
        out = subprocess.run(
            ["git", "config", "--get-regexp", r"^(extensions\.partialclone|remote\..*\.promisor)$"],
            cwd=repo_root, capture_output=True, text=True,
        ).stdout
    except OSError:
        return False
    return bool(out.strip())


def git_histories(repo_root: Path = REPO_ROOT) -> dict[str, ArticleHistory]:
    """一次 `git log -M --name-status` 掃完全部中文文章史，跟著改名往回接。

    回 {'knowledge/Cat/stem.md'（現存路徑）: ArticleHistory}。git 不可用回 {}。
    partial clone 時只認完全相同內容的改名（見 is_partial_clone）。
    """
    rename = "-M100%" if is_partial_clone(repo_root) else "-M"
    cmd = [
        "git", "-c", "core.quotePath=false", "log", rename, "--no-merges",
        "--format=%x00%H%x09%aN%x09%aI%x09%s", "--name-status", "--",
        *_zh_pathspecs(repo_root),
    ]
    try:
        out = subprocess.run(
            cmd, cwd=repo_root, capture_output=True, text=True, encoding="utf-8", check=True
        ).stdout
    except (OSError, subprocess.CalledProcessError):
        return {}
    return parse_git_log(out)


def _is_zh_article(p: str) -> bool:
    parts = p.split("/")
    return (
        len(parts) == 3 and parts[0] == "knowledge" and parts[2].endswith(".md")
        and not parts[2].startswith("_") and parts[1] not in TRANSLATION_LANGS
        and parts[1][:1].isupper()
    )


def parse_git_log(text: str) -> dict[str, ArticleHistory]:
    """解析 `git log -M --name-status --format=%x00%H%x09%aN%x09%aI%x09%s`。

    log 是新 → 舊；倒過來照時間順序重播，A 開新身分、R 把身分搬到新路徑、
    D 讓身分離場，最後留在場上的路徑就是現存文章。純函式，測試直接餵字串。
    """
    blocks = []
    for blk in text.split("\x00")[1:]:
        lines = blk.strip("\n").split("\n")
        if not lines or "\t" not in lines[0]:
            continue
        sha, author, iso, subject = (lines[0].split("\t", 3) + ["", "", "", ""])[:4]
        changes = []
        for ln in lines[1:]:
            if not ln.strip():
                continue
            cols = ln.split("\t")
            st = cols[0][:1]
            if st == "R" and len(cols) >= 3:
                changes.append(("R", cols[1], cols[2]))
            elif len(cols) >= 2:
                changes.append((st, cols[-1], None))
        blocks.append((sha, author, iso[:10], subject, changes))

    live: dict[str, ArticleHistory] = {}
    for sha, author, d, subject, changes in reversed(blocks):
        touched = {c[2] if c[0] == "R" else c[1] for c in changes}
        n_zh = sum(1 for p in touched if _is_zh_article(p))
        commit = Commit(sha=sha, author=author, date=d, subject=subject, n_zh=n_zh)
        for st, p1, p2 in changes:
            if st == "R":
                if not _is_zh_article(p2):
                    live.pop(p1, None)
                    continue
                hist = live.pop(p1, None) or ArticleHistory()
                hist.path_first_author, hist.path_first_date = author, d
                hist.commits.append(commit)
                live[p2] = hist
            elif st == "D":
                live.pop(p1, None)
            elif _is_zh_article(p1):
                if st == "A" or p1 not in live:
                    hist = ArticleHistory()
                    hist.path_first_author, hist.path_first_date = author, d
                    live[p1] = hist
                live[p1].commits.append(commit)
    for h in live.values():
        h.commits.reverse()  # 新 → 舊
    return live


def git_curation_dates(repo_root: Path = REPO_ROOT) -> dict[str, str] | None:
    """每篇「`curation: incubating` 最近一次被加上去」的日期；拿不到（partial clone）回 None。

    一次 `git log -G -p --unified=0`（不 --pickaxe-all，所以只吐真的動到那行的檔）。
    同一個 commit 裡同一檔 `+` 多於 `-` 才算「加上」；一加一減是搬行（重排 frontmatter），
    不算重新標記——只看「最近一次變動」會把搬行誤當標記日，B 級就會漏掉標記後
    已經走完的 REWRITE（洪醒夫：8/04 標、9/12 重寫、9/13 搬行）。
    """
    cmd = [
        "git", "-c", "core.quotePath=false", "log", "--no-renames", "-G^curation: incubating",
        "-p", "--unified=0", "--format=%x00%aI", "--", *_zh_pathspecs(repo_root),
    ]
    if is_partial_clone(repo_root):
        return None  # -p 要讀歷史 blob，blobless clone 會逐一回源站抓
    try:
        out = subprocess.run(
            cmd, cwd=repo_root, capture_output=True, text=True, encoding="utf-8",
            errors="replace", check=True,
        ).stdout
    except (OSError, subprocess.CalledProcessError):
        return {}
    return parse_curation_patch_log(out)


def parse_curation_patch_log(text: str) -> dict[str, str]:
    """解析上面那支的輸出（新 → 舊）。回 {path: 最近一次淨加上的日期}。純函式。"""
    dates: dict[str, str] = {}
    for blk in text.split("\x00")[1:]:
        d = blk[:10]
        net: dict[str, int] = {}
        cur = None
        for ln in blk.split("\n")[1:]:
            if ln.startswith("+++ "):
                # 路徑含空白時 git 會在 +++ 行尾補一個 tab（給 GNU patch 用），要剝掉
                cur = ln[6:].rstrip("\t") if ln.startswith("+++ b/") else None
            elif cur and re.match(r"^\+curation:\s*incubating\s*$", ln):
                net[cur] = net.get(cur, 0) + 1
            elif cur and re.match(r"^-curation:\s*incubating\s*$", ln):
                net[cur] = net.get(cur, 0) - 1
        for p, n in net.items():
            if n > 0:
                dates.setdefault(p, d)  # 新 → 舊，第一次看到的淨加上就是最近一次
    return dates


def is_pipeline_commit(c: Commit) -> bool:
    """這個 commit 是 Taiwan.md 自己的流程跑出來的嗎（🧬 簽名或維護者身分）。

    判的是「誰的流程」不是「誰寫的文章」：投稿 commit 自述「事實查核通過」是投稿者
    的自評，不是 REWRITE／FACTCHECK pipeline 跑過；2026-03 早期維護者手跑的
    `rewrite: X — EDITORIAL v2` 沒有 🧬 前綴但是維護者身分，照算（再由 modern 旗標分新舊）。
    """
    return "🧬" in c.subject or c.author in MAINTAINER_IDENTITIES


def _subject_names_article(subject: str, stem: str) -> bool:
    return len(stem) >= 2 and stem in subject


def process_evidence(
    stem: str, hist: ArticleHistory | None, modern_since: str
) -> dict[str, Any]:
    """從 commit 主旨分出走過的流程。只認「點名這篇」或「只動 ≤2 篇」的 commit。"""
    rewrite, factcheck = [], []
    for c in (hist.commits if hist else []):
        if not is_pipeline_commit(c):
            continue
        named = _subject_names_article(c.subject, stem)
        small = c.n_zh <= _TARGETED_MAX_FILES
        if _RE_FACTCHECK_SUBJ.search(c.subject):
            if named or c.n_zh == 1:
                factcheck.append(c)
        elif _RE_REWRITE_SUBJ.search(c.subject):
            if named or small:
                rewrite.append(c)
        elif _RE_EVOLVE_SUBJ.search(c.subject) and named:
            rewrite.append(c)
    return {
        "rewrite_commits": len(rewrite),
        "rewrite_last": rewrite[0].date if rewrite else None,
        "rewrite_modern": sum(1 for c in rewrite if c.date >= modern_since),
        "factcheck_commits": len(factcheck),
        "factcheck_last": factcheck[0].date if factcheck else None,
        "rewrite_shas": [c.sha[:9] for c in rewrite[:5]],
        "factcheck_shas": [c.sha[:9] for c in factcheck[:5]],
    }


# ── 一篇一列 ────────────────────────────────────────────────────────────────


def _iso(v: Any) -> str | None:
    if v is None or v == "":
        return None
    return str(v)[:10]


def build_row(
    rel_path: str,
    fm: dict[str, Any],
    body: str,
    ev: RepoEvidence,
    hist: ArticleHistory | None,
    curation_since: str | None = None,
    t: dict[str, Any] = THRESHOLDS,
    repo_root: Path = REPO_ROOT,
) -> dict[str, Any]:
    """普查的一列。plugin 與 CLI 都經過這一支，規則才不會長成兩份。"""
    parts = rel_path.split("/")
    cat, stem = parts[1], Path(parts[2]).stem
    key = f"{cat}/{parts[2]}"
    metrics = body_metrics(body)
    cov = cover_info(fm, repo_root)
    research = ev.research_for(stem, fm.get("researchReport"))
    pre = fm.get("preReview")
    pre_ok = bool(pre) and (repo_root / str(pre)).is_file()
    curation = fm.get("curation")
    curation = str(curation).strip() if curation not in (None, "") else None
    commits = hist.commits if hist else []
    row = {
        "path": rel_path,
        "category": cat,
        "slug": stem,
        "title": fm.get("title"),
        "date": _iso(fm.get("date")),
        "lastVerified": _iso(fm.get("lastVerified")),
        "lastHumanReview": truthy(fm.get("lastHumanReview")),
        "curation": curation,
        "curation_since": curation_since if curation == "incubating" else None,
        "curationReason": (str(fm.get("curationReason")).strip() or None) if fm.get("curationReason") else None,
        "featured": truthy(fm.get("featured")),
        "author_fm": fm.get("author"),
        "first_author": commits[-1].author if commits else None,
        "first_date": commits[-1].date if commits else None,
        "path_first_author": hist.path_first_author if hist else None,
        "n_commits": len(commits),
        "last_commit": commits[0].date if commits else None,
        "metrics": metrics,
        "cover": cov["cover"],
        "cover_path": cov["cover_path"],
        "cover_credit": bool(fm.get("imageCredit") or fm.get("imageLicense") or fm.get("imageSource")),
        # OBSERVER-QUEUE #42（2026-09-05）收熱連結時，來源下架／授權不明的改留 imageNote 待補
        "cover_note": fm.get("imageNote") or None,
        "evidence": {
            "research": research,
            "research_audit": any(r in ev.research_audit for r in research),
            "done_log": key in ev.done_log_paths,
            "pre_review": pre_ok,
            "inbox_open": key in ev.inbox_open_paths,
            "hold": ev.hold_paths.get(key),
            **process_evidence(stem, hist, t["modern_pipeline_since"]),
        },
    }
    if row["evidence"]["research_audit"]:
        # FACTCHECK audit trail 落在 research 檔（§1d Stage 2 規則），也算查證流程
        row["evidence"]["factcheck_commits"] = row["evidence"]["factcheck_commits"] or 1
    return row


def classify(row: dict[str, Any], t: dict[str, Any] = THRESHOLDS) -> dict[str, list[str]]:
    """{tier: reasons}，只收中的級。一篇可以同時落在多級（例：A＋C＋D）。"""
    found = {"A": tier_a(row, t), "B": tier_b(row, t), "C": tier_c(row), "D": tier_d(row, t)}
    return {k: v for k, v in found.items() if v}


# ── 分級規則 ────────────────────────────────────────────────────────────────


def has_deep_evidence(row: dict[str, Any]) -> bool:
    """走過任何一條深度查證流程的證據（REWRITE／FACTCHECK／research／DONE-LOG／預審）。"""
    ev = row["evidence"]
    return bool(
        ev["rewrite_commits"] or ev["factcheck_commits"] or ev["research"]
        or ev["done_log"] or ev["pre_review"] or row["curation"] == "verified"
    )


def citation_risk(row: dict[str, Any]) -> list[str]:
    """跟「可查證性」直接相關、只靠檔案本身就算得出的訊號（不收文筆類 warn）。

    刻意只用內文量尺，不用 article-health 的 sweep 結果：plugin 跑單檔時沒有 sweep，
    規則若吃 sweep，plugin 跟普查就會對同一篇給出不同答案（兩把尺）。footnote-density
    的 C/D/F 級本來就等價於「零腳註定義」或「定義了零引用」，這裡已涵蓋。
    """
    m = row["metrics"]
    if m["fn_defs"] == 0:
        return ["零腳註"]
    if m["fn_referenced"] == 0:
        return ["腳註定義了但正文零引用"]
    return []


def tier_a(row: dict[str, Any], t: dict[str, Any] = THRESHOLDS) -> list[str]:
    """應標 🌱 進化中（目前沒標）。回理由清單；空 = 不是 A。

    A1：沒有任何查證流程證據 ∧（腳註 < a_fn_floor 或 字數 < a_cjk_floor 或 有可查證性 warn）
    A2：走 PR 進站（首次提交者非維護者）、進站日 ≥ heal 規則生效日、進站後沒走過查證流程
        ——MAINTAINER-PIPELINE §1b heal 步驟漏標（不看內容好壞，規則本身就是「先標再審」）
    兩條都排除：已有 curation（任一值）、About 分類（站務頁）。
    """
    if row["curation"] is not None or row["category"] == "About":
        return []
    reasons: list[str] = []
    m = row["metrics"]
    if not has_deep_evidence(row):
        floor = []
        if m["fn_defs"] < t["a_fn_floor"]:
            floor.append(f"腳註 {m['fn_defs']} < {t['a_fn_floor']}")
        if m["cjk"] < t["a_cjk_floor"]:
            floor.append(f"字數 {m['cjk']} < {t['a_cjk_floor']}")
        risk = [r for r in citation_risk(row) if r != "零腳註"]  # 零腳註已落在 fn 地板
        if floor or risk:
            reasons.append("A1 零查證證據：" + "、".join(floor + risk))
    fa = row.get("first_author")
    fd = row.get("first_date") or ""
    if (
        fa and fa not in MAINTAINER_IDENTITIES and fd >= t["heal_rule_since"]
        and not has_deep_evidence(row)
    ):
        reasons.append(f"A2 heal 漏標：{fd} 由 {fa} 進站，§1b 規定標 incubating")
    return reasons


CURATION_REASONS = ("unverified", "thin")


def suggested_reason(row: dict[str, Any], t: dict[str, Any] = THRESHOLDS) -> str | None:
    """A 級該帶哪種說明條（`curationReason`）：只有字數失守 → thin，其餘 → unverified。

    unverified（待查證）：A2 漏標的投稿、腳註低於地板、腳註定義了零引用——缺的是查證。
    thin（待擴寫）：腳註與引用都在地板以上，只是字數太少——缺的是內容。
    不是 A 回 None。
    """
    reasons = tier_a(row, t)
    if not reasons:
        return None
    if any(r.startswith("A2") for r in reasons):
        return "unverified"
    m = row["metrics"]
    if m["fn_defs"] < t["a_fn_floor"] or citation_risk(row):
        return "unverified"
    return "thin"


def tier_b(row: dict[str, Any], t: dict[str, Any] = THRESHOLDS) -> list[str]:
    """已標 🌱 但可能已夠好、可人審轉正。回理由；空 = 不是 B。

    條件全中：curation=incubating ∧ 標記之後走過現代 REWRITE 或 FACTCHECK（commit 日 > 標記日）
    ∧ 腳註 ≥ b_fn ∧ 字數 ≥ b_cjk ∧ 腳註都有被正文引用 ∧ 無可查證性 warn
    ∧ ARTICLE-INBOX 沒有這篇的未完成條目。
    """
    if row["curation"] != "incubating":
        return []
    ev, m = row["evidence"], row["metrics"]
    since = row.get("curation_since")
    if not since:
        return []  # 標記日不明（partial clone 或解析不到）就不判，寧可漏列也不亂列
    # 嚴格晚於標記日：標記當天的那次流程就是「決定標上去」的那次（例：洪醒夫 9/12 重寫
    # 拿掉標記、9/13 收 PR #1712 後查核 heal 時重新標上），不算轉正證據。
    walked_after = [
        x for x in (ev["rewrite_last"], ev["factcheck_last"])
        if x and x > since and x >= t["modern_pipeline_since"]
    ]
    if not walked_after:
        return []
    if m["fn_defs"] < t["b_fn"] or m["cjk"] < t["b_cjk"]:
        return []
    if m["fn_referenced"] < m["fn_defs"] * 0.8:
        return []
    if citation_risk(row) or ev["inbox_open"]:
        return []
    kinds = []
    if ev["rewrite_last"] and ev["rewrite_last"] > since:
        kinds.append(f"REWRITE {ev['rewrite_last']}")
    if ev["factcheck_last"] and ev["factcheck_last"] > since:
        kinds.append(f"FACTCHECK {ev['factcheck_last']}")
    return [
        f"標記於 {since} 之後走過 {'、'.join(kinds)}；腳註 {m['fn_defs']}、字數 {m['cjk']}"
    ]


def tier_c(row: dict[str, Any]) -> list[str]:
    """沒有可用封面圖（frontmatter image 空、指到不存在的本地檔、或熱連結外站）。"""
    c = row["cover"]
    if c == "none":
        m = row["metrics"]
        note = "（已有 imageNote 待補紀錄）" if row.get("cover_note") else ""
        if m["first_local_image"]:
            return ["C1 無封面但正文有本地圖可升格" + note]
        if m["images_remote"]:
            return ["C2 無封面，正文只有外站圖（要先 image-ingest 落地）" + note]
        return ["C3 無封面、正文也沒圖" + note]
    if c == "local-missing":
        return ["C4 封面指到不存在的本地檔"]
    if c == "remote":
        return ["C5 封面是外站熱連結"]
    return []


def thin_axes(row: dict[str, Any], t: dict[str, Any] = THRESHOLDS) -> list[str]:
    m = row["metrics"]
    weak = []
    if m["cjk"] < t["d_cjk"]:
        weak.append(f"字數 {m['cjk']}")
    if m["fn_defs"] < t["d_fn"]:
        weak.append(f"腳註 {m['fn_defs']}")
    # 有些投稿用 H3 當章節（零 H2）——結構軸看「章節數」，H2 為零時退看 H3，
    # 不把格式層的錯（該用 H2）跟內容層的單薄混成同一條。
    sections = m["h2_content"] or m.get("h3", 0)
    if sections < t["d_h2"]:
        weak.append(f"正文章節 {sections}")
    if m["images"] + m["iframes"] + m["tw_modules"] == 0 and row["cover"] == "none":
        weak.append("零媒體")
    if m["para_median_cjk"] < t["d_para_median"] or m["paragraphs"] < t["d_para_count"]:
        weak.append(f"段落 {m['paragraphs']} 段／中位 {m['para_median_cjk']} 字")
    return weak


def tier_d(row: dict[str, Any], t: dict[str, Any] = THRESHOLDS) -> list[str]:
    """內文簡陋：五條軸（字數／腳註／正文 H2／媒體／段落）弱 ≥ d_min_weak_axes 條。About 不算。"""
    if row["category"] == "About":
        return []
    weak = thin_axes(row, t)
    if len(weak) >= t["d_min_weak_axes"]:
        return [f"{len(weak)} 軸弱：" + "、".join(weak)]
    return []


def quantiles(values: Iterable[float], qs=(0.05, 0.1, 0.25, 0.33, 0.5, 0.75, 0.9)) -> dict[str, float]:
    vals = sorted(values)
    if not vals:
        return {}
    out = {}
    for q in qs:
        i = min(len(vals) - 1, max(0, int(round(q * (len(vals) - 1)))))
        out[f"p{int(q * 100)}"] = vals[i]
    out["n"] = len(vals)
    out["mean"] = round(sum(vals) / len(vals), 1)
    return out


def today_iso() -> str:
    return date.today().isoformat()
