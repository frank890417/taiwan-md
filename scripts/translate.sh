#!/bin/bash

# Taiwan.md Translation Contribution Script
# 一行翻譯貢獻自動化系統
# Usage: bash scripts/translate.sh OR bash <(curl -s https://raw.githubusercontent.com/frank890417/taiwan-md/main/scripts/translate.sh)

set -euo pipefail

# Colors for better UX
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Emoji for better visual feedback
INFO="📋"
SUCCESS="✅"
WARNING="⚠️"
ERROR="❌"
ROCKET="🚀"
MAGIC="✨"

# GitHub repo URL
REPO_URL="https://github.com/frank890417/taiwan-md"

# Function to print colored messages
print_info() {
    echo -e "${CYAN}${INFO} $1${NC}"
}

print_success() {
    echo -e "${GREEN}${SUCCESS} $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}${WARNING} $1${NC}"
}

print_error() {
    echo -e "${RED}${ERROR} $1${NC}"
}

print_magic() {
    echo -e "${PURPLE}${MAGIC} $1${NC}"
}

# Function to check if jq is available, fallback to grep/sed if not
parse_json() {
    local json_file="$1"
    local key="$2"
    
    if command -v jq >/dev/null 2>&1; then
        jq -r "keys[]" "$json_file" 2>/dev/null || true
    else
        # Fallback: extract keys using grep and sed
        grep -o '"[^"]*":' "$json_file" | sed 's/"//g' | sed 's/://' | sort
    fi
}

# Function to check if we're in a Taiwan.md repository
check_repo() {
    if [[ -f "knowledge/_translations.json" && -d "knowledge/en" ]]; then
        return 0
    else
        return 1
    fi
}

# Function to clone repository if needed
setup_repo() {
    print_info "檢查 Taiwan.md 環境..."
    
    if check_repo; then
        print_success "已在 Taiwan.md 目錄內"
        return 0
    fi
    
    # Not in the right directory, try to clone
    print_warning "不在 Taiwan.md 目錄內，準備 clone repository..."
    
    # Check if git is available
    if ! command -v git >/dev/null 2>&1; then
        print_error "需要 git 才能繼續。請安裝 git 或手動 clone repository。"
        exit 1
    fi
    
    # Clone to current directory if it's empty, or to a new directory
    if [[ -n "$(ls -A . 2>/dev/null)" ]]; then
        CLONE_DIR="taiwan-md"
        print_info "Clone 到 $CLONE_DIR 目錄..."
        git clone "$REPO_URL" "$CLONE_DIR"
        cd "$CLONE_DIR"
    else
        print_info "Clone 到當前目錄..."
        git clone "$REPO_URL" .
    fi
    
    print_success "Repository 已準備就緒"
}

# Function to get already translated files
get_translated_files() {
    local translations_file="knowledge/_translations.json"
    if [[ -f "$translations_file" ]]; then
        parse_json "$translations_file" | while read -r en_path; do
            echo "${en_path#en/}"
        done
    fi
}

# Function to find all Chinese markdown files
find_chinese_files() {
    find knowledge -name "*.md" -not -path "*/en/*" -not -name "_*" -not -path "*/About/*" | sort
}

# Function to get category priority
get_category_priority() {
    local category="$1"
    case "$category" in
        "Food") echo 1 ;;
        "Culture") echo 2 ;;
        "History") echo 3 ;;
        "Nature") echo 4 ;;
        "Art") echo 5 ;;
        "Technology") echo 6 ;;
        "Economy") echo 7 ;;
        "Society") echo 8 ;;
        "Geography") echo 9 ;;
        "Music") echo 10 ;;
        "Lifestyle") echo 11 ;;
        "People") echo 12 ;;
        *) echo 99 ;;
    esac
}

# Function to find untranslated files
find_untranslated_files() {
    local translated_list=$(mktemp)
    local chinese_files=$(mktemp)
    local untranslated=$(mktemp)
    
    get_translated_files > "$translated_list"
    find_chinese_files > "$chinese_files"
    
    # Compare and find untranslated
    while read -r file; do
        relative_path="${file#knowledge/}"
        if ! grep -Fxq "$relative_path" "$translated_list"; then
            category=$(echo "$relative_path" | cut -d'/' -f1)
            priority=$(get_category_priority "$category")
            echo "$priority|$file"
        fi
    done < "$chinese_files" | sort -n | cut -d'|' -f2 > "$untranslated"
    
    cat "$untranslated"
    
    # Cleanup
    rm -f "$translated_list" "$chinese_files" "$untranslated"
}

# Function to display file list with numbers
display_file_list() {
    local files=("$@")
    local count=1
    
    echo ""
    print_info "待翻譯文章清單："
    echo ""
    
    for file in "${files[@]}"; do
        # Extract category and filename
        relative_path="${file#knowledge/}"
        category=$(echo "$relative_path" | cut -d'/' -f1)
        filename=$(basename "$file" .md)
        
        # Color code by category
        case "$category" in
            "Food") color="$RED" ;;
            "Culture") color="$GREEN" ;;
            "History") color="$YELLOW" ;;
            "Nature") color="$BLUE" ;;
            "Art") color="$PURPLE" ;;
            *) color="$CYAN" ;;
        esac
        
        echo -e "${color}${count}.${NC} ${category}/${filename}"
        ((count++))
    done
    
    echo ""
}

# Function to get user selection
get_user_selection() {
    local max_num="$1"
    local selection
    
    echo -e "${YELLOW}請選擇要翻譯的文章編號（可多選，用空格分隔，例如: 1 3 5）${NC}"
    echo -e "${YELLOW}或直接按 Enter 翻譯前 3 篇：${NC}"
    
    read -r selection
    
    if [[ -z "$selection" ]]; then
        # Default: first 3 files
        if [[ $max_num -ge 3 ]]; then
            echo "1 2 3"
        else
            seq 1 "$max_num" | tr '\n' ' '
        fi
    else
        echo "$selection"
    fi
}

# Function to generate slug from Chinese filename
generate_slug() {
    local filename="$1"
    # Remove .md extension and convert to kebab-case
    # This is a simple version; might need more sophisticated handling
    echo "$filename" | sed 's/\.md$//' | tr '[:upper:]' '[:lower:]' | sed 's/[[:space:][:punct:]]/-/g' | sed 's/--*/-/g' | sed 's/^-\|-$//g'
}

# Function to copy to clipboard (cross-platform)
copy_to_clipboard() {
    local content="$1"
    
    if command -v pbcopy >/dev/null 2>&1; then
        echo "$content" | pbcopy
        return 0
    elif command -v xclip >/dev/null 2>&1; then
        echo "$content" | xclip -selection clipboard
        return 0
    else
        return 1
    fi
}

# Function to read translation prompt template
get_translation_prompt() {
    local article_content="$1"
    local style_content="$2"
    
    # Check if TRANSLATE_PROMPT.md exists
    if [[ -f "docs/prompts/TRANSLATE_PROMPT.md" ]]; then
        # Use existing template and replace placeholder
        sed "s|{ARTICLE_CONTENT}|$article_content|g" docs/prompts/TRANSLATE_PROMPT.md
    else
        # Generate prompt inline (fallback)
        cat << EOF
# Taiwan.md Translation Prompt

> 把這整段貼到 ChatGPT / Claude / Gemini，它會幫你翻譯一篇 Taiwan.md 文章。

## 你的角色
你是 Taiwan.md 的翻譯志工。Taiwan.md 是一個用 Markdown 策展台灣知識的開源專案。
你的任務是把中文文章「重寫」成英文——不是逐字翻譯，而是讓英文母語者讀起來自然流暢。

## 翻譯規範

### 核心原則
- **重寫式翻譯**：讀起來像英文母語者寫的策展文章，不是翻譯腔
- **台灣專有名詞**：保留中文 + 英文解釋（例：夜市 (night market)）
- **文化脈絡**：不熟悉的概念加簡短解釋
- **策展人聲音**：保持有觀點、有溫度的語氣
- **長度**：可比原文稍長（文化解釋需要），但不超過 120%

### 格式要求
- 保留 frontmatter（\`---\` 區塊），翻譯 title 和 description
- 保留所有 emoji（📝 ⚠️ 等），翻譯後面的文字
- 保留所有 URL 參考資料連結
- 保留 Markdown 格式（標題層級、粗體、表格等）

### 禁止事項
- ❌ 不要把台灣描述為中國的一部分
- ❌ 不要用 "aborigines"，用 "Indigenous peoples"
- ❌ 不要用過度正式的學術語氣
- ❌ 不要省略原文中的爭議觀點或挑戰段落

### 英文檔名
- 用 kebab-case（例：\`night-market-culture.md\`）
- 不要用中文拼音

$style_content

## 待翻譯文章

$article_content

## 輸出格式
請直接輸出完整的 Markdown 文件（包含 frontmatter），不要加任何解釋或前言。
EOF
    fi
}

# Function to process translation for a single file
process_translation() {
    local file="$1"
    local index="$2"
    
    print_info "正在處理第 $index 篇：$(basename "$file")"
    
    # Read original article
    local article_content=$(cat "$file")
    
    # Read style guide
    local style_content=""
    if [[ -f "i18n/en/STYLE.md" ]]; then
        style_content=$(cat "i18n/en/STYLE.md")
    fi
    
    # Generate prompt
    local prompt=$(get_translation_prompt "$article_content" "$style_content")
    
    # Try to copy to clipboard
    local prompt_file="/tmp/translate-prompt-$index.txt"
    echo "$prompt" > "$prompt_file"
    
    if copy_to_clipboard "$prompt"; then
        print_success "📋 Prompt 已複製到剪貼簿！"
    else
        print_warning "無法複製到剪貼簿，Prompt 已儲存到：$prompt_file"
    fi
    
    echo ""
    echo -e "${YELLOW}請將 Prompt 貼到 ChatGPT/Claude/Gemini，然後把翻譯結果貼回來。${NC}"
    echo -e "${YELLOW}你可以：${NC}"
    echo -e "${YELLOW}1. 直接貼上翻譯內容${NC}"
    echo -e "${YELLOW}2. 輸入檔案路徑（例如：/tmp/translation.md）${NC}"
    echo -e "${YELLOW}3. 輸入 'skip' 跳過這篇${NC}"
    echo ""
    
    # Get translation from user
    print_info "請貼上翻譯結果："
    
    local translation=""
    local input_line
    
    # Check if input is a file path
    read -r input_line
    
    if [[ "$input_line" == "skip" ]]; then
        print_warning "跳過這篇文章"
        return 0
    elif [[ -f "$input_line" ]]; then
        translation=$(cat "$input_line")
        print_success "從檔案讀取翻譯內容"
    else
        # Read multi-line input
        translation="$input_line"
        echo -e "${CYAN}繼續貼上內容，完成後按 Ctrl+D：${NC}"
        while IFS= read -r line; do
            translation="${translation}${line}"$'\n'
        done
    fi
    
    if [[ -z "$translation" ]]; then
        print_warning "沒有收到翻譯內容，跳過這篇"
        return 0
    fi
    
    # Determine English file path
    local relative_path="${file#knowledge/}"
    local category=$(echo "$relative_path" | cut -d'/' -f1)
    local filename=$(basename "$file" .md)
    local slug=$(generate_slug "$filename")
    local en_path="knowledge/en/$category/$slug.md"
    
    # Create directory if needed
    mkdir -p "$(dirname "$en_path")"
    
    # Write translation
    echo "$translation" > "$en_path"
    print_success "翻譯已儲存到：$en_path"
    
    # Update translations.json
    update_translations_json "en/$category/$slug.md" "$relative_path"
    
    echo ""
}

# Function to update translations.json
update_translations_json() {
    local en_path="$1"
    local zh_path="$2"
    local translations_file="knowledge/_translations.json"
    
    # Create backup
    cp "$translations_file" "${translations_file}.bak"
    
    if command -v jq >/dev/null 2>&1; then
        # Use jq for proper JSON manipulation
        jq --arg en "$en_path" --arg zh "$zh_path" '. + {($en): $zh}' "$translations_file" > "${translations_file}.tmp" && mv "${translations_file}.tmp" "$translations_file"
    else
        # Fallback: manual JSON editing (basic)
        # Remove the last } and add the new entry
        local temp_file=$(mktemp)
        sed '$d' "$translations_file" > "$temp_file"
        echo "  \"$en_path\": \"$zh_path\"," >> "$temp_file"
        echo "}" >> "$temp_file"
        mv "$temp_file" "$translations_file"
        
        # Fix potential comma issues
        sed -i.bak 's/,}/}/' "$translations_file" && rm -f "${translations_file}.bak"
    fi
    
    print_success "更新翻譯記錄"
}

# Function to create git branch and commit
create_git_branch_and_commit() {
    local translated_count="$1"
    local categories="$2"
    
    # Check if git is available
    if ! command -v git >/dev/null 2>&1; then
        print_warning "Git 未安裝，跳過自動 commit"
        return 0
    fi
    
    # Create branch
    local date=$(date +%Y%m%d)
    local branch_name="translate/${date}-en"
    
    print_info "建立 Git branch: $branch_name"
    git checkout -b "$branch_name" 2>/dev/null || git checkout "$branch_name" 2>/dev/null || true
    
    # Add files
    git add knowledge/en/ knowledge/_translations.json
    
    # Commit
    local commit_message="feat(en): translate $translated_count articles — [$categories]"
    git commit -m "$commit_message"
    
    print_success "已建立 commit: $commit_message"
    
    # Ask if user wants to push and create PR
    echo ""
    print_info "是否要自動推送並建立 Pull Request？(y/N)"
    read -r push_answer
    
    if [[ "$push_answer" =~ ^[Yy]$ ]]; then
        # Check if gh CLI is available
        if command -v gh >/dev/null 2>&1; then
            print_info "推送分支並建立 PR..."
            git push origin "$branch_name"
            
            local pr_title="🌐 Translate $translated_count articles to English"
            local pr_body="Automated translation contribution via translate.sh script.

Categories: $categories
Files translated: $translated_count

Created by Taiwan.md Translation Automation System."
            
            gh pr create --title "$pr_title" --body "$pr_body" --head "$branch_name" --base "main"
            print_success "🎉 Pull Request 已建立！"
        else
            print_warning "GitHub CLI (gh) 未安裝"
            git push origin "$branch_name"
            print_info "分支已推送，請手動到 GitHub 建立 Pull Request："
            echo -e "${BLUE}$REPO_URL/compare/$branch_name${NC}"
        fi
    else
        print_info "分支已準備就緒，你可以稍後推送："
        echo -e "${BLUE}git push origin $branch_name${NC}"
    fi
}

# Main function
main() {
    echo ""
    echo -e "${PURPLE}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${NC}"
    echo -e "${PURPLE}${MAGIC}                                                           ${MAGIC}${NC}"
    echo -e "${PURPLE}${MAGIC}     🇹🇼 Taiwan.md 翻譯貢獻自動化系統 🌐                   ${MAGIC}${NC}"
    echo -e "${PURPLE}${MAGIC}                                                           ${MAGIC}${NC}"
    echo -e "${PURPLE}${MAGIC}     讓你的 AI Token 幫台灣被世界看見！                     ${MAGIC}${NC}"
    echo -e "${PURPLE}${MAGIC}                                                           ${MAGIC}${NC}"
    echo -e "${PURPLE}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${MAGIC}${NC}"
    echo ""
    
    # Setup repository
    setup_repo
    
    # Find untranslated files
    print_info "掃描待翻譯文章..."
    
    local untranslated_files=()
    while IFS= read -r line; do
        [[ -n "$line" ]] && untranslated_files+=("$line")
    done < <(find_untranslated_files)
    
    local total_count=${#untranslated_files[@]}
    
    if [[ $total_count -eq 0 ]]; then
        print_success "🎉 所有文章都已翻譯完成！"
        exit 0
    fi
    
    print_success "找到 $total_count 篇待翻譯文章"
    
    # Display file list
    display_file_list "${untranslated_files[@]}"
    
    # Get user selection
    local max_display=$(( total_count > 10 ? 10 : total_count ))
    local display_files=("${untranslated_files[@]:0:$max_display}")
    
    echo -e "${CYAN}顯示前 $max_display 篇，共 $total_count 篇待翻譯${NC}"
    echo ""
    
    local selection=$(get_user_selection $max_display)
    
    # Process selected files
    local processed_count=0
    local categories=""
    
    for num in $selection; do
        if [[ $num -gt 0 && $num -le $max_display ]]; then
            local file_index=$((num - 1))
            local file="${display_files[$file_index]}"
            
            process_translation "$file" "$num"
            
            # Track categories
            local category=$(echo "${file#knowledge/}" | cut -d'/' -f1)
            if [[ ! "$categories" =~ $category ]]; then
                categories="${categories}${category} "
            fi
            
            ((processed_count++))
        fi
    done
    
    categories=$(echo "$categories" | xargs) # trim whitespace
    
    if [[ $processed_count -gt 0 ]]; then
        print_success "🎉 完成 $processed_count 篇文章翻譯！"
        
        # Create git branch and commit
        create_git_branch_and_commit "$processed_count" "$categories"
        
        echo ""
        print_magic "感謝你為 Taiwan.md 貢獻翻譯！🙏"
        print_info "更多資訊請見：$REPO_URL"
    else
        print_warning "沒有處理任何文章"
    fi
}

# Run main function
main "$@"