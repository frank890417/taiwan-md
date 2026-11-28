/**
 * article-summary-core.mjs — 一篇文章「在卡片、清單、索引裡會被看到的那幾個欄位」。
 *
 * 為什麼獨立成純 .mjs：兩個地方要用同一份定義，而且不能各寫一份（各寫一份遲早分家，
 * 分家就是漏報）：
 *   1. src/utils/articles-index.ts 的 buildIndex 用它建 ArticleSummary；
 *   2. scripts/tools/verify-build-deps.mjs 用它算「這篇文章對索引的影響有沒有變」
 *      （頁面輸入帳裡的 `檔.md#summary` 記號，見 src/utils/build-deps.ts）。
 * 只改正文、沒動這幾個欄位的修改，不會讓「別的頁上的這篇的卡片」變。
 */
import matter from 'gray-matter';

export function safeMatter(fileContent) {
  try {
    return matter(fileContent);
  } catch {
    const stripped = fileContent.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '');
    return { data: {}, content: stripped };
  }
}

/** 只接受顯式字串；其他任何值一律視為未設定。 */
export function normalizeCurationReason(value) {
  return value === 'unverified' || value === 'thin' ? value : undefined;
}
export function normalizeCuration(value) {
  return value === 'incubating' || value === 'verified' ? value : undefined;
}

/** 從原始 Markdown 取出索引會用到的欄位（尚未做 zh 來源的 curation 繼承）。 */
export function cardFields(raw) {
  const { data: fm } = safeMatter(raw);
  return {
    fm,
    title: fm.title || '',
    description: fm.description || '',
    image: fm.image || '',
    readingTime:
      typeof fm.readingTime === 'number' ? fm.readingTime : undefined,
    tags: Array.isArray(fm.tags) ? fm.tags : undefined,
    // Footnote definitions ([^n]:) — 引用深度訊號，數的是整份檔，不只 frontmatter
    footnotes: (raw.match(/^\[\^\d+\]:/gm) || []).length,
    curation: normalizeCuration(fm.curation),
    curationReason: normalizeCurationReason(fm.curationReason),
    translatedFrom:
      typeof fm.translatedFrom === 'string' ? fm.translatedFrom : undefined,
  };
}

/** 這篇文章的「卡片欄位」指紋；正文改動但這些欄位沒變時，指紋不變。 */
export function cardDigest(raw) {
  const { fm: _fm, ...fields } = cardFields(raw);
  return JSON.stringify(fields);
}
