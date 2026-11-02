#!/bin/bash
# 把內建三包（zh-TW／en／ja）與指標檔放進 App 本體。來源優先序：
#   ① 參數給的目錄（scripts/app/build-app-packs.sh 的輸出）② GitHub Release app-packs
#   bash apps/ios/tools/seed-packs.sh [<packs 目錄>]
set -euo pipefail
cd "$(dirname "$0")/.."
DEST=App/Resources/Packs
mkdir -p "$DEST"
SRC="${1:-}"
if [ -z "$SRC" ]; then
  SRC="$(mktemp -d)"
  for f in index.json pack-zh-TW.sqlite.lzma pack-en.sqlite.lzma pack-ja.sqlite.lzma; do
    curl -fsSL -o "$SRC/$f" "https://github.com/frank890417/taiwan-md/releases/download/app-packs/$f"
  done
fi
for l in zh-TW en ja; do cp "$SRC/pack-$l.sqlite.lzma" "$DEST/"; done
python3 - "$SRC/index.json" "$DEST/packs-index.json" <<'PY'
import json, sys
idx = json.load(open(sys.argv[1]))
idx['packs'] = {k: v for k, v in idx['packs'].items() if k in ('zh-TW', 'en', 'ja')}
json.dump(idx, open(sys.argv[2], 'w'), ensure_ascii=False, indent=2)
PY
ls -la "$DEST" | awk 'NR>1 {print $5, $9}'
