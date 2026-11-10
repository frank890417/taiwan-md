/**
 * sub-data.ts：/housing/history/、/housing/qingan/、/housing/positions/ 三個子頁讀資料檔的小工具。
 * 只在伺服端 build 時用。規則同 data.ts：頁面上的事實一律從 src/data/housing/*.json 讀出。
 */
import { DATA, fmtPeriod, getSeries, getTable, grp, qinganSrc } from './data';
import type { SourceRef } from './data';
import { relatedList } from './related';
import type { RelCard } from './related';
import { EN_DATA } from '../../i18n/housing-sub';
import { getTopic } from '../topics/registry';
import elections from '../../data/elections-2026.json';

export const isZh = (lang: string): boolean => lang === 'zh-TW';
/** {zh, en} 物件依語系取字。 */
export const loc = (
  o: { zh?: string; en?: string } | undefined,
  lang: string,
) => (isZh(lang) ? o?.zh : o?.en) ?? o?.en ?? o?.zh ?? '';

// ── 發展歷程 ────────────────────────────────────────────────────────

export const KIND_ORDER = [
  'law',
  'policy',
  'market',
  'movement',
  'credit',
  'tax',
  'event',
] as const;

export const evKey = (e: { date: string; title: { zh: string } }): string =>
  `${e.date}|${e.title.zh}`;

export function historyFacts() {
  const tl: any = DATA.timeline;
  const events: any[] = [...tl.events].sort((a, b) =>
    a.date.localeCompare(b.date),
  );
  const eras: any[] = tl.eras;
  const cycles: any[] = tl.cycles;
  const years = events.map((e) => parseInt(e.date.slice(0, 4), 10));
  const last = events[events.length - 1];
  const countOf = (eraId: string) => {
    const list = events.filter((e) => e.era === eraId);
    return {
      n: list.length,
      p: list.filter((e) =>
        (e.sources ?? []).some((s: any) => s.kind === 'primary'),
      ).length,
    };
  };
  const kinds = KIND_ORDER.filter((k) => events.some((e) => e.kind === k));
  return {
    events,
    eras,
    cycles,
    n: events.length,
    from: Math.min(...years),
    to: Math.max(...years),
    last,
    kinds,
    cycleWithRise: cycles.filter((c) => c.rise?.value !== null).length,
    eraCounts: Object.fromEntries(eras.map((e) => [e.id, countOf(e.id)])),
    retrieved: tl.retrieved as string,
  };
}

/** '/history/台灣土地改革/' → ['History', '台灣土地改革']；對不到的回 null。 */
export function articleParts(path: string): [string, string] | null {
  const m = path.match(/^\/([a-z]+)\/([^/]+)\/?$/);
  if (!m) return null;
  const cat = m[1][0].toUpperCase() + m[1].slice(1);
  return [cat, decodeURIComponent(m[2])];
}

/** 每個事件的相關文章卡（knowledge/ 檔案不存在的略過）。 */
export async function eventArticleCards(
  lang: string,
): Promise<Record<string, RelCard[]>> {
  const out: Record<string, RelCard[]> = {};
  for (const e of historyFacts().events) {
    const items = (e.articles ?? [])
      .map(articleParts)
      .filter((x: any): x is [string, string] => !!x);
    if (items.length) out[evKey(e)] = await relatedList(lang, items);
  }
  return out;
}

/** 頁尾「相關文章」：事件用到的文章，加上專題登記檔的前幾篇。 */
export async function historyRelated(lang: string): Promise<RelCard[]> {
  const seen = new Set<string>();
  const items: [string, string][] = [];
  const push = (p: string) => {
    const a = articleParts(p);
    if (!a) return;
    const k = a.join('/');
    if (seen.has(k)) return;
    seen.add(k);
    items.push(a);
  };
  for (const e of historyFacts().events) (e.articles ?? []).forEach(push);
  (getTopic('housing')?.relatedArticles ?? []).slice(0, 9).forEach(push);
  return relatedList(lang, items);
}

/** 管制時間線與利率圖用的事實（做法同主頁第 6 節，這裡獨立取一份）。 */
export function controlsFacts() {
  const ctl = getTable('credit-controls', 'selective-credit-controls-timeline');
  const rules2 = ctl.rows.filter(
    (r: any) => r.round === 2 && r.kind === 'rule' && r.effectiveDate,
  );
  const isWave = (r: any) => /^第 [1-7] 度$/.test(r.wave ?? '');
  const waves = rules2.filter(isWave);
  const eases = rules2.filter((r: any) => !isWave(r));
  const rate = getSeries('rates', 'five-bank-mortgage-rate');
  const redis = getSeries('rates', 'cbc-rediscount-rate');
  return { ctl, waves, eases, rate, redis, rows: ctl.rows as any[] };
}

export const cathaySeries = () =>
  getSeries('price-index', 'cathay-index-national');

// ── 青安 ────────────────────────────────────────────────────────────

/** 網址主機名 → 機關名（資料檔的 sourceUrl 沒有機關欄位）。 */
export function hostAgency(url: string, lang: string): string {
  let host = '';
  try {
    host = new URL(url).hostname;
  } catch {
    return url;
  }
  const zhMap: Record<string, string> = {
    'www.ey.gov.tw': '行政院',
    'www.mof.gov.tw': '財政部',
  };
  if (isZh(lang)) return zhMap[host] ?? host;
  return EN_DATA.hosts[host] ?? host;
}

export interface TlSource {
  agency: string;
  title: string;
  url: string;
  kind: string;
  /** 沒有機關欄位，機關名由網址主機名對照而來 */
  fromHost: boolean;
}

/** qingan.json timeline 一筆的來源：`source`（指到 sources 表）與 `sourceUrl`（直接給網址）兩種寫法。 */
export function qinganTlSource(entry: any, lang: string): TlSource | null {
  const q: any = DATA.qingan;
  if (entry.source) {
    const s = q.sources[entry.source];
    if (!s) return null;
    return {
      agency: s.agency,
      title: s.title,
      url: s.url,
      kind: s.kind ?? 'primary',
      fromHost: false,
    };
  }
  if (entry.sourceUrl) {
    return {
      agency: hostAgency(entry.sourceUrl, lang),
      title: '',
      url: entry.sourceUrl,
      kind: entry.kind ?? 'primary',
      fromHost: true,
    };
  }
  return null;
}

/** 青安時間線一筆的內文：中文用資料檔原文，英文用 EN_DATA 對照（以日期為鍵）。 */
export function qinganTlText(entry: any, lang: string): string {
  if (isZh(lang)) return entry.event;
  return EN_DATA.timeline[entry.date] ?? entry.event;
}

/** 從「已核貸待撥款 12,923 件、1,257 億餘元」取出件數與金額；取不到回 null，呼叫端改顯示全文。 */
export function parsePending(
  text: string,
): { cases: number; yi: number } | null {
  const m = text.match(/待撥款\s*([\d,]+)\s*件[、，]\s*([\d,]+)\s*億/);
  if (!m) return null;
  return { cases: +m[1].replace(/,/g, ''), yi: +m[2].replace(/,/g, '') };
}

export const qinganEntry = (date: string): any | undefined =>
  ((DATA.qingan as any).timeline as any[]).find((t) => t.date === date);

/** 信用管制表中某日的列。 */
export const ctlRow = (date: string): any | undefined =>
  getTable('credit-controls', 'selective-credit-controls-timeline').rows.find(
    (r: any) => r.date === date,
  );

/** 規模：逾放比來源用 scale.nplPct.source 指到的那一筆。 */
export function nplSource(): SourceRef {
  const sc: any = (DATA.qingan as any).scale;
  return qinganSrc(sc.nplPct.source, sc.nplPct.asOf);
}

// ── 各方立場 ────────────────────────────────────────────────────────

const CANDIDATE_RE = /候選人|參選人/;
/** 2026 地方選舉候選人姓名（取自 elections-2026.json 的 name 欄位），positions 內容若出現一律不顯示。 */
const CANDIDATE_NAMES: string[] = [
  ...new Set(
    Array.from(
      JSON.stringify(elections).matchAll(
        /"(?:name|candidate|nameZh)":\s*"([^"]{2,4})"/g,
      ),
    ).map((m) => m[1]),
  ),
];
export const mentionsCandidate = (o: unknown): boolean => {
  const s = JSON.stringify(o);
  return CANDIDATE_RE.test(s) || CANDIDATE_NAMES.some((n) => s.includes(n));
};

export interface HiddenItem {
  where: string;
  preview: string;
}

/**
 * 立場頁用的資料：內容含「候選人」「參選人」字樣的 stance、quote、cell、survey 整筆略過，
 * 代表人物欄含這兩個詞的只略過代表人物欄。略過的清單附在回傳值，build 時印到終端機。
 * coverageNote 是資料檔對整頁範圍的說明（寫明不含候選人），不在過濾範圍內。
 */
export function cleanPositions() {
  const pos: any = DATA.positions;
  const hidden: HiddenItem[] = [];
  const keep = <T>(arr: T[], where: string, text: (x: T) => string): T[] =>
    arr.filter((x) => {
      if (!mentionsCandidate(x)) return true;
      hidden.push({ where, preview: text(x).slice(0, 40) });
      return false;
    });
  const actors = pos.actors.map((a: any) => {
    const personBad = mentionsCandidate(a.person);
    if (personBad)
      hidden.push({
        where: `${a.id}.person`,
        preview: String(a.person?.zh ?? '').slice(0, 40),
      });
    return {
      ...a,
      person: personBad ? { zh: '', en: '' } : a.person,
      stance: keep(a.stance ?? [], `${a.id}.stance`, (x: any) => x.zh),
      quotes: keep(a.quotes ?? [], `${a.id}.quote`, (x: any) => x.text),
    };
  });
  const issues = pos.issues.map((i: any) => ({
    ...i,
    cells: keep(i.cells ?? [], `${i.id}.cell`, (x: any) => x.text?.zh ?? ''),
  }));
  const surveys = keep(
    pos.surveys ?? [],
    'survey',
    (x: any) => x.finding?.zh ?? '',
  );
  if (
    hidden.length &&
    typeof process !== 'undefined' &&
    !(globalThis as any).__hsPosWarned
  ) {
    (globalThis as any).__hsPosWarned = true;
    console.warn(
      `[housing-positions] ${hidden.length} item(s) hidden (mention 候選人/參選人 or a 2026 candidate name):\n` +
        hidden.map((h) => `  - ${h.where}: ${h.preview}`).join('\n'),
    );
  }
  return {
    coverageNote: pos.coverageNote as { zh: string; en: string },
    groups: pos.groups as { id: string; title: { zh: string; en: string } }[],
    actors,
    issues,
    surveys,
    hidden,
  };
}

export const fmtDate = (d: string, lang: string): string => fmtPeriod(d, lang);
export { grp };
