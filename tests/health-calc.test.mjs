/**
 * health-calc.test.mjs — /health 試算工具的單元測試。
 *
 * 真值全部來自官方公告，不是我們自己算的：
 *  - 健保：健保署「保險費負擔金額表」115 年 1 月 1 日起實施各表、官網釋例
 *    （出處寫在每個 describe；受僱者全表 58 級在 tests/fixtures/health-nhi-employee-2026.json）
 *  - 長照：《長期照顧服務申請及給付辦法》附表二、三、五與第 10 條
 *
 * 跑法：node --experimental-strip-types --test tests/health-calc.test.mjs
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  calcPremium,
  calcSupplementary,
  insuredAmountFor,
} from '../src/utils/health/nhiCalc.ts';
import {
  calcLtc,
  checkEligibility,
  transportClassFor,
} from '../src/utils/health/ltcCalc.ts';

const J = (p) => JSON.parse(readFileSync(new URL(p, import.meta.url)));
const nhi = J('../src/data/health/nhi-rules.json');
const ltc = J('../src/data/health/ltc-rules.json');
const employeeTable = J('./fixtures/health-nhi-employee-2026.json');

describe('健保：投保金額分級表（115.01.01 生效，58 級）', () => {
  // https://www.nhi.gov.tw/ch/cp-19421-f9533-2569-1.html
  test('58 級、29,500 到 313,000、嚴格遞增', () => {
    assert.equal(nhi.grades.length, 58);
    assert.equal(nhi.grades[0], 29500);
    assert.equal(nhi.grades.at(-1), 313000);
    for (let i = 1; i < nhi.grades.length; i++)
      assert.ok(nhi.grades[i] > nhi.grades[i - 1]);
  });
  test('月薪對到「不低於月薪的最近一級」', () => {
    // 分級表：第 9 級 42,000 的實際薪資月額是 40,101–42,000
    assert.equal(insuredAmountFor(nhi.grades, 40101), 42000);
    assert.equal(insuredAmountFor(nhi.grades, 42000), 42000);
    assert.equal(insuredAmountFor(nhi.grades, 42001), 43900);
    assert.equal(insuredAmountFor(nhi.grades, 20000), 29500);
    assert.equal(insuredAmountFor(nhi.grades, 999999), 313000);
  });
});

describe('健保：受僱者負擔金額表（三）全 58 級', () => {
  // https://www.nhi.gov.tw/ch/cp-19418-9eefb-2576-1.html（115 年 1 月 1 日起實施）
  for (const [grade, amt, s0, s1, s2, s3, emp, gov] of employeeTable.rows) {
    test(`第 ${grade} 級 ${amt}`, () => {
      const self = [s0, s1, s2, s3];
      for (let d = 0; d <= 3; d++) {
        const r = calcPremium(nhi, {
          category: 'employee',
          salary: amt,
          dependents: d,
        });
        assert.equal(r.insuredAmount, amt);
        assert.equal(r.insuredTotal, self[d], `本人+${d} 眷口`);
      }
      const r = calcPremium(nhi, { category: 'employee', salary: amt });
      assert.equal(r.employer, emp, '投保單位負擔');
      assert.equal(r.government, gov, '政府補助');
    });
  }
  test('眷屬超過三口以三口計（健保法第 18 條）', () => {
    const a = calcPremium(nhi, {
      category: 'employee',
      salary: 45800,
      dependents: 3,
    });
    const b = calcPremium(nhi, {
      category: 'employee',
      salary: 45800,
      dependents: 6,
    });
    assert.equal(a.insuredTotal, 2840);
    assert.equal(b.insuredTotal, 2840);
  });
});

describe('健保：其他身分的官方表與釋例', () => {
  const cases = [
    // 職業工會表（四）https://www.nhi.gov.tw/ch/cp-19419-17c8e-2578-1.html
    ['union', 29500, [915, 1830, 2745, 3660]],
    ['union', 45800, [1421, 2842, 4263, 5684]],
    ['union', 87600, [2717, 5434, 8151, 10868]],
    ['union', 313000, [9709, 19418, 29127, 38836]],
    // 雇主等表（五）https://www.nhi.gov.tw/ch/cp-19439-f2f35-2580-1.html
    ['employer', 45800, [2368, 4736, 7104, 9472]],
    ['employer', 87600, [4529, 9058, 13587, 18116]],
    ['employer', 313000, [16182, 32364, 48546, 64728]],
    // 農會、漁會會員表（六）https://www.nhi.gov.tw/ch/cp-19440-7f59a-2583-1.html
    ['farmer', 0, [458, 916, 1374, 1832]],
    // 地區人口表（七）https://www.nhi.gov.tw/ch/cp-5719-69026-2584-1.html
    ['regional', 0, [826, 1652, 2478, 3304]],
  ];
  for (const [category, salary, expected] of cases) {
    test(`${category} ${salary || ''}`.trim(), () => {
      expected.forEach((want, d) => {
        const r = calcPremium(nhi, { category, salary, dependents: d });
        assert.equal(r.insuredTotal, want, `本人+${d} 眷口`);
      });
    });
  }
  // 官網釋例 https://www.nhi.gov.tw/ch/cp-3277-6c895-2588-1.html
  test('釋例：受僱者 53,000、2 口眷屬 = 2,466；無眷屬 822', () => {
    assert.equal(
      calcPremium(nhi, { category: 'employee', salary: 53000, dependents: 2 })
        .insuredTotal,
      2466,
    );
    assert.equal(
      calcPremium(nhi, { category: 'employee', salary: 53000 }).insuredTotal,
      822,
    );
  });
  test('釋例：職業工會 53,000、2 口眷屬 = 4,932', () => {
    assert.equal(
      calcPremium(nhi, { category: 'union', salary: 53000, dependents: 2 })
        .insuredTotal,
      4932,
    );
  });
  test('釋例：雇主 57,800、1 口眷屬 = 5,976', () => {
    assert.equal(
      calcPremium(nhi, { category: 'employer', salary: 57800, dependents: 1 })
        .insuredTotal,
      5976,
    );
  });
  test('釋例：投保單位負擔 53,000 → 公務 2,992／私校 1,496／受僱者 2,565', () => {
    assert.equal(
      calcPremium(nhi, { category: 'civil', salary: 53000 }).employer,
      2992,
    );
    assert.equal(
      calcPremium(nhi, { category: 'privateSchool', salary: 53000 }).employer,
      1496,
    );
    assert.equal(
      calcPremium(nhi, { category: 'employee', salary: 53000 }).employer,
      2565,
    );
  });
  test('身分下限：職業工會 29,500 起、雇主 42,000 起', () => {
    assert.equal(
      calcPremium(nhi, { category: 'union', salary: 10000 }).insuredAmount,
      29500,
    );
    assert.equal(
      calcPremium(nhi, { category: 'employer', salary: 30000 }).insuredAmount,
      42000,
    );
  });
  test('不認得的身分會丟錯，不回傳看似合理的數字', () => {
    assert.throws(() => calcPremium(nhi, { category: 'nope', salary: 50000 }));
  });
});

describe('健保：補充保費（費率 2.11%，健保法第 31 條與官網上下限表）', () => {
  // https://www.nhi.gov.tw/ch/cp-4516-74b0f-2613-1.html
  test('股利、利息、租金、執行業務：單次達 20,000 才扣，以全額計', () => {
    assert.deepEqual(
      calcSupplementary(nhi, { kind: 'dividend', amount: 19999 }),
      {
        base: 0,
        premium: 0,
        reason: 'below-threshold',
      },
    );
    assert.equal(
      calcSupplementary(nhi, { kind: 'dividend', amount: 20000 }).premium,
      422,
    );
    assert.equal(
      calcSupplementary(nhi, { kind: 'rent', amount: 100000 }).premium,
      2110,
    );
  });
  test('兼職薪資：單次達基本工資 29,500 才扣', () => {
    assert.equal(
      calcSupplementary(nhi, { kind: 'partTime', amount: 29499 }).premium,
      0,
    );
    assert.equal(
      calcSupplementary(nhi, { kind: 'partTime', amount: 29500 }).premium,
      622,
    );
  });
  test('單次給付以 1,000 萬元為限', () => {
    assert.equal(
      calcSupplementary(nhi, { kind: 'dividend', amount: 50_000_000 }).premium,
      211000,
    );
  });
  test('獎金：只計全年累計超過當月投保金額 4 倍的部分', () => {
    assert.equal(
      calcSupplementary(nhi, {
        kind: 'bonus',
        amount: 180000,
        insuredAmount: 45800,
      }).reason,
      'bonus-within-multiple',
    );
    // 45,800 × 4 = 183,200；累計 250,000 → 計費 66,800 → 1,409
    const r = calcSupplementary(nhi, {
      kind: 'bonus',
      amount: 250000,
      insuredAmount: 45800,
    });
    assert.equal(r.base, 66800);
    assert.equal(r.premium, 1409);
  });
});

describe('長照：給付額度（辦法附表二）', () => {
  // https://law.moj.gov.tw/LawClass/LawGetFile.ashx?FileId=0000398330&lan=C
  // 同表另見 https://1966.gov.tw/LTC/cp-6533-70777-207.html
  const official = {
    2: 10020,
    3: 15460,
    4: 18580,
    5: 24100,
    6: 28070,
    7: 32090,
    8: 36180,
  };
  for (const [lv, quota] of Object.entries(official)) {
    test(`第 ${lv} 級照顧及專業服務 ${quota}`, () => {
      const r = calcLtc(ltc, {
        level: +lv,
        welfare: 'class3',
        county: '臺北市',
      });
      assert.equal(r.care.quota, quota);
      assert.equal(r.respite.quota, +lv <= 6 ? 32340 : 48510);
      assert.equal(r.assistive.quota, 40000);
    });
  }
  test('第 1 級與範圍外不給付（辦法第 7 條）', () => {
    assert.equal(calcLtc(ltc, { level: 1, welfare: 'class3' }).eligible, false);
    assert.equal(calcLtc(ltc, { level: 9, welfare: 'class3' }).eligible, false);
  });
});

describe('長照：部分負擔比率（辦法附表五，小數點後無條件捨去）', () => {
  // https://law.moj.gov.tw/LawClass/LawGetFile.ashx?FileId=0000398333&lan=C
  test('照顧及專業服務：第一類 0%、第二類 5%、第三類 16%', () => {
    const q = 10020;
    assert.equal(calcLtc(ltc, { level: 2, welfare: 'class1' }).care.copay, 0);
    assert.equal(calcLtc(ltc, { level: 2, welfare: 'class2' }).care.copay, 501);
    // 10,020 × 16% = 1,603.2 → 捨去為 1,603
    const r = calcLtc(ltc, { level: 2, welfare: 'class3' }).care;
    assert.equal(r.copay, 1603);
    assert.equal(r.subsidy, q - 1603);
  });
  test('交通接送四區：額度與第三類比率 30／27／25／21%', () => {
    const want = {
      臺北市: [1, 1680, 504],
      新北市: [2, 1840, 496],
      高雄市: [3, 2000, 500],
      花蓮縣: [4, 2400, 504],
    };
    for (const [county, [cls, quota, copay]] of Object.entries(want)) {
      const t = calcLtc(ltc, { level: 4, welfare: 'class3', county }).transport;
      assert.deepEqual([t.cls, t.quota, t.copay], [cls, quota, copay], county);
    }
    // 第二類 10／9／8／7%
    assert.equal(
      calcLtc(ltc, { level: 4, welfare: 'class2', county: '新北市' }).transport
        .copay,
      165,
    );
  });
  test('輔具第一組 3 年 40,000：第三類 30%、第二類 10%', () => {
    assert.equal(
      calcLtc(ltc, { level: 5, welfare: 'class3' }).assistive.copay,
      12000,
    );
    assert.equal(
      calcLtc(ltc, { level: 5, welfare: 'class2' }).assistive.copay,
      4000,
    );
  });
  test('喘息：第三類 16%（32,340 → 5,174；48,510 → 7,761）', () => {
    assert.equal(
      calcLtc(ltc, { level: 6, welfare: 'class3' }).respite.copay,
      5174,
    );
    assert.equal(
      calcLtc(ltc, { level: 7, welfare: 'class3' }).respite.copay,
      7761,
    );
  });
});

describe('長照：交通接送分區表（辦法附表三）', () => {
  // https://law.moj.gov.tw/LawClass/LawGetFile.ashx?FileId=0000398334&lan=C
  test('22 縣市都有分區、偏遠鄉鎮市區 48 個', () => {
    assert.equal(Object.keys(ltc.transport.countyClass).length, 22);
    assert.equal(ltc.transport.remoteTownships.length, 48);
    assert.equal(new Set(ltc.transport.remoteTownships).size, 48);
  });
  test('臺中市是第二區，但和平區算第四區', () => {
    assert.equal(transportClassFor(ltc, { county: '臺中市' }), 2);
    assert.equal(
      transportClassFor(ltc, { county: '臺中市', township: '和平區' }),
      4,
    );
    assert.equal(
      transportClassFor(ltc, { county: '臺中市', township: '西屯區' }),
      2,
    );
    assert.equal(transportClassFor(ltc, { county: '連江縣' }), 4);
  });
});

describe('長照：聘僱外籍家庭看護工（辦法第 10 條，額度 30%）', () => {
  test('第 8 級 36,180 × 30% = 10,854；第 2 級 = 3,006', () => {
    const r = calcLtc(ltc, {
      level: 8,
      welfare: 'class3',
      migrantCaregiver: true,
    });
    assert.equal(r.care.quota, 10854);
    assert.equal(r.care.migrantLimited, true);
    assert.equal(
      calcLtc(ltc, { level: 2, welfare: 'class3', migrantCaregiver: true }).care
        .quota,
      3006,
    );
  });
});

describe('長照：資格自查（辦法第 2 條）', () => {
  const E = ltc.eligibility;
  test('不需要協助就不在給付對象內', () => {
    assert.deepEqual(checkEligibility(E, { age: 80, needsHelp: false }), []);
  });
  test('65 歲以上；原住民 55 歲以上', () => {
    assert.deepEqual(checkEligibility(E, { age: 65, needsHelp: true }), [
      'elder',
    ]);
    assert.deepEqual(checkEligibility(E, { age: 64, needsHelp: true }), []);
    assert.deepEqual(
      checkEligibility(E, { age: 55, needsHelp: true, indigenous: true }),
      ['indigenous'],
    );
    assert.deepEqual(
      checkEligibility(E, { age: 54, needsHelp: true, indigenous: true }),
      [],
    );
  });
  test('身心障礙證明、失智症不限年齡（115 年 1 月 1 日起）', () => {
    assert.deepEqual(
      checkEligibility(E, { age: 30, needsHelp: true, disability: true }),
      ['disability'],
    );
    assert.deepEqual(
      checkEligibility(E, { age: 45, needsHelp: true, dementia: true }),
      ['dementia'],
    );
    assert.deepEqual(
      checkEligibility(E, { age: 40, needsHelp: true, pac: true }),
      ['pac'],
    );
  });
});
