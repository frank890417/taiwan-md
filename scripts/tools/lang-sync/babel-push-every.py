#!/usr/bin/env python3
"""babel-push-every.py — 本機未推送的譯文累積到 N 篇就推上 origin。

哲宇 2026-09-26 directive：「commit + push every 50」＋「also fix the diverged main」。

為什麼要有這支：
  dispatcher 只 commit 不 push（SQUEEZE §Z3「不 push 中途」），推送一直是 routine
  順手做的事（maintainer-am 合併 origin 再推、babel-nightly 收官推）。2026-09-25
  23:17 Claude Desktop 登入過期，隔天七條 routine 全部起不來，本機 71 個 babel
  commit 在工作樹裡躺了 25 小時沒上站；同一段時間另一個 session 從 worktree 往
  origin 推了 7 個 commit，main 分岔。產線的壽命是「好幾天」，routine 的壽命是
  「登入還有效的那幾週」——推送綁在短命的那一邊，兩者之間就會長出沒人推的空窗，
  而空窗期間每一份譯文都只存在於一台機器的硬碟上。這支把「推」從 routine 拆出來，
  跟產線同壽命（launchd 常駐），數到 N 篇就推。

做法（--watch 每 --interval 秒一次；--once 只做一次）：
  1. 數 origin/main..HEAD 動到的譯文檔（knowledge/<lang>/…，lang ∈ ALL_TRANSLATION_LANGS），
     去重。不到 --min 篇 → 睡。
  2. git fetch。origin 領先 → 在共用鎖（/tmp/taiwan-md-git.lock，跟 dispatcher 的
     git_lock_commit 同一把）底下 git merge --no-edit origin/main。有衝突 →
     merge --abort、大聲記錄、本輪不推：衝突要人判斷，這支不自動解。
  3. git push origin HEAD:main，走 husky pre-push（全站 article-health 等閘門），
     **不加 --no-verify**（MANIFESTO §禁忌一）。被拒 → 記錄，下一輪重來。
  4. 每個動作寫一行進 .taiwanmd/babel-push.log（時間、篇數、結果）。

刻意不做的事：
  - 不 commit：commit 是各產線自己的事（dispatcher 每 10 篇、委派層每批），這支
    只負責把「已經 commit 的」送出去。混在一起，失敗時就分不清是誰的東西沒進去。
  - 不 rebase：dispatcher 在同一棵樹上持續 commit，改寫歷史會讓它下一次 commit
    撞上改過的 HEAD（REFLEXES #35 背景產線跑期間禁 destructive git）。合併留下
    merge commit 是這個取捨的代價，已知且可接受（09-25 maintainer-am 同一做法）。
  - 不在非 main 分支上動作：有人把主工作樹切走了，那是需要人看的狀況。

pre-push 的全站 article-health 掃的是磁碟上的工作樹，會掃到 dispatcher 還在驗的
候選譯文——那種時候推送會被擋，但被擋的原因不在這次要推的 commit 裡。這支不繞過，
記一行「pre-push 擋下」等下一輪（候選檔在幾分鐘內不是被收進 commit 就是被還原）。
連續被擋超過 --alert-after 次才升級成 ⚠️，那才是真的有壞檔進了 commit。

用法：
  python3 scripts/tools/lang-sync/babel-push-every.py --once            # 到 50 才推
  python3 scripts/tools/lang-sync/babel-push-every.py --once --min 1    # 有就推
  python3 scripts/tools/lang-sync/babel-push-every.py --watch           # 常駐
  python3 scripts/tools/lang-sync/babel-push-every.py --status          # 只印未推篇數

常駐（launchd，跟 com.taiwanmd.babel.nightly 同一種掛法，重開機後需要重掛）：
  launchctl submit -l com.taiwanmd.babel.push-every \\
    -o /tmp/babel-push-every.out -e /tmp/babel-push-every.err -- \\
    /Users/musebase/.venvs/taiwanmd/bin/python \\
    /Users/musebase/Projects/taiwan-md/scripts/tools/lang-sync/babel-push-every.py --watch
  移除：launchctl remove com.taiwanmd.babel.push-every
"""
from __future__ import annotations

import argparse
import os
import subprocess
import sys
import time
from datetime import datetime
from pathlib import Path

REPO = Path(__file__).resolve().parents[3]
sys.path.insert(0, str(Path(__file__).resolve().parent))
from langs import ALL_TRANSLATION_LANGS  # noqa: E402

GIT_LOCK = Path("/tmp/taiwan-md-git.lock")   # 跟 babel-dispatch.py git_lock_commit 同一把
LOG = REPO / ".taiwanmd" / "babel-push.log"

# launchd 不讀 shell profile：python3 會落到 Apple 的 3.9（pre-push 呼叫的工具需要
# 3.10+）、node／gh 不在 PATH 上（pre-push 的 UI 語言閘門要 node；git 的 credential
# helper 是 `gh auth git-credential`，沒有 gh 就推不上去）。跟 babel-launch-wrapper.sh
# 同一個教訓（09-19 從 launchd 重掛第一輪就 crash-loop），這裡把 PATH 明寫。
_HOME = Path.home()
_EXTRA_PATH = [
    str(Path(sys.executable).parent),
    str(_HOME / ".local" / "bin"),
    str(REPO / "node_modules" / ".bin"),
    "/opt/homebrew/bin",
    "/usr/local/bin",
]
os.environ["PATH"] = ":".join(_EXTRA_PATH + [os.environ.get("PATH", "/usr/bin:/bin")])


def log(msg: str) -> None:
    line = f"{datetime.now().strftime('%Y-%m-%d %H:%M:%S')} {msg}"
    print(line, flush=True)
    try:
        LOG.parent.mkdir(parents=True, exist_ok=True)
        with LOG.open("a", encoding="utf-8") as fh:
            fh.write(line + "\n")
    except OSError:
        pass


def git(*args: str, check: bool = False, timeout: int | None = None) -> subprocess.CompletedProcess:
    return subprocess.run(["git", *args], cwd=REPO, capture_output=True, text=True,
                          check=check, timeout=timeout)


def unpushed_translations() -> list[str]:
    """origin/main..HEAD 之間動到的譯文檔（去重）。只算 knowledge/<lang>/，zh 原稿與
    文件不算——directive 的「50」數的是譯文。"""
    r = git("log", "--name-only", "--pretty=format:", "origin/main..HEAD", "--", "knowledge/")
    out = set()
    for line in r.stdout.splitlines():
        parts = line.strip().split("/")
        if len(parts) >= 3 and parts[0] == "knowledge" and parts[1] in ALL_TRANSLATION_LANGS \
                and line.endswith(".md"):
            out.add(line.strip())
    return sorted(out)


def ahead_behind() -> tuple[int, int]:
    r = git("rev-list", "--left-right", "--count", "HEAD...origin/main")
    try:
        a, b = r.stdout.split()
        return int(a), int(b)
    except ValueError:
        return -1, -1


def acquire_lock(max_wait: int = 180) -> bool:
    for _ in range(max_wait):
        try:
            GIT_LOCK.mkdir()
            return True
        except FileExistsError:
            time.sleep(1)
    return False


def release_lock() -> None:
    try:
        GIT_LOCK.rmdir()
    except OSError:
        pass


def merge_origin() -> bool:
    """origin 領先時在共用鎖底下合併。回傳 True＝可以推（沒有領先或合併成功）。"""
    _, behind = ahead_behind()
    if behind <= 0:
        return True
    if (REPO / ".git" / "MERGE_HEAD").exists() or (REPO / ".git" / "rebase-merge").exists():
        log("⚠️ 工作樹有進行中的 merge/rebase（不是這支開的），不動它，本輪不推")
        return False
    if not acquire_lock():
        log("⚠️ 等不到 git 鎖（180 秒），本輪不合併不推")
        return False
    try:
        r = git("merge", "--no-edit", "origin/main", timeout=300)
        if r.returncode != 0:
            if (REPO / ".git" / "MERGE_HEAD").exists():
                git("merge", "--abort")
            log(f"🔴 合併 origin/main 失敗（落後 {behind}），已 abort，本輪不推——需要人看：\n"
                + (r.stdout + r.stderr)[-1500:])
            return False
        log(f"🔀 合併 origin/main（落後 {behind} 個 commit）完成")
        return True
    finally:
        release_lock()


def push() -> tuple[bool, str]:
    r = git("push", "origin", "HEAD:main", timeout=1800)
    tail = (r.stdout + r.stderr).strip().splitlines()[-6:]
    return r.returncode == 0, " | ".join(tail)


def one_pass(min_files: int, blocked_streak: list, alert_after: int) -> None:
    branch = git("rev-parse", "--abbrev-ref", "HEAD").stdout.strip()
    if branch != "main":
        log(f"⚠️ 主工作樹不在 main（在 {branch}），不動作")
        return
    fetch = git("fetch", "-q", "origin", "main", timeout=120)
    if fetch.returncode != 0:
        log(f"⚠️ git fetch 失敗，沿用舊的 origin/main：{fetch.stderr.strip()[:200]}")
    files = unpushed_translations()
    ahead, behind = ahead_behind()
    if len(files) < min_files:
        # 不到門檻就只在狀態改變時記錄，免得 log 每兩分鐘一行洗版
        return
    log(f"📦 未推送譯文 {len(files)} 篇（門檻 {min_files}；ahead {ahead} / behind {behind}）")
    if not merge_origin():
        return
    ok, tail = push()
    if ok:
        blocked_streak[0] = 0
        a2, b2 = ahead_behind()
        log(f"✅ 推送完成 {len(files)} 篇（推後 ahead {a2} / behind {b2}）")
    else:
        blocked_streak[0] += 1
        level = "🔴" if blocked_streak[0] >= alert_after else "⏸️"
        log(f"{level} 推送被擋（連續第 {blocked_streak[0]} 次）：{tail[:600]}")


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("--min", type=int, default=50, help="未推送譯文達到幾篇才推（預設 50）")
    ap.add_argument("--interval", type=int, default=120, help="--watch 每幾秒檢查一次")
    ap.add_argument("--alert-after", type=int, default=5, help="連續被擋幾次升級成 🔴")
    g = ap.add_mutually_exclusive_group(required=True)
    g.add_argument("--once", action="store_true")
    g.add_argument("--watch", action="store_true")
    g.add_argument("--status", action="store_true")
    args = ap.parse_args()

    if args.status:
        git("fetch", "-q", "origin", "main", timeout=120)
        files = unpushed_translations()
        a, b = ahead_behind()
        print(f"未推送譯文 {len(files)} 篇；ahead {a} / behind {b}；門檻 {args.min}")
        return 0

    streak = [0]
    if args.once:
        one_pass(args.min, streak, args.alert_after)
        return 0

    log(f"▶️ push-every 常駐啟動（門檻 {args.min} 篇、每 {args.interval} 秒、pid {os.getpid()}）")
    while True:
        try:
            one_pass(args.min, streak, args.alert_after)
        except Exception as e:  # noqa: BLE001 — 常駐迴圈不因單次例外死掉，但要留痕
            # 不在這裡碰鎖：鎖只在 merge_origin() 的 finally 裡釋放，這裡釋放的
            # 可能是 dispatcher 正持有的那把。
            log(f"🔴 單次檢查例外（下一輪繼續）：{type(e).__name__}: {e}")
        time.sleep(args.interval)


if __name__ == "__main__":
    sys.exit(main())
