#!/usr/bin/env bash
# translation-ratio-check.sh — 翻譯 PR 審核第一道檢查
#
# 用法:
#   bash scripts/tools/translation-ratio-check.sh --pr 367
#   bash scripts/tools/translation-ratio-check.sh knowledge/ja/Society/article.md [...]
#   bash scripts/tools/translation-ratio-check.sh --all-ja
#
# 作用：
#   比對翻譯檔案跟 translatedFrom 指向的中文 SSOT 字數比率，
#   識別「摘要式翻譯」（AI 工具的預設行為）造成的內容截斷。
#
# 健全 ratio 範圍（2026-04-11 實測基準）：
#   zh → en:  2.20-3.50  (<1.50 = TRUNCATED)
#   zh → ja:  1.10-1.50  (<0.80 = TRUNCATED)
#   zh → ko:  1.20-1.65  (<0.85 = TRUNCATED)
#   zh → es/fr/de: 2.0-4.0  (<1.5 = TRUNCATED)
#
# 來源：2026-04-11 session α 審核 27 個翻譯 PR 的實戰經驗

set -o pipefail
cd "$(git rev-parse --show-toplevel 2>/dev/null || pwd)"

RED='\033[0;31m'; YEL='\033[0;33m'; GRN='\033[0;32m'
BLU='\033[0;34m'; DIM='\033[0;90m'; RST='\033[0m'

# Parse args
MODE="files"
PR_NUM=""
FILES=()

if [[ "${1:-}" == "--pr" ]] && [[ -n "${2:-}" ]]; then
  MODE="pr"
  PR_NUM="$2"
elif [[ "${1:-}" == "--all-ja" ]]; then
  MODE="all-ja"
elif [[ "${1:-}" == "--all-en" ]]; then
  MODE="all-en"
elif [[ "${1:-}" == "--help" ]] || [[ -z "${1:-}" ]]; then
  grep "^#" "$0" | head -25
  exit 0
else
  FILES=("$@")
fi

# Collect files (bash 3 compatible — no mapfile)
if [[ "$MODE" == "pr" ]]; then
  while IFS= read -r line; do
    [[ -n "$line" ]] && FILES+=("$line")
  done < <(gh pr diff "$PR_NUM" --name-only 2>/dev/null | grep "^knowledge/" | grep -v "_translations.json")
  if [[ ${#FILES[@]:-0} -eq 0 ]]; then
    echo -e "${RED}❌ 無法取得 PR #$PR_NUM 的檔案清單${RST}"
    exit 1
  fi
elif [[ "$MODE" == "all-ja" ]]; then
  while IFS= read -r line; do
    FILES+=("$line")
  done < <(find knowledge/ja/ -name '*.md' ! -name '_*' 2>/dev/null | sort)
elif [[ "$MODE" == "all-en" ]]; then
  while IFS= read -r line; do
    FILES+=("$line")
  done < <(find knowledge/en/ -name '*.md' ! -name '_*' 2>/dev/null | sort)
fi

# Run Python for accurate character counting (handles unicode properly)
python3 <<PYEOF
import re, sys, os

files = [$(printf '"%s",' "${FILES[@]}")]
files = [f for f in files if f]

def get_body(content):
    m = re.match(r'^---\n.*?\n---\n(.*)', content, re.DOTALL)
    return m.group(1) if m else content

def detect_lang(path):
    m = re.match(r'knowledge/([a-z]{2,5})/', path)
    if not m: return 'zh'
    return m.group(1)

# Healthy ratio ranges
RANGES = {
    'en':    (1.50, 2.20, 3.50),   # (truncated_below, healthy_min, healthy_max)
    'ja':    (0.80, 1.10, 1.50),
    'ko':    (0.85, 1.20, 1.65),
    'es':    (1.50, 2.00, 4.00),
    'fr':    (1.50, 2.00, 4.00),
    'de':    (1.50, 2.00, 4.00),
    'vi':    (1.50, 2.00, 4.30),  # 2026-07-18 Stage 2 校準定案（實測 2.31-3.81，n=3）
    'id':    (1.50, 2.00, 4.30),  # 2026-07-18 Stage 2 校準定案（實測 2.32-3.58，n=3）
    'pt':    (1.50, 2.00, 4.30),  # 2026-07-18 Stage 2 校準定案（實測 2.44-3.97，n=4）
    'hi':    (1.50, 2.00, 4.00),  # 2026-07-18 Stage 2 校準定案（實測 2.20-3.38，n=3；天城文預想較緊湊被實測推翻）
    'zh-TW': (0.95, 1.00, 1.00),
}

PASS = 0
WARN = 0
FAIL = 0
results = []

for f in files:
    if not os.path.exists(f):
        results.append((f, 'MISSING', None, None, None))
        FAIL += 1
        continue

    lang = detect_lang(f)
    if lang == 'zh' or lang == 'zh-TW':
        # Skip zh source files in scanning mode
        continue

    with open(f, encoding='utf-8') as fh:
        content = fh.read()

    # Find translatedFrom
    m = re.search(r"translatedFrom:\s*['\"]?([^'\"\n]+)", content)
    if not m:
        results.append((f, 'NO_TRANSLATED_FROM', None, None, None))
        WARN += 1
        continue

    zh_rel = m.group(1).strip()
    zh_path = f"knowledge/{zh_rel}"
    if not os.path.exists(zh_path):
        results.append((f, 'ZH_MISSING', zh_rel, None, None))
        FAIL += 1
        continue

    with open(zh_path, encoding='utf-8') as fh:
        zh_content = fh.read()

    zh_body = get_body(zh_content)
    tr_body = get_body(content)

    if not zh_body:
        results.append((f, 'ZH_EMPTY_BODY', zh_rel, None, None))
        WARN += 1
        continue

    ratio = len(tr_body) / len(zh_body)

    # Section / footnote / url check
    zh_secs = len(re.findall(r'^## ', zh_content, re.M))
    tr_secs = len(re.findall(r'^## ', content, re.M))
    zh_fns = len(re.findall(r'^\[\^[\w-]+\]:', zh_content, re.M))
    tr_fns = len(re.findall(r'^\[\^[\w-]+\]:', content, re.M))
    zh_urls = zh_content.count('http')
    tr_urls = content.count('http')

    extra_info = {
        'secs': f"{zh_secs}→{tr_secs}",
        'fns': f"{zh_fns}→{tr_fns}",
        'urls': f"{zh_urls}→{tr_urls}",
    }

    # Determine verdict
    trunc, healthy_min, healthy_max = RANGES.get(lang, (0.55, 0.70, 1.30))

    if ratio < trunc:
        verdict = 'TRUNCATED'
        FAIL += 1
    elif ratio < healthy_min:
        verdict = 'THIN'
        WARN += 1
    elif ratio > healthy_max:
        verdict = 'LONG'
        WARN += 1
    elif zh_urls >= 3 and tr_urls == 0:
        verdict = 'NO_URLS'
        WARN += 1
    elif tr_urls < zh_urls * 0.5 and zh_urls >= 5:
        verdict = 'URL_LOSS'
        WARN += 1
    elif zh_secs > 0 and tr_secs < zh_secs:
        verdict = f'MISSING_SECTIONS({zh_secs-tr_secs})'
        WARN += 1
    else:
        verdict = 'OK'
        PASS += 1

    results.append((f, verdict, zh_rel, ratio, extra_info))

# Print report
print()
print(f"{'File':<60} {'Ratio':>6}  {'Verdict':<20} {'Structure'}")
print("─" * 120)
for f, verdict, zh_rel, ratio, info in results:
    short = os.path.basename(f)[:58]
    if ratio is None:
        print(f"{short:<60} {'—':>6}  {verdict:<20} —")
        continue
    color = ''
    if verdict == 'OK':
        color = '\033[0;32m'  # green
    elif verdict in ('THIN', 'LONG', 'URL_LOSS', 'NO_URLS') or 'MISSING_SECTIONS' in verdict:
        color = '\033[0;33m'  # yellow
    else:
        color = '\033[0;31m'  # red
    reset = '\033[0m'
    s = f"secs={info['secs']} fns={info['fns']} urls={info['urls']}" if info else ''
    print(f"{short:<60} {ratio:>5.2f}  {color}{verdict:<20}{reset} {s}")

print()
print(f"\033[0;90m{'─'*120}\033[0m")
total = PASS + WARN + FAIL
if FAIL > 0:
    print(f"\033[0;31m❌ FAIL\033[0m: {FAIL} / {total}  (TRUNCATED translations require rework)")
elif WARN > 0:
    print(f"\033[0;33m⚠️  WARN\033[0m: {WARN} / {total}  (acceptable for merge + follow-up)")
else:
    print(f"\033[0;32m✅ PASS\033[0m: {PASS} / {total}")
print()

sys.exit(1 if FAIL > 0 else 0)
PYEOF
