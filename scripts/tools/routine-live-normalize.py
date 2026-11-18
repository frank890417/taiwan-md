#!/usr/bin/env python3
"""
routine-live-normalize.py — scheduler live 狀態 → git 可見的 normalized dump

per dna-audit 2026-07-05 §S1 根治方向：「把 live scheduler 狀態變成 git 可見」。
MCP scheduled-tasks 的 live 狀態存在 server 內部 store（mirror 目錄只有 SKILL.md，
無 config json），bash 工具讀不到 —— 所以 dump 必須由 session 呼叫
`mcp__scheduled-tasks__list_scheduled_tasks` 後，把原始 JSON 餵給本工具落檔。

用法（data-refresh session 的 rider step，per DATA-REFRESH-PIPELINE §live dump）：
    1. session 呼叫 list_scheduled_tasks，把回傳 JSON 存到暫存檔
    2. python3 scripts/tools/routine-live-normalize.py <raw.json> [--session <id>]
    3. 產出 docs/semiont/routine-live-state.json（跟著 refresh commit 進 git）

隱私鐵律：**只保留 taskId 以 twmd- / taiwanmd- 開頭的任務**。scheduler 裡有
觀察者私人 routine（muse-* / fin-*），它們的存在與描述不屬於公開 repo。

下游消費者：routine-sync-check.py v3 第三層比對（SSOT ↔ mirror ↔ live）；
routine-liveness-check.py（沉默死亡對賬）→ generate-dashboard-alerts.mjs。

落檔後順手重生 dashboard-alerts.json 與 dashboard-status.json（--no-alerts 兩個都關）：refresh-data.sh 的 prebuild
在本工具之前跑，算沉默死亡時讀的是前一天的 dump，前一天傍晚之後才跑的 routine
（routine-audit 週日 21:00、supporters 週一 01:00）會被印成「fire 後零痕跡」，
這份告警再跟著 refresh commit 進 git，整天出現在每一班的 groundtruth。
2026-10-12 twmd-data-refresh-am 量到：重生前 4 條黃燈，重生後 2 條。
"""

import json
import re
import subprocess
import sys
from datetime import datetime, timezone, timedelta
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent.parent
OUT_PATH = REPO_ROOT / "docs" / "semiont" / "routine-live-state.json"
TWMD_PREFIX = re.compile(r"^(twmd-|taiwanmd-)")

KEEP_FIELDS = [
    "taskId",
    "description",
    "cronExpression",
    "enabled",
    "lastRunAt",
    "nextRunAt",
]


def main():
    args = sys.argv[1:]
    session = "unknown"
    if "--session" in args:
        i = args.index("--session")
        session = args[i + 1]
        del args[i : i + 2]
    regen_alerts = "--no-alerts" not in args
    args = [a for a in args if a != "--no-alerts"]
    if not args:
        print(
            "usage: routine-live-normalize.py <raw-mcp-list.json> "
            "[--session <id>] [--no-alerts]"
        )
        return 1

    raw = json.loads(Path(args[0]).read_text(encoding="utf-8"))
    if isinstance(raw, dict) and "tasks" in raw:
        raw = raw["tasks"]

    tasks = []
    dropped = 0
    for t in raw:
        if not TWMD_PREFIX.match(t.get("taskId", "")):
            dropped += 1  # 私人 routine，不落公開 repo
            continue
        tasks.append({k: t.get(k) for k in KEEP_FIELDS})
    tasks.sort(key=lambda t: t["taskId"])

    tz = timezone(timedelta(hours=8))
    out = {
        "fetched_at": datetime.now(tz).isoformat(timespec="seconds"),
        "fetched_by": session,
        "source": "mcp scheduled-tasks list_scheduled_tasks",
        "note": "S1 根治第一塊磚（dna-audit 2026-07-05）：live scheduler 狀態 git 可見化。"
        "只含 twmd-/taiwanmd- 任務（私人 routine 已過濾），"
        "消費者 = routine-sync-check.py v3 三層比對。",
        "enabled_count": sum(1 for t in tasks if t["enabled"]),
        "disabled_count": sum(1 for t in tasks if not t["enabled"]),
        "tasks": tasks,
    }
    OUT_PATH.write_text(
        json.dumps(out, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    print(
        f"✅ {OUT_PATH.relative_to(REPO_ROOT)}: {out['enabled_count']} enabled "
        f"+ {out['disabled_count']} disabled（過濾 {dropped} 條私人 routine）"
    )
    if regen_alerts:
        # dashboard-status 也讀 routine-live-state.json（refresh-data.sh Step 6.6
        # 在本工具之前跑）。2026-11-18 dump 停十一天，狀態頁在刷新後仍印
        # stale_hours=263.5，要手動重跑才歸零；跟 alerts 同一處一起重生。
        for name, script in (
            ("dashboard-alerts", "scripts/core/generate-dashboard-alerts.mjs"),
            ("dashboard-status", "scripts/core/generate-dashboard-status.mjs"),
        ):
            r = subprocess.run(
                ["node", script],
                cwd=REPO_ROOT,
                capture_output=True,
                text=True,
            )
            tail = (r.stdout or r.stderr).strip().splitlines()[-1:] or ["(no output)"]
            mark = "✅" if r.returncode == 0 else "⚠️"
            print(f"{mark} {name} 依新 dump 重生：{tail[0]}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
