#!/usr/bin/env bash
# format-check.sh v1.0 — Stage 4 FORMAT CHECK + Stage 5 CROSS-LINK 驗證
#
# 進化自 footnote-scan.sh + check-wikilinks.sh，整合為統一的格式健康掃描器。
# 對應 REWRITE-PIPELINE v2.11 Stage 4 & 5 的所有檢查項。
#
# 用法:
#   bash scripts/tools/format-check.sh                    # 全站掃描
#   bash scripts/tools/format-check.sh knowledge/X/Y.md   # 單檔掃描
#   bash scripts/tools/format-check.sh --json              # JSON 輸出
#   bash scripts/tools/format-check.sh --worst N           # 只顯示最差 N 篇
#
# 檢查 7 個維度：
#   1. 延伸閱讀區塊存在性 + 格式
#   2. ## 參考資料 標題存在性
#   3. 腳註格式品質（連結 + 描述）
#   4. 延伸閱讀連結目標存在性
#   5. [[wikilink]] 殘留偵測
#   6. 30 秒概覽存在性
#   7. 反向連結缺失（延伸閱讀雙向性）
#
# 造橋鋪路：手動走 Stage 4 & 5 → 腳本化 → 每次心跳自動帶格式健康度

set -uo pipefail
cd "$(dirname "$0")/../.."

# ── Colors ──
RED='\033[0;31m'
YEL='\033[0;33m'
GRN='\033[0;32m'
DIM='\033[0;90m'
CYN='\033[0;36m'
BLD='\033[1m'
RST='\033[0m'

# ── Args ──
JSON_MODE=false
WORST_N=0
SINGLE_FILE=""
args=("$@")
i=0
while [[ $i -lt ${#args[@]} ]]; do
  case "${args[$i]}" in
    --json) JSON_MODE=true ;;
    --worst) i=$((i + 1)); WORST_N="${args[$i]}" ;;
    *.md) SINGLE_FILE="${args[$i]}" ;;
  esac
  i=$((i + 1))
done

# ── Temp files ──
RESULT_FILE=$(mktemp)
trap 'rm -f "$RESULT_FILE"' EXIT

# ── Build reverse-link index (which articles link to which) ──
# Map: target_path -> list of source articles that link to it
REVERSE_INDEX=$(mktemp)
trap 'rm -f "$RESULT_FILE" "$REVERSE_INDEX"' EXIT

build_reverse_index() {
  # Scan all articles for 延伸閱讀 links: [text](/category/slug)
  find knowledge -maxdepth 2 -name '*.md' \
    ! -path 'knowledge/en/*' ! -path 'knowledge/ja/*' \
    ! -path 'knowledge/es/*' ! -path 'knowledge/ko/*' \
    ! -path 'knowledge/resources/*' ! -name '_*' -print0 | \
  while IFS= read -r -d '' f; do
    local rel="${f#knowledge/}"
    # Extract links from 延伸閱讀 list items only: - [text](/category/slug)
    grep -E '^\s*-\s*\[' "$f" 2>/dev/null | \
    grep -oE '\(/[a-zA-Z]+/[^)]+\)' | tr -d '()' | while read -r link; do
      # /nature/台灣環境運動史 -> Nature/台灣環境運動史
      local cat seg
      cat=$(echo "$link" | cut -d'/' -f2)
      seg=$(echo "$link" | cut -d'/' -f3-)
      # Capitalize category for knowledge/ path
      local cap_cat
      cap_cat=$(echo "$cat" | perl -pe 's/^(\w)/\U$1/')
      printf '%s/%s\t%s\n' "$cap_cat" "$seg" "$rel"
    done
  done > "$REVERSE_INDEX"
}

# ── Counters ──
total=0
pass=0
warn=0
fail=0

# Global issue counters
g_no_reading=0
g_no_ref_heading=0
g_bad_fn_format=0
g_broken_links=0
g_wikilinks=0
g_no_overview=0
g_no_reverse=0

check_file() {
  local f="$1"
  local rel="${f#knowledge/}"
  local fcat
  fcat=$(echo "$rel" | cut -d'/' -f1)
  local fname
  fname=$(basename "$rel" .md)

  # Skip short/stub files
  local flines
  flines=$(wc -l < "$f")
  flines=${flines//[[:space:]]/}
  [[ $flines -lt 15 ]] && return

  total=$((total + 1))

  local issues=""
  local issue_count=0

  # ── Read file content (skip frontmatter) ──
  local content
  content=$(awk 'BEGIN{fm=0} /^---$/{fm++; next} fm>=2{print}' "$f")

  # ────────────────────────────────────────────
  # 1. 延伸閱讀 section
  # ────────────────────────────────────────────
  local has_reading=0
  local reading_items=0
  local reading_no_desc=0
  local reading_wikilinks=0

  # Accept both `**延伸閱讀**` (inline bold, 94 articles) and `## 延伸閱讀`
  # (H2 heading, 53 articles). Bug fix 2026-04-15: regex only matched bold
  # form, so articles using H2 (incl. 李洋 + 張懸與安溥, two strongest spores)
  # were false-positive NO_READING.
  if echo "$content" | grep -qE '^(\*\*延伸閱讀\*\*|## 延伸閱讀)'; then
    has_reading=1
    # Count markdown link items in 延伸閱讀 section
    # Extract lines between the opener and next ## heading
    local reading_section
    reading_section=$(echo "$content" | awk '/^(\*\*延伸閱讀\*\*|## 延伸閱讀)/{p=1;next} /^##/{p=0} p{print}')
    reading_items=$(echo "$reading_section" | grep -cE '^\s*-\s*\[' 2>/dev/null || echo 0)
    reading_items=${reading_items//[[:space:]]/}

    # Check for missing descriptions (lines with link but no " — " after)
    reading_no_desc=$(echo "$reading_section" | grep -E '^\s*-\s*\[' | grep -vcE ' — ' 2>/dev/null || echo 0)
    reading_no_desc=${reading_no_desc//[[:space:]]/}

    # Check for [[wikilink]] in reading section
    reading_wikilinks=$(echo "$reading_section" | grep -cE '\[\[' 2>/dev/null || echo 0)
    reading_wikilinks=${reading_wikilinks//[[:space:]]/}
  fi

  if [[ $has_reading -eq 0 ]]; then
    issues="${issues}NO_READING,"
    issue_count=$((issue_count + 2))
    g_no_reading=$((g_no_reading + 1))
  else
    if [[ $reading_no_desc -gt 0 ]]; then
      issues="${issues}READING_NO_DESC(${reading_no_desc}),"
      issue_count=$((issue_count + 1))
    fi
    if [[ $reading_wikilinks -gt 0 ]]; then
      issues="${issues}READING_WIKILINK(${reading_wikilinks}),"
      issue_count=$((issue_count + 1))
      g_wikilinks=$((g_wikilinks + reading_wikilinks))
    fi
  fi

  # ────────────────────────────────────────────
  # 2. ## 參考資料 heading
  # ────────────────────────────────────────────
  local has_ref_heading=0
  if echo "$content" | grep -qE '^## 參考資料'; then
    has_ref_heading=1
  fi

  if [[ $has_ref_heading -eq 0 ]]; then
    # Only flag if the article has footnotes (otherwise it's a bigger problem)
    local fn_count
    fn_count=$(grep -cE '^\[\^[0-9a-zA-Z_-]+\]:' "$f" 2>/dev/null || echo "0")
    fn_count=${fn_count//[[:space:]]/}
    if [[ $fn_count -gt 0 ]]; then
      issues="${issues}NO_REF_HEADING,"
      issue_count=$((issue_count + 1))
      g_no_ref_heading=$((g_no_ref_heading + 1))
    fi
  fi

  # ────────────────────────────────────────────
  # 3. 腳註格式品質
  # ────────────────────────────────────────────
  local fn_total fn_good fn_bad
  fn_total=$(grep -cE '^\[\^[0-9a-zA-Z_-]+\]:' "$f" 2>/dev/null || echo "0")
  fn_total=${fn_total//[[:space:]]/}

  if [[ $fn_total -gt 0 ]]; then
    # Good format: [^n]: [Name](URL) — description (has link + dash + text)
    fn_good=$(grep -cE '^\[\^[0-9a-zA-Z_-]+\]: \[.+\]\(https?://.+\) — .{10,}' "$f" 2>/dev/null || echo "0")
    fn_good=${fn_good//[[:space:]]/}
    fn_bad=$((fn_total - fn_good))

    if [[ $fn_bad -gt 0 ]]; then
      issues="${issues}BAD_FN_FORMAT(${fn_bad}/${fn_total}),"
      issue_count=$((issue_count + 1))
      g_bad_fn_format=$((g_bad_fn_format + fn_bad))
    fi
  fi

  # ────────────────────────────────────────────
  # 4. 延伸閱讀連結目標存在性
  # ────────────────────────────────────────────
  local broken_links=0
  if [[ $has_reading -eq 1 ]]; then
    local reading_section
    reading_section=$(echo "$content" | awk '/^\*\*延伸閱讀\*\*/{p=1;next} /^##/{p=0} p{print}')
    # Only extract links from list items (- [text](/path)), not from footnote URLs
    while read -r link; do
      [[ -z "$link" ]] && continue
      local lcat seg cap_cat
      lcat=$(echo "$link" | cut -d'/' -f2)
      seg=$(echo "$link" | cut -d'/' -f3-)
      cap_cat=$(echo "$lcat" | perl -pe 's/^(\w)/\U$1/')
      if [[ ! -f "knowledge/${cap_cat}/${seg}.md" ]]; then
        broken_links=$((broken_links + 1))
      fi
    done < <(echo "$reading_section" | grep -E '^\s*-\s*\[' | grep -oE '\(/[a-z]+/[^)]+\)' | tr -d '()' 2>/dev/null)

    if [[ $broken_links -gt 0 ]]; then
      issues="${issues}BROKEN_LINKS(${broken_links}),"
      issue_count=$((issue_count + 1))
      g_broken_links=$((g_broken_links + broken_links))
    fi
  fi

  # ────────────────────────────────────────────
  # 5. [[wikilink]] 殘留（全文，不只延伸閱讀）
  # ────────────────────────────────────────────
  local global_wikilinks
  global_wikilinks=$(echo "$content" | grep -cE '^\s*-\s*\[\[' 2>/dev/null || echo 0)
  global_wikilinks=${global_wikilinks//[[:space:]]/}
  if [[ $global_wikilinks -gt 0 ]] && [[ $reading_wikilinks -eq 0 ]]; then
    issues="${issues}WIKILINKS(${global_wikilinks}),"
    issue_count=$((issue_count + 1))
    g_wikilinks=$((g_wikilinks + global_wikilinks))
  fi

  # ────────────────────────────────────────────
  # 6. 30 秒概覽
  # ────────────────────────────────────────────
  local has_overview=0
  if echo "$content" | grep -qE '>\s*\*\*30\s*秒概覽'; then
    has_overview=1
  elif echo "$content" | grep -qE '>\s*\*\*30-Second Overview'; then
    has_overview=1
  fi
  # Also accept ## 30 秒概覽 heading style
  if [[ $has_overview -eq 0 ]] && echo "$content" | grep -qE '^## 30 秒概覽'; then
    has_overview=1
  fi

  if [[ $has_overview -eq 0 ]]; then
    issues="${issues}NO_OVERVIEW,"
    issue_count=$((issue_count + 1))
    g_no_overview=$((g_no_overview + 1))
  fi

  # ────────────────────────────────────────────
  # 7. 反向連結（是否有其他文章連結到本文）
  # ────────────────────────────────────────────
  local reverse_count=0
  if [[ -f "$REVERSE_INDEX" ]]; then
    reverse_count=$(grep -c "^${fcat}/${fname}" "$REVERSE_INDEX" 2>/dev/null || echo 0)
    reverse_count=${reverse_count//[[:space:]]/}
  fi
  # Only flag featured articles with zero reverse links
  local is_featured=0
  if grep -qE '^featured:\s*true' "$f" 2>/dev/null; then
    is_featured=1
  fi
  if [[ $reverse_count -eq 0 ]] && [[ $is_featured -eq 1 ]]; then
    issues="${issues}NO_REVERSE_LINK,"
    issue_count=$((issue_count + 1))
    g_no_reverse=$((g_no_reverse + 1))
  fi

  # ── Classify ──
  issues=${issues%,} # trim trailing comma
  local status="PASS"
  if [[ $issue_count -ge 3 ]]; then
    status="FAIL"
    fail=$((fail + 1))
  elif [[ $issue_count -ge 1 ]]; then
    status="WARN"
    warn=$((warn + 1))
  else
    pass=$((pass + 1))
  fi

  # Write result: issue_count | status | issues | fn_total | reading_items | reverse_count | cat | rel
  printf '%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\n' \
    "$issue_count" "$status" "${issues:-OK}" "$fn_total" "$reading_items" "$reverse_count" "$fcat" "$rel" \
    >> "$RESULT_FILE"
}

# ── Build reverse index ──
[[ "$JSON_MODE" == false ]] && echo -e "${DIM}Building reverse link index...${RST}"
build_reverse_index

# ── Scan ──
if [[ -n "$SINGLE_FILE" ]]; then
  check_file "$SINGLE_FILE"
else
  while IFS= read -r -d '' file; do
    check_file "$file"
  done < <(find knowledge -maxdepth 2 -name '*.md' \
    ! -path 'knowledge/en/*' ! -path 'knowledge/ja/*' \
    ! -path 'knowledge/es/*' ! -path 'knowledge/ko/*' \
    ! -path 'knowledge/resources/*' ! -name '_*' ! -name 'index.md' -print0 | sort -z)
fi

# ── Sort: worst first ──
SORTED_FILE=$(mktemp)
trap 'rm -f "$RESULT_FILE" "$REVERSE_INDEX" "$SORTED_FILE"' EXIT
sort -t$'\t' -k1,1rn "$RESULT_FILE" > "$SORTED_FILE"

# Apply --worst
if [[ $WORST_N -gt 0 ]]; then
  head -n "$WORST_N" "$SORTED_FILE" > "${SORTED_FILE}.tmp"
  mv "${SORTED_FILE}.tmp" "$SORTED_FILE"
fi

# ══════════════════════════════════════════════════════
# OUTPUT
# ══════════════════════════════════════════════════════
if [[ "$JSON_MODE" == false ]]; then
  echo ""
  echo -e "${BLD}📋 format-check v1.0 — Stage 4 & 5 格式健康報告${RST}"
  echo "   7 維度：延伸閱讀 | 參考資料標題 | 腳註格式 | 連結存在 | wikilink | 概覽 | 反向連結"
  echo ""

  # Only show non-pass articles
  local_shown=0
  while IFS=$'\t' read -r ic st iss fn ri rc fcat rel; do
    [[ "$st" == "PASS" ]] && continue
    local_shown=$((local_shown + 1))
    case "$st" in
      FAIL) sc="${RED}❌" ;;
      WARN) sc="${YEL}⚠️ " ;;
    esac
    printf "${sc} [%s] %-50s${DIM} fn:%s read:%s rev:%s${RST}\n" \
      "$st" "$rel" "$fn" "$ri" "$rc"
    # Show issues
    echo -e "   ${DIM}${iss}${RST}"
  done < "$SORTED_FILE"

  if [[ $local_shown -eq 0 ]]; then
    echo -e "${GRN}✅ 所有文章格式通過${RST}"
  fi

  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo -e "📊 ${BLD}格式健康度摘要${RST}"
  echo -e "   掃描: ${BLD}${total}${RST} 篇"
  echo -e "   ${GRN}✅ 通過:  ${pass}${RST}"
  echo -e "   ${YEL}⚠️  警告:  ${warn}${RST}"
  echo -e "   ${RED}❌ 不合格: ${fail}${RST}"
  echo ""
  echo -e "   ${BLD}各維度問題數:${RST}"
  echo -e "   📖 缺延伸閱讀:      ${g_no_reading}"
  echo -e "   📑 缺 ## 參考資料:   ${g_no_ref_heading}"
  echo -e "   📝 腳註格式不合規:   ${g_bad_fn_format}"
  echo -e "   🔗 延伸閱讀斷連結:   ${g_broken_links}"
  echo -e "   ⚠️  [[wikilink]] 殘留: ${g_wikilinks}"
  echo -e "   👁️  缺 30 秒概覽:     ${g_no_overview}"
  echo -e "   ↩️  精選文章無反向連結: ${g_no_reverse}"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

elif [[ "$JSON_MODE" == true ]]; then
  cat <<JSONHEAD
{
  "version": "1.0",
  "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "summary": {
    "total": $total,
    "pass": $pass,
    "warn": $warn,
    "fail": $fail,
    "issues": {
      "no_reading": $g_no_reading,
      "no_ref_heading": $g_no_ref_heading,
      "bad_fn_format": $g_bad_fn_format,
      "broken_links": $g_broken_links,
      "wikilinks": $g_wikilinks,
      "no_overview": $g_no_overview,
      "no_reverse_link": $g_no_reverse
    }
  },
  "articles": [
JSONHEAD
  first=true
  while IFS=$'\t' read -r ic st iss fn ri rc fcat rel; do
    [[ "$st" == "PASS" ]] && continue
    [[ "$first" == true ]] && first=false || printf ',\n'
    printf '    {"file": "%s", "status": "%s", "issues": "%s", "footnotes": %d, "reading_items": %d, "reverse_links": %d}' \
      "$rel" "$st" "$iss" "$fn" "$ri" "$rc"
  done < "$SORTED_FILE"
  cat <<JSONEND

  ]
}
JSONEND
fi
