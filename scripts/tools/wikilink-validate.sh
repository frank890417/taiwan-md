#!/bin/bash
# wikilink-validate.sh — 驗證 [[wikilink]] 目標是否存在
#
# 檢查所有 [[X]] 和 [[X|Y]] 格式的 wikilink，驗證目標文章是否真的存在。
# 用於防止「憑直覺寫 wikilink 結果全壞」的系統性問題。
#
# 使用方式：
#   bash scripts/tools/wikilink-validate.sh                    # 掃全站
#   bash scripts/tools/wikilink-validate.sh <file.md>          # 單檔
#   bash scripts/tools/wikilink-validate.sh --json             # JSON 輸出
#   bash scripts/tools/wikilink-validate.sh --fix-suggestions  # 顯示修正建議

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
GRAY='\033[0;90m'
NC='\033[0m'

JSON_MODE=false
SUGGEST_MODE=false
TARGET_FILE=""

for arg in "$@"; do
    case "$arg" in
        --json) JSON_MODE=true ;;
        --fix-suggestions) SUGGEST_MODE=true ;;
        *.md) TARGET_FILE="$arg" ;;
    esac
done

# 建立存在的文章清單（slug = 檔名 without .md）
declare -a EXISTING_SLUGS
while IFS= read -r f; do
    slug=$(basename "$f" .md)
    EXISTING_SLUGS+=("$slug")
done < <(find knowledge/ -maxdepth 2 -name "*.md" -type f \
    ! -name "_*" \
    ! -path "*/en/*" ! -path "*/es/*" ! -path "*/ja/*" \
    ! -path "*/resources/*")

# 檢查 slug 是否存在（精確比對）
slug_exists() {
    local target="$1"
    for s in "${EXISTING_SLUGS[@]}"; do
        [[ "$s" == "$target" ]] && return 0
    done
    return 1
}

# 找相近 slug（建議修正用）
find_similar() {
    local target="$1"
    local matches=""
    for s in "${EXISTING_SLUGS[@]}"; do
        if [[ "$s" == *"$target"* ]] || [[ "$target" == *"$s"* ]]; then
            matches="${matches}${s} "
        fi
    done
    echo "${matches% }"
}

# 掃描單一檔案
scan_file() {
    local file="$1"
    local broken=0

    # 提取所有 [[X]] 或 [[X|Y]] 的 X 部分
    # 排除 code block 內的
    while IFS= read -r line; do
        # 處理該行所有 wikilink
        echo "$line" | grep -o '\[\[[^]]*\]\]' | while IFS= read -r link; do
            # 移除 [[ ]] 並取 | 前的部分
            target=$(echo "$link" | sed 's/\[\[//;s/\]\]//' | cut -d'|' -f1)

            if ! slug_exists "$target"; then
                if [ "$JSON_MODE" = true ]; then
                    echo "{\"file\":\"$file\",\"link\":\"$link\",\"target\":\"$target\"}"
                else
                    echo -e "${RED}  ❌ [[${target}]]${NC} ${GRAY}in $link${NC}"
                    if [ "$SUGGEST_MODE" = true ]; then
                        similar=$(find_similar "$target")
                        if [ -n "$similar" ]; then
                            echo -e "${YELLOW}     💡 可能是: $similar${NC}"
                        fi
                    fi
                fi
                echo "broken"
            fi
        done
    done < <(grep -v '^```' "$file" | grep '\[\[')

    return $broken
}

# 主邏輯
total_files=0
total_broken=0
files_with_broken=0

FILES=()
if [ -n "$TARGET_FILE" ]; then
    FILES=("$TARGET_FILE")
else
    while IFS= read -r f; do
        FILES+=("$f")
    done < <(find knowledge/ -maxdepth 2 -name "*.md" -type f \
        ! -name "_*" \
        ! -path "*/en/*" ! -path "*/es/*" ! -path "*/ja/*" \
        ! -path "*/resources/*")
fi

[ "$JSON_MODE" = true ] && echo '['
first=true

for file in "${FILES[@]}"; do
    [ ! -f "$file" ] && continue
    total_files=$((total_files + 1))

    # 先計算 broken 數
    broken_count=$(grep -v '^```' "$file" 2>/dev/null | grep -o '\[\[[^]]*\]\]' | while IFS= read -r link; do
        target=$(echo "$link" | sed 's/\[\[//;s/\]\]//' | cut -d'|' -f1)
        if ! slug_exists "$target"; then
            echo "1"
        fi
    done | wc -l | tr -d ' ')

    if [ "$broken_count" -gt 0 ]; then
        files_with_broken=$((files_with_broken + 1))
        total_broken=$((total_broken + broken_count))

        if [ "$JSON_MODE" = false ]; then
            echo -e "${YELLOW}⚠️  $file${NC} ${GRAY}($broken_count 斷裂)${NC}"
        fi

        # 顯示每個斷裂的 wikilink
        grep -v '^```' "$file" 2>/dev/null | grep -o '\[\[[^]]*\]\]' | sort -u | while IFS= read -r link; do
            target=$(echo "$link" | sed 's/\[\[//;s/\]\]//' | cut -d'|' -f1)
            if ! slug_exists "$target"; then
                if [ "$JSON_MODE" = true ]; then
                    [ "$first" = true ] && first=false || echo ","
                    echo "{\"file\":\"$file\",\"link\":\"$link\",\"target\":\"$target\"}"
                else
                    echo -e "${RED}  ❌ [[${target}]]${NC}"
                    if [ "$SUGGEST_MODE" = true ]; then
                        similar=$(find_similar "$target")
                        if [ -n "$similar" ]; then
                            echo -e "${YELLOW}     💡 可能是: ${similar}${NC}"
                        fi
                    fi
                fi
            fi
        done
    fi
done

[ "$JSON_MODE" = true ] && echo ']'

if [ "$JSON_MODE" = false ]; then
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "📊 wikilink 驗證完成"
    echo "   掃描: $total_files 篇"
    if [ "$total_broken" -eq 0 ]; then
        echo -e "   ${GREEN}✅ 全部 wikilink 目標都存在${NC}"
    else
        echo -e "   ${RED}❌ $total_broken 個斷裂 wikilink（散佈在 $files_with_broken 篇）${NC}"
        echo ""
        echo "修正方式："
        echo "  1. 指向現有文章 → 改為 [[現有文章名|顯示文字]]"
        echo "  2. 真的需要新建 → 加入 rewrite queue"
        echo ""
        echo "加 --fix-suggestions 可顯示相似文章建議"
    fi
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
fi

exit 0
