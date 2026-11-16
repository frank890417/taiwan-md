/**
 * income.ts — 「薪資、稅與退休」專題（/income/）的文案入口。
 *
 * 文案分檔放在 src/i18n/income/*.ts（主頁各區、四個工具各一份），每份匯出
 * { en, 'zh-TW' } 兩張表，這裡合併後提供 useIncomeT(lang)。
 * zh-TW 與 en 完整。其他語言一律讀 en，跟專題地基 v1.1 的 pickText 與介面字串一致
 * （該語言 → 英文 → 中文；ja、ko 也讀英文）。
 *
 * 刻意不併進 ui.ts（專題共用契約 v1 第 2 節：導覽用 i18n 由協調者整合）。
 */
import type { Lang } from '../types';
import { main } from './income/main';
import { sectionsA } from './income/sections-a';
import { sectionsB } from './income/sections-b';
import { toolTax } from './income/tool-tax';
import { toolPension } from './income/tool-pension';
import { toolPercentile } from './income/tool-percentile';
import { toolTakeHome } from './income/tool-take-home';

type Dict = Record<string, string>;
type Part = { en: Dict; 'zh-TW': Dict };

const parts: Part[] = [
  main,
  sectionsA,
  sectionsB,
  toolTax,
  toolPension,
  toolPercentile,
  toolTakeHome,
];

const en: Dict = Object.assign({}, ...parts.map((p) => p.en));
const zh: Dict = Object.assign({}, ...parts.map((p) => p['zh-TW']));

/** 這個專題的文案語言：中文頁用 zh-TW，其餘全部用 en。 */
export function incomeLocale(lang: Lang): 'zh-TW' | 'en' {
  return lang === 'zh-TW' ? 'zh-TW' : 'en';
}

export function useIncomeT(lang: Lang) {
  const dict = incomeLocale(lang) === 'zh-TW' ? zh : en;
  return function t(
    key: string,
    params?: Record<string, string | number>,
  ): string {
    let out = dict[key] ?? en[key] ?? zh[key] ?? key;
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        out = out.split(`{${k}}`).join(String(v));
      }
    }
    return out;
  };
}

/** 資料檔裡 { zh, en } 雙欄文字的取值。 */
export function pickIncome<T = string>(
  o: { zh?: T; en?: T } | T | null | undefined,
  lang: Lang,
): T | undefined {
  if (o && typeof o === 'object' && ('zh' in o || 'en' in o)) {
    const b = o as { zh?: T; en?: T };
    return incomeLocale(lang) === 'zh-TW' ? (b.zh ?? b.en) : (b.en ?? b.zh);
  }
  return (o ?? undefined) as T | undefined;
}

/** 金額格式：中文「54.6 萬」「1,234 元」，英文「NT$546,000」。 */
export function fmtNT(n: number | null | undefined, lang: Lang): string {
  if (n == null || Number.isNaN(n)) return '—';
  const v = Math.round(n);
  if (incomeLocale(lang) === 'zh-TW') return `${v.toLocaleString('en-US')} 元`;
  return `NT$${v.toLocaleString('en-US')}`;
}

export function fmtWan(n: number | null | undefined, lang: Lang): string {
  if (n == null || Number.isNaN(n)) return '—';
  if (incomeLocale(lang) === 'zh-TW') {
    const w = n / 10000;
    return `${w.toLocaleString('en-US', { maximumFractionDigits: 1 })} 萬元`;
  }
  return `NT$${Math.round(n).toLocaleString('en-US')}`;
}
