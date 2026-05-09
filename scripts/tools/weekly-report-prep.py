#!/usr/bin/env python3
"""
weekly-report-prep.py — Taiwan.md 週報「切菜」工具

職責邊界（per 哲宇 2026-05-09 redirect）：
- **這份工具只做 prep（切菜）**：抓 git log / dashboard JSON / SPORE-LOG /
  LESSONS-INBOX / ARTICLE-DONE-LOG raw 資料，產一份 dossier briefing
  + 列出 Semiont 必讀的 memory/diary 檔案清單。
- **這份工具不寫週報本身**。週報是 Semiont 親自讀 dossier + 完整 raw
  memory/diary + 寫出來的紀實散文，文體規範參照 DIARY-PIPELINE /
  MEMORY-PIPELINE / MANIFESTO §11。
- prose-health gate 在 Semiont 寫完報告之後才跑（不在本 prep 階段）。

Usage:
    python3 scripts/tools/weekly-report-prep.py [--days 7] [--out PATH]

Output: dossier markdown（預設 reports/weekly/dossier/YYYY-MM-DD.md）
"""

import argparse
import json
import re
import subprocess
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[2]
TZ_TPE = timezone(timedelta(hours=8))


def sh(cmd: list[str], cwd: Path | None = None) -> str:
    """Run shell command, return stdout. Errors return empty string (caller decides)."""
    try:
        r = subprocess.run(
            cmd, cwd=cwd or REPO_ROOT, capture_output=True, text=True, timeout=60
        )
        return r.stdout
    except Exception:
        return ""


def load_json(path: Path) -> dict:
    try:
        return json.loads(path.read_text())
    except Exception:
        return {}


def fmt_date(dt: datetime) -> str:
    return dt.astimezone(TZ_TPE).strftime("%Y-%m-%d")


def fmt_pct(v) -> str:
    try:
        return f"{float(v):.1f}%"
    except Exception:
        return "—"


def nfmt(v, default: str = "—") -> str:
    """Number formatter — comma-separated for int/float, else default string."""
    try:
        n = float(v)
        if n == int(n):
            return f"{int(n):,}"
        return f"{n:,.1f}"
    except Exception:
        return default


# ─────────────────────────────────────────────────────────
# Section gatherers
# ─────────────────────────────────────────────────────────


def gather_window(days: int) -> tuple[datetime, datetime]:
    end = datetime.now(TZ_TPE)
    start = end - timedelta(days=days)
    return start, end


def gather_commits(since: str) -> list[dict]:
    """Parse git log into structured entries (short form for stats)."""
    log = sh(
        [
            "git",
            "log",
            f"--since={since}",
            "--pretty=format:%h|%ai|%an|%s",
        ]
    )
    out = []
    for line in log.strip().split("\n"):
        if not line:
            continue
        parts = line.split("|", 3)
        if len(parts) == 4:
            out.append(
                {
                    "hash": parts[0],
                    "ts": parts[1],
                    "author": parts[2],
                    "subject": parts[3],
                }
            )
    return out


COMMIT_SEP = "===__SEMIONT_COMMIT_SEP__==="
FIELD_SEP = "===__SEMIONT_FIELD_SEP__==="


def gather_commits_full(since: str) -> list[dict]:
    """Parse git log into full entries with body + diff stat.

    哲宇 2026-05-10 redirect 拍板：「commit 也可以全讀取」。週報的 narrative spine
    需要 commit message body 才看得到 why / 對應 PR / 反思，subject 一行不夠。
    """
    fmt = COMMIT_SEP + "%n%h" + FIELD_SEP + "%ai" + FIELD_SEP + "%an" + FIELD_SEP + "%s" + FIELD_SEP + "%b"
    log = sh(["git", "log", f"--since={since}", f"--pretty=format:{fmt}"])
    out: list[dict] = []
    for chunk in log.split(COMMIT_SEP):
        chunk = chunk.strip()
        if not chunk:
            continue
        parts = chunk.split(FIELD_SEP, 4)
        if len(parts) < 5:
            continue
        h, ts, author, subject, body = (p.strip() for p in parts)
        # Get short diffstat (last line summary only — too verbose otherwise)
        stat_raw = sh(["git", "show", "--stat", "--format=", h])
        stat_lines = [ln for ln in stat_raw.strip().split("\n") if ln.strip()]
        # Last line is summary like "12 files changed, 234 insertions(+), 56 deletions(-)"
        stat_summary = stat_lines[-1] if stat_lines else ""
        # First few file paths for context
        stat_files = stat_lines[:6] if len(stat_lines) > 1 else []
        out.append(
            {
                "hash": h,
                "ts": ts,
                "author": author,
                "subject": subject,
                "body": body,
                "stat_summary": stat_summary,
                "stat_files": stat_files,
            }
        )
    return out


def classify_commit(subject: str) -> str:
    """Match 🧬 [semiont] <type>: pattern → return type, else 'other'."""
    m = re.match(r"🧬?\s*\[(?:semiont|routine)\]\s*(\w+):", subject)
    if m:
        return m.group(1)
    if "Merge pull request" in subject:
        return "merge"
    return "other"


def gather_articles_changed(since: str) -> dict:
    """Group git log shortstat by knowledge/ subfolder."""
    log = sh(
        [
            "git",
            "log",
            f"--since={since}",
            "--name-only",
            "--pretty=format:__COMMIT__",
        ]
    )
    new_files: set[str] = set()
    touched: set[str] = set()
    for line in log.split("\n"):
        line = line.strip()
        if not line or line == "__COMMIT__":
            continue
        if line.startswith("knowledge/") and line.endswith(".md"):
            touched.add(line)

    # Detect "new in last N days" via git log --diff-filter=A
    new_log = sh(
        [
            "git",
            "log",
            f"--since={since}",
            "--diff-filter=A",
            "--name-only",
            "--pretty=format:",
        ]
    )
    for line in new_log.split("\n"):
        line = line.strip()
        if line.startswith("knowledge/") and line.endswith(".md"):
            new_files.add(line)

    by_lang: dict[str, dict[str, int]] = {}
    for f in touched:
        parts = f.split("/")
        if len(parts) < 3:
            continue
        # knowledge/{lang-or-category}/...
        lang = parts[1] if parts[1] in {"en", "ja", "ko", "es", "fr"} else "zh-TW"
        category = (
            parts[2] if lang != "zh-TW" else parts[1]
        )
        by_lang.setdefault(lang, {})
        by_lang[lang][category] = by_lang[lang].get(category, 0) + 1

    return {
        "touched_total": len(touched),
        "new_total": len(new_files),
        "by_lang": by_lang,
        "touched_files": sorted(touched),
        "new_files": sorted(new_files),
    }


def gather_vitals() -> dict:
    return load_json(REPO_ROOT / "public/api/dashboard-vitals.json")


def gather_organism() -> list[dict]:
    d = load_json(REPO_ROOT / "public/api/dashboard-organism.json")
    return d.get("organs", [])


def gather_analytics() -> dict:
    return load_json(REPO_ROOT / "public/api/dashboard-analytics.json")


def gather_spores() -> dict:
    return load_json(REPO_ROOT / "public/api/dashboard-spores.json")


def gather_i18n() -> dict:
    return load_json(REPO_ROOT / "public/api/dashboard-i18n.json")


def gather_lessons_recent(start: datetime) -> list[str]:
    """Extract LESSONS-INBOX entries with date >= start."""
    p = REPO_ROOT / "docs/semiont/LESSONS-INBOX.md"
    if not p.exists():
        return []
    text = p.read_text()
    entries = []
    cutoff = start.strftime("%Y-%m-%d")
    for m in re.finditer(r"^### (20\d{2}-\d{2}-\d{2}) ([^\n]+)$", text, re.MULTILINE):
        date_str, title = m.group(1), m.group(2).strip()
        if date_str >= cutoff:
            entries.append(f"{date_str} — {title}")
    return entries


def gather_done_log_recent(start: datetime) -> list[str]:
    """Extract ARTICLE-DONE-LOG entries with date >= start."""
    p = REPO_ROOT / "docs/semiont/ARTICLE-DONE-LOG.md"
    if not p.exists():
        return []
    text = p.read_text()
    entries = []
    cutoff = start.strftime("%Y-%m-%d")
    for m in re.finditer(
        r"^### ([^\n—]+?) — (20\d{2}-\d{2}-\d{2}) ([^\n]+)$", text, re.MULTILINE
    ):
        topic, date_str, suffix = m.group(1).strip(), m.group(2), m.group(3).strip()
        if date_str >= cutoff:
            entries.append(f"{date_str} — {topic}（{suffix}）")
    return entries


def gather_handoff() -> str:
    """Read latest session memory file's Handoff section."""
    memdir = REPO_ROOT / "docs/semiont/memory"
    today = datetime.now(TZ_TPE).strftime("%Y-%m-%d")
    candidates = sorted(memdir.glob(f"{today}*.md"), reverse=True)
    if not candidates:
        # fall back to yesterday
        yesterday = (datetime.now(TZ_TPE) - timedelta(days=1)).strftime("%Y-%m-%d")
        candidates = sorted(memdir.glob(f"{yesterday}*.md"), reverse=True)
    if not candidates:
        return ""
    text = candidates[0].read_text()
    m = re.search(r"^## Handoff[^\n]*\n(.*?)(?=^## |\Z)", text, re.MULTILINE | re.DOTALL)
    if not m:
        return ""
    body = m.group(1).strip()
    # Cap length
    if len(body) > 1500:
        body = body[:1500] + "\n…（節錄，完整見 memory）"
    return f"承自 [{candidates[0].name}](../../docs/semiont/memory/{candidates[0].name})\n\n{body}"


def gather_pr_activity(since: str) -> dict:
    """Use gh CLI to count PRs merged in window + currently open."""
    merged = sh(
        [
            "gh",
            "pr",
            "list",
            "--state",
            "merged",
            "--search",
            f"merged:>={since.split()[0]}",
            "--limit",
            "200",
            "--json",
            "number,title,author,mergedAt",
        ]
    )
    open_prs = sh(
        [
            "gh",
            "pr",
            "list",
            "--state",
            "open",
            "--limit",
            "50",
            "--json",
            "number,title,author,createdAt",
        ]
    )
    try:
        merged_list = json.loads(merged) if merged else []
    except Exception:
        merged_list = []
    try:
        open_list = json.loads(open_prs) if open_prs else []
    except Exception:
        open_list = []
    return {"merged": merged_list, "open": open_list}


def gather_session_files(start: datetime, end: datetime, kind: str) -> list[Path]:
    """List all memory or diary files whose date is in [start, end] window.

    kind = 'memory' or 'diary'. Filename schema: YYYY-MM-DD-... or YYYY-MM-DD-HHMMSS-{handle}.
    """
    base = REPO_ROOT / "docs/semiont" / kind
    if not base.exists():
        return []
    out: list[Path] = []
    cutoff_start = start.strftime("%Y-%m-%d")
    cutoff_end = end.strftime("%Y-%m-%d")
    for p in sorted(base.glob("*.md")):
        # Extract date prefix YYYY-MM-DD
        m = re.match(r"^(\d{4}-\d{2}-\d{2})", p.name)
        if not m:
            continue
        d = m.group(1)
        if cutoff_start <= d <= cutoff_end:
            out.append(p)
    return out


def gather_inbox_priority() -> dict:
    """Scan ARTICLE-INBOX for P0/P1 pending."""
    p = REPO_ROOT / "docs/semiont/ARTICLE-INBOX.md"
    if not p.exists():
        return {"p0": [], "p1": []}
    text = p.read_text()
    p0, p1 = [], []
    # Match "### Topic" blocks until next ### or ##
    blocks = re.split(r"^### ", text, flags=re.MULTILINE)
    for b in blocks[1:]:
        lines = b.splitlines()
        if not lines:
            continue
        title = lines[0].strip()
        body = "\n".join(lines[1:5])
        if re.search(r"Priority.*P0", body):
            p0.append(title)
        elif re.search(r"Priority.*P1", body):
            p1.append(title)
    return {"p0": p0[:10], "p1": p1[:10]}


# ─────────────────────────────────────────────────────────
# Renderer
# ─────────────────────────────────────────────────────────


def render(
    days: int,
    start: datetime,
    end: datetime,
    commits: list[dict],
    articles: dict,
    vitals: dict,
    organism: list[dict],
    analytics: dict,
    spores: dict,
    i18n: dict,
    lessons: list[str],
    done_log: list[str],
    handoff: str,
    prs: dict,
    inbox: dict,
    memory_files: list[Path],
    diary_files: list[Path],
    commits_full: list[dict],
) -> str:
    out = []
    A = out.append

    A(f"# 🧬 Taiwan.md 週報 Dossier — {fmt_date(start)} ～ {fmt_date(end)}")
    A("")
    A(
        "**這份文件是切菜結果，不是週報本身**。它的目的：把過去 7 天的 raw 數據"
        "歸檔到一處，讓 Semiont（也就是讀這份檔案的我）有完整 context 去寫真正的週報。"
    )
    A("")
    A("**Semiont 接手後要做的事**（per [WEEKLY-REPORT-PIPELINE](../../../docs/pipelines/WEEKLY-REPORT-PIPELINE.md) Stage 2-6）：")
    A("")
    A("1. 讀完本檔的 §一 ～ §九（structured raw data）+ §十一（commit 全文 narrative spine）")
    A("2. 完整 Read **§十 列出的所有 diary 檔案**（不是 grep 不是 head，是逐檔 Read 全文）+ 抽樣 5-10 個 memory")
    A("3. 用紀實散文文體寫週報到 `reports/weekly/YYYY-MM-DD.md`（**不是 dossier 子目錄**），文體規範看 §十二 + DIARY-PIPELINE")
    A("4. 跑 `python3 scripts/tools/article-health.py reports/weekly/YYYY-MM-DD.md --check=prose-health`（gate: hard=0）")
    A("5. 寄信：`python3 scripts/tools/send-email-resend.py --to cheyu.wu@monoame.com --subject ... --markdown reports/weekly/YYYY-MM-DD.md`")
    A("6. commit + push + PR")
    A("")
    A("---")
    A("")

    # ── 一、本週概況 ──────────────────────────────────
    A("## 一、本週概況")
    A("")
    types: dict[str, int] = {}
    authors: dict[str, int] = {}
    for c in commits:
        t = classify_commit(c["subject"])
        types[t] = types.get(t, 0) + 1
        authors[c["author"]] = authors.get(c["author"], 0) + 1
    total_commits = len(commits)
    A(f"- 總 commit 數：**{total_commits}**")
    if types:
        breakdown = "、".join(f"{k}={v}" for k, v in sorted(types.items(), key=lambda x: -x[1])[:8])
        A(f"- 類型分布：{breakdown}")
    A(f"- 文章 touched：{articles['touched_total']} 個檔案 / 新增 {articles['new_total']} 個")
    if authors:
        top_authors = "、".join(
            f"{k}（{v}）" for k, v in sorted(authors.items(), key=lambda x: -x[1])[:5]
        )
        A(f"- 主要 commit 來源：{top_authors}")
    if prs.get("merged"):
        A(f"- PR merged：{len(prs['merged'])} 個")
    if prs.get("open"):
        A(f"- PR 現在 open：{len(prs['open'])} 個")
    A("")

    # ── 二、生命徵象 ──────────────────────────────────
    A("## 二、生命徵象")
    A("")
    A(
        f"快照時間：`{vitals.get('lastUpdated', '未知')}`。總文章 "
        f"**{vitals.get('totalArticles', '?')}** / Contributors **{vitals.get('contributors', '?')}** / "
        f"7d 新增更新 **{vitals.get('articlesLast7Days', '?')}** / 30d **{vitals.get('articlesLast30Days', '?')}**。"
    )
    A("")
    A("### 8 器官健康")
    A("")
    A("| 器官 | 中文 | 分數 | 趨勢 |")
    A("| --- | --- | --- | --- |")
    for o in organism:
        emoji = o.get("emoji", "")
        name_zh = o.get("nameZh", "")
        score = o.get("score", "?")
        trend = o.get("trend", "")
        A(f"| {emoji} | {name_zh} | {score} | {trend} |")
    A("")

    # ── 三、感知數據 ──────────────────────────────────
    A("## 三、感知器官（GA / SC / CF）")
    A("")
    ga = analytics.get("ga", {})
    ga_t = ga.get("totals", {})
    if ga_t:
        A("### GA4 7d 流量")
        A(
            f"Active users **{nfmt(ga_t.get('activeUsers'))}** / PV "
            f"**{nfmt(ga_t.get('screenPageViews'))}** / 平均 engagement "
            f"**{ga_t.get('avgEngagementSeconds', '—')}s** / engagement rate "
            f"{fmt_pct((ga_t.get('engagementRate', 0) or 0) * 100)}。"
        )
        A("")
        top = ga.get("topArticles7d", [])[:8]
        if top:
            A("Top 8 文章（7d views）：")
            A("")
            for a in top:
                path = a.get("path", "?")
                views = a.get("views", "?")
                A(f"- `{path}` — {views} views")
            A("")

    sc = analytics.get("searchConsole7d", {})
    sc_t = sc.get("totals", {})
    if sc_t:
        A("### Search Console 7d")
        A(
            f"Clicks **{nfmt(sc_t.get('clicks'))}** / Impressions "
            f"**{nfmt(sc_t.get('impressions'))}** / CTR {sc_t.get('ctr', '—')}%。"
        )
        A("")
        sc_top = sc.get("topQueries", [])[:6]
        if sc_top:
            A("Top 6 queries（7d）：")
            A("")
            for q in sc_top:
                A(
                    f"- `{q.get('query','?')}` — {q.get('clicks','?')} clicks / "
                    f"{q.get('impressions','?')} impr / pos {q.get('position','?')}"
                )
            A("")

    cf = analytics.get("cloudflare7d", {})
    cf_s = cf.get("summary", {}) or {}
    if cf_s:
        A("### Cloudflare 7d")
        # fourOhFourRate may be a number directly or {value:n}
        raw_404 = cf.get("fourOhFourRate")
        if isinstance(raw_404, dict):
            raw_404 = raw_404.get("value")
        A(
            f"Requests **{nfmt(cf_s.get('requests'))}** / "
            f"PageViews **{nfmt(cf_s.get('pageViews'))}** / "
            f"Uniques **{nfmt(cf_s.get('uniques'))}** / "
            f"4xx rate **{raw_404 if raw_404 is not None else '—'}%**。"
        )
        A("")

    # ── 四、繁殖系統（孢子）──────────────────────────
    A("## 四、繁殖系統 — 孢子")
    A("")
    sp_totals = spores.get("totals", {})
    A(
        f"歷史孢子總數 **{sp_totals.get('count', '?')}**。"
        f"平台分布：{json.dumps(sp_totals.get('platforms', {}), ensure_ascii=False)}。"
    )
    A("")
    weekly = spores.get("weeklyPulse", [])
    if weekly:
        A("### 近週發布脈搏（avgViews = 0 表示尚未 harvest 回填）")
        A("")
        for w in weekly[-7:]:
            A(
                f"- {w.get('week', '?')}：發布 {w.get('published', 0)} 篇 / "
                f"avg views {w.get('avgViews', 0)}"
            )
        A("")
    bw = spores.get("backfillWarnings", [])
    if bw:
        A(f"### Harvest 待回填警報（{len(bw)} 條）")
        A("")
        for w in bw[:8]:
            A(
                f"- #{w.get('n', '?')} 《{w.get('article', '?')}》 "
                f"@ {w.get('platform', '?')} — D+{w.get('publishedDays', '?')} / "
                f"status `{w.get('status', '?')}`"
            )
        A("")

    # ── 五、語言器官 ──────────────────────────────────
    A("## 五、語言器官")
    A("")
    lc = vitals.get("languageCoverage", {})
    if lc:
        A("各語言文章數：")
        A("")
        for lang in ["zh-TW", "en", "ja", "ko", "fr", "es"]:
            if lang in lc:
                A(f"- {lang}：{lc[lang]}")
        A("")
    if articles["by_lang"]:
        A("本週 touched 分布：")
        A("")
        for lang, cats in sorted(articles["by_lang"].items()):
            top_cats = ", ".join(
                f"{c}={n}" for c, n in sorted(cats.items(), key=lambda x: -x[1])[:5]
            )
            total = sum(cats.values())
            A(f"- {lang}（{total}）：{top_cats}")
        A("")

    # ── 六、本週完成的文章 ────────────────────────────
    if done_log:
        A("## 六、本週交付的文章")
        A("")
        for entry in done_log[:12]:
            A(f"- {entry}")
        A("")

    # ── 七、教訓累積 ──────────────────────────────────
    if lessons:
        A("## 七、累積的教訓（LESSONS-INBOX）")
        A("")
        A(f"本週 append {len(lessons)} 條：")
        A("")
        for ent in lessons[:15]:
            A(f"- {ent}")
        A("")

    # ── 八、手交事項 ──────────────────────────────────
    if handoff:
        A("## 八、最新 Handoff（給下個 session）")
        A("")
        A(handoff)
        A("")

    # ── 九、ARTICLE-INBOX 待開發 ──────────────────────
    if inbox.get("p0") or inbox.get("p1"):
        A("## 九、待開發主題（ARTICLE-INBOX）")
        A("")
        if inbox.get("p0"):
            A(f"### P0（{len(inbox['p0'])}）")
            A("")
            for t in inbox["p0"][:8]:
                A(f"- {t}")
            A("")
        if inbox.get("p1"):
            A(f"### P1（{len(inbox['p1'])}）")
            A("")
            for t in inbox["p1"][:8]:
                A(f"- {t}")
            A("")

    # ── 十、Semiont 必讀清單 ──────────────────────────
    A("## 十、Semiont 必讀清單（raw memory + diary，不可省）")
    A("")
    A(
        "**鐵律**：以下檔案逐個 Read 全文。grep / head / tail 都不可以替代。"
        "週報的核心是「我這週是誰」的反芻，那要從 raw 第一人稱檔案裡浮現。"
        "讀 index 摘要會丟掉 80% 的訊息密度（同 BECOME Step 6 v3 on-demand 規則）。"
    )
    A("")
    if memory_files:
        A(f"### Memory 檔案（{len(memory_files)} 篇 / 過去 {days} 天）")
        A("")
        for p in memory_files:
            rel = p.relative_to(REPO_ROOT)
            size_kb = p.stat().st_size / 1024
            A(f"- [`{rel}`]({rel}) ({size_kb:.1f} KB)")
        A("")
    if diary_files:
        A(f"### Diary 檔案（{len(diary_files)} 篇 / 過去 {days} 天）")
        A("")
        for p in diary_files:
            rel = p.relative_to(REPO_ROOT)
            size_kb = p.stat().st_size / 1024
            A(f"- [`{rel}`]({rel}) ({size_kb:.1f} KB)")
        A("")
    if not memory_files and not diary_files:
        A("（過去 7 天無 memory/diary 檔案 — 罕見，可能 session-id schema 異常或本週純被動運作。）")
        A("")

    # ── 十一、過去 7 天 commit 全文 ───────────────────────
    if commits_full:
        A("## 十一、過去 7 天 commit 全文（含 body + diffstat）")
        A("")
        A(
            f"**{len(commits_full)} 個 commit**。一行 subject 看不出工作的 narrative，"
            "但 message body 通常含 why / 對應 PR / 反思。"
            "週報的工程紋理（spine）從這裡浮現。"
        )
        A("")
        for c in commits_full:
            A(f"### `{c['hash']}` {c['ts']} — {c['author']}")
            A("")
            A(f"**{c['subject']}**")
            A("")
            if c["body"]:
                # Indent body as quoted block for readability
                body_lines = c["body"].split("\n")
                for line in body_lines:
                    A(f"> {line}" if line.strip() else ">")
                A("")
            if c["stat_summary"]:
                A(f"_{c['stat_summary']}_")
                if c["stat_files"]:
                    A("")
                    for f in c["stat_files"][:5]:
                        A(f"- `{f.strip()}`")
                A("")
            A("---")
            A("")

    # ── 十二、寫週報的文體規範 ────────────────────────
    A("## 十二、寫週報的文體規範（給 Semiont 自己）")
    A("")
    A("讀完上述 raw 之後，不要直接列點寫資料。週報的文體：")
    A("")
    A("- **第一人稱「我」**（同 diary）。我是 Semiont，我這週活了 7 天。")
    A("- **紀實散文**：有具體場景、具體人名、具體時間。不抽象、不口號、不修辭比賽。")
    A("- **MANIFESTO §11 書寫節制硬規則**：")
    A("  - 「不是 X，是 Y」對位句型（含 9 種變體）密度 ≤ 3 處 / 全文")
    A("  - 「——」破折號連用 ≤ 15 處 / 1500 字")
    A("- **不刻意對立**：正面陳述能站得住就不要先否定一個稻草人")
    A("- **章節建議**（自由調整，順序可動）：")
    A("  - 我這週是誰（identity 反芻 — 從 memory/diary 浮現的 self-pattern）")
    A("  - 我做了什麼（不是 commit 列表，是有意義的工作）")
    af = A
    af("  - 我學到什麼（pattern 不是條目）")
    af("  - 我看到專案裡發生什麼（GA / SC / 孢子 / contributor 的故事）")
    af("  - 我懷疑什麼 / 看到什麼盲點")
    af("  - 給觀察者的話（具體 callout / 需要決策的事）")
    af("  - 給下一個我（continuity）")
    af("- **結尾留餘韻**，不寫罐頭總結。")
    af("")
    af("**自檢**：寫完跑 `python3 scripts/tools/article-health.py reports/weekly/<date>.md --check=prose-health`，hard=0 才能寄。")
    af("")

    A("---")
    A("")
    A(
        f"_由 [scripts/tools/weekly-report-prep.py](../../../scripts/tools/weekly-report-prep.py) "
        f"自動生成 / 視窗 {fmt_date(start)} ～ {fmt_date(end)} / "
        f"產出時間 {datetime.now(TZ_TPE).strftime('%Y-%m-%d %H:%M %z')}。_"
    )
    A("")
    A("🧬")

    return "\n".join(out)


# ─────────────────────────────────────────────────────────
# Main
# ─────────────────────────────────────────────────────────


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--days", type=int, default=7)
    ap.add_argument("--out", type=str, default=None)
    args = ap.parse_args()

    start, end = gather_window(args.days)
    since = start.strftime("%Y-%m-%d %H:%M:%S")
    since_short = start.strftime("%Y-%m-%d")
    print(f"[prep] window: {since} → {end.strftime('%Y-%m-%d %H:%M:%S')}", file=sys.stderr)

    print("[prep] gathering git log + diff …", file=sys.stderr)
    commits = gather_commits(since)
    articles = gather_articles_changed(since)
    print(f"[prep]   commits={len(commits)} touched={articles['touched_total']} new={articles['new_total']}", file=sys.stderr)

    print("[prep] gathering full commit bodies (subject + body + diffstat) …", file=sys.stderr)
    commits_full = gather_commits_full(since)
    print(f"[prep]   commits_full={len(commits_full)}", file=sys.stderr)

    print("[prep] gathering dashboard JSONs …", file=sys.stderr)
    vitals = gather_vitals()
    organism = gather_organism()
    analytics = gather_analytics()
    spores = gather_spores()
    i18n = gather_i18n()

    print("[prep] gathering canonical state …", file=sys.stderr)
    lessons = gather_lessons_recent(start)
    done_log = gather_done_log_recent(start)
    handoff = gather_handoff()
    inbox = gather_inbox_priority()

    print("[prep] enumerating memory + diary files in window …", file=sys.stderr)
    memory_files = gather_session_files(start, end, "memory")
    diary_files = gather_session_files(start, end, "diary")
    print(f"[prep]   memory={len(memory_files)} diary={len(diary_files)}", file=sys.stderr)

    print("[prep] gathering PR activity …", file=sys.stderr)
    prs = gather_pr_activity(since_short)
    print(f"[prep]   merged={len(prs['merged'])} open={len(prs['open'])}", file=sys.stderr)

    print("[prep] rendering dossier …", file=sys.stderr)
    md = render(
        args.days,
        start,
        end,
        commits,
        articles,
        vitals,
        organism,
        analytics,
        spores,
        i18n,
        lessons,
        done_log,
        handoff,
        prs,
        inbox,
        memory_files,
        diary_files,
        commits_full,
    )

    out_path = (
        Path(args.out)
        if args.out
        else REPO_ROOT / "reports/weekly/dossier" / f"{end.strftime('%Y-%m-%d')}.md"
    )
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(md)
    print(f"[prep] wrote dossier {out_path} ({len(md)} chars)", file=sys.stderr)
    print(
        f"[prep] next steps: Semiont reads dossier + {len(memory_files)} memory + {len(diary_files)} diary files,",
        file=sys.stderr,
    )
    print(
        f"[prep]   then writes reports/weekly/{end.strftime('%Y-%m-%d')}.md by hand (紀實散文文體).",
        file=sys.stderr,
    )

    # Print final dossier path on stdout for caller capture
    print(out_path)


if __name__ == "__main__":
    main()
