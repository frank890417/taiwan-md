#!/usr/bin/env bash
# check-hardcoded-langs.sh
# 偵測 src/ 與 scripts/ 內 hardcoded language code array，違反 LANGUAGES_REGISTRY SSOT 原則
#
# 對應 [MANIFESTO §指標 over 複寫](../../docs/semiont/MANIFESTO.md) 的自我 apply：
# 任何 ['en', 'ja', 'ko', ...] 形式的 hardcoded 語言清單應該改從
# src/config/languages.{ts,mjs} 的 LANGUAGES / ENABLED_LANGUAGE_CODES 動態 derive。
#
# 觸發背景：2026-04-25 β7 i18n-evolution-roadmap audit B6
# - getLangSwitchPath.ts:206 hardcoded ['en','ja','ko'] → fr/es 路由疊加 bug
# - 404.astro:376 同樣 hardcoded → fr/es 進 404 後切換 cascade
#
# 用法：
#   bash scripts/tools/check-hardcoded-langs.sh             # 完整掃描
#   bash scripts/tools/check-hardcoded-langs.sh --ci        # CI 模式（找到 = exit 1）
#   bash scripts/tools/check-hardcoded-langs.sh --staged    # 只掃 staged files

set -euo pipefail

MODE="${1:-scan}"

# Patterns 來抓 hardcoded language array
PATTERNS=(
  "\\[\\s*['\"]en['\"]\\s*,\\s*['\"]ja['\"]\\s*,\\s*['\"]ko['\"]\\s*\\]"
  "\\[\\s*['\"]en['\"]\\s*,\\s*['\"]ja['\"]\\s*,\\s*['\"]ko['\"]\\s*,\\s*['\"]fr['\"]"
  "\\[\\s*['\"]en['\"]\\s*,\\s*['\"]ja['\"]\\s*,\\s*['\"]ko['\"]\\s*,\\s*['\"]es['\"]"
)

# 允許清單（這些檔案的 hardcoded 語言清單是 SSOT 本體或合理的歷史 mirror）
ALLOWLIST=(
  "src/config/languages.ts"
  "src/config/languages.mjs"
  "scripts/tools/check-hardcoded-langs.sh"
)

# 收集要掃描的檔案
if [[ "$MODE" == "--staged" ]]; then
  FILES=$(git diff --cached --name-only --diff-filter=ACM \
    | grep -E '\.(ts|tsx|mjs|cjs|js|astro|sh)$' || true)
else
  FILES=$(find src scripts astro.config.mjs \
    -type f \
    \( -name "*.ts" -o -name "*.tsx" -o -name "*.mjs" -o -name "*.cjs" \
       -o -name "*.js" -o -name "*.astro" -o -name "*.sh" \) \
    2>/dev/null | grep -v node_modules | grep -v dist || true)
fi

if [[ -z "$FILES" ]]; then
  echo "✅ 無檔案可掃描"
  exit 0
fi

VIOLATIONS=0
VIOLATION_LIST=""

for f in $FILES; do
  [[ ! -f "$f" ]] && continue

  # Skip allowlist
  skip=0
  for allowed in "${ALLOWLIST[@]}"; do
    if [[ "$f" == "$allowed" ]] || [[ "$f" == *"$allowed" ]]; then
      skip=1
      break
    fi
  done
  [[ $skip -eq 1 ]] && continue

  for pattern in "${PATTERNS[@]}"; do
    # Skip comment lines (// ... or # ... or * ...) where pattern only appears
    # in the comment text — comments don't execute, so they're not real bugs
    matches=$(grep -nE "$pattern" "$f" 2>/dev/null \
      | grep -vE '^[0-9]+:\s*(//|#|\*)' \
      | grep -vE '^[0-9]+:.*(//|#).*\[.*en.*ja.*ko' \
      || true)
    if [[ -n "$matches" ]]; then
      while IFS= read -r line; do
        VIOLATIONS=$((VIOLATIONS + 1))
        VIOLATION_LIST+="\n  $f:$line"
      done <<< "$matches"
    fi
  done
done

if [[ $VIOLATIONS -gt 0 ]]; then
  echo "🚨 發現 $VIOLATIONS 個 hardcoded language array："
  echo -e "$VIOLATION_LIST"
  echo ""
  echo "💡 修法：改從 LANGUAGES_REGISTRY 動態 derive："
  echo ""
  echo "    import { LANGUAGES } from '../config/languages';"
  echo "    const langPrefixes = LANGUAGES"
  echo "      .filter(l => l.enabled && !l.isDefault)"
  echo "      .map(l => l.code);"
  echo ""
  echo "  或直接用既有 export："
  echo ""
  echo "    import { ENABLED_LANGUAGE_CODES, ALL_LANGUAGE_CODES } from '../config/languages';"
  echo ""
  echo "  Why：對應 MANIFESTO §指標 over 複寫 SSOT 原則 + REFLEXES #20"
  echo "  Audit canonical：reports/i18n-evolution-roadmap-2026-04-25.md"

  if [[ "$MODE" == "--ci" ]] || [[ "$MODE" == "--staged" ]]; then
    exit 1
  fi
  exit 0
fi

echo "✅ 無 hardcoded language array 違反"
exit 0
