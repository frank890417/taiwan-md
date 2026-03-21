#!/bin/bash
# Taiwan.md 統一同步腳本
# 功能：knowledge/ SSOT → src/content/ + frontmatter 修復
# 用法：bash scripts/sync.sh

set -e  # 遇到錯誤立即退出

echo "🚀 Taiwan.md 統一同步開始..."
echo "================================================="

# 1. 從 knowledge/ SSOT 同步到 src/content/ 投影層
echo ""
echo "🔄 步驟 1/2: 同步 knowledge/ → src/content/..."

# 建立目錄結構
echo "📁 建立目錄結構..."
mkdir -p src/content/zh-TW/{about,art,culture,economy,food,geography,history,lifestyle,music,nature,people,society,technology,resources}
mkdir -p src/content/en/{about,food,history,nature,society,technology,resources}
mkdir -p src/content/es/{about,art,culture,economy,food,geography,history,lifestyle,music,nature,people,society,technology,resources}

# 統計初始檔案數
KNOWLEDGE_COUNT=$(find knowledge/ -name "*.md" | wc -l)
CONTENT_BEFORE=$(find src/content/ -name "*.md" | wc -l)

echo "📊 knowledge/ 總檔案數: $KNOWLEDGE_COUNT"
echo "📊 同步前 src/content/ 檔案數: $CONTENT_BEFORE"

# 同步根目錄檔案
echo "📄 同步根目錄檔案..."
if [ -f "knowledge/_Home.md" ]; then
    cp "knowledge/_Home.md" "src/content/zh-TW/_Home.md"
    echo "  ✅ _Home.md"
fi

# 同步中文分類目錄
echo "🇹🇼 同步中文分類目錄..."
SYNCED_COUNT=0
for category in About Art Culture Economy Food Geography History Lifestyle Music Nature People Society Technology; do
  if [ -d "knowledge/$category" ]; then
    lowercase_category=$(echo $category | tr '[:upper:]' '[:lower:]')
    for file in knowledge/$category/*.md; do
      if [ -f "$file" ]; then
        filename=$(basename "$file")
        target_file="src/content/zh-TW/$lowercase_category/$filename"
        
        # 總是覆蓋以保持同步（SSOT 為準）
        cp "$file" "$target_file"
        echo "  ✅ $category/$filename"
        ((SYNCED_COUNT++))
      fi
    done
  fi
done

# 同步 resources 目錄（避免重複）
echo "📚 同步 resources 目錄..."
for resource_dir in "knowledge/resources" "knowledge/zh-TW/resources"; do
  if [ -d "$resource_dir" ]; then
    for file in $resource_dir/*.md; do
      if [ -f "$file" ]; then
        filename=$(basename "$file")
        target_file="src/content/zh-TW/resources/$filename"
        cp "$file" "$target_file"
        echo "  ✅ resources/$filename"
        ((SYNCED_COUNT++))
      fi
    done
  fi
done

# 同步英文內容
echo "🇺🇸 同步英文內容..."
if [ -d "knowledge/en" ]; then
  for category in About Food History Nature Society Technology; do
    if [ -d "knowledge/en/$category" ]; then
      lowercase_category=$(echo $category | tr '[:upper:]' '[:lower:]')
      for file in knowledge/en/$category/*.md; do
        if [ -f "$file" ]; then
          filename=$(basename "$file")
          target_file="src/content/en/$lowercase_category/$filename"
          cp "$file" "$target_file"
          echo "  ✅ en/$category/$filename"
          ((SYNCED_COUNT++))
        fi
      done
    fi
  done
  
  # 英文 resources
  if [ -d "knowledge/en/resources" ]; then
    for file in knowledge/en/resources/*.md; do
      if [ -f "$file" ]; then
        filename=$(basename "$file")
        target_file="src/content/en/resources/$filename"
        cp "$file" "$target_file"
        echo "  ✅ en/resources/$filename"
        ((SYNCED_COUNT++))
      fi
    done
  fi
fi

# 同步西班牙文內容
echo "🇪🇸 同步西班牙文內容..."
if [ -d "knowledge/es" ]; then
  for category in About Art Culture Economy Food Geography History Lifestyle Music Nature People Society Technology; do
    if [ -d "knowledge/es/$category" ]; then
      lowercase_category=$(echo $category | tr '[:upper:]' '[:lower:]')
      mkdir -p "src/content/es/$lowercase_category"
      for file in knowledge/es/$category/*.md; do
        if [ -f "$file" ]; then
          filename=$(basename "$file")
          target_file="src/content/es/$lowercase_category/$filename"
          cp "$file" "$target_file"
          echo "  ✅ es/$category/$filename"
          ((SYNCED_COUNT++))
        fi
      done
    fi
  done
fi

# 統計中間結果
CONTENT_AFTER_SYNC=$(find src/content/ -name "*.md" | wc -l)

echo ""
echo "🎉 步驟 1 完成！檔案同步完成"
echo "📊 同步後 src/content/ 檔案數: $CONTENT_AFTER_SYNC"
echo "📊 新增/更新檔案數: $((CONTENT_AFTER_SYNC - CONTENT_BEFORE))"

# 2. 修復 frontmatter
echo ""
echo "🔧 步驟 2/2: 修復 frontmatter..."

# 使用 Python 腳本修復 frontmatter
if [ -f "scripts/fix-all-frontmatter.py" ]; then
    echo "🐍 執行 frontmatter 修復..."
    python3 scripts/fix-all-frontmatter.py
    echo "  ✅ frontmatter 修復完成"
else
    echo "  ⚠️  找不到 fix-all-frontmatter.py，跳過 frontmatter 修復"
fi

# 最終統計
CONTENT_FINAL=$(find src/content/ -name "*.md" | wc -l)

echo ""
echo "🎊 Taiwan.md 統一同步完成！"
echo "================================================="
echo "📊 knowledge/ 來源檔案: $KNOWLEDGE_COUNT"
echo "📊 最終 src/content/ 檔案數: $CONTENT_FINAL"
echo "🔄 處理檔案數: $SYNCED_COUNT"
echo ""
echo "✨ knowledge/ SSOT → src/content/ 投影層完整同步完成"
echo "🔧 frontmatter 格式已統一修復"

# 3. 圖片健康檢查
echo ""
echo "🖼️ 步驟 3: 圖片健康檢查..."
node scripts/check-images.mjs || echo "  ⚠️  有缺失圖片，請執行 npm run check-images 查看細節"

echo ""
echo "▶️  下一步：執行 npm run build 建構網站"