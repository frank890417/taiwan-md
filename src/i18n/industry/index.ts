/**
 * industry/index.ts — 「台灣產業與上市公司」專題（/industry、/industry/supply-chains、/companies 升級）
 * 的 UI 字串查表。
 *
 * 這組鍵刻意不展開進 src/i18n/ui.ts：2026-11 同時有四個專題分支，各自往 ui.ts 的同一段加鍵，
 * 合併時必撞。所以 template 直接呼叫這裡的 useIndustryT()。
 *
 * zh-TW（./zh.ts）與 en（./en.ts）完整；其他語言放 data/industry/i18n/{lang}.json，
 * 檔案出現就自動載入，缺的鍵依序回退 en → zh-TW。對賬：scripts/tools/check-industry-i18n.mjs。
 * 數字、來源網址、幾何不住這裡（graph.md §五 三層分離），住 src/data/industry/*.json。
 */
import { zh } from './zh';
import { en } from './en';
import { flattenContent } from './flatten';

// (string & {})：內容檔攤平出來的鍵（tl.<id>.t、db.<id>.q …）是動態的，不在 zh.ts 的型別裡
export type IndustryKey = keyof typeof zh | (string & {});

// 內容檔（時間軸、立場、供應鏈、聚落）：每段文字是 {zh, en} 物件，攤平成跟 UI 字串同一張表，
// 其他語言的譯文就能跟 UI 字串放在同一個 data/industry/i18n/{lang}.json。
const content = import.meta.glob<unknown>(
  '../../data/industry/content/*.json',
  { eager: true, import: 'default' },
);
const contentZh: Record<string, string> = {};
const contentEn: Record<string, string> = {};
for (const [path, mod] of Object.entries(content)) {
  const prefix = path.split('/').pop()!.replace('.json', '');
  flattenContent(mod, prefix, contentZh, contentEn);
}

const extra = import.meta.glob<Record<string, string>>(
  '../../../data/industry/i18n/*.json',
  { eager: true, import: 'default' },
);
const dict: Record<string, Record<string, string>> = {
  'zh-TW': { ...zh, ...contentZh },
  en: { ...en, ...contentEn },
};
for (const [path, mod] of Object.entries(extra)) {
  const code = path.split('/').pop()!.replace('.json', '');
  if (!code.startsWith('_')) dict[code] = mod;
}

/** 該語言是否有自己的譯文檔（沒有的話整頁會是英文，頁面用這個決定要不要顯示提示）。 */
export function hasIndustryLocale(lang: string): boolean {
  return !!dict[lang];
}

/** en 全表（UI ＋ 內容），給翻譯對賬腳本與 /data/taiwan-industry.json 用。 */
export function industryDict(lang: 'zh-TW' | 'en'): Record<string, string> {
  return dict[lang];
}

export function useIndustryT(lang: string) {
  const chain = lang === 'zh-TW' ? ['zh-TW'] : [lang, 'en', 'zh-TW'];
  return function ti(
    key: IndustryKey,
    vars?: Record<string, string | number>,
  ): string {
    let s: string | undefined;
    for (const code of chain) {
      const v = dict[code]?.[key as string];
      if (v !== undefined && v !== '') {
        s = v;
        break;
      }
    }
    if (s === undefined) s = String(key);
    if (vars) {
      s = s.replace(/\{(\w+)\}/g, (m, k: string) =>
        k in vars ? String(vars[k]) : m,
      );
    }
    return s;
  };
}
