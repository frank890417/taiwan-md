#!/usr/bin/env node
/**
 * render.mjs — App 內容包產線第一步：knowledge/ → 每語一份 NDJSON。
 *
 * 用網站同一支渲染器（src/utils/article-render.ts 的 renderArticleHtml），
 * 所以 App 裡看到的 tw-* 模組、腳註、策展人筆記跟網站一致。
 * 第二步 pack.py 把 NDJSON 打成 SQLite。契約：reports/ios-app-implementation-plan-2026-11-02.md §四。
 *
 * 用法：node scripts/app/render.mjs --out <dir> [--langs zh-TW,en] [--limit N]
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { createJiti } from 'jiti';

const ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../..',
);
const jiti = createJiti(import.meta.url);
const { renderArticleHtml } = await jiti.import(
  path.join(ROOT, 'src/utils/article-render.ts'),
);

// 跟 src/utils/rawArticle.ts CATEGORY_TO_FOLDER 同一份分類（網址用小寫）
const CATEGORIES = [
  'About',
  'History',
  'Geography',
  'Culture',
  'Food',
  'Art',
  'Music',
  'Technology',
  'Nature',
  'People',
  'Politics',
  'Society',
  'Economy',
  'Lifestyle',
];
const ALL_LANGS = [
  'zh-TW',
  'en',
  'ja',
  'ko',
  'es',
  'fr',
  'vi',
  'id',
  'pt',
  'hi',
  'ar',
  'ru',
  'de',
];

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i === -1 ? fallback : process.argv[i + 1];
}
const outDir = arg('out');
if (!outDir) {
  console.error('需要 --out <dir>');
  process.exit(2);
}
const langs = arg('langs', ALL_LANGS.join(',')).split(',');
const limit = Number(arg('limit', '0')) || 0;
fs.mkdirSync(outDir, { recursive: true });

// 網站的 git 修改時間（prebuild 產出；沒有就退回 frontmatter date）
let contentDates = {};
let createdDates = {};
try {
  const cd = JSON.parse(
    fs.readFileSync(path.join(ROOT, 'src/data/content-dates.json'), 'utf8'),
  );
  contentDates = cd.dates ?? {};
  createdDates = cd.created ?? {};
} catch {}

const toDate = (v) => {
  if (!v) return null;
  if (v instanceof Date) return isNaN(v) ? null : v.toISOString().slice(0, 10);
  return String(v).slice(0, 10);
};

const ENTITIES = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  '#39': "'",
  nbsp: ' ',
};
function htmlToText(html) {
  return html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<\/(p|h[1-6]|li|blockquote|tr|div|section|figure)>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&(#\d+|#x[0-9a-f]+|\w+);/gi, (m, e) => {
      if (e[0] === '#') {
        const n =
          e[1] === 'x' || e[1] === 'X'
            ? parseInt(e.slice(2), 16)
            : parseInt(e.slice(1), 10);
        return Number.isFinite(n) ? String.fromCodePoint(n) : m;
      }
      return ENTITIES[e.toLowerCase()] ?? m;
    })
    .replace(/[ \t ]+/g, ' ')
    .replace(/\s*\n\s*/g, '\n')
    .trim();
}

// 離線時 iframe 只是一塊空白：換成佔位卡＋外連
function replaceIframes(html) {
  return html.replace(
    /<iframe\b[^>]*\bsrc=["']([^"']+)["'][^>]*>\s*<\/iframe>/gi,
    (_, src) => {
      const m = src.match(/youtube(?:-nocookie)?\.com\/embed\/([\w-]{6,})/);
      const href = m ? `https://www.youtube.com/watch?v=${m[1]}` : src;
      const label = m ? 'YouTube' : new URL(src, 'https://taiwan.md/').hostname;
      return `<a class="tw-app-embed" href="${href}" data-embed="${m ? 'youtube' : 'iframe'}">▶ ${label}</a>`;
    },
  );
}

const stripKnowledge = (p) =>
  String(p)
    .replace(/^knowledge\//, '')
    .replace(/\.md$/, '')
    .normalize('NFC');

let total = 0;
for (const lang of langs) {
  const base =
    lang === 'zh-TW'
      ? path.join(ROOT, 'knowledge')
      : path.join(ROOT, 'knowledge', lang);
  const prefix = lang === 'zh-TW' ? '' : `/${lang}`;
  const out = fs.createWriteStream(path.join(outDir, `${lang}.ndjson`));
  let n = 0;
  let orphans = 0;
  const t0 = Date.now();
  for (const cat of CATEGORIES) {
    const dir = path.join(base, cat);
    if (!fs.existsSync(dir)) continue;
    const files = fs
      .readdirSync(dir)
      .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
      .sort();
    for (const file of files) {
      if (limit && n >= limit) break;
      const slug = path.basename(file, '.md').normalize('NFC');
      const raw = fs.readFileSync(path.join(dir, file), 'utf8');
      const { data, content } = matter(raw);
      const title = String(data.title ?? slug);
      let key = `${cat}/${slug}`;
      if (lang !== 'zh-TW') {
        if (data.translatedFrom) key = stripKnowledge(data.translatedFrom);
        else {
          key = `${lang}:${cat}/${slug}`;
          orphans++;
        }
      }
      const urlPath = `${prefix}/${cat.toLowerCase()}/${slug}`;
      const rendered = renderArticleHtml(title, content, lang, {
        src: data.image || undefined,
      });
      const html = replaceIframes(rendered.fullHtml);
      const text = htmlToText(html);
      const rec = {
        key,
        path: urlPath,
        category: cat,
        subcategory: data.subcategory ? String(data.subcategory) : null,
        title,
        description: data.description ? String(data.description) : '',
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        date: toDate(data.date),
        created:
          (createdDates[`${urlPath}/`] || '').slice(0, 10) || toDate(data.date),
        updated:
          (contentDates[`${urlPath}/`] || '').slice(0, 10) ||
          toDate(data.lastVerified) ||
          toDate(data.date),
        readingTime:
          Number(data.readingTime) ||
          Math.max(
            1,
            Math.round(
              text.length / (lang === 'zh-TW' || lang === 'ja' ? 500 : 1200),
            ),
          ),
        featured: data.featured === true,
        image: data.image ? String(data.image) : null,
        imageAlt: data.imageAlt ? String(data.imageAlt) : null,
        imageCredit: data.imageCredit ? String(data.imageCredit) : null,
        imageLicense: data.imageLicense ? String(data.imageLicense) : null,
        heroInBody: rendered.heroImageInBody,
        chars: text.length,
        hash: crypto.createHash('sha1').update(raw).digest('hex'),
        html,
        text,
      };
      out.write(JSON.stringify(rec) + '\n');
      n++;
    }
  }
  await new Promise((r) => out.end(r));
  total += n;
  console.log(
    `${lang}\t${n} 篇\t無 translatedFrom ${orphans}\t${((Date.now() - t0) / 1000).toFixed(1)}s`,
  );
}
console.log(`合計 ${total} 篇 → ${outDir}`);
