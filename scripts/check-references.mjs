#!/usr/bin/env node
/**
 * 檢查所有知識庫文章是否包含「參考資料」或「延伸閱讀」段落
 * 以及是否包含至少一個可點擊的 URL
 *
 * Usage: node scripts/check-references.mjs [--strict]
 * --strict: 沒有參考資料的文章會導致 exit code 1
 */

import { readdir, readFile } from 'fs/promises';
import { join, relative } from 'path';

const KNOWLEDGE_DIR = join(process.cwd(), 'knowledge');
const STRICT = process.argv.includes('--strict');

// 匹配參考資料段落的 pattern
const REF_PATTERNS = [
  /^##\s*(參考資料|參考文獻|資料來源|References?|Sources?|延伸閱讀|Further Reading)/im,
];

// 匹配 URL 的 pattern
const URL_PATTERN = /https?:\/\/[^\s)>\]]+/;

async function getAllMdFiles(dir) {
  const files = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await getAllMdFiles(fullPath)));
    } else if (entry.name.endsWith('.md') && !entry.name.startsWith('_')) {
      files.push(fullPath);
    }
  }
  return files;
}

async function checkFile(filePath) {
  const content = await readFile(filePath, 'utf-8');
  const relPath = relative(process.cwd(), filePath);

  const hasRefSection = REF_PATTERNS.some((p) => p.test(content));
  const hasUrl = URL_PATTERN.test(content);

  return {
    path: relPath,
    hasRefSection,
    hasUrl,
    ok: hasRefSection && hasUrl,
  };
}

async function main() {
  const files = await getAllMdFiles(KNOWLEDGE_DIR);
  const results = await Promise.all(files.map(checkFile));

  const missing = results.filter((r) => !r.ok);
  const noSection = results.filter((r) => !r.hasRefSection);
  const noUrl = results.filter((r) => r.hasRefSection && !r.hasUrl);

  console.log(`\n📚 Taiwan.md 參考資料檢查報告`);
  console.log(`${'='.repeat(50)}`);
  console.log(`總文章數: ${results.length}`);
  console.log(`✅ 有參考資料: ${results.length - missing.length}`);
  console.log(`❌ 缺參考資料段落: ${noSection.length}`);
  console.log(`⚠️  有段落但無 URL: ${noUrl.length}`);
  console.log(`${'='.repeat(50)}\n`);

  if (noSection.length > 0) {
    console.log(`❌ 缺少「參考資料」段落的文章：`);
    noSection.forEach((r) => console.log(`   - ${r.path}`));
    console.log('');
  }

  if (noUrl.length > 0) {
    console.log(`⚠️  有「參考資料」段落但沒有 URL 的文章：`);
    noUrl.forEach((r) => console.log(`   - ${r.path}`));
    console.log('');
  }

  const coverage = (
    ((results.length - missing.length) / results.length) *
    100
  ).toFixed(1);
  console.log(`📊 參考資料覆蓋率: ${coverage}%\n`);

  if (STRICT && missing.length > 0) {
    console.log('❌ STRICT 模式：有文章缺少參考資料，檢查失敗');
    process.exit(1);
  }
}

main().catch(console.error);
