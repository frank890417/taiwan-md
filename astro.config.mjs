// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import rehypeExternalLinks from 'rehype-external-links';
import remarkWikilinks from './plugins/remark-wikilinks.mjs';
import {
  LANGUAGES,
  ENABLED_LANGUAGE_CODES,
  DEFAULT_LANGUAGE,
} from './src/config/languages.mjs';
import { readdirSync, statSync, existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { resolveRedirectTargets } from './scripts/core/resolve-redirect-targets.mjs';

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

// 2026-07-25 article-alias：英文別名網址集合，給 sitemap serialize() 排除用。
// 別名本身是真實存在的頁面（0 秒轉址殼），所以它不會變成死連結；要防的是
// 反向風險——把側門公告成正門。詳見 scripts/core/generate-article-aliases.mjs。
function buildAliasUrlSet() {
  const set = new Set();
  const p = './config/article-aliases.json';
  if (!existsSync(p)) return set;
  try {
    for (const key of Object.keys(JSON.parse(readFileSync(p, 'utf-8')))) {
      set.add(`/${key}/`);
    }
  } catch (err) {
    // 讀壞了要出聲，不要靜默讓別名漏進 sitemap。
    console.warn('[sitemap-alias-filter] article-aliases.json 讀取失敗：', err);
  }
  return set;
}
const aliasUrlSet = buildAliasUrlSet();
console.log(
  `[sitemap-alias-filter] Loaded ${aliasUrlSet.size} alias URLs to exclude from sitemap`,
);

// Build sitemap i18n locales map: { 'zh-TW': 'zh-Hant', en: 'en', ... }
// 2026-11-04 site-health: values are the registry's hreflang (zh-TW →
// zh-Hant), the same codes SEO.astro writes into each page's <head>. They
// used to be the raw lang codes, so the sitemap said `zh-TW` while the HTML
// said `zh-Hant` for the same page.
const HREFLANG_OF = Object.fromEntries(
  LANGUAGES.filter((l) => l.enabled).map((l) => [l.code, l.hreflang || l.code]),
);
const sitemapLocales = Object.fromEntries(
  ENABLED_LANGUAGE_CODES.map((code) => [code, HREFLANG_OF[code] || code]),
);

// 2026-11-04 site-health: article hreflang clusters for the sitemap.
// @astrojs/sitemap pairs alternates by identical path after the locale
// prefix. Translations share an English slug with each other but never with
// the zh-TW original (/history/二二八事件/ vs /en/history/228-incident/), so
// every zh-TW article went out with zero alternates and every translation
// listed eleven siblings but not its own source. The <head> tags already
// resolve this through the LangMap registry; the sitemap now reads the same
// registry (public/api/lang-switch-map.json, written by prebuild:langswitch)
// so both channels announce the same cluster. Missing/unreadable file →
// null → serialize() falls back to the old path-equality links.
function loadLangRegistry() {
  const p = './public/api/lang-switch-map.json';
  if (!existsSync(p)) return null;
  try {
    return JSON.parse(readFileSync(p, 'utf-8')).registry || null;
  } catch (err) {
    console.warn(
      '[sitemap-hreflang-cluster] lang-switch-map.json 讀取失敗：',
      err,
    );
    return null;
  }
}
const langRegistry = loadLangRegistry();
const NON_DEFAULT_CODES = ENABLED_LANGUAGE_CODES.filter(
  (c) => c !== DEFAULT_LANGUAGE.code,
);
// Article categories = knowledge/ folders starting uppercase (same SSOT as
// staticRoutes.getCategorySlugs). /elections/2026/ etc. are two-segment
// static pages, not articles, and keep the path-equality links.
const ARTICLE_CATEGORY_SLUGS = new Set(
  (() => {
    try {
      return readdirSync('./knowledge', { withFileTypes: true })
        .filter((e) => e.isDirectory() && /^[A-Z]/.test(e.name))
        .map((e) => e.name.toLowerCase());
    } catch {
      return [];
    }
  })(),
);
/** @param {string} s */
const safeDecode = (s) => {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
};
/**
 * decoded path with trailing slash → { langCode: decodedPathWithSlash } | null
 * @param {string} pathname
 * @returns {Record<string, string> | null}
 */
function articleCluster(pathname) {
  if (!langRegistry) return null;
  const segs = pathname.split('/').filter(Boolean);
  const lang = NON_DEFAULT_CODES.includes(segs[0]) ? segs[0] : null;
  const rest = lang ? segs.slice(1) : segs;
  // article shape only: /[lang/]category/slug/
  if (rest.length !== 2 || !ARTICLE_CATEGORY_SLUGS.has(rest[0])) return null;
  const noSlash = pathname.replace(/\/$/, '');
  let zh = noSlash;
  if (lang) {
    const toZh = langRegistry[lang]?.toZh || {};
    const hit = toZh[noSlash] ?? toZh[encodeURI(noSlash)];
    if (!hit) return null;
    zh = safeDecode(hit);
  }
  const cluster = { [DEFAULT_LANGUAGE.code]: `${zh}/` };
  for (const l of NON_DEFAULT_CODES) {
    const fromZh = langRegistry[l]?.fromZh || {};
    const t = fromZh[zh] ?? fromZh[encodeURI(zh)];
    if (t) cluster[l] = `${safeDecode(t)}/`;
  }
  return cluster;
}

// 2026-11-04 site-health: pages that render <meta name="robots"
// content="noindex"> must not be submitted in the sitemap (Search Console
// flags "Submitted URL marked noindex"). Kept as a path list because
// serialize() cannot see page HTML; check-url-contract does not cover it.
// Same reasoning for static pages that are only meta-refresh redirect stubs
// (e.g. src/pages/{ar,de,…}/graph.astro → /graph): a sitemap should list
// destinations, not doorways. Derived from src/pages so a new stub never
// needs a hand edit here.
function buildRedirectStubPathSet() {
  /** @type {Set<string>} */
  const set = new Set();
  /** @param {string} dir @param {string} rel */
  const walk = (dir, rel) => {
    /** @type {import('node:fs').Dirent[]} */
    let entries = [];
    try {
      entries = readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      if (e.name.startsWith('[') || e.name.startsWith('_')) continue;
      const full = join(dir, e.name);
      if (e.isDirectory()) {
        walk(full, `${rel}/${e.name}`);
      } else if (e.name.endsWith('.astro')) {
        let text = '';
        try {
          text = readFileSync(full, 'utf-8');
        } catch {
          continue;
        }
        if (!/http-equiv=["']refresh["']/i.test(text)) continue;
        const name = e.name.replace(/\.astro$/, '');
        set.add(name === 'index' ? `${rel}/` : `${rel}/${name}/`);
      }
    }
  };
  walk('./src/pages', '');
  return set;
}
const redirectStubPathSet = buildRedirectStubPathSet();
console.log(
  `[sitemap-stub-filter] Loaded ${redirectStubPathSet.size} meta-refresh stub pages to exclude from sitemap`,
);
const NOINDEX_PATH_RE = new RegExp(
  // 2026-11-10 專題整合：/embed/…（工具內嵌板，全部 noindex）也不進 sitemap。
  `^/(?:(?:${NON_DEFAULT_CODES.join('|')})/)?(?:(?:search|assets)/$|embed/)|^/feedback-uxtest/$`,
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

// 2026-06-07 SEO freshness (reports/seo-optimization-plan-2026-06-07.md §1.1):
// Per-URL sitemap <lastmod> from real last-meaningful-commit dates, generated by
// scripts/core/build-content-dates.mjs (git-derived, cosmetic-filtered). Replaces
// the old global `lastmod: new Date()` which made Google distrust our lastmod.
/** @type {Record<string, string>} */
let contentDates = {};
try {
  contentDates =
    JSON.parse(readFileSync('./src/data/content-dates.json', 'utf-8')).dates ||
    {};
} catch {
  // not yet generated → omit lastmod entirely (safe; never fake-fresh)
}

export default defineConfig({
  site: 'https://taiwan.md',
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      // 2026-06-07: global `lastmod: new Date()` REMOVED — it made every page
      // claim "modified today" on every build, the exact anti-pattern Google
      // names (→ distrusts our lastmod site-wide). lastmod is now set per-URL in
      // serialize() from content-dates.json. See SEO plan report §1.1.
      // 2026-10-03: customPages 移除。原本兩行想用 `?changefreq=daily&priority=1.0`
      // 替首頁設權重，但 customPages 只收網址、不解析參數，於是 sitemap 從 03-17
      // 起照字面公告了 `https://taiwan.md/?changefreq=…` 與 `https://taiwan.md/en?changefreq=…`
      // 兩條假網址（後者少斜線，爬蟲還要多吃一次 301）。首頁與 /en/ 本來就由頁面
      // 掃描收進 sitemap；Google 也明說不讀 priority 與 changefreq。
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
        // 2026-07-25 article-alias：英文別名側門一律不進 sitemap。別名是給
        // 「照著我們自己的 URL 文法推網址」的人跟機器走的側門，不是第二個正門
        // ——canonical 永遠是中文網址。放進 sitemap 等於請 Google 把同一篇文章
        // 當兩個 URL 收，正是 2026-07-17 那次 15% 404 率的同科病（站體對外
        // 公告了自己不打算負責的 URL）。SSOT 是 config/article-aliases.json。
        let decodedPath = '';
        try {
          decodedPath = decodeURIComponent(new URL(item.url).pathname);
          if (aliasUrlSet.has(decodedPath)) return undefined;
          if (NOINDEX_PATH_RE.test(decodedPath)) return undefined;
          if (redirectStubPathSet.has(decodedPath)) return undefined;
        } catch {
          /* malformed URL：交給下面既有的處理 */
        }
        // Per-URL <lastmod> = real last meaningful edit (content-dates.json,
        // git-derived + cosmetic-filtered). Omit when unknown — never fake.
        // decodeURIComponent: sitemap loc percent-encodes CJK slugs (zh-TW
        // articles), but content-dates keys are raw UTF-8 — decode to match.
        try {
          const lm =
            contentDates[decodeURIComponent(new URL(item.url).pathname)];
          if (lm) item.lastmod = lm;
          else delete item.lastmod;
        } catch {
          delete item.lastmod;
        }
        // Article pages: full registry cluster (zh-TW source + every existing
        // translation + x-default → zh-TW), same set as the <head> tags.
        const cluster = decodedPath ? articleCluster(decodedPath) : null;
        if (cluster) {
          const present = Object.entries(cluster).filter(([, p]) =>
            existingUrlSet.has(p),
          );
          if (present.length >= 2) {
            const zhPath = cluster[DEFAULT_LANGUAGE.code];
            item.links = present.map(([code, p]) => ({
              lang: HREFLANG_OF[code] || code,
              url: new URL(p, 'https://taiwan.md').href,
            }));
            if (existingUrlSet.has(zhPath)) {
              item.links.push({
                lang: 'x-default',
                url: new URL(zhPath, 'https://taiwan.md').href,
              });
            }
          } else {
            item.links = undefined;
          }
          return item;
        }
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
  //
  // 2026-07-17: generated redirects merged in from config/redirects-generated
  // .json (slug-unification renames + monitor-404 observed dead URLs with
  // resolvable targets; producer: scripts/core/generate-redirects.mjs, runs in
  // prebuild). Deploy platform truth is GitHub Pages — _redirects files are
  // NOT supported there, meta-refresh stubs are the only native redirect path.
  // Inline entries below win on key collision (spread order).
  //
  // 2026-07-24: 整張表過 resolveRedirectTargets() existence-aware 解析 —
  // 語言文章型目標的譯文被 quarantine 暫時刪除時，stub canonical 會指向
  // 404 直接紅 CI（同日連炸四次部署）。目標缺席 → 退 zh canonical，
  // 譯文補回後下次 build 自動恢復直達。詳 scripts/core/resolve-redirect-targets.mjs。
  redirects: resolveRedirectTargets({
    ...(existsSync('./config/redirects-generated.json')
      ? JSON.parse(readFileSync('./config/redirects-generated.json', 'utf-8'))
      : {}),
    // 2026-08-18: 台灣豆漿與早餐店.md Merge 進 台灣早餐文化.md（idlccp1984 #1389 回報兩篇
    // 重疊）。canonical 選 台灣早餐文化：站內連入 10 篇 vs 1 篇、lastHumanReview:true、
    // 有腳註；散文骨架取豆漿篇的場景式路線全文重寫（選定理由見
    // reports/research/2026-08/台灣早餐文化.md §舊文素材萃取）。
    // ⚠️ 9-lang redirect（zh + en/ja/ko/es/fr/id/ru/vi）——豆漿篇有 8 語譯文，比 Stage 5
    // contract 寫死的「5 lang」多了 es/id/ru/vi 四語（contract 老化已記 LESSONS）。
    // 譯文暫留舊內容待 babel re-sync，redirect 先接住外部連結。
    '/food/台灣豆漿與早餐店': '/food/台灣早餐文化/',
    '/en/food/taiwan-soy-milk-and-breakfast-shops':
      '/en/food/taiwan-breakfast-culture/',
    '/ja/food/taiwan-soy-milk-and-breakfast-shops':
      '/ja/food/taiwan-breakfast-culture/',
    '/ko/food/taiwan-soy-milk-and-breakfast-shops':
      '/ko/food/taiwan-breakfast-culture/',
    '/es/food/taiwan-soy-milk-and-breakfast-shops':
      '/es/food/taiwan-breakfast-culture/',
    '/fr/food/taiwan-soy-milk-and-breakfast-shops':
      '/fr/food/taiwan-breakfast-culture/',
    '/id/food/taiwan-soy-milk-and-breakfast-shops': '/food/台灣早餐文化/',
    '/ru/food/taiwan-soy-milk-and-breakfast-shops': '/food/台灣早餐文化/',
    '/vi/food/taiwan-soy-milk-and-breakfast-shops': '/food/台灣早餐文化/',
    // 2026-06-19: 立蛋.md Merge 進 端午節.md（idlccp1984 #1167/#1168 同日初稿，
    // 立蛋「迷信 vs 科學」吸納為端午節對比模組）。立蛋為當日新建 zh-TW only，1 lang redirect。
    '/culture/立蛋': '/culture/端午節/',
    // 2026-07-18: 台灣經濟奇蹟.md + 戰後經濟發展.md 三篇合一併入 經濟奇蹟.md（三篇
    // 皆覆蓋同一段戰後經濟史，無獨立不重疊 scope；經濟奇蹟 canonical 選定理由見
    // reports/research/2026-07/經濟奇蹟.md：唯一場景式敘事 + lastHumanReview:true，
    // 兩篇 History 版本的土地改革/亞洲四小龍比較/社會變遷/腳註已吸收進 canonical）。
    // 6-lang redirect ×2 篇（en/ja/ko/es/fr 譯本暫留舊內容，待 babel re-sync）。
    '/history/台灣經濟奇蹟': '/economy/經濟奇蹟/',
    '/history/戰後經濟發展': '/economy/經濟奇蹟/',
    '/en/history/taiwan-economic-miracle-from-agriculture-to-asian-tiger':
      '/en/economy/economic-miracle/',
    '/ja/history/taiwan-economic-miracle-from-agriculture-to-asian-tiger':
      '/ja/economy/economic-miracle/',
    '/ko/history/taiwan-economic-miracle-from-agriculture-to-asian-tiger':
      '/ko/economy/economic-miracle/',
    '/es/history/taiwan-economic-miracle-from-agriculture-to-asian-tiger':
      '/es/economy/economic-miracle/',
    '/fr/history/taiwan-economic-miracle-from-agriculture-to-asian-tiger':
      '/fr/economy/economic-miracle/',
    '/en/history/postwar-economic-development': '/en/economy/economic-miracle/',
    '/ja/history/postwar-economic-development': '/ja/economy/economic-miracle/',
    '/ko/history/postwar-economic-development': '/ko/economy/economic-miracle/',
    '/es/history/postwar-economic-development': '/es/economy/economic-miracle/',
    '/fr/history/postwar-economic-development': '/fr/economy/economic-miracle/',
    // 2026-06-26: 台灣鹹酥雞.md 合併進 台灣鹽酥雞.md（idlccp1984 #1175，同一食物不同
    // 拼法；鹽酥雞 canonical — 10 footnote + 已含「鹽/鹹」naming section + 在 Food Hub）。
    // 6-lang redirect（鹹酥雞 譯名 salt-and-pepper-fried-chicken → 鹽酥雞 popcorn-chicken-redux）。
    '/food/台灣鹹酥雞': '/food/台灣鹽酥雞/',
    // 2026-06-28: 流行音樂與金曲獎.md EVOLVE 拆出獨立 金曲獎.md（純化在「獎」本身，立體群像；
    // 流行音樂產業興衰交給 台灣流行音樂.md 不重複）。zh slug rename，1 lang redirect（en/ja/ko/es/fr
    // 譯本 slug pop-music-and-golden-melody-awards 暫留、_translations 重指 金曲獎.md 待 babel re-sync）。
    '/music/流行音樂與金曲獎': '/music/金曲獎/',
    // 2026-07-25: 用語詞庫兩個錯誤詞條在 2026-07-11 詞庫全審（db957fec7）改名，
    // 舊 URL 從此死掉——而讀者就是從那兩頁回報問題的（issues #1199/#1200/#1201，
    // 回報者「中共認知作戰前線戰地記者」）。詞條改名不像文章改名有人記得補 redirect，
    // 這兩條是把讀者原本站的位置接回去。
    '/terminology/乌子山共和國': '/terminology/獅子山共和國/',
    '/terminology/厄乙垂亞': '/terminology/厄利垂亞/',
    '/en/food/taiwanese-salt-and-pepper-fried-chicken':
      '/en/food/taiwanese-popcorn-chicken-redux/',
    '/ja/food/taiwanese-salt-and-pepper-fried-chicken':
      '/ja/food/taiwanese-popcorn-chicken-redux/',
    '/ko/food/taiwanese-salt-and-pepper-fried-chicken':
      '/ko/food/taiwanese-popcorn-chicken-redux/',
    '/es/food/taiwanese-salt-and-pepper-fried-chicken':
      '/es/food/taiwanese-popcorn-chicken-redux/',
    '/fr/food/taiwanese-salt-and-pepper-fried-chicken':
      '/fr/food/taiwanese-popcorn-chicken-redux/',
    // /about/創辦人/ → /people/吳哲宇/ (Google top-5 結果但 404)
    '/about/創辦人': '/people/吳哲宇/',
    // /en/people/mayday/ → /en/people/mayday-band/ (51 req/day)
    '/en/people/mayday': '/en/music/mayday-band/',
    // 2026-05-08 #883: 八炯 romanization Ba Jiong → Pa Chiung (Wade-Giles per
    // Taipei Times 2025-08-05 article, Taiwan-canonical romanization). Sovereignty-
    // aligned correction (per MANIFESTO §主權的巴別塔: avoid PRC pinyin where
    // Taiwan media uses Wade-Giles). 5-lang slug rename.
    '/en/people/ba-jiong-political-youtuber':
      '/en/people/pa-chiung-political-youtuber/',
    '/ja/people/ba-jiong-political-youtuber':
      '/ja/people/pa-chiung-political-youtuber/',
    '/ko/people/ba-jiong-political-youtuber':
      '/ko/people/pa-chiung-political-youtuber/',
    '/fr/people/ba-jiong-political-youtuber':
      '/fr/people/pa-chiung-political-youtuber/',
    '/es/people/ba-jiong-political-youtuber':
      '/es/people/pa-chiung-political-youtuber/',
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
    '/ja/art/contemporary-literature':
      '/ja/art/history-of-taiwanese-literature/',
    '/ko/art/taiwan-contemporary-literature':
      '/ko/art/history-of-taiwanese-literature/',
    '/fr/art/contemporary-literature-development':
      '/fr/art/history-of-taiwanese-literature/',
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
      '/fr/culture/taiwan-religion-and-temple-culture/',
    '/culture/台灣新興宗教與心靈文化': '/culture/台灣宗教與寺廟文化/',
    '/en/culture/emerging-religions-and-spiritual-culture':
      '/en/culture/taiwan-religion-and-temple-culture/',
    '/ja/culture/new-religions':
      '/ja/culture/taiwan-religion-and-temple-culture/',
    '/ko/culture/new-religions-and-spirituality':
      '/ko/culture/taiwan-religion-and-temple-culture/',
    '/fr/culture/new-religions-and-spirituality':
      '/fr/culture/taiwan-religion-and-temple-culture/',
    // 2026-05-07: 阿志頭 → 台灣髮型介紹 (整併: 阿志頭 EVOLVE 進 台灣髮型介紹)
    // canonical: Lifestyle/台灣髮型介紹.md (slug 沿用)
    // archive: Lifestyle/阿志頭.md (被刪, 內容全部整合進 台灣髮型介紹)
    // 4 lang redirects (zh-TW + en/ja/ko translation slugs)
    '/lifestyle/阿志頭': '/lifestyle/台灣髮型介紹/',
    '/en/lifestyle/ah-ji-haircut': '/en/lifestyle/taiwan-hairstyles/',
    '/ja/lifestyle/ah-ji-haircut': '/ja/lifestyle/taiwan-hairstyles/',
    '/ko/lifestyle/ah-ji-haircut': '/ko/lifestyle/taiwan-hairstyles/',
    // 2026-05-16: 產業轉型 4 篇 → 1 篇 (整併 per issue #1063 哲宇裁決)
    // canonical: Economy/台灣產業轉型升級.md (補美援/十大建設/新竹園區/四小龍 4 段)
    // archive 1-3: 台灣產業轉型與經濟發展軌跡 / 產業轉型 / 產業轉型與經濟發展軌跡
    // 6 lang × 3 archives = 18 redirect entries
    '/economy/台灣產業轉型與經濟發展軌跡': '/economy/台灣產業轉型升級/',
    '/en/economy/taiwan-industrial-transformation-trajectory':
      '/en/economy/industrial-transformation-from-manufacturing-to-innovation/',
    '/es/economy/taiwan-industrial-transformation-trajectory':
      '/es/economy/industrial-transformation-from-manufacturing-to-innovation/',
    '/fr/economy/taiwan-industrial-transformation-trajectory':
      '/fr/economy/industrial-transformation-from-manufacturing-to-innovation/',
    '/ja/economy/taiwan-industrial-transformation-trajectory':
      '/ja/economy/industrial-transformation-from-manufacturing-to-innovation/',
    '/ko/economy/taiwan-industrial-transformation-trajectory':
      '/ko/economy/industrial-transformation-from-manufacturing-to-innovation/',
    '/economy/產業轉型': '/economy/台灣產業轉型升級/',
    '/en/economy/taiwan-industrial-transformation':
      '/en/economy/industrial-transformation-from-manufacturing-to-innovation/',
    '/es/economy/taiwan-industrial-transformation':
      '/es/economy/industrial-transformation-from-manufacturing-to-innovation/',
    '/fr/economy/taiwan-industrial-transformation':
      '/fr/economy/industrial-transformation-from-manufacturing-to-innovation/',
    '/ja/economy/taiwan-industrial-transformation':
      '/ja/economy/industrial-transformation-from-manufacturing-to-innovation/',
    '/ko/economy/taiwan-industrial-transformation':
      '/ko/economy/industrial-transformation-from-manufacturing-to-innovation/',
    '/economy/產業轉型與經濟發展軌跡': '/economy/台灣產業轉型升級/',
    '/en/economy/industrial-transformation-and-economic-development':
      '/en/economy/industrial-transformation-from-manufacturing-to-innovation/',
    '/es/economy/industrial-transformation-and-economic-development':
      '/es/economy/industrial-transformation-from-manufacturing-to-innovation/',
    '/fr/economy/industrial-transformation-and-economic-development':
      '/fr/economy/industrial-transformation-from-manufacturing-to-innovation/',
    '/ja/economy/industrial-transformation-and-economic-development':
      '/ja/economy/industrial-transformation-from-manufacturing-to-innovation/',
    '/ko/economy/industrial-transformation-and-economic-development':
      '/ko/economy/industrial-transformation-from-manufacturing-to-innovation/',
    // 2026-05-16: Technology/台灣新創生態系 → Economy/新創生態系 (整併 per issue #1063)
    // canonical: Economy/新創生態系.md (lastHumanReview=true + 5 footnotes + EVOLVE 已過)
    // archive: Technology/台灣新創生態系.md (被刪, unique 段整合進 canonical)
    // 6 lang redirects (zh-TW + en/es/fr/ja/ko translation slugs)
    '/technology/台灣新創生態系': '/economy/新創生態系/',
    '/en/technology/taiwan-startup-ecosystem':
      '/en/economy/taiwan-startup-ecosystem-overview/',
    '/es/technology/taiwan-startup-ecosystem':
      '/es/economy/taiwan-startup-ecosystem-overview/',
    '/fr/technology/taiwan-startup-ecosystem':
      '/fr/economy/taiwan-startup-ecosystem-overview/',
    '/ja/technology/taiwan-startup-ecosystem':
      '/ja/economy/taiwan-startup-ecosystem-overview/',
    '/ko/technology/taiwan-startup-ecosystem':
      '/ko/economy/taiwan-startup-ecosystem-overview/',
    // 2026-06-19 #1152 (回報者 菜國人): 視覺化模組型錄 是 meta / about-the-site
    // 頁（tw-* 視覺模組的 live demo，與 docs/editorial/graph.md 互為搭檔），
    // 不是 Society 主題。Recategorize Society → About。6 lang redirects 讓
    // 已被索引的 /society/... URL 不 404。
    '/society/視覺化模組型錄': '/about/視覺化模組型錄/',
    '/en/society/visualization-module-catalog':
      '/en/about/visualization-module-catalog/',
    '/es/society/visualization-module-catalog':
      '/es/about/visualization-module-catalog/',
    '/fr/society/visualization-module-catalog':
      '/fr/about/visualization-module-catalog/',
    '/ja/society/visualization-module-catalog':
      '/ja/about/visualization-module-catalog/',
    '/ko/society/visualization-module-catalog':
      '/ko/about/visualization-module-catalog/',
    // 2026-07-12: taiwan-slash-generation.md 的 en/ja/ko/es/fr 五語都被誤植
    // Teach For Taiwan 內容（lang-sync 選 slug 時失誤，跟真正的斜槓世代譯本
    // taiwan-slash-generation-multi-job-economy.md 撞名）。斜槓世代文章正因
    // Taipei Times 專欄引用開始有外部連結，藉此順手把 TFT 文章遷到正確 slug，
    // 5 lang redirects 讓已被索引的舊 URL 不 404。
    '/en/society/taiwan-slash-generation': '/en/society/teach-for-taiwan/',
    '/ja/society/taiwan-slash-generation': '/ja/society/teach-for-taiwan/',
    '/ko/society/taiwan-slash-generation': '/ko/society/teach-for-taiwan/',
    '/es/society/taiwan-slash-generation': '/es/society/teach-for-taiwan/',
    '/fr/society/taiwan-slash-generation': '/fr/society/teach-for-taiwan/',
    // fr 的斜槓世代譯本原本用不一致的 slug（slash-generation-new），改名對齊
    // en/ja/ko/es 共用的 taiwan-slash-generation-multi-job-economy，1 lang redirect。
    '/fr/society/slash-generation-new':
      '/fr/society/taiwan-slash-generation-multi-job-economy/',
  }),
  // 2026-05-04: build perf tuning. Page render is 93% of build time
  // (363s render / 391s wall, baseline 4,331 pages). concurrency 1 → 4
  // is the highest-ROI lever; details in reports/research/astro-build-speed-2026-05-04.md.
  // 2026-06-10 audit A/B: 8,436 頁 / 943s render，有效平行度 3.08/4 → 試 8。
  // heap 已 12GB；下個 CI build 看 wall + RSS，OOM/變慢即回退 4。
  // reports/build-pipeline-audit-2026-06-10.md 熱點 #2a。
  build: {
    concurrency: 8,
    inlineStylesheets: 'auto',
  },
  // Keep whitespace and the verified wikilink/rehype contract across Astro 7.
  compressHTML: true,
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
    processor: unified({
      remarkPlugins: [remarkWikilinks],
      rehypePlugins: [
        [
          rehypeExternalLinks,
          { target: '_blank', rel: ['noopener', 'noreferrer'] },
        ],
      ],
    }),
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      target: 'es2022',
      minify: 'oxc',
      cssCodeSplit: true,
      chunkSizeWarningLimit: 10000,
    },
    optimizeDeps: { force: false },
  },
});
