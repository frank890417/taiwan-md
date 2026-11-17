#!/bin/bash
# App 內容包產線：knowledge/ → 13 語 SQLite（LZMA）＋ index.json，選擇性發到 GitHub Release「app-packs」。
# 契約：reports/ios-app-implementation-plan-2026-11-02.md §四、§八
#   bash scripts/app/build-app-packs.sh [--publish] [--out <dir>] [--langs zh-TW,en]
set -euo pipefail
cd "$(dirname "$0")/../.."
PUBLISH=0
OUT=""
LANGS=""
while [ $# -gt 0 ]; do
  case "$1" in
    --publish) PUBLISH=1 ;;
    --out) OUT="$2"; shift ;;
    --langs) LANGS="$2"; shift ;;
    *) echo "未知參數 $1"; exit 2 ;;
  esac
  shift
done
OUT="${OUT:-$(mktemp -d)/app-packs}"
mkdir -p "$OUT/nd" "$OUT/packs"
COMMIT="$(git rev-parse --short HEAD)"

echo "① 渲染（網站同一支 renderArticleHtml）"
node scripts/app/render.mjs --out "$OUT/nd" ${LANGS:+--langs "$LANGS"} 2>&1 | grep -v -i experimental

echo "② 打包 SQLite＋LZMA"
python3 scripts/app/pack.py --nd "$OUT/nd" --out "$OUT/packs" --commit "$COMMIT"

echo "③ 對賬：每語篇數 vs knowledge/ 檔數（差超過 1% 就失敗）"
python3 - "$OUT/packs/index.json" <<'PY'
import json, os, sys
idx = json.load(open(sys.argv[1]))
cats = ['About','History','Geography','Culture','Food','Art','Music','Technology','Nature','People','Politics','Society','Economy','Lifestyle']
bad = 0
for lang, p in sorted(idx['packs'].items()):
    base = 'knowledge' if lang == 'zh-TW' else f'knowledge/{lang}'
    n = sum(1 for c in cats if os.path.isdir(f'{base}/{c}') for f in os.listdir(f'{base}/{c}') if f.endswith('.md') and not f.startswith('_'))
    ok = abs(p['articles'] - n) <= max(1, n // 100)
    bad += not ok
    print(f"  {'✅' if ok else '❌'} {lang}: 包 {p['articles']} / 檔 {n}，{p['bytes'] / 1e6:.1f} MB")
sys.exit(1 if bad else 0)
PY

if [ "$PUBLISH" = 1 ]; then
  echo "④ 發到 GitHub Release app-packs"
  if ! gh release view app-packs >/dev/null 2>&1; then
    gh release create app-packs --prerelease --latest=false --title "App content packs" \
      --notes "Taiwan.md iOS App 的離線內容包（每語一個 SQLite，LZMA 壓縮）。由 scripts/app/build-app-packs.sh 產生，資產會被每日覆蓋。內容授權 CC BY-SA 4.0。"
  fi
  # 先傳內容包、最後才傳 index.json，App 看到新指標時包已經就位
  gh release upload app-packs "$OUT"/packs/pack-*.sqlite.lzma --clobber
  gh release upload app-packs "$OUT/packs/index.json" --clobber
  echo "✅ 已發佈：https://github.com/frank890417/taiwan-md/releases/tag/app-packs"
fi
echo "輸出：$OUT/packs"
