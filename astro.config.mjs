// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeExternalLinks from 'rehype-external-links';

export default defineConfig({
  site: 'https://taiwan.md',
  integrations: [sitemap()],
  i18n: {
    defaultLocale: 'zh-TW',
    locales: ['zh-TW', 'en'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true
    },
    rehypePlugins: [
      [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }]
    ]
  }
});
