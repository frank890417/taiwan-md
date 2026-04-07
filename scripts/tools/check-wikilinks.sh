#!/bin/bash
# check-wikilinks.sh — 檢查文章中是否殘留 [[wikilink]] 格式
#
# 用途：找出還在用 [[X]] 而非 [X](/path) 的地方
# [[wikilink]] 在列表項目中無法被 Astro 渲染，需改為標準 Markdown 連結
#
# 使用方式：
#   bash scripts/tools/check-wikilinks.sh           # 掃全站
#   bash scripts/tools/check-wikilinks.sh --json    # JSON 輸出

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m'

JSON_MODE=false
if [ "$1" = "--json" ]; then
    JSON_MODE=true
fi

issues=0
total=0

# 找出所有 knowledge/ 下的 .md（排除 _Hub 和隱藏檔）
while IFS= read -r article; do
    total=$((total + 1))

    # 找列表項目中的 [[X]] 格式
    matches=$(grep -n '^\s*- \[\[' "$article" 2>/dev/null)
    if [ -n "$matches" ]; then
        count=$(echo "$matches" | wc -l | tr -d ' ')
        issues=$((issues + count))
        if [ "$JSON_MODE" = false ]; then
            echo -e "${RED}❌ $article: $count 個 [[wikilink]] 殘留${NC}"
            echo "$matches" | head -5 | while read -r line; do
                echo "   $line"
            done
        fi
    fi
done < <(find knowledge/ -name "*.md" -type f ! -name "_*" ! -path "*/es/*")

if [ "$JSON_MODE" = true ]; then
    echo "{\"total_files\": $total, \"wikilink_issues\": $issues}"
else
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "📊 掃描 $total 篇文章"
    if [ "$issues" -eq 0 ]; then
        echo -e "${GREEN}✅ 無 [[wikilink]] 殘留${NC}"
    else
        echo -e "${RED}❌ 發現 $issues 處 [[wikilink]] 需修正${NC}"
        echo "   修正方式：[[文章名]] → [文章名](/category/slug)"
    fi
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
fi
