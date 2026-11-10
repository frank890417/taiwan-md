#!/usr/bin/env node
/**
 * industry-screenshots.mjs — 專題頁的桌機／手機、淺色／深色整頁截圖（驗收用）。
 *
 * 用法：node scripts/tools/industry-screenshots.mjs [--base http://localhost:4412] [--out DIR] [--only /industry/]
 * 預設輸出 reports/research/2026-11/industry-topic/screenshots/（不進 git，見該目錄 .gitignore）。
 * 每頁另印出：<title>、H1、橫向溢出寬度、console error 數，方便不看圖也先掃一輪。
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const arg = (k, d) => {
  const i = process.argv.indexOf(k);
  return i > 0 ? process.argv[i + 1] : d;
};
const BASE = arg('--base', 'http://localhost:4412');
const OUT = resolve(
  arg('--out', 'reports/research/2026-11/industry-topic/screenshots'),
);
const ONLY = arg('--only', '');
const PAGES = [
  ['companies', '/companies/'],
  ['industry', '/industry/'],
  ['chains', '/industry/supply-chains/'],
  ['en-companies', '/en/companies/'],
  ['en-industry', '/en/industry/'],
  ['en-chains', '/en/industry/supply-chains/'],
  ['ja-industry', '/ja/industry/'],
].filter(([, p]) => !ONLY || p === ONLY);
const VIEWS = [
  ['desktop', { width: 1280, height: 800 }],
  ['mobile', { width: 375, height: 812 }],
];
const THEMES = ['light', 'dark'];

mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
for (const [name, path] of PAGES) {
  for (const [vname, viewport] of VIEWS) {
    for (const theme of THEMES) {
      const ctx = await browser.newContext({
        viewport,
        deviceScaleFactor: vname === 'mobile' ? 2 : 1,
        colorScheme: theme,
        reducedMotion: 'reduce',
      });
      await ctx.addInitScript((t) => {
        try {
          localStorage.setItem('tw-md-theme', t);
        } catch {}
      }, theme);
      const page = await ctx.newPage();
      const errors = [];
      page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
      page.on('pageerror', (e) => errors.push(String(e)));
      const res = await page.goto(BASE + path, { waitUntil: 'networkidle' });
      await page.evaluate((t) => {
        document.documentElement.setAttribute('data-theme', t);
      }, theme);
      await page.waitForTimeout(600);
      const info = await page.evaluate(() => ({
        title: document.title,
        h1: document.querySelector('h1')?.textContent?.trim(),
        overflowX:
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
        theme: document.documentElement.getAttribute('data-theme'),
      }));
      const file = `${OUT}/${name}-${vname}-${theme}.png`;
      await page.screenshot({ path: file, fullPage: true });
      console.log(
        `${res?.status()} ${path} ${vname} ${theme} overflowX=${info.overflowX} errors=${errors.length} h1=${info.h1} → ${file}`,
      );
      if (errors.length) console.log('   ', errors.slice(0, 3).join('\n    '));
      await ctx.close();
    }
  }
}
await browser.close();
