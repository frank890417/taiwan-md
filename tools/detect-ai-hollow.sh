#!/bin/bash
# detect-ai-hollow.sh — 偵測疑似 AI 空洞模板的文章
# 用法: bash tools/detect-ai-hollow.sh [--fix] [--json]
#
# 評分標準 (每項 0-N 分，越高越可疑):
#   1. bullet 密度：「- **」行數 / 總行數 > 30%
#   2. 缺乏年份：具體四位數年份出現次數 < 3
#   3. 缺乏來源：無任何 http 連結
#   4. 空洞修飾詞密度：「重要的|顯著的|豐富的|完整的|多元的|積極|蓬勃」
#   5. 重複結構：連續 3+ 個相同格式的 bullet 區塊
#   6. 段落文字少：非標題非bullet的散文行 < 10
#   7. lastHumanReview: false

set -uo pipefail
cd "$(dirname "$0")/.."

RED='\033[0;31m'
YEL='\033[0;33m'
GRN='\033[0;32m'
DIM='\033[0;90m'
RST='\033[0m'

JSON_MODE=false
FIX_MODE=false
for arg in "$@"; do
  [[ "$arg" == "--json" ]] && JSON_MODE=true
  [[ "$arg" == "--fix" ]] && FIX_MODE=true
done

TOTAL=0
SUSPECT=0
FLAGGED_FILES=()
SCORES=()

scan_file() {
  local f="$1"
  local score=0
  local reasons=""
  local lines
  lines=$(wc -l < "$f")
  lines=${lines//[[:space:]]/}
  
  # Skip very short files (stubs)
  [[ $lines -lt 20 ]] && return

  # 1. Bullet 密度
  local bullet_lines
  bullet_lines=$(grep -c '^- \*\*' "$f" 2>/dev/null || echo "0")
  bullet_lines=${bullet_lines//[[:space:]]/}
  local bullet_ratio=0
  if [[ $lines -gt 0 ]]; then
    bullet_ratio=$((bullet_lines * 100 / lines))
  fi
  if [[ $bullet_ratio -gt 30 ]]; then
    score=$((score + 3))
    reasons="${reasons}bullet密度${bullet_ratio}% "
  elif [[ $bullet_ratio -gt 20 ]]; then
    score=$((score + 1))
    reasons="${reasons}bullet密度${bullet_ratio}% "
  fi

  # 2. 缺乏具體年份
  local year_count
  year_count=$(grep -oE '\b(1[6-9][0-9]{2}|20[0-2][0-9])\b' "$f" | grep -v 'date:' | wc -l | tr -d '[:space:]')
  if [[ $year_count -lt 2 ]]; then
    score=$((score + 3))
    reasons="${reasons}年份僅${year_count}個 "
  elif [[ $year_count -lt 5 ]]; then
    score=$((score + 1))
    reasons="${reasons}年份${year_count}個 "
  fi

  # 3. 缺乏引用來源
  local url_count
  url_count=$(grep -c 'http' "$f" 2>/dev/null || echo "0")
  url_count=${url_count//[[:space:]]/}
  if [[ $url_count -eq 0 ]]; then
    score=$((score + 3))
    reasons="${reasons}無URL來源 "
  elif [[ $url_count -lt 3 ]]; then
    score=$((score + 1))
    reasons="${reasons}僅${url_count}個URL "
  fi

  # 4. 空洞修飾詞
  local hollow_count
  hollow_count=$(grep -oE '重要的|顯著的|豐富的|完整的|多元的|積極|蓬勃發展|逐步|逐漸|不斷|持續|日益|進一步|全面|深入|大力|有效|顯著|穩步' "$f" | wc -l | tr -d '[:space:]')
  if [[ $hollow_count -gt 15 ]]; then
    score=$((score + 3))
    reasons="${reasons}空洞詞${hollow_count}個 "
  elif [[ $hollow_count -gt 8 ]]; then
    score=$((score + 2))
    reasons="${reasons}空洞詞${hollow_count}個 "
  elif [[ $hollow_count -gt 4 ]]; then
    score=$((score + 1))
    reasons="${reasons}空洞詞${hollow_count}個 "
  fi

  # 5. 散文段落太少 (非標題、非bullet、非空行、非frontmatter的行)
  local prose_lines
  prose_lines=$(grep -cvE '^(#|-|\*|\||>|$|---|\s*$|title:|description:|date:|tags:|category:|author:|featured:|last)' "$f" 2>/dev/null || echo "0")
  prose_lines=$(echo "$prose_lines" | tr -d '[:space:]')
  if [[ $prose_lines -lt 5 ]]; then
    score=$((score + 3))
    reasons="${reasons}散文僅${prose_lines}行 "
  elif [[ $prose_lines -lt 15 ]]; then
    score=$((score + 1))
    reasons="${reasons}散文${prose_lines}行 "
  fi

  # 6. lastHumanReview: false
  if grep -q 'lastHumanReview: false' "$f" 2>/dev/null; then
    score=$((score + 1))
    reasons="${reasons}未人工審核 "
  fi

  # 7. 重複 bullet 區塊 (連續 4+ 行都是 "- **X**：Y" 格式)
  local max_consecutive=0
  local current=0
  while IFS= read -r line; do
    if [[ "$line" =~ ^-\ \*\* ]]; then
      current=$((current + 1))
      [[ $current -gt $max_consecutive ]] && max_consecutive=$current
    else
      current=0
    fi
  done < "$f"
  if [[ $max_consecutive -ge 6 ]]; then
    score=$((score + 2))
    reasons="${reasons}連續bullet${max_consecutive}行 "
  elif [[ $max_consecutive -ge 4 ]]; then
    score=$((score + 1))
    reasons="${reasons}連續bullet${max_consecutive}行 "
  fi

  TOTAL=$((TOTAL + 1))

  # 分級: 0-3 OK, 4-7 ⚠️ 可疑, 8+ 🔴 高度可疑
  if [[ $score -ge 8 ]]; then
    SUSPECT=$((SUSPECT + 1))
    local rel="${f#src/content/zh-TW/}"
    FLAGGED_FILES+=("$rel")
    SCORES+=("$score")
    if [[ "$JSON_MODE" == false ]]; then
      echo -e "${RED}🔴 [$score] $rel${RST}"
      echo -e "   ${DIM}${reasons}${RST}"
    fi
  elif [[ $score -ge 4 ]]; then
    SUSPECT=$((SUSPECT + 1))
    local rel="${f#src/content/zh-TW/}"
    FLAGGED_FILES+=("$rel")
    SCORES+=("$score")
    if [[ "$JSON_MODE" == false ]]; then
      echo -e "${YEL}⚠️  [$score] $rel${RST}"
      echo -e "   ${DIM}${reasons}${RST}"
    fi
  fi
}

echo ""
if [[ "$JSON_MODE" == false ]]; then
  echo "🔍 掃描 src/content/zh-TW/ 中所有 .md 文章..."
  echo "   評分: 0-3 ✅ OK | 4-7 ⚠️ 可疑 | 8+ 🔴 高度可疑"
  echo ""
fi

# Scan all zh-TW articles
while IFS= read -r -d '' file; do
  scan_file "$file"
done < <(find src/content/zh-TW -name '*.md' -print0 | sort -z)

if [[ "$JSON_MODE" == true ]]; then
  echo "{"
  echo "  \"total\": $TOTAL,"
  echo "  \"flagged\": $SUSPECT,"
  echo "  \"files\": ["
  for i in "${!FLAGGED_FILES[@]}"; do
    comma=""
    [[ $i -lt $((${#FLAGGED_FILES[@]} - 1)) ]] && comma=","
    echo "    {\"file\": \"${FLAGGED_FILES[$i]}\", \"score\": ${SCORES[$i]}}${comma}"
  done
  echo "  ]"
  echo "}"
else
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo -e "📊 掃描完成: ${TOTAL} 篇文章"
  if [[ $SUSPECT -gt 0 ]]; then
    echo -e "${YEL}⚠️  疑似空洞模板: ${SUSPECT} 篇${RST}"
  else
    echo -e "${GRN}✅ 全部通過${RST}"
  fi
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
fi

if [[ "$FIX_MODE" == true ]] && [[ $SUSPECT -gt 0 ]]; then
  echo ""
  echo "📝 標記 lastHumanReview: false → 需要重寫"
  for f in "${FLAGGED_FILES[@]}"; do
    full="src/content/zh-TW/$f"
    if grep -q 'lastHumanReview: true' "$full" 2>/dev/null; then
      sed -i '' 's/lastHumanReview: true/lastHumanReview: false/' "$full"
      echo "   ✏️  $f → lastHumanReview: false"
    fi
  done
fi
