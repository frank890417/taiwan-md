/**
 * Build-time search index generator.
 *
 * Reads all markdown articles from knowledge/, tokenizes title/description/tags
 * with CJK bigrams + Latin words, builds a serialized MiniSearch index.
 *
 * Output: public/api/search-minisearch.json
 */

import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, join, basename } from 'node:path';
import matter from 'gray-matter';
import MiniSearch from 'minisearch';

const CATEGORY_MAP = {
  history: 'History',
  geography: 'Geography',
  culture: 'Culture',
  food: 'Food',
  art: 'Art',
  music: 'Music',
  technology: 'Technology',
  nature: 'Nature',
  people: 'People',
  society: 'Society',
  economy: 'Economy',
  lifestyle: 'Lifestyle',
};

// ── CJK bigram tokenizer ──

const isCJK = (cp) =>
  (cp >= 0x4e00 && cp <= 0x9fff) ||
  (cp >= 0x3400 && cp <= 0x4dbf) ||
  (cp >= 0xf900 && cp <= 0xfaff) ||
  (cp >= 0x3100 && cp <= 0x312f);

const LATIN_RE = /[a-z0-9][a-z0-9-]*[a-z0-9]|[a-z0-9]/g;

function bigramTokenize(text) {
  if (!text) return '';
  const normalized = text.toLowerCase().normalize('NFKC');
  const tokens = [];

  // Latin words (2+ chars)
  for (const m of normalized.matchAll(LATIN_RE)) {
    if (m[0].length >= 2) tokens.push(m[0]);
  }

  // CJK bigrams
  const chars = [...normalized];
  for (let i = 0; i < chars.length - 1; i++) {
    const cp1 = chars[i].codePointAt(0);
    const cp2 = chars[i + 1].codePointAt(0);
    if (isCJK(cp1) && isCJK(cp2)) {
      tokens.push(chars[i] + chars[i + 1]);
    }
  }

  return tokens.join(' ');
}

// ── Scan articles ──

async function scanArticles() {
  const docs = [];
  let id = 0;

  for (const [slug, folder] of Object.entries(CATEGORY_MAP)) {
    // Chinese articles
    const zhPath = resolve(process.cwd(), 'knowledge', folder);
    try {
      const files = (await readdir(zhPath)).filter(
        (f) => f.endsWith('.md') && !f.startsWith('_'),
      );
      for (const file of files) {
        try {
          const { data } = matter(await readFile(join(zhPath, file), 'utf-8'));
          const name = basename(file, '.md');
          const title = data.title || name;
          const description = data.description || '';
          const tags = Array.isArray(data.tags)
            ? data.tags
            : data.tags
              ? [data.tags]
              : [];
          docs.push({
            id: id++,
            t: title,
            d: description,
            u: `/${slug}/${name}`,
            tags,
            lang: 'zh-TW',
            title_bigram: bigramTokenize(title),
            desc_bigram: bigramTokenize(description),
            tags_bigram: bigramTokenize(tags.join(' ')),
          });
        } catch {
          console.warn(`[search] skipped ${file}: YAML parse error`);
        }
      }
    } catch (err) {
      if (err.code !== 'ENOENT')
        console.warn(`[search] error reading ${zhPath}:`, err.message);
    }

    // English articles
    const enPath = resolve(process.cwd(), 'knowledge', 'en', folder);
    try {
      const files = (await readdir(enPath)).filter(
        (f) => f.endsWith('.md') && !f.startsWith('_'),
      );
      for (const file of files) {
        try {
          const { data } = matter(await readFile(join(enPath, file), 'utf-8'));
          const name = basename(file, '.md');
          const title = data.title || name;
          const description = data.description || '';
          const tags = Array.isArray(data.tags)
            ? data.tags
            : data.tags
              ? [data.tags]
              : [];
          docs.push({
            id: id++,
            t: title,
            d: description,
            u: `/en/${slug}/${name}`,
            tags,
            lang: 'en',
            title_bigram: bigramTokenize(title),
            desc_bigram: bigramTokenize(description),
            tags_bigram: bigramTokenize(tags.join(' ')),
          });
        } catch {
          console.warn(`[search] skipped ${file}: YAML parse error`);
        }
      }
    } catch (err) {
      if (err.code !== 'ENOENT')
        console.warn(`[search] error reading ${enPath}:`, err.message);
    }
  }

  return docs;
}

// ── Build index ──

const docs = await scanArticles();

const miniSearch = new MiniSearch({
  idField: 'id',
  fields: ['title_bigram', 'desc_bigram', 'tags_bigram'],
  storeFields: ['t', 'd', 'u', 'tags', 'lang'],
  tokenize: (text) => text.split(/\s+/).filter(Boolean),
  searchOptions: {
    boost: { title_bigram: 6, tags_bigram: 4, desc_bigram: 2 },
    prefix: true,
  },
});

miniSearch.addAll(docs);

const serialized = JSON.stringify(miniSearch);
await mkdir(resolve(process.cwd(), 'public', 'api'), { recursive: true });
await writeFile(
  resolve(process.cwd(), 'public', 'api', 'search-minisearch.json'),
  serialized,
  'utf-8',
);

console.log(
  `[search] MiniSearch index: ${docs.length} docs, ${(serialized.length / 1024).toFixed(0)} KB → public/api/search-minisearch.json`,
);
