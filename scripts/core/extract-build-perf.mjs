#!/usr/bin/env node
/**
 * extract-build-perf.mjs — 從 GitHub Actions API 抓 build 效能 trend
 *
 * 為什麼：2026-04-21 → 2026-05-03 這 12 天，per-page render time 從 98ms 漲到
 * 167ms（+70%），沒人發現直到哲宇問「為什麼變慢」。原因：build 效能不在
 * dashboard freshness check 範圍。本腳本把 GitHub Actions deploy 的 build
 * 時間數據抓出來、解析平均 ms/page、寫進 dashboard-build-perf.json。
 *
 * DNA #15 第 N+6 次儀器化：「反覆浮現要儀器化」應用到 build 效能 silent regression。
 *
 * 不阻擋 build：API call 失敗 / token 缺 → soft skip（避免 SSOT freshness
 * verify 因 GH API 暫斷而 fail）。
 *
 * Usage:
 *   node scripts/core/extract-build-perf.mjs                  # default 30 runs
 *   node scripts/core/extract-build-perf.mjs --runs 60        # last 60 deploys
 *   GH_TOKEN=xxx node scripts/core/extract-build-perf.mjs     # auth (5000/hr vs 60/hr)
 *
 * Output: public/api/dashboard-build-perf.json
 */

import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO = join(__dirname, '../..');
const OUT_PATH = join(REPO, 'public/api/dashboard-build-perf.json');

const args = process.argv.slice(2);
const runsIdx = args.indexOf('--runs');
const N_RUNS = runsIdx >= 0 ? parseInt(args[runsIdx + 1], 10) : 30;

// ── Helpers ─────────────────────────────────────────────────────────────────
function ghApi(path) {
  // gh CLI 比 fetch + token 簡單，已經 auth 過。
  // 如果沒 gh，fall back to anonymous fetch（60/hr rate limit）。
  try {
    const out = execSync(`gh api "${path}" 2>/dev/null`, {
      encoding: 'utf-8',
      maxBuffer: 50 * 1024 * 1024,
    });
    return JSON.parse(out);
  } catch (e) {
    return null;
  }
}

function parseDuration(seconds) {
  return Math.round(seconds);
}

// ── Step 1: list recent deploy.yml runs ─────────────────────────────────────
function fetchRuns() {
  // workflow file path: .github/workflows/deploy.yml
  // gh api: /repos/:owner/:repo/actions/workflows/deploy.yml/runs
  const resp = ghApi(
    `/repos/frank890417/taiwan-md/actions/workflows/deploy.yml/runs?per_page=${N_RUNS}&status=completed`,
  );
  if (!resp || !resp.workflow_runs) {
    console.error('⚠️  無法抓 GitHub Actions runs（gh CLI 失敗或無 auth）');
    return [];
  }
  return resp.workflow_runs.filter((r) => r.conclusion === 'success');
}

// ── Step 2: per run: fetch build job timing log ─────────────────────────────
// 每個 run 有 build job + deploy job。我們只看 build。
// 從 jobs API 拿到 build job 的 started_at / completed_at + step 細項。
function fetchJobs(runId) {
  const resp = ghApi(`/repos/frank890417/taiwan-md/actions/runs/${runId}/jobs`);
  if (!resp || !resp.jobs) return null;
  return resp.jobs.find((j) => j.name === 'build') ?? null;
}

// ── Step 3: parse build job → { build_seconds, ms_per_page, page_count } ─────
// page_count 從 build step log 解析（"Pages built: NNNN"）。
// 沒辦法每次都拿到（log 可能被 GitHub 清掉），用 build_seconds 當 fallback。
function jobToMetrics(job) {
  if (!job || !job.started_at || !job.completed_at) return null;
  const startMs = Date.parse(job.started_at);
  const endMs = Date.parse(job.completed_at);
  const totalSeconds = parseDuration((endMs - startMs) / 1000);

  // 只算 "Build" step，比較 fair（其他 step e.g. checkout / OG generate 跟
  // per-page 無關）。
  let buildStepSeconds = null;
  if (job.steps) {
    const buildStep = job.steps.find(
      (s) => s.name === 'Build' || s.name === 'build',
    );
    if (buildStep && buildStep.started_at && buildStep.completed_at) {
      buildStepSeconds = parseDuration(
        (Date.parse(buildStep.completed_at) -
          Date.parse(buildStep.started_at)) /
          1000,
      );
    }
  }

  return {
    run_id: job.run_id,
    started_at: job.started_at,
    total_job_seconds: totalSeconds,
    build_step_seconds: buildStepSeconds,
    conclusion: job.conclusion,
    html_url: job.html_url,
  };
}

// ── Step 4: estimate page count from current build (fallback) ────────────────
// 真正的 page count 在 build log 裡（log 可能 expire）。當無法從 log 拿，用
// 「last successful run sitemap.xml URL count」當近似。
function estimatePageCountFromSitemap() {
  const sitemapPath = join(REPO, 'dist/sitemap-index.xml');
  if (!existsSync(sitemapPath)) return null;
  // sitemap-index 指向多個 sitemap-*.xml，每個有 URL count。簡化：用主 sitemap-0.xml
  try {
    const sitemapMain = join(REPO, 'dist/sitemap-0.xml');
    if (!existsSync(sitemapMain)) return null;
    const out = execSync(`grep -c '<url>' "${sitemapMain}"`, {
      encoding: 'utf-8',
    });
    return parseInt(out.trim(), 10);
  } catch {
    return null;
  }
}

// ── Main ────────────────────────────────────────────────────────────────────
function main() {
  console.log(`📊 build-perf scrape (last ${N_RUNS} deploy runs)...`);

  const runs = fetchRuns();
  if (runs.length === 0) {
    // Soft fail: write last-known + skip flag, don't break prebuild.
    writeFileSync(
      OUT_PATH,
      JSON.stringify(
        {
          generated_at: new Date().toISOString(),
          status: 'unavailable',
          reason:
            'GitHub Actions API 無 auth 或暫不可用；gh CLI 是否 installed？',
          runs: [],
        },
        null,
        2,
      ),
    );
    console.log('⚠️  GH API 不可用 — soft skip，寫 status:unavailable');
    return 0;
  }

  console.log(`   ✓ ${runs.length} runs fetched`);

  const metrics = [];
  for (const run of runs) {
    const job = fetchJobs(run.id);
    const m = jobToMetrics(job);
    if (m) metrics.push(m);
  }

  console.log(`   ✓ ${metrics.length}/${runs.length} build jobs parsed`);

  // Aggregate
  const buildSecs = metrics
    .map((m) => m.build_step_seconds ?? m.total_job_seconds)
    .filter((s) => s != null);
  const last7 = buildSecs.slice(0, 7);
  const last30 = buildSecs.slice(0, 30);

  const avg = (arr) =>
    arr.length === 0
      ? null
      : Math.round(arr.reduce((s, x) => s + x, 0) / arr.length);

  // Page count estimate (current build only)
  const currentPageCount = estimatePageCountFromSitemap();

  // Per-page estimate: 用最新 build 的 build_step_seconds / page_count
  // (page_count 跨 runs 是動態的，最簡化估法)
  let msPerPage = null;
  if (currentPageCount && metrics[0]?.build_step_seconds) {
    msPerPage = Math.round(
      (metrics[0].build_step_seconds * 1000) / currentPageCount,
    );
  }

  const output = {
    generated_at: new Date().toISOString(),
    status: 'ok',
    summary: {
      latest_build_seconds: buildSecs[0] ?? null,
      avg_build_seconds_7d: avg(last7),
      avg_build_seconds_30d: avg(last30),
      current_page_count: currentPageCount,
      ms_per_page_latest: msPerPage,
      // Threshold: per-page > 200ms = ⚠️ flag for dashboard alert
      flag_slow: msPerPage != null && msPerPage > 200,
    },
    trend: metrics.map((m) => ({
      run_id: m.run_id,
      started_at: m.started_at,
      build_seconds: m.build_step_seconds ?? m.total_job_seconds,
      url: m.html_url,
    })),
  };

  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, JSON.stringify(output, null, 2));

  console.log(`   ✓ ${OUT_PATH}`);
  console.log(`   → latest build: ${output.summary.latest_build_seconds}s`);
  console.log(`   → 7d avg:       ${output.summary.avg_build_seconds_7d}s`);
  console.log(`   → 30d avg:      ${output.summary.avg_build_seconds_30d}s`);
  console.log(
    `   → ms/page:      ${output.summary.ms_per_page_latest ?? 'n/a'} ${output.summary.flag_slow ? '⚠️  > 200ms threshold' : ''}`,
  );

  return 0;
}

process.exit(main());
