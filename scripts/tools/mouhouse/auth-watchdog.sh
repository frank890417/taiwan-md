#!/bin/bash
# taiwanmd auth watchdog — 住在 Claude 之外的一雙眼睛（2026-09-05 哲宇拍板 OBSERVER-QUEUE #49 (1)）
#
# 為什麼存在：2026-08-23 21:06 mouhouse 上 Claude Desktop 的 OAuth refresh token 滿 30 天過期
# （session_stale_relogin），之後每條排程照 fire、lastRunAt 照更新，但 27 個 session 全被
# 「Sign in again」擋回，四天零產出、零告警——因為所有儀器都是 Claude session，session 起不來
# 儀器就一起失明。這支 shell 由 launchd 每小時跑一次，只讀 Claude Desktop 的 log，命中就用
# gh 開 issue（label auth-stale），不依賴任何 Claude session。證據鏈：
# reports/mouhouse-blackout-root-cause-2026-09-05.md
#
# 安裝：scripts/tools/mouhouse/install-auth-watchdog.sh（scp 本檔到 ~/.local/bin 並 bootstrap plist）
# 手動：auth-watchdog.sh --dry-run   只印判斷不開 issue
#
# 不碰任何設定、不寫 Claude 的檔、不含任何 token（推播用 gh 既有登入；Telegram 若要接，
# 讀 ~/.config/taiwan-md/credentials/telegram.env，該檔不在 repo）。

set -u
export PATH="$HOME/.local/bin:/opt/homebrew/bin:/usr/local/bin:$PATH"

DRY=0; [ "${1:-}" = "--dry-run" ] && DRY=1
LOG="$HOME/Library/Logs/Claude/main.log"
STATE_DIR="$HOME/.taiwanmd"; mkdir -p "$STATE_DIR"
STATE="$STATE_DIR/auth-watchdog.state"          # 上次告警時間（epoch）
LOGIN_FILE="$STATE_DIR/auth-login-date"         # 最近一次登入日 YYYY-MM-DD（人手或本檔寫）
REPO="frank890417/taiwan-md"
WINDOW_MIN=70                                   # 每小時跑，看近 70 分鐘（含 jitter 重疊）
COOLDOWN_SEC=$((12*3600))                       # 同一種告警 12 小時內不重複開 issue
# 壽命用 29 天估（2026-09-26 校準）：log 看得到的上一次登入是 2026-08-27 12:59:56，
# 第一筆 session_stale_relogin 出在 2026-09-25 23:17:25，只撐了 29 天 10 小時；
# 原本寫 30 天，所以 #1761 預估 09-27 過期，實際早一天半就斷了。估早比估晚安全。
EXPIRY_DAYS=29; WARN_AT_DAYS=25
NOW=$(date +%s); TODAY=$(date +%F)
OUT="$HOME/Library/Logs/taiwanmd-auth-watchdog.log"
say(){ echo "$(date '+%F %T') $*" | tee -a "$OUT" >&2; }

[ -r "$LOG" ] || { say "ERR: 讀不到 $LOG（Claude Desktop 沒裝或 log 路徑變了）"; exit 3; }

# ── 〇、跑的是不是 repo 那一版（2026-09-26 maintainer 補）──────────────────────────
# launchd 跑的是 ~/.local/bin 裡的拷貝，不是 repo 的檔。09-24、09-25 兩班在 repo 修了本檔
# （標題與內文跟著倒數走），那兩個修補從來沒裝到這台機器上：拷貝停在 09-11，而 repo 那邊
# 看起來已經修好。每次跑先跟 origin/main 那一版比一次，不一樣就在 log 與告警內文都講出來。
# 找不到 repo 時也要講，「沒比」不能借用「一樣」的符號（REFLEXES #85）。
REPO_DIR="${TAIWANMD_REPO:-$HOME/Projects/taiwan-md}"
SELF_NOTE=""
if git -C "$REPO_DIR" rev-parse --verify -q origin/main >/dev/null 2>&1; then
  if ! git -C "$REPO_DIR" show "origin/main:scripts/tools/mouhouse/auth-watchdog.sh" 2>/dev/null | cmp -s - "$0"; then
    SELF_NOTE="⚠️ 這台機器跑的看門狗（$0）跟 repo origin/main 那一版不一樣，repo 裡的修補還沒裝上來。重裝：bash $REPO_DIR/scripts/tools/mouhouse/install-auth-watchdog.sh --local"
    say "$SELF_NOTE"
  fi
else
  say "無法比對自己是不是 repo 那一版（$REPO_DIR 找不到 origin/main）"
fi

# ── 一、近 WINDOW_MIN 分鐘有沒有登入過期／session 起不來 ─────────────────────────
SINCE=$(date -v-"${WINDOW_MIN}"M '+%Y-%m-%d %H:%M:%S')
HITS=$(awk -v since="$SINCE" '($1" "$2) >= since' "$LOG" \
  | grep -E 'session_stale_relogin|Cannot start session|Refresh token expired' \
  | grep -v 'auth-watchdog' | tail -5 | cut -c1-200)
HIT_N=$(printf '%s' "$HITS" | grep -c . || true)

# ── 一之二、命中之後排程還活著嗎（2026-09-11 maintainer-am 補）───────────────────
# 為什麼要多這一段：上面三個字樣不等價。`session_stale_relogin` 與 `Cannot start session`
# 是「這個 session 被擋回去了」，`Refresh token expired` 只是「這一次 refresh 失敗」——
# app 可能下一次就換到新 token 繼續跑。2026-09-11 01:48 只出現一筆 Refresh token expired，
# 之後 embeddings / routine-sync / data-refresh / spore-harvest / feedback-triage /
# maintainer 六條排程全部 Spawning 後拿到 Confirmed task run，飛輪一秒沒停，看門狗卻開了
# 一張要人跑去實體機重新登入的 critical issue。本檔誕生自「有效的尺只有 fire 之後有沒有
# 產出」這條教訓（reports/mouhouse-blackout-root-cause-2026-09-05.md），卻沒有對自己套用，
# 量的是 token 事件這個替身而不是效果（REFLEXES #82），而且把兩種根因塞進同一個告警
# （REFLEXES #38 混維度）。
#
# 判準保守：只有「拿到活著的正面證據」才降級，絕不因為「沒看到證據」就降級——沒有排程在
# 這段窗口內 fire 時 CONFIRMED_AFTER 本來就是 0，那時維持 critical 是對的（REFLEXES #85：
# 不知道要有自己的符號，不能借用沒事的那個）。
LAST_HIT_TS=""; CONFIRMED_AFTER=0; STALE_AFTER=0
if [ "$HIT_N" -gt 0 ]; then
  LAST_HIT_TS=$(printf '%s\n' "$HITS" | awk '{print $1" "$2}' | sort | tail -1)
  if [ -n "$LAST_HIT_TS" ]; then
    CONFIRMED_AFTER=$(awk -v since="$LAST_HIT_TS" '($1" "$2) > since' "$LOG" \
      | grep -c 'Confirmed task run' || true)
    STALE_AFTER=$(awk -v since="$LAST_HIT_TS" '($1" "$2) > since' "$LOG" \
      | grep -c 'Cleared stale pending dispatch' || true)
  fi
fi

# ── 二、登入日：LOGIN_FILE 與 log 裡最近一次「真的登入」取較新的（2026-09-26 改）──
# 原本只認 `ASWebAuth completed: { success: true` 這一行，而且只看最近 70 分鐘。2026-09-26
# 10:02 哲宇在 mouhouse 重新登入，走的是系統瀏覽器的 Google 登入，log 裡根本沒有 ASWebAuth
# 那一行（全部 main*.log 零筆），於是登入日檔停在 08-28，看門狗繼續喊「剩 1 天」，隔天就會
# 對一個已經續好的登入開 critical。真登入在 log 裡的形狀是：
#   [Auth] Using system browser for: /login/...    （同一天稍早）
#   [oauth] clearing latched session_stale_relogin failures
# 而且同一秒緊接著的不是 `sessionKey re-inserted with known-stale value`——那是 zombie
# re-stamp，不是登入（2026-08-26 07:37 與 13:48 各一次，當時登入其實沒恢復，停到 08-27）。
# 掃全部 main*.log 而不是只看最近 70 分鐘：機器睡著或本檔沒跑到的那一小時，不該讓一次登入
# 永遠被漏掉。每個檔各自掃（檔內時間是順的），取最新的日期。
real_login_dates(){
  awk '
    /ASWebAuth completed: \{ success: true/ { print $1; next }
    /\[Auth\] Using system browser for: \/login\// { bday=$1; next }
    /\[oauth\] clearing latched session_stale_relogin failures/ {
      if (bday == $1) { pend=$1" "$2; pday=$1 }
      next
    }
    pend != "" {
      if ($0 ~ /sessionKey re-inserted with known-stale value/) { pend=""; next }
      if (($1" "$2) != pend) { print pday; pend="" }
    }
    END { if (pend != "") print pday }' "$1" 2>/dev/null
}
NEW_LOGIN=0
LOG_LOGIN=$(for f in "$HOME"/Library/Logs/Claude/main*.log; do real_login_dates "$f"; done | sort | tail -1)
FILE_LOGIN=""; [ -r "$LOGIN_FILE" ] && FILE_LOGIN=$(cat "$LOGIN_FILE")
LOGIN_DATE=$(printf '%s\n%s\n' "$FILE_LOGIN" "$LOG_LOGIN" | grep -E '^[0-9]{4}-[0-9]{2}-[0-9]{2}$' | sort | tail -1)
if [ -n "$LOG_LOGIN" ] && [ "$LOG_LOGIN" = "$LOGIN_DATE" ] && [ "$LOG_LOGIN" != "$FILE_LOGIN" ]; then
  if [ "$DRY" = 1 ]; then
    say "[dry-run] log 裡有比登入日檔更新的登入（${FILE_LOGIN:-無} → $LOG_LOGIN），正式跑會回寫"
  else
    echo "$LOG_LOGIN" > "$LOGIN_FILE"; say "偵測到新登入，登入日由 ${FILE_LOGIN:-無} 改為 $LOG_LOGIN"; NEW_LOGIN=1
  fi
fi
DAYS_SINCE=""; if [ -n "${LOGIN_DATE:-}" ]; then
  LOGIN_EPOCH=$(date -j -f '%Y-%m-%d' "$LOGIN_DATE" +%s 2>/dev/null || echo "")
  [ -n "$LOGIN_EPOCH" ] && DAYS_SINCE=$(( (NOW - LOGIN_EPOCH) / 86400 ))
fi

# ── 四、判定 ────────────────────────────────────────────────────────────────
LEVEL="ok"; TITLE=""; BODY=""
if [ "$HIT_N" -gt 0 ] && [ "$CONFIRMED_AFTER" -gt 0 ] && [ "$STALE_AFTER" -eq 0 ]; then
  # 命中了，但最後一筆之後排程仍有 Confirmed task run 且沒有 Cleared stale pending dispatch
  # ＝ app 自己換到新 token 了，飛輪沒停。記錄供事後追，不開 issue。
  say "命中 $HIT_N 筆但 $LAST_HIT_TS 之後有 $CONFIRMED_AFTER 筆 Confirmed task run、0 筆 stale dispatch ＝ 已自行恢復，不告警"
elif [ "$HIT_N" -gt 0 ]; then
  LEVEL="critical"
  TITLE="mouhouse 登入過期：排程 session 起不來（看門狗自動偵測 $TODAY）"
  BODY=$(printf '近 %s 分鐘 Claude Desktop main.log 出現 %s 筆登入過期／session 起不來：\n\n```\n%s\n```\n\n這是 2026-08-23～28 四天空窗同一個病（登入大約 29～30 天就會過期，`session_stale_relogin`）。排程器照 fire、lastRunAt 照更新，但每個 routine session 都被「Sign in again」擋回，在有人重新登入之前飛輪等於停轉。\n\n**修法只有一個：在 mouhouse 上打開 Claude Desktop 重新登入**（Screen Sharing 或接螢幕）。登入後本看門狗會自動記下新登入日並停止告警。\n\n證據鏈與背景：reports/mouhouse-blackout-root-cause-2026-09-05.md · OBSERVER-QUEUE #49 · 本 issue 由 `scripts/tools/mouhouse/auth-watchdog.sh` 開，不是 Claude session 寫的。🧬' "$WINDOW_MIN" "$HIT_N" "$HITS")
elif [ -n "$DAYS_SINCE" ] && [ "$DAYS_SINCE" -gt "$EXPIRY_DAYS" ]; then
  # 超過估計壽命卻沒有任何 session 起不來的痕跡 → 登入日資料過時（例如某種登入流程沒被 real_login_dates 認出來），不告警只記錄
  say "登入日 ${LOGIN_DATE} 已 ${DAYS_SINCE} 天但 session 正常，登入日可能過時；請更新 $LOGIN_FILE"
elif [ -n "$DAYS_SINCE" ] && [ "$DAYS_SINCE" -ge "$WARN_AT_DAYS" ]; then
  LEVEL="warn"
  LEFT=$(( EXPIRY_DAYS - DAYS_SINCE ))
  # 標題寫絕對日期不寫相對天數：相對天數一旦凍住就是錯的，絕對日期凍住還是對的。
  EXPIRY_DATE=$(date -j -v+"${LEFT}"d '+%Y-%m-%d' 2>/dev/null || date -d "+${LEFT} days" '+%Y-%m-%d' 2>/dev/null || echo "$TODAY+${LEFT}d")
  TITLE="mouhouse 登入預估 ${EXPIRY_DATE} 過期，剩約 ${LEFT} 天（登入日 ${LOGIN_DATE}，看門狗更新 $TODAY）"
  BODY=$(printf 'Claude Desktop 的登入大約 29～30 天就要重新登入一次（2026-07-24 登入 → 08-23 過期，四天零產出；2026-08-27 登入 → 09-25 過期，只撐 29 天半）。目前登入日 %s，已 %s 天，預估 %s 天後過期。\n\n**建議這幾天在 mouhouse 重新登入一次**，登入後看門狗會自動記下新日期。\n\n背景：reports/mouhouse-blackout-root-cause-2026-09-05.md · OBSERVER-QUEUE #49。本 issue 由 `scripts/tools/mouhouse/auth-watchdog.sh` 開。🧬' "$LOGIN_DATE" "$DAYS_SINCE" "$LEFT")
fi

# 本檔自己過時的話，告警內文要講出來：過時的看門狗發出的讀數本身就可能是錯的
[ -n "$SELF_NOTE" ] && [ -n "$BODY" ] && BODY=$(printf '%s\n\n%s' "$BODY" "$SELF_NOTE")

say "level=$LEVEL hits=$HIT_N confirmed_after=$CONFIRMED_AFTER stale_after=$STALE_AFTER login_date=${LOGIN_DATE:-?} days_since=${DAYS_SINCE:-?}"
# ── 四之二、剛偵測到新登入 → 把還開著的 auth-stale issue 關掉（2026-09-26 maintainer 補）──
# 告警會開 issue，解除卻沒有東西去關：#1761 在 09-26 登入續好之後還開著，標題寫「剩約 2 天」。
# 只在「這一輪剛寫下新登入日」那一刻關，不在每個綠燈小時都掃一次，避免把 session 其實還
# 起不來、只是那一小時剛好沒有排程在跑的狀態誤讀成已恢復。
if [ "$NEW_LOGIN" = 1 ] && [ "$LEVEL" = "ok" ] && command -v gh >/dev/null; then
  NEXT_EXPIRY=$(date -j -v+"${EXPIRY_DAYS}"d -f '%Y-%m-%d' "$LOGIN_DATE" '+%Y-%m-%d' 2>/dev/null || echo "約 ${EXPIRY_DAYS} 天後")
  for N in $(gh issue list -R "$REPO" --label auth-stale --state open --json number --jq '.[].number' 2>/dev/null); do
    gh issue close "$N" -R "$REPO" --comment "看門狗在 log 裡看到 ${LOGIN_DATE} 重新登入，登入日已更新，這張先關。下次預估 ${NEXT_EXPIRY} 前後過期，第 ${WARN_AT_DAYS} 天會再開一張提醒。🧬" >/dev/null 2>&1 \
      && say "登入已續，關閉 auth-stale issue #$N"
  done
fi
[ "$LEVEL" = "ok" ] && exit 0

# ── 五、告警（去重：同 level 12 小時內只開一次；有既有 open issue 就留 comment）──
LAST=$(grep "^$LEVEL " "$STATE" 2>/dev/null | awk '{print $2}' | tail -1); LAST=${LAST:-0}
if [ $(( NOW - LAST )) -lt "$COOLDOWN_SEC" ]; then say "cooldown 內（上次 $(date -r "$LAST" '+%F %T')），不重複告警"; exit 0; fi
if [ "$DRY" = 1 ]; then say "[dry-run] 會開 issue：$TITLE"; exit 0; fi
command -v gh >/dev/null || { say "ERR: 沒有 gh，無法開 issue"; exit 3; }
gh label list -R "$REPO" --search auth-stale --json name --jq '.[].name' 2>/dev/null | grep -qx auth-stale \
  || gh label create auth-stale -R "$REPO" --color B60205 --description "mouhouse Claude Desktop 登入過期／即將過期（auth-watchdog）" >/dev/null 2>&1 || true
EXISTING=$(gh issue list -R "$REPO" --label auth-stale --state open --json number --jq '.[0].number' 2>/dev/null || echo "")
if [ -n "$EXISTING" ]; then
  # 標題跟著倒數一起改，不是只補一則留言（2026-09-24 maintainer-am）：
  # 標題原本只在 gh issue create 用得到，所以它會凍在開票那天的讀數。#1761 開票時寫「約 5 天」，
  # 三天後留言區已倒數到 3 天而標題還是 5 天——而 issue 清單只看得到標題。最該被一眼看見的那一則，
  # 在唯一會被掃過的那個畫面上，隨著愈接近過期愈安靜。
  # 內文也要跟著倒數改（2026-09-25 maintainer-am）：昨天把標題接上倒數，內文
  # 卻還留在 `gh issue create` 那一刻。實測今天 #1761 標題寫「剩約 3 天」（09-24
  # 更新，今天實際剩 2 天），而內文仍寫「已 25 天，預估 5 天後過期」——開票那天的
  # 讀數。點進 issue 的人先讀到的是內文，所以最舊的那個數字站在最前面，而且它跟
  # 標題自己互相矛盾。昨天那條教訓（警報愈急愈安靜）在同一個檔案裡還有第二格。
  gh issue edit "$EXISTING" -R "$REPO" --title "$TITLE" --body "$BODY" >/dev/null 2>&1 \
    && say "標題與內文更新為倒數當下讀數：$TITLE"
  gh issue comment "$EXISTING" -R "$REPO" --body "$BODY" >/dev/null && say "留言到既有 issue #$EXISTING"
else
  URL=$(gh issue create -R "$REPO" --title "$TITLE" --body "$BODY" --label auth-stale 2>/dev/null) && say "開 issue：$URL"
fi
# 可選 Telegram（token 只住本機檔，不在 repo）
TG="$HOME/.config/taiwan-md/credentials/telegram.env"
if [ -r "$TG" ]; then
  # shellcheck disable=SC1090
  . "$TG"
  if [ -n "${TELEGRAM_BOT_TOKEN:-}" ] && [ -n "${TELEGRAM_CHAT_ID:-}" ]; then
    curl -s -o /dev/null -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
      --data-urlencode "chat_id=${TELEGRAM_CHAT_ID}" --data-urlencode "text=🧬 ${TITLE}" && say "Telegram 已推播"
  fi
fi
{ grep -v "^$LEVEL " "$STATE" 2>/dev/null; echo "$LEVEL $NOW"; } > "$STATE.tmp" && mv "$STATE.tmp" "$STATE"
exit 1
