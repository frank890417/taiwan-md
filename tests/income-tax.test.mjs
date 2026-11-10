/**
 * income-tax.test.mjs — 綜合所得稅試算的契約測試
 *（跑：node --experimental-strip-types --test tests/income-tax.test.mjs）
 *
 * 載入正式站在用的 src/utils/income/tax.ts 與 src/data/income/tax-{114,115}.json，
 * 期望值全部抄官方算例（出處網址寫在各測試上方），不另外重抄規則。
 * 事實來源：reports/research/2026-11/income-topic-01-income-tax.md
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  bracketTax,
  computeIncomeTax,
  taxFreeThreshold,
} from '../src/utils/income/tax.ts';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const load = (n) =>
  JSON.parse(readFileSync(join(ROOT, `src/data/income/tax-${n}.json`), 'utf8'));
const P114 = load(114);
const P115 = load(115);

const party = (salary = 0, interest = 0, dividend = 0, other = 0) => ({
  salary,
  interest,
  dividend,
  other,
});
const noDeps = {
  general: 0,
  elderly70: 0,
  minorChildren: 0,
  preschool: 0,
  college: 0,
  disabled: 0,
  longTermCare: 0,
};
const ORDER = [
  'joint',
  'selfSalarySeparate',
  'spouseSalarySeparate',
  'selfAllSeparate',
  'spouseAllSeparate',
];
const pick = (r, dividendMethod) =>
  ORDER.map((m) => {
    const o = r.methods.find(
      (x) => x.method === m && x.dividendMethod === dividendMethod,
    );
    assert.ok(o, `missing ${m}/${dividendMethod}`);
    return o;
  });

// ---------------------------------------------------------------------------
// 1. 速算公式邊界值
// 114：https://www.dot.gov.tw/download/5ed91bbeb60642e583fadb9263e29e51
//      公報 https://gazette.nat.gov.tw/EG_FileManager/eguploadpub/eg030223/ch04/type3/gov30/num16/Eg.htm
// 115：https://www.mof.gov.tw/download/ae68ed6e8bfd4b66b0e7bc0ab515bdd0
//      公報 https://gazette.nat.gov.tw/EG_FileManager/eguploadpub/eg031224/ch04/type3/gov30/num12/Eg.htm
// 各級距上緣的稅額 = 公報「課徵 X 元，加超過 Y 元部分之 Z%」的 X
// ---------------------------------------------------------------------------
test('bracketTax 114 年度：全部級距邊界', () => {
  const cases = [
    [-5, 0],
    [0, 0],
    [1, 0], // 0.05 元，無條件捨去
    [20, 1],
    [590000, 29500],
    [590001, 29500], // 29,500.12 捨去
    [1330000, 118300],
    [1330001, 118300],
    [2660000, 384300],
    [2660001, 384300],
    [4980000, 1080300],
    [4980001, 1080300],
    [5000000, 1088300], // 5,000,000×40%−911,700
  ];
  for (const [net, want] of cases)
    assert.equal(bracketTax(net, P114), want, `net=${net}`);
});

test('bracketTax 115 年度：全部級距邊界', () => {
  const cases = [
    [0, 0],
    [610000, 30500],
    [610001, 30500],
    [1380000, 122900],
    [1380001, 122900],
    [2770000, 400900],
    [2770001, 400900],
    [5190000, 1126900],
    [5190001, 1126900],
    [6000000, 1450900], // 6,000,000×40%−949,100
  ];
  for (const [net, want] of cases)
    assert.equal(bracketTax(net, P115), want, `net=${net}`);
});

test('速算公式與「課徵 X 元加超過 Y 元部分」兩種寫法一致（兩年度）', () => {
  for (const P of [P114, P115]) {
    const rows = P.brackets.rows;
    let cum = 0;
    let prev = 0;
    for (let i = 0; i < rows.length; i++) {
      const mid = rows[i].upTo === null ? prev + 1000000 : rows[i].upTo;
      const viaCum = Math.floor(cum + (mid - prev) * rows[i].rate);
      assert.equal(bracketTax(mid, P), viaCum, `level ${i + 1}`);
      if (rows[i].upTo !== null) {
        cum = cum + (rows[i].upTo - prev) * rows[i].rate;
        prev = rows[i].upTo;
      }
    }
  }
});

// ---------------------------------------------------------------------------
// 2. 稅務入口網「納稅義務人與配偶如何申報較為有利」（114 年度）
// https://www.etax.nat.gov.tw/etwmain/tax-info/understanding/tax-saving-secret/GYvNwBz
// 受扶養親屬 1 人（未滿 70 歲）利息 10 萬 → dependentsInterest。
// ---------------------------------------------------------------------------
const D1 = {
  married: true,
  self: party(2018000, 150000, 1000000, 400000),
  spouse: party(1518000, 100000, 600000, 200000),
  dependents: { ...noDeps, general: 1 },
  dependentsInterest: 100000,
  deduction: { type: 'standard' },
  rent: 0,
  withheld: 210000,
};

test('D-1 股利合併計稅五種方式的應納稅額', () => {
  const r = computeIncomeTax(D1, P114);
  assert.deepEqual(
    pick(r, 'combined').map((o) => o.taxPayable),
    [1034400, 716400, 776560, 722300, 678400],
  );
});

test('D-1 股利 28% 分開計稅五種方式（不含股利稅）的應納稅額', () => {
  const r = computeIncomeTax(D1, P114);
  assert.deepEqual(
    pick(r, 'separate28').map((o) => o.taxPayable),
    [554400, 350000, 360160, 372880, 350000],
  );
});

test('D-1 官方結論：合併計稅第 5 種最低，應納 678,400、應自行繳納 388,400', () => {
  const r = computeIncomeTax(D1, P114);
  assert.equal(r.method, 'spouseAllSeparate');
  assert.equal(r.dividendMethod, 'combined');
  assert.equal(r.taxPayable, 678400);
  assert.equal(r.dividendCredit, 80000); // 1,600,000×8.5%=136,000，上限 8 萬
  assert.equal(r.balance, 388400);
  // 官方列出的 28% 分開計稅應自行繳納（= 應納稅額 + 448,000 − 210,000）
  assert.deepEqual(
    pick(r, 'separate28').map((o) => o.totalDue - 210000),
    [792400, 588000, 598160, 610880, 588000],
  );
  // 官方列出的合併計稅應自行繳納
  assert.deepEqual(
    pick(r, 'combined').map((o) => o.totalDue - 210000),
    [744400, 426400, 486560, 432300, 388400],
  );
  assert.equal(r.grossIncome, 5650000);
  assert.equal(r.exemptions, 291000);
});

// ---------------------------------------------------------------------------
// 3. 稅務入口網 Q&A 1239（114 年度，3 口之家，定額減除薪資所得特別扣除額）
// https://www.etax.nat.gov.tw/etwmain/tax-info/understanding/tax-q-and-a/national/individual-income-tax/exemption-scope/rule/LE0K8lg
// 與 D-1 是不同輸入（薪資收入 200 萬、150 萬）。
// ---------------------------------------------------------------------------
const D2 = {
  ...D1,
  self: party(2000000, 150000, 1000000, 400000),
  spouse: party(1500000, 100000, 600000, 200000),
};

test('D-2 Q&A 1239 合併計稅 5 個應納稅額與應自行繳納', () => {
  const r = computeIncomeTax(D2, P114);
  const c = pick(r, 'combined');
  assert.deepEqual(
    c.map((o) => o.taxPayable),
    [1023600, 707400, 769000, 713300, 669400],
  );
  assert.deepEqual(
    c.map((o) => o.totalDue - 210000),
    [733600, 417400, 479000, 423300, 379400],
  );
});

test('D-2 Q&A 1239 股利 28% 分開計稅 5 個應納稅額與應自行繳納', () => {
  const r = computeIncomeTax(D2, P114);
  const s = pick(r, 'separate28');
  assert.deepEqual(
    s.map((o) => o.taxPayable),
    [543600, 342800, 354400, 367120, 342800],
  );
  assert.deepEqual(
    s.map((o) => o.totalDue - 210000),
    [781600, 580800, 592400, 605120, 580800],
  );
});

test('D-2 官方結論：合併計稅（五）配偶各類所得分開最有利，應自行繳納 379,400', () => {
  const r = computeIncomeTax(D2, P114);
  assert.equal(r.method, 'spouseAllSeparate');
  assert.equal(r.dividendMethod, 'combined');
  assert.equal(r.balance, 379400);
  assert.equal(r.grossIncome, 5614000);
});

// ---------------------------------------------------------------------------
// 4. 臺北國稅局 114 年度簡式申報書範例
// https://www.ntbt.gov.tw/singlehtml/9de2c2c966cb4fb48aca9dddf1fcae9c?cntId=e1277e0a4b694de9838b26aabd21574f
// PDF https://www.ntbt.gov.tw/download/c845267655544af2a4ec708beaa794ec
// 確定的部分：薪資收入 1,200,000／300,000、利息 56,000／20,000、股利合計 1,100,000、
// 全部免稅額 533,500（1 位 70 歲以上＋4 位一般）、分開者各類所得 902,000、
// 其餘部分扣除額 741,000、扣繳 33,600。
// 重建（研究檔「題目條件不足」之處）：分開者必為劉美美（82,000+20,000 利息+800,000 股利 = 902,000；
// 李大華的薪資所得 982,000 已超過 902,000）；股利分配（劉 80 萬、李 30 萬）由此推得；
// 70 歲以上者設為受扶養直系尊親屬、其餘 2 位為一般受扶養親屬（共 5 人）；扣除額組成 PDF 未逐項解讀，總扣除額 = 741,000 + 分開者儲蓄投資 20,000
// = 761,000，其中儲蓄投資 76,000，其餘 685,000 以「列舉扣除額」總額代入（不影響結果）。
// ---------------------------------------------------------------------------
test('D-3 國稅局簡式範例：分開 52,900、其餘 8,025、應納 60,925、扣抵後 −52,675', () => {
  const input = {
    married: true,
    self: party(1200000, 56000, 300000, 0), // 李大華
    spouse: party(300000, 20000, 800000, 0), // 劉美美（分開者）
    dependents: { ...noDeps, elderly70: 1, general: 2 },
    deduction: { type: 'itemized', amount: 685000 },
    rent: 0,
    withheld: 33600,
  };
  const r = computeIncomeTax(input, P114);
  assert.equal(r.exemptions, 533500);
  assert.equal(r.grossIncome, 2240000);
  const o = r.methods.find(
    (x) => x.method === 'spouseAllSeparate' && x.dividendMethod === 'combined',
  );
  assert.equal(o.taxPayable, 60925); // 52,900 + 8,025
  assert.equal(o.totalDue, 60925 - 80000);
  assert.equal(o.totalDue - 33600, -52675);
  // 基本生活費：213,000×5 = 1,065,000 < 比較項目 1,294,500，差額 0
  assert.equal(r.basicLivingDifference, 0);
});

test.todo(
  'D-3 逐欄對位：PDF 是表單，誰是 70 歲以上、扣除額逐項組成（標準／列舉／特別）、股利在兩人間的分配，pdftotext 抽出後無法確定，需人工開 PDF 補齊',
);

// ---------------------------------------------------------------------------
// 5. 財政部免稅門檻
// 114 單身租屋 62.6 萬：https://www.mof.gov.tw/singlehtml/384fb3077bb349ea973e7fc6f13b6974?cntId=ef27a333aeb6491782f526bff6e0d966
// 115 三個門檻（2025-11-27 新聞稿）：https://www.mof.gov.tw/singlehtml/384fb3077bb349ea973e7fc6f13b6974?cntId=34b463dc8f1b49f29d440d92a6fd5139
// ---------------------------------------------------------------------------
const single = (extra = {}) => ({
  married: false,
  self: party(),
  dependents: { ...noDeps },
  deduction: { type: 'standard' },
  rent: 180000,
  ...extra,
});
const couple = (extra = {}) => ({
  married: true,
  self: party(),
  spouse: party(),
  dependents: { ...noDeps },
  deduction: { type: 'standard' },
  rent: 180000,
  ...extra,
});

test('財政部免稅門檻：114 年度單身租屋 626,000', () => {
  assert.equal(taxFreeThreshold(single(), P114), 626000);
});

test('財政部免稅門檻：115 年度單身租屋 644,000、雙薪租屋 1,108,000', () => {
  assert.equal(taxFreeThreshold(single(), P115), 644000);
  assert.equal(taxFreeThreshold(couple(), P115), 1108000);
});

test('財政部免稅門檻：115 年度四口之家（租屋、2 名 6 歲以下子女）1,685,000，需關掉未成年加成', () => {
  // 該數字是 2025-11-27 發布，早於 2026-09-11 公布的未成年子女免稅額 +50%，
  // 所以官方的 168.5 萬 = 4×101,000 + 272,000 + 2×227,000 + 180,000 + (150,000+225,000)。
  const four = couple({
    dependents: { ...noDeps, minorChildren: 2, preschool: 2 },
  });
  assert.equal(taxFreeThreshold(four, P115, { minorBonus: false }), 1685000);
});

test('四口之家含未成年加成後的新門檻大於 1,685,000（不寫死官方沒給的數字）', () => {
  const four = couple({
    dependents: { ...noDeps, minorChildren: 2, preschool: 2 },
  });
  assert.ok(taxFreeThreshold(four, P115) > 1685000);
  // 114 年度沒有加成，開不開結果相同
  assert.equal(
    taxFreeThreshold(four, P114),
    taxFreeThreshold(four, P114, { minorBonus: false }),
  );
});

test.todo(
  '三代同堂免稅門檻：財政部有 218.35 萬（2025-11-27）與 224.35 萬（2026-02-03）兩版，官方未釐清，不測',
);

// ---------------------------------------------------------------------------
// 6. 基本生活費差額
// ---------------------------------------------------------------------------
test('114 年度基本生活費差額 > 0（非官方算例，依施行細則第 3 條公式手算）', () => {
  // 單身、扶養 3 名一般親屬，薪資收入 1,500,000，標準扣除額，無其他所得。
  // 依 https://law-out.mof.gov.tw/LawContent.aspx?id=GL010324 第 3 條：
  //   基本生活費總額 = 213,000 × 4 人 = 852,000
  //   比較項目 = 免稅額 97,000×4 = 388,000 + 標準扣除額 131,000 = 519,000（不含薪資所得特別扣除額）
  //   差額 = 852,000 − 519,000 = 333,000
  //   薪資所得 = 1,500,000 − 218,000 = 1,282,000
  //   淨額 = 1,282,000 − 519,000 − 333,000 = 430,000 → 5% = 21,500
  const r = computeIncomeTax(
    {
      married: false,
      self: party(1500000),
      dependents: { ...noDeps, general: 3 },
      deduction: { type: 'standard' },
      rent: 0,
    },
    P114,
  );
  assert.equal(r.basicLivingDifference, 333000);
  assert.equal(r.netIncome, 430000);
  assert.equal(r.taxPayable, 21500);
  assert.ok(!r.warnings.includes('BASIC_LIVING_NOT_ANNOUNCED'));
});

test('115 年度基本生活費未公告：差額為 null、視為 0 並出 warning', () => {
  assert.equal(P115.basicLiving.perPerson, null);
  const r = computeIncomeTax(
    {
      married: false,
      self: party(1500000),
      dependents: { ...noDeps, general: 3 },
      deduction: { type: 'standard' },
      rent: 0,
    },
    P115,
  );
  assert.equal(r.basicLivingDifference, null);
  assert.ok(r.warnings.includes('BASIC_LIVING_NOT_ANNOUNCED'));
  // 沒有差額：1,500,000−227,000−4×101,000−136,000 = 733,000 → 30,500+12%×123,000 = 45,260
  assert.equal(r.netIncome, 733000);
  assert.equal(r.taxPayable, 45260);
});

// ---------------------------------------------------------------------------
// 7. 115 年度未成年子女免稅額 +50%
// 法條與新聞稿：https://www.dot.gov.tw/singlehtml/ch26?cntId=9665f10945c74724805d51a8bf52a09f
// 「第 1 名 30.15 萬、第 2 名以上 37.65 萬」= 免稅額 15.15 萬 + 幼兒學前 15 / 22.5 萬
// ---------------------------------------------------------------------------
test('115 年度未成年子女免稅額 151,500 且可與幼兒學前疊加', () => {
  const r = computeIncomeTax(
    couple({
      rent: 0,
      self: party(3000000),
      dependents: { ...noDeps, minorChildren: 2, preschool: 2 },
    }),
    P115,
  );
  assert.equal(r.exemptions, 2 * 101000 + 2 * 151500);
  assert.equal(r.specialDeductions.preschool, 375000);
  // 新聞稿：第 1 名 301,500、第 2 名 376,500
  assert.equal(151500 + 150000, 301500);
  assert.equal(151500 + 225000, 376500);
  // 114 年度沒有加成
  const r114 = computeIncomeTax(
    couple({
      rent: 0,
      self: party(3000000),
      dependents: { ...noDeps, minorChildren: 2, preschool: 2 },
    }),
    P114,
  );
  assert.equal(r114.exemptions, 4 * 97000);
});

// ---------------------------------------------------------------------------
// 8. 長照與房租排富
// 法條：https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0340003&flno=17
//   「經減除長期照顧特別扣除額及房屋租金支出特別扣除額後……適用稅率在百分之二十以上」不得扣
// 節稅手冊：https://www.etax.nat.gov.tw/etwmain/tax-info/understanding/tax-saving-manual/national/individual-income-tax/k2Jbgrp
// ---------------------------------------------------------------------------
test('排富：減除後落在 20% 級距 → 長照與房租扣除額為 0 並出 warning', () => {
  // 114 年度，已婚、本人薪資收入 2,500,000、長照 1 人、房租 150,000
  // 薪資所得 2,282,000；免稅額 194,000；標準扣除額 262,000
  // 減除長照 180,000 與房租 150,000 後淨額 1,496,000 → 20% 以上 → 兩項扣除額作廢重算：
  // 淨額 2,282,000−194,000−262,000 = 1,826,000，稅額 1,826,000×20%−147,700 = 217,500
  const r = computeIncomeTax(
    couple({
      rent: 150000,
      self: party(2500000),
      dependents: { ...noDeps, longTermCare: 1 },
    }),
    P114,
  );
  assert.equal(r.specialDeductions.longTermCare, 0);
  assert.equal(r.specialDeductions.rent, 0);
  assert.ok(r.warnings.includes('LTC_RENT_EXCLUDED_RATE20'));
  assert.equal(r.method, 'joint');
  assert.equal(r.netIncome, 1826000);
  assert.equal(r.taxPayable, 217500);
});

test('排富：減除後落在 12% 級距 → 兩項扣除額照扣，即使不扣會落在 20%', () => {
  // 薪資收入 2,304,000 → 薪資所得 2,086,000；−194,000−262,000−180,000−150,000 = 1,300,000（12%）
  const r = computeIncomeTax(
    couple({
      rent: 150000,
      self: party(2304000),
      dependents: { ...noDeps, longTermCare: 1 },
    }),
    P114,
  );
  assert.equal(r.method, 'joint');
  assert.equal(r.specialDeductions.longTermCare, 180000);
  assert.equal(r.specialDeductions.rent, 150000);
  assert.equal(r.netIncome, 1300000);
  assert.equal(r.taxPayable, 1300000 * 0.12 - 41300);
  assert.ok(!r.warnings.includes('LTC_RENT_EXCLUDED_RATE20'));
});

test('排富：選 28% 股利分開計稅時長照與房租不得扣', () => {
  // 股利 4,000,000（8.5% 抵減上限 8 萬 vs 28% 稅 1,120,000）：合併計稅較省，不會選 28%；
  // 這裡只檢查 28% 那一列的內容：同一輸入的 28% 列，淨額不含長照與房租。
  const input = single({
    rent: 100000,
    self: party(600000, 0, 200000, 0),
    dependents: { ...noDeps, longTermCare: 1 },
  });
  const r = computeIncomeTax(input, P114);
  const s28 = r.methods.find((x) => x.dividendMethod === 'separate28');
  // 28% 列：薪資所得 382,000 − 97,000 − 131,000 = 154,000（長照房租不得扣）→ 5% = 7,700
  assert.equal(s28.taxPayable, 7700);
  assert.equal(s28.totalDue, 7700 + 56000); // 200,000×28%
});

test('超過基本所得額門檻 750 萬加 AMT_NOT_COMPUTED warning', () => {
  const r = computeIncomeTax(
    single({ rent: 0, self: party(0, 0, 8000000, 0) }),
    P114,
  );
  assert.ok(r.warnings.includes('AMT_NOT_COMPUTED'));
  const r2 = computeIncomeTax(single({ rent: 0, self: party(1000000) }), P114);
  assert.ok(!r2.warnings.includes('AMT_NOT_COMPUTED'));
});

// ---------------------------------------------------------------------------
// 9. 資料檔契約
// ---------------------------------------------------------------------------
test('年度資料檔：_meta、source、announced 齊全；115 的基本生活費為 null 並在 notes 說明', () => {
  for (const [P, fy] of [
    [P114, 114],
    [P115, 115],
  ]) {
    assert.equal(P._meta.fiscalYear, fy);
    assert.equal(P._meta.asOf, '2026-11-10');
    assert.ok(P._meta.filingPeriod && Array.isArray(P._meta.notes));
    for (const k of Object.keys(P).filter((k) => k !== '_meta')) {
      assert.ok(
        'source' in P[k] && 'announced' in P[k],
        `${fy}.${k} 缺 source／announced`,
      );
    }
    assert.equal(P.longTermCareDeduction.perPerson, 180000);
    assert.equal(P.amt.threshold, 7500000);
  }
  assert.equal(P114.basicLiving.perPerson, 213000);
  assert.equal(P114.exemption.minorChild, null);
  assert.equal(P115.exemption.minorChild, 151500);
  assert.ok(P115._meta.notes.some((n) => n.includes('沒有資料')));
});

test('單身只有 joint 一種計稅方式；無股利時 dividendMethod 為 none', () => {
  const r = computeIncomeTax(single({ rent: 0, self: party(1000000) }), P114);
  assert.equal(r.methods.length, 1);
  assert.equal(r.methods[0].method, 'joint');
  assert.equal(r.dividendMethod, 'none');
  assert.equal(
    computeIncomeTax(single({ self: party() }), P114).effectiveRate,
    0,
  );
});
