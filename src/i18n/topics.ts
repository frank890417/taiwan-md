/**
 * topics.ts — 專題共用地基的 UI 字串：/topics/、/tools/ 兩個總覽頁，
 * 以及 ToolFrame／ToolPage／EmbedSnippet／EmbedLayout／TopicNav／TopicCrossLinks。
 *
 * zh-TW、en、ja 完整。其他語言缺字時一律退到 en，再退到 zh-TW（v1.1 起；
 * 不再跟 utils.ts 的 FALLBACK_CHAIN，所以 ko 也是先讀英文）。
 * 本檔只有型別 import，node 測試可以直接載入。
 * 這張表刻意不併進 ui.ts 的大表（地基分支只新增檔案），用本檔的
 * useTopicsT(lang) 取字；之後要併進 ui.ts 由協調者處理。
 *
 * 各專題自己的文案放 src/i18n/<topic>.ts，不要加在這裡。
 */
import type { Lang } from '../types';

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
  // 站上既有、不屬於任何專題的工具（/tools/ 的 site 群組，2026-11-10）
  'tools.site.title': 'Across the site',
  'tools.site.converter.title': 'Taiwan Mandarin term converter',
  'tools.site.converter.desc':
    'Paste Chinese text and convert mainland China wording to the terms used in Taiwan.',
  'tools.site.data.title': 'Data Taiwan',
  'tools.site.data.desc':
    'Taiwan from 1950 to today in numbers, each one linked to its official source and download.',
  'tools.site.map.title': 'Interactive map',
  'tools.site.map.desc':
    'Click a county or a place on the map to read the articles about it.',
  'tools.site.timeline.title': 'Timeline of Taiwan',
  'tools.site.timeline.desc':
    'Scroll through every era of Taiwan’s history, each linked to in-depth articles.',
  'tools.site.elections.title': '2026 local elections',
  'tools.site.elections.desc':
    'Candidates, schedule and political donations for the 28 November 2026 local elections.',
  'tools.site.budget.title': 'Budget Decade',
  'tools.site.budget.desc':
    'Ten years of the central government budget: how it is split, what grew, what was cut and what was spent.',
  // ── ToolFrame ──
  'tool.openStandalone': 'Open on its own page',
  'tool.embed': 'Embed',
  'tool.sources': 'Sources',
  // ── ToolPage ──
  'tool.breadcrumb.label': 'Breadcrumb',
  'tool.breadcrumb.home': 'Home',
  'tool.section.reading': 'How do I read the result?',
  'tool.section.method': 'How this result is produced',
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
  // 站上既有、不屬於任何專題的工具（/tools/ 的 site 群組，2026-11-10）
  'tools.site.title': '站上其他工具',
  'tools.site.converter.title': '台灣用語轉換器',
  'tools.site.converter.desc': '貼上一段文字，把中國用語換成台灣的說法。',
  'tools.site.data.title': '資料台灣',
  'tools.site.data.desc':
    '從 1950 年到今天，用數字讀台灣，每個數字都附官方出處與下載。',
  'tools.site.map.title': '互動地圖',
  'tools.site.map.desc': '在地圖上點一個縣市或地點，讀跟那裡有關的文章。',
  'tools.site.timeline.title': '台灣時間軸',
  'tools.site.timeline.desc':
    '從史前到今天，一路捲過台灣的每個時代，每一段都連到深度文章。',
  'tools.site.elections.title': '2026 選舉專區',
  'tools.site.elections.desc':
    '2026 年 11 月 28 日九合一選舉的候選人、時程與政治獻金。',
  'tools.site.budget.title': '總預算十年',
  'tools.site.budget.desc':
    '中央政府總預算十年：錢怎麼分、哪裡在長、砍在哪、有沒有花掉。',
  'tool.openStandalone': '單獨開啟',
  'tool.embed': '嵌入',
  'tool.sources': '資料來源',
  'tool.breadcrumb.label': '麵包屑導覽',
  'tool.breadcrumb.home': '首頁',
  'tool.section.reading': '結果怎麼讀？',
  'tool.section.method': '怎麼得出這個結果？',
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

const ja: Record<Key, string> = {
  'topics.meta.title': '台湾トピック一覧：課題別のデータ・グラフ・計算ツール',
  'topics.meta.description':
    'Taiwan.md の特集トピックは現在 {n} 件。ひとつの課題についてデータ、グラフ、計算ツール、公的な出典をまとめ、すべての数値に基準日を記しています。',
  'topics.meta.description.empty':
    'Taiwan.md の特集トピックは順次公開予定です。ひとつの課題についてデータ、グラフ、計算ツール、公的な出典をまとめ、数値には基準日を記します。',
  'topics.hero.title': 'トピック',
  'topics.hero.subtitle':
    'ひとつのトピックでひとつの課題を扱います。いまの数値、これまでの推移、そして自分のケースを計算できるツール。',
  'topics.empty.title': 'トピックは順次公開します',
  'topics.empty.body':
    '公開済みのトピックはまだありません。公開され次第、このページに掲載します。',
  'topics.card.tools': 'ツール {n} 件',
  'topics.card.subpages': 'ページ {n} 件',
  'topics.card.updated': '{date} 更新',
  'topics.toolsLink': 'すべてのツールを一覧で見る',
  'tools.meta.title':
    '台湾の計算ツール一覧 {year}：無料で使えるオンライン計算・検索',
  'tools.meta.title.empty': '台湾の計算ツール一覧',
  'tools.meta.description':
    'Taiwan.md の無料オンラインツールは現在 {n} 件（{m} トピック）。それぞれ計算方法、出典、基準日を明記し、単独ページで開くことも、自分のサイトに埋め込むこともできます。',
  'tools.meta.description.empty':
    'Taiwan.md の計算・検索ツールは順次公開予定です。それぞれ計算方法、出典、基準日を明記し、単独ページで開くことも、自分のサイトに埋め込むこともできます。',
  'tools.hero.title': 'ツール',
  'tools.hero.subtitle':
    '各トピックの計算・検索ツール。それぞれ専用の URL があり、ほかのサイトにも埋め込めます。',
  'tools.empty.title': 'ツールは順次公開します',
  'tools.empty.body':
    '公開済みのツールはまだありません。各トピックの公開に合わせて、このページに掲載します。',
  'tools.group.count': 'ツール {n} 件',
  'tools.topicsLink': 'トピック別に見る',
  // 站上既有、不屬於任何專題的工具（/tools/ 的 site 群組，2026-11-10）
  'tools.site.title': 'サイト内のその他のツール',
  'tools.site.converter.title': '台湾用語コンバーター',
  'tools.site.converter.desc':
    '文章を貼り付けると、中国の用語を台湾の言い方に置き換えます。',
  'tools.site.data.title': 'データで見る台湾',
  'tools.site.data.desc':
    '1950 年から現在までの台湾を数字で読む。すべての数字に公式の出典とダウンロード先を付けています。',
  'tools.site.map.title': 'インタラクティブマップ',
  'tools.site.map.desc':
    '地図上の県・市や場所をクリックすると、その土地に関する記事が読めます。',
  'tools.site.timeline.title': '台湾の歩み',
  'tools.site.timeline.desc':
    '先史から現在まで、台湾の各時代をスクロールでたどり、それぞれの記事へ進めます。',
  'tools.site.elections.title': '2026 統一地方選',
  'tools.site.elections.desc':
    '2026 年 11 月 28 日の統一地方選挙の候補者、日程、政治献金。',
  'tools.site.budget.title': '予算の10年',
  'tools.site.budget.desc':
    '中央政府総予算の 10 年：配分、増えた分野、削減、執行状況。',
  'tool.openStandalone': '単独ページで開く',
  'tool.embed': '埋め込む',
  'tool.sources': '出典',
  'tool.breadcrumb.label': 'パンくずリスト',
  'tool.breadcrumb.home': 'ホーム',
  'tool.section.reading': '結果の見方',
  'tool.section.method': 'この結果が出るしくみ',
  'tool.section.sources': 'データの出典',
  'tool.section.faq': 'よくある質問',
  'tool.section.related': '関連ページ',
  'tool.section.embed': 'このツールを埋め込む',
  'tool.updated': '最終更新 {date}',
  'tool.backToTopic': '「{topic}」に戻る',
  'embed.intro':
    'このコードをページに貼り付けてください。末尾の短いスクリプトが、枠の高さをツールに合わせて調整します。',
  'embed.codeLabel': '埋め込みコード',
  'embed.copy': 'コードをコピー',
  'embed.copied': 'コピーしました',
  'embed.copyFailed':
    'コピーできませんでした。コードを選択して手動でコピーしてください。',
  'embed.themeHint':
    'URL の末尾に ?theme=light または ?theme=dark を付けると配色を固定できます。付けない場合は閲覧者のシステム設定に従います。',
  'embed.footer.source': '出典',
  'embed.footer.open': 'Taiwan.md で元のページを開く',
  'topicnav.label': 'トピック内ナビゲーション',
  'topicnav.home': '概要',
  'crosslinks.heading': 'ほかのトピック',
};

export const topicsUI: Partial<Record<Lang, Partial<Record<Key, string>>>> = {
  en,
  'zh-TW': zhTW,
  ja,
};

export type TopicsKey = Key;

/**
 * 地基介面字串的 fallback 順序（v1.1）：該語言自己的 → en → zh-TW。
 * zh-TW 與 en 各自完整，不往別處找。
 */
export function topicsFallbackChain(lang: string): string[] {
  if (lang === 'zh-TW' || lang === 'en') return [lang];
  return [lang, 'en', 'zh-TW'];
}

/**
 * 這個語言的地基介面字串實際用哪個語言顯示：有自己的表（zh-TW、en、ja）回自己，
 * 其餘回 'en'。總覽頁用它決定 noindex，uiDir() 用它決定要不要標 dir="ltr"。
 */
export function topicsUiLang(lang: string): string {
  return (topicsUI as Record<string, unknown>)[lang] ? lang : 'en';
}

/**
 * 取字函式。缺該語言的字時退到 en，再退到 zh-TW（見 topicsFallbackChain）。
 * 第二個參數做 {name} 置換：t('topics.card.tools', { n: 3 })。
 */
export function useTopicsT(lang: Lang | string) {
  const chain = topicsFallbackChain(lang);
  const tables = topicsUI as Record<
    string,
    Partial<Record<Key, string>> | undefined
  >;
  return function t(
    key: TopicsKey,
    params?: Record<string, string | number>,
  ): string {
    let value: string | undefined;
    for (const code of chain) {
      const hit = tables[code]?.[key];
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
