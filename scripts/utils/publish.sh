#!/bin/bash
# Taiwan.md 一鍵發布腳本
# SSOT (knowledge/) → sync → fix frontmatter → build → push
#
# Usage: bash scripts/publish.sh [commit message]
# Example: bash scripts/publish.sh "feat: new articles about food culture"

set -e
cd "$(dirname "$0")/.."

MSG="${1:-content: update from SSOT}"

echo "🇹🇼 Taiwan.md 發布流程"
echo "================================================="

# Step 1: Sync knowledge/ → src/content/
echo ""
echo "📂 Step 1/5: 同步 knowledge/ → src/content/"
if [ -f scripts/sync.sh ]; then
  bash scripts/sync.sh
elif [ -f scripts/sync-knowledge.sh ]; then
  bash scripts/sync-knowledge.sh
else
  echo "⚠️  找不到同步腳本，手動同步..."
  # Fallback: simple rsync
  rsync -av --delete \
    --exclude '_*Hub*' \
    knowledge/ src/content/ 2>/dev/null || true
fi

# Step 2: Fix frontmatter
echo ""
echo "🔧 Step 2/5: 修復 frontmatter"
if [ -f scripts/fix-all-frontmatter.py ]; then
  python3 scripts/fix-all-frontmatter.py 2>/dev/null || echo "  ⚠️ frontmatter 修復跳過"
fi

# Step 3: Count articles
echo ""
echo "📊 Step 3/5: 統計文章數"
ZH_COUNT=$(find knowledge -name "*.md" ! -name "_*" ! -path "*/en/*" ! -path "*/About/*" 2>/dev/null | wc -l | tr -d ' ')
EN_COUNT=$(find knowledge/en -name "*.md" ! -name "_*" 2>/dev/null | wc -l | tr -d ' ')
HUB_COUNT=$(find knowledge -name "_*Hub*" 2>/dev/null | wc -l | tr -d ' ')
echo "  🇹🇼 中文文章: $ZH_COUNT"
echo "  🇺🇸 英文文章: $EN_COUNT"
echo "  📂 Hub 頁面: $HUB_COUNT"
echo "  📄 總計: $((ZH_COUNT + EN_COUNT + HUB_COUNT))"

# Step 4: Build
echo ""
echo "🏗️  Step 4/5: 建置網站"
BUILD_OUTPUT=$(npm run build 2>&1)
PAGE_COUNT=$(echo "$BUILD_OUTPUT" | grep "page(s) built" | grep -o '[0-9]* page' | grep -o '[0-9]*')
echo "  ✅ $PAGE_COUNT pages built"

# Step 5: Git commit & push
echo ""
echo "🚀 Step 5/5: Git commit & push"
git add -A
if git diff --cached --quiet; then
  echo "  ℹ️  沒有變更，跳過 commit"
else
  git commit -m "$MSG"
  git push
  echo "  ✅ 已推送到 GitHub"
fi

echo ""
echo "================================================="
echo "🎉 發布完成！"
echo "  🌐 https://taiwan.md"
echo "  📊 $PAGE_COUNT pages | $ZH_COUNT zh + $EN_COUNT en articles"
echo "================================================="
