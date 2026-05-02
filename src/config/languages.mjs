/**
 * MJS mirror of src/config/languages.ts.
 *
 * Used by Node-direct scripts and Astro config:
 *  - astro.config.mjs
 *  - scripts/core/generate-dashboard-data.js
 *  - scripts/core/build-search-index.mjs (when refactored)
 *
 * For TypeScript files, import from `./languages` (resolver picks .ts).
 *
 * ⚠️ MUST stay in sync with languages.ts.
 *    `bash scripts/tools/check-language-registry-sync.sh` enforces this.
 *
 * Why two files: Vite SSR prerender chunks bundle the .mjs file but break
 * any filesystem-relative paths (so we can't read JSON via readFileSync).
 * Inlining the data in both files is the most reliable approach.
 */

export const LANGUAGES = [
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
    enabled: true,
    notes:
      '2026-04-25 enabled. 36 articles from knowledge/es/. UI bundle wired through src/i18n/ui.ts on 2026-05-02.',
  },
  {
    code: 'fr',
    displayName: 'Français',
    hreflang: 'fr',
    enabled: true,
    notes:
      '2026-04-24 β3 enabled. 484 articles from ceruleanstring + community. UI bundle wired through src/i18n/ui.ts on 2026-05-02.',
  },
];

export const ENABLED_LANGUAGE_CODES = LANGUAGES.filter((l) => l.enabled).map(
  (l) => l.code,
);

export const ALL_LANGUAGE_CODES = LANGUAGES.map((l) => l.code);

export const DEFAULT_LANGUAGE = LANGUAGES.find((l) => l.isDefault);

export const LANGUAGE_DISPLAY_NAMES = Object.fromEntries(
  LANGUAGES.map((l) => [l.code, l.displayName]),
);

export function getLanguage(code) {
  return LANGUAGES.find((l) => l.code === code);
}
