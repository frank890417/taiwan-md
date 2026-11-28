// dashboard-media.mjs — 把普查儀器（article-census.py）算好的媒體讀數 join 進
// dashboard-articles.json。「資訊模組」「封面狀態」的定義只住在
// scripts/tools/lib/article_health/census.py，這裡不重算，只依檔案路徑查表。
//
// 查不到（census 檔不存在、沒有 media、沒有那篇）一律回 null 欄位，代表「未知」，
// 絕不落成 'none' 或 0：census 那一步失敗時 build 不會擋，落成 0 會讓儀表板
// 把「沒量到」當成「沒有封面」。
import fs from 'fs';

export const MEDIA_FIELDS = [
  'cover',
  'coverCredit',
  'imageCount',
  'imageLocal',
  'imageRemote',
  'moduleCount',
  'dataModuleCount',
  'embedCount',
];

/** 讀 dashboard-census.json 的 media 表；失敗回 null（呼叫端印警告）。 */
export function loadCensusMedia(censusPath) {
  try {
    if (!fs.existsSync(censusPath)) return null;
    const media = JSON.parse(fs.readFileSync(censusPath, 'utf8')).media;
    return media && typeof media === 'object' ? media : null;
  } catch {
    return null;
  }
}

/** census 的 key 是 knowledge/<Category>/<檔名>.md。 */
export function mediaKey(relativePath) {
  return `knowledge/${relativePath}`;
}

/** 回傳要併進文章物件的八個欄位；join 不到時全部 null。 */
export function mediaFields(mediaMap, relativePath) {
  const m = mediaMap ? mediaMap[mediaKey(relativePath)] : null;
  if (!m) {
    return Object.fromEntries(MEDIA_FIELDS.map((k) => [k, null]));
  }
  const num = (v) => (typeof v === 'number' ? v : null);
  return {
    cover: typeof m.c === 'string' ? m.c : null,
    coverCredit: typeof m.cr === 'boolean' ? m.cr : null,
    imageCount: num(m.i),
    imageLocal: num(m.il),
    imageRemote: num(m.ir),
    moduleCount: num(m.m),
    dataModuleCount: num(m.d),
    embedCount: num(m.f),
  };
}
