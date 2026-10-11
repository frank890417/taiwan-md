#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────
# ci-main-health.sh — main 上每一條 workflow 最後一次跑成什麼樣
# ─────────────────────────────────────────────────────────────────
#
# `pr-ci-armed.sh` 的 main 側姊妹。那支問「這個 PR 的 CI 有沒有被允許跑」，
# 這支問「main 上有沒有東西正紅著而沒人看到」。
#
#   bash scripts/tools/ci-main-health.sh            # 報告，永遠 exit 0
#   bash scripts/tools/ci-main-health.sh --strict   # 有 RED 就 exit 1
#
# 每行輸出：
#   <state>  <age>  <workflow 名稱>  <檔名>
#
# state：
#   GREEN            main 上最後一次跑成功
#   RED              main 上最後一次失敗／被取消／逾時 → 本班第一個 polish item
#   RUNNING          正在跑或排隊中
#   OFF-BRANCH       從沒在這個分支上跑過，而它的觸發條件本來就跑不到這裡
#                    （只掛 pull_request，或 push 只綁 tag）→ 預期內，不是缺口
#   BLOCKED          最後一次是 action_required／stale：沒跑成，不是跑壞了
#   UNKNOWN(x)       GitHub 回了本工具不認得的 conclusion → 不假裝知道
#   NEVER-ON-MAIN ⚠️ 從沒在 main 上跑過，但它宣告了 push／schedule／
#                    workflow_dispatch 這類 main 跑得到的觸發 → 接線可能斷了
#
# ── 為什麼要有這支工具（2026-09-27 twmd-maintainer-am）────────────────
#
# MAINTAINER-PIPELINE Step 1.5 原本把這件事寫成一段可貼的指令：
#
#   gh api "repos/OWNER/REPO/actions/runs?branch=main&per_page=100" --jq \
#     '[.workflow_runs[]] | group_by(.name)[] | (sort_by(.created_at)|last) | ...'
#
# 那段 group-by 是 2026-09-03 的修補，解掉的是「點名式健檢只看得到造它的人
# 當時想得到的那幾條」（`Python tests` 在 main 上紅了四天沒人看到）。方向對，
# 但它換來另一種盲：**group-by 只能看到那 100 筆裡出現過的 workflow**。
# 本 repo 的 babel 產線整點 commit，deploy 跟著跑——2026-09-27 實測那 100 筆
# 只涵蓋 **8.3 小時**（15:19Z → 23:35Z）。一條掛 paths filter 的 workflow
# 紅完之後不再被觸發，就會滑出這個窗，於是「最後一次跑成什麼樣」這個問題
# 被悄悄換成「最近八小時跑過的那幾條長怎樣」。這正是 `pr-ci-armed.sh` 檔頭
# 記的同一個病（REFLEXES #82 存在代理有效／#15 可貼的 snippet 會腐爛）。
#
# 修法：不掃 repo-wide run 列表，改成**先列出 workflow，再逐條問它自己的
# runs endpoint**（`/actions/workflows/<id>/runs?branch=main&per_page=1`）。
# 每條各問一次，窗口大小與 main 的 commit 量脫鉤，工作流再冷門也看得到。
#
# 刻意不設「幾天沒跑就算 stale」的門檻：掛 paths filter 的 workflow 冷幾天
# 是正常的，憑感覺設一個數字只會生出假陽性（REFLEXES #66 門檻要用真實產出
# 校準）。這裡只印齡，讓讀的人自己判斷，硬旗只給 RED 與 NEVER-ON-MAIN。
#
# Requires: gh (已登入), jq, python3
# Exit: 0（預設）；--strict 且有 RED 時 1
# ─────────────────────────────────────────────────────────────────

set -uo pipefail

REPO="${TWMD_REPO:-frank890417/taiwan-md}"
BRANCH="${TWMD_CI_BRANCH:-main}"
STRICT=0
[ "${1:-}" = "--strict" ] && STRICT=1

if ! command -v gh >/dev/null 2>&1; then
  echo "❌ 需要 gh CLI" >&2
  exit 0
fi

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"

# workflow 是否宣告了「會在 main 這個分支上跑」的觸發。
# YAML 的 `on:` 會被解析成布林 True 當 key，所以兩種 key 都要看。
#
# ⚠️ `push` 不等於「會在 main 上跑」：`push: {tags: [cli-v*]}` 是 tag 推送，
# 分支永遠對不上。第一版把它算成 main-eligible，於是把 npm-publish-cli 誤報成
# NEVER-ON-MAIN（2026-09-27 首跑抽驗時抓到，REFLEXES #99 尺先驗再用）。
main_eligible() {
  local path="$1"
  local full="$REPO_ROOT/$path"
  [ -f "$full" ] || { echo "unknown"; return; }
  python3 - "$full" <<'PY'
import sys
try:
    import yaml
except ImportError:
    print("unknown"); sys.exit(0)
try:
    doc = yaml.safe_load(open(sys.argv[1], encoding="utf-8")) or {}
except Exception:
    print("unknown"); sys.exit(0)
trig = doc.get("on", doc.get(True))
if trig is None:
    print("unknown"); sys.exit(0)
if isinstance(trig, str):
    trig = {trig: None}
elif isinstance(trig, list):
    trig = {k: None for k in trig}
elif not isinstance(trig, dict):
    print("unknown"); sys.exit(0)

if {"schedule", "workflow_dispatch", "repository_dispatch"} & set(trig):
    print("yes"); sys.exit(0)

if "push" in trig:
    spec = trig["push"]
    # `push:` 無細則 → 所有分支都跑；有 branches → 看得到分支；
    # 只有 tags（可再帶 paths）→ tag 推送，不會在分支上跑。
    if not isinstance(spec, dict):
        print("yes"); sys.exit(0)
    if "branches" in spec or "branches-ignore" in spec:
        print("yes"); sys.exit(0)
    if "tags" in spec or "tags-ignore" in spec:
        print("no"); sys.exit(0)
    print("yes"); sys.exit(0)

print("no")
PY
}

printf '%s\n' "════════ $BRANCH CI 健康 — $REPO ════════"

red=0
never=0
blocked=0
unknown=0
stalepage=0
offbranch_failed=0
total=0

while IFS=$'\t' read -r wid wname wpath; do
  [ -n "$wid" ] || continue
  total=$((total + 1))

  # ⚠️ `?branch=` 比對的是 head_branch，而 fork PR 的 head branch 常常就叫 main
  # ——所以不濾掉 pull_request 事件的話，別人從自己 main 送來的 PR 會被讀成
  # 「我們 main 上的一次執行」。第一版就是這樣把一則 2026-04-01 的投稿 PR 失敗
  # 報成「Translation PR Check 在 main 紅了 178 天」（2026-09-27 首跑抽驗時抓到，
  # REFLEXES #99 尺先驗再用／#24 工具在說謊）。掃描深度 50 筆，夠深到冷門
  # workflow 也撈得到，又不會退回 repo-wide 那種跟 commit 量綁在一起的窗。
  #
  # ⚠️⚠️ 但帶 `?branch=` 的那個索引**會間歇回舊頁**（2026-10-02 twmd-maintainer-am
  # 定錨）：同一支 deploy.yml，不帶 branch 問回 2026-10-01T23:15Z 的 success，
  # 帶 branch 問回 2026-09-08T01:13:47Z 的 success——兩者都自稱是最新一筆。本班第一次
  # 跑就讀到舊頁，於是 deploy 被印成「GREEN 24.0d」，而它其實一小時前才剛綠。
  # 這正是 09-30 那班記下的 LESSONS `ci-health-ruler-gave-two-different-ages-for-
  # the-same-run-and-both-printed-green`（兩分鐘內對同一次 deploy 報 22.0d 與 1h，
  # 兩次都綠）的根因：不是齡算錯，是取數口回了不同的頁。
  #
  # **不能用 total_count 當偵測器**：抓到的舊頁有一次回 `total_count: 0` 卻同時給
  # 50 筆 row（自相矛盾），但另一次回 `total_count: 2500` 配一樣的舊資料——count 欄
  # 自己也會跟著舊。所以這裡不自驗，改用第二個取數口當外部尺（REFLEXES #69）：
  # 不帶 branch 問一次（這個索引在實測裡始終是新的）、客戶端自己濾 head_branch，
  # 兩邊取**聯集**再挑最新。聯集的性質是只要有一邊新就不會舊；而保留帶 branch 的
  # 那口，是因為「PR 跑很多、main 跑很少」的 workflow 需要它才撈得到 main 的那筆
  # （不帶 branch 的 100 筆可能全是 PR run）。兩邊不一致時印一行 ⚠️ 把這件事攤開，
  # 不默默補好——間歇性故障被補掉又不出聲，下一個人就量不到它還在發生。
  filt_json=$(gh api "repos/$REPO/actions/workflows/$wid/runs?branch=$BRANCH&per_page=50" \
    --jq '[.workflow_runs[]
           | select(.event != "pull_request" and .event != "pull_request_target")]' 2>/dev/null)
  unfilt_json=$(gh api "repos/$REPO/actions/workflows/$wid/runs?per_page=100" \
    --jq "[.workflow_runs[]
           | select(.head_branch == \"$BRANCH\")
           | select(.event != \"pull_request\" and .event != \"pull_request_target\")]" 2>/dev/null)

  run=$(printf '%s\n%s\n' "${filt_json:-[]}" "${unfilt_json:-[]}" | jq -rs '
      (add // []) | unique_by(.id)
      | if length == 0 then "" else
          (max_by(.created_at)
           | "\(.conclusion // .status)\t\(.created_at)\t\(.html_url)\t\(.id)\t\(.head_sha)")
        end' 2>/dev/null)

  # 帶 branch 那口自己看到的最新，用來跟聯集對賬
  filt_newest=$(printf '%s' "${filt_json:-[]}" \
    | jq -r 'if length == 0 then "" else (max_by(.created_at).created_at) end' 2>/dev/null)

  if [ -z "$run" ] || [ "${run%%$'\t'*}" = "null" ]; then
    if [ "$(main_eligible "$wpath")" = "yes" ]; then
      state="NEVER-ON-MAIN ⚠️"
      never=$((never + 1))
      printf '  %s %-9s %-26s %s\n' "$state" "-" "$wname" "$wpath"
      continue
    fi

    # 2026-10-11 twmd-maintainer-daily：OFF-BRANCH 原本就印到這裡然後 continue，
    # 於是 tag 觸發的 workflow（`push: {tags: [cli-v*]}`）**最後一次跑成什麼樣
    # 從來沒有人看過**。09-27 把它判成 OFF-BRANCH 是對的——它永遠不會在 main
    # 上跑，拿 main 的尺量它只會生假陽性；但「不能用 main 的尺判」被實作成
    # 「完全不看」，而這兩件事差很遠（REFLEXES #82 的反面：這次不是拿替身代表
    # 效果，是連替身都沒量）。
    #
    # 代價已經收到了：`cli-v0.8.1` 2026-10-10 14:40Z 推上去、npm publish 以
    # E404（PUT 權限）失敗，npm 上仍是 0.8.0，而 #1789 正是在等這次發佈。
    # 這張表當天印的是 `OFF-BRANCH  -  Publish CLI to npm`，一個字都沒提它
    # 剛剛失敗，隔天早班照同一份輸出也讀不到——十小時裡沒有一支尺說過話。
    #
    # 所以這裡改成：不用 main 的尺判它（不進 red/blocked 計數、不影響
    # --strict），但把它最後一次跑的結論與年齡印出來。該不該讓失敗的發佈
    # 讓 --strict 轉紅是閾值問題，留哲宇（OBSERVER-QUEUE）。
    last_any=$(gh api "repos/$REPO/actions/workflows/$wid/runs?per_page=20" \
      --jq '[.workflow_runs[]
             | select(.event != "pull_request" and .event != "pull_request_target")]
            | if length == 0 then "" else
                (max_by(.created_at)
                 | "\(.conclusion // .status)\t\(.created_at)\t\(.head_branch)")
              end' 2>/dev/null)

    if [ -z "$last_any" ]; then
      printf '  %s %-9s %-26s %s\n' "OFF-BRANCH     " "-" "$wname" "$wpath"
      continue
    fi

    IFS=$'\t' read -r oc ocreated oref <<<"$last_any"
    oage=$(python3 -c "
import datetime,sys
t=datetime.datetime.strptime(sys.argv[1],'%Y-%m-%dT%H:%M:%SZ').replace(tzinfo=datetime.timezone.utc)
h=(datetime.datetime.now(datetime.timezone.utc)-t).total_seconds()/3600
print(f'{h:.0f}h' if h < 48 else f'{h/24:.1f}d')
" "$ocreated" 2>/dev/null || echo '?')

    case "$oc" in
      failure | cancelled | timed_out | startup_failure)
        printf '  %s %-9s %-26s %s\n' "OFF-BRANCH 🔴  " "$oage" "$wname" "$wpath"
        printf '      ↳ 最後一次不在 main 的執行失敗了（%s @ %s）— 不計入 main 紅燈，但要有人看\n' \
          "$oc" "$oref"
        offbranch_failed=$((offbranch_failed + 1))
        ;;
      *)
        printf '  %s %-9s %-26s %s\n' "OFF-BRANCH     " "$oage" "$wname" "$wpath"
        printf '      ↳ 最後一次不在 main 的執行：%s @ %s\n' "$oc" "$oref"
        ;;
    esac
    continue
  fi

  IFS=$'\t' read -r concl created url runid headsha <<<"$run"

  age=$(python3 -c "
import datetime,sys
t=datetime.datetime.strptime(sys.argv[1],'%Y-%m-%dT%H:%M:%SZ').replace(tzinfo=datetime.timezone.utc)
h=(datetime.datetime.now(datetime.timezone.utc)-t).total_seconds()/3600
print(f'{h:.0f}h' if h < 48 else f'{h/24:.1f}d')
" "$created" 2>/dev/null || echo '?')

  # 逐個 conclusion 明寫，不靠 `*)` catch-all 決定紅燈：GitHub 的 conclusion
  # 不只成功與失敗，`stale`／`action_required` 是「沒跑成」不是「跑壞了」，
  # 混進同一盞燈就是又一個混維度的 status（REFLEXES #38）。認不得的值也不
  # 假裝知道，給它自己的符號（REFLEXES #85）。
  case "$concl" in
    success) state="GREEN          " ;;
    in_progress | queued | waiting | requested | pending) state="RUNNING        " ;;
    skipped | neutral) state="SKIPPED        " ;;
    failure | cancelled | timed_out | startup_failure)
      state="RED            "
      red=$((red + 1))
      ;;
    action_required | stale)
      state="BLOCKED        "
      blocked=$((blocked + 1))
      ;;
    *)
      state="UNKNOWN($concl)"
      unknown=$((unknown + 1))
      ;;
  esac

  printf '  %s %-9s %-26s %s\n' "$state" "$age" "$wname" "$wpath"
  # 每一列都印它的讀數是從哪一筆執行算出來的（2026-10-01 twmd-maintainer-am）。
  # 原本只有 RED 那列印 URL，於是 GREEN 的「齡」沒有任何可回頭核對的錨：09-30
  # 那班同一支指令在兩分鐘內對同一次 deploy 執行報 22.0d 與 1h，兩次都印綠燈，
  # 而當時無法判斷它們是不是同一筆（LESSONS `ci-health-ruler-gave-two-different-
  # ages-for-the-same-run-and-both-printed-green`）。齡是推導值，created_at 與
  # run id 是原始資料——印出原始資料，下一個人才驗得動這個數字（REFLEXES #69
  # 外部尺／#85「不知道」要有自己的符號：這裡是「這個數字從哪來」要留得住）。
  printf '      ↳ run %s  created %s  sha %s\n' "$runid" "$created" "${headsha:0:9}"
  # 兩個取數口不一致 → 帶 branch 的那口回了舊頁，讀數由不帶 branch 的那口救回來。
  # 印出來，讓這個間歇性故障留下可累計的痕跡（補好但不出聲 = 下一個人量不到它）。
  if [ -n "$filt_newest" ] && [ "$filt_newest" != "$created" ]; then
    printf '        ⚠️ 取數口不一致：?branch=%s 那口的最新只到 %s，讀數取自聯集\n' \
      "$BRANCH" "$filt_newest"
    stalepage=$((stalepage + 1))
  fi
  [ "$state" = "RED            " ] && printf '        %s (%s)\n' "$url" "$concl"
done < <(gh api "repos/$REPO/actions/workflows?per_page=100" \
  --jq '.workflows[] | select(.state=="active") | select(.path | startswith(".github/")) | "\(.id)\t\(.name)\t\(.path)"' 2>/dev/null)

echo "────────────────────────────────────────────────────────"
printf '  %s 條 active workflow：RED %s / BLOCKED %s / UNKNOWN %s / NEVER-ON-MAIN %s / OFF-BRANCH 失敗 %s\n' \
  "$total" "$red" "$blocked" "$unknown" "$never" "$offbranch_failed"
if [ "$stalepage" -gt 0 ]; then
  printf '  ⚠️ %s 條的 ?branch= 取數口回了舊頁（讀數已由不帶 branch 那口救回）。GitHub 端間歇性，不是本機問題。\n' "$stalepage"
fi
if [ "$red" -gt 0 ]; then
  echo "  ⚠️ main 上有東西紅著。紅在 main 不會自己叫，它會等下一個路過的投稿 PR 替它背黑鍋"
  echo "     （2026-09-03 #1662 就是這樣中的）→ 本班 Stage 3.5 第一個 polish item。"
fi
if [ "$never" -gt 0 ]; then
  echo "  ⚠️ 有 workflow 宣告了 main 跑得到的觸發卻從沒在 main 上跑過 — 先查 paths filter 與分支條件。"
fi
if [ "$offbranch_failed" -gt 0 ]; then
  echo "  ⚠️ 有 tag／非 main 觸發的 workflow 最後一次執行是失敗的。它不在 main 上，所以這張表"
  echo "     不拿 main 的尺判它、也不計入 RED（避免假陽性），但發佈類的失敗沒人看就會一直沒人看"
  echo "     （cli-v0.8.1 的 npm publish 失敗了十小時沒人看到，而 #1789 正在等那次發佈）。"
fi

if [ "$STRICT" = "1" ] && [ "$red" -gt 0 ]; then
  exit 1
fi
exit 0
