#!/usr/bin/env bash
# audit-batch.sh — 機械化抓 sub-agent batch 的 cross-pollination commit
# 對應 DNA #42「Sub-agent N 篇 sequential 三偷吃步」+ DNA #31「Sub-agent claim 是線索不是事實」
# 用法:
#   bash scripts/tools/audit-batch.sh --since "2 hours ago"
#   bash scripts/tools/audit-batch.sh --since "2026-05-02 09:00"
#   bash scripts/tools/audit-batch.sh --hash-range "e63e0bbd..HEAD"
#
# 偵測：
#   1. 一個 commit touch knowledge/ 多個 article md，但 message 只提 1 個 → cross-pollination 警報
#   2. evolve/rewrite commit 對應 reports/research/{ym}/{slug}.md 不存在 → 偷落檔警報

set -uo pipefail
cd "$(dirname "$0")/../.."

RED=$'\033[0;31m'
YEL=$'\033[0;33m'
GRN=$'\033[0;32m'
BLU=$'\033[0;34m'
DIM=$'\033[0;90m'
RST=$'\033[0m'

# Parse args
SINCE=""
HASH_RANGE=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    --since) SINCE="$2"; shift 2 ;;
    --hash-range) HASH_RANGE="$2"; shift 2 ;;
    --help|-h)
      sed -n '2,11p' "$0"
      exit 0
      ;;
    *) echo "Unknown arg: $1"; exit 1 ;;
  esac
done

if [[ -z "$SINCE" && -z "$HASH_RANGE" ]]; then
  SINCE="6 hours ago"
fi

if [[ -n "$HASH_RANGE" ]]; then
  RANGE_ARG=("$HASH_RANGE")
else
  RANGE_ARG=(--since="$SINCE")
fi

printf "%s═══ audit-batch.sh — sub-agent batch 偷吃步偵測 ═══%s\n" "$BLU" "$RST"
printf "%sRange: %s%s\n\n" "$DIM" "${HASH_RANGE:-since=$SINCE}" "$RST"

COMMITS=$(git log "${RANGE_ARG[@]}" --pretty=format:'%H' 2>/dev/null)
if [[ -z "$COMMITS" ]]; then
  printf "%s⚠️  No commits in range%s\n" "$YEL" "$RST"
  exit 0
fi

CROSS_POLLINATION_COUNT=0
MISSING_AUDIT_COUNT=0
TOTAL_EVOLVE_COMMITS=0

# Layer 1: Cross-pollination detection
printf "%s── Layer 1: Cross-pollination commits（一個 commit touch 多個 knowledge/ article 但 message 只提 1）%s\n\n" "$BLU" "$RST"

for hash in $COMMITS; do
  SUBJECT=$(git log -1 --pretty=format:'%s' "$hash" 2>/dev/null)

  # Skip non-evolve/rewrite commits + skip stage5/cross-link/heal/batch (legitimately touch multiple)
  if [[ ! "$SUBJECT" =~ (evolve|rewrite) ]]; then
    continue
  fi
  if [[ "$SUBJECT" =~ (stage5|cross-link|heal:|batch) ]]; then
    continue
  fi

  TOTAL_EVOLVE_COMMITS=$((TOTAL_EVOLVE_COMMITS + 1))

  ARTICLES=$(git show --stat --name-only "$hash" 2>/dev/null | \
    grep -E '^knowledge/[A-Z][a-zA-Z]+/[^/]+\.md$' | \
    grep -v '_Home\|_translations\|_taxonomy' | \
    sort -u)

  count=$(printf '%s\n' "$ARTICLES" | grep -c '^knowledge/' 2>/dev/null || true)
  count=${count:-0}

  if (( count > 1 )); then
    MENTIONED_COUNT=0
    while IFS= read -r art; do
      [[ -z "$art" ]] && continue
      slug=$(basename "$art" .md)
      if printf '%s' "$SUBJECT" | grep -qF "$slug"; then
        MENTIONED_COUNT=$((MENTIONED_COUNT + 1))
      fi
    done <<< "$ARTICLES"

    if (( MENTIONED_COUNT < count )); then
      SHORT=$(printf '%s' "$hash" | cut -c1-8)
      printf "%s🚨 %s%s: %s\n" "$RED" "$SHORT" "$RST" "$SUBJECT"
      printf "   touch %d articles，message 只提 %d：\n" "$count" "$MENTIONED_COUNT"
      printf '%s\n' "$ARTICLES" | sed 's/^/      /'
      printf "\n"
      CROSS_POLLINATION_COUNT=$((CROSS_POLLINATION_COUNT + 1))
    fi
  fi
done

if (( CROSS_POLLINATION_COUNT == 0 )); then
  printf "%s✅ 無 cross-pollination commit%s\n" "$GRN" "$RST"
fi
printf "\n"

# Layer 2: Missing audit report detection
printf "%s── Layer 2: Missing audit report（evolve/rewrite commit 對應 reports/research/ 缺檔）%s\n\n" "$BLU" "$RST"

CURRENT_YM=$(date +%Y-%m)
declare -a MISSING_REPORTS=()

for hash in $COMMITS; do
  SUBJECT=$(git log -1 --pretty=format:'%s' "$hash" 2>/dev/null)
  if [[ ! "$SUBJECT" =~ (evolve|rewrite) ]]; then
    continue
  fi
  if [[ "$SUBJECT" =~ (stage5|cross-link|heal:|batch) ]]; then
    continue
  fi

  ARTICLES=$(git show --stat --name-only "$hash" 2>/dev/null | \
    grep -E '^knowledge/[A-Z][a-zA-Z]+/[^/]+\.md$' | \
    grep -v '_Home\|_translations\|_taxonomy' | \
    sort -u)

  while IFS= read -r art; do
    [[ -z "$art" ]] && continue
    slug=$(basename "$art" .md)
    if [[ ! -f "reports/research/${CURRENT_YM}/${slug}.md" ]]; then
      SHORT=$(printf '%s' "$hash" | cut -c1-8)
      MISSING_REPORTS+=("$SHORT|$slug|$art")
      MISSING_AUDIT_COUNT=$((MISSING_AUDIT_COUNT + 1))
    fi
  done <<< "$ARTICLES"
done

if (( MISSING_AUDIT_COUNT == 0 )); then
  printf "%s✅ 全部 evolve/rewrite 都有對應 audit report%s\n" "$GRN" "$RST"
else
  for entry in "${MISSING_REPORTS[@]}"; do
    IFS='|' read -r short slug art <<< "$entry"
    printf "%s⚠️  %s%s → %s\n" "$YEL" "$short" "$RST" "$art"
    printf "   缺 reports/research/%s/%s.md\n" "$CURRENT_YM" "$slug"
  done
fi
printf "\n"

# Summary
printf "%s═══ 總結 ═══%s\n" "$BLU" "$RST"
printf "  Total evolve/rewrite commits: %d\n" "$TOTAL_EVOLVE_COMMITS"
printf "  Cross-pollination commits:    %d\n" "$CROSS_POLLINATION_COUNT"
printf "  Missing audit reports:        %d\n\n" "$MISSING_AUDIT_COUNT"

if (( CROSS_POLLINATION_COUNT > 0 || MISSING_AUDIT_COUNT > 0 )); then
  printf "%s❌ 偵測到 sub-agent 偷吃步 — 補做 audit report 或拆 commit%s\n" "$RED" "$RST"
  printf "%scanonical: DNA #42 + LESSONS-INBOX 2026-05-02 EVOLVE-batch%s\n" "$DIM" "$RST"
  exit 1
fi

printf "%s✅ Batch audit clean%s\n" "$GRN" "$RST"
exit 0
