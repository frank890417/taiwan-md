/**
 * home-i18n.ts — 首頁第一期新增字串的讀法：該語言 → 英文 → 中文。
 *
 * 全站的 `useTranslations` 對 ja／ko 缺字串時是直接退回中文（FALLBACK_CHAIN
 * 的歷史設定）。首頁第一期的新字串只先寫了中文與英文，其餘 11 語第二期才補翻，
 * 這段空窗裡日文、韓文讀者拿到英文比拿到中文好讀，所以新區塊走這支，
 * 不去改全站的 fallback 順序。補翻完成後各語言有自己的字串，這支的行為就跟
 * `useTranslations` 一樣了。
 */
import { ui, defaultLang } from '../../i18n/ui';
import { getLanguage } from '../../config/languages';
import type { TranslationKey } from '../../i18n/utils';
import type { Lang } from '../../types';

const dictionaries: Record<string, Partial<Record<string, string>>> = ui;

// 方向隔離字元：LRI（U+2066）開一段由左到右的獨立文字，PDI（U+2069）收尾。
const LRI = '\u2066';
const PDI = '\u2069';

export function useHomeT(lang: Lang) {
  const chain = [lang, 'en', defaultLang];
  const rtl = getLanguage(lang)?.dir === 'rtl';
  return function th(
    key: TranslationKey,
    vars?: Record<string, string | number>,
  ): string {
    let value: string | undefined;
    let from: string = lang;
    for (const code of chain) {
      const v = dictionaries[code]?.[key];
      if (v !== undefined && v !== null && v !== '') {
        value = v;
        from = code;
        break;
      }
    }
    let out = value ?? String(key);
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        out = out.split(`{${k}}`).join(String(v));
      }
    }
    // 阿拉伯文頁面上退回來的英文句子，放在由右到左的段落裡會被重排：句點跑到
    // 行首、數字跟單位對調（"articles 1,206"）。用方向隔離字元把整句包起來，
    // 句子內部照英文的順序排，整段仍然靠右，跟頁面其他地方對齊。這兩個字元看
    // 不見，放在屬性（aria-label）裡也沒問題。該語言補翻之後就不會走到這裡。
    if (rtl && from !== lang) out = `${LRI}${out}${PDI}`;
    return out;
  };
}

/** 數字的在地寫法（千分位）；阿拉伯文維持西方數字，跟站上其他數字一致。 */
export function formatCount(n: number, lang: string): string {
  const locale = lang === 'zh-TW' ? 'zh-TW' : lang === 'ar' ? 'en' : lang;
  try {
    return new Intl.NumberFormat(locale).format(n);
  } catch {
    return String(n);
  }
}
