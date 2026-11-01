/**
 * data-hub-export.ts — /data 指標總表的機器可讀輸出（CSV／JSON 下載端點共用）。
 * 欄位一律中英雙語，數值保留原始單位；永久連結指回 /data 的卡片錨點。
 */
import { indicatorsData, loc, formatIndicator } from './data-hub';

const SITE = 'https://taiwan.md';

export function exportRows() {
  return indicatorsData.indicators.map((i) => ({
    id: i.id,
    category: i.category,
    title_zh: loc(i.title, 'zh-TW'),
    title_en: loc(i.title, 'en'),
    value: i.value,
    display_zh: formatIndicator(i, 'zh-TW').text,
    display_en: formatIndicator(i, 'en').text,
    period_zh: loc(i.period, 'zh-TW'),
    period_en: loc(i.period, 'en'),
    as_of: i.asOf,
    basis: i.basis ?? 'official',
    cadence: i.cadence ?? '',
    compare_value: i.compare?.value ?? '',
    compare_period_zh: i.compare ? loc(i.compare.period, 'zh-TW') : '',
    compare_period_en: i.compare ? loc(i.compare.period, 'en') : '',
    source_agency_zh: loc(i.source.agency, 'zh-TW'),
    source_agency_en: loc(i.source.agency, 'en'),
    source_url: i.source.url,
    download_url: i.source.download ?? '',
    insight_zh: loc(i.insight, 'zh-TW'),
    insight_en: loc(i.insight, 'en'),
    why_zh: i.why ? loc(i.why, 'zh-TW') : '',
    why_en: i.why ? loc(i.why, 'en') : '',
    series: i.series ?? [],
    permalink: `${SITE}/data/#ind-${i.id}`,
  }));
}

export function exportMeta() {
  const m = indicatorsData.meta;
  return {
    name: 'Taiwan key indicators — Taiwan.md Data Taiwan',
    name_zh: '台灣關鍵指標 — Taiwan.md 資料台灣',
    url: `${SITE}/data/`,
    generated: m.generated,
    verified_at: m.verifiedAt,
    license:
      'CC BY-SA 4.0 (compilation); each value follows its source licence',
    license_note_zh: loc(m.license, 'zh-TW'),
    license_note_en: loc(m.license, 'en'),
    method_zh: loc(m.method, 'zh-TW'),
    method_en: loc(m.method, 'en'),
    fields: Object.keys(exportRows()[0] ?? {}),
  };
}

const CSV_FIELDS = [
  'id',
  'category',
  'title_zh',
  'title_en',
  'value',
  'display_zh',
  'display_en',
  'period_zh',
  'period_en',
  'as_of',
  'basis',
  'cadence',
  'compare_value',
  'compare_period_zh',
  'compare_period_en',
  'source_agency_zh',
  'source_agency_en',
  'source_url',
  'download_url',
  'insight_zh',
  'insight_en',
  'why_zh',
  'why_en',
  'permalink',
] as const;

function csvCell(v: unknown): string {
  const s = v === null || v === undefined ? '' : String(v);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export function exportCsv(): string {
  const rows = exportRows();
  const lines = [CSV_FIELDS.join(',')];
  for (const r of rows) {
    lines.push(CSV_FIELDS.map((f) => csvCell((r as any)[f])).join(','));
  }
  // UTF-8 BOM：讓 Excel 直接打開也不會把中文當成 Big5 亂碼
  return '﻿' + lines.join('\r\n') + '\r\n';
}
