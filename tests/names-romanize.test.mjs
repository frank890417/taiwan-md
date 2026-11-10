/**
 * names-romanize.test.mjs — 「台灣人的名字」拼音引擎契約
 *（跑：node --experimental-strip-types --test tests/names-romanize.test.mjs）
 *
 * 引擎（src/utils/names/romanize.ts）用規則從注音推四套譯音；
 * 這裡拿外交部領事事務局「護照外文姓名拼音對照表」（src/data/names/boca-table.json，
 * 2026-05-29 版，409 列）逐列逐欄對。規則跟官方表只要差一格就紅。
 * 另外守住：字音表的形狀、多音姓、複姓、罕見字與非漢字輸入的誠實處理、反查。
 */
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { test } from 'node:test';
import {
  SYSTEMS,
  parseZhuyin,
  romanizeSyllable,
  romanizeSyllableAll,
  toHanyuToned,
  toIpa,
  stripTone,
  hanOnly,
  splitName,
  lookupReadings,
  formatName,
  buildReverseIndex,
  tokenizeRoman,
  reverseLookup,
  SURNAME_READINGS,
  COMPOUND_SURNAMES,
} from '../src/utils/names/romanize.ts';

const load = (p) =>
  JSON.parse(readFileSync(new URL(p, import.meta.url), 'utf8'));
const boca = load('../src/data/names/boca-table.json');
const COL = { zhuyin: 0, wg: 1, mps2: 2, tongyong: 3, hanyu: 4 };
const readingsPath = new URL(
  '../public/data/names/readings.json',
  import.meta.url,
);
const dict = existsSync(readingsPath)
  ? load('../public/data/names/readings.json')
  : null;

test('官方對照表本身：409 列、注音不重複、欄位齊全', () => {
  assert.equal(boca.rows.length, 409);
  assert.equal(new Set(boca.rows.map((r) => r[0])).size, 409);
  for (const r of boca.rows) {
    assert.equal(r.length, 5);
    for (const cell of r)
      assert.ok(cell && cell.trim() === cell, `空欄或多餘空白：${r}`);
  }
});

test('規則推導 = 官方對照表（409 列 × 4 套系統，逐格）', () => {
  const diffs = [];
  for (const r of boca.rows) {
    const got = romanizeSyllableAll(r[COL.zhuyin]);
    if (!got) {
      diffs.push(`${r[0]}：引擎拆不出來`);
      continue;
    }
    for (const sys of SYSTEMS) {
      const mine = got[sys].join(' 或 ');
      if (mine !== r[COL[sys]])
        diffs.push(`${r[0]} ${sys}：引擎 ${mine}／官方 ${r[COL[sys]]}`);
    }
  }
  assert.deepEqual(diffs, []);
});

test('官方表給兩種寫法的威妥瑪列恰好六列，引擎都回兩個', () => {
  const dual = boca.rows.filter((r) => r[COL.wg].includes('或'));
  assert.deepEqual(
    dual.map((r) => r[0]),
    ['ㄍㄜ', 'ㄎㄜ', 'ㄏㄜ', 'ㄧ', 'ㄜ'].filter((z) =>
      dual.some((r) => r[0] === z),
    ),
  );
  for (const r of dual) assert.equal(romanizeSyllableAll(r[0]).wg.length, 2);
});

test('聲調不影響拼寫；輕聲與不合法注音照實處理', () => {
  assert.deepEqual(romanizeSyllable('ㄔㄣˊ'), romanizeSyllable('ㄔㄣ'));
  assert.equal(parseZhuyin('˙ㄇㄚ').tone, 5);
  assert.equal(parseZhuyin('ㄇㄚ˙').tone, 5);
  assert.equal(parseZhuyin(''), null);
  assert.equal(parseZhuyin('ㄅㄅ'), null);
  assert.equal(parseZhuyin('abc'), null);
  assert.equal(romanizeSyllable('ㄚㄅ'), null);
  assert.equal(stripTone('ㄒㄧㄠˇ'), 'ㄒㄧㄠ');
});

test('前十大姓的四套拼法（官方表查得到的音節）', () => {
  // 注音出處：教育部《重編國語辭典修訂本》；拼法出處：官方對照表
  const cases = {
    ㄔㄣ: { wg: 'CHEN', hanyu: 'CHEN', tongyong: 'CHEN', mps2: 'CHEN' }, // 陳
    ㄌㄧㄣ: { wg: 'LIN', hanyu: 'LIN', tongyong: 'LIN', mps2: 'LIN' }, // 林
    ㄏㄨㄤ: { wg: 'HUANG', hanyu: 'HUANG', tongyong: 'HUANG', mps2: 'HUANG' }, // 黃
    ㄓㄤ: { wg: 'CHANG', hanyu: 'ZHANG', tongyong: 'JHANG', mps2: 'JANG' }, // 張
    ㄌㄧ: { wg: 'LI', hanyu: 'LI', tongyong: 'LI', mps2: 'LI' }, // 李
    ㄨㄤ: { wg: 'WANG', hanyu: 'WANG', tongyong: 'WANG', mps2: 'WANG' }, // 王
    ㄨ: { wg: 'WU', hanyu: 'WU', tongyong: 'WU', mps2: 'WU' }, // 吳
    ㄌㄧㄡ: { wg: 'LIU', hanyu: 'LIU', tongyong: 'LIOU', mps2: 'LIOU' }, // 劉
    ㄘㄞ: { wg: 'TSAI', hanyu: 'CAI', tongyong: 'CAI', mps2: 'TSAI' }, // 蔡
    ㄧㄤ: { wg: 'YANG', hanyu: 'YANG', tongyong: 'YANG', mps2: 'YANG' }, // 楊
    ㄒㄧㄝ: { wg: 'HSIEH', hanyu: 'XIE', tongyong: 'SIE', mps2: 'SHIE' }, // 謝
    ㄓㄥ: { wg: 'CHENG', hanyu: 'ZHENG', tongyong: 'JHENG', mps2: 'JENG' }, // 鄭
    ㄒㄩ: { wg: 'HSU', hanyu: 'XU', tongyong: 'SYU', mps2: 'SHIU' }, // 許
    ㄑㄧㄡ: { wg: 'CHIU', hanyu: 'QIU', tongyong: 'CIOU', mps2: 'CHIOU' }, // 邱
  };
  for (const [z, want] of Object.entries(cases))
    assert.deepEqual(romanizeSyllable(z), want, z);
});

test('念法提示：帶調漢語拼音與 IPA', () => {
  const p = (z) => toHanyuToned(parseZhuyin(z));
  assert.equal(p('ㄔㄣˊ'), 'chén');
  assert.equal(p('ㄌㄩˇ'), 'lǚ');
  assert.equal(p('ㄒㄩㄝˊ'), 'xué');
  assert.equal(p('ㄌㄧㄡˊ'), 'liú');
  assert.equal(p('ㄍㄨㄟˋ'), 'guì');
  assert.equal(p('ㄓ'), 'zhī');
  assert.equal(p('ㄩㄥˇ'), 'yǒng');
  assert.equal(toIpa(parseZhuyin('ㄘㄞˋ')), 'tsʰai˥˩');
  assert.equal(toIpa(parseZhuyin('ㄒㄧㄝˋ')), 'ɕjɛ˥˩');
});

test('只留漢字；空白、英文、數字、表情符號都不會被當成名字的一部分', () => {
  assert.deepEqual(hanOnly(' 王 小-明 Jr. 3 🙂'), ['王', '小', '明']);
  assert.deepEqual(hanOnly('Kulilay Amit'), []);
});

test('切姓名：單姓、複姓、手動指定姓的字數', () => {
  assert.deepEqual(splitName(['陳', '怡', '君']), {
    surname: '陳',
    given: '怡君',
    compound: false,
  });
  assert.deepEqual(splitName(['歐', '陽', '靖']), {
    surname: '歐陽',
    given: '靖',
    compound: true,
  });
  // 兩個字的名字開頭剛好是複姓：不自動切成複姓＋空名
  assert.deepEqual(splitName(['司', '馬']), {
    surname: '司',
    given: '馬',
    compound: false,
  });
  // 冠配偶姓或雙姓無法從字面判斷，由使用者指定
  assert.deepEqual(splitName(['張', '陳', '素', '珠'], 2), {
    surname: '張陳',
    given: '素珠',
    compound: true,
  });
  assert.ok(
    COMPOUND_SURNAMES.includes('范姜') && COMPOUND_SURNAMES.includes('張簡'),
  );
  assert.equal(new Set(COMPOUND_SURNAMES).size, COMPOUND_SURNAMES.length);
});

test('姓氏讀音表：每一筆都是合法注音，且拼得出四套', () => {
  for (const [ch, z] of Object.entries(SURNAME_READINGS)) {
    assert.ok(romanizeSyllable(z), `${ch} ${z}`);
  }
});

test('字音表：形狀、來源、常見姓與名都查得到', { skip: !dict }, () => {
  assert.ok(dict.meta.chars > 13000);
  assert.equal(dict.meta.sources.length, 2);
  for (const s of dict.meta.sources) assert.ok(s.license && s.url);
  // 每個讀音都是引擎拆得開的注音
  let bad = 0;
  for (const v of Object.values(dict.r))
    for (const z of v.split(',')) if (!romanizeSyllable(z)) bad++;
  assert.equal(bad, 0);
  for (const ch of '陳林黃張李王吳劉蔡楊許鄭謝洪郭邱曾廖賴徐周葉蘇莊呂江何蕭羅高')
    assert.ok(dict.r[ch], `字音表缺 ${ch}`);
  assert.equal(dict.r['陳'], 'ㄔㄣˊ');
});

test(
  '多音姓：當姓時改用姓氏讀音，並把其他讀音留給使用者選',
  { skip: !dict },
  () => {
    const zeng = lookupReadings('曾', dict.r, true);
    assert.equal(zeng.readings[0], 'ㄗㄥ');
    assert.ok(zeng.readings.includes('ㄘㄥˊ'));
    assert.equal(zeng.surnameOverride, true);
    // 同一個字當名字用時不套姓氏讀音
    assert.equal(lookupReadings('曾', dict.r, false).readings[0], 'ㄘㄥˊ');
    assert.equal(lookupReadings('沈', dict.r, true).readings[0], 'ㄕㄣˇ');
    assert.equal(lookupReadings('單', dict.r, true).readings[0], 'ㄕㄢˋ');
    assert.equal(lookupReadings('解', dict.r, true).readings[0], 'ㄒㄧㄝˋ');
    assert.equal(lookupReadings('區', dict.r, true).readings[0], 'ㄡ');
  },
);

test('查不到的字回空陣列，不猜讀音', { skip: !dict }, () => {
  assert.deepEqual(lookupReadings('陳', {}).readings, []);
  assert.deepEqual(lookupReadings('A', dict.r).readings, []);
  assert.deepEqual(lookupReadings('あ', dict.r).readings, []);
});

test(
  '字音表裡不在官方對照表的音節是已知的少數幾個，工具要能認出來',
  { skip: !dict },
  () => {
    const official = new Set(boca.rows.map((r) => r[0]));
    const outside = new Set();
    for (const v of Object.values(dict.r))
      for (const z of v.split(','))
        if (!official.has(stripTone(z))) outside.add(stripTone(z));
    // 方言字、擬聲字的音節（例：𰻞 ㄅㄧㄤˊ、嗲 ㄉㄧㄚˇ）；新增時這裡會紅，逼人來看
    assert.deepEqual(
      [...outside].sort(),
      ['ㄅㄧㄤ', 'ㄆㄧㄚ', 'ㄙㄟ', 'ㄉㄧㄚ', 'ㄈㄧㄠ', 'ㄝ', 'ㄋㄨㄣ'].sort(),
    );
  },
);

test('護照格式：姓在前、逗號、名字音節之間短橫', () => {
  assert.deepEqual(formatName(['ㄘㄞˋ'], ['ㄧㄥ', 'ㄨㄣˊ'], 'wg'), {
    surname: 'TSAI',
    given: 'YING-WEN',
    passport: 'TSAI, YING-WEN',
  });
  assert.equal(
    formatName(['ㄡ', 'ㄧㄤˊ'], ['ㄐㄧㄥˋ'], 'hanyu').passport,
    'OUYANG, JING',
  );
  assert.equal(
    formatName(['ㄓㄤ'], ['ㄐㄩㄣ', 'ㄧㄚˇ'], 'tongyong').passport,
    'JHANG, JYUN-YA',
  );
  assert.equal(formatName(['ㄌㄧˇ'], [], 'wg').passport, 'LI');
  assert.equal(formatName(['ㄌㄧˇ'], ['ㄅㄅ'], 'wg'), null);
});

test('反查：羅馬字音節 → 可能的注音與系統（聲調未知）', () => {
  const idx = buildReverseIndex(boca.rows.map((r) => r[0]));
  const sysOf = (tok) => reverseLookup(tok, idx);
  // HSIEH 只可能是威妥瑪的 ㄒㄧㄝ
  assert.deepEqual(sysOf('Hsieh'), [{ system: 'wg', zhuyin: 'ㄒㄧㄝ' }]);
  // CHANG 有歧義：威妥瑪的 ㄓㄤ／ㄔㄤ，或其他三套的 ㄔㄤ
  const chang = sysOf('chang');
  assert.ok(chang.some((h) => h.system === 'wg' && h.zhuyin === 'ㄓㄤ'));
  assert.ok(chang.some((h) => h.system === 'hanyu' && h.zhuyin === 'ㄔㄤ'));
  // 不是任何一套的音節：回空，不硬湊
  assert.deepEqual(sysOf('Ing'), []);
  assert.deepEqual(sysOf('Jensen'), []);
  assert.deepEqual(tokenizeRoman("Ts'ai Ing-wen"), ['TSAI', 'ING', 'WEN']);
  assert.deepEqual(tokenizeRoman('Lǚ Xiù-lián'), ['LU', 'XIU', 'LIAN']);
});
