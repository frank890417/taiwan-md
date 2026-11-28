#!/usr/bin/env node
// deploy-cloudflare.mjs — 把建好的 ./dist 部署到 Cloudflare Workers 靜態資產。
//
// 這支腳本裡沒有任何帳號資訊。全部從環境變數來（本機放在 repo 外面的設定檔，
// CI 放在 GitHub Actions 的 secrets），所以 fork 的人填自己的就能用：
//
//   TWMD_CF_WORKER_NAME      必填。Worker 的名字。沒設就直接跳過、結束碼 0。
//   CLOUDFLARE_ACCOUNT_ID    wrangler 自己會讀。
//   CLOUDFLARE_API_TOKEN     CI 上要設；本機用 `wrangler login` 的登入就不用。
//   TWMD_CF_CUSTOM_DOMAIN    選填。設了就把這個網域掛到 Worker（正式站用）。
//                            沒設就只開 workers.dev 的網址（測試用）。
//   TWMD_CF_NOINDEX=1        選填。整站加上「不給搜尋引擎收錄」的標頭。
//                            測試用的複本一定要開，不然會被當成重複內容。
//
// 用法：node scripts/ci/deploy-cloudflare.mjs [distDir]
//
// Cloudflare 只會上傳內容有變的檔（它拿每個檔的雜湊比對），所以改幾篇文章的
// 部署只傳幾百個檔。wrangler 設定檔是每次在暫存目錄現產的，不留在 repo。
// 背景：reports/cloudflare-migration-plan-2026-11-28.md

import { spawnSync } from 'node:child_process';
import {
  existsSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const WRANGLER_VERSION = '4.169.0';
const name = process.env.TWMD_CF_WORKER_NAME;
if (!name) {
  console.log(
    '[deploy-cloudflare] 沒有設 TWMD_CF_WORKER_NAME，跳過 Cloudflare 部署。',
  );
  process.exit(0);
}
if (process.env.CI && !process.env.CLOUDFLARE_API_TOKEN) {
  console.log(
    '[deploy-cloudflare] CI 上沒有 CLOUDFLARE_API_TOKEN，跳過 Cloudflare 部署。',
  );
  process.exit(0);
}
const dist = resolve(process.argv[2] ?? 'dist');
if (!existsSync(join(dist, 'index.html'))) {
  console.error(`[deploy-cloudflare] ⛔ ${dist} 裡沒有 index.html，先建置。`);
  process.exit(1);
}

// 測試複本：在標頭規則最前面加一條 noindex
const headersPath = join(dist, '_headers');
const baseHeaders = existsSync(headersPath)
  ? readFileSync(headersPath, 'utf8')
  : '';
const NOINDEX_MARK = '# [deploy-cloudflare] noindex';
if (
  process.env.TWMD_CF_NOINDEX === '1' &&
  !baseHeaders.includes(NOINDEX_MARK)
) {
  writeFileSync(
    headersPath,
    `${NOINDEX_MARK}（測試複本，不給搜尋引擎收錄）\n/*\n  X-Robots-Tag: noindex, nofollow\n\n${baseHeaders}`,
  );
}

const customDomain = process.env.TWMD_CF_CUSTOM_DOMAIN;
const config = {
  name,
  compatibility_date: '2026-11-01',
  workers_dev: !customDomain,
  preview_urls: false,
  ...(customDomain
    ? { routes: [{ pattern: customDomain, custom_domain: true }] }
    : {}),
  assets: {
    directory: dist,
    // /foo 轉到 /foo/，跟 GitHub Pages 一樣
    html_handling: 'auto-trailing-slash',
    // 找不到的網址回最近的 404.html、狀態碼 404
    not_found_handling: '404-page',
  },
};
const tmp = mkdtempSync(join(tmpdir(), 'twmd-cf-'));
const configPath = join(tmp, 'wrangler.json');
writeFileSync(configPath, JSON.stringify(config, null, 2));

const t0 = Date.now();
const r = spawnSync(
  'npx',
  ['-y', `wrangler@${WRANGLER_VERSION}`, 'deploy', '--config', configPath],
  { stdio: ['ignore', 'pipe', 'pipe'], encoding: 'utf8', cwd: tmp },
);
rmSync(tmp, { recursive: true, force: true });
const out = `${r.stdout ?? ''}${r.stderr ?? ''}`;
// 只印摘要：逐檔清單太長，而且輸出裡的網址帶有帳號的子網域
const keep = out
  .split('\n')
  .filter((l) =>
    /Found|Success|No updated|Uploaded|ERROR|error|✘|Version ID/.test(l),
  )
  .filter((l) => !/Uploaded \d+ of \d+/.test(l))
  .map((l) => l.replace(/https?:\/\/\S+/g, '<網址略>'));
console.log(keep.join('\n'));
const secs = ((Date.now() - t0) / 1000).toFixed(1);
if (r.status !== 0) {
  console.error(`[deploy-cloudflare] ⛔ 部署失敗（${secs} 秒）`);
  console.error(
    out
      .split('\n')
      .slice(-30)
      .join('\n')
      .replace(/https?:\/\/\S+/g, '<網址略>'),
  );
  process.exit(r.status ?? 1);
}
console.log(`[deploy-cloudflare] 完成，${secs} 秒`);
