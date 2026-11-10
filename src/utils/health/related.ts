/**
 * related.ts — 專題頁連到站內文章：knowledge/ 裡檔案存在才出連結（跟 /budget 同一個做法），
 * 不存在的回傳 pending（投稿審查中、尚未合併），頁面顯示「待上線」而不是死連結。
 * 其他語言用 lang-switch registry 找對應譯文，沒有譯文就退回中文頁。
 */
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { getArticlesIndex } from '../articles-index';
import { getLangSwitchPath } from '../getLangSwitchPath';

export interface RelItem {
  href: string | null;
  title: string;
  desc: string;
  pending: boolean;
}

export async function relatedArticles(
  lang: string,
  items: [string, string][],
): Promise<RelItem[]> {
  const idx = await getArticlesIndex(lang as any);
  const idxZh = lang === 'zh-TW' ? idx : await getArticlesIndex('zh-TW' as any);
  const out: RelItem[] = [];
  for (const [catDir, zhSlug] of items) {
    const exists = existsSync(
      resolve(process.cwd(), 'knowledge', catDir, `${zhSlug}.md`),
    );
    if (!exists) {
      out.push({ href: null, title: zhSlug, desc: '', pending: true });
      continue;
    }
    const cat = catDir.toLowerCase();
    const zhPath = `/${cat}/${zhSlug}`;
    const zhEntry = (idxZh.get(cat) || []).find((a: any) => a.slug === zhSlug);
    let href = zhPath;
    let entry: any = zhEntry;
    try {
      const r = await getLangSwitchPath(zhPath);
      const e = (r.langs as any)[lang];
      if (e?.has && e.link) {
        href = e.link;
        const slug = decodeURIComponent(
          e.link.replace(/\/$/, '').split('/').pop() || '',
        );
        entry =
          (idx.get(cat) || []).find((a: any) => a.slug === slug) || zhEntry;
      }
    } catch {
      /* registry 讀不到就退回 zh */
    }
    const full: string = entry?.title || zhSlug;
    out.push({
      href,
      title: full.split(/[：:—–]/)[0].trim() || full,
      desc: entry?.description || '',
      pending: false,
    });
  }
  return out;
}
