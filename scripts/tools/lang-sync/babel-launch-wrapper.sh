#!/bin/bash
# launchd com.taiwanmd.babel.nightly（keepalive）的入口。
#
# 歷史：09-14 那班用 `launchctl submit` 掛了 keepalive，指令寫在 /tmp；09-18 改寫
# 三件事（起跑先對 origin 去重、地端 worker 由 fleet 核發、--order forward）；
# 09-19 搬進 repo（/tmp 重開機即消失，keepalive 會空轉）並再改兩件事：
#   1. 不再寫死 --langs 清單——dispatcher 預設就從 langs.py ENABLED_TRANSLATION_LANGS
#      取「有缺口的語言」，寫死清單只會讓新語言在無人察覺下整批漏掉（routine
#      prompt 明文警告過，本 wrapper 自己就是活體標本：12 語硬編）
#   2. 弱適配切軌——每次起跑用 babel-weak-lanes.py 從近兩日實績算 backend×語言
#      的弱格，餵 --worker-skip-langs，讓 worker 把輪次讓給擅長的語言
#
# 重掛方式（改完本檔後）：
#   launchctl remove com.taiwanmd.babel.nightly
#   launchctl submit -l com.taiwanmd.babel.nightly -o /tmp/babel-launchd.out -e /tmp/babel-launchd.err \
#     -- /bin/bash /Users/musebase/Projects/taiwan-md/scripts/tools/lang-sync/babel-launch-wrapper.sh
# 注意 remove 會殺掉正在跑的 dispatcher：先打撈工作樹裡驗過但沒 commit 的譯文
# （status.py 看到檔案就算 fresh，沒 commit 的完稿不會再排進佇列，09-18 教訓）。
set -u
cd /Users/musebase/Projects/taiwan-md || exit 1

# launchd 的環境沒有 shell profile，`python3` 會解析到 Apple CommandLineTools 的 3.9，
# 而 status.py 用了 `str | None`（3.10+）——09-19 第一次從 repo 路徑重掛就 crash-loop，
# 每次重生都先花一兩分鐘算去重清單再死。09-07 神經迴路那條「語法掃描 ≠ runtime 相容」
# 的 headless 教訓在這台機器的第二個 instance。直譯器明寫，不靠 PATH。
PY=/Users/musebase/.venvs/taiwanmd/bin/python
[ -x "$PY" ] || PY="$(command -v python3.12 || command -v python3.11 || command -v python3.10 || command -v python3)"
"$PY" -c 'import sys; assert sys.version_info >= (3, 10)' 2>/dev/null || { echo "wrapper: 找不到 Python ≥3.10（PY=$PY），停手不空轉" >&2; sleep 600; exit 1; }
# node（prettier）也不在 launchd 的 PATH 上：~/.local/bin 是 .zprofile 加的，repo 的
# node_modules/.bin 有 prettier。兩個都掛上，dispatcher 的 npx 才找得到東西。
export PATH="$(dirname "$PY"):$HOME/.local/bin:/Users/musebase/Projects/taiwan-md/node_modules/.bin:$PATH"
git fetch -q origin main 2>/dev/null || echo "wrapper: git fetch 失敗，沿用舊的 origin/main ref" >&2
"$PY" scripts/tools/lang-sync/babel-origin-exclude.py >&2 || echo "wrapper: 去重清單產生失敗，沿用上一份 .taiwanmd/babel-exclude.tsv" >&2

FLEET_WORKERS="$(~/Projects/muse-bot/fleet/fleetctl workers --service llm --format babel 2>/dev/null)"
[ -z "$FLEET_WORKERS" ] && echo "wrapper: fleet 未核發任何地端 worker，本輪只有雲端 worker" >&2
CLOUD_WORKERS="--worker nemo=openrouter:nvidia/nemotron-3-ultra-550b-a55b:free --worker lagunas=openrouter:poolside/laguna-s-2.1:free"

# shellcheck disable=SC2086
SKIP_LANES="$("$PY" scripts/tools/lang-sync/babel-weak-lanes.py --explain $FLEET_WORKERS $CLOUD_WORKERS )"
[ -n "$SKIP_LANES" ] && echo "wrapper: 弱適配切軌 → $SKIP_LANES" >&2

# 本機加掛的 dispatcher 參數（2026-09-26 哲宇「翻譯率 100% 模式，大幅度利用
# OpenRouter／Haiku／Sonnet」）。典型內容是付費 Tier 6 worker 與它的額度：
#   --worker-tier6 haiku1=openrouter:anthropic/claude-haiku-4.5
#   --tier6-nightly-cap 120
# 放在 repo 外（~/.config/taiwan-md/）而不寫進本檔：付費 lane 花的是觀察者儲值的
# 錢，是當下的決定，不是夜班常駐配置——寫進本檔等於每次 keepalive 重生都自動
# 花錢，決定一變就得改 repo；放本機檔案，刪掉就回到純免費產線。
# 格式：每行一段參數，# 開頭為註解。
EXTRA_FILE="$HOME/.config/taiwan-md/babel-extra-workers"
EXTRA_ARGS=""
if [ -f "$EXTRA_FILE" ]; then
  EXTRA_ARGS="$(grep -vE '^[[:space:]]*(#|$)' "$EXTRA_FILE" | tr '\n' ' ')"
  [ -n "$EXTRA_ARGS" ] && echo "wrapper: 加掛本機參數（$EXTRA_FILE）→ $EXTRA_ARGS" >&2
fi

# shellcheck disable=SC2086
exec "$PY" scripts/tools/lang-sync/babel-dispatch.py \
  $FLEET_WORKERS \
  $CLOUD_WORKERS \
  $SKIP_LANES \
  $EXTRA_ARGS \
  --exclude-file .taiwanmd/babel-exclude.tsv \
  --order forward --rounds 200 --commit-every 10
