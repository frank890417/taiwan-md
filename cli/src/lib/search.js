/**
 * Taiwan.md Search
 *
 * Provides article search using MiniSearch (pre-built bigram index)
 * with a fallback to simple string matching on dashboard data,
 * and a final remote fallback that fetches articles.json from taiwan.md.
 */

import fs from 'fs';
import path from 'path';
import MiniSearch from 'minisearch';
import { getApiPath } from './knowledge.js';

// In-memory cache for remote article list
let _remoteArticlesCache = null;

// ── CJK bigram tokenizer (must match build-search-index.mjs) ──

const isCJK = (cp) =>
  (cp >= 0x4e00 && cp <= 0x9fff) ||
  (cp >= 0x3400 && cp <= 0x4dbf) ||
  (cp >= 0xf900 && cp <= 0xfaff) ||
  (cp >= 0x3100 && cp <= 0x312f);

const LATIN_RE = /[a-z0-9][a-z0-9-]*[a-z0-9]|[a-z0-9]/g;

function bigramTokenize(text) {
  if (!text) return [];
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

  return tokens;
}

/**
 * Custom tokenizer that matches how the index was built.
 * The index stores pre-tokenized bigram strings separated by spaces,
 * so for stored fields we split on whitespace. For query-time, we
 * also need to bigram-tokenize the raw query.
 */
function indexTokenizer(text) {
  return text.split(/\s+/).filter(Boolean);
}

/**
 * Try to load the MiniSearch index from disk.
 * Returns a MiniSearch instance or null if unavailable.
 */
function loadMiniSearchIndex() {
  const apiDir = getApiPath();

  // In-repo path
  const inRepoPath = path.join(apiDir, 'search-minisearch.json');
  // Standalone path
  const standalonePath = path.join(apiDir, 'search-index.json');

  const indexPath = fs.existsSync(inRepoPath) ? inRepoPath : standalonePath;

  if (!fs.existsSync(indexPath)) return null;

  try {
    const json = fs.readFileSync(indexPath, 'utf8');
    return MiniSearch.loadJSON(json, {
      fields: ['title_bigram', 'desc_bigram', 'tags_bigram'],
      storeFields: ['t', 'd', 'u', 'tags', 'lang'],
      tokenize: indexTokenizer,
      searchOptions: {
        boost: { title_bigram: 6, tags_bigram: 4, desc_bigram: 2 },
        prefix: true,
      },
    });
  } catch {
    return null;
  }
}

/**
 * Load dashboard-articles.json for fallback search.
 * Returns an array of article objects or null.
 */
function loadDashboardArticles() {
  const apiDir = getApiPath();
  const filePath = path.join(apiDir, 'dashboard-articles.json');

  if (!fs.existsSync(filePath)) return null;

  try {
    const json = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(json);
  } catch {
    return null;
  }
}

/**
 * Simple case-insensitive substring match across title, description, and tags.
 */
function fallbackSearch(articles, query, limit) {
  const q = query.toLowerCase();
  const terms = q.split(/\s+/).filter(Boolean);

  const scored = articles
    .map((article) => {
      const title = (article.title || '').toLowerCase();
      const description = (article.description || '').toLowerCase();
      const tags = (article.tags || []).join(' ').toLowerCase();

      let score = 0;

      // Exact title match is strongest
      if (title.includes(q)) score += 10;

      // Per-term matching
      for (const term of terms) {
        if (title.includes(term)) score += 5;
        if (description.includes(term)) score += 2;
        if (tags.includes(term)) score += 3;
      }

      return { ...article, score };
    })
    .filter((a) => a.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored.map((a) => ({
    title: a.title,
    slug: a.slug || '',
    category: a.category || '',
    description: a.description || '',
    score: a.score,
  }));
}

/**
 * Extract category slug from a URL path like /history/二二八事件
 */
function categoryFromUrl(url) {
  if (!url) return '';
  const parts = url.replace(/^\//, '').split('/');
  // Skip "en"/"es"/"ja" prefix
  if (['en', 'es', 'ja', 'ko'].includes(parts[0]) && parts.length > 1) {
    return parts[1];
  }
  return parts[0] || '';
}

/**
 * Fetch articles.json from taiwan.md remote API.
 * Caches result in memory for the lifetime of the process.
 *
 * @returns {Promise<Array|null>}
 */
async function fetchRemoteArticles() {
  if (_remoteArticlesCache) return _remoteArticlesCache;

  try {
    const response = await fetch('https://taiwan.md/api/articles.json', {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) return null;

    const data = await response.json();
    const articles = Array.isArray(data) ? data : data.articles || null;
    if (articles) _remoteArticlesCache = articles;
    return articles;
  } catch {
    return null;
  }
}

/**
 * Search using the remote articles.json API.
 *
 * @param {string} query
 * @param {number} limit
 * @returns {Promise<Array>}
 */
export async function searchRemote(query, limit = 10) {
  const articles = await fetchRemoteArticles();
  if (!articles) return [];
  return fallbackSearch(articles, query, limit);
}

/**
 * Search articles.
 *
 * @param {string} query - Search query string
 * @param {object} options
 * @param {number} [options.limit=10] - Maximum results to return
 * @param {string} [options.lang='zh-TW'] - Language filter (reserved for future use)
 * @returns {Promise<Array<{title: string, slug: string, category: string, description: string, score: number}>>}
 */
export async function searchArticles(
  query,
  { limit = 10, lang = 'zh-TW' } = {},
) {
  if (!query || !query.trim()) return [];

  const trimmedQuery = query.trim();

  // Try MiniSearch first
  const index = loadMiniSearchIndex();
  if (index) {
    try {
      // Bigram-tokenize the query so it matches the index format
      const queryTokens = bigramTokenize(trimmedQuery);
      const processedQuery = queryTokens.join(' ');

      if (processedQuery) {
        const results = index.search(processedQuery, {
          tokenize: indexTokenizer,
          prefix: true,
        });

        return results.slice(0, limit).map((r) => ({
          title: r.t || '',
          slug: r.u ? r.u.split('/').pop() : '',
          category: categoryFromUrl(r.u),
          description: r.d || '',
          score: r.score,
        }));
      }
    } catch {
      // MiniSearch query failed; fall through to fallback
    }
  }

  // Fallback: simple matching on dashboard-articles.json
  const articles = loadDashboardArticles();
  if (articles) {
    return fallbackSearch(articles, trimmedQuery, limit);
  }

  // Final fallback: fetch from remote API
  return searchRemote(trimmedQuery, limit);
}
