/**
 * related.ts — /names 專題連到站內文章的 chip（做法照 /budget 模板的 related()）。
 * zh 檔名當 key；knowledge/ 檔案不存在就不出現；其他語言用 lang-switch registry 找譯文，
 * 沒有譯文就不出連結（送讀者到另一種語言的頁面，跟送到 404 一樣是壞體驗）。
 */
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { getLangSwitchPath } from '../getLangSwitchPath';
import { getArticlesIndex } from '../articles-index';

export type RelCard = { href: string; title: string; desc: string };

export async function makeRelated(lang: string) {
  const idx = await getArticlesIndex(lang as any);
  const idxZh = lang === 'zh-TW' ? idx : await getArticlesIndex('zh-TW' as any);

  async function one(catDir: string, zhSlug: string): Promise<RelCard | null> {
    if (
      !existsSync(resolve(process.cwd(), 'knowledge', catDir, `${zhSlug}.md`))
    )
      return null;
    const cat = catDir.toLowerCase();
    const zhPath = `/${cat}/${zhSlug}`;
    const zhEntry = (idxZh.get(cat) || []).find((a: any) => a.slug === zhSlug);
    let href = zhPath;
    let entry = zhEntry;
    if (lang !== 'zh-TW') {
      try {
        const r = await getLangSwitchPath(zhPath);
        const e = (r.langs as any)[lang];
        if (!e?.has || !e.link) return null;
        href = e.link;
        const slug = decodeURIComponent(
          e.link.replace(/\/$/, '').split('/').pop() || '',
        );
        entry =
          (idx.get(cat) || []).find((a: any) => a.slug === slug) || zhEntry;
      } catch {
        return null;
      }
    }
    const full = (entry as any)?.title || zhSlug;
    return {
      href,
      title: full.split(/[：:—–]/)[0].trim() || full,
      desc: `${full}${(entry as any)?.description ? ' — ' + (entry as any).description : ''}`,
    };
  }
  return async (items: [string, string][]): Promise<RelCard[]> => {
    const out = await Promise.all(items.map(([c, s]) => one(c, s)));
    return out.filter((x): x is RelCard => !!x);
  };
}
