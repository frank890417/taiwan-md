/**
 * ltcCalc.ts — 長照給付額度與自付額試算（純函式，SSR 與瀏覽器共用）。
 *
 * 規則不寫在這裡：全部從 src/data/health/ltc-rules.json 傳進來（每個數字在那份檔案裡帶官方出處與截止日）。
 * 這支只做算術，所以單元測試可以拿官方公告的例子直接比。
 *
 * 口徑：算的是「額度全部用完」時的上限。實際自付額依每一項服務的支付價格乘上自付比率逐項計算，
 * 只會小於或等於這裡的數字。超過額度的部分全額自費，不在試算範圍內。
 */

/**
 * 長照身分別（《長期照顧服務申請及給付辦法》第 14 條）：
 * class1＝列冊低收入戶、中低收入戶，或中低收入老人生活津貼第一款資格；
 * class2＝中低收入老人生活津貼第二款或身心障礙者生活補助資格；class3＝其餘（一般戶）。
 */
export type Welfare = 'class1' | 'class2' | 'class3';
/** 長照需要等級（CMS）2–8 級；第 1 級不符合給付資格 */
export type CmsLevel = 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface LtcRules {
  asOf: string;
  care: {
    /** 照顧及專業服務每月額度（元），key＝CMS 等級 */
    monthly: Record<string, number>;
    copay: Record<Welfare, number>;
    /** 聘僱外籍家庭看護工（或領特別照顧津貼）時，額度給付比例與限制 */
    migrantCaregiverShare: number;
  };
  transport: {
    /** 交通接送每月額度（元），key＝縣市分類 1–4 */
    monthly: Record<string, number>;
    copay: Record<string, Record<Welfare, number>>;
    /** 交通接送起始等級（CMS 第幾級起才有） */
    minLevel: number;
    /** 縣市 → 分區（1–4） */
    countyClass: Record<string, number>;
    /** 一律算第四區的偏遠鄉鎮市區，格式「縣市＋鄉鎮市區」 */
    remoteTownships: string[];
  };
  assistive: {
    /** 輔具及居家無障礙環境改善：每 periodYears 年額度（元） */
    amount: number;
    periodYears: number;
    copay: Record<Welfare, number>;
  };
  respite: {
    /** 喘息服務每年額度（元），依等級分段 */
    yearly: { fromLevel: number; toLevel: number; amount: number }[];
    copay: Record<Welfare, number>;
  };
}

export interface LtcInput {
  level: number;
  welfare: Welfare;
  /** 縣市名（用來查交通接送分類）；查不到就不算交通接送 */
  county?: string;
  /** 鄉鎮市區名（用來判斷是否屬於偏遠鄉鎮，屬於就算第四區） */
  township?: string;
  /** 直接指定交通接送分區（1–4），優先於 county */
  transportClass?: number;
  /** 家中聘有外籍家庭看護工 */
  migrantCaregiver?: boolean;
}

export interface LtcLine {
  /** 額度（政府給付上限＋自付，合計） */
  quota: number;
  /** 自付比率（0–1） */
  rate: number;
  /** 額度用完時的自付額 */
  copay: number;
  /** 額度用完時政府負擔 */
  subsidy: number;
}

export interface LtcResult {
  eligible: boolean;
  reason?: 'level-out-of-range';
  care?: LtcLine & { migrantLimited: boolean };
  transport?: (LtcLine & { cls: number }) | null;
  assistive?: LtcLine & { periodYears: number };
  respite?: LtcLine;
  /** 每月合計（照顧及專業服務＋交通接送） */
  monthly?: { quota: number; copay: number; subsidy: number };
}

/** 部分負擔以小數點後無條件捨去計算（辦法附表五備註）。 */
export function floorYuan(v: number): number {
  return Math.floor(v + 1e-9);
}

function line(quota: number, rate: number): LtcLine {
  const copay = floorYuan(quota * rate);
  return { quota, rate, copay, subsidy: quota - copay };
}

/** 交通接送分區：偏遠鄉鎮市區優先算第四區，否則依縣市。 */
export function transportClassFor(
  rules: LtcRules,
  input: Pick<LtcInput, 'county' | 'township'>,
): number | undefined {
  if (!input.county) return undefined;
  if (
    input.township &&
    rules.transport.remoteTownships.includes(input.county + input.township)
  )
    return 4;
  return rules.transport.countyClass[input.county];
}

export function calcLtc(rules: LtcRules, input: LtcInput): LtcResult {
  const lv = Math.trunc(input.level);
  const base = rules.care.monthly[String(lv)];
  if (!Number.isFinite(lv) || base === undefined)
    return { eligible: false, reason: 'level-out-of-range' };

  const w = input.welfare;
  const migrant = !!input.migrantCaregiver;
  const careQuota = migrant
    ? floorYuan(base * rules.care.migrantCaregiverShare)
    : base;
  const care = {
    ...line(careQuota, rules.care.copay[w]),
    migrantLimited: migrant,
  };

  let transport: LtcResult['transport'] = null;
  const cls = input.transportClass ?? transportClassFor(rules, input);
  if (cls !== undefined && lv >= rules.transport.minLevel) {
    const q = rules.transport.monthly[String(cls)];
    const r = rules.transport.copay[String(cls)]?.[w];
    if (q !== undefined && r !== undefined) transport = { ...line(q, r), cls };
  }

  const assistive = {
    ...line(rules.assistive.amount, rules.assistive.copay[w]),
    periodYears: rules.assistive.periodYears,
  };

  const seg = rules.respite.yearly.find(
    (s) => lv >= s.fromLevel && lv <= s.toLevel,
  );
  const respite = seg ? line(seg.amount, rules.respite.copay[w]) : undefined;

  const mq = care.quota + (transport?.quota ?? 0);
  const mc = care.copay + (transport?.copay ?? 0);
  return {
    eligible: true,
    care,
    transport,
    assistive,
    respite,
    monthly: { quota: mq, copay: mc, subsidy: mq - mc },
  };
}

/**
 * 資格自查（辦法第 2 條）：先要「因身心失能」，再符合四種身分之一。
 * 回傳符合的身分 id；空陣列＝依現行條文不在給付對象內（社區據點等其他服務不在此限）。
 * 真正的資格以照管中心評估出的長照需要等級（第 2 級以上）為準，這裡只是幫人判斷值不值得打 1966。
 */
export interface EligibilityInput {
  age: number;
  /** 日常生活（吃飯、洗澡、穿衣、上廁所、移動等）需要他人協助 */
  needsHelp: boolean;
  indigenous?: boolean;
  dementia?: boolean;
  /** 領有身心障礙證明 */
  disability?: boolean;
  /** 住院中，屬健保急性後期整合照護計畫（PAC）收案對象 */
  pac?: boolean;
}
export interface EligibilityRules {
  elderAge: number;
  indigenousAge: number;
}
export function checkEligibility(
  r: EligibilityRules,
  input: EligibilityInput,
): string[] {
  if (!input.needsHelp) return [];
  const out: string[] = [];
  if (input.age >= r.elderAge) out.push('elder');
  else if (input.indigenous && input.age >= r.indigenousAge)
    out.push('indigenous');
  if (input.disability) out.push('disability');
  if (input.dementia) out.push('dementia');
  if (input.pac) out.push('pac');
  return out;
}
