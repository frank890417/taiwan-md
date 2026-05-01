#!/usr/bin/env bash
# compare-decomposition.sh — A/B test 任務分解模式 (per-lang vs orthogonal)
#
# 2026-05-01 γ-late3：哲宇問「同一篇文章一次多語言，還是一批文章不同語言
# 先處理同一語言，到底怎麼樣規劃大規模任務解構會比較理想」。
#
# Pattern A (per-lang)：N workers，每個 worker 處理 1 lang × M 篇文章
# Pattern B (orthogonal)：N workers，每個 worker 處理 1 篇文章 × M 個 lang
#
# Same total calls (N×M)，differ in:
# - 失敗 isolation：B 對 lang-specific refusal 的故障半徑較小
# - cache hit：A reuses system prompt across calls in same worker
# - PR atomicity：B 一篇文章所有語言一次完成
#
# Usage: bash scripts/tools/lang-sync/compare-decomposition.sh [model]
#
# Outputs:
#   .lang-sync-tasks/_compare/results.csv  — per-call (pattern, worker, article, lang, dur, ok)
#   .lang-sync-tasks/_compare/summary.md   — wall-clock + success rate per pattern

set -o pipefail
MODEL="${1:-openrouter/owl-alpha}"
REPO="$(cd "$(dirname "$0")/../../.." && pwd)"
OUT="$REPO/.lang-sync-tasks/_compare"
mkdir -p "$OUT/A_per_lang" "$OUT/B_orthogonal"
CSV="$OUT/results.csv"
echo "pattern,worker_id,article,lang,start_ts,end_ts,dur_sec,exit_code,output_bytes" > "$CSV"

# Test articles — pick 4 cross-lang shared articles from manifests
# (These need to be in ja, ko, es, fr manifests — verify before launch)
ARTICLES=(
  "Lifestyle/LINE.md"
  "Society/LGBTQ.md"
  "Nature/黑面琵鷺.md"
)
LANGS=(ja ko es fr)

echo "═══════════════════════════════════════════════════"
echo "🧪 Decomposition A/B Test"
echo "  Model:    $MODEL"
echo "  Articles: ${#ARTICLES[@]} × Langs: ${#LANGS[@]} = $(( ${#ARTICLES[@]} * ${#LANGS[@]} )) calls per pattern"
echo "═══════════════════════════════════════════════════"

# ────────────────────────────────────────────────────────────────────
# Pattern A — per-lang batch
# 4 workers, each handles 1 lang × 3 articles (sequential within worker)
# ────────────────────────────────────────────────────────────────────
echo ""
echo "▶ Pattern A: 4 workers × (1 lang × 3 articles) sequential within"
A_START=$(date +%s)
A_PIDS=""

for lang in "${LANGS[@]}"; do
  log="$OUT/A_per_lang/worker-$lang.log"
  (
    for article in "${ARTICLES[@]}"; do
      t0=$(date +%s)
      python3 "$REPO/scripts/tools/lang-sync/openrouter-translate.py" \
        --manifest "$REPO/.lang-sync-tasks/$lang/_batch-manifest.json" \
        --zh-path "$article" \
        --model "$MODEL" 2>&1
      ec=$?
      t1=$(date +%s)
      out_path=$(python3 -c "
import json
m = json.load(open('$REPO/.lang-sync-tasks/$lang/_batch-manifest.json'))
for a in m['articles']:
    if a['zh_path'] == '$article':
        print(a['en_path']); break
" 2>/dev/null)
      out_bytes=0
      [ -n "$out_path" ] && [ -f "$REPO/$out_path" ] && out_bytes=$(stat -f%z "$REPO/$out_path" 2>/dev/null || echo 0)
      printf 'A,%s,"%s",%s,%s,%s,%s,%s,%s\n' "$lang" "$article" "$lang" "$t0" "$t1" "$((t1-t0))" "$ec" "$out_bytes" >> "$CSV"
    done
  ) > "$log" 2>&1 &
  A_PIDS="$A_PIDS $!"
  echo "  Worker[A] $lang dispatched"
done

echo "  ⏳ Waiting Pattern A workers..."
wait $A_PIDS
A_END=$(date +%s)
A_WALL=$((A_END - A_START))
echo "  ✅ Pattern A done in ${A_WALL}s"

# ────────────────────────────────────────────────────────────────────
# Pattern B — orthogonal
# 3 workers, each handles 1 article × 4 langs (sequential within worker)
# ────────────────────────────────────────────────────────────────────
echo ""
echo "▶ Pattern B: 3 workers × (1 article × 4 langs) sequential within"
B_START=$(date +%s)
B_PIDS=""

for article in "${ARTICLES[@]}"; do
  art_safe=$(echo "$article" | tr '/' '_')
  log="$OUT/B_orthogonal/worker-${art_safe}.log"
  (
    for lang in "${LANGS[@]}"; do
      t0=$(date +%s)
      python3 "$REPO/scripts/tools/lang-sync/openrouter-translate.py" \
        --manifest "$REPO/.lang-sync-tasks/$lang/_batch-manifest.json" \
        --zh-path "$article" \
        --model "$MODEL" 2>&1
      ec=$?
      t1=$(date +%s)
      out_path=$(python3 -c "
import json
m = json.load(open('$REPO/.lang-sync-tasks/$lang/_batch-manifest.json'))
for a in m['articles']:
    if a['zh_path'] == '$article':
        print(a['en_path']); break
" 2>/dev/null)
      out_bytes=0
      [ -n "$out_path" ] && [ -f "$REPO/$out_path" ] && out_bytes=$(stat -f%z "$REPO/$out_path" 2>/dev/null || echo 0)
      printf 'B,%s,"%s",%s,%s,%s,%s,%s,%s\n' "$art_safe" "$article" "$lang" "$t0" "$t1" "$((t1-t0))" "$ec" "$out_bytes" >> "$CSV"
    done
  ) > "$log" 2>&1 &
  B_PIDS="$B_PIDS $!"
  echo "  Worker[B] $art_safe dispatched"
done

echo "  ⏳ Waiting Pattern B workers..."
wait $B_PIDS
B_END=$(date +%s)
B_WALL=$((B_END - B_START))
echo "  ✅ Pattern B done in ${B_WALL}s"

# ────────────────────────────────────────────────────────────────────
# Summary
# ────────────────────────────────────────────────────────────────────
SUMMARY="$OUT/summary.md"
{
  echo "# Decomposition Pattern A/B Test"
  echo ""
  echo "Model: \`$MODEL\`"
  echo "Articles: ${#ARTICLES[@]} (${ARTICLES[*]})"
  echo "Langs: ${#LANGS[@]} (${LANGS[*]})"
  echo "Total calls per pattern: $(( ${#ARTICLES[@]} * ${#LANGS[@]} ))"
  echo ""
  echo "## Wall-clock"
  echo ""
  echo "| Pattern | Wall-clock (s) | Workers | Calls/worker |"
  echo "| --- | --- | --- | --- |"
  echo "| A (per-lang)    | $A_WALL | ${#LANGS[@]} | ${#ARTICLES[@]} |"
  echo "| B (orthogonal)  | $B_WALL | ${#ARTICLES[@]} | ${#LANGS[@]} |"
  echo ""
  echo "## Success rate per pattern"
  echo ""
  echo "| Pattern | OK | Fail | Total | Success% |"
  echo "| --- | --- | --- | --- | --- |"
  for p in A B; do
    ok=$(awk -F, -v p="$p" '$1==p && $8==0 {n++} END {print n+0}' "$CSV")
    fail=$(awk -F, -v p="$p" '$1==p && $8!=0 {n++} END {print n+0}' "$CSV")
    total=$((ok + fail))
    pct=$([ "$total" -gt 0 ] && echo "scale=1; $ok*100/$total" | bc || echo "0")
    echo "| $p | $ok | $fail | $total | ${pct}% |"
  done
  echo ""
  echo "## Per-call latency distribution"
  echo ""
  for p in A B; do
    echo "Pattern $p latency (s):"
    awk -F, -v p="$p" '$1==p {print $7}' "$CSV" | sort -n | awk '
      BEGIN{n=0}
      {a[n++]=$1; sum+=$1}
      END{
        if(n>0){
          printf "  count=%d min=%.1f max=%.1f avg=%.1f median=%.1f\n", n, a[0], a[n-1], sum/n, a[int(n/2)]
        }
      }'
  done
  echo ""
  echo "## Per-lang refusal pattern (column = lang, row = pattern)"
  echo ""
  echo "| Pattern | $(IFS=' | '; echo "${LANGS[*]}") |"
  echo "| --- | $(printf -- '--- | %.0s' "${LANGS[@]}") |"
  for p in A B; do
    row="| $p |"
    for lang in "${LANGS[@]}"; do
      ok=$(awk -F, -v p="$p" -v l="$lang" '$1==p && $4==l && $8==0 {n++} END {print n+0}' "$CSV")
      fail=$(awk -F, -v p="$p" -v l="$lang" '$1==p && $4==l && $8!=0 {n++} END {print n+0}' "$CSV")
      row="$row $ok/$((ok+fail)) |"
    done
    echo "$row"
  done
} > "$SUMMARY"

echo ""
echo "📊 CSV: $CSV"
echo "📊 Summary: $SUMMARY"
echo ""
cat "$SUMMARY"
