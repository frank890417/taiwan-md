/**
 * related.ts — income 專題各區底下的站內相關文章 chip（做法同 budget.template.astro）。
 *
 * 以中文文章（knowledge/<分類>/<檔名>.md）當 key；其他語言用 lang-switch registry 找譯文，
 * 沒譯文就不出連結（送到中文頁對外語讀者跟送到 404 一樣是壞體驗）。
 * knowledge/ 檔不存在就不出現。只在伺服端（build 時）呼叫。
 */
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Lang } from '../../types';
import { getLangSwitchPath } from '../getLangSwitchPath';
import { getArticlesIndex } from '../articles-index';

export type RelCard = { href: string; title: string; desc: string };

async function related(
  lang: Lang,
  catDir: string,
  zhSlug: string,
): Promise<RelCard | null> {
  if (!existsSync(resolve(process.cwd(), 'knowledge', catDir, `${zhSlug}.md`)))
    return null;
  const idx = await getArticlesIndex(lang);
  const cat = catDir.toLowerCase();
  const zhPath = `/${cat}/${zhSlug}`;
  let href: string | null = lang === 'zh-TW' ? zhPath : null;
  let entry =
    lang === 'zh-TW'
      ? (idx.get(cat) || []).find((a) => a.slug === zhSlug)
      : undefined;
  if (lang !== 'zh-TW') {
    try {
      const r = await getLangSwitchPath(zhPath);
      const e = (r.langs as any)[lang];
      if (e?.has && e.link) {
        href = e.link;
        const slug = decodeURIComponent(
          e.link.replace(/\/$/, '').split('/').pop() || '',
        );
        entry = (idx.get(cat) || []).find((a) => a.slug === slug);
      }
    } catch {
      /* registry 讀不到就不出連結 */
    }
  }
  if (!href) return null;
  const full = entry?.title || zhSlug;
  return {
    href,
    // chip 只顯示主標（冒號前），完整標題與 description 放 title 屬性
    title: full.split(/[：:—–]/)[0].trim() || full,
    desc: `${full}${entry?.description ? ' · ' + entry.description : ''}`,
  };
}

/** items：[分類目錄, 中文檔名]，例 ['Society', '誰算低薪']。 */
export async function relatedList(
  lang: Lang,
  items: [string, string][],
): Promise<RelCard[]> {
  const out = await Promise.all(items.map(([c, s]) => related(lang, c, s)));
  return out.filter((x): x is RelCard => !!x);
}
