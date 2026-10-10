#!/usr/bin/env python3
"""routine-sync.py — 讓任何一台跑 routine 的機器自己跟 git 的 routine SSOT 對齊。

## 為什麼存在

routine 飛輪有三層，其中一層一直在 git 之外：

    docs/semiont/ROUTINE.md            SSOT：有哪些 routine、幾點跑、開沒開（在 git）
    docs/semiont/routine-prompts/*.md  cron prompt 本體（在 git ← 本工具引入的新層）
    ~/.claude/scheduled-tasks/*/SKILL.md  機器上真正被排程器讀的那份（machine-local）
    排程器 live 狀態                    cron / enabled 的實際值（只能透過 scheduled-tasks MCP 改）

第三層住在 `~/.claude/`，不在 git 裡。所以在 A 機改了 SSOT，B 機永遠不會知道——
2026-07-25 實測：mouhouse 上 19 份 prompt 有 4 份已與母本分岔（babel-nightly /
data-refresh-am / distill-weekly / embeddings-nightly），git 完全沒有紀錄。

本工具把第二層放進 git 當 DNA，第三層變成它表達出來的蛋白質——跟
`knowledge/` → `src/content/` 同一個代謝模型（MANIFESTO §信念 6）。

## 用法

    python3 scripts/tools/routine-sync.py                 # 只看：三層對賬，不動任何檔案
    python3 scripts/tools/routine-sync.py --apply         # git → 機器（分岔的機器版先存證再覆蓋）
    python3 scripts/tools/routine-sync.py --harvest       # 機器 → git（在機器上改過、要讓 git 學會時）
    python3 scripts/tools/routine-sync.py --json          # 給 routine session 讀的結構化輸出

## 兩個方向都要存在的理由

單向工具會製造損失。`--apply` 遇到機器版比 git 新時如果直接覆蓋，就是把別人在那台
機器上的修改靜默刪掉；所以 `--apply` 一律先把機器版存進 `reports/routine-prompt-drift/`
留證再寫（raw 永不刪除，跟今天 babel 的「隔離前存證」同一條紀律）。反向的
`--harvest` 給「機器才是真相」的場景，例如本工具誕生當下。

## 邊界

cron 與 enabled 的 live 值**本工具不改**——那要透過 scheduled-tasks MCP，而 MCP 只有
session 叫得動。本工具負責把「該改成什麼」算出來印清楚，改的動作留給 routine session
（MANIFESTO §14：能機械化的做成儀器，需要判斷與權限的留給判斷）。

對賬前先 `git fetch origin main`，本機 routine 層（ROUTINE.md＋routine-prompts/）跟
origin/main 有差就印 🌐 並 exit 1：本機落後時三層可以一致地一起舊。fetch 失敗印 ❔「沒量到」，
不當成零差。表頭另印 live 鏡像的齡（cron／enabled 對賬讀的是鏡像，不是排程器本身）。

Exit code: 0 = 三層一致且 origin 側無差；1 = 有漂移或 origin 側有差；2 = 環境壞掉（SSOT 讀不到）。
"""

from lib.routine_decisions import enforce_decisions

import argparse
import json
import os
import re
import shutil
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent.parent
ROUTINE_SSOT = REPO_ROOT / "docs" / "semiont" / "ROUTINE.md"
PROMPT_DIR = REPO_ROOT / "docs" / "semiont" / "routine-prompts"
LIVE_STATE = REPO_ROOT / "docs" / "semiont" / "routine-live-state.json"
DRIFT_ARCHIVE = REPO_ROOT / "reports" / "routine-prompt-drift"
MIRROR_ROOT = Path(os.path.expanduser("~/.claude/scheduled-tasks"))

# SSOT taskId → 機器上的 dir 名（歷史命名差異，跟 routine-sync-check.py 同一張表）
ALIASES = {"twmd-feedback-triage": "taiwanmd-routine-twmd-feedback-triage"}



def local_node_name():
    """本機節點名（`.taiwanmd/node-name.local`，gitignored）。給 🖥️ 節點標記比對用。"""
    f = REPO_ROOT / ".taiwanmd" / "node-name.local"
    try:
        return f.read_text(encoding="utf-8").strip().splitlines()[0].strip()
    except (OSError, IndexError):
        return ""


def belongs_to_this_node(row_text, node):
    """排程表某列帶 `🖥️<節點名>` 時，只屬那台機器；沒有標記 = 所有營運機都該有。

    沒這道判斷的話，只跑在指揮部的 flywheel-watch 會讓營運機每天被報成缺一條 prompt。
    """
    m = re.search(r"🖥️\s*([A-Za-z0-9._-]+)", row_text)
    if not m:
        return True
    return m.group(1).strip() == node


def die(msg, code=2):
    print(f"routine-sync: {msg}", file=sys.stderr)
    sys.exit(code)


def parse_ssot_table():
    """從 ROUTINE.md 的 routine 排程表撈 taskId → {cron, enabled, title}。

    cron / enabled 的 SSOT 是 ROUTINE.md 一處，本工具不另存 manifest（§指標 over 複寫）。
    """
    if not ROUTINE_SSOT.exists():
        die(f"讀不到 SSOT {ROUTINE_SSOT}")
    tasks = {}
    node = local_node_name()
    # 表格區塊三態。ROUTINE.md 的 taskId 出現在三種表裡，語意完全不同：
    #   排程表     → 要對賬
    #   ⏸️ PAUSED  → 要對賬，但 enabled=False（那一列本身不一定有 ⏸️ 字樣。2026-07-25
    #                首跑踩到：music-media-audit 被讀成 enabled，差點去打開一條刻意關掉的 task）
    #   🪦 已退休  → **整列跳過**。排程已刪、prompt 已歸檔，還撈進來就會永遠報
    #                prompt-missing-both（同一個「認字不認表」bug 的第二面）
    section = "schedule"
    for line in ROUTINE_SSOT.read_text(encoding="utf-8").splitlines():
        if "⏸️ PAUSED" in line:
            section = "paused"
        elif "🪦 已退休" in line:
            section = "retired"
        elif line.startswith("#"):
            section = "schedule"
        if not line.startswith("|"):
            continue
        if section == "retired":
            continue
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        if len(cells) < 3:
            continue
        m = re.search(r"`(twmd-[a-z0-9-]+)`", cells[0])
        if not m:
            continue
        cron = ""
        for c in cells:
            cm = re.fullmatch(r"`([-\d*/, ]+)`", c)
            if cm and len(cm.group(1).split()) == 5:
                cron = cm.group(1).strip()
                break
        row = " ".join(cells)
        if not belongs_to_this_node(row, node):
            continue
        enabled = section != "paused" and "⏸️" not in row and "PAUSED" not in row
        tasks[m.group(1)] = {"cron": cron, "enabled": enabled, "title": cells[1]}
    return enforce_decisions(tasks, ROUTINE_SSOT.read_text(encoding="utf-8"))


def machine_path(task_id):
    return MIRROR_ROOT / ALIASES.get(task_id, task_id) / "SKILL.md"


def git_prompt_path(task_id):
    return PROMPT_DIR / f"{ALIASES.get(task_id, task_id)}.md"


def read(p):
    try:
        return p.read_text(encoding="utf-8")
    except OSError:
        return None


def load_live():
    if not LIVE_STATE.exists():
        return {}
    try:
        data = json.loads(LIVE_STATE.read_text(encoding="utf-8"))
        return {t["taskId"]: t for t in data.get("tasks", [])}
    except (json.JSONDecodeError, KeyError):
        return {}


def live_cron(lv):
    """鏡像的鍵名是 `cronExpression`（MCP list_scheduled_tasks 原樣）。

    2026-10-11 之前這裡只讀 `cron`，鍵名對不上，cron 漂移從工具誕生起一次都沒比過，
    而表格照印 ✅、live_known 照樣是 True——尺在量，只是量的欄位是空的（REFLEXES #99）。
    """
    return (lv.get("cronExpression") or lv.get("cron") or "").strip()


def live_mirror_age_hours():
    """routine-live-state.json 是誰、何時從 MCP 抄下來的。回傳 (小時數 or None, fetched_by)。

    cron／enabled 的對賬讀的是這份鏡像不是排程器本身。寫它的 data-refresh 排在 06:00、
    讀它的 routine-sync 排在 05:30，所以本班每天必然量到前一天的 live（09-29 起手動補驗
    十三輪才把這個順序說清楚）。齡數印在表頭，讀的人才知道綠燈是幾小時前的綠。
    """
    try:
        data = json.loads(LIVE_STATE.read_text(encoding="utf-8"))
        ts = datetime.fromisoformat(data["fetched_at"])
        age = (datetime.now(timezone.utc) - ts).total_seconds() / 3600
        return age, data.get("fetched_by", "?")
    except (OSError, json.JSONDecodeError, KeyError, ValueError):
        return None, "?"


ROUTINE_LAYER = ["docs/semiont/ROUTINE.md", "docs/semiont/routine-prompts/"]


def origin_divergence(do_fetch=True):
    """本機 HEAD 的 routine 層跟 origin/main 有沒有差。回傳 (檔名清單 or None, 說明)。

    三層對賬比的是「本機 git」跟「本機排程器」。本機 git 落後 origin 時，兩邊可以完美一致
    而一起是舊的（09-11〜09-20 分岔十天就是這樣，routine-sync 天天印綠）。手動補驗
    `git fetch` + `git diff --stat` 傳了十六輪 handoff，2026-10-11 self-evolve 收進來。
    None = 沒量到（fetch 失敗、沒有 origin），跟「零差」分開印（REFLEXES #85）。
    """
    def git(*a, timeout=60):
        return subprocess.run(["git", "-C", str(REPO_ROOT), *a], capture_output=True, text=True, timeout=timeout)

    try:
        if do_fetch:
            f = git("fetch", "--quiet", "origin", "main")
            if f.returncode != 0:
                return None, f"git fetch 失敗：{(f.stderr or '').strip()[:120]}"
        d = git("diff", "--name-only", "HEAD", "origin/main", "--", *ROUTINE_LAYER)
        if d.returncode != 0:
            return None, f"git diff 失敗：{(d.stderr or '').strip()[:120]}"
    except (OSError, subprocess.TimeoutExpired) as e:
        return None, f"git 呼叫失敗：{e}"
    files = [x for x in d.stdout.splitlines() if x.strip()]
    return files, ("已 fetch" if do_fetch else "未 fetch，比的是本機已知的 origin/main")


def host_slug():
    """主機名進檔名，讓兩台機器同一天存同一條 routine 不會撞檔。

    2026-07-25 首日就踩到：指揮部與 mouhouse 各自 --apply，產出同名的
    `2026-07-25-twmd-feedback-triage.md` 但**內容不同**（一份是遷移期舊母本、
    一份是那台真正在跑的版本）。git 擋住 merge 才沒毀掉其中一份證據。
    per REFLEXES #51 filename collision 要用 canonical ID 解。
    """
    import socket

    return re.sub(r"[^a-z0-9]+", "-", socket.gethostname().lower()).strip("-") or "unknown-host"


def archive_drift(task_id, content, stamp):
    """機器版被覆蓋前先存證。stamp 由呼叫端傳入（腳本內不取系統時間，方便重跑對賬）。"""
    DRIFT_ARCHIVE.mkdir(parents=True, exist_ok=True)
    out = DRIFT_ARCHIVE / f"{stamp}-{host_slug()}-{task_id}.md"
    out.write_text(content, encoding="utf-8")
    return out.relative_to(REPO_ROOT)


def survey():
    ssot = parse_ssot_table()
    live = load_live()
    rows = []
    seen_dirs = set()

    for task_id, meta in sorted(ssot.items()):
        gp, mp = git_prompt_path(task_id), machine_path(task_id)
        seen_dirs.add(mp.parent.name)
        g, m = read(gp), read(mp)
        if g is None and m is None:
            state = "prompt-missing-both"
        elif g is None:
            state = "prompt-only-on-machine"
        elif m is None:
            state = "prompt-missing-on-machine"
        elif g == m:
            state = "in-sync"
        else:
            state = "prompt-drift"

        lv = live.get(ALIASES.get(task_id, task_id)) or live.get(task_id)
        cron_drift = enabled_drift = None
        if lv:
            lc = live_cron(lv)
            if meta["cron"] and lc and " ".join(lc.split()) != " ".join(meta["cron"].split()):
                cron_drift = {"ssot": meta["cron"], "live": lc}
            le = lv.get("enabled")
            if le is not None and bool(le) != meta["enabled"]:
                enabled_drift = {"ssot": meta["enabled"], "live": bool(le)}

        rows.append(
            {
                "task_id": task_id,
                "state": state,
                "git_prompt": str(gp.relative_to(REPO_ROOT)),
                "machine_prompt": str(mp),
                "cron_drift": cron_drift,
                "enabled_drift": enabled_drift,
                "live_known": lv is not None,
            }
        )

    orphans = []
    if MIRROR_ROOT.exists():
        for d in sorted(MIRROR_ROOT.glob("twmd-*")) + sorted(MIRROR_ROOT.glob("taiwanmd-*")):
            if d.is_dir() and d.name not in seen_dirs:
                orphans.append(d.name)
    return rows, orphans


ICON = {
    "in-sync": "✅",
    "prompt-drift": "⚠️ ",
    "prompt-missing-on-machine": "❌",
    "prompt-only-on-machine": "📥",
    "prompt-missing-both": "❓",
}


def main():
    ap = argparse.ArgumentParser(description="routine 三層對賬與同步")
    g = ap.add_mutually_exclusive_group()
    g.add_argument("--apply", action="store_true", help="git → 機器（先存證再覆蓋）")
    g.add_argument("--harvest", action="store_true", help="機器 → git")
    ap.add_argument("--json", action="store_true", help="結構化輸出")
    ap.add_argument("--stamp", default="unstamped", help="存證檔名用的日期字串，如 2026-07-25")
    ap.add_argument("--no-fetch", action="store_true", help="不先 git fetch（離線或測試用；仍會比本機已知的 origin/main）")
    args = ap.parse_args()

    origin_files, origin_note = origin_divergence(do_fetch=not args.no_fetch)
    mirror_age, mirror_by = live_mirror_age_hours()

    rows, orphans = survey()
    changed = []

    if args.apply or args.harvest:
        for r in rows:
            gp = REPO_ROOT / r["git_prompt"]
            mp = Path(r["machine_prompt"])
            if args.apply:
                if r["state"] in ("prompt-drift", "prompt-missing-on-machine"):
                    if r["state"] == "prompt-drift":
                        kept = archive_drift(r["task_id"], read(mp), args.stamp)
                        changed.append(f"存證機器版 → {kept}")
                    mp.parent.mkdir(parents=True, exist_ok=True)
                    shutil.copyfile(gp, mp)
                    changed.append(f"寫入機器 {r['task_id']}")
            else:  # harvest
                if r["state"] in ("prompt-drift", "prompt-only-on-machine"):
                    PROMPT_DIR.mkdir(parents=True, exist_ok=True)
                    shutil.copyfile(mp, gp)
                    changed.append(f"收進 git {r['task_id']}")
        rows, orphans = survey()  # 重新對賬，證明真的寫進去了

    if args.json:
        print(
            json.dumps(
                {
                    "rows": rows,
                    "orphans": orphans,
                    "changed": changed,
                    "origin_routine_diff": origin_files,
                    "origin_note": origin_note,
                    "live_mirror_age_hours": None if mirror_age is None else round(mirror_age, 1),
                    "live_mirror_fetched_by": mirror_by,
                },
                ensure_ascii=False,
                indent=2,
            )
        )
    else:
        print(f"🧬 routine 三層對賬（機器：{MIRROR_ROOT}）")
        if origin_files is None:
            print(f"  ❔ origin 側 routine 層：沒量到（{origin_note}）——綠燈只代表本機 git，不代表 origin")
        elif origin_files:
            print(f"  🌐 origin 側 routine 層與本機不同（{len(origin_files)} 檔，{origin_note}）：{', '.join(origin_files[:6])}")
            print("     本機 git 是舊的 SSOT，三層一致也是一起舊；先 git pull 再對賬")
        else:
            print(f"  🌐 origin 側 routine 層與本機相同（{origin_note}）")
        if mirror_age is None:
            print("  ❔ live 鏡像 routine-live-state.json 讀不到 fetched_at，cron／enabled 對賬沒有時間基準")
        else:
            stale = "  ⚠️ 超過 24 小時，cron／enabled 那兩欄是更早的 live" if mirror_age > 24 else ""
            print(f"  🕐 cron／enabled 比的是 live 鏡像，齡 {mirror_age:.1f} 小時（{mirror_by}）{stale}")
        print()
        for r in rows:
            line = f"  {ICON.get(r['state'], '  ')} {r['task_id']:<28} {r['state']}"
            if r["cron_drift"]:
                line += f"  ⏰ cron SSOT={r['cron_drift']['ssot']} live={r['cron_drift']['live']}"
            if r["enabled_drift"]:
                line += f"  🔌 enabled SSOT={r['enabled_drift']['ssot']} live={r['enabled_drift']['live']}"
            if not r["live_known"]:
                line += "  （live 狀態不明）"
            print(line)
        if orphans:
            print(f"\n  📦 機器上有但 SSOT 沒列：{', '.join(orphans)}")
        for c in changed:
            print(f"  ✍️  {c}")

    # 一個 task 同時 prompt 漂移又 cron 漂移只算一項（別把同一件事數兩次）
    bad = [
        r
        for r in rows
        if r["state"] != "in-sync" or r["cron_drift"] or r["enabled_drift"]
    ]
    if origin_files:
        if not args.json:
            print(f"\norigin 側 routine 層有 {len(origin_files)} 檔跟本機不同，對賬的基準是舊的。")
        sys.exit(1)
    if bad:
        if not args.json:
            # 走 stdout 跟表格同一條通道，不然 shell 交錯會讓結論印在表格上面
            print(f"\n漂移 {len(bad)} 項。git→機器跑 --apply；機器才是真相跑 --harvest。")
            print("cron / enabled 的 live 值本工具不改，要 session 用 scheduled-tasks MCP 動手。")
        sys.exit(1)
    if not args.json:
        print("\n✅ 三層一致")
    sys.exit(0)


if __name__ == "__main__":
    main()
