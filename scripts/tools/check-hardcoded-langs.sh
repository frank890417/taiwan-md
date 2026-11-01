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
# ⚠️ 已知盲區，**本清單刻意還沒加 zh-TW**（2026-09-25 twmd-maintainer-am 量過）：
# pattern 錨在 `[` 後面緊接一個已知語言碼，所以最自然的寫法——從預設語言開頭的
# `["zh-TW", "en", "ja", ...]`——整個形狀目前隱形。加上 zh-TW 會多抓 6 處，其中
#   真缺陷 2：scripts/core/generate-og-images.mjs:88（LANGUAGES 只有 4 語，
#             另外 8 語沒有自己的 OG 圖）、scripts/tools/weekly-report-prep.py:701
#             （週報語言面停在 zh-TW+5）
#   合理 4：['zh-TW','ja','ko'] 這種 **CJK 字族集合**（companies/data template 的
#           萬/억 單位判斷、check-ui-language 的 CJK_LANGS）——新語言出生時不該
#           自動加進去，性質同已在允許清單的 src/i18n/utils.ts
# 卡住的不是量測而是分類：本檔只有「per-file 允許」與「per-line 掛號（預設要還）」
# 兩格，沒有「per-line 永久合理豁免」那一格，硬掛號會讓 4 個合理用法被當債務永久
# 提醒。加 zh-TW 之前要先補那一格，屬 guard 設計改動，排 Full session。

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
# v4（2026-09-25 twmd-maintainer-am）：兩個盲區一起補。
# (1) **副檔名**：v1-v3 只掃 ts/tsx/mjs/cjs/js/astro/sh，`.py` 從來不在名單裡，
#     所以整條 python 工具鏈對這支檢查器是結構性隱形——而 `langs.py` 的檔頭早就
#     寫明「六個工具各自 hardcode ["en","ja","ko","es","fr"]」。那個家族一直住在
#     這支檢查器看不到的地方，於是它每天回報「✅ 無違反」。
# (2) **斜線包裹形狀**：pattern 只認裸語言碼 `'en', 'ja'`，不認路由前綴
#     `"/en/", "/ja/"`。verify_internal_links.py:29 就是後者，站體品質閘門的
#     語言歸屬因此停在 5 個語言，de/ar/ru/pt/id/vi/hi 七語的連結全被記進 zh-TW
#     那一列（實測 295,003 條連結、416 條死連結錯記）。
# 誕生於同一次班：一支專為抓「寫死語言清單」而生的檢查器，對造它的那個病的
# 最新一批 instance 回報全綠（REFLEXES #83 兩把尺 divergence / #82）。
# v5（2026-09-27 twmd-maintainer）：第一條 pattern 錨在 `[`，python 的 set `{"en", ...}`
# 與 tuple `("en", ...)` 整個隱形。babel 對話修 name-consistency-check.py:193 時發現
# （那是 set 寫法）。開口放寬成 `[`、`{`、`(` 三種，量到多現形 18 行，全部在 .py，
# js/ts/astro/sh 零新增，所以對 pre-commit 現在擋的範圍沒有改變。18 行照 v4 的分法
# 掛號（下方 DEBT 2026-09-27 段），article_health 的 langs.py 進允許清單。
PATTERNS=(
  "[\\[{(]\\s*['\"]($LANGCODES)['\"]\\s*,\\s*['\"]($LANGCODES)['\"]\\s*,\\s*['\"]($LANGCODES)['\"]"
  "['\"]($LANGCODES)['\"]\\s*\\|\\s*['\"]($LANGCODES)['\"]\\s*\\|\\s*['\"]($LANGCODES)['\"]"
  "['\"]/($LANGCODES)/['\"]\\s*,\\s*['\"]/($LANGCODES)/['\"]"
)

# 允許清單（這些檔案的 hardcoded 語言清單是 SSOT 本體或合理的歷史 mirror）
ALLOWLIST=(
  "src/config/languages.ts"
  "src/config/languages.mjs"
  "scripts/tools/check-hardcoded-langs.sh"
  # python 工具鏈的 SSOT bridge 本體。它的 docstring 逐字引用了要抓的那個形狀
  # （"六個工具各自 hardcode [...]"），跟本檔自己被允許的理由相同：說明病灶的
  # 文字不是病灶。2026-09-25 把 .py 納入掃描範圍時現形。
  "scripts/tools/lang-sync/langs.py"
  # article-health 各 check plugin 的語言 SSOT bridge（2026-09-27 v5 放寬到 tuple 時現形）。
  # docstring 引用病灶原文，_FALLBACK 是讀不到註冊表時的退路，性質同上一行。
  "scripts/tools/lib/article_health/langs.py"
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
  # ── 2026-09-25 .py 納入掃描範圍後現形的 python 工具鏈（9 個，langs.py 已進
  # 允許清單，其餘 8 個掛號）。分兩種性質，處置不同：
  #
  # A. 真盲區（清單停在 5-9 語，站上有 12 語）——這批有實際後果，要改成吃
  #    langs.py。其中三個屬感知層，錯的讀數會流進儀表板與 AI 介面：
  #    fetch-cloudflare 的 per-language 流量歸屬、refresh-llms-txt 的語言排序、
  #    weekly-report-prep 的週報語言面。
  # B. 已列滿 12 語的有序清單——`sibling-slug-map` 的 SIBLING_PRIORITY 是
  #    fallback 偏好順序，性質同已允許的 src/i18n/utils.ts（新語言本來就該自己
  #    決定退階位置，不能從 registry derive）；另兩個是列滿但仍該 derive。
  #
  # 本班（maintainer-am）只把它們從隱形變成可見 + 掛號，不當班順手改：A 類六個
  # 檔各自要判斷「這個清單是語言註冊表還是有意義的順序」，而其中三個會動到儀表板
  # 讀數，屬 quality gate 鄰接面。逐檔判斷排進 OBSERVER-QUEUE / 下一個 Full session。
  "scripts/tools/unify-translation-slugs.py:26|2026-09-25|A 類：LANGS 停在 5 語，slug 統一化跳過 7 語"
  "scripts/tools/backfill-translated-from.py:55|2026-09-25|A 類：--lang choices 停在 5 語，7 語無法用此工具回填"
  "scripts/tools/lang-sync/name-consistency-check.py:50|2026-09-25|B 類：已列滿 12 語但仍寫死，下一個語言出生時會漂"
  "scripts/tools/lang-sync/sovereignty-lexicon-check.py:79|2026-09-25|B 類：已列滿 12 語但仍寫死，同上"
  "scripts/tools/lang-sync/sibling-slug-map.py:34|2026-09-25|B 類：SIBLING_PRIORITY 是 fallback 偏好順序，性質同 src/i18n/utils.ts，可能該進允許清單而非改 derive"
  # ── 2026-09-27 v5 放寬到 set／tuple 後現形的 18 行（分法同上，A 真盲區、B 列滿或屬性集合）
  #    fetch-cloudflare 那行同日從 :431 漂到 :415，掛號行號已更新。
  "scripts/tools/spore-db.py:119|2026-09-27|A 類：語言資料夾清單停在 5 語＋zh-TW"
  "scripts/tools/sync-spore-links.py:147|2026-09-27|A 類：語言資料夾清單停在 5 語＋zh-TW"
  "scripts/tools/generate-spore-records.py:56|2026-09-27|A 類：LANG_DIRS 停在 5 語＋zh-TW"
  "scripts/tools/sync-diary-links.py:79|2026-09-27|B 類：日記鏡像語言停在 5 語，跟 OBSERVER-QUEUE #77（日記巴別塔停在五語）的決定綁在一起，決定前不該先改"
  "scripts/tools/analyze-diary-article-links.py:89|2026-09-27|B 類：同上，日記鏡像語言，跟 #77 綁在一起"
  "scripts/tools/contributor-pr-heal.py:78|2026-09-27|B 類：已列滿 12 語但仍寫死，下一個語言出生時會漂"
  "scripts/tools/lang-sync/hub-translate.py:33|2026-09-27|B 類：已列滿 12 語但仍寫死，同上"
  "scripts/tools/lang-sync/cjk-leak-check.py:71|2026-09-27|B 類：非漢字文字的語言集合，是語言屬性分類，新語言出生時要人判斷歸屬，不能從註冊表 derive"
  "scripts/tools/lang-sync/cjk-residue-check.py:43|2026-09-27|B 類：同上，非漢字語系集合"
  "scripts/tools/lang-sync/numeral-conversion-check.py:112|2026-09-27|B 類：小數點用逗號的語言集合，是語言屬性，同上"
  "scripts/tools/lang-sync/numeral-magnitude-check.py:145|2026-11-02|B 類：DECIMAL_COMMA 小數點用逗號的語言集合，跟 numeral-conversion-check.py:112 同一份語言屬性，新語言出生時要人判斷歸屬；兩支各寫一份，日後該抽成共用表"
  # ── 2026-10-01 semiont-heartbeat：A 類感知層四支（fetch-cloudflare／refresh-llms-txt／
  #    weekly-report-prep／generate-dashboard-immune）改吃 langs.py，掛號撤掉。fetch-cloudflare
  #    那行其實 09-27 self-evolve 已修，留下的命中是「讀不到註冊表就退回五語」的退路，同班一併拿掉。
  #    量到的後果：免疫儀表板 driftDetail.new_articles_7d 讀 441、實際中文新文 1 篇；llms.txt 對
  #    AI crawler 宣稱「6 languages」，freshPct 那行從 05-04 誕生起讀錯檔案、一直停在五月的數字。
  #    同日現形兩行（09-28 新檔，掛號而不改）：這兩個集合綁著下方 ENTITIES 表的各語言 regex，
  #    新語言出生時要人補那一語的名人寫法，不能從註冊表 derive，性質同 cjk-residue。
  "scripts/tools/lang-sync/name-substitution-check.py:32|2026-10-01|B 類：LANGS 是 ENTITIES 表有寫法的語言集合，綁 regex 表，新語言要人補寫法"
  "scripts/tools/lang-sync/name-substitution-check.py:33|2026-10-01|B 類：LATIN 是拉丁字母語言集合，語言屬性，同上"
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
    | grep -E '\.(ts|tsx|mjs|cjs|js|astro|sh|py)$' || true)
else
  # cli/ 與 workers/ 是分發層（npm 套件、MCP server、遠端 endpoint）。它們不在
  # 站體的 import 關係裡，所以站體的檢查一路看不到它們——2026-07-26 量到 cli 的
  # 語言表漏了七個語言、把 2900 筆譯文當中文回給使用者三個月，就是這個盲區。
  FILES=$(find src scripts cli workers astro.config.mjs \
    -type f \
    \( -name "*.ts" -o -name "*.tsx" -o -name "*.mjs" -o -name "*.cjs" \
       -o -name "*.js" -o -name "*.astro" -o -name "*.sh" -o -name "*.py" \) \
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
