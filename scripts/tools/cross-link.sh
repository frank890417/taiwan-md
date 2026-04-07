#!/usr/bin/env bash
# cross-link.sh v1.0 — Stage 5 CROSS-LINK 雙向延伸閱讀建議工具
#
# 用法:
#   bash scripts/tools/cross-link.sh knowledge/Nature/台灣氣候危機與淨零轉型.md
#     → 找出相關文章、檢查雙向連結、報告缺失
#
#   bash scripts/tools/cross-link.sh --scan
#     → 全站掃描，找出所有「被連結但沒有反向連結」的孤兒關係
#
#   bash scripts/tools/cross-link.sh --orphans
#     → 找出零延伸閱讀且零被連結的孤立文章
#
# 原理：
#   1. 從目標文章的 tags 找出共享 tag 最多的相關文章
#   2. 檢查目標文章的延伸閱讀連結是否有反向連結
#   3. 報告建議新增的雙向連結
#
# 造橋鋪路：Stage 5 從人工判斷→工具建議→未來可半自動修復

set -uo pipefail
cd "$(dirname "$0")/../.."

RED='\033[0;31m'; YEL='\033[0;33m'; GRN='\033[0;32m'
DIM='\033[0;90m'; CYN='\033[0;36m'; BLD='\033[1m'; RST='\033[0m'

MODE="single"
TARGET=""
for arg in "$@"; do
  case "$arg" in
    --scan) MODE="scan" ;;
    --orphans) MODE="orphans" ;;
    *.md) TARGET="$arg" ;;
  esac
done

# ── Build tag index: file → tags ──
TAG_INDEX=$(mktemp)
LINK_INDEX=$(mktemp)
trap 'rm -f "$TAG_INDEX" "$LINK_INDEX"' EXIT

echo -e "${DIM}Building indexes...${RST}"

# Build tag index
find knowledge -maxdepth 2 -name '*.md' \
  ! -path 'knowledge/en/*' ! -path 'knowledge/ja/*' \
  ! -path 'knowledge/es/*' ! -path 'knowledge/ko/*' \
  ! -path 'knowledge/resources/*' ! -name '_*' ! -name 'index.md' -print0 | \
while IFS= read -r -d '' f; do
  rel="${f#knowledge/}"
  # Extract tags from frontmatter
  tags=$(awk '/^---$/{n++; next} n==1{print} n>=2{exit}' "$f" | \
    grep -oE "'[^']+'" | tr -d "'" | tr '\n' '|')
  [[ -n "$tags" ]] && printf '%s\t%s\n' "$rel" "$tags"
done > "$TAG_INDEX"

# Build link index: who links to whom via 延伸閱讀
find knowledge -maxdepth 2 -name '*.md' \
  ! -path 'knowledge/en/*' ! -path 'knowledge/ja/*' \
  ! -path 'knowledge/es/*' ! -path 'knowledge/ko/*' \
  ! -path 'knowledge/resources/*' ! -name '_*' -print0 | \
while IFS= read -r -d '' f; do
  rel="${f#knowledge/}"
  # Extract 延伸閱讀 section links
  awk '/^\*\*延伸閱讀\*\*/{p=1;next} /^##/{p=0} p{print}' "$f" | \
  grep -E '^\s*-\s*\[' | grep -oE '\(/[a-zA-Z]+/[^)]+\)' | tr -d '()' | \
  while read -r link; do
    lcat=$(echo "$link" | cut -d'/' -f2)
    seg=$(echo "$link" | cut -d'/' -f3-)
    cap_cat=$(echo "$lcat" | perl -pe 's/^(\w)/\U$1/')
    printf '%s\t%s/%s\n' "$rel" "$cap_cat" "$seg"
  done
done > "$LINK_INDEX"

# ════════════════════════════════════════
# Mode: Single article analysis
# ════════════════════════════════════════
if [[ "$MODE" == "single" ]]; then
  [[ -z "$TARGET" ]] && echo "用法: $0 <article.md> | --scan | --orphans" && exit 1
  [[ ! -f "$TARGET" ]] && echo "❌ 檔案不存在: $TARGET" && exit 1

  rel="${TARGET#knowledge/}"
  fname=$(basename "$rel" .md)
  fcat=$(echo "$rel" | cut -d'/' -f1)

  echo ""
  echo -e "${BLD}🔗 cross-link v1.0 — ${rel}${RST}"
  echo ""

  # Get target's tags
  my_tags=$(grep "^${rel}" "$TAG_INDEX" | cut -f2)

  # Find related articles by shared tags
  echo -e "${BLD}📋 相關文章（共享 tag 排序）${RST}"
  echo ""
  while IFS=$'\t' read -r other_rel other_tags; do
    [[ "$other_rel" == "$rel" ]] && continue
    # Count shared tags
    shared=0
    IFS='|' read -ra my_arr <<< "$my_tags"
    for t in "${my_arr[@]}"; do
      [[ -z "$t" ]] && continue
      echo "$other_tags" | grep -qF "$t" && shared=$((shared + 1))
    done
    (( shared > 0 )) && printf '%d\t%s\n' "$shared" "$other_rel"
  done < "$TAG_INDEX" | sort -t$'\t' -k1,1rn | head -10 | \
  while IFS=$'\t' read -r count other; do
    # Check if already linked
    linked="  "
    grep -q "^${rel}	${other%.md}" "$LINK_INDEX" 2>/dev/null && linked="→"
    grep -q "^${other}	${fcat}/${fname}" "$LINK_INDEX" 2>/dev/null && linked="${linked}←"
    [[ "$linked" == "→←" ]] && linked="${GRN}⟷${RST}"
    [[ "$linked" == "→ " ]] && linked="${YEL}→ ${RST}"
    [[ "$linked" == "  ←" ]] && linked="${YEL} ←${RST}"
    [[ "$linked" == "  " ]] && linked="${RED}  ${RST}"
    printf "  ${linked} [${count} tags] %s\n" "$other"
  done

  # Check outgoing links
  echo ""
  echo -e "${BLD}📤 本文延伸閱讀連結${RST}"
  outgoing=$(grep "^${rel}" "$LINK_INDEX" 2>/dev/null)
  if [[ -z "$outgoing" ]]; then
    echo -e "  ${RED}無延伸閱讀${RST}"
  else
    while IFS=$'\t' read -r _src tgt; do
      # Check reverse link
      reverse=$(grep "^${tgt}.md" "$LINK_INDEX" 2>/dev/null | grep -c "${fcat}/${fname}")
      if (( reverse > 0 )); then
        echo -e "  ${GRN}⟷${RST} ${tgt} ${DIM}(雙向)${RST}"
      else
        echo -e "  ${YEL}→ ${RST} ${tgt} ${RED}(缺反向連結)${RST}"
      fi
    done <<< "$outgoing"
  fi

  # Check incoming links
  echo ""
  echo -e "${BLD}📥 連結到本文的文章${RST}"
  incoming=$(grep "${fcat}/${fname}" "$LINK_INDEX" 2>/dev/null)
  if [[ -z "$incoming" ]]; then
    echo -e "  ${DIM}無文章連結到本文${RST}"
  else
    while IFS=$'\t' read -r src _tgt; do
      echo -e "  ← ${src}"
    done <<< "$incoming"
  fi
  echo ""

# ════════════════════════════════════════
# Mode: Orphan detection
# ════════════════════════════════════════
elif [[ "$MODE" == "orphans" ]]; then
  echo ""
  echo -e "${BLD}🏝️ 孤立文章（零延伸閱讀 + 零被連結）${RST}"
  echo ""
  orphan_count=0
  while IFS= read -r -d '' f; do
    rel="${f#knowledge/}"
    fname=$(basename "$rel" .md)
    fcat=$(echo "$rel" | cut -d'/' -f1)
    # Has outgoing links?
    out=$(grep -c "^${rel}" "$LINK_INDEX" 2>/dev/null || echo 0)
    # Has incoming links?
    inc=$(grep -c "${fcat}/${fname}" "$LINK_INDEX" 2>/dev/null || echo 0)
    if (( out == 0 && inc == 0 )); then
      echo "  🏝️  ${rel}"
      orphan_count=$((orphan_count + 1))
    fi
  done < <(find knowledge -maxdepth 2 -name '*.md' \
    ! -path 'knowledge/en/*' ! -path 'knowledge/ja/*' \
    ! -path 'knowledge/es/*' ! -path 'knowledge/ko/*' \
    ! -path 'knowledge/resources/*' ! -name '_*' ! -name 'index.md' -print0 | sort -z)
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo -e "🏝️  孤立文章: ${BLD}${orphan_count}${RST} 篇"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# ════════════════════════════════════════
# Mode: Full scan
# ════════════════════════════════════════
elif [[ "$MODE" == "scan" ]]; then
  echo ""
  echo -e "${BLD}🔗 cross-link v1.0 — 全站雙向連結掃描${RST}"
  echo ""

  total_links=0
  bidirectional=0
  one_way=0

  while IFS=$'\t' read -r src tgt; do
    total_links=$((total_links + 1))
    src_cat=$(echo "$src" | cut -d'/' -f1)
    src_name=$(basename "$src" .md)
    # Check if target links back
    reverse=$(grep "^${tgt}.md" "$LINK_INDEX" 2>/dev/null | grep -c "${src_cat}/${src_name}")
    if (( reverse > 0 )); then
      bidirectional=$((bidirectional + 1))
    else
      one_way=$((one_way + 1))
      echo -e "  ${YEL}→${RST} ${src} → ${tgt} ${RED}(單向)${RST}"
    fi
  done < "$LINK_INDEX"

  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo -e "📊 ${BLD}延伸閱讀連結健康度${RST}"
  echo -e "   總連結數:   ${total_links}"
  echo -e "   ${GRN}雙向:       ${bidirectional}${RST}"
  echo -e "   ${YEL}單向:       ${one_way}${RST}"
  bidi_pct=0
  (( total_links > 0 )) && bidi_pct=$((bidirectional * 100 / total_links))
  echo -e "   雙向率:     ${bidi_pct}%"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
fi
