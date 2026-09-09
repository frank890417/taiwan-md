#!/usr/bin/env node
/**
 * triage.mjs — Feedback → GitHub issue（cron routine twmd-feedback-triage 的執行體）。
 *
 * 流程：讀新回報 → spam/dedupe/分類（classify.mjs 純函式）→ 開 GitHub issue
 *       （對齊既有 template,只放 display_name 不放 email）→ 回寫 status。
 *
 * §自主權邊界：本 script 只做「把讀者原話機械性 routing 成 issue」（= 代讀者填表單,
 * verbatim + 署名 + provenance）。**不**以維護者身份回覆 / close / merge —— 那留給
 * MAINTAINER-PIPELINE 的人類 gate。
 *
 * 安全預設：--dry-run 是 DEFAULT。要真的開 issue + 回寫必須顯式 --commit。
 *
 * 用法：
 *   node scripts/feedback/triage.mjs                      # dry-run,讀 Supabase（需 env）
 *   node scripts/feedback/triage.mjs --seed <file.json>   # dry-run,讀 JSON fixture（離線測試）
 *   node scripts/feedback/triage.mjs --commit             # 真的開 issue + 回寫（routine 用）
 *   node scripts/feedback/triage.mjs --commit --exclude <feedback-id>
 *                                                        # 同上,但指名跳過某筆（status 不動）
 *
 * --exclude 存在的理由：當班判斷某筆不能開成公開 issue（例：指涉具名第三人的指控)時,
 * 若沒有單筆排除的辦法,唯一走法是整條 --commit 不跑 —— 留言 sync 與 HG12b/HG12c 兩道
 * 對賬會跟著轉錄那半一起消失（LESSONS `zero-input-cycle-drops-the-reconciliation`）。
 * 被排除的筆 status 維持 new（留給人類決定怎麼收尾）,且一定印在報表上,不靜默。
 *
 * env（正式跑才需要,放 ~/.taiwanmd-feedback.env 或環境變數）：
 *   SUPABASE_URL, SUPABASE_SERVICE_KEY
 */
import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  existsSync,
  readdirSync,
} from 'node:fs';
import { dirname, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';
import { triageBatch } from './lib/classify.mjs';
import {
  buildArchiveRecord,
  mergeComments,
  archiveRelPath,
  reconcileArchive,
  reconcileComments,
  countArchivedComments,
} from './lib/archive.mjs';

const ARCHIVE_ROOT = 'docs/feedback/archive';

const REPO = 'frank890417/taiwan-md';

export function parseArgs(argv) {
  const a = { commit: false, seed: null, limit: 50, exclude: [], show: [] };
  for (let i = 2; i < argv.length; i++) {
    const v = argv[i];
    if (v === '--commit') a.commit = true;
    else if (v === '--dry-run') a.commit = false;
    else if (v === '--seed') a.seed = argv[++i];
    else if (v === '--limit') a.limit = parseInt(argv[++i], 10) || 50;
    // 可重複,也接受逗號串（--exclude a,b）。
    else if (v === '--exclude')
      a.exclude.push(
        ...String(argv[++i] || '')
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
      );
    // --show：唯讀印出指名那幾筆的全文,同樣可重複／逗號串。
    else if (v === '--show')
      a.show.push(
        ...String(argv[++i] || '')
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
      );
    // 不帶 id 的 --show 印出這批全部（當班要一次讀完今天的輸入時用）。
    else if (v === '--show-all') a.show.push('*');
  }
  return a;
}

/**
 * 把 --exclude 指名的筆從這一輪的轉錄裡拿掉。回傳 { kept, excluded, unmatched }。
 * unmatched = 指名了但這批裡沒有的 id —— 一定要報出來,否則一個打錯字的 id 會讓當班
 * 以為攔住了,實際照開（silent default = silent failure,REFLEXES #60）。
 */
export function partitionExcluded(rows, excludeIds) {
  const want = new Set(excludeIds || []);
  if (want.size === 0) return { kept: rows, excluded: [], unmatched: [] };
  const kept = [];
  const excluded = [];
  for (const r of rows) (want.has(r.id) ? excluded : kept).push(r);
  const seen = new Set(excluded.map((r) => r.id));
  return { kept, excluded, unmatched: [...want].filter((id) => !seen.has(id)) };
}

/**
 * 挑出 --show 指名的那幾筆。`'*'`（--show-all）代表整批。
 * 回傳 { found, missing } —— missing 一定要報,否則打錯一個 id 會安靜印出空清單,
 * 當班會把「我沒看到可疑內容」跟「我根本沒查到那筆」讀成同一件事（REFLEXES #38 混維度）。
 */
export function selectForShow(rows, showIds) {
  const want = new Set(showIds || []);
  if (want.size === 0) return { found: [], missing: [] };
  if (want.has('*')) return { found: rows, missing: [] };
  const found = rows.filter((r) => want.has(r.id));
  const seen = new Set(found.map((r) => r.id));
  return { found, missing: [...want].filter((id) => !seen.has(id)) };
}

/**
 * 把一筆 feedback 印成當班讀得完的全文（唯讀,不碰 status／不碰 GitHub）。
 * HG13 要求「讀完全文才准動手」,而在這之前這條線上沒有任何入口能讀到 body ——
 * 十四輪都靠當班自己手寫一段 Supabase REST 查詢即興補上（LESSONS
 * `mandatory-read-step-has-no-tool`）。
 */
export function formatForShow(row) {
  const meta = [
    ['id', row.id],
    ['created_at', row.created_at],
    ['type', row.type],
    ['lang', row.lang],
    ['display_name', row.display_name],
    ['article_slug', row.article_slug],
    ['article_title', row.article_title],
    ['source_url', row.source_url],
    ['status', row.status],
  ]
    .map(([k, v]) => `  ${k.padEnd(14)} ${v ?? ''}`)
    .join('\n');
  const quote = row.quote ? `\n  --- 讀者選取的原文 ---\n${row.quote}\n` : '';
  return `${'='.repeat(72)}\n${meta}\n${quote}\n  --- 回報全文 ---\n${row.body ?? ''}\n`;
}

/**
 * 佇列空的那一輪,把「最近一筆回報是什麼時候」印成流程給的一行。
 *
 * `fetched 0` 同時是「讀者沒話說」跟「讀者送不進來」的長相,而整條線的閘門與對賬
 * 全長在讀取端之後,沒有一道在問「該進來的有沒有進得來」(LESSONS
 * `empty-intake-cannot-distinguish-quiet-from-broken`)。這一行不做判斷、不設閾值——
 * 只把當班本來要手寫一段 Supabase 查詢才看得到的事實擺到報表上,跟 `--show` 當初
 * 補的是同一種洞:必經的動作要有入口,不能靠當班自覺。
 *
 * 但書:任何 status 的新列都會排在這個排序最上面,所以它證明的是「讀取端沒在漏接」;
 * 寫入端今天送一筆會不會成功,這一行看不到,那要從寫入端戳才知道。
 */
export function formatIntakeAge(latest, now = new Date()) {
  if (latest === null)
    return '[triage] 最近一筆回報：查不到（未對賬,不等於沒有）';
  if (latest === undefined || !latest.created_at)
    return '[triage] 最近一筆回報：這張表一筆都沒有';
  const days = (now - new Date(latest.created_at)) / 86400000;
  return `[triage] 最近一筆回報：${latest.created_at.slice(0, 10)}（距今 ${days.toFixed(1)} 天,status=${latest.status}）· 讀取端沒在漏接;寫入端是否通暢本行看不到`;
}

async function fetchLatestFeedback() {
  loadEnvFile();
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) return null;
  try {
    const endpoint = `${url}/rest/v1/feedback?select=id,created_at,status,type&order=created_at.desc&limit=1`;
    const res = await fetch(endpoint, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
    });
    if (!res.ok) return null;
    const rows = await res.json();
    // 抓不到回 null、真的空表回 undefined —— 兩種根因不共用一個長相
    // (同 HG12c `fetchIssueComments()` 的紀律)。
    return rows.length ? rows[0] : undefined;
  } catch {
    return null;
  }
}

// ── data source ───────────────────────────────────────────────────────────────
function loadEnvFile() {
  // 讀 ~/.taiwanmd-feedback.env（KEY=VALUE 一行一條）進 process.env(不覆蓋已存在)。
  try {
    const home = process.env.HOME || '';
    const txt = readFileSync(`${home}/.taiwanmd-feedback.env`, 'utf8');
    for (const line of txt.split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]])
        process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  } catch {
    /* 沒有就算了 */
  }
}

async function fetchNewFeedback(limit) {
  loadEnvFile();
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) {
    throw new Error(
      'SUPABASE_URL / SUPABASE_SERVICE_KEY 未設定（放 ~/.taiwanmd-feedback.env）。離線測試請用 --seed。',
    );
  }
  const endpoint = `${url}/rest/v1/feedback?status=eq.new&order=created_at.asc&limit=${limit}`;
  const res = await fetch(endpoint, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  });
  if (!res.ok)
    throw new Error(`Supabase REST ${res.status}: ${await res.text()}`);
  return res.json();
}

async function writeBackStatus(id, status, issue, note) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  const patch = {
    status,
    triaged_at: new Date().toISOString(),
    ...(issue ? { issue_url: issue.url, issue_number: issue.number } : {}),
    ...(note ? { triage_note: note } : {}),
  };
  const res = await fetch(`${url}/rest/v1/feedback?id=eq.${id}`, {
    method: 'PATCH',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(patch),
  });
  if (!res.ok) throw new Error(`write-back ${res.status}: ${await res.text()}`);
}

// ── github ────────────────────────────────────────────────────────────────────
function listOpenIssues() {
  try {
    const out = execFileSync(
      'gh',
      [
        'issue',
        'list',
        '--repo',
        REPO,
        '--state',
        'open',
        '--limit',
        '200',
        '--json',
        'title,body,number',
      ],
      { encoding: 'utf8' },
    );
    return JSON.parse(out);
  } catch (e) {
    console.warn(
      '[triage] gh issue list failed, dedupe vs existing skipped:',
      e.message,
    );
    return [];
  }
}

function createIssue(issue) {
  const args = [
    'issue',
    'create',
    '--repo',
    REPO,
    '--title',
    issue.title,
    '--body',
    issue.body,
  ];
  for (const l of issue.labels) args.push('--label', l);
  const out = execFileSync('gh', args, { encoding: 'utf8' }).trim();
  // gh prints the issue URL on success
  const url = out.split('\n').pop().trim();
  const num = parseInt((url.match(/\/issues\/(\d+)/) || [])[1] || '0', 10);
  return { url, number: num };
}

// ── batch-cluster consolidated report（同 slug ≥ 閾值 → 1 份 artifact 給維護者）──
function writeClusterReport(slug, held, mode) {
  const date = new Date().toISOString().slice(0, 10);
  const safe = slug.replace(/[^\w一-鿿-]+/g, '_');
  const rel = `reports/feedback-clusters/${date}-${safe}.md`;
  if (mode !== 'COMMIT') return rel;
  try {
    mkdirSync(dirname(rel), { recursive: true });
    if (existsSync(rel)) return rel; // 同日重跑不重寫(回報維持 new 會再 hold 一次)
    const rows = held.map((h, i) => {
      const r = h.row;
      const quote = r.quote
        ? `\n   > 選取原文：${String(r.quote).replace(/\n/g, ' ')}`
        : '';
      const fix = r.correct_info ? `\n   - 更正建議：${r.correct_info}` : '';
      return `${i + 1}. **${r.display_name || '匿名讀者'}** (${(r.created_at || '').slice(0, 16)}) · feedback id \`${r.id}\`${quote}\n   - 回報：${r.body}${fix}`;
    });
    writeFileSync(
      rel,
      `# Feedback cluster hold：${slug}（${held.length} 筆，${date}）\n\n` +
        `> 同一篇文章單一 batch ≥ ${held.length} 筆非 spam 回報，batch-cluster guard 自動 hold。\n` +
        `> 全部回報維持 Supabase status=new（不逐筆開 issue）。維護者決策後：開 1 個\n` +
        `> consolidated issue 或直接走 REWRITE 修文，再把這批標 filed/rejected。\n\n` +
        rows.join('\n') +
        `\n\n---\n_由 twmd-feedback-triage batch-cluster guard 產出（classify.mjs BATCH_CLUSTER_THRESHOLD）_\n`,
    );
  } catch (e) {
    console.warn(
      `[triage] cluster report write failed for ${slug}:`,
      e.message,
    );
  }
  return rel;
}

// ── git archive（主權層：feedback + 溝通紀錄落進 repo）──────────────────────────
function writeArchive(row, note) {
  const rel = archiveRelPath(row);
  try {
    mkdirSync(dirname(rel), { recursive: true });
    if (!existsSync(rel)) {
      writeFileSync(
        rel,
        buildArchiveRecord({ ...row, triage_note: note }, note),
      );
    }
    return rel;
  } catch (e) {
    console.warn(`[triage] archive write failed for ${row.id}:`, e.message);
    return null;
  }
}

// 抓不到一律回 null，抓到但真的沒留言才回 []。這兩件事以前共用 `[]`，於是
// 「這則 issue 沒有新留言」跟「gh 掛了 / token 過期 / API 變形」印出來一模一樣
// （都是 archive-comments-synced=0），沒有任何 cycle 會變紅（REFLEXES #38 混維度）。
function fetchIssueComments(issueNumber) {
  try {
    const out = execFileSync(
      'gh',
      [
        'issue',
        'view',
        String(issueNumber),
        '--repo',
        REPO,
        '--json',
        'comments',
      ],
      { encoding: 'utf8' },
    );
    const data = JSON.parse(out);
    return (data.comments || []).map((c) => ({
      id: `${c.author?.login || '?'}-${c.createdAt}`,
      author: c.author?.login || '?',
      createdAt: c.createdAt,
      body: c.body,
    }));
  } catch {
    return null;
  }
}

// 掃 archive dir，把每筆已 filed 紀錄的 issue 新留言 sync 進 §溝通紀錄（人類維護者
// 的回覆也進 git）。回傳更新的檔數。
// 回傳 { scanned, synced }：synced 單獨看是 proxy 訊號 — 0 分不出「掃了 36 檔都沒新留言」
// 跟「一檔都沒掃到（目錄消失／權限壞）」。scanned 讓收官數字是量出來的，不是手數的。
function syncArchiveComments() {
  if (!existsSync(ARCHIVE_ROOT))
    return { scanned: 0, synced: 0, ids: [], commentEntries: [] };
  let scanned = 0;
  let synced = 0;
  const ids = [];
  // HG12c 對賬用：每份紀錄「已收幾則 / 線上有幾則」，live=null 代表這次沒抓到。
  const commentEntries = [];
  for (const m of readdirSync(ARCHIVE_ROOT)) {
    const dir = join(ARCHIVE_ROOT, m);
    let files = [];
    try {
      files = readdirSync(dir).filter((f) => f.endsWith('.md'));
    } catch {
      continue;
    }
    for (const f of files) {
      const path = join(dir, f);
      let content;
      try {
        content = readFileSync(path, 'utf8');
      } catch {
        continue;
      }
      scanned++;
      ids.push(f.replace(/\.md$/, ''));
      const num = (content.match(/^issue_number:\s*(\d+)/m) || [])[1];
      if (!num) continue;
      const live = fetchIssueComments(num);
      // 抓不到就不寫檔（不確定的時候不動 git 紀錄），但要記進對賬當 unknown。
      const merged = live === null ? content : mergeComments(content, live);
      if (merged !== content) {
        writeFileSync(path, merged);
        synced++;
      }
      commentEntries.push({
        issue: Number(num),
        archived: countArchivedComments(merged),
        live: live === null ? null : live.length,
      });
    }
  }
  return { scanned, synced, ids, commentEntries };
}

// 拿 Supabase 全部 filed 的 id 當對賬另一邊的帳。讀失敗一律回 null（對賬印 unavailable，
// 不讓一次網路抖動變成 routine fail）——但也不准把 null 讀成「對得起來」。
async function fetchFiledIds() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) return null;
  try {
    const res = await fetch(
      `${url}/rest/v1/feedback?select=id&status=eq.filed`,
      { headers: { apikey: key, Authorization: `Bearer ${key}` } },
    );
    if (!res.ok) return null;
    return (await res.json()).map((r) => r.id);
  } catch {
    return null;
  }
}

// ── main ──────────────────────────────────────────────────────────────────────
async function main() {
  const args = parseArgs(process.argv);
  const mode = args.commit ? 'COMMIT' : 'DRY-RUN';

  let rows;
  if (args.seed) {
    rows = JSON.parse(readFileSync(args.seed, 'utf8'));
    console.log(
      `[triage] seed=${args.seed} (${rows.length} rows) · mode=${mode}`,
    );
  } else {
    rows = await fetchNewFeedback(args.limit);
    console.log(`[triage] fetched ${rows.length} new feedback · mode=${mode}`);
    if (rows.length === 0)
      console.log(formatIntakeAge(await fetchLatestFeedback()));
  }

  // --show：唯讀印全文就收工。HG13 要求讀完內容才准動手,這是那道動作的入口;
  // 它不碰 status、不碰 GitHub、不寫 archive,所以放在所有副作用之前直接 return。
  if (args.show.length) {
    const sel = selectForShow(rows, args.show);
    for (const r of sel.found) console.log(formatForShow(r));
    for (const id of sel.missing) {
      console.log(
        `  ⚠️ --show id=${id} 在這批 status=new 裡找不到（不是「內容沒問題」,是根本沒查到這筆）`,
      );
    }
    console.log(
      `\n[triage] show-only · 印出 ${sel.found.length} 筆全文 · 未開任何 issue、未回寫任何 status`,
    );
    return { show: sel.found.length, missing: sel.missing.length };
  }

  // --exclude：當班指名不轉錄的筆先拿掉（status 不動),讓保管那半（留言 sync + 兩道對賬）
  // 不必為了攔一筆而整條停擺。排除永遠印出來,打錯的 id 也印。
  const part = partitionExcluded(rows, args.exclude);
  for (const r of part.excluded) {
    console.log(
      `  EXCLUDE id=${r.id} · --exclude 指名跳過（status 維持 new,留人類決定收尾）`,
    );
  }
  for (const id of part.unmatched) {
    console.log(
      `  ⚠️ --exclude id=${id} 在這批 status=new 裡找不到（沒有攔到任何東西,確認 id 是否打錯）`,
    );
  }
  rows = part.kept;

  const existing = args.commit ? listOpenIssues() : [];
  const results = triageBatch(rows, existing);

  const summary = { file: 0, reject: 0, skip: 0, hold: 0 };
  for (const r of results) {
    summary[r.decision]++;
    const tag = r.decision.toUpperCase().padEnd(6);
    if (r.decision === 'hold') {
      console.log(`  ${tag} id=${r.row.id} · ${r.reason}`);
      continue; // status 不回寫(維持 new);cluster report 統一在迴圈後寫
    }
    if (r.decision === 'file') {
      console.log(`  ${tag} [${r.issue.type}] ${r.issue.title}`);
      // id 印在 FILE 行上:報表原本只有 type + 文章標題,而標題會隨文章語言換一副面孔,
      // 當班無法一眼認出「這筆昨天看過」。認得一筆靠的該是它的 id,不是它今天穿什麼。
      console.log(
        `         id=${r.row.id} · labels: ${r.issue.labels.join(', ')}`,
      );
      if (args.commit) {
        const created = createIssue(r.issue);
        await writeBackStatus(r.row.id, 'filed', created, r.note);
        const arch = writeArchive(
          {
            ...r.row,
            status: 'filed',
            issue_url: created.url,
            issue_number: created.number,
          },
          r.note,
        );
        console.log(`         → ${created.url}${arch ? ` · 📁 ${arch}` : ''}`);
      } else {
        console.log(`         (dry-run; --commit to file)`);
      }
    } else {
      console.log(`  ${tag} id=${r.row.id} · ${r.reason}`);
      if (args.commit && r.decision === 'reject') {
        await writeBackStatus(r.row.id, 'rejected', null, r.note);
      }
      // skip(dup) 不改 status:留著下次再判（避免漏接真不同的回報）
    }
  }

  // batch-cluster：每個 held slug 產 1 份 consolidated report 給維護者決策。
  const clusters = new Map();
  for (const r of results) {
    if (r.decision !== 'hold') continue;
    if (!clusters.has(r.cluster)) clusters.set(r.cluster, []);
    clusters.get(r.cluster).push(r);
  }
  for (const [slug, held] of clusters) {
    const rel = writeClusterReport(slug, held, mode);
    console.log(
      `  HOLD→  cluster「${slug}」 ${held.length} 筆 → ${rel}${mode === 'COMMIT' ? '' : ' (dry-run)'}`,
    );
  }

  // sync 既有 filed 紀錄的 issue 新留言（維護者回覆）進 git archive。
  // dry-run 不跑真實 scan，故印 skipped 而非 0——避免「沒掃」被讀成「掃過沒事」。
  const arch = args.commit ? syncArchiveComments() : null;

  // HG12 對賬：filed 筆數 vs git 紀錄份數。缺席不留痕跡,所以要拿另一邊的帳來比,
  // 不能只印「掃到幾份」（那是 proxy signal,per REFLEXES #82）。
  let reconLine = 'archive-reconcile=skipped (dry-run)';
  if (arch) {
    const filedIds = args.seed ? null : await fetchFiledIds();
    if (!filedIds) {
      reconLine = 'archive-reconcile=unavailable (Supabase 讀不到,未對賬)';
    } else {
      const rec = reconcileArchive(filedIds, arch.ids);
      reconLine =
        rec.missing.length === 0
          ? `archive-reconcile=${rec.archived}/${rec.filed} ✅`
          : `⚠️ archive-reconcile=${rec.archived}/${rec.filed} · filed 但無 git 紀錄 ${rec.missing.length} 筆（HG12 破口）: ${rec.missing.slice(0, 5).join(', ')}${rec.missing.length > 5 ? ' …' : ''}`;
    }
  }

  // HG12c 留言層對賬：§溝通紀錄 收的則數 vs GitHub 線上則數。
  // archive-comments-synced=0 自己分不出「沒有新留言」跟「一則都抓不到」,要拿線上的帳來比。
  let commentLine = 'comment-reconcile=skipped (dry-run)';
  if (arch) {
    const cr = reconcileComments(arch.commentEntries);
    // 同一個 issue 可能對到多份紀錄（consolidated 那批）,列號碼時去重才讀得懂。
    const issues = (rows) => {
      const uniq = [...new Set(rows.map((r) => `#${r.issue}`))];
      return uniq.slice(0, 5).join(', ') + (uniq.length > 5 ? ' …' : '');
    };
    const parts = [`comment-reconcile=${cr.aligned}/${cr.checked}`];
    if (cr.missing.length)
      parts.push(
        `⚠️ 漏收 ${cr.missing.length} 份紀錄（HG12c 破口）: ${issues(cr.missing)}`,
      );
    if (cr.unknown.length)
      parts.push(
        `⚠️ 抓不到留言 ${cr.unknown.length} 份紀錄（未對賬,不等於對得起來）: ${issues(cr.unknown)}`,
      );
    if (cr.deleted.length)
      parts.push(
        `上游已刪留言 ${cr.deleted.length} 份紀錄,git 留著: ${issues(cr.deleted)}`,
      );
    const clean = !cr.missing.length && !cr.unknown.length;
    commentLine = parts.join(' · ') + (clean ? ' ✅' : '');
  }

  console.log(
    `\n[triage] done · file=${summary.file} reject=${summary.reject} skip=${summary.skip} hold=${summary.hold}` +
      (part.excluded.length ? ` exclude=${part.excluded.length}` : '') +
      ' · ' +
      (arch
        ? `archive-scanned=${arch.scanned} archive-comments-synced=${arch.synced}`
        : `archive-scan=skipped (dry-run)`),
  );
  console.log(`[triage] ${reconLine}`);
  console.log(`[triage] ${commentLine}`);
  return summary;
}

// 只有被當指令跑才執行 main；被 test 或其他 script import 時只拿純函式
// （parseArgs / partitionExcluded），不會順手打 Supabase。
const invokedDirectly =
  process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (invokedDirectly) {
  main().catch((e) => {
    console.error('[triage] FATAL:', e.message);
    process.exit(1);
  });
}
