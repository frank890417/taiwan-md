/**
 * pageContext.ts — /health 各頁共用的「文案變數」：所有會出現在句子裡的數字都從資料檔算出來，
 * 文案（src/i18n/health/page.ts）只放 {佔位}。zh 的變數是純數字（單位寫在句子裡），
 * en 的變數自帶單位（NT$… billion、逗號分隔的人數），兩邊句子寫法因此不同。
 */
import topic from '../../data/health/topic.json';
import aging from '../../data/shared/population-aging.json';
import ltc from '../../data/health/ltc-rules.json';
import nhi from '../../data/health/nhi-rules.json';
import { useHealthT } from '../../i18n/health';
import { rich } from './sources';

const nf = (n: number, d = 0) =>
  n.toLocaleString('en-US', {
    minimumFractionDigits: d,
    maximumFractionDigits: d,
  });

export function healthCtx(lang: string) {
  const zh = lang === 'zh-TW';
  const t = useHealthT(lang);
  /** 億元 */
  const yi = (v: number) =>
    zh
      ? nf(v)
      : v >= 10000
        ? `NT$${(v / 10000).toFixed(2)} trillion`
        : `NT$${(v / 10).toFixed(1)} billion`;
  /** 人數：zh 以「萬」為單位的數字，en 完整人數 */
  const wan = (n: number, d = 1) => (zh ? (n / 1e4).toFixed(d) : nf(n));

  const fin = topic.finance.rows;
  const lastFin = fin[fin.length - 1];
  const gb = topic.globalBudget.rows;
  const gbLast = gb[gb.length - 1];
  const nhe = topic.nhe.latest;
  const er = topic.erStay.rows.filter((r) => r.all !== null);
  const erLast = er[er.length - 1] as any;
  const wf = topic.workforce.rows;
  const wfLast = wf[wf.length - 1];
  const fund = topic.ltc.fund.rows;
  const fundLast = fund[fund.length - 1];
  const use = topic.ltc.use.rows;
  const useLast = use[use.length - 1];
  const cw = topic.ltc.workers.careWorkers;
  const counties = topic.counties.rows.filter((c) => c.name !== '全國');
  const docSorted = [...counties].sort(
    (a, b) => b.doctorsPer10k - a.doctorsPer10k,
  );
  const national = topic.counties.rows.find((c) => c.name === '全國')!;
  const life = topic.life.rows;
  const lifeLast = life[life.length - 1];
  const opd = nhi.copay.outpatient;
  const em = nhi.copay.emergency;
  const ym = (s: string) => {
    const [y, m] = s.split('-');
    return zh
      ? `${y} 年 ${+m} 月底`
      : `${new Date(Date.UTC(+y, +m - 1, 1)).toLocaleString('en-US', { month: 'long', timeZone: 'UTC' })} ${y}`;
  };

  const V: Record<string, string | number> = {
    asOf: topic.asOf,
    reach20: zh ? '2025 年 12 月底' : 'At the end of December 2025',
    enroll: topic.coverage.enrollPct,
    satisfaction: topic.coverage.satisfaction,
    satYear: topic.coverage.satisfactionYear,
    contracted: nf(topic.coverage.contracted),
    contractedPct: topic.coverage.contractedPct,
    nheYear: nhe.year,
    nheGdp: nhe.gdpPct,
    nheWan: zh
      ? `${Math.floor(nhe.nhe / 10000)} 兆 ${nf(nhe.nhe % 10000)} 億元`
      : yi(nhe.nhe),
    nhePerCap: nf(nhe.perCapita),
    publicPct: nhe.publicPct,
    householdPct: nhe.householdPct,
    resYear: lastFin.year,
    reserve: yi(lastFin.reserve),
    resMonths: lastFin.months ?? '',
    bYear: gbLast.year,
    b2014: yi(gb[0].amount),
    b2026: yi(gbLast.amount),
    b2027: yi(Math.round(topic.globalBudget.negotiated2027.amount)),
    elderAsOf: ym(aging.latest.asOf),
    elderPct: aging.latest.elderPct.toFixed(2),
    elderWan: wan(aging.latest.elder),
    fundYear: fundLast.year,
    ltcSpend: yi(Math.round(fundLast.spend)),
    ltcBalance: yi(Math.round(fundLast.balance!)),
    plan2026: yi(Math.round(topic.ltc.fund.plan2026.total)),
    ltcPaid2017: wan(use[0].paid),
    ltcPaid: wan(useLast.paid),
    ltcUsers: wan(useLast.users),
    ltcCoverage: useLast.coverage,
    migrant: nf(topic.ltc.workers.migrantLatest.count),
    migrantWan: wan(topic.ltc.workers.migrantLatest.count),
    migrantAsOf: ym(topic.ltc.workers.migrantLatest.asOf),
    careWorkers: nf(cw[cw.length - 1][1]),
    careWan: wan(cw[cw.length - 1][1]),
    need2026: wan(topic.ltc.need.y2026.high),
    need2035: wan(topic.ltc.need.y2035.high),
    erYear: erLast.year,
    erAll: erLast.all,
    erMc: erLast.medicalCenter,
    erVisits: zh ? nf(Math.round(erLast.visits / 1e4)) : nf(erLast.visits),
    erOver24: wan(erLast.over24),
    erOver24Full: nf(erLast.over24),
    triage1: topic.erStay.triage1MedicalCenter2024.toFixed(2),
    wfYear: wfLast.year,
    nurses: nf(wfLast.nurses),
    nursesPer10k: wfLast.nursesPer10k,
    licensed: nf(topic.workforce.licensed.licensed),
    practising: nf(topic.workforce.licensed.practising),
    docTop: docSorted[0].doctorsPer10k,
    docLow: docSorted[docSorted.length - 1].doctorsPer10k,
    docAvg: national.doctorsPer10k,
    adTotal: wan(topic.acp.adTotal),
    hospiceTotal: wan(topic.acp.hospiceTotal),
    lifeAll: topic.life.latest.all,
    life2024: lifeLast[1].toFixed(2),
    healthy: lifeLast[2],
    lifeGap: (lifeLast[1] - lifeLast[2]).toFixed(1),
    opdClinic: opd[3][1],
    opdMcRef: opd[0][1],
    opdMc: opd[0][2],
    emMc: em[0][1],
    emReg: em[1][1],
    emDist: em[2][1],
    capYear: nhi.copay.inpatientCap.year,
    capStay: nf(nhi.copay.inpatientCap.perStay),
    capYearly: nf(nhi.copay.inpatientCap.perYear),
    q2: nf(ltc.care.monthly['2']),
    q8: nf(ltc.care.monthly['8']),
  };
  const used = new Set<string>();
  /** 文案 → 安全 HTML（數字代入、腳註上標） */
  const r = (key: string, extra?: Record<string, string | number>) =>
    rich(t(key), { ...V, ...extra }, used);
  /** 文案 → 純文字（去掉腳註記號），給 title、圖表標題、屬性用 */
  const p = (key: string, extra?: Record<string, string | number>) => {
    let s = t(key)
      .replace(/\[\[[\w.]+\]\]/g, '')
      .replace(/\*\*/g, '');
    for (const [k, v] of Object.entries({ ...V, ...extra }))
      s = s.split(`{${k}}`).join(String(v));
    return s;
  };
  return { t, r, p, V, zh, nf, yi, wan, topic, aging, ltc, nhi, used };
}
