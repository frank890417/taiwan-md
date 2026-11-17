/**
 * registry-core.ts — 專題登記檔的型別與純函式（不用 import.meta.glob，node 測試可直接載入）。
 *
 * 讀檔的那一層在 registry.ts。欄位定義照專題共用契約 v1 第 5 節「專題登記檔」，
 * 給人看的說明與完整範例在 src/data/topics/README.md。
 * 本檔不 import 任何相對路徑模組。
 */

/** 雙語文字。zh、en 必填；其他語言代碼（ja、ko…）可選，有就優先用，沒有讀 en。 */
export interface LocalizedText {
  zh: string;
  en: string;
  [lang: string]: string | undefined;
}

export interface TopicSubpage {
  /** 中文版路徑，例 /housing/prices/。 */
  path: string;
  title: LocalizedText | string;
  /** TopicNav 膠囊上的短標題（v1.1）。不給就用 title。 */
  navTitle?: LocalizedText | string;
}

export interface TopicTool {
  /** 英文小寫連字號，例 mortgage-calculator。 */
  slug: string;
  /** 單獨頁中文版路徑，例 /housing/mortgage-calculator/。 */
  path: string;
  /** 內嵌板中文版路徑，例 /embed/housing/mortgage-calculator/。 */
  embedPath: string;
  title: LocalizedText;
  /** TopicNav 膠囊上的短標題（v1.1）。不給就用 title。 */
  navTitle?: LocalizedText | string;
  description: LocalizedText;
  keywords: string[];
}

export interface Topic {
  /** housing、health、industry、income、names。 */
  id: string;
  /** 專題主頁中文版路徑，例 /housing/。 */
  path: string;
  title: LocalizedText;
  description: LocalizedText;
  emoji: string;
  /** YYYY-MM-DD。 */
  updated: string;
  subpages: TopicSubpage[];
  tools: TopicTool[];
  /** 被串進專題的既有文章（中文路徑）。 */
  relatedArticles: string[];
  /** 其他專題的 id。 */
  relatedTopics: string[];
  /**
   * 這個專題的內容真的翻好了的語言代碼（v1.1）。登記檔沒寫就是 ['zh-TW', 'en']。
   * 不在清單裡的語言頁應該標 noindex，見 isTopicTranslated()。
   */
  languages?: string[];
}

/** getAllTools() 的元素：工具加上它所屬的專題。 */
export interface ToolWithTopic extends TopicTool {
  topic: Topic;
}

/** 總覽頁的固定排序；不在清單裡的照 id 字母序排在後面。 */
export const TOPIC_ORDER = ['housing', 'health', 'industry', 'income', 'names'];

const DEFAULT_LANG = 'zh-TW';

function isText(v: unknown): v is LocalizedText {
  return (
    !!v &&
    typeof v === 'object' &&
    (typeof (v as any).zh === 'string' || typeof (v as any).en === 'string')
  );
}

function toText(v: unknown, fallback = ''): LocalizedText {
  if (typeof v === 'string') return { zh: v, en: v };
  if (isText(v)) {
    const zh = (v.zh ?? v.en ?? fallback) as string;
    const en = (v.en ?? v.zh ?? fallback) as string;
    return { ...v, zh, en };
  }
  return { zh: fallback, en: fallback };
}

function toStrings(v: unknown): string[] {
  return Array.isArray(v) ? v.filter((x) => typeof x === 'string') : [];
}

/** 專題內容預設翻好的語言（登記檔沒寫 languages 時）。 */
export const DEFAULT_TOPIC_LANGUAGES: readonly string[] = ['zh-TW', 'en'];

/**
 * 照語言取字（v1.1）：該語言自己的欄位 → en → zh。zh-TW 讀 zh。
 * 跟 src/i18n/topics.ts 的 topicsFallbackChain 同一條規則：zh-TW 與 en 以外的語言
 * 缺字時一律先讀英文，同一頁不會一半中文一半英文。
 */
export function pickText(
  text: LocalizedText | string | undefined | null,
  lang: string,
): string {
  if (text == null) return '';
  if (typeof text === 'string') return text;
  const own = text[lang];
  if (typeof own === 'string' && own) return own;
  if (lang === 'zh-TW' || lang === 'zh') return text.zh || text.en || '';
  return text.en || text.zh || '';
}

/**
 * pickText 會不會讀到該語言自己的字（true），還是退到別的語言（false）。
 * 純字串一律當成已經是該語言。textDir() 用它決定要不要標 dir="ltr"。
 */
export function hasOwnText(
  text: LocalizedText | string | undefined | null,
  lang: string,
): boolean {
  if (text == null || typeof text === 'string') return true;
  const key = lang === 'zh-TW' ? 'zh' : lang;
  const own = text[lang] || text[key];
  return typeof own === 'string' && own !== '';
}

/**
 * 這個專題在該語言有沒有翻好的內容（v1.1）。登記檔的 languages 沒寫時是
 * zh-TW 與 en。專題主頁與子頁模板用它傳 noindex：
 *   <Layout noindex={!isTopicTranslated(topic, lang)} …>
 */
export function isTopicTranslated(
  topic: { languages?: readonly string[] } | undefined | null,
  lang: string,
): boolean {
  const langs =
    topic && Array.isArray(topic.languages) && topic.languages.length > 0
      ? topic.languages
      : DEFAULT_TOPIC_LANGUAGES;
  return langs.includes(lang);
}

/**
 * 中文版路徑加語言前綴：('/housing/', 'en') → '/en/housing/'。
 * zh-TW 不加；已經帶該語言前綴、或是絕對網址、或只是錨點的原樣回傳。
 */
export function localizePath(path: string, lang: string): string {
  if (!path) return path;
  if (/^(https?:)?\/\//i.test(path) || path.startsWith('#')) return path;
  const p = path.startsWith('/') ? path : `/${path}`;
  if (!lang || lang === DEFAULT_LANG) return p;
  if (p === `/${lang}` || p.startsWith(`/${lang}/`)) return p;
  return `/${lang}${p}`;
}

/** 比對目前頁用：去掉結尾斜線與查詢字串。 */
export function normalizePath(path: string): string {
  const p = (path || '').split(/[?#]/)[0].replace(/\/+$/, '');
  return p === '' ? '/' : p;
}

/** navTitle 有寫才帶（字串或 {zh, en}）；沒寫就不加這個欄位。 */
function navTitleOf(raw: any): { navTitle?: LocalizedText | string } {
  const v = raw?.navTitle;
  if (typeof v === 'string' && v) return { navTitle: v };
  if (isText(v)) return { navTitle: toText(v) };
  return {};
}

function normalizeTool(raw: any): TopicTool | null {
  if (!raw || typeof raw.slug !== 'string' || typeof raw.path !== 'string') {
    return null;
  }
  return {
    slug: raw.slug,
    path: raw.path,
    embedPath: typeof raw.embedPath === 'string' ? raw.embedPath : '',
    title: toText(raw.title, raw.slug),
    ...navTitleOf(raw),
    description: toText(raw.description),
    keywords: toStrings(raw.keywords),
  };
}

/** 一份登記檔轉成 Topic；缺 id 或 path 回傳 null（總覽頁寧可少列，不列壞的）。 */
export function normalizeTopic(raw: any): Topic | null {
  const data = raw && raw.default ? raw.default : raw;
  if (!data || typeof data.id !== 'string' || typeof data.path !== 'string') {
    return null;
  }
  return {
    id: data.id,
    path: data.path,
    title: toText(data.title, data.id),
    description: toText(data.description),
    emoji: typeof data.emoji === 'string' ? data.emoji : '',
    updated: typeof data.updated === 'string' ? data.updated : '',
    subpages: (Array.isArray(data.subpages) ? data.subpages : [])
      .filter((s: any) => s && typeof s.path === 'string')
      .map((s: any) => ({
        path: s.path,
        title: typeof s.title === 'string' ? s.title : toText(s.title, s.path),
        ...navTitleOf(s),
      })),
    tools: (Array.isArray(data.tools) ? data.tools : [])
      .map(normalizeTool)
      .filter((t: TopicTool | null): t is TopicTool => t !== null),
    relatedArticles: toStrings(data.relatedArticles),
    relatedTopics: toStrings(data.relatedTopics),
    ...(toStrings(data.languages).length > 0
      ? { languages: toStrings(data.languages) }
      : {}),
  };
}

function orderOf(id: string): number {
  const i = TOPIC_ORDER.indexOf(id);
  return i === -1 ? TOPIC_ORDER.length : i;
}

/**
 * import.meta.glob(..., { eager: true }) 的結果轉成排好序的 Topic 陣列。
 * 空物件（資料夾沒有任何 json）回傳空陣列；同一個 id 出現兩次只留第一個。
 */
export function buildTopics(
  modules: Record<string, unknown> | undefined,
): Topic[] {
  const seen = new Set<string>();
  const topics: Topic[] = [];
  for (const key of Object.keys(modules || {}).sort()) {
    const topic = normalizeTopic((modules as Record<string, unknown>)[key]);
    if (!topic || seen.has(topic.id)) continue;
    seen.add(topic.id);
    topics.push(topic);
  }
  return topics.sort(
    (a, b) => orderOf(a.id) - orderOf(b.id) || a.id.localeCompare(b.id),
  );
}

export function flattenTools(topics: readonly Topic[]): ToolWithTopic[] {
  return topics.flatMap((topic) =>
    topic.tools.map((tool) => ({ ...tool, topic })),
  );
}

/** 所有專題與工具裡最新的 updated（YYYY-MM-DD）；沒有就回傳空字串。 */
export function latestUpdated(topics: readonly Topic[]): string {
  return (
    topics
      .map((t) => t.updated)
      .filter((d) => /^\d{4}-\d{2}-\d{2}/.test(d))
      .sort()
      .pop() || ''
  );
}
