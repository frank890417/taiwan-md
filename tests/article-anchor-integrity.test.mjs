/**
 * article-anchor-integrity.test.mjs — 頁內錨點必須指到同一篇裡真的存在的標題。
 *
 * 跑：node --experimental-strip-types --test tests/article-anchor-integrity.test.mjs
 *
 * 為什麼要有這支（2026-10-28）：
 *
 * 譯文把標題翻了，錨點卻常常留在中文。13 個語系的
 * `2026-local-elections-taiwan.md` 都有同一句
 * `[Section Four](#四內部結構性議題朝小野大藍白協作第三勢力)`——連結文字翻了、
 * destination 沒翻，於是那一節的在地化標題產生的是
 * `#iv-internal-structural-issues-…`，連結永遠 404。12 個語系的
 * `suao-cold-spring.md` 同理，`[↩︎](#參考資料)` 指的是母稿的錨點。
 *
 * 既有的 `article-heading-id.test.mjs` 驗的是「id 怎麼產生」，不是「連結指到哪」；
 * `article-health` 的 `link-target` 只看站內路徑，`](#…)` 這種同頁錨點根本不在
 * 它的守備範圍。所以壞掉的錨點可以一路走到 `dist/`。
 *
 * 判準刻意窄：
 *   - 只驗同一檔案內的 `](#…)`，不管跨檔連結（那是 `link-target` 的事）
 *   - **跳過腳註錨點**（`#user…`、`#…-fn-9`、`#…fnref-9`）：GitHub 渲染式腳註
 *     （`#user-content-fn-9`，以及被截斷成 `#-content-fn-1` 的變形）是另一條產線
 *     的病，由 `gh-footnote-leak` / `gh-footnote-convert.py` 負責；這裡再報一次只會
 *     讓同一件事在兩個儀器上紅，而且它們的修法完全不同
 *   - 錨點 percent-encoded 的先 decode 再比
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

import { slugifyHeadingId } from '../src/utils/article-render.ts';

const HEADING = /^#{1,6}\s+(.+?)\s*$/;
const IN_PAGE_LINK = /\]\(#([^)\s]+)\)/g;
// 腳註錨點（含 GitHub 渲染式與其被截斷的變形）交給 gh-footnote-* 那條線。
const FOOTNOTE_ANCHOR = /user|fnref|fn[-_]?\d/;

function headingIds(body) {
  const ids = new Set();
  let fence = false;
  for (const line of body.split('\n')) {
    if (line.trimStart().startsWith('```')) {
      fence = !fence;
      continue;
    }
    if (fence) continue;
    const m = HEADING.exec(line);
    if (m) ids.add(slugifyHeadingId(m[1]));
  }
  return ids;
}

function inPageAnchors(body) {
  const out = [];
  let fence = false;
  for (const line of body.split('\n')) {
    if (line.trimStart().startsWith('```')) {
      fence = !fence;
      continue;
    }
    if (fence) continue;
    for (const m of line.matchAll(IN_PAGE_LINK)) out.push(m[1]);
  }
  return out;
}

function dangling(file) {
  const txt = readFileSync(file, 'utf8');
  const body = txt.startsWith('---')
    ? txt.split('---').slice(2).join('---')
    : txt;
  const ids = headingIds(body);
  const bad = [];
  for (const raw of inPageAnchors(body)) {
    if (FOOTNOTE_ANCHOR.test(raw)) continue;
    let a = raw;
    try {
      a = decodeURIComponent(raw);
    } catch {
      /* 壞掉的 percent-encoding 就照原樣比 */
    }
    if (!ids.has(a)) bad.push(raw);
  }
  return bad;
}

test('每一篇的頁內錨點都指到存在的標題', () => {
  const files = execSync("find knowledge -name '*.md'", { encoding: 'utf8' })
    .trim()
    .split('\n')
    .filter(Boolean);
  const problems = [];
  for (const f of files) {
    for (const a of dangling(f)) problems.push(`${f}  →  #${a}`);
  }
  assert.deepEqual(
    problems,
    [],
    `頁內錨點指到不存在的標題：\n${problems.join('\n')}`,
  );
});

test('偵測得到「標題翻了、錨點沒翻」這種壞法', () => {
  // 這個檔案的標題是英文，錨點卻還是中文 —— 13 個語系真實發生過的形狀。
  const body = [
    '## IV. Internal Structural Issues',
    '',
    '見[第四節](#四內部結構性議題朝小野大藍白協作第三勢力)。',
    '',
  ].join('\n');
  const ids = headingIds(body);
  assert.equal(ids.has('iv-internal-structural-issues'), true);
  assert.equal(ids.has('四內部結構性議題朝小野大藍白協作第三勢力'), false);
});
