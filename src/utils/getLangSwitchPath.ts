import { readFile } from 'fs/promises';
import { resolve } from 'path';

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
    const translations: Record<string, string> = JSON.parse(raw);
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
    for (const [langFile, zhFile] of Object.entries(translations)) {
      const langParts = langFile.replace(/\.md$/, '').split('/');
      const zhParts = zhFile.replace(/\.md$/, '').split('/');
      // langParts[0] = 'en' or 'ja' or 'ko', langParts[1] = Category, langParts[2] = slug
      if (langParts.length >= 3 && zhParts.length >= 2) {
        const langPrefix = langParts[0]; // 'en', 'ja', 'ko'
        const langCatSlug =
          categoryFolderToSlug[langParts[1]] || langParts[1].toLowerCase();
        const zhCatSlug =
          categoryFolderToSlug[zhParts[0]] || zhParts[0].toLowerCase();
        const langUrl = `/${langPrefix}/${langCatSlug}/${langParts[2]}`;
        const zhUrl = `/${zhCatSlug}/${encodeURIComponent(zhParts[1])}`;
        addTranslation(langUrl, zhUrl, langPrefix);
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
  let currentLang: 'zh-TW' | 'en' | 'ja' | 'ko' = 'zh-TW';
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

  // Set all language links
  zhLink = basePath === '/' ? '/' : basePath;
  enLink = basePath === '/' ? '/en' : `/en${basePath}`;
  jaLink = basePath === '/' ? '/ja' : `/ja${basePath}`;
  koLink = basePath === '/' ? '/ko' : `/ko${basePath}`;

  // Try to resolve through translation maps for more precise linking
  if (currentLang === 'zh-TW') {
    // From Chinese, look up other languages
    const zhUrl = decodedPath || normalizedPath;
    if (reverseMap.has(zhUrl)) enLink = reverseMap.get(zhUrl)!;
    if (jaReverseMap.has(zhUrl)) jaLink = jaReverseMap.get(zhUrl)!;
    if (koReverseMap.has(zhUrl)) koLink = koReverseMap.get(zhUrl)!;
  } else if (currentLang === 'en') {
    const enUrl = decodedPath || normalizedPath;
    if (translationMap.has(enUrl)) zhLink = translationMap.get(enUrl)!;
    // For ja/ko, try pattern matching: /en/cat/slug → /ja/cat/slug
  } else if (currentLang === 'ja') {
    const jaUrl = decodedPath || normalizedPath;
    if (jaMap.has(jaUrl)) zhLink = jaMap.get(jaUrl)!;
  } else if (currentLang === 'ko') {
    const koUrl = decodedPath || normalizedPath;
    if (koMap.has(koUrl)) zhLink = koMap.get(koUrl)!;
  }

  return {
    enLink,
    zhLink,
    jaLink,
    koLink,
  };
}
