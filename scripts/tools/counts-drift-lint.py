#!/usr/bin/env python3
"""
counts-drift-lint.py — 寫死數字腐化偵測（WARN 起步）

per dna-audit 2026-07-05 §S2「寫死的計數、版本、行號、時間必腐」根治方向 (b)：
小 lint 掃 canonical 檔內的「N 條 / N 個 / N step」宣稱，對 ground truth 抽驗。
先 WARN 收集數據，跑穩再議 HARD（REFLEXES #66 gate threshold 用真實產出 dogfood 校準）。

設計原則：
- 每條 check = (宣稱位置, 宣稱值) vs (ground truth 來源, 實際值)。
- ground truth 永遠是機器可算的：grep 實數 / ls 實數 / live dump / --list-checks。
- 本工具**不自動改檔**——它只把「對不上」變成可見的黃燈；修法由人/session 決定
  （去數字化 pointer 或更新數字）。偵測 ≠ 修復（REFLEXES #58），但偵測是修復的前提。

Usage:
    python3 scripts/tools/counts-drift-lint.py            # human 報告
    python3 scripts/tools/counts-drift-lint.py --brief    # 一行摘要（consciousness-snapshot 用）
    python3 scripts/tools/counts-drift-lint.py --hard     # drift > 0 時 exit 1（未來升級用）

消費者：consciousness-snapshot.sh（每次甦醒一行）+ ROUTINE-AUDIT weekly（深度表）。
"""

import argparse
import json
import re
import subprocess
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent.parent


def rd(p):
    try:
        return (REPO / p).read_text(encoding="utf-8")
    except FileNotFoundError:
        return None


def line_of(text, pos):
    return text[:pos].count("\n") + 1


def is_historical_line(text, pos):
    """changelog（_v 開頭）與明標 DEPRECATED/歷史 的行，數字是合法的過去式，不抓。"""
    start = text.rfind("\n", 0, pos) + 1
    end = text.find("\n", pos)
    line = text[start : end if end != -1 else len(text)]
    s = line.strip()
    return s.startswith("_v") or bool(re.search(r"DEPRECATED|歷史參照|historical", line, re.I))


class F:  # finding
    def __init__(self, site, claim, actual, ok, note=""):
        self.site, self.claim, self.actual, self.ok, self.note = site, claim, actual, ok, note


def check_reflexes():
    """REFLEXES frontmatter 條數宣稱 vs 實際 entry 數（條數 SSOT = description 一處）。"""
    out = []
    t = rd("docs/semiont/REFLEXES.md")
    if not t:
        return out
    entries = re.findall(r"^\*\*#(\d+) ", t, re.M)
    actual_n, actual_last = len(set(entries)), max(int(e) for e in entries)
    m = re.search(r"description: '[^']*?(\d+) 條 #N 反射（last #(\d+)", t)
    if m:
        out.append(
            F(
                "REFLEXES.md fm description「N 條 / last #N」",
                f"{m.group(1)} 條 / #{m.group(2)}",
                f"{actual_n} 條 / #{actual_last}",
                int(m.group(1)) == actual_n and int(m.group(2)) == actual_last,
            )
        )
    return out


def check_article_health_plugins():
    """docs 宣稱的 plugin 數 vs `article-health.py --list-checks` 實數。"""
    out = []
    try:
        r = subprocess.run(
            [sys.executable, str(REPO / "scripts/tools/article-health.py"), "--list-checks"],
            capture_output=True, text=True, timeout=30,
        )
        actual = len([l for l in r.stdout.splitlines() if re.match(r"\s*[-•]?\s*[a-z0-9-]+\s{2,}", l) or re.match(r"^[a-z][a-z0-9-]+$", l.strip())])
        if actual == 0:  # fallback: 每行含 check 名的粗算
            actual = len([l for l in r.stdout.splitlines() if l.strip()])
    except Exception as e:
        return [F("article-health --list-checks", "?", f"執行失敗: {e}", False, "ground truth 不可得")]
    for path in ["docs/semiont/DNA.md", "docs/pipelines/REWRITE-PIPELINE.md"]:
        t = rd(path)
        if not t:
            continue
        for m in re.finditer(r"(\d+)\s*(?:個)?\s*plugin(?:\s*SSOT)?", t):
            n = int(m.group(1))
            if n < 3:  # 「2 plugin」之類的局部描述不算全量宣稱
                continue
            line_no = t[: m.start()].count("\n") + 1
            out.append(
                F(f"{path}:{line_no}「{m.group(0).strip()}」", n, actual, n == actual,
                  "plugin 全量宣稱應 pointer 到 --list-checks")
            )
    return out


def check_dashboard_json():
    out = []
    actual = len(list((REPO / "public/api").glob("dashboard-*.json")))
    t = rd("docs/pipelines/DASHBOARD-PIPELINE.md")
    if t:
        for m in re.finditer(r"(\d+)\s*個\s*JSON", t):
            if is_historical_line(t, m.start()):
                continue
            # 只抓「全家族」宣稱（fetch/渲染/家族 語境）；單一 generator 的產出數
            # （如 generate-dashboard-data.js 產 4 個）是它自己的事實，不在此驗
            start = t.rfind("\n", 0, m.start()) + 1
            line = t[start : t.find("\n", m.start())]
            if not re.search(r"fetch|渲染|家族|dashboard-\*", line):
                continue
            out.append(F(f"DASHBOARD-PIPELINE.md:{line_of(t, m.start())}「{m.group(0)}」", int(m.group(1)), actual, int(m.group(1)) == actual))
    return out


def check_refresh_steps():
    out = []
    sh = rd("scripts/tools/refresh-data.sh")
    if not sh:
        return out
    denoms = {int(m) for m in re.findall(r"\[\d+(?:\.\d+)?/(\d+)\]", sh)}
    if not denoms:
        return out
    if len(denoms) > 1:
        out.append(F("refresh-data.sh echo [x/N] 分母", "多值", sorted(denoms), False, "script 自己就不一致"))
        return out
    actual = denoms.pop()
    for path in ["docs/pipelines/DATA-REFRESH-PIPELINE.md", ".claude/skills/twmd-refresh/SKILL.md"]:
        t = rd(path)
        if not t:
            continue
        for m in re.finditer(r"(\d+)\s*(?:個步驟|[-\s]?step)", t, re.I):
            n = int(m.group(1))
            if n < 5:
                continue  # 局部 step 引用不算
            if is_historical_line(t, m.start()):
                continue
            out.append(F(f"{path}:{line_of(t, m.start())}「{m.group(0).strip()}」", n, actual, n == actual))
    return out


def check_routine_counts():
    """CLAUDE/ANATOMY/HEARTBEAT 的 routine 條數宣稱 vs live dump enabled 數。"""
    out = []
    live = rd("docs/semiont/routine-live-state.json")
    if not live:
        return [F("routine-live-state.json", "-", "missing", False, "先跑 live dump")]
    enabled = json.loads(live)["enabled_count"]
    for path in ["CLAUDE.md", "docs/semiont/ANATOMY.md", "docs/semiont/HEARTBEAT.md"]:
        t = rd(path)
        if not t:
            continue
        for m in re.finditer(r"(\d+)\s*條[^。\n]{0,24}routine", t):
            n = int(m.group(1))
            line_no = t[: m.start()].count("\n") + 1
            ctx = t[max(0, m.start() - 20) : m.end() + 10].replace("\n", " ")
            if "週日反思鏈" in ctx or "反思鏈" in ctx:
                continue  # 「反思鏈 4 條」是子集描述非全量
            out.append(F(f"{path}:{line_no}「…{ctx.strip()[:40]}…」", n, f"{enabled} enabled (live)", n == enabled,
                         "routine 條數 SSOT = ROUTINE.md 排程表；prose 應 pointer 不寫數"))
    return out


def check_outward_articles():
    """對外層文章數宣稱 vs zh SSOT live 實數（update-stats.sh 應接管這些位置）。

    2026-07-11 dna-checkup：ground truth 從 dashboard-vitals.json 改為 live find。
    vitals 每日兩次 regen 之間有 staleness 窗——當天新 merge 的文章已進 knowledge/
    但還沒進 JSON，舊版把「宣稱正確、鏡子過期」誤報成宣稱腐化（7/11 中午 +5 篇後
    8 假 drift、藥方還開給做對事的 update-stats）。量尺對 ground truth，不對另一面
    也會過期的鏡子（REFLEXES #65）；vitals 新鮮度另立一筆 finding 誠實呈現。"""
    out = []
    live = sum(
        1
        for p in REPO.glob("knowledge/*/*.md")
        if re.fullmatch(r"[A-Z][a-zA-Z]*", p.parent.name) and not p.name.startswith("_")
    )
    vitals_n = None
    vit = rd("public/api/dashboard-vitals.json")
    if vit:
        vitals_n = json.loads(vit).get("totalArticles")
    sites = [
        ("README.md", r"\*\*(\d+) curated articles\*\*"),
        ("src/components/SEO.astro", r"(\d+)\+ 篇深度策展文章"),
        ("src/i18n/home.ts", r"(\d+)\+? ?(?:pages of in-depth|以上の深掘り|\+ 심층|頁深度內容|páginas de contenido|pages de contenu)"),
        # /explore/ 描述（2026-11-04 evolve 接管；zh 與 en 兩處當代表，其餘 11 語同一支 patch 一起改）
        ("src/i18n/explore.ts", r"(\d+)\+ (?:篇台灣策展文章|curated articles)"),
    ]
    for path, pat in sites:
        t = rd(path)
        if not t:
            continue
        for m in re.finditer(pat, t):
            n = int(m.group(1))
            line_no = t[: m.start()].count("\n") + 1
            out.append(F(f"{path}:{line_no}「{m.group(0)[:36]}」", n, live, n == live,
                         "update-stats.sh 應每日 regen 此位置"))
    if vitals_n is not None:
        out.append(F("dashboard-vitals totalArticles 新鮮度", vitals_n, live, vitals_n == live,
                     "vitals 落後 live＝當天新 merge 未 regen，下次 data-refresh 自癒"))
    return out


def check_frontmatter_freshness():
    """canonical frontmatter last_updated vs git 最後 commit 日（Stage 4.5 漂移偵測）。

    2026-07-11 dna-checkup 手修 5 檔同款 stale（DNA.md 停 5/13 而 body 有 6/25 內容等），
    class 本身沒儀器——本 check 是那批手修的永駐版。WARN 模式：機械 regen / prettier
    也會推 git 日期，>7d 落差先當訊號人判（先 WARN 收數據，再議 HARD）。"""
    import subprocess
    out = []
    roots = ["docs/semiont", "docs/pipelines", "docs/editorial", "docs/factory"]
    files = [REPO / "BECOME_TAIWANMD.md", REPO / "CLAUDE.md"]
    for r in roots:
        files += sorted((REPO / r).glob("*.md"))
    import datetime as _dt
    for f in files:
        text = rd(str(f.relative_to(REPO)))
        if not text or not text.startswith("---"):
            continue
        m = re.search(r"^last_updated:\s*'?(\d{4}-\d{2}-\d{2})'?", text[:1500], re.M)
        if not m:
            continue
        # log / buffer 類跳過：append 是它們的日常呼吸不是 state drift
        #（ARTICLE-DONE-LOG 每篇完成都 append、INBOX 天天進出——對它們量 fm 新鮮度 = 儀式噪音）
        if re.search(r"^(type:\s*'?[^'\n]*log|status:\s*'?(buffer|log))", text[:1500], re.M):
            continue
        g = subprocess.run(["git", "log", "-1", "--format=%as", "--", str(f)],
                           cwd=REPO, capture_output=True, text=True).stdout.strip()
        if not g:
            continue
        gap = (_dt.date.fromisoformat(g) - _dt.date.fromisoformat(m.group(1))).days
        if gap > 7:
            out.append(F(f"{f.relative_to(REPO)} frontmatter 新鮮度", m.group(1), f"git {g}", False,
                         f"落差 {gap}d——語意改動沒 bump（Stage 4.5）？機械 regen 誤報則人判"))
    if not out:
        out.append(F("canonical frontmatter 新鮮度（~80 檔）", "全部 ≤7d", "全部 ≤7d", True, ""))
    return out


def check_rewrite_stage_contracts():
    """REWRITE-PIPELINE.md「REWRITE-STAGE-*.md × N」份數宣稱 vs 實際 contract 檔數。

    2026-09-05 發現：跨檔案職責分工表寫死「× 10」，實際 11 檔（REWRITE-STAGE-2E-ROOM-PROSE.md
    從舊合併檔拆出來時沒同步更新）。份數 SSOT = docs/pipelines/REWRITE-STAGE-*.md 實際檔數，
    等同 §Stage contract 派發表去重列數（12 列 9/9b 同指一檔 → 11 檔）。"""
    out = []
    t = rd("docs/pipelines/REWRITE-PIPELINE.md")
    if not t:
        return out
    actual = len(list((REPO / "docs/pipelines").glob("REWRITE-STAGE-*.md")))
    # frontmatter（含 last_session changelog 字串）與歷史行都不算現行宣稱——
    # 只驗身體正文（跨檔案職責分工表）的活宣稱
    fm_end = 0
    if t.startswith("---\n"):
        m2 = re.search(r"\n---\n", t[4:])
        if m2:
            fm_end = 4 + m2.end()
    for m in re.finditer(r"REWRITE-STAGE-\*\.md`?\s*×\s*(\d+)", t):
        if m.start() < fm_end or is_historical_line(t, m.start()):
            continue
        n = int(m.group(1))
        line_no = t[: m.start()].count("\n") + 1
        out.append(
            F(
                f"REWRITE-PIPELINE.md:{line_no}「{m.group(0)}」",
                n,
                actual,
                n == actual,
                "stage contract 份數 SSOT = docs/pipelines/REWRITE-STAGE-*.md 實際檔數"
                "（＝§Stage contract 派發表去重列數）；prose 應 pointer 不寫死數字",
            )
        )
    return out


def check_pipelines_index():
    out = []
    actual = {p.name for p in (REPO / "docs/pipelines").glob("*.md")} - {"README.md"}
    t = rd("docs/pipelines/README.md")
    if not t:
        return out
    linked = set(re.findall(r"\[([A-Z][A-Za-z-]+\.md)", t))
    missing = sorted(actual - linked)
    out.append(F("docs/pipelines/README.md 索引完整度", f"{len(linked)} 檔已列", f"{len(actual)} 檔實存", not missing,
                 f"缺: {', '.join(missing)}" if missing else ""))
    return out


CHECKS = [
    ("REFLEXES 條數", check_reflexes),
    ("frontmatter 新鮮度", check_frontmatter_freshness),
    ("article-health plugin 數", check_article_health_plugins),
    ("dashboard JSON 數", check_dashboard_json),
    ("refresh 步數", check_refresh_steps),
    ("routine 條數", check_routine_counts),
    ("對外文章數", check_outward_articles),
    ("REWRITE-STAGE contract 份數", check_rewrite_stage_contracts),
    ("pipelines 索引", check_pipelines_index),
]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--brief", action="store_true")
    ap.add_argument("--hard", action="store_true")
    args = ap.parse_args()

    findings = []
    for name, fn in CHECKS:
        try:
            findings += fn()
        except Exception as e:  # lint 本身不准炸掉甦醒流程
            findings.append(F(f"[{name}] check 內部錯誤", "-", str(e), False, "lint bug"))

    drift = [f for f in findings if not f.ok]
    if args.brief:
        print(f"counts-drift: {len(drift)} drift / {len(findings)} 宣稱點")
        return 1 if (args.hard and drift) else 0

    print("🔢 counts-drift-lint — 寫死數字 vs ground truth（WARN 模式）\n")
    for f in findings:
        mark = "✅" if f.ok else "🟡"
        note = f"  ({f.note})" if f.note and not f.ok else ""
        print(f"{mark} {f.site}\n    宣稱={f.claim}  實際={f.actual}{note}")
    print(f"\nSummary: {len(drift)} drift / {len(findings)} 宣稱點  mode={'HARD' if args.hard else 'WARN'}")
    if drift:
        print("修法二選一：去數字化（pointer 到 SSOT）> 更新數字（下次還是會腐）。")
    return 1 if (args.hard and drift) else 0


if __name__ == "__main__":
    sys.exit(main())
