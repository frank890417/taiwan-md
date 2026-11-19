#!/usr/bin/env node
/**
 * check-rendered-language.mjs — 渲染層的語言正確性量測（讀者實際看到什麼）
 *
 * 這支跟另外兩支是**三重巡檢**的第三層：
 *
 *   check-ui-language.mjs        字串表層 — 進了 src/i18n 的字是不是該語言
 *   check-template-language.mjs  模板層   — .astro 裡沒進字串表的中文
 *   本檔                          渲染層   — 上面兩層都綠之後，頁面上到底還有多少中文
 *
 * 前兩支量的是**原始碼的樣態**（代理訊號）；這支量的是**讀者眼前的字**（ground truth）。
 * 兩者會分岔，而分岔的地方就是新發現：2026-08-17 首跑就靠這支才看清
 * `/ar/opendata` 的 6,051 個漢字**不是**模板寫死，是 `src/data/opendata-content.ts`
 * 型別只到 6 語、實際只有 4 語，其餘八語走 zh fallback——靜態掃描永遠看不到這件事，
 * 因為那份檔案的每一行都「正確地」是中文。同理 `/ar/map` 的縣市名來自
 * `map-markers.json`（只有 zh-TW/en/ja/ko）。
 *
 * ⚠️ 有些頁面的中文是**內容本身**，不是缺陷，讀數要分層看：
 *   - `/changelog` 十萬個漢字＝git commit 訊息逐字顯示。commit 訊息按
 *     MANIFESTO §11.4 就是要寫人話中文，不該翻。
 *   - `/latest` `/explore` 的中文＝還沒翻到該語言的文章標題（babel 的工作）。
 *   - 語言選單的「中文 English 日本語」＝endonym 慣例，每頁都有。
 *
 * 所以漢字數**不 fail**，它是報告數字：印出每條路由的量與樣本，讓人判斷哪一層要修。
 * 要拿漢字數當閘門用 `--max-han <n>`（給特定路由回歸測試用）。
 *
 * **唯一無條件 fail 的是 RAW_KEY_LEAK**（頁面印出 i18n key 本身）——那沒有任何
 * 「這個表面本來就這樣」的情境。見 §rawKeyLeaks 註解：它是這支工具的自我防呆，
 * 因為「漢字變少」跟「修好了」之間還有一個「字被 key 取代了」的狀態。
 *
 * 用法：
 *   node scripts/tools/check-rendered-language.mjs --dist dist --lang ar
 *   node scripts/tools/check-rendered-language.mjs --base http://localhost:4321 --lang ru
 *   node scripts/tools/check-rendered-language.mjs --dist dist --lang ar --route contribute --samples 20
 *   node scripts/tools/check-rendered-language.mjs --dist dist --lang ar --max-han 0   # 回歸測試
 */
import fs from 'fs';
import path from 'path';

const argv = process.argv.slice(2);
const arg = (name, dflt = null) => {
  const i = argv.indexOf(`--${name}`);
  return i === -1 ? dflt : argv[i + 1];
};
const LANG = arg('lang', 'ar');
const DIST = arg('dist');
const BASE = arg('base');
const ONLY = arg('route');
const SAMPLES = Number(arg('samples', 8));
const MAX_HAN = arg('max-han') === null ? null : Number(arg('max-han'));

const ROUTES = [
  '',
  'about',
  'assets',
  'changelog',
  'companies',
  'contribute',
  'dashboard',
  'data',
  'explore',
  'graph',
  'halls',
  'halls/1',
  'halls/4',
  'latest',
  'map',
  'mcp',
  'opendata',
  'resources',
  'soundscape',
  'taiwan-shape',
  'timeline',
];

const HAN = /\p{Script=Han}/u;
const HAN_RUN =
  /\p{Script=Han}[\p{Script=Han}\s，。、！？：；「」『』（）·0-9A-Za-z%~—-]{0,40}/gu;

/**
 * 只留「讀者看得到的字」。挖掉的東西各有理由：
 *   script/style/template  — 不渲染成文字
 *   data-* 屬性            — 地圖 marker、圖表資料整包 JSON 塞在這裡，那是資料層
 *   註解                    — 不渲染
 */
function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<template[\s\S]*?<\/template>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/\sdata-[\w-]+="[^"]*"/gi, ' ')
    .replace(/<[^>]+>/g, ' ');
}

/**
 * RAW_KEY_LEAK — 頁面上出現 i18n key 本身（`contribute.cli.audit.title`）。
 *
 * 這一查是**這支工具的自我防呆**，而且是實戰逼出來的：2026-08-17 修模板層時，
 * 模板先接了 `t('contribute.cli.audit.title')`、字串表的值還沒補進去，於是 `/ar/contribute/`
 * 渲染出一整排 key 名。此時漢字數從 456 掉到接近 0——**如果只量漢字，這支工具會報綠**，
 * 而讀者看到的是程式碼識別字。比原本的中文更糟。
 *
 * 「中文變少」不等於「翻譯好了」，中間還有一個「字消失了」的狀態。任何以「壞東西
 * 變少」為綠燈判準的量測都要問一次：它有沒有可能是被另一種壞東西取代？
 *
 * 誤報防線：`data.gov.tw`、`taiwan.md/en/` 這種真的網域要排除（首跑就命中）。
 */
const I18N_NAMESPACES =
  'about|data|contribute|ui|dashboard|map|resources|semiont|taiwanShape|home|changelog|assets|notfound|explore|latest|timeline|bench|budget|article|search|nav|footer';
const KEY_RE = new RegExp(
  `\\b(?:${I18N_NAMESPACES})(?:\\.[a-zA-Z0-9_-]+){2,}\\b`,
  'g',
);
const DOMAINY =
  /\.(?:tw|md|com|org|net|io|json|astro|ts|mjs|js|css|svg|png|webp|xml|dev|ai)$/i;

function rawKeyLeaks(text) {
  return [...new Set(text.match(KEY_RE) || [])].filter((k) => !DOMAINY.test(k));
}

async function fetchRoute(route) {
  const rel = `${LANG}${route ? '/' + route : ''}`;
  if (DIST) {
    const p = path.join(DIST, rel, 'index.html');
    if (!fs.existsSync(p)) return null;
    return fs.readFileSync(p, 'utf8');
  }
  try {
    const res = await fetch(`${BASE}/${rel}/`);
    return res.ok ? await res.text() : null;
  } catch {
    return null;
  }
}

if (!DIST && !BASE) {
  console.error('需要 --dist <dir> 或 --base <url>');
  process.exit(2);
}

const rows = [];
for (const r of ROUTES) {
  if (ONLY && r !== ONLY) continue;
  const html = await fetchRoute(r);
  if (html === null) {
    rows.push({
      route: r || '(index)',
      missing: true,
      han: 0,
      runs: [],
      keys: [],
    });
    continue;
  }
  const text = visibleText(html);
  const runs = [...new Set((text.match(HAN_RUN) || []).map((s) => s.trim()))];
  rows.push({
    route: r || '(index)',
    han: (text.match(/\p{Script=Han}/gu) || []).length,
    runs: runs.filter((s) => HAN.test(s)),
    keys: rawKeyLeaks(text),
  });
}
rows.sort((a, b) => b.han - a.han);

const total = rows.reduce((s, r) => s + r.han, 0);

// --json 給機器讀（CI／進度監看）。人看的報告每路由只列前 10 個 key，
// 拿那個數字當進度指標會被顯示上限騙——2026-08-17 我自己就把「40 → 23」
// 讀成有進展，實際是截斷差異。要計數就讀這裡，不要數報告的行數。
if (argv.includes('--json')) {
  console.log(
    JSON.stringify(
      {
        lang: LANG,
        source: DIST ? `dist:${DIST}` : BASE,
        totalHan: total,
        totalRawKeys: rows.reduce((s, r) => s + (r.keys?.length || 0), 0),
        routes: rows.map((r) => ({
          route: r.route,
          han: r.han,
          rawKeys: r.keys || [],
          missing: !!r.missing,
        })),
      },
      null,
      2,
    ),
  );
  process.exit(rows.some((r) => r.keys?.length) ? 1 : 0);
}

console.log(
  `# /${LANG}/ 渲染層漢字量測（來源：${DIST ? 'dist ' + DIST : BASE}）\n`,
);
for (const r of rows) {
  console.log(
    `${String(r.han).padStart(7)}  /${LANG}/${r.route}${r.missing ? '  [此語言無此路由]' : ''}`,
  );
}
console.log(`\n合計 ${total} 個漢字（${rows.length} 條路由）`);
console.log('\n## 樣本\n');
for (const r of rows.filter((x) => x.han > 0)) {
  console.log(`### /${LANG}/${r.route} — ${r.han} 字 / ${r.runs.length} 段`);
  for (const s of r.runs.slice(0, SAMPLES)) console.log(`   ${s}`);
  console.log('');
}

// RAW_KEY_LEAK 一律 fail，跟 --max-han 無關：讀者看到 i18n key 是硬錯，
// 沒有「這個表面本來就是這樣」的情境可以豁免。
const leaking = rows.filter((r) => r.keys && r.keys.length);
if (leaking.length) {
  console.log(`\n## ⛔ RAW_KEY_LEAK — 頁面上印出 i18n key 本身\n`);
  for (const r of leaking) {
    console.log(`  /${LANG}/${r.route}（${r.keys.length}）`);
    for (const k of r.keys.slice(0, 10)) console.log(`    ${k}`);
    if (r.keys.length > 10) console.log(`    … 另 ${r.keys.length - 10} 個`);
  }
  console.log(
    '\n  成因幾乎都是「模板接了 t() 但字串表還沒補值」。這種狀態的漢字數會很低，' +
      '\n  只量漢字會誤判成修好了——所以這一查跟漢字數是兩把不同的尺。',
  );
}

if (MAX_HAN !== null) {
  const over = rows.filter((r) => r.han > MAX_HAN);
  if (over.length) {
    console.log(
      `⛔ 超過門檻 ${MAX_HAN}：${over.map((r) => `/${LANG}/${r.route}=${r.han}`).join(' ')}`,
    );
    process.exit(1);
  }
  console.log(`✅ 所有路由漢字數 ≤ ${MAX_HAN}`);
}

if (leaking.length) process.exit(1);
