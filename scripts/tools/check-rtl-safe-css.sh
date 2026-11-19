#!/usr/bin/env bash
# check-rtl-safe-css.sh
# 偵測 localized reader surface 的 physical directional CSS，違反 RTL 排版正確性
#
# 對應 [MANIFESTO §指標 over 複寫](../../docs/semiont/MANIFESTO.md) 的自我 apply：
# `dir="rtl"` 只翻文字流向，physical property（margin-left / border-left /
# text-align: left / left: / border-radius 四角 / inset 簡寫）不會跟著鏡像。
#
# 觸發背景：2026-07-25 ar（阿拉伯語）出生 = 站上第一個 RTL 語言。
# - Layout 的 `<html lang dir>` 接線同日完成（commit ce31f2f4），但全站 CSS 是
#   純 physical，於是 /ar/ 的色軌、縮排、圓角、進度條全部留在錯的一邊。
# - 實測（1440×900，light + dark）：blockquote 色軌在文字尾端而非行首；
#   ul/ol 在 RTL 同時吃到站內 padding-left 28.32px 與 UA padding-right 37.76px
#   = 兩邊都縮排；閱讀進度條從左往右長；分類頁清除鈕釘在錯邊。
# - 修法一律是 logical property：margin-inline-start / border-inline-start /
#   text-align: start / inset-inline-start / border-start-start-radius…
#   在 LTR 下 used value 與 physical 完全相同，所以既有 6,000+ 中英日韓西法頁面
#   零變化（PR 附 computed-style A/B 為證）。
#
# 用法：
#   bash scripts/tools/check-rtl-safe-css.sh             # 完整掃描
#   bash scripts/tools/check-rtl-safe-css.sh --ci        # CI 模式（找到 = exit 1）
#   bash scripts/tools/check-rtl-safe-css.sh --staged    # 只掃 staged files

set -euo pipefail

MODE="${1:-scan}"

# ── 受守護表面 ────────────────────────────────────────────────────────────────
# 只收「/ar/ 讀者真的會看到」且已經清乾淨的檔。刻意不掃全 src/：
# dashboard / semiont / newsroom 等 zh-TW-only 路由還是 physical，架一盞掃全站
# 的新紅燈會擋住正在跑的巴別塔批次（跟 check-hardcoded-langs.sh v2 同一顧慮）。
# 清乾淨一個檔就把它加進這張表，紅燈才會跟著前進。
SURFACE=(
  "src/templates/article.template.astro"
  "src/templates/category-hub.template.astro"
  "src/templates/home.template.astro"
  "src/layouts/Layout.astro"
  "src/components/Header.astro"
  "src/components/Footer.astro"
  "src/components/ArticleHero.astro"
  "src/components/ArticleSidebar.astro"
  "src/components/TableOfContents.astro"
  "src/components/ArticleCard.astro"
  "src/components/Perspectives.astro"
  "src/components/FootnoteCard.astro"
  "src/styles/global.css"
  "src/styles/dark-polish.css"
)

# ── 已知債（掛號要附行號與日期，還清就刪乾淨）────────────────────────────────
# 體例照 check-hardcoded-langs.sh：不要讓豁免在清單裡過夜變成「本來就這樣」。
#
# 1. src/styles/article-modules.css — tw-* 資料視覺化家族（2026-07-26 掛號）
#    prose 類（.tw-mod-src:132 / .tw-quote:499 / .tw-note:1130,1143）已改 logical
#    並納入本次 PR；但 .tw-bars / .tw-dot / .tw-stack / .tw-iso / .tw-timeline /
#    .tw-heatmap / .tw-versus 這批**刻意不動**，兩個理由：
#      (a) src/utils/article-render.ts:322 對 diverging bar 寫 inline
#          `left:50%` / `right:50%;left:auto`。base 若改成 inset-inline-*，RTL 下
#          會與 inline 的 left 互相 over-constrain（RTL 過約束時 left 被忽略），
#          正值長條會貼到版面邊緣而不是零線。
#      (b) 資料軸要不要跟著鏡像是設計決策不是機械替換（RTL 出版慣例兩派都有），
#          該由維護者定調；只翻標籤不翻軌道會比現狀更亂。
# 2. 浮動層 .floating-md（src/styles/global.css:445）+ ReaderSettings.astro
#    + FeedbackWidget.astro（2026-07-26 掛號）：三者現在分坐左右下角，必須同一
#    次一起鏡像，否則 RTL 下會疊在一起。要一個完整的 pass，不適合夾在本 PR。
# 3. src/styles/dark-polish.css:1433 `.resources-page .featured-card`
#    （2026-07-26 掛號）：它覆寫的 base 在 resources.template.astro，該檔本輪
#    未清，成對修改才有意義。
#
# 脈絡：本 PR 說明 + reports/language-birth-2026-07-25.md §RTL findings

# ── Patterns ─────────────────────────────────────────────────────────────────
# 原生 CSS 的 physical 方向屬性。`border-radius` 只抓多值寫法（四角不一致才
# 有方向性，`border-radius: 8px` 是對稱的）。`inset:` 同理只抓多值。
CSS_PATTERNS=(
  "(margin|padding)-(left|right)[[:space:]]*:"
  "border-(left|right)(-(color|width|style))?[[:space:]]*:"
  "text-align[[:space:]]*:[[:space:]]*(left|right)[[:space:]]*(;|\$)"
  "^[[:space:]]*(left|right)[[:space:]]*:"
  "border-radius[[:space:]]*:[^;]+[[:space:]]+[^;]+[[:space:]]+[^;]+"
  "^[[:space:]]*inset[[:space:]]*:[^;]+[[:space:]]+[^;]+"
)

# Tailwind physical utility（v4 有對應的 logical utility：ps/pe/ms/me/
# border-s/border-e/text-start/text-end/start-/end-/inset-x）。
# 左界收「引號 / 反引號 / 空白 / 冒號」四種，避免 `rounded-lg` 命中 `rounded-l`、
# `border-l` 命中 `border-left`（後者由 CSS_PATTERNS 負責）。
# 冒號是必要的：variant prefix 後面直接接 utility，中間沒有空白，
# 例如 `[&.active]:border-l-[#006d77]` / `max-[768px]:pl-4` / `md:ml-2`。
# 少了冒號這一界，最容易漏掉的就是「只有 active / hover / 斷點狀態才會現形」
# 的那批 —— 而它們正是最難用肉眼看出來的（本輪實際漏過一條 TOC active 色軌）。
TW_PATTERNS=(
  "[\"'\` :](pl|pr|ml|mr)-[0-9[a]"
  "[\"'\` :]border-(l|r)(-[0-9[]|[\"'\` ])"
  "[\"'\` :]text-(left|right)[\"'\` ]"
  "[\"'\` :](left|right)-[0-9[]"
  "[\"'\` :]rounded-(l|r)([\"'\` -])"
)

# ── 為什麼這一段從「行號」改成「內容」（2026-08-28）───────────────────────────
# 舊版的 ALLOWLIST / DEBT 用 `<path>:<line>` 釘住條目。檔案一長行號就漂，漂掉之後
# 合法的用法被報成新違反、掛號中的債看起來像新病。這不是假設：2026-08-28 全掃時
# Header 的兩條置中從 1052/1099 漂到 1063/1110 各報一次假警報，而 dark-polish.css
# 那條掛了一個月的債也因為漂掉而被當成新違反——查了半天才發現它早就在 DEBT 裡。
#
# 現在改成兩層，都不依賴行號：
#   第一層（語意）：置中慣用法自動放行，不需要任何清單。判準是「這條 left/right:50%
#              所在的規則區塊裡有沒有 -50% 的 translate」——有就是置中，置中沒有
#              方向性，維持 physical 才對（改成 inset-inline-start 在 RTL 會變成
#              從右邊算 50%，配上固定方向的 translateX 反而偏移半個元素寬）。
#   第二層（內容）：真正的一次性例外與掛號中的債，用「檔案 + 宣告文字」比對。
#              另外加一道對賬：清單裡對不上任何一行的條目會印出來提醒核對，
#              所以「債已還清但沒人從清單移除」這種殘留也會現形（本輪就是這樣
#              才發現 dark-polish.css 那條該退場）。

# 取出 $2 行所在的 CSS 規則區塊，問裡面有沒有 -50% 的 translate（置中慣用法）。
# 往回找到最近一個未閉合的 `{`，往前找到它的 `}`，只看這個窗口。
block_is_centering() {
  awk -v t="$2" '
    { all[NR] = $0; last = NR }
    END {
      d = 0; s = 1
      for (i = t; i >= 1; i--) {
        l = all[i]; o = gsub(/\{/, "{", l)
        l = all[i]; c = gsub(/\}/, "}", l)
        d += c - o
        if (d < 0) { s = i; break }
      }
      d = 0; e = last
      for (i = s; i <= last; i++) {
        l = all[i]; o = gsub(/\{/, "{", l)
        l = all[i]; c = gsub(/\}/, "}", l)
        d += o - c
        if (i > s && d <= 0) { e = i; break }
      }
      for (i = s; i <= e; i++)
        if (all[i] ~ /translate[XY]?\([^)]*-50%/ || all[i] ~ /translate:[[:space:]]*-50%/) {
          print "YES"; exit
        }
    }
  ' "$1" | grep -q YES
}

# 宣告文字正規化：去掉前後空白與行尾 `;`，讓「同一條宣告」在不同縮排下也對得上。
norm_decl() {
  local d="$1"
  d="${d#"${d%%[![:space:]]*}"}"
  d="${d%"${d##*[![:space:]]}"}"
  d="${d%;}"
  printf '%s' "$d"
}

# ── 允許清單（這些 physical 用法改成 logical 會壞掉）─────────────────────────
# 格式：<path>|<宣告文字>|<理由>　（比對用「檔案 + 該行宣告」，不用行號）
# 置中慣用法已由上面的語意判準自動放行，不必列在這裡。這張表留給
# 「語意判準涵蓋不到、但 physical 真的才對」的一次性例外。
# 空陣列在 `set -u` 下展開會炸，所以下面所有迴圈都用 ${arr[@]+"${arr[@]}"} 展開。
ALLOWLIST=(
)

# ── 掛號中的債（受守護檔案裡「還沒還」的行）──────────────────────────────────
# 跟 ALLOWLIST 分開：ALLOWLIST 是「physical 才對，永久」，DEBT 是「該改但這輪
# 沒改」。DEBT 不算違反，但**每次都會印出來**並附掛號日期，不會靜默過夜變成
# 「這裡本來就這樣」。還清就刪掉那一行——沒刪的話下面的對賬會叫。
# 格式：<path>|<宣告文字>|<掛號日>|<理由>
DEBT=(
  "src/styles/global.css|right: var(--fab-edge)|2026-07-26|.floating-md 屬浮動層，要跟 ReaderSettings / FeedbackWidget / ProticoScript 同批鏡像，否則 RTL 下疊在一起（2026-11-19 位置改讀 --fab-* token，手機斷點那行併入 token 已刪）"
)

ALLOW_HIT=""
is_allowlisted() {
  local f="$1" ln="$2" text="$3"
  # 第一層：置中慣用法（left/right: 50% 且同區塊有 -50% translate）
  if [[ "$text" =~ (left|right)[[:space:]]*:[[:space:]]*50% ]] && block_is_centering "$f" "$ln"; then
    return 0
  fi
  # 第二層：內容比對的一次性例外
  local decl
  decl="$(norm_decl "$text")"
  for entry in ${ALLOWLIST[@]+"${ALLOWLIST[@]}"}; do
    local ef="${entry%%|*}" rest="${entry#*|}"
    local ed="${rest%%|*}"
    if [[ "$ef" == "$f" && "$decl" == *"$ed"* ]]; then
      ALLOW_HIT+="|$ef::$ed"
      return 0
    fi
  done
  return 1
}

DEBT_SEEN=""
DEBT_HIT=""
is_debt() {
  local f="$1" ln="$2" text="$3"
  local decl
  decl="$(norm_decl "$text")"
  for entry in ${DEBT[@]+"${DEBT[@]}"}; do
    local ef="${entry%%|*}" rest="${entry#*|}"
    local ed="${rest%%|*}" rest2="${rest#*|}"
    local date="${rest2%%|*}" why="${rest2#*|}"
    if [[ "$ef" == "$f" && "$decl" == *"$ed"* ]]; then
      # ${ln} 要加大括號：變數後直接接全形字元，bash 會把全形字元讀進變數名。
      DEBT_SEEN+="\n  $f:${ln}（${date} 掛號）${why}"
      DEBT_HIT+="|$ef::$ed"
      return 0
    fi
  done
  return 1
}

# 清單對賬：條目在掃描範圍內對不上任何一行 = 那條可能已經還清 / 檔案改了。
# 這道是 2026-08-28 補的——本輪就是因為沒有它，一條掛了一個月的債漂掉之後
# 被當成新違反查了半天。
report_stale_entries() {
  local stale=""
  local entry ef rest ed
  for entry in ${ALLOWLIST[@]+"${ALLOWLIST[@]}"}; do
    ef="${entry%%|*}"; rest="${entry#*|}"; ed="${rest%%|*}"
    _in_scan_scope "$ef" || continue
    [[ "$ALLOW_HIT" == *"|$ef::$ed"* ]] || stale+="\n  [allowlist] $ef｜$ed"
  done
  for entry in ${DEBT[@]+"${DEBT[@]}"}; do
    ef="${entry%%|*}"; rest="${entry#*|}"; ed="${rest%%|*}"
    _in_scan_scope "$ef" || continue
    [[ "$DEBT_HIT" == *"|$ef::$ed"* ]] || stale+="\n  [debt] $ef｜$ed"
  done
  if [[ -n "$stale" ]]; then
    echo ""
    echo "🧾 清單裡有條目對不上任何一行（可能已還清，或宣告被改寫）："
    echo -e "$stale"
    echo "   → 核對後從 ALLOWLIST / DEBT 移除，別讓死條目留著"
  fi
}

_in_scan_scope() {
  local target="$1" f
  for f in "${FILES[@]}"; do [[ "$f" == "$target" ]] && return 0; done
  return 1
}

# ── 收集要掃描的檔案 ─────────────────────────────────────────────────────────
if [[ "$MODE" == "--staged" ]]; then
  STAGED=$(git diff --cached --name-only --diff-filter=ACM || true)
  FILES=()
  for f in "${SURFACE[@]}"; do
    if grep -qxF "$f" <<<"$STAGED"; then FILES+=("$f"); fi
  done
else
  FILES=("${SURFACE[@]}")
fi

if [[ ${#FILES[@]} -eq 0 ]]; then
  echo "✅ 沒有受守護的檔案在這次變更裡"
  exit 0
fi

VIOLATIONS=0
VIOLATION_LIST=""

scan_file() {
  local f="$1" kind="$2"
  shift 2
  local patterns=("$@")
  for pattern in "${patterns[@]}"; do
    # 註解行不執行，不算違反（沿用 check-hardcoded-langs.sh 的處理）。
    local matches
    matches=$(grep -nE "$pattern" "$f" 2>/dev/null \
      | grep -vE '^[0-9]+:[[:space:]]*(//|/\*|\*|#)' \
      || true)
    [[ -z "$matches" ]] && continue
    while IFS= read -r line; do
      [[ -z "$line" ]] && continue
      local ln="${line%%:*}"
      local text="${line#*:}"
      is_allowlisted "$f" "$ln" "$text" && continue
      is_debt "$f" "$ln" "$text" && continue
      VIOLATIONS=$((VIOLATIONS + 1))
      VIOLATION_LIST+="\n  [$kind] $f:$line"
    done <<<"$matches"
  done
}

for f in "${FILES[@]}"; do
  [[ ! -f "$f" ]] && continue
  scan_file "$f" css "${CSS_PATTERNS[@]}"
  scan_file "$f" tw "${TW_PATTERNS[@]}"
done

if [[ $VIOLATIONS -gt 0 ]]; then
  echo "🚨 發現 $VIOLATIONS 個 RTL-unsafe 的 physical directional 樣式："
  echo -e "$VIOLATION_LIST"
  echo ""
  echo "💡 修法：改用 logical property（LTR 下 used value 完全相同，"
  echo "   所以中英日韓西法既有頁面零變化）："
  echo ""
  echo "     margin-left        → margin-inline-start"
  echo "     padding-left       → padding-inline-start"
  echo "     border-left        → border-inline-start"
  echo "     border-left-color  → border-inline-start-color"
  echo "     text-align: left   → text-align: start"
  echo "     left: X            → inset-inline-start: X"
  echo "     left: X; right: X  → inset-inline: X"
  echo "     border-radius: 0 8px 8px 0"
  echo "                        → border-start-start-radius: 0;"
  echo "                          border-start-end-radius: 8px;  (…end-end / end-start)"
  echo ""
  echo "   Tailwind v4：pl-→ps- / pr-→pe- / ml-→ms- / mr-→me- /"
  echo "                border-l→border-s / text-left→text-start / left-N→start-N"
  echo ""
  echo "   置中（left:50% + 同區塊 translateX(-50%)）本腳本會自動放行，"
  echo "   不必列清單。其他真的沒有方向性的用法才加進 ALLOWLIST，"
  echo "   格式是「檔案｜宣告文字｜理由」，不要用行號。"
  echo ""
  echo "   Why：ar 是站上第一個 RTL 語言（2026-07-25 出生）。"
  echo "   Audit canonical：reports/language-birth-2026-07-25.md §RTL findings"

  report_stale_entries

  if [[ "$MODE" == "--ci" ]] || [[ "$MODE" == "--staged" ]]; then
    exit 1
  fi
  exit 0
fi

report_stale_entries

if [[ -n "$DEBT_SEEN" ]]; then
  echo "🧾 掛號中的 RTL 債（不擋，但別讓它過夜變成慣例）："
  echo -e "$DEBT_SEEN"
  echo ""
fi

echo "✅ 受守護表面（${#FILES[@]} 檔）無 RTL-unsafe physical directional 樣式"
exit 0
