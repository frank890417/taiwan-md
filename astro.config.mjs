// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
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
          es: 'es',
        },
      },
    }),
  ],
  i18n: {
    defaultLocale: 'zh-TW',
    locales: ['zh-TW', 'en', 'es', 'ja', 'ko', 'fr'],
    routing: {
      prefixDefaultLocale: false,
    },
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
});
