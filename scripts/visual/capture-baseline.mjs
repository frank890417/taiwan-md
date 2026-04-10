#!/usr/bin/env node
/**
 * capture-baseline.mjs — Phase 0 visual baseline capture
 *
 * Captures 12 key pages × 3 viewport sizes = 36 PNGs from a running
 * preview server. Used as the "before" snapshot for every refactor PR
 * so any visual regression can be caught by `diff.mjs`.
 *
 * Usage:
 *   node scripts/visual/capture-baseline.mjs                # capture into reports/visual/current/
 *   node scripts/visual/capture-baseline.mjs --baseline     # capture into reports/visual/baseline/ and write manifest
 *   node scripts/visual/capture-baseline.mjs --url=http://localhost:4322
 *   node scripts/visual/capture-baseline.mjs --only=/history/
 *
 * Env:
 *   BASE_URL          override server URL (default http://localhost:4321)
 *   HEADED=1          run browsers in headed mode (see the windows open)
 *
 * Prereqs:
 *   - `npm run build && npm run preview` must be running in another shell
 *     (the baseline targets production build, not dev)
 *   - `npx playwright install chromium` has been run once
 */

import { chromium } from 'playwright';
import { execSync } from 'node:child_process';
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..', '..');

// --- config ---

const PAGES = [
  { name: 'home-zh', url: '/' },
  { name: 'home-en', url: '/en' },
  { name: 'hub-history', url: '/history/' },
  { name: 'hub-food', url: '/food/' },
  { name: 'article-martial-law', url: '/history/戒嚴時期/' },
  { name: 'contribute', url: '/contribute/' },
  { name: 'about', url: '/about/' },
  { name: 'data', url: '/data/' },
  { name: 'dashboard', url: '/dashboard/' },
  { name: 'map', url: '/map/' },
  { name: 'graph', url: '/graph/' },
  { name: 'taiwan-shape', url: '/taiwan-shape/' },
];

const VIEWPORTS = [
  { name: 'mobile', width: 375, height: 812, deviceScaleFactor: 2 },
  { name: 'tablet', width: 768, height: 1024, deviceScaleFactor: 2 },
  { name: 'desktop', width: 1280, height: 800, deviceScaleFactor: 1 },
];

// --- CLI parsing ---

const args = process.argv.slice(2);
const getFlag = (name) => {
  const hit = args.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.split('=').slice(1).join('=') : undefined;
};
const hasFlag = (name) => args.includes(`--${name}`);

const isBaseline = hasFlag('baseline');
const baseUrl =
  getFlag('url') || process.env.BASE_URL || 'http://localhost:4321';
const onlyFilter = getFlag('only');
const headed = process.env.HEADED === '1' || hasFlag('headed');

const outDir = isBaseline
  ? join(repoRoot, 'reports', 'visual', 'baseline')
  : join(repoRoot, 'reports', 'visual', 'current');

mkdirSync(outDir, { recursive: true });

// --- helpers ---

function getCommitHash() {
  try {
    return execSync('git rev-parse HEAD', { cwd: repoRoot }).toString().trim();
  } catch {
    return 'unknown';
  }
}

function getBranch() {
  try {
    return execSync('git rev-parse --abbrev-ref HEAD', { cwd: repoRoot })
      .toString()
      .trim();
  } catch {
    return 'unknown';
  }
}

async function checkServer() {
  try {
    const res = await fetch(baseUrl);
    if (!res.ok) throw new Error(`status ${res.status}`);
    return true;
  } catch (err) {
    console.error(`\n❌ Cannot reach ${baseUrl}`);
    console.error(`   ${err.message}`);
    console.error(`\n   Run \`npm run preview\` in another shell first.\n`);
    return false;
  }
}

// --- main ---

async function main() {
  console.log(`\n📸 Visual ${isBaseline ? 'BASELINE' : 'current'} capture`);
  console.log(`   target:   ${baseUrl}`);
  console.log(`   branch:   ${getBranch()}`);
  console.log(`   commit:   ${getCommitHash().slice(0, 7)}`);
  console.log(`   output:   ${outDir.replace(repoRoot + '/', '')}`);
  console.log(`   mode:     ${headed ? 'headed (visible)' : 'headless'}\n`);

  const serverOk = await checkServer();
  if (!serverOk) process.exit(1);

  const pages = onlyFilter
    ? PAGES.filter(
        (p) => p.url.includes(onlyFilter) || p.name.includes(onlyFilter),
      )
    : PAGES;

  if (pages.length === 0) {
    console.error(`No pages matched filter: ${onlyFilter}`);
    process.exit(1);
  }

  const browser = await chromium.launch({ headless: !headed });
  const results = [];
  let succeeded = 0;
  let failed = 0;

  try {
    for (const viewport of VIEWPORTS) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        deviceScaleFactor: viewport.deviceScaleFactor,
        // Disable animations to avoid frame-timing flakiness
        reducedMotion: 'reduce',
      });

      for (const pageDef of pages) {
        const page = await context.newPage();
        const fullUrl = baseUrl + pageDef.url;
        const fileName = `${pageDef.name}-${viewport.name}.png`;
        const filePath = join(outDir, fileName);

        try {
          await page.goto(fullUrl, {
            waitUntil: 'networkidle',
            timeout: 30_000,
          });
          // Wait for web fonts to settle so typography diffs are stable
          await page.evaluate(() => document.fonts?.ready);
          // Disable any CSS animations for stable pixels
          await page.addStyleTag({
            content: `*, *::before, *::after {
              animation-duration: 0s !important;
              animation-delay: 0s !important;
              transition-duration: 0s !important;
              transition-delay: 0s !important;
            }`,
          });
          await page.waitForTimeout(300);
          await page.screenshot({
            path: filePath,
            fullPage: true,
            animations: 'disabled',
          });
          results.push({
            page: pageDef.name,
            viewport: viewport.name,
            file: fileName,
            ok: true,
          });
          console.log(`  ✓ ${pageDef.name.padEnd(24)} ${viewport.name}`);
          succeeded++;
        } catch (err) {
          results.push({
            page: pageDef.name,
            viewport: viewport.name,
            file: fileName,
            ok: false,
            error: err.message,
          });
          console.log(
            `  ✗ ${pageDef.name.padEnd(24)} ${viewport.name}  ${err.message}`,
          );
          failed++;
        } finally {
          await page.close();
        }
      }

      await context.close();
    }
  } finally {
    await browser.close();
  }

  // Write manifest (baseline mode only; it becomes the checkpoint)
  if (isBaseline) {
    const manifest = {
      capturedAt: new Date().toISOString(),
      commit: getCommitHash(),
      branch: getBranch(),
      baseUrl,
      viewports: VIEWPORTS,
      pages: PAGES,
      results,
      summary: {
        total: results.length,
        succeeded,
        failed,
      },
    };
    writeFileSync(
      join(outDir, 'manifest.json'),
      JSON.stringify(manifest, null, 2),
    );
    console.log(`\n📋 manifest.json written`);
  }

  console.log(
    `\n${failed === 0 ? '✅' : '⚠️'}  ${succeeded}/${results.length} screenshots captured${
      failed ? `, ${failed} failed` : ''
    }\n`,
  );

  process.exit(failed > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
