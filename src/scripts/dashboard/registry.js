import {
  ENABLED_LANGUAGE_CODES,
  DEFAULT_LANGUAGE,
} from '../../config/languages.mjs';
import { isEn, categoryLabels, langPrefix, debounce } from './shared.js';
import { decorateUiIcons } from '../../icons/decorate-ui-icons.mjs';

let allArticles = [];
let sortField = 'date';
let sortDir = -1; // -1 = desc

// Cross-module state adapter（modular split 唯一結構性調整）：allArticles 原本是
// monolith 頂層 let，由 fetch callback 指定（allArticles = articles;）。拆模組後
// orchestrator 改呼叫此 setter。
export function setRegistryArticles(a) {
  allArticles = a;
}

// ── 封面／圖／模組（讀數來自普查儀器，join 不到的欄位是 null = 未知）──
// 未知不是「沒有」：封面三態（有／沒有／未知）、篩選與統計都把 null 獨立處理。
const MEDIA_SORT_FIELDS = new Set(['cover', 'imageCount', 'dataModuleCount']);
const COVER_RANK = { local: 3, remote: 2, 'local-missing': 1, none: 0 };
const hasCover = (a) => a.cover === 'local' || a.cover === 'remote';
const mediaKnown = (a) => a.cover != null;

function mediaSortValue(a, field) {
  const v = a[field];
  if (v == null) return null;
  return field === 'cover' ? (COVER_RANK[v] ?? 0) : v;
}

function mediaLabels() {
  try {
    return JSON.parse(
      document.getElementById('registry-media-stats').dataset.labels || '{}',
    );
  } catch {
    return {};
  }
}

const escAttr = (s) => String(s).replace(/"/g, '&quot;');

function coverCell(a, L) {
  if (!mediaKnown(a)) {
    return `<span class="media-unknown" title="${escAttr(L.coverUnknown)}">—</span>`;
  }
  if (hasCover(a)) {
    const gap =
      a.coverCredit === false
        ? ` <span class="cover-credit-gap" title="${escAttr(L.coverCreditGap)}">!</span>`
        : '';
    return `<span class="cover-yes" title="${escAttr(L.coverYes)}">✓</span>${gap}`;
  }
  const title = a.cover === 'local-missing' ? L.coverFileMissing : L.coverNo;
  return `<span class="cover-no" title="${escAttr(title)}">✗</span>`;
}

function renderMediaStats(articles) {
  const box = document.getElementById('registry-media-stats');
  if (!box) return;
  const L = mediaLabels();
  const known = articles.filter(mediaKnown);
  const unknown = articles.length - known.length;
  const pct = (n, d) => (d ? (n / d) * 100 : 0).toFixed(1);

  const withCover = known.filter(hasCover).length;
  const withImages = known.filter((a) => a.imageCount > 0).length;
  const withData = known.filter((a) => a.dataModuleCount > 0).length;
  const cards = [
    [L.statCover, withCover],
    [L.statImages, withImages],
    [L.statDataModules, withData],
  ]
    .map(
      ([label, n]) => `<div class="media-stat-card">
          <div class="media-stat-value">${pct(n, known.length)}%</div>
          <div class="media-stat-label">${label}</div>
          <div class="media-stat-frac">${n.toLocaleString()} / ${known.length.toLocaleString()}</div>
        </div>`,
    )
    .join('');

  const byCat = {};
  known.forEach((a) => {
    const c = (byCat[a.category] ||= { total: 0, cover: 0 });
    c.total += 1;
    if (hasCover(a)) c.cover += 1;
  });
  const rows = Object.entries(byCat)
    .sort((x, y) => x[1].cover / x[1].total - y[1].cover / y[1].total)
    .map(([cat, c]) => {
      const p = pct(c.cover, c.total);
      return `<div class="media-cat-row">
          <span class="media-cat-name">${categoryLabels[cat] || cat}</span>
          <span class="media-cat-bar"><span class="media-cat-fill" style="width:${p}%"></span></span>
          <span class="media-cat-num">${p}% <small>${c.cover}/${c.total}</small></span>
        </div>`;
    })
    .join('');

  const note = unknown
    ? `<p class="media-stat-note">${(L.statUnknownNote || '{n}').replace('{n}', unknown.toLocaleString())}</p>`
    : '';
  box.innerHTML = `<div class="media-stat-row">${cards}</div>
    <div class="media-cat-chart"><div class="media-cat-title">${L.statByCategory}</div>${rows}</div>${note}`;
}

// ── Article Registry ──
function renderRegistry(articles) {
  renderMediaStats(articles);
  // Populate category filter with counts
  const catCounts = {};
  articles.forEach((a) => {
    catCounts[a.category] = (catCounts[a.category] || 0) + 1;
  });
  const cats = Object.keys(catCounts).sort();
  const catSelect = document.getElementById('filter-category');
  cats.forEach((c) => {
    const opt = document.createElement('option');
    opt.value = c;
    opt.textContent = `${categoryLabels[c] || c} (${catCounts[c]})`;
    catSelect.appendChild(opt);
  });

  renderTable(articles);
  bindRegistryEvents();
}

function renderTable(articles) {
  const tbody = document.getElementById('registry-body');
  const L = mediaLabels();
  const sorted = [...articles].sort((a, b) => {
    if (MEDIA_SORT_FIELDS.has(sortField)) {
      // 未知（null）不論升降序一律排最後
      const ma = mediaSortValue(a, sortField);
      const mb = mediaSortValue(b, sortField);
      if (ma == null && mb == null) return 0;
      if (ma == null) return 1;
      if (mb == null) return -1;
      return (ma > mb ? 1 : ma < mb ? -1 : 0) * sortDir;
    }
    let va = a[sortField],
      vb = b[sortField];
    if (va == null) va = '';
    if (vb == null) vb = '';
    if (typeof va === 'string') return va.localeCompare(vb) * sortDir;
    return (va > vb ? 1 : va < vb ? -1 : 0) * sortDir;
  });

  const categoryColors = {
    about: '#6366f1',
    art: '#ec4899',
    culture: '#f59e0b',
    economy: '#10b981',
    food: '#f97316',
    geography: '#06b6d4',
    history: '#8b5cf6',
    lifestyle: '#84cc16',
    music: '#a855f7',
    nature: '#14b8a6',
    people: '#3b82f6',
    society: '#ef4444',
    technology: '#0ea5e9',
  };

  tbody.innerHTML = sorted
    .map((a) => {
      const catLabel = categoryLabels[a.category] || a.category;
      const catColor = categoryColors[a.category] || '#64748b';
      const date = a.date || '—';
      const modified = a.lastModified || '—';
      const qs = a.qualityScore || 0;
      const qLabel =
        qs === 0 ? '✅' : qs <= 3 ? '✅' : qs <= 7 ? `⚠️ ${qs}` : `🔴 ${qs}`;
      const fi = a.formatIssues || 0;
      const fLabel = fi === 0 ? '✅' : fi === 1 ? '⚠️' : '❌';
      const reviewed = a.lastHumanReview ? '✅' : '—';
      const subcategory = a.subcategory || '—';
      // Translation dots come from the registry so a newly born language
      // appears in the table the day it ships, without anyone editing here.
      const langs = ENABLED_LANGUAGE_CODES.filter(
        (c) => c !== DEFAULT_LANGUAGE.code,
      )
        .map(
          (l) =>
            `<span class="lang-dot ${a.translations[l] ? 'has' : 'missing'}" title="${l.toUpperCase()}">${l.toUpperCase()}</span>`,
        )
        .join('');
      const articleUrl = `${langPrefix}/${a.category}/${a.slug}`;
      const catDir = a.category.charAt(0).toUpperCase() + a.category.slice(1);
      const editUrl = `https://github.com/frank890417/taiwan-md/edit/main/knowledge/${catDir}/${a.slug}.md`;
      return `<tr class="registry-row" data-url="${articleUrl}" title="${(typeof a.description === 'string' ? a.description : '').replace(/"/g, '&quot;')}">
          <td class="col-title"><a href="${articleUrl}">${a.title}</a>${a.featured ? ' ⭐' : ''}</td>
          <td><span class="cat-tag" style="background:${catColor}15;color:${catColor};border:1px solid ${catColor}30">${catLabel}</span></td>
          <td>${subcategory}</td>
          <td>${date}</td>
          <td>${modified}</td>
          <td class="col-center">${qLabel}</td>
          <td class="col-center">${fLabel}</td>
          <td class="col-center">${reviewed}</td>
          <td class="col-right">${(a.wordCount || 0).toLocaleString()}</td>
          <td class="col-center col-cover">${coverCell(a, L)}</td>
          <td class="col-right">${a.imageCount == null ? `<span class="media-unknown" title="${escAttr(L.coverUnknown)}">—</span>` : a.imageCount}</td>
          <td class="col-right">${a.dataModuleCount == null ? `<span class="media-unknown" title="${escAttr(L.coverUnknown)}">—</span>` : `<span title="${escAttr(`${L.modulesTotal}: ${a.moduleCount ?? '—'}`)}">${a.dataModuleCount}</span>`}</td>
          <td class="col-center col-hideable">${a.tagCount || 0}</td>
          <td class="col-langs">${langs}</td>
          <td class="col-center col-hideable">${a.revision || 0}</td>
          <td class="col-edit"><a href="${editUrl}" class="edit-link" target="_blank" rel="noopener" title="${isEn ? 'Edit on GitHub' : '在 GitHub 編輯'}">✏️</a></td>
        </tr>`;
    })
    .join('');

  document.getElementById('registry-summary').textContent =
    `${isEn ? 'Showing' : '顯示'} ${sorted.length} / ${allArticles.length} ${isEn ? 'articles' : '篇文章'}`;
  // 篩選與排序會重繪表格，emoji 要再換一次行線圖示（首次換在 dashboard-client.js）
  decorateUiIcons(document.getElementById('registry-table'));
}

function bindRegistryEvents() {
  // Column toggle
  const colToggleBtn = document.getElementById('column-toggle-btn');
  colToggleBtn.addEventListener('click', function () {
    const table = document.getElementById('registry-table');
    const expanded = table.classList.toggle('show-all-columns');
    this.textContent = expanded
      ? isEn
        ? '⚙️ Hide extra columns'
        : '⚙️ 隱藏額外欄位'
      : isEn
        ? '⚙️ Show all columns'
        : '⚙️ 顯示所有欄位';
    decorateUiIcons(this);
  });

  // Sort
  document.querySelectorAll('.sortable').forEach((th) => {
    th.addEventListener('click', () => {
      const field = th.dataset.sort;
      if (sortField === field) sortDir *= -1;
      else {
        sortField = field;
        sortDir = -1;
      }
      document
        .querySelectorAll('.sortable')
        .forEach((h) => h.classList.remove('sort-asc', 'sort-desc'));
      th.classList.add(sortDir === 1 ? 'sort-asc' : 'sort-desc');
      applyFilters();
    });
  });

  // Filters
  [
    'registry-search',
    'filter-category',
    'filter-reviewed',
    'filter-featured',
    'filter-translation',
    'filter-media',
  ].forEach((id) => {
    const el = document.getElementById(id);
    el.addEventListener(
      id === 'registry-search' ? 'input' : 'change',
      debounce(applyFilters, 150),
    );
  });
}

function applyFilters() {
  const search = document.getElementById('registry-search').value.toLowerCase();
  const cat = document.getElementById('filter-category').value;
  const rev = document.getElementById('filter-reviewed').value;
  const feat = document.getElementById('filter-featured').value;
  const trans = document.getElementById('filter-translation').value;
  const media = document.getElementById('filter-media').value;

  const filtered = allArticles.filter((a) => {
    if (
      search &&
      !a.title.toLowerCase().includes(search) &&
      !(typeof a.description === 'string' ? a.description : '')
        .toLowerCase()
        .includes(search) &&
      !(a.tags || []).some((t) => t.toLowerCase().includes(search))
    )
      return false;
    if (cat && a.category !== cat) return false;
    if (rev === 'true' && !a.lastHumanReview) return false;
    if (rev === 'false' && a.lastHumanReview) return false;
    if (feat === 'true' && !a.featured) return false;
    if (feat === 'false' && a.featured) return false;
    if (trans === 'has-en' && !a.translations.en) return false;
    if (trans === 'missing-en' && a.translations.en) return false;
    // 未知（cover 為 null）不被任何媒體選項選中
    if (media) {
      if (!mediaKnown(a)) return false;
      if (media === 'no-cover' && hasCover(a)) return false;
      if (media === 'no-image' && (hasCover(a) || a.imageCount !== 0))
        return false;
      if (media === 'credit-gap' && !(hasCover(a) && a.coverCredit === false))
        return false;
    }
    return true;
  });
  renderTable(filtered);
}

export { renderRegistry };
