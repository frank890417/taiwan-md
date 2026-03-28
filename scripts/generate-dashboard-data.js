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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path configuration
const PROJECT_ROOT = path.join(__dirname, '..');
const KNOWLEDGE_DIR = path.join(PROJECT_ROOT, 'knowledge');
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'public/api');
const EDITORIAL_PATH = path.join(PROJECT_ROOT, 'EDITORIAL.md');

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

// Translation language directories
const TRANSLATION_LANGS = ['en', 'es', 'ja'];

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
// Git helpers
// ---------------------------------------------------------------------------
function getGitRevisionCount(filePath) {
  try {
    const result = execSync(`git rev-list --count HEAD -- "${filePath}"`, {
      cwd: PROJECT_ROOT,
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    return parseInt(result.trim(), 10) || 0;
  } catch {
    return 0;
  }
}

function getGitCommitHash(filePath) {
  try {
    const result = execSync(`git log -1 --format="%h" -- "${filePath}"`, {
      cwd: PROJECT_ROOT,
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    return result.trim() || '';
  } catch {
    return '';
  }
}

// ---------------------------------------------------------------------------
// Slug derivation from Chinese filename
// ---------------------------------------------------------------------------
function deriveSlug(fileName) {
  // fileName without .md extension
  return fileName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\u4e00-\u9fff\u3400-\u4dbf-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
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
    const result = execSync(`git log -1 --format="%aI" -- EDITORIAL.md`, {
      cwd: PROJECT_ROOT,
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
    });
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
      const revision = getGitRevisionCount(raw.filePath);
      const commitHash = getGitCommitHash(raw.filePath);

      const wordCount = countWords(body);
      const lastHumanReview =
        frontmatter.lastHumanReview === true ||
        frontmatter.lastHumanReview === 'true';
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

      articles.push({
        title: frontmatter.title || fileName,
        slug,
        category: raw.category,
        subcategory: frontmatter.subcategory || null,
        date: frontmatter.date || null,
        lastVerified,
        lastHumanReview,
        featured,
        wordCount,
        tagCount,
        tags,
        translations,
        revision,
        commitHash,
        description: frontmatter.description || '',
        healthScore,
      });
    } catch (err) {
      console.error(`Error processing ${raw.filePath}: ${err.message}`);
    }
  }

  // Sort by date descending (newest first)
  articles.sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return b.date.localeCompare(a.date);
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
    (a) => a.date && a.date >= sevenDaysStr,
  ).length;
  const articlesLast30Days = articles.filter(
    (a) => a.date && a.date >= thirtyDaysStr,
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

  // Translation coverage as a score
  const translationPct = Math.round(
    (languageCoverage.en / articles.length) * 100,
  );
  const translationScore = Math.min(translationPct, 100);

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
        metrics: { languageCoverage, translationPct },
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
