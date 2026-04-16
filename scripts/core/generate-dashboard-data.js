#!/usr/bin/env node
/**
 * Taiwan.md Dashboard Data Generator
 * Generates dashboard JSON data at build time from knowledge base SSOT.
 *
 * Usage: node scripts/generate-dashboard-data.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { LANGUAGES } from '../../src/config/languages.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path configuration
const PROJECT_ROOT = path.join(__dirname, '../..');
const KNOWLEDGE_DIR = path.join(PROJECT_ROOT, 'knowledge');
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'public/api');
const EDITORIAL_PATH = path.join(
  PROJECT_ROOT,
  'docs',
  'editorial',
  'EDITORIAL.md',
);
const QUALITY_BASELINE_PATH = path.join(
  PROJECT_ROOT,
  'scripts',
  'tools',
  '.quality-baseline.json',
);

// PascalCase category directories (zh-TW SSOT)
const CATEGORIES = [
  'About',
  'Art',
  'Culture',
  'Economy',
  'Food',
  'Geography',
  'History',
  'Lifestyle',
  'Music',
  'Nature',
  'People',
  'Society',
  'Technology',
];

// Translation language directories — sourced from registry so adding a
// language only requires editing src/config/languages.json.
const TRANSLATION_LANGS = LANGUAGES.filter((l) => !l.isDefault).map(
  (l) => l.code,
);

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// ---------------------------------------------------------------------------
// Frontmatter parser (follows generate-api.js pattern)
// ---------------------------------------------------------------------------
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { frontmatter: {}, body: content };
  }

  const frontmatterText = match[1];
  const body = match[2];
  const frontmatter = {};

  const lines = frontmatterText.split('\n');
  let currentKey = null;
  let multiLineArray = null;

  for (const line of lines) {
    const trimmed = line.trim();

    // Multi-line YAML array item (lines starting with "  - ")
    if (multiLineArray !== null && /^\s+-\s+/.test(line)) {
      let val = line.replace(/^\s+-\s+/, '').trim();
      val = val.replace(/^['"]|['"]$/g, '');
      multiLineArray.push(val);
      continue;
    } else if (multiLineArray !== null) {
      // End of multi-line array
      frontmatter[currentKey] = multiLineArray;
      multiLineArray = null;
      currentKey = null;
    }

    if (!trimmed || trimmed.startsWith('#')) continue;

    const colonIndex = trimmed.indexOf(':');
    if (colonIndex === -1) continue;

    const key = trimmed.slice(0, colonIndex).trim();
    let value = trimmed.slice(colonIndex + 1).trim();

    // Empty value after colon -> start multi-line array
    if (value === '' || value === '') {
      currentKey = key;
      multiLineArray = [];
      continue;
    }

    // Remove quotes
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    // Handle inline array [tag1, tag2]
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map((v) => v.trim().replace(/['"]/g, ''))
        .filter((v) => v.length > 0);
    }

    frontmatter[key] = value;
  }

  // Close any open multi-line array
  if (multiLineArray !== null && currentKey !== null) {
    frontmatter[currentKey] = multiLineArray;
  }

  return { frontmatter, body };
}

// ---------------------------------------------------------------------------
// Word count (Chinese characters count as 1 word each)
// ---------------------------------------------------------------------------
function countWords(text) {
  // Remove markdown syntax
  const plain = text
    .replace(/```[\s\S]*?```/g, '')
    .replace(/#+\s/g, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/^>\s*/gm, '')
    .replace(/[-*_]{3,}/g, '')
    .trim();

  let count = 0;

  // Chinese/CJK characters each count as 1 word
  const cjkMatches = plain.match(/[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff]/g);
  if (cjkMatches) count += cjkMatches.length;

  // Non-CJK text: split by whitespace for English/other words
  const nonCjk = plain.replace(
    /[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff]/g,
    ' ',
  );
  const words = nonCjk
    .split(/\s+/)
    .filter((w) => w.length > 0 && /[a-zA-Z0-9]/.test(w));
  count += words.length;

  return count;
}

// ---------------------------------------------------------------------------
// Git helpers — batch cache (1 exec for all files, not N×2)
// ---------------------------------------------------------------------------
let _gitCache = null;

function buildGitCache() {
  if (_gitCache) return _gitCache;
  _gitCache = new Map();

  // Threshold: commits touching more than this many knowledge/ files are
  // considered "batch fixes" (format corrections, bulk link repairs, etc.)
  // and should NOT count as "last modified" for the Activity Feed.
  const BATCH_THRESHOLD = 50;

  try {
    const logOutput = execSync(
      'git log -z --name-only --format="COMMIT|%H|%aI|%an|%s" -- "knowledge/"',
      { cwd: PROJECT_ROOT, encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 },
    );

    // --- Pass 1: parse all commits and their files ---
    const commits = []; // { hash, date, author, files: string[] }
    let cur = null;

    for (let token of logOutput.split('\0')) {
      token = token.replace(/^\n+/, '').trim();
      if (!token) continue;

      if (token.startsWith('COMMIT|')) {
        if (cur) commits.push(cur);
        const parts = token.split('|');
        cur = {
          hash: parts[1] || '',
          date: parts[2] || '',
          author: parts[3] || '',
          subject: parts[4] || '',
          files: [],
        };
      } else if (
        cur &&
        token.startsWith('knowledge/') &&
        token.endsWith('.md')
      ) {
        cur.files.push(token);
      }
    }
    if (cur) commits.push(cur);

    // --- Pass 2: build per-file cache, skipping batch commits for lastModified ---
    // Batch = touches many files AND is not a content rewrite
    const BATCH_SUBJECT_OK = /rewrite:|feat\(|feat:/i; // these are real content changes
    const batchHashes = new Set();
    for (const c of commits) {
      if (c.files.length > BATCH_THRESHOLD) {
        batchHashes.add(c.hash);
      } else if (c.files.length > 5 && !BATCH_SUBJECT_OK.test(c.subject)) {
        // 5-50 files: only skip if subject looks like batch fix/heal/evolve/cross-link
        batchHashes.add(c.hash);
      }
    }

    for (const c of commits) {
      const isBatch = batchHashes.has(c.hash);
      for (const file of c.files) {
        const key = path.resolve(PROJECT_ROOT, file);
        let entry = _gitCache.get(key);
        if (!entry) {
          entry = {
            lastModified: isBatch ? '' : c.date, // defer if batch
            commitHash: isBatch ? '' : c.hash.slice(0, 8),
            commitSubject: isBatch ? '' : c.subject,
            revisionCount: 0,
            contributors: [],
          };
          _gitCache.set(key, entry);
        } else if (!entry.lastModified && !isBatch) {
          // Fill in from the first non-batch commit
          entry.lastModified = c.date;
          entry.commitHash = c.hash.slice(0, 8);
          entry.commitSubject = c.subject;
        }
        // Always count revisions and contributors (batch or not)
        entry.revisionCount += 1;
        if (c.author && !entry.contributors.includes(c.author)) {
          entry.contributors.push(c.author);
        }
      }
    }
  } catch (e) {
    console.error('Git cache error:', e.message);
  }
  return _gitCache;
}

function getGitInfo(filePath) {
  const resolved = path.resolve(filePath);
  return (
    buildGitCache().get(resolved) || {
      lastModified: '',
      commitHash: '',
      revisionCount: 0,
      contributors: [],
    }
  );
}

// ---------------------------------------------------------------------------
// Slug derivation from Chinese filename
// ---------------------------------------------------------------------------
// MUST preserve original case — Astro's [category]/[slug].astro uses
// `basename(file, '.md')` which preserves case. Lowercasing here produced
// broken dashboard links (TikTok → tiktok, Dcard → dcard, 台灣YouBike →
// 台灣youbike, etc.). Bug fix 2026-04-15 γ session: 32 files had uppercase
// in filename, ~20 were driving a significant chunk of the CF 404 rate.
// See PR #517 (Link1515) who identified the symptom.
function deriveSlug(fileName) {
  // fileName without .md extension
  return fileName
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9\u4e00-\u9fff\u3400-\u4dbf-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// ---------------------------------------------------------------------------
// Quality score cache (from quality-scan --json)
// ---------------------------------------------------------------------------
function loadQualityScores() {
  const scores = new Map();
  try {
    if (fs.existsSync(QUALITY_BASELINE_PATH)) {
      const data = JSON.parse(fs.readFileSync(QUALITY_BASELINE_PATH, 'utf8'));
      for (const f of data.files || []) {
        // f.file is like "People/郭婞淳.md" — match by filename
        scores.set(f.file, { score: f.score, reasons: f.reasons || '' });
      }
    }
  } catch (e) {
    console.error('Quality baseline load error:', e.message);
  }
  return scores;
}

// ---------------------------------------------------------------------------
// Scan zh-TW articles (SSOT)
// ---------------------------------------------------------------------------
function getZhTwArticles() {
  const articles = [];

  for (const category of CATEGORIES) {
    const categoryDir = path.join(KNOWLEDGE_DIR, category);
    if (!fs.existsSync(categoryDir)) continue;

    const files = fs.readdirSync(categoryDir);
    for (const file of files) {
      if (!file.endsWith('.md') || file.startsWith('_')) continue;
      const fullPath = path.join(categoryDir, file);
      const stat = fs.statSync(fullPath);
      if (!stat.isFile()) continue;

      articles.push({
        filePath: fullPath,
        relativePath: `${category}/${file}`,
        category: category.toLowerCase(),
        fileName: file,
      });
    }
  }

  return articles;
}

// ---------------------------------------------------------------------------
// Build translation lookup: lang -> Set of zh-TW relative paths that have translations
// ---------------------------------------------------------------------------
function buildTranslationMap() {
  const map = {}; // { lang: Set<relativePath> }

  for (const lang of TRANSLATION_LANGS) {
    const translatedFromSet = new Set();
    const langDir = path.join(KNOWLEDGE_DIR, lang);
    if (!fs.existsSync(langDir)) {
      map[lang] = translatedFromSet;
      continue;
    }

    for (const category of CATEGORIES) {
      const categoryDir = path.join(langDir, category);
      if (!fs.existsSync(categoryDir)) continue;

      const files = fs.readdirSync(categoryDir);
      for (const file of files) {
        if (!file.endsWith('.md') || file.startsWith('_')) continue;
        const fullPath = path.join(categoryDir, file);

        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          const { frontmatter } = parseFrontmatter(content);

          if (frontmatter.translatedFrom) {
            translatedFromSet.add(frontmatter.translatedFrom);
          }
        } catch {
          // skip unreadable files
        }
      }
    }

    map[lang] = translatedFromSet;
  }

  return map;
}

// ---------------------------------------------------------------------------
// Count translation files per category per language (for matrix)
// ---------------------------------------------------------------------------
function countTranslationsByCategory() {
  const counts = {}; // { lang: { category: number } }

  for (const lang of TRANSLATION_LANGS) {
    counts[lang] = {};
    const langDir = path.join(KNOWLEDGE_DIR, lang);
    if (!fs.existsSync(langDir)) continue;

    for (const category of CATEGORIES) {
      const categoryDir = path.join(langDir, category);
      if (!fs.existsSync(categoryDir)) continue;

      const files = fs
        .readdirSync(categoryDir)
        .filter((f) => f.endsWith('.md') && !f.startsWith('_'));
      counts[lang][category.toLowerCase()] = files.length;
    }
  }

  return counts;
}

// ---------------------------------------------------------------------------
// EDITORIAL.md last modified date
// ---------------------------------------------------------------------------
function getEditorialLastModified() {
  try {
    const result = execSync(
      `git log -1 --format="%aI" -- docs/editorial/EDITORIAL.md`,
      {
        cwd: PROJECT_ROOT,
        encoding: 'utf8',
        stdio: ['pipe', 'pipe', 'pipe'],
      },
    );
    return result.trim() ? new Date(result.trim()) : null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const now = new Date();

  // Build translation lookup
  const translationMap = buildTranslationMap();

  // Load quality scores cache
  const qualityScores = loadQualityScores();

  // Get all zh-TW articles
  const rawArticles = getZhTwArticles();

  // Process each article
  const articles = [];
  for (const raw of rawArticles) {
    try {
      const content = fs.readFileSync(raw.filePath, 'utf8');
      const { frontmatter, body } = parseFrontmatter(content);

      const fileName = raw.fileName.replace(/\.md$/, '');
      const tags = Array.isArray(frontmatter.tags)
        ? frontmatter.tags
        : frontmatter.tags
          ? [frontmatter.tags]
          : [];

      const translations = {};
      for (const lang of TRANSLATION_LANGS) {
        translations[lang] = translationMap[lang].has(raw.relativePath);
      }

      const slug = frontmatter.slug || deriveSlug(fileName);
      const gitInfo = getGitInfo(raw.filePath);
      const revision = gitInfo.revisionCount;
      const commitHash = gitInfo.commitHash;
      const commitSubject = gitInfo.commitSubject || '';
      const lastModified = gitInfo.lastModified
        ? gitInfo.lastModified.slice(0, 10)
        : null;

      const wordCount = countWords(body);
      const lastHumanReview = frontmatter.lastHumanReview
        ? String(frontmatter.lastHumanReview)
        : false;
      const featured =
        frontmatter.featured === true || frontmatter.featured === 'true';
      const tagCount = tags.length;
      const lastVerified = frontmatter.lastVerified || null;

      // Health score (0-100)
      let verifiedRecency = 365; // default: old
      if (lastVerified) {
        const verifiedDate = new Date(lastVerified);
        verifiedRecency = Math.floor(
          (now - verifiedDate) / (1000 * 60 * 60 * 24),
        );
      }
      const healthScore = Math.round(
        Math.min(wordCount / 3000, 1) * 25 +
          (lastHumanReview ? 25 : 0) +
          Math.min((revision || 0) / 5, 1) * 15 +
          (verifiedRecency <= 30 ? 15 : verifiedRecency <= 90 ? 10 : 5) +
          Math.min((tagCount || 0) / 5, 1) * 10 +
          (featured ? 10 : 0),
      );

      // Quality score from cached quality-scan baseline (keys are lowercase)
      const qKey = raw.relativePath.toLowerCase();
      const qData = qualityScores.get(qKey);
      const qualityScore = qData ? qData.score : 0; // 0 = passed (not in flagged list)

      // Format check (lightweight inline — mirrors format-check.sh core checks)
      const hasOverview =
        />\s*\*\*30\s*秒概覽|^## 30 秒概覽|>\s*\*\*30-Second Overview/m.test(
          body,
        );
      const hasReading = /^\*\*延伸閱讀\*\*/m.test(body);
      const hasRefHeading = /^## 參考資料/m.test(body);
      const fnCount = (body.match(/^\[\^[0-9a-zA-Z_-]+\]:/gm) || []).length;
      const formatIssues =
        (hasOverview ? 0 : 1) +
        (hasReading ? 0 : 1) +
        (fnCount > 0 && !hasRefHeading ? 1 : 0);
      // 0 = pass, 1 = warn, 2-3 = fail

      articles.push({
        title: frontmatter.title || fileName,
        slug,
        category: raw.category,
        subcategory: frontmatter.subcategory || null,
        date: frontmatter.date || null,
        lastModified,
        lastVerified,
        lastHumanReview,
        featured,
        wordCount,
        tagCount,
        tags,
        translations,
        revision,
        commitHash,
        commitSubject,
        description: frontmatter.description || '',
        healthScore,
        qualityScore,
        formatIssues,
        hasOverview,
        hasReading,
        fnCount,
      });
    } catch (err) {
      console.error(`Error processing ${raw.filePath}: ${err.message}`);
    }
  }

  // Sort by lastModified descending (most recently changed first)
  articles.sort((a, b) => {
    if (!a.lastModified && !b.lastModified) return 0;
    if (!a.lastModified) return 1;
    if (!b.lastModified) return -1;
    return b.lastModified.localeCompare(a.lastModified);
  });

  // =========================================================================
  // dashboard-articles.json
  // =========================================================================
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'dashboard-articles.json'),
    JSON.stringify(articles, null, 2),
    'utf8',
  );

  // =========================================================================
  // dashboard-vitals.json
  // =========================================================================
  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const sevenDaysStr = sevenDaysAgo.toISOString().slice(0, 10);
  const thirtyDaysStr = thirtyDaysAgo.toISOString().slice(0, 10);

  const articlesLast7Days = articles.filter(
    (a) => a.lastModified && a.lastModified >= sevenDaysStr,
  ).length;
  const articlesLast30Days = articles.filter(
    (a) => a.lastModified && a.lastModified >= thirtyDaysStr,
  ).length;

  const humanReviewedCount = articles.filter((a) => a.lastHumanReview).length;
  const featuredCount = articles.filter((a) => a.featured).length;
  const avgRevision =
    articles.length > 0
      ? parseFloat(
          (
            articles.reduce((sum, a) => sum + a.revision, 0) / articles.length
          ).toFixed(1),
        )
      : 0;

  // Language coverage: count total translation files per language
  const translationCategoryCounts = countTranslationsByCategory();
  const languageCoverage = { 'zh-TW': articles.length };
  for (const lang of TRANSLATION_LANGS) {
    const langCounts = translationCategoryCounts[lang];
    languageCoverage[lang] = Object.values(langCounts).reduce(
      (s, n) => s + n,
      0,
    );
  }

  // Count unique git contributors
  let contributors = 0;
  try {
    const authorList = execSync('git log --format="%aN" | sort -u', {
      cwd: PROJECT_ROOT,
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    contributors = authorList.trim().split('\n').filter(Boolean).length;
  } catch {
    contributors = 0;
  }

  const vitals = {
    lastUpdated: now.toISOString(),
    totalArticles: articles.length,
    contributors,
    articlesLast7Days,
    articlesLast30Days,
    humanReviewedPercent:
      articles.length > 0
        ? parseFloat(((humanReviewedCount / articles.length) * 100).toFixed(1))
        : 0,
    featuredPercent:
      articles.length > 0
        ? parseFloat(((featuredCount / articles.length) * 100).toFixed(1))
        : 0,
    avgRevision,
    languageCoverage,
  };

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'dashboard-vitals.json'),
    JSON.stringify(vitals, null, 2),
    'utf8',
  );

  // =========================================================================
  // dashboard-translations.json
  // =========================================================================
  const languages = ['zh-TW', ...TRANSLATION_LANGS];

  // Summary
  const summary = {
    'zh-TW': { total: articles.length, percentage: 100 },
  };
  for (const lang of TRANSLATION_LANGS) {
    const total = languageCoverage[lang];
    summary[lang] = {
      total,
      percentage:
        articles.length > 0
          ? parseFloat(((total / articles.length) * 100).toFixed(1))
          : 0,
    };
  }

  // Matrix: category -> { lang: count }
  const matrix = {};
  const zhCategoryCounts = {};
  for (const a of articles) {
    zhCategoryCounts[a.category] = (zhCategoryCounts[a.category] || 0) + 1;
  }
  for (const cat of Object.keys(zhCategoryCounts).sort()) {
    matrix[cat] = { 'zh-TW': zhCategoryCounts[cat] };
    for (const lang of TRANSLATION_LANGS) {
      matrix[cat][lang] = translationCategoryCounts[lang][cat] || 0;
    }
  }

  // Missing translations per language
  const missing = {};
  for (const lang of TRANSLATION_LANGS) {
    const missingArticles = articles
      .filter((a) => !a.translations[lang])
      .map(
        (a) =>
          `${a.category.charAt(0).toUpperCase() + a.category.slice(1)}/${a.title}.md`,
      );
    if (missingArticles.length > 0) {
      missing[lang] = missingArticles;
    }
  }

  const translationsData = {
    languages,
    summary,
    matrix,
    missing,
  };

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'dashboard-translations.json'),
    JSON.stringify(translationsData, null, 2),
    'utf8',
  );

  // =========================================================================
  // dashboard-organism.json
  // =========================================================================

  // Heart: based on articles added in last 7 days
  let heartScore;
  if (articlesLast7Days > 10) heartScore = 90;
  else if (articlesLast7Days > 5) heartScore = 70;
  else if (articlesLast7Days > 2) heartScore = 50;
  else heartScore = 30;

  const heartTrend =
    articlesLast7Days > 5 ? 'up' : articlesLast7Days > 2 ? 'stable' : 'down';

  // Immune: lastHumanReview percentage
  const immuneScore =
    articles.length > 0
      ? Math.round((humanReviewedCount / articles.length) * 100)
      : 0;
  const immuneTrend = immuneScore > 50 ? 'up' : 'stable';

  // DNA: EDITORIAL.md last modified
  const editorialDate = getEditorialLastModified();
  let dnaScore = 60;
  if (editorialDate) {
    const daysSinceEditorial = Math.floor(
      (now - editorialDate) / (1000 * 60 * 60 * 24),
    );
    if (daysSinceEditorial < 7) dnaScore = 95;
    else if (daysSinceEditorial < 30) dnaScore = 80;
    else dnaScore = 60;
  }
  const dnaTrend = dnaScore >= 80 ? 'up' : 'stable';

  // Skeleton: always 90
  const skeletonScore = 90;

  // Breath (CI/CD): check if GitHub Actions workflows exist and are configured
  const workflowDir = path.join(PROJECT_ROOT, '.github/workflows');
  const workflowCount = fs.existsSync(workflowDir)
    ? fs.readdirSync(workflowDir).filter((f) => f.endsWith('.yml')).length
    : 0;
  const breathScore = workflowCount >= 3 ? 85 : workflowCount >= 1 ? 60 : 20;

  // Reproduce (community): count recent PRs/contributors via git shortlog
  let recentContributors = 0;
  try {
    const shortlog = execSync('git shortlog -sn --since="30 days ago" HEAD', {
      cwd: PROJECT_ROOT,
      encoding: 'utf8',
    });
    recentContributors = shortlog.trim().split('\n').filter(Boolean).length;
  } catch {}
  const reproduceScore =
    recentContributors >= 5
      ? 85
      : recentContributors >= 2
        ? 60
        : recentContributors >= 1
          ? 40
          : 15;

  // Senses (perception): check if GA4, social links, issues templates exist
  const hasGA = fs.existsSync(
    path.join(PROJECT_ROOT, 'src/layouts/Layout.astro'),
  );
  const hasIssueTemplates = fs.existsSync(
    path.join(PROJECT_ROOT, '.github/ISSUE_TEMPLATE'),
  );
  const sensesScore = (hasGA ? 40 : 0) + (hasIssueTemplates ? 30 : 0) + 20; // base 20 for git stars

  // Translation coverage as a 4-dimensional score per language
  // Dimensions: UI strings | i18n pages | Hub coverage | Article coverage
  // Each dimension weighted: UI 15% | Pages 25% | Hub 20% | Articles 40%
  const I18N_PAGE_FILES = [
    'about',
    'contribute',
    'dashboard',
    'data',
    'map',
    'resources',
    'changelog',
    'assets',
  ];
  const I18N_DIR = path.join(PROJECT_ROOT, 'src', 'i18n');

  function measureI18nPageCoverage(lang) {
    let filled = 0;
    for (const page of I18N_PAGE_FILES) {
      try {
        const content = fs.readFileSync(
          path.join(I18N_DIR, `${page}.ts`),
          'utf8',
        );
        // Find the lang section and check if it has real keys (not just a comment)
        const langRegex = new RegExp(
          `^\\s*${lang.replace('-', '\\-')}:\\s*\\{([\\s\\S]*?)^\\s*\\}`,
          'm',
        );
        const match = content.match(langRegex);
        if (match && match[1]) {
          // Count actual key-value pairs (lines with 'key': 'value')
          const keyCount = (match[1].match(/'\S+\.\S+':/g) || []).length;
          if (keyCount > 3) filled++; // More than 3 keys = actually translated
        }
      } catch {
        // file doesn't exist
      }
    }
    return {
      filled,
      total: I18N_PAGE_FILES.length,
      pct: Math.round((filled / I18N_PAGE_FILES.length) * 100),
    };
  }

  function measureHubCoverage(lang) {
    const langDir = path.join(KNOWLEDGE_DIR, lang);
    if (!fs.existsSync(langDir)) return { filled: 0, total: 12, pct: 0 };
    let hubCount = 0;
    for (const cat of CATEGORIES) {
      if (cat === 'About') continue; // About is not a content category
      const catDir = path.join(langDir, cat);
      if (!fs.existsSync(catDir)) continue;
      const hubs = fs
        .readdirSync(catDir)
        .filter((f) => f.startsWith('_') && f.endsWith('.md'));
      if (hubs.length > 0) hubCount++;
    }
    return {
      filled: hubCount,
      total: 12,
      pct: Math.round((hubCount / 12) * 100),
    };
  }

  const langHealthDetails = {};
  for (const lang of TRANSLATION_LANGS) {
    const pageCov = measureI18nPageCoverage(lang);
    const hubCov = measureHubCoverage(lang);
    const articleCount = languageCoverage[lang] || 0;
    const articlePct =
      articles.length > 0
        ? Math.round((articleCount / articles.length) * 100)
        : 0;

    // UI strings: check if ui.ts has the lang section with substantial keys
    let uiPct = 0;
    try {
      const uiContent = fs.readFileSync(path.join(I18N_DIR, 'ui.ts'), 'utf8');
      const uiLangRegex = new RegExp(
        `^\\s*${lang.replace('-', '\\-')}:\\s*\\{([\\s\\S]*?)^\\s*\\}`,
        'm',
      );
      const uiMatch = uiContent.match(uiLangRegex);
      if (uiMatch && uiMatch[1]) {
        const uiKeyCount = (uiMatch[1].match(/'\S+\.\S+':/g) || []).length;
        uiPct = uiKeyCount > 30 ? 100 : Math.round((uiKeyCount / 30) * 100);
      }
    } catch {}

    // Weighted score: UI 15% + Pages 25% + Hub 20% + Articles 40%
    const weightedScore = Math.round(
      uiPct * 0.15 + pageCov.pct * 0.25 + hubCov.pct * 0.2 + articlePct * 0.4,
    );

    langHealthDetails[lang] = {
      ui: { pct: uiPct },
      pages: pageCov,
      hubs: hubCov,
      articles: { count: articleCount, pct: articlePct },
      score: Math.min(weightedScore, 100),
    };
  }

  // Overall translation score: weighted average across enabled languages only.
  // Preview languages (enabled:false in src/config/languages.ts) have content
  // but no UI/routes, so they'd drag the score down artificially. Bug fix
  // 2026-04-15: fr landing 403 preview articles dropped score 78→67 overnight.
  const enabledCodes = new Set(
    LANGUAGES.filter((l) => l.enabled && !l.isDefault).map((l) => l.code),
  );
  const activeLangs = TRANSLATION_LANGS.filter(
    (l) => enabledCodes.has(l) && (languageCoverage[l] || 0) > 0,
  );
  const translationScore =
    activeLangs.length > 0
      ? Math.round(
          activeLangs.reduce((sum, l) => sum + langHealthDetails[l].score, 0) /
            activeLangs.length,
        )
      : 0;
  const translationPct = translationScore; // backward compat

  const organism = {
    lastUpdated: now.toISOString(),
    organs: [
      {
        id: 'heart',
        name: 'Heart',
        nameZh: '心臟',
        metaphor: '內容引擎',
        emoji: '🫀',
        score: heartScore,
        trend: heartTrend,
        metrics: {
          articlesLast7Days,
          articlesLast30Days,
          totalArticles: articles.length,
        },
      },
      {
        id: 'immune',
        name: 'Immune',
        nameZh: '免疫系統',
        metaphor: '品質防禦',
        emoji: '🛡️',
        score: immuneScore,
        trend: immuneTrend,
        metrics: {
          humanReviewedCount,
          totalArticles: articles.length,
          humanReviewedPercent: vitals.humanReviewedPercent,
        },
      },
      {
        id: 'dna',
        name: 'DNA',
        nameZh: '遺傳密碼',
        metaphor: '品質基因',
        emoji: '🧬',
        score: dnaScore,
        trend: dnaTrend,
        metrics: {
          editorialLastModified: editorialDate
            ? editorialDate.toISOString()
            : null,
        },
      },
      {
        id: 'skeleton',
        name: 'Skeleton',
        nameZh: '骨骼系統',
        metaphor: '技術架構',
        emoji: '🦴',
        score: skeletonScore,
        trend: 'stable',
        metrics: {},
      },
      {
        id: 'breath',
        name: 'Breath',
        nameZh: '呼吸系統',
        metaphor: '自動化循環',
        emoji: '🫁',
        score: breathScore,
        trend: 'stable',
        metrics: { workflowCount },
      },
      {
        id: 'reproduce',
        name: 'Reproduce',
        nameZh: '繁殖系統',
        metaphor: '社群繁殖力',
        emoji: '🧫',
        score: reproduceScore,
        trend: recentContributors >= 3 ? 'up' : 'stable',
        metrics: { recentContributors },
      },
      {
        id: 'senses',
        name: 'Senses',
        nameZh: '感知器官',
        metaphor: '外部感知',
        emoji: '👁️',
        score: sensesScore,
        trend: 'stable',
        metrics: { hasGA, hasIssueTemplates },
      },
      {
        id: 'translation',
        name: 'Translation',
        nameZh: '語言器官',
        metaphor: '多語言複製',
        emoji: '🌐',
        score: translationScore,
        trend: translationPct >= 90 ? 'up' : 'stable',
        metrics: {
          languageCoverage,
          translationPct,
          langHealthDetails,
        },
      },
    ],
  };

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'dashboard-organism.json'),
    JSON.stringify(organism, null, 2),
    'utf8',
  );

  // =========================================================================
  // Summary
  // =========================================================================
  const totalTranslations = TRANSLATION_LANGS.reduce(
    (sum, lang) => sum + languageCoverage[lang],
    0,
  );

  console.log(
    `Dashboard data generated: ${articles.length} articles, ${totalTranslations} translations`,
  );
}

// Execute
main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
