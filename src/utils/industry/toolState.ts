/**
 * toolState.ts — 專題工具的網址查詢參數解析（純函式，測試在 tests/industry-tools.test.mjs）。
 * 契約 v1 第 4 節：工具狀態同步到查詢參數，結果可以分享、可以被連結。
 */
export const TRACKS = ['policy', 'company', 'market', 'world'] as const;

/** ?track=policy → 'policy'；沒有或不認得 → 'all' */
export function parseTrack(
  search: string,
  allowed: readonly string[] = TRACKS,
): string {
  const v = new URLSearchParams(search).get('track') ?? '';
  return allowed.includes(v) ? v : 'all';
}

/** ?chain=ai → 'ai'；沒有或不認得 → 第一條鏈 */
export function parseChain(search: string, ids: readonly string[]): string {
  const v = new URLSearchParams(search).get('chain') ?? '';
  return ids.includes(v) ? v : (ids[0] ?? '');
}

/** ?q= 的搜尋字：去頭尾空白、轉小寫、最長 40 字 */
export function parseQuery(search: string): string {
  return (new URLSearchParams(search).get('q') ?? '')
    .trim()
    .toLowerCase()
    .slice(0, 40);
}

/**
 * 在節點清單裡找公司：比對名稱或代號的子字串（不分大小寫）。
 * nodes 的 key 是「名稱 代號」的小寫字串。空字串回空陣列（不把全部標亮）。
 */
export function findNodes<T extends { key: string }>(
  nodes: T[],
  q: string,
): T[] {
  const s = q.trim().toLowerCase();
  if (!s) return [];
  return nodes.filter((n) => n.key.includes(s));
}
