#!/usr/bin/env node
/**
 * header-gap-check.mjs — 固定表頭底下有沒有空白列、內容有沒有鑽到表頭底下
 *
 * 為什麼存在：2026-10-23 哲宇在 /data 截圖指出表頭下面又多一條空白，並說「每個版型
 * 每一頁都有出現過這個問題，我不想一個一個修」。根因是 global.css 的表頭讓位規則
 * `body.page-default main { padding-top: 56px }` 會同時套到 Layout 的
 * <main id="main-content"> 和版型自己再包的那層 <main>，兩層各 56px，內層那份就是空白；
 * 過去的修法是把版型一個一個加進豁免清單（article-page、dashboard、graph-page…），
 * 新版型一出現就再中一次。規則改成只給 #main-content 之後，本工具負責把同類回歸
 * 叫出來：量的是結果（第一個內容區塊離表頭多遠），不是哪條 CSS 怎麼寫。
 *
 * 用法（dev server 先跑起來）：
 *   node scripts/tools/header-gap-check.mjs --port 4322
 *   node scripts/tools/header-gap-check.mjs --port 4322 --routes /data/,/budget/
 *
 * 判定（首頁 page-home 的 hero 本來就疊在表頭底下，不檢查）：
 *   空白列：第一個內容區塊的上緣比表頭底部低超過 12px，而且那個區塊有自己的底色或
 *           底圖、又是滿版（深色 hero 上方那條白，才是看得出來的空白；淺色頁面上的留白、
 *           四邊留白的卡片上方的間距，只列出不算錯）
 *   被遮住：第一個內容區塊的上緣，比表頭底部高超過 2px
 * 任一路由任一寬度中招 → exit 1。404 或打不開的路由列出來但不算失敗。
 */
import { chromium } from 'playwright';

const args = process.argv.slice(2);
const getArg = (name, dflt) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : dflt;
};
const PORT = getArg('port', '4322');
const GAP_MAX = 12;
const OVERLAP_MAX = 2;

// 每種版型挑一個代表網址；新版型上線時在這裡加一列
const DEFAULT_ROUTES = [
  '/data/',
  '/budget/',
  '/companies/',
  '/opendata/',
  '/about/',
  '/explore/',
  '/latest/',
  '/map/',
  '/resources/',
  '/contribute/',
  '/changelog/',
  '/assets/',
  '/brand/',
  '/taiwan-shape/',
  '/timeline/',
  '/soundscape/',
  '/search/',
  '/dashboard/',
  '/graph/',
  '/fork-graph/',
  '/terminology/',
  '/terminology/converter/',
  '/semiont/',
  '/semiont/newsroom/',
  '/lifetree/',
  '/lifetree/%E5%90%B3%E5%93%B2%E5%AE%87/',
  '/mcp/',
  '/bench/',
  '/exams/',
  '/projects/',
  '/elections/2026/',
  '/society/',
  '/society/%E5%8F%B0%E7%81%A3%E5%B0%91%E5%AD%90%E5%8C%96%E5%8D%B1%E6%A9%9F/',
  '/en/data/',
  '/en/society/',
  '/ja/budget/',
];
const ROUTES = getArg('routes', '')
  ? getArg('routes', '').split(',')
  : DEFAULT_ROUTES;
const WIDTHS = [1280, 390];

const browser = await chromium.launch();
const bad = [];
const info = [];
const skipped = [];

for (const width of WIDTHS) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  for (const route of ROUTES) {
    let res;
    try {
      res = await page.goto(`http://localhost:${PORT}${route}`, {
        waitUntil: 'load',
        timeout: 60_000,
      });
    } catch (e) {
      skipped.push(`${route}（${width}）打不開：${e.message.split('\n')[0]}`);
      continue;
    }
    if (!res || res.status() >= 400) {
      skipped.push(`${route}（${width}）HTTP ${res?.status()}`);
      continue;
    }
    // 等表頭量完 --header-h、字型落定
    await page.waitForTimeout(400);
    const m = await page.evaluate(() => {
      const isHome = document.body.classList.contains('page-home');
      const header = document.getElementById('main-header');
      const outer = document.getElementById('main-content');
      if (!header || !outer) return { missing: true };
      const headerBottom = Math.round(header.getBoundingClientRect().bottom);
      // 第一個有尺寸的內容區塊：深度優先，跳過 <main> 本身（它的 padding 正是要量的東西）
      const walker = document.createTreeWalker(outer, NodeFilter.SHOW_ELEMENT);
      let first = null;
      let n = walker.nextNode();
      while (n) {
        const el = n;
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        if (
          el.tagName !== 'MAIN' &&
          r.height > 0 &&
          r.width > 0 &&
          cs.display !== 'none' &&
          cs.visibility !== 'hidden' &&
          cs.position !== 'fixed'
        ) {
          first = el;
          break;
        }
        n = walker.nextNode();
      }
      const firstTop = first
        ? Math.round(first.getBoundingClientRect().top + window.scrollY)
        : null;
      const nested = [...outer.querySelectorAll('main')].map((x) =>
        Math.round(parseFloat(getComputedStyle(x).paddingTop)),
      );
      // 第一個區塊有自己的底色或底圖，而且跟頁面底色不同時，它上面那段間距才看得出是一條空白
      const bgOf = (el) => {
        const cs = getComputedStyle(el);
        return { color: cs.backgroundColor, image: cs.backgroundImage };
      };
      const pageBg = bgOf(document.body).color;
      // 只看滿版的區塊：四邊留白的卡片（例如 /dashboard 的圓角 hero）上方本來就有間距
      let painted = false;
      if (first) {
        const b = bgOf(first);
        const r = first.getBoundingClientRect();
        const vw = document.documentElement.clientWidth;
        const fullBleed = r.left <= 4 && r.right >= vw - 4;
        painted =
          fullBleed &&
          (b.image !== 'none' ||
            (b.color !== 'rgba(0, 0, 0, 0)' && b.color !== pageBg));
      }
      return {
        isHome,
        painted,
        headerBottom,
        outerPad: Math.round(parseFloat(getComputedStyle(outer).paddingTop)),
        nested,
        firstTop,
        firstTag: first
          ? `${first.tagName.toLowerCase()}.${String(first.className).split(' ')[0]}`
          : '',
      };
    });
    if (m.missing) {
      skipped.push(`${route}（${width}）沒有 #main-header 或 #main-content`);
      continue;
    }
    if (m.isHome || m.firstTop === null) continue;
    const gap = m.firstTop - m.headerBottom;
    const line = `${route}（${width}px）表頭底 ${m.headerBottom}、外層讓位 ${m.outerPad}、內層 main ${JSON.stringify(m.nested)}、第一個區塊 ${m.firstTag} 在 ${m.firstTop} → 差 ${gap}px`;
    if (gap > GAP_MAX && m.painted) bad.push(`空白列 ${line}`);
    else if (gap > GAP_MAX)
      info.push(`一般間距（第一個區塊不是滿版的底色區塊）${line}`);
    else if (gap < -OVERLAP_MAX) bad.push(`被表頭蓋住 ${line}`);
  }
  await page.close();
}
await browser.close();

for (const s of skipped) console.log(`  ⏭  ${s}`);
for (const s of info) console.log(`  ·  ${s}`);
if (bad.length) {
  for (const b of bad) console.log(`  ❌ ${b}`);
  console.log(`\n${bad.length} 處表頭間距異常`);
  process.exit(1);
}
console.log(
  `✅ ${ROUTES.length} 個路由 × ${WIDTHS.length} 種寬度：表頭下方沒有空白列，也沒有內容被蓋住`,
);
