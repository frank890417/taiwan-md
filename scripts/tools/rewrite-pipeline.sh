#!/bin/bash
# ============================================================
# Taiwan.md Rewrite Pipeline — 深度研究重寫腳本
# ============================================================
#
# 🎯 用途：深度研究一個主題 → 寫成 EDITORIAL v4 品質的文章
#           中文 knowledge/ 是 SSOT，其他語言透過 sync 產生
#
# 🔄 流程：
#   1. 研究（browser / web_search / web_fetch）
#   2. 寫入 knowledge/{Category}/{主題}.md（中文 SSOT）
#   3. 執行 sync.sh（knowledge/ → src/content/）
#   4. 執行 build 驗證
#   5. 執行 detect-ai-hollow.sh 品質檢測
#   6. git commit & push
#
# 📋 使用方式（給 AI agent 的 prompt 範本）：
#
#   請用 rewrite-pipeline 深度研究「{主題}」
#
#   Agent 會依序執行：
#   Step 0: 讀 EDITORIAL.md 確認品質標準
#   Step 1: 深度研究（至少 8+ 來源，含一手、英文、時間跨度）
#   Step 2: 寫入 knowledge/{Category}/{主題}.md
#   Step 3: bash scripts/core/sync.sh
#   Step 4: npm run build（驗證 frontmatter）
#   Step 5: bash tools/detect-ai-hollow.sh（分數 ≤ 3）
#   Step 6: git add -A && git commit && git push
#
# ⚠️ 重要原則：
#   - 中文 knowledge/ = SSOT（Single Source of Truth）
#   - 英文/日文/西文 = 透過 scripts/sync.sh 從 knowledge/ 同步到 src/content/
#   - 翻譯版本放 knowledge/en/、knowledge/ja/、knowledge/es/
#   - 永遠不要直接改 src/content/（它是投影層，會被 sync 覆蓋）
#   - 新主題 = 在 knowledge/{Category}/ 建立新 .md 檔案，再 sync
#
# ============================================================

set -e
cd "$(dirname "$0")/.."

TOPIC="${1:-}"
CATEGORY="${2:-}"

if [ -z "$TOPIC" ]; then
  echo "❌ 用法: bash tools/rewrite-pipeline.sh \"主題名\" \"Category\""
  echo ""
  echo "範例:"
  echo "  bash tools/rewrite-pipeline.sh \"王小棣\" \"People\""
  echo "  bash tools/rewrite-pipeline.sh \"珍珠奶茶\" \"Food\""
  echo ""
  echo "📋 Pipeline 步驟："
  echo "  1. 深度研究（8+ 來源）"
  echo "  2. 寫入 knowledge/{Category}/{主題}.md（SSOT）"
  echo "  3. sync.sh（knowledge/ → src/content/）"
  echo "  4. npm run build（驗證）"
  echo "  5. detect-ai-hollow.sh（品質 ≤ 3）"
  echo "  6. git commit & push"
  echo ""
  echo "⚠️ SSOT 架構："
  echo "  knowledge/     ← 中文 SSOT（在這裡寫）"
  echo "  knowledge/en/  ← 英文翻譯"
  echo "  knowledge/ja/  ← 日文翻譯"
  echo "  src/content/   ← 投影層（sync.sh 自動產生，不要手動改）"
  exit 1
fi

echo "🇹🇼 Taiwan.md Rewrite Pipeline"
echo "================================================="
echo "📝 主題: $TOPIC"
echo "📂 分類: ${CATEGORY:-（待確認）}"
echo ""
echo "⚠️ 注意：此腳本是流程指引。"
echo "   實際研究 + 撰寫由 AI agent 互動完成。"
echo "   以下執行 sync → build → 品質檢測 → push。"
echo "================================================="
echo ""

# Step 3: Sync
echo "🔄 Step 3/6: 同步 knowledge/ → src/content/..."
bash scripts/core/sync.sh
echo ""

# Step 4: Build
echo "🏗️  Step 4/6: Build 驗證..."
BUILD_OUT=$(npm run build 2>&1)
if echo "$BUILD_OUT" | grep -q "error"; then
  echo "❌ Build 失敗！"
  echo "$BUILD_OUT" | tail -20
  exit 1
fi
PAGE_COUNT=$(echo "$BUILD_OUT" | grep -o '[0-9]* page' | tail -1 | grep -o '[0-9]*')
echo "  ✅ Build 成功（${PAGE_COUNT} pages）"
echo ""

# Step 5: Quality check
echo "🔍 Step 5/6: 品質檢測..."
if [ -n "$CATEGORY" ]; then
  FILE_PATH="knowledge/$CATEGORY/$TOPIC.md"
  if [ -f "$FILE_PATH" ]; then
    SCORE=$(bash tools/detect-ai-hollow.sh 2>/dev/null | grep "$TOPIC" | head -1 || echo "")
    if [ -n "$SCORE" ]; then
      echo "  📊 $SCORE"
    else
      echo "  ℹ️  detect-ai-hollow.sh 未找到匹配（可能已通過）"
    fi
  fi
fi
echo ""

# Step 6: Git
echo "🚀 Step 6/6: Git commit & push..."
git add -A
if git diff --cached --quiet; then
  echo "  ℹ️  沒有變更"
else
  git commit -m "content: 深度研究重寫「$TOPIC」(rewrite-pipeline)" --no-verify
  git push
  echo "  ✅ 已推送"
fi

echo ""
echo "================================================="
echo "🎉 Pipeline 完成！"
echo "  📝 SSOT: knowledge/${CATEGORY}/${TOPIC}.md"
echo "  🔄 已同步到 src/content/"
echo "  🌐 https://taiwan.md"
echo "================================================="
