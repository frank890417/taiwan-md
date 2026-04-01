#!/bin/bash
# check-translation-timing.sh — 檢查翻譯檔案的修改時間差
# 用法：bash scripts/utils/check-translation-timing.sh [threshold_hours]
# 預設：顯示超過 24 小時的差異

THRESHOLD="${1:-24}"

echo "=== 翻譯時差統計 ==="
echo "檢查基準：${THRESHOLD} 小時"
echo ""

THRESHOLD_ENV="$THRESHOLD" python3 << 'EOF'
import os
import json
from datetime import datetime

knowledge_dir = 'knowledge'
threshold = float(os.environ.get('THRESHOLD_ENV', 24))

with open(os.path.join(knowledge_dir, '_translations.json')) as f:
    translations = json.load(f)

stale_zh = []
stale_en = []
synced = []

for en_rel, zh_rel in translations.items():
    zh_path = os.path.join(knowledge_dir, zh_rel)
    en_path = os.path.join(knowledge_dir, en_rel)

    if not os.path.exists(zh_path) or not os.path.exists(en_path):
        continue

    zh_mtime = os.path.getmtime(zh_path)
    en_mtime = os.path.getmtime(en_path)
    diff_hours = (zh_mtime - en_mtime) / 3600

    if abs(diff_hours) < 1:
        synced.append((zh_rel, en_rel, 0))
    elif diff_hours > 1:
        stale_zh.append((zh_rel, en_rel, diff_hours))
    else:
        stale_en.append((zh_rel, en_rel, abs(diff_hours)))

print("=== 總計 ===")
print(f"同步：{len(synced)} 篇")
print(f"中文較新：{len(stale_zh)} 篇")
print(f"英文較新：{len(stale_en)} 篇")
print()

if stale_zh:
    print(f"=== 中文較新超過 {threshold} 小時（優先處理） ===")
    thresholded = sorted([x for x in stale_zh if x[2] > threshold], key=lambda x: -x[2])
    if thresholded:
        for zh, en, hours in thresholded[:30]:
            print(f"     {zh} (落後 {hours:.1f}h)")
        if len(thresholded) > 30:
            print(f"... 還有 {len(thresholded) - 30} 篇")
    else:
        print("(無超過設定時差的項目)")

if stale_en:
    print()
    print(f"=== 英文較新超過 {threshold} 小時（中文可能又更新了） ===")
    thresholded = sorted([x for x in stale_en if x[2] > threshold], key=lambda x: -x[2])
    if thresholded:
        for zh, en, hours in thresholded[:30]:
            print(f"     {zh} (英文超前 {hours:.1f}h)")
        if len(thresholded) > 30:
            print(f"... 還有 {len(thresholded) - 30} 篇")
    else:
        print("(無超過設定時差的項目)")
EOF
