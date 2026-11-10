#!/usr/bin/env node
/**
 * check-industry-i18n.mjs — 專題字串對賬（對應 /budget 的 check-budget-i18n.py）。
 *
 * 1. zh.ts 與 en.ts 的鍵要完全一致。
 * 2. 內容檔（src/data/industry/content/*.json）每個文字節點 zh、en 都要有、都不是空字串。
 * 3. data/industry/i18n/{lang}.json：列出各語言缺幾個鍵、多了哪些不認得的鍵、佔位符 {x} 有沒有跟 en 對上。
 *    缺鍵只警告（頁面會回退 en）；多餘的鍵與佔位符不符是錯誤。
 * 另：--dump-en PATH 把 en 全表（UI＋內容）寫成 JSON，給翻譯當來源。
 *
 * 用法：node --experimental-strip-types scripts/tools/check-industry-i18n.mjs [--dump-en PATH]
 */
import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const { zh } = await import(resolve(ROOT, 'src/i18n/industry/zh.ts'));
const { en } = await import(resolve(ROOT, 'src/i18n/industry/en.ts'));
const { flattenContent } = await import(
  resolve(ROOT, 'src/i18n/industry/flatten.ts')
);

let errors = 0;
const err = (m) => {
  errors++;
  console.error('❌', m);
};

// 1. UI 鍵
const zk = new Set(Object.keys(zh));
const ek = new Set(Object.keys(en));
for (const k of zk) if (!ek.has(k)) err(`en.ts 缺鍵 ${k}`);
for (const k of ek) if (!zk.has(k)) err(`en.ts 多了 zh.ts 沒有的鍵 ${k}`);

// 2. 內容檔
const cdir = resolve(ROOT, 'src/data/industry/content');
const cz = {};
const ce = {};
for (const f of readdirSync(cdir).filter((f) => f.endsWith('.json'))) {
  const data = JSON.parse(readFileSync(resolve(cdir, f), 'utf8'));
  flattenContent(data, f.replace('.json', ''), cz, ce);
  const half = JSON.stringify(data).match(/\{"zh":"[^"]*"\}|\{"en":"[^"]*"\}/g);
  if (half)
    err(`${f} 有只寫了一種語言的文字節點：${half.slice(0, 3).join(' ')}`);
}
for (const [k, v] of Object.entries(cz))
  if (!v.trim()) err(`內容 ${k} 的 zh 是空的`);
for (const [k, v] of Object.entries(ce))
  if (!v.trim()) err(`內容 ${k} 的 en 是空的`);

const allEn = { ...en, ...ce };
const allZh = { ...zh, ...cz };
const ph = (s) => (s.match(/\{\w+\}/g) || []).sort().join(',');
for (const k of Object.keys(en)) {
  // zh 與 en 的佔位符不必相同（例：{total} 與 {totalB}），但 en 用到的必須是 template 會給的；這裡只提示差異
  if (ph(zh[k]) !== ph(en[k])) {
    console.log(
      `ℹ️ 佔位符不同（確認是刻意的）：${k}  zh[${ph(zh[k])}] en[${ph(en[k])}]`,
    );
  }
}

// 3. 其他語言
const idir = resolve(ROOT, 'data/industry/i18n');
const total = Object.keys(allEn).length;
if (existsSync(idir)) {
  for (const f of readdirSync(idir).filter(
    (f) => f.endsWith('.json') && !f.startsWith('_'),
  )) {
    const d = JSON.parse(readFileSync(resolve(idir, f), 'utf8'));
    const missing = Object.keys(allEn).filter((k) => !(k in d));
    const extra = Object.keys(d).filter((k) => !(k in allEn));
    for (const k of extra) err(`${f} 有不認得的鍵 ${k}`);
    for (const [k, v] of Object.entries(d)) {
      if (k in allEn && ph(String(v)) !== ph(allEn[k])) {
        err(
          `${f} 的 ${k} 佔位符 [${ph(String(v))}] 跟 en [${ph(allEn[k])}] 不同`,
        );
      }
      if (typeof v !== 'string' || !v.trim()) err(`${f} 的 ${k} 是空的`);
    }
    console.log(
      `${missing.length ? '⚠️' : '✅'} ${f}：${total - missing.length}/${total} 鍵${missing.length ? `，缺 ${missing.length}（回退 en），例：${missing.slice(0, 3).join(', ')}` : ''}`,
    );
  }
}

const i = process.argv.indexOf('--dump-en');
if (i > 0) {
  writeFileSync(process.argv[i + 1], JSON.stringify(allEn, null, 1) + '\n');
  console.log(`wrote ${process.argv[i + 1]}（${total} 鍵）`);
}
console.log(
  `UI 鍵 ${zk.size}、內容鍵 ${Object.keys(cz).length}、合計 ${Object.keys(allZh).length}`,
);
process.exit(errors ? 1 : 0);
