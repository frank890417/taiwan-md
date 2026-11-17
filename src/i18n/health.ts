/**
 * health.ts — /health（醫療與長照專題）文案。
 *
 * zh-TW 與 en 完整；其他語言沒有對應 key 時退回 en（跟 /budget 同一個做法）。
 * 這份不併進 src/i18n/ui.ts：專題頁用自己的 useHealthT()，避免幾個專題分支同時改 ui.ts。
 * 數字不寫在文案裡：凡是會變的數字都用 {佔位} 由模板從 src/data/health/*.json 帶入。
 */
import { tools } from './health/tools';
import { page } from './health/page';

type Dict = Record<string, string>;
const zh: Dict = { ...tools.zh, ...page.zh };
const en: Dict = { ...tools.en, ...page.en };

export const healthUI: Record<string, Dict> = { 'zh-TW': zh, en };

/** 回傳 t(key, vars)：找不到就退 en，再退 zh-TW，最後回 key 本身。{name} 佔位由 vars 代入。 */
export function useHealthT(lang: string) {
  const d = healthUI[lang] || en;
  return (key: string, vars?: Record<string, string | number>) => {
    let s = d[key] ?? en[key] ?? zh[key] ?? key;
    if (vars)
      for (const [k, v] of Object.entries(vars))
        s = s.split(`{${k}}`).join(String(v));
    return s;
  };
}

/** 專題頁路徑：zh-TW 沒有語言前綴，其他語言加 /<lang>。 */
export function healthPath(lang: string, sub = ''): string {
  const base = lang === 'zh-TW' ? '' : `/${lang}`;
  return `${base}/health/${sub ? sub.replace(/^\/|\/$/g, '') + '/' : ''}`;
}
