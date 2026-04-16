/**
 * LANGUAGES_REGISTRY — Single source of truth for all i18n languages.
 *
 * ⚠️ This file's data MUST stay in sync with src/config/languages.json.
 * The JSON is read by Node-direct scripts (astro.config.mjs, scripts/core/*).
 * The TS data here is used by Astro/Vite-compiled code that can't reliably
 * import JSON in prerender chunks.
 *
 * Adding a new language: edit BOTH this file and languages.json. Yes, two
 * places — but those two places replace 15 hardcoded touchpoints scattered
 * across the codebase. Net win: 15 → 2.
 *
 * Touchpoints that import from this registry:
 *  - src/types.ts (Lang type)
 *  - src/content/config.ts (content collections)
 *  - src/i18n/ui.ts (display names, defaultLang)
 *  - astro.config.mjs (via languages.mjs → languages.json)
 *  - scripts/core/generate-dashboard-data.js (via languages.mjs)
 *  - dashboard.template.astro
 */

export interface LanguageEntry {
  /** ISO code used in URLs and file paths */
  code: string;
  /** Display name shown in language switcher */
  displayName: string;
  /** ISO 639-1 hreflang for SEO */
  hreflang: string;
  /** Whether this language is the default (no URL prefix) */
  isDefault?: boolean;
  /** Whether content rendering is enabled (false = orphan, content exists but no routes) */
  enabled: boolean;
  /** Optional notes about status */
  notes?: string;
}

/**
 * Master language registry. Order matters: default first, then by activation date.
 */
export const LANGUAGES: readonly LanguageEntry[] = [
  {
    code: 'zh-TW',
    displayName: '中文',
    hreflang: 'zh-Hant',
    isDefault: true,
    enabled: true,
  },
  {
    code: 'en',
    displayName: 'English',
    hreflang: 'en',
    enabled: true,
  },
  {
    code: 'ja',
    displayName: '日本語',
    hreflang: 'ja',
    enabled: true,
  },
  {
    code: 'ko',
    displayName: '한국어',
    hreflang: 'ko',
    enabled: true,
  },
  {
    code: 'es',
    displayName: 'Español',
    hreflang: 'es',
    enabled: false,
    notes: 'Half-orphan: 36 articles in knowledge/es/ but no UI strings yet',
  },
  {
    code: 'fr',
    displayName: 'Français',
    hreflang: 'fr',
    enabled: false,
    notes: 'Pending: 18 ceruleanstring PRs ready to merge after activation',
  },
];

/** Codes of enabled languages — for runtime iteration of active languages */
export const ENABLED_LANGUAGE_CODES: readonly string[] = LANGUAGES.filter(
  (l) => l.enabled,
).map((l) => l.code);

/** All language codes including disabled ones — for content collections */
export const ALL_LANGUAGE_CODES: readonly string[] = LANGUAGES.map(
  (l) => l.code,
);

/** Default language entry */
export const DEFAULT_LANGUAGE: LanguageEntry = LANGUAGES.find(
  (l) => l.isDefault,
)!;

/** Map of code → display name for UI components */
export const LANGUAGE_DISPLAY_NAMES: Record<string, string> =
  Object.fromEntries(LANGUAGES.map((l) => [l.code, l.displayName]));

/** Lookup helper */
export function getLanguage(code: string): LanguageEntry | undefined {
  return LANGUAGES.find((l) => l.code === code);
}

/**
 * Lang type union. Currently a string alias for compatibility — adding
 * stricter literal typing would require either a codegen step or `as const`
 * on the array (which conflicts with the LanguageEntry interface narrowing).
 * The runtime check via `getLanguage()` is the safety net.
 */
export type Lang = string;
