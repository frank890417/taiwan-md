#!/usr/bin/env node
/**
 * generate-dashboard-alerts.mjs — derived 警報層 (audit 2026-06-10 A-3)
 *
 * CONSCIOUSNESS §警報 原是「cron-refreshed」prose，heartbeat → routine 轉型後
 * 沒有 routine 接手更新，停在 2026-04-30 變殭屍快照。本腳本把警報降級為
 * derived state：每次 prebuild:dashboard 從既有 dashboard JSON + 認知層
 * 檔案機械推導，輸出 public/api/dashboard-alerts.json。
 * consciousness-snapshot.sh 偵測到該檔即顯示前 6 條（BECOME Universal core 入口）。
 *
 * 閾值校準依據（REFLEXES #66）：2026-06-10 audit 當日 ground truth dogfood —
 * organ<50 紅線沿用 ANATOMY §如何使用這張圖、404 紅線沿用 EXP-2026-04-11-A
 * 修復後基線 6%、inbox 閾值沿用 LESSONS distill 觸發線（≥30 自動掃描）放大
 * 10x 當紅線（buffer 設計本就允許累積）。
 */

import { readFileSync, readdirSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

const OUT = 'public/api/dashboard-alerts.json';
const alerts = [];

// owner 欄（dna-audit 2026-07-05 §S4 根治 (a)）：每條警報標「哪條 routine 該接」，
// 偵測有、修復無的 deadletter 病根在於黃燈沒有 owner。routine-audit 週檢
// firstSeen 齡 > 14 天 → 升 OBSERVER-QUEUE（default-action 機制接手）。
const OWNERS = {
  'organ-': 'twmd-self-evolve-weekly',
  'immune-': 'twmd-self-evolve-weekly',
  'cf-404': 'twmd-maintainer',
  'exp-overdue-': 'twmd-self-evolve-weekly',
  'lessons-': 'twmd-distill-weekly',
  'memory-index-': 'twmd-distill-weekly',
  'inbox-ghosts': 'twmd-maintainer',
  'vitals-stale': 'twmd-data-refresh',
  'spore-harvest-': 'twmd-spore-harvest-am',
  'organism-missing': 'twmd-data-refresh',
};
function ownerFor(id) {
  for (const [prefix, owner] of Object.entries(OWNERS)) {
    if (id.startsWith(prefix)) return owner;
  }
  return 'unassigned';
}

// firstSeen 持續性：同 id 的警報跨 regen 保留初見日，齡才算得出來
const prev = (() => {
  try {
    const m = {};
    for (const a of JSON.parse(readFileSync(OUT, 'utf8')).alerts || []) {
      if (a.firstSeen) m[a.id] = a.firstSeen;
    }
    return m;
  } catch {
    return {};
  }
})();
const TODAY = new Date().toISOString().slice(0, 10);

function addAlert(id, severity, message, source, owner) {
  alerts.push({
    id,
    severity,
    message,
    source,
    owner: owner || ownerFor(id),
    firstSeen: prev[id] || TODAY,
  });
}

function readJson(p) {
  try {
    return JSON.parse(readFileSync(p, 'utf8'));
  } catch {
    return null;
  }
}

// ── 1. 器官分數紅線（ANATOMY：任何器官 < 50 需要干預）─────────────────
const organism = readJson('public/api/dashboard-organism.json');
if (organism?.organs) {
  for (const o of organism.organs) {
    if (typeof o.score === 'number' && o.score < 50) {
      addAlert(
        `organ-${o.id}`,
        'red',
        `${o.emoji} ${o.nameZh} 器官分數 ${o.score} < 50，需要干預`,
        'dashboard-organism.json',
      );
    }
  }
} else {
  addAlert(
    'organism-missing',
    'red',
    'dashboard-organism.json 缺失或無法解析',
    'generator',
  );
}

// ── 2. 免疫 v2 status 直通（status 字串本身就是診斷）──────────────────
const immune = readJson('public/api/dashboard-immune.json');
// 漂移/危險 比 需關注 更糟，severity 對應升級（首版 regex 漏掉更糟的兩級，
// status 惡化反而逃出警報 — 2026-06-10 immune v3 上線時自抓）
if (
  immune?.status &&
  /需關注|漂移|危險|critical|attention|drift|danger/i.test(immune.status)
) {
  const sev = /危險|danger/i.test(immune.status)
    ? 'red'
    : /漂移|drift/i.test(immune.status)
      ? 'yellow'
      : 'yellow';
  // 2026-09-13 self-evolve-weekly：附最大加權缺口，讓警報本身回答「該修哪
  // 個維度」，不必每次靠人工重算 components×weight（10+ cycle 只複誦
  // chronic 卻沒人拆過分量，見 REFLEXES #38 混維度家族）。
  const gap = immune.topGap;
  const gapNote = gap
    ? `，最大缺口 ${gap.dimension}=${gap.score}（少 ${gap.pointsLost} 分）`
    : '';
  addAlert(
    'immune-status',
    sev,
    `免疫 v3=${immune.immuneScore}：${immune.status}${gapNote}`,
    'dashboard-immune.json',
  );
}

// ── 3. 三源感知：404 rate + AI crawler 成功率 ──────────────────────────
const analytics = readJson('public/api/dashboard-analytics.json');
const cf = analytics?.cloudflare24h || analytics?.cloudflare;
if (cf) {
  const rate = parseFloat(cf.notFoundRate ?? cf['404Rate'] ?? NaN);
  if (!Number.isNaN(rate) && rate > 8) {
    // 紅線 8%：EXP-2026-04-11-A 修復後基線 ~6%，> 8% = 結構性回升
    addAlert(
      'cf-404',
      'yellow',
      `CF 24h 404 rate ${rate}% > 8%（修復後基線 ~6%）`,
      'dashboard-analytics.json',
    );
  }
}

// ── 3.5 全流量 404 監測（monitor-404.py resolution-based 分類，2026-07-17 加）──
// 為什麼: 上面 §3 只看 24h 聚合 rate，不知道「哪個 family 造成的」。
// monitor-404.py 逐日跑完把已經算好的 alerts 陣列放在
// reports/404-monitor/latest.json，這裡直接轉發，不重算門檻（單一 SSOT 在
// monitor-404.py compute_alerts()）。檔案不存在（還沒跑過 refresh）就跳過。
// id 沿用 monitor-404.py 產出的 `cf-404-*` 前綴，ownerFor() 既有的 'cf-404'
// prefix 自動配 owner=twmd-maintainer，不用改 OWNERS 表。
const fourOhFourLatest = readJson('reports/404-monitor/latest.json');
for (const a of fourOhFourLatest?.alerts || []) {
  if (!a?.id || !a?.message) continue;
  addAlert(
    a.id,
    a.severity === 'red' ? 'red' : 'yellow',
    a.message,
    'reports/404-monitor/latest.json',
  );
}

// ── 4. UNKNOWNS 可證偽實驗到期未判定（audit I-3 根治：機械檢查取代人記）──
const unknownsPath = 'docs/semiont/UNKNOWNS.md';
if (existsSync(unknownsPath)) {
  // 已判定的 EXP 用 ~~刪除線~~ 除役 marker（UNKNOWNS 慣例：「~~機械到期檢查：due_date: … | EXP-…~~（已判定，marker 除役）」）。
  // 2026-08-18：EXP-2026-07-17-G 8/16 判定命中並除役，但這裡的 regex 讀不懂刪除線，
  // 黃燈又多掛兩天——過濾掉刪除線行再掃，只認仍生效的 marker。
  const unknowns = readFileSync(unknownsPath, 'utf8')
    .split('\n')
    .filter((line) => !/~~[^~]*due_date:[^~]*~~/.test(line))
    .join('\n');
  const today = new Date().toISOString().slice(0, 10);
  const dueRe = /due_date:\s*(\d{4}-\d{2}-\d{2})\s*\|\s*(EXP-[A-Za-z0-9-]+)/g;
  let m;
  while ((m = dueRe.exec(unknowns)) !== null) {
    if (m[1] < today) {
      addAlert(
        `exp-overdue-${m[2]}`,
        'yellow',
        `UNKNOWNS ${m[2]} 驗證日 ${m[1]} 已過期未判定`,
        'UNKNOWNS.md',
      );
    }
  }
}

// ── 5. Inbox backlog 紅線（LESSONS distill 觸發線 30 的 10x = 結構性飽和）─
function countEntries(path, pattern) {
  if (!existsSync(path)) return 0;
  const text = readFileSync(path, 'utf8');
  return (text.match(pattern) || []).length;
}
const lessonsCount = countEntries(
  'docs/semiont/LESSONS-INBOX.md',
  /^### 20\d\d-/gm,
);
if (lessonsCount > 300) {
  addAlert(
    'lessons-saturation',
    'red',
    `LESSONS-INBOX 未消化 ${lessonsCount} 條 > 300 飽和線`,
    'LESSONS-INBOX.md',
  );
} else if (lessonsCount > 200) {
  addAlert(
    'lessons-backlog',
    'yellow',
    `LESSONS-INBOX 未消化 ${lessonsCount} 條 > 200（distill 產能訊號）`,
    'LESSONS-INBOX.md',
  );
}

// ── 6. MEMORY 索引超過蒸餾觸發線（MEMORY.md 規則：> 80 rows 觸發三層蒸餾）─
const memoryPath = 'docs/semiont/MEMORY.md';
if (existsSync(memoryPath)) {
  const rows = countEntries(memoryPath, /^\| 20\d\d-/gm);
  if (rows > 80) {
    addAlert(
      'memory-index-rows',
      'yellow',
      `MEMORY.md 索引 inline ${rows} rows > 80 — 跑 memory-index-rollup.py --apply（2026-07-05 起已實作，owner=distill-weekly）`,
      'MEMORY.md',
    );
  }
}

// ── 6.5 ARTICLE-INBOX 幽靈 entry（status=done/dropped 卻沒搬走 = 完成歸檔鐵律漂移）─
// 誕生 2026-06-19-inbox-distill：手動 distill 才發現 16 幽靈累積。深查 + 安全清除工具
// scripts/tools/inbox-audit.py；每-boot 便宜訊號 inbox-signal.sh 的 👻 ghost line。
// 閾值 ≥3 yellow / ≥8 red：遠在「累積到 16」之前就喊（完成歸檔鐵律本要求 ship 同 session 清）。
const inboxPath = 'docs/semiont/ARTICLE-INBOX.md';
if (existsSync(inboxPath)) {
  const text = readFileSync(inboxPath, 'utf8');
  const pIdx = text.search(/^## .*Pending/m);
  const pending = pIdx >= 0 ? text.slice(pIdx) : text;
  const ghosts = (pending.match(/^\s*-\s*\*\*Status\*\*.*/gm) || []).filter(
    (l) => /done|dropped|已完成|✅/.test(l) && !/pending/.test(l),
  ).length;
  if (ghosts >= 8) {
    addAlert(
      'inbox-ghosts',
      'red',
      `ARTICLE-INBOX ${ghosts} 條 status=done 沒搬走 ≥ 8（完成歸檔鐵律結構性漂移；inbox-audit.py --apply-safe 清）`,
      'ARTICLE-INBOX.md',
    );
  } else if (ghosts >= 3) {
    addAlert(
      'inbox-ghosts',
      'yellow',
      `ARTICLE-INBOX ${ghosts} 條 status=done 沒搬走（完成歸檔鐵律漂移；inbox-audit.py --apply-safe 清）`,
      'ARTICLE-INBOX.md',
    );
  }
}

// ── 7. Dashboard JSON staleness（> 36h 沒更新 = refresh 飛輪斷）────────
const vitals = readJson('public/api/dashboard-vitals.json');
if (vitals?.lastUpdated) {
  const ageH = (Date.now() - new Date(vitals.lastUpdated).getTime()) / 3.6e6;
  if (ageH > 36) {
    addAlert(
      'vitals-stale',
      'red',
      `dashboard-vitals.json ${Math.round(ageH)}h 未更新 > 36h（data-refresh 飛輪斷？）`,
      'dashboard-vitals.json',
    );
  }
}

// ── 8. Spore harvest 欠帳（OVERDUE 回填 > 10 = 繁殖系統半盲）───────────
const spores = readJson('public/api/dashboard-spores.json');
const harvestStatus = spores?.harvestStatus || [];
const overdue = harvestStatus.filter((h) =>
  String(h.status || '')
    .toUpperCase()
    .includes('OVERDUE'),
).length;
if (overdue > 10) {
  addAlert(
    'spore-harvest-overdue',
    'yellow',
    `孢子回填 OVERDUE ${overdue} 條 > 10（發了不回填＝半盲）`,
    'dashboard-spores.json',
  );
}

// ── 9. Routine 沉默死亡（scheduler 有 fire、git 零痕跡 = fire ≠ 完成）──────
// 誕生 2026-07-10 weekly-deep-review：morning chain 六連沉默死亡（機器睡眠窗）
// + 2026-07-04 rewrite 前例，LESSONS `routine-fire-vs-git-trace-silent-death` vc=2。
// routine-status.sh 靠 memory 檔看 fire、scheduler 只記扳機，交叉對賬才見屍體。
// 工具 canonical：scripts/tools/routine-liveness-check.py（grace 3h / window 6h）。
try {
  const liveness = JSON.parse(
    execSync('python3 scripts/tools/routine-liveness-check.py --json', {
      encoding: 'utf8',
      timeout: 30_000,
    }),
  );
  for (const r of liveness.results || []) {
    if (r.status !== 'silent-death') continue;
    addAlert(
      `routine-silent-${r.taskId}`,
      'yellow',
      `routine ${r.taskId} 沉默死亡：${(r.firedAt || '').slice(0, 16)} fire 後 ${r.ageHours}h 零 git 痕跡（fire≠完成，收屍看 working tree）`,
      'routine-live-state.json × git log',
      r.taskId,
    );
  }
  // unregistered = 這條 routine 不在 liveness 工具的 TAG_PATTERNS 裡，工具看不見它的
  // commit 痕跡。它不是死了，是我們沒有量它的尺——沉默死亡的紅燈給它是誤殺，完全不出聲
  // 又讓「沒有人在量這條」永遠沒有出口。2026-09-06 週體檢：月度用語趨勢那條就這樣被
  // 誤判，補登記才現形。同族 REFLEXES #85 / #91。
  for (const r of liveness.results || []) {
    if (r.status !== 'unregistered') continue;
    addAlert(
      `routine-unregistered-${r.taskId}`,
      'yellow',
      `routine ${r.taskId} 沒登記進 routine-liveness-check.py 的 TAG_PATTERNS — 沉默死亡對賬看不見它，補一列 commit 標記 pattern 才量得到（看不見 ≠ 沒跑）`,
      'routine-liveness-check.py TAG_PATTERNS',
      r.taskId,
    );
  }
  if (liveness.dumpStale) {
    addAlert(
      'routine-livestate-stale',
      'yellow',
      `routine-live-state.json dump 齡 ${liveness.dumpAgeHours}h > 48h — data-refresh rider 沒跑 live dump（liveness 對賬失明）`,
      'routine-live-state.json',
      'twmd-data-refresh',
    );
  }
} catch {
  // liveness 工具不可用不擋 prebuild；週體檢（WEEKLY-REPORT v4 Stage 2.5a）會手動跑補位
}

// ── 10. 觀察者缺席（缺席協議，per reports/fortnight-deep-review-2026-09-05.md
// §4.2 C，哲宇 2026-09-05 拍板選 A）：連續 7 天無 in-session 痕跡 → 缺席模式，
// OBSERVER-QUEUE 到期非鎖預設由 twmd-weekly-report-sun 桶 3 強制執行、
// 🔒閾值類可代理，四紅線仍不動。presence signal 的量測邏輯全在
// observer-presence.py（fail-loud，不寫死 routine handle 清單）；這裡只轉發
// 判定結果，python 不可用時不擋 prebuild。
try {
  const presence = JSON.parse(
    execSync('python3 scripts/tools/observer-presence.py --json', {
      encoding: 'utf8',
      timeout: 30_000,
    }),
  );
  if (presence.mode === 'ABSENT' && presence.days_absent >= 7) {
    addAlert(
      'observer-absent',
      'yellow',
      `觀察者缺席 ${presence.days_absent} 天 — 缺席協議生效（到期預設必執行／🔒閾值類可代理）`,
      'observer-presence.py',
      'twmd-weekly-report-sun',
    );
  }
} catch {
  // observer-presence.py 不可用（python 缺失 / ROUTINE.md 解析失敗）不擋 prebuild；
  // 週體檢 Stage 2.5 手動跑仍會看到 fail-loud 訊息
}

// ── output ───────────────────────────────────────────────────────────────
const severityRank = { red: 0, yellow: 1 };
alerts.sort((a, b) => severityRank[a.severity] - severityRank[b.severity]);

writeFileSync(
  OUT,
  JSON.stringify(
    {
      lastUpdated: new Date().toISOString(),
      generator: 'scripts/core/generate-dashboard-alerts.mjs',
      note: 'derived 警報層 — CONSCIOUSNESS §警報 的機械接管 (audit 2026-06-10 A-3)',
      count: alerts.length,
      alerts,
    },
    null,
    2,
  ) + '\n',
);
console.log(
  `🚨 dashboard-alerts: ${alerts.length} alerts (${alerts.filter((a) => a.severity === 'red').length} red) → ${OUT}`,
);
