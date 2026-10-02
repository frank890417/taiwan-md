#!/usr/bin/env python3
"""post-commit-index-sync.py — 路徑式 commit 之後，把 index 裡 hook 改寫前的舊版本對齊 HEAD。

病（2026-09-27 巴別塔渦流第十六輪查到根）：`git commit -- <檔>`／`git commit -o <檔>` 時，
pre-commit 跑在一份暫時 index 上（GIT_INDEX_FILE=.git/next-index-*.lock）。lint-staged 用
prettier 改寫檔案、把新內容 add 進那份暫時 index，所以 commit 收的是改寫後的版本；但真正的
.git/index 在 hook 執行**之前**就被 git 用改寫前的內容更新過，hook 跑完不會回頭。結果是
HEAD＝工作樹＝格式化版、index＝未格式化版，看起來像有人暫存了東西沒 commit。

同一天出現三次，都是渦流自己的路徑式 commit（REFLEXES 建議平行 session 一律用 pathspec commit）：
14:30 脈搏快照（minified 報表）、16:27 OBSERVER-QUEUE（沒補齊空白的表格列）、17:10 脈搏快照
（1 格縮排的 JSON、未排版的 HTML）。它不會進任何人的 pathspec commit，卻會讓 push-every 合併
origin 時被「local changes would be overwritten」擋下，推送就此停住。當時查不出是誰，還以為是
別的程序；在暫存 repo 用一支會改寫檔案的 pre-commit 重現後才確定是 hook 跑在暫時 index 上。

處置只碰剛 commit 進去的路徑，而且只在「index 跟 HEAD 不同、工作樹跟 HEAD 相同」時把 index
對齊 HEAD：路徑式 commit 一定會用 commit 當下的工作樹內容覆寫該路徑的 index 項，所以那份 index
內容只可能是 hook 改寫前的版本，不會是別人刻意暫存的東西。工作樹跟 HEAD 不同（有人還在改）就不動。
post-commit 跑在真正的 index 上，這支永遠 exit 0，不影響 commit 本身。
"""
from __future__ import annotations

import subprocess
import sys

CHUNK = 400  # 一次交給 git 的路徑數，避免大批次 commit 撐爆參數長度


if sys.stdout.encoding and sys.stdout.encoding.lower() not in ("utf-8", "utf8"):
    sys.stdout.reconfigure(encoding="utf-8")


def git(*args: str) -> subprocess.CompletedProcess:
    # quotepath=false 讓路徑以 UTF-8 原始位元組輸出，解碼也要明講 UTF-8（Windows 預設 cp950）
    return subprocess.run(["git", "-c", "core.quotepath=false", *args],
                          capture_output=True, text=True, encoding="utf-8")


def z(out: str) -> list[str]:
    return [p for p in out.split("\0") if p]


def leftovers() -> list[str]:
    committed = z(git("diff-tree", "--no-commit-id", "--name-only", "-r", "-z", "--root", "HEAD").stdout)
    found: list[str] = []
    for i in range(0, len(committed), CHUNK):
        chunk = committed[i:i + CHUNK]
        staged = z(git("diff", "--cached", "--name-only", "-z", "HEAD", "--", *chunk).stdout)
        if not staged:
            continue
        wt_differs = set(z(git("diff", "--name-only", "-z", "HEAD", "--", *staged).stdout))
        found.extend(p for p in staged if p not in wt_differs)
    return found


def main() -> int:
    try:
        fix = leftovers()
        for i in range(0, len(fix), CHUNK):
            git("reset", "-q", "--", *fix[i:i + CHUNK])
        if fix:
            print(f"🧹 post-commit：{len(fix)} 個剛 commit 的檔，index 裡還是 hook 改寫前的版本，已對齊 HEAD")
    except Exception as e:  # 收尾工具不該讓 commit 看起來失敗
        print(f"post-commit-index-sync 略過：{e}", file=sys.stderr)
    return 0


if __name__ == "__main__":
    sys.exit(main())
