/**
 * flatten.ts — 把內容檔裡的 {zh, en} 文字節點攤平成 i18n 鍵。零 import，測試可直接載入。
 *
 * 規則：
 *  - 物件同時有字串欄位 zh 與 en → 一個文字節點，鍵＝目前路徑。
 *  - 陣列 → 每個元素用它的 id 當路徑段（沒有 id 用索引）。
 *  - 其他物件 → 逐欄位往下走，路徑加上欄位名。
 * 例：timeline.json 的 {events:[{id:'epz', t:{zh,en}}]} → `timeline.events.epz.t`。
 */
export function flattenContent(
  node: unknown,
  path: string,
  outZh: Record<string, string>,
  outEn: Record<string, string>,
): void {
  if (Array.isArray(node)) {
    node.forEach((item, i) => {
      const id =
        item && typeof item === 'object' && 'id' in (item as any)
          ? String((item as any).id)
          : String(i);
      flattenContent(item, `${path}.${id}`, outZh, outEn);
    });
    return;
  }
  if (!node || typeof node !== 'object') return;
  const o = node as Record<string, unknown>;
  if (typeof o.zh === 'string' && typeof o.en === 'string') {
    outZh[path] = o.zh;
    outEn[path] = o.en;
    return;
  }
  for (const [k, v] of Object.entries(o)) {
    if (v && typeof v === 'object')
      flattenContent(v, `${path}.${k}`, outZh, outEn);
  }
}
