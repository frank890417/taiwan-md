/**
 * terminology-wording.test.mjs — /terminology/{id} 「算不算中國用語」四層說法契約
 *（跑：node --experimental-strip-types --test tests/terminology-wording.test.mjs）
 *
 * 守的是 OBSERVER-QUEUE #76（2026-10-10 哲宇拍板 C）：零佐證的條目不准再對讀者講
 * 「是，X 是中國大陸的常見說法」。E / F 與有佐證的條目維持原句，一個字不動。
 *
 * 跟 article-heading-id.test.mjs 同一個理由：測試載入正式站在用的那支函式
 * （src/utils/terminology-wording.ts），不自己重抄一份規則來驗。
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  TERM_PLACEHOLDERS,
  scrubTermField,
  hasTermEtymology,
  hasTermEvidence,
  termWordingBucket,
  termWording,
} from '../src/utils/terminology-wording.ts';

const empty = {
  origin: '',
  taiwanPath: '',
  chinaPath: '',
  forkPoint: '',
  forkCause: '',
  usageExample: '',
  usageNote: '',
};

const WIDE_CLAIM = '是中國大陸的常見說法';
const WIDE_LEAD = '是中國大陸的用法';

test('placeholder 填充字視同空值，其餘 trim', () => {
  for (const ph of TERM_PLACEHOLDERS) assert.equal(scrubTermField(ph), '');
  assert.equal(scrubTermField('  台灣用法 '), '');
  assert.equal(scrubTermField(' 真的有字 '), '真的有字');
  assert.equal(scrubTermField(undefined), '');
  assert.equal(scrubTermField(null), '');
});

test('佐證定義：詞源任一欄位，或 usage 範疇', () => {
  assert.equal(hasTermEtymology(empty), false);
  assert.equal(hasTermEvidence(empty), false);
  assert.equal(hasTermEvidence({ ...empty, origin: 'kernel 譯法分流' }), true);
  assert.equal(hasTermEvidence({ ...empty, forkCause: '1949' }), true);
  // usage 範疇算佐證，但不算詞源（showFork 仍吃詞源那把尺）
  const usageOnly = { ...empty, usageNote: '只有動詞用法是中國網路用語' };
  assert.equal(hasTermEtymology(usageOnly), false);
  assert.equal(hasTermEvidence(usageOnly), true);
  assert.equal(
    hasTermEvidence({ ...empty, usageExample: '這支影片很好看' }),
    true,
  );
  // placeholder 已被 scrub 成空字串，不會變成佐證
  assert.equal(
    hasTermEvidence({ ...empty, origin: scrubTermField('中國用法') }),
    false,
  );
});

test('分桶：E / F 不看佐證，其餘看佐證', () => {
  assert.equal(termWordingBucket('E', false), 'diverging');
  assert.equal(termWordingBucket('E', true), 'diverging');
  assert.equal(termWordingBucket('F', false), 'same-word');
  assert.equal(termWordingBucket('B', true), 'evidenced');
  assert.equal(termWordingBucket('B', false), 'unverified');
  assert.equal(termWordingBucket('', false), 'unverified');
  assert.equal(termWordingBucket('C', true), 'evidenced');
});

const base = {
  china: '視頻',
  taiwanPrimary: '影片',
  taiwanAlts: '',
  forkKey: 'B',
};

test('有佐證：維持 2026-06-22 以來的直述句，一字不動', () => {
  const w = termWording({ ...base, evidenced: true });
  assert.equal(w.bucket, 'evidenced');
  assert.equal(w.lead, '「視頻」是中國大陸的用法，在台灣通常說「影片」。');
  assert.equal(
    w.faqAnswer,
    '是，「視頻」是中國大陸的常見說法，台灣慣用「影片」。',
  );
  assert.equal(w.seoLead, '中國說「視頻」，台灣說「影片」。');
  assert.equal(w.heroSubtitle, '在台灣，「視頻」要說「影片」。');
});

test('零佐證：四句都降級，不再出現最寬那句', () => {
  const w = termWording({
    ...base,
    china: '視頻監視',
    taiwanPrimary: '影像監視',
    evidenced: false,
  });
  assert.equal(w.bucket, 'unverified');
  for (const s of [w.lead, w.faqAnswer, w.seoLead, w.heroSubtitle]) {
    assert.ok(!s.includes(WIDE_CLAIM), `不該出現「${WIDE_CLAIM}」：${s}`);
    assert.ok(!s.includes(WIDE_LEAD), `不該出現「${WIDE_LEAD}」：${s}`);
    assert.ok(!s.startsWith('是，'), `不該用「是，」開頭：${s}`);
  }
  // 只說「有人回報」＋「還沒查證」，而且兩個詞都還在句子裡讓讀者對得上
  assert.ok(w.lead.includes('有人回報') && w.lead.includes('還沒查證'));
  assert.ok(w.faqAnswer.startsWith('還不確定'));
  assert.ok(
    w.faqAnswer.includes('「視頻監視」') &&
      w.faqAnswer.includes('「影像監視」'),
  );
  assert.ok(w.seoLead.includes('待查證'));
  assert.ok(w.heroSubtitle.includes('還沒查證'));
});

test('E 正在分歧 / F 同詞不同語感：原句不動，佐證與否無關', () => {
  for (const evidenced of [true, false]) {
    const e = termWording({
      ...base,
      china: '估計',
      taiwanPrimary: '大概',
      forkKey: 'E',
      evidenced,
    });
    assert.equal(e.bucket, 'diverging');
    assert.equal(
      e.lead,
      '「估計」是兩岸正在分歧的詞，雙方大致都聽得懂；台灣這邊多半說「大概」。',
    );
    assert.equal(
      e.faqAnswer,
      '「估計」兩岸都在用、正在分歧，台灣這邊習慣說「大概」。',
    );
    const f = termWording({
      ...base,
      china: '消息',
      taiwanPrimary: '訊息',
      forkKey: 'F',
      evidenced,
    });
    assert.equal(f.bucket, 'same-word');
    assert.equal(
      f.lead,
      '「消息」兩岸都在用，但語感與常用度不太一樣；台灣這邊比較常說「訊息」。',
    );
    assert.equal(
      f.faqAnswer,
      '「消息」兩岸都用，但語感不同；台灣這邊比較常說「訊息」。',
    );
    assert.equal(f.heroSubtitle, '在台灣，「消息」要說「訊息」。');
  }
});

test('display.taiwan 的其他說法以「也說」接在 lead 後面（四桶都一樣）', () => {
  for (const [forkKey, evidenced] of [
    ['B', true],
    ['B', false],
    ['E', true],
    ['F', true],
  ]) {
    const w = termWording({ ...base, taiwanAlts: '影音', forkKey, evidenced });
    assert.ok(w.lead.includes('（也說影音）'), `${w.bucket}: ${w.lead}`);
    assert.ok(!w.faqAnswer.includes('也說'), 'FAQ 只講主要說法');
  }
});

// ── 搜尋結果頁 title / description（2026-11-04 evolve）──────────────────────
// 查詢是「X 意思」「X 注音」；origin 裡挑得到定義句的條目改成先答字義，
// 挑不到的維持「台灣怎麼說」原句型、一字不動。字義句只能是 origin 原文。
import {
  termGloss,
  termSeo,
  TERM_DESC_MAX,
  TERM_GLOSS_MAX,
} from '../src/utils/terminology-wording.ts';

const g = (over) =>
  termGloss({
    origin: '',
    china: '吃瓜',
    taiwanTerms: ['看八卦', '看戲'],
    forkKey: 'E',
    category: 'daily',
    ...over,
  });

test('字義：從 origin 第一句切出來，沒提到詞就把詞接在前面', () => {
  const a = g({
    origin:
      '源自「吃瓜群眾」，比喻旁觀看熱鬧的人（像嗑瓜子看戲）。中國網路高頻用語。台灣說「看八卦」「看戲」。',
  });
  assert.equal(
    a.gloss,
    '「吃瓜」：源自「吃瓜群眾」，比喻旁觀看熱鬧的人（像嗑瓜子看戲）。',
  );
  assert.equal(a.zhuyin, '');
  // 動詞起頭直接接，不加冒號
  assert.equal(
    g({ china: '腦洞大開', origin: '表示想法或創意非常大膽、奇特。' }).gloss,
    '「腦洞大開」表示想法或創意非常大膽、奇特。',
  );
  // 句子已經提到詞，不重複接
  assert.equal(
    g({
      china: '三觀',
      origin: '中國「三觀」指世界觀、人生觀、價值觀的合稱，台灣不使用此說法。',
    }).gloss,
    '中國「三觀」指世界觀、人生觀、價值觀的合稱。',
  );
  // YAML 折行留下的 CJK 間空白要拿掉
  assert.equal(
    g({ china: '線程', origin: '作業系統中可獨立排程執行的\n最小單位' }).gloss,
    '「線程」：作業系統中可獨立排程執行的最小單位。',
  );
});

test('字義：台灣對照、詞源比較、F 型、譯名類、過長都挑不到', () => {
  const none = { gloss: '', zhuyin: '' };
  // 以台灣說法開頭＝在解釋台灣那個詞
  assert.deepEqual(
    g({
      china: '煤氣',
      taiwanTerms: ['瓦斯'],
      origin: '「瓦斯」是日語「ガス」（gasu）的漢字寫法。',
    }),
    none,
  );
  // 句首就是台灣
  assert.deepEqual(
    g({
      china: '教程',
      origin: '台灣說「教學」（影片/文章），中國說「教程」。',
    }),
    none,
  );
  // 沒有定義標記、又在講翻譯
  assert.deepEqual(g({ china: '字節', origin: 'byte 的意譯。' }), none);
  // 沒有定義標記、在講命名差異
  assert.deepEqual(g({ china: 'U盤', origin: '各地命名方式完全不同。' }), none);
  // F 同詞不同語感：問「是什麼意思」答非所問
  assert.deepEqual(
    g({ china: '水平', forkKey: 'F', origin: '兩個詞都指程度與標準。' }),
    none,
  );
  // 譯名類
  assert.deepEqual(
    g({ china: '乍得', category: 'proper-noun', origin: '是 Chad 的音譯。' }),
    none,
  );
  // 沒有 origin（單位、零佐證 import）
  assert.deepEqual(g({ china: '厘米', origin: '' }), none);
  // 過長
  assert.deepEqual(
    g({ origin: '指' + '很長'.repeat(TERM_GLOSS_MAX) + '。' }),
    none,
  );
});

test('字義：origin 帶注音的那一句另外交出來', () => {
  const z = g({
    china: '咋的',
    taiwanTerms: ['怎麼樣', '不管怎樣'],
    origin:
      '是中國方言，用來表示「怎麼樣」「如何」的意思。注音可作「ㄓㄚˋ」或「ㄗㄚˊ」。',
  });
  assert.equal(
    z.gloss,
    '「咋的」是中國方言，用來表示「怎麼樣」「如何」的意思。',
  );
  assert.equal(z.zhuyin, '注音可作「ㄓㄚˋ」或「ㄗㄚˊ」。');
});

test('termSeo：沒有字義＝原句型一字不動', () => {
  const w = termWording({
    ...base,
    china: '厘米',
    taiwanPrimary: '公分',
    evidenced: false,
  });
  const s = termSeo({
    china: '厘米',
    taiwanPrimary: '公分',
    gloss: { gloss: '', zhuyin: '' },
    seoLead: w.seoLead,
    forkBlurb: '',
  });
  assert.equal(s.kind, 'lookup');
  assert.equal(s.title, '「厘米」台灣怎麼說？台灣用語是「公分」');
  assert.equal(
    s.description,
    '有人回報中國說「厘米」、台灣說「公分」，來源待查證。查「厘米」算不算中國用語、台灣用語怎麼說 — Taiwan.md 用語保存計畫。',
  );
});

test('termSeo：有字義＝標題先問意思、描述第一句是字義，不超過 160 字', () => {
  const w = termWording({
    ...base,
    china: '吃瓜',
    taiwanPrimary: '看八卦',
    forkKey: 'E',
    evidenced: true,
  });
  const gloss = {
    gloss: '「吃瓜」：源自「吃瓜群眾」，比喻旁觀看熱鬧的人（像嗑瓜子看戲）。',
    zhuyin: '',
  };
  const s = termSeo({
    china: '吃瓜',
    taiwanPrimary: '看八卦',
    gloss,
    seoLead: w.seoLead,
    forkBlurb: '還在分歧中的詞，兩邊講法都聽得懂，但各有偏好。',
  });
  assert.equal(s.kind, 'meaning');
  assert.equal(s.title, '「吃瓜」是什麼意思？台灣說「看八卦」');
  assert.ok(s.description.startsWith(gloss.gloss));
  assert.ok(s.description.includes('台灣說「看八卦」'));
  assert.ok(s.description.length <= TERM_DESC_MAX);
  // 塞不下的尾巴就不放，但字義與台灣說法一定在
  const long = {
    gloss: '「吃瓜」：' + '比喻旁觀'.repeat(18) + '。',
    zhuyin: '',
  };
  const t = termSeo({
    china: '吃瓜',
    taiwanPrimary: '看八卦',
    gloss: long,
    seoLead: w.seoLead,
    forkBlurb: '還在分歧中的詞，兩邊講法都聽得懂，但各有偏好。',
  });
  assert.ok(t.description.length <= TERM_DESC_MAX);
  assert.ok(
    t.description.startsWith(long.gloss) &&
      t.description.includes('台灣說「看八卦」'),
  );
  // 注音版標題；台灣說法的括號註記不進標題
  const z = termSeo({
    china: '咋的',
    taiwanPrimary: '怎麼樣（口語）',
    gloss: { gloss: '「咋的」是中國方言。', zhuyin: '注音可作「ㄓㄚˋ」。' },
    seoLead: '中國說「咋的」，台灣說「怎麼樣」。',
    forkBlurb: '',
  });
  assert.equal(z.title, '「咋的」是什麼意思、注音怎麼念？台灣說「怎麼樣」');
  assert.ok(
    z.description.startsWith('「咋的」是中國方言。注音可作「ㄓㄚˋ」。'),
  );
});
