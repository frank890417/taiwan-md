#!/usr/bin/env bash
# verify-commit-scope.sh — commit 範圍自檢（胼胝體鐵律 commit 防線 / cross-session-git-index-pollution vc=2）
#
# 多核心並行時 git index / working tree 是共享的。「我」commit 前後都可能掃進
# 別 session 的檔（誤掃 977 untracked）或誤刪 sibling 在用的檔（phantom delete）。
# 這支驗 staged / committed 的檔數 == 我預期的數，不對就 fail-loud。
#
# 用法:
#   bash .../verify-commit-scope.sh --staged <expected>   # commit 前驗 index
#   bash .../verify-commit-scope.sh --head   <expected>   # commit 後驗 HEAD（含 phantom-delete 檢查）
#   bash .../verify-commit-scope.sh --staged              # 不給 expected → 只印清單供人眼確認
#
# --head 另外清「索引殘影」（2026-09-27 self-evolve-weekly，REFLEXES #100 (e)）：
#   pathspec commit（`git commit -- <paths>`）時 lint-staged 在暫存索引上跑 prettier，
#   HEAD 與工作樹拿到格式化後的版本，原索引卻留著格式化前的 blob → `git status` 呈 MM。
#   下一個不帶 pathspec 的 commit（常是平行的 babel）會把那份舊 blob 帶進 git，
#   等於把格式化倒退回去，或在範圍閘門喊「疑似跨 session 污染」。
#   處置：只看 HEAD 這個 commit 碰過的檔，工作樹 == HEAD 而索引 != HEAD 的，
#   `git reset -q -- <path>` 讓索引回到 HEAD。工作樹不動，不會丟任何人的內容。
#   四次（08-10 feedback-triage、09-24 data-refresh-am＋embeddings 同一早、09-25）。
#
# exit: 0=scope 對 / 1=mismatch 或有 phantom delete / 2=usage
set -uo pipefail
cd "$(git rev-parse --show-toplevel 2>/dev/null)" || { echo "ERROR not-a-git-repo"; exit 2; }

mode="${1:-}"; expected="${2:-}"
case "$mode" in
  --staged)
    files="$(git diff --cached --name-only --diff-filter=ACMR 2>/dev/null || true)"
    dels="$(git diff --cached --name-only --diff-filter=D 2>/dev/null | grep -c . || true)"
    label="staged" ;;
  --head)
    files="$(git show HEAD --name-only --format="" --diff-filter=ACMR 2>/dev/null | grep -v '^$' || true)"
    dels="$(git show HEAD --name-only --format="" --diff-filter=D 2>/dev/null | grep -c . || true)"
    label="HEAD" ;;
  *) echo "usage: $0 --staged|--head [expected_count]"; exit 2 ;;
esac

count="$(printf '%s\n' "$files" | grep -c . || true)"; count="${count:-0}"; dels="${dels:-0}"
echo "scope（${label}）: ${count} 檔 / ${dels} deletions（expected: ${expected:-未指定}）"
[ "$count" -gt 0 ] && printf '%s\n' "$files" | sed 's/^/  + /'
[ "$dels" -gt 0 ] && git show HEAD --name-only --format="" --diff-filter=D 2>/dev/null | grep . | sed 's/^/  - DEL /' 2>/dev/null || true

rc=0
if [ -n "$expected" ] && [ "$count" -ne "$expected" ]; then
  echo "❌ SCOPE MISMATCH（${count} ≠ ${expected}）— 疑似 cross-session 污染，停下檢查"
  rc=1
fi
if [ "$dels" -gt 0 ]; then
  echo "⚠️ ${dels} 個 deletion 在範圍內 — 確認不是 phantom-delete 掉 sibling 在用的檔（vc=2 根因）"
  [ "$rc" -eq 0 ] && rc=1
fi
if [ "$mode" = "--head" ] && [ "$count" -gt 0 ]; then
  residue=0
  while IFS= read -r f; do
    [ -z "$f" ] && continue
    [ -e "$f" ] || continue
    if git diff --quiet HEAD -- "$f" 2>/dev/null && ! git diff --cached --quiet HEAD -- "$f" 2>/dev/null; then
      git reset -q -- "$f" && echo "  🧹 索引殘影已清：$f（工作樹 == HEAD，索引留著格式化前的 blob）"
      residue=$((residue + 1))
    fi
  done <<< "$files"
  [ "$residue" -gt 0 ] && echo "🧹 ${residue} 檔索引殘影已清（pathspec commit 後 lint-staged 留下的舊 blob，REFLEXES #100 (e)）"
fi

[ "$rc" -eq 0 ] && echo "✅ scope OK"
exit "$rc"
