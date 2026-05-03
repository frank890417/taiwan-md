#!/usr/bin/env bash
# footnote-format-fix.sh — shell wrapper 包裝 footnote-format-fix.py
#
# 把多種 footnote 源格式統一轉成 Taiwan.md canonical：
#   `[^N]: [Title](URL) — desc（描述至少 10 字）`
#
# 處理 4 種源格式：
#   1. Markdown 缺 desc
#   2. APA 學術格式
#   3. 中文標點 〈Title〉，URL
#   4. Angle-bracket URL `(<URL>)`
#
# 預設 dry-run，需 `--apply` 才寫入。
#
# 範例：
#   bash scripts/tools/footnote-format-fix.sh --all                        # 全 knowledge/ dry-run
#   bash scripts/tools/footnote-format-fix.sh --all --apply                # 全 knowledge/ 實際 fix
#   bash scripts/tools/footnote-format-fix.sh --apply knowledge/X/Y.md     # 單檔 fix
#   gh pr diff 789 --name-only | bash scripts/tools/footnote-format-fix.sh --stdin --apply
#
# 對應 DNA #5 / #15 / #48（候選）+ MAINTAINER-PIPELINE §quick fix 清單
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
exec python3 "$SCRIPT_DIR/footnote-format-fix.py" "$@"
