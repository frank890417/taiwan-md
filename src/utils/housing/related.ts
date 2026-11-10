/**
 * related.ts — 主頁「延伸閱讀」與各章底下的站內文章卡。
 *
 * 做法照 budget.template：以中文路徑為 key，非 zh-TW 語言用 lang-switch registry 找譯文，
 * 沒有譯文就退回中文版（不產生 404）；標題與描述從該語言的 articles index 取。
 * knowledge/<Category>/<檔名>.md 不存在的條目直接略過，不會輸出壞連結。
 */
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { getArticlesIndex } from '../articles-index';
import { getLangSwitchPath } from '../getLangSwitchPath';

export interface RelCard {
  href: string;
  title: string;
  desc: string;
  /** 該語言沒有譯文，連到中文版 */
  zhFallback: boolean;
}

const idxCache = new Map<
  string,
  Awaited<ReturnType<typeof getArticlesIndex>>
>();
async function idx(lang: string) {
  if (!idxCache.has(lang))
    idxCache.set(lang, await getArticlesIndex(lang as any));
  return idxCache.get(lang)!;
}

export async function relatedCard(
  lang: string,
  catDir: string,
  zhSlug: string,
): Promise<RelCard | null> {
  if (!existsSync(resolve(process.cwd(), 'knowledge', catDir, `${zhSlug}.md`)))
    return null;
  const cat = catDir.toLowerCase();
  const zhPath = `/${cat}/${zhSlug}`;
  const idxZh = await idx('zh-TW');
  const idxL = lang === 'zh-TW' ? idxZh : await idx(lang);
  const zhEntry = (idxZh.get(cat) || []).find((a) => a.slug === zhSlug);
  let href = zhPath;
  let entry = zhEntry;
  let zhFallback = lang !== 'zh-TW';
  try {
    const r = await getLangSwitchPath(zhPath);
    const e = (r.langs as any)[lang];
    if (e?.has && e.link) {
      href = e.link;
      zhFallback = false;
      const slug = decodeURIComponent(
        e.link.replace(/\/$/, '').split('/').pop() || '',
      );
      entry = (idxL.get(cat) || []).find((a) => a.slug === slug) || zhEntry;
    }
  } catch {
    /* registry 讀不到就退回中文頁 */
  }
  const full = entry?.title || zhSlug;
  // 中文頁用「文章名」（檔名）當卡片標題，認得出是哪一篇；其他語言用該語言的標題主句
  return {
    href: href.endsWith('/') ? href : `${href}/`,
    title: lang === 'zh-TW' ? zhSlug : full.split(/[：:—–]/)[0].trim() || full,
    desc: entry?.description || full,
    zhFallback,
  };
}

export async function relatedList(
  lang: string,
  items: [string, string][],
): Promise<RelCard[]> {
  const out = await Promise.all(items.map(([c, s]) => relatedCard(lang, c, s)));
  return out.filter((x): x is RelCard => !!x);
}
