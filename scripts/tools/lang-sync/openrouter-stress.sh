#!/usr/bin/env bash
# openrouter-stress.sh — Escalating-concurrency stress test for OpenRouter free tier
# 稜鏡效應：跑測試同時實際推進 ja 翻譯覆蓋率
#
# Reads .lang-sync-tasks/ja/_group-A.json (must be pre-filtered to articles with slugs)
# Spawns rounds of N=5,10,20,30,N parallel workers, each translating 1 real article
# Logs per-worker latency/exit/size to CSV
#
# Usage: bash scripts/tools/lang-sync/openrouter-stress.sh [lang] [model]
set -o pipefail  # NOT -e/-u: we want to capture failures, not abort; arrays may be sparse

LANG_CODE="${1:-ja}"
MODEL="${2:-tencent/hy3-preview:free}"

REPO="$(cd "$(dirname "$0")/../../.." && pwd)"
TASK_DIR="$REPO/.lang-sync-tasks/$LANG_CODE"
MANIFEST="$TASK_DIR/_batch-manifest.json"
GROUP="$TASK_DIR/_group-A.json"
LOG_DIR="$TASK_DIR/_stress-logs"
CSV="$LOG_DIR/results.csv"
SUMMARY="$LOG_DIR/summary.md"

mkdir -p "$LOG_DIR"

if [ ! -f "$GROUP" ]; then
  echo "❌ $GROUP not found. Run prepare-batch.py + filter first." >&2
  exit 1
fi

# Extract zh_paths in order (filtered manifest) — bash 3.2 compatible (no mapfile)
PATHS=()
while IFS= read -r line; do
  PATHS+=("$line")
done < <(python3 -c "
import json
m = json.load(open('$GROUP'))
for a in m['articles']:
    print(a['zh_path'])
")
TOTAL=${#PATHS[@]}
echo "📋 Total articles available: $TOTAL"

# Round plan: 5, 10, 20, 30, remainder
ROUND_SIZES=(5 10 20 30)
SUM=0
for s in "${ROUND_SIZES[@]}"; do SUM=$((SUM + s)); done
REMAINDER=$((TOTAL - SUM))
if [ "$REMAINDER" -gt 0 ]; then
  ROUND_SIZES+=("$REMAINDER")
fi
echo "🎯 Rounds: ${ROUND_SIZES[*]} (total $TOTAL articles)"

# CSV header
echo "round_n,worker_id,zh_path,pid,start_ts,end_ts,dur_sec,exit_code,output_bytes,log_excerpt" > "$CSV"

run_worker() {
  local round=$1
  local wid=$2
  local zh_path=$3
  local log="$LOG_DIR/r${round}-w${wid}.log"

  local start_ts
  start_ts=$(date +%s)

  python3 "$REPO/scripts/tools/lang-sync/openrouter-translate.py" \
    --manifest "$MANIFEST" \
    --zh-path "$zh_path" \
    --model "$MODEL" \
    > "$log" 2>&1
  local exit_code=$?

  local end_ts
  end_ts=$(date +%s)
  local dur=$((end_ts - start_ts))

  # Compute output bytes (find the output path in manifest)
  local out_path
  out_path=$(python3 -c "
import json
m = json.load(open('$MANIFEST'))
for a in m['articles']:
    if a['zh_path'] == '$zh_path':
        print(a['en_path']); break
")
  local out_bytes=0
  if [ -f "$REPO/$out_path" ]; then
    out_bytes=$(stat -f%z "$REPO/$out_path" 2>/dev/null || stat -c%s "$REPO/$out_path" 2>/dev/null || echo 0)
  fi

  # Last log line for diagnostic (escape commas/newlines)
  local excerpt
  excerpt=$(tail -1 "$log" 2>/dev/null | tr ',\n' ';;' | head -c 200)

  # CSV row (use printf to avoid quote issues)
  printf '%s,%s,"%s",%s,%s,%s,%s,%s,%s,"%s"\n' \
    "$round" "$wid" "$zh_path" "$$" "$start_ts" "$end_ts" "$dur" "$exit_code" "$out_bytes" "$excerpt" >> "$CSV"
}

CURSOR=0
for ROUND_IDX in "${!ROUND_SIZES[@]}"; do
  ROUND=$((ROUND_IDX + 1))
  N=${ROUND_SIZES[$ROUND_IDX]}
  echo ""
  echo "═══════════════════════════════════════════════════"
  echo "🚀 Round $ROUND: spawning $N parallel workers"
  echo "═══════════════════════════════════════════════════"

  ROUND_START=$(date +%s)
  PIDS=()

  for ((i=0; i<N; i++)); do
    if [ "$CURSOR" -ge "$TOTAL" ]; then
      echo "  ⚠️ Out of articles at worker $i"
      break
    fi
    zh="${PATHS[$CURSOR]}"
    CURSOR=$((CURSOR + 1))
    wid=$((i + 1))
    echo "  Worker $wid → $zh"
    run_worker "$ROUND" "$wid" "$zh" &
    PIDS+=($!)
  done

  echo "⏳ Waiting for ${#PIDS[@]} workers..."
  for pid in "${PIDS[@]}"; do
    wait "$pid"
  done

  ROUND_END=$(date +%s)
  ROUND_DUR=$((ROUND_END - ROUND_START))

  # Quick round summary
  ROUND_OK=$(grep "^$ROUND," "$CSV" | awk -F, '$8==0 {n++} END {print n+0}')
  ROUND_FAIL=$(grep "^$ROUND," "$CSV" | awk -F, '$8!=0 {n++} END {print n+0}')
  echo "✅ Round $ROUND done: $ROUND_OK ok, $ROUND_FAIL fail, wall-clock ${ROUND_DUR}s"

  # Cool-down between rounds (avoid stale rate-limit windows)
  if [ "$ROUND" -lt "${#ROUND_SIZES[@]}" ]; then
    echo "💤 Cool-down 30s before next round..."
    sleep 30
  fi
done

# Final summary
{
  echo "# OpenRouter Stress Test Summary"
  echo ""
  echo "Model: $MODEL"
  echo "Lang: $LANG_CODE"
  echo "Total articles attempted: $TOTAL"
  echo ""
  echo "## Per-round results"
  echo ""
  echo "| Round | N parallel | OK | Fail | Avg latency (s) | Wall-clock (s) |"
  echo "| --- | --- | --- | --- | --- | --- |"
  for ROUND_IDX in "${!ROUND_SIZES[@]}"; do
    ROUND=$((ROUND_IDX + 1))
    N=${ROUND_SIZES[$ROUND_IDX]}
    OK=$(grep "^$ROUND," "$CSV" | awk -F, '$8==0 {n++} END {print n+0}')
    FAIL=$(grep "^$ROUND," "$CSV" | awk -F, '$8!=0 {n++} END {print n+0}')
    AVG=$(grep "^$ROUND," "$CSV" | awk -F, '{s+=$7; n++} END {if(n>0) printf "%.1f", s/n; else print "0"}')
    WC=$(grep "^$ROUND," "$CSV" | awk -F, 'NR==1{min=$5}{if($5<min)min=$5; if($6>max)max=$6} END {print max-min}')
    echo "| $ROUND | $N | $OK | $FAIL | $AVG | $WC |"
  done
  echo ""
  echo "## Failures"
  grep -v "^round_n" "$CSV" | awk -F, '$8!=0 {print "- Round "$1" worker "$2": exit="$8" path="$3" log="$10}'
} > "$SUMMARY"

echo ""
echo "📊 CSV: $CSV"
echo "📊 Summary: $SUMMARY"
echo ""
cat "$SUMMARY"
