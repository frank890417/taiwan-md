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
import { readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

// 2026-04-24 β3: Build existing URL set from src/content/ to filter sitemap
// hreflang alternate to only include actually-existing language versions.
// Without this, @astrojs/sitemap auto-generates hreflang for ALL enabled
// locales for EVERY page — causing 1,705+ fake hreflang URLs (Google crawls
// them → 404 → SC reports 404). This pre-build scan + serialize() hook fix
// the systemic SEO leak.
//
// URL mapping convention:
//   src/content/{lang}/{category}/{slug}.md →
//     {lang === 'zh-TW' ? '' : '/' + lang}/{category}/{slug}/
function buildExistingUrlSet() {
  const set = new Set();
  const contentRoot = './src/content';
  for (const lang of ENABLED_LANGUAGE_CODES) {
    const langPath = join(contentRoot, lang);
    if (!existsSync(langPath)) continue;
    let cats;
    try {
      cats = readdirSync(langPath);
    } catch {
      continue;
    }
    for (const cat of cats) {
      const catPath = join(langPath, cat);
      let isDir = false;
      try {
        isDir = statSync(catPath).isDirectory();
      } catch {
        continue;
      }
      if (!isDir) continue;
      let files;
      try {
        files = readdirSync(catPath);
      } catch {
        continue;
      }
      for (const f of files) {
        if (!f.endsWith('.md')) continue;
        if (f.startsWith('_')) continue; // skip _Hub etc
        const slug = f.replace(/\.md$/, '');
        const prefix = lang === DEFAULT_LANGUAGE.code ? '' : `/${lang}`;
        set.add(`${prefix}/${cat}/${slug}/`);
      }
    }
    // Also add language landing pages (/en/, /ja/, /ko/) and zh-TW root
    const prefix = lang === DEFAULT_LANGUAGE.code ? '/' : `/${lang}/`;
    set.add(prefix);
  }
  return set;
}

const existingUrlSet = buildExistingUrlSet();
console.log(
  `[sitemap-hreflang-filter] Loaded ${existingUrlSet.size} existing URL paths for hreflang validation`,
);

// Build sitemap i18n locales map: { 'zh-TW': 'zh-TW', en: 'en', ... }
const sitemapLocales = Object.fromEntries(
  ENABLED_LANGUAGE_CODES.map((code) => [code, code]),
);

// 2026-04-18 δ-late: Semiont pages are zh-TW-only (meta-layer, not translated).
// Header nav's translatePath() generates /en/semiont/*, /ja/semiont/*, /ko/semiont/*
// etc. even though those routes don't exist — causing systemic 404s.
// Smart redirect: individual cognitive-organ pages (manifesto/dna/anatomy/...) are
// zh-TW canonical (they change weekly as the Semiont evolves its own self-model,
// translation would go stale). Redirect their non-zh paths to canonical zh-TW.
//
// 2026-04-21 γ: `/semiont` (landing) now has a real /en/ page via i18n semiont.ts,
// so it's removed from this list. If ja/ko landing pages are added later, also
// remove `/semiont` from non-default-lang redirects or gate by lang here.
// /semiont/diary has its own en page (but entries are zh-TW only, template shows notice).
const SEMIONT_ROUTES = [
  '/semiont/manifesto',
  '/semiont/dna',
  '/semiont/anatomy',
  '/semiont/consciousness',
  '/semiont/heartbeat',
  '/semiont/unknowns',
  '/semiont/longings',
  '/semiont/diary', // entries are zh-TW only; landing notice points readers there
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
      // 2026-04-24 β3: Filter hreflang alternate links to only include
      // actually-existing language versions. Without this filter,
      // @astrojs/sitemap auto-generates alternate hreflang for ALL enabled
      // locales for EVERY page—even when the target language version doesn't
      // exist—causing systemic 404s reported in Search Console.
      //
      // Pre-fix data: 3,031 hreflang tags vs 1,800 actual content files
      //   → 1,705 fake hreflang (en +675 / ja +432 / ko +598)
      //
      // serialize() runs per sitemap item before XML emission. We filter
      // item.links to only include alternates whose path exists in
      // existingUrlSet (built from src/content/ filesystem scan above).
      serialize(item) {
        if (!item.links || item.links.length === 0) return item;
        const filteredLinks = item.links.filter((link) => {
          try {
            const path = new URL(link.url).pathname;
            return existingUrlSet.has(path);
          } catch {
            // Malformed URL; drop conservatively
            return false;
          }
        });
        // Astro types: links is optional; empty array is fine but undefined
        // signals "no alternate" cleanly
        item.links = filteredLinks.length > 0 ? filteredLinks : undefined;
        return item;
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
    // 2026-04-26 β8: issue #626 (@idlccp1984) — Geography/台灣交通運輸網絡.md
    // 與 Lifestyle/台灣交通系統.md 主題重疊。整併到 Lifestyle 那篇（高品質
    // 2026-04-06 EVOLVE 版本，加 3 個 Geography 視角 scene 後成 canonical）。
    // 5 lang redirects: zh-TW + en/ja/ko/fr translation slugs
    '/geography/台灣交通運輸網絡': '/lifestyle/台灣交通系統/',
    '/en/geography/taiwan-transportation-network':
      '/en/lifestyle/transportation-system/',
    '/ja/geography/taiwan-transportation-network':
      '/ja/lifestyle/transportation-system/',
    '/ko/geography/transportation-network':
      '/ko/lifestyle/transportation-system/',
    '/fr/geography/transportation-network':
      '/fr/lifestyle/transportation-system/',
    // 2026-04-27: issue #635 (@idlccp1984) — Art/台灣當代文學發展.md
    // 與 戰後/解嚴後/當代台灣文學 三篇時代分期合併後，此寬泛總覽篇退場。
    // 重定向至 台灣文學史（四百年完整史觀，比原篇範圍更廣且更精確）。
    // 6 lang redirects: zh-TW + en/ja/ko/fr translation slugs
    '/art/台灣當代文學發展': '/art/台灣文學史/',
    '/en/art/development-of-contemporary-taiwanese-literature':
      '/en/art/history-of-taiwanese-literature/',
    '/ja/art/contemporary-literature': '/ja/art/taiwan-literature-history/',
    '/ko/art/taiwan-contemporary-literature': '/ko/art/literary-history/',
    '/fr/art/contemporary-literature-development': '/fr/art/literary-history/',
    // 2026-04-28 κ-late: issue #655 (@idlccp1984) — 3 篇宗教文章整併為 1 篇深度文章。
    // canonical: Culture/台灣宗教與寺廟文化.md (slug 沿用 + title EVOLVE 為「台灣宗教信仰：在恐懼裡長出的信仰帝國」)
    // archive 1: Lifestyle/宗教與民間信仰.md (137 行 / lastHumanReview: false / 0 footnotes)
    // archive 2: Culture/台灣新興宗教與心靈文化.md (323 行 / 0 footnotes / [LIST-DUMP] 嚴重)
    // 5 lang redirects (zh-TW + en/ja/ko/fr translation slugs)
    '/lifestyle/宗教與民間信仰': '/culture/台灣宗教與寺廟文化/',
    '/en/lifestyle/religion-and-folk-beliefs':
      '/en/culture/taiwan-religion-and-temple-culture/',
    '/ko/lifestyle/religion-and-folk-beliefs':
      '/ko/culture/taiwan-religion-and-temple-culture/',
    '/fr/lifestyle/religion-folk-beliefs':
      '/fr/culture/religion-and-temple-culture/',
    '/culture/台灣新興宗教與心靈文化': '/culture/台灣宗教與寺廟文化/',
    '/en/culture/emerging-religions-and-spiritual-culture':
      '/en/culture/taiwan-religion-and-temple-culture/',
    '/ja/culture/new-religions':
      '/ja/culture/taiwan-religion-and-temple-culture/',
    '/ko/culture/new-religions-and-spirituality':
      '/ko/culture/taiwan-religion-and-temple-culture/',
    '/fr/culture/new-religions-and-spirituality':
      '/fr/culture/religion-and-temple-culture/',
    // 2026-05-07: 阿志頭 → 台灣髮型介紹 (整併: 阿志頭 EVOLVE 進 台灣髮型介紹)
    // canonical: Lifestyle/台灣髮型介紹.md (slug 沿用)
    // archive: Lifestyle/阿志頭.md (被刪, 內容全部整合進 台灣髮型介紹)
    // 4 lang redirects (zh-TW + en/ja/ko translation slugs)
    '/lifestyle/阿志頭': '/lifestyle/台灣髮型介紹/',
    '/en/lifestyle/ah-ji-haircut': '/en/lifestyle/taiwan-hairstyles/',
    '/ja/lifestyle/ah-ji-haircut': '/ja/lifestyle/taiwan-hairstyles/',
    '/ko/lifestyle/ah-ji-haircut': '/ko/lifestyle/taiwan-hairstyles/',
  },
  // 2026-05-04: build perf tuning. Page render is 93% of build time
  // (363s render / 391s wall, baseline 4,331 pages). concurrency 1 → 4
  // is the highest-ROI lever; details in reports/research/astro-build-speed-2026-05-04.md.
  build: {
    concurrency: 4,
    inlineStylesheets: 'auto',
  },
  markdown: {
    // Explicit lang allowlist. Knowledge corpus uses bare ``` fences almost
    // exclusively (1 named lang in src/content), so capping the loaded grammar
    // bundle to common ones keeps Shiki startup small without breaking pages.
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
      langs: [
        'ts',
        'tsx',
        'js',
        'jsx',
        'astro',
        'bash',
        'sh',
        'md',
        'json',
        'yaml',
        'html',
        'css',
        'python',
        'go',
        'rust',
        'sql',
        'diff',
        'plaintext',
      ],
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
    build: {
      target: 'es2022',
      minify: 'esbuild',
      cssCodeSplit: true,
      chunkSizeWarningLimit: 10000,
      rollupOptions: {
        output: {
          // For huge SSG (4k+ pages) Rollup spends measurable time computing
          // chunk splits when the per-route bundle is tiny. Forcing one-chunk
          // output is faster on this scale (per bitdoze 339k-page case study).
          manualChunks: undefined,
        },
      },
    },
    esbuild: {
      target: 'es2022',
      minifyIdentifiers: false,
      minifySyntax: true,
      minifyWhitespace: true,
    },
    optimizeDeps: { force: false },
  },
  // experimental.queuedRendering tested 2026-05-04 — local wallclock unchanged,
  // peak RSS 1.7 GB → 4.3 GB (poolSize: 1000 over-allocates for diverse pages).
  // Skipping until upstream tunes pool sizing for content-heavy SSG.
});
