/**
 * dataHub.ts — /data（資料台灣 v2，資料中樞）介面字串。
 *
 * zh-TW 與 en 在這裡；其他語言落在 data/data-hub/i18n/{lang}.json（對賬：
 * scripts/tools/check-i18n-bundle.py dataHub）。數字一個都不寫進字串：值、期間、
 * 出處住 src/data/data-hub/*.json，字串只放介面與編輯文字，{n} 之類的佔位由模板填。
 *
 * 書寫紀律：MANIFESTO §11（對位句型節制、破折號節制、零晶晶體）；
 * kicker 是詩句層，H2 是斷言層（graph.md §三.1），兩者不互相取代。
 */
import ja from '../../data/data-hub/i18n/ja.json';
import ko from '../../data/data-hub/i18n/ko.json';
import es from '../../data/data-hub/i18n/es.json';
import fr from '../../data/data-hub/i18n/fr.json';
import pt from '../../data/data-hub/i18n/pt.json';
import hi from '../../data/data-hub/i18n/hi.json';
import ar from '../../data/data-hub/i18n/ar.json';
import ru from '../../data/data-hub/i18n/ru.json';
import vi from '../../data/data-hub/i18n/vi.json';
import id from '../../data/data-hub/i18n/id.json';
import de from '../../data/data-hub/i18n/de.json';

export const dataHubUI = {
  en: {
    'dh.meta.title':
      'Data Taiwan: read Taiwan through its numbers, every one traceable to its source',
    'dh.meta.description':
      'How Taiwan became what it is, read through its numbers from 1950 to today: seven questions on population, the economy, the land, democracy and daily life, with every number explained and linked to its official source, period and download. Plus how international databases label Taiwan, and where to get the raw data.',
    'dh.hero.eyebrow': 'Data · Data Taiwan',
    'dh.hero.title': 'Data Taiwan',
    'dh.hero.subtitle':
      'Read Taiwan through its numbers, and find where every number comes from',
    'dh.hero.lede':
      "This page connects Taiwan's numbers to the stories on this site. Start with seventy-five years of long lines showing how Taiwan became what it is, then read seven questions, each explaining why its numbers matter. After that you can look up any number's value, period and official source, and get the raw data. Every figure comes from Taiwan's own official statistics, under Taiwan's own name, and the whole table can be downloaded.",
    'dh.today.h': 'Taiwan today',
    'dh.today.foot':
      'Figures verified on {date}. Tap a number for its source, a ten-year comparison and related articles.',
    'dh.subnav.label': 'Sections of Data Taiwan',
    'dh.nav.threads': 'Seven questions',
    'dh.nav.numbers': 'Key numbers',
    'dh.nav.intl': 'International databases',
    'dh.nav.charts': 'Charts on the site',
    'dh.nav.portals': 'Deep dives',
    'dh.nav.sources': 'Where data lives',
    'dh.nav.machine': 'Downloads & API',
    'dh.nav.method': 'Method',
    'dh.card.compare': 'Compared with',
    'dh.card.source': 'Source',
    'dh.card.download': 'Raw data',
    'dh.card.reads': 'On the site',
    'dh.card.permalink': 'Permanent link to this card',
    'dh.card.why': 'Why it matters',
    'dh.nav.overview': 'Seventy-five years',
    'dh.overview.index': 'Seven questions, read one at a time',
    'dh.tb.source': 'Sources: ',
    'dh.tb.marks': 'Turning points on the timeline',
    'dh.ch.why': 'Why it matters: what this number sets in motion',
    'dh.ch.next': 'What to watch next',
    'dh.ch.nums': 'The numbers behind this chapter',
    'dh.ch.reads': 'Read the full stories',
    'dh.ch.from': 'From',
    'dh.card.year': 'Year',
    'dh.card.value': 'Value',
    'dh.basis.official': 'Official statistic',
    'dh.basis.estimate': 'Industry estimate',
    'dh.basis.projection': 'Projection',
    'dh.basis.ranking': 'International ranking',
    'dh.threads.kicker':
      'When the number of babies halves,\nuniversities, migrant labour and elder care all move with it',
    'dh.threads.h2':
      "Taiwan's numbers pull on each other: one thread runs from low fertility to closing universities, another from chips to the power grid",
    'dh.threads.lede':
      'Each thread starts from a question, picks three related numbers, and sends you on to articles in different categories. The numbers show how big something is; the articles show how people live with it.',
    'dh.threads.cats': 'Topics this thread passes through',
    'dh.threads.reads': 'Read along this thread',
    'dh.numbers.kicker':
      'Every number should answer three questions: who measured it, for which year, and where to check it',
    'dh.numbers.h2':
      '{n} key numbers about Taiwan from {agencies} institutions, each with its source and period',
    'dh.numbers.lede':
      'Grouped by the topics used across this site. Each card shows the latest published value with an earlier comparison below it. Cards marked "industry estimate", "projection" or "international ranking" are not government statistics, so mind how they were measured before citing them. The # in the corner of each card is a permanent link to that number.',
    'dh.numbers.toHub': 'All articles in this topic',
    'dh.numbers.download':
      'Download the full table with sources, periods and raw-data links:',
    'dh.filter.label': 'Filter indicators by topic',
    'dh.filter.all': 'All',
    'dh.intl.kicker':
      'One country, four different names across the world’s databases',
    'dh.intl.h2':
      'In international databases, Taiwan is often not called Taiwan, or not there at all',
    'dh.intl.lede':
      'We checked {total} widely cited international databases one by one: {taiwan} list it as Taiwan, {province} use a name containing "Province of China", {ct} use Chinese Taipei or Taiwan, China, and {absent} have no Taiwan at all. The WHO, UNESCO, the UNDP Human Development Report and the World Bank are all in that last group, so for health, education and human development figures the only source for Taiwan is Taiwan’s own official statistics.',
    'dh.intl.caption':
      'How international databases label Taiwan (verified October 2026)',
    'dh.intl.col.db': 'Database',
    'dh.intl.col.how': 'How Taiwan is handled',
    'dh.intl.col.label': 'Label used in the database',
    'dh.intl.col.note': 'Notes',
    'dh.intl.kind.taiwan': 'Listed as Taiwan',
    'dh.intl.kind.province': '"Province of China"',
    'dh.intl.kind.taiwan-china': 'Taiwan, China',
    'dh.intl.kind.chinese-taipei': 'Chinese Taipei',
    'dh.intl.kind.absent': 'No Taiwan',
    'dh.intl.self.h':
      'Where international rankings leave Taiwan out, Taiwan runs the formula itself',
    'dh.intl.self.lede':
      "The UNDP's Human Development Index and Gender Inequality Index do not include Taiwan, so Taiwan's statistics office and the Executive Yuan's Department of Gender Equality apply the same published formulas to Taiwan's data and slot the result into the original rankings. These are not the publishing bodies' own rankings, but the method is public and can be checked.",
    'dh.intl.policy.h': 'How this page handles names:',
    'dh.intl.policy.body':
      'The page always says Taiwan. Each database’s own label is copied verbatim into its own column, untranslated, so readers can check it themselves. Where a database has no Taiwan we say so, rather than filling in a zero or leaving a blank, and figures from different sources are never stitched into one time series.',
    'dh.charts.kicker':
      'Every data chart on this site is titled with a finding',
    'dh.charts.h2':
      '{articles} articles on this site carry {charts} data charts; jump from here to the paragraph each one belongs to',
    'dh.charts.lede':
      'This index is built automatically from every article on the site, so it grows whenever an article gains a chart. A few are drawn below; the rest are listed by topic, and each title links straight to its paragraph.',
    'dh.charts.count': '{n} charts',
    'dh.charts.more': '{n} more',
    'dh.portals.kicker': 'Some subjects deserve a page of their own',
    'dh.portals.h2':
      'The budget, companies, open data, elections and maps each have a full data page',
    'dh.portal.budget.t': 'Budget Decade',
    'dh.portal.budget.d':
      'How the central government splits NT$3 trillion, what the Legislative Yuan cut, and how much is actually spent, a decade on one page.',
    'dh.portal.budget.n': 'statutory expenditure, FY{fy} (ROC)',
    'dh.portal.budget.n2':
      'statutory expenditure, FY{fy} (ROC); the FY{next} proposal of {nextTotal} is before the legislature',
    'dh.portal.companies.t': 'Corporate Map',
    'dh.portal.companies.d':
      'Market value, revenue and staff of the 50 largest listed companies, and who has dropped off the list in recent months.',
    'dh.portal.companies.n':
      "TSMC's share of the top 50's market value (total {total})",
    'dh.portal.opendata.t': 'Open Data Curation',
    'dh.portal.opendata.d':
      'Government open data sorted by field: which datasets are worth using, how to combine them, and what stories they can tell.',
    'dh.portal.opendata.n': 'data domains',
    'dh.portal.elections.t': '2026 Local Elections',
    'dh.portal.elections.d':
      'Candidates, voting information and the timeline for mayors, councillors and village chiefs in all 22 counties and cities.',
    'dh.portal.elections.n': 'election day',
    'dh.portal.map.t': 'Map of Taiwan',
    'dh.portal.map.d':
      'Every place mentioned in the site’s articles, on one map.',
    'dh.portal.map.n': 'places',
    'dh.portal.shape.t': "Taiwan's Shape",
    'dh.portal.shape.d':
      'How AI draws Taiwan wrong, plus a correct, freely usable outline and county and township map data.',
    'dh.portal.shape.n': 'open map data',
    'dh.sources.kicker':
      'If you need raw data, start by knowing where each kind lives',
    'dh.sources.h2':
      "Taiwan's raw data is spread over dozens of platforms; here they are, sorted by what each is good for",
    'dh.sources.lede':
      'Official statistics, local governments, civic tech, data journalism, academic archives and international databases each have their strengths. Every entry says what it is good for, its formats and access, and the snags you will hit in practice.',
    'dh.sources.pitfalls': 'Common snags with Taiwanese data',
    'dh.machine.kicker':
      'For people who code, research, or want AI to understand Taiwan',
    'dh.machine.h2':
      'The numbers on this page can be downloaded, queried in code, and read by AI under Taiwan’s own name',
    'dh.machine.lede':
      'Everything on this page is plain text and tables in the HTML source, so search engines and AI crawlers can read it without running scripts. These machine interfaces are also available:',
    'dh.machine.indicators.t': 'Indicator downloads (CSV / JSON)',
    'dh.machine.indicators.d':
      'Every indicator on this page: value, period, type, source URL and raw-data link, with Chinese and English fields.',
    'dh.machine.api.t': 'Article API',
    'dh.machine.api.d':
      'Titles, descriptions, categories and URLs of every article, as static JSON with no key required.',
    'dh.machine.mcp.t': 'MCP server',
    'dh.machine.mcp.d':
      'Lets AI assistants such as Claude search and cite Taiwan.md directly.',
    'dh.machine.mcp.more': 'Setup guide',
    'dh.machine.raw.t': 'llms.txt and raw Markdown',
    'dh.machine.raw.d':
      'A site description written for language models, and the raw Markdown of every article.',
    'dh.machine.repo.t': 'Source code and data',
    'dh.machine.repo.d':
      'The whole site, its data files and the scripts that produce these numbers are on GitHub, ready to fork.',
    'dh.machine.cite.h': 'Cite this page',
    'dh.machine.cite.body':
      'Taiwan.md ({date}). Data Taiwan: key indicators and data sources for Taiwan. https://taiwan.md/en/data/ , licensed CC BY-SA 4.0. The original source of each figure is the institution named on its card.',
    'dh.method.kicker':
      'One wrong number and the whole page loses its credibility',
    'dh.method.h2': 'How we choose numbers, check them, and keep them current',
    'dh.method.pick.h': 'How we choose',
    'dh.method.pick.body':
      'We pick numbers that answer "how is Taiwan doing now": at least one per topic, preferring indicators with long series, regular official releases, and an article on this site to read next.',
    'dh.method.verify.h': 'How we check',
    'dh.method.verify.body':
      'Every value is checked against the publishing body’s own page or statistical table, with the original wording, period and URL recorded. Press releases are only leads. Industry estimates and international rankings are labelled separately from official statistics.',
    'dh.method.update.h': 'How we keep it current',
    'dh.method.update.body':
      'The last full verification of this page was on {date}. Each indicator records how often its source publishes, and a script flags any number that is overdue so it goes on the update list.',
    'dh.method.naming.h': 'How we name Taiwan',
    'dh.method.naming.body':
      'This page always says Taiwan. When we cite an international database we copy its label verbatim in a separate column, endorsing no particular name, and we do not refuse a database’s numbers because of what it calls Taiwan.',
    'dh.method.error.h': 'Spotted a mistake?',
    'dh.method.error.body':
      'If a number is wrong, a source is out of date or a link is broken, use the feedback button at the bottom right, or open an issue:',
    'dh.ld.name': 'Key indicators for Taiwan (Taiwan.md Data Taiwan)',
    'dh.ld.description':
      'Key statistical indicators for Taiwan compiled by Taiwan.md, covering population, society, economy, industry, energy, land, nature, politics, culture and daily life. Each value carries its publishing institution, reference period, source URL and type (official statistic, industry estimate, projection or international ranking).',
  },
  'zh-TW': {
    'dh.meta.title': '資料台灣：用數字讀懂台灣，每個數字都找得到出處',
    'dh.meta.description':
      '從 1950 年到今天，用數字讀台灣怎麼變成現在的樣子：人口、經濟、土地、民主與日常生活的七個問題，每個數字都講為什麼重要，附官方出處、期間與下載。也整理了國際資料庫怎麼標示台灣，以及原始資料該去哪裡拿。',
    'dh.hero.eyebrow': '數據 · 資料台灣',
    'dh.hero.title': '資料台灣',
    'dh.hero.subtitle': '用數字讀懂台灣，每個數字都找得到出處',
    'dh.hero.lede':
      '這一頁把台灣的數字跟站上的故事接起來。先從七十五年的長線看台灣怎麼變成今天這樣，再讀七個問題，每一題都講清楚數字為什麼重要。之後可以查每個數字的值、期間與官方出處，拿到原始資料。數字一律來自台灣自己的官方統計，用台灣這個名字，整張表都可以下載。',
    'dh.today.h': '今天的台灣',
    'dh.today.foot':
      '數字於 {date} 查證。點數字可以看出處、十年對照與相關文章。',
    'dh.subnav.label': '資料台灣頁內導覽',
    'dh.nav.threads': '七個問題',
    'dh.nav.numbers': '台灣的數字',
    'dh.nav.intl': '國際資料庫',
    'dh.nav.charts': '站上的圖',
    'dh.nav.portals': '深度專題',
    'dh.nav.sources': '資料從哪裡來',
    'dh.nav.machine': '下載與 API',
    'dh.nav.method': '方法',
    'dh.card.compare': '對照',
    'dh.card.source': '出處',
    'dh.card.download': '原始資料',
    'dh.card.reads': '站上故事',
    'dh.card.permalink': '這張卡的永久連結',
    'dh.card.why': '為什麼重要',
    'dh.nav.overview': '七十五年',
    'dh.overview.index': '七個問題，一章讀一個',
    'dh.tb.source': '來源：',
    'dh.tb.marks': '時間軸上的轉折點',
    'dh.ch.why': '為什麼重要：這個數字會推動什麼',
    'dh.ch.next': '接下來看什麼',
    'dh.ch.nums': '這一章的數字',
    'dh.ch.reads': '完整的故事在這幾篇',
    'dh.ch.from': '出自',
    'dh.card.year': '年',
    'dh.card.value': '數值',
    'dh.basis.official': '官方統計',
    'dh.basis.estimate': '業界估計',
    'dh.basis.projection': '推估值',
    'dh.basis.ranking': '國際評比',
    'dh.threads.kicker':
      '出生的孩子少了一半，\n大學、移工與長照的數字就跟著動起來',
    'dh.threads.h2':
      '台灣的數字會互相牽動：一條線從少子化走到大學退場，另一條從晶片走到電網',
    'dh.threads.lede':
      '每條線從一個問題出發，挑三個彼此相關的數字，再把你送到不同分類的文章。數字告訴你規模有多大，文章講的是人怎麼在這個規模裡過日子。',
    'dh.threads.cats': '這條線經過的主題',
    'dh.threads.reads': '沿著這條線讀下去',
    'dh.numbers.kicker':
      '每一個數字都要答得出：誰量的、量的是哪一年、去哪裡核對',
    'dh.numbers.h2':
      '{n} 個台灣的關鍵數字，來自 {agencies} 個機構，每一個都附出處與期間',
    'dh.numbers.lede':
      '依站上的主題分類排列。卡片上是最新一期的發布值，下面是更早的對照；標著「業界估計」「推估值」「國際評比」的不是政府統計，引用前要留意它怎麼量的。卡片右上角的 # 是這個數字的永久連結。',
    'dh.numbers.toHub': '看這個主題的所有文章',
    'dh.numbers.download': '整張表連同出處、期間與原始資料連結，可以直接下載：',
    'dh.filter.label': '依主題篩選指標',
    'dh.filter.all': '全部',
    'dh.intl.kicker': '同一個國家，在不同資料庫裡有四種名字',
    'dh.intl.h2': '在國際資料庫裡，台灣常常不叫台灣，或者根本不在',
    'dh.intl.lede':
      '我們逐一查了 {total} 個常被引用的國際資料庫：{taiwan} 個標示為 Taiwan，{province} 個名稱帶「Province of China」，{ct} 個用 Chinese Taipei 或 Taiwan, China，{absent} 個整個沒有台灣。世界衛生組織、聯合國教科文組織、UNDP 人類發展報告、世界銀行都在最後一類，所以健康、教育、人類發展這些數字，查台灣只能回到台灣自己的官方統計。',
    'dh.intl.caption': '國際資料庫怎麼標示台灣（2026 年 10 月查證）',
    'dh.intl.col.db': '資料庫',
    'dh.intl.col.how': '怎麼處理台灣',
    'dh.intl.col.label': '資料庫裡的原始標籤',
    'dh.intl.col.note': '說明',
    'dh.intl.kind.taiwan': '標示為台灣',
    'dh.intl.kind.province': '帶 Province of China',
    'dh.intl.kind.taiwan-china': 'Taiwan, China',
    'dh.intl.kind.chinese-taipei': 'Chinese Taipei',
    'dh.intl.kind.absent': '沒有台灣',
    'dh.intl.self.h': '國際排名不收台灣時，台灣自己照公式算',
    'dh.intl.self.lede':
      'UNDP 的人類發展指數與性別不平等指數沒有收台灣，主計總處與行政院性別平等處就用同一套公開公式，代入台灣的資料自己算，再插進原報告的排名。這些不是原機構公布的榜單，但方法公開、可以核對。',
    'dh.intl.policy.h': '這一頁怎麼寫：',
    'dh.intl.policy.body':
      '頁面上一律稱台灣；資料庫裡的原始標籤照抄在另一欄，不翻譯、不改寫，讀者可以自己核對；資料庫沒有台灣就寫沒有，不補零也不留白；不同來源的數字不拼成同一條時間序列。',
    'dh.charts.kicker': '站上的每一張資料圖，標題都是一句結論',
    'dh.charts.h2':
      '站上 {articles} 篇文章畫了 {charts} 張資料圖，從這裡可以跳回每一張圖所在的段落',
    'dh.charts.lede':
      '這份索引從全站文章自動整理出來，文章新增圖表時這裡會跟著長出來。下面先畫出幾張，其餘依主題列出標題，點標題會直接跳到那一段。',
    'dh.charts.count': '{n} 張',
    'dh.charts.more': '再看 {n} 張',
    'dh.portals.kicker': '有些題目值得一整頁',
    'dh.portals.h2': '預算、企業、開放資料、選舉與地圖，各有一頁完整的資料專題',
    'dh.portal.budget.t': '總預算十年',
    'dh.portal.budget.d':
      '中央政府三兆元怎麼分、立法院刪了哪些、實際花掉多少，十年一頁看完。',
    'dh.portal.budget.n': '{fy} 年度法定歲出',
    'dh.portal.budget.n2':
      '{fy} 年度法定歲出；{next} 年度預算案 {nextTotal}，立法院審議中',
    'dh.portal.companies.t': '企業版圖',
    'dh.portal.companies.d':
      '前 50 大上市櫃公司的市值、營收與員工，加上這幾個月誰掉出了榜。',
    'dh.portal.companies.n': '台積電占前 50 大市值（合計 {total}）',
    'dh.portal.opendata.t': '開放資料策展',
    'dh.portal.opendata.d':
      '政府開放資料依領域整理：哪些資料集值得用、怎麼組合、能寫出什麼故事。',
    'dh.portal.opendata.n': '個資料領域',
    'dh.portal.elections.t': '2026 九合一選舉',
    'dh.portal.elections.d':
      '22 縣市首長、議員與村里長的候選人、投票資訊與時程。',
    'dh.portal.elections.n': '投票日',
    'dh.portal.map.t': '台灣地圖',
    'dh.portal.map.d': '站上文章提到的地點，標在同一張地圖上。',
    'dh.portal.map.n': '個地點',
    'dh.portal.shape.t': '台灣的形狀',
    'dh.portal.shape.d':
      'AI 畫錯的台灣，以及可以自由使用的正確輪廓、縣市與鄉鎮圖資。',
    'dh.portal.shape.n': '開源地圖資料',
    'dh.sources.kicker': '要原始資料的人，先知道哪裡適合查什麼',
    'dh.sources.h2': '台灣的原始資料散在幾十個平台，這裡依用途整理成一張地圖',
    'dh.sources.lede':
      '官方統計、地方政府、公民科技、資料新聞、學術典藏、國際資料庫各有強項。每一個都寫了適合查什麼、格式與取得方式，以及實際用起來會遇到的坑。',
    'dh.sources.pitfalls': '用台灣資料常踩的坑',
    'dh.machine.kicker': '給要寫程式、做研究，或想讓 AI 讀懂台灣的人',
    'dh.machine.h2':
      '這頁的數字可以下載、用程式取用，也讓 AI 讀得到用台灣名字存在的數字',
    'dh.machine.lede':
      '整頁內容在網頁原始碼裡就是文字與表格，搜尋引擎與 AI 爬蟲不用執行程式就讀得到。另外還有這些機器介面：',
    'dh.machine.indicators.t': '指標下載（CSV／JSON）',
    'dh.machine.indicators.d':
      '本頁全部指標：值、期間、性質、出處網址與原始資料連結，中英雙語欄位。',
    'dh.machine.api.t': '文章 API',
    'dh.machine.api.d':
      '全站文章的標題、描述、分類與網址，靜態 JSON，不用金鑰。',
    'dh.machine.mcp.t': 'MCP 伺服器',
    'dh.machine.mcp.d': '讓 Claude 等 AI 助理直接搜尋、引用 Taiwan.md 的內容。',
    'dh.machine.mcp.more': '安裝說明',
    'dh.machine.raw.t': 'llms.txt 與原始 Markdown',
    'dh.machine.raw.d':
      '寫給語言模型讀的站點說明，以及每篇文章的原始 Markdown。',
    'dh.machine.repo.t': '原始碼與資料',
    'dh.machine.repo.d':
      '整個網站、資料檔與產生這些數字的腳本都在 GitHub 上，可以 fork。',
    'dh.machine.cite.h': '引用這一頁',
    'dh.machine.cite.body':
      'Taiwan.md（{date}）。資料台灣：台灣關鍵指標與資料來源。https://taiwan.md/data/ ，CC BY-SA 4.0 授權。各數字的原始出處以卡片上標示的機構為準。',
    'dh.method.kicker': '數字錯一個，整頁的信用就沒了',
    'dh.method.h2': '我們怎麼選數字、怎麼查證、怎麼保持最新',
    'dh.method.pick.h': '怎麼選',
    'dh.method.pick.body':
      '挑能回答「台灣現在怎麼樣」的數字：每個主題分類至少一個，優先選有長期序列、官方定期發布，而且站上有文章可以接著讀的指標。',
    'dh.method.verify.h': '怎麼查證',
    'dh.method.verify.body':
      '每一個值都回到發布機構的原始頁面或統計表核對，記下原文、期間與網址。新聞稿只當線索；業界估計與國際評比另外標示，跟官方統計分開。',
    'dh.method.update.h': '怎麼保持最新',
    'dh.method.update.body':
      '本頁數字最近一次全面查證在 {date}。每個指標都記著官方的發布頻率，過了該更新的時間會被程式標出來，排進更新清單。',
    'dh.method.naming.h': '怎麼稱呼台灣',
    'dh.method.naming.body':
      '頁面一律稱台灣。引用國際資料庫時，原始標籤照抄在另一欄，不替任何一種命名背書，也不因為對方怎麼稱呼台灣就不用它的數字。',
    'dh.method.error.h': '看到錯誤',
    'dh.method.error.body':
      '數字有錯、來源過期或連結壞掉，請用頁面右下角的意見回饋，或直接開 issue：',
    'dh.ld.name': '台灣關鍵指標（Taiwan.md 資料台灣）',
    'dh.ld.description':
      'Taiwan.md 整理的台灣關鍵統計指標，涵蓋人口、社會、經濟、產業、能源、土地、自然、政治、文化與生活，每個數值附發布機構、參考期間、原始網址與資料性質（官方統計、業界估計、推估值或國際評比）。',
  },
  ja,
  ko,
  es,
  fr,
  pt,
  hi,
  ar,
  ru,
  vi,
  id,
  de,
} as const;
