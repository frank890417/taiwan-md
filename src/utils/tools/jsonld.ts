/**
 * jsonld.ts — 專題工具頁與總覽頁的結構化資料（純函式，不碰 DOM、不讀檔）。
 *
 * 使用者：src/components/tools/ToolPage.astro、src/templates/tools-index.template.astro。
 * 測試：tests/topics-foundation.test.mjs（node --experimental-strip-types）。
 * 本檔不 import 任何相對路徑模組，測試才能直接載入正式站在用的這一份。
 *
 * 規格：專題共用契約 v1 第 4 節 (b)：WebApplication、FAQPage、BreadcrumbList。
 */

export const SITE_URL = 'https://taiwan.md';

export interface FaqItem {
  /** 問題。頁面上顯示的字與 JSON-LD 的字必須是同一個字串。 */
  q: string;
  /** 答案，純文字（不含 HTML）。 */
  a: string;
}

export interface BreadcrumbItem {
  name: string;
  /** 絕對網址，或以 / 開頭的站內路徑。 */
  url: string;
}

export interface WebApplicationInput {
  name: string;
  description: string;
  /** 單獨頁完整網址（canonical）。 */
  url: string;
  /** BCP 47，例 zh-Hant、en。 */
  inLanguage: string;
  keywords?: string[];
  /** YYYY-MM-DD。 */
  dateModified?: string;
  /** schema.org applicationCategory，預設 UtilitiesApplication。 */
  applicationCategory?: string;
  /** 所屬專題主頁，寫進 isPartOf。 */
  partOf?: { name: string; url: string };
}

export interface ItemListEntry {
  name: string;
  url: string;
  description?: string;
}

/** 站內路徑轉絕對網址；已經是絕對網址就原樣回傳。 */
export function absoluteUrl(
  pathOrUrl: string,
  site: string = SITE_URL,
): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  return `${site.replace(/\/$/, '')}${path}`;
}

/** 工具一律免費：offers 價格 0。 */
export function buildWebApplicationLd(input: WebApplicationInput) {
  const ld: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${absoluteUrl(input.url)}#app`,
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.url),
    applicationCategory: input.applicationCategory || 'UtilitiesApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript',
    inLanguage: input.inLanguage,
    isAccessibleForFree: true,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'TWD',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Taiwan.md',
      url: SITE_URL,
    },
  };
  if (input.keywords && input.keywords.length > 0) {
    ld.keywords = input.keywords.join(', ');
  }
  if (input.dateModified) ld.dateModified = input.dateModified;
  if (input.partOf) {
    ld.isPartOf = {
      '@type': 'WebPage',
      name: input.partOf.name,
      url: absoluteUrl(input.partOf.url),
    };
  }
  return ld;
}

/** 沒有任何題目時回傳 null（空的 FAQPage 是無效結構化資料）。 */
export function buildFaqPageLd(faq: readonly FaqItem[]) {
  const items = (faq || []).filter((f) => f && f.q && f.a);
  if (items.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };
}

/** 麵包屑：首頁 → 專題 → 工具。少於兩層回傳 null。 */
export function buildBreadcrumbLd(trail: readonly BreadcrumbItem[]) {
  const items = (trail || []).filter((t) => t && t.name && t.url);
  if (items.length < 2) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: absoluteUrl(t.url),
    })),
  };
}

/** /tools/ 總覽的 ItemList。零個項目回傳 null。 */
export function buildItemListLd(input: {
  name: string;
  url: string;
  items: readonly ItemListEntry[];
}) {
  const items = (input.items || []).filter((it) => it && it.name && it.url);
  if (items.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: input.name,
    url: absoluteUrl(input.url),
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => {
      const entry: Record<string, unknown> = {
        '@type': 'ListItem',
        position: i + 1,
        name: it.name,
        url: absoluteUrl(it.url),
      };
      if (it.description) entry.description = it.description;
      return entry;
    }),
  };
}

/**
 * 把 JSON-LD 物件序列化成可以安全放進 <script type="application/ld+json"> 的字串。
 *
 * JSON.stringify 會處理引號與反斜線，但不處理 HTML 語境：常見問題的答案若含
 * 「</script>」會提前關掉 script 標籤。這裡把 < > & 與 U+2028／U+2029 轉成
 * \uXXXX，JSON 解析後的值不變。
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}
