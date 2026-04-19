import { readFile, readdir } from 'fs/promises';
import { resolve } from 'path';
import type { Lang } from '../config/languages';

// ── Module-level cache: valid zh files on disk ─────────────────────────────
//
// _translations.json has ~36 stale entries whose zh target no longer exists
// on disk (content was renamed/consolidated but mapping wasn't updated).
// Those stale entries cause the lang switcher to confidently link to 404s.
// We defensively filter against this set so the switcher never points at a
// non-existent zh file. Rebuilt once per process then reused across all
// getLangSwitchPath() calls during the Astro build.
let _validZhFilesCache: Set<string> | null = null;
async function getValidZhFiles(): Promise<Set<string>> {
  if (_validZhFilesCache) return _validZhFilesCache;
  const set = new Set<string>();
  const knowledgeRoot = resolve(process.cwd(), 'knowledge');
  // Top-level zh category folders (same set used across the codebase)
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
  // Also track bare (no-folder) zh files that sit directly under knowledge/
  // (e.g. "民主化.md" mapped from old entries).
  try {
    const topFiles = await readdir(knowledgeRoot);
    for (const f of topFiles) {
      if (f.endsWith('.md') && !f.startsWith('_')) set.add(f);
    }
  } catch {}
  _validZhFilesCache = set;
  return set;
}

export async function getLangSwitchPath(currentPath: string) {
  let zhLink = '/';
  let enLink = '/en';
  let jaLink = '/ja';
  let koLink = '/ko';

  const normalizePath = (path: string) => {
    if (!path) return '/';
    const withLeading = path.startsWith('/') ? path : `/${path}`;
    if (withLeading.length > 1 && withLeading.endsWith('/')) {
      return withLeading.slice(0, -1);
    }
    return withLeading;
  };

  // Build translation lookup from _translations.json
  const translationMap = new Map<string, string>(); // enUrl → zhUrl
  const reverseMap = new Map<string, string>(); // zhUrl → enUrl
  const jaMap = new Map<string, string>(); // jaUrl → zhUrl
  const jaReverseMap = new Map<string, string>(); // zhUrl → jaUrl
  const koMap = new Map<string, string>(); // koUrl → zhUrl
  const koReverseMap = new Map<string, string>(); // zhUrl → koUrl
  try {
    const translationsPath = resolve(
      process.cwd(),
      'knowledge',
      '_translations.json',
    );
    const raw = await readFile(translationsPath, 'utf-8');
    const translationsRaw: Record<string, string> = JSON.parse(raw);
    // Defensive filter: drop entries whose zh target doesn't exist on disk.
    // Prevents the lang switcher from confidently linking to 404s when
    // _translations.json has stale mappings.
    const validZh = await getValidZhFiles();
    const translations: Record<string, string> = {};
    for (const [lf, zf] of Object.entries(translationsRaw)) {
      if (validZh.has(zf)) translations[lf] = zf;
    }
    const categoryFolderToSlug: Record<string, string> = {
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
    const addTranslation = (
      langUrl: string,
      zhUrl: string,
      langPrefix: string,
    ) => {
      const normalizedLang = normalizePath(langUrl);
      const normalizedZh = normalizePath(zhUrl);
      const langCandidates = new Set([
        normalizedLang,
        decodeURIComponent(normalizedLang),
      ]);
      const zhCandidates = new Set([
        normalizedZh,
        decodeURIComponent(normalizedZh),
      ]);
      if (langPrefix === 'en') {
        for (const key of langCandidates) translationMap.set(key, normalizedZh);
        for (const key of zhCandidates) reverseMap.set(key, normalizedLang);
      } else if (langPrefix === 'ja') {
        for (const key of langCandidates) jaMap.set(key, normalizedZh);
        for (const key of zhCandidates) jaReverseMap.set(key, normalizedLang);
      } else if (langPrefix === 'ko') {
        for (const key of langCandidates) koMap.set(key, normalizedZh);
        for (const key of zhCandidates) koReverseMap.set(key, normalizedLang);
      }
    };
    // URL convention (post Tailwind-Phase-6 fix, 2026-04-12):
    //
    // All locales (/en/, /ja/, /ko/) use the EN slug as the URL path, even
    // though the body content is loaded from the locale's own knowledge/
    // folder via _translations.json. This keeps inbound links & AI crawler
    // indexing stable across locales.
    //
    // The ja/ko translation map must therefore be keyed by the EN slug.
    // To build it: for each ja/ko entry in _translations.json, join via its
    // zh file to find the corresponding en entry, then use the en slug in
    // the URL. Falls back to the ja/ko-native slug only if no en entry exists.
    //
    // Also build a direct zhFile → enEntry index for en map construction.
    const zhToEnEntry: Record<string, { catSlug: string; slug: string }> = {};
    for (const [langFile, zhFile] of Object.entries(translations)) {
      if (!langFile.startsWith('en/')) continue;
      const parts = langFile.replace(/\.md$/, '').split('/');
      if (parts.length < 3) continue;
      const catSlug = categoryFolderToSlug[parts[1]] || parts[1].toLowerCase();
      zhToEnEntry[zhFile] = { catSlug, slug: parts[2] };
    }
    for (const [langFile, zhFile] of Object.entries(translations)) {
      const langParts = langFile.replace(/\.md$/, '').split('/');
      const zhParts = zhFile.replace(/\.md$/, '').split('/');
      // langParts[0] = 'en' or 'ja' or 'ko', langParts[1] = Category, langParts[2] = slug
      if (langParts.length >= 3 && zhParts.length >= 2) {
        const langPrefix = langParts[0]; // 'en', 'ja', 'ko'
        const zhCatSlug =
          categoryFolderToSlug[zhParts[0]] || zhParts[0].toLowerCase();
        const zhUrl = `/${zhCatSlug}/${encodeURIComponent(zhParts[1])}`;

        if (langPrefix === 'en') {
          // EN URL is authoritative: /en/<cat>/<en-slug>
          const langCatSlug =
            categoryFolderToSlug[langParts[1]] || langParts[1].toLowerCase();
          const langUrl = `/en/${langCatSlug}/${langParts[2]}`;
          addTranslation(langUrl, zhUrl, 'en');
        } else {
          // ja/ko URL must use the EN slug (URL-stability convention).
          // Look up the corresponding en entry via the shared zh file.
          const enEntry = zhToEnEntry[zhFile];
          const langCatSlug =
            categoryFolderToSlug[langParts[1]] || langParts[1].toLowerCase();
          const urlCatSlug = enEntry ? enEntry.catSlug : langCatSlug;
          const urlSlug = enEntry ? enEntry.slug : langParts[2];
          const langUrl = `/${langPrefix}/${urlCatSlug}/${urlSlug}`;
          addTranslation(langUrl, zhUrl, langPrefix);
        }
      } else if (langParts.length === 2 && zhParts.length === 1) {
        const langPrefix = langParts[0];
        const langUrl = `/${langPrefix}/${langParts[1]}`;
        const zhUrl = `/${encodeURIComponent(zhParts[0])}`;
        addTranslation(langUrl, zhUrl, langPrefix);
      }
    }
  } catch {}

  const normalizedPath = normalizePath(currentPath);
  const decodedPath = normalizePath(decodeURIComponent(normalizedPath));

  // Detect current language from path
  const langPrefixes = ['en', 'ja', 'ko'] as const;
  let currentLang: Lang = 'zh-TW';
  for (const prefix of langPrefixes) {
    if (
      normalizedPath.startsWith(`/${prefix}/`) ||
      normalizedPath === `/${prefix}`
    ) {
      currentLang = prefix;
      break;
    }
  }

  // Extract the category/slug part from the path
  const stripLangPrefix = (path: string) => {
    for (const prefix of langPrefixes) {
      if (path.startsWith(`/${prefix}/`)) return path.slice(prefix.length + 1);
      if (path === `/${prefix}`) return '/';
    }
    return path;
  };

  const basePath = stripLangPrefix(normalizedPath);

  // Set all language links (defaults use basePath fallback)
  zhLink = basePath === '/' ? '/' : basePath;
  enLink = basePath === '/' ? '/en' : `/en${basePath}`;
  jaLink = basePath === '/' ? '/ja' : `/ja${basePath}`;
  koLink = basePath === '/' ? '/ko' : `/ko${basePath}`;

  // Availability flags — true = the translation was explicitly found in the
  // map (confident link), false = using basePath fallback (may 404).
  // For non-article pages (home, /about, /map, etc.) we always show all
  // language buttons. For article pages (category/slug pattern), we only
  // show buttons for languages that have confirmed translations.
  const isArticlePage =
    basePath !== '/' &&
    basePath.split('/').filter(Boolean).length === 2 &&
    ![
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
    ].includes(basePath.split('/').filter(Boolean)[0]);

  // Default: all available for non-article pages
  let hasZh = true;
  let hasEn = true;
  let hasJa = true;
  let hasKo = true;

  // Try to resolve through translation maps for more precise linking
  if (currentLang === 'zh-TW') {
    // From Chinese, look up other languages
    const zhUrl = decodedPath || normalizedPath;
    if (reverseMap.has(zhUrl)) {
      enLink = reverseMap.get(zhUrl)!;
    } else if (isArticlePage) {
      hasEn = false;
    }
    if (jaReverseMap.has(zhUrl)) {
      jaLink = jaReverseMap.get(zhUrl)!;
    } else if (isArticlePage) {
      hasJa = false;
    }
    if (koReverseMap.has(zhUrl)) {
      koLink = koReverseMap.get(zhUrl)!;
    } else if (isArticlePage) {
      hasKo = false;
    }
  } else if (currentLang === 'en') {
    const enUrl = decodedPath || normalizedPath;
    if (translationMap.has(enUrl)) {
      zhLink = translationMap.get(enUrl)!;
    } else if (isArticlePage) {
      hasZh = false;
    }
    // For ja/ko from en: check if jaReverseMap/koReverseMap has the zh target
    // (en→zh→ja/ko chain). If zhLink was resolved, check if ja/ko exists for that zh.
    if (hasZh) {
      const resolvedZh = normalizePath(decodeURIComponent(zhLink));
      if (jaReverseMap.has(resolvedZh)) {
        jaLink = jaReverseMap.get(resolvedZh)!;
      } else if (isArticlePage) {
        hasJa = false;
      }
      if (koReverseMap.has(resolvedZh)) {
        koLink = koReverseMap.get(resolvedZh)!;
      } else if (isArticlePage) {
        hasKo = false;
      }
    } else if (isArticlePage) {
      hasJa = false;
      hasKo = false;
    }
  } else if (currentLang === 'ja') {
    const jaUrl = decodedPath || normalizedPath;
    if (jaMap.has(jaUrl)) {
      zhLink = jaMap.get(jaUrl)!;
    } else if (isArticlePage) {
      hasZh = false;
    }
    // From ja, en fallback (/en${basePath}) uses the same en-slug → always valid
    // ko: check via zh
    if (hasZh) {
      const resolvedZh = normalizePath(decodeURIComponent(zhLink));
      if (koReverseMap.has(resolvedZh)) {
        koLink = koReverseMap.get(resolvedZh)!;
      } else if (isArticlePage) {
        hasKo = false;
      }
    } else if (isArticlePage) {
      hasKo = false;
    }
  } else if (currentLang === 'ko') {
    const koUrl = decodedPath || normalizedPath;
    if (koMap.has(koUrl)) {
      zhLink = koMap.get(koUrl)!;
    } else if (isArticlePage) {
      hasZh = false;
    }
    // ja: check via zh
    if (hasZh) {
      const resolvedZh = normalizePath(decodeURIComponent(zhLink));
      if (jaReverseMap.has(resolvedZh)) {
        jaLink = jaReverseMap.get(resolvedZh)!;
      } else if (isArticlePage) {
        hasJa = false;
      }
    } else if (isArticlePage) {
      hasJa = false;
    }
  }

  return {
    enLink,
    zhLink,
    jaLink,
    koLink,
    hasEn,
    hasZh,
    hasJa,
    hasKo,
  };
}
