#!/bin/bash
# generate-translation-issues.sh — 產出需要翻譯/更新的文章清單
# 用法: bash scripts/generate-translation-issues.sh
# 輸出: TRANSLATION-STATUS.md（社群可認領的翻譯任務）

cd "$(dirname "$0")/.." || exit 1

echo "🔍 掃描翻譯狀態..."

# 計算中文文章
ZH_COUNT=$(find knowledge/ -name "*.md" -not -path "*/en/*" -not -path "*/es/*" -not -path "*/ja/*" -not -name "_*" -not -name "PEOPLE-ROADMAP.md" | wc -l | tr -d ' ')

# 計算各語言
EN_COUNT=$(find knowledge/en/ -name "*.md" -not -name "_*" 2>/dev/null | wc -l | tr -d ' ')
ES_COUNT=$(find knowledge/es/ -name "*.md" -not -name "_*" 2>/dev/null | wc -l | tr -d ' ')
JA_COUNT=$(find knowledge/ja/ -name "*.md" -not -name "_*" 2>/dev/null | wc -l | tr -d ' ')

echo ""
echo "📊 翻譯完成度："
echo "  中文: $ZH_COUNT 篇 (SSOT)"
echo "  英文: $EN_COUNT / $ZH_COUNT ($(( EN_COUNT * 100 / ZH_COUNT ))%)"
echo "  西班牙文: $ES_COUNT / $ZH_COUNT ($(( ES_COUNT * 100 / ZH_COUNT ))%)"
echo "  日文: $JA_COUNT / $ZH_COUNT ($(( JA_COUNT * 100 / ZH_COUNT ))%)"

# 找出缺英文版的文章
echo ""
echo "=== 缺英文版的文章 ==="

python3 << 'PYEOF'
import os, json

with open('knowledge/_translations.json') as f:
    trans = json.load(f)

# 所有中文文章
zh_files = []
for root, dirs, files in os.walk('knowledge/'):
    if '/en/' in root or '/es/' in root or '/ja/' in root:
        continue
    for f in files:
        if f.endswith('.md') and not f.startswith('_') and f != 'PEOPLE-ROADMAP.md':
            zh_files.append(os.path.join(root, f))

# 找出有映射但英文不存在，或無映射的
missing_en = []
for zh in sorted(zh_files):
    en = trans.get(zh, '')
    if not en or not os.path.exists(en):
        cat = zh.split('/')[1] if len(zh.split('/')) > 2 else 'Other'
        title = os.path.splitext(os.path.basename(zh))[0]
        missing_en.append((cat, title, zh))

# 按分類分組輸出
from collections import defaultdict
by_cat = defaultdict(list)
for cat, title, path in missing_en:
    by_cat[cat].append((title, path))

for cat in sorted(by_cat.keys()):
    items = by_cat[cat]
    print(f"\n### {cat} ({len(items)} 篇)")
    for title, path in items[:10]:
        print(f"- [ ] {title}")
    if len(items) > 10:
        print(f"- ... 還有 {len(items)-10} 篇")

print(f"\n**總計 {len(missing_en)} 篇缺英文版**")
PYEOF
