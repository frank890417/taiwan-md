#!/usr/bin/env bash
# make-spore.sh — 一鍵產孢子附圖（+ 自動開預覽 + 印 blueprint 文案）
#
# 用法：
#   bash scripts/tools/make-spore.sh /people/李洋/                  # 預設 landscape + square
#   bash scripts/tools/make-spore.sh /lifestyle/台灣高鐵/ --size vertical
#   bash scripts/tools/make-spore.sh /people/李洋/ --all            # 三張全產
#   bash scripts/tools/make-spore.sh /people/李洋/ --prod           # 不用 dev server
#   bash scripts/tools/make-spore.sh /people/李洋/ --title "..." --desc "..."
#
# 預設行為（2026-04-19 升級）：
#   一次產 landscape + square 兩張 — landscape 給 X / Threads feed，
#   square 給 Threads 預覽不裁切。指定 --size X 只產那張。
#
# 產完自動：
#   1. open -a Preview 打開所有產出的 PNG（上下鍵切換）
#   2. open -R 讓 Finder 視窗標示檔案位置
#   3. 若 docs/factory/SPORE-BLUEPRINTS/*{slug}*.md 存在 → 印出文案區塊
#
# DNA #26 v2 合規：AI 自主產圖 + 印文案，發文仍是 human only。

set -euo pipefail

TARGET=""
EXPLICIT_SIZE=""     # if set, only produce this one
PRODUCE_ALL=0        # if set, produce landscape + square + vertical
USE_PROD=0
TITLE_OVERRIDE=""
DESC_OVERRIDE=""

# Parse args: first positional is target; --flag args pass through
while [[ $# -gt 0 ]]; do
  case "$1" in
    --size) EXPLICIT_SIZE="$2"; shift 2 ;;
    --all) PRODUCE_ALL=1; shift ;;
    --prod) USE_PROD=1; shift ;;
    --title) TITLE_OVERRIDE="$2"; shift 2 ;;
    --desc) DESC_OVERRIDE="$2"; shift 2 ;;
    landscape|square|vertical) EXPLICIT_SIZE="$1"; shift ;;  # backward compat: 2nd positional
    -h|--help)
      sed -n '1,20p' "$0" | sed 's/^# \{0,1\}//'
      exit 0 ;;
    *)
      if [[ -z "$TARGET" ]]; then TARGET="$1"; else
        echo "未知參數: $1" >&2; exit 2
      fi
      shift ;;
  esac
done

if [[ -z "$TARGET" ]]; then
  echo "用法: bash $0 <article-path-or-url> [--size X] [--all] [--prod] [--title ...] [--desc ...]" >&2
  echo "預設: 產 landscape + square 兩張" >&2
  echo "範例: bash $0 /people/李洋/                    # landscape + square" >&2
  echo "      bash $0 /people/李洋/ --size vertical   # 僅 vertical" >&2
  echo "      bash $0 /people/李洋/ --all             # 三張全產" >&2
  echo "      bash $0 /people/李洋/ --prod            # 不用 dev server" >&2
  exit 2
fi

# Decide size list
if [[ -n "$EXPLICIT_SIZE" ]]; then
  SIZES=("$EXPLICIT_SIZE")
elif [[ $PRODUCE_ALL -eq 1 ]]; then
  SIZES=(landscape square vertical)
else
  SIZES=(landscape square)
fi

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$REPO_ROOT"

# ── Detect dev port from .claude/launch.json ────────────────────────────────
# 為什麼：launch.json 是 Claude Preview 的 SSOT，工程師可能改 port 避衝突。
# wrapper 寫死 4321 會跟非預設 port 跑的 dev server 失準（黃魚鴞 #59 教訓：
# 4322 dev server 跑著、wrapper 連 4321 拿到別 instance 的 404 → 圖全錯）。
# 找 name=="taiwan-md" 的 config 取 port，找不到 fallback 4321。
DEV_PORT=4321
if [[ -f .claude/launch.json ]]; then
  detected=$(python3 -c '
import json, sys
try:
    cfg = json.load(open(".claude/launch.json"))
    for c in cfg.get("configurations", []):
        if c.get("name") == "taiwan-md" and c.get("port"):
            print(c["port"]); sys.exit(0)
except Exception:
    pass
' 2>/dev/null || true)
  [[ -n "$detected" ]] && DEV_PORT="$detected"
fi
DEV_BASE="http://localhost:${DEV_PORT}"

# ── Extract slug (shared across sizes) ──────────────────────────────────────
BASE_GEN_ARGS=()
if [[ "$TARGET" == http* ]]; then
  BASE_GEN_ARGS+=(--url "$TARGET")
  SLUG="$(echo "$TARGET" | sed -E 's|.*/([^/]+)/?$|\1|' | python3 -c 'import sys, urllib.parse; print(urllib.parse.unquote(sys.stdin.read().strip()))')"
else
  BASE_GEN_ARGS+=(--path "$TARGET")
  SLUG="$(echo "$TARGET" | sed -E 's|.*/([^/]+)/?$|\1|')"
fi
[[ $USE_PROD -eq 1 ]] && BASE_GEN_ARGS+=(--prod)
[[ $USE_PROD -eq 0 ]] && BASE_GEN_ARGS+=(--base "$DEV_BASE")
[[ -n "$TITLE_OVERRIDE" ]] && BASE_GEN_ARGS+=(--title "$TITLE_OVERRIDE")
[[ -n "$DESC_OVERRIDE" ]] && BASE_GEN_ARGS+=(--desc "$DESC_OVERRIDE")

# ── Check dev server is up (skipped when --prod) ────────────────────────────
if [[ $USE_PROD -eq 0 ]]; then
  if ! curl -sI -o /dev/null --max-time 3 "$DEV_BASE/"; then
    echo "⚠️  dev server 沒在跑（$DEV_BASE）" >&2
    echo "    先在另一個 terminal 跑: npm run dev（或用 --prod 直接打 taiwan.md）" >&2
    exit 3
  fi
fi

# ── Run generator for each requested size ───────────────────────────────────
PRODUCED=()
for size in "${SIZES[@]}"; do
  OUT="public/spore-images/${SLUG}-${size}.png"
  echo "🎬 [$size] 產圖中..."
  node scripts/tools/generate-spore-image.mjs "${BASE_GEN_ARGS[@]}" --size "$size"
  if [[ -f "$OUT" ]]; then
    PRODUCED+=("$OUT")
  else
    echo "❌ $size 沒產出，預期位置: $OUT" >&2
  fi
  echo ""
done

if [[ ${#PRODUCED[@]} -eq 0 ]]; then
  echo "❌ 無任何圖產出" >&2
  exit 1
fi

# ── Open Preview.app with all produced PNGs + highlight in Finder ───────────
echo "🖼  開啟 ${#PRODUCED[@]} 張預覽 (Preview.app + Finder)"
open -a Preview "${PRODUCED[@]}" 2>/dev/null || open "${PRODUCED[@]}"
open -R "${PRODUCED[0]}" 2>/dev/null || true

# ── Find & print blueprint copy if exists ───────────────────────────────────
BLUEPRINT="$(find docs/factory/SPORE-BLUEPRINTS -type f -name "*${SLUG}*.md" 2>/dev/null | head -1 || true)"
if [[ -n "$BLUEPRINT" ]]; then
  echo ""
  echo "📝 找到 blueprint: $BLUEPRINT"
  echo "───────────────────────────────────────"
  cat "$BLUEPRINT"
  echo "───────────────────────────────────────"
else
  echo ""
  echo "ℹ️  無對應 blueprint (docs/factory/SPORE-BLUEPRINTS/*${SLUG}*.md)"
  echo "   文案請自備。"
fi

echo ""
echo "✅ 完成。產出："
for p in "${PRODUCED[@]}"; do echo "   → $p"; done
echo ""
echo "下一步："
echo "   1. 檢查 Preview 窗的圖對不對"
echo "   2. 若 OK → 從 Finder 拖圖到 Threads/X + 貼文案 + 發"
echo "   3. 發完記得在 SPORE-LOG.md 加一列（URL 必填）"
