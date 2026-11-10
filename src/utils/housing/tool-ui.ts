/**
 * tool-ui.ts — 四個工具共用的瀏覽器端接線（讀欄位、重算、寫回畫面與網址）
 *
 * 工具根節點用 data-hs-tool 標記，節點內所有查詢都限定在根節點範圍，
 * 同一頁放兩個實例不會互相影響。這裡不含公式，公式全在 tool-models.ts。
 *
 * 標記約定（伺服端先輸出同樣的標記與預設結果，沒有 JS 也看得到數字）：
 *   data-hs-field="key"        輸入欄位（input / select）
 *   data-hs-out="key"          以 textContent 寫入文字
 *   data-hs-html="key"         以 innerHTML 寫入（圖、表、逐條結果）
 *   data-hs-href="key"         寫入 href
 *   data-hs-show="key"         依 view.show[key] 顯示或隱藏
 *   data-hs-when="a=x|y,b=z"   依目前欄位值顯示或隱藏（逗號為且，豎線為或）
 *   data-hs-disable-when="..." 條件成立時停用該欄位
 */
import { readParams, writeParams } from './format.ts';
import type { ToolView, Values } from './tool-models.ts';

/** 判斷條件式是否成立；伺服端與瀏覽器端共用。 */
export function isShown(expr: string, values: Values): boolean {
  return expr
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .every((cond) => {
      const [key, rhs = ''] = cond.split('=');
      const allowed = rhs.split('|');
      return allowed.includes(values[key.trim()] ?? '');
    });
}

type FieldEl = HTMLInputElement | HTMLSelectElement;

function fieldsOf(root: HTMLElement): FieldEl[] {
  return Array.from(root.querySelectorAll<FieldEl>('[data-hs-field]'));
}

function readValues(root: HTMLElement): Values {
  const v: Values = {};
  for (const el of fieldsOf(root)) {
    const key = el.dataset.hsField as string;
    v[key] =
      el instanceof HTMLInputElement && el.type === 'checkbox'
        ? el.checked
          ? '1'
          : '0'
        : el.value;
  }
  return v;
}

function writeValues(root: HTMLElement, values: Values): void {
  for (const el of fieldsOf(root)) {
    const key = el.dataset.hsField as string;
    if (!(key in values)) continue;
    if (el instanceof HTMLInputElement && el.type === 'checkbox')
      el.checked = values[key] === '1';
    else el.value = values[key];
  }
}

function applyView(root: HTMLElement, view: ToolView, values: Values): void {
  root.querySelectorAll<HTMLElement>('[data-hs-out]').forEach((el) => {
    const t = view.text[el.dataset.hsOut as string];
    if (t !== undefined && el.textContent !== t) el.textContent = t;
  });
  root.querySelectorAll<HTMLElement>('[data-hs-html]').forEach((el) => {
    const h = view.html[el.dataset.hsHtml as string];
    if (h !== undefined && el.innerHTML !== h) el.innerHTML = h;
  });
  root.querySelectorAll<HTMLElement>('[data-hs-href]').forEach((el) => {
    const h = view.href[el.dataset.hsHref as string];
    if (h !== undefined) el.setAttribute('href', h);
  });
  root.querySelectorAll<HTMLElement>('[data-hs-show]').forEach((el) => {
    el.hidden = !view.show[el.dataset.hsShow as string];
  });
  root.querySelectorAll<HTMLElement>('[data-hs-when]').forEach((el) => {
    el.hidden = !isShown(el.dataset.hsWhen as string, values);
  });
  root.querySelectorAll<FieldEl>('[data-hs-disable-when]').forEach((el) => {
    el.disabled = isShown(el.dataset.hsDisableWhen as string, values);
  });
}

export interface InitOptions {
  prefix: string;
  defaults: Values;
  compute: (values: Values) => ToolView;
  /** 是否把輸入同步到網址查詢參數 */
  sync: boolean;
}

export function initTool(root: HTMLElement, opt: InitOptions): void {
  const keys = Object.keys(opt.defaults);
  if (opt.sync) writeValues(root, readParams(opt.prefix, keys));

  const run = (): void => {
    const values = readValues(root);
    applyView(root, opt.compute(values), values);
    if (opt.sync) writeParams(opt.prefix, values, opt.defaults);
  };

  let timer: ReturnType<typeof setTimeout> | undefined;
  const later = (): void => {
    clearTimeout(timer);
    timer = setTimeout(run, 60);
  };
  root.addEventListener('input', later);
  root.addEventListener('change', run);
  root.querySelectorAll<HTMLElement>('[data-hs-reset]').forEach((b) =>
    b.addEventListener('click', () => {
      writeValues(root, opt.defaults);
      run();
    }),
  );
  run();
  root.dataset.hsReady = '1';
}
