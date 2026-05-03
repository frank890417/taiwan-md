#!/usr/bin/env node
/**
 * og-fast-poc.mjs — 驗證「單頁 + JS mutate + Playwright loop」策略
 *
 * 假設：與現行 generate-og-images.mjs 比，本策略可消除每篇 navigation +
 * font load 的重複 overhead，得到 5-15× 速度提升。
 *
 * 不依賴 Astro dev server — 用 inline HTML setContent。
 *
 * 5 個 sample（從 v3 fixture 的真實 frontmatter 抽出）共用同個 page，
 * font + DOM 載一次，每篇只跑 mutate + reflow + screenshot。
 *
 * 用法：
 *   node reports/scratch/og-fast-poc/og-fast-poc.mjs
 */

import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const outDir = join(__dirname, 'output');
mkdirSync(outDir, { recursive: true });

// === Sample manifest (mirror v3 entry shape) =================================
const SAMPLES = [
  {
    kind: 'article',
    lang: 'zh-TW',
    category: 'people',
    slug: 'cho-jung-tai',
    title: '卓榮泰',
    description:
      '38 年的協調者。2025 年 5 月，他公開不副署藍白聯手過的財劃法——是史上首位行政院長對立法院通過的法律拒絕副署。',
    breadcrumb: ['台灣', '人物', '政治人物'],
  },
  {
    kind: 'article',
    lang: 'en',
    category: 'people',
    slug: 'lu-hsiu-yen',
    title: 'Lu Hsiu-yen',
    description:
      'The undefeated mayor who walked away from the KMT chair race—and watched her 2028 default heir status overtaken by Chiang Wan-an in the polls.',
    breadcrumb: ['Taiwan', 'People', 'Politicians'],
  },
  {
    kind: 'article',
    lang: 'ja',
    category: 'food',
    slug: 'beef-noodle-soup',
    title: '台湾の牛肉麺',
    description:
      '紅焼スープから清湯まで——一杯の麺に、半世紀の戦後移住史と、台湾人の食卓の物語が詰まっている。',
    breadcrumb: ['台湾', '食文化', '麺料理'],
  },
  {
    kind: 'article',
    lang: 'ko',
    category: 'culture',
    slug: 'taiwan-cake-culture',
    title: '대만의 제과 문화',
    description:
      '백 년의 전승부터 흐르는 속까지——한 입의 전통 과자에는 세대를 잇는 가족의 이야기와 미식 혁명이 함께 녹아 있다.',
    breadcrumb: ['대만', '문화', '식문화'],
  },
  {
    kind: 'diary',
    lang: 'zh-TW',
    category: 'diary',
    slug: '2026-05-03-sleepy-colden-build-perf',
    title:
      'sleepy-colden — build perf evolve：silent regression 12 天累積 70%，重複程式碼是 bug 的孵化器',
    description:
      '觸發：build 撞 60 min timeout、per-page render 從 100ms 漲到 200~500ms。\nSession 跨度：2026-05-03 14:00 → 16:30 +0800（2h30m）。',
    breadcrumb: [],
  },
];

// === Inline HTML 模板（mirror shot-mode.css OG variant 結構）===============
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
html, body {
  width: 1200px; height: 630px;
  background: #1a3c34; color: #f4f0ea;
  font-family: 'Noto Serif TC', 'Source Han Serif TC', serif;
  overflow: hidden;
}
body[data-diary='1'] { background: #03080a; }
body[data-diary='1'] {
  background-image: linear-gradient(to bottom, #03080a 0%, #0a1612 100%);
}

.frame {
  width: 1200px; height: 630px;
  position: relative;
  padding: 12vh 6vw 6vh;
  display: flex; flex-direction: column; justify-content: flex-start;
}
body[data-diary='1'] .frame { padding: 18vh 6vw 8vh; }

.breadcrumb {
  font-size: 0.95rem; color: rgba(244, 240, 234, 0.65);
  margin-bottom: 1.6rem;
  font-family: system-ui, -apple-system, sans-serif;
}
.breadcrumb span:not(:last-child)::after {
  content: ' › '; color: rgba(244, 240, 234, 0.45);
}

h1.hero-title {
  font-family: 'Noto Serif TC', serif !important;
  font-weight: 900;
  font-size: 3.75rem; /* 60px */
  line-height: 1.2;
  margin-bottom: 1.25rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: #f4f0ea;
}
body[data-diary='1'] h1.hero-title {
  font-size: 3.5rem;
  font-weight: 900;
}

p.description {
  font-family: 'Noto Serif TC', serif;
  font-size: 1.2rem;
  line-height: 1.65;
  max-width: min(860px, 75%);
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: rgba(244, 240, 234, 0.85);
}

.watermark {
  position: absolute;
  right: 48px; bottom: 40px;
  font-family: 'Noto Serif TC', serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: rgba(244, 240, 234, 0.7);
  letter-spacing: 0.05em;
}
.watermark::before {
  content: '🧬 ';
  filter: hue-rotate(120deg) saturate(0.6);
}
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
window.__renderOG = ({ kind, lang, category, slug, title, description, breadcrumb }) => {
  document.documentElement.lang = lang;
  if (kind === 'diary') {
    document.body.setAttribute('data-diary', '1');
  } else {
    document.body.removeAttribute('data-diary');
  }
  const bc = document.getElementById('breadcrumb');
  bc.innerHTML = '';
  if (breadcrumb && breadcrumb.length) {
    bc.style.display = '';
    breadcrumb.forEach(b => {
      const s = document.createElement('span');
      s.textContent = b;
      bc.appendChild(s);
    });
  } else {
    bc.style.display = 'none';
  }
  document.getElementById('title').textContent = title;
  document.getElementById('description').textContent = description || '';
};
window.__waitFontReady = async () => {
  await document.fonts.ready;
  await document.fonts.load('900 60px "Noto Serif TC"');
  await document.fonts.load('400 19px "Noto Serif TC"');
  return document.fonts.check('900 60px "Noto Serif TC"');
};
window.__doubleRaf = () => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
</script>
</body>
</html>`;

// === Main =====================================================================
async function main() {
  console.log('\n🧪 OG Fast POC — single-page + JS mutate + screenshot loop\n');
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
  });
  const page = await ctx.newPage();

  // === Phase 1: setup once ==================================================
  const t0 = Date.now();
  await page.setContent(TEMPLATE_HTML, { waitUntil: 'domcontentloaded' });
  // Wait for font CSS to apply
  await page.waitForFunction(() => typeof window.__waitFontReady === 'function');
  const fontOk = await page.evaluate(() => window.__waitFontReady());
  const tSetup = Date.now() - t0;
  console.log(`   setup (page + font): ${tSetup}ms (font ready: ${fontOk})\n`);

  // === Phase 2: loop ========================================================
  const perEntry = [];
  for (const [i, entry] of SAMPLES.entries()) {
    const tEntry = Date.now();
    await page.evaluate((data) => window.__renderOG(data), entry);
    await page.evaluate(() => window.__doubleRaf());
    const outPath = join(outDir, `${entry.lang}__${entry.slug}.jpg`);
    await page.screenshot({
      path: outPath,
      type: 'jpeg',
      quality: 85,
      clip: { x: 0, y: 0, width: 1200, height: 630 },
      animations: 'disabled',
    });
    const elapsed = Date.now() - tEntry;
    perEntry.push({ slug: entry.slug, lang: entry.lang, elapsedMs: elapsed });
    console.log(`   [${i + 1}/${SAMPLES.length}] ${entry.lang}/${entry.slug} ${elapsed}ms`);
  }

  await browser.close();

  const totalLoop = perEntry.reduce((a, b) => a + b.elapsedMs, 0);
  const avgPerEntry = totalLoop / perEntry.length;

  // === Report ===============================================================
  const summary = {
    samples: SAMPLES.length,
    setupMs: tSetup,
    loopMsTotal: totalLoop,
    avgPerEntryMs: Math.round(avgPerEntry),
    perEntry,
  };
  writeFileSync(join(outDir, 'timing.json'), JSON.stringify(summary, null, 2));

  console.log(`\n📊 Summary`);
  console.log(`   setup           : ${tSetup}ms (one-time)`);
  console.log(`   loop total      : ${totalLoop}ms`);
  console.log(`   avg per entry   : ${avgPerEntry.toFixed(0)}ms`);
  console.log(`   timing.json     : ${join(outDir, 'timing.json')}`);
  console.log(`   sample images   : ${outDir}\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
