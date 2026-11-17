#!/bin/bash
# 出新版到 TestFlight（照 muse-pocket tools/testflight.sh 280f996 的流程）。在 MacBook Pro 上跑：
#   bash apps/ios/tools/testflight.sh [--archive-only] [<packs 目錄>]
# ① 內建三包＋網站樣式同步 ② Release archive（build 號＝時間）③ 匯出 ipa ④ App Store Connect API 金鑰上傳
# 規矩：只開內部測試、不送審。金鑰只帶路徑與編號，不讀內容。
set -euo pipefail
cd "$(dirname "$0")/.."
export DEVELOPER_DIR=/Applications/Xcode.app/Contents/Developer   # 27.1；命令列預設的 26.5 傳不了
ARCHIVE_ONLY=0
if [ "${1:-}" = "--archive-only" ]; then ARCHIVE_ONLY=1; shift; fi
PACKS="${1:-}"
OUT="${TMPDIR:-/tmp}/taiwanmd-testflight-$(date +%Y%m%d-%H%M%S)"
BUILD="$(date +%y%m%d%H%M)"
mkdir -p "$OUT"

echo "① 內建內容包與網站樣式"
bash tools/seed-packs.sh ${PACKS:+"$PACKS"} > "$OUT/seed.log"
bash tools/sync-web-assets.sh
bash tools/gen-project.sh > "$OUT/gen.log"

echo "② archive（build ${BUILD}）"
xcodebuild -project TaiwanMD.xcodeproj -scheme TaiwanMD -configuration Release \
  -destination 'generic/platform=iOS' -archivePath "$OUT/TaiwanMD.xcarchive" \
  -allowProvisioningUpdates CURRENT_PROJECT_VERSION="$BUILD" archive > "$OUT/archive.log" 2>&1 \
  || { grep -E "error:" "$OUT/archive.log" | head; echo "❌ archive 失敗：$OUT/archive.log"; exit 1; }
echo "   archive：$OUT/TaiwanMD.xcarchive"
[ "$ARCHIVE_ONLY" = 1 ] && exit 0

echo "③ 匯出 ipa"
sed 's#<string>upload</string>#<string>export</string>#; /manageAppVersionAndBuildNumber/d' tools/ExportOptions-testflight.plist > "$OUT/export.plist"
xcodebuild -exportArchive -archivePath "$OUT/TaiwanMD.xcarchive" -exportOptionsPlist "$OUT/export.plist" \
  -exportPath "$OUT/ipa" -allowProvisioningUpdates > "$OUT/export.log" 2>&1 \
  || { grep -E "error:" "$OUT/export.log" | head; echo "❌ 匯出 ipa 失敗：$OUT/export.log"; exit 1; }
IPA="$(ls "$OUT"/ipa/*.ipa | head -1)"

echo "④ 上傳（App Store Connect API 金鑰）"
KID="$(python3 -c 'import json,os;print(json.load(open(os.path.expanduser("~/.muse/secrets/asc.json")))["key_id"])')"
ISS="$(python3 -c 'import json,os;print(json.load(open(os.path.expanduser("~/.muse/secrets/asc.json")))["issuer"])')"
if xcrun altool --upload-app -f "$IPA" -t ios --api-key "$KID" --api-issuer "$ISS" > "$OUT/altool.log" 2>&1; then
  echo "✅ 已上傳 build ${BUILD}，App Store Connect 處理約 5–15 分鐘後出現在 TestFlight"
else
  grep -iE "error|fail" "$OUT/altool.log" | head -5
  echo "❌ 上傳失敗：$OUT/altool.log（ipa 在 ${IPA}，可用 Transporter 手動傳）"
  exit 1
fi
