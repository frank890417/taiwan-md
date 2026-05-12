#!/usr/bin/env node
/**
 * verify-contributors.mjs
 *
 * Build-time silent-breakage detector for contributor display layer.
 *
 * 對齊 #1047 / PR #1052 review observation:
 *   contributor display 依賴兩個 standard layer 同步維護：
 *     .mailmap            — 同人多 commit identity 變體統一到 canonical name
 *     .all-contributorsrc — canonical name → {login, name} lookup
 *
 *   任一漏掉 → silent break（URL 壞 / display 用 fallback authorName）。
 *
 * 本 script 跑 git log --use-mailmap 拿所有 canonical authors，對照
 * .all-contributorsrc 用 contributorKey lookup（跟 src/utils/contributors.ts
 * 同樣 normalization 邏輯），列出 missing/URL-unsafe case，出 warning。
 *
 * 紀律：
 *   - 不 auto-add（侵犯 all-contributors bot 工作流）
 *   - 不 fail build（exit 0）— warn-only，避免 contributor onboarding 卡 build
 *
 * Hooked into npm run prebuild (跟 generate-contributors-data 平行).
 *
 * DNA refs (per #1052 哲宇 review):
 *   - DNA #52 Immune fail-loud 比缺 immune 更危險
 *   - DNA #43 derived 資料儀器化進生命週期觸發點
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';
import { spawnSync } from 'child_process';

// ── GitHub login spec (跟 src/utils/contributors.ts 對齊) ─────────────────────
// alphanumeric + single hyphens, not start/end with hyphen, max 39 chars
const GITHUB_LOGIN_REGEX = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/;

function contributorKey(value) {
  return value.toLowerCase().replace(/[\s._-]+/g, '');
}

function isUrlSafeLogin(s) {
  return GITHUB_LOGIN_REGEX.test(s);
}

// ── Load contributor profiles ────────────────────────────────────────────────
function loadProfiles() {
  const configPath = resolve(process.cwd(), '.all-contributorsrc');
  const config = JSON.parse(readFileSync(configPath, 'utf-8'));
  const byKey = new Map();
  for (const c of config.contributors || []) {
    if (!c.login || !c.name) continue;
    // 跟 src/utils/contributors.ts 同樣 set 兩個 key
    byKey.set(contributorKey(c.name), c);
    byKey.set(contributorKey(c.login), c);
  }
  return byKey;
}

// ── Get all unique mailmap-aware authors ─────────────────────────────────────
function getCanonicalAuthors() {
  // %aN/%aE 走 .mailmap (跟 src/utils/contributors.ts 同 #1052)
  // 用 spawnSync + array args 避開 shell parsing（| 在 Windows cmd 是 pipe）
  const result = spawnSync('git', ['log', '--all', '--format=%aN|%aE'], {
    encoding: 'utf-8',
    maxBuffer: 50 * 1024 * 1024,
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(`git log exited ${result.status}: ${result.stderr}`);
  }
  const out = result.stdout;
  const seen = new Map();
  for (const line of out.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const sepIdx = trimmed.indexOf('|');
    if (sepIdx < 0) continue;
    const name = trimmed.slice(0, sepIdx);
    const email = trimmed.slice(sepIdx + 1);
    if (!name) continue;
    const key = `${name}|${email}`;
    if (!seen.has(key)) seen.set(key, { name, email });
  }
  return [...seen.values()];
}

// ── Main verification ────────────────────────────────────────────────────────
function main() {
  let profiles;
  try {
    profiles = loadProfiles();
  } catch (e) {
    console.warn(`⚠️  verify-contributors: cannot load .all-contributorsrc — ${e.message}`);
    return 0;
  }

  let authors;
  try {
    authors = getCanonicalAuthors();
  } catch (e) {
    console.warn(`⚠️  verify-contributors: cannot read git log — ${e.message}`);
    return 0;
  }

  const missing = [];
  const unsafe = [];

  for (const { name, email } of authors) {
    // Skip GitHub noreply email (already covered by regex in contributors.ts)
    if (email && /@users\.noreply\.github\.com$/i.test(email)) continue;
    // Skip [bot] authors with GitHub-noreply (handled above) or bot suffix
    if (/\[bot\]$/i.test(name)) continue;

    const profile = profiles.get(contributorKey(name));
    if (!profile) {
      // canonical author 在 .all-contributorsrc 沒 entry
      missing.push({ name, email });
      continue;
    }

    if (!isUrlSafeLogin(profile.login)) {
      // profile.login 本身就不 URL-safe（極罕見，但 safety check）
      unsafe.push({ name, login: profile.login });
    }
  }

  // ── Report ─────────────────────────────────────────────────────────────────
  if (missing.length === 0 && unsafe.length === 0) {
    console.log('✅ verify-contributors: all canonical authors have valid .all-contributorsrc entries');
    return 0;
  }

  console.warn('');
  console.warn('⚠️  verify-contributors: found missing/unsafe contributor entries');
  console.warn('   (跟 contributors.ts 一樣 contributorKey lookup — 缺 entry 會走 fallback)');

  if (missing.length > 0) {
    console.warn('');
    console.warn(`   Missing .all-contributorsrc entries (${missing.length}):`);
    for (const { name, email } of missing) {
      console.warn(`     "${name}" <${email}>`);
    }
    console.warn('');
    console.warn('   建議用 all-contributors bot 補：');
    console.warn('     @all-contributors please add @<github-login> for <contribution-type>');
    console.warn('   (contribution 類型: code / content / doc / translation / bug / review / ...)');
  }

  if (unsafe.length > 0) {
    console.warn('');
    console.warn(`   URL-unsafe profile.login (${unsafe.length}):`);
    for (const { name, login } of unsafe) {
      console.warn(`     "${name}" → login "${login}"`);
    }
  }

  console.warn('');
  console.warn('   (WARN-only — does not fail build. See docs/contributors-maintenance.md)');
  console.warn('');
  return 0; // exit 0 — never fail build
}

process.exit(main());
