#!/bin/bash
# Wikimedia 圖片快取 v2 - 修正 URL 截斷問題
set -e
cd "$(dirname "$0")/.."

IMG_DIR="public/images/wiki"
mkdir -p "$IMG_DIR"

# 提取所有 URL，清理尾巴的 ' 和 )
grep -roh "https://upload.wikimedia.org/[^\"')* ]*" knowledge/ src/pages/ src/components/ 2>/dev/null \
  | sed "s/'$//" | sed 's/)$//' | sort -u > /tmp/wiki-urls-clean.txt

TOTAL=$(wc -l < /tmp/wiki-urls-clean.txt | tr -d ' ')
echo "🖼️  Wikimedia 圖片快取 v2"
echo "📊 找到 $TOTAL 個 URL"

DONE=0
SKIP=0
FAIL=0

while IFS= read -r URL; do
  HASH=$(echo "$URL" | md5 | cut -c1-12)
  EXT=$(echo "$URL" | grep -oiE '\.(jpg|jpeg|png|svg|gif)' | tail -1 | tr '[:upper:]' '[:lower:]')
  [ -z "$EXT" ] && EXT=".jpg"
  LOCAL="$IMG_DIR/${HASH}${EXT}"
  
  # 已快取就跳過
  if [ -s "$LOCAL" ]; then
    SKIP=$((SKIP + 1))
    continue
  fi
  
  # 下載
  curl -sL -o "$LOCAL" \
    -H "User-Agent: TaiwanMD/1.0 (https://taiwan.md; educational project)" \
    --max-time 15 "$URL" 2>/dev/null
  
  if [ -s "$LOCAL" ]; then
    DONE=$((DONE + 1))
    echo "  ✅ ${HASH}${EXT}"
  else
    rm -f "$LOCAL"
    FAIL=$((FAIL + 1))
    echo "  ❌ $URL"
  fi
  
  sleep 0.3
done < /tmp/wiki-urls-clean.txt

echo ""
echo "📊 結果: ✅ 新下載 $DONE | ⏭️ 已快取 $SKIP | ❌ 失敗 $FAIL"

# 統計總快取
CACHED=$(find "$IMG_DIR" -type f ! -name "*.txt" | wc -l | tr -d ' ')
SIZE=$(du -sh "$IMG_DIR" | cut -f1)
echo "📂 總快取: $CACHED 檔案 ($SIZE)"
