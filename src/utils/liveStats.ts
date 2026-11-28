/**
 * liveStats.ts — module-level cache for prebuilt vitals reads.
 *
 * 2026-06-10 build audit 熱點 #5: SEO.astro 把 readFileSync(dashboard-vitals)
 * 寫在 component frontmatter → 每頁 render 重跑 = 8,400+ 次 syscall/build。
 * Hoist 到 module scope，整個 build process 只讀一次。
 * （不用 top-level JSON import：該檔 gitignored，fresh clone dev 時可能不存在，
 * import 會直接 crash — lazy read + fallback 保留原本的容錯。）
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { recordJsonKey, untracked } from './build-deps';

let _cached: number | null = null;

export function getLiveArticleCount(fallback = 752): number {
  // 頁面輸入帳：每頁都用到，但只用 totalArticles 這一個欄位，不是整份 vitals。
  recordJsonKey('public/api/dashboard-vitals.json', 'totalArticles');
  if (_cached !== null) return _cached;
  return untracked('live-stats', () => loadLiveArticleCount(fallback));
}

function loadLiveArticleCount(fallback: number): number {
  try {
    const vitalsPath = resolve(
      process.cwd(),
      'public/api/dashboard-vitals.json',
    );
    const v = JSON.parse(readFileSync(vitalsPath, 'utf-8'));
    _cached = typeof v.totalArticles === 'number' ? v.totalArticles : fallback;
  } catch {
    _cached = fallback;
  }
  return _cached ?? fallback;
}
