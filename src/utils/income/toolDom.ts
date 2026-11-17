/**
 * toolDom.ts — income 專題四個試算工具共用的瀏覽器端小工具（只在 <script> 裡 import）。
 *
 * 只做三件事：讀表單狀態、把狀態同步到網址查詢參數、把結果寫回 [data-out]。
 * 公式一律在 src/utils/income/ 的其他檔，這裡不放任何計算。
 *
 * 同一頁可以放多個工具：所有查詢都從工具的根節點出發，沒有寫死的 id；
 * 查詢參數帶工具自己的前綴（root 的 data-prefix，例如 "tax."），單獨頁前綴為空。
 */

export type ToolState = Record<string, number | string | boolean>;

type Field = HTMLInputElement | HTMLSelectElement;

function fields(root: HTMLElement): Field[] {
  return Array.from(
    root.querySelectorAll<Field>('input[name], select[name]'),
  ).filter((el) => !el.disabled || el.dataset.keep === '1');
}

/** 讀表單：number／range → number（空字串當 0），checkbox → boolean，radio → 被選的 value。 */
export function readState(root: HTMLElement): ToolState {
  const out: ToolState = {};
  for (const el of fields(root)) {
    const name = el.name;
    if (el instanceof HTMLInputElement) {
      if (el.type === 'checkbox') out[name] = el.checked;
      else if (el.type === 'radio') {
        if (el.checked) out[name] = el.value;
      } else if (el.type === 'number' || el.type === 'range') {
        const v = el.value === '' ? 0 : Number(el.value);
        out[name] = Number.isFinite(v) ? v : 0;
      } else out[name] = el.value;
    } else {
      const raw = el.value;
      out[name] = el.dataset.numeric === '1' ? Number(raw) : raw;
    }
  }
  return out;
}

function setField(el: Field, raw: string) {
  if (el instanceof HTMLInputElement) {
    if (el.type === 'checkbox') el.checked = raw === '1' || raw === 'true';
    else if (el.type === 'radio') el.checked = el.value === raw;
    else el.value = raw;
  } else if (Array.from(el.options).some((o) => o.value === raw)) {
    el.value = raw;
  }
}

/** 頁面載入時把網址查詢參數套回表單。回傳是否有套到任何一欄。 */
export function applyQuery(root: HTMLElement): boolean {
  const prefix = root.dataset.prefix ?? '';
  const q = new URLSearchParams(window.location.search);
  let hit = false;
  for (const el of fields(root)) {
    const raw = q.get(prefix + el.name);
    if (raw == null) continue;
    setField(el, raw);
    hit = true;
  }
  return hit;
}

function serialize(v: number | string | boolean): string {
  if (typeof v === 'boolean') return v ? '1' : '0';
  return String(v);
}

/**
 * 把目前狀態寫進網址（replaceState，不產生歷史紀錄）。
 * 跟伺服端預設值相同的欄位不寫，網址才短；內嵌板（iframe）也照寫，方便分享 iframe 的 src。
 */
export function syncQuery(root: HTMLElement, defaults: ToolState): void {
  const prefix = root.dataset.prefix ?? '';
  const q = new URLSearchParams(window.location.search);
  const state = readState(root);
  for (const el of fields(root)) q.delete(prefix + el.name);
  for (const [k, v] of Object.entries(state)) {
    if (serialize(v) === serialize(defaults[k] ?? '')) continue;
    q.set(prefix + k, serialize(v));
  }
  const qs = q.toString();
  const url =
    window.location.pathname + (qs ? `?${qs}` : '') + window.location.hash;
  try {
    window.history.replaceState(null, '', url);
  } catch {
    // sandboxed iframe：不能改網址就算了，工具照常運作
  }
}

/** 寫結果：root 內所有 [data-out="key"] 的文字。 */
export function setOut(root: HTMLElement, key: string, text: string): void {
  root
    .querySelectorAll<HTMLElement>(`[data-out="${key}"]`)
    .forEach((el) => (el.textContent = text));
}

/** 顯示或隱藏 root 內所有 [data-show="key"]。 */
export function setShow(root: HTMLElement, key: string, on: boolean): void {
  root
    .querySelectorAll<HTMLElement>(`[data-show="${key}"]`)
    .forEach((el) => (el.hidden = !on));
}

/** 設定 root 內 [data-bar="key"] 的寬度百分比（0–100）。 */
export function setBar(root: HTMLElement, key: string, pct: number): void {
  const p = Math.max(0, Math.min(100, pct));
  root
    .querySelectorAll<HTMLElement>(`[data-bar="${key}"]`)
    .forEach((el) => el.style.setProperty('--inc-w', `${p}%`));
}

export function fmtInt(n: number | null | undefined): string {
  if (n == null || !Number.isFinite(n)) return '—';
  return Math.round(n).toLocaleString('en-US');
}

/** 金額：中文「12,345 元」，英文「NT$12,345」。loc 來自 root 的 data-loc。 */
export function fmtMoney(n: number | null | undefined, loc: string): string {
  if (n == null || !Number.isFinite(n)) return '—';
  return loc === 'zh-TW' ? `${fmtInt(n)} 元` : `NT$${fmtInt(n)}`;
}

export function fmtPct(x: number | null | undefined, digits = 1): string {
  if (x == null || !Number.isFinite(x)) return '—';
  return `${(x * 100).toFixed(digits)}%`;
}

/** root 上 data-i18n 是一包 JSON 字串表（伺服端依語言塞好），給動態訊息用。 */
export function messages(root: HTMLElement): Record<string, string> {
  try {
    return JSON.parse(root.dataset.i18n ?? '{}');
  } catch {
    return {};
  }
}

/** root 上 data-params 是計算參數（年度資料檔的內容）。 */
export function params<T>(root: HTMLElement): T {
  return JSON.parse(root.dataset.params ?? '{}') as T;
}

/**
 * 綁定：套網址 → 算一次 → 之後每次輸入重算並同步網址。
 * defaults 取自伺服端渲染當下的表單值（還沒套網址之前）。
 */
export function bindTool(
  root: HTMLElement,
  recompute: (state: ToolState) => void,
): void {
  if (root.dataset.bound === '1') return;
  root.dataset.bound = '1';
  const defaults = readState(root);
  const hadQuery = applyQuery(root);
  const run = () => recompute(readState(root));
  if (hadQuery) run();
  let timer: number | undefined;
  const onInput = () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      run();
      syncQuery(root, defaults);
    }, 80);
  };
  // 表單沒有送出的對象：按 Enter 不該重新載入頁面
  root.addEventListener('submit', (ev) => ev.preventDefault());
  root.addEventListener('input', onInput);
  root.addEventListener('change', onInput);
  root.classList.add('is-live');
}
