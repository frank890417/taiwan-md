#!/usr/bin/env node
/**
 * Taiwan.md Content Freshness Checker
 * 掃描超過 N 天未驗證的文章，輸出需要更新的清單
 * Usage: node scripts/check-freshness.js [--days 90] [--json]
 */

import { readdir, readFile } from 'fs/promises';
import { join, relative } from 'path';
import matter from 'gray-matter';

const KNOWLEDGE_DIR = 'knowledge';
const SKIP_DIRS = new Set(['en', 'zh-TW', 'resources']);
const DEFAULT_DAYS = 90;

const args = process.argv.slice(2);
const daysIdx = args.indexOf('--days');
const maxDays = daysIdx >= 0 ? parseInt(args[daysIdx + 1]) : DEFAULT_DAYS;
const jsonOutput = args.includes('--json');

async function* walkDir(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      const rel = relative(KNOWLEDGE_DIR, path).split('/')[0];
      if (!SKIP_DIRS.has(rel)) yield* walkDir(path);
    } else if (entry.name.endsWith('.md') && !entry.name.startsWith('_')) {
      yield path;
    }
  }
}

const now = new Date();
const stale = [];
const fresh = [];
let noDate = 0;

for await (const file of walkDir(KNOWLEDGE_DIR)) {
  const content = await readFile(file, 'utf-8');
  const { data } = matter(content);

  if (!data.lastVerified) {
    noDate++;
    stale.push({
      file: relative('.', file),
      lastVerified: null,
      daysAgo: Infinity,
    });
    continue;
  }

  const verified = new Date(data.lastVerified);
  const daysAgo = Math.floor((now - verified) / (1000 * 60 * 60 * 24));
  const entry = {
    file: relative('.', file),
    lastVerified: data.lastVerified,
    daysAgo,
  };

  if (daysAgo > maxDays) stale.push(entry);
  else fresh.push(entry);
}

if (jsonOutput) {
  console.log(
    JSON.stringify({ stale, fresh: fresh.length, threshold: maxDays }, null, 2),
  );
} else {
  console.log(`\n📊 Taiwan.md Content Freshness Report`);
  console.log(`   Threshold: ${maxDays} days\n`);
  console.log(`   ✅ Fresh: ${fresh.length} articles`);
  console.log(`   ⚠️  Stale (>${maxDays} days): ${stale.length} articles`);
  if (noDate > 0) console.log(`   ❓ No date: ${noDate} articles`);

  if (stale.length > 0) {
    console.log(`\n⚠️  Articles needing verification:`);
    stale.sort((a, b) => b.daysAgo - a.daysAgo);
    for (const s of stale.slice(0, 20)) {
      const age = s.daysAgo === Infinity ? 'no date' : `${s.daysAgo}d ago`;
      console.log(`   ${s.file} (${age})`);
    }
    if (stale.length > 20) console.log(`   ... and ${stale.length - 20} more`);
  }
}
