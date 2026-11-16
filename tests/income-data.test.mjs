/**
 * income-data.test.mjs — 「薪資、稅與退休」專題圖表資料檔的結構與抽查
 *（跑：node --experimental-strip-types --test tests/income-data.test.mjs）
 *
 * 結構：每個檔有 _meta（title、source 至少一筆且是 https 網址、asOf、fetched），
 * 序列檔的 years 遞增、各序列與 years 等長、數值是 number 或 null。
 * 抽查：每檔至少兩個數字，註解寫研究檔的哪一節
 *   （reports/research/2026-11/income-topic-0{1,2,3}-*.md）。
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'data');
const load = (rel) => JSON.parse(readFileSync(join(root, rel), 'utf8'));

const FILES = {
  'wage-series': 'income/wage-series.json',
  'gdp-series': 'income/gdp-series.json',
  'minimum-wage': 'income/minimum-wage.json',
  'tax-revenue': 'income/tax-revenue.json',
  'tax-filers': 'income/tax-filers.json',
  'labor-insurance-finance': 'income/labor-insurance-finance.json',
  'pension-fund-returns': 'income/pension-fund-returns.json',
  'civil-service-replacement': 'income/civil-service-replacement.json',
  'salary-distribution-2024': 'income/salary-distribution-2024.json',
  'population-aging': 'shared/population-projection-2026-2075.json',
};
const data = Object.fromEntries(
  Object.entries(FILES).map(([k, v]) => [k, load(v)]),
);

const isNumOrNull = (v) =>
  v === null || (typeof v === 'number' && Number.isFinite(v));

/** 序列容器：years 與其下所有「陣列」欄位等長、遞增、元素是 number 或 null。 */
function checkSeries(label, obj, { skip = [] } = {}) {
  assert.ok(Array.isArray(obj.years) && obj.years.length > 1, `${label}.years`);
  for (let i = 1; i < obj.years.length; i++) {
    assert.ok(obj.years[i] > obj.years[i - 1], `${label}.years 遞增`);
  }
  let seriesCount = 0;
  const visit = (o, path) => {
    for (const [k, v] of Object.entries(o)) {
      if (k === 'years' || k.startsWith('_') || skip.includes(k)) continue;
      if (Array.isArray(v)) {
        seriesCount++;
        assert.equal(v.length, obj.years.length, `${label}.${path}${k} 長度`);
        if (v.every((x) => typeof x === 'string' || x === null)) continue; // 標記欄（例如 edition）
        for (const x of v)
          assert.ok(isNumOrNull(x), `${label}.${path}${k} 元素 ${x}`);
      } else if (v && typeof v === 'object') {
        visit(v, `${path}${k}.`);
      }
    }
  };
  visit(obj, '');
  assert.ok(seriesCount > 0, `${label} 至少一條序列`);
}

test('每個資料檔都有 _meta：title、https 來源、asOf、fetched', () => {
  for (const [name, d] of Object.entries(data)) {
    const m = d._meta;
    assert.ok(m, `${name} 缺 _meta`);
    assert.ok(m.title && m.title.zh && m.title.en, `${name} title`);
    assert.ok(
      Array.isArray(m.source) && m.source.length >= 1,
      `${name} source`,
    );
    for (const s of m.source) {
      assert.ok(s.name, `${name} source.name`);
      assert.match(s.url, /^https:\/\//, `${name} source.url`);
    }
    assert.match(m.asOf, /^\d{4}-\d{2}-\d{2}$/, `${name} asOf`);
    assert.equal(m.fetched, '2026-11-10', `${name} fetched`);
    assert.ok(Array.isArray(m.notes) && m.notes.length >= 1, `${name} notes`);
  }
});

test('序列檔結構：years 遞增、序列等長、數值為 number 或 null', () => {
  checkSeries('wage-series', data['wage-series']);
  checkSeries('gdp-series', data['gdp-series']);
  checkSeries('tax-revenue', data['tax-revenue']);
  checkSeries('pension-fund-returns', data['pension-fund-returns']);
  checkSeries('minimum-wage.yearly', data['minimum-wage'].yearly);
  const lif = data['labor-insurance-finance'];
  checkSeries('lif.finance', lif.finance);
  checkSeries('lif.subsidies', lif.subsidies);
  checkSeries('lif.fund', lif.fund);
  checkSeries(
    'civil.calendarYearSeries',
    data['civil-service-replacement'].calendarYearSeries,
  );
  const pop = data['population-aging'];
  checkSeries('population-aging', pop);
});

test('derived 欄位在 _meta 標明、算式寫在 notes', () => {
  const w = data['wage-series']._meta;
  assert.deepEqual(w.derived, ['realRegularWageIndex']);
  assert.ok(
    w.notes.some(
      (n) =>
        n.includes('realRegularWageIndex') &&
        n.includes('÷') &&
        n.includes('官方沒有同一基期'),
    ),
  );
  const g = data['gdp-series']._meta;
  assert.deepEqual(g.derived, ['realGdpIndex']);
  assert.ok(g.notes.some((n) => n.includes('連乘') && n.includes('2000')));
  assert.ok(data['tax-revenue']._meta.derived.includes('otherTaxesDerived'));
  assert.ok(data['tax-filers']._meta.derived.length >= 1);
  assert.ok(
    data['tax-filers'].brackets.every(
      (b) => b.householdSharePctDerived === true,
    ),
  );
});

test('wage-series：2000–2025；抽查 §B.1', () => {
  const d = data['wage-series'];
  assert.equal(d.years[0], 2000);
  assert.equal(d.years.at(-1), 2025);
  assert.equal(d.years.length, 26);
  const at = (k, y) => d[k][d.years.indexOf(y)];
  assert.equal(at('regularWageNominal', 2000), 33926); // §B.1 民國 89 年
  assert.equal(at('regularWageNominal', 2024), 46450); // §B.1 民國 113 年
  assert.equal(at('totalWageNominal', 2025), 63383); // §B.1 民國 114 年（初步值）
  assert.equal(at('cpiIndex', 2021), 100); // 基期 2021=100
  assert.equal(at('cpiYoY', 2025), 1.66);
  // 派生指數：2000＝100；2024 年＝(46450/107.81)/(33926/81.92)×100，四捨五入到小數 2 位
  assert.equal(at('realRegularWageIndex', 2000), 100);
  const expect =
    Math.round((46450 / 107.81 / (33926 / 81.92)) * 100 * 100) / 100;
  assert.equal(at('realRegularWageIndex', 2024), expect);
});

test('gdp-series：抽查 §B.1、§C', () => {
  const d = data['gdp-series'];
  const at = (k, y) => d[k][d.years.indexOf(y)];
  assert.equal(at('realGdpGrowth', 2010), 10.25);
  assert.equal(at('realGdpGrowth', 2025), 8.76);
  assert.equal(at('gdpPerCapitaNtd', 2025), 1230035); // §C
  assert.equal(at('gdpPerCapitaUsd', 2025), 39515);
  assert.equal(at('realGdpIndex', 2000), 100);
  // 2001 年＝100×(1−1.40/100)＝98.6（本站連乘）
  assert.equal(at('realGdpIndex', 2001), 98.6);
  // 占比：2024 年只有年報版 43.1；2025 年沒有資料
  assert.equal(at('compensationShareOfGdp', 2024), 43.1);
  assert.equal(at('compensationShareOfGdp', 2025), null);
  assert.equal(at('compensationShareEdition', 2024), 'annual-report-2025-12');
  // 2023：採年報版 44.4，摘要版 44.28 另放
  assert.equal(at('compensationShareOfGdp', 2023), 44.4);
  assert.equal(at('compensationShareSummaryEdition', 2023), 44.28);
  assert.equal(at('compensationShareOfGdp', 2000), 47.56);
});

test('minimum-wage：歷次調整與年度序列；抽查 §D.1、§D.3', () => {
  const d = data['minimum-wage'];
  assert.equal(d.adjustments.length, 38);
  const first = d.adjustments[0];
  assert.equal(first.monthly, 300); // 民國 45 年初訂 300 元
  assert.equal(first.kind, 'initial');
  assert.equal(first.announced, null);
  const row = (eff) => d.adjustments.find((r) => r.effective === eff);
  assert.equal(row('2025-01-01').monthly, 28590);
  assert.equal(row('2025-01-01').hourly, 190);
  assert.equal(row('2027-01-01').monthly, 30900);
  assert.equal(row('2027-01-01').hourly, 205);
  assert.equal(row('1992-08-01').hourly, 51.5);
  assert.equal(row('1992-08-01').daily, 412);
  // 年度序列
  const y = d.yearly;
  const at = (k, yr) => y[k][y.years.indexOf(yr)];
  assert.equal(y.years[0], 2000);
  assert.equal(y.years.at(-1), 2027);
  assert.equal(at('monthly', 2000), 15840);
  assert.equal(at('monthly', 2013), 18780); // 19,047 是 2013-04-01 才生效，1/1 當天仍 18,780
  assert.equal(at('hourly', 2013), 109);
  assert.equal(at('monthly', 2026), 29500);
  assert.equal(at('hourly', 2026), 196);
  assert.ok(y.monthly.every((v, i) => i === 0 || v >= y.monthly[i - 1]));
  // 《最低工資法》
  assert.equal(d.law.passedThirdReading, '2023-12-12');
  assert.equal(d.law.promulgated, '2023-12-27');
  assert.equal(d.law.effective, '2024-01-01');
});

test('tax-revenue：2015–2025；抽查 §E（千元 ÷100,000 → 億元）', () => {
  const d = data['tax-revenue'];
  assert.equal(d.years[0], 2015);
  assert.equal(d.years.at(-1), 2025);
  const at = (k, y) => d[k][d.years.indexOf(y)];
  assert.equal(at('total', 2015), 21348.6); // 2,134,857,093 千元
  assert.equal(at('total', 2025), 37879.4); // 3,787,944,207 千元
  assert.equal(at('individualIncomeTax', 2025), 8736.7); // 873,671,852 千元
  assert.equal(at('corporateIncomeTax', 2024), 11219.9); // 1,121,990,863 千元
  assert.equal(at('realEstateTransactionIncomeTaxTotal', 2015), null); // 原表「—」
  assert.equal(at('realEstateTransactionIncomeTaxTotal', 2016), null);
  assert.equal(at('realEstateTransactionIncomeTaxTotal', 2024), 1007.2);
  // 所得稅小計＝營所稅＋綜所稅（研究檔逐年驗算；億元四捨五入容許 0.1 誤差）
  d.years.forEach((y, i) => {
    const sum = d.corporateIncomeTax[i] + d.individualIncomeTax[i];
    assert.ok(
      Math.abs(sum - d.incomeTaxSubtotal[i]) <= 0.11,
      `所得稅小計 ${y}`,
    );
  });
  // 房地合一稅是內含項，不在堆疊清單
  assert.ok(
    !d._meta.stackItems.includes('realEstateTransactionIncomeTaxTotal'),
  );
  assert.ok(d._meta.stackItems.every((id) => Array.isArray(d[id])));
  // 堆疊加其他＝總計（容許四捨五入）
  d.years.forEach((y, i) => {
    const s =
      d._meta.stackItems.reduce((a, id) => a + d[id][i], 0) +
      d.otherTaxesDerived[i];
    assert.ok(Math.abs(s - d.total[i]) < 0.6, `堆疊 ${y}`);
    assert.ok(d.otherTaxesDerived[i] > 0);
  });
});

test('tax-filers：抽查 §F 表 6-2、17-2', () => {
  const d = data['tax-filers'];
  assert.equal(d.totals.households, 6880883);
  assert.equal(d.brackets.length, 8);
  assert.equal(
    d.brackets.reduce((a, b) => a + b.households, 0),
    6880883,
  );
  const by = (id) => d.brackets.find((b) => b.id === id);
  assert.equal(by('net-zero').households, 3010515);
  assert.equal(by('net-zero').householdSharePct, 43.8); // 研究檔自行相除 ≈43.8%
  assert.equal(by('5pct').households, 2476336);
  assert.equal(by('5pct').householdSharePct, 36.0);
  assert.equal(d.rate40PlusHouseholds, 72767);
  assert.equal(d.rate40PlusSharePct, 1.1);
  assert.equal(d.totals.taxThousand, 379160242);
  assert.equal(d.totals.effectiveTaxRatePct, 6.18);
  assert.equal(d.incomeComposition.salaryPct, 66.48);
  assert.equal(d.incomeComposition.dividendPct, 17.42);
  assert.equal(d.officialRatios.top40HouseholdSharePct, 0.85);
  assert.equal(d.preliminary['114'].netTaxRevenueBillion, 3217);
});

test('labor-insurance-finance：抽查 §H', () => {
  const d = data['labor-insurance-finance'];
  const at = (sec, k, y) => d[sec][k][d[sec].years.indexOf(y)];
  // H-5：105 年（2016）保費 328,149 百萬元、給付 319,342 百萬元 → 億元
  assert.equal(at('finance', 'premiumIncomeOkuNtd', 2016), 3281.49);
  assert.equal(at('finance', 'benefitPaymentsOkuNtd', 2016), 3193.42);
  assert.equal(at('finance', 'premiumIncomeOkuNtd', 2023), 4760.76);
  assert.equal(at('finance', 'benefitPaymentsOkuNtd', 2023), 5206.69);
  assert.equal(at('finance', 'averageInsuredWage', 2023), 34415);
  // 113、114 年一手原文未讀到
  assert.equal(at('finance', 'premiumIncomeOkuNtd', 2024), null);
  assert.equal(at('finance', 'benefitPaymentsOkuNtd', 2025), null);
  // 106 年起給付大於保費
  for (const y of [2017, 2018, 2019, 2020, 2021, 2022, 2023]) {
    assert.ok(
      at('finance', 'benefitPaymentsOkuNtd', y) >
        at('finance', 'premiumIncomeOkuNtd', y),
      String(y),
    );
  }
  // H-1 三次精算
  assert.equal(d.actuarialReports.length, 3);
  const r113 = d.actuarialReports.find((r) => r.reportYearRoc === 113);
  assert.equal(r113.baseDate, '2023-12-31');
  assert.equal(r113.actuarialLiabilityAL, 141027);
  assert.equal(r113.unfundedLiabilityUAL, 132298);
  assert.equal(r113.fundBalance, 8729);
  // 報告摘要表有兩個平衡費率：攤提 31.42%、不攤提 17.19%
  assert.equal(r113.balancedRateAmortizingPastUnfundedLiabilityPct, 31.42);
  assert.equal(r113.balancedRateNotAmortizingPastUnfundedLiabilityPct, 17.19);
  for (const r of d.actuarialReports) {
    assert.ok(
      r.balancedRateNotAmortizingPastUnfundedLiabilityPct <
        r.balancedRateAmortizingPastUnfundedLiabilityPct,
      `${r.id} 不攤提應小於攤提`,
    );
  }
  assert.equal(r113.fundNegativeYear, 2031);
  for (const r of d.actuarialReports) {
    assert.equal(
      r.actuarialLiabilityAL - r.fundBalance,
      r.unfundedLiabilityUAL,
      r.id,
    ); // UAL＝AL－基金
  }
  // H-3 撥補
  assert.equal(at('subsidies', 'publicBudgetOkuNtd', 2024), 1200);
  assert.equal(at('subsidies', 'specialBudgetOkuNtd', 2023), 100);
  const total =
    d.subsidies.publicBudgetOkuNtd.reduce((a, b) => a + b, 0) +
    d.subsidies.specialBudgetOkuNtd.reduce((a, b) => a + b, 0);
  assert.equal(total, 3870);
  assert.equal(d.subsidies.cumulativeOkuNtd.at(-1), 3870);
  // 2026 年是已編列、立法院尚未通過的數字：獨立欄位，不進逐年序列
  const pending = d.subsidies.budgetedNotPassed;
  assert.equal(pending.year, 2026);
  assert.ok(!d.subsidies.years.includes(pending.year));
  assert.equal(pending.amountOkuNtd, 1300);
  assert.equal(pending.cumulativeOkuNtd, 5170);
  assert.equal(pending.asOf, '2026-08-07');
  assert.match(pending.source.url, /^https:\/\/www\.president\.gov\.tw\//);
  // H-6 基金
  assert.equal(at('fund', 'fundSizeOkuNtd', 2025), 13035.2);
  assert.equal(at('fund', 'returnRatePct', 2024), 18.13);
  assert.equal(at('fund', 'fundSizeOkuNtd', 2021), null);
  assert.equal(d.subsidyLaw.promulgated, '2026-01-21');
  assert.match(d.subsidyLaw.url, /^https:\/\/law\.moj\.gov\.tw\//);
});

test('pension-fund-returns：抽查 §8 D-10', () => {
  const d = data['pension-fund-returns'];
  const at = (y) => d.returnRatePct[d.years.indexOf(y)];
  assert.equal(d.years[0], 2012);
  assert.equal(d.years.at(-1), 2025);
  assert.equal(d.years.length, 14);
  assert.equal(at(2012), 5.0154);
  assert.equal(at(2015), -0.0932);
  assert.equal(at(2022), -6.6732);
  assert.equal(at(2024), 16.1587);
  assert.ok(!d.years.includes(2026), '2026 不進主序列');
  assert.equal(d.partialYear.year, 2026);
  assert.equal(d.partialYear.returnRatePct, 30.4298);
  assert.equal(d.partialYear.isFullYear, false);
});

test('civil-service-replacement：抽查 §11 G-2、附表三', () => {
  const d = data['civil-service-replacement'];
  assert.equal(d.periods.length, 11);
  assert.equal(d.periods[0].rate35YearsPct, 75.0);
  assert.equal(d.periods[0].rate15YearsPct, 45.0);
  assert.equal(d.periods[0].from, '2018-07-01');
  assert.equal(d.periods.at(-1).rate35YearsPct, 60.0);
  assert.equal(d.periods.at(-1).rate15YearsPct, 30.0);
  assert.equal(d.periods.at(-1).to, null);
  const p112 = d.periods.find((p) => p.from === '2023-01-01');
  assert.equal(p112.rate35YearsPct, 69.0);
  assert.equal(p112.rate15YearsPct, 39.0);
  // 每期遞減 1.5 個百分點
  for (let i = 1; i < d.periods.length; i++) {
    assert.ok(
      Math.abs(
        d.periods[i - 1].rate35YearsPct - d.periods[i].rate35YearsPct - 1.5,
      ) < 1e-9,
    );
    assert.ok(
      Math.abs(
        d.periods[i - 1].rate15YearsPct - d.periods[i].rate15YearsPct - 1.5,
      ) < 1e-9,
    );
  }
  // 修法後停在 112 年水準
  const c = d.calendarYearSeries;
  const at = (k, y) => c[k][c.years.indexOf(y)];
  assert.equal(at('original35', 2029), 60.0);
  assert.equal(at('afterAmendment35', 2029), 69.0);
  assert.equal(at('afterAmendment15', 2026), 39.0);
  assert.equal(at('afterAmendment35', 2022), at('original35', 2022));
  assert.equal(d.frozenAt112.rate35YearsPct, 69.0);
  assert.equal(d.law.amendmentPromulgated, '2025-12-26');
  assert.equal(d.law.amendmentOrder.includes('11400132311'), true);
  assert.ok(
    d._meta.notes.some((n) =>
      n.includes('對照全國法規資料庫的附表三原檔逐格複核'),
    ),
  );
});

test('population-aging（shared）：抽查 §14 J-1、附錄 J1', () => {
  const d = data['population-aging'];
  assert.deepEqual(d.years, [2026, 2035, 2045, 2055, 2065, 2075]);
  assert.equal(d._meta.published, '2026-08-28');
  assert.ok(
    d._meta.sharedNote.includes('income 專題分支建立') &&
      d._meta.sharedNote.includes('health') &&
      d._meta.sharedNote.includes('housing'),
  );
  assert.equal(d.table1.populationThousand.age65plus[0], 4858);
  assert.equal(d.table1.sharePct.age65plus[0], 20.9);
  assert.equal(d.table1.sharePct.age65plus.at(-1), 52.9);
  assert.equal(d.table2.dependencyRatioTotal[0], 47.2);
  assert.equal(d.table2.oldAgeDependencyRatio.at(-1), 125.2);
  assert.equal(d.table2.potentialSupportRatio[0], 3.2);
  assert.equal(d.table2.potentialSupportRatio.at(-1), 0.8);
  // 內部一致：三階段人口相加≈總計（官方四捨五入），占比加總約 100
  d.years.forEach((y, i) => {
    const t = d.table1.populationThousand;
    // 官方各欄分別四捨五入到千人，2055 年相加為 17,514、官方總計 17,515，容許 1 千人
    assert.ok(
      Math.abs(t.age0to14[i] + t.age15to64[i] + t.age65plus[i] - t.total[i]) <=
        1,
      `人口 ${y}`,
    );
    const s = d.table1.sharePct;
    assert.ok(
      Math.abs(s.age0to14[i] + s.age15to64[i] + s.age65plus[i] - 100) < 0.25,
      `占比 ${y}`,
    );
    assert.ok(
      Math.abs(
        d.table2.youthDependencyRatio[i] +
          d.table2.oldAgeDependencyRatio[i] -
          d.table2.dependencyRatioTotal[i],
      ) < 0.15,
      `扶養比 ${y}`,
    );
  });
});

test('salary-distribution-2024：_meta 逐字定義與單位說明；抽查 §A.1、§A.3', () => {
  const m = data['salary-distribution-2024']._meta;
  assert.equal(m.dataYear, 2024);
  assert.equal(m.publishedDate, '2025-11-25');
  assert.ok(
    m.definition.salary.startsWith(
      '全年總薪資係指廠商當年度支付給員工之工作報酬',
    ),
  );
  assert.ok(m.definition.population.includes('不包含農林漁牧業、政府機關'));
  assert.ok(m.unit.includes('萬元'));
  assert.ok(m.nextRelease.includes('2026 年 11 月底'));
  assert.ok(m.nextRelease.includes('官方預告發布日期未讀到'));
  const a = data['salary-distribution-2024'].all;
  assert.equal(a.D1, 330000);
  assert.equal(a.D9, 1336000);
  assert.equal(a.Q3, 842000);
});
