/**
 * ios-app.ts — Taiwan.md iOS App 在網站上的連結與徽章（單一來源）。
 *
 * 2026-11-07 00:12（台北）1.0 審查通過、自動上架。網站 2026-11-10 起在三處公布：
 * Layout 的 iOS Safari 智慧型應用程式橫幅、Footer 的 App Store 徽章、/about 時間軸。
 *
 * 連結為什麼按語言指定地區：不帶地區的 `apps.apple.com/app/id…` 實測一律 301 到
 * /us/，不會依讀者所在地改導。iPhone 上 App Store App 會用讀者自己帳號的地區開啟，
 * 地區碼只影響桌機看到的網頁版商店頁。13 個地區頁 2026-11-10 逐一 curl 皆 200、無轉址。
 *
 * 徽章：Apple Marketing Tools 官方 SVG 原檔（toolbox.marketingtools.apple.com
 * /api/v2/badges/download-on-the-app-store/black/{locale}），不改色、不變形，
 * 顯示高度 40px（Apple 規範的螢幕最小高度）。Marketing Tools 沒有印地文，hi 用英文版。
 * 用了徽章就要在頁尾放 Apple 的商標聲明（Footer 的 label.appleCredit）。
 */
import type { Lang } from './languages';

export const IOS_APP_ID = '6829697941';

const STOREFRONT: Record<Lang, string> = {
  'zh-TW': 'tw',
  en: 'us',
  ja: 'jp',
  ko: 'kr',
  es: 'es',
  fr: 'fr',
  de: 'de',
  pt: 'br',
  vi: 'vn',
  id: 'id',
  hi: 'in',
  ar: 'sa',
  ru: 'ru',
};

export function appStoreUrl(lang: Lang): string {
  return `https://apps.apple.com/${STOREFRONT[lang] ?? 'us'}/app/taiwan-md/id${IOS_APP_ID}`;
}

/** 徽章檔語系 → 原檔寬度（高度皆 40）。 */
const BADGE: Record<string, number> = {
  'zh-tw': 108.85,
  'en-us': 119.66,
  'ja-jp': 108.85,
  'ko-kr': 129.7,
  'es-es': 119.66,
  'fr-fr': 126.51,
  'de-de': 119.66,
  'pt-br': 119.66,
  'vi-vn': 119.66,
  'id-id': 119.66,
  'ar-ar': 119.66,
  'ru-ru': 119.66,
};

const BADGE_LOCALE: Record<Lang, string> = {
  'zh-TW': 'zh-tw',
  en: 'en-us',
  ja: 'ja-jp',
  ko: 'ko-kr',
  es: 'es-es',
  fr: 'fr-fr',
  de: 'de-de',
  pt: 'pt-br',
  vi: 'vi-vn',
  id: 'id-id',
  hi: 'en-us',
  ar: 'ar-ar',
  ru: 'ru-ru',
};

export function appStoreBadge(lang: Lang): {
  src: string;
  width: number;
  height: number;
} {
  const locale = BADGE_LOCALE[lang] ?? 'en-us';
  return {
    src: `/images/app-store/download-on-the-app-store-${locale}.svg`,
    width: BADGE[locale],
    height: 40,
  };
}

/**
 * 智慧型應用程式橫幅的 content。只有文章頁帶 app-argument：App 的
 * `AppModel.handle(url:)` 認得文章網址就開同一篇，認不得的網址會轉手丟回
 * Safari，首頁或工具頁帶上去，讀者點「打開」會被彈回瀏覽器。
 */
export function smartBannerContent(articleUrl?: string): string {
  if (!articleUrl) return `app-id=${IOS_APP_ID}`;
  // content 以逗號分隔參數，網址裡的逗號先跳脫
  return `app-id=${IOS_APP_ID}, app-argument=${articleUrl.replace(/,/g, '%2C')}`;
}
