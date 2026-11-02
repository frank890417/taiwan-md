#!/bin/bash
# 把網站的樣式與時間軸資料同步進 App（這些檔是網站的衍生物，改網站那邊，不改這裡）。
#   bash apps/ios/tools/sync-web-assets.sh
set -euo pipefail
cd "$(dirname "$0")/.."
REPO="$(cd ../.. && pwd)"
RES=App/Resources
mkdir -p "$RES/Web" "$RES/Data"
cp "$REPO/src/styles/tokens.css" "$RES/Web/tokens.css"
cp "$REPO/src/styles/article-modules.css" "$RES/Web/article-modules.css"
cp "$REPO/src/data/timeline-eras.json" "$RES/Data/timeline-eras.json"
echo "✅ tokens.css、article-modules.css、timeline-eras.json 已同步（來源 $(git -C "$REPO" rev-parse --short HEAD)）"
