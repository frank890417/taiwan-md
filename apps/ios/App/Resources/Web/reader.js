// reader.js — App 文章頁的橋接：外觀與字級、閱讀進度、目錄跳轉、腳註卡片、離線圖片、外部連結。
(function () {
  var post = function (msg) {
    try {
      window.webkit.messageHandlers.tw.postMessage(msg);
    } catch (e) {}
  };
  var root = document.documentElement;

  window.tw = {
    setStyle: function (dark, scale) {
      root.setAttribute('data-theme', dark ? 'dark' : 'light');
      root.style.setProperty('--app-scale', String(scale));
    },
    scrollToId: function (id) {
      var el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
    restore: function (frac) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0) window.scrollTo(0, Math.round(frac * max));
    },
  };

  // 閱讀進度：停止捲動 600ms 後回報一次
  var timer = null;
  window.addEventListener(
    'scroll',
    function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        if (max > 0)
          post({
            type: 'progress',
            value: Math.min(1, Math.max(0, window.scrollY / max)),
          });
      }, 600);
    },
    { passive: true },
  );

  // 離線時圖片載不到：收起來，不留破圖示
  document.querySelectorAll('img').forEach(function (img) {
    img.addEventListener('error', function () {
      var fig = img.closest('figure');
      (fig || img).classList.add('img-missing');
    });
    img.setAttribute('loading', 'lazy');
  });

  // 腳註：點上標跳出卡片，不跳到頁尾
  var pop = document.getElementById('fn-pop');
  var popBody = pop.querySelector('.fn-body');
  var close = function () {
    pop.hidden = true;
  };
  pop.addEventListener('click', function (e) {
    if (e.target === pop) close();
  });
  pop.querySelector('.fn-close').addEventListener('click', close);

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a');
    if (!a) return;
    if (a.classList.contains('footnote-ref')) {
      var id = (a.getAttribute('href') || '').replace(/^#/, '');
      var li = document.getElementById(id);
      if (li) {
        e.preventDefault();
        var clone = li.cloneNode(true);
        clone.querySelectorAll('.footnote-backref').forEach(function (b) {
          b.remove();
        });
        popBody.innerHTML =
          '<p><strong>' + a.textContent + '</strong></p>' + clone.innerHTML;
        pop.hidden = false;
      }
      return;
    }
    if (a.hasAttribute('data-external')) {
      e.preventDefault();
      post({ type: 'open', href: a.getAttribute('href') });
    }
  });
})();
