#!/bin/bash

# Taiwan.md Featured 文章統一管控工具
# 管理 knowledge/ 目錄下文章的 featured: true 設定

set -euo pipefail

# 顏色定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

KNOWLEDGE_DIR="knowledge"

# 使用說明
usage() {
    echo -e "${BLUE}🏆 Taiwan.md Featured 文章管控工具${NC}"
    echo ""
    echo "用法: $0 <command> [arguments]"
    echo ""
    echo "指令:"
    echo "  list                    - 列出所有 featured 文章"
    echo "  set <文章路徑>           - 設定文章為 featured"
    echo "  unset <文章路徑>         - 取消文章的 featured 狀態"
    echo "  audit                   - 檢查 featured 數量分佈"
    echo ""
    echo "範例:"
    echo "  $0 list"
    echo "  $0 set knowledge/Culture/台灣夜市文化.md"
    echo "  $0 unset knowledge/Music/台灣搖滾樂發展史.md"
    echo "  $0 audit"
}

# 列出所有 featured 文章
list_featured() {
    echo -e "${BLUE}📋 所有 Featured 文章列表${NC}"
    echo "======================================"
    
    local count=0
    local current_category=""
    
    # 按分類排序顯示
    grep -r "featured: true" "$KNOWLEDGE_DIR" | \
        sort | \
        while IFS=':' read -r file _; do
            ((count++))
            
            # 提取分類名稱
            local category=$(dirname "$file" | sed "s|$KNOWLEDGE_DIR/||" | sed 's|^en/||' | cut -d'/' -f1)
            
            if [[ "$category" != "$current_category" ]]; then
                echo -e "\n${YELLOW}📂 $category${NC}"
                current_category="$category"
            fi
            
            # 提取文章標題（從檔名）
            local title=$(basename "$file" .md)
            echo -e "  ✨ $title"
            echo -e "     ${BLUE}檔案: $file${NC}"
    done
    
    local total=$(grep -r "featured: true" "$KNOWLEDGE_DIR" | wc -l)
    echo ""
    echo -e "${GREEN}📊 總計: $total 篇 featured 文章${NC}"
}

# 設定文章為 featured
set_featured() {
    local file_path="$1"
    
    if [[ ! -f "$file_path" ]]; then
        echo -e "${RED}❌ 檔案不存在: $file_path${NC}"
        exit 1
    fi
    
    # 檢查是否已經是 featured
    if grep -q "featured: true" "$file_path"; then
        echo -e "${YELLOW}⚠️  文章已經是 featured 狀態: $file_path${NC}"
        return
    fi
    
    # 在 frontmatter 中加入 featured: true
    if grep -q "^---$" "$file_path"; then
        # 在第二個 --- 之前插入 featured: true
        sed -i '' '/^---$/,/^---$/{
            /^---$/!{
                /featured:/d
            }
        }' "$file_path"
        
        # 在第二個 --- 之前加入 featured: true
        awk '
        /^---$/ && NR==1 { print; next }
        /^---$/ && seen_first { print "featured: true"; print; next }
        /^---$/ { seen_first=1; print; next }
        { print }
        ' "$file_path" > "${file_path}.tmp" && mv "${file_path}.tmp" "$file_path"
        
        echo -e "${GREEN}✅ 已設定 featured: $file_path${NC}"
    else
        echo -e "${RED}❌ 檔案缺少 frontmatter: $file_path${NC}"
        exit 1
    fi
}

# 取消文章的 featured 狀態
unset_featured() {
    local file_path="$1"
    
    if [[ ! -f "$file_path" ]]; then
        echo -e "${RED}❌ 檔案不存在: $file_path${NC}"
        exit 1
    fi
    
    # 檢查是否為 featured
    if ! grep -q "featured: true" "$file_path"; then
        echo -e "${YELLOW}⚠️  文章本來就不是 featured 狀態: $file_path${NC}"
        return
    fi
    
    # 移除 featured: true 行
    sed -i '' '/^featured: true$/d' "$file_path"
    
    echo -e "${GREEN}✅ 已取消 featured: $file_path${NC}"
}

# 審計 featured 文章分佈
audit_featured() {
    echo -e "${BLUE}📊 Featured 文章分佈審計${NC}"
    echo "======================================"
    
    local total_featured=0
    local total_articles=0
    
    echo -e "${YELLOW}各分類 Featured 文章統計：${NC}"
    echo ""
    
    # 統計各分類的 featured 文章數量
    for category_dir in "$KNOWLEDGE_DIR"/*/ ; do
        if [[ -d "$category_dir" ]]; then
            local category=$(basename "$category_dir")
            
            # 跳過英文版本和特殊目錄
            if [[ "$category" == "en" || "$category" == "About" ]]; then
                continue
            fi
            
            local featured_count=$(find "$category_dir" -name "*.md" -exec grep -l "featured: true" {} \; 2>/dev/null | wc -l)
            local total_count=$(find "$category_dir" -name "*.md" | wc -l)
            local percentage=0
            
            if [[ $total_count -gt 0 ]]; then
                percentage=$((featured_count * 100 / total_count))
            fi
            
            total_featured=$((total_featured + featured_count))
            total_articles=$((total_articles + total_count))
            
            # 根據比例給出顏色提示
            local color=""
            if [[ $featured_count -eq 0 ]]; then
                color="${RED}"
            elif [[ $featured_count -le 2 ]]; then
                color="${GREEN}"
            elif [[ $featured_count -le 5 ]]; then
                color="${YELLOW}"
            else
                color="${RED}"
            fi
            
            echo -e "${color}📂 $category: $featured_count/$total_count ($percentage%)${NC}"
        fi
    done
    
    echo ""
    echo -e "${BLUE}總計統計：${NC}"
    local overall_percentage=$((total_featured * 100 / total_articles))
    echo -e "📊 Featured 文章: $total_featured/$total_articles ($overall_percentage%)"
    echo ""
    
    echo -e "${YELLOW}建議：${NC}"
    echo "• 建議每個分類保持 1-2 篇 featured 文章"
    echo "• featured 文章應該是該分類最具代表性的內容"
    echo "• 總體 featured 比例建議控制在 5-10%"
    echo ""
    
    if [[ $overall_percentage -gt 15 ]]; then
        echo -e "${RED}⚠️  Featured 文章比例過高 ($overall_percentage%)，建議精簡${NC}"
    elif [[ $overall_percentage -lt 3 ]]; then
        echo -e "${YELLOW}⚠️  Featured 文章比例較低 ($overall_percentage%)，可適當增加${NC}"
    else
        echo -e "${GREEN}✅ Featured 文章比例適中 ($overall_percentage%)${NC}"
    fi
}

# 主程式
main() {
    if [[ $# -eq 0 ]]; then
        usage
        exit 1
    fi
    
    case "$1" in
        "list")
            list_featured
            ;;
        "set")
            if [[ $# -ne 2 ]]; then
                echo -e "${RED}❌ 錯誤：需要指定文章路徑${NC}"
                echo "用法: $0 set <文章路徑>"
                exit 1
            fi
            set_featured "$2"
            ;;
        "unset")
            if [[ $# -ne 2 ]]; then
                echo -e "${RED}❌ 錯誤：需要指定文章路徑${NC}"
                echo "用法: $0 unset <文章路徑>"
                exit 1
            fi
            unset_featured "$2"
            ;;
        "audit")
            audit_featured
            ;;
        *)
            echo -e "${RED}❌ 未知指令: $1${NC}"
            usage
            exit 1
            ;;
    esac
}

# 執行主程式
main "$@"