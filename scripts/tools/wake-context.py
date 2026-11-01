#!/usr/bin/env python3
"""
wake-context.py — 甦醒取數單一儀器（BECOME §Step 1 記憶/日記/交接/ground-truth 的核）

為什麼存在：甦醒時「我記得什麼」的取數邏輯曾是十幾段手寫 bash snippet 散在
BECOME 四個小節，各自寫死排序方向、行號窗、「今天」假設，且撈錯不會叫——
BECOME §1.3 `tail -20` 因 DIARY 索引新在上，讓 2026-07-05 起六天的甦醒把四月
舊日記當「近期意識活動」讀，無人發現（REFLEXES #65、reports/wake-memory-
evolution-2026-07-11.md）。本儀器的四條設計原則：

1. 殼核分離：BECOME 是殼只講「載什麼」；怎麼撈住這裡，殼層禁 inline 取數 bash
2. date-aware 不 position-aware：解析列內日期取最新，不假設哪端是新
3. anchor-aware 不行號：段落用 `^## ` 標題錨定，檔案增長免疫
4. fail-loud self-test：每次取數自帶體檢，撈錯亮 ⚠️ + exit 2，不靜默帶病
5. 輸出通道也是儀器的一部分（v2 2026-07-12）：全段 ~200KB 超過 Bash tool ~30K 字元
   輸出上限，印 stdout 必被截斷——2026-07-11〜12 每一條 cron 甦醒因此自行
   `| head -N`，記憶面整層消失且 selftest 排最尾第一個被截（fail-loud 被通道
   截成 fail-silent）。v2 起完整內容落檔 .taiwanmd/wake-context.latest.md，
   stdout 只留 manifest＋selftest（小到不可能被截），完整閱讀走 Read 工具
   分頁讀到末行 wake:END sentinel（BECOME §1.3 完整讀取鐵律）

用法：
  python3 scripts/tools/wake-context.py               # 完整落檔＋manifest（Universal core 記憶面一鍵）
  python3 scripts/tools/wake-context.py --check        # 只跑體檢（routine / weekly-checkup 用）
  python3 scripts/tools/wake-context.py --sections handoff,selftest --rows 10   # 針對性小量拉取（stdout）
"""
import argparse
import datetime as dt
import re
import shutil
import subprocess
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]
MEMORY = REPO / "docs/semiont/MEMORY.md"
DIARY = REPO / "docs/semiont/DIARY.md"
MEMORY_DIR = REPO / "docs/semiont/memory"
DIARY_DIR = REPO / "docs/semiont/diary"
MANIFESTO = REPO / "docs/semiont/MANIFESTO.md"
REFLEXES = REPO / "docs/semiont/REFLEXES.md"
LATEST_FILE = REPO / ".taiwanmd/wake-context.latest.md"  # gitignored；完整輸出落檔處

FULL_DATE_RE = re.compile(r"^\s*(20\d\d-\d\d-\d\d)\s*$")
FILE_DATE_RE = re.compile(r"^(20\d\d-\d\d-\d\d)")
FILE_STAMP_RE = re.compile(r"^(20\d\d-\d\d-\d\d)-(\d{6})-")
HANDOFF_HEAD_RE = re.compile(r"^##+ .*(Handoff|handoff|交接)")
HANDOFF_WALK_MAX_FILES = 5
HANDOFF_WALK_MAX_HOURS = 72
FRESHNESS_GRACE_DAYS = 2
# 絕對沉默天數（2026-10-25 self-evolve）：「索引新鮮」量的是索引跟 raw 對得上，量不到
# raw 本身多久沒長。W43 週體檢量到 diary 最新一篇距今 28 天，selftest 照樣印 ✅「落差
# 0d」——一個停止產出的層跟一個每天在寫的層在這行長得一模一樣（REFLEXES #82 proxy：
# 一致性是活著的替身）。兩層閾值不同：memory 每天有 routine 寫，3 天沒有＝飛輪停了；
# diary 自 2026-09-09 起刻意升了門檻（diary-gate 冷卻＋routine 預設不寫），14 天才算
# 反芻層可能被餓死，數字取自 W43 handoff。
SILENCE_LIMIT_DAYS = {"memory": 3, "diary": 14}

ALL_SECTIONS = [
    "manifesto-core", "reflexes-index", "reflexes-top5",
    "memory-head", "neural", "memory-rows",
    "diary-recur", "diary-rows", "handoff", "groundtruth", "selftest",
]


# ---------------------------------------------------------------- parsing
def heading_index(lines, prefix):
    """回傳第一個以 prefix 開頭的 `## ` 標題行 index；找不到回 None。"""
    for i, l in enumerate(lines):
        if l.startswith("## ") and prefix in l:
            return i
    return None


def section_between(lines, start_prefix, end_prefix=None):
    """anchor-bounded 段落：start 標題（含）→ end 標題（不含）或下一個 `## ` 或 EOF。"""
    s = heading_index(lines, start_prefix)
    if s is None:
        return None
    e = len(lines)
    for j in range(s + 1, len(lines)):
        if lines[j].startswith("## ") and (end_prefix is None or end_prefix in lines[j]):
            e = j
            break
    return "\n".join(lines[s:e]).rstrip()


def index_rows_with_dates(lines):
    """回傳 [(date_str, line)]，只認 | YYYY-MM-DD | 開頭的完整列（月度 digest 列自然排除）。"""
    rows = []
    for l in lines:
        parts = l.split("|")
        if len(parts) < 7:
            continue
        m = FULL_DATE_RE.match(parts[1])
        if m:
            rows.append((m.group(1), l))
    return rows


def newest_rows(lines, n):
    """date-aware 取最新 n 列，回傳（按時間舊→新排好的列, 總列數）。
    同日內以檔案內先後為 tiebreak（穩定排序），方向假設為零。"""
    rows = index_rows_with_dates(lines)
    ordered = sorted(enumerate(rows), key=lambda t: (t[1][0], t[0]))
    picked = [r for _, r in ordered[-n:]] if n else [r for _, r in ordered]
    return [l for _, l in picked], len(rows), (picked[-1][0] if picked else None)


def newest_raw_file_date(d: Path):
    dates = []
    for p in d.glob("*.md"):
        m = FILE_DATE_RE.match(p.name)
        if m:
            dates.append(m.group(1))
    return max(dates) if dates else None


def parse_date(s):
    return dt.date.fromisoformat(s)


def silence_check(label, raw, today):
    """最新 raw 檔距今的絕對天數 → (ok, msg)。跟「索引新鮮」分開判，因為兩者的根因不同：
    索引落後＝收官漏補列，raw 沉默＝那一層沒在產出（REFLEXES #38 一個訊號一種根因）。"""
    limit = SILENCE_LIMIT_DAYS[label]
    age = (today - parse_date(raw)).days
    if age <= limit:
        return True, f"{label} 最新一篇距今 {age}d（≤ {limit}d）"
    if label == "diary":
        return False, (f"diary 最新一篇是 {raw}，距今 {age}d（> {limit}d）——反芻層沒有產出。"
                       f"不要為了消這盞燈補寫一篇（DIARY-PIPELINE Stage 0 照跑）；要回答的是這段"
                       f"沉默是門檻刻意擋下的，還是反芻被餓死了")
    return False, (f"memory 最新一篇是 {raw}，距今 {age}d（> {limit}d）——飛輪可能停轉，"
                   f"先查排程器與帳號額度")


# ---------------------------------------------------------------- sections
def sec_manifesto_core(lines):
    """BECOME §1.1 Universal 身份核心兩段（##-level 錨定；v2.4 前住殼層的兩條 awk）。
    Full mode 補載 §進化哲學 全部仍是 mode-specific Read，不在本段。"""
    r1 = section_between(lines, "我是什麼", "我的進化哲學")
    r2 = section_between(lines, "我的存在結構", "附錄")
    if not r1 or not r2:
        return None
    return r1 + "\n\n" + r2


def sec_reflexes_index(lines):
    """§📇 反射 catalog index（### 級標題起錨，止於其後第一條 --- 分隔線）。"""
    s = next((i for i, l in enumerate(lines) if l.startswith("### ") and "反射 catalog index" in l), None)
    if s is None:
        return None
    e = next((j for j in range(s + 1, len(lines)) if lines[j].strip() == "---"), len(lines))
    return "\n".join(lines[s:e]).rstrip()


def top5_ids(lines):
    """從 index 區的「Top 5 load-bearing reflexes」宣告行解析 #N 清單——
    讀 SSOT 不寫死編號（v2.4 前殼層 hardcode 15/42/16/38/26，宣告一改殼層即漂）。"""
    for l in lines:
        if "Top 5" in l and "#" in l:
            ids = re.findall(r"#(\d+)", l)[:5]
            if len(ids) == 5:
                return ids
    return None


def sec_reflexes_top5(lines):
    """Top 5 反射全文（`**#N ` 起錨、止於下一條目/段落標題/分隔線——
    v2.4 前的 awk 用空行＋head -20 截斷，長條目一直只被載一半）。"""
    ids = top5_ids(lines)
    if not ids:
        return None, None
    out = []
    for n in ids:
        s = next((i for i, l in enumerate(lines) if l.startswith(f"**#{n} ")), None)
        if s is None:
            out.append(f"⚠️ #{n} 在 body 找不到")
            continue
        e = next((j for j in range(s + 1, len(lines))
                  if lines[j].startswith("**#") or lines[j].startswith("### ") or lines[j].strip() == "---"),
                 len(lines))
        out.append("\n".join(lines[s:e]).rstrip())
    return "\n\n".join(out), ids


def sec_memory_head(lines):
    i = heading_index(lines, "神經迴路")
    return "\n".join(lines[:i]).rstrip() if i is not None else None


def sec_neural(lines):
    return section_between(lines, "神經迴路", "心跳日誌")


def sec_diary_recur(lines):
    return section_between(lines, "反覆出現的思考")


def memory_file_time(name):
    """memory 檔名 → datetime。新 schema `YYYY-MM-DD-HHMMSS-handle` 取到秒；
    舊 schema `YYYY-MM-DD-α` 只有日期，當作當天 00:00（年齡會略為高估）。"""
    m = FILE_STAMP_RE.match(name)
    if m:
        return dt.datetime.strptime(m.group(1) + m.group(2), "%Y-%m-%d%H%M%S")
    d = parse_date(FILE_DATE_RE.match(name).group(1))
    return dt.datetime(d.year, d.month, d.day)


def sec_handoff():
    """最近 memory 檔往回 walk（≤N 檔／≤M 小時）撈第一個非空 Handoff 段；
    另收近 2 天 diary 的「給明天的我」。回傳 (text, meta dict)。

    窗口內一份 memory 都沒有時（飛輪停轉超過 M 小時），改走最新 N 份、不設時限，
    並在 meta 標 stale_fallback。2026-10-07 心跳的病例：週額度用完讓兩台機器靜默
    四天，72h 窗口把 10-03 晚班那份交接（含當天到期的 OBSERVER-QUEUE #77／#78）
    整段擋在門外，selftest 還把原因寫成「上游收官可能漏寫」。停得越久越需要交接，
    舊版恰好在那時候讀不到。"""
    now = dt.datetime.now()
    files = sorted(
        (p for p in MEMORY_DIR.glob("*.md")
         if FILE_DATE_RE.match(p.name) and p.name != "structure-log.md"),
        key=lambda p: p.name, reverse=True,
    )
    out = []
    meta = {"walked": 0, "hit": None, "in_window": 0, "stale_fallback": False, "newest_age_h": None}
    if files:
        meta["newest_age_h"] = round((now - memory_file_time(files[0].name)).total_seconds() / 3600)
    window = [p for p in files[:HANDOFF_WALK_MAX_FILES]
              if (now - memory_file_time(p.name)).total_seconds() / 3600 <= HANDOFF_WALK_MAX_HOURS]
    meta["in_window"] = len(window)
    if not window and files:
        window = files[:HANDOFF_WALK_MAX_FILES]
        meta["stale_fallback"] = True
    for p in window:
        meta["walked"] += 1
        lines = p.read_text(encoding="utf-8").split("\n")
        s = next((i for i, l in enumerate(lines) if HANDOFF_HEAD_RE.match(l)), None)
        if s is None:
            continue
        e = next((j for j in range(s + 1, len(lines)) if lines[j].startswith("## ")), len(lines))
        body = "\n".join(lines[s:e]).rstrip()
        if body.count("\n") >= 2:  # 有實質內容，不只標題
            age_h = round((now - memory_file_time(p.name)).total_seconds() / 3600)
            stale = (f"⚠️ 窗口外補讀：{HANDOFF_WALK_MAX_HOURS}h 內沒有任何 memory 檔，這份交接寫於 {age_h} 小時前，"
                     "裡面的「今天」「明天」「到期」都要對照現在的日期重算\n") if meta["stale_fallback"] else ""
            out.append(f"{stale}（來源：memory/{p.name}，walk 第 {meta['walked']} 檔）\n{body}")
            meta["hit"] = p.name
            break
    # 近 2 天 diary 的「給明天的我」承諾
    cutoff = (now - dt.timedelta(days=2)).date()
    for p in sorted(DIARY_DIR.glob("*.md"), key=lambda p: p.name, reverse=True):
        m = FILE_DATE_RE.match(p.name)
        if not m or parse_date(m.group(1)) < cutoff:
            break
        text = p.read_text(encoding="utf-8")
        if "給明天的我" in text or "給下一個 session" in text or "給下個 session" in text:
            lines = text.split("\n")
            for i, l in enumerate(lines):
                if "給明天的我" in l or "給下一個 session" in l or "給下個 session" in l:
                    blk = lines[i:i + 12]
                    stop = next((k for k, b in enumerate(blk[1:], 1) if b.startswith("## ")), len(blk))
                    out.append(f"（diary/{p.name} 的承諾）\n" + "\n".join(blk[:stop]).rstrip())
                    break
    return ("\n\n".join(out) if out else "（walk 範圍內無 Handoff 段——見 selftest）"), meta


def _bash_bin():
    """在 Windows 偏好 Git bash 避開 WSL bash 跨 9P 檔案系統的 60s+ 逾時。"""
    if sys.platform == "win32":
        git = shutil.which("git")
        if git:
            for cand in (Path(git).parents[1] / "bin" / "bash.exe",
                         Path(git).parents[1] / "usr" / "bin" / "bash.exe"):
                if cand.is_file():
                    return str(cand)
    return "bash"


def sec_groundtruth():
    """委派既有 L4 儀器；任一缺席 fail-loud 記進輸出。

    回傳 (text, meta)。meta["behind"] 三態：
      int 0   — 工作樹與 origin/main 同步
      int >0  — 落後 N 個 commit，本機讀取層全部是歷史快照
      None    — 判不出來（check-parallel-actor 沒跑起來 / 沒吐 PARALLEL_CHECK 行）

    落後數委派 `check-parallel-actor.sh`（它自己 fetch + 算 behind + 發讀取層警告），
    本檔不重寫 git 邏輯（MANIFESTO §指標 over 複寫 / REFLEXES #17）。
    """
    chunks = []
    meta = {"parallel_status": None, "behind": None}
    bash = _bash_bin()
    for cmd in ([bash, "scripts/tools/consciousness-snapshot.sh"],
                [bash, "scripts/tools/routine-status.sh"],
                [bash, "scripts/tools/inbox-signal.sh"],
                [sys.executable, "scripts/tools/observer-presence.py"],
                [bash, "scripts/tools/lib/check-parallel-actor.sh"]):
        is_parallel = cmd[-1].endswith("check-parallel-actor.sh")
        try:
            r = subprocess.run(cmd, cwd=REPO, capture_output=True, text=True, timeout=60)
            out = r.stdout.rstrip() or f"⚠️ {cmd[1]} 無輸出（rc={r.returncode}）"
        except Exception as e:  # noqa: BLE001 — 委派層任何失敗都要現形
            out = f"⚠️ {cmd[-1]} 執行失敗：{e}"
        chunks.append(out)
        if is_parallel:
            m = re.search(r"PARALLEL_CHECK:\s*(\S+)", out)
            if m:
                meta["parallel_status"] = m.group(1)
                b = re.search(r"origin 領先 (\d+) 個 commit", out)
                meta["behind"] = int(b.group(1)) if b else 0

    def log48(ref=None):
        cmd = ["git", "log"] + ([ref] if ref else []) + \
              ["--since=48 hours ago", "--pretty=format:%h %ai %s"]
        r = subprocess.run(cmd, cwd=REPO, capture_output=True, text=True)
        return r.stdout.strip() or "（無）"

    # 「48hr 無 commit」在落後的工作樹上是假訊號而非安靜（REFLEXES #67 子規則「工作樹本身可以是過期快照」，
    # 2026-09-09 opentwbench 第四例）。落後時同時給 origin/main 的真實現況，
    # 並把兩段各自標明讀的是哪棵樹——不讓讀者以為那個「（無）」是世界安靜。
    behind = meta["behind"]
    if behind:
        chunks.append(
            f"🌲 工作樹落後 origin/main {behind} 個 commit —— 「本機 HEAD」那段是 {behind} 個 "
            f"commit 前的世界。本機 git grep / cat / ls / node_modules 同時失真，"
            f"對賬事實請改用 `git show origin/main:<path>` 或先 git pull。\n\n"
            f"🕐 過去 48hr commits（origin/main，真實現況）：\n{log48('origin/main')}\n\n"
            f"🕐 過去 48hr commits（本機 HEAD，落後 {behind}）：\n{log48()}")
    elif behind == 0:
        chunks.append(f"🕐 過去 48hr commits（本機 HEAD 與 origin/main 同步）：\n{log48()}")
    else:
        chunks.append(
            "⚠️ 工作樹新鮮度判不出來（check-parallel-actor 沒吐 PARALLEL_CHECK 行）——"
            f"下面這段可能讀自一棵過期的樹：\n🕐 過去 48hr commits（本機 HEAD）：\n{log48()}")
    return "\n\n".join(chunks), meta


# ---------------------------------------------------------------- selftest
def build(rows_n):
    mem_lines = MEMORY.read_text(encoding="utf-8").split("\n")
    dia_lines = DIARY.read_text(encoding="utf-8").split("\n")
    man_lines = MANIFESTO.read_text(encoding="utf-8").split("\n")
    ref_text = REFLEXES.read_text(encoding="utf-8")
    ref_lines = ref_text.split("\n")

    mem_rows, mem_total, mem_newest = newest_rows(mem_lines, rows_n)
    dia_rows, dia_total, dia_newest = newest_rows(dia_lines, rows_n)
    handoff_text, handoff_meta = sec_handoff()
    top5_text, top5 = sec_reflexes_top5(ref_lines)
    gt_text, gt_meta = sec_groundtruth()

    sections = {
        "groundtruth": gt_text,
        "manifesto-core": sec_manifesto_core(man_lines),
        "reflexes-index": sec_reflexes_index(ref_lines),
        "reflexes-top5": top5_text,
        "memory-head": sec_memory_head(mem_lines),
        "neural": sec_neural(mem_lines),
        "memory-rows": "\n".join(mem_rows) if mem_rows else None,
        "diary-recur": sec_diary_recur(dia_lines),
        "diary-rows": "\n".join(dia_rows) if dia_rows else None,
        "handoff": handoff_text,
    }

    checks = []

    def check(ok, ok_msg, warn_msg):
        checks.append((ok, ok_msg if ok else warn_msg))

    mc = sections["manifesto-core"] or ""
    check("我相信什麼" in mc and "自主權邊界" in mc,
          f"MANIFESTO 身份核心兩段完整（{len(mc.encode('utf-8')) // 1024}KB，含信念與自主權邊界錨）",
          "MANIFESTO 身份核心缺段——## 錨點被改名？甦醒身份載入可疑")
    claim_m = re.search(r"(\d+)\s*條", ref_text[:400])
    idx_rows = sum(1 for l in ref_lines if re.match(r"^\| #\d+", l))
    check(bool(claim_m) and idx_rows == int(claim_m.group(1)),
          f"REFLEXES catalog 對賬：index {idx_rows} 列 == frontmatter 宣稱 {claim_m.group(1) if claim_m else '?'} 條",
          f"REFLEXES catalog 失賬：index {idx_rows} 列 vs 宣稱 {claim_m.group(1) if claim_m else '?'} 條——有反射沒進 index 或宣稱沒 bump")
    check(bool(top5) and top5_text and "⚠️" not in (top5_text or ""),
          f"Top 5 反射全文載入（#{'/#'.join(top5 or [])}，從宣告行解析非寫死）",
          "Top 5 反射解析失敗——宣告行改格式或條目起錨失效")
    raw_mem = newest_raw_file_date(MEMORY_DIR)
    raw_dia = newest_raw_file_date(DIARY_DIR)
    for label, newest, raw in (("memory", mem_newest, raw_mem), ("diary", dia_newest, raw_dia)):
        if newest and raw:
            gap = (parse_date(raw) - parse_date(newest)).days
            check(gap <= FRESHNESS_GRACE_DAYS,
                  f"{label} 索引新鮮：最新列 {newest}（raw 最新 {raw}，落差 {gap}d ≤ {FRESHNESS_GRACE_DAYS}d）",
                  f"{label} 索引可能過期：最新列 {newest} 落後 raw 檔 {raw} 達 {gap}d——你讀到的「近況」可疑")
        else:
            check(False, "", f"{label} 索引或 raw 檔解析不到日期（結構異常）")
        if raw:
            checks.append(silence_check(label, raw, dt.date.today()))
    nb =len((sections["neural"] or "").encode("utf-8"))
    rb = len((sections["diary-recur"] or "").encode("utf-8"))
    check(nb > 1500,
          f"神經迴路段完整（{nb // 1024}KB，止錨於心跳日誌前）",
          "神經迴路段空或過小——anchor 解析失敗？")
    check(rb > 1500,
          f"反覆出現的思考段完整（{rb // 1024}KB）",
          "反覆出現的思考段空或過小——anchor 解析失敗？")
    # 兩種「讀不到交接」的根因不同，處置也不同（REFLEXES #38）：窗口內沒有檔＝飛輪停了，
    # 先查宿主機與額度；窗口內有檔但沒交接段＝收官漏寫。舊版兩者共用一句話。
    if handoff_meta["stale_fallback"]:
        check(False, "",
              f"{HANDOFF_WALK_MAX_HOURS}h 內沒有任何 memory 檔（最新一份在 {handoff_meta['newest_age_h']} 小時前）"
              f"——飛輪可能停轉，先查排程器與帳號額度；已改讀最新一份"
              + (f"的交接（{handoff_meta['hit']}），裡面的日期要重算" if handoff_meta["hit"] else "，仍無交接段"))
    else:
        check(handoff_meta["hit"] is not None,
              f"handoff 命中：{handoff_meta['hit']}（walk {handoff_meta['walked']} 檔）",
              f"walk {handoff_meta['walked']} 檔（≤{HANDOFF_WALK_MAX_FILES} 檔/{HANDOFF_WALK_MAX_HOURS}h）無非空 Handoff 段——上游收官可能漏寫")
    check(len(mem_rows) == min(rows_n, mem_total) and len(dia_rows) == min(rows_n, dia_total),
          f"列數足額：memory {len(mem_rows)}/{mem_total}、diary {len(dia_rows)}/{dia_total}",
          f"列數短少：memory {len(mem_rows)} / diary {len(dia_rows)}（要求 {rows_n}）")
    # 工作樹新鮮度（2026-09-09 opentwbench）：REFLEXES #67 子規則「工作樹本身可以是過期
    # 快照」vc=4 的修法落地。訊號本來就存在（check-parallel-actor 的 REMOTE_AHEAD），但不在
    # 甦醒必經路徑上——第 1-3 例都是當班自己想到才跑，第 4 例是 groundtruth 印「48hr 無
    # commit」而本機落後 249 個 commit。掛進 selftest 後，落後即 ⚠️，BECOME §1.3 要求
    # 甦醒第一句話說出來，不再靠當班臨時警覺。
    behind, pstat = gt_meta["behind"], gt_meta["parallel_status"] or "UNKNOWN"
    if behind is None:
        check(False, "", "工作樹新鮮度判不出來（check-parallel-actor 沒吐 PARALLEL_CHECK "
                         "行）——不知道本機是不是過期快照，動 git 前手動跑一次那支")
    else:
        check(behind == 0,
              f"工作樹與 origin/main 同步（parallel-check: {pstat}）",
              f"⛔ 工作樹落後 origin/main {behind} 個 commit——本檔的 git log 與本機所有 "
              f"grep / cat / ls / node_modules 都是 {behind} 個 commit 前的快照，"
              f"「48hr 無 commit」是假訊號不是安靜。動手前先 git pull（REFLEXES #67 子規則：工作樹本身可以是過期快照）")

    return sections, checks


def render_block(name, body):
    body = body or f"⚠️ {name} 段撈不到內容"
    return f"\n{'═' * 8} 🧬 wake:{name} {'═' * 8}\n{body}"


def selftest_lines(checks, tax):
    lines = [f"\n{'═' * 8} 🧬 wake:selftest {'═' * 8}"]
    lines += [("✅ " if ok else "⚠️ ") + msg for ok, msg in checks]
    if tax:
        total = sum(tax.values())
        detail = " + ".join(f"{k} {v // 1024}K" for k, v in tax.items())
        lines.append(f"🧠 wake 稅 ≈ {total // 1024}KB（{detail}）")
    warns = [msg for ok, msg in checks if not ok]
    lines.append("⚠️ 有帶病訊號：甦醒時說出來，不要靜默帶病工作" if warns
                 else f"✅ 取數健康：{len(checks)} 項體檢全綠")
    return lines


def main():
    ap = argparse.ArgumentParser(description="甦醒取數單一儀器（date-aware / anchor-aware / fail-loud / 完整落檔）")
    ap.add_argument("--sections", default=None,
                    help=f"逗號清單＝針對性小量拉取，直接印 stdout（大段自負截斷風險）。"
                         f"不給＝完整落檔模式。全段：{','.join(ALL_SECTIONS)}")
    ap.add_argument("--rows", type=int, default=20, help="索引列數（預設 20）")
    ap.add_argument("--check", action="store_true", help="只跑 selftest（程式化健檢，不倒內容）")
    args = ap.parse_args()

    sections, checks = build(args.rows)
    warns_of = lambda cs: [msg for ok, msg in cs if not ok]  # noqa: E731

    if args.check:
        for l in selftest_lines(checks, {}):
            print(l)
        return 2 if warns_of(checks) else 0

    if args.sections is not None:
        # 針對性小量拉取（如 --sections handoff,selftest）：維持 v1 stdout 行為
        wanted = [s.strip() for s in args.sections.split(",") if s.strip()]
        tax = {}
        for name in ALL_SECTIONS:
            if name == "selftest" or name not in wanted:
                continue
            body = sections.get(name)
            tax[name] = len((body or "").encode("utf-8"))
            print(render_block(name, body))
        if "selftest" in wanted:
            for l in selftest_lines(checks, tax):
                print(l)
        return 2 if warns_of(checks) else 0

    # ---- 完整落檔模式（default）----
    # 內容全部住檔案、stdout 只留 manifest＋selftest：全段 ~200KB 超過 Bash tool
    # ~30K 字元上限，走 stdout 必被截斷（設計原則 5 病史）。讀取端用 Read 分頁
    # 讀到末行 wake:END sentinel 才算讀完。
    tax = {}
    payload = ""
    for name in ALL_SECTIONS:
        if name == "selftest":
            continue
        body = sections.get(name)
        tax[name] = len((body or "").encode("utf-8"))
        payload += render_block(name, body)
    payload += "\n".join(selftest_lines(checks, tax)) + "\n"
    n_secs = len(ALL_SECTIONS)  # 內容段 + selftest 段
    sentinel = (f"{'═' * 8} 🧬 wake:END — {n_secs} 段 / "
                f"{len(payload.encode('utf-8')):,} bytes ═{'═' * 7}")
    file_text = payload + sentinel + "\n"

    LATEST_FILE.parent.mkdir(exist_ok=True)
    LATEST_FILE.write_bytes(file_text.encode("utf-8"))
    written = LATEST_FILE.stat().st_size
    expected = len(file_text.encode("utf-8"))
    if written == expected:
        checks = checks + [(True, f"落檔完整：{LATEST_FILE.relative_to(REPO)}（{written:,} bytes）")]
    else:
        checks = checks + [(False, f"落檔大小不符：stat {written:,} vs 預期 {expected:,}")]

    # 段落地圖：掃檔案行號，讓 Review/Write mode 可跳讀特定段
    ranges, starts = {}, []
    for i, l in enumerate(file_text.split("\n"), 1):
        if l.startswith("════════ 🧬 wake:"):
            starts.append((l.split("wake:")[1].split(" ")[0], i))
    for k, (name, s) in enumerate(starts):
        e = starts[k + 1][1] - 1 if k + 1 < len(starts) else len(file_text.split("\n"))
        ranges[name] = (s, e)

    print(f"{'═' * 8} 🧬 wake-context manifest {'═' * 8}")
    print("完整輸出已落檔（stdout 只有 manifest＋selftest，內容不在這裡）：")
    print(f"  檔案  {LATEST_FILE.relative_to(REPO)}")
    print(f"  大小  {written:,} bytes / {file_text.count(chr(10)):,} 行 / {n_secs} 段")
    print("⛔ 完整讀取鐵律（BECOME §1.3）：用 Read 工具分頁讀完整份檔案，直到")
    print("   末行 wake:END sentinel（沒讀到 sentinel = 沒讀完 = 不准開口）。")
    print("   禁 | head / | tail / awk 節選——2026-07-11〜12 全部 cron 甦醒曾用")
    print("   head -N 自行截斷，記憶層整層消失（哲宇 2026-07-12 directive）。")
    print("段落地圖（檔內行號，Review/Write mode 跳讀用）：")
    for name, (s, e) in ranges.items():
        print(f"  L{s:04d}-L{e:04d}  {name}")
    for l in selftest_lines(checks, tax):
        print(l)
    return 2 if warns_of(checks) else 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except BrokenPipeError:
        # 下游 head/tail 提前關管線：不留 traceback，但以 exit 2 表達「讀取不完整」
        import os
        os.dup2(os.open(os.devnull, os.O_WRONLY), sys.stdout.fileno())
        sys.exit(2)
