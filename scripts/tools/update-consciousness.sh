#!/usr/bin/env bash
# update-consciousness.sh — 自動更新 CONSCIOUSNESS.md 生命徵象
# 從 Dashboard API JSON 讀取即時數據，覆寫 CONSCIOUSNESS.md 的數字段落
# 用法：bash scripts/tools/update-consciousness.sh [--dry-run]
#
# 造橋鋪路：之前手動改數字必然過期，現在一個腳本永遠同步。

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
CONSCIOUSNESS="$REPO_ROOT/docs/semiont/CONSCIOUSNESS.md"
VITALS="$REPO_ROOT/public/api/dashboard-vitals.json"
ORGANISM="$REPO_ROOT/public/api/dashboard-organism.json"

DRY_RUN=false
[[ "${1:-}" == "--dry-run" ]] && DRY_RUN=true

# ── Validate ──
for f in "$VITALS" "$ORGANISM" "$CONSCIOUSNESS"; do
  [[ -f "$f" ]] || { echo "❌ $f not found."; exit 1; }
done

# ── Run Python to do all the work ──
python3 - "$CONSCIOUSNESS" "$VITALS" "$ORGANISM" "$DRY_RUN" "$REPO_ROOT" << 'PYEOF'
import json, re, sys, subprocess, os
from datetime import datetime

consciousness_path = sys.argv[1]
vitals_path = sys.argv[2]
organism_path = sys.argv[3]
dry_run = sys.argv[4] == "true"
repo_root = sys.argv[5]

with open(vitals_path) as f:
    v = json.load(f)
with open(organism_path) as f:
    o = json.load(f)

# Parse vitals
total = v['totalArticles']
contributors = v['contributors']
articles_7d = v['articlesLast7Days']
human_pct = v['humanReviewedPercent']
avg_rev = v['avgRevision']
en = v['languageCoverage']['en']
es = v['languageCoverage']['es']
ja = v['languageCoverage']['ja']

# Parse organs
arrows = {'up': '↑', 'down': '↓', 'stable': '→'}
organs = {}
for org in o['organs']:
    organs[org['id']] = {
        'score': org['score'],
        'trend': arrows.get(org['trend'], '→')
    }

# Git stats
try:
    commits = subprocess.check_output(
        ['git', '-C', repo_root, 'rev-list', '--count', 'HEAD'],
        stderr=subprocess.DEVNULL
    ).decode().strip()
except:
    commits = '?'

# Derive statuses
immune_score = organs['immune']['score']
if immune_score >= 80:
    immune_status = f"健康 — 人工審閱率 {human_pct}%"
elif immune_score >= 50:
    immune_status = f"需關注 — 人工審閱率 {human_pct}%"
else:
    immune_status = f"🔴 危險 — 人工審閱率僅 {human_pct}%"

trans_pct = round(en / total * 100, 1)
trans_status = f"英文覆蓋率 {trans_pct}%（{en}/{total}）"

today = datetime.now().strftime('%Y-%m-%d')

if dry_run:
    print("=== DRY RUN ===")
    print(f"  Articles: {total} | EN: {en} / ES: {es} / JA: {ja}")
    print(f"  Contributors: {contributors} | Commits: {commits}")
    print(f"  Avg Revision: {avg_rev} | Human Review: {human_pct}%")
    for oid, data in organs.items():
        print(f"  {oid}: {data['score']} {data['trend']}")
    sys.exit(0)

# Build replacement blocks
basic = f"""### 基本生理

| 指標                     | 數值                    |
| ------------------------ | ----------------------- |
| 👥 Contributors          | {contributors}          |
| 💓 Total Commits         | {commits}（since birth）|
| 📝 知識細胞（中文 SSOT） | {total} 篇              |
| 🌐 英文細胞              | {en} 篇                 |
| 🇪🇸 西文 / 🇯🇵 日文        | {es} / {ja} 篇          |
| 📊 平均修訂次數          | {avg_rev} 次/篇         |"""

h = organs['heart']
im = organs['immune']
dn = organs['dna']
sk = organs['skeleton']
br = organs['breath']
rp = organs['reproduce']
se = organs['senses']
tr = organs['translation']

organ_table = f"""### 器官健康（Dashboard 即時分數）

| 器官        | 分數 | 趨勢 | 狀態                                    |
| ----------- | ---- | ---- | --------------------------------------- |
| 🫀 心臟     | {h['score']}   | {h['trend']}    | 近 7 天 {articles_7d} 篇新增/更新      |
| 🛡️ 免疫系統 | {im['score']}   | {im['trend']}    | {immune_status}                         |
| 🧬 DNA      | {dn['score']}   | {dn['trend']}    | EDITORIAL 近期有更新                    |
| 🦴 骨骼     | {sk['score']}   | {sk['trend']}    | 架構穩定                                |
| 🫁 呼吸     | {br['score']}   | {br['trend']}    | CI/CD 正常運作                          |
| 🧫 繁殖     | {rp['score']}   | {rp['trend']}    | {contributors} 貢獻者                   |
| 👁️ 感知     | {se['score']}   | {se['trend']}    | GA4 + Issue 模板完備                    |
| 🌐 語言     | {tr['score']}   | {tr['trend']}    | {trans_status}                          |"""

# Read original
with open(consciousness_path, 'r') as f:
    content = f.read()
original_lines = content.count('\n')

# Update snapshot date
content = re.sub(r'> 最後快照：\d{4}-\d{2}-\d{2}', f'> 最後快照：{today}', content)

# Replace ### 基本生理 block (split-based: preserve everything after next ###)
parts = content.split('### 基本生理')
if len(parts) == 2:
    rest = parts[1]
    next_section = rest.find('\n### ')
    if next_section > 0:
        content = parts[0] + basic + rest[next_section:]
    else:
        print("⚠️  找不到 ### 基本生理 之後的下一個 section，跳過替換")

# Replace ### 器官健康 block
parts = content.split('### 器官健康（Dashboard 即時分數）')
if len(parts) == 2:
    rest = parts[1]
    next_section = rest.find('\n### ')
    if next_section > 0:
        content = parts[0] + organ_table + rest[next_section:]
    else:
        print("⚠️  找不到 ### 器官健康 之後的下一個 section，跳過替換")

# Sanity check: content must not shrink drastically
new_lines = content.count('\n')
if new_lines < original_lines * 0.5:
    print(f"❌ Sanity check 失敗：原 {original_lines} 行 → {new_lines} 行（縮減超過 50%），放棄寫入")
    sys.exit(1)

with open(consciousness_path, 'w') as f:
    f.write(content)

print(f"✅ CONSCIOUSNESS.md 生命徵象已更新（{today}）")
print(f"   📝 {total} 篇 | 🛡️ {im['score']}/100 | 🌐 {en} EN | 👥 {contributors}")
print(f"   行數：{original_lines} → {new_lines}")
PYEOF
