#!/bin/bash
# App Store 截圖（6.9 吋，iPhone 17 Pro Max 模擬器，1320×2868）。用啟動參數直接切到每個畫面。
#   bash apps/ios/tools/screenshots.sh [輸出目錄]
set -euo pipefail
cd "$(dirname "$0")/.."
export DEVELOPER_DIR=/Applications/Xcode.app/Contents/Developer
OUT="${1:-store/screenshots}"
DEV="iPhone 17 Pro Max"
UDID="$(xcrun simctl list devices available | grep -m1 "$DEV (" | sed -E 's/.*\(([0-9A-F-]{36})\).*/\1/')"
mkdir -p "$OUT"

xcrun simctl boot "$UDID" 2>/dev/null || true
xcrun simctl bootstatus "$UDID" -b >/dev/null
xcodebuild -project TaiwanMD.xcodeproj -scheme TaiwanMD -configuration Debug \
  -destination "platform=iOS Simulator,id=$UDID" -derivedDataPath build/dd build > build/screens-build.log 2>&1 \
  || { grep error: build/screens-build.log | head; exit 1; }
APP=build/dd/Build/Products/Debug-iphonesimulator/TaiwanMD.app
xcrun simctl install "$UDID" "$APP"
xcrun simctl ui "$UDID" appearance light
xcrun simctl status_bar "$UDID" override --time 9:41 --dataNetwork wifi --wifiMode active --wifiBars 3 \
  --cellularMode active --cellularBars 4 --batteryState charged --batteryLevel 100

shot() {  # 檔名 等待秒數 啟動參數…
  local name="$1" wait="$2"; shift 2
  xcrun simctl terminate "$UDID" md.taiwan.app 2>/dev/null || true
  xcrun simctl launch "$UDID" md.taiwan.app "$@" >/dev/null
  sleep "$wait"
  xcrun simctl io "$UDID" screenshot --type=png "$OUT/$name.png" >/dev/null 2>&1
  echo "  $OUT/$name.png"
}

# 第一次啟動先解壓內容包
xcrun simctl launch "$UDID" md.taiwan.app >/dev/null; sleep 8
shot 1-today 4 -TWLang zh-TW -TWPickKey "Food/台灣早餐文化"
shot 2-article 6 -TWLang zh-TW -TWArticle "Music/落日飛車"
shot 3-search 5 -TWLang zh-TW -TWTab search -TWSearch "茶"
shot 4-timeline 3 -TWLang zh-TW -TWTab explore -TWOpen timeline
shot 5-japanese 6 -TWLang ja -TWArticle "Culture/群島思維"
xcrun simctl status_bar "$UDID" clear
echo "✅ 截圖完成"
