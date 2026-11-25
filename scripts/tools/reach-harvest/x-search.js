// X 搜尋結果收集器（貼進 Chrome MCP javascript_tool 執行）
//
// 用法：
//   1. 用已登入的 Chrome 打開 https://x.com/search?q=taiwan.md&src=typed_query&f=live
//   2. 執行本檔（會先捲回頂端再開始收）。重複執行「CONTINUE」段到 stale >= 5。
//   3. 匯出：見檔尾。
//
// 2026-11 的 X 版面：<article> 沒有 data-testid、也沒有 <time>。
// 貼文 id 從回覆按鈕的 `/compose/post?in_reply_to=<id>` 取，帳號取第一個 `/<handle>` 連結。
// 日期只在 innerText 裡（例如 "Nov 3"、"5h"），匯出後由人判讀。
// X 會回收捲過的 DOM，所以必須邊捲邊收，不能捲到底再一次抓。

window.__xw = window.__xw || {};
window.__xh = function () {
  let n = 0;
  document.querySelectorAll('article').forEach((a) => {
    const hrefs = [...a.querySelectorAll('a')].map(
      (x) => x.getAttribute('href') || '',
    );
    const c = hrefs.find((h) => h.includes('in_reply_to='));
    if (!c) return;
    const id = c.split('in_reply_to=')[1];
    const handle = (hrefs.find((h) => /^\/[A-Za-z0-9_]+$/.test(h)) || '').slice(
      1,
    );
    if (!window.__xw[id]) n++;
    window.__xw[id] = {
      id,
      handle,
      text: a.innerText.slice(0, 700),
      tco: hrefs.filter((h) => h.startsWith('https://t.co')),
    };
  });
  return n;
};

if (!window.__xStarted) {
  window.__xStarted = true;
  window.scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 2000));
  window.__xs = 0;
}

// ── CONTINUE（重複執行到 stale >= 5）──
for (let i = 0; i < 20; i++) {
  const n = window.__xh();
  window.__xs = n === 0 ? window.__xs + 1 : 0;
  if (window.__xs >= 5) break;
  window.scrollBy(0, 1800);
  await new Promise((r) => setTimeout(r, 1500));
}
window.__xh();
({ total: Object.keys(window.__xw).length, stale: window.__xs });

// ── EXPORT ──
// Object.values(window.__xw)
//   .filter((x) => !['taiwandotmd', 'cheyuwu345'].includes(x.handle))
//   .map((x) => (x.id + '|' + x.text.replace(/\n+/g, ' ¶ ')).slice(0, 300));
