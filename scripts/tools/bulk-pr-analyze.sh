#!/usr/bin/env bash
# bulk-pr-analyze.sh v1.0 — 批次 PR 分析報告
# 用法: bash scripts/tools/bulk-pr-analyze.sh
#       bash scripts/tools/bulk-pr-analyze.sh --author <name>
#       bash scripts/tools/bulk-pr-analyze.sh --json
#
# 對所有 open PR 做元數據掃描：作者、規模、語言、分類、時間、狀態。
# 答 4 個問題：
#   1. 誰送的？同一個人多少？
#   2. 哪些是翻譯 PR？哪些是新內容？
#   3. 涵蓋哪些語言/分類？
#   4. 哪些是 ready to merge / 哪些有 conflict / 哪些等回應？
#
# 設計目標：心跳 Beat 1 的 PR 全景診斷，5 秒看完所有 open PR 的形狀。
set -uo pipefail
cd "$(dirname "$0")/../.."

JSON_OUT=false
FILTER_AUTHOR=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --json) JSON_OUT=true; shift ;;
    --author) FILTER_AUTHOR="$2"; shift 2 ;;
    -h|--help)
      head -16 "$0" | tail -15 | sed 's/^# \?//'
      exit 0
      ;;
    *) echo "未知參數: $1"; exit 1 ;;
  esac
done

# Fetch all open PRs in one API call
PRS_JSON=$(gh pr list --limit 200 --state open --json number,title,author,additions,deletions,createdAt,updatedAt,mergeable,labels,files 2>/dev/null)

if [[ -z "$PRS_JSON" ]] || [[ "$PRS_JSON" == "[]" ]]; then
  echo "✅ 沒有 open PR"
  exit 0
fi

if $JSON_OUT; then
  echo "$PRS_JSON"
  exit 0
fi

# Use python for analysis (more readable than bash)
python3 - "$PRS_JSON" "$FILTER_AUTHOR" <<'PYEOF'
import json, sys, re
from collections import defaultdict

prs = json.loads(sys.argv[1])
filter_author = sys.argv[2] if len(sys.argv) > 2 else ""

if filter_author:
    prs = [p for p in prs if p['author']['login'] == filter_author]

if not prs:
    print(f"沒有符合條件的 PR (author: {filter_author})")
    sys.exit(0)

# === Author breakdown ===
by_author = defaultdict(list)
for p in prs:
    by_author[p['author']['login']].append(p)

# === Type detection ===
def detect_type(p):
    title = p['title'].lower()
    files = [f['path'] for f in p.get('files', [])]
    if any(re.match(r'(translate|add \w+ translation)', title) or 'translation' in title for _ in [1]):
        return 'translation'
    if any(f.startswith('knowledge/') and '/' in f[10:] for f in files):
        # Check if it's adding to knowledge/<Lang>/
        first_seg = files[0][10:].split('/')[0] if files else ''
        if first_seg in ('en', 'ja', 'ko', 'es', 'fr'):
            return 'translation'
        if first_seg in ('History','Geography','Culture','Food','Art','Music','Technology','Nature','People','Society','Economy','Lifestyle','About'):
            return 'content'
    return 'other'

# === Language extraction ===
def extract_lang_cat(p):
    """Return (lang, category) from translation PR title or files."""
    title = p['title']
    m = re.search(r'Add (\w+) translations?: (\w+)', title)
    if m:
        lang_name = m.group(1)
        lang_map = {'Korean':'ko','Japanese':'ja','English':'en','Spanish':'es','French':'fr','German':'de'}
        return lang_map.get(lang_name, lang_name.lower()[:2]), m.group(2)
    # Fallback: look at files
    for f in p.get('files', []):
        path = f['path']
        m = re.match(r'knowledge/(en|ja|ko|es|fr)/([A-Z][a-z]+)/', path)
        if m:
            return m.group(1), m.group(2)
    return None, None

# === Mergeability ===
def merge_status(p):
    m = p.get('mergeable')
    if m == 'MERGEABLE': return '✅'
    if m == 'CONFLICTING': return '⚠️ conflict'
    if m == 'UNKNOWN': return '? '
    return f'? {m}'

# === Print report ===
print(f"╔══════════════════════════════════════════════════╗")
print(f"║  📊 Bulk PR Analyze — {len(prs)} open PRs                ║")
print(f"╚══════════════════════════════════════════════════╝")
print()

# By author
print(f"📁 Authors ({len(by_author)})")
for author, ap in sorted(by_author.items(), key=lambda x: -len(x[1])):
    total_add = sum(p['additions'] for p in ap)
    print(f"  {author}: {len(ap)} PRs (+{total_add:,} lines)")
print()

# By type
type_counts = defaultdict(int)
type_prs = defaultdict(list)
for p in prs:
    t = detect_type(p)
    type_counts[t] += 1
    type_prs[t].append(p)
print(f"🏷️  Types")
for t, c in type_counts.items():
    print(f"  {t}: {c}")
print()

# By lang × cat (translations only)
print(f"🌐 Translation Coverage")
lang_cat = defaultdict(lambda: defaultdict(list))
for p in type_prs.get('translation', []):
    lang, cat = extract_lang_cat(p)
    if lang and cat:
        lang_cat[lang][cat].append(p)

for lang in sorted(lang_cat.keys()):
    cats = lang_cat[lang]
    total = sum(len(ps) for ps in cats.values())
    cat_str = ', '.join(f'{c}:{len(ps)}' for c, ps in sorted(cats.items()))
    print(f"  /{lang}/ ({total} PRs): {cat_str}")
print()

# Mergeability
print(f"🔀 Merge Status")
ms = defaultdict(int)
for p in prs:
    ms[merge_status(p)] += 1
for status, c in sorted(ms.items(), key=lambda x: -x[1]):
    print(f"  {status}: {c}")
print()

# Detailed table
print(f"📋 PR List (newest first)")
print(f"{'#':<5} {'lang':<5} {'cat':<10} {'+lines':<8} {'merge':<12} {'author':<15} title")
print("─" * 100)
prs_sorted = sorted(prs, key=lambda p: -p['number'])
for p in prs_sorted[:60]:
    lang, cat = extract_lang_cat(p)
    lang = lang or '—'
    cat = cat or '—'
    title = p['title'][:50]
    author = p['author']['login'][:14]
    merge = merge_status(p)
    print(f"#{p['number']:<4} {lang:<5} {cat:<10} +{p['additions']:<7,} {merge:<12} {author:<15} {title}")

if len(prs_sorted) > 60:
    print(f"... and {len(prs_sorted) - 60} more")
PYEOF
