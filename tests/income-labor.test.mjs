/**
 * income-labor.test.mjs — 勞保年金、勞退、保險費、實領薪資的純函式契約
 *（跑：node --experimental-strip-types --test tests/income-labor.test.mjs）
 *
 * 官方算例與表格數字出處：reports/research/2026-11/income-topic-02-pension.md。
 * 每條案例註解寫網址。官方對不上就保留失敗，不改期望值。
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';

import {
  statutoryPensionAge,
  insuredSalaryGrade,
  computeOldAgePension,
  pensionByClaimAge,
  monthlyPremium,
  oldAgeLumpSumMonths,
} from '../src/utils/income/laborInsurance.ts';
import {
  contributionGrade,
  annuityFactor,
  lifeExpectancyAt,
  monthlyPensionFromBalance,
  projectBalance,
} from '../src/utils/income/laborPension.ts';
import { computeTakeHome } from '../src/utils/income/takeHome.ts';

const data = JSON.parse(
  readFileSync(
    new URL('../src/data/income/labor-2026.json', import.meta.url),
    'utf8',
  ),
);
const LI = data.laborInsurance;
const LP = data.laborPension;
const OA = data.occupationalAccident;

// ---------------------------------------------------------------- 資料檔

test('資料檔：級距表筆數與端點', () => {
  assert.equal(LI.insuredSalaryGrades.length, 11);
  assert.equal(LI.insuredSalaryGrades[0], 29500);
  assert.equal(LI.insuredSalaryGrades[10], 45800);
  assert.equal(LP.contributionGrades.length, 62);
  assert.equal(LP.contributionGrades[0], 1500);
  assert.equal(LP.contributionGrades[24], 29500); // 第 25 級
  assert.equal(LP.contributionGrades[34], 45800); // 第 35 級
  assert.equal(LP.contributionGrades[61], 150000);
  assert.equal(OA.insuredSalaryGrades.length, 21);
  assert.equal(OA.insuredSalaryGrades[20], 72800);
  assert.equal(data._meta.effective, '2026-01-01');
  // 每個區塊都帶來源網址
  for (const k of ['laborInsurance', 'occupationalAccident', 'laborPension']) {
    assert.match(data[k].source, /^https:\/\//);
  }
  // 分級表嚴格遞增
  for (const g of [
    LI.insuredSalaryGrades,
    LP.contributionGrades,
    OA.insuredSalaryGrades,
  ]) {
    for (let i = 1; i < g.length; i++) assert.ok(g[i] > g[i - 1]);
  }
});

// ---------------------------------------------------------------- 法定請領年齡與級距

// https://www.bli.gov.tw/0019821.html 出生年次對照表（研究檔 A-4、A2）
test('法定請領年齡：每個出生年次', () => {
  const table = LI.claimAgeByBirthYear;
  const expect = [
    [30, 60],
    [45, 60],
    [46, 60],
    [47, 61],
    [48, 62],
    [49, 63],
    [50, 64],
    [51, 65],
    [52, 65],
    [70, 65],
  ];
  for (const [by, age] of expect)
    assert.equal(statutoryPensionAge(by, table), age, `born ${by}`);
});

// https://www.bli.gov.tw/Files/25661 勞工保險投保薪資分級表（115-01-01 起）
test('insuredSalaryGrade：取不低於薪資的最低一級，超過取最高', () => {
  const g = LI.insuredSalaryGrades;
  assert.equal(insuredSalaryGrade(20000, g), 29500);
  assert.equal(insuredSalaryGrade(29500, g), 29500);
  assert.equal(insuredSalaryGrade(29501, g), 30300);
  assert.equal(insuredSalaryGrade(43900, g), 43900);
  assert.equal(insuredSalaryGrade(43901, g), 45800);
  assert.equal(insuredSalaryGrade(200000, g), 45800);
});

// https://www.bli.gov.tw/Files/25709 勞工退休金月提繳分級表
test('contributionGrade：勞退 62 級', () => {
  const g = LP.contributionGrades;
  assert.equal(contributionGrade(1000, g), 1500);
  assert.equal(contributionGrade(28590, g), 28590);
  assert.equal(contributionGrade(28591, g), 29500);
  assert.equal(contributionGrade(45801, g), 48200);
  assert.equal(contributionGrade(40000, g), 40100);
  assert.equal(contributionGrade(147901, g), 150000);
  assert.equal(contributionGrade(999999, g), 150000);
});

// ---------------------------------------------------------------- 勞保年金官方算例

// https://www.bli.gov.tw/0019825.html 陳先生 45 年次、60 歲退休、年資 35 年 6 個月、平均 32,000
test('勞保局算例 C-1：17,608', () => {
  const r = computeOldAgePension(
    {
      avgInsuredSalary: 32000,
      years: 35,
      months: 6,
      birthYearROC: 45,
      claimAge: 60,
    },
    LI,
  );
  assert.equal(r.eligible, true);
  assert.equal(r.statutoryAge, 60);
  assert.equal(r.seniorityYears, 35.5);
  assert.equal(r.chosen, 'B');
  assert.equal(r.base, 17608);
  assert.equal(r.adjustmentRate, 0);
  assert.equal(r.monthly, 17608);
});

// https://www.bli.gov.tw/0019825.html 同人延至 63 歲，年資 38 年又 4/12 個月：19,012 → 21,293
test('勞保局算例 C-2：展延 3 年 21,293', () => {
  const r = computeOldAgePension(
    {
      avgInsuredSalary: 32000,
      years: 38,
      months: 4,
      birthYearROC: 45,
      claimAge: 63,
    },
    LI,
  );
  assert.equal(r.seniorityYears, 38.33);
  assert.equal(r.base, 19012);
  assert.equal(r.adjustmentRate, 0.12);
  assert.equal(r.monthly, 21293);
});

// https://www.bli.gov.tw/0019825.html 同人 57 歲退休，提前 3 年。官方算式用 33 年（32 年 11 個多月進為 33），
// 所以這裡輸入 33 年 0 個月：16,368 → 14,404
test('勞保局算例 C-3：提前 3 年 14,404', () => {
  const r = computeOldAgePension(
    {
      avgInsuredSalary: 32000,
      years: 33,
      months: 0,
      birthYearROC: 45,
      claimAge: 57,
    },
    LI,
  );
  assert.equal(r.base, 16368);
  assert.equal(r.adjustmentRate, -0.12);
  assert.equal(r.monthly, 14404);
  assert.equal(r.eligible, true);
});

// https://www.mol.gov.tw/1607/1632/1640/16464/post 勞動部 2011-03-30 新聞稿：36,000 × 30 年，61 歲申請 17,410
// 新聞稿沒寫出生年次，這裡取 45 年次（法定 60 歲）以對上「60 歲退休、61 歲申請」。
test('勞動部算例 C-4：展延 1 年 17,410', () => {
  const r = computeOldAgePension(
    {
      avgInsuredSalary: 36000,
      years: 30,
      months: 0,
      birthYearROC: 45,
      claimAge: 61,
    },
    LI,
  );
  assert.equal(r.base, 16740);
  assert.equal(r.adjustmentRate, 0.04);
  assert.equal(r.monthly, 17410);
});

// 條文第 58-1 條兩式擇優：年資短、均薪低時第一式（加 3,000）較高。手算：20000×15×0.00775+3000=5325；20000×15×0.0155=4650
test('兩式擇優：第一式勝出（照條文手算，非官方算例）', () => {
  const r = computeOldAgePension(
    {
      avgInsuredSalary: 20000,
      years: 15,
      months: 0,
      birthYearROC: 55,
      claimAge: 65,
    },
    LI,
  );
  assert.equal(r.chosen, 'A');
  assert.equal(r.formulaA, 5325);
  assert.equal(r.formulaB, 4650);
  assert.equal(r.base, 5325);
  assert.equal(r.monthly, 5325);
});

// 條文第 58-2 條：展延最多增給 20%、提前最多 5 年
test('展延上限 20%、提前超過 5 年不可請領（照條文）', () => {
  const late = computeOldAgePension(
    {
      avgInsuredSalary: 40000,
      years: 30,
      months: 0,
      birthYearROC: 55,
      claimAge: 72,
    },
    LI,
  );
  assert.equal(late.adjustmentRate, 0.2);
  const early = computeOldAgePension(
    {
      avgInsuredSalary: 40000,
      years: 30,
      months: 0,
      birthYearROC: 55,
      claimAge: 59,
    },
    LI,
  );
  assert.equal(early.eligible, false);
  assert.equal(early.reason, 'TOO_EARLY');
  const edge = computeOldAgePension(
    {
      avgInsuredSalary: 40000,
      years: 30,
      months: 0,
      birthYearROC: 55,
      claimAge: 60,
    },
    LI,
  );
  assert.equal(edge.eligible, true);
  assert.equal(edge.adjustmentRate, -0.2);
});

// 條文第 58 條、第 59 條：年資未滿 15 年不符年金條件，適用老年一次金。
// 一次金月數照條文手算（每滿一年 1 個月），不是勞保局公布的算例。
test('年資不足 15 年：不符年金、給一次金月數（照條文手算，非官方算例）', () => {
  const r = computeOldAgePension(
    {
      avgInsuredSalary: 30000,
      years: 12,
      months: 5,
      birthYearROC: 55,
      claimAge: 65,
    },
    LI,
  );
  assert.equal(r.eligible, false);
  assert.equal(r.reason, 'SENIORITY_UNDER_MIN');
  assert.equal(r.seniorityYears, 12.42);
  assert.equal(r.lumpSumMonths, 12);
  assert.equal(r.monthly, 0);
  const ok = computeOldAgePension(
    {
      avgInsuredSalary: 30000,
      years: 15,
      months: 0,
      birthYearROC: 55,
      claimAge: 65,
    },
    LI,
  );
  assert.equal(ok.eligible, true);
  assert.equal(ok.lumpSumMonths, null);
});

// 條文第 59 條（照條文手算，非官方算例）
test('老年一次金月數上限', () => {
  assert.equal(oldAgeLumpSumMonths(10, LI), 10);
  assert.equal(oldAgeLumpSumMonths(15, LI), 15);
  assert.equal(oldAgeLumpSumMonths(20, LI), 25); // 15 + 5×2
  assert.equal(oldAgeLumpSumMonths(30, LI), 45); // 15 + 15×2 = 45
  assert.equal(oldAgeLumpSumMonths(40, LI), 45);
  assert.equal(oldAgeLumpSumMonths(40, LI, 5), 50); // 逾 60 歲最多再計 5 年，合計 50
});

test('pensionByClaimAge：曲線單調、年資固定時只有增減給', () => {
  const rows = pensionByClaimAge(
    { avgInsuredSalary: 32000, years: 35, months: 6, birthYearROC: 45 },
    LI,
    55,
    65,
  );
  assert.equal(rows.length, 11);
  assert.equal(rows[0].monthly, Math.round(17608 * 0.8));
  assert.equal(rows[5].monthly, 17608); // 60 歲
  assert.equal(rows[10].monthly, Math.round(17608 * 1.2));
  const keep = pensionByClaimAge(
    { avgInsuredSalary: 32000, years: 35, months: 0, birthYearROC: 45 },
    LI,
    60,
    62,
    true,
  );
  // 62 歲：年資 37，base = round(32000×37×0.0155)=18352，×1.08
  assert.equal(keep[2].monthly, Math.round(18352 * 1.08));
  const tooEarly = pensionByClaimAge(
    { avgInsuredSalary: 32000, years: 35, months: 0, birthYearROC: 55 },
    LI,
    58,
    60,
  );
  assert.equal(tooEarly[0].eligible, false); // 55 年次法定 65，58 歲提前 7 年
  assert.equal(tooEarly[0].monthly, 0);
});

// ---------------------------------------------------------------- 勞保保險費

// 勞保局 115 年保險費分擔金額表，投保日數 30 日（整月）一列，PDF 逐字：
//   勞保普通事故＋就保合計 https://www.bli.gov.tw/Files/25696（114.11 製表）
//   就業保險 https://www.bli.gov.tw/Files/25690
// 格式：[投保薪資, 合計勞工, 合計單位, 就保勞工, 就保單位]
const PREMIUM_TABLE = [
  [29500, 738, 2582, 59, 207],
  [30300, 758, 2651, 61, 212],
  [31800, 795, 2783, 64, 223],
  [33300, 833, 2914, 67, 233],
  [34800, 870, 3045, 70, 244],
  [36300, 908, 3176, 73, 254],
  [38200, 955, 3342, 76, 267],
  [40100, 1002, 3509, 80, 281],
  [42000, 1050, 3675, 84, 294],
  [43900, 1098, 3841, 88, 307],
  [45800, 1145, 4008, 92, 321],
];

test('保險費分擔金額表：29,500、36,300、45,800 三級', () => {
  for (const salary of [29500, 36300, 45800]) {
    const row = PREMIUM_TABLE.find((r) => r[0] === salary);
    const p = monthlyPremium(salary, LI);
    assert.equal(
      p.worker.laborInsurance + p.worker.employmentInsurance,
      row[1],
      `${salary} worker total`,
    );
    assert.equal(
      p.employer.laborInsurance + p.employer.employmentInsurance,
      row[2],
      `${salary} employer total`,
    );
    assert.equal(p.worker.employmentInsurance, row[3]);
    assert.equal(p.employer.employmentInsurance, row[4]);
  }
});

test('保險費分擔金額表：11 級全部對得上', () => {
  for (const [salary, wTot, eTot, wEmp, eEmp] of PREMIUM_TABLE) {
    const p = monthlyPremium(salary, LI);
    assert.equal(
      p.worker.laborInsurance + p.worker.employmentInsurance,
      wTot,
      `${salary} worker`,
    );
    assert.equal(
      p.employer.laborInsurance + p.employer.employmentInsurance,
      eTot,
      `${salary} employer`,
    );
    assert.equal(p.worker.employmentInsurance, wEmp, `${salary} worker emp`);
    assert.equal(
      p.employer.employmentInsurance,
      eEmp,
      `${salary} employer emp`,
    );
  }
});

test('保險費：政府負擔 10%（表上沒有，照比例）', () => {
  const p = monthlyPremium(45800, LI);
  assert.equal(p.government.laborInsurance, 527); // 45800×0.115×0.1 = 526.7
  assert.equal(p.government.employmentInsurance, 46); // 45.8
});

// ---------------------------------------------------------------- 勞退月退

// https://www.bli.gov.tw/0018437.html 期初年金現值因子 20.239737682（T=23、i=1.1473%）
test('annuityFactor(23, 0.011473) ≈ 20.239737682', () => {
  const f = annuityFactor(23, 0.011473);
  assert.ok(Math.abs(f - 20.239737682) < 1e-6, String(f));
  assert.ok(Math.abs(f - LP.officialFactorCheck.factor) < 1e-6);
});

test('平均餘命表', () => {
  const t = LP.lifeExpectancy;
  assert.equal(t.length, 26);
  assert.equal(lifeExpectancyAt(60, t), 23);
  assert.equal(lifeExpectancyAt(61, t), 23);
  assert.equal(lifeExpectancyAt(65, t), 19);
  assert.equal(lifeExpectancyAt(70, t), 16);
  assert.equal(lifeExpectancyAt(85, t), 6);
  assert.equal(lifeExpectancyAt(92, t), 6);
  assert.throws(() => lifeExpectancyAt(59, t), RangeError);
});

// https://www.bli.gov.tw/0018437.html 算例（一）200 萬，60 歲，月退 8,235
test('勞退月退官方算例：200 萬 → 8,235', () => {
  const r = monthlyPensionFromBalance(2000000, 60, LP);
  assert.equal(r.lifeExpectancy, 23);
  assert.equal(r.monthly, 8235);
});

// https://www.bli.gov.tw/0018437.html 算例（二）400 萬，官方頁面文字寫 16,470，
// 但 4,000,000÷20.239737682÷12 ＝ 16,469.25，四捨五入是 16,469，差官方文字 1 元。
// 不為了對上官方文字去改四捨五入，這裡斷言函式的 16,469。
test('勞退月退官方算例：400 萬，函式 16,469（官方文字 16,470，差 1 元）', () => {
  const r = monthlyPensionFromBalance(4000000, 60, LP);
  assert.equal(r.monthly, 16469);
  assert.ok(Math.abs(r.monthly - 16470) <= 1);
});

// ---------------------------------------------------------------- 專戶累積

// 期望值依勞動部試算表原始碼 https://calcr2.mol.gov.tw/js/zhHantTW/trial.js 的 calculateAnnity
// （2026-11-10 下載）原封不動執行得到的輸出，輸入如下；不是官方公布的算例，也不是從試算頁畫面取得。
// 輸入：月薪 40,000、雇提 6%、無自提、報酬率 7.64%、薪資成長 1.52%、期初 0、3 年。
test('projectBalance：3 年（依官方程式碼邏輯，非官方公布算例）', () => {
  const r = projectBalance(
    {
      monthlyWage: 40000,
      currentBalance: 0,
      yearsToRetire: 3,
      employerRate: 0.06,
      selfRate: 0,
      annualReturn: 0.0764,
      wageGrowth: 0.0152,
    },
    LP,
  );
  const exp = [
    {
      year: 1,
      wage: 40000,
      interest: 1011,
      contributed: 28872,
      principal: 28872,
      balance: 29883,
      contributionWage: 40100,
    },
    {
      year: 2,
      wage: 40608,
      interest: 4353,
      contributed: 30240,
      principal: 59112,
      balance: 63465,
      contributionWage: 42000,
    },
    {
      year: 3,
      wage: 41225,
      interest: 10261,
      contributed: 30240,
      principal: 89352,
      balance: 99613,
      contributionWage: 42000,
    },
  ];
  assert.deepEqual(r.yearly, exp);
  assert.equal(r.finalBalance, 99613);
});

// 同上，輸入：月薪 30,000、雇提 6%、報酬率 5%、薪資成長 3%、期初 200,000、3 年（含期初金額與薪資跨級距）
test('projectBalance：有期初專戶金額（依官方程式碼邏輯，非官方公布算例）', () => {
  const r = projectBalance(
    {
      monthlyWage: 30000,
      currentBalance: 200000,
      yearsToRetire: 3,
      employerRate: 0.06,
      selfRate: 0,
      annualReturn: 0.05,
      wageGrowth: 0.03,
    },
    LP,
  );
  assert.deepEqual(
    r.yearly.map((y) => [
      y.wage,
      y.interest,
      y.contributed,
      y.principal,
      y.balance,
    ]),
    [
      [30000, 10500, 21816, 221816, 232316],
      [30900, 22640, 22896, 244712, 267352],
      [31827, 36558, 23976, 268688, 305246],
    ],
  );
});

// 同上，輸入：月薪 50,000、雇提 6% 加自提 6%、報酬率 7.64%、薪資成長 1.52%、期初 1,000,000、30 年，取最後一年
test('projectBalance：30 年、自提 6%（依官方程式碼邏輯，非官方公布算例）', () => {
  const r = projectBalance(
    {
      monthlyWage: 50000,
      currentBalance: 1000000,
      yearsToRetire: 30,
      employerRate: 0.06,
      selfRate: 0.06,
      annualReturn: 0.0764,
      wageGrowth: 0.0152,
    },
    LP,
  );
  const last = r.yearly[29];
  assert.equal(last.wage, 77440);
  assert.equal(last.interest, 14730717);
  assert.equal(last.contributed, 115488);
  assert.equal(last.principal, 3776896);
  assert.equal(last.balance, 18507613);
  assert.equal(r.finalBalance, 18507613);
});

test('projectBalance：0 年回傳期初金額', () => {
  const r = projectBalance(
    {
      monthlyWage: 40000,
      currentBalance: 500000,
      yearsToRetire: 0,
      employerRate: 0.06,
      selfRate: 0,
      annualReturn: 0.05,
      wageGrowth: 0.01,
    },
    LP,
  );
  assert.deepEqual(r.yearly, []);
  assert.equal(r.finalBalance, 500000);
});

// ---------------------------------------------------------------- 實領薪資

test('computeTakeHome：月薪 40,000，自提 0，不含健保與所得稅', () => {
  const r = computeTakeHome(
    {
      monthlyWage: 40000,
      bonusMonths: 2,
      selfContributionRate: 0,
      nhiPremium: null,
      annualIncomeTax: null,
    },
    data,
  );
  assert.equal(r.insuredSalary, 40100);
  assert.equal(r.contributionWage, 40100);
  // 40,100 對照 PREMIUM_TABLE：勞工 1,002、單位 3,509（合計）
  assert.equal(r.worker.laborInsurance + r.worker.employmentInsurance, 1002);
  assert.equal(
    r.employer.laborInsurance + r.employer.employmentInsurance,
    3509,
  );
  assert.equal(r.employer.pension, 2406); // 40,100×6%
  assert.equal(r.employer.occupationalAccident, 84); // 40,100×0.21% = 84.2
  assert.equal(r.employer.nhi, null);
  assert.equal(r.worker.nhi, null);
  assert.equal(r.worker.incomeTaxMonthly, null);
  assert.ok(r.notes.includes('NHI_NOT_INCLUDED'));
  assert.ok(r.notes.includes('EMPLOYER_NHI_NOT_INCLUDED'));
  assert.equal(r.worker.takeHomeMonthly, 40000 - 1002);
  assert.equal(r.annual.gross, 40000 * 14);
  assert.equal(r.annual.takeHome, 40000 * 14 - 12 * 1002);
});

test('computeTakeHome：有自提、健保、所得稅，加總自洽', () => {
  const r = computeTakeHome(
    {
      monthlyWage: 60000,
      bonusMonths: 1.5,
      selfContributionRate: 0.06,
      nhiPremium: 1200,
      annualIncomeTax: 60000,
    },
    data,
  );
  const w = r.worker;
  assert.equal(r.insuredSalary, 45800);
  assert.equal(r.contributionWage, 60800);
  assert.equal(w.pensionSelf, 3648); // 60,800×6%
  assert.equal(w.incomeTaxMonthly, 5000);
  assert.equal(
    w.totalDeductions,
    w.laborInsurance + w.employmentInsurance + w.pensionSelf + 1200 + 5000,
  );
  assert.equal(w.takeHomeMonthly, 60000 - w.totalDeductions);
  const e = r.employer;
  assert.equal(
    e.totalMonthly,
    e.laborInsurance +
      e.employmentInsurance +
      e.occupationalAccident +
      e.pension,
  );
  assert.equal(e.totalCostMonthly, 60000 + e.totalMonthly);
  assert.equal(e.pension, 3648);
  assert.equal(e.occupationalAccident, 128); // 職災分級 60,800（月薪 60,000 落在 57,801 至 60,800）×0.21% = 127.68
  assert.deepEqual(
    r.notes.filter((n) => n.startsWith('NHI')),
    [],
  );
  // 年度：全年總收入 − 12×固定扣項 − 全年稅額
  assert.equal(r.annual.gross, 60000 * 13.5);
  assert.equal(
    r.annual.takeHome,
    60000 * 13.5 -
      12 * (w.laborInsurance + w.employmentInsurance + w.pensionSelf + 1200) -
      60000,
  );
});

test('computeTakeHome：自提率超過 6% 以 6% 計；低薪用最低級距', () => {
  const r = computeTakeHome(
    {
      monthlyWage: 25000,
      bonusMonths: 0,
      selfContributionRate: 0.1,
      nhiPremium: null,
      annualIncomeTax: 0,
    },
    data,
  );
  assert.equal(r.insuredSalary, 29500);
  assert.equal(r.contributionWage, 25250);
  assert.equal(r.worker.pensionSelf, 1515); // 25,250×6%
  assert.equal(r.worker.incomeTaxMonthly, 0);
});
