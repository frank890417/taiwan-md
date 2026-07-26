import { ui, defaultLang, showDefaultLang } from './ui';
import type { Lang } from '../types';
import { ALL_LANGUAGE_CODES } from '../config/languages';

// 2026-04-25 β7 Phase 1：fix B5（i18n-evolution-roadmap audit）
// 之前用 `lang in ui` 檢查，ui object 只 import 4 個 i18n module（en/ja/ko/zh-TW）
// → fr/es 頁面被 getLangFromUrl 偵測為 zh-TW（i18n module 缺 keys 但 LANGUAGE 是合法）
// 改用 LANGUAGES_REGISTRY 的 ALL_LANGUAGE_CODES 檢查，與 routing 對齊
const _validLangCodes = new Set<string>(ALL_LANGUAGE_CODES);

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (_validLangCodes.has(lang)) return lang as Lang;
  return defaultLang;
}

// 2026-04-24 β3: Fallback chain — for non-default languages without full
// UI translation (e.g. fr/es), fall back to English first (more useful for
// international readers than zh-TW), then default. en falls back to default
// directly. zh-TW is the default.
const FALLBACK_CHAIN: Record<string, readonly Lang[]> = {
  fr: ['fr', 'en', 'zh-TW'] as Lang[],
  es: ['es', 'en', 'zh-TW'] as Lang[],
  ja: ['ja', 'zh-TW'] as Lang[],
  ko: ['ko', 'zh-TW'] as Lang[],
  en: ['en', 'zh-TW'] as Lang[],
  // 2026-07-18 出生：vi/id/hi 拉丁/天城文讀者缺 key 時英文比中文可讀；
  // pt 讀者對 es 的可讀性高（姊妹語），多墊一層
  vi: ['vi', 'en', 'zh-TW'] as Lang[],
  id: ['id', 'en', 'zh-TW'] as Lang[],
  pt: ['pt', 'es', 'en', 'zh-TW'] as Lang[],
  hi: ['hi', 'en', 'zh-TW'] as Lang[],
  // 2026-07-25 出生日建的 route scaffold。當時註記「enabled: false / UI 字串
  // bundle 尚未落地」兩件事都已經過期：languages.mjs 兩語都 enabled: true，
  // ui.ts 的 ar / ru bundle 也各補到 193 key（與 en 同數）。fallback chain 留著
  // 是為了將來新增 key 的空窗期：缺 key 時同樣英文比中文可讀。
  ar: ['ar', 'en', 'zh-TW'] as Lang[],
  ru: ['ru', 'en', 'zh-TW'] as Lang[],
  'zh-TW': ['zh-TW'] as Lang[],
};

export function useTranslations(lang: Lang) {
  const chain = FALLBACK_CHAIN[lang] || [lang, defaultLang];
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    for (const code of chain) {
      const value = (ui as any)[code]?.[key];
      if (value !== undefined && value !== null && value !== '') {
        return value;
      }
    }
    return (ui as any)[defaultLang]?.[key] ?? String(key);
  };
}

export function useTranslatedPath(lang: Lang) {
  return function translatePath(path: string, l: string = lang) {
    return !showDefaultLang && l === defaultLang ? path : `/${l}${path}`;
  };
}
