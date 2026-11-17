/**
 * /data/taiwan-industry.json — 「台灣產業」專題用到的全部數列，機器可讀。
 * 內容＝src/data/industry/series.json（每個數列帶 unit 與 source）＋時間軸事件的日期與出處＋
 * 前 50 大的官方產業別與總部縣市。跟 /data/taiwan-indicators.json 同一慣例：靜態、無參數。
 */
import series from '../../data/industry/series.json';
import companiesMeta from '../../data/industry/companies-meta.json';
import timeline from '../../data/industry/content/timeline.json';
import { industryDict } from '../../i18n/industry';

export function GET() {
  const zh = industryDict('zh-TW');
  const en = industryDict('en');
  const events = (timeline as any).events.map((e: any) => ({
    id: e.id,
    date: e.date,
    track: e.track,
    title: {
      zh: zh[`timeline.events.${e.id}.t`],
      en: en[`timeline.events.${e.id}.t`],
    },
    source: e.url,
  }));
  const body = JSON.stringify(
    {
      name: 'Taiwan.md — Taiwan’s Industries data file',
      page: 'https://taiwan.md/industry/',
      license: 'CC BY-SA 4.0',
      note: '每個數列的 source 指向原始統計；null 表示來源沒有該年資料，不是 0。數字不構成投資建議。',
      series,
      timeline: events,
      companies: {
        basicDataAsOf: companiesMeta.basicDataAsOf,
        sources: companiesMeta.sources,
        byTicker: companiesMeta.companies,
      },
    },
    null,
    1,
  );
  return new Response(body, {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
