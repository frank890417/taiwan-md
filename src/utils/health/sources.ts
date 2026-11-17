/**
 * sources.ts — /health 專題的來源登記表：把三份資料檔的 sources 合成一份，給每個來源一個固定編號，
 * 頁面上的腳註（[[key]] → 上標數字）與頁尾來源清單都從這裡取。
 */
import topic from '../../data/health/topic.json';
import ltc from '../../data/health/ltc-rules.json';
import nhi from '../../data/health/nhi-rules.json';

export interface Source {
  key: string;
  n: number;
  title: string;
  url: string;
  date: string;
}

const merged: Record<string, { title: string; url: string; date: string }> = {
  ...Object.fromEntries(
    Object.entries(topic.sources).map(([k, v]) => [k, v as any]),
  ),
  ...Object.fromEntries(
    Object.entries(ltc.sources).map(([k, v]) => [`ltc.${k}`, v as any]),
  ),
  ...Object.fromEntries(
    Object.entries(nhi.sources).map(([k, v]) => [`nhi.${k}`, v as any]),
  ),
};

export const allSources: Source[] = Object.entries(merged).map(
  ([key, v], i) => ({ key, n: i + 1, ...v }),
);
const byKey = new Map(allSources.map((s) => [s.key, s]));

export function source(key: string): Source {
  const s = byKey.get(key);
  if (!s) throw new Error(`health source not registered: ${key}`);
  return s;
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * 把文案字串轉成安全的 HTML：先跳脫，再把 {name} 換成數字、[[key]] 換成腳註上標、**字** 換成粗體。
 * 文案是自己寫的（src/i18n/health/*），不吃使用者輸入。認不得的來源 key 會丟錯，建置當場失敗。
 */
export function rich(
  s: string,
  vars: Record<string, string | number> = {},
  used?: Set<string>,
): string {
  let out = esc(s);
  for (const [k, v] of Object.entries(vars))
    out = out.split(`{${k}}`).join(esc(String(v)));
  out = out.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/\[\[([\w.]+)\]\]/g, (_, key) => {
    const src = source(key);
    used?.add(key);
    return `<sup class="hea-fn"><a href="#src-${src.n}" aria-label="來源 ${src.n}">${src.n}</a></sup>`;
  });
  return out;
}
