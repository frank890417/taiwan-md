import { readFile, readdir } from 'fs/promises';
import { resolve } from 'path';
import type { Lang } from '../config/languages';
import { LANGUAGES } from '../config/languages';

// 2026-04-25 β7 Phase 1：路由疊加 fix（i18n-evolution-roadmap audit B1）
// 從 LANGUAGES_REGISTRY 動態 derive 非預設啟用語言清單，
// 對應 MANIFESTO §指標 over 複寫 + DNA #20 architecture-as-data。
const NON_DEFAULT_ENABLED_LANGS = LANGUAGES.filter(
  (l) => l.enabled && !l.isDefault,
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
  const categoryFolders = [
    'History',
    'Geography',
    'Culture',
    'Food',
    'Art',
    'Music',
    'Technology',
    'Nature',
    'People',
    'Society',
    'Economy',
    'Lifestyle',
    'About',
    'Resources',
  ];
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
// 造橋鋪路 application of MANIFESTO §指標 over 複寫 + DNA #20).
interface LangMap {
  // langUrl (e.g., '/en/art/...') → zhUrl (e.g., '/art/中文檔')
  toZh: Map<string, string>;
  // zhUrl → langUrl (canonical, may have multiple entries via aliases)
  fromZh: Map<string, string>;
}

type LangMapRegistry = Map<Lang, LangMap>;

const CATEGORY_FOLDER_TO_SLUG: Record<string, string> = {
  History: 'history',
  Geography: 'geography',
  Culture: 'culture',
  Food: 'food',
  Art: 'art',
  Music: 'music',
  Technology: 'technology',
  Nature: 'nature',
  People: 'people',
  Society: 'society',
  Economy: 'economy',
  Lifestyle: 'lifestyle',
  About: 'about',
  Resources: 'resources',
};

function normalizePath(path: string): string {
  if (!path) return '/';
  const withLeading = path.startsWith('/') ? path : `/${path}`;
  if (withLeading.length > 1 && withLeading.endsWith('/')) {
    return withLeading.slice(0, -1);
  }
  return withLeading;
}

// ── Build LangMapRegistry from _translations.json ──────────────────────────
async function buildLangMapRegistry(): Promise<LangMapRegistry> {
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
    const catSlug = CATEGORY_FOLDER_TO_SLUG[parts[1]] || parts[1].toLowerCase();
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
    for (const k of zhKeys) m.fromZh.set(k, nL);
  }

  for (const [langFile, zhFile] of Object.entries(translations)) {
    const langParts = langFile.replace(/\.md$/, '').split('/');
    const zhParts = zhFile.replace(/\.md$/, '').split('/');
    if (langParts.length < 2) continue;

    const langPrefix = langParts[0] as Lang;
    if (!NON_DEFAULT_ENABLED_LANGS.includes(langPrefix)) continue;

    if (langParts.length >= 3 && zhParts.length >= 2) {
      const zhCatSlug =
        CATEGORY_FOLDER_TO_SLUG[zhParts[0]] || zhParts[0].toLowerCase();
      const zhUrl = `/${zhCatSlug}/${encodeURIComponent(zhParts[1])}`;
      const langCatSlug =
        CATEGORY_FOLDER_TO_SLUG[langParts[1]] || langParts[1].toLowerCase();

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
const NON_ARTICLE_PATHS = new Set([
  'about',
  'contribute',
  'map',
  'data',
  'soundscape',
  'resources',
  'dashboard',
  'changelog',
  'graph',
  'terminology',
  'taiwan-shape',
  'semiont',
  'bench',
]);

function isArticlePagePath(basePath: string): boolean {
  if (basePath === '/') return false;
  const parts = basePath.split('/').filter(Boolean);
  if (parts.length !== 2) return false;
  return !NON_ARTICLE_PATHS.has(parts[0]);
}

// ── Main entry ─────────────────────────────────────────────────────────────
export async function getLangSwitchPath(currentPath: string) {
  const registry = await buildLangMapRegistry();

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
    has.zh = !isArticle;
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
      const explicit =
        m.fromZh.get(zhUrl) ?? m.fromZh.get(decodeURIComponent(zhUrl)) ?? null;
      if (explicit) {
        links[lang] = explicit;
        has[lang] = true;
        continue;
      }
    }

    // No explicit mapping: fallback for non-article pages (hub pages always work),
    // mark unavailable for article pages (slug mismatch would 404).
    links[lang] = fallback;
    has[lang] = !isArticle;
  }

  // Map abstract result back to legacy named exports for backwards compat with
  // existing callers (Header.astro, etc.). Future: callers should iterate the
  // registry directly.
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
  };
}
