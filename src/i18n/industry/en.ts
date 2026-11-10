/**
 * en.ts — topic UI strings (English). Keys must mirror zh.ts
 * (scripts/tools/check-industry-i18n.mjs reconciles them).
 * No evaluation, forecast or buy/sell language about individual stocks.
 */
import type { zh } from './zh';

export const en: Record<keyof typeof zh, string> = {
  // ── /companies upgrade ─────────────────────────────────────────────
  'co.disclaimer.h':
    'This page organises public data. It is not investment advice',
  'co.disclaimer.p':
    'The ranking is compiled from public filings: market capitalisation is a snapshot at the close on {date}, revenue is the full year 2025. Taiwan.md does not rate individual stocks, forecast prices or recommend any trade.',
  'co.topic.h': 'Why the list looks like this',
  'co.topic.p':
    'Seven of the top ten make electronics, and one company holds about four-tenths of the listed market’s value. It took seventy years, from sugar and textiles to wafers, to grow this structure — and some worry it is too concentrated.',
  'co.topic.cta1': 'Read the industry feature',
  'co.topic.cta2': 'See the supply-chain maps',
  'co.ctl.h': 'Sort and filter',
  'co.ctl.sort': 'Sort by',
  'co.ctl.industry': 'Industry (TWSE classification)',
  'co.ctl.county': 'Headquarters',
  'co.ctl.all': 'All',
  'co.ctl.reset': 'Reset',
  'co.ctl.dir.asc': 'Ascending',
  'co.ctl.dir.desc': 'Descending',
  'co.sort.rank': 'Market-cap rank',
  'co.sort.marketCap': 'Market cap',
  'co.sort.revenue': '2025 revenue',
  'co.sort.employees': 'Employees',
  'co.sort.founded': 'Founded',
  'co.summary':
    'Showing {n} companies, NT${cap} combined market cap, {pct}% of the top 50',
  'co.summary.empty': 'No company matches both filters',
  'co.unit.money': 'B',
  'co.col.hq': 'HQ',
  'co.col.change': 'vs June list',
  'co.change.new': 'New entry',
  'co.change.same': 'Unchanged',
  'co.change.up': 'Up {n}',
  'co.change.down': 'Down {n}',
  'co.note.change':
    '“vs June list” compares against this page’s June 2026 edition. That edition covered TWSE-listed companies only and derived market cap from index weights; this edition multiplies the closing price by common shares outstanding and covers both the TWSE and the TPEx. The methods differ, so read the rank changes for direction only.',
  'co.note.hq':
    'Headquarters is the registered address in the TWSE and TPEx company profiles (as of {date}); operations may be elsewhere. The industry filter uses the official TWSE classification, which differs from the “Sector” column — that column is Taiwan.md’s own grouping by supply-chain position.',

  // ── TWSE / TPEx industry classification ────────────────────────────
  'tse.01': 'Cement',
  'tse.02': 'Food',
  'tse.03': 'Plastics',
  'tse.04': 'Textiles',
  'tse.10': 'Iron & steel',
  'tse.15': 'Shipping & transport',
  'tse.17': 'Finance & insurance',
  'tse.22': 'Biotech & medical',
  'tse.23': 'Oil, gas & electricity',
  'tse.24': 'Semiconductors',
  'tse.25': 'Computers & peripherals',
  'tse.26': 'Optoelectronics',
  'tse.27': 'Communications & internet',
  'tse.28': 'Electronic components',
  'tse.31': 'Other electronics',
  'tse.37': 'Sports & leisure',

  // ── 22 counties and cities ─────────────────────────────────────────
  'county.臺北市': 'Taipei',
  'county.新北市': 'New Taipei',
  'county.桃園市': 'Taoyuan',
  'county.臺中市': 'Taichung',
  'county.臺南市': 'Tainan',
  'county.高雄市': 'Kaohsiung',
  'county.基隆市': 'Keelung',
  'county.新竹市': 'Hsinchu City',
  'county.嘉義市': 'Chiayi City',
  'county.新竹縣': 'Hsinchu County',
  'county.苗栗縣': 'Miaoli',
  'county.彰化縣': 'Changhua',
  'county.南投縣': 'Nantou',
  'county.雲林縣': 'Yunlin',
  'county.嘉義縣': 'Chiayi County',
  'county.屏東縣': 'Pingtung',
  'county.宜蘭縣': 'Yilan',
  'county.花蓮縣': 'Hualien',
  'county.臺東縣': 'Taitung',
  'county.澎湖縣': 'Penghu',
  'county.金門縣': 'Kinmen',
  'county.連江縣': 'Lienchiang',
};
