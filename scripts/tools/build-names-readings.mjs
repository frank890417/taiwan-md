#!/usr/bin/env node
/**
 * build-names-readings.mjs — 產生 /names/romanize 拼音工具用的「漢字 → 注音」字音表。
 *
 * 用法：
 *   node --experimental-strip-types scripts/tools/build-names-readings.mjs <cache-dir>
 * <cache-dir> 沒有來源檔時會自己下載（釘版本）。產出 public/data/names/readings.json。
 *
 * 來源與授權：
 *   - 小麥注音 McBopomofo `Source/Data/BPMFBase.txt`、`heterophony1.list`（MIT License）：
 *     每個字的全部讀音（台灣國語注音）與破音字的常用讀音。
 *   - Unicode Unihan `Unihan_Readings.txt` 的 kMandarin（Unicode License v3）：
 *     每個字最通行的讀音；欄位有兩個值時第二個是台灣讀音。
 * 主讀音怎麼定：Unihan 台灣讀音（且小麥也收這個音）→ 小麥破音字表 → 小麥第一筆。
 * 第三種情況沒有頻率依據，輸出時記進 meta.unranked，工具頁會請使用者自己確認。
 */
import { mkdirSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, resolve } from 'node:path';
import {
  parseZhuyin,
  toHanyuToned,
  romanizeSyllable,
} from '../../src/utils/names/romanize.ts';

const MCB_SHA = '1f98c58c19177c115cf752e9d49ca2b8e39091d5';
const UNIHAN_VER = '16.0.0';
const cache = resolve(process.argv[2] || '.cache/names-readings');
mkdirSync(cache, { recursive: true });

function fetchTo(url, file) {
  const p = join(cache, file);
  if (!existsSync(p)) execFileSync('curl', ['-sSL', '-m', '180', '-o', p, url]);
  return p;
}
const base = `https://raw.githubusercontent.com/openvanilla/McBopomofo/${MCB_SHA}/Source/Data`;
const bpmf = readFileSync(
  fetchTo(`${base}/BPMFBase.txt`, 'BPMFBase.txt'),
  'utf8',
);
const het1 = readFileSync(
  fetchTo(`${base}/heterophony1.list`, 'heterophony1.list'),
  'utf8',
);
const unihanTxt = join(cache, 'Unihan_Readings.txt');
if (!existsSync(unihanTxt)) {
  const zip = fetchTo(
    `https://www.unicode.org/Public/${UNIHAN_VER}/ucd/Unihan.zip`,
    'Unihan.zip',
  );
  execFileSync('unzip', ['-o', '-q', zip, 'Unihan_Readings.txt', '-d', cache]);
}
const unihan = readFileSync(unihanTxt, 'utf8');

// 1. 小麥：字 → 讀音集合（依檔案順序）
const isHan = (c) => /^\p{Script=Han}$/u.test(c);
const readings = new Map();
const syllables = new Set();
const dropped = [];
for (const line of bpmf.split('\n')) {
  const p = line.trim().split(/\s+/);
  if (p.length < 2 || !isHan(p[0])) continue;
  // 引擎拼不出四套的讀音（例：「意」的又讀 ㄧㄜ）不收，寧可少一個讀音也不輸出半套
  if (!parseZhuyin(p[1]) || !romanizeSyllable(p[1])) {
    dropped.push(`${p[0]}${p[1]}`);
    continue;
  }
  syllables.add(p[1]);
  const arr = readings.get(p[0]) || [];
  if (!arr.includes(p[1])) arr.push(p[1]);
  readings.set(p[0], arr);
}

// 2. 帶調漢語拼音 → 注音（用同一顆引擎反推，確保兩邊一致）
const py2zy = new Map();
for (const z of syllables) {
  const s = parseZhuyin(z);
  const py = toHanyuToned(s);
  if (py && !py2zy.has(py)) py2zy.set(py, z);
}

// 3. Unihan kMandarin（取台灣讀音）
const uni = new Map();
for (const line of unihan.split('\n')) {
  if (!line.startsWith('U+')) continue;
  const [cp, field, val] = line.split('\t');
  if (field !== 'kMandarin') continue;
  const vals = val.trim().split(/\s+/);
  const tw = vals[vals.length > 1 ? 1 : 0].normalize('NFC');
  uni.set(String.fromCodePoint(parseInt(cp.slice(2), 16)), tw);
}

// 4. 小麥破音字常用讀音
const het = new Map();
for (const line of het1.split('\n')) {
  const p = line.trim().split(/\s+/);
  if (p.length >= 2) het.set(p[0], p[1]);
}

const out = {};
let viaUnihan = 0;
let viaHet = 0;
let single = 0;
const unranked = [];
for (const [ch, arr] of [...readings.entries()].sort(
  (a, b) => a[0].codePointAt(0) - b[0].codePointAt(0),
)) {
  let primary = null;
  if (arr.length === 1) {
    primary = arr[0];
    single++;
  } else {
    const u = py2zy.get(uni.get(ch) || '');
    if (u && arr.includes(u)) {
      primary = u;
      viaUnihan++;
    } else if (het.has(ch) && arr.includes(het.get(ch))) {
      primary = het.get(ch);
      viaHet++;
    } else {
      primary = arr[0];
      unranked.push(ch);
    }
  }
  out[ch] = [primary, ...arr.filter((r) => r !== primary)].join(',');
}

const payload = {
  meta: {
    generated: new Date().toISOString().slice(0, 10),
    sources: [
      {
        name: 'McBopomofo BPMFBase.txt / heterophony1.list',
        license: 'MIT',
        url: `https://github.com/openvanilla/McBopomofo/tree/${MCB_SHA}/Source/Data`,
      },
      {
        name: `Unicode Unihan Database ${UNIHAN_VER} (kMandarin)`,
        license: 'Unicode License v3',
        url: `https://www.unicode.org/Public/${UNIHAN_VER}/ucd/Unihan.zip`,
      },
    ],
    chars: Object.keys(out).length,
    polyphonic: Object.values(out).filter((v) => v.includes(',')).length,
    primaryFrom: {
      single,
      unihan: viaUnihan,
      heterophony: viaHet,
      unranked: unranked.length,
    },
    unranked: unranked.join(''),
    dropped: [...new Set(dropped)],
  },
  r: out,
};
const dest = resolve('public/data/names/readings.json');
mkdirSync(resolve('public/data/names'), { recursive: true });
writeFileSync(dest, JSON.stringify(payload));
console.log(
  `readings.json: ${payload.meta.chars} 字，多音 ${payload.meta.polyphonic}，` +
    `主讀音來源 unihan=${viaUnihan} heterophony=${viaHet} 未定序=${unranked.length}`,
);
