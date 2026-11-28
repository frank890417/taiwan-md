#!/usr/bin/env bash
# loop.sh — 開票夜的票數轉錄迴圈（純 shell，不經 LLM）。
#
# 每 INTERVAL 秒：fetch_cec.py → publish_results.py → commit + push 到 election-live 分支。
# election-live 分支只放 results.json／feed.json，push 不觸發整站部署。
# 資料分支的工作目錄：$LIVE_DIR（預設 ~/.taiwanmd-election-live，是 election-live 的獨立 clone）。
# 心跳：每輪把一行狀態寫進 $LIVE_DIR/.loop.log（不進 git），值班 session 看這個檔判斷迴圈死活。
#
# 用法：bash scripts/tools/election-live/loop.sh        （前景；值班 session 用背景工作啟動）
# 停止：touch $LIVE_DIR/.stop
set -u
HERE="$(cd "$(dirname "$0")" && pwd)"
LIVE_DIR="${LIVE_DIR:-$HOME/.taiwanmd-election-live}"
INTERVAL="${INTERVAL:-60}"
PY="${PY:-python3}"
cd "$LIVE_DIR" || { echo "no $LIVE_DIR"; exit 1; }
while [ ! -f "$LIVE_DIR/.stop" ]; do
  TS="$(date '+%Y-%m-%d %H:%M:%S')"
  if "$PY" "$HERE/fetch_cec.py" --out "$LIVE_DIR/.cec.json" --save-raw "$LIVE_DIR/.raw" >"$LIVE_DIR/.fetch.out" 2>&1; then
    git -C "$LIVE_DIR" pull -q --rebase origin election-live >/dev/null 2>&1 || true
    OUT="$("$PY" "$HERE/publish_results.py" --cec "$LIVE_DIR/.cec.json" --prev "$LIVE_DIR/results.json" --out "$LIVE_DIR/results.json" 2>&1)"; RC=$?
    if [ $RC -eq 0 ]; then
      # 媒體自行計票（非官方，另一個檔）：失敗不影響中選會那份
      "$PY" "$HERE/fetch_media.py" --out "$LIVE_DIR/media.json" >"$LIVE_DIR/.media.out" 2>&1 || true
      # 議員（221 個選舉區，約 11 秒）：每兩輪抓一次
      ROUND=$(( ${ROUND:-0} + 1 ))
      if [ $(( ROUND % 2 )) -eq 1 ]; then
        "$PY" "$HERE/fetch_council.py" --out "$LIVE_DIR/council.json" >"$LIVE_DIR/.council.out" 2>&1 || true
      fi
      [ -f "$LIVE_DIR/council.json" ] && git -C "$LIVE_DIR" add council.json
      git -C "$LIVE_DIR" add results.json
      [ -f "$LIVE_DIR/media.json" ] && git -C "$LIVE_DIR" add media.json
      if git -C "$LIVE_DIR" diff --cached --quiet; then
        echo "$TS ok nochange $OUT" >>"$LIVE_DIR/.loop.log"
      else
        # 消息台也在推同一個分支：push 前再對齊一次，被搶先就重試一次
        git -C "$LIVE_DIR" commit -q -m "開票資料 $TS" && { git -C "$LIVE_DIR" pull -q --rebase origin election-live >/dev/null 2>&1; git -C "$LIVE_DIR" push -q origin HEAD:election-live || { git -C "$LIVE_DIR" pull -q --rebase origin election-live >/dev/null 2>&1; git -C "$LIVE_DIR" push -q origin HEAD:election-live; }; } \
          && echo "$TS ok pushed $OUT" >>"$LIVE_DIR/.loop.log" \
          || echo "$TS PUSH-FAIL $OUT" >>"$LIVE_DIR/.loop.log"
      fi
    else
      echo "$TS skip rc=$RC $OUT" >>"$LIVE_DIR/.loop.log"
    fi
  else
    echo "$TS FETCH-FAIL $(tail -1 "$LIVE_DIR/.fetch.out")" >>"$LIVE_DIR/.loop.log"
  fi
  sleep "$INTERVAL"
done
echo "$(date '+%Y-%m-%d %H:%M:%S') stopped" >>"$LIVE_DIR/.loop.log"
