/**
 * article-render.ts — article markdown → HTML render pipeline（module-level, build-wide 共享）
 *
 * 為什麼從 article.template.astro 抽出來（2026-06-13 refactor session）：
 * 1. 檔案長度：renderTwModule 17 模組 + footnote/wikilink pipeline ≈ 900 行
 *    佔掉 template 40%，template 該只剩 view orchestration。
 * 2. Scope 正確性：.astro frontmatter 是 per-render scope（每頁重跑），
 *    renderer/函式每頁重新配置。module scope 整個 build 只配置一次。
 *    ⚠️ 同 class bug 前科：_gitCaches Map 放 frontmatter → git log 子程序
 *    每頁重跑 4,895 次（見 reports/article-template-refactor-2026-06-13.md）。
 *    任何 cache / 昂貴初始化都必須住在被 import 的 .ts module，不是 frontmatter。
 *
 * 內容物全部 1:1 verbatim 搬運（sed 行段抽取），輸出 byte-identical：
 * - resolveWikilinks / marked renderer hooks（heading/link/image/code）
 * - renderTwModule：tw-* 視覺模組（模組清單以 docs/editorial/graph.md §四 為準，計數不寫死）
 * - processFootnotes：GFM [^n] 腳註
 * - renderArticleHtml：title-dedup → wikilink → footnote → marked → 延伸閱讀 split
 *
 * i18n（2026-07-16 v3 renderer 主權補洞）：renderArticleHtml 第三參數 lang 決定
 * VIZ_STRINGS 選用哪語系——「資料來源：」「腳注」等 renderer 自己輸出的 UI 字串，
 * 六語頁面過去全部渲染成中文（含一個簡體字 bug：脚注）。作者寫的資料內容（tw-* 區塊
 * 裡的文字）不受影響，那是 babel 翻譯的範圍，不是這層的責任。
 */
// marked 一律從 marked-cjk 取（CJK 強調修正的唯一設定點，見該檔案首註）
import { marked } from './marked-cjk.mjs';
import type { Lang } from '../config/languages';

// ── VIZ_STRINGS：renderer 自產 UI 字串的全語對照表（非作者資料，是 renderer 輸出）──
// 「資料來源：」「席次」欄名等改由這裡查表，不再寫死中文。冒號標點直接烤進字串
// （zh/ja 全形「：」無空格；en/ko/es/fr 半形「: 」有空格）——這是各語言的標點慣例，
// 不是需要 runtime 判斷的邏輯，存成常數比每次呼叫都判斷 lang 決定標點更直接。
interface VizStrings {
  srcPrefix: string; // 「資料來源：」，含冒號的完整前綴
  county: string; // tw-tiles 資料表欄名「縣市」
  value: string; // tw-tiles 資料表欄名「數值」
  unmatched: string; // tw-tiles 未對應縣市警示，含冒號的完整前綴
  listSep: string; // 列舉分隔號（tw-tiles 未對應清單）：中日「、」，其他語言逗號
  tilesAria: string; // tw-tiles aria-label 預設值（無標題時）
  waffleAria: string; // tw-waffle aria-label 預設值（無標題時）
  fnAria: string; // 單一腳註 aria-label 字首（後接編號）
  fnBackAria: string; // 腳註返回連結 aria-label 字首（後接編號）
  fnSection: string; // 腳註區塊 <section> aria-label
  majority: string; // tw-arc 過半線標籤字首（後接席次數）
}
// 2026-07-26: 原本型別寫死 `'zh-TW' | 'en' | 'ja' | 'ko' | 'es' | 'fr'`，而查找是
// `VIZ_STRINGS[lang] ?? VIZ_STRINGS['zh-TW']`，於是 2026-07 出生的 vi / id / pt /
// hi / ar / ru 六語全部靜靜退回中文。實測 build 出來的 dist，這六語 2,052 個頁面上
// 共有 43,045 個中文 aria-label：`腳註 N` 25,060 個、`返回引用 N` 16,759 個、
// 腳註區塊 `腳註` 1,226 個。這是實質 a11y 問題：阿拉伯文 / 印地文 / 俄文讀者的螢幕
// 閱讀器在每一個腳註連結上都唸出中文。
// 重跑方式：build 後數這六語 dist 裡 `aria-label="<該語 fnAria> N"` 的個數
//（同一批文章、同一批腳註，所以本地化後的個數就等於原本是中文的個數）。
//
// 改成 `Record<Lang, VizStrings>`：Lang 由 LANGUAGES registry 推導（見
// config/languages.ts:143），所以下次有新語言出生，這裡會是**型別錯誤**而不是
// 又一次無聲的中文 fallback。不需要維護第二份語言清單，也比任何 grep gate 早一步。
const VIZ_STRINGS: Record<Lang, VizStrings> = {
  'zh-TW': {
    srcPrefix: '資料來源：',
    county: '縣市',
    value: '數值',
    unmatched: '未對應縣市：',
    listSep: '、',
    tilesAria: '台灣縣市資料地圖',
    waffleAria: '方格圖',
    fnAria: '腳註',
    fnBackAria: '返回引用',
    fnSection: '腳註',
    majority: '過半',
  },
  en: {
    srcPrefix: 'Source: ',
    county: 'County',
    value: 'Value',
    unmatched: 'Unmatched counties: ',
    listSep: ', ',
    tilesAria: 'Taiwan county data map',
    waffleAria: 'Waffle chart',
    fnAria: 'Footnote',
    fnBackAria: 'Back to reference',
    fnSection: 'Footnotes',
    majority: 'Majority',
  },
  ja: {
    srcPrefix: '出典：',
    county: '県市',
    value: '値',
    unmatched: '未対応の県市：',
    listSep: '、',
    tilesAria: '台湾県市データマップ',
    waffleAria: 'ワッフルチャート',
    fnAria: '脚注',
    fnBackAria: '本文に戻る',
    fnSection: '脚注',
    majority: '過半数',
  },
  ko: {
    srcPrefix: '출처: ',
    county: '시·군',
    value: '값',
    unmatched: '매칭되지 않은 시·군: ',
    listSep: ', ',
    tilesAria: '대만 시·군 데이터 지도',
    waffleAria: '와플 차트',
    fnAria: '각주',
    fnBackAria: '본문으로 돌아가기',
    fnSection: '각주',
    majority: '과반',
  },
  es: {
    srcPrefix: 'Fuente: ',
    county: 'Ciudad o condado',
    value: 'Valor',
    unmatched: 'Condados sin correspondencia: ',
    listSep: ', ',
    tilesAria: 'Mapa de datos de los condados de Taiwán',
    waffleAria: 'Gráfico de cuadrícula',
    fnAria: 'Nota',
    fnBackAria: 'Volver a la referencia',
    fnSection: 'Notas',
    majority: 'Mayoría',
  },
  fr: {
    // 法文標點慣例：冒號前有空格（« Source : »）
    srcPrefix: 'Source : ',
    county: 'Ville ou comté',
    value: 'Valeur',
    unmatched: 'Comtés non appariés: ',
    listSep: ', ',
    tilesAria: 'Carte des données des comtés de Taïwan',
    waffleAria: 'Graphique en gaufre',
    fnAria: 'Note',
    fnBackAria: 'Retour à la référence',
    fnSection: 'Notes',
    majority: 'Majorité',
  },
  // ── 以下六語 2026-07-26 補上（出生時漏補，一路退回中文）───────────────────
  // `county` 一律沿用站上既有 bundle 已審過的行政區用詞，不自己另創譯名：
  //   vi/id/pt/hi/ar/ru 的「縣市」取自 src/i18n/data.ts 的
  //   `data.svg.card4.description`（各語都已翻譯「縣市界」），
  //   語感再對照 src/i18n/map.ts 的 `map.controls.region.*`。
  vi: {
    srcPrefix: 'Nguồn: ',
    county: 'Huyện/thành phố',
    value: 'Giá trị',
    unmatched: 'Huyện/thành phố không khớp: ',
    listSep: ', ',
    tilesAria: 'Bản đồ dữ liệu huyện, thành phố Đài Loan',
    waffleAria: 'Biểu đồ ô vuông',
    fnAria: 'Chú thích',
    fnBackAria: 'Quay lại phần tham chiếu',
    fnSection: 'Chú thích',
    majority: 'Quá bán',
  },
  id: {
    srcPrefix: 'Sumber: ',
    county: 'Kabupaten/kota',
    value: 'Nilai',
    unmatched: 'Kabupaten/kota tidak cocok: ',
    listSep: ', ',
    tilesAria: 'Peta data kabupaten dan kota Taiwan',
    waffleAria: 'Diagram wafel',
    fnAria: 'Catatan kaki',
    fnBackAria: 'Kembali ke rujukan',
    fnSection: 'Catatan kaki',
    majority: 'Mayoritas',
  },
  pt: {
    srcPrefix: 'Fonte: ',
    county: 'Condado ou cidade',
    value: 'Valor',
    unmatched: 'Condados sem correspondência: ',
    listSep: ', ',
    tilesAria: 'Mapa de dados dos condados de Taiwan',
    waffleAria: 'Gráfico de waffle',
    fnAria: 'Nota',
    fnBackAria: 'Voltar à referência',
    fnSection: 'Notas',
    majority: 'Maioria',
  },
  hi: {
    srcPrefix: 'स्रोत: ',
    county: 'काउंटी/शहर',
    value: 'मान',
    unmatched: 'बेमेल काउंटी: ',
    listSep: ', ',
    tilesAria: 'ताइवान काउंटी डेटा मानचित्र',
    waffleAria: 'वफ़ल चार्ट',
    fnAria: 'पाद-टिप्पणी',
    fnBackAria: 'संदर्भ पर वापस जाएँ',
    fnSection: 'पाद-टिप्पणियाँ',
    majority: 'बहुमत',
  },
  ar: {
    srcPrefix: 'المصدر: ',
    county: 'المنطقة أو المدينة',
    value: 'القيمة',
    unmatched: 'مناطق غير مطابقة: ',
    listSep: '، ',
    tilesAria: 'خريطة بيانات مناطق تايوان',
    waffleAria: 'مخطط المربعات',
    fnAria: 'حاشية',
    fnBackAria: 'العودة إلى المرجع',
    fnSection: 'الحواشي',
    majority: 'الأغلبية',
  },
  ru: {
    // 俄文，不是烏克蘭文。ui.ts 的 ru bundle 有 55 / 193 個 key 混進烏克蘭文
    // （含俄文字母表沒有的 і/ї/є/ґ），所以這一區刻意不從那裡取詞；本 PR 附了
    // 機器判定指令。這 10 條全部只用俄文字母。
    srcPrefix: 'Источник: ',
    county: 'Уезд или город',
    value: 'Значение',
    unmatched: 'Несопоставленные уезды: ',
    listSep: ', ',
    tilesAria: 'Карта данных по уездам Тайваня',
    waffleAria: 'Вафельная диаграмма',
    fnAria: 'Сноска',
    fnBackAria: 'Вернуться к ссылке',
    fnSection: 'Сноски',
    majority: 'Большинство',
  },
  de: {
    // de scaffold (2026-08-19, de-translations-batch2). Record<Lang, VizStrings>
    // 為型別硬需求；de 尚未 enabled，10 欄位以德文慣例填寫，出生時依
    // LANGUAGE-BIRTH-CHECKLIST §Stage 4 再對齊 ui bundle。
    srcPrefix: 'Quelle: ',
    county: 'Kreis oder Stadt',
    value: 'Wert',
    unmatched: 'Nicht zugeordnete Kreise: ',
    listSep: ', ',
    tilesAria: 'Datenkarte der Kreise Taiwans',
    waffleAria: 'Waffeldiagramm',
    fnAria: 'Fußnote',
    fnBackAria: 'Zurück zur Referenz',
    fnSection: 'Fußnoten',
    majority: 'Mehrheit',
  },
};

// 來源列解析用的 regex：從 VIZ_STRINGS.srcPrefix 推導，不手列第二份清單（見下方
// §跨模組「來源」列）。複數形另列——模型翻出來的是 `Fontes`／`Источники`／
// `المصادر`／`Quellen`／`Nguồn dữ liệu`，這些不在 srcPrefix 裡但實測出現在語料。
const _SRC_EXTRA_LABELS = [
  '資料來源',
  '來源',
  'sources',
  'fuentes',
  'fontes',
  'quellen',
  'источники',
  'المصادر',
  'nguồn dữ liệu',
  'مصدر البيانات',
  // 2026-10-16 twmd-maintainer-daily：`Datenquelle` 實測出現在 de 兩篇
  // （complex-life-festival / taiwan-bar），不在 srcPrefix 的 `Quelle` 裡，
  // 於是那兩篇的來源列被當資料列丟掉。模型會翻出「資料來源」的直譯複合詞，
  // 不只翻出「來源」。
  'datenquelle',
  'datenquellen',
  'fonte de dados',
  'fuente de datos',
  'data source',
  'sumber data',
  'データ出典',
  '데이터 출처',
];
function _buildSrcLineRe(): RegExp {
  const labels = new Set<string>(_SRC_EXTRA_LABELS);
  for (const v of Object.values(VIZ_STRINGS)) {
    labels.add(
      v.srcPrefix
        .replace(/[:：]\s*$/, '')
        .trim()
        .toLowerCase(),
    );
  }
  const alt = [...labels]
    .filter(Boolean)
    .sort((a, b) => b.length - a.length) // 長的先試，免得 `Nguồn` 先吃掉 `Nguồn dữ liệu`
    .map((l) => l.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|');
  return new RegExp(`^(?:${alt})\\s*[:：]\\s*(.+)$`, 'i');
}
const SRC_LINE_RE = _buildSrcLineRe();
// module scope：整個 build 只有一份，renderArticleHtml 每次呼叫開頭覆寫。
// 安全性建立在「marked.parse() 是同步呼叫、_locale 賦值到 parse 完成之間沒有
// await」──JS 單執行緒下不會被其他 renderArticleHtml 呼叫插入打斷，一次 parse
// 用到底都是同一個 lang。若未來 renderTwModule 或 processFootnotes 被改成 async，
// 這個假設會失效，屆時 _locale 必須改成參數傳遞而非 module-scope 變數。
let _locale: VizStrings = VIZ_STRINGS['zh-TW'];
// 頁面語言本身：tw-tiles 要知道磚上印哪一語的縣市名（_locale 只帶 UI 字串）。
// 同步假設同 _locale，兩者永遠一起賦值。
let _lang: string = 'zh-TW';

function resolveWikilinks(md: string) {
  if (!md) return md;
  return md.replace(
    /\[\[([^\]|]+?)(?:\|([^\]]+?))?\]\]/g,
    (_, target, display) => {
      return `**${display || target}**`;
    },
  );
}

const renderer = new marked.Renderer();

// ── 標題 id 產生器（OBSERVER-QUEUE #44，2026-09-05 哲宇拍板 A：一次修好全部語言）──
// 舊規則 `[^\w一-鿿-]`：JS 的 `\w` 只認 ASCII（`\w` 不受 `u` flag 影響、
// 不會像 `\p{...}` 那樣展開成 Unicode），`一-鿿` 只涵蓋中日韓統一表意
// 文字（漢字），不含韓文諺文（한글）、俄文西里爾字母、阿拉伯字母、天城文，也不含
// 日文假名（U+3040-30FF）。結果：ko / ru / ar / hi 標題整段被剝光只剩空字串或純
// 連字號（實測：ko 10,337 個標題 7,158 個退化、3,638 個重複；ru 7,010／2,922；
// ar 6,999／2,912；hi 6,057／2,526）；拉丁語系重音字元也被吃
// （`las-últimas` → `las-ltimas`）。ja 因為標題多以漢字為主、假名多是助詞，
// 只是局部損傷、沒有全段退化，所以沒被四語列表點名，但同樣是這條規則的受害者。
//
// 新規則 `[^\p{L}\p{N}_-]/gu`：`\p{L}` 是 Unicode「字母」大分類（涵蓋所有語言的
// 字母/表音文字/表意文字，含假名、諺文、西里爾、阿拉伯字母、天城文），`\p{N}` 是
// 「數字」大分類。原本的 `一-鿿` 特例可以整個拿掉——`\p{L}` 已完整涵蓋。
// 阿拉伯文／韓文沒有大小寫，`toLowerCase()` 對它們是 no-op，維持既有的
// `.toLowerCase()` 呼叫不影響它們、也不改變拉丁語系原本就有的小寫化行為。
// 額外補上連續連字號合併＋首尾修剪：舊規則把空白轉連字號後不曾清理過，
// 「A - B」這種標題會產生 `a---b`；這條清理不影響任何既有 id 的可讀性，
// 只是把本來就存在的雜訊收乾淨。
//
// 2026-09-05 補 `\p{M}`（哲宇拍板 #44 補強 1）：天城文（Devanagari）的母音符號
// （matras，如 ि ी ं）、泰文聲調符號、越南文組合形式的調號、阿拉伯文 harakat
// 都屬 Unicode「Mark」大分類，不屬於 `\p{L}`——只加 `\p{L}\p{N}` 不會讓 hi 標題
// 退化（子音本身是 \p{L}，id 不會變空），但字面會被剝損：`हिंदी`
// （ह + ि + ं + द + ी）剝掉三個 matras 只剩子音「हद」，肉眼看不出是同一個詞。
// 加上 `\p{M}` 讓這些組合標記留下，字面完整；子音仍是 \p{L}，退化率不受影響。
//
// 對照腳本：scripts/tools/heading-id-audit.mjs（import 這支函式本身，不是另外
// 用別的語言重寫規則去估——2026-08-28 就是拿 Python 的 `\w`〔吃 Unicode 字母〕
// 量 JS 的 `\w`〔只吃 ASCII〕，兩邊 regex 長得一樣卻量出完全不同的行為，見
// docs/semiont/memory/2026-08-28-005518-footnote-cards.md「徹底處理那一輪」）。
//
// 唯一呼叫端：renderer.heading（此檔案）＋ TableOfContents.astro 的 fallback
// （id 屬性缺席時的備援計算）。兩處故意都 import 這支函式而不是各自維護一份
// regex，避免出現「改一處、另一處沒改」造成 TOC 連結指到不存在 id 的新病。
export function slugifyHeadingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\p{L}\p{M}\p{N}_-]/gu, '')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

// Inject id attributes on headings for TOC anchor links
// ⚠️ 用 tokens 走 parseInline，不要直接吐 `text`：marked v5+ 的 `text` 是**未解析
// 的原文**，`## **粗體**：標題` 會把 `**` 原封不動印在 <h2> 裡（2026-08-14 全站
// 掃到 25 頁）。id 仍由原文計算，錨點與既有 TOC 連結不變（TableOfContents 讀
// id 屬性、內文再 strip tags，所以目錄同步少掉那兩顆星）。
// 必須是 function 而非 arrow：要拿到 marked 綁定的 this.parser。
renderer.heading = function ({ text, tokens, depth }) {
  const id = slugifyHeadingId(text);
  return `<h${depth} id="${id}">${this.parser.parseInline(tokens)}</h${depth}>`;
};

renderer.link = ({ href, title, text }) => {
  const isExternal =
    href?.startsWith('http://') || href?.startsWith('https://');
  const titleAttr = title ? ` title="${title}"` : '';
  const targetAttr = isExternal
    ? ' target="_blank" rel="noopener noreferrer"'
    : '';
  return `<a href="${href}"${titleAttr}${targetAttr}>${text}</a>`;
};

renderer.image = ({ href, title, text }) => {
  const titleAttr = title ? ` title="${title}"` : '';
  return `<img src="${href}" alt="${text || ''}"${titleAttr} loading="lazy" onerror="this.onerror=null;this.classList.add('img-broken')" />`;
};

// ── 文章內共用視覺模組（fenced-code 語法糖 → HTML，CSS 在 article-modules.css）─
// 作者寫 ```tw-figure / tw-versus / tw-bars / tw-timeline 區塊，逐列用 | 分欄。
const _esc = (s: string) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// `processFootnotes()` 跑在模組 fence 之前，所以 fence 的 text slot 拿到的字串裡
// 腳註**已經是** `<sup id="fnref-N">…</sup>` HTML。再走一次 `_esc()`，`<` 變 `&lt;`，
// 讀者在時間軸／對比／數字卡裡看到的是一串字面 tag，點不到也沒有文末條目
// （issue #1890：全庫 451 檔 / 2,151 處）。
//
// 修法刻意**不是**寫一個「escape 但保留 HTML」的通用函式：`_esc` 是這個 renderer 的
// HTML 注入邊界，全檔 96 個呼叫點，開一道通用白名單等於在每個 slot 上開縫。
// 這裡只還原 `processFootnotes()` 自己印出來的那一個精確字樣——形狀固定、由我們
// 自己生成，label 限不含空白與引號、num 限數字，其餘一律維持 escaped。
//
// ⚠️ 只能用在**文字內容** slot，不能用在屬性值（`aria-label="…"` / `alt="…"` /
// `data-tw-note="…"`）：還原出來的 `<sup>` 自己帶雙引號，塞進屬性會把屬性提早收掉。
// 屬性位置一律繼續用 `_esc`。
const _FN_REF_ESCAPED =
  /&lt;sup id="(fnref-[^\s"<>&]+)"&gt;&lt;a href="#(fn-[^\s"<>&]+)" class="footnote-ref" aria-label="([^"<>&]*)"&gt;(\d+)&lt;\/a&gt;&lt;\/sup&gt;/g;

const _escText = (s: string) =>
  _esc(s).replace(
    _FN_REF_ESCAPED,
    (_m, supId, fnId, aria, num) =>
      `<sup id="${supId}"><a href="#${fnId}" class="footnote-ref" aria-label="${aria}">${num}</a></sup>`,
  );

function renderTwModule(lang: string, raw: string): string {
  let lines = raw
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
  if (lines.length === 0) return '';

  // 跨模組「來源」列：任一列 `來源：…` / `資料來源：…` / `source: …` 抽成 sibling 來源 caption。
  // 2026-07-16 擴充各語言標籤（Sources/出典/출처/Fuente(s)）——babel 會把「來源」翻成
  // 目標語標籤，舊 regex 對不上時整列靜默變資料列被丟掉，譯版來源 caption 消失。
  //
  // 2026-09-23：那次擴充是手列五語，於是 07 月之後出生的七語又漂掉了——實測
  // knowledge/ 底下 1,124 列模組內來源（vi「Nguồn」250、hi「स्रोत」177、
  // pt「Fonte」218、id「Sumber」171、ar「المصدر」168、ru「Источник」163、
  // de「Quelle」112），分佈在約 440 篇譯文，每一列都被當成資料列。這個檔自己在
  // VIZ_STRINGS 上面的註解寫過修法：**不要維護第二份語言清單**。srcPrefix 那一欄
  // 本來就是「這個語言怎麼寫來源」的 SSOT，解析端直接從它推導，新語言出生時
  // 寫入端與讀取端就不可能再分岔。
  let src = '';
  const _srcRe = SRC_LINE_RE;
  lines = lines.filter((l) => {
    const m = l.match(_srcRe);
    if (m) {
      src = m[1].trim();
      return false;
    }
    return true;
  });
  if (lines.length === 0 && !src) return '';
  const _src = src
    ? `<p class="tw-mod-src">${_esc(_locale.srcPrefix)}${_escText(src)}</p>`
    : '';

  // 跨模組「標題」列：資料模組第一列若不含 `|` 視為模組標題（graph.md：標題說 takeaway）。
  // tw-figure / tw-quote / tw-source / tw-line / tw-waffle / tw-note 有自己的 positional 邏輯，不走這層。
  const TITLED = new Set([
    'tw-bars',
    'tw-stat',
    'tw-versus',
    'tw-timeline',
    'tw-heatmap',
    'tw-slope',
    'tw-dot',
    'tw-stack',
    'tw-pyramid',
    'tw-tiles',
    'tw-iso',
    'tw-arc',
    'tw-multiples',
  ]);
  let modTitle = '';
  if (
    TITLED.has(lang) &&
    lines.length > 1 &&
    lines[0] &&
    !lines[0].includes('|') &&
    // 排除模組自己的 config 列（單位：iso／過半：arc／欄：multiples）被誤判成標題——
    // 這三個都可能出現在第一列（作者省略標題時），沒有 `|` 但不是 takeaway 句。
    !/^(單位|過半|欄)\s*[:：]/.test(lines[0])
  ) {
    modTitle = lines.shift() || '';
  }
  const _title = modTitle
    ? `<div class="tw-mod-title">${_esc(modTitle)}</div>`
    : '';
  // 數字小工具：千分位 + 從欄位字串抽數值（保留負號）
  const _fmt = (v: number) =>
    Math.abs(v) >= 1000 ? v.toLocaleString('en-US') : String(v);
  const _num = (s: string) => parseFloat(String(s).replace(/[^0-9.\-]/g, ''));
  // 嚴格數字判定（跟 _num 不同：_num 會從文字裡硬擠數字出來，"2,650，2015 年後約
  // 2,400" 這種備註文字會被解讀成一串巨大數字；tw-dot 三值列要靠這個判斷第 4 欄
  // 到底是「上界數值」還是「備註文字」，用 _num 會誤判）
  const _isPureNum = (s: string) => /^-?[\d,]+(\.\d+)?%?$/.test(s.trim());
  // 強調列語法：標籤開頭 `*` → 該列 highlight、其餘列退灰（Datawrapper 灰色脈絡 pattern）
  const _emph = (raw: string) =>
    raw.startsWith('*')
      ? { label: raw.slice(1).trim(), hi: true }
      : { label: raw, hi: false };

  if (lang === 'tw-article') {
    // 文內嵌入站內文章卡（2026-08-19）。每列一篇：`分類/slug` 或 `/分類/slug`，
    // 選配 `| 一句自訂摘要`（覆蓋該篇 frontmatter description；譯文層會被翻譯）。
    // renderer 是純字串層、拿不到別篇的 frontmatter，所以這裡只吐一個帶資料屬性
    // 的 placeholder，裡面先放一條真的 <a>：RSS／llms.txt／任何沒走 Astro 後處理
    // 的消費端看到的就是一條站內連結，不是空殼。文章頁的 ArticleProse.astro 會
    // 把整個 .tw-article-slot 換成共用 <ArticleCard density="embed">。
    // 為什麼不直接在這裡組卡片 HTML：卡片 markup 的單一真相是 ArticleCard.astro
    // （2026-06-14「拿來共用才有意義」），renderer 手刻一份就是第二份。
    const items = lines
      .map((l) => {
        const [rawPath = '', ...rest] = l.split('|');
        const path = rawPath.trim().replace(/^\/+|\/+$/g, '');
        const seg = path.split('/');
        if (seg.length !== 2 || !seg[0] || !seg[1]) return null;
        const note = rest.join('|').trim();
        return { cat: seg[0].toLowerCase(), slug: seg[1], note };
      })
      .filter((x): x is { cat: string; slug: string; note: string } => !!x);
    if (items.length === 0) return '';
    const slots = items
      .map(
        (it) =>
          `<div class="tw-article-slot" data-tw-cat="${_esc(it.cat)}" data-tw-slug="${_esc(it.slug)}"` +
          (it.note
            ? ` data-tw-note="${_esc(it.note).replace(/"/g, '&quot;')}"`
            : '') +
          `><a href="/${_esc(it.cat)}/${encodeURIComponent(it.slug)}">${_esc(it.slug)}</a></div>`,
      )
      .join('');
    return `<div class="tw-article">${slots}</div>`;
  }

  if (lang === 'tw-figure') {
    // line1: 大數字（含 -> / → 視為 before→after）；line2: 說明；line3: 來源
    // 也接受 `來源：…` 列（被上方 _srcRe 抽走時 merge 進 positional slot，不再靜默掉）
    const [big = '', cap = '', posSrc = ''] = lines;
    const figSrc = posSrc || src;
    const parts = big.split(/\s*(?:->|→|➜)\s*/);
    const nums =
      parts.length >= 2
        ? `<span class="tw-figure-num">${_esc(parts[0])}</span><span class="tw-figure-arrow">→</span><span class="tw-figure-num">${_esc(parts[1])}</span>`
        : `<span class="tw-figure-num tw-figure-num--solo">${_esc(big)}</span>`;
    return (
      `<div class="tw-figure"><div class="tw-figure-nums">${nums}</div>` +
      (cap ? `<div class="tw-figure-cap">${_esc(cap)}</div>` : '') +
      (figSrc
        ? `<div class="tw-figure-src">${_esc(_locale.srcPrefix)}${_esc(figSrc)}</div>`
        : '') +
      `</div>`
    );
  }

  if (lang === 'tw-versus') {
    // line1: 左標題 | 右標題；其餘列: 左 | 右
    const [head, ...rows] = lines;
    const [lt = '', rt = ''] = head.split('|').map((s) => s.trim());
    // 每格內嵌側別標籤（桌機隱藏、手機顯示）—— 兩欄收摺成單欄時配對識別不丟失
    const tagA = `<span class="tw-versus-tag">${_esc(lt)}</span>`;
    const tagB = `<span class="tw-versus-tag">${_esc(rt)}</span>`;
    const body = rows
      .map((r) => {
        const [l = '', rr = ''] = r.split('|').map((s) => s.trim());
        return `<div class="tw-versus-row"><div class="tw-versus-cell">${tagA}${_escText(l)}</div><div class="tw-versus-cell">${tagB}${_escText(rr)}</div></div>`;
      })
      .join('');
    return (
      `<div class="tw-versus">${_title ? `<div class="tw-mod-title tw-versus-title">${_esc(modTitle)}</div>` : ''}<div class="tw-versus-heads">` +
      `<div class="tw-versus-head tw-versus-head--a">${_esc(lt)}</div>` +
      `<div class="tw-versus-vs">vs</div>` +
      `<div class="tw-versus-head tw-versus-head--b">${_esc(rt)}</div></div>` +
      `<div class="tw-versus-body">${body}</div></div>${_src}`
    );
  }

  if (lang === 'tw-bars') {
    // 每列: 標籤 | 數值 | (選填註記)。數值取數字部分縮放長度（支援負值 → 分歧條）。
    // 標籤開頭 `*` = 強調列（其餘列退灰）。
    const parsed = lines.map((l) => {
      const [rawLabel = '', val = '', note = ''] = l
        .split('|')
        .map((s) => s.trim());
      const { label, hi } = _emph(rawLabel);
      const num = _num(val) || 0;
      return { label, val, num, note, hi };
    });
    const hasNeg = parsed.some((p) => p.num < 0);
    const anyHi = parsed.some((p) => p.hi);
    const valHtml = (p: { val: string; note: string }) =>
      `<div class="tw-bars-val">${_esc(p.val)}${p.note ? `<span class="tw-bars-note"> ${_esc(p.note)}</span>` : ''}</div>`;
    let body = '';
    if (!hasNeg) {
      const max = Math.max(...parsed.map((p) => p.num), 0.0001);
      body = parsed
        .map((p) => {
          const pct = Math.max(3, Math.round((p.num / max) * 100));
          return (
            `<div class="tw-bars-row${p.hi ? ' tw-bars-row--hi' : ''}"><div class="tw-bars-label">${_esc(p.label)}</div>` +
            `<div class="tw-bars-track"><div class="tw-bars-fill" style="width:${pct}%"></div></div>` +
            valHtml(p) +
            `</div>`
          );
        })
        .join('');
    } else {
      // 分歧條：0 在中線，負值往左（冷色）、正值往右（暖色）
      const maxAbs = Math.max(...parsed.map((p) => Math.abs(p.num)), 0.0001);
      body = parsed
        .map((p) => {
          const pct = Math.max(1.5, (Math.abs(p.num) / maxAbs) * 49);
          const neg = p.num < 0;
          return (
            `<div class="tw-bars-row${p.hi ? ' tw-bars-row--hi' : ''}"><div class="tw-bars-label">${_esc(p.label)}</div>` +
            `<div class="tw-bars-track tw-bars-track--div"><span class="tw-bars-zero"></span>` +
            `<div class="tw-bars-fill ${neg ? 'tw-bars-fill--neg' : 'tw-bars-fill--pos'}" style="${neg ? 'right:50%;left:auto;' : 'left:50%;'}width:${pct}%"></div></div>` +
            valHtml(p) +
            `</div>`
          );
        })
        .join('');
    }
    return `<div class="tw-bars${anyHi ? ' tw-bars--focus' : ''}">${_title}${body}</div>${_src}`;
  }

  if (lang === 'tw-timeline') {
    // 每列: 年份 | 標題 | (選填說明)
    const body = lines
      .map((l) => {
        const [year = '', t = '', desc = ''] = l
          .split('|')
          .map((s) => s.trim());
        return (
          `<div class="tw-timeline-item"><div class="tw-timeline-year">${_escText(year)}</div>` +
          `<div class="tw-timeline-node"></div>` +
          `<div class="tw-timeline-content"><div class="tw-timeline-title">${_escText(t)}</div>` +
          (desc
            ? `<div class="tw-timeline-desc">${_escText(desc)}</div>`
            : '') +
          `</div></div>`
        );
      })
      .join('');
    return `<div class="tw-timeline">${_title}${body}</div>${_src}`;
  }

  if (lang === 'tw-stat') {
    // 每列: 數值 | 標籤 | (選填註記)
    const cards = lines
      .map((l) => {
        const [val = '', label = '', note = ''] = l
          .split('|')
          .map((s) => s.trim());
        return (
          `<div class="tw-stat-card"><div class="tw-stat-val">${_escText(val)}</div>` +
          (label ? `<div class="tw-stat-label">${_escText(label)}</div>` : '') +
          (note ? `<div class="tw-stat-note">${_escText(note)}</div>` : '') +
          `</div>`
        );
      })
      .join('');
    const statCore = `<div class="tw-stat">${cards}</div>`;
    return _title
      ? `<div class="tw-stat-wrap">${_title}${statCore}</div>${_src}`
      : `${statCore}${_src}`;
  }

  if (lang === 'tw-waffle') {
    // 選填標題（不含 |）+ 每列: 類別 | 數值(%)；100 格依比例填色
    let title = '';
    let rows = lines;
    if (lines[0] && !lines[0].includes('|')) {
      title = lines[0];
      rows = lines.slice(1);
    }
    const cats = rows.map((l) => {
      const [label = '', val = ''] = l.split('|').map((s) => s.trim());
      const num = parseFloat(val.replace(/[^0-9.]/g, '')) || 0;
      return { label, val, num };
    });
    const total = cats.reduce((a, c) => a + c.num, 0) || 1;
    const floors = cats.map((c) => Math.floor((c.num / total) * 100));
    const rem = 100 - floors.reduce((a, b) => a + b, 0);
    const fracs = cats
      .map((c, i) => ({ i, f: (c.num / total) * 100 - floors[i] }))
      .sort((a, b) => b.f - a.f);
    for (let k = 0; k < rem && k < fracs.length; k++) floors[fracs[k].i]++;
    const order: number[] = [];
    floors.forEach((cnt, ci) => {
      for (let j = 0; j < cnt; j++) order.push(ci);
    });
    const cells = order
      .slice(0, 100)
      .map((ci) => `<div class="tw-waffle-cell" data-cat="${ci % 5}"></div>`)
      .join('');
    const swatch = [
      'var(--tw-warm)',
      'var(--tw-cool)',
      'var(--tw-green)',
      'var(--color-accent)',
      'var(--tw-mute)',
    ];
    const legend = cats
      .map(
        (c, ci) =>
          `<span class="tw-waffle-key"><span class="tw-waffle-swatch" style="background:${swatch[ci % 5]}"></span>${_esc(c.label)} <b>${_esc(c.val)}</b></span>`,
      )
      .join('');
    return (
      `<div class="tw-waffle">` +
      (title ? `<div class="tw-mod-title">${_esc(title)}</div>` : '') +
      `<div class="tw-waffle-grid" role="img" aria-label="${_esc(title || _locale.waffleAria)}">${cells}</div>` +
      `<div class="tw-waffle-legend">${legend}</div></div>${_src}`
    );
  }

  if (lang === 'tw-quote') {
    // line1: 引文；line2: 姓名 | 角色/場合
    const [q = '', by = ''] = lines;
    const qt = q.replace(/^[「『]/, '').replace(/[」』]$/, '');
    const [name = '', role = ''] = by.split('|').map((s) => s.trim());
    const byHtml = name
      ? `<figcaption class="tw-quote-by"><b>${_escText(name)}</b>${role ? `，${_escText(role)}` : ''}</figcaption>`
      : '';
    return `<figure class="tw-quote"><blockquote class="tw-quote-text">${_escText(qt)}</blockquote>${byHtml}</figure>${_src}`;
  }

  if (lang === 'tw-source') {
    // 整段當來源條（或被 _srcRe 抽走則用 src）
    const txt = lines.join(' ') || src;
    if (!txt) return '';
    return `<p class="tw-source"><span class="tw-source-icon">⌖</span><span>${_esc(txt)}</span></p>`;
  }

  if (lang === 'tw-line') {
    // line1: 標題；line2: x軸名 | 序列1 | 序列2…；其餘: x值 | y1 | y2…
    // 基準線列：`基準：標籤 | 值` → 虛線參考線（無端點、單一標籤），不是序列
    if (lines.length < 3) return '';
    const title = lines[0];
    const header = lines[1].split('|').map((s) => s.trim());
    const xName = header[0] || '';
    const series = header.slice(1);
    const refRe = /^基準線?\s*[:：]\s*/;
    const baselines: { label: string; v: number }[] = [];
    const dataLines = lines.slice(2).filter((l) => {
      const first = l.split('|')[0].trim();
      if (refRe.test(first)) {
        const label = first.replace(refRe, '');
        const v = _num(l.split('|')[1] || '');
        if (!isNaN(v)) baselines.push({ label, v });
        return false;
      }
      return true;
    });
    const rows = dataLines.map((l) => {
      const c = l.split('|').map((s) => s.trim());
      return {
        x: c[0] || '',
        ys: series.map((_, i) => _num(c[i + 1] || '')),
      };
    });
    const allY = [
      ...rows.flatMap((r) => r.ys),
      ...baselines.map((b) => b.v),
    ].filter((v) => !isNaN(v));
    if (allY.length === 0) return '';
    let yMin = Math.min(...allY);
    let yMax = Math.max(...allY);
    if (yMin === yMax) {
      yMin = yMin > 0 ? 0 : yMin - 1;
      yMax = yMax + 1;
    }
    // 動態右邊界：序列名 / 基準標籤要放得下（CJK ~12.5px/字 @ font 12）
    const maxName = Math.max(0, ...series.map((s) => s.length));
    const W = 400,
      H = 200,
      mL = 44,
      mR = Math.min(96, Math.max(40, 14 + maxName * 12.5)),
      mT = 20,
      mB = 26;
    const pw = W - mL - mR,
      ph = H - mT - mB;
    const sx = (i: number) =>
      mL + (rows.length > 1 ? (i / (rows.length - 1)) * pw : pw / 2);
    const sy = (v: number) => mT + (1 - (v - yMin) / (yMax - yMin)) * ph;
    const colCls = ['tw-line-s0', 'tw-line-s1', 'tw-line-s2'];
    let g = '';
    g += `<line class="tw-line-axis" x1="${mL}" y1="${sy(yMax).toFixed(1)}" x2="${W - mR}" y2="${sy(yMax).toFixed(1)}"/>`;
    g += `<line class="tw-line-axis" x1="${mL}" y1="${sy(yMin).toFixed(1)}" x2="${W - mR}" y2="${sy(yMin).toFixed(1)}"/>`;
    g += `<text class="tw-line-ylab" x="${mL - 6}" y="${(sy(yMax) + 4).toFixed(1)}" text-anchor="end">${_esc(_fmt(yMax))}</text>`;
    g += `<text class="tw-line-ylab" x="${mL - 6}" y="${(sy(yMin) + 4).toFixed(1)}" text-anchor="end">${_esc(_fmt(yMin))}</text>`;
    g += `<text class="tw-line-xlab" x="${sx(0).toFixed(1)}" y="${H - 8}" text-anchor="start">${_esc(rows[0].x)}</text>`;
    if (rows.length >= 5) {
      const mid = Math.floor((rows.length - 1) / 2);
      g += `<text class="tw-line-xlab" x="${sx(mid).toFixed(1)}" y="${H - 8}" text-anchor="middle">${_esc(rows[mid].x)}</text>`;
    }
    if (rows.length > 1)
      g += `<text class="tw-line-xlab" x="${sx(rows.length - 1).toFixed(1)}" y="${H - 8}" text-anchor="end">${_esc(rows[rows.length - 1].x)}</text>`;
    // 基準線（虛線、無端點、右端單一標籤 — graph.md §八 反例 gallery 的正解）
    baselines.forEach((b) => {
      const y = sy(b.v).toFixed(1);
      g += `<line class="tw-line-ref" x1="${mL}" y1="${y}" x2="${W - mR}" y2="${y}"/>`;
      g += `<text class="tw-line-reflab" x="${W - mR}" y="${(sy(b.v) - 4).toFixed(1)}" text-anchor="end">${_esc(b.label)} ${_esc(_fmt(b.v))}</text>`;
    });
    series.forEach((sname, si) => {
      const pts = rows
        .map((r, i) => ({ x: sx(i), y: sy(r.ys[si]), v: r.ys[si] }))
        .filter((p) => !isNaN(p.v));
      if (pts.length === 0) return;
      const cls = colCls[si % 3];
      const line = pts
        .map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`)
        .join(' ');
      if (series.length === 1) {
        // 面積填色只給單序列：多序列疊面積會互相蓋成一坨
        const area = `${pts[0].x.toFixed(1)},${sy(yMin).toFixed(1)} ${line} ${pts[pts.length - 1].x.toFixed(1)},${sy(yMin).toFixed(1)}`;
        g += `<polygon class="tw-line-area ${cls}" points="${area}"/>`;
      }
      g += `<polyline class="tw-line-path ${cls}" points="${line}"/>`;
      pts.forEach((p) => {
        g += `<circle class="tw-line-dot ${cls}" cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="2.5"/>`;
      });
      const last = pts[pts.length - 1];
      g += `<text class="tw-line-slab ${cls}" x="${(last.x + 5).toFixed(1)}" y="${(last.y + 4).toFixed(1)}">${_esc(sname)}</text>`;
    });
    const svg = `<svg class="tw-line-plot" viewBox="0 0 ${W} ${H}" role="img" aria-label="${_esc(title)}" xmlns="http://www.w3.org/2000/svg"><title>${_esc(title)}</title>${g}</svg>`;
    const capExtra = baselines.length
      ? `（基準線：${baselines.map((b) => `${b.label} = ${_fmt(b.v)}`).join('、')}）`
      : '';
    const thead = `<tr><th scope="col">${_esc(xName)}</th>${series.map((s) => `<th scope="col">${_esc(s)}</th>`).join('')}</tr>`;
    const tbody = rows
      .map(
        (r) =>
          `<tr><th scope="row">${_esc(r.x)}</th>${r.ys.map((y) => `<td>${isNaN(y) ? '' : _esc(String(y))}</td>`).join('')}</tr>`,
      )
      .join('');
    const table = `<table class="tw-sr-only"><caption>${_esc(title)}${_esc(capExtra)}</caption><thead>${thead}</thead><tbody>${tbody}</tbody></table>`;
    return `<figure class="tw-line"><div class="tw-mod-title">${_esc(title)}</div>${svg}${table}</figure>${_src}`;
  }

  if (lang === 'tw-heatmap') {
    // line1: 角標 | 欄1 | 欄2…；其餘: 列標 | v1 | v2…（每欄各自正規化成色深）
    if (lines.length < 2) return '';
    const header = lines[0].split('|').map((s) => s.trim());
    const corner = header[0] || '';
    const cols = header.slice(1);
    const rows = lines.slice(1).map((l) => {
      const c = l.split('|').map((s) => s.trim());
      return { label: c[0] || '', vals: cols.map((_, i) => c[i + 1] || '') };
    });
    const colNums = cols.map((_, ci) =>
      rows.map((r) => parseFloat((r.vals[ci] || '').replace(/[^0-9.\-]/g, ''))),
    );
    const colMin = colNums.map((arr) =>
      Math.min(...arr.filter((v) => !isNaN(v))),
    );
    const colMax = colNums.map((arr) =>
      Math.max(...arr.filter((v) => !isNaN(v))),
    );
    const thead = `<tr><th scope="col">${_esc(corner)}</th>${cols.map((c) => `<th scope="col">${_esc(c)}</th>`).join('')}</tr>`;
    const tbody = rows
      .map((r) => {
        const tds = r.vals
          .map((v, ci) => {
            const num = parseFloat((v || '').replace(/[^0-9.\-]/g, ''));
            const range = colMax[ci] - colMin[ci];
            if (isNaN(num))
              return `<td class="tw-hm-na">${_esc(v || '–')}</td>`;
            const i = range === 0 ? 0.5 : (num - colMin[ci]) / range;
            // 深色格自動翻白字（build-time 算好，不靠 CSS 猜對比）
            return `<td${i >= 0.55 ? ' class="tw-hm-hi"' : ''} style="--i:${i.toFixed(2)}">${_esc(v)}</td>`;
          })
          .join('');
        return `<tr><th scope="row">${_esc(r.label)}</th>${tds}</tr>`;
      })
      .join('');
    return `<div class="tw-heatmap">${_title}<table class="tw-heatmap-table"><thead>${thead}</thead><tbody>${tbody}</tbody></table></div>${_src}`;
  }

  if (lang === 'tw-slope') {
    // 斜率圖：恰兩個時點的變化。line1(選填): 標題；header: `左時點 | 右時點`（恰 2 欄）；
    // rows: `標籤 | 左值 | 右值`。標籤開頭 `*` = 強調列。
    if (lines.length < 2) return '';
    const head = lines[0].split('|').map((s) => s.trim());
    if (head.length !== 2) return '';
    const [tL, tR] = head;
    const rows = lines
      .slice(1)
      .map((l) => {
        const c = l.split('|').map((s) => s.trim());
        const { label, hi } = _emph(c[0] || '');
        return {
          label,
          hi,
          v1: _num(c[1] || ''),
          v2: _num(c[2] || ''),
          s1: c[1] || '',
          s2: c[2] || '',
        };
      })
      .filter((r) => !isNaN(r.v1) && !isNaN(r.v2));
    if (rows.length === 0) return '';
    const all = rows.flatMap((r) => [r.v1, r.v2]);
    let yMin = Math.min(...all),
      yMax = Math.max(...all);
    if (yMin === yMax) {
      yMin -= 1;
      yMax += 1;
    }
    const padY = (yMax - yMin) * 0.07;
    yMin -= padY;
    yMax += padY;
    const maxLab = Math.max(...rows.map((r) => r.label.length));
    const maxV1 = Math.max(...rows.map((r) => r.s1.length));
    const maxV2 = Math.max(...rows.map((r) => r.s2.length));
    const W = 400,
      H = 210,
      mT = 30,
      mB = 12;
    const mL = Math.min(170, 16 + maxLab * 13 + maxV1 * 7.5);
    const mR = Math.min(90, 14 + maxV2 * 7.5);
    const xL = mL,
      xR = W - mR;
    const sy = (v: number) =>
      mT + (1 - (v - yMin) / (yMax - yMin)) * (H - mT - mB);
    // 端點標籤防重疊：同側相鄰標籤至少隔 13px
    const resolve = (ys: number[]) => {
      const idx = ys.map((y, i) => ({ y, i })).sort((a, b) => a.y - b.y);
      for (let k = 1; k < idx.length; k++)
        if (idx[k].y - idx[k - 1].y < 13) idx[k].y = idx[k - 1].y + 13;
      const out: number[] = [];
      idx.forEach((e) => (out[e.i] = e.y));
      return out;
    };
    const labL = resolve(rows.map((r) => sy(r.v1)));
    const labR = resolve(rows.map((r) => sy(r.v2)));
    const anyHi = rows.some((r) => r.hi);
    let g = '';
    g += `<text class="tw-slope-time" x="${xL}" y="14" text-anchor="middle">${_esc(tL)}</text>`;
    g += `<text class="tw-slope-time" x="${xR}" y="14" text-anchor="middle">${_esc(tR)}</text>`;
    g += `<line class="tw-line-axis" x1="${xL}" y1="${mT}" x2="${xL}" y2="${H - mB}"/>`;
    g += `<line class="tw-line-axis" x1="${xR}" y1="${mT}" x2="${xR}" y2="${H - mB}"/>`;
    rows.forEach((r, ri) => {
      const y1 = sy(r.v1),
        y2 = sy(r.v2);
      const cls = r.hi ? ' tw-slope-row--hi' : '';
      g += `<line class="tw-slope-line${cls}" x1="${xL}" y1="${y1.toFixed(1)}" x2="${xR}" y2="${y2.toFixed(1)}"/>`;
      g += `<circle class="tw-slope-dot${cls}" cx="${xL}" cy="${y1.toFixed(1)}" r="3"/>`;
      g += `<circle class="tw-slope-dot${cls}" cx="${xR}" cy="${y2.toFixed(1)}" r="3"/>`;
      g += `<text class="tw-slope-lab${cls}" x="${xL - 8}" y="${(labL[ri] + 3.5).toFixed(1)}" text-anchor="end">${_esc(r.label)} <tspan class="tw-slope-v">${_esc(r.s1)}</tspan></text>`;
      g += `<text class="tw-slope-lab${cls}" x="${xR + 8}" y="${(labR[ri] + 3.5).toFixed(1)}" text-anchor="start"><tspan class="tw-slope-v">${_esc(r.s2)}</tspan></text>`;
    });
    const aria = modTitle || `${tL} 到 ${tR} 的變化`;
    const svg = `<svg class="tw-slope-plot" viewBox="0 0 ${W} ${H}" role="img" aria-label="${_esc(aria)}" xmlns="http://www.w3.org/2000/svg"><title>${_esc(aria)}</title>${g}</svg>`;
    const thead = `<tr><th scope="col"></th><th scope="col">${_esc(tL)}</th><th scope="col">${_esc(tR)}</th></tr>`;
    const tbody = rows
      .map(
        (r) =>
          `<tr><th scope="row">${_esc(r.label)}</th><td>${_esc(r.s1)}</td><td>${_esc(r.s2)}</td></tr>`,
      )
      .join('');
    const table = `<table class="tw-sr-only"><caption>${_esc(aria)}</caption><thead>${thead}</thead><tbody>${tbody}</tbody></table>`;
    return `<figure class="tw-slope${anyHi ? ' tw-slope--focus' : ''}">${_title}${svg}${table}</figure>${_src}`;
  }

  if (lang === 'tw-dot') {
    // 點圖（dot strip / range）：rows: `標籤 | 值` 或 `標籤 | 起值 | 迄值 | (註)`。
    // 全部列共用同一個軸（這是它比 bars 適合「分布」的原因）。`*` = 強調列。
    const rows = lines
      .map((l) => {
        const c = l.split('|').map((s) => s.trim());
        const { label, hi } = _emph(c[0] || '');
        const v1 = _num(c[1] || '');
        // 三值列（v3.0）：`標籤 | 點估 | 下界 | 上界 | (註)` → 民調式點估＋區間帶。
        // 判定用 _isPureNum（第 3、4 欄都是純數字才算三值列，備註文字不會誤判）。
        const isTriple =
          c.length >= 4 && _isPureNum(c[2] || '') && _isPureNum(c[3] || '');
        if (isTriple) {
          return {
            label,
            hi,
            v1,
            v2: NaN,
            lo: _num(c[2]),
            hiV: _num(c[3]),
            s1: c[1] || '',
            s2: '',
            sLo: c[2],
            sHi: c[3],
            note: c[4] || '',
          };
        }
        const v2 = c.length >= 3 && c[2] !== '' ? _num(c[2]) : NaN;
        const note = c[3] || (isNaN(v2) ? c[2] || '' : '');
        return {
          label,
          hi,
          v1,
          v2,
          lo: NaN,
          hiV: NaN,
          s1: c[1] || '',
          s2: isNaN(v2) ? '' : c[2],
          sLo: '',
          sHi: '',
          note,
        };
      })
      .filter((r) => !isNaN(r.v1));
    if (rows.length === 0) return '';
    const all = rows.flatMap((r) => [
      r.v1,
      ...(isNaN(r.v2) ? [] : [r.v2]),
      ...(isNaN(r.lo) ? [] : [r.lo, r.hiV]),
    ]);
    const dMin = Math.min(...all),
      dMax = Math.max(...all);
    const span = dMax - dMin || 1;
    const lo = dMin - span * 0.06,
      hi_ = dMax + span * 0.06;
    const pos = (v: number) => (((v - lo) / (hi_ - lo)) * 100).toFixed(1);
    const anyHi = rows.some((r) => r.hi);
    const axis = `<div class="tw-dot-row tw-dot-axis" aria-hidden="true"><div class="tw-dot-label"></div><div class="tw-dot-track tw-dot-track--axis"><span class="tw-dot-axislab" style="left:${pos(dMin)}%">${_esc(_fmt(dMin))}</span><span class="tw-dot-axislab tw-dot-axislab--max" style="left:${pos(dMax)}%">${_esc(_fmt(dMax))}</span></div><div class="tw-dot-val"></div></div>`;
    const body = rows
      .map((r) => {
        const p1 = pos(r.v1);
        // 三值列：區間帶（下界→上界）＋點估主點；值文字「點估（下–上）」
        if (!isNaN(r.lo)) {
          const pLo = pos(r.lo),
            pHi = pos(r.hiV);
          const band = `<span class="tw-dot-seg tw-dot-seg--range" style="left:${Math.min(+pLo, +pHi)}%;width:${Math.abs(+pHi - +pLo)}%"></span>`;
          const valTxt = `${_esc(r.s1)}<span class="tw-dot-range">（${_esc(r.sLo)}–${_esc(r.sHi)}）</span>`;
          return `<div class="tw-dot-row${r.hi ? ' tw-dot-row--hi' : ''}"><div class="tw-dot-label">${_esc(r.label)}</div><div class="tw-dot-track">${band}<span class="tw-dot-pt" style="left:${p1}%"></span></div><div class="tw-dot-val">${valTxt}${r.note ? `<span class="tw-bars-note"> ${_esc(r.note)}</span>` : ''}</div></div>`;
        }
        const seg = !isNaN(r.v2)
          ? `<span class="tw-dot-seg" style="left:${Math.min(+p1, +pos(r.v2))}%;width:${Math.abs(+pos(r.v2) - +p1)}%"></span><span class="tw-dot-pt tw-dot-pt--end" style="left:${pos(r.v2)}%"></span>`
          : '';
        const valTxt = !isNaN(r.v2)
          ? `${_esc(r.s1)} <span class="tw-dot-arrow">→</span> ${_esc(r.s2)}`
          : _esc(r.s1);
        return `<div class="tw-dot-row${r.hi ? ' tw-dot-row--hi' : ''}"><div class="tw-dot-label">${_esc(r.label)}</div><div class="tw-dot-track">${seg}<span class="tw-dot-pt${isNaN(r.v2) ? '' : ' tw-dot-pt--start'}" style="left:${p1}%"></span></div><div class="tw-dot-val">${valTxt}${r.note ? `<span class="tw-bars-note"> ${_esc(r.note)}</span>` : ''}</div></div>`;
      })
      .join('');
    return `<div class="tw-dot${anyHi ? ' tw-dot--focus' : ''}">${_title}${axis}${body}</div>${_src}`;
  }

  if (lang === 'tw-stack') {
    // 100% 堆疊條：跨列比較「組成」。header: `列名欄 | 類1 | 類2…`；rows: `標籤 | v1 | v2…`
    // 每列自動正規化成 100%，段寬 ≥ 10% 才顯示文字（其餘看圖例 + 資料表）。
    if (lines.length < 2) return '';
    const header = lines[0].split('|').map((s) => s.trim());
    if (header.length < 3) return '';
    const cats = header.slice(1);
    const rows = lines.slice(1).map((l) => {
      const c = l.split('|').map((s) => s.trim());
      return {
        label: c[0] || '',
        vals: cats.map((_, i) => c[i + 1] || ''),
        nums: cats.map((_, i) => Math.max(0, _num(c[i + 1] || '') || 0)),
      };
    });
    const legend = cats
      .map(
        (c, ci) =>
          `<span class="tw-stack-key"><span class="tw-stack-swatch" data-cat="${ci % 5}"></span>${_esc(c)}</span>`,
      )
      .join('');
    const body = rows
      .map((r) => {
        const total = r.nums.reduce((a, b) => a + b, 0) || 1;
        const segs = r.nums
          .map((n, ci) => {
            const pct = (n / total) * 100;
            if (pct <= 0) return '';
            return `<div class="tw-stack-seg" data-cat="${ci % 5}" style="width:${pct.toFixed(1)}%">${pct >= 10 ? `<span>${_esc(r.vals[ci])}</span>` : ''}</div>`;
          })
          .join('');
        return `<div class="tw-stack-row"><div class="tw-stack-label">${_esc(r.label)}</div><div class="tw-stack-bar">${segs}</div></div>`;
      })
      .join('');
    const thead = `<tr><th scope="col">${_esc(header[0])}</th>${cats.map((c) => `<th scope="col">${_esc(c)}</th>`).join('')}</tr>`;
    const tbody = rows
      .map(
        (r) =>
          `<tr><th scope="row">${_esc(r.label)}</th>${r.vals.map((v) => `<td>${_esc(v)}</td>`).join('')}</tr>`,
      )
      .join('');
    const table = `<table class="tw-sr-only"><caption>${_esc(modTitle || header[0])}</caption><thead>${thead}</thead><tbody>${tbody}</tbody></table>`;
    return `<div class="tw-stack">${_title}<div class="tw-stack-legend">${legend}</div>${body}${table}</div>${_src}`;
  }

  if (lang === 'tw-pyramid') {
    // 金字塔（背對背長條）：header: `組欄名 | 左名 | 右名`；rows: `組 | 左值 | 右值`
    if (lines.length < 2) return '';
    const header = lines[0].split('|').map((s) => s.trim());
    if (header.length < 3) return '';
    const [, nameL, nameR] = header;
    const rows = lines.slice(1).map((l) => {
      const c = l.split('|').map((s) => s.trim());
      return {
        label: c[0] || '',
        vL: _num(c[1] || '') || 0,
        vR: _num(c[2] || '') || 0,
        sL: c[1] || '',
        sR: c[2] || '',
      };
    });
    const max = Math.max(...rows.flatMap((r) => [r.vL, r.vR]), 0.0001);
    const body = rows
      .map((r) => {
        const wL = ((r.vL / max) * 100).toFixed(1);
        const wR = ((r.vR / max) * 100).toFixed(1);
        return (
          `<div class="tw-pyramid-row">` +
          `<div class="tw-pyramid-side tw-pyramid-side--l"><span class="tw-pyramid-v">${_esc(r.sL)}</span><div class="tw-pyramid-bar" style="width:${wL}%"></div></div>` +
          `<div class="tw-pyramid-mid">${_esc(r.label)}</div>` +
          `<div class="tw-pyramid-side tw-pyramid-side--r"><div class="tw-pyramid-bar" style="width:${wR}%"></div><span class="tw-pyramid-v">${_esc(r.sR)}</span></div>` +
          `</div>`
        );
      })
      .join('');
    const heads = `<div class="tw-pyramid-row tw-pyramid-heads"><div class="tw-pyramid-side tw-pyramid-side--l tw-pyramid-head">${_esc(nameL)}</div><div class="tw-pyramid-mid"></div><div class="tw-pyramid-side tw-pyramid-head">${_esc(nameR)}</div></div>`;
    return `<div class="tw-pyramid" role="group" aria-label="${_esc(modTitle || `${nameL} vs ${nameR}`)}">${_title}${heads}${body}</div>${_src}`;
  }

  if (lang === 'tw-tiles') {
    // 台灣 22 縣市 tile-grid cartogram（視覺主權：佈局寫死在 renderer，不靠 LLM 畫形狀，
    // per REFLEXES #61）。rows: `縣市 | 值 | (註)`。臺/台、市/縣字尾自動正規化；
    // 對不上 60% 以上就退化成 bars（翻譯版縣市名對不上時內容不會消失）。
    //
    // 2026-10-23 多語：磚上原本一律印 TILE_GRID 的中文名，譯版頁面磚上全是漢字；
    // 韓文、越南文、俄文、印地文寫自己文字的縣市名時對不上，整個模組退化成 bars
    //（型錄頁實測十三語有七語退化，資料台灣 v2.1 因此把人口密度改畫長條圖）。
    // 現在對應靠 TILE_NAMES 各語名稱＋行政字首字尾判讀；磚上與資料表印作者那一列
    // 的名稱，zh-TW 頁照舊印 TILE_GRID 短名（輸出跟改版前逐位元相同）。
    const TILE_GRID: (string | null)[][] = [
      ['連江', null, '台北', '基隆', null],
      [null, '桃園', '新北', '宜蘭', null],
      ['金門', '新竹市', '新竹縣', null, null],
      [null, '苗栗', '台中', '花蓮', null],
      [null, '彰化', '南投', null, null],
      ['澎湖', '雲林', '嘉義市', null, null],
      [null, '嘉義縣', '台南', null, null],
      [null, null, '高雄', '屏東', '台東'],
    ];
    // 各縣市在各語的標準名，欄位順序 [en, ko, vi, ru, hi, ar]。兩個用途：對應時當
    // 別名；空磚（該縣市沒有資料列）或作者把縣市名留成漢字沒翻時，當該語的顯示名。
    // 拉丁字母語言（en/es/fr/pt/de/id）共用 en 欄，靠去重音＋去行政字首字尾對上
    //（Ville de Taipei、Condado de Hsinchu、Kota Taipei 都摺成 taipei／hsinchu）。
    // 新竹、嘉義兩市兩縣同名，名稱必須帶行政字首字尾才分得開。
    // prettier-ignore
    const TILE_NAMES: Record<string, string[]> = {
      台北: ['Taipei', '타이베이', 'Đài Bắc', 'Тайбэй', 'ताइपे', 'تايبيه'],
      新北: ['New Taipei', '신베이', 'Tân Bắc', 'Синьбэй', 'न्यू ताइपे', 'تايبيه الجديدة'],
      基隆: ['Keelung', '지룽', 'Cơ Long', 'Цзилун', 'कीलुंग', 'كيلونغ'],
      桃園: ['Taoyuan', '타오위안', 'Đào Viên', 'Таоюань', 'ताओयुआन', 'تاويوان'],
      新竹市: ['Hsinchu City', '신주시', 'Thành phố Tân Trúc', 'Синьчжу (город)', 'ह्सिनचु शहर', 'مدينة هسينتشو'],
      新竹縣: ['Hsinchu County', '신주현', 'Huyện Tân Trúc', 'Синьчжу (уезд)', 'ह्सिनचु काउंटी', 'مقاطعة هسينتشو'],
      苗栗: ['Miaoli', '먀오리', 'Miêu Lật', 'Мяоли', 'मियाओली', 'مياولي'],
      台中: ['Taichung', '타이중', 'Đài Trung', 'Тайчжун', 'ताइचुंग', 'تايتشونغ'],
      彰化: ['Changhua', '장화', 'Chương Hóa', 'Чжанхуа', 'चांगहुआ', 'تشانغهوا'],
      南投: ['Nantou', '난터우', 'Nam Đầu', 'Наньтоу', 'नांतोउ', 'نانتو'],
      雲林: ['Yunlin', '윈린', 'Vân Lâm', 'Юньлинь', 'युनलिन', 'يونلين'],
      嘉義市: ['Chiayi City', '자이시', 'Thành phố Gia Nghĩa', 'Цзяи (город)', 'चियाई शहर', 'مدينة تشيايي'],
      嘉義縣: ['Chiayi County', '자이현', 'Huyện Gia Nghĩa', 'Цзяи (уезд)', 'चियाई काउंटी', 'مقاطعة تشيايي'],
      台南: ['Tainan', '타이난', 'Đài Nam', 'Тайнань', 'ताइनान', 'تاينان'],
      高雄: ['Kaohsiung', '가오슝', 'Cao Hùng', 'Гаосюн', 'काओशुंग', 'كاوشيونغ'],
      屏東: ['Pingtung', '핑둥', 'Bình Đông', 'Пиндун', 'पिंगतुंग', 'بينغتونغ'],
      宜蘭: ['Yilan', '이란', 'Nghi Lan', 'Илань', 'यिलान', 'ييلان'],
      花蓮: ['Hualien', '화롄', 'Hoa Liên', 'Хуалянь', 'हुआलिएन', 'هوالين'],
      台東: ['Taitung', '타이둥', 'Đài Đông', 'Тайдун', 'ताइतुंग', 'تايتونغ'],
      澎湖: ['Penghu', '펑후', 'Bành Hồ', 'Пэнху', 'पेंघु', 'بنغهو'],
      金門: ['Kinmen', '진먼', 'Kim Môn', 'Цзиньмэнь', 'किनमेन', 'كينمن'],
      連江: ['Lienchiang', '롄장', 'Liên Giang', 'Ляньцзян', 'लिएनच्यांग', 'ليانجيانغ'],
    };
    const TILE_COL: Record<string, number> = {
      ko: 1,
      vi: 2,
      ru: 3,
      hi: 4,
      ar: 5,
    };
    // 只拿來對應、不當顯示名的寫法：拼音、舊譯名、各語慣用外來名、babel 實測譯法
    //（de 型錄頁寫 Taibei／Xinbei、ru 寫 Синбэй／Чжаньхуа／Пэньху）。鍵是去掉市／縣的短名，
    // 新竹、嘉義的別名兩市兩縣共用。
    // prettier-ignore
    const TILE_ALIASES: Record<string, string[]> = {
      台北: ['Taipeh', 'Taibei', 'Taipéi', 'Taipé', '타이페이'],
      新北: ['Xinbei', 'Nuevo Taipéi', 'Nueva Taipéi', 'Novo Taipé', 'Nova Taipé', 'Nouveau Taipei', 'Nouvelle Taipei', 'Neu-Taipeh', 'Neu-Taipei', 'Taipei Baru', 'Tân Đài Bắc', 'Новый Тайбэй', 'Синбэй', 'نيو تايبيه'],
      基隆: ['Jilong', 'كيلونج'],
      新竹: ['Xinzhu', 'هسينشو', 'सिंचू', 'शिनचू'],
      台中: ['Taizhong', 'تايتشونج'],
      彰化: ['Zhanghua', 'Чжаньхуа', 'تشانغوا'],
      嘉義: ['Jiayi'],
      高雄: ['Gaoxiong', 'काऊशुंग', 'كاوهسيونغ'],
      屏東: ['Pingdong'],
      宜蘭: ['Ilan'],
      花蓮: ['Hualian', 'हुआलियन', 'هواليان'],
      台東: ['Taidong', 'تايتونج'],
      澎湖: ['Pescadores', 'Пэньху', 'पेंगहू'],
      金門: ['Jinmen', 'Quemoy', '금문'],
      連江: ['Lianjiang', 'Matsu', '馬祖', 'Мацзу', '마쭈'],
    };
    // 行政字首字尾 → 市或縣，只剝一層。直接比對作者原文（不分大小寫），所以重音
    // 寫法兩種都收（Comté／comte、Huyện／huyen）；剝下來的短名就是磚上印的名字。
    // prettier-ignore
    const TILE_AFFIX: [RegExp, 'city' | 'county'][] = [
      [/^(?:city of|ville de|ciudad de|cidade de|kota|thành phố|thanh pho|stadt|город|مدينة)\s+/iu, 'city'],
      [/(?:\s+|\s*\()(?:city|thị|thi|stadt|город|शहर)\)?$/iu, 'city'],
      [/(?<=\S)(?:市|시)$/u, 'city'],
      [/^(?:county of|comté de|comte de|condado de|kabupaten|huyện|huyen|landkreis|kreis|уезд|مقاطعة|محافظة)\s+/iu, 'county'],
      [/(?:\s+|\s*\()(?:county|huyện|huyen|landkreis|kreis|уезд|काउंटी)\)?$/iu, 'county'],
      [/(?<=\S)(?:縣|県|현)$/u, 'county'],
    ];
    // 拆成「短名＋市或縣」。空白一律摺成普通空格——babel 產物會夾 U+202F 窄不斷行
    // 空格（New Taipei），不摺就對不上，也不能在磚內折行。
    const splitCounty = (raw: string) => {
      const full = raw.replace(/\s+/g, ' ').trim();
      for (const [re, kind] of TILE_AFFIX) {
        const stem = full.replace(re, '').trim();
        if (stem && stem !== full) return { full, stem, kind };
      }
      return { full, stem: full, kind: '' as const };
    };
    // 對應用的鍵：小寫、去重音、臺→台、括號與連字號換成空白。2026-07-16 審計：
    // EN 譯版寫「Taipei City」、JA 譯版寫「新竹県」都曾對不上 → 譯版磚圖必然退化。
    // 去重音只剝 U+0300–036F 這段組合附加符號：拉丁字母與越南文的聲調在這裡，
    // 天城文母音符號、阿拉伯文標音不在這段，不會被誤剝。
    const countyKey = (stem: string) =>
      stem
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .normalize('NFC')
        .replace(/[đĐ]/g, 'd')
        .replace(/臺/g, '台')
        .toLowerCase()
        .replace(/[()（）\-\u2010\u2013]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    // 短名 → 候選格名。一般縣市只有一個候選；新竹、嘉義有市、縣兩個。
    const tileIndex = new Map<string, string[]>();
    for (const grid of TILE_GRID.flat()) {
      if (!grid) continue;
      const short = grid.replace(/[市縣]$/, '');
      const names = [grid, ...TILE_NAMES[grid], ...(TILE_ALIASES[short] ?? [])];
      for (const n of names) {
        const key = countyKey(splitCounty(n).stem);
        const cands = tileIndex.get(key) ?? [];
        if (!cands.includes(grid)) cands.push(grid);
        tileIndex.set(key, cands);
      }
    }
    // 磚上印哪個名字，比照 zh-TW 的 TILE_GRID：短名（台北不寫臺北市），只有新竹、
    // 嘉義這四格要帶市或縣才分得開。其他語言取作者那一列剝掉行政字首字尾
    //（Ville de Taipei → Taipei、타이베이시 → 타이베이）；新竹、嘉義印作者整列原文。
    // 作者把縣市名留成漢字、頁面語言又不用漢字時（ar 型錄頁就是），改印該語標準名；
    // 空磚沒有作者那一列，一樣印該語標準名。手機上一格只有 52px 寬，
    //「Comté de Lienchiang」整串放不進去，這也是磚上不印全名的原因。
    const tileLabel = (
      grid: string,
      row?: { raw: string; full: string; stem: string },
    ) => {
      if (_lang === 'zh-TW') return grid;
      const pairCell = /[市縣]$/.test(grid);
      if (row && (_lang === 'ja' || !/\p{Script=Han}/u.test(row.raw)))
        return pairCell ? row.full : row.stem;
      if (_lang === 'ja') return grid.replace('縣', '県');
      return TILE_NAMES[grid][TILE_COL[_lang] ?? 0];
    };
    const rows = lines
      .map((l) => {
        const c = l.split('|').map((s) => s.trim());
        const raw = c[0] || '';
        const { full, stem, kind } = splitCounty(raw);
        const cands = tileIndex.get(countyKey(stem)) ?? [];
        const suffix = kind === 'city' ? '市' : '縣';
        const grid =
          cands.length === 1
            ? cands[0]
            : (kind && cands.find((g) => g.endsWith(suffix))) || '';
        const pair = !kind && cands.length > 1 ? cands : null;
        const val = c[1] || '';
        return { raw, full, stem, val, num: _num(val), grid, pair };
      })
      .filter((r) => r.raw);
    if (rows.length === 0) return '';
    // 新竹、嘉義沒寫市或縣（de/es/pt 譯版常把市寫成裸名 Hsinchu、縣寫 Hsinchu
    // County）：等其他列都對完，再補進還空著的那一格，市優先。
    const taken = new Set(rows.map((r) => r.grid).filter(Boolean));
    for (const r of rows) {
      if (!r.pair) continue;
      r.grid = r.pair.find((g) => !taken.has(g)) ?? '';
      if (r.grid) taken.add(r.grid);
    }
    const byCounty = new Map<
      string,
      { val: string; num: number; name: string }
    >();
    const unmatched: string[] = [];
    rows.forEach((r) => {
      if (r.grid)
        byCounty.set(r.grid, {
          val: r.val,
          num: r.num,
          name: tileLabel(r.grid, r),
        });
      else unmatched.push(r.raw);
    });
    if (byCounty.size / rows.length < 0.6) {
      // 縣市名對不上（多半是翻譯版）→ 退化成排序 bars，內容不消失
      const barsLines = [...rows]
        .sort((a, b) => b.num - a.num)
        .map((r) => `${r.raw} | ${r.val}`)
        .join('\n');
      return `<div class="tw-tiles tw-tiles--fallback">${_title}${renderTwModule('tw-bars', barsLines)}</div>${_src}`;
    }
    const nums = [...byCounty.values()]
      .map((e) => e.num)
      .filter((v) => !isNaN(v));
    const tMin = Math.min(...nums),
      tMax = Math.max(...nums);
    const range = tMax - tMin || 1;
    // 譯名比中文短名長（Lienchiang、Condado de Hsinchu）：超過 8 個字元准許折行、
    // 手機縮一級字，整陣標 --long 讓每列等高。中文短名最多三字，不會碰到這條。
    let anyLong = false;
    const nameSpan = (label: string) => {
      const long = [...label].length > 8;
      anyLong ||= long;
      return `<span class="tw-tiles-name${long ? ' tw-tiles-name--long' : ''}">${_esc(label)}</span>`;
    };
    const cells = TILE_GRID.flat()
      .map((name) => {
        if (!name) return `<i class="tw-tiles-gap" aria-hidden="true"></i>`;
        const e = byCounty.get(name);
        const label = e ? e.name : tileLabel(name);
        if (!e || isNaN(e.num))
          return `<div class="tw-tiles-cell tw-tiles-cell--empty">${nameSpan(label)}<b class="tw-tiles-val">–</b></div>`;
        const i = (e.num - tMin) / range;
        return `<div class="tw-tiles-cell${i >= 0.55 ? ' tw-hm-hi' : ''}" style="--i:${i.toFixed(2)}">${nameSpan(label)}<b class="tw-tiles-val">${_esc(e.val)}</b></div>`;
      })
      .join('');
    // 色階兩端印作者寫的數值字串，不印解析後的數字：_num 把逗號一律當千分位，
    // fr/de/pt/id/ru/vi 譯版寫的「24,18」會變成 2418。磚的顏色是相對值不受影響，
    // 但端點標籤會放大一百倍（2026-10-24 fr 截圖抓到「1,508 — 2,418」）。
    const endLabel = (n: number) =>
      [...byCounty.values()].find((e) => e.num === n)?.val ?? _fmt(n);
    const scale = `<div class="tw-tiles-scale"><span>${_esc(endLabel(tMin))}</span><i class="tw-tiles-grad" aria-hidden="true"></i><span>${_esc(endLabel(tMax))}</span></div>`;
    const warn = unmatched.length
      ? `<p class="tw-tiles-warn">${_esc(_locale.unmatched)}${unmatched.map(_esc).join(_locale.listSep)}</p>`
      : '';
    const tbody = [...byCounty.values()]
      .map(
        (e) =>
          `<tr><th scope="row">${_esc(e.name)}</th><td>${_esc(e.val)}</td></tr>`,
      )
      .join('');
    const table = `<table class="tw-sr-only"><caption>${_esc(modTitle || _locale.tilesAria)}</caption><thead><tr><th scope="col">${_esc(_locale.county)}</th><th scope="col">${_esc(_locale.value)}</th></tr></thead><tbody>${tbody}</tbody></table>`;
    return `<div class="tw-tiles" role="group" aria-label="${_esc(modTitle || _locale.tilesAria)}">${_title}<div class="tw-tiles-grid${anyLong ? ' tw-tiles-grid--long' : ''}">${cells}</div>${scale}${warn}${table}</div>${_src}`;
  }

  if (lang === 'tw-iso') {
    // 單位圖（isotype）：把大數字換成可以數的符號（FT：只用整數，符號不切半）。
    // 選填 config 列：`單位：⬤ = 20000 戶`；rows: `標籤 | 值 | (註)`
    let glyph = '●',
      per = 1,
      unitLabel = '';
    const um = (lines[0] || '').match(
      /^單位\s*[:：]\s*(\S+)?\s*[=＝]\s*([\d,.]+)\s*(.*)$/,
    );
    if (um) {
      if (um[1]) glyph = um[1];
      per = parseFloat(um[2].replace(/,/g, '')) || 1;
      unitLabel = (um[3] || '').trim();
      lines.shift();
    }
    const rows = lines
      .map((l) => {
        const c = l.split('|').map((s) => s.trim());
        return {
          label: c[0] || '',
          val: c[1] || '',
          num: _num(c[1] || ''),
          note: c[2] || '',
        };
      })
      .filter((r) => !isNaN(r.num));
    if (rows.length === 0) return '';
    const body = rows
      .map((r, ri) => {
        const count = Math.max(0, Math.min(60, Math.round(r.num / per)));
        const units = Array.from(
          { length: count },
          () =>
            `<span class="tw-iso-unit" data-cat="${ri % 5}">${_esc(glyph)}</span>`,
        ).join('');
        return `<div class="tw-iso-row"><div class="tw-iso-label">${_esc(r.label)}</div><div class="tw-iso-units" aria-hidden="true">${units}</div><div class="tw-iso-val">${_esc(r.val)}${r.note ? `<span class="tw-bars-note"> ${_esc(r.note)}</span>` : ''}</div></div>`;
      })
      .join('');
    const key = `<p class="tw-iso-key">${_esc(glyph)} ≈ ${_esc(_fmt(per))}${unitLabel ? ` ${_esc(unitLabel)}` : ''}</p>`;
    return `<div class="tw-iso">${_title}${body}${key}</div>${_src}`;
  }

  if (lang === 'tw-arc') {
    // 席次弧（parliament chart，v3.0）：半圓點陣、每席一點，政黨依列出順序連續填入
    // 成扇形楔（graph.md §四）。config 列 `過半：N`（省略 = ⌊total/2⌋+1；0 = 不畫）。
    // 配色用中性 data-cat 五色盤——政黨官方色映射是策展決策，涉政治色彩語意（§九 v4）。
    let majority = -1;
    const mj = (lines[0] || '').match(/^過半\s*[:：]\s*(\d+)/);
    if (mj) {
      majority = parseInt(mj[1], 10);
      lines.shift();
    }
    const rows = lines
      .map((l) => {
        const c = l.split('|').map((s) => s.trim());
        return {
          label: c[0] || '',
          seats: Math.round(_num(c[1] || '')),
          sVal: c[1] || '',
          note: c[2] || '',
        };
      })
      .filter((r) => r.label && !isNaN(r.seats) && r.seats > 0);
    const total = rows.reduce((a, r) => a + r.seats, 0);
    if (total === 0) return '';
    if (majority < 0) majority = Math.floor(total / 2) + 1;

    // 座位幾何：環數依 total 定，各環容量按半徑比例分（最大餘數法），
    // 環內沿 180°→0° 均勻分布；全部座位照角度左→右排序後依政黨順序填入。
    const rings = total <= 30 ? 2 : total <= 80 ? 3 : total <= 150 ? 4 : 5;
    const R0 = 70,
      R1 = 180,
      acx = 200,
      acy = 215;
    const radii = Array.from(
      { length: rings },
      (_, i) => R0 + (i * (R1 - R0)) / (rings - 1),
    );
    const radiusSum = radii.reduce((a, b) => a + b, 0);
    const floors = radii.map((r) => Math.floor((total * r) / radiusSum));
    const remain = total - floors.reduce((a, b) => a + b, 0);
    const fracs = radii
      .map((r, i) => ({ i, f: (total * r) / radiusSum - floors[i] }))
      .sort((a, b) => b.f - a.f);
    for (let k = 0; k < remain; k++) floors[fracs[k % fracs.length].i]++;
    const seats: { x: number; y: number; angle: number; ring: number }[] = [];
    floors.forEach((cnt, ri) => {
      for (let j = 0; j < cnt; j++) {
        const angle =
          cnt === 1 ? Math.PI / 2 : Math.PI - (j / (cnt - 1)) * Math.PI;
        seats.push({
          x: acx + radii[ri] * Math.cos(angle),
          y: acy - radii[ri] * Math.sin(angle),
          angle,
          ring: ri,
        });
      }
    });
    seats.sort((a, b) => b.angle - a.angle || a.ring - b.ring);
    const dotR = rings <= 2 ? 7 : rings === 3 ? 6 : 5;
    let g = '';
    let seatIdx = 0;
    rows.forEach((r, pi) => {
      for (let k = 0; k < r.seats && seatIdx < seats.length; k++, seatIdx++) {
        const s = seats[seatIdx];
        g += `<circle class="tw-arc-dot" data-cat="${pi % 5}" cx="${s.x.toFixed(1)}" cy="${s.y.toFixed(1)}" r="${dotR}"/>`;
      }
    });
    // 過半線：第 majority 席與前一席的角度中線，畫內半徑到外半徑的徑向虛線＋標籤
    if (majority > 0 && majority <= total) {
      const aAt = seats[majority - 1].angle;
      const aPrev = majority >= 2 ? seats[majority - 2].angle : Math.PI;
      const am = (aAt + aPrev) / 2;
      const x1 = acx + (R0 - 14) * Math.cos(am),
        y1 = acy - (R0 - 14) * Math.sin(am);
      const x2 = acx + (R1 + 10) * Math.cos(am),
        y2 = acy - (R1 + 10) * Math.sin(am);
      g += `<line class="tw-arc-majority" x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"/>`;
      const lx = Math.min(376, Math.max(24, acx + (R1 + 14) * Math.cos(am)));
      const ly = Math.max(12, acy - (R1 + 22) * Math.sin(am));
      g += `<text class="tw-arc-majlab" x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" text-anchor="middle">${_esc(_locale.majority)} ${majority}</text>`;
    }
    // 半圓中心放總席次（內圈空間的 direct labeling）
    g += `<text class="tw-arc-total" x="${acx}" y="${acy - 10}" text-anchor="middle">${total}</text>`;
    const aria =
      modTitle || rows.map((r) => `${r.label} ${r.seats}`).join('、');
    const svg = `<svg class="tw-arc-plot" viewBox="0 0 400 235" role="img" aria-label="${_esc(aria)}" xmlns="http://www.w3.org/2000/svg"><title>${_esc(aria)}</title>${g}</svg>`;
    const legend = rows
      .map(
        (r, pi) =>
          `<span class="tw-arc-key"><span class="tw-arc-swatch" data-cat="${pi % 5}"></span>${_esc(r.label)} <b>${_esc(r.sVal)}</b>${r.note ? `<span class="tw-bars-note"> ${_esc(r.note)}</span>` : ''}</span>`,
      )
      .join('');
    const tbody = rows
      .map(
        (r) =>
          `<tr><th scope="row">${_esc(r.label)}</th><td>${_esc(r.sVal)}</td></tr>`,
      )
      .join('');
    const table = `<table class="tw-sr-only"><caption>${_esc(aria)}</caption><thead><tr><th scope="col"></th><th scope="col">${_esc(_locale.value)}</th></tr></thead><tbody>${tbody}</tbody></table>`;
    return `<figure class="tw-arc">${_title}${svg}<div class="tw-arc-legend">${legend}</div>${table}</figure>${_src}`;
  }

  if (lang === 'tw-multiples') {
    // 小倍數折線網格（v3.0）：`--- 群組名` 分隔各組、全部群組共用 y 值域
    // （small multiples 鐵律：不共軸就不可比，graph.md §四）。每格首尾兩值直接標
    // （direct labeling），不畫個別 y 軸。群組名 `*` 前綴 = 強調、其餘退灰。
    let xName = '',
      yName = '';
    if (/^欄\s*[:：]/.test(lines[0] || '')) {
      const c = (lines.shift() as string)
        .replace(/^欄\s*[:：]\s*/, '')
        .split('|')
        .map((s) => s.trim());
      xName = c[0] || '';
      yName = c[1] || '';
    }
    const groups: {
      name: string;
      hi: boolean;
      pts: { x: string; v: number; sV: string }[];
    }[] = [];
    lines.forEach((l) => {
      const gm = l.match(/^---\s*(.+)$/);
      if (gm) {
        const { label, hi } = _emph(gm[1].trim());
        groups.push({ name: label, hi, pts: [] });
        return;
      }
      if (groups.length === 0) return;
      const c = l.split('|').map((s) => s.trim());
      const v = _num(c[1] || '');
      if (c[0] && !isNaN(v))
        groups[groups.length - 1].pts.push({ x: c[0], v, sV: c[1] });
    });
    const gs = groups.filter((gr) => gr.pts.length >= 2);
    if (gs.length === 0) return '';
    const allV = gs.flatMap((gr) => gr.pts.map((p) => p.v));
    let yMin = Math.min(...allV),
      yMax = Math.max(...allV);
    if (yMin === yMax) {
      yMin -= 1;
      yMax += 1;
    }
    const padV = (yMax - yMin) * 0.07;
    yMin -= padV;
    yMax += padV;
    const anyHi = gs.some((gr) => gr.hi);
    const MW = 150,
      MH = 92,
      mmL = 8,
      mmR = 42,
      mmT = 12,
      mmB = 18;
    const cells = gs
      .map((gr) => {
        const n = gr.pts.length;
        const sx = (i: number) => mmL + (i / (n - 1)) * (MW - mmL - mmR);
        const sy = (v: number) =>
          mmT + (1 - (v - yMin) / (yMax - yMin)) * (MH - mmT - mmB);
        const line = gr.pts
          .map((p, i) => `${sx(i).toFixed(1)},${sy(p.v).toFixed(1)}`)
          .join(' ');
        const first = gr.pts[0];
        const last = gr.pts[n - 1];
        const base = (MH - mmB).toFixed(1);
        let mg = '';
        mg += `<line class="tw-line-axis" x1="${mmL}" y1="${base}" x2="${(MW - 8).toFixed(1)}" y2="${base}"/>`;
        mg += `<polygon class="tw-mult-area" points="${sx(0).toFixed(1)},${base} ${line} ${sx(n - 1).toFixed(1)},${base}"/>`;
        mg += `<polyline class="tw-mult-path" points="${line}"/>`;
        mg += `<circle class="tw-mult-dot" cx="${sx(n - 1).toFixed(1)}" cy="${sy(last.v).toFixed(1)}" r="2.5"/>`;
        mg += `<text class="tw-mult-lab" x="${(sx(0) + 2).toFixed(1)}" y="${(sy(first.v) - 5).toFixed(1)}" text-anchor="start">${_esc(first.sV)}</text>`;
        mg += `<text class="tw-mult-lab" x="${(sx(n - 1) + 4).toFixed(1)}" y="${(sy(last.v) + 3.5).toFixed(1)}" text-anchor="start">${_esc(last.sV)}</text>`;
        mg += `<text class="tw-mult-xlab" x="${mmL}" y="${MH - 4}" text-anchor="start">${_esc(first.x)}</text>`;
        mg += `<text class="tw-mult-xlab" x="${sx(n - 1).toFixed(1)}" y="${MH - 4}" text-anchor="end">${_esc(last.x)}</text>`;
        return `<figure class="tw-mult-cell${gr.hi ? ' tw-mult-cell--hi' : ''}"><figcaption class="tw-mult-name">${_esc(gr.name)}</figcaption><svg class="tw-mult-plot" viewBox="0 0 ${MW} ${MH}" role="img" aria-label="${_esc(gr.name)}" xmlns="http://www.w3.org/2000/svg"><title>${_esc(gr.name)}</title>${mg}</svg></figure>`;
      })
      .join('');
    const tbody = gs
      .map((gr) =>
        gr.pts
          .map(
            (p) =>
              `<tr><th scope="row">${_esc(gr.name)}</th><td>${_esc(p.x)}</td><td>${_esc(p.sV)}</td></tr>`,
          )
          .join(''),
      )
      .join('');
    const table = `<table class="tw-sr-only"><caption>${_esc(modTitle)}</caption><thead><tr><th scope="col"></th><th scope="col">${_esc(xName)}</th><th scope="col">${_esc(yName || _locale.value)}</th></tr></thead><tbody>${tbody}</tbody></table>`;
    return `<div class="tw-multiples${anyHi ? ' tw-multiples--focus' : ''}">${_title}<div class="tw-mult-grid">${cells}</div>${table}</div>${_src}`;
  }

  if (lang === 'tw-note') {
    // 方法論盒／更正註記（報導者【說明】/(註) 公約；error boundary = traceability）。
    // line1 可為 `說明` / `方法` / `註` / `更正` / `更新` 之一；其餘列各自成段。
    let kind = '說明';
    if (lines[0] && /^(說明|方法|註|更正|更新)$/.test(lines[0])) {
      kind = lines.shift() as string;
    }
    if (lines.length === 0) return '';
    const warn = kind === '註' || kind === '更正';
    const bodyHtml = lines.map((l) => `<p>${_escText(l)}</p>`).join('');
    return `<aside class="tw-note${warn ? ' tw-note--warn' : ''}"><span class="tw-note-chip">【${_esc(kind)}】</span><div class="tw-note-body">${bodyHtml}</div></aside>${_src}`;
  }

  return '';
}

/**
 * 文章以外的頁面（/data 資料中樞）重用同一套 tw-* 模組：同樣的語法、同樣的
 * 資料表 fallback 與來源 caption，UI 字串跟著頁面語言走。renderArticleHtml
 * 會改寫模組層的 _locale，這裡借用後還原，不影響同一個 build 裡的文章頁。
 */
export function renderVizBlock(
  fence: string,
  body: string,
  pageLang: string = 'zh-TW',
): string {
  const prev = _locale;
  const prevLang = _lang;
  _locale =
    VIZ_STRINGS[pageLang as keyof typeof VIZ_STRINGS] ?? VIZ_STRINGS['zh-TW'];
  _lang = pageLang;
  try {
    return renderTwModule(fence, body);
  } finally {
    _locale = prev;
    _lang = prevLang;
  }
}

renderer.code = ({ text, lang }) => {
  if (lang && lang.startsWith('tw-')) {
    const html = renderTwModule(lang, text);
    if (html) return html;
  }
  const langClass = lang ? ` class="language-${lang}"` : '';
  return `<pre><code${langClass}>${_esc(text)}</code></pre>`;
};

// ── Footnote preprocessor (GFM-compatible [^n] syntax) ──────────────────────
//
// 同一條腳註在正文被引用 N 次，就會有 N 個 `<sup>`。2026-08-28 之前這 N 個
// 全部掛同一個 `id="fnref-{label}"`——全站量出來 **72.6% 有腳註的檔案帶著重複
// id，合計 76,318 個**（最兇的〈北投溫泉街〉29 條定義被引用 144 次，單頁 115
// 個重複；單一腳註被引用最多的一條是 28 次）。後果有三層：HTML 不合法、
// 螢幕閱讀器在重複 id 上的行為未定義、而且文末那個 `↩` **永遠只跳得回第一次
// 出現的位置**——讀者在第五次引用處點下去，回來會落在文章開頭。
//
// 修法是給每個出現位置各自的 id：第一次維持 `fnref-{label}`（既有的外部深連結
// 與書籤不會斷），第二次起加序號 `fnref-{label}-2`、`-3`⋯。文末的定義則從單一
// `↩` 變成「一個 `↩` 加上第 2 起的上標序號」，每個各自指回它那次出現的位置，
// 跟 pandoc / GFM 的慣例一致。
function processFootnotes(md: string): string {
  // Collect footnote definitions: [^label]: content (may span rest of line)
  const definitions: Record<string, string> = {};
  const defRegex = /^\[\^([^\]]+)\]:\s*(.+?)(?=\n\[\^|\n\n|\n#|\n---|\s*$)/gms;
  let m: RegExpExecArray | null;
  while ((m = defRegex.exec(md)) !== null) {
    definitions[m[1]] = m[2].trim();
  }
  if (Object.keys(definitions).length === 0) return md;

  // Order of first use in the text
  const order: string[] = [];
  // 每個 label 被引用了幾次 —— 決定文末要放幾個返回箭頭
  const uses: Record<string, number> = {};
  let body = md.replace(defRegex, ''); // remove definitions from body

  // 第 k 次出現的 <sup> id。k=1 沿用舊的 `fnref-{label}`，讓改版前就存在的
  // 深連結、書籤、外站引用不會斷；k≥2 才加序號。
  const refIdAt = (label: string, k: number) =>
    k === 1 ? `fnref-${label}` : `fnref-${label}-${k}`;

  // Replace inline refs [^label] → superscript HTML
  //
  // 這裡**不能**用 `(?!:)` 排除「後面接冒號」的形式。定義行（行首的 `[^N]:`）
  // 在上面 `md.replace(defRegex, '')` 就已經從 body 移除了，所以剩下的
  // `[^N]:` 一定是**行中**的參照後面接冒號——那是中文/翻譯常見的句法
  // （「…值得一提[^13]：」），是真正的引用，卻因為這個 lookahead 被跳過，
  // 結果是標籤從未進入 `order` → 文末不輸出 `<li id="fn-N">` → 讀者看到的是
  // 一個沒有上標、也沒有文末條目的孤兒字面 `[^13]`。
  //
  // 2026-10-21 全庫實測（真實 renderer 跑 15,045 檔，逐檔比對修前/修後）：
  // 1,909 個讀者看得到的孤兒字面 `[^N]` 全部變成有上標、有文末條目的真腳註，
  // 涉及 907 個檔案（es/ru/pt/de/vi/ar/id/en/hi/ko 都有）。修掉之後：
  // 0 個檔案變差、0 個文末條目被移除、0 個新增的孤兒字面。
  //
  // 唯一要顧的是「空內容定義」：renderer 對 `[^N]:`（冒號後沒東西）視為
  // 未定義（`definitions[N]` 是 falsy），這裡沿用同一個判準。
  body = body.replace(/\[(\^[^\]]+)\]/g, (_, raw) => {
    const label = raw.slice(1); // strip leading ^
    if (!definitions[label]) return `[${raw}]`;
    if (!order.includes(label)) order.push(label);
    const num = order.indexOf(label) + 1;
    const k = (uses[label] = (uses[label] || 0) + 1);
    const id = `fn-${label}`;
    return `<sup id="${refIdAt(label, k)}"><a href="#${id}" class="footnote-ref" aria-label="${_locale.fnAria} ${num}">${num}</a></sup>`;
  });

  // Build footnotes section
  if (order.length > 0) {
    const items = order.map((label, i) => {
      const num = i + 1;
      const id = `fn-${label}`;
      const times = uses[label] || 1;
      // 引用一次就一個乾淨的 ↩；引用多次時第一個仍是 ↩，其餘用上標序號，
      // 讀者能挑「回到第幾次引用的地方」。aria-label 帶括號序號區分，
      // 不新增語言字串（VIZ_STRINGS 是 Record<Lang> 型別鎖，加欄位要動 12 語）。
      const backrefs = Array.from({ length: times }, (_, j) => {
        const k = j + 1;
        const aria =
          k === 1
            ? `${_locale.fnBackAria} ${num}`
            : `${_locale.fnBackAria} ${num} (${k})`;
        const glyph = k === 1 ? '↩' : `<sup>${k}</sup>`;
        return `<a href="#${refIdAt(label, k)}" class="footnote-backref" aria-label="${aria}">${glyph}</a>`;
      }).join('');
      // Process links inside footnote text via marked inline parser
      const defHtml = marked.parseInline(definitions[label]) as string;
      return `<li id="${id}">${defHtml}${backrefs}</li>`;
    });
    body =
      body.trimEnd() +
      `\n\n<section class="footnotes" aria-label="${_locale.fnSection}"><ol>${items.join('')}</ol></section>`;
  }

  return body;
}

// ── 首圖去重（渲染層判斷，不動 knowledge/ 資料層）────────────────────────────
// 有一批文章的正文自己就放了 frontmatter 宣告的那張首圖（作者寫 `![](…)` 加一行
// 圖說），樣板又在正文前補一張同一張 → 同一張圖連著出現兩次。修在渲染層而不是回頭
// 改資料，跟下面「正文開頭那個跟 title 重複的 H1 直接拿掉」是同一種處理：資料層照
// 舊，畫面上只出現一次。誰讓位的判準是**以文章為準**——正文那張是作者選的位置、
// 配了自己的圖說，樣板那張退場。
//
// 唯一不能順手弄丟的是姓名標示：正文那張沒寫圖說時，把 frontmatter 的
// 來源 / 授權 / 原始連結掛到它底下（house style 的圖說就住在同一個 <p> 裡，
// 掛進去直接吃到現成的 caption 樣式），不然 CC BY-SA 的圖會變成沒署名。
//
// 太深就不讓位：正文那張擺在文章中段時（如台中市在第 73 個段落才出現），讓位會讓
// 整篇開頭變成沒有圖，而那兩張離得夠遠、讀者不會讀成同一張重複。門檻用實測定：
// 量文章起點到正文那張圖的距離，6 段 ≈ 1.2 個螢幕、9 段 ≈ 1.8、11 段 ≈ 2.2、
// 16 段 ≈ 3.1（1085px 高的視窗）。抓「還在開頭兩個螢幕內」= 前 10 個段落級區塊。
// 用區塊數不用字數，因為字數跨語言差 2-3 倍、區塊數翻譯後是 1:1 的。
export interface HeroImageInfo {
  /** frontmatter.image；空值等於這篇沒宣告首圖 */
  src?: string;
  /** 樣板組好的來源字串（已 i18n、已 escape），只在正文那張沒圖說時掛上 */
  creditHtml?: string;
}

const _HERO_IMG_TAG = /<img\b[^>]*\bsrc\s*=\s*["']([^"']+)["'][^>]*>/gi;
const _BLOCK_TAG = /<(p|h2|h3|blockquote|ul|ol|figure|table)[\s>]/gi;
/** 正文那張圖要在前幾個段落級區塊內出現才算「同一個開頭」（見上方實測） */
const HERO_DEDUPE_MAX_BLOCKS = 10;

/**
 * 圖片路徑正規化：query / hash 去掉、自家絕對網址收成站內路徑、percent-encoding
 * 解回原字。marked 會對 markdown 圖片 href 跑 encodeURI，所以中文檔名在正文是
 * `%E4%B8%AD…` 而 frontmatter 是原字，不解碼兩邊永遠對不起來。
 */
function normalizeImageSrc(src?: string): string {
  let s = String(src || '').trim();
  if (!s) return '';
  s = s.split(/[?#]/)[0];
  s = s.replace(/^https?:\/\/(?:www\.)?taiwan\.md/i, '');
  try {
    s = decodeURIComponent(s);
  } catch {
    /* 壞掉的 escape sequence：維持原字比整篇炸掉好 */
  }
  return s.replace(/^\.\//, '').normalize('NFC').toLowerCase();
}

/**
 * 正文那張圖已經有作者寫的圖說了嗎。
 * 判準是「同一段裡除了 `<img>` 還有沒有文字」而不是「有沒有 `<em>`」：house style
 * 的圖說是圖片下一行的 `_…_`，但有幾篇結尾的底線被跳脫成 `\_`，斜體沒收起來、
 * 渲染出來是純文字——那仍然是作者寫好的圖說，只是樣式壞了，不該再補一行來源。
 * 圖不在段落裡（未來換 `<figure>` 之類）一律當作有圖說：不確定就不要動它。
 */
function bodyImageHasOwnCaption(
  html: string,
  imgStart: number,
  close: number,
): boolean {
  const open = html.lastIndexOf('<p', imgStart);
  if (open === -1 || html.slice(open, imgStart).includes('</p>')) return true;
  const text = html
    .slice(open, close)
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .trim();
  if (text) return true;
  // 圖說跟圖之間空一行的寫法：下一段整段是斜體
  return /^\s*<p>\s*<em[\s>]/i.test(html.slice(close + 4, close + 48));
}

function dedupeHeroImage(html: string, hero?: HeroImageInfo) {
  const target = normalizeImageSrc(hero?.src);
  if (!target) return { html, heroImageInBody: false };

  _HERO_IMG_TAG.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = _HERO_IMG_TAG.exec(html)) !== null) {
    if (normalizeImageSrc(m[1]) !== target) continue;

    // 太深就不讓位：這張已經是文章中段的插圖，不是開頭那張的重複
    const blocksAbove = (html.slice(0, m.index).match(_BLOCK_TAG) || []).length;
    if (blocksAbove > HERO_DEDUPE_MAX_BLOCKS) break;

    const imgEnd = m.index + m[0].length;
    const close = html.indexOf('</p>', imgEnd);
    if (
      hero?.creditHtml &&
      close !== -1 &&
      !bodyImageHasOwnCaption(html, m.index, close)
    ) {
      html =
        html.slice(0, close) +
        `<br><em>${hero.creditHtml}</em>` +
        html.slice(close);
    }
    return { html, heroImageInBody: true };
  }
  return { html, heroImageInBody: false };
}

// ── Title-dedup → wikilink → footnote → marked → 首圖去重 → 延伸閱讀 split ───
// 1:1 對應 template 原 frontmatter 行為：strip 開頭重複 H1、跑 marked、
// 找 延伸閱讀 split 點（SSODT sections 插入位置）。splitIndex === -1 表示沒找到。
// 首圖去重排在 split 之前：它可能往 HTML 裡插一行來源，splitIndex 要算在插完之後
// 的字串上，不然 SSODT 區塊會插錯位置。
export interface RenderedArticle {
  fullHtml: string;
  splitIndex: number;
  /** 正文自己已經放了首圖 → 樣板頂端那張讓位 */
  heroImageInBody: boolean;
}

export function renderArticleHtml(
  title: string,
  content: string,
  lang: string = 'zh-TW',
  heroImage?: HeroImageInfo,
): RenderedArticle {
  // 依頁面語言選 renderer UI 字串（見檔頭 i18n 註解與 _locale 的同步假設）
  _locale =
    VIZ_STRINGS[lang as keyof typeof VIZ_STRINGS] ?? VIZ_STRINGS['zh-TW'];
  _lang = lang;
  // Strip a leading `# Title` heading when it duplicates the frontmatter title
  // — ArticleHero already renders the title as the H1 of the page, and ~40%
  // of zh-TW articles still include `# {Title}` as the first body line. The
  // duplicate visually competes with the hero title. Operate on raw markdown
  // (before footnote / wikilink processing) so the regex only sees `# Title`,
  // not an HTML element with id attributes injected by marked.
  const _titleEsc = String(title).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const bodyMarkdown = content.replace(
    new RegExp(`^\\s*#\\s+${_titleEsc}\\s*\\n+`),
    '',
  );

  const parsedHtml = marked.parse(
    processFootnotes(resolveWikilinks(bodyMarkdown)),
    {
      renderer,
      breaks: true,
    },
  ) as string;

  const { html: fullHtml, heroImageInBody } = dedupeHeroImage(
    parsedHtml,
    heroImage,
  );

  // Split content before 延伸閱讀/Further Reading to insert SSODT sections
  // 2026-05-03 fix: bold paragraph format `**延伸閱讀**：` was silently broken
  // — splitIndex stayed -1 → SSODT sections (SporeFootprint / Perspectives /
  // DiaryTeaser) didn't render despite hasSSoDT=true. Per format-check both
  // `## 延伸閱讀` (h2) and `**延伸閱讀**` (bold p) are canonical accepted formats
  // — template MUST also accept both. 121 articles use bold format vs 95 h2.
  const splitMarkers = [
    '<h2>延伸閱讀</h2>',
    '<h2>Further Reading</h2>',
    '<h2>延伸閱讀<',
    '<p><strong>延伸閱讀</strong>',
    '<p><strong>Further Reading</strong>',
  ];
  let splitIndex = -1;
  for (const marker of splitMarkers) {
    const idx = fullHtml.indexOf(marker);
    if (idx !== -1) {
      splitIndex = idx;
      break;
    }
  }
  // Also try id-based h2 (marked adds ids)
  if (splitIndex === -1) {
    const idMatch = fullHtml.match(/<h2[^>]*id="[^"]*"[^>]*>延伸閱讀/);
    if (idMatch && idMatch.index !== undefined) splitIndex = idMatch.index;
  }
  // Final fallback: any <p><strong> containing 延伸閱讀 (handles whitespace variants)
  if (splitIndex === -1) {
    const pMatch = fullHtml.match(/<p>\s*<strong>\s*延伸閱讀/);
    if (pMatch && pMatch.index !== undefined) splitIndex = pMatch.index;
  }

  return { fullHtml, splitIndex, heroImageInBody };
}
