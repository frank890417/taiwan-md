/**
 * 四展廳策展散文的讀取。2026-11-19 首頁第二期。
 *
 * 散文原本行內寫在首頁樣板（中文）與 HomeEnHalls.astro（其他語言共用的英文），
 * 現在一個語言一份資料檔，首頁（只取每廳第一段）與展廳頁（全文）讀同一份。
 *
 * 加一個語言的翻譯：在 prose/ 放 `{語言代碼}.ts`（照 prose/en.ts 的格式，
 * 四個展廳、每廳的段數與 category 跟中文版一致），不用改任何其他檔。
 * 沒有自己那份的語言退回英文，跟改版前首頁的行為一樣。
 */
import type { HallProse } from './types';

export type { HallProse, HallParagraph } from './types';

export type HallId = 1 | 2 | 3 | 4;
export const HALL_IDS: readonly HallId[] = [1, 2, 3, 4];

const modules = import.meta.glob<{ default: HallProse[] }>('./prose/*.ts', {
  eager: true,
});

const byLang: Record<string, HallProse[]> = {};
for (const [path, mod] of Object.entries(modules)) {
  const code = path.replace(/^.*\/([^/]+)\.ts$/, '$1');
  if (Array.isArray(mod.default) && mod.default.length === HALL_IDS.length) {
    byLang[code] = mod.default;
  }
}

/** 這個語言有沒有自己的展廳散文（沒有的話頁面上是英文版）。 */
export function hasOwnHallProse(lang: string): boolean {
  return lang in byLang;
}

/** 散文實際用的語言：自己的，或英文。給 <div lang="…"> 與方向用。 */
export function hallProseLang(lang: string): string {
  return hasOwnHallProse(lang) ? lang : 'en';
}

export function getHallProse(lang: string): HallProse[] {
  return byLang[lang] || byLang.en;
}

/** 把一段拆成「藥丸前、藥丸、藥丸後」。沒有 [[…]] 的段落整段當成藥丸前。 */
export function splitParagraph(text: string): {
  before: string;
  pill: string;
  after: string;
} {
  const m = text.match(/^([\s\S]*?)\[\[([\s\S]*?)\]\]([\s\S]*)$/);
  if (!m) return { before: text, pill: '', after: '' };
  return { before: m[1], pill: m[2], after: m[3] };
}
