#!/bin/bash
# check-aspect.sh — 圖片呈現比例檢查（REWRITE-PIPELINE-SINGLE Step 4.3.3）
#
# v3（2026-10-21）：文章模板改成依原比例呈現、不裁切——寬 ≤ 欄寬（桌機 726px、
# 手機約 343px）、高 ≤ min(75vh, 640px)，等比縮、置中。比例不再是「會不會被切」
# 的閘門，這支工具改成告訴你「這張圖在頁面上會長多大」：
#   - 0.4 ≤ aspect ≤ 3.5：都能用（直式圖顯示成置中的直幅，橫式圖撐滿欄寬）
#   - 超出：極長直圖變窄柱／極寬橫幅變細帶 → 挑對的畫面或依主體重裁，不要補邊
#   - 寬 < 726px：照原寸呈現，不放大，會比欄寬窄
# hero 與內文同一套規則（`--hero` 仍接受，只影響標示）。
#
# 舊版（v2.20）hero 0.9–2.0／inline 0.75–2.5 是給舊模板 object-fit:cover 的護欄：
# 那時全站 733 張內文圖有 597 張在桌機被裁，張照堂 644×859 直式照切到頭。
#
# Usage:
#   bash scripts/tools/check-aspect.sh public/article-images/people/lindgren-emu-2014.jpg
#   bash scripts/tools/check-aspect.sh public/article-images/people/*.jpg
#
# Exit codes:
#   0 — 全部在 0.4–3.5
#   1 — 至少一張超出
#
# Canonical: REWRITE-PIPELINE-SINGLE Step 4.3.3 / image-health §1c

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
GRAY='\033[0;90m'
BOLD='\033[1m'
NC='\033[0m'

mode="inline"
min=0.4
max=3.5
COL=726       # 桌機欄寬（article.template .prose）
MAXH=640      # min(75vh, 640px) 的上限

if [ "$1" = "--hero" ]; then
  mode="hero"
  shift
fi

if [ $# -eq 0 ]; then
  echo "Usage: $0 [--hero] <image.jpg> [<image2.jpg> ...]"
  echo ""
  echo "Modes:"
  echo "  aspect ${min} ≤ r ≤ ${max} 都能用；模板依原比例呈現不裁切（hero 同規則）"
  exit 1
fi

total=0
fail=0

for img in "$@"; do
  if [ ! -f "$img" ]; then
    echo -e "${RED}❌ $img: 檔案不存在${NC}"
    fail=$((fail + 1))
    continue
  fi

  total=$((total + 1))

  # 取得尺寸（支援 sips on macOS / identify on linux）
  w=""
  h=""
  if command -v sips >/dev/null 2>&1; then
    w=$(sips -g pixelWidth "$img" 2>/dev/null | tail -1 | awk '{print $2}')
    h=$(sips -g pixelHeight "$img" 2>/dev/null | tail -1 | awk '{print $2}')
  elif command -v identify >/dev/null 2>&1; then
    dims=$(identify -format "%wx%h" "$img" 2>/dev/null)
    w=$(echo "$dims" | cut -d'x' -f1)
    h=$(echo "$dims" | cut -d'x' -f2)
  else
    echo -e "${RED}❌ 找不到 sips（macOS）或 identify（imagemagick）${NC}"
    fail=$((fail + 1))
    continue
  fi

  if [ -z "$w" ] || [ -z "$h" ]; then
    echo -e "${RED}❌ $img: 無法讀取尺寸${NC}"
    fail=$((fail + 1))
    continue
  fi

  ratio=$(python3 -c "print(round($w/$h, 3))")
  status="✅"
  color=$GREEN

  if python3 -c "import sys; sys.exit(0 if $min <= $ratio <= $max else 1)" 2>/dev/null; then
    :  # within range
  else
    status="❌"
    color=$RED
    fail=$((fail + 1))
  fi

  shown=$(python3 -c "
w,h,C,M=$w,$h,$COL,$MAXH
dw=min(w,C); dh=dw*h/w
if dh>M: dh=M; dw=dh*w/h
note='（比欄寬窄，照原寸不放大）' if w<C else ''
print(f'桌機約 {round(dw)}×{round(dh)}px{note}')")
  printf "${color}%s${NC} %s ${GRAY}(%dx%d, aspect %s → %s)${NC}\n" \
    "$status" "$img" "$w" "$h" "$ratio" "$shown"
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BOLD}📐 Aspect ratio 檢查（mode=$mode, range $min-$max）${NC}"
echo "   檢查: ${BOLD}$total${NC} 張"
if [ $fail -eq 0 ]; then
  echo -e "   ${GREEN}✅ 全部通過${NC}"
else
  echo -e "   ${RED}❌ $fail 張超範圍${NC}"
  echo -e "   ${GRAY}< ${min} 變窄柱、> ${max} 變細帶：挑對的畫面或依主體重裁，不要補邊湊比例${NC}"
fi
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

[ $fail -eq 0 ]
