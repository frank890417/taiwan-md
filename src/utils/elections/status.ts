/**
 * status.ts — 2026 選舉主頁的日期狀態（純函式，可注入日期）。
 *
 * 主頁在建置時依「台北日期」決定顯示哪一種狀態列：
 *   pre  選前（～投票日前一天）：倒數＋接下來讀者要留意的日期
 *   day  投票日當天
 *   post 選後（投票日隔天起）：官方結果入口、公告當選、就職
 * 全部比較的是日曆日（YYYY-MM-DD 字串），不比較時刻，所以投票日早上不會
 * 還顯示「距投票日 1 天」。站點每天重建，日期在建置當下決定。
 *
 * 測試：node --experimental-strip-types --test tests/elections-2026-status.test.mjs
 * 預覽別的日期：ELECTIONS_TODAY=2026-11-28 npm run dev（見 resolveToday）。
 */

export type ElectionPhase = 'pre' | 'day' | 'post';

export const ELECTION_DAY = '2026-11-28';

const ISO_DAY = /^\d{4}-\d{2}-\d{2}$/;

/** 某個時刻在台北（UTC+8，無日光節約）是哪一天。 */
export function taipeiDate(now: Date): string {
  return new Date(now.getTime() + 8 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);
}

/**
 * 今天的台北日期；override 是 YYYY-MM-DD 時直接用它（預覽與測試用），
 * 其他值一律忽略，退回真實日期。
 */
export function resolveToday(
  override?: string | null,
  now = new Date(),
): string {
  if (override && ISO_DAY.test(override)) return override;
  return taipeiDate(now);
}

/** 兩個日曆日相差幾天（b − a）。 */
export function daysBetween(a: string, b: string): number {
  const ms = Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`);
  return Math.round(ms / 86_400_000);
}

export function electionPhase(
  today: string,
  electionDay = ELECTION_DAY,
): ElectionPhase {
  if (today < electionDay) return 'pre';
  if (today === electionDay) return 'day';
  return 'post';
}

/** 距投票日還有幾天（投票日前一天是 1；當天與之後是 0 或負數）。 */
export function daysUntil(today: string, electionDay = ELECTION_DAY): number {
  return daysBetween(today, electionDay);
}

export type DatedItem = { id: string; start: string; end: string };

/** 時程項目的狀態，規則與 /elections/2026/timeline/ 相同。 */
export function itemState(
  item: DatedItem,
  today: string,
): 'done' | 'now' | 'todo' {
  if (item.end < today) return 'done';
  if (item.start <= today) return 'now';
  return 'todo';
}

/**
 * 還沒結束的項目（進行中＋未來），依開始日排序，取前 n 個。
 * 開始日相同時保留原本順序。
 */
export function upcoming<T extends DatedItem>(
  items: T[],
  today: string,
  n: number,
): T[] {
  return items
    .map((item, i) => ({ item, i }))
    .filter(({ item }) => item.end >= today)
    .sort((a, b) =>
      a.item.start === b.item.start
        ? a.i - b.i
        : a.item.start < b.item.start
          ? -1
          : 1,
    )
    .slice(0, n)
    .map(({ item }) => item);
}

/**
 * 狀態列「接下來要留意」：時程資料裡標 voters 的項目，加上時程檔沒有、
 * 但跟選民自己有關的日期（例如戶政司開放查投票所），取還沒結束的前 n 個。
 */
export function voterDates<T extends DatedItem & { cats?: string[] }>(
  timelineItems: T[],
  extra: T[],
  today: string,
  n = 3,
): T[] {
  const voters = timelineItems.filter((i) => i.cats?.includes('voters'));
  return upcoming([...voters, ...extra], today, n);
}
