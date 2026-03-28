#!/bin/bash
# check-translation-sync.sh — 偵測中文更新後英文未同步的文章
# 用法: bash scripts/check-translation-sync.sh [hours]
# 預設: 24 小時內修改的文章

HOURS="${1:-24}"

echo "🔍 偵測翻譯同步狀態（最近 ${HOURS} 小時）..."
echo ""

# 找最近修改的中文文章
CHANGED_ZH=$(git log --since="${HOURS} hours ago" --name-only --pretty=format: -- 'knowledge/**/*.md' ':!knowledge/en/**' ':!knowledge/**/_*' | sort -u | grep -v '^$')

if [ -z "$CHANGED_ZH" ]; then
    echo "✅ 沒有最近修改的中文文章"
    exit 0
fi

STALE=0
MISSING=0
SYNCED=0

for zh in $CHANGED_ZH; do
    # 從 _translations.json 找對應英文版
    en=$(python3 -c "
import json
with open('knowledge/_translations.json') as f:
    d = json.load(f)
print(d.get('$zh', ''))
" 2>/dev/null)
    
    if [ -z "$en" ]; then
        echo "  ⚠️  $zh — 不在 translations.json"
        MISSING=$((MISSING + 1))
        continue
    fi
    
    if [ ! -f "$en" ]; then
        echo "  ❌ $zh — 英文版不存在"
        MISSING=$((MISSING + 1))
        continue
    fi
    
    # 比較 git commit 時間
    zh_ts=$(git log -1 --format=%ct -- "$zh" 2>/dev/null)
    en_ts=$(git log -1 --format=%ct -- "$en" 2>/dev/null)
    
    if [ -n "$zh_ts" ] && [ -n "$en_ts" ] && [ "$zh_ts" -gt "$((en_ts + 300))" ]; then
        diff_hrs=$(( (zh_ts - en_ts) / 3600 ))
        echo "  🔄 $zh — 英文版落後 ${diff_hrs}h"
        STALE=$((STALE + 1))
    else
        SYNCED=$((SYNCED + 1))
    fi
done

echo ""
echo "📊 ${STALE} 需同步 | ${MISSING} 缺英文版 | ${SYNCED} 已同步"

if [ "$STALE" -gt 0 ] || [ "$MISSING" -gt 0 ]; then
    exit 1
fi
exit 0
