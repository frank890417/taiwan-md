#!/bin/bash

# Taiwan.md 死連結掃描自動化腳本
# 掃描 knowledge/ 下所有 .md 檔案中的外部連結
# 並行檢查 HTTP 狀態碼，報告死連結

set -euo pipefail

# 顏色定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 配置
KNOWLEDGE_DIR="knowledge"
TIMEOUT=10
PARALLEL_JOBS=10
TEMP_FILE=$(mktemp)
DEAD_LINKS_FILE="dead-links-report-$(date +%Y%m%d-%H%M%S).txt"

# 已知誤報 URL 模式（會回傳 403 但實際可存取）
IGNORE_PATTERNS=(
    "github.com/.*"
    "api.github.com/.*"
    "linkedin.com/.*"
    "facebook.com/.*"
    "instagram.com/.*"
)

echo -e "${BLUE}🔍 Taiwan.md 死連結掃描工具${NC}"
echo -e "掃描目錄: ${KNOWLEDGE_DIR}"
echo -e "並行數: ${PARALLEL_JOBS}"
echo -e "超時: ${TIMEOUT}秒"
echo ""

# 清理函數
cleanup() {
    rm -f "$TEMP_FILE" 2>/dev/null || true
}
trap cleanup EXIT

# 檢查單一 URL 的函數
check_url() {
    local file="$1"
    local line_num="$2"
    local url="$3"
    
    # 檢查是否在忽略列表中
    for pattern in "${IGNORE_PATTERNS[@]}"; do
        if [[ "$url" =~ $pattern ]]; then
            echo "SKIP|$file|$line_num|$url|忽略模式匹配"
            return
        fi
    done
    
    # 只檢查 HTTP/HTTPS URL
    if [[ ! "$url" =~ ^https?:// ]]; then
        return
    fi
    
    # 執行 HEAD request
    local status_code
    status_code=$(curl -sI -o /dev/null -w '%{http_code}' \
        --connect-timeout "$TIMEOUT" \
        --max-time "$TIMEOUT" \
        --user-agent "Taiwan.md Link Checker (https://taiwan.md)" \
        "$url" 2>/dev/null || echo "000")
    
    # 檢查狀態碼
    case "$status_code" in
        "000")
            echo "ERROR|$file|$line_num|$url|連線超時或失敗"
            ;;
        [45]*)
            echo "DEAD|$file|$line_num|$url|HTTP $status_code"
            ;;
        *)
            echo "OK|$file|$line_num|$url|HTTP $status_code"
            ;;
    esac
}

# 匯出函數供 xargs 使用
export -f check_url
export TIMEOUT
export IGNORE_PATTERNS

# 提取所有 URL 並生成檢查清單
echo -e "${YELLOW}⚙️  提取所有外部連結...${NC}"

find "$KNOWLEDGE_DIR" -name "*.md" -type f | while read -r file; do
    # 提取 Markdown 連結格式 [text](url)
    grep -n '\[.*\](http[^)]*)' "$file" 2>/dev/null | \
        sed -E 's/.*\[([^\]]*)\]\(([^)]*)\).*/\2/' | \
        nl -nln | \
        while read -r line_num url; do
            echo "$file|$line_num|$url"
        done
    
    # 提取裸 URL（以 http 開頭的完整 URL）
    grep -n -o 'https\?://[^[:space:]<>()]*' "$file" 2>/dev/null | \
        while IFS=: read -r line_num url; do
            echo "$file|$line_num|$url"
        done
done > "$TEMP_FILE"

total_links=$(wc -l < "$TEMP_FILE")
echo -e "找到 ${total_links} 個外部連結"

if [ "$total_links" -eq 0 ]; then
    echo -e "${GREEN}✅ 沒有找到外部連結${NC}"
    exit 0
fi

echo -e "\n${YELLOW}🌐 開始檢查連結狀態...${NC}"

# 並行檢查所有 URL
check_results=$(while IFS='|' read -r file line_num url; do
    echo "check_url \"$file\" \"$line_num\" \"$url\""
done < "$TEMP_FILE" | xargs -n 1 -P "$PARALLEL_JOBS" -I {} bash -c "{}")

# 統計結果
ok_count=0
dead_count=0
error_count=0
skip_count=0

echo -e "\n${BLUE}📊 檢查結果：${NC}"
echo "=========================================="

{
    echo "# Taiwan.md 死連結檢查報告"
    echo "# 生成時間: $(date)"
    echo "# 掃描範圍: $KNOWLEDGE_DIR"
    echo ""
} > "$DEAD_LINKS_FILE"

# 處理結果
while IFS='|' read -r status file line_num url message; do
    case "$status" in
        "OK")
            ((ok_count++))
            ;;
        "DEAD")
            ((dead_count++))
            echo -e "${RED}💀 死連結${NC}: $file:$line_num"
            echo -e "   ${RED}URL: $url${NC}"
            echo -e "   ${RED}狀態: $message${NC}"
            echo ""
            echo "DEAD|$file|$line_num|$url|$message" >> "$DEAD_LINKS_FILE"
            ;;
        "ERROR")
            ((error_count++))
            echo -e "${YELLOW}⚠️  錯誤${NC}: $file:$line_num"
            echo -e "   ${YELLOW}URL: $url${NC}"
            echo -e "   ${YELLOW}狀態: $message${NC}"
            echo ""
            echo "ERROR|$file|$line_num|$url|$message" >> "$DEAD_LINKS_FILE"
            ;;
        "SKIP")
            ((skip_count++))
            ;;
    esac
done <<< "$check_results"

echo "=========================================="
echo -e "${GREEN}✅ 正常連結: $ok_count${NC}"
echo -e "${RED}💀 死連結: $dead_count${NC}"
echo -e "${YELLOW}⚠️  錯誤: $error_count${NC}"
echo -e "${BLUE}⏭️  跳過: $skip_count${NC}"
echo -e "${BLUE}📊 總計: $total_links${NC}"

if [ "$dead_count" -gt 0 ] || [ "$error_count" -gt 0 ]; then
    echo ""
    echo -e "${YELLOW}📄 詳細報告已保存至: $DEAD_LINKS_FILE${NC}"
    
    {
        echo ""
        echo "## 統計摘要"
        echo "- ✅ 正常連結: $ok_count"
        echo "- 💀 死連結: $dead_count" 
        echo "- ⚠️ 錯誤: $error_count"
        echo "- ⏭️ 跳過: $skip_count"
        echo "- 📊 總計: $total_links"
    } >> "$DEAD_LINKS_FILE"
    
    exit 1
else
    echo ""
    echo -e "${GREEN}🎉 所有連結檢查通過！${NC}"
    rm -f "$DEAD_LINKS_FILE"
    exit 0
fi