#!/bin/bash
# check-translation-sync.sh — 完整的翻譯同步檢查
# 用法：bash scripts/utils/check-translation-sync.sh [threshold_hours]
# 檢查項目：
#   1. translations.json 映射狀態
#   2. 檔案修改時間差（mtime）
#   3. Git 提交時間差

THRESHOLD="${1:-24}"

echo "=============================================="
echo "=== 翻譯同步檢查 (${THRESHOLD} 小時基準) ==="
echo "=============================================="
echo ""

# 1. 檢查 translations.json
echo "【1】translations.json 映射狀態"
echo "----------------------------------------------"

python3 << 'EOF'
import os
import json

knowledge_dir = 'knowledge'

with open(os.path.join(knowledge_dir, '_translations.json')) as f:
    translations = json.load(f)

missing = 0
valid = 0

for en_rel, zh_rel in translations.items():
    zh_path = os.path.join(knowledge_dir, zh_rel)
    en_path = os.path.join(knowledge_dir, en_rel)

    if not os.path.exists(zh_path) or not os.path.exists(en_path):
        print(f"   ❌ {zh_rel} ↔ {en_rel} (檔案缺失)")
        missing += 1
    else:
        valid += 1

print(f"\n總計：{valid} 篇有效 | {missing} 篇缺失")
EOF

echo ""
echo "【2】檔案修改時間差（mtime）"
echo "----------------------------------------------"

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

print(f"同步：{len(synced)} 篇")
print(f"中文較新：{len(stale_zh)} 篇")
print(f"英文較新：{len(stale_en)} 篇")
print()

if stale_zh:
    print(f"中文較新超過 {threshold} 小時（優先處理）:")
    thresholded = sorted([x for x in stale_zh if x[2] > threshold], key=lambda x: -x[2])
    if thresholded:
        for zh, en, hours in thresholded[:20]:
            print(f"   🔄 {zh} (落後 {hours:.1f}h)")
        if len(thresholded) > 20:
            print(f"   ... 還有 {len(thresholded) - 20} 篇")

if stale_en:
    print()
    print(f"英文較新超過 {threshold} 小時（中文可能又更新了）:")
    thresholded = sorted([x for x in stale_en if x[2] > threshold], key=lambda x: -x[2])
    if thresholded:
        for zh, en, hours in thresholded[:20]:
            print(f"   ⚠️   {zh} (英文超前 {hours:.1f}h)")
        if len(thresholded) > 20:
            print(f"   ... 還有 {len(thresholded) - 20} 篇")
EOF

echo ""
echo "【3】Git 提交時間差"
echo "----------------------------------------------"

python3 << 'EOF'
import os
import json
import subprocess

knowledge_dir = 'knowledge'

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

    zh_result = subprocess.run(['git', 'log', '-1', '--format=%ct', '--', zh_path], capture_output=True, text=True)
    en_result = subprocess.run(['git', 'log', '-1', '--format=%ct', '--', en_path], capture_output=True, text=True)

    if zh_result.returncode != 0 or en_result.returncode != 0:
        continue

    zh_ts = int(zh_result.stdout.strip())
    en_ts = int(en_result.stdout.strip())
    diff_hours = (zh_ts - en_ts) / 3600

    if abs(diff_hours) < 1:
        synced.append((zh_rel, en_rel, 0))
    elif diff_hours > 1:
        stale_zh.append((zh_rel, en_rel, diff_hours))
    else:
        stale_en.append((zh_rel, en_rel, abs(diff_hours)))

print(f"Git 同步：{len(synced)} 篇")
print(f"中文較新：{len(stale_zh)} 篇")
print(f"英文較新：{len(stale_en)} 篇")
print()

if stale_zh:
    print("中文 Git 較新超過 24 小時:")
    thresholded = sorted([x for x in stale_zh if x[2] > 24], key=lambda x: -x[2])
    if thresholded:
        for zh, en, hours in thresholded[:20]:
            print(f"   🔄 {zh} (落後 {hours:.1f}h)")
        if len(thresholded) > 20:
            print(f"   ... 還有 {len(thresholded) - 20} 篇")

if stale_en:
    print()
    print("英文 Git 較新超過 24 小時:")
    thresholded = sorted([x for x in stale_en if x[2] > 24], key=lambda x: -x[2])
    if thresholded:
        for zh, en, hours in thresholded[:20]:
            print(f"   ⚠️   {zh} (英文超前 {hours:.1f}h)")
        if len(thresholded) > 20:
            print(f"   ... 還有 {len(thresholded) - 20} 篇")
EOF

echo ""
echo "=============================================="
echo "=== 總結 ==="
echo "=============================================="
echo "建議優先處理：中文較新的文章（更新英文翻譯）"
echo "次要注意：英文較新的文章（確認中文是否已更新）"
