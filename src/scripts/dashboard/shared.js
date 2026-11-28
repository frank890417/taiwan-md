// shared.js — dashboard-client.js 2026-07-24 modular split：module-level shared
// state + utils used by 2+ sections。VERBATIM move，零行為改動。

const lang = document.documentElement.getAttribute('lang') || 'zh-TW';

const isEn = lang === 'en';
const categoryLabels = {
  about: isEn ? 'About' : '關於',
  art: isEn ? 'Art' : '藝術',
  culture: isEn ? 'Culture' : '文化',
  economy: isEn ? 'Economy' : '經濟',
  food: isEn ? 'Food' : '美食',
  geography: isEn ? 'Geography' : '地理',
  history: isEn ? 'History' : '歷史',
  lifestyle: isEn ? 'Lifestyle' : '生活',
  music: isEn ? 'Music' : '音樂',
  nature: isEn ? 'Nature' : '自然',
  people: isEn ? 'People' : '人物',
  politics: isEn ? 'Politics' : '政治',
  society: isEn ? 'Society' : '社會',
  technology: isEn ? 'Technology' : '科技',
};

const langPrefix = isEn ? '/en' : '';

// ── Section timestamp helpers ──
// 每個資料來源的「最後更新時間」顯示在對應 section 標題右邊。
// 資料來源分兩群：(A) prebuild 時生成的 vitals/articles/organism/translations
// 共享同一個 timestamp；(B) analytics（SENSES.md fetch-sense-data.sh 產出）
// 跟 prebuild 不同時間。未來可擴充其他 live 來源。
function formatRelativeTime(isoString) {
  if (!isoString) return '';
  const d = new Date(isoString);
  if (isNaN(d.getTime())) return '';
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);
  const relText = isEn
    ? diffMin < 1
      ? 'just now'
      : diffMin < 60
        ? diffMin + ' min ago'
        : diffHr < 24
          ? diffHr + ' hr ago'
          : diffDay + ' d ago'
    : diffMin < 1
      ? '剛才'
      : diffMin < 60
        ? diffMin + ' 分鐘前'
        : diffHr < 24
          ? diffHr + ' 小時前'
          : diffDay + ' 天前';
  // 精確時間（本地時區）
  const pad = (n) => String(n).padStart(2, '0');
  const abs =
    d.getFullYear() +
    '-' +
    pad(d.getMonth() + 1) +
    '-' +
    pad(d.getDate()) +
    ' ' +
    pad(d.getHours()) +
    ':' +
    pad(d.getMinutes());
  const prefix = isEn ? 'Updated ' : '資料更新 ';
  return prefix + abs + ' (' + relText + ')';
}
function renderSectionTimestamps(sourceTimestamps) {
  document.querySelectorAll('.section-timestamp').forEach((el) => {
    const src = el.getAttribute('data-source');
    const iso = sourceTimestamps[src];
    const txt = formatRelativeTime(iso);
    if (txt) {
      el.textContent = txt;
      el.setAttribute('title', iso); // hover 顯示 ISO
    }
  });
}

// ── Number Roll-up Animation ──
function animateValue(el, start, end, duration, suffix) {
  suffix = suffix || '';
  const startTime = performance.now();
  const isFloat = String(end).includes('.');
  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // ease-out quad
    const eased = 1 - (1 - progress) * (1 - progress);
    const current = start + (end - start) * eased;
    el.textContent =
      (isFloat ? current.toFixed(1) : Math.round(current)) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// ── Utils ──
function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

function debounce(fn, ms) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

export {
  lang,
  isEn,
  categoryLabels,
  langPrefix,
  formatRelativeTime,
  renderSectionTimestamps,
  animateValue,
  setText,
  debounce,
};
