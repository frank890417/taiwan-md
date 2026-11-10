/**
 * topics.ts — 專題共用地基的 UI 字串：/topics/、/tools/ 兩個總覽頁，
 * 以及 ToolFrame／ToolPage／EmbedSnippet／EmbedLayout／TopicNav／TopicCrossLinks。
 *
 * zh-TW 與 en 完整；其他語言照 utils.ts 的 fallback chain（多數 → en）。
 * 這張表刻意不併進 ui.ts 的大表（地基分支只新增檔案），用本檔的
 * useTopicsT(lang) 取字；之後要併進 ui.ts 由協調者處理。
 *
 * 各專題自己的文案放 src/i18n/<topic>.ts，不要加在這裡。
 */
import type { Lang } from '../types';
import { getFallbackChain } from './utils';

const en = {
  // ── /topics/ ──
  'topics.meta.title': 'Taiwan topics: data, charts and calculators by issue',
  'topics.meta.description':
    'In-depth topics on Taiwan.md ({n} so far). Each one gathers the data, charts, tools and source links for a single issue, with a cut-off date on every number.',
  'topics.meta.description.empty':
    'Topic pages on Taiwan.md are being prepared. Each one will gather the data, charts, tools and source links for a single issue.',
  'topics.hero.title': 'Topics',
  'topics.hero.subtitle':
    'One issue per topic: the numbers, how they changed, and tools to work out your own case.',
  'topics.empty.title': 'Topics are on the way',
  'topics.empty.body':
    'No topic has been published yet. This page will list each one as it goes live.',
  'topics.card.tools': 'Tools: {n}',
  'topics.card.subpages': 'Pages: {n}',
  'topics.card.updated': 'Updated {date}',
  'topics.toolsLink': 'See every tool on one page',
  // ── /tools/ ──
  'tools.meta.title':
    'Taiwan calculators and tools {year}: free and source-linked',
  'tools.meta.title.empty': 'Taiwan calculators and tools',
  'tools.meta.description':
    'Free calculators and lookup tools from Taiwan.md topic pages ({n} so far). Each one shows its formula, data sources and cut-off date, and can be embedded.',
  'tools.meta.description.empty':
    'Calculators and lookup tools on Taiwan.md are being prepared. Each one will show its formula, data sources and cut-off date.',
  'tools.hero.title': 'Tools',
  'tools.hero.subtitle':
    'Calculators and lookups from every topic. Each has its own page and can be embedded.',
  'tools.empty.title': 'Tools are on the way',
  'tools.empty.body':
    'No tool has been published yet. This page will list each one as its topic goes live.',
  'tools.group.count': 'Tools: {n}',
  'tools.topicsLink': 'Browse by topic',
  // ── ToolFrame ──
  'tool.openStandalone': 'Open on its own page',
  'tool.embed': 'Embed',
  'tool.sources': 'Sources',
  // ── ToolPage ──
  'tool.breadcrumb.label': 'Breadcrumb',
  'tool.breadcrumb.home': 'Home',
  'tool.section.reading': 'How do I read the result?',
  'tool.section.method': 'How is this calculated?',
  'tool.section.sources': 'Where does the data come from?',
  'tool.section.faq': 'Frequently asked questions',
  'tool.section.related': 'Related pages',
  'tool.section.embed': 'Embed this tool',
  'tool.updated': 'Last updated {date}',
  'tool.backToTopic': 'Back to {topic}',
  // ── EmbedSnippet ──
  'embed.intro':
    'Paste this code into your page. The short script lets the frame follow the height of the tool.',
  'embed.codeLabel': 'Embed code',
  'embed.copy': 'Copy code',
  'embed.copied': 'Copied',
  'embed.copyFailed': 'Copy failed. Select the code and copy it manually.',
  'embed.themeHint':
    'Add ?theme=light or ?theme=dark to the address to fix the colour scheme. Without it the tool follows the visitor’s system setting.',
  // ── EmbedLayout ──
  'embed.footer.source': 'Sources',
  'embed.footer.open': 'Open the full page on Taiwan.md',
  // ── TopicNav / TopicCrossLinks ──
  'topicnav.label': 'In this topic',
  'topicnav.home': 'Overview',
  'crosslinks.heading': 'Other topics',
} as const;

type Key = keyof typeof en;

const zhTW: Record<Key, string> = {
  'topics.meta.title': '台灣專題總覽：議題整理、資料圖表與試算工具',
  'topics.meta.description':
    'Taiwan.md 目前有 {n} 個深度專題。每個專題把一個議題的資料、圖表、試算工具與官方來源整理在一起，每個數字都標出截止日期。',
  'topics.meta.description.empty':
    'Taiwan.md 的深度專題陸續上線。每個專題會把一個議題的資料、圖表、試算工具與官方來源整理在一起，數字標出截止日期。',
  'topics.hero.title': '專題',
  'topics.hero.subtitle':
    '一個專題講一個議題：現在的數字、這些年怎麼變，還有能算出自己情況的工具。',
  'topics.empty.title': '專題陸續上線',
  'topics.empty.body': '目前還沒有已上線的專題。上線後會列在這一頁。',
  'topics.card.tools': '{n} 個工具',
  'topics.card.subpages': '{n} 個子頁',
  'topics.card.updated': '更新於 {date}',
  'topics.toolsLink': '在同一頁看所有工具',
  'tools.meta.title': '台灣試算工具總覽 {year}：免費線上計算與查詢',
  'tools.meta.title.empty': '台灣試算工具總覽',
  'tools.meta.description':
    'Taiwan.md 目前有 {n} 個免費線上工具，分屬 {m} 個專題。每個工具都附計算方式、資料來源與截止日期，可以單獨開啟，也可以嵌入自己的網站。',
  'tools.meta.description.empty':
    'Taiwan.md 的試算與查詢工具陸續上線。每個工具會附計算方式、資料來源與截止日期，可以單獨開啟，也可以嵌入自己的網站。',
  'tools.hero.title': '工具',
  'tools.hero.subtitle':
    '各專題的試算與查詢工具。每個工具有自己的網址，也可以嵌入別的網站。',
  'tools.empty.title': '工具陸續上線',
  'tools.empty.body': '目前還沒有已上線的工具。各專題上線後會列在這一頁。',
  'tools.group.count': '{n} 個工具',
  'tools.topicsLink': '依專題瀏覽',
  'tool.openStandalone': '單獨開啟',
  'tool.embed': '嵌入',
  'tool.sources': '資料來源',
  'tool.breadcrumb.label': '麵包屑導覽',
  'tool.breadcrumb.home': '首頁',
  'tool.section.reading': '結果怎麼讀？',
  'tool.section.method': '這個數字怎麼算出來的？',
  'tool.section.sources': '資料從哪裡來？',
  'tool.section.faq': '常見問題',
  'tool.section.related': '相關頁面',
  'tool.section.embed': '嵌入這個工具',
  'tool.updated': '最後更新 {date}',
  'tool.backToTopic': '回到{topic}',
  'embed.intro':
    '把這段程式碼貼進你的網頁。後面那一小段 script 會讓外框跟著工具的高度調整。',
  'embed.codeLabel': '嵌入程式碼',
  'embed.copy': '複製程式碼',
  'embed.copied': '已複製',
  'embed.copyFailed': '複製失敗，請手動選取程式碼後複製。',
  'embed.themeHint':
    '網址後面加 ?theme=light 或 ?theme=dark 可以固定深淺色。不加就跟著訪客的系統設定。',
  'embed.footer.source': '資料來源',
  'embed.footer.open': '在 Taiwan.md 開啟完整頁面',
  'topicnav.label': '專題內導覽',
  'topicnav.home': '總覽',
  'crosslinks.heading': '其他專題',
};

export const topicsUI: Partial<Record<Lang, Partial<Record<Key, string>>>> = {
  en,
  'zh-TW': zhTW,
};

export type TopicsKey = Key;

/**
 * 取字函式。缺該語言的字時照站上的 fallback chain 往下找（多數語言 → en → zh-TW）。
 * 第二個參數做 {name} 置換：t('topics.card.tools', { n: 3 })。
 */
export function useTopicsT(lang: Lang) {
  const chain = getFallbackChain(lang);
  return function t(
    key: TopicsKey,
    params?: Record<string, string | number>,
  ): string {
    let value: string | undefined;
    for (const code of chain) {
      const hit = topicsUI[code]?.[key];
      if (hit) {
        value = hit;
        break;
      }
    }
    let out = value ?? en[key] ?? String(key);
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        out = out.split(`{${k}}`).join(String(v));
      }
    }
    return out;
  };
}
