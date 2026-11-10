/**
 * topics-foundation.test.mjs — 專題共用地基的契約測試
 *（跑：node --experimental-strip-types --test tests/topics-foundation.test.mjs）
 *
 * 守三件事：
 *   1. 專題登記檔：資料夾是空的時候不會壞；壞掉的登記檔被略過；排序固定。
 *   2. 結構化資料：WebApplication／FAQPage／BreadcrumbList／ItemList 的輸出結構。
 *   3. 轉義：常見問題的字串放進 <script type="application/ld+json"> 不會提前關掉標籤，
 *      解析回來的字跟頁面上顯示的字一樣。
 *
 * 測試載入正式站在用的那幾支函式，不另外重抄規則。
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  buildTopics,
  flattenTools,
  hasOwnText,
  isTopicTranslated,
  latestUpdated,
  localizePath,
  normalizePath,
  normalizeTopic,
  pickText,
} from '../src/utils/topics/registry-core.ts';
import {
  absoluteUrl,
  buildBreadcrumbLd,
  buildFaqPageLd,
  buildItemListLd,
  buildWebApplicationLd,
  serializeJsonLd,
} from '../src/utils/tools/jsonld.ts';
import { buildEmbedSnippet } from '../src/utils/tools/embed.ts';
import {
  topicsFallbackChain,
  topicsUI,
  topicsUiLang,
  useTopicsT,
} from '../src/i18n/topics.ts';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const TOPICS_DIR = join(ROOT, 'src/data/topics');

const housing = {
  id: 'housing',
  path: '/housing/',
  title: { zh: '居住', en: 'Housing' },
  description: { zh: '房價與房貸', en: 'Prices and mortgages' },
  emoji: '🏠',
  updated: '2026-11-10',
  subpages: [{ path: '/housing/prices/', title: { zh: '房價', en: 'Prices' } }],
  tools: [
    {
      slug: 'mortgage-calculator',
      path: '/housing/mortgage-calculator/',
      embedPath: '/embed/housing/mortgage-calculator/',
      title: { zh: '房貸試算', en: 'Mortgage calculator' },
      description: { zh: '算每月還款', en: 'Monthly payment' },
      keywords: ['房貸試算'],
    },
  ],
  relatedArticles: [],
  relatedTopics: ['income'],
};

// ── 1. 專題登記檔 ────────────────────────────────────────────────────

test('registry：空資料夾（glob 回傳空物件）得到空陣列，不丟例外', () => {
  assert.deepEqual(buildTopics({}), []);
  assert.deepEqual(buildTopics(undefined), []);
  assert.deepEqual(flattenTools(buildTopics({})), []);
  assert.equal(latestUpdated([]), '');
});

test('registry：repo 裡每一份登記檔都能被正規化，id 與檔名一致', () => {
  const files = readdirSync(TOPICS_DIR).filter((f) => f.endsWith('.json'));
  for (const file of files) {
    const raw = JSON.parse(readFileSync(join(TOPICS_DIR, file), 'utf8'));
    const topic = normalizeTopic(raw);
    assert.ok(topic, `${file} 缺 id 或 path`);
    assert.equal(`${topic.id}.json`, file);
    assert.match(topic.path, /^\/.+\/$/, `${file} 的 path 前後要有斜線`);
    for (const tool of topic.tools) {
      assert.match(
        tool.slug,
        /^[a-z0-9]+(-[a-z0-9]+)*$/,
        `${file} ${tool.slug}`,
      );
      assert.ok(tool.embedPath.startsWith('/embed/'), `${file} ${tool.slug}`);
    }
  }
});

test('registry：eager glob 的 { default } 包裝、壞檔略過、固定排序、id 去重', () => {
  const topics = buildTopics({
    '../../data/topics/names.json': {
      default: { id: 'names', path: '/names/' },
    },
    '../../data/topics/zzz.json': { default: { id: 'zzz', path: '/zzz/' } },
    '../../data/topics/broken.json': { default: { title: '沒有 id' } },
    '../../data/topics/housing.json': { default: housing },
    '../../data/topics/housing-copy.json': { default: { ...housing } },
    '../../data/topics/null.json': null,
  });
  assert.deepEqual(
    topics.map((t) => t.id),
    ['housing', 'names', 'zzz'],
  );
  // 缺的欄位補成安全的空值，元件不用到處判斷 undefined。
  const names = topics[1];
  assert.deepEqual(names.tools, []);
  assert.deepEqual(names.subpages, []);
  assert.deepEqual(names.title, { zh: 'names', en: 'names' });
  assert.equal(latestUpdated(topics), '2026-11-10');
});

test('registry：getAllTools 的形狀（工具帶著所屬專題），缺 slug 的工具被略過', () => {
  const topics = buildTopics({
    a: { ...housing, tools: [...housing.tools, { path: '/x/' }, null] },
  });
  const tools = flattenTools(topics);
  assert.equal(tools.length, 1);
  assert.equal(tools[0].slug, 'mortgage-calculator');
  assert.equal(tools[0].topic.id, 'housing');
});

test('pickText：該語言自己的字 → en → zh（zh-TW 讀 zh）', () => {
  const text = { zh: '居住', en: 'Housing', ja: '住まい' };
  assert.equal(pickText(text, 'zh-TW'), '居住');
  assert.equal(pickText(text, 'en'), 'Housing');
  assert.equal(pickText(text, 'ja'), '住まい');
  assert.equal(pickText(text, 'fr'), 'Housing');
  // v1.1：ja、ko 缺字時讀英文，不再讀中文
  assert.equal(pickText({ zh: '居住', en: 'Housing' }, 'ja'), 'Housing');
  assert.equal(pickText({ zh: '居住', en: 'Housing' }, 'ko'), 'Housing');
  assert.equal(pickText({ zh: '居住', en: 'Housing' }, 'ar'), 'Housing');
  // en 是空的才退到 zh
  assert.equal(pickText({ zh: '居住', en: '' }, 'ko'), '居住');
  assert.equal(pickText('純字串', 'en'), '純字串');
  assert.equal(pickText(undefined, 'en'), '');
});

test('hasOwnText：有沒有該語言自己的字', () => {
  const text = { zh: '居住', en: 'Housing', ja: '住まい' };
  assert.equal(hasOwnText(text, 'zh-TW'), true);
  assert.equal(hasOwnText(text, 'en'), true);
  assert.equal(hasOwnText(text, 'ja'), true);
  assert.equal(hasOwnText(text, 'ar'), false);
  assert.equal(hasOwnText({ ...text, ar: 'السكن' }, 'ar'), true);
  assert.equal(hasOwnText('純字串', 'ar'), true);
});

test('navTitle：有寫才帶（字串或 {zh, en}），沒寫不加欄位', () => {
  const topic = normalizeTopic({
    ...housing,
    subpages: [
      {
        path: '/housing/prices/',
        title: '房價所得比十年變化',
        navTitle: '房價',
      },
      { path: '/housing/rent/', title: { zh: '租屋', en: 'Renting' } },
    ],
    tools: [{ ...housing.tools[0], navTitle: { zh: '房貸', en: 'Mortgage' } }],
  });
  assert.equal(topic.subpages[0].navTitle, '房價');
  assert.equal('navTitle' in topic.subpages[1], false);
  assert.deepEqual(topic.tools[0].navTitle, { zh: '房貸', en: 'Mortgage' });
  assert.equal(
    pickText(topic.tools[0].navTitle ?? topic.tools[0].title, 'ja'),
    'Mortgage',
  );
  // 舊登記檔（沒有 navTitle、languages）正規化結果不多出欄位
  const old = normalizeTopic(housing);
  assert.equal('navTitle' in old.tools[0], false);
  assert.equal('languages' in old, false);
});

test('isTopicTranslated：預設 zh-TW、en；登記檔 languages 可以加', () => {
  const plain = normalizeTopic(housing);
  assert.equal(isTopicTranslated(plain, 'zh-TW'), true);
  assert.equal(isTopicTranslated(plain, 'en'), true);
  assert.equal(isTopicTranslated(plain, 'ja'), false);
  assert.equal(isTopicTranslated(plain, 'ko'), false);
  assert.equal(isTopicTranslated(undefined, 'en'), true);
  assert.equal(isTopicTranslated(undefined, 'ar'), false);
  const withJa = normalizeTopic({
    ...housing,
    languages: ['zh-TW', 'en', 'ja'],
  });
  assert.deepEqual(withJa.languages, ['zh-TW', 'en', 'ja']);
  assert.equal(isTopicTranslated(withJa, 'ja'), true);
  assert.equal(isTopicTranslated(withJa, 'ko'), false);
  assert.equal(isTopicTranslated({ languages: [] }, 'en'), true);
});

// ── 1b. 介面字串（src/i18n/topics.ts）────────────────────────────────

test('topics i18n：zh-TW、en、ja 三張表的 key 完全一樣，沒有空字串', () => {
  const keys = Object.keys(topicsUI.en).sort();
  for (const code of ['zh-TW', 'ja']) {
    assert.deepEqual(Object.keys(topicsUI[code]).sort(), keys, code);
  }
  for (const code of ['zh-TW', 'en', 'ja']) {
    for (const key of keys) {
      assert.ok(topicsUI[code][key], `${code} 缺 ${key}`);
    }
  }
});

test('topics i18n：ja 的介面字串沒有繁體中文獨有的字，置換參數跟 en 一致', () => {
  const zhOnly = /[這個們麼嗎還沒從頁專內覽讀總與資]/;
  for (const [key, value] of Object.entries(topicsUI.ja)) {
    assert.ok(!zhOnly.test(value), `ja ${key} 有中文字：${value}`);
    const params = (v) => (v.match(/\{\w+\}/g) || []).sort();
    // zh-TW 的 tools.meta.description 多一個 {m}，所以跟 zh-TW 或 en 其中之一相同即可
    const mine = params(value).join();
    assert.ok(
      mine === params(topicsUI.en[key]).join() ||
        mine === params(topicsUI['zh-TW'][key]).join(),
      `ja ${key} 的置換參數不對`,
    );
  }
});

test('topics i18n fallback：有自己的用自己的，否則 en，不再退到中文', () => {
  assert.deepEqual(topicsFallbackChain('zh-TW'), ['zh-TW']);
  assert.deepEqual(topicsFallbackChain('en'), ['en']);
  assert.deepEqual(topicsFallbackChain('ko'), ['ko', 'en', 'zh-TW']);
  assert.deepEqual(topicsFallbackChain('pt'), ['pt', 'en', 'zh-TW']);

  assert.equal(useTopicsT('zh-TW')('tool.section.faq'), '常見問題');
  assert.equal(useTopicsT('ja')('tool.section.faq'), 'よくある質問');
  for (const code of [
    'ko',
    'ar',
    'fr',
    'es',
    'pt',
    'de',
    'ru',
    'hi',
    'vi',
    'id',
  ]) {
    assert.equal(
      useTopicsT(code)('tool.section.faq'),
      'Frequently asked questions',
      code,
    );
    assert.equal(topicsUiLang(code), 'en');
  }
  for (const code of ['zh-TW', 'en', 'ja']) {
    assert.equal(topicsUiLang(code), code);
  }
  assert.equal(useTopicsT('ko')('topics.card.tools', { n: 3 }), 'Tools: 3');
});

test('topics i18n：計算方式的預設小標是中性的說法', () => {
  assert.equal(
    useTopicsT('zh-TW')('tool.section.method'),
    '怎麼得出這個結果？',
  );
  assert.equal(
    useTopicsT('en')('tool.section.method'),
    'How this result is produced',
  );
});

test('localizePath／normalizePath', () => {
  assert.equal(localizePath('/housing/', 'zh-TW'), '/housing/');
  assert.equal(localizePath('/housing/', 'en'), '/en/housing/');
  assert.equal(localizePath('/en/housing/', 'en'), '/en/housing/');
  assert.equal(localizePath('/', 'ja'), '/ja/');
  assert.equal(localizePath('/english/', 'en'), '/en/english/');
  assert.equal(
    localizePath('https://example.com/a', 'en'),
    'https://example.com/a',
  );
  assert.equal(localizePath('#tf-embed', 'en'), '#tf-embed');
  assert.equal(normalizePath('/en/housing/?a=1'), '/en/housing');
  assert.equal(normalizePath('/'), '/');
});

// ── 2. 結構化資料 ────────────────────────────────────────────────────

test('WebApplication：類別、免費 offers、語言、所屬專題', () => {
  const ld = buildWebApplicationLd({
    name: '房貸試算 2026',
    description: '算每月還款',
    url: '/housing/mortgage-calculator/',
    inLanguage: 'zh-Hant',
    keywords: ['房貸試算', '寬限期'],
    dateModified: '2026-11-10',
    partOf: { name: '居住', url: '/housing/' },
  });
  assert.equal(ld['@context'], 'https://schema.org');
  assert.equal(ld['@type'], 'WebApplication');
  assert.equal(ld.url, 'https://taiwan.md/housing/mortgage-calculator/');
  assert.equal(ld.applicationCategory, 'UtilitiesApplication');
  assert.equal(ld.inLanguage, 'zh-Hant');
  assert.equal(ld.isAccessibleForFree, true);
  assert.deepEqual(ld.offers, {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'TWD',
  });
  assert.equal(ld.keywords, '房貸試算, 寬限期');
  assert.equal(ld.dateModified, '2026-11-10');
  assert.equal(ld.isPartOf.url, 'https://taiwan.md/housing/');

  const finance = buildWebApplicationLd({
    name: 'x',
    description: 'y',
    url: 'https://taiwan.md/en/housing/mortgage-calculator/',
    inLanguage: 'en',
    applicationCategory: 'FinanceApplication',
  });
  assert.equal(finance.applicationCategory, 'FinanceApplication');
  assert.equal('keywords' in finance, false);
  assert.equal('isPartOf' in finance, false);
});

test('FAQPage：一題一個 Question，字跟輸入一樣；零題回傳 null', () => {
  const faq = [
    { q: '寬限期內要還多少？', a: '只繳利息，不還本金。' },
    { q: '利率會變嗎？', a: '機動利率會跟著央行調整。' },
    { q: '', a: '沒有問題的答案會被略過' },
  ];
  const ld = buildFaqPageLd(faq);
  assert.equal(ld['@type'], 'FAQPage');
  assert.equal(ld.mainEntity.length, 2);
  assert.deepEqual(ld.mainEntity[0], {
    '@type': 'Question',
    name: '寬限期內要還多少？',
    acceptedAnswer: { '@type': 'Answer', text: '只繳利息，不還本金。' },
  });
  assert.equal(buildFaqPageLd([]), null);
  assert.equal(buildFaqPageLd(undefined), null);
});

test('BreadcrumbList：首頁 → 專題 → 工具，position 從 1 起，網址是絕對網址', () => {
  const ld = buildBreadcrumbLd([
    { name: 'Taiwan.md', url: '/en/' },
    { name: 'Housing', url: '/en/housing/' },
    {
      name: 'Mortgage calculator',
      url: 'https://taiwan.md/en/housing/mortgage-calculator/',
    },
  ]);
  assert.equal(ld['@type'], 'BreadcrumbList');
  assert.deepEqual(
    ld.itemListElement.map((i) => [i.position, i.name, i.item]),
    [
      [1, 'Taiwan.md', 'https://taiwan.md/en/'],
      [2, 'Housing', 'https://taiwan.md/en/housing/'],
      [
        3,
        'Mortgage calculator',
        'https://taiwan.md/en/housing/mortgage-calculator/',
      ],
    ],
  );
  assert.equal(buildBreadcrumbLd([{ name: 'Taiwan.md', url: '/' }]), null);
});

test('ItemList：數量與順序；零個工具回傳 null', () => {
  const ld = buildItemListLd({
    name: '工具總覽',
    url: '/tools/',
    items: [
      {
        name: '房貸試算',
        url: '/housing/mortgage-calculator/',
        description: '算每月還款',
      },
      { name: '所得稅試算', url: '/income/income-tax-calculator/' },
    ],
  });
  assert.equal(ld['@type'], 'ItemList');
  assert.equal(ld.url, 'https://taiwan.md/tools/');
  assert.equal(ld.numberOfItems, 2);
  assert.equal(ld.itemListElement[1].position, 2);
  assert.equal(
    ld.itemListElement[1].url,
    'https://taiwan.md/income/income-tax-calculator/',
  );
  assert.equal(ld.itemListElement[0].description, '算每月還款');
  assert.equal('description' in ld.itemListElement[1], false);
  assert.equal(buildItemListLd({ name: 'x', url: '/tools/', items: [] }), null);
});

test('absoluteUrl：站內路徑補網域，絕對網址原樣', () => {
  assert.equal(absoluteUrl('/tools/'), 'https://taiwan.md/tools/');
  assert.equal(absoluteUrl('tools/'), 'https://taiwan.md/tools/');
  assert.equal(absoluteUrl('https://example.com/x'), 'https://example.com/x');
});

// ── 3. 轉義 ──────────────────────────────────────────────────────────

test('serializeJsonLd：FAQ 字串不會關掉 script 標籤，解析回來一字不差', () => {
  const faq = [
    {
      q: '可以寫 </script><script>alert(1)</script> 嗎？',
      a: '引號 "雙" \'單\'、反斜線 \\、& 符號、<b>標籤</b>、換行\n第二行、\u2028 行分隔符。',
    },
  ];
  const out = serializeJsonLd(buildFaqPageLd(faq));
  assert.equal(out.includes('</script'), false);
  assert.equal(/[<>&\u2028\u2029]/.test(out), false);
  const parsed = JSON.parse(out);
  assert.equal(parsed.mainEntity[0].name, faq[0].q);
  assert.equal(parsed.mainEntity[0].acceptedAnswer.text, faq[0].a);
});

test('buildEmbedSnippet：iframe 屬性轉義、帶調高 script、驗 origin', () => {
  const code = buildEmbedSnippet({
    src: 'https://taiwan.md/embed/housing/mortgage-calculator/',
    title: '房貸 "試算" <2026>',
    height: 700,
  });
  assert.match(
    code,
    /^<iframe src="https:\/\/taiwan\.md\/embed\/housing\/mortgage-calculator\/"/,
  );
  assert.ok(code.includes('title="房貸 &quot;試算&quot; &lt;2026&gt;"'));
  assert.ok(code.includes('height="700"'));
  assert.ok(code.includes("e.data.type !== 'twmd-embed-height'"));
  assert.ok(code.includes("e.origin !== 'https://taiwan.md'"));
  assert.ok(code.includes('frames[i].contentWindow === e.source'));
});
