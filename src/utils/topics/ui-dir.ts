/**
 * ui-dir.ts — 右到左語言頁裡的 fallback 文字方向（專題共用地基 v1.1）。
 *
 * 阿拉伯文等 RTL 頁面上，地基的介面字串還沒有該語言的翻譯時會顯示英文。
 * 英文放在 dir="rtl" 的容器裡，句尾標點會跑到左邊。這兩個 helper 回傳要展開
 * 到容器上的屬性，讓那一小塊改回左到右並標成英文：
 *
 *   const ui = uiDir(lang);
 *   <p dir={ui.dir} lang={ui.lang}>{t('tool.updated', { date })}</p>
 *   const td = textDir(tool.title, lang);
 *   <a dir={td.dir} lang={td.lang}>{pickText(tool.title, lang)}</a>
 *
 * 屬性一個一個寫、不要用 {...uiDir(lang)} 展開：Astro 對帶展開屬性的元素
 * 會另外補一個 class，跟原本的 class 變成兩個 class 屬性。
 *
 * 頁面語言是 LTR、或文字真的有該語言的版本時，回傳空物件（dir、lang 都是 undefined，Astro 不輸出）。
 * 哪些語言是 RTL 讀 src/config/languages.ts 的 dir 欄位。
 */
import { getLanguage } from '../../config/languages';
import { topicsUiLang } from '../../i18n/topics';
import { hasOwnText, type LocalizedText } from './registry-core';

export type DirAttrs = { dir?: 'ltr'; lang?: 'en' };

const LTR_EN: DirAttrs = { dir: 'ltr', lang: 'en' };

function isRtl(lang: string): boolean {
  return getLanguage(lang)?.dir === 'rtl';
}

/** 地基介面字串（useTopicsT）的容器用。 */
export function uiDir(lang: string): DirAttrs {
  return isRtl(lang) && topicsUiLang(lang) !== lang ? LTR_EN : {};
}

/** 登記檔文字（pickText）的容器用：該語言沒有自己的字、退到英文時才加。 */
export function textDir(
  text: LocalizedText | string | undefined | null,
  lang: string,
): DirAttrs {
  return isRtl(lang) && !hasOwnText(text, lang) ? LTR_EN : {};
}
