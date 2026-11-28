import { readFile, readdir } from 'fs/promises';
import { resolve } from 'path';
import type { Lang } from '../config/languages';
import { LANGUAGES } from '../config/languages';
import { staticPageExists, getCategorySlugs } from './staticRoutes';
import { recordJsonKey, untracked } from './build-deps';

// 2026-04-25 β7 Phase 1：路由疊加 fix（i18n-evolution-roadmap audit B1）
// 從 LANGUAGES_REGISTRY 動態 derive 非預設啟用語言清單，
// 對應 MANIFESTO §指標 over 複寫 + REFLEXES #20 architecture-as-data。
const NON_DEFAULT_ENABLED_LANGS = LANGUAGES.filter(
  (l) => l.enabled && !('isDefault' in l && l.isDefault),
).map((l) => l.code) as readonly Lang[];

const ALL_ENABLED_LANGS = LANGUAGES.filter((l) => l.enabled).map(
  (l) => l.code,
) as readonly Lang[];

// ── Module-level cache: valid zh files on disk ─────────────────────────────
// _translations.json has stale entries whose zh target no longer exists.
// We defensively filter against this set so the switcher never points at 404s.
let _validZhFilesCache: Set<string> | null = null;
async function getValidZhFiles(): Promise<Set<string>> {
  if (_validZhFilesCache) return _validZhFilesCache;
  const set = new Set<string>();
  const knowledgeRoot = resolve(process.cwd(), 'knowledge');
  // 分類清單從 knowledge/ 目錄 derive（大寫開頭目錄 = 分類）。2026-07-24 前是
  // 手維寫死清單，漏了 Politics —— 12 篇文章 55 筆翻譯被濾掉，該分類自出生起
  // 沒有切換器連結與 hreflang（對齊 generate-lang-switch-map.mjs 同日修法）。
  const categoryFolders: string[] = [];
  try {
    const { readdirSync } = await import('node:fs');
    for (const e of readdirSync(knowledgeRoot, { withFileTypes: true })) {
      if (e.isDirectory() && /^[A-Z]/.test(e.name))
        categoryFolders.push(e.name);
    }
  } catch {}
  for (const folder of categoryFolders) {
    try {
      const files = await readdir(resolve(knowledgeRoot, folder));
      for (const f of files) {
        if (f.endsWith('.md') && !f.startsWith('_')) {
          set.add(`${folder}/${f}`);
        }
      }
    } catch {}
  }
  try {
    const topFiles = await readdir(knowledgeRoot);
    for (const f of topFiles) {
      if (f.endsWith('.md') && !f.startsWith('_')) set.add(f);
    }
  } catch {}
  _validZhFilesCache = set;
  return set;
}

// ── LangMap: per-language URL ↔ zh URL mapping ─────────────────────────────
// Single uniform abstraction replacing the previous per-lang Map<> + per-lang
// branch duplication. 2026-05-02 sleepy-colden refactor: from 5 lang × 4 branch
// duplicate (~100 lines) to 1 LangMap registry + uniform loop (this is the
// 造橋鋪路 application of MANIFESTO §指標 over 複寫 + REFLEXES #20).
interface LangMap {
  // langUrl (e.g., '/en/art/...') → zhUrl (e.g., '/art/中文檔')
  toZh: Map<string, string>;
  // zhUrl → langUrl (canonical, may have multiple entries via aliases)
  fromZh: Map<string, string>;
}

type LangMapRegistry = Map<Lang, LangMap>;

// 分類 folder → URL slug 一律 lowercase（2026-07-24 前是手維 14 分類寫死
// 對照表，漏了 Politics；所有值本來就是 lowercase 恆等，改為函式）。
const catSlugOf = (folder: string): string => folder.toLowerCase();

function normalizePath(path: string): string {
  if (!path) return '/';
  const withLeading = path.startsWith('/') ? path : `/${path}`;
  if (withLeading.length > 1 && withLeading.endsWith('/')) {
    return withLeading.slice(0, -1);
  }
  return withLeading;
}

// ── Module-level cache: built registry ─────────────────────────────────────
// 2026-05-03 sleepy-colden Tier 1.2/1.3 build-perf optimization:
// 之前 buildLangMapRegistry() 沒 cache，每次 getLangSwitchPath() call 都重新跑
// readFile + JSON.parse + ~5000 entries Map build。Header.astro + Banner.astro
// 用在每頁，6950 pages × 重建 registry → 大量重複工作。
//
// 雙層 fix:
//   Tier 1.2: module-level promise cache（一個 process 共享一次 registry）
//   Tier 1.3: 優先讀 prebuilt `public/api/lang-switch-map.json`（O(1) load
//             vs ~150ms build），prebuild step 已產出。production / CI 路徑
//             永遠 hit prebuilt；dev mode 沒 prebuilt 時 fall back 到 build。
let _registryCache: Promise<LangMapRegistry> | null = null;

async function loadPrebuiltRegistry(): Promise<LangMapRegistry | null> {
  try {
    const path = resolve(process.cwd(), 'public/api/lang-switch-map.json');
    const raw = await readFile(path, 'utf-8');
    const data: {
      languages: string[];
      registry: Record<
        string,
        { toZh: Record<string, string>; fromZh: Record<string, string> }
      >;
    } = JSON.parse(raw);
    const registry: LangMapRegistry = new Map();
    for (const lang of NON_DEFAULT_ENABLED_LANGS) {
      const entry = data.registry[lang];
      const m: LangMap = { toZh: new Map(), fromZh: new Map() };
      if (entry) {
        for (const [k, v] of Object.entries(entry.toZh)) m.toZh.set(k, v);
        for (const [k, v] of Object.entries(entry.fromZh)) m.fromZh.set(k, v);
      }
      registry.set(lang, m);
    }
    return registry;
  } catch {
    return null;
  }
}

function getCachedRegistry(): Promise<LangMapRegistry> {
  if (!_registryCache) {
    // 建 registry 讀的檔記到群組，頁面查表時逐筆記（見 getLangSwitchPath）
    _registryCache = untracked('lang-switch-registry', () =>
      loadPrebuiltRegistry(),
    ).then((prebuilt) => {
      if (prebuilt) return prebuilt;
      // Fall back: dev mode without prebuild
      return buildLangMapRegistryUncached();
    });
  }
  return _registryCache;
}

// ── Build LangMapRegistry from _translations.json ──────────────────────────
async function buildLangMapRegistryUncached(): Promise<LangMapRegistry> {
  const registry: LangMapRegistry = new Map();
  for (const lang of NON_DEFAULT_ENABLED_LANGS) {
    registry.set(lang, { toZh: new Map(), fromZh: new Map() });
  }

  let translations: Record<string, string> = {};
  try {
    const translationsPath = resolve(
      process.cwd(),
      'knowledge',
      '_translations.json',
    );
    const raw = await readFile(translationsPath, 'utf-8');
    const translationsRaw: Record<string, string> = JSON.parse(raw);
    // Defensive filter: drop entries whose zh target doesn't exist on disk.
    const validZh = await getValidZhFiles();
    for (const [lf, zf] of Object.entries(translationsRaw)) {
      if (validZh.has(zf)) translations[lf] = zf;
    }
  } catch {
    return registry;
  }

  // URL convention (post Tailwind-Phase-6 fix, 2026-04-12):
  // All locales use the EN slug as URL path. Body content loads from the
  // locale's own knowledge/ folder via _translations.json. EN slug = canonical.
  // Build zhFile → enEntry index for canonicalization.
  const zhToEnEntry: Record<string, { catSlug: string; slug: string }> = {};
  for (const [langFile, zhFile] of Object.entries(translations)) {
    if (!langFile.startsWith('en/')) continue;
    const parts = langFile.replace(/\.md$/, '').split('/');
    if (parts.length < 3) continue;
    const catSlug = catSlugOf(parts[1]);
    zhToEnEntry[zhFile] = { catSlug, slug: parts[2] };
  }

  // Add helper: register both langUrl→zh and zh→langUrl into registry,
  // including URL-decoded variants for robust matching.
  function add(lang: Lang, langUrl: string, zhUrl: string) {
    const m = registry.get(lang);
    if (!m) return;
    const nL = normalizePath(langUrl);
    const nZ = normalizePath(zhUrl);
    const langKeys = new Set([nL, decodeURIComponent(nL)]);
    const zhKeys = new Set([nZ, decodeURIComponent(nZ)]);
    for (const k of langKeys) m.toZh.set(k, nZ);
    // fromZh is an OUTPUT map — first write wins. Native-slug URL registers
    // before the en-slug alias and is the only route that actually exists;
    // last-write-wins used to point divergent-slug articles at 404s. Keep in
    // sync with scripts/core/generate-lang-switch-map.mjs (prebuilt SSOT).
    for (const k of zhKeys) {
      if (!m.fromZh.has(k)) m.fromZh.set(k, nL);
    }
  }

  for (const [langFile, zhFile] of Object.entries(translations)) {
    const langParts = langFile.replace(/\.md$/, '').split('/');
    const zhParts = zhFile.replace(/\.md$/, '').split('/');
    if (langParts.length < 2) continue;

    const langPrefix = langParts[0] as Lang;
    if (!NON_DEFAULT_ENABLED_LANGS.includes(langPrefix)) continue;

    if (langParts.length >= 3 && zhParts.length >= 2) {
      const zhCatSlug = catSlugOf(zhParts[0]);
      const zhUrl = `/${zhCatSlug}/${encodeURIComponent(zhParts[1])}`;
      const langCatSlug = catSlugOf(langParts[1]);

      if (langPrefix === 'en') {
        // EN URL is authoritative
        add(langPrefix, `/en/${langCatSlug}/${langParts[2]}`, zhUrl);
      } else {
        // Non-en lang: register native slug + canonical (en) slug both pointing to same zh
        const nativeLangUrl = `/${langPrefix}/${langCatSlug}/${langParts[2]}`;
        add(langPrefix, nativeLangUrl, zhUrl);
        const enEntry = zhToEnEntry[zhFile];
        if (enEntry) {
          const canonicalLangUrl = `/${langPrefix}/${enEntry.catSlug}/${enEntry.slug}`;
          add(langPrefix, canonicalLangUrl, zhUrl);
        }
      }
    } else if (langParts.length === 2 && zhParts.length === 1) {
      // Bare-name files (e.g., 民主化.md → /en/民主化)
      const langUrl = `/${langPrefix}/${langParts[1]}`;
      const zhUrl = `/${encodeURIComponent(zhParts[0])}`;
      add(langPrefix, langUrl, zhUrl);
    }
  }

  return registry;
}

// ── isArticlePage detection ────────────────────────────────────────────────
// 兩段路徑是文章頁 ⟺ 第一段是真實分類 slug（knowledge/ 目錄 derive，經
// staticRoutes.getCategorySlugs）。2026-07-24 前用 NON_ARTICLE_PATHS 排除法，
// 'about' 同時是靜態頁（/about）與分類（About/）→ About 分類文章被誤判為
// 非文章頁 → registry 查不到時 fallback 出「拉丁 slug 的 zh 連結」且
// staticPageExists 被 [category] 動態路由保守放行 → 對不存在的 zh 網址發
// hreflang（「文章如何誕生」vi/id CI 死鏈的根因）。分類 allowlist 同時讓
// 新分類（如 Politics）自動被認得，不再依賴手維清單。
function isArticlePagePath(basePath: string): boolean {
  if (basePath === '/') return false;
  const parts = basePath.split('/').filter(Boolean);
  if (parts.length !== 2) return false;
  return getCategorySlugs().has(parts[0]);
}

// ── Main entry ─────────────────────────────────────────────────────────────
export async function getLangSwitchPath(currentPath: string) {
  const registry = await getCachedRegistry();
  // 沒有預先產好的 lang-switch-map.json 時會退回從 _translations.json 現算，
  // 所以「這份檔存不存在」本身也是輸入（檔案出現／消失會改變結果）。
  recordJsonKey('public/api/lang-switch-map.json', 'languages');

  const normalizedPath = normalizePath(currentPath);
  const decodedPath = normalizePath(decodeURIComponent(normalizedPath));

  // Detect current language from path prefix
  let currentLang: Lang = 'zh-TW';
  for (const prefix of NON_DEFAULT_ENABLED_LANGS) {
    if (
      normalizedPath.startsWith(`/${prefix}/`) ||
      normalizedPath === `/${prefix}`
    ) {
      currentLang = prefix;
      break;
    }
  }

  // basePath: path without lang prefix (used for fallback links)
  const basePath = (() => {
    for (const prefix of NON_DEFAULT_ENABLED_LANGS) {
      if (normalizedPath.startsWith(`/${prefix}/`))
        return normalizedPath.slice(prefix.length + 1);
      if (normalizedPath === `/${prefix}`) return '/';
    }
    return normalizedPath;
  })();

  const isArticle = isArticlePagePath(basePath);

  // Step 1: resolve currentPath → zhUrl (the canonical SSOT URL)
  // - If on zh-TW, currentPath IS the zhUrl
  // - Else look up via current lang's toZh map
  let zhUrl: string | null = null;
  if (currentLang === 'zh-TW') {
    zhUrl = decodedPath || normalizedPath;
  } else {
    const m = registry.get(currentLang);
    if (m) {
      // 頁面輸入帳：查表的那一刻記「lang-switch-map.json 裡這幾筆」
      for (const k of new Set([normalizedPath, decodedPath]))
        recordJsonKey(
          'public/api/lang-switch-map.json',
          'registry',
          currentLang,
          'toZh',
          k,
        );
      zhUrl = m.toZh.get(normalizedPath) ?? m.toZh.get(decodedPath) ?? null;
    }
  }

  // Step 2: build per-lang link + has flag uniformly
  // For each enabled lang (including current — symmetry simplifies caller code):
  // - If zhUrl resolved AND lang has fromZh entry → confident link
  // - Else for non-article pages → basePath fallback (always show)
  // - Else for article pages without explicit translation → mark unavailable
  const links: Record<string, string> = {};
  const has: Record<string, boolean> = {};

  // zh-TW
  if (currentLang === 'zh-TW') {
    links.zh = basePath === '/' ? '/' : basePath;
    has.zh = true;
  } else if (zhUrl) {
    links.zh = zhUrl;
    has.zh = true;
  } else {
    links.zh = basePath === '/' ? '/' : basePath;
    // 2026-06-10 deploy-heal：非文章頁不再假設 zh 一定有，改查 src/pages 樹
    has.zh = !isArticle && staticPageExists('zh-TW', basePath);
  }

  // Non-default langs (en/ja/ko/es/fr...)
  for (const lang of NON_DEFAULT_ENABLED_LANGS) {
    const m = registry.get(lang);
    const fallback = basePath === '/' ? `/${lang}` : `/${lang}${basePath}`;

    if (lang === currentLang) {
      // Current lang: always self-link (used for active highlight + dropdown badge)
      links[lang] = normalizedPath;
      has[lang] = true;
      continue;
    }

    if (zhUrl && m) {
      for (const k of new Set([zhUrl, decodeURIComponent(zhUrl)]))
        recordJsonKey(
          'public/api/lang-switch-map.json',
          'registry',
          lang,
          'fromZh',
          k,
        );
      const explicit =
        m.fromZh.get(zhUrl) ?? m.fromZh.get(decodeURIComponent(zhUrl)) ?? null;
      if (explicit) {
        links[lang] = explicit;
        has[lang] = true;
        continue;
      }
    }

    // No explicit mapping: for non-article pages, only offer the lang if the
    // static page actually exists for it（src/pages 樹是 SSOT — 2026-06-10
    // deploy-heal：原本「hub 頁永遠存在」的假設對 zh-only 頁（/semiont/diary/*
    // ×650、/companies、/lifetree…）每頁生 4-5 條死鏈）。
    // Article pages without explicit translation stay unavailable (slug 404).
    links[lang] = fallback;
    has[lang] = !isArticle && staticPageExists(lang, basePath);
  }

  // Generic per-language map covering ALL enabled languages (including
  // zh-TW and any newly-born language). 2026-07-24: the legacy named exports
  // below were hardcoded to 6 languages, so vi/id/pt/hi silently never
  // appeared in hreflang tags or the language switcher despite having real
  // translated content — callers should read `langs` going forward.
  const langsOut: Partial<Record<Lang, { link: string; has: boolean }>> = {
    'zh-TW': { link: links.zh ?? '/', has: has.zh ?? true },
  };
  for (const lang of NON_DEFAULT_ENABLED_LANGS) {
    langsOut[lang] = {
      link: links[lang] ?? `/${lang}`,
      has: has[lang] ?? false,
    };
  }

  // Map abstract result back to legacy named exports for backwards compat with
  // existing callers. Future: callers should iterate `langs` directly.
  return {
    zhLink: links.zh ?? '/',
    enLink: links.en ?? '/en',
    jaLink: links.ja ?? '/ja',
    koLink: links.ko ?? '/ko',
    frLink: links.fr ?? '/fr',
    esLink: links.es ?? '/es',
    hasZh: has.zh ?? true,
    hasEn: has.en ?? true,
    hasJa: has.ja ?? true,
    hasKo: has.ko ?? true,
    hasFr: has.fr ?? true,
    hasEs: has.es ?? true,
    langs: langsOut,
  };
}
