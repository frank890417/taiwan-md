import rss from '@astrojs/rss';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET(context) {
  // 掃描 knowledge/ 下所有文章
  const knowledgeDir = path.join(process.cwd(), 'knowledge');
  const articles = [];

  // 遞迴掃描
  function scanDir(dir, category = '') {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const full = path.join(dir, file);
      const stat = fs.statSync(full);
      if (
        stat.isDirectory() &&
        !file.startsWith('_') &&
        file !== 'en' &&
        file !== 'about'
      ) {
        scanDir(full, file);
      } else if (file.endsWith('.md') && !file.startsWith('_')) {
        try {
          const content = fs.readFileSync(full, 'utf-8');
          const { data } = matter(content);
          if (data.title) {
            articles.push({
              title: data.title,
              description: data.description || '',
              pubDate: data.date ? new Date(data.date) : new Date(),
              link: `/${(data.category || category).toLowerCase()}/${file.replace('.md', '')}`,
              category: data.category || category,
            });
          }
        } catch {
          // YAML parse error, skip this file
        }
      }
    }
  }

  scanDir(knowledgeDir);

  // 按日期排序，取最新 50 篇
  articles.sort((a, b) => b.pubDate - a.pubDate);

  return rss({
    title: 'Taiwan.md — 開源台灣知識庫',
    description: '用 Markdown 策展台灣，讓世界看見這座島嶼的故事',
    site: context.site || 'https://taiwan.md',
    items: articles.slice(0, 50),
    customData: '<language>zh-TW</language>',
  });
}
