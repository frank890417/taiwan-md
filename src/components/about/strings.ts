/**
 * 關於頁新區塊的字串查表（2026-11-19 關於頁進化）。
 *
 * 新增的介面字串先只有 zh-TW 與 en。全站 `t()` 的 fallback 鏈對 ja / ko 是
 * 直接退回中文（src/i18n/utils.ts FALLBACK_CHAIN），而這一批的規格是
 * 「補翻前一律退回英文」。所以新區塊走這支：該語言有就用，沒有先退英文，
 * 最後才退中文。既有字串仍然走 `t()`，行為不變。
 *
 * 補翻完成後（13 語都有鍵），這支與 `t()` 結果相同，可以直接換回 `t()`。
 */
import { aboutUI } from '../../i18n/about';
import type { Lang } from '../../types';

type AboutDict = Record<string, string>;
const dict = aboutUI as unknown as Record<string, AboutDict>;

export type AboutKey = keyof (typeof aboutUI)['zh-TW'];

export function useAboutStrings(lang: Lang) {
  return function s(
    key: AboutKey,
    vars: Record<string, string | number> = {},
  ): string {
    const raw =
      dict[lang]?.[key] ?? dict.en?.[key] ?? dict['zh-TW']?.[key] ?? '';
    return raw.replace(/\{(\w+)\}/g, (m, name) =>
      name in vars ? String(vars[name]) : m,
    );
  };
}

/**
 * 這個語言的新區塊是不是正在顯示英文（還沒補翻）。
 * 右到左的語言（阿拉伯文）要知道這件事：英文句子放在右到左的段落裡，句點會跑到
 * 句首。元件在根元素標 data-fallback-en，樣板的樣式據此把那幾段的文字方向交給
 * 內容自己決定。補翻完成後這個標記自動消失。
 */
export function isEnglishFallback(
  lang: Lang,
  key: AboutKey = 'about.brief.title',
): boolean {
  if (lang === 'en' || lang === 'zh-TW') return false;
  return dict[lang]?.[key] === undefined && dict.en?.[key] !== undefined;
}

/** 數字照語言加千分位（1189 → 1,189）。 */
export function formatNumber(lang: Lang, n: number): string {
  try {
    return new Intl.NumberFormat(lang, { numberingSystem: 'latn' }).format(n);
  } catch {
    return String(n);
  }
}
