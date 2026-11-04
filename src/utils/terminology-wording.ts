/**
 * terminology-wording.ts — /terminology/{id} 頁面的「這個詞算不算中國用語」說法。
 *
 * 從 src/pages/terminology/[id].astro 抽出來，讓它能被 node 直接測
 * （tests/terminology-wording.test.mjs），不用整站 build 才看得到字。
 *
 * 四層說法（2026-10-10 哲宇拍板 OBSERVER-QUEUE #76 選項 C）：
 *   diverging   fork_type E：兩岸正在分歧，雙方都聽得懂
 *   same-word   fork_type F：同一個詞，語感與常用度不同
 *   evidenced   其餘分類、而且條目有佐證（詞源任一欄位，或 usage 範疇）
 *               → 保留原本的直述句「是中國大陸的用法／常見說法」
 *   unverified  其餘分類、零佐證（import 預設的那一千七百條）
 *               → 只說這條記錄了有人回報的差異，來源還沒查證
 *
 * 為什麼要降級：2026-06-22 import 的 1,716 條預設 B、93% 零佐證，站上卻對每
 * 一條都講最寬那句「是，X 是中國大陸的常見說法」。09-15 讀者從站外踩到「消息」
 * （issue #1733，教育部辭典本就有的台灣詞目）、09-30 再踩到「內核」（issue #1786）。
 * 這裡命中的是 render 層，不動 data/terminology/*.yaml；逐條複查是另一張工單。
 */

/** 1997/ThunderKO import 留下的填充字，視同空值（跟 [id].astro 原本的清單一致）。 */
export const TERM_PLACEHOLDERS: ReadonlySet<string> = new Set([
  '台灣用法',
  '台灣用語',
  '中國用法',
  '中國用語',
  '用法',
  '無',
]);

/** 填充字 → 空字串；其餘 trim。 */
export const scrubTermField = (s: string | undefined | null): string => {
  const v = (s || '').trim();
  return TERM_PLACEHOLDERS.has(v) ? '' : v;
};

export interface TermEvidenceFields {
  origin: string;
  taiwanPath: string;
  chinaPath: string;
  forkPoint: string;
  forkCause: string;
  usageExample: string;
  usageNote: string;
}

/** 詞源任一欄位有字（placeholder 已清掉）。沿用 [id].astro 的 hasRealEtymology。 */
export const hasTermEtymology = (f: TermEvidenceFields): boolean =>
  Boolean(
    f.origin || f.forkPoint || f.forkCause || f.taiwanPath || f.chinaPath,
  );

/**
 * 佐證定義（OBSERVER-QUEUE #76 原文：「`etymology` 空且無 `usage` 範疇」= 零佐證）。
 * 傳進來的欄位必須先過 scrubTermField。
 */
export const hasTermEvidence = (f: TermEvidenceFields): boolean =>
  hasTermEtymology(f) || Boolean(f.usageExample || f.usageNote);

export type TermWordingBucket =
  | 'diverging'
  | 'same-word'
  | 'evidenced'
  | 'unverified';

export function termWordingBucket(
  forkKey: string,
  evidenced: boolean,
): TermWordingBucket {
  if (forkKey === 'E') return 'diverging';
  if (forkKey === 'F') return 'same-word';
  return evidenced ? 'evidenced' : 'unverified';
}

export interface TermWordingInput {
  china: string; // cleaned primary china term
  taiwanPrimary: string; // first alternative of display.taiwan
  taiwanAlts: string; // remaining alternatives joined by 「、」, may be ''
  forkKey: string; // normalized A–F or ''
  evidenced: boolean; // hasTermEvidence(...)
}

export interface TermWording {
  bucket: TermWordingBucket;
  /** 正文第一句（粗體 lead）。 */
  lead: string;
  /** FAQ「算中國用語嗎？」的答案（不含 usage.note 尾巴，由頁面自己接）。 */
  faqAnswer: string;
  /** meta description 的第一句。 */
  seoLead: string;
  /** Hero 副標（display.taiwan 沒有多個說法時用）。 */
  heroSubtitle: string;
}

export function termWording(i: TermWordingInput): TermWording {
  const bucket = termWordingBucket(i.forkKey, i.evidenced);
  const alt = i.taiwanAlts ? `（也說${i.taiwanAlts}）` : '';
  const c = i.china;
  const t = i.taiwanPrimary;

  switch (bucket) {
    case 'diverging':
      return {
        bucket,
        lead: `「${c}」是兩岸正在分歧的詞，雙方大致都聽得懂；台灣這邊多半說「${t}」${alt}。`,
        faqAnswer: `「${c}」兩岸都在用、正在分歧，台灣這邊習慣說「${t}」。`,
        seoLead: `中國說「${c}」，台灣說「${t}」。`,
        heroSubtitle: `在台灣，「${c}」要說「${t}」。`,
      };
    case 'same-word':
      return {
        bucket,
        lead: `「${c}」兩岸都在用，但語感與常用度不太一樣；台灣這邊比較常說「${t}」${alt}。`,
        faqAnswer: `「${c}」兩岸都用，但語感不同；台灣這邊比較常說「${t}」。`,
        seoLead: `中國說「${c}」，台灣說「${t}」。`,
        heroSubtitle: `在台灣，「${c}」要說「${t}」。`,
      };
    case 'evidenced':
      return {
        bucket,
        lead: `「${c}」是中國大陸的用法，在台灣通常說「${t}」${alt}。`,
        faqAnswer: `是，「${c}」是中國大陸的常見說法，台灣慣用「${t}」。`,
        seoLead: `中國說「${c}」，台灣說「${t}」。`,
        heroSubtitle: `在台灣，「${c}」要說「${t}」。`,
      };
    case 'unverified':
    default:
      return {
        bucket,
        lead: `有人回報「${c}」在中國比較常見、台灣說「${t}」${alt}；這一條還沒查證來源，先照實記著。`,
        faqAnswer: `還不確定。這條目前只記錄了有人回報的差異（中國說「${c}」、台灣說「${t}」），來源還沒查證。`,
        seoLead: `有人回報中國說「${c}」、台灣說「${t}」，來源待查證。`,
        heroSubtitle: `有人回報的差異，來源還沒查證。`,
      };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 搜尋結果頁的 title / description（2026-11-04 evolve，GA／Search Console 驅動）
//
// 為什麼改：詞條頁 28 天 1,218 頁有曝光、合計 46 萬次，查詢以「X 意思」「X 是什麼」
// 「X 注音」為主（吃瓜 11,172、人設意思 2,240、細思極恐 2,151、咋注音 1,490），
// 舊標題「「X」台灣怎麼說？台灣用語是「Y」」回答的是另一個問題，點擊率 0.75%。
//
// 做法：只用詞條資料既有的 etymology.origin，從裡面挑出「這個詞是什麼意思」那一句
// （termGloss），挑得到的條目標題改成先問字義、再給台灣說法，描述第一句就是那句
// 字義；挑不到的（單位、譯名、純詞源比較、零佐證）標題與描述維持原句型，一字不動。
// 不生成任何新內容：字義句是 origin 原文切出來的，只去掉折行空白與句尾的台灣對照。
// ─────────────────────────────────────────────────────────────────────────────

/** 注音符號（含擴充）。 */
const BOPOMOFO = /[ㄅ-ㄯㆠ-ㆿ]/;

/**
 * 定義句的標記：「指／形容／表示／比喻／意思…」，或「…的縮略／簡稱／統稱」。
 * 「是」只在句首或標點、引號後才算（「X」是…），避免「本義是」「總是」誤中。
 */
const GLOSS_MARKER =
  /(?:^|[，、；：「」（）])(?:是|指|泛指|意指|專指|特指|借指|代指|比喻|形容|表示|意思|意為|意即|用來|用於|用以)|(?:縮略|縮寫|簡稱|合稱|統稱|泛稱|俗稱)|^一種/;

/**
 * 沒有定義標記時，句子還算「純定義」的條件：不講兩岸對照、不講翻譯或來源、
 * 不講引入年份、不拿辭典當論證。命中這些字的句子是詞源比較或傳播史，不是字義。
 */
const NOT_A_GLOSS =
  /台灣|臺灣|中國|大陸|兩岸|香港|日語|日文|台語|客語|閩南|粵語|譯|源自|源於|來自|引入|推出|命名|不同|辭典|字典|教育部|\d{4}\s*年/;

/** 名稱、譯名類：問「是什麼意思」不合理，維持原句型。 */
const NAME_CATEGORIES: ReadonlySet<string> = new Set(['names', 'proper-noun']);

/** 折行（YAML `>`）留下的 CJK 之間空白去掉，其餘空白收成一格。 */
const tidy = (s: string): string =>
  s
    .replace(/\s+/g, ' ')
    .replace(/([　-〿ㄅ-ㄯ一-鿿＀-￯]) (?=[　-〿ㄅ-ㄯ一-鿿＀-￯])/g, '$1')
    .trim();

const sentences = (s: string): string[] =>
  s
    .split(/(?<=[。！？])/)
    .map((x) => x.trim())
    .filter(Boolean);

export interface TermGlossInput {
  origin: string; // etymology.origin，已過 scrubTermField
  china: string; // cleaned primary china term
  taiwanTerms: string[]; // display.taiwan 的所有說法
  forkKey: string; // normalized A–F or ''
  category: string;
}

export interface TermGloss {
  /** 字義句（以「。」結尾），挑不到就是 ''。 */
  gloss: string;
  /** origin 裡帶注音符號的那一句（以「。」結尾），沒有就是 ''。 */
  zhuyin: string;
}

/** 字義句上限：再長就會把台灣說法擠出搜尋結果頁的可見範圍。 */
export const TERM_GLOSS_MAX = 80;

export function termGloss(i: TermGlossInput): TermGloss {
  const none: TermGloss = { gloss: '', zhuyin: '' };
  // F 同詞不同語感：台灣讀者本來就懂這個詞，問「是什麼意思」答非所問。
  if (i.forkKey === 'F') return none;
  if (NAME_CATEGORIES.has(i.category)) return none;
  const all = sentences(tidy(i.origin || ''));
  if (!all.length) return none;

  const zhuyinSentence = all.find((x) => BOPOMOFO.test(x)) || '';

  let s = all[0].replace(/[。！？]$/, '');
  // 句中講到台灣的那一段是對照，不是字義：切在它前面的標點。
  // 有分號就切在第一個分號（前半句是定義、後半句是傳播史），否則切在台灣前的逗號。
  const tw = s.search(/台灣|臺灣/);
  if (tw >= 0) {
    const semi = s.indexOf('；');
    const cut = semi > 0 && semi < tw ? semi : s.lastIndexOf('，', tw);
    if (cut <= 0) return none;
    s = s.slice(0, cut);
  }
  s = s.trim();
  if (s.length < 6) return none;
  // 「兩詞都指…」「兩者…」是比較句；以台灣說法（「Y」…）起頭＝在解釋台灣那個詞。
  // 句中拿台灣說法當釋義（「用來表示『怎麼樣』的意思」）不算，照收。
  if (/^兩/.test(s)) return none;
  if (
    i.taiwanTerms.some((t) => t && t !== i.china && s.startsWith(`「${t}」`))
  ) {
    return none;
  }
  if (!GLOSS_MARKER.test(s) && NOT_A_GLOSS.test(s)) return none;

  // 句子沒提到這個詞，就把詞接在前面：動詞起頭直接接，否則用冒號。
  let gloss = s;
  if (!s.includes(`「${i.china}」`)) {
    gloss =
      /^(?:是|指|泛指|意指|專指|特指|比喻|形容|表示|意思|意為|用來|用於)/.test(
        s,
      )
        ? `「${i.china}」${s}`
        : `「${i.china}」：${s}`;
  }
  if (gloss.length > TERM_GLOSS_MAX) return none;
  gloss += '。';

  const zhuyin =
    zhuyinSentence && !gloss.includes(zhuyinSentence.replace(/[。！？]$/, ''))
      ? zhuyinSentence.replace(/[！？]$/, '。')
      : '';
  return { gloss, zhuyin };
}

export interface TermSeoInput {
  china: string;
  taiwanPrimary: string;
  gloss: TermGloss;
  /** termWording(...).seoLead */
  seoLead: string;
  /** 分類說明句；只有 showFork 時才傳，否則 ''。 */
  forkBlurb: string;
}

export interface TermSeo {
  /** meaning：先答字義的新句型；lookup：原本的「台灣怎麼說」句型。 */
  kind: 'meaning' | 'lookup';
  title: string;
  description: string;
}

/** 描述上限（EDITORIAL §Description 四原則：Google 約在 160 字截斷）。 */
export const TERM_DESC_MAX = 160;

export function termSeo(i: TermSeoInput): TermSeo {
  const c = i.china;
  const t = i.taiwanPrimary;
  const tail = `查「${c}」算不算中國用語、台灣用語怎麼說 — Taiwan.md 用語保存計畫。`;

  if (!i.gloss.gloss) {
    // 原句型，一字不動（2026-06-22 起）。
    return {
      kind: 'lookup',
      title: `「${c}」台灣怎麼說？台灣用語是「${t}」`,
      description: i.seoLead + (i.forkBlurb || '') + tail,
    };
  }

  // 標題裡的台灣說法拿掉括號註記（「社畜（日源）」→「社畜」），描述照原樣。
  const tShort = t.replace(/（[^）]*）|\([^)]*\)/g, '').trim() || t;
  const title = i.gloss.zhuyin
    ? `「${c}」是什麼意思、注音怎麼念？台灣說「${tShort}」`
    : `「${c}」是什麼意思？台灣說「${tShort}」`;
  // 字義句一定在、台灣說法一定在；注音接在字義後面，分類說明與結尾依序塞，
  // 塞不下就不放。
  const fits = (s: string) => s.length <= TERM_DESC_MAX;
  let description = i.gloss.gloss;
  const z = i.gloss.zhuyin;
  if (z && fits(description + z + i.seoLead)) description += z;
  description += i.seoLead;
  for (const extra of [i.forkBlurb, tail]) {
    if (extra && fits(description + extra)) description += extra;
  }
  return { kind: 'meaning', title, description };
}
