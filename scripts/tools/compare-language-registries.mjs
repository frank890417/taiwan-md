#!/usr/bin/env node
/** Compare every field in the TypeScript and Node language registries. */

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { LANGUAGES as MJS_LANGUAGES } from '../../src/config/languages.mjs';

const SCRIPT_PATH = fileURLToPath(import.meta.url);
const REPO_ROOT = path.resolve(path.dirname(SCRIPT_PATH), '../..');
const TS_REGISTRY = path.join(REPO_ROOT, 'src/config/languages.ts');
const FIELDS = [
  'code',
  'displayName',
  'hreflang',
  'isDefault',
  'enabled',
  'notes',
  'dir',
];

function extractArrayLiteral(source) {
  const marker = 'export const LANGUAGES =';
  const markerIndex = source.indexOf(marker);
  const start = source.indexOf('[', markerIndex + marker.length);
  if (markerIndex === -1 || start === -1) {
    throw new Error('找不到 `export const LANGUAGES = [...]`');
  }

  let depth = 0;
  let quote = null;
  let escaped = false;
  let lineComment = false;
  let blockComment = false;

  for (let index = start; index < source.length; index += 1) {
    const char = source[index];
    const next = source[index + 1];

    if (lineComment) {
      if (char === '\n') lineComment = false;
      continue;
    }
    if (blockComment) {
      if (char === '*' && next === '/') {
        blockComment = false;
        index += 1;
      }
      continue;
    }
    if (quote) {
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === quote) quote = null;
      continue;
    }
    if (char === '/' && next === '/') {
      lineComment = true;
      index += 1;
      continue;
    }
    if (char === '/' && next === '*') {
      blockComment = true;
      index += 1;
      continue;
    }
    if (char === "'" || char === '"' || char === '`') {
      quote = char;
      continue;
    }
    if (char === '[') depth += 1;
    if (char === ']') {
      depth -= 1;
      if (depth === 0) return source.slice(start, index + 1);
    }
  }

  throw new Error('LANGUAGES array 沒有完整結束');
}

function normalize(entries) {
  return entries.map((entry) =>
    Object.fromEntries(
      FIELDS.map((field) => [
        field,
        entry[field] === undefined ? null : entry[field],
      ]),
    ),
  );
}

export function readTsLanguages(source = fs.readFileSync(TS_REGISTRY, 'utf8')) {
  const literal = extractArrayLiteral(source);
  return vm.runInNewContext(`(${literal})`, Object.create(null), {
    timeout: 1_000,
  });
}

export function compareRegistries(tsLanguages, mjsLanguages) {
  const ts = normalize(tsLanguages);
  const mjs = normalize(mjsLanguages);
  if (JSON.stringify(ts) === JSON.stringify(mjs)) return null;

  const length = Math.max(ts.length, mjs.length);
  for (let index = 0; index < length; index += 1) {
    if (!ts[index] || !mjs[index]) {
      return {
        index,
        field: 'entry',
        ts: ts[index] ?? null,
        mjs: mjs[index] ?? null,
      };
    }
    const field = FIELDS.find(
      (name) =>
        JSON.stringify(ts[index][name]) !== JSON.stringify(mjs[index][name]),
    );
    if (field) {
      return { index, field, ts: ts[index][field], mjs: mjs[index][field] };
    }
  }
  return { index: -1, field: 'unknown', ts, mjs };
}

export function main() {
  let tsLanguages;
  try {
    tsLanguages = readTsLanguages();
  } catch (error) {
    console.error(
      `❌ 無法讀取 ${path.relative(REPO_ROOT, TS_REGISTRY)}：${error.message}`,
    );
    console.error(
      '   如果 LANGUAGES 的結構改了，請一起更新 compare-language-registries.mjs。',
    );
    return 1;
  }

  const mismatch = compareRegistries(tsLanguages, MJS_LANGUAGES);
  if (mismatch) {
    const code =
      tsLanguages[mismatch.index]?.code ??
      MJS_LANGUAGES[mismatch.index]?.code ??
      'unknown';
    console.error('❌ Language registry drift detected.');
    console.error(
      `   Entry ${mismatch.index + 1} (${code}), field: ${mismatch.field}`,
    );
    console.error(`   languages.ts:  ${JSON.stringify(mismatch.ts)}`);
    console.error(`   languages.mjs: ${JSON.stringify(mismatch.mjs)}`);
    console.error(
      '   Update both registry files so their order and field values match.',
    );
    return 1;
  }

  console.log(
    `✅ Language registry fields are in sync (${tsLanguages.length} languages)`,
  );
  return 0;
}

if (path.resolve(process.argv[1] || '') === SCRIPT_PATH) {
  process.exitCode = main();
}
