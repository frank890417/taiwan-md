#!/usr/bin/env bash
# check-parallel-actor.sh — 多核心 git 協調：偵測平行 actor（胼胝體鐵律 / REFLEXES #57）
#
# 平行 session / routine / 人類共用一個 working tree + 一個 origin/main。
# 動 git（commit / push / stash / pull）前先跑這支，知道現在有沒有別人在動，
# 避免 cross-session-git-index-pollution / multi-core-commit-collision / ref-lock race。
#
# 用法:
#   bash scripts/tools/lib/check-parallel-actor.sh            # 人類可讀
#   bash scripts/tools/lib/check-parallel-actor.sh --quiet    # 只回 exit code
#   STATUS=$(... --status)                                    # 只印 status 字
#
# 輸出 STATUS（第一個字）:
#   CLEAN        — 沒有偵測到平行 actor，可安全動 git
#   ACTOR_BUSY   — 有 active 翻譯/babel writer 或 index.lock（呼叫端應等或 abort）
#   REMOTE_AHEAD — origin 被別人推過（落地前先 git pull --rebase 避免 ref-lock reject）
#   DIRTY_BATCH  — working tree 留有大量未 commit .md（疑似 sibling 翻譯批次 leftover）
# exit: 0=CLEAN / 1=任一風險 / 2=error
#
# 另印 OTHER_WORKTREES 區塊（只在人類可讀模式）：其他工作樹裡沒 commit 的檔數與新鮮度。
# 不影響 STATUS 與 exit code。
#
# 被 .husky/pre-push、session 啟動、routine Step 1 共用。canonical: BECOME §行動鐵律 5。
set -uo pipefail

REPO="$(git rev-parse --show-toplevel 2>/dev/null)" || { echo "ERROR not-a-git-repo"; exit 2; }
cd "$REPO" || exit 2

MODE="${1:-}"
status="CLEAN"
reasons=""
add_reason() { reasons="${reasons}\n  - $1"; }
escalate() { # 不降級：ACTOR_BUSY > REMOTE_AHEAD > DIRTY_BATCH > CLEAN
  case "$1" in
    ACTOR_BUSY) status="ACTOR_BUSY";;
    REMOTE_AHEAD) [ "$status" != "ACTOR_BUSY" ] && status="REMOTE_AHEAD";;
    DIRTY_BATCH) [ "$status" = "CLEAN" ] && status="DIRTY_BATCH";;
  esac
}

# 1. index.lock — 別的程序正在 git 操作的最強訊號
if [ -f "$REPO/.git/index.lock" ]; then escalate ACTOR_BUSY; add_reason "index.lock present（另一個 git op 進行中）"; fi

# 2. File-system 層：active 翻譯/babel writer process
actor_pids="$(pgrep -f "lang-sync|babel-handoff|i18n-translate|fleet-endpoint|remote-ollama" 2>/dev/null | tr '\n' ' ' || true)"
if [ -n "${actor_pids// /}" ]; then escalate ACTOR_BUSY; add_reason "babel/lang-sync writer process: ${actor_pids}"; fi

# 3. Dirty-tree leftover：大量未 commit .md（疑似 sibling 翻譯批次，REFLEXES #57 v4）
dirty_md="$(git status --porcelain 2>/dev/null | grep -cE '\.md$' || true)"
dirty_md="${dirty_md:-0}"
if [ "$dirty_md" -gt 80 ]; then escalate DIRTY_BATCH; add_reason "dirty-tree leftover: ${dirty_md} 個未 commit .md（疑似 sibling 翻譯批次）"; fi

# 4. Git-ref 層：origin 被別人推過 → 落地會 ref-lock reject
git fetch origin -q 2>/dev/null || true
local_head="$(git rev-parse @ 2>/dev/null || true)"
remote_head="$(git rev-parse '@{u}' 2>/dev/null || git rev-parse origin/main 2>/dev/null || true)"
if [ -n "$remote_head" ] && [ -n "$local_head" ]; then
  base="$(git merge-base @ "$remote_head" 2>/dev/null || true)"
  if [ "$remote_head" != "$base" ] && [ "$remote_head" != "$local_head" ]; then
    behind="$(git rev-list --count "@..${remote_head}" 2>/dev/null || echo '?')"
    escalate REMOTE_AHEAD
    add_reason "origin 領先 ${behind} 個 commit（$(git rev-parse --short "$remote_head")）— push 前先 git pull --rebase"
    # 讀取層警告（2026-08-14 maintainer-am 新增）：本項原本只講 push 會不會被 reject，
    # 但 origin 領先還有第二個後果，而且更難察覺——**這棵樹讀出來的東西也是舊的**。
    # 當天實例：本地落後 135 個 commit 的 maintainer cycle 裡連踩三次，全都是拿歷史當現況：
    #   (1) `git grep src/utils/marked-cjk.mjs` 說檔案不存在 → 差點對貢獻者發出「你引用了不存在的路徑」
    #       的錯誤 review，實際上它 origin/main 上好好的
    #   (2) `node -p require('./package.json')` 說沒有 test:python script、requirements-test.txt 不存在
    #       → 差點把一個正確的 PR 判成「新增了跑不起來的指令」
    #   (3) symlink 主樹的 node_modules 去跑測試 → ERR_MODULE_NOT_FOUND，看起來像程式壞了，
    #       其實是那份 node_modules 對應的是舊的 package.json
    # 三次都不是判斷力的問題，是量尺本身是歷史快照。REFLEXES #67「已驗過帶時間戳」的環境層變體：
    # 那條講「別拿舊結論當現況」，這裡連檔案系統本身都是舊結論。
    if [ "$behind" != "?" ] && [ "$behind" -gt 0 ] 2>/dev/null; then
      add_reason "⚠️ 讀取層同時失真：本地 git grep / ls / cat / require / node_modules 反映的是 ${behind} 個 commit 前的狀態。審 PR、對賬事實、跑測試前改用 \`git show origin/main:<path>\`，或開一個從 origin/main 出發的 worktree（node_modules 要在該 worktree 內重新 npm ci，不要 symlink 主樹那份）"
    fi
  fi
fi

# 5. 其他工作樹的未 commit 檔（2026-10-11 self-evolve，REFLEXES #42「routine 自死前 commit」第四起）
#    前四項只看「這一棵樹」。09-25 一班 routine 死在 .worktrees/ 裡的工作樹，改好的檔沒 commit，
#    下一班在主樹甦醒，這支印 CLEAN，沒有任何東西告訴它隔壁躺著一份做到一半的工作；
#    那班是碰巧去 git worktree list 才接手。這條交接從 09-25 傳到 10-03 共八班。
#    只報告不升級 status：工作樹裡有東西不代表會撞 git（pre-push 用 --status，不受影響），
#    它要回答的是「這台機器上還有誰的工作沒落地」，給甦醒的人讀。
#    新鮮度切兩段：2 小時內有改動 = 可能有人正在用，別碰；超過 24 小時 = 疑似孤兒，收屍看這裡。
wt_lines=""
now_epoch="$(date +%s)"
while IFS= read -r wt; do
  [ -z "$wt" ] && continue
  [ "$wt" = "$REPO" ] && continue
  [ -d "$wt" ] || { wt_lines="${wt_lines}\n  🌳 ${wt}：登記在 git 但目錄不見了（git worktree prune 可清）"; continue; }
  wt_dirty="$(git -C "$wt" status --porcelain 2>/dev/null | wc -l | tr -d ' ')"
  [ "${wt_dirty:-0}" -eq 0 ] && continue
  newest=0
  while IFS= read -r f; do
    [ -e "$wt/$f" ] || continue
    m="$(stat -f %m "$wt/$f" 2>/dev/null || stat -c %Y "$wt/$f" 2>/dev/null || echo 0)"
    [ "$m" -gt "$newest" ] && newest="$m"
  done <<EOF_FILES
$(git -C "$wt" status --porcelain 2>/dev/null | sed -E 's/^.{3}//; s/.* -> //; s/^"(.*)"$/\1/')
EOF_FILES
  if [ "$newest" -gt 0 ]; then
    age_h=$(( (now_epoch - newest) / 3600 ))
    if [ "$age_h" -lt 2 ]; then tag="${age_h}h 前還在改，可能有人正在用，別碰"
    elif [ "$age_h" -ge 24 ]; then tag="最後改動 ${age_h}h 前，疑似孤兒（死掉的班沒 commit），先讀它的 memory 再決定接手或歸檔"
    else tag="最後改動 ${age_h}h 前"; fi
  else
    tag="改動時間讀不到（可能全是刪除）"
  fi
  wt_lines="${wt_lines}\n  🌳 ${wt#$REPO/}：${wt_dirty} 個未 commit 檔，${tag}"
done <<EOF_WT
$(git worktree list --porcelain 2>/dev/null | awk '/^worktree /{sub(/^worktree /,""); print}')
EOF_WT

# 輸出
case "$MODE" in
  --status) echo "$status"; ;;
  --quiet)  ;;
  *)
    if [ "$status" = "CLEAN" ]; then
      echo "PARALLEL_CHECK: CLEAN ✅  （dirty .md=${dirty_md}）"
    else
      printf "PARALLEL_CHECK: %s ⚠️%b\n" "$status" "$reasons"
    fi
    [ -n "$wt_lines" ] && printf "OTHER_WORKTREES（不影響 status，只報這台機器上還沒落地的工作）:%b\n" "$wt_lines"
    ;;
esac
[ "$status" = "CLEAN" ] && exit 0 || exit 1
