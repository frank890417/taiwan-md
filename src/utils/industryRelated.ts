/**
 * industryRelated.ts — 專題頁的站內文章連結（存在才連、跨語走 lang-switch registry）。
 *
 * 邏輯取自 budget.template.astro 內的 related()，搬成可重用函式給 /industry 與
 * /industry/supply-chains 共用。規則：
 *  - knowledge/{Category}/{zhSlug}.md 不存在 → 不出連結（回 null）。
 *  - 非中文語言：有譯文才連，沒有譯文回 null。把英文讀者送到中文頁跟送到 404 一樣是壞體驗
 *    （§神經迴路「多語言 nav 的隱性路由 scope」instance 2）。這點跟 /budget 不同，
 *    /budget 會退回中文頁。
 *  - 快取放 module scope（.astro frontmatter 是 per-render scope）。
 */
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { getArticlesIndex } from './articles-index';
import { getLangSwitchPath } from './getLangSwitchPath';

export interface RelCard {
  href: string;
  /** 主標（冒號前），chip 上顯示 */
  title: string;
  /** 完整標題＋description，放 title 屬性 */
  desc: string;
  zhSlug: string;
  cat: string;
}

const _exists = new Map<string, boolean>();
const _cards = new Map<string, RelCard | null>();

function fileExists(catDir: string, zhSlug: string): boolean {
  const k = `${catDir}/${zhSlug}`;
  if (!_exists.has(k)) {
    _exists.set(
      k,
      existsSync(resolve(process.cwd(), 'knowledge', catDir, `${zhSlug}.md`)),
    );
  }
  return _exists.get(k)!;
}

export async function related(
  lang: string,
  catDir: string,
  zhSlug: string,
): Promise<RelCard | null> {
  const key = `${lang}|${catDir}|${zhSlug}`;
  if (_cards.has(key)) return _cards.get(key)!;
  let out: RelCard | null = null;
  if (fileExists(catDir, zhSlug)) {
    const cat = catDir.toLowerCase();
    const zhPath = `/${cat}/${zhSlug}`;
    const idx = await getArticlesIndex(lang as any);
    if (lang === 'zh-TW') {
      const e = (idx.get(cat) || []).find((a: any) => a.slug === zhSlug);
      out = card(zhPath, e?.title || zhSlug, e?.description, zhSlug, cat);
    } else {
      try {
        const r = await getLangSwitchPath(zhPath);
        const e = (r.langs as any)[lang];
        if (e?.has && e.link) {
          const slug = decodeURIComponent(
            e.link.replace(/\/$/, '').split('/').pop() || '',
          );
          const entry = (idx.get(cat) || []).find((a: any) => a.slug === slug);
          if (entry) {
            out = card(e.link, entry.title, entry.description, zhSlug, cat);
          }
        }
      } catch {
        /* registry 讀不到：不出連結 */
      }
    }
  }
  _cards.set(key, out);
  return out;
}

function card(
  href: string,
  full: string,
  description: string | undefined,
  zhSlug: string,
  cat: string,
): RelCard {
  // 「台灣企業：台積電」這類標題主詞在冒號後；其餘取冒號前的主標
  const parts = full.split(/[：:]/);
  const head = /^(台灣企業|Taiwan Companies?)$/i.test(parts[0].trim())
    ? (parts[1] ?? parts[0])
    : parts[0];
  const title = head.split(/[—–]/)[0].trim() || full;
  return {
    href,
    title,
    desc: `${full}${description ? ' — ' + description : ''}`,
    zhSlug,
    cat,
  };
}

export async function relatedList(
  lang: string,
  items: [string, string][],
): Promise<RelCard[]> {
  const out = await Promise.all(items.map(([c, s]) => related(lang, c, s)));
  return out.filter((x): x is RelCard => !!x);
}
