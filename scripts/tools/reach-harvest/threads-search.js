// Threads 搜尋結果收集器（貼進 Chrome MCP javascript_tool 執行）
//
// 用法：
//   1. 用已登入的 Chrome 打開
//      https://www.threads.com/search?q=taiwan.md&serp_type=default&filter=recent
//   2. 先執行本檔一次（定義函式＋捲 10 輪）。
//   3. 重複執行「CONTINUE」段，直到回傳的 stale >= 5（連五輪沒有新貼文＝捲到底）。
//      單次執行要壓在 45 秒內，否則 CDP 逾時；所以每次只捲 10–14 輪。
//   4. 執行「EXPORT」段，分批取回（javascript_tool 單一字串約 1.5K 字會被截斷，回傳陣列可避開）。
//
// 已知限制（2026-11-25 首跑量到的）：
//   - Threads 搜尋會漏：哲宇手動找到的 14 則裡有 6 則不在搜尋結果中（約四成）。
//     只貼網址卡片、或文字被折疊的貼文最容易漏。搜尋結果是下限，不是全集。
//   - time 取的是容器裡第一個 <time>，引用別人貼文時可能抓到被引用那則的時間。
//   - 帳號 @taiwandotmd／@cheyuwu345 是自己，匯出時排除。

window.__tw = window.__tw || {};
window.__harvest = function () {
  let added = 0;
  document
    .querySelectorAll('div[data-pressable-container="true"]')
    .forEach((c) => {
      const a = [...c.querySelectorAll('a[href*="/post/"]')].find((x) =>
        /\/@[^/]+\/post\/[^/?]+\/?$/.test(new URL(x.href).pathname),
      );
      if (!a) return;
      const u0 = new URL(a.href);
      const url = u0.origin + u0.pathname;
      const t = c.querySelector('time');
      const links = [...c.querySelectorAll('a')]
        .map((x) => x.href)
        .filter((h) => /taiwan\.md|taiwan-md|l\.threads\.com/.test(h))
        .map((h) => {
          try {
            const u = new URL(h);
            return u.hostname === 'l.threads.com'
              ? decodeURIComponent(u.searchParams.get('u') || h)
              : decodeURIComponent(h);
          } catch (e) {
            return h;
          }
        });
      if (!window.__tw[url]) added++;
      window.__tw[url] = {
        url,
        handle: url.split('/')[3],
        time: t ? t.getAttribute('datetime') : null,
        text: c.innerText.slice(0, 1500),
        links: [...new Set(links)],
      };
    });
  return added;
};

// ── CONTINUE（重複執行到 stale >= 5）──
window.__stale = window.__stale || 0;
for (let i = 0; i < 10; i++) {
  const n = window.__harvest();
  window.__stale = n === 0 ? window.__stale + 1 : 0;
  if (window.__stale >= 5) break;
  window.scrollTo(0, document.body.scrollHeight);
  await new Promise((r) => setTimeout(r, 1500));
}
window.__harvest();
const _v = Object.values(window.__tw);
const _ts = _v
  .map((v) => v.time)
  .filter(Boolean)
  .sort();
({
  total: _v.length,
  stale: window.__stale,
  oldest: _ts[0],
  newest: _ts.at(-1),
});

// ── EXPORT（另外執行；改 slice 範圍分批取）──
// const OWN = new Set(['@taiwandotmd', '@cheyuwu345']);
// const rel = (v) => /taiwan\s*\.\s*md|taiwan-md|taiwandotmd|台灣\.md|臺灣\.md/i.test(v.text + ' ' + v.links.join(' '));
// const tpe = (t) => (t ? new Date(new Date(t).getTime() + 8 * 3600e3).toISOString().slice(0, 16).replace('T', ' ') : '');
// const clean = (t) => t.split('\n').filter((l) => l.trim() && !/^(翻譯|AI 內容|\d+(\.\d+)?( 萬)?|\/|作者|·)$/.test(l.trim())).join(' ¶ ');
// window.__ext = Object.values(window.__tw).filter((v) => !OWN.has(v.handle))
//   .sort((a, b) => ((a.time || '') < (b.time || '') ? 1 : -1))
//   .map((v, i) => `${i}|${tpe(v.time)}|${v.handle}|${v.url.split('/post/')[1]}|${rel(v) ? 'R' : '-'}|${clean(v.text).slice(0, 380)}|${v.links.join(' ')}`);
// window.__ext.slice(0, 30);
