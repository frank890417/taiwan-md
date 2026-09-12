#!/usr/bin/env bash
# weekly-checkup.sh — 週體檢一鍵儀器（WEEKLY-REPORT-PIPELINE v4.1 Stage 2.5）
#
# 哲宇 2026-07-10 directive：「完整深度檢查這一個禮拜發生的事、外部感測數據、
# 所有運作紀錄，深度研究與觀察並寫報告，還有寫進化的規劃」＋「能儀器化的東西
# 也協助儀器化，讓未來 agent 的認知負荷降低」。
#
# 本工具把週體檢的機械面收成一個指令、a–i 全節輸出——agent 跑一次拿到全部素材，
# 剩下的工作只有解讀與判斷（那是 Semiont 親手的部分，不儀器化）：
#
#   a. fire-vs-commit 對賬（routine-liveness-check.py — 沉默死亡驗屍）
#   b. working tree 驗屍（debris 盤點）
#   c. 儀器燈盤點（sync-check 三層 + counts-drift + alerts 含齡）
#   d. 器官分數成分拆解（<70 器官自動 dump sub-dim，量尺-vs-本體判別素材）
#   e. 佇列與承諾稽核（OBSERVER-QUEUE default-action 過期 + inbox 飽和 + roadmap P0 領取）
#   f. 外部感測數據摘要（GA / SC / CF / AI crawler / fork / supporters）
#   g. 運作紀錄週成績單（7 天 per-routine fire 數 + 最後一跑 + commit 數）
#   h. 甦醒取數健康（wake-context --check——身份層錨驗/catalog 對賬/索引新鮮度/handoff 命中）
#   i. 受眾名單與活躍度（weekly-report-recipients.py——週報 BCC 名單同步 + 90 天活躍度表）
#
# 用法：bash scripts/tools/weekly-checkup.sh [--days 7]
# 前置：live dump 要新鮮（section a 會自己標 dumpStale；stale 就先跑
#       list_scheduled_tasks → routine-live-normalize.py）

set -uo pipefail
cd "$(dirname "$0")/../.."

DAYS=7
[[ "${1:-}" == "--days" ]] && DAYS="${2:-7}"
SINCE=$(date -v-"${DAYS}"d +%Y-%m-%d 2>/dev/null || date -d "${DAYS} days ago" +%Y-%m-%d)

echo "🧬 weekly-checkup — 週體檢 a–i 全節（window: ${SINCE} → $(date +%Y-%m-%d)）"
echo "═══════════════════════════════════════════════════════════════════"

# ── a. fire-vs-commit 對賬 ────────────────────────────────────────────
echo ""
echo "## a. fire-vs-commit 對賬（沉默死亡驗屍）"
python3 scripts/tools/routine-liveness-check.py 2>/dev/null || echo "⚠️ liveness 工具失敗"

# ── b. working tree 驗屍 ──────────────────────────────────────────────
echo ""
echo "## b. working tree 驗屍（debris 盤點）"
DIRTY=$(git status --short | wc -l | tr -d ' ')
if [[ "$DIRTY" == "0" ]]; then
  echo "  ✅ working tree 乾淨"
else
  echo "  ⚠️ ${DIRTY} 個未 commit 檔案（誰留下的？完好工作 rescue / 半跑 regen 不碰）："
  git status --short | head -20 | sed 's/^/    /'
fi

# ── c. 儀器燈盤點 ─────────────────────────────────────────────────────
echo ""
echo "## c. 儀器燈盤點"
echo "### c1. routine-sync-check（SSOT ↔ mirror ↔ live 三層）"
python3 scripts/tools/routine-sync-check.py 2>/dev/null | grep -E "^❌|^🟡|Summary" | head -8 || true
echo "### c2. counts-drift"
python3 scripts/tools/counts-drift-lint.py 2>/dev/null | tail -3 || echo "  ⚠️ counts-drift 工具失敗"
echo "### c3. dashboard-alerts（含齡）"
python3 - <<'PYEOF'
import json
from datetime import date
try:
    d = json.load(open('public/api/dashboard-alerts.json'))
    today = date.today()
    for a in d.get('alerts', []):
        fs = a.get('firstSeen', '')
        try:
            age = (today - date.fromisoformat(fs)).days
        except Exception:
            age = '?'
        flag = ' 🚩>14天該升OBSERVER-QUEUE' if isinstance(age, int) and age > 14 else ''
        print(f"  {a['severity']:6s} 齡{age:>3}天 owner={a.get('owner','?'):28s} {a['message'][:60]}{flag}")
    if not d.get('alerts'):
        print("  ✅ 0 alerts")
except Exception as e:
    print(f"  ⚠️ alerts 讀取失敗: {e}")
PYEOF

# ── d. 器官分數成分拆解 ───────────────────────────────────────────────
echo ""
echo "## d. 器官分數成分拆解（<70 自動 dump sub-dim；每個拖底成分問：量尺的病還是本體的病？）"
python3 - <<'PYEOF'
import json
try:
    org = json.load(open('public/api/dashboard-organism.json'))
    low = [o for o in org.get('organs', []) if o.get('score', 100) < 70]
    if not low:
        print("  ✅ 全器官 ≥ 70")
    for o in low:
        print(f"  ⚠️ {o.get('emoji','')} {o.get('nameZh', o.get('id'))} = {o.get('score')}")
        if o.get('id') == 'immune':
            im = json.load(open('public/api/dashboard-immune.json'))
            w = im.get('componentWeights', {})
            for k, v in sorted(im.get('components', {}).items(), key=lambda x: x[1]):
                print(f"     {k:18s} {v:>6} (權重 {w.get(k, '?')})")
        else:
            for k, v in (o.get('metrics') or {}).items():
                print(f"     {k}: {v}")
except Exception as e:
    print(f"  ⚠️ organism 讀取失敗: {e}")
PYEOF

# ── e. 佇列與承諾稽核 ─────────────────────────────────────────────────
echo ""
echo "## e. 佇列與承諾稽核"
echo "### e1. OBSERVER-QUEUE default-action 到期（非 🔒 的過期項 = 任何 session 可執行）"
python3 - <<'PYEOF'
import re
from datetime import date
try:
    text = open('docs/semiont/OBSERVER-QUEUE.md', encoding='utf-8').read()
    pending = text.split('## 待決')[1].split('## 已決')[0]
    today = date.today()
    rows = [l for l in pending.split('\n') if l.startswith('| ') and l.count('|') >= 6 and not l.startswith('| #') and not l.startswith('| ---')]
    if not rows:
        print("  ✅ 佇列空")
    import os
    for l in rows:
        cells = [c.strip() for c in l.split('|')]
        num, decision, action = cells[1], cells[3][:40], cells[6]
        full = l
        # 2026-09-13 self-evolve-weekly 修：naive '🔒' in action 把「非 🔒，
        # 已逾期→任何 session 可執行」這種明講「不是紅線」的說明文字也判成
        # locked——🔒 字元本身出現在「非」後面說明它不是鎖，字串比對抓不到
        # 這個否定語意。OBSERVER-QUEUE.md 自己的慣例（§🔒 子類標記）是真正
        # 鎖住的列一律以 🔒 開頭（🔒紅線／🔒閾值／🔒（...）），非鎖列即使提到
        # 🔒 也不會放在開頭。改成「去除 markdown 粗體符號後開頭是否為 🔒」，
        # 兩種語意才會分岔成不同的判斷。
        locked = action.strip().lstrip('*').strip().startswith('🔒')
        m = re.search(r'(\d{4}-\d{2}-\d{2})', action)
        overdue = ''
        if m and not locked:
            d0 = date.fromisoformat(m.group(1))
            if d0 <= today:
                overdue = f' 🚩過期 {(today-d0).days} 天，可執行'
        # 執行前查證護欄（2026-07-11 夜班踩過：#9 早 6/19 落地、issue closed，佇列忘移
        # → 照過期 default 又做一次還手滑剝腳註 URL。REFLEXES #73 查證反射 < 建造反射）
        precheck = ''
        for path in re.findall(r'`(knowledge/[^`]+\.md)`', full) + re.findall(r'(knowledge/[^\s\)]+\.md)', full):
            if os.path.exists(path):
                precheck = f' ⚠️ 產出路徑已存在（{path} — 先 git log --follow 查是否已完成再動手）'
                break
        for iss in re.findall(r'#(\d{3,5})', full):
            precheck += f' [執行前跑 gh issue view {iss} --json state 確認未 closed]'
            break
        print(f"  #{num:3s} {'🔒' if locked else '  '} {decision}…{overdue}{precheck}")
except Exception as e:
    print(f"  ⚠️ OBSERVER-QUEUE 解析失敗: {e}")
PYEOF
echo "### e2. inbox 飽和訊號"
bash scripts/tools/inbox-signal.sh 2>/dev/null | sed 's/^/  /' || true
echo "### e3. evolution-roadmap P0 領取狀態"
LATEST_ROADMAP=$(ls -t reports/evolution-roadmap-*.md 2>/dev/null | head -1)
if [[ -n "$LATEST_ROADMAP" ]]; then
  echo "  最新版：$LATEST_ROADMAP"
  grep -E '^### P0-' "$LATEST_ROADMAP" | sed -E 's/^### /  /; s/（[^）]*）//g' | head -10
  CLAIMED=$(grep -cE '^### P0-.*✅' "$LATEST_ROADMAP" || true)
  TOTAL=$(grep -cE '^### P0-' "$LATEST_ROADMAP" || true)
  echo "  P0 領取：${CLAIMED}/${TOTAL}（全清或過期 → Stage 2.7 開新版 roadmap）"
else
  echo "  ⚠️ 無 evolution-roadmap — Stage 2.7 應開新版"
fi

# ── f. 外部感測數據摘要 ───────────────────────────────────────────────
echo ""
echo "## f. 外部感測數據摘要（GA / SC / CF / AI crawler / fork / supporters）"
python3 - <<'PYEOF'
import json
try:
    d = json.load(open('public/api/dashboard-analytics.json'))
    ga = d.get('ga', {})
    t = ga.get('totals', {})
    print(f"  GA {ga.get('days','?')}d：users {t.get('activeUsers','?'):,} / PV {t.get('screenPageViews','?'):,} / engagement {t.get('avgEngagementSeconds','?')}s / bounce {round(t.get('bounceRate',0)*100,1)}%")
    for a in (ga.get('topArticles7d') or [])[:5]:
        print(f"    top: {a.get('path','')[:44]:46s} {a.get('views','?')} views")
    sc = d.get('searchConsole7d', {})
    st = sc.get('totals', {})
    bb = sc.get('brandBreakdown', {})
    nb = bb.get('nonBrand', {})
    print(f"  SC 7d：clicks {st.get('clicks','?'):,} / impressions {st.get('impressions','?'):,} / CTR {st.get('ctr','?')}%（非品牌 CTR {nb.get('ctr','?')}%）")
    for q in (sc.get('topQueries') or [])[:5]:
        print(f"    query: {q.get('query','')[:30]:32s} {q.get('clicks','?'):>4} clicks  pos {q.get('position','?')}")
    for q in (sc.get('opportunities') or [])[:3]:
        print(f"    機會缺口: {q.get('query','')[:36]:38s} {q.get('impressions','?'):>5} imp / 0 click")
    cf = d.get('cloudflare7d', {})
    print(f"  CF {cf.get('startDate','?')}→{cf.get('endDate','?')}：requests {cf.get('summary',{}).get('requests','?'):,} / 404 率 {cf.get('fourOhFourRate','?')}%")
    ai = cf.get('aiCrawlers', {})
    for c in (ai.get('crawlers') or [])[:5]:
        ok = c.get('http200', 0); req = c.get('requests', 1) or 1
        print(f"    AI crawler: {c.get('name',''):16s} {req:>6,} req  成功率 {round(ok/req*100)}%")
except Exception as e:
    print(f"  ⚠️ analytics 讀取失敗: {e}")
try:
    f = json.load(open('public/api/dashboard-forks.json'))
    print(f"  Forks：偵測 {f.get('totalDetected','?')} / active {f.get('active','?')}（普查 {f.get('lastUpdated','?')}）")
except Exception:
    pass
try:
    v = json.load(open('public/api/dashboard-vitals.json'))
    print(f"  Vitals：文章 {v.get('totalArticles','?')} / 貢獻者 {v.get('contributors','?')} / ⭐{v.get('stars','?')} / 7d +{v.get('articlesLast7Days','?')}")
    s = json.load(open('public/api/dashboard-supporters.json'))
    print(f"  Supporters：{s.get('totals',{}).get('supporter_count','?')} 人 / 累計 {s.get('totals',{}).get('total_received_twd','?')} TWD（最後 {s.get('latest_date','?')}）")
except Exception:
    pass
PYEOF

# ── g. 運作紀錄週成績單 ───────────────────────────────────────────────
echo ""
echo "## g. 運作紀錄週成績單（${DAYS} 天 per-routine：memory fire 數 + commit 數 + 最後一跑）"
python3 - "$SINCE" <<'PYEOF'
import re
import subprocess
import sys
from collections import defaultdict
from pathlib import Path

since = sys.argv[1]
mem = Path('docs/semiont/memory')
fires = defaultdict(list)
for p in sorted(mem.glob('20*.md')):
    m = re.match(r'(\d{4}-\d{2}-\d{2})-\d{6}-(.+)\.md$', p.name)
    if not m or m.group(1) < since:
        continue
    handle = m.group(2)
    rm = re.match(r'(twmd-[a-z-]+?)(?:-am|-pm|-daily|-weekly|-nightly|-sun)?$', handle)
    key = handle if handle.startswith('twmd-') else f'(manual) {handle}'
    fires[key].append(m.group(1))

out = subprocess.run(['git', 'log', f'--since={since}', '--pretty=%s'],
                     capture_output=True, text=True).stdout.splitlines()
def ccount(*pats):
    return sum(1 for s in out if any(p in s for p in pats))

routine_keys = sorted(k for k in fires if k.startswith('twmd-'))
manual_keys = sorted(k for k in fires if not k.startswith('twmd-'))
for k in routine_keys:
    days = fires[k]
    print(f"  {k:42s} fire×{len(days):<3} 最後 {max(days)}")
print(f"  (manual sessions)                          {sum(len(v) for v in manual_keys and [fires[k] for k in manual_keys] or [[]])and sum(len(fires[k]) for k in manual_keys)} 場：{', '.join(k.replace('(manual) ','') for k in manual_keys[:6])}")
print(f"  commit 總數（window 內）：{len(out)}；routine 標記 {ccount('[routine]')}；semiont 標記 {ccount('[semiont]')}")
PYEOF

# ── h. 甦醒取數健康 ───────────────────────────────────────────────────
echo ""
echo "## h. 甦醒取數健康（wake-context 體檢；⚠️ = 甦醒讀到的東西可疑，優先修）"
python3 scripts/tools/wake-context.py --check 2>/dev/null | grep -vE '^═|^$' | sed 's/^/  /' || echo "  ⚠️ wake-context 工具失敗——甦醒取數裸奔中，第一優先修"

# ── i. 受眾名單與活躍度 ───────────────────────────────────────────────
echo ""
echo "## i. 受眾名單與活躍度（週報 BCC 收件人同步 + 90 天活躍度，v4.2）"
python3 scripts/tools/weekly-report-recipients.py --window-days 90 --summary 2>&1 | sed 's/^/  /' \
  || echo "  ⚠️ recipients 儀器失敗——Stage 5 廣播前必須修好（名單不新鮮寄信工具會拒寄）"

echo ""
echo "═══════════════════════════════════════════════════════════════════"
echo "✅ a–i 全節輸出完畢。接下來是 Semiont 親手的部分：逐節解讀（每節一行結論進報告"
echo "   體檢章）→ finding 分三桶（WEEKLY-REPORT-PIPELINE Stage 2.7）。"
