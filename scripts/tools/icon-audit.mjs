#!/usr/bin/env node
/** icon-audit — 全站圖示盤點（識別系統 v2，/brand#icons）。
 *
 * 回答三件事：
 *   1. 原始碼裡還有哪些 emoji 沒對到行線圖示（會以彩色 emoji 原樣出現在介面上）
 *   2. 哪些內嵌 <svg> 是手寫或從別的圖示庫抄來的（線寬、端點跟行線圖示不一致）
 *   3. 哪些 emoji 是在瀏覽器端用 JS 寫進去的（build 時的替換抓不到）
 * 刻意保留成文字的：國旗、🧬（Taiwan.md 簽名）、🫧（Muse 簽名）。
 * 用法：node scripts/tools/icon-audit.mjs [--json] [--top N]
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { emojiIcons, icons } from '../../src/icons/taiwan-icons.mjs';

const ROOT = new URL('../..', import.meta.url).pathname;
const SCAN = [
  'src/components',
  'src/templates',
  'src/pages',
  'src/layouts',
  'src/i18n',
  'src/data',
  'src/scripts',
  'src/utils',
];
const SKIP = /(^|\/)(content|icons)\//;
const EXT = /\.(astro|ts|js|mjs|json)$/;
const KEEP = new Set(['🫧']);
// 讀者留言的原話（src/data/feedbacks.ts）保留讀者自己打的 emoji，不換成圖示
const QUOTE_FILES = new Set(['src/data/feedbacks.ts']);
// dashboard 的模組在 dashboard-client.js render 完後統一跑 decorateUiIcons，不算漏網
const DECORATED = /^src\/scripts\/dashboard\//;
const EMOJI =
  /(?:[\u{1F1E6}-\u{1F1FF}]{2})|(?:\p{Extended_Pictographic}️?(?:‍\p{Extended_Pictographic}️?)*)/gu;
// 純文字符號（↗ ↔ © ™ 之類）不是圖示問題；只抓會畫成彩色圖的
const TEXTY = new Set([
  '©',
  '®',
  '™',
  '↔',
  '↕',
  '↖',
  '↗',
  '↘',
  '↙',
  '↩',
  '↪',
  '‼',
  '⁉',
  '▪',
  '▫',
  '▶',
  '◀',
  '◻',
  '◼',
  '◽',
  '◾',
  '☑',
  '✔',
  '✖',
  '〰',
  '〽',
  '㊗',
  '㊙',
  '℗',
  '⌚',
  '⌛',
  '⌨',
  '⏏',
  'ℹ',
  '☰',
  '✕',
  '⚙',
  '⚠',
  '✏',
  '♻',
  '☁',
  '♥',
]);

const files = [];
const walk = (d) => {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    const p = join(d, e.name);
    if (SKIP.test(relative(ROOT, p) + '/')) continue;
    if (e.isDirectory()) walk(p);
    else if (EXT.test(e.name) && statSync(p).size < 4e6) files.push(p);
  }
};
for (const d of SCAN) walk(join(ROOT, d));

const unmapped = new Map();
const runtime = new Map();
const svgs = [];
let mappedCount = 0;
for (const f of files) {
  const rel = relative(ROOT, f);
  const src = readFileSync(f, 'utf8');
  for (const m of src.matchAll(EMOJI)) {
    const e = m[0];
    const base = e.replace(/️/g, '');
    if (
      /^[\u{1F1E6}-\u{1F1FF}]{2}$/u.test(e) ||
      KEEP.has(base) ||
      QUOTE_FILES.has(rel)
    )
      continue;
    if (emojiIcons[e] || emojiIcons[base] || emojiIcons[base + '️']) {
      mappedCount++;
      // 在 <script> 或 .js/.ts 裡、看起來是 runtime 寫入的
      const before = src.slice(Math.max(0, m.index - 160), m.index);
      if (
        !DECORATED.test(rel) &&
        (/\.(js|ts|mjs)$/.test(rel) ||
          /textContent|innerHTML|insertAdjacentHTML/.test(before))
      ) {
        if (
          /textContent|innerHTML|insertAdjacentHTML|createElement/.test(src)
        ) {
          const r = runtime.get(rel) ?? new Set();
          r.add(e);
          runtime.set(rel, r);
        }
      }
      continue;
    }
    if (TEXTY.has(base)) continue;
    const u = unmapped.get(e) ?? { n: 0, files: new Map() };
    u.n++;
    u.files.set(rel, (u.files.get(rel) ?? 0) + 1);
    unmapped.set(e, u);
  }
  if (/\.astro$/.test(rel) && !rel.includes('brand.template')) {
    for (const m of src.matchAll(/<svg\b[^>]*>/g)) {
      const tag = m[0];
      if (/twmd-icon/.test(tag)) continue;
      const vb = tag.match(/viewBox="([^"]+)"/)?.[1] ?? '';
      const sw = tag.match(/stroke-width="([^"]+)"/)?.[1] ?? '';
      const line = src.slice(0, m.index).split('\n').length;
      const body = src.slice(m.index, src.indexOf('</svg>', m.index) + 6);
      const kind = /M21 21l-4\.35-4\.35|cx="11" cy="11" r="8"/.test(body)
        ? 'feather-search'
        : /9 18 15 12 9 6|15 18 9 12 15 6|6 9 12 15 18 9/.test(body)
          ? 'feather-chevron'
          : /0 0 496 512/.test(vb)
            ? 'fontawesome-cc'
            : /0 0 16 16/.test(vb) && /M8 0C3\.58/.test(body)
              ? 'octicon-github'
              : body.length > 1500
                ? 'illustration'
                : 'custom';
      svgs.push({ file: rel, line, viewBox: vb, strokeWidth: sw, kind });
    }
  }
}

const top = +(process.argv[process.argv.indexOf('--top') + 1] || 40);
const list = [...unmapped.entries()].sort((a, b) => b[1].n - a[1].n);
if (process.argv.includes('--json')) {
  console.log(
    JSON.stringify(
      {
        icons: Object.keys(icons).length,
        aliases: Object.keys(emojiIcons).length,
        mappedCount,
        unmapped: list.map(([e, u]) => ({
          emoji: e,
          n: u.n,
          files: Object.fromEntries(u.files),
        })),
        runtime: Object.fromEntries([...runtime].map(([k, v]) => [k, [...v]])),
        svgs,
      },
      null,
      2,
    ),
  );
} else {
  console.log(
    `行線圖示 ${Object.keys(icons).length} 支・emoji 對照 ${Object.keys(emojiIcons).length} 個・已對照出現 ${mappedCount} 次`,
  );
  console.log(
    `\n沒對照的 emoji：${list.length} 種、${list.reduce((s, [, u]) => s + u.n, 0)} 次（前 ${top}）`,
  );
  for (const [e, u] of list.slice(0, top))
    console.log(
      `  ${e}  ${String(u.n).padStart(4)}  ${[...u.files]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([f, n]) => `${f}×${n}`)
        .join('  ')}`,
    );
  console.log(
    `\n瀏覽器端寫入 emoji 的檔案（build 替換抓不到）：${runtime.size}`,
  );
  for (const [f, s] of runtime) console.log(`  ${f}  ${[...s].join(' ')}`);
  const byKind = {};
  for (const s of svgs) (byKind[s.kind] ??= []).push(s);
  console.log(`\n內嵌 <svg>（不含行線圖示）：${svgs.length} 個`);
  for (const [k, arr] of Object.entries(byKind))
    console.log(
      `  ${k}: ${arr.length}  ${[...new Set(arr.map((s) => s.file))].slice(0, 6).join(', ')}`,
    );
}
