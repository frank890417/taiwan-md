import { readdir, readFile } from 'fs/promises';
import { resolve, join, basename } from 'path';
import matter from 'gray-matter';

// RSS Feed generation for Taiwan.md
export async function GET() {
  const siteUrl = 'https://taiwan.md';

  // Category mapping to folder names
  const categoryMapping: Record<string, string> = {
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

  const allArticles: any[] = [];

  // Collect all articles
  for (const [categorySlug, folderName] of Object.entries(categoryMapping)) {
    try {
      const folderPath = resolve(process.cwd(), 'knowledge', folderName);
      const files = await readdir(folderPath);
      const markdownFiles = files.filter(
        (file) => file.endsWith('.md') && !file.startsWith('_'),
      );

      for (const file of markdownFiles) {
        try {
          const filePath = join(folderPath, file);
          const fileContent = await readFile(filePath, 'utf-8');
          const { data: frontmatter, content } = matter(fileContent);

          const slug = basename(file, '.md');
          const title = frontmatter.title || slug;
          const description =
            frontmatter.description ||
            content.substring(0, 200).replace(/[\n\r]/g, ' ') + '...';
          const pubDate = frontmatter.date
            ? new Date(frontmatter.date)
            : new Date();
          const link = `${siteUrl}/${categorySlug}/${slug}`;

          allArticles.push({
            title,
            description,
            link,
            pubDate: pubDate.toUTCString(),
            category: categorySlug,
            guid: link,
          });
        } catch (err) {
          console.log(`Error processing file ${file}:`, err.message);
        }
      }
    } catch (err) {
      console.log(`Error processing category ${categorySlug}:`, err.message);
    }
  }

  // Sort by publication date (newest first)
  allArticles.sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime(),
  );

  // Take latest 50 articles
  const latestArticles = allArticles.slice(0, 50);

  // Generate RSS XML
  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Taiwan.md - 台灣知識庫</title>
    <description>讓全世界完整認識台灣 - 開源台灣知識庫，蒐集關於台灣的政治、經濟、文化、歷史、地理等各方面知識。</description>
    <link>${siteUrl}</link>
    <language>zh-TW</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <pubDate>${new Date().toUTCString()}</pubDate>
    <managingEditor>cheyu.wu@monoame.com (Taiwan.md)</managingEditor>
    <webMaster>cheyu.wu@monoame.com (Taiwan.md)</webMaster>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${siteUrl}/images/taiwan-social.jpg</url>
      <title>Taiwan.md - 台灣知識庫</title>
      <link>${siteUrl}</link>
    </image>
${latestArticles
  .map(
    (article) => `    <item>
      <title><![CDATA[${article.title}]]></title>
      <description><![CDATA[${article.description}]]></description>
      <link>${article.link}</link>
      <guid isPermaLink="true">${article.guid}</guid>
      <pubDate>${article.pubDate}</pubDate>
      <category>${article.category}</category>
    </item>`,
  )
  .join('\n')}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
