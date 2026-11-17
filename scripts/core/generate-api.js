#!/usr/bin/env node
/**
 * Taiwan.md API Generator
 * 生成靜態 JSON API endpoints for knowledge base
 *
 * Usage: node scripts/generate-api.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 路徑配置
const KNOWLEDGE_DIR = path.join(__dirname, '../../knowledge');
const OUTPUT_DIR = path.join(__dirname, '../../public/api');
const BASE_URL = 'https://taiwan.md';

// 確保輸出目錄存在
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * 簡易 frontmatter 解析
 */
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { frontmatter: {}, content: content };
  }

  const frontmatterText = match[1];
  const bodyContent = match[2];
  const frontmatter = {};

  // 簡單的 YAML 解析（僅支援基本格式）
  const lines = frontmatterText.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const colonIndex = trimmed.indexOf(':');
      if (colonIndex !== -1) {
        const key = trimmed.slice(0, colonIndex).trim();
        let value = trimmed.slice(colonIndex + 1).trim();

        // 移除引號
        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1);
        }

        // 處理陣列格式 [tag1, tag2]
        if (value.startsWith('[') && value.endsWith(']')) {
          value = value
            .slice(1, -1)
            .split(',')
            .map((v) => v.trim().replace(/['"]/g, ''))
            .filter((v) => v.length > 0);
        }

        frontmatter[key] = value;
      }
    }
  }

  return { frontmatter, content: bodyContent };
}

/**
 * 計算文章閱讀時間（分鐘）
 *
 * 2026-11-04 site-health：改成跟文章頁同一條公式（article.template.astro 的
 * estimatedReadingTime：空白壓成一格後的字元數 / 500，四捨五入，至少 1）。
 * 舊版是「去 markdown 後字元數 / 250 無條件進位」，API 的數字因此是頁面上的
 * 將近兩倍（〈二二八事件〉頁面 16 分鐘、API 28 分鐘；英文版 55 對 104）。
 * 兩邊不一致時，讀 API 的 App 會跟網站各說各話。
 */
function calculateReadingTime(content) {
  return Math.max(1, Math.round(content.replace(/\s+/g, ' ').length / 500));
}

/**
 * 遞歸讀取所有 markdown 檔案
 */
function getAllMarkdownFiles(dir, baseDir = dir) {
  const files = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...getAllMarkdownFiles(fullPath, baseDir));
    } else if (item.endsWith('.md') && !item.startsWith('_')) {
      // 跳過 _Hub 檔案，它們是分類頁面
      files.push(fullPath);
    }
  }

  return files;
}

// `[lang/]Category/slug.md` → { lang, categoryFolder }。第一段是語言代碼
// （knowledge/ 下的小寫語言資料夾）才算譯文，否則是 zh-TW 原文。
function getLangAndCategory(filePath) {
  const parts = path.relative(KNOWLEDGE_DIR, filePath).split(path.sep);
  const isTranslation =
    parts.length >= 3 && /^[a-z]{2}(-[A-Za-z]{2,4})?$/.test(parts[0]);
  return {
    lang: isTranslation ? parts[0] : 'zh-TW',
    categoryFolder: parts.length >= 2 ? parts[parts.length - 2] : 'Misc',
  };
}

/**
 * 生成文章 URL
 */
function generateArticleUrl(filePath) {
  const relativePath = path.relative(KNOWLEDGE_DIR, filePath);
  // Path shape is always `[lang/]Category/slug` — the category is the
  // second-to-last segment. Astro routes the category in lowercase
  // (getStaticPaths emits the lowercase categorySlug, e.g. `politics`), so
  // the canonical URL must lowercase it too. Preserving the on-disk
  // PascalCase folder name (`/en/Politics/...`) yields a URL that resolves
  // on a case-insensitive macOS dev box but 404s on case-sensitive hosts
  // like Cloudflare Pages — the exact dev/prod gap behind the non-default-
  // language "surprise me" 404s (RandomDiscovery / explore random pools).
  const parts = relativePath.replace(/\.md$/, '').split(path.sep);
  const catIdx = parts.length - 2; // category sits before the slug
  const urlPath = parts
    .map((part, i) =>
      encodeURIComponent(i === catIdx ? part.toLowerCase() : part),
    )
    .join('/');

  return `${BASE_URL}/${urlPath}`;
}

/**
 * 處理單個 markdown 檔案
 */
function processMarkdownFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { frontmatter, content: bodyContent } = parseFrontmatter(content);

    const { lang, categoryFolder } = getLangAndCategory(filePath);
    const fileName = path.basename(filePath, '.md');
    const url = generateArticleUrl(filePath);
    // 跟文章頁一樣：frontmatter readingTime 優先，沒有才估算。
    const fmReading = parseInt(frontmatter.readingTime, 10);
    const readingTime =
      Number.isFinite(fmReading) && fmReading > 0
        ? fmReading
        : calculateReadingTime(bodyContent);

    return {
      title: frontmatter.title || fileName,
      description: frontmatter.description || '',
      // 真分類：磁碟上的分類資料夾（"History"、"People"），每種語言都一樣。
      // 2026-11-04 以前譯文這欄是語言代碼（"vi"）。首頁骰子、/explore、
      // mcp.taiwan.md worker（v0.7.2 起）、CLI 都已改讀 `lang`／`categorySlug`，
      // 不再拿這欄判斷語言；見 public/api/README.md。
      category: categoryFolder,
      tags: Array.isArray(frontmatter.tags)
        ? frontmatter.tags
        : frontmatter.tags
          ? [frontmatter.tags]
          : [],
      url: url,
      readingTime: readingTime,
      featured:
        frontmatter.featured === true || frontmatter.featured === 'true',
      date: frontmatter.date || null,
      path: path.relative(KNOWLEDGE_DIR, filePath),
      // 2026-11-04 加：語言（zh-TW／en／…）與 URL 用的小寫分類 slug。
      lang,
      categorySlug: categoryFolder.toLowerCase(),
    };
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return null;
  }
}

/**
 * 生成統計數據
 */
function generateStats(articles) {
  // 2026-11-04 site-health：分類統計改用 categorySlug。舊版用 `category`，
  // 於是 12 個語言代碼也被當成分類（totalCategories 27、"vi" 1155 篇），
  // languageDistribution 則寫死 zh-TW = 全部、en = 0。
  const categories = [...new Set(articles.map((a) => a.categorySlug))];
  const allTags = articles.flatMap((a) => a.tags);
  const uniqueTags = [...new Set(allTags)];

  // 簡單的貢獻者估算（基於不同的寫作風格特徵）
  const estimatedContributors = Math.ceil(articles.length / 15); // 假設平均每人貢獻15篇

  const categoryStats = categories
    .map((category) => ({
      name: category,
      count: articles.filter((a) => a.categorySlug === category).length,
    }))
    .sort((a, b) => b.count - a.count);

  const languageDistribution = {};
  for (const a of articles) {
    languageDistribution[a.lang] = (languageDistribution[a.lang] || 0) + 1;
  }

  const topTags = uniqueTags
    .map((tag) => ({
      name: tag,
      count: allTags.filter((t) => t === tag).length,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20);

  return {
    totalArticles: articles.length,
    totalCategories: categories.length,
    estimatedContributors: estimatedContributors,
    totalTags: uniqueTags.length,
    categories: categoryStats,
    topTags: topTags,
    languageDistribution,
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * 隨機選擇文章
 */
function getRandomArticles(articles, count = 20) {
  const shuffled = [...articles].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, articles.length));
}

/**
 * 生成文章索引（供 Smart 404 使用）
 * 映射 {category}/{slug} → { zhTitle, enTitle, category, langs[] }
 */
function generateArticleIndex() {
  console.log('📇 生成 article-index.json (Smart 404 索引)...');

  const translationsPath = path.join(KNOWLEDGE_DIR, '_translations.json');
  if (!fs.existsSync(translationsPath)) {
    console.warn('⚠️  _translations.json 不存在，跳過 article-index 生成');
    return;
  }

  const translationsRaw = JSON.parse(fs.readFileSync(translationsPath, 'utf8'));
  // Defensive filter: drop stale entries whose zh target doesn't exist.
  // Prevents Smart 404 from showing suggestions for non-existent articles.
  const translations = {};
  let _staleEntries = 0;
  for (const [lf, zf] of Object.entries(translationsRaw)) {
    if (fs.existsSync(path.join(KNOWLEDGE_DIR, zf))) {
      translations[lf] = zf;
    } else {
      _staleEntries += 1;
    }
  }
  if (_staleEntries > 0) {
    console.log(
      `   ⚠️  Skipped ${_staleEntries} stale _translations.json entries (zh file missing)`,
    );
  }
  const categoryFolderToSlug = {
    History: 'history',
    Geography: 'geography',
    Culture: 'culture',
    Food: 'food',
    Art: 'art',
    Music: 'music',
    Technology: 'technology',
    Nature: 'nature',
    People: 'people',
    Society: 'society',
    Economy: 'economy',
    Lifestyle: 'lifestyle',
    About: 'about',
    Resources: 'resources',
  };

  // Reverse maps: zhFile → jaFile / koFile
  //
  // ja/ko translations use NATIVE slugs that differ from EN slugs
  // (e.g. `ja/Culture/taiwan-youtuber.md` vs `en/Culture/taiwan-youtuber-industry.md`).
  // The previous implementation checked `knowledge/ja/<Cat>/<enSlug>.md` which
  // never matched for these cases, so Smart 404 always said "no ja version"
  // even when one existed. Build canonical reverse maps via _translations.json.
  const zhToJaFile = {};
  const zhToKoFile = {};
  for (const [langFile, zhFile] of Object.entries(translations)) {
    if (langFile.startsWith('ja/')) zhToJaFile[zhFile] = langFile;
    if (langFile.startsWith('ko/')) zhToKoFile[zhFile] = langFile;
  }

  const index = {};

  for (const [langFile, zhFile] of Object.entries(translations)) {
    // Only process en/ entries (they define the canonical English slug)
    if (!langFile.startsWith('en/')) continue;

    // Parse: "en/Food/beef-noodle-soup.md" → category=Food, slug=beef-noodle-soup
    const langParts = langFile.replace(/\.md$/, '').split('/');
    if (langParts.length < 3) continue;
    const enCategoryFolder = langParts[1];
    const enSlug = langParts[2];
    const categorySlug =
      categoryFolderToSlug[enCategoryFolder] || enCategoryFolder.toLowerCase();

    // Parse: "Food/牛肉麵.md" → zhTitle=牛肉麵
    const zhParts = zhFile.replace(/\.md$/, '').split('/');
    if (zhParts.length < 2) continue;
    const zhCategoryFolder = zhParts[0];
    const zhTitle = zhParts[1];

    // Skip Hub files
    if (zhTitle.startsWith('_') || enSlug.startsWith('_')) continue;

    const key = `${categorySlug}/${enSlug}`;

    // Skip if already indexed (multiple en slugs → same zh article)
    if (index[key]) continue;

    // Read English title from frontmatter
    let enTitle = enSlug
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
    const enFilePath = path.join(
      KNOWLEDGE_DIR,
      'en',
      enCategoryFolder,
      `${enSlug}.md`,
    );
    if (fs.existsSync(enFilePath)) {
      try {
        const enContent = fs.readFileSync(enFilePath, 'utf8');
        const { frontmatter } = parseFrontmatter(enContent);
        if (frontmatter.title) enTitle = frontmatter.title;
      } catch {}
    }

    // Check which languages have this article — via _translations.json
    // reverse lookup, because ja/ko files use native slugs that differ
    // from the EN slug we're indexing under.
    const langs = ['zh-TW', 'en']; // zh-TW and en always exist if in _translations.json
    const jaFileRel = zhToJaFile[zhFile];
    if (jaFileRel && fs.existsSync(path.join(KNOWLEDGE_DIR, jaFileRel))) {
      langs.push('ja');
    }
    const koFileRel = zhToKoFile[zhFile];
    if (koFileRel && fs.existsSync(path.join(KNOWLEDGE_DIR, koFileRel))) {
      langs.push('ko');
    }

    index[key] = { zhTitle, enTitle, category: categorySlug, langs };
  }

  const outputPath = path.join(OUTPUT_DIR, 'article-index.json');
  fs.writeFileSync(outputPath, JSON.stringify(index), 'utf8');
  const count = Object.keys(index).length;
  const size = (fs.statSync(outputPath).size / 1024).toFixed(1);
  console.log(`📇 生成 article-index.json (${count} 篇文章, ${size}KB)`);
}

/**
 * 主函數
 */
async function main() {
  console.log('🚀 Taiwan.md API Generator 啟動...');

  // 讀取所有 markdown 檔案
  console.log('📖 掃描 knowledge 目錄...');
  const markdownFiles = getAllMarkdownFiles(KNOWLEDGE_DIR);
  console.log(`找到 ${markdownFiles.length} 個 markdown 檔案`);

  // 處理所有文章
  console.log('⚙️  解析文章 metadata...');
  const articles = markdownFiles
    .map(processMarkdownFile)
    .filter((article) => article !== null)
    .sort((a, b) => a.title.localeCompare(b.title, 'zh-TW'));

  console.log(`✅ 成功處理 ${articles.length} 篇文章`);

  // 生成 articles.json
  const articlesOutput = path.join(OUTPUT_DIR, 'articles.json');
  fs.writeFileSync(articlesOutput, JSON.stringify(articles, null, 2), 'utf8');
  console.log(`📄 生成 articles.json (${articles.length} 篇文章)`);

  // 生成 stats.json
  const stats = generateStats(articles);
  const statsOutput = path.join(OUTPUT_DIR, 'stats.json');
  fs.writeFileSync(statsOutput, JSON.stringify(stats, null, 2), 'utf8');
  console.log(`📊 生成 stats.json (${stats.totalCategories} 個分類)`);

  // 生成 article-index.json (Smart 404)
  generateArticleIndex();

  console.log('\n🎉 API 生成完成！');
  console.log(`📂 輸出目錄: ${OUTPUT_DIR}`);
  console.log('📋 生成的檔案:');
  console.log('   - articles.json (所有文章 metadata)');
  console.log('   - stats.json (統計資料)');
  console.log('   - article-index.json (Smart 404 索引)');
}

// 執行
// 比路徑不比 URL：Windows 上 import.meta.url 是 file:///C:/…，`file://${argv[1]}` 是
// file://C:\…，永遠不相等，main() 不跑、也不報錯，articles.json / stats.json /
// Smart-404 的 article-index.json 靜默停在舊版。路徑含空白或中文時 macOS/Linux 也一樣。
// realpath 兩邊都取：__filename 是解開 symlink 的真實路徑，argv[1] 不一定是
// （macOS 的 /tmp 其實是 /private/tmp）。
function isEntryPoint() {
  try {
    return (
      fs.realpathSync(path.resolve(process.argv[1] || '')) ===
      fs.realpathSync(__filename)
    );
  } catch {
    return false;
  }
}
if (isEntryPoint()) {
  main().catch((error) => {
    console.error('❌ 錯誤:', error);
    process.exit(1);
  });
}
