#!/usr/bin/env node
/**
 * og-fast-poc-scale.mjs — 規模化測試：50 篇看 per-entry 是否穩定
 *
 * 用 cho-jung-tai 的 sample 重複 N 次（變化 title 後綴）來模擬 50 篇 batch。
 * 重點不是內容真實性，是測量 mutate + reflow + screenshot 的均值與 P95。
 *
 * 用法：
 *   node reports/scratch/og-fast-poc/og-fast-poc-scale.mjs [N]
 */

import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const outDir = join(__dirname, 'output-scale');
mkdirSync(outDir, { recursive: true });

const N = parseInt(process.argv[2] || '50', 10);

// 模擬不同長度標題與不同語言混合
const TITLES = [
  '台灣高鐵',
  '李洋',
  '草東沒有派對',
  'sleepy-colden — build perf evolve：silent regression 12 天累積 70%，重複程式碼是 bug 的孵化器',
  'Lu Hsiu-yen',
  '台湾の牛肉麺',
  '대만의 제과 문화',
  '從鄭成功到日本殖民：台灣四百年史的關鍵轉折',
  '林強',
  '報導者：公民社會把調查報導從營業項目救成公共財',
  'justfont 與台灣字體發展',
  '海底電纜：矽盾頂上看得到，命脈底下看不見',
];

const SAMPLES = Array.from({ length: N }, (_, i) => {
  const title = TITLES[i % TITLES.length];
  return {
    kind: i % 9 === 0 ? 'diary' : 'article',
    lang: ['zh-TW', 'en', 'ja', 'ko', 'es', 'fr'][i % 6],
    category: ['people', 'culture', 'food', 'history', 'art'][i % 5],
    slug: `sample-${String(i + 1).padStart(3, '0')}`,
    title: `${title} ${i + 1}`,
    description:
      '這是一個測試描述用來模擬真實 OG 圖片的內容長度——含中文標點、英文混排、line-clamp 觸發條件。',
    breadcrumb: ['台灣', '人物', '政治人物'],
  };
});

const TEMPLATE_HTML = `<!doctype html>
<html lang="zh-TW">
<head>
<meta charset="utf-8">
<title>OG Batch</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;700;900&display=swap" rel="stylesheet">
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { width: 1200px; height: 630px; background: #1a3c34; color: #f4f0ea; font-family: 'Noto Serif TC', serif; overflow: hidden; }
body[data-diary='1'] { background: linear-gradient(to bottom, #03080a, #0a1612); }
.frame { width: 1200px; height: 630px; position: relative; padding: 12vh 6vw 6vh; }
body[data-diary='1'] .frame { padding: 18vh 6vw 8vh; }
.breadcrumb { font-size: 0.95rem; color: rgba(244,240,234,.65); margin-bottom: 1.6rem; font-family: system-ui, sans-serif; }
.breadcrumb span:not(:last-child)::after { content: ' › '; color: rgba(244,240,234,.45); }
h1.hero-title { font-family: 'Noto Serif TC', serif !important; font-weight: 900; font-size: 3.75rem; line-height: 1.2; margin-bottom: 1.25rem; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; color: #f4f0ea; }
body[data-diary='1'] h1.hero-title { font-size: 3.5rem; }
p.description { font-family: 'Noto Serif TC', serif; font-size: 1.2rem; line-height: 1.65; max-width: min(860px, 75%); display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; color: rgba(244,240,234,.85); }
.watermark { position: absolute; right: 48px; bottom: 40px; font-family: 'Noto Serif TC', serif; font-size: 1.1rem; font-weight: 700; color: rgba(244,240,234,.7); letter-spacing: 0.05em; }
.watermark::before { content: '🧬 '; }
</style>
</head>
<body>
<div class="frame">
  <nav class="breadcrumb" id="breadcrumb"></nav>
  <h1 class="hero-title" id="title"></h1>
  <p class="description" id="description"></p>
  <div class="watermark">taiwan.md</div>
</div>
<script>
window.__renderOG = ({ kind, lang, title, description, breadcrumb }) => {
  document.documentElement.lang = lang;
  if (kind === 'diary') document.body.setAttribute('data-diary', '1');
  else document.body.removeAttribute('data-diary');
  const bc = document.getElementById('breadcrumb');
  bc.innerHTML = '';
  if (breadcrumb && breadcrumb.length) { bc.style.display = ''; breadcrumb.forEach(b => { const s = document.createElement('span'); s.textContent = b; bc.appendChild(s); }); }
  else bc.style.display = 'none';
  document.getElementById('title').textContent = title;
  document.getElementById('description').textContent = description || '';
};
window.__waitFontReady = async () => {
  await document.fonts.ready;
  await document.fonts.load('900 60px "Noto Serif TC"');
  return document.fonts.check('900 60px "Noto Serif TC"');
};
window.__doubleRaf = () => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
</script>
</body>
</html>`;

async function main() {
  console.log(`\n🧪 OG Fast POC — Scale test (N=${N})\n`);
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
  });
  const page = await ctx.newPage();

  const t0 = Date.now();
  await page.setContent(TEMPLATE_HTML, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => typeof window.__waitFontReady === 'function');
  await page.evaluate(() => window.__waitFontReady());
  const tSetup = Date.now() - t0;
  console.log(`   setup: ${tSetup}ms\n`);

  const tLoopStart = Date.now();
  const perEntry = [];
  for (const [i, entry] of SAMPLES.entries()) {
    const tEntry = Date.now();
    await page.evaluate((data) => window.__renderOG(data), entry);
    await page.evaluate(() => window.__doubleRaf());
    await page.screenshot({
      path: join(outDir, `${entry.slug}.jpg`),
      type: 'jpeg',
      quality: 85,
      clip: { x: 0, y: 0, width: 1200, height: 630 },
      animations: 'disabled',
    });
    const elapsed = Date.now() - tEntry;
    perEntry.push(elapsed);
    if ((i + 1) % 10 === 0) {
      const recent = perEntry.slice(-10);
      const avgRecent = recent.reduce((a, b) => a + b, 0) / recent.length;
      console.log(`   [${i + 1}/${N}] last 10 avg: ${avgRecent.toFixed(0)}ms`);
    }
  }
  const tLoop = Date.now() - tLoopStart;
  await browser.close();

  // Stats
  const sorted = [...perEntry].sort((a, b) => a - b);
  const p50 = sorted[Math.floor(sorted.length * 0.5)];
  const p95 = sorted[Math.floor(sorted.length * 0.95)];
  const min = sorted[0];
  const max = sorted[sorted.length - 1];
  const mean = perEntry.reduce((a, b) => a + b, 0) / perEntry.length;

  const summary = {
    n: N,
    setupMs: tSetup,
    loopMsTotal: tLoop,
    avg: Math.round(mean),
    p50,
    p95,
    min,
    max,
    perEntry,
  };
  writeFileSync(join(outDir, 'timing.json'), JSON.stringify(summary, null, 2));

  console.log(`\n📊 Stats over ${N} entries`);
  console.log(`   setup           : ${tSetup}ms (one-time)`);
  console.log(`   loop total      : ${tLoop}ms`);
  console.log(`   wall-clock total: ${tSetup + tLoop}ms`);
  console.log(`   per entry mean  : ${mean.toFixed(0)}ms`);
  console.log(`   per entry p50   : ${p50}ms`);
  console.log(`   per entry p95   : ${p95}ms`);
  console.log(`   per entry min   : ${min}ms`);
  console.log(`   per entry max   : ${max}ms`);
  console.log(`   throughput      : ${(N / ((tSetup + tLoop) / 1000)).toFixed(1)} img/s\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
