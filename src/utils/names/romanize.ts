/**
 * romanize.ts — 「台灣人的名字」專題的拼音引擎（純函式，無 DOM、無 I/O）。
 *
 * 做的事：注音音節 → 四套華語譯音（漢語拼音／通用拼音／國音第二式／威妥瑪），
 * 輸出格式比照外交部領事事務局「護照外文姓名拼音對照表」：全大寫、無聲調、
 * 威妥瑪不帶送氣撇號與變音符號。規則推導的結果在
 * tests/names-romanize.test.mjs 逐列對官方表（src/data/names/boca-table.json）。
 *
 * 不做的事：台語、客語、原住民族語的拼音不是從華語讀音推得出來的，
 * 這裡不處理（姓氏的台、客語讀音住 src/data/names/surnames.json，逐筆有出處）。
 *
 * 設計報告：reports/design-names-topic-2026-11-10.md
 */

export type System = 'hanyu' | 'tongyong' | 'mps2' | 'wg';
export const SYSTEMS: System[] = ['wg', 'hanyu', 'tongyong', 'mps2'];

const INITIALS = 'ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄖㄗㄘㄙ';
const MEDIALS = 'ㄧㄨㄩ';
const TONE_MARKS = 'ˊˇˋ˙';

export interface Syllable {
  /** 聲母（可空） */
  i: string;
  /** 介音（可空） */
  m: string;
  /** 韻母（可空） */
  f: string;
  /** 聲調 1–5（5＝輕聲） */
  tone: number;
}

/** 拆注音。不合法回 null（不猜）。 */
export function parseZhuyin(z: string): Syllable | null {
  let s = z.trim();
  if (!s) return null;
  let tone = 1;
  if (s.startsWith('˙')) {
    tone = 5;
    s = s.slice(1);
  }
  const last = s[s.length - 1];
  if (TONE_MARKS.includes(last)) {
    tone = last === 'ˊ' ? 2 : last === 'ˇ' ? 3 : last === 'ˋ' ? 4 : 5;
    s = s.slice(0, -1);
  }
  let i = '';
  let m = '';
  let f = '';
  let k = 0;
  if (k < s.length && INITIALS.includes(s[k])) i = s[k++];
  if (k < s.length && MEDIALS.includes(s[k])) m = s[k++];
  if (k < s.length && 'ㄚㄛㄜㄝㄞㄟㄠㄡㄢㄣㄤㄥㄦ'.includes(s[k])) f = s[k++];
  if (k !== s.length || (!i && !m && !f)) return null;
  return { i, m, f, tone };
}

// ── 漢語拼音 ─────────────────────────────────────────────────────────
const HY_I: Record<string, string> = {
  ㄅ: 'b',
  ㄆ: 'p',
  ㄇ: 'm',
  ㄈ: 'f',
  ㄉ: 'd',
  ㄊ: 't',
  ㄋ: 'n',
  ㄌ: 'l',
  ㄍ: 'g',
  ㄎ: 'k',
  ㄏ: 'h',
  ㄐ: 'j',
  ㄑ: 'q',
  ㄒ: 'x',
  ㄓ: 'zh',
  ㄔ: 'ch',
  ㄕ: 'sh',
  ㄖ: 'r',
  ㄗ: 'z',
  ㄘ: 'c',
  ㄙ: 's',
};
const HY_F: Record<string, string> = {
  ㄚ: 'a',
  ㄛ: 'o',
  ㄜ: 'e',
  ㄝ: 'e',
  ㄞ: 'ai',
  ㄟ: 'ei',
  ㄠ: 'ao',
  ㄡ: 'ou',
  ㄢ: 'an',
  ㄣ: 'en',
  ㄤ: 'ang',
  ㄥ: 'eng',
  ㄦ: 'er',
};
/** 介音＋韻母 → 帶聲母時的韻（漢語拼音），key 用注音 */
const HY_RIME: Record<string, [string, string]> = {
  // [有聲母時, 零聲母時]
  ㄧ: ['i', 'yi'],
  ㄧㄚ: ['ia', 'ya'],
  ㄧㄛ: ['io', 'yo'],
  ㄧㄝ: ['ie', 'ye'],
  ㄧㄞ: ['iai', 'yai'],
  ㄧㄠ: ['iao', 'yao'],
  ㄧㄡ: ['iu', 'you'],
  ㄧㄢ: ['ian', 'yan'],
  ㄧㄣ: ['in', 'yin'],
  ㄧㄤ: ['iang', 'yang'],
  ㄧㄥ: ['ing', 'ying'],
  ㄨ: ['u', 'wu'],
  ㄨㄚ: ['ua', 'wa'],
  ㄨㄛ: ['uo', 'wo'],
  ㄨㄞ: ['uai', 'wai'],
  ㄨㄟ: ['ui', 'wei'],
  ㄨㄢ: ['uan', 'wan'],
  ㄨㄣ: ['un', 'wen'],
  ㄨㄤ: ['uang', 'wang'],
  ㄨㄥ: ['ong', 'weng'],
  ㄩ: ['ü', 'yu'],
  ㄩㄝ: ['üe', 'yue'],
  ㄩㄢ: ['üan', 'yuan'],
  ㄩㄣ: ['ün', 'yun'],
  ㄩㄥ: ['iong', 'yong'],
};

function hanyuBase(s: Syllable, keepUmlaut: boolean): string {
  const { i, m, f } = s;
  if (!m && !f) {
    // 空韻
    return HY_I[i] + 'i';
  }
  if (!m) return (HY_I[i] || '') + HY_F[f];
  const r = HY_RIME[m + f];
  if (!r) return '';
  if (!i) return r[1];
  let rime = r[0];
  if (m === 'ㄩ' && 'ㄐㄑㄒ'.includes(i)) rime = rime.replace('ü', 'u');
  // ㄅㄆㄇㄈ＋ㄨㄛ 不存在；ㄅㄛ 在上面 !m 分支
  let out = HY_I[i] + rime;
  // 護照對照表把 ㄋㄩ／ㄌㄩ 列為 NU／LU（ü 直接寫 U），照官方表
  if (!keepUmlaut) out = out.replace(/ü/g, 'u');
  return out;
}

/** 漢語拼音（護照格式：無聲調，ü 寫作 U，例：呂 LU） */
export function toHanyu(s: Syllable): string {
  return hanyuBase(s, false).toUpperCase();
}

const TONE_V: Record<string, string[]> = {
  a: ['ā', 'á', 'ǎ', 'à'],
  e: ['ē', 'é', 'ě', 'è'],
  i: ['ī', 'í', 'ǐ', 'ì'],
  o: ['ō', 'ó', 'ǒ', 'ò'],
  u: ['ū', 'ú', 'ǔ', 'ù'],
  ü: ['ǖ', 'ǘ', 'ǚ', 'ǜ'],
};
/** 帶聲調符號的漢語拼音（給念法提示用，小寫） */
export function toHanyuToned(s: Syllable): string {
  const base = hanyuBase(s, true);
  if (!base || s.tone === 5) return base;
  // 標調位置：a > e > ou 的 o > 最後一個母音
  let idx = base.indexOf('a');
  if (idx < 0) idx = base.indexOf('e');
  if (idx < 0 && base.includes('ou')) idx = base.indexOf('o');
  if (idx < 0) {
    for (let k = base.length - 1; k >= 0; k--) {
      if ('aeiouü'.includes(base[k])) {
        idx = k;
        break;
      }
    }
  }
  if (idx < 0) return base;
  const v = base[idx];
  return base.slice(0, idx) + TONE_V[v][s.tone - 1] + base.slice(idx + 1);
}

// ── 通用拼音（由漢語拼音改寫）────────────────────────────────────────
export function toTongyong(s: Syllable): string {
  const { i, m, f } = s;
  if (!m && !f) {
    const map: Record<string, string> = {
      ㄓ: 'jhih',
      ㄔ: 'chih',
      ㄕ: 'shih',
      ㄖ: 'rih',
      ㄗ: 'zih',
      ㄘ: 'cih',
      ㄙ: 'sih',
    };
    return (map[i] || '').toUpperCase();
  }
  const TI: Record<string, string> = {
    ...HY_I,
    ㄐ: 'j',
    ㄑ: 'c',
    ㄒ: 's',
    ㄓ: 'jh',
  };
  if (!m) {
    let fin = HY_F[f];
    // ㄈㄥ → fong（通用把唇音後的 eng 寫 ong，官方表僅 ㄈㄥ 一列）
    if (i === 'ㄈ' && f === 'ㄥ') fin = 'ong';
    return ((TI[i] || '') + fin).toUpperCase();
  }
  const key = m + f;
  if (!i) {
    const zero: Record<string, string> = {
      ㄧ: 'yi',
      ㄧㄚ: 'ya',
      ㄧㄛ: 'yo',
      ㄧㄝ: 'ye',
      ㄧㄞ: 'yai',
      ㄧㄠ: 'yao',
      ㄧㄡ: 'you',
      ㄧㄢ: 'yan',
      ㄧㄣ: 'yin',
      ㄧㄤ: 'yang',
      ㄧㄥ: 'ying',
      ㄨ: 'wu',
      ㄨㄚ: 'wa',
      ㄨㄛ: 'wo',
      ㄨㄞ: 'wai',
      ㄨㄟ: 'wei',
      ㄨㄢ: 'wan',
      ㄨㄣ: 'wun',
      ㄨㄤ: 'wang',
      ㄨㄥ: 'wong',
      ㄩ: 'yu',
      ㄩㄝ: 'yue',
      ㄩㄢ: 'yuan',
      ㄩㄣ: 'yun',
      ㄩㄥ: 'yong',
    };
    return (zero[key] || '').toUpperCase();
  }
  const rime: Record<string, string> = {
    ㄧ: 'i',
    ㄧㄚ: 'ia',
    ㄧㄛ: 'io',
    ㄧㄝ: 'ie',
    ㄧㄞ: 'iai',
    ㄧㄠ: 'iao',
    ㄧㄡ: 'iou',
    ㄧㄢ: 'ian',
    ㄧㄣ: 'in',
    ㄧㄤ: 'iang',
    ㄧㄥ: 'ing',
    ㄨ: 'u',
    ㄨㄚ: 'ua',
    ㄨㄛ: 'uo',
    ㄨㄞ: 'uai',
    ㄨㄟ: 'uei',
    ㄨㄢ: 'uan',
    ㄨㄣ: 'un',
    ㄨㄤ: 'uang',
    ㄨㄥ: 'ong',
    ㄩ: 'yu',
    ㄩㄝ: 'yue',
    ㄩㄢ: 'yuan',
    ㄩㄣ: 'yun',
    ㄩㄥ: 'yong',
  };
  return (TI[i] + (rime[key] || '')).toUpperCase();
}

// ── 國音第二式（MPS2）────────────────────────────────────────────────
export function toMps2(s: Syllable): string {
  const { i, m, f } = s;
  const MI: Record<string, string> = {
    ...HY_I,
    ㄐ: 'j',
    ㄑ: 'ch',
    ㄒ: 'sh',
    ㄓ: 'j',
    ㄔ: 'ch',
    ㄕ: 'sh',
    ㄖ: 'r',
    ㄗ: 'tz',
    ㄘ: 'ts',
    ㄙ: 's',
  };
  if (!m && !f) {
    const map: Record<string, string> = {
      ㄓ: 'jr',
      ㄔ: 'chr',
      ㄕ: 'shr',
      ㄖ: 'r',
      ㄗ: 'tz',
      ㄘ: 'tsz',
      ㄙ: 'sz',
    };
    return (map[i] || '').toUpperCase();
  }
  const MF: Record<string, string> = { ...HY_F, ㄠ: 'au' };
  if (!m) return ((MI[i] || '') + MF[f]).toUpperCase();
  const key = m + f;
  if (!i) {
    const zero: Record<string, string> = {
      ㄧ: 'yi',
      ㄧㄚ: 'ya',
      ㄧㄛ: 'yo',
      ㄧㄝ: 'ye',
      ㄧㄞ: 'yai',
      ㄧㄠ: 'yau',
      ㄧㄡ: 'you',
      ㄧㄢ: 'yan',
      ㄧㄣ: 'yin',
      ㄧㄤ: 'yang',
      ㄧㄥ: 'ying',
      ㄨ: 'wu',
      ㄨㄚ: 'wa',
      ㄨㄛ: 'wo',
      ㄨㄞ: 'wai',
      ㄨㄟ: 'wei',
      ㄨㄢ: 'wan',
      ㄨㄣ: 'wen',
      ㄨㄤ: 'wang',
      ㄨㄥ: 'weng',
      ㄩ: 'yu',
      ㄩㄝ: 'yue',
      ㄩㄢ: 'yuan',
      ㄩㄣ: 'yun',
      ㄩㄥ: 'yung',
    };
    return (zero[key] || '').toUpperCase();
  }
  const rime: Record<string, string> = {
    ㄧ: 'i',
    ㄧㄚ: 'ia',
    ㄧㄛ: 'io',
    ㄧㄝ: 'ie',
    ㄧㄞ: 'iai',
    ㄧㄠ: 'iau',
    ㄧㄡ: 'iou',
    ㄧㄢ: 'ian',
    ㄧㄣ: 'in',
    ㄧㄤ: 'iang',
    ㄧㄥ: 'ing',
    ㄨ: 'u',
    ㄨㄚ: 'ua',
    ㄨㄛ: 'uo',
    ㄨㄞ: 'uai',
    ㄨㄟ: 'uei',
    ㄨㄢ: 'uan',
    ㄨㄣ: 'uen',
    ㄨㄤ: 'uang',
    ㄨㄥ: 'ung',
    ㄩ: 'iu',
    ㄩㄝ: 'iue',
    ㄩㄢ: 'iuan',
    ㄩㄣ: 'iun',
    ㄩㄥ: 'iung',
  };
  return (MI[i] + (rime[key] || '')).toUpperCase();
}

// ── 威妥瑪（護照格式：無撇號、無變音符號）────────────────────────────
export function toWg(s: Syllable): string {
  return toWgAll(s)[0] ?? '';
}
/** 官方表有六列威妥瑪給兩種寫法（例：ㄍㄜ「KE 或 KO」），這裡照官方順序全部回傳 */
export function toWgAll(s: Syllable): string[] {
  const { i, m, f } = s;
  if (!m && f === 'ㄜ' && (!i || 'ㄍㄎㄏ'.includes(i))) {
    const head = i ? (i === 'ㄏ' ? 'H' : 'K') : '';
    return [head + 'E', head + 'O'];
  }
  if (!i && m === 'ㄧ' && !f) return ['YI', 'I'];
  const one = wgOne(s);
  return one ? [one] : [];
}
function wgOne(s: Syllable): string {
  const { i, m, f } = s;
  const WI: Record<string, string> = {
    ㄅ: 'p',
    ㄆ: 'p',
    ㄇ: 'm',
    ㄈ: 'f',
    ㄉ: 't',
    ㄊ: 't',
    ㄋ: 'n',
    ㄌ: 'l',
    ㄍ: 'k',
    ㄎ: 'k',
    ㄏ: 'h',
    ㄐ: 'ch',
    ㄑ: 'ch',
    ㄒ: 'hs',
    ㄓ: 'ch',
    ㄔ: 'ch',
    ㄕ: 'sh',
    ㄖ: 'j',
    ㄗ: 'ts',
    ㄘ: 'ts',
    ㄙ: 's',
  };
  if (!m && !f) {
    const map: Record<string, string> = {
      ㄓ: 'chih',
      ㄔ: 'chih',
      ㄕ: 'shih',
      ㄖ: 'jih',
      ㄗ: 'tzu',
      ㄘ: 'tzu',
      ㄙ: 'ssu',
    };
    return (map[i] || '').toUpperCase();
  }
  if (!m) {
    const WF: Record<string, string> = {
      ㄚ: 'a',
      ㄛ: 'o',
      ㄜ: 'e',
      ㄝ: 'eh',
      ㄞ: 'ai',
      ㄟ: 'ei',
      ㄠ: 'ao',
      ㄡ: 'ou',
      ㄢ: 'an',
      ㄣ: 'en',
      ㄤ: 'ang',
      ㄥ: 'eng',
      ㄦ: 'erh',
    };
    return ((WI[i] || '') + WF[f]).toUpperCase();
  }
  const key = m + f;
  if (!i) {
    const zero: Record<string, string> = {
      ㄧ: 'i',
      ㄧㄚ: 'ya',
      ㄧㄛ: 'yo',
      ㄧㄝ: 'yeh',
      ㄧㄞ: 'yai',
      ㄧㄠ: 'yao',
      ㄧㄡ: 'yu',
      ㄧㄢ: 'yen',
      ㄧㄣ: 'yin',
      ㄧㄤ: 'yang',
      ㄧㄥ: 'ying',
      ㄨ: 'wu',
      ㄨㄚ: 'wa',
      ㄨㄛ: 'wo',
      ㄨㄞ: 'wai',
      ㄨㄟ: 'wei',
      ㄨㄢ: 'wan',
      ㄨㄣ: 'wen',
      ㄨㄤ: 'wang',
      ㄨㄥ: 'weng',
      ㄩ: 'yu',
      ㄩㄝ: 'yueh',
      ㄩㄢ: 'yuan',
      ㄩㄣ: 'yun',
      ㄩㄥ: 'yung',
    };
    return (zero[key] || '').toUpperCase();
  }
  const rime: Record<string, string> = {
    ㄧ: 'i',
    ㄧㄚ: 'ia',
    ㄧㄛ: 'io',
    ㄧㄝ: 'ieh',
    ㄧㄞ: 'iai',
    ㄧㄠ: 'iao',
    ㄧㄡ: 'iu',
    ㄧㄢ: 'ien',
    ㄧㄣ: 'in',
    ㄧㄤ: 'iang',
    ㄧㄥ: 'ing',
    ㄨ: 'u',
    ㄨㄚ: 'ua',
    ㄨㄛ: 'o',
    ㄨㄞ: 'uai',
    ㄨㄟ: 'ui',
    ㄨㄢ: 'uan',
    ㄨㄣ: 'un',
    ㄨㄤ: 'uang',
    ㄨㄥ: 'ung',
    ㄩ: 'u',
    ㄩㄝ: 'ueh',
    ㄩㄢ: 'uan',
    ㄩㄣ: 'un',
    ㄩㄥ: 'iung',
  };
  let r = rime[key] || '';
  // ㄍㄎㄏㄕ＋ㄨㄛ → KUO／KUO／HUO／SHUO；ㄍㄎ＋ㄨㄟ → KUEI
  if (key === 'ㄨㄛ' && 'ㄍㄎㄏㄕ'.includes(i)) r = 'uo';
  if (key === 'ㄨㄟ' && 'ㄍㄎ'.includes(i)) r = 'uei';
  return (WI[i] + r).toUpperCase();
}

/** 每套系統的全部官方寫法（多數只有一個；威妥瑪六列有兩個） */
export function romanizeSyllableAll(
  zhuyin: string,
): Record<System, string[]> | null {
  const s = parseZhuyin(zhuyin);
  if (!s) return null;
  const out = {
    hanyu: [toHanyu(s)],
    tongyong: [toTongyong(s)],
    mps2: [toMps2(s)],
    wg: toWgAll(s),
  };
  if (SYSTEMS.some((k) => !out[k].length || out[k].some((v) => !v)))
    return null;
  return out;
}

export function romanizeSyllable(
  zhuyin: string,
): Record<System, string> | null {
  const s = parseZhuyin(zhuyin);
  if (!s) return null;
  const out = {
    hanyu: toHanyu(s),
    tongyong: toTongyong(s),
    mps2: toMps2(s),
    wg: toWg(s),
  };
  if (!out.hanyu || !out.tongyong || !out.mps2 || !out.wg) return null;
  return out;
}

/** 去掉聲調的注音（查對照表用） */
export function stripTone(zhuyin: string): string {
  return zhuyin.replace(/[ˊˇˋ˙]/g, '');
}

// ── 念法提示：IPA（華語，寬式）──────────────────────────────────────
const IPA_I: Record<string, string> = {
  ㄅ: 'p',
  ㄆ: 'pʰ',
  ㄇ: 'm',
  ㄈ: 'f',
  ㄉ: 't',
  ㄊ: 'tʰ',
  ㄋ: 'n',
  ㄌ: 'l',
  ㄍ: 'k',
  ㄎ: 'kʰ',
  ㄏ: 'x',
  ㄐ: 'tɕ',
  ㄑ: 'tɕʰ',
  ㄒ: 'ɕ',
  ㄓ: 'ʈʂ',
  ㄔ: 'ʈʂʰ',
  ㄕ: 'ʂ',
  ㄖ: 'ʐ',
  ㄗ: 'ts',
  ㄘ: 'tsʰ',
  ㄙ: 's',
};
const IPA_RIME: Record<string, string> = {
  ㄚ: 'a',
  ㄛ: 'o',
  ㄜ: 'ɤ',
  ㄝ: 'ɛ',
  ㄞ: 'ai',
  ㄟ: 'ei',
  ㄠ: 'au',
  ㄡ: 'ou',
  ㄢ: 'an',
  ㄣ: 'ən',
  ㄤ: 'aŋ',
  ㄥ: 'əŋ',
  ㄦ: 'ɚ',
  ㄧ: 'i',
  ㄧㄚ: 'ja',
  ㄧㄛ: 'jo',
  ㄧㄝ: 'jɛ',
  ㄧㄞ: 'jai',
  ㄧㄠ: 'jau',
  ㄧㄡ: 'jou',
  ㄧㄢ: 'jɛn',
  ㄧㄣ: 'in',
  ㄧㄤ: 'jaŋ',
  ㄧㄥ: 'iŋ',
  ㄨ: 'u',
  ㄨㄚ: 'wa',
  ㄨㄛ: 'wo',
  ㄨㄞ: 'wai',
  ㄨㄟ: 'wei',
  ㄨㄢ: 'wan',
  ㄨㄣ: 'wən',
  ㄨㄤ: 'waŋ',
  ㄨㄥ: 'ʊŋ',
  ㄩ: 'y',
  ㄩㄝ: 'ɥɛ',
  ㄩㄢ: 'ɥɛn',
  ㄩㄣ: 'yn',
  ㄩㄥ: 'jʊŋ',
};
const IPA_TONE = ['˥', '˧˥', '˨˩˦', '˥˩', ''];
export function toIpa(s: Syllable): string {
  const { i, m, f, tone } = s;
  let body: string;
  if (!m && !f) body = IPA_I[i] + ('ㄓㄔㄕㄖ'.includes(i) ? 'ɻ̩' : 'ɹ̩');
  else body = (IPA_I[i] || '') + (IPA_RIME[m + f] ?? '');
  return body + IPA_TONE[tone - 1];
}

// ── 姓名層 ───────────────────────────────────────────────────────────
export interface CharReading {
  char: string;
  /** 所有已知讀音（注音，含調），第一個是預設 */
  readings: string[];
  /** 目前選用的讀音 index */
  pick: number;
  /** 預設讀音是不是來自「姓氏讀音表」 */
  surnameOverride?: boolean;
}

/** 常見複姓（教育部《重編國語辭典》收錄者）。輸入開頭兩字命中時，預設把兩字都當姓。 */
export const COMPOUND_SURNAMES = [
  '歐陽',
  '司馬',
  '上官',
  '諸葛',
  '司徒',
  '夏侯',
  '皇甫',
  '尉遲',
  '公孫',
  '慕容',
  '長孫',
  '宇文',
  '軒轅',
  '令狐',
  '鍾離',
  '端木',
  '東方',
  '南宮',
  '獨孤',
  '万俟',
  '范姜',
  '張簡',
  '歐陽',
  '周黃',
].filter((v, i, a) => a.indexOf(v) === i);

/**
 * 當姓氏時讀音跟最常用讀音不同的字（多音字）。值＝當姓時的注音。
 * 只收教育部《重編國語辭典修訂本》在該讀音下列有「姓」義項、且字音表也收這個讀音的字。
 * 有的字不只一個讀音可以當姓（例：樂 ㄩㄝˋ／ㄌㄜˋ 是兩個不同的姓），
 * 所以工具永遠把其他讀音一起列出來讓使用者改選，這張表只決定預設值。
 */
export const SURNAME_READINGS: Record<string, string> = {
  曾: 'ㄗㄥ',
  單: 'ㄕㄢˋ',
  解: 'ㄒㄧㄝˋ',
  查: 'ㄓㄚ',
  仇: 'ㄑㄧㄡˊ',
  區: 'ㄡ',
  華: 'ㄏㄨㄚˋ',
  任: 'ㄖㄣˊ',
  樂: 'ㄩㄝˋ',
  翟: 'ㄓㄞˊ',
  繆: 'ㄇㄧㄠˋ',
  員: 'ㄩㄣˋ',
  燕: 'ㄧㄢ',
  祭: 'ㄓㄞˋ',
  沈: 'ㄕㄣˇ',
  朴: 'ㄆㄧㄠˊ',
};

/** 複姓裡讀音特殊的字（單獨當姓時不這樣讀） */
export const COMPOUND_READINGS: Record<string, string[]> = {
  尉遲: ['ㄩˋ', 'ㄔˊ'],
  万俟: ['ㄇㄛˋ', 'ㄑㄧˊ'],
};

export interface SplitName {
  surname: string;
  given: string;
  compound: boolean;
}

/** 只留漢字（含擴充區），其餘丟掉 */
export function hanOnly(input: string): string[] {
  return Array.from(input).filter((c) => /\p{Script=Han}/u.test(c));
}

/**
 * 切姓與名。規則：開頭兩字是已知複姓 → 兩字姓；否則第一字是姓。
 * 做不到的事：冠配偶姓（四字「張陳某某」）、雙姓合用、原住民族傳統名字，
 * 這些無法從字面判斷，回傳的 surnameLen 可以由呼叫端覆寫。
 */
export function splitName(chars: string[], surnameLen?: number): SplitName {
  const two = chars.slice(0, 2).join('');
  const compound =
    surnameLen === undefined &&
    chars.length >= 3 &&
    COMPOUND_SURNAMES.includes(two);
  const n = surnameLen ?? (compound ? 2 : 1);
  return {
    surname: chars.slice(0, n).join(''),
    given: chars.slice(n).join(''),
    compound: n >= 2,
  };
}

/**
 * 字音表沒收、但教育部《重編國語辭典修訂本》有獨立條目的讀音（搜尋結果頁可見），
 * 補進選單讓使用者選；不改預設值。
 */
export const EXTRA_READINGS: Record<string, string[]> = {
  覃: ['ㄑㄧㄣˊ'],
  寧: ['ㄋㄧㄥˋ'],
};

export type ReadingsDict = Record<string, string>;

/** 查字音。dict 值格式：「主讀音,其他讀音…」（注音含調）。查不到回空陣列。 */
export function lookupReadings(
  char: string,
  dict: ReadingsDict,
  asSurname = false,
): CharReading {
  const raw = dict[char];
  let readings = raw ? raw.split(',') : [];
  for (const x of EXTRA_READINGS[char] || [])
    if (readings.length && !readings.includes(x)) readings.push(x);
  let surnameOverride = false;
  if (asSurname && SURNAME_READINGS[char]) {
    const sr = SURNAME_READINGS[char];
    if (readings[0] !== sr) surnameOverride = true;
    readings = [sr, ...readings.filter((r) => r !== sr)];
  }
  return { char, readings, pick: 0, surnameOverride };
}

export interface RomanizedName {
  /** 護照格式：「姓, 名-名」 */
  passport: string;
  surname: string;
  given: string;
}

/** 把一串注音（已選定讀音）依系統組成護照格式。任何一個音節轉不出來就回 null。 */
export function formatName(
  surnameZhuyin: string[],
  givenZhuyin: string[],
  sys: System,
): RomanizedName | null {
  const conv = (z: string) => romanizeSyllable(z)?.[sys] ?? null;
  const sn = surnameZhuyin.map(conv);
  const gn = givenZhuyin.map(conv);
  if (sn.some((x) => !x) || gn.some((x) => !x)) return null;
  const surname = sn.join('');
  const given = gn.join('-');
  return { surname, given, passport: given ? `${surname}, ${given}` : surname };
}

// ── 反查：羅馬字音節 → 可能的注音（聲調不明）────────────────────────
export interface ReverseHit {
  system: System;
  zhuyin: string;
}
let _rev: Map<string, ReverseHit[]> | null = null;
/** 所有合法注音音節（無調）由呼叫端給（對照表的 zhuyin 欄） */
export function buildReverseIndex(
  allZhuyin: string[],
): Map<string, ReverseHit[]> {
  const map = new Map<string, ReverseHit[]>();
  for (const z of allZhuyin) {
    const r = romanizeSyllableAll(z);
    if (!r) continue;
    for (const sys of SYSTEMS) {
      for (const k of r[sys]) {
        const arr = map.get(k) || [];
        if (!arr.some((h) => h.system === sys && h.zhuyin === z))
          arr.push({ system: sys, zhuyin: z });
        map.set(k, arr);
      }
    }
  }
  _rev = map;
  return map;
}

/** 把「Hsiao-ming」「Tsai Ing wen」切成音節並正規化（去撇號、變音符號、轉大寫） */
export function tokenizeRoman(input: string): string[] {
  return input
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[’'`ʻ]/g, '')
    .toUpperCase()
    .split(/[^A-Z]+/)
    .filter(Boolean);
}

export function reverseLookup(token: string, index = _rev): ReverseHit[] {
  if (!index) return [];
  return index.get(token.toUpperCase()) || [];
}
