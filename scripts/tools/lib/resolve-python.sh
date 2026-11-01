#!/usr/bin/env bash
# resolve-python.sh — 找出可用的 Python 3.11+ 直譯器（hooks 與 CI 共用）
#
# 為什麼需要這一支：
#   article-health.py 的 config loader 用 `import tomllib`（Python 3.11+ 的 stdlib），
#   check-canonical-frontmatter.py 用 PEP 604 註解（`dict | None`，Python 3.10+）。
#   macOS 系統自帶的 /usr/bin/python3 是 **3.9**（Apple 不隨 OS 更新 Python），
#   所以在沒有 homebrew python 的貢獻者機器上，這兩支工具會直接 crash：
#
#     ModuleNotFoundError: No module named 'tomllib'
#     TypeError: unsupported operand type(s) for |: 'type' and 'NoneType'
#
#   崩潰的 exit code 是 1，而 hook 把「exit != 0」一律解讀成「內容違規」，
#   於是 push 被擋下來，訊息卻是「本次改動的 knowledge/*.md 有 HARD fail」——
#   **完全指錯方向**：跟文章的內容毫無關係，是環境問題被誤診成內容問題。
#   這比沒有 gate 更糟：貢獻者會去改一個根本沒問題的文章，
#   或者更常見地，直接用 --no-verify 繞過（等於把所有閘門一起關掉）。
#
# 這支 lib 讓 hook 在**執行前**先解析出真正能用的直譯器：
#   1. 逐一試過候選直譯器（依優先序），用一個能區分「太舊」與「壞掉」的 probe 驗證
#   2. 找不到 ≥3.11 的 → 印出**可執行的**診斷（而不是誤診成內容違規）並以專屬 exit code 結束
#   3. 找到 → 印出該直譯器路徑（供呼叫端 eval/使用）
#
# 用法：
#   PY="$(bash scripts/tools/lib/resolve-python.sh)"   # 印直譯器路徑；找不到則 exit 3
#   case $? in 0) python3 "$PY" ... ;; 3) echo "裝個新 python" ;; esac
#
# exit: 0=找到（stdout 印直譯器絕對路徑） / 3=找不到 ≥3.11 的直譯器
#
# 探針設計：不用 `import tomllib` 當唯一條件——那是單一功能的相依，
# 過度綁定。改用 `sys.version_info >= (3, 11)` 當版本地板，
# 因為它正是這套工具鏈的實際最低需求（tomllib + PEP 604 註解）。
#
# canonical: BECOME §行動鐵律 5（工具不可用 → fail-loud 但不誤診）
# 相關 issue: #1299（同族的「閘門 crash 被誤讀成政策違規」）

set -uo pipefail

# 候選優先序：
#   1. TWMD_PYTHON（環境覆寫，給 CI / 特殊環境用）
#   2. python3.13 / python3.12 / python3.11（版本明確的 homebrew / pyenv / conda）
#   3. python3（可能太舊 → probe 會擋掉）
#   4. /opt/homebrew/bin/python3、/usr/local/bin/python3（Apple Silicon / Intel homebrew）
#   5. /usr/bin/python3（macOS 系統自帶，通常太舊 → probe 會擋掉）
#   6. pyenv shims
for d in "${HOME:-}/.pyenv/shims" /opt/homebrew/bin /usr/local/bin /usr/bin /bin; do
  [ -d "$d" ] && PATH="$PATH:$d"
done
export PATH

# ── 版本地板 ────────────────────────────────────────────────────────────
# 這套工具鏈的最低需求：tomllib（3.11+ stdlib）。
# 提到 3.11 而不是 3.10：3.10 雖有 PEP 604 註解但沒有 tomllib，
# config loader 會在 import 階段就炸，partial 支援等於沒有支援。
MIN_PY_MINOR=11

# 探針：真正 import 一個 3.11+ stdlib 模組，並確認版本地板。
# 走 import 而非只讀 sys.version_info，是因為「版本號對但安裝損壞」也要擋掉。
_probe_ok() {
  "$1" -c "import sys, tomllib; sys.exit(0 if sys.version_info >= (3, ${MIN_PY_MINOR}) else 1)" >/dev/null 2>&1
}

_candidates() {
  [ -n "${TWMD_PYTHON:-}" ] && printf '%s\n' "${TWMD_PYTHON}"
  for v in 3.14 3.13 3.12 3.11; do
    command -v "python${v}" 2>/dev/null
  done
  command -v python3 2>/dev/null
  for d in /opt/homebrew/bin /usr/local/bin /usr/bin /bin; do
    [ -x "$d/python3" ] && printf '%s\n' "$d/python3"
  done
}

# TWMD_PYTHON 是**明確覆寫**：指定了就是 SSOT，不該再偷偷換成別的直譯器。
# 呼叫端（CI、特殊環境）拿它當權威；這裡若靜默 fallback，
# 「我指定了 3.11 但實際跑的是 3.14」會是一個沒人發現的環境漂移。
# 指定了但**過不了版本地板** → 直接報錯，不 fallback：
# 呼叫端要嘛給對版本，要嘛不給；悄悄換一個會讓診斷資訊失真。
if [ -n "${TWMD_PYTHON:-}" ]; then
  _explicit="$(command -v "$TWMD_PYTHON" 2>/dev/null || true)"
  if [ -z "$_explicit" ]; then
    echo "" >&2
    echo "🧬 TWMD_PYTHON 指向的直譯器不存在：${TWMD_PYTHON}" >&2
    echo "   請修正這個環境變數，或取消它讓 hook 自動搜尋。" >&2
    echo "" >&2
    exit 3
  fi
  if _probe_ok "$_explicit"; then
    printf '%s\n' "$_explicit"
    exit 0
  fi
  echo "" >&2
  echo "🧬 TWMD_PYTHON 指向的直譯器版本太舊（需要 3.11+）：${_explicit}" >&2
  echo "   實際版本：$("$_explicit" -V 2>&1)" >&2
  echo "" >&2
  exit 3
fi

FOUND=""
while IFS= read -r cand; do
  [ -n "$cand" ] || continue
  case "$cand" in
    /*) [ -x "$cand" ] || continue ;;
    *) cand="$(command -v "$cand" 2>/dev/null)" || continue ;;
  esac
  [ -n "$cand" ] || continue
  if _probe_ok "$cand"; then
    FOUND="$cand"
    break
  fi
done <<EOF
$(_candidates)
EOF

if [ -n "$FOUND" ]; then
  printf '%s\n' "$FOUND"
  exit 0
fi

# ── 找不到：fail-loud，且訊息必須指向「環境」，不是「內容」 ──────────────
cat >&2 <<'EOF'

🧬 閘門無法執行：這台機器上找不到 Python 3.11 或更新版本的直譯器。

這 **不是** 你的文章有問題，是環境缺了一個執行器。閘門在缺少執行器時
跳過檢查，而不是把你的文章判成違規。

為什麼需要 3.11+：
  · article-health.py 的設定檔讀取用 `import tomllib`（3.11+ 的標準函式庫）
  · check-canonical-frontmatter.py 用 PEP 604 型別註解（`dict | None`，3.10+）

常見情況：macOS 系統自帶的 /usr/bin/python3 停在 3.9（Apple 不隨 OS 更新 Python），
必須另外裝一個新的。

解法（任選其一）：
  1. Homebrew（macOS 建議）：
       brew install python@3.12
       # 然後讓 hook 找得到它：
       export TWMD_PYTHON="$(brew --prefix python@3.12)/bin/python3.12"
  2. pyenv：
       pyenv install 3.12 && pyenv global 3.12
  3. 一次性跳過（CI 仍會擋）：
       TWMD_SKIP_PREPUSH_SWEEP=1 git push ...

EOF

exit 3
