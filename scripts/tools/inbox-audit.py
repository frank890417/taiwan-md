#!/usr/bin/env python3
"""inbox-audit.py — ARTICLE-INBOX 對地真相健檢 + Distill 安全執行器.

把「查現況」儀器化：一條指令交叉比對 ARTICLE-INBOX §Pending 的每個 entry 對
`knowledge/`（文章是否已存在）+ ARTICLE-DONE-LOG（是否已歸檔），分類出幽靈、
重複、真待辦，輸出 triage 報告。--apply-safe 只移除 100% 明確的幽靈（self-declared
done 或 已存在且已 logged），帶 line-conservation 保證（非只 entry count）。

誕生：2026-06-19-123909-inbox-distill session — 手動 distill 95→79 抓出 16 幽靈
（完成歸檔鐵律無結構強制 → inbox 漂移）。哲宇 directive：把這次的處理/分析儀器化。
canonical SOP：docs/semiont/ARTICLE-INBOX.md §Distill SOP
設計教訓：REFLEXES #15（反覆浮現要儀器化）+ #38（混維度 silent killer：count 對但內容掉）

用法：
  inbox-audit.py                      # triage 報告（human markdown）
  inbox-audit.py --json               # machine-readable（routine / signal 消費）
  inbox-audit.py --apply-safe         # 只移除明確幽靈（done / exists+logged），line-conservation 保證
  inbox-audit.py --apply-safe --dry-run   # 預覽要移除什麼，不寫檔
分類：
  🔴 DECLARED-DONE   status=done/dropped/已完成 — 完成卻沒搬走（鐵律違反），--apply-safe 唯一會動的類
  🟠 STALE-NEW       Type=NEW 但文章已存在 — NEW 已被滿足，待人工 review
  🟣 PARTIAL-SHIP    prose-shipped-pending-media 類 — 正文 ship、媒體/babel 待補（合法 pending）
  🟡 EVOLVE-PENDING  Type=EVOLVE + 文章存在 + pending — 合法 re-EVOLVE（文章存在＋可能已在 DONE-LOG 是前提，非幽靈）
  ✅ GENUINE-PENDING 文章不存在 + pending — 真待辦
  ⚪ SERIES          系列 umbrella / Tier / pick list — 不 auto-resolve，人工確認整批
  🔁 DUP            ≥2 entry 解到同一篇文章
--apply-safe 只動 🔴 DECLARED-DONE（status 自宣完成＝最安全訊號）。其餘一律留人工（κ 5-PR 教訓：curation 不批次自決）。

--spore 模式（2026-07-16 新增）：SPORE-INBOX.md 對地真相健檢
  inbox-audit.py --spore              # triage 報告（human markdown）
  inbox-audit.py --spore --json       # machine-readable（signal / routine 消費）
  inbox-audit.py --spore --today YYYY-MM-DD   # 指定日期基準（預設同 `date +%F`）
誕生：2026-07-16 手工深度盤點發現 ARTICLE-INBOX 儀器管不到 SPORE-INBOX 的四類漂移
（幽靈 entry 沒刪 / 同篇兩條 entry / blueprint 保留編號碰撞 / REACTIVE 時效過期沒人管）。
分類（SPORE-INBOX §Pending 對 docs/factory/spore-log.json 交叉）：
  👻 GHOST-SHIPPED   entry 主題 slug 模糊比對 spore-log 命中，且該 spore date > entry Requested date
                     → 疑似已發未刪，附 spore id+date 佐證
  🔁 DUP             ≥2 條 pending entry 解到同一篇文章（Article-Path 相同或標題主題詞相同）
  🔢 ID-COLLISION    entry 內 `SPORE-BLUEPRINTS/N-` 保留編號已存在於 spore-log → 佔用警示；
                     不在 log → INFO「保留編號仍可用」
  ⏰ REACTIVE-STALE  時效框定的 entry（標題含「趁熱」「REACTIVE」或 時效 欄位值本身有急迫語意）
                     且 Requested 距今 > 21 天 → 過期警示
**report-only，孢子裁決一律人工** — 本模式不提供 --apply-safe，四類分類只是把漂移「秀出來」，
不自動改檔（per 完成歸檔鐵律 + κ 5-PR 教訓：curation 不批次自決）。
slug 比對從寬（雙向 substring + 去「台灣」前綴再比一次）：寧可多報讓人判斷，
每筆附匹配依據（spore id / date / slug）方便一眼辨真偽。
--angles 模式（2026-09-27 self-evolve-weekly 新增）：ARTICLE-INBOX 切角時效健檢
  inbox-audit.py --angles             # 報告（human markdown）
  inbox-audit.py --angles --json      # machine-readable（inbox-signal.sh 消費）
  inbox-audit.py --angles --today YYYY-MM-DD
誕生：探測器建議「登記進 INBOX 不是進度」連三週（09-20 news-lens 亞運切角滑走、09-27 李灝宇與
拔河的窗口在沒人決定的狀態下關掉），DIARY §反覆出現的思考「里程碑≠兌現」vc=3。INBOX 的 P0
只有優先序沒有期限，過期的切角跟常青題躺在同一層，沒有任何東西會叫。
讀 entry 的 `- **Angle-expires**: YYYY-MM-DD（說明）` 欄（schema 見 ARTICLE-INBOX §Entry Schema）：
  ⌛ EXPIRED         期限已過，還在 pending —— 改切角、降級或移除，要有人決定
  ⏳ SOON            7 天內到期
  ❔ NEWS-UNMARKED   P0/P1 且來源是探測器／新聞雷達（Requested 含 probe／news-radar／news-lens），
                     卻沒有 Angle-expires 欄 —— 時效題沒寫期限，請登記的人補，或寫 `evergreen`
report-only：過期不代表該刪，常青的切角可以改寫成 evergreen；裁決留給挑單的人。
"""

from __future__ import annotations
import argparse
import json
import re
import sys
from datetime import date, datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
INBOX = ROOT / "docs/semiont/ARTICLE-INBOX.md"
DONELOG = ROOT / "docs/semiont/ARTICLE-DONE-LOG.md"
KNOWLEDGE = ROOT / "knowledge"
LANG_DIRS = {"en", "ja", "ko", "es", "fr"}
CATEGORIES = {
    "About", "Art", "Culture", "Economy", "Food", "Geography", "History",
    "Lifestyle", "Music", "Nature", "People", "Politics", "Society", "Technology",
}
SERIES_MARKERS = ("系列", "batch", "umbrella", "series", "共通說明", "pick list",
                  "Tier", "Round 2", "P0×5", "P0x5", "候選）", "Peek")

# --spore 模式常數
SPORE_INBOX = ROOT / "docs/factory/SPORE-INBOX.md"
SPORE_LOG = ROOT / "docs/factory/spore-log.json"
SPORE_BACKPRESSURE_CAP = 40
REACTIVE_STALE_DAYS = 21
ANGLE_SOON_DAYS = 7
NEWS_SOURCE_RE = re.compile(r"probe|news-radar|news-lens|探測器|新聞雷達", re.I)

REACTIVE_URGENCY_MARKERS = ("趁熱", "REACTIVE", "天內", "本週內", "本週", "本月內", "reactive")


def split_blocks(lines):
    """Line-walk into segments; EVERY line lands in exactly one segment (no drops).
    'block' starts at '### ' until next '### '/'## '. '## ' starts a 'pre' section.
    FENCE-AWARE: '###'/'##' inside ``` code fences are content, not boundaries
    (the 選舉 Tier 1.2 entry embeds a fenced markdown example with ## / ### headers).
    Returns list of (kind, [lines]). Mirrors the proven distill segmentation."""
    segments, cur, kind, in_fence = [], [], "pre", False
    for l in lines:
        if l.lstrip().startswith("```"):
            in_fence = not in_fence
            cur.append(l)
            continue
        if not in_fence and l.startswith("### "):
            if cur:
                segments.append((kind, cur))
            cur, kind = [l], "block"
        elif not in_fence and l.startswith("## "):
            if cur:
                segments.append((kind, cur))
            cur, kind = [l], "pre"
        else:
            cur.append(l)
    if cur:
        segments.append((kind, cur))
    return segments


def field(block, name):
    pat = re.compile(r"^\s*-\s*\*\*" + re.escape(name) + r"\*\*[^:]*:\s*`?([^`\n]*)`?", re.M)
    m = pat.search("\n".join(block))
    return m.group(1).strip() if m else ""


def core_title(heading):
    """Strip '### ', leading emoji/symbols, and suffixes to get the article-ish core."""
    t = heading[4:].strip()
    # strip leading non-CJK/non-alnum decorations (emoji, 🔴🟠 等)
    t = re.sub(r"^[^\w一-鿿（(]+", "", t).strip()
    for cut in (" EVOLVE", " NEW", " SEO", " — ", "—", " (", "（", " batch", "：", ":"):
        i = t.find(cut)
        if i > 0:
            t = t[:i]
    return t.strip()


def build_knowledge_index():
    """stem -> [relpaths]; (category, stem) -> relpath for zh-TW SSOT."""
    by_stem, by_cat_stem = {}, {}
    for p in KNOWLEDGE.rglob("*.md"):
        rel = p.relative_to(ROOT)
        parts = rel.parts
        if len(parts) >= 2 and parts[1] in LANG_DIRS:
            continue  # skip translations
        stem = p.stem
        by_stem.setdefault(stem, []).append(str(rel))
        if len(parts) >= 2:
            by_cat_stem[(parts[1], stem)] = str(rel)
    return by_stem, by_cat_stem


def resolve_article(entry, by_stem, by_cat_stem):
    """Return (relpath_or_None, how)."""
    path = entry["path"]
    if path:
        path = path.replace("knowledge/", "knowledge/")
        if (ROOT / path).exists():
            return path, "Path-field"
    cat, core = entry["category"], entry["core"]
    if cat and (cat, core) in by_cat_stem:
        return by_cat_stem[(cat, core)], "cat+stem"
    if core in by_stem and len(by_stem[core]) == 1:
        return by_stem[core][0], "exact-stem"
    # fuzzy: a knowledge stem that contains the core (or vice-versa), len>=3 to avoid noise
    if len(core) >= 3:
        hits = [v for s, v in by_stem.items() if (core in s or s in core)]
        flat = [x for sub in hits for x in sub]
        if len(flat) == 1:
            return flat[0], "fuzzy-stem"
    return None, "none"


def classify(entry, donelog_text):
    """Conservative: only status-self-declared done is auto-removable. 'exists+logged'
    is NOT a ghost signal for EVOLVE entries — re-EVOLVE requires the article to exist
    and it may already be in DONE-LOG from a prior ship (造山者/沈伯洋/蔡英文 case)."""
    status = entry["status"].lower()
    typ = entry["type"].upper()
    art = entry["article"]
    is_series = any(m.lower() in entry["heading"].lower() for m in SERIES_MARKERS)
    declared_done = (
        bool(re.search(r"\b(done|dropped)\b", status))
        or "已完成" in entry["status"]
        or "✅" in entry["status"]
    ) and not ("pending" in status and "shipped" in status)
    partial = ("shipped" in status and "pending" in status)
    logged = bool(art) and (art in donelog_text or (len(entry["core"]) >= 3 and entry["core"] in donelog_text))
    note = "（已在 DONE-LOG，確認是 re-EVOLVE 不是幽靈）" if logged else ""

    if declared_done:
        return "DECLARED-DONE", "🔴", "status 自宣 done/dropped — 完成卻沒搬走（鐵律違反），可安全移除"
    if is_series:
        return "SERIES", "⚪", "系列 umbrella / Tier — 不 auto-resolve，人工確認整批是否 ship 完"
    if partial:
        return "PARTIAL-SHIP", "🟣", "正文 ship、媒體/babel 待補（合法 pending）"
    if art and typ == "EVOLVE":
        return "EVOLVE-PENDING", "🟡", f"文章存在({art}) + EVOLVE pending — 合法 re-EVOLVE{note}"
    if art:  # NEW (or unknown type) but article exists → NEW 已被滿足
        return "STALE-NEW", "🟠", f"NEW 但文章已存在({art}) — NEW 已滿足，待人工 review 是否移除{note}"
    return "GENUINE-PENDING", "✅", "文章不存在 + pending — 真待辦"


def parse_pending(text):
    """Return list of entry dicts for §Pending blocks that look like real entries."""
    lines = text.split("\n")
    segs = split_blocks(lines)
    in_pending, entries = False, []
    for kind, seg in segs:
        head = seg[0] if seg else ""
        if kind == "pre" and head.startswith("## "):
            in_pending = "Pending" in head or "📥" in head
            continue
        if kind != "block" or not in_pending:
            continue
        heading = next((l for l in seg if l.startswith("### ")), seg[0])
        block_text = "\n".join(seg)
        # real entry = has Type or Status field (skip schema example / Peek / fenced ### )
        if "**Type**" not in block_text and "**Status**" not in block_text:
            continue
        pm = re.search(r"knowledge/\S+\.md", field(seg, "Path") or "")
        cat = field(seg, "Category")
        entries.append({
            "heading": heading.strip(),
            "core": core_title(heading),
            "type": field(seg, "Type"),
            "category": cat.split()[0] if cat else "",
            "priority": field(seg, "Priority"),
            "status": field(seg, "Status"),
            "path": pm.group(0) if pm else "",
            "requested": field(seg, "Requested"),
            "angle_expires": field(seg, "Angle-expires"),
        })
    return entries


def apply_safe(text, removable_headings):
    """Remove blocks whose heading is in removable_headings, with line-conservation.
    Reattach trailing comment/blank lines to the next block so dividers travel correctly."""
    lines = text.split("\n")
    segs = split_blocks(lines)
    # reattach trailing separators of each block to the next segment
    def is_sep(l):
        return l.strip() == "" or l.strip().startswith("<!--")
    for i in range(len(segs) - 1):
        kind, seg = segs[i]
        if kind != "block":
            continue
        j = len(seg)
        while j > 1 and is_sep(seg[j - 1]):
            j -= 1
        tail = seg[j:]
        if tail:
            segs[i] = (kind, seg[:j])
            nk, nseg = segs[i + 1]
            segs[i + 1] = (nk, tail + nseg)
    out, removed_lines, removed = [], 0, []
    for kind, seg in segs:
        if kind == "block":
            heading = next((l for l in seg if l.startswith("### ")), seg[0]).strip()
            if heading in removable_headings:
                removed.append(heading)
                removed_lines += len(seg)
                continue
        out.extend(seg)
    conserved = len(lines) == len(out) + removed_lines
    sec_ok = sum(l.startswith("## ") for l in lines) == sum(l.startswith("## ") for l in out)
    return "\n".join(out), removed, conserved and sec_ok


# ─────────────────────────────────────────────────────────────────────────
# --spore 模式：SPORE-INBOX.md 對地真相健檢（誕生 2026-07-16 inbox-audit session）
# 沿用上面 split_blocks() / core_title() 的解析與輸出風格，
# 但目標檔換成 docs/factory/SPORE-INBOX.md + docs/factory/spore-log.json。
# ─────────────────────────────────────────────────────────────────────────

def spore_field(block, name):
    """like field()，但 (a) 同時接受 ASCII ':' 與全形 '：'（SPORE-INBOX.md 兩種混用，
    尤其「時效」欄位 8/43 條用全形）(b) 值綁死同一行（[^\\n]* 不跨行）。
    field() 的 `[^:]*` 字元類別會吃掉換行，全形冒號情境下會一路吃到下一個 ASCII ':'
    才停——曾在「時效」欄位吃穿整個 block 吃到後面 HTML 註解裡的冒號，抓出完全不相干
    的文字（施振榮 entry 誤抓成隔壁 228 事件註解）。不動 field()：ARTICLE-INBOX 那條
    路徑欄位一律 ASCII 冒號，field() 對它沒有這個 bug，改了反而多一個要驗證無副作用的面。"""
    pat = re.compile(r"^\s*-\s*\*\*" + re.escape(name) + r"\*\*[^:：\n]*[:：]\s*`?([^`\n]*)`?", re.M)
    m = pat.search("\n".join(block))
    return m.group(1).strip() if m else ""


def parse_spore_pending(text):
    """Return list of entry dicts for SPORE-INBOX.md §Pending（待發）blocks.
    Schema: docs/factory/SPORE-INBOX.md §Entry Schema
    （### 標題 + Source-Mode / Article-Path / Priority / Status / Requested / 時效 ...）。
    Mirrors parse_pending()'s fence-aware '### ' block segmentation."""
    lines = text.split("\n")
    segs = split_blocks(lines)
    in_pending, entries = False, []
    for kind, seg in segs:
        head = seg[0] if seg else ""
        if kind == "pre" and head.startswith("## "):
            in_pending = "📥" in head or "Pending" in head
            continue
        if kind != "block" or not in_pending:
            continue
        heading = next((l for l in seg if l.startswith("### ")), seg[0])
        block_text = "\n".join(seg)
        # real entry = has Source-Mode or Status field（skip §Entry Schema 範例 block）
        if "**Source-Mode**" not in block_text and "**Status**" not in block_text:
            continue
        art_field = spore_field(seg, "Article-Path")
        pm = re.search(r"knowledge/[^\s\]\)]+\.md", art_field or "")
        article_path = pm.group(0) if pm else ""
        req_raw = spore_field(seg, "Requested")
        dm = re.match(r"(\d{4}-\d{2}-\d{2})", req_raw or "")
        entries.append({
            "heading": heading.strip(),
            "core": core_title(heading),
            "source_mode": spore_field(seg, "Source-Mode"),
            "article_path": article_path,
            "article_stem": Path(article_path).stem if article_path else "",
            "priority": spore_field(seg, "Priority"),
            "status": spore_field(seg, "Status"),
            "requested_raw": req_raw,
            "requested_date": dm.group(1) if dm else "",
            "time_window": spore_field(seg, "時效"),
            "block_text": block_text,
        })
    return entries


def load_spore_log():
    data = json.loads(SPORE_LOG.read_text(encoding="utf-8"))
    return data.get("spores", [])


def _parse_ymd(s):
    try:
        return datetime.strptime((s or "").strip(), "%Y-%m-%d").date()
    except (ValueError, TypeError):
        return None


def _strip_tw_prefix(s):
    for p in ("台灣的", "台灣"):
        if s.startswith(p):
            return s[len(p):]
    return s


def _fuzzy_slug_match(a, b):
    """slug 比對從寬：雙向 substring + 去「台灣」前綴再比一次。寧可多報，人工判斷。"""
    a, b = (a or "").strip(), (b or "").strip()
    if not a or not b:
        return False
    if a in b or b in a:
        return True
    a2, b2 = _strip_tw_prefix(a), _strip_tw_prefix(b)
    if a2 and b2 and (a2 in b2 or b2 in a2):
        return True
    return False


def find_spore_ghosts(entries, spores):
    """👻 GHOST-SHIPPED: entry 主題（Article-Path stem 優先，退而求其次用標題 core）
    模糊命中 spore-log 某筆，且該 spore date > entry Requested date
    → 疑似該孢子已發但 entry 沒刪（完成歸檔鐵律違反）。
    嚴格用 '>' 不用 '>='：同日 retraction→reship（如周蕙）不算幽靈信號，
    避免跟「今天已人工確認仍未執行」的 ground truth 打架。"""
    ghosts = []
    for e in entries:
        req_d = _parse_ymd(e["requested_date"])
        if not req_d:
            continue
        candidates = [c for c in (e["article_stem"], e["core"]) if c]
        if not candidates:
            continue
        hits = []
        for s in spores:
            slug = s.get("slug", "")
            if not any(_fuzzy_slug_match(c, slug) for c in candidates):
                continue
            sp_d = _parse_ymd(s.get("date", ""))
            if sp_d and sp_d > req_d:
                hits.append(s)
        if hits:
            ghosts.append({
                "heading": e["heading"], "core": e["core"],
                "article_stem": e["article_stem"],
                "requested_date": e["requested_date"],
                "evidence": [{"id": s.get("id"), "date": s.get("date"),
                              "slug": s.get("slug"), "platform": s.get("platform", "")}
                             for s in hits],
            })
    return ghosts


def find_spore_dups(entries):
    """🔁 DUP: ≥2 pending entry 解到同一篇文章（Article-Path 相同優先；
    無 Article-Path 的 EVERGREEN-TOPIC entry 退而比標題主題詞 core）。"""
    by_path, by_core = {}, {}
    for e in entries:
        if e["article_path"]:
            by_path.setdefault(e["article_path"], []).append(e["heading"])
        elif e["core"]:
            by_core.setdefault(e["core"], []).append(e["heading"])
    dups = []
    for path, heads in by_path.items():
        if len(heads) > 1:
            dups.append({"match_on": "article_path", "key": path, "headings": heads})
    for core, heads in by_core.items():
        if len(heads) > 1:
            dups.append({"match_on": "core_title", "key": core, "headings": heads})
    return dups


def find_spore_id_collisions(entries, spores):
    """🔢 ID-COLLISION: entry 內 `SPORE-BLUEPRINTS/N-...` 保留編號（Threads+X 雙平台
    固定佔 N, N+1 兩個 id，per spore-log 慣例）已存在於 spore-log → COLLISION；
    不在 log → INFO「保留編號仍可用」。備援訊號：標題內 '#NNN/#NNN ... blueprint' 宣告
    （沒有 SPORE-BLUEPRINTS 路徑欄位時，如 blueprint 尚未落檔的 retraction 重發案）。
    只鎖定明確宣告「blueprint 保留編號」的訊號，不掃描全文所有 #NNN 引用
    （entry 裡大量 #NNN 是引用歷史已發孢子當『14 天無重複』佐證，不是保留碰撞）。"""
    by_id = {s["id"]: s for s in spores if "id" in s}
    results = []
    for e in entries:
        reserved = set()
        for m in re.finditer(r"(?i)spore-blueprints/(\d+)-", e["block_text"]):
            n = int(m.group(1))
            reserved.update({n, n + 1})
        for m in re.finditer(r"#(\d{2,3})(?:/#(\d{2,3}))?\s*blueprint", e["heading"], re.IGNORECASE):
            for g in m.groups():
                if g:
                    reserved.add(int(g))
        if not reserved:
            continue
        detail = []
        for n in sorted(reserved):
            s = by_id.get(n)
            if s:
                detail.append({"id": n, "status": "COLLISION",
                               "note": f"編號已被 {s.get('slug', '?')} {s.get('date', '?')} 佔用"})
            else:
                detail.append({"id": n, "status": "AVAILABLE", "note": "保留編號仍可用"})
        results.append({"heading": e["heading"], "reserved_ids": detail})
    return results


def _time_window_signals_urgency(tw):
    """時效欄位值本身帶急迫語意（而非只是 schema 必填欄位存在）才算訊號 —
    避免『時效』三字本身是每條 entry 都有的欄位名稱，literal 比對會 100% 全報無鑑別力。"""
    tw = (tw or "").strip()
    if not tw or tw.startswith("無") or tw.lower().startswith("non-time-sensitive"):
        return False
    return any(k in tw for k in ("趁熱", "天內", "本週", "本月內", "REACTIVE"))


def _is_reactive_marked(e):
    if any(k in e["heading"] for k in ("趁熱", "REACTIVE")):
        return True
    if "REACTIVE" in (e["source_mode"] or "").upper():
        return True
    return _time_window_signals_urgency(e.get("time_window"))


def find_reactive_stale(entries, today):
    """⏰ REACTIVE-STALE: 標題 / Source-Mode 含 REACTIVE、或 heading 含「趁熱」、
    或 時效 欄位值本身有急迫語意（「趁熱」「N 天內」「本週內」「本月內」等，
    排除「無」「non-time-sensitive」開頭的宣告），且 Requested 距今 > 21 天 → 過期警示。"""
    stale = []
    for e in entries:
        if not _is_reactive_marked(e):
            continue
        req_d = _parse_ymd(e["requested_date"])
        if not req_d:
            continue
        age = (today - req_d).days
        if age > REACTIVE_STALE_DAYS:
            stale.append({
                "heading": e["heading"], "priority": e["priority"], "status": e["status"],
                "requested_date": e["requested_date"], "age_days": age,
                "time_window": e.get("time_window", ""),
            })
    return stale


def run_spore_audit(today_str=None):
    today = _parse_ymd(today_str) or date.today()
    text = SPORE_INBOX.read_text(encoding="utf-8")
    entries = parse_spore_pending(text)
    spores = load_spore_log()
    return {
        "today": today.isoformat(),
        "pending_total": len(entries),
        "backpressure_cap": SPORE_BACKPRESSURE_CAP,
        "over_cap": len(entries) > SPORE_BACKPRESSURE_CAP,
        "ghost": find_spore_ghosts(entries, spores),
        "dup": find_spore_dups(entries),
        "id_collision": find_spore_id_collisions(entries, spores),
        "reactive_stale": find_reactive_stale(entries, today),
    }


def print_spore_report(r):
    print(f"# SPORE-INBOX audit — {r['pending_total']} 個 pending entry（today={r['today']}）\n")
    cap_line = f"pending {r['pending_total']} / backpressure cap {r['backpressure_cap']}"
    cap_line += "  → ⚠️ 超過上限，daily routine 應 skip propose" if r["over_cap"] else "  → OK"
    print(cap_line + "\n")

    print(f"## 👻 GHOST-SHIPPED（{len(r['ghost'])}）")
    if not r["ghost"]:
        print("（無）")
    for g in r["ghost"]:
        ev = " / ".join(f"#{h['id']} {h['date']} {h['platform']} slug={h['slug']}"
                        for h in g["evidence"])
        label = g["core"] or g["heading"][4:][:40]
        print(f"- {label}｜Requested {g['requested_date']}｜疑似已發：{ev}")
    print()

    print(f"## 🔁 DUP（{len(r['dup'])}）")
    if not r["dup"]:
        print("（無）")
    for d in r["dup"]:
        print(f"- [{d['match_on']}] {d['key']} — {len(d['headings'])} entries: "
              + " ｜ ".join(h[4:][:40] for h in d["headings"]))
    print()

    print(f"## 🔢 ID-COLLISION（{len(r['id_collision'])} 條 entry 帶保留編號）")
    if not r["id_collision"]:
        print("（無 entry 帶 SPORE-BLUEPRINTS 保留編號）")
    for c in r["id_collision"]:
        print(f"- {c['heading'][4:][:50]}")
        for d in c["reserved_ids"]:
            icon = "🔴" if d["status"] == "COLLISION" else "🟢"
            print(f"  {icon} #{d['id']}: {d['note']}")
    print()

    print(f"## ⏰ REACTIVE-STALE（{len(r['reactive_stale'])}）")
    if not r["reactive_stale"]:
        print("（無）")
    for s in r["reactive_stale"]:
        tw = (s["time_window"] or "")[:40]
        print(f"- {s['heading'][4:][:50]}｜Requested {s['requested_date']}"
              f"（{s['age_days']} 天前）｜{s['priority'] or '?'} {s['status']}｜時效：{tw}")


def run_angle_audit(entries, today):
    """⌛ 切角時效：Angle-expires 欄對今天。只看 status=pending/in-progress 的 entry。"""
    expired, soon, unmarked, marked = [], [], [], 0
    for e in entries:
        st = (e.get("status") or "").lower()
        if st and not st.startswith(("pending", "in-progress")):
            continue
        raw = (e.get("angle_expires") or "").strip()
        row = {"heading": e["heading"], "priority": e["priority"], "status": e["status"],
               "angle_expires": raw}
        if raw:
            marked += 1
            if raw.lower().startswith("evergreen"):
                continue
            m = re.match(r"(\d{4}-\d{2}-\d{2})", raw)
            d = _parse_ymd(m.group(1)) if m else None
            if not d:
                row["days"] = None
                row["note"] = "無法解析日期（格式要 YYYY-MM-DD 開頭）"
                expired.append(row)
                continue
            delta = (d - today).days
            row["days"] = delta
            if delta < 0:
                expired.append(row)
            elif delta <= ANGLE_SOON_DAYS:
                soon.append(row)
            continue
        if e["priority"][:2] in ("P0", "P1") and NEWS_SOURCE_RE.search(e.get("requested") or ""):
            unmarked.append(row)
    return {"today": today.isoformat(), "marked": marked, "expired": expired,
            "soon": soon, "news_unmarked": unmarked}


def print_angle_report(r):
    print(f"# ARTICLE-INBOX 切角時效 — today={r['today']}（帶 Angle-expires 欄 {r['marked']} 條）\n")
    def line(x):
        d = x.get("days")
        when = (f"過期 {-d} 天" if d is not None and d < 0 else
                f"剩 {d} 天" if d is not None else x.get("note", ""))
        return f"- {x['heading'][4:][:56]}｜{x['priority'] or '?'}｜{x['angle_expires'][:40]}｜{when}"
    print(f"## ⌛ EXPIRED（{len(r['expired'])}）— 改切角、降級或移除")
    print("\n".join(line(x) for x in r["expired"]) or "（無）")
    print(f"\n## ⏳ SOON（{len(r['soon'])}）— {ANGLE_SOON_DAYS} 天內到期")
    print("\n".join(line(x) for x in r["soon"]) or "（無）")
    print(f"\n## ❔ NEWS-UNMARKED（{len(r['news_unmarked'])}）— 探測器／新聞雷達來源的 P0/P1 沒寫期限")
    print("\n".join(f"- {x['heading'][4:][:56]}｜{x['priority'] or '?'}" for x in r["news_unmarked"]) or "（無）")


def main():
    ap = argparse.ArgumentParser(description="ARTICLE-INBOX ground-truth audit + safe distill")
    ap.add_argument("--json", action="store_true", help="machine-readable output")
    ap.add_argument("--apply-safe", action="store_true",
                    help="remove DECLARED-DONE + GHOST-LOGGED (unambiguous), line-conservation guaranteed")
    ap.add_argument("--dry-run", action="store_true", help="with --apply-safe: preview, don't write")
    ap.add_argument("--spore", action="store_true",
                    help="switch target to SPORE-INBOX.md ground-truth audit (report-only, "
                         "no --apply-safe — 孢子裁決一律人工)")
    ap.add_argument("--angles", action="store_true",
                    help="ARTICLE-INBOX 切角時效健檢（Angle-expires 欄；report-only）")
    ap.add_argument("--today", default=None,
                    help="date basis YYYY-MM-DD for --spore staleness math "
                         "(default: same as `date +%%F`)")
    args = ap.parse_args()

    if args.spore:
        if args.apply_safe:
            print("--spore 是 report-only，不支援 --apply-safe（孢子裁決一律人工，"
                  "SPORE-INBOX.md 完成歸檔鐵律要求人工確認後手動刪除 entry）", file=sys.stderr)
            return 2
        result = run_spore_audit(args.today)
        if args.json:
            print(json.dumps({"mode": "spore", **result}, ensure_ascii=False, indent=2))
        else:
            print_spore_report(result)
        return 0

    if args.angles:
        today = _parse_ymd(args.today) or date.today()
        result = run_angle_audit(parse_pending(INBOX.read_text(encoding="utf-8")), today)
        if args.json:
            print(json.dumps({"mode": "angles", **result}, ensure_ascii=False, indent=2))
        else:
            print_angle_report(result)
        return 0

    text = INBOX.read_text(encoding="utf-8")
    donelog_text = DONELOG.read_text(encoding="utf-8")
    by_stem, by_cat_stem = build_knowledge_index()
    entries = parse_pending(text)

    for e in entries:
        art, how = resolve_article(e, by_stem, by_cat_stem)
        e["article"], e["resolved_by"] = art, how
        cls, icon, why = classify(e, donelog_text)
        e["class"], e["icon"], e["why"] = cls, icon, why

    # dup detection by resolved article
    seen = {}
    for e in entries:
        if e["article"]:
            seen.setdefault(e["article"], []).append(e["heading"])
    dups = {k: v for k, v in seen.items() if len(v) > 1}

    order = ["DECLARED-DONE", "STALE-NEW", "PARTIAL-SHIP",
             "EVOLVE-PENDING", "GENUINE-PENDING", "SERIES"]
    counts = {c: sum(1 for e in entries if e["class"] == c) for c in order}
    removable = [e["heading"] for e in entries if e["class"] == "DECLARED-DONE"]

    if args.json:
        print(json.dumps({
            "total": len(entries), "counts": counts,
            "removable": len(removable), "dups": dups,
            "entries": [{k: e[k] for k in ("heading", "class", "type", "priority",
                                           "status", "article", "why")} for e in entries],
        }, ensure_ascii=False, indent=2))
        return 0

    if args.apply_safe:
        new_text, removed, ok = apply_safe(text, set(removable))
        print(f"=== --apply-safe: 移除 {len(removed)} 明確幽靈（DECLARED-DONE，status 自宣完成）===")
        for h in removed:
            print("  - " + h)
        print(f"line-conservation + section-survival: {'OK ✅' if ok else 'BROKEN ❌'}")
        if not ok:
            print("中止：line-conservation 失敗（拒絕 silent 內容流失）")
            return 2
        if args.dry_run:
            print("\n(dry-run；拿掉 --dry-run 才寫檔)")
        else:
            INBOX.write_text(new_text, encoding="utf-8")
            print(f"\n*** 已寫入 {INBOX.relative_to(ROOT)} ***（記得 ship DONE-LOG backfill + git）")
        return 0

    # human triage report
    print(f"# ARTICLE-INBOX audit — {len(entries)} 個 pending entry\n")
    print(f"摘要：" + " / ".join(f"{c}={counts[c]}" for c in order if counts[c]))
    print(f"→ 🔴 可安全移除 {len(removable)} 條（--apply-safe）；🟠 STALE-NEW + ⚪ SERIES 待人工 review\n")
    for c in order:
        es = [e for e in entries if e["class"] == c]
        if not es:
            continue
        print(f"\n## {es[0]['icon']} {c}（{len(es)}）")
        for e in es:
            conf = {"fuzzy-stem": " ⚠fuzzy確認scope"}.get(e["resolved_by"], "")
            tail = f" → {e['article']}{conf}" if e["article"] else ""
            print(f"- {e['core'] or e['heading'][4:][:40]}｜{e['type'] or '?'} {e['priority'] or '?'}｜{e['status'][:28]}{tail}")
    if dups:
        print(f"\n## 🔁 DUP（{len(dups)} 篇文章被多 entry 指到）")
        for art, hs in dups.items():
            print(f"- {art}: {len(hs)} entries")
    return 0


if __name__ == "__main__":
    sys.exit(main())
