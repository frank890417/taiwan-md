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

# 已知語言碼（跟 src/config/languages.mjs 對齊；新語言出生時補這裡一個 alternation）
LANGCODES="en|ja|ko|es|fr|vi|id|pt|hi|ar|ru|de|th"

# Patterns 來抓 hardcoded language array。
#
# v2（2026-07-26）：原本三條 pattern 都寫死「開頭必須是 en, ja, ko」，只抓得到
# 當初觸發它誕生的那個形狀。`new Set(['en','es','ja','ko','resources'])` 三條全
# 不中——那正是 cli/src/lib/knowledge.js 從四月漏到七月的那一行。改成「任意三個
# 相鄰的已知語言碼字串」，順序、引號、Set(...) 包裝都不影響命中。
# v3（2026-07-26）：v2 把「開頭必須是 en,ja,ko」放寬成「任意三個相鄰語言碼」，但
# pattern 仍假設**逗號分隔的 array literal**。TypeScript 的 type union 用 `|` 分隔，
# 所以 `Record<'zh-TW' | 'en' | 'ja' | 'ko' | 'es' | 'fr', T>` 這個形狀一路隱形。
# 代價實測：src/utils/article-render.ts 的 VIZ_STRINGS 正是這個形狀，查找又是
# `?? VIZ_STRINGS['zh-TW']`，於是 vi/id/pt/hi/ar/ru 六語的 renderer UI 字串全退回
# 中文：dist 上這六語共 43,045 個中文 aria-label，阿拉伯文 / 印地文 / 俄文讀者的
# 螢幕閱讀器每個腳註都唸中文。加第二條 pattern 抓 union 形狀。
PATTERNS=(
  "\\[\\s*['\"]($LANGCODES)['\"]\\s*,\\s*['\"]($LANGCODES)['\"]\\s*,\\s*['\"]($LANGCODES)['\"]"
  "['\"]($LANGCODES)['\"]\\s*\\|\\s*['\"]($LANGCODES)['\"]\\s*\\|\\s*['\"]($LANGCODES)['\"]"
)

# 允許清單（這些檔案的 hardcoded 語言清單是 SSOT 本體或合理的歷史 mirror）
ALLOWLIST=(
  "src/config/languages.ts"
  "src/config/languages.mjs"
  "scripts/tools/check-hardcoded-langs.sh"
  # 真陽性以外的一條：這是 per-language fallback cascade（缺 key 時依序退到哪個
  # 語言），是有順序的偏好清單，不是語言註冊表。新語言出生時本來就該自己決定
  # 退階順序，不能從 registry derive。
  "src/i18n/utils.ts"
)

# ── 已知債（掛號要附行號與日期，還清就刪乾淨）────────────────────────────────
# 前一輪（2026-07-26 擴網當天）三個檔案當天開單當天結清：儀表板 registry /
# next-steps、地圖產生器，全部改成從語言註冊表推導，掛號隨即撤掉。
# 脈絡：reports/design-taiwanmd-node-app-distribution-2026-07-26.md §九.2
#
# v3 的 union pattern 讓三個**頁面內容表**現形。它們與上面那批不同性質：那批是
# 語言清單，可以直接從 registry 推導；這三個是「每語一份的編輯內容」，補齊等於
# 要寫六個語言的整頁文案，不是機械替換，所以掛號而不是硬轉。
#
# 這三處目前的實際後果（build 出來的 dist 量測，非推論）：
#   /ar/opendata 內文有 6,051 個漢字、/ar/mcp 有 1,082 個：六個新語言的讀者拿到的
#   是整頁中文，而路由確實存在（dist/ar/opendata/、dist/ar/mcp/ 都有）。
# 還清方式二選一：補六語文案，或讓這些路由在缺該語文案時不要產生頁面。
#
# 格式：<path>:<line>|<掛號日>|<理由>
DEBT=(
  "src/data/opendata-content.ts:13|2026-07-26|OpendataLang：策展文案每語一份，補齊要寫六語整頁內容；/ar/opendata 現在是 6,051 漢字的中文頁"
  "src/data/mcp-content.ts:19|2026-07-26|McpLang：同上；/ar/mcp 現在是 1,082 漢字的中文頁"
  "src/templates/elections-2026.template.astro:122|2026-07-26|electionCopy：選舉專頁文案每語一份，同上"
)

DEBT_SEEN=""
is_debt() {
  local f="$1" ln="$2"
  for entry in "${DEBT[@]}"; do
    if [[ "${entry%%|*}" == "$f:$ln" ]]; then
      local rest="${entry#*|}"
      # ${ln} 要加大括號：變數後面直接接全形字元時，bash 會把全形字元讀進變數名。
      DEBT_SEEN+="\n  $f:${ln}（${rest%%|*} 掛號）${rest#*|}"
      return 0
    fi
  done
  return 1
}

# 收集要掃描的檔案
if [[ "$MODE" == "--staged" ]]; then
  FILES=$(git diff --cached --name-only --diff-filter=ACM \
    | grep -E '\.(ts|tsx|mjs|cjs|js|astro|sh)$' || true)
else
  # cli/ 與 workers/ 是分發層（npm 套件、MCP server、遠端 endpoint）。它們不在
  # 站體的 import 關係裡，所以站體的檢查一路看不到它們——2026-07-26 量到 cli 的
  # 語言表漏了七個語言、把 2900 筆譯文當中文回給使用者三個月，就是這個盲區。
  FILES=$(find src scripts cli workers astro.config.mjs \
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
        # 掛號過的（檔案 + 行號都對上）不計為違反，但一定印出來
        if is_debt "$f" "${line%%:*}"; then
          continue
        fi
        VIOLATIONS=$((VIOLATIONS + 1))
        VIOLATION_LIST+="\n  $f:$line"
      done <<< "$matches"
    fi
  done
done

if [[ -n "$DEBT_SEEN" ]]; then
  echo "📌 已掛號的已知債（不擋，但每次都提醒）："
  echo -e "$DEBT_SEEN"
  echo ""
fi

# 掛號但已經不再命中 = 債還清了，或者行號漂了。兩種都要處理，不能讓豁免留著。
# 只在全掃時判定：--staged 只看得到這次 commit 的檔案，掛號的檔案沒進 staging
# 就會全部誤判成「沒命中」，每次 commit 都噴一次假清單。
STALE=""
if [[ "$MODE" != "--staged" ]]; then
  for entry in "${DEBT[@]}"; do
    target="${entry%%|*}"
    if [[ "$DEBT_SEEN" != *"$target"* ]]; then
      STALE+="\n  $target"
    fi
  done
fi
if [[ -n "$STALE" ]]; then
  echo "🧹 DEBT 有掛號沒命中，請確認是還清了（刪掉這幾行）還是行號漂了（更新行號）："
  echo -e "$STALE"
  echo ""
fi

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
