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
EXPIRY_DAYS=30; WARN_AT_DAYS=25
NOW=$(date +%s); TODAY=$(date +%F)
OUT="$HOME/Library/Logs/taiwanmd-auth-watchdog.log"
say(){ echo "$(date '+%F %T') $*" | tee -a "$OUT" >&2; }

[ -r "$LOG" ] || { say "ERR: 讀不到 $LOG（Claude Desktop 沒裝或 log 路徑變了）"; exit 3; }

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

# ── 二、登入日倒數（有 LOGIN_FILE 才算；沒有就用 log 裡最近一次 ASWebAuth 成功日）──
if [ -r "$LOGIN_FILE" ]; then LOGIN_DATE=$(cat "$LOGIN_FILE"); else
  LOGIN_DATE=$(grep -h 'ASWebAuth completed: { success: true' "$HOME"/Library/Logs/Claude/main*.log 2>/dev/null | awk '{print $1}' | sort | tail -1)
fi
DAYS_SINCE=""; if [ -n "${LOGIN_DATE:-}" ]; then
  LOGIN_EPOCH=$(date -j -f '%Y-%m-%d' "$LOGIN_DATE" +%s 2>/dev/null || echo "")
  [ -n "$LOGIN_EPOCH" ] && DAYS_SINCE=$(( (NOW - LOGIN_EPOCH) / 86400 ))
fi

# ── 三、如果剛好看到成功登入，把登入日寫下來（唯一會寫的狀態檔，不碰 Claude 任何東西）──
FRESH_LOGIN=$(awk -v since="$SINCE" '($1" "$2) >= since' "$LOG" | grep -c 'ASWebAuth completed: { success: true' || true)
if [ "$FRESH_LOGIN" -gt 0 ]; then echo "$TODAY" > "$LOGIN_FILE"; say "偵測到新登入，登入日寫為 $TODAY"; DAYS_SINCE=0; fi

# ── 四、判定 ────────────────────────────────────────────────────────────────
LEVEL="ok"; TITLE=""; BODY=""
if [ "$HIT_N" -gt 0 ] && [ "$CONFIRMED_AFTER" -gt 0 ] && [ "$STALE_AFTER" -eq 0 ]; then
  # 命中了，但最後一筆之後排程仍有 Confirmed task run 且沒有 Cleared stale pending dispatch
  # ＝ app 自己換到新 token 了，飛輪沒停。記錄供事後追，不開 issue。
  say "命中 $HIT_N 筆但 $LAST_HIT_TS 之後有 $CONFIRMED_AFTER 筆 Confirmed task run、0 筆 stale dispatch ＝ 已自行恢復，不告警"
elif [ "$HIT_N" -gt 0 ]; then
  LEVEL="critical"
  TITLE="mouhouse 登入過期：排程 session 起不來（看門狗自動偵測 $TODAY）"
  BODY=$(printf '近 %s 分鐘 Claude Desktop main.log 出現 %s 筆登入過期／session 起不來：\n\n```\n%s\n```\n\n這是 2026-08-23～28 四天空窗同一個病（OAuth refresh token 30 天固定壽命，`session_stale_relogin`）。排程器照 fire、lastRunAt 照更新，但每個 routine session 都被「Sign in again」擋回，在有人重新登入之前飛輪等於停轉。\n\n**修法只有一個：在 mouhouse 上打開 Claude Desktop 重新登入**（Screen Sharing 或接螢幕）。登入後本看門狗會自動記下新登入日並停止告警。\n\n證據鏈與背景：reports/mouhouse-blackout-root-cause-2026-09-05.md · OBSERVER-QUEUE #49 · 本 issue 由 `scripts/tools/mouhouse/auth-watchdog.sh` 開，不是 Claude session 寫的。🧬' "$WINDOW_MIN" "$HIT_N" "$HITS")
elif [ -n "$DAYS_SINCE" ] && [ "$DAYS_SINCE" -gt "$EXPIRY_DAYS" ]; then
  # 超過 30 天卻沒有任何 session 起不來的痕跡 → 登入日資料過時（例如重新登入沒留 ASWebAuth 行），不告警只記錄
  say "登入日 ${LOGIN_DATE} 已 ${DAYS_SINCE} 天但 session 正常，登入日可能過時；請更新 $LOGIN_FILE"
elif [ -n "$DAYS_SINCE" ] && [ "$DAYS_SINCE" -ge "$WARN_AT_DAYS" ]; then
  LEVEL="warn"
  LEFT=$(( EXPIRY_DAYS - DAYS_SINCE ))
  TITLE="mouhouse 登入將在約 ${LEFT} 天後過期（登入日 ${LOGIN_DATE}，看門狗提醒 $TODAY）"
  BODY=$(printf 'Claude Desktop 的登入 session 是 30 天固定壽命（2026-07-24 登入 → 08-23 過期，四天零產出）。目前登入日 %s，已 %s 天，預估 %s 天後過期。\n\n**建議這幾天在 mouhouse 重新登入一次**，登入後看門狗會自動記下新日期。\n\n背景：reports/mouhouse-blackout-root-cause-2026-09-05.md · OBSERVER-QUEUE #49。本 issue 由 `scripts/tools/mouhouse/auth-watchdog.sh` 開。🧬' "$LOGIN_DATE" "$DAYS_SINCE" "$LEFT")
fi

say "level=$LEVEL hits=$HIT_N confirmed_after=$CONFIRMED_AFTER stale_after=$STALE_AFTER login_date=${LOGIN_DATE:-?} days_since=${DAYS_SINCE:-?}"
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
