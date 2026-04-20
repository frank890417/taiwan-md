// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import rehypeExternalLinks from 'rehype-external-links';
import remarkWikilinks from './plugins/remark-wikilinks.mjs';
import {
  ENABLED_LANGUAGE_CODES,
  DEFAULT_LANGUAGE,
} from './src/config/languages.mjs';

// Build sitemap i18n locales map: { 'zh-TW': 'zh-TW', en: 'en', ... }
const sitemapLocales = Object.fromEntries(
  ENABLED_LANGUAGE_CODES.map((code) => [code, code]),
);

// 2026-04-18 δ-late: Semiont pages are zh-TW-only (meta-layer, not translated).
// Header nav's translatePath() generates /en/semiont, /ja/semiont, /ko/semiont
// etc. even though those routes don't exist — causing systemic 404s.
// Smart redirect: all non-zh semiont-series paths → canonical /semiont/ equivalent.
const SEMIONT_ROUTES = [
  '/semiont',
  '/semiont/manifesto',
  '/semiont/dna',
  '/semiont/anatomy',
  '/semiont/consciousness',
  '/semiont/heartbeat',
  '/semiont/unknowns',
  '/semiont/longings',
  '/semiont/diary',
];
const NON_DEFAULT_LANGS = ENABLED_LANGUAGE_CODES.filter(
  (c) => c !== DEFAULT_LANGUAGE.code,
);
const semiontRedirects = Object.fromEntries(
  NON_DEFAULT_LANGS.flatMap((lang) =>
    SEMIONT_ROUTES.map((route) => [`/${lang}${route}`, `${route}/`]),
  ),
);

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
        defaultLocale: DEFAULT_LANGUAGE.code,
        locales: sitemapLocales,
      },
    }),
  ],
  i18n: {
    defaultLocale: DEFAULT_LANGUAGE.code,
    locales: [...ENABLED_LANGUAGE_CODES],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  // 2026-04-11 heartbeat: Static redirects for top 404 URLs identified via
  // Cloudflare logs. Astro generates HTML meta-refresh pages for each entry.
  // Review with: bash scripts/tools/fetch-cloudflare.py --days 1
  redirects: {
    // /about/創辦人/ → /people/吳哲宇/ (Google top-5 結果但 404)
    '/about/創辦人': '/people/吳哲宇/',
    // /en/people/mayday/ → /en/people/mayday-band/ (51 req/day)
    '/en/people/mayday': '/en/people/mayday-band/',
    // 2026-04-18 δ-late: EN version of democratic transition was renamed from
    // `democratic-transition.md` → `taiwan-democratization.md`; spores #10/#11
    // (2026-04-07) still send traffic to the old URL (37 views/day).
    '/en/history/democratic-transition': '/en/history/taiwan-democratization/',
    // 2026-04-18 δ-late: semiont meta-pages are zh-TW only; auto-generated
    // multilingual nav (translatePath) creates /{en|ja|ko}/semiont/* 404s.
    // Redirect all non-zh semiont-series paths to canonical zh-TW equivalents.
    ...semiontRedirects,
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
