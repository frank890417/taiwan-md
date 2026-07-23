#!/usr/bin/env python3
"""generate-newsroom-data.py — 公開編輯台資料生成器（derive-first）

掃描文章生產各階段產物，推導 per-article 的 pipeline 進度，輸出
public/api/dashboard-newsroom.json 給 /semiont/newsroom 看板與 making-of 頁。

設計原則（reports/newsroom-orchestration-design-2026-07-16.md §五）：
- 檔案是唯一真相：不建第二本帳，每次全量掃描重推導。
- 狀態 ground 在顯式指標（frontmatter researchReport / article / slug 欄），
  檔名 slug 等值只當 fallback 且列 warnings —— 2026-07-12 GPT-5.6 Sol strict
  verifier 假陰性教訓：靠檔名 pattern 猜狀態，狀態層會比文章先壞。
- 不在生成器裡跑 health gate（慢）；只讀已落檔的狀態欄與 Result 行，附 mtime。

觸發：哲宇 2026-07-16 goal directive「公開站前台可以看到編輯台（共享編輯台，
第一階段唯讀；本地端 AI 操作、編輯台反映現況——直接分析 md/資料夾/記憶）」。
"""
import json
import os
import re
import sys
from datetime import datetime, timezone

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
OUT = os.path.join(ROOT, "public/api/dashboard-newsroom.json")

RESEARCH_DIR = os.path.join(ROOT, "reports/research")
PROJECTION_DIR = os.path.join(ROOT, "reports/article-projection")
ROOM_DIR = os.path.join(ROOT, "reports/editorial-room")
EVOLVE_DIR = os.path.join(ROOT, "reports/article-evolve")
KNOWLEDGE_DIR = os.path.join(ROOT, "knowledge")
INBOX = os.path.join(ROOT, "docs/semiont/ARTICLE-INBOX.md")
DONE_LOG = os.path.join(ROOT, "docs/semiont/ARTICLE-DONE-LOG.md")

# 觀測窗：只掃近 N 個月的 research 月槽（歷史 435 檔不需要全上看板）
RESEARCH_MONTHS = 3


def read(path):
    try:
        with open(path, encoding="utf-8") as f:
            return f.read()
    except OSError:
        return ""


def frontmatter(text):
    """寬鬆 frontmatter reader：只抓頂層 key: value 行（不解析巢狀）。"""
    if not text.startswith("---"):
        return {}
    end = text.find("\n---", 3)
    if end == -1:
        return {}
    fm = {}
    for line in text[3:end].split("\n"):
        m = re.match(r"^([A-Za-z_][A-Za-z0-9_-]*):\s*(.*)$", line)
        if m:
            fm[m.group(1)] = m.group(2).strip().strip("'\"")
    return fm


import subprocess

_git_dates = None


def git_date(path):
    """path → 最後 commit 日期（單趟 git log 建圖；worktree/CI fresh clone 的 mtime 不可信）。"""
    global _git_dates
    if _git_dates is None:
        _git_dates = {}
        try:
            # core.quotepath=false + utf-8: knowledge paths are CJK, and git
            # octal-escapes non-ASCII paths by default while text=True decodes
            # with the locale codec (cp950 on Windows), so CJK articles never
            # match the cache and art_date() silently falls back to filesystem
            # mtime, which is unreliable in worktree/CI checkouts.
            out = subprocess.run(
                ["git", "-C", ROOT, "-c", "core.quotepath=false", "log",
                 "--since=6.months", "--format=\x01%aI", "--name-only",
                 "--", "reports/article-projection", "reports/editorial-room",
                 "reports/article-evolve", "reports/research", "knowledge"],
                capture_output=True, encoding="utf-8", errors="replace", timeout=60,
            ).stdout
            cur = None
            for line in out.split("\n"):
                if line.startswith("\x01"):
                    cur = line[1:].strip()
                elif line.strip() and cur and line not in _git_dates:
                    _git_dates[line.strip()] = cur
        except Exception:
            pass
    return _git_dates.get(rel(path))


def art_date(path, fm=None):
    """artifact 時間：frontmatter date → git 最後 commit → mtime（最後手段）。

    一律輸出 UTC+Z（%Y-%m-%dT%H:%M:%SZ）。git %aI 帶 +08:00 偏移，直接切
    字串會產出無 Z 的本地時間，下游 dormant 判定 strptime 會靜默失效
    （本機看板 vs CI build 分類漂移的病根，2026-07-16）。"""
    d = (fm or {}).get("date") or (fm or {}).get("last_updated") or ""
    if re.match(r"^\d{4}-\d{2}-\d{2}", d):
        return d[:10] + "T00:00:00Z"
    g = git_date(path)
    if g:
        try:
            return (
                datetime.fromisoformat(g.replace("Z", "+00:00"))
                .astimezone(timezone.utc)
                .strftime("%Y-%m-%dT%H:%M:%SZ")
            )
        except ValueError:
            pass
    return mtime_iso(path)


def mtime_iso(path):
    try:
        return datetime.fromtimestamp(os.path.getmtime(path), tz=timezone.utc).strftime(
            "%Y-%m-%dT%H:%M:%SZ"
        )
    except OSError:
        return None


def rel(path):
    # Forward slashes: git log --name-only always emits them, so a backslash
    # key from os.path.relpath on Windows would never match the git_date cache.
    return os.path.relpath(path, ROOT).replace(os.sep, "/")


warnings = []
articles = {}  # slug → record


def rec(slug):
    return articles.setdefault(
        slug,
        {
            "slug": slug,
            "title": slug,
            "category": None,
            "mode": None,
            "priority": None,
            "spine_type": None,
            "stages": {},
            "next_step": None,
            "blocked_on": None,
        },
    )


def set_stage(slug, stage, **kw):
    rec(slug)["stages"][stage] = {k: v for k, v in kw.items() if v is not None}


# ── 1. research reports（近 N 月槽）────────────────────────────────
month_dirs = sorted(
    (d for d in os.listdir(RESEARCH_DIR) if re.match(r"\d{4}-\d{2}$", d)), reverse=True
)[:RESEARCH_MONTHS] if os.path.isdir(RESEARCH_DIR) else []

audit_results = {}  # (slug, "35"|"36") → PASS/FAIL
for month in month_dirs:
    mdir = os.path.join(RESEARCH_DIR, month)
    for fn in os.listdir(mdir):
        if not fn.endswith(".md"):
            continue
        path = os.path.join(mdir, fn)
        stem = fn[:-3]
        am = re.match(r"^(.+)-stage3([56])-audit$", stem)
        if am:
            body = read(path)
            res = "PASS" if re.search(r"##\s*Result:?\s*.*PASS", body) else (
                "FAIL" if re.search(r"##\s*Result:?\s*.*FAIL", body) else "UNKNOWN"
            )
            audit_results[(am.group(1), am.group(2))] = {
                "result": res,
                "artifact": rel(path),
                "at": art_date(path),
            }
            continue
        # sibling／輔助檔不各自上板：同目錄存在父 stem（金瓜石-research-4 之於 金瓜石）
        stems_here = {f[:-3] for f in os.listdir(mdir) if f.endswith(".md")}
        if any(stem != o and stem.startswith(o + "-") for o in stems_here):
            continue
        if re.search(r"-(research-\w+|[a-z-]*agent|transcripts|outline|verify-\w+)$", stem):
            continue
        fm = frontmatter(read(path))
        # 正面憑證規則：主研究報告必有 viewpoint/stage/spine 顯式欄位其一
        # （輔助檔 raw/scan/pointers 樣態打地鼠打不完，改要求正面證據）
        if not any(k in fm for k in ("viewpoint_formed", "stage", "spine_type")):
            continue
        # sub-agent raw 檔判別：agentId 有值（主報告的 agent: main-session 不算）或 -raw/-scan 結尾
        if fm.get("agentId") or stem.endswith(("-raw", "-scan")):
            continue
        slug = stem
        r = rec(slug)
        if "research" in r["stages"]:  # 月槽由新到舊掃：first-seen＝最新月，舊月同名檔不覆蓋
            continue
        vp = fm.get("viewpoint_formed") == "true"
        r["spine_type"] = r["spine_type"] or fm.get("spine_type")
        set_stage(
            slug,
            "viewpoint",
            status="done" if vp else "in-progress",
            artifact=rel(path),
            at=art_date(path, fm),
        )
        stage_field = fm.get("stage", "")
        set_stage(
            slug,
            "research",
            status="done" if ("complete" in stage_field or vp) else "in-progress",
            artifact=rel(path),
            note=stage_field or None,
            at=art_date(path, fm),
        )

# ── 2. 投影 ───────────────────────────────────────────────────────
if os.path.isdir(PROJECTION_DIR):
    for fn in os.listdir(PROJECTION_DIR):
        if not fn.endswith(".md") or fn.startswith("_"):
            continue
        path = os.path.join(PROJECTION_DIR, fn)
        fm = frontmatter(read(path))
        # 顯式指標優先：frontmatter article: knowledge/People/尊.md
        slug = fn[:-3]
        art = fm.get("article", "")
        m = re.match(r"knowledge/[^/]+/(.+)\.md$", art)
        if m and m.group(1) != slug:
            warnings.append(f"projection {fn}: 檔名 slug 與 frontmatter article 不一致（{m.group(1)}）")
            slug = m.group(1)
        r = rec(slug)
        r["spine_type"] = r["spine_type"] or fm.get("spine_type")
        rr = fm.get("researchReport")
        set_stage(
            slug,
            "projection",
            status="done" if fm.get("projection_done") == "true" else "in-progress",
            artifact=rel(path),
            research_report=rr,
            at=art_date(path, fm),
        )

# ── 3. 編輯室（projection / prose / chief / final-*）──────────────
ROOM_STAGE = {
    "projection": "room_projection",
    "prose": "room_prose",
    "prose-structure": "room_prose",
    "chief": "room_chief",
}
if os.path.isdir(ROOM_DIR):
    for fn in os.listdir(ROOM_DIR):
        if not fn.endswith(".md") or fn.startswith(("_", "dogfood-", "full-cycle")):
            continue
        path = os.path.join(ROOM_DIR, fn)
        fm = frontmatter(read(path))
        slug = fm.get("slug")
        room = fm.get("room")
        if not slug:
            m = re.match(r"^(.+?)-(projection|prose-structure|final-\w+|chief)-?review", fn[:-3])
            if m:
                slug, room = m.group(1), room or m.group(2)
                warnings.append(f"editorial-room {fn}: 無 frontmatter slug，用檔名 fallback（{slug}）")
            else:
                continue
        stage = ROOM_STAGE.get(room or "", f"room_{room}" if room else None)
        if not stage:
            continue
        overall = fm.get("overall", "unknown")
        entry = {
            "status": overall,
            "rounds": fm.get("rounds"),
            "seats": fm.get("seats"),
            "artifact": rel(path),
            "at": art_date(path, fm),
        }
        prev = rec(slug)["stages"].get(stage)
        # 同 room 多輪（-r2）：取 mtime 最新
        if not prev or (entry["at"] or "") >= (prev.get("at") or ""):
            set_stage(slug, stage, **entry)

# ── 4. 寫作 staging ────────────────────────────────────────────────
if os.path.isdir(EVOLVE_DIR):
    for fn in os.listdir(EVOLVE_DIR):
        if fn.endswith(".md"):
            path = os.path.join(EVOLVE_DIR, fn)
            set_stage(fn[:-3], "write", status="staged", artifact=rel(path), at=art_date(path))

# ── 5. audit（Stage 3.5/3.6）──────────────────────────────────────
for (slug, which), info in audit_results.items():
    cur = rec(slug)["stages"].setdefault("verify", {"status": "in-progress"})
    cur[f"stage{which}"] = info["result"]
    cur[f"stage{which}_artifact"] = info["artifact"]
    cur["at"] = info["at"]
    if cur.get("stage35") == "PASS" and cur.get("stage36") == "PASS":
        cur["status"] = "done"
    elif "FAIL" in (cur.get("stage35"), cur.get("stage36")):
        cur["status"] = "blocked"

# ── 6. knowledge/（ship 狀態）──────────────────────────────────────
# 先建反向索引：knowledge frontmatter researchReport → 檔案（顯式指標，Sol 教訓：不猜檔名）
now = datetime.now(tz=timezone.utc)
rr_index = {}
for cat in os.listdir(KNOWLEDGE_DIR):
    cdir = os.path.join(KNOWLEDGE_DIR, cat)
    if not os.path.isdir(cdir) or not re.match(r"^[A-Z]", cat):
        continue
    for fn in os.listdir(cdir):
        if not fn.endswith(".md"):
            continue
        fm = frontmatter(read(os.path.join(cdir, fn)))
        rr = fm.get("researchReport", "").lstrip("/")
        if rr:
            rr_index[rr] = (cat, fn[:-3], os.path.join(cdir, fn), fm.get("title", fn[:-3]))

for slug, r in list(articles.items()):
    if "ship" in r["stages"]:
        continue
    research_art = r["stages"].get("research", {}).get("artifact")
    hit = rr_index.get(research_art or "")
    if hit:
        cat, kstem, kpath, ktitle = hit
        r["category"] = r["category"] or cat
        r["title"] = ktitle if r["title"] == slug else r["title"]
        set_stage(slug, "ship", status="done", artifact=rel(kpath), at=art_date(kpath))

for cat in os.listdir(KNOWLEDGE_DIR):
    cdir = os.path.join(KNOWLEDGE_DIR, cat)
    if not os.path.isdir(cdir) or not re.match(r"^[A-Z]", cat):
        continue
    for fn in os.listdir(cdir):
        if not fn.endswith(".md"):
            continue
        slug = fn[:-3]
        if slug not in articles:
            continue
        path = os.path.join(cdir, fn)
        fm = frontmatter(read(path))
        r = rec(slug)
        r["title"] = fm.get("title", slug)
        r["category"] = cat
        set_stage(
            slug,
            "ship",
            status="done",
            artifact=rel(path),
            research_report=fm.get("researchReport"),
            at=art_date(path, fm),
        )

# ── 7. ARTICLE-INBOX（intake：pending / in-progress）──────────────
inbox_text = read(INBOX)
for block in re.split(r"\n(?=### )", inbox_text):
    if not block.startswith("### "):
        continue
    title = block.split("\n", 1)[0][4:].strip()
    if "{" in title:  # Entry Schema 模板塊不是 entry
        continue
    fields = dict(re.findall(r"- \*\*(\w[\w-]*)\*\*:\s*`?([^`\n]+)`?", block))
    status = fields.get("Status", "").strip()
    if status not in ("pending", "in-progress"):
        continue
    # 顯式指標：Path（EVOLVE）或 Pre-research
    slug = None
    m = re.search(r"knowledge/[^/\s]+/([^/\s]+)\.md", fields.get("Path", ""))
    if m:
        slug = m.group(1)
    else:
        m = re.search(r"reports/research/[\d-]+/([^/\s]+)\.md", fields.get("Pre-research", ""))
        if m:
            slug = m.group(1)
    key = slug or f"inbox:{title[:40]}"
    r = rec(key)
    if r["title"] == key:
        r["title"] = title
    r["mode"] = r["mode"] or fields.get("Type")
    r["priority"] = fields.get("Priority", r["priority"])
    r["category"] = r["category"] or fields.get("Category")
    set_stage(key, "inbox", status=status)

# ── 8. DONE-LOG（近 10 條，補 ship 資訊）──────────────────────────
done_entries = re.findall(r"### (.+?) — (\d{4}-\d{2}-\d{2})", read(DONE_LOG))[:10]

# ── 推導 next_step / blocked_on ───────────────────────────────────
ORDER = [
    ("inbox", "REWRITE-STAGE-0-VIEWPOINT.md"),
    ("viewpoint", "REWRITE-STAGE-0-VIEWPOINT.md"),
    ("research", "REWRITE-STAGE-1A-RESEARCH.md"),
    ("projection", "REWRITE-STAGE-2A-PROJECTION.md"),
    ("room_projection", "REWRITE-STAGE-2B-ROOM-PROJECTION.md"),
    ("write", "REWRITE-STAGE-2C-WRITE.md"),
    ("room_prose", "REWRITE-STAGE-2E-ROOM-PROSE.md"),
    ("verify", "REWRITE-STAGE-3-VERIFY.md"),
    ("ship", "REWRITE-STAGE-4-FORMAT.md → REWRITE-STAGE-5-CROSSLINK.md"),
]
DONE_STATES = {"done", "pass", "staged"}
for slug, r in articles.items():
    stages = r["stages"]
    if stages.get("ship", {}).get("status") == "done" and "inbox" not in stages:
        r["next_step"] = None
        r["board_column"] = "shipped"
        continue
    blocked = [
        s for s, v in stages.items() if v.get("status") in ("block", "blocked", "FAIL")
    ]
    if blocked:
        r["blocked_on"] = blocked[0]
        r["board_column"] = "blocked"
        r["next_step"] = f"解除 {blocked[0]}（見對應 review／audit 檔）"
        continue
    nxt = None
    last_done = "inbox"
    for stage, contract in ORDER:
        st = stages.get(stage, {}).get("status")
        if st in DONE_STATES:
            last_done = stage
            continue
        if st in ("revise", "in-progress"):
            nxt = (stage, contract, st)
            break
        if st is None and last_done != "inbox" and stage != "inbox":
            nxt = (stage, contract, "todo")
            break
    newest_at = max((v.get("at") or "" for v in stages.values()), default="")
    stale = False
    if newest_at:
        try:
            # [:19] 容忍有無 Z 尾碼——歷史 JSON 兩種格式都出現過，解析失敗＝休眠判定靜默失效
            age = (now - datetime.strptime(newest_at[:19], "%Y-%m-%dT%H:%M:%S").replace(tzinfo=timezone.utc)).days
            stale = age > 21
        except ValueError:
            pass
    if stale and "inbox" not in stages:
        r["board_column"] = "dormant"
        r["next_step"] = "休眠中：21 天無產物動靜。要續跑就從最後完成的 stage 接（見卡片燈號）"
    elif nxt:
        r["next_step"] = f"{nxt[0]}（{nxt[2]}）→ docs/pipelines/{nxt[1]}"
        r["board_column"] = nxt[0]
    else:
        r["board_column"] = last_done

def _sorted_articles(arts):
    """同欄排序：priority（P0 前）→ 最新產物時間（新在前）。兩段穩定排序。"""
    rank = {"P0": 0, "P1": 1, "P2": 2, "P3": 3}
    def newest(a):
        return max((v.get("at") or "" for v in a["stages"].values()), default="")
    by_date = sorted(arts.values(), key=newest, reverse=True)
    return sorted(by_date, key=lambda a: rank.get((a.get("priority") or "").strip(), 4))


out = {
    "generated": now.strftime("%Y-%m-%dT%H:%M:%SZ"),
    "generator": "scripts/core/generate-newsroom-data.py",
    "stage_order": [s for s, _ in ORDER] + ["shipped"],
    "articles": _sorted_articles(articles),
    "recent_done": [{"title": t, "date": d} for t, d in done_entries],
    "warnings": warnings,
}
os.makedirs(os.path.dirname(OUT), exist_ok=True)
with open(OUT, "w", encoding="utf-8") as f:
    json.dump(out, f, ensure_ascii=False, indent=1)
print(
    f"✅ dashboard-newsroom.json: {len(out['articles'])} 篇上板"
    f"（warnings {len(warnings)}）→ {rel(OUT)}"
)
if warnings and "--quiet" not in sys.argv:
    for w in warnings:
        print(f"  ⚠️ {w}")
