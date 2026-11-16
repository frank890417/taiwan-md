/**
 * quotes.ts — 主頁第 8 節（各方立場）的引語挑選。
 *
 * 條件（缺一不放）：說話者所屬 group 是 government 或 advocacy；quote.verbatim 為 true；
 * 來源 kind 為 primary 或 reported 且有具名媒體（publisher）與網址。不放政黨、不放任何候選人。
 * 挑哪幾則是人工策展（PICKS，用引語開頭的幾個字比對）；比對不到或不符條件的自動略過，
 * 所以資料更新後不會留下失效的引語。
 */
import { DATA } from './data';

export interface HubQuote {
  actorId: string;
  group: 'government' | 'advocacy';
  actor: { zh: string; en: string };
  speaker: string;
  date: string;
  text: string;
  /** 英文頁用的本站翻譯對照鍵（引語開頭，去掉標點） */
  key: string;
  source: { title: string; publisher: string; url: string; kind: string };
  /** 機關說法經媒體引述（說話者欄寫「報導引述」「媒體報導」「新聞稿」） */
  viaMedia: boolean;
}

const PICKS: { actor: string; prefix: string }[] = [
  { actor: 'mof', prefix: '為避免變成懲罰結婚者' },
  { actor: 'cbc', prefix: '選擇性信用管制到目前為止' },
  { actor: 'mof', prefix: '寬限期最長5年' },
  { actor: 'moi', prefix: '政府推動社會住宅的整體計畫' },
  { actor: 'ours', prefix: '借越多' },
  { actor: 'ours', prefix: '如果現在就停止興建社宅' },
  { actor: 'cmm', prefix: '好好地蓋社會住宅' },
  { actor: 'youth', prefix: '若要對市場起到平衡作用' },
];

/** 引語開頭轉成翻譯對照鍵（與 housing-home.ts 的 quotesEn 鍵一致）。 */
export function quoteKey(prefix: string): string {
  // 加 q- 前綴：鍵裡有連字號就一定帶引號，書寫檢查不會把鍵後的冒號誤判成貼著中文的半形標點
  return 'q-' + prefix.replace(/[，。、：；「」『』\s]/g, '');
}

export function pickHubQuotes(): HubQuote[] {
  const pos: any = DATA.positions;
  const out: HubQuote[] = [];
  for (const p of PICKS) {
    const actor = pos.actors.find((a: any) => a.id === p.actor);
    if (!actor || !['government', 'advocacy'].includes(actor.group)) continue;
    const q = (actor.quotes || []).find(
      (x: any) => x.verbatim === true && x.text.startsWith(p.prefix),
    );
    if (!q || !q.source?.url || !q.source?.publisher) continue;
    if (!['primary', 'reported'].includes(q.source.kind)) continue;
    out.push({
      actorId: actor.id,
      group: actor.group,
      actor: actor.name,
      speaker: q.speaker,
      date: q.date,
      text: q.text,
      key: quoteKey(p.prefix),
      source: q.source,
      viaMedia: /報導引述|媒體報導|新聞稿/.test(q.speaker),
    });
  }
  return out;
}
