/**
 * labels.ts — 伺服端把某個工具要用的文案整理成字典（鍵去掉 housing.tool. 前綴），
 * 交給 tool-models 與瀏覽器端使用。只在 .astro frontmatter 內 import。
 */
import { housingUI } from '../../../i18n/housing';
import { useTranslations } from '../../../i18n/utils';
import type { TranslationKey } from '../../../i18n/utils';
import type { Lang } from '../../../types';

const PREFIX = 'housing.tool.';

export function labelsFor(
  lang: Lang,
  groups: string[],
): Record<string, string> {
  const t = useTranslations(lang);
  const out: Record<string, string> = {};
  for (const key of Object.keys(housingUI.en)) {
    const rest = key.slice(PREFIX.length);
    if (groups.some((g) => rest.startsWith(g))) {
      out[rest] = t(key as TranslationKey);
    }
  }
  return out;
}
