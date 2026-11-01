"""共用 git 鎖 /tmp/taiwan-md-git.lock 的協定檢查——dispatcher、push-every、pulse 同一把。

協定是 mkdir 拿、rmdir 放：持有者只會在這個路徑建「目錄」。

為什麼要這支（2026-10-25 twmd-babel-nightly）：10-24 06:10 有人用手動方式拿鎖，
在這個路徑留下一個 0 bytes 的一般檔案。mkdir 對它永遠回 FileExistsError、rmdir 對它
永遠靜默失敗，於是三支工具每一次都等滿逾時：dispatcher 十九小時翻好的 34 篇譯文
一篇都 commit 不進去（變成孤兒）、push-every 每 14 分鐘印一行「等不到 git 鎖」、
pulse 把「鎖存在」讀成「有人正在 commit」而跳過殘留暫存檢查。沒有一個訊號說出
「這把鎖根本不是鎖」。一般檔案在本協定下不可能是任何人的有效持有，所以直接清掉並大聲說。
"""
from __future__ import annotations

import time
from pathlib import Path

GIT_LOCK = Path("/tmp/taiwan-md-git.lock")


def clear_impostor(log=print) -> bool:
    """路徑上是一般檔案（不是目錄）時清掉，回傳 True 表示清過。"""
    if GIT_LOCK.exists() and not GIT_LOCK.is_dir():
        age_min = (time.time() - GIT_LOCK.stat().st_mtime) / 60
        try:
            GIT_LOCK.unlink()
        except OSError as e:
            log(f"🔴 git 鎖路徑是一般檔案（{age_min:.0f} 分鐘前建立），清不掉：{e}")
            return False
        log(f"🔴 git 鎖路徑是一般檔案、不是目錄（{age_min:.0f} 分鐘前建立，"
            "應是手動拿鎖用錯方式），已清掉——拿鎖請用 mkdir，放鎖用 rmdir")
        return True
    return False


def held_minutes() -> float | None:
    """鎖被持有幾分鐘（目錄的 mtime 算起）；沒人持有回 None。一般檔案回負值當作壞鎖訊號。"""
    if not GIT_LOCK.exists():
        return None
    age = (time.time() - GIT_LOCK.stat().st_mtime) / 60
    return age if GIT_LOCK.is_dir() else -age
