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
const KNOWLEDGE_DIR = path.join(__dirname, '../knowledge');
const OUTPUT_DIR = path.join(__dirname, '../public/api');
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
 * 計算文章閱讀時間（字數 / 250 字/分鐘）
 */
function calculateReadingTime(content) {
  // 移除 markdown 標記
  const plainText = content
    .replace(/#+\s/g, '') // headers
    .replace(/\*\*([^*]+)\*\*/g, '$1') // bold
    .replace(/\*([^*]+)\*/g, '$1') // italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links
    .replace(/```[\s\S]*?```/g, '') // code blocks
    .replace(/`([^`]+)`/g, '$1'); // inline code

  const wordCount = plainText.length;
  const minutes = Math.max(1, Math.ceil(wordCount / 250));
  return minutes;
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

/**
 * 從檔案路徑推導分類
 */
function getCategoryFromPath(filePath) {
  const relativePath = path.relative(KNOWLEDGE_DIR, filePath);
  const pathParts = relativePath.split(path.sep);
  return pathParts[0] || 'Misc';
}

/**
 * 生成文章 URL
 */
function generateArticleUrl(filePath) {
  const relativePath = path.relative(KNOWLEDGE_DIR, filePath);
  const urlPath = relativePath
    .replace(/\.md$/, '')
    .split(path.sep)
    .map((part) => encodeURIComponent(part))
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

    const category = getCategoryFromPath(filePath);
    const fileName = path.basename(filePath, '.md');
    const url = generateArticleUrl(filePath);
    const readingTime = calculateReadingTime(bodyContent);

    return {
      title: frontmatter.title || fileName,
      description: frontmatter.description || '',
      category: category,
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
  const categories = [...new Set(articles.map((a) => a.category))];
  const allTags = articles.flatMap((a) => a.tags);
  const uniqueTags = [...new Set(allTags)];

  // 簡單的貢獻者估算（基於不同的寫作風格特徵）
  const estimatedContributors = Math.ceil(articles.length / 15); // 假設平均每人貢獻15篇

  const categoryStats = categories.map((category) => ({
    name: category,
    count: articles.filter((a) => a.category === category).length,
  }));

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
    languageDistribution: {
      'zh-TW': articles.length, // 目前全部是繁體中文
      en: 0, // 英文翻譯待完成
    },
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

  console.log('\n🎉 API 生成完成！');
  console.log(`📂 輸出目錄: ${OUTPUT_DIR}`);
  console.log('📋 生成的檔案:');
  console.log('   - articles.json (所有文章 metadata)');
  console.log('   - stats.json (統計資料)');
}

// 執行
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error('❌ 錯誤:', error);
    process.exit(1);
  });
}
