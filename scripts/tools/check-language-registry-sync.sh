#!/usr/bin/env bash
# check-language-registry-sync.sh
#
# 確認 src/config/languages.ts 和 languages.mjs 的 LANGUAGES 列表同步。
# 兩者的 code 列表必須一致。pre-commit hook 應該跑這個。
#
# 為什麼有兩份檔案：Vite SSR prerender chunks 會 bundle .mjs 但破壞 filesystem
# 相對路徑，所以不能用 readFileSync 讀 JSON。最可靠的方式是兩個檔案都 inline 資料。
set -uo pipefail
cd "$(dirname "$0")/../.."

# Extract codes from .ts (regex: code: '...')
TS_CODES=$(grep -oE "code: '[^']+'" src/config/languages.ts | sed "s/code: '//;s/'$//" | sort | tr '\n' ',' | sed 's/,$//')

# Extract codes from .mjs
MJS_CODES=$(grep -oE "code: '[^']+'" src/config/languages.mjs | sed "s/code: '//;s/'$//" | sort | tr '\n' ',' | sed 's/,$//')

if [[ "$TS_CODES" != "$MJS_CODES" ]]; then
  echo "❌ Language registry drift detected!"
  echo "   languages.ts codes:  $TS_CODES"
  echo "   languages.mjs codes: $MJS_CODES"
  echo ""
  echo "Both files must have the same code list. Edit BOTH when adding a language."
  exit 1
fi

echo "✅ Language registry in sync ($TS_CODES)"

# ── VIZ_STRINGS 必須覆蓋註冊表的每一個語言（2026-07-26 加）────────────────────
# 為什麼在這支腳本裡：VIZ_STRINGS 是「以語言碼為 key 的第三份 registry mirror」，
# 跟上面 .ts / .mjs 兩份是同一類東西，漂掉的後果也一樣。
#
# 實際踩過的坑：這張表的型別原本寫死六語 union，查找是
# `VIZ_STRINGS[lang] ?? VIZ_STRINGS['zh-TW']`，於是 2026-07 出生的
# vi / id / pt / hi / ar / ru 六語**靜靜退回中文**。量測到的後果：這六語的 2,052 個
# 頁面上共有 43,045 個中文 aria-label，阿拉伯文 / 印地文 / 俄文讀者的螢幕閱讀器，
# 在每一個腳註連結上都唸中文。缺翻譯會被 i18n-coverage-audit 抓到，
# 這種「有接縫但表裡沒這一列」的漂移不會，因為 `??` 讓它永遠有值、永不報錯。
#
# 型別現在是 `Record<Lang, VizStrings>`，新語言出生會是 compile error。但本 repo
# 的 CI 沒有任何 typecheck step（無 tsc、無 astro check），所以型別只在編輯器裡
# 生效。這個檢查是它在 CI 的替身。
#
# 注意：這裡刻意**不**檢查譯文品質，只檢查「有沒有這一列」。品質是翻譯工作。
VIZ_FILE="src/utils/article-render.ts"
if [[ -f "$VIZ_FILE" ]]; then
  # 只取 VIZ_STRINGS 區塊內縮排 2 格的 key，避免撈到欄位名或其他表
  VIZ_CODES=$(awk '
    /^const VIZ_STRINGS/ { inside = 1; next }
    inside && /^};/       { inside = 0 }
    inside && match($0, /^  '"'"'?[a-zA-Z][a-zA-Z-]*'"'"'?:[[:space:]]*\{/) {
      key = $0
      gsub(/^  '"'"'?/, "", key)
      sub(/'"'"'?:[[:space:]]*\{.*$/, "", key)
      print key
    }
  ' "$VIZ_FILE" | sort | tr '\n' ',' | sed 's/,$//')

  if [[ -z "$VIZ_CODES" ]]; then
    echo "❌ 在 $VIZ_FILE 找不到 VIZ_STRINGS 的語言 key"
    echo "   這支檢查靠 awk 抓縮排 2 格的 key。如果表的形狀改了，請一起更新這裡"
    echo "   抓不到就當失敗，不要靜默通過（不然這道防線會無聲消失）。"
    exit 1
  fi

  if [[ "$VIZ_CODES" != "$TS_CODES" ]]; then
    echo "❌ VIZ_STRINGS 與語言註冊表漂移！"
    echo "   registry:    $TS_CODES"
    echo "   VIZ_STRINGS: $VIZ_CODES"
    echo ""
    echo "   後果不是報錯，是靜默退回中文：$VIZ_FILE 的查找是"
    echo "   \`VIZ_STRINGS[lang] ?? VIZ_STRINGS['zh-TW']\`，缺的語言會拿到整套中文"
    echo "   UI 字串（腳註 aria-label、資料來源前綴、圖表標籤）。"
    echo ""
    echo "   修法：在 $VIZ_FILE 的 VIZ_STRINGS 補上缺的語言，10 個欄位都要有。"
    exit 1
  fi

  echo "✅ VIZ_STRINGS 覆蓋註冊表全部語言 ($VIZ_CODES)"
fi
