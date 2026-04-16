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
