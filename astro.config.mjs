// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import rehypeExternalLinks from 'rehype-external-links';
import remarkWikilinks from './plugins/remark-wikilinks.mjs';

export default defineConfig({
  site: 'https://taiwan.md',
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      // Customize priority and changefreq for different pages
      customPages: [
        'https://taiwan.md/?changefreq=daily&priority=1.0',
        'https://taiwan.md/en?changefreq=daily&priority=1.0',
      ],
      i18n: {
        defaultLocale: 'zh-TW',
        locales: {
          'zh-TW': 'zh-TW',
          en: 'en',
          ja: 'ja',
          ko: 'ko',
        },
      },
    }),
  ],
  i18n: {
    defaultLocale: 'zh-TW',
    locales: ['zh-TW', 'en', 'ja', 'ko'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  // 2026-04-11 heartbeat: Static redirects for top 404 URLs identified via
  // Cloudflare logs. Astro generates HTML meta-refresh pages for each entry.
  // Review with: bash scripts/tools/fetch-cloudflare.py --days 1
  redirects: {
    // /en/people/mayday/ → /en/people/mayday-band/ (51 req/day)
    '/en/people/mayday': '/en/people/mayday-band/',
  },
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
    remarkPlugins: [remarkWikilinks],
    rehypePlugins: [
      [
        rehypeExternalLinks,
        { target: '_blank', rel: ['noopener', 'noreferrer'] },
      ],
    ],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
