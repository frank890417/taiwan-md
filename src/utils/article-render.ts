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
import { marked } from 'marked';
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
    tilesAria: 'Карта данных по уездам Тайваня',
    waffleAria: 'Вафельная диаграмма',
    fnAria: 'Сноска',
    fnBackAria: 'Вернуться к ссылке',
    fnSection: 'Сноски',
    majority: 'Большинство',
  },
};
// module scope：整個 build 只有一份，renderArticleHtml 每次呼叫開頭覆寫。
// 安全性建立在「marked.parse() 是同步呼叫、_locale 賦值到 parse 完成之間沒有
// await」──JS 單執行緒下不會被其他 renderArticleHtml 呼叫插入打斷，一次 parse
// 用到底都是同一個 lang。若未來 renderTwModule 或 processFootnotes 被改成 async，
// 這個假設會失效，屆時 _locale 必須改成參數傳遞而非 module-scope 變數。
let _locale: VizStrings = VIZ_STRINGS['zh-TW'];

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

// Inject id attributes on headings for TOC anchor links
renderer.heading = ({ text, depth }) => {
  const id = text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\u4e00-\u9fff-]/g, '')
    .slice(0, 60);
  return `<h${depth} id="${id}">${text}</h${depth}>`;
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

function renderTwModule(lang: string, raw: string): string {
  let lines = raw
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
  if (lines.length === 0) return '';

  // 跨模組「來源」列：任一列 `來源：…` / `資料來源：…` / `source: …` 抽成 sibling 來源 caption。
  // 2026-07-16 擴充各語言標籤（Sources/出典/출처/Fuente(s)）——babel 會把「來源」翻成
  // 目標語標籤，舊 regex 對不上時整列靜默變資料列被丟掉，譯版來源 caption 消失。
  let src = '';
  const _srcRe =
    /^(?:資料來源|來源|sources?|出典|출처|fuentes?)\s*[:：]\s*(.+)$/i;
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
    ? `<p class="tw-mod-src">${_esc(_locale.srcPrefix)}${_esc(src)}</p>`
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
        return `<div class="tw-versus-row"><div class="tw-versus-cell">${tagA}${_esc(l)}</div><div class="tw-versus-cell">${tagB}${_esc(rr)}</div></div>`;
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
          `<div class="tw-timeline-item"><div class="tw-timeline-year">${_esc(year)}</div>` +
          `<div class="tw-timeline-node"></div>` +
          `<div class="tw-timeline-content"><div class="tw-timeline-title">${_esc(t)}</div>` +
          (desc ? `<div class="tw-timeline-desc">${_esc(desc)}</div>` : '') +
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
          `<div class="tw-stat-card"><div class="tw-stat-val">${_esc(val)}</div>` +
          (label ? `<div class="tw-stat-label">${_esc(label)}</div>` : '') +
          (note ? `<div class="tw-stat-note">${_esc(note)}</div>` : '') +
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
      ? `<figcaption class="tw-quote-by"><b>${_esc(name)}</b>${role ? `，${_esc(role)}` : ''}</figcaption>`
      : '';
    return `<figure class="tw-quote"><blockquote class="tw-quote-text">${_esc(qt)}</blockquote>${byHtml}</figure>${_src}`;
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
    const EN_ALIAS: Record<string, string> = {
      taipei: '台北',
      'new taipei': '新北',
      keelung: '基隆',
      taoyuan: '桃園',
      'hsinchu city': '新竹市',
      'hsinchu county': '新竹縣',
      miaoli: '苗栗',
      taichung: '台中',
      changhua: '彰化',
      nantou: '南投',
      yunlin: '雲林',
      'chiayi city': '嘉義市',
      'chiayi county': '嘉義縣',
      tainan: '台南',
      kaohsiung: '高雄',
      pingtung: '屏東',
      yilan: '宜蘭',
      hualien: '花蓮',
      taitung: '台東',
      penghu: '澎湖',
      kinmen: '金門',
      lienchiang: '連江',
      matsu: '連江',
    };
    const normCounty = (raw: string) => {
      // 2026-07-16 審計：EN 譯版寫「Taipei City」（alias 只收 'taipei'）、JA 譯版寫
      // 「新竹県」（日文「県」）——兩者都對不上 → 磚圖在譯版必然退化成 bars。
      // 修法：日文県→縣先正規化；EN 先查完整字串（保住 hsinchu city/county 這類
      // 必須帶後綴的鍵），查無再去掉 ' city'/' county' 後綴查一次。
      // 空白一律摺成普通空格——babel 產物會夾 U+202F 窄不斷行空格（New Taipei），
      // alias 鍵是普通空格，不摺就對不上。
      const s = raw
        .replace(/臺/g, '台')
        .replace(/県/g, '縣')
        .replace(/\s+/g, ' ')
        .trim();
      const lower = s.toLowerCase();
      const en =
        EN_ALIAS[lower] ?? EN_ALIAS[lower.replace(/\s+(city|county)$/, '')];
      if (en) return en;
      const stem = s.replace(/[市縣]$/, '');
      return stem === '新竹' || stem === '嘉義' ? s : stem;
    };
    const rows = lines
      .map((l) => {
        const c = l.split('|').map((s) => s.trim());
        return { raw: c[0] || '', val: c[1] || '', num: _num(c[1] || '') };
      })
      .filter((r) => r.raw);
    if (rows.length === 0) return '';
    const byCounty = new Map<string, { val: string; num: number }>();
    const unmatched: string[] = [];
    const gridNames = new Set(TILE_GRID.flat().filter(Boolean) as string[]);
    rows.forEach((r) => {
      const key = normCounty(r.raw);
      if (gridNames.has(key)) byCounty.set(key, { val: r.val, num: r.num });
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
    const cells = TILE_GRID.flat()
      .map((name) => {
        if (!name) return `<i class="tw-tiles-gap" aria-hidden="true"></i>`;
        const e = byCounty.get(name);
        if (!e || isNaN(e.num))
          return `<div class="tw-tiles-cell tw-tiles-cell--empty"><span class="tw-tiles-name">${_esc(name)}</span><b class="tw-tiles-val">–</b></div>`;
        const i = (e.num - tMin) / range;
        return `<div class="tw-tiles-cell${i >= 0.55 ? ' tw-hm-hi' : ''}" style="--i:${i.toFixed(2)}"><span class="tw-tiles-name">${_esc(name)}</span><b class="tw-tiles-val">${_esc(e.val)}</b></div>`;
      })
      .join('');
    const scale = `<div class="tw-tiles-scale"><span>${_esc(_fmt(tMin))}</span><i class="tw-tiles-grad" aria-hidden="true"></i><span>${_esc(_fmt(tMax))}</span></div>`;
    const warn = unmatched.length
      ? `<p class="tw-tiles-warn">${_esc(_locale.unmatched)}${unmatched.map(_esc).join('、')}</p>`
      : '';
    const tbody = [...byCounty.entries()]
      .map(
        ([n, e]) =>
          `<tr><th scope="row">${_esc(n)}</th><td>${_esc(e.val)}</td></tr>`,
      )
      .join('');
    const table = `<table class="tw-sr-only"><caption>${_esc(modTitle || _locale.tilesAria)}</caption><thead><tr><th scope="col">${_esc(_locale.county)}</th><th scope="col">${_esc(_locale.value)}</th></tr></thead><tbody>${tbody}</tbody></table>`;
    return `<div class="tw-tiles" role="group" aria-label="${_esc(modTitle || _locale.tilesAria)}">${_title}<div class="tw-tiles-grid">${cells}</div>${scale}${warn}${table}</div>${_src}`;
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
    const bodyHtml = lines.map((l) => `<p>${_esc(l)}</p>`).join('');
    return `<aside class="tw-note${warn ? ' tw-note--warn' : ''}"><span class="tw-note-chip">【${_esc(kind)}】</span><div class="tw-note-body">${bodyHtml}</div></aside>${_src}`;
  }

  return '';
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
  let body = md.replace(defRegex, ''); // remove definitions from body

  // Replace inline refs [^label] → superscript HTML
  body = body.replace(/\[(\^[^\]]+)\](?!:)/g, (_, raw) => {
    const label = raw.slice(1); // strip leading ^
    if (!definitions[label]) return `[${raw}]`;
    if (!order.includes(label)) order.push(label);
    const num = order.indexOf(label) + 1;
    const id = `fn-${label}`;
    const refId = `fnref-${label}`;
    return `<sup id="${refId}"><a href="#${id}" class="footnote-ref" aria-label="${_locale.fnAria} ${num}">${num}</a></sup>`;
  });

  // Build footnotes section
  if (order.length > 0) {
    const items = order.map((label, i) => {
      const num = i + 1;
      const id = `fn-${label}`;
      const refId = `fnref-${label}`;
      // Process links inside footnote text via marked inline parser
      const defHtml = marked.parseInline(definitions[label]) as string;
      return `<li id="${id}">${defHtml}<a href="#${refId}" class="footnote-backref" aria-label="${_locale.fnBackAria} ${num}">↩</a></li>`;
    });
    body =
      body.trimEnd() +
      `\n\n<section class="footnotes" aria-label="${_locale.fnSection}"><ol>${items.join('')}</ol></section>`;
  }

  return body;
}

// ── Title-dedup → wikilink → footnote → marked → 延伸閱讀 split ─────────────
// 1:1 對應 template 原 frontmatter 行為：strip 開頭重複 H1、跑 marked、
// 找 延伸閱讀 split 點（SSODT sections 插入位置）。splitIndex === -1 表示沒找到。
export interface RenderedArticle {
  fullHtml: string;
  splitIndex: number;
}

export function renderArticleHtml(
  title: string,
  content: string,
  lang: string = 'zh-TW',
): RenderedArticle {
  // 依頁面語言選 renderer UI 字串（見檔頭 i18n 註解與 _locale 的同步假設）
  _locale =
    VIZ_STRINGS[lang as keyof typeof VIZ_STRINGS] ?? VIZ_STRINGS['zh-TW'];
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

  const fullHtml = marked.parse(
    processFootnotes(resolveWikilinks(bodyMarkdown)),
    {
      renderer,
      breaks: true,
    },
  ) as string;

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

  return { fullHtml, splitIndex };
}
