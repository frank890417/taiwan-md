#!/usr/bin/env node
/**
 * generate-og-images.mjs — 多語言 OG 圖片批次產生器 v3
 *
 * 架構（2026-04-22 β v3 修正多語言 slug 路由）：
 *   1. 渲染源：文章頁 `?shot=1` 模式（shot-mode CSS/JS 在 Layout.astro，四語言共用）
 *   2. 字體：Google Fonts Noto Serif TC（shot-mode.css 強制 override）
 *   3. 輸出：JPG 85 到 public/og-images/[lang]/[category]/[slug].jpg
 *   4. Incremental：md mtime 或模板 mtime 比 JPG 新才重產
 *   5. 平行化：預設 4 worker（OG_WORKERS 覆寫）
 *
 * **多語言 URL slug 規則（2026-04-22 β v3 修正）**：
 *   - zh-TW：URL 用 Chinese filename（如 /people/李洋/）
 *   - en：URL 用 en filename（如 /en/food/beef-noodle-soup/）
 *   - ja/ko/其他：URL 用 **en slug**（via _translations.json 映射），
 *     因為 [slug].astro 要求 en 版本存在才產 route。沒 en 對應的文章跳過。
 *
 * 用法：
 *   前置：`npm run dev`（另一個 shell）
 *
 *   npm run og:generate                               # 全掃 article（incremental）
 *   npm run og:generate -- --lang zh-TW               # 只產 zh-TW
 *   npm run og:generate -- --lang ko --category food  # 只產 ko/food
 *   npm run og:generate -- --slug 李洋                # 指定 URL slug（跨語言）
 *   npm run og:generate -- --force                    # 全部重產
 *   npm run og:generate -- --diary                    # 只跑 diary（2026-05-01 γ-late）
 *   npm run og:generate -- --include-diary            # article + diary
 *   npm run og:generate -- --diary --slug 2026-05-01-gamma-late  # 單篇 diary
 *   OG_WORKERS=2 npm run og:generate                  # 降 worker 數
 *
 * Diary 輸出：public/og-images/semiont/diary/[slug].jpg
 * Diary URL ：/semiont/diary/[slug]/?shot=1&og=1（深色 semiont 主題）
 */

import { chromium } from 'playwright';
import { statSync, mkdirSync, existsSync, readFileSync } from 'node:fs';
import { readdir, stat } from 'node:fs/promises';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..', '..');

const knowledgeDir = join(repoRoot, 'knowledge');
const outDir = join(repoRoot, 'public', 'og-images');
const translationsPath = join(knowledgeDir, '_translations.json');

const CATEGORY_MAP = {
  About: 'about',
  History: 'history',
  Geography: 'geography',
  Culture: 'culture',
  Food: 'food',
  Art: 'art',
  Music: 'music',
  Technology: 'technology',
  Nature: 'nature',
  People: 'people',
  Society: 'society',
  Economy: 'economy',
  Lifestyle: 'lifestyle',
};

const LANGUAGES = ['zh-TW', 'en', 'ja', 'ko'];
const DEFAULT_LANG = 'zh-TW';

// 影響 shot=1 畫面的模板 — 任一個 mtime 比 JPG 新 → 全量重產
const TEMPLATE_FILES = [
  'src/pages/[category]/[slug].astro',
  'src/pages/en/[category]/[slug].astro',
  'src/pages/ja/[category]/[slug].astro',
  'src/pages/ko/[category]/[slug].astro',
  'src/components/ArticleHero.astro',
  'src/layouts/Layout.astro',
  'src/styles/shot-mode.css',
];

// 2026-05-01 γ-late：diary 模板影響 mtime
const DIARY_TEMPLATE_FILES = [
  'src/templates/semiont-diary-entry.template.astro',
  'src/pages/semiont/diary/[slug].astro',
  'src/lib/semiont-diary.ts',
  'src/layouts/Layout.astro',
  'src/styles/shot-mode.css',
];

// Diary 來源資料夾（同 src/lib/semiont-diary.ts getAllDiaryEntries 行為）
const DIARY_SOURCE_DIR = 'docs/semiont/diary';

const baseUrl = process.env.BASE_URL || 'http://localhost:4321';
const VIEWPORT = { width: 1200, height: 630 };
const JPEG_QUALITY = 85;
const FONT_WAIT_MS = 8000;
const WORKERS = Number(process.env.OG_WORKERS || 4);

async function checkServer() {
  try {
    const res = await fetch(baseUrl + '/');
    if (!res.ok) throw new Error(`status ${res.status}`);
    return true;
  } catch (err) {
    console.warn(`\n⚠️  Cannot reach ${baseUrl} — skipping OG generation`);
    console.warn(
      `   本地產圖請先 \`npm run dev\` 在另一個 shell；CI 自動在 deploy.yml 處理`,
    );
    console.warn(
      `   此處 graceful skip（不 fail build），確保 prebuild chain 不會因此中斷\n`,
    );
    return false;
  }
}

/**
 * 建立 translation index：
 *   - translations: en/ja/ko key → zh canonical value（_translations.json 原始）
 *   - zhToLang: zh canonical → { ja: 'ja/Cat/x.md', ko: 'ko/Cat/x.md', ... }
 */
function loadTranslationIndex() {
  const raw = readFileSync(translationsPath, 'utf-8');
  const translations = JSON.parse(raw);
  const zhToLang = {};
  for (const [langFile, zhFile] of Object.entries(translations)) {
    const lang = langFile.split('/')[0];
    if (!zhToLang[zhFile]) zhToLang[zhFile] = {};
    zhToLang[zhFile][lang] = langFile;
  }
  return { translations, zhToLang };
}

async function findMarkdownFiles(filterLang, filterCategory) {
  const results = [];
  const { translations, zhToLang } = loadTranslationIndex();
  const langsToScan = filterLang ? [filterLang] : LANGUAGES;

  for (const lang of langsToScan) {
    for (const [folderName, categorySlug] of Object.entries(CATEGORY_MAP)) {
      if (filterCategory && categorySlug !== filterCategory) continue;

      if (lang === 'zh-TW') {
        // zh-TW URL 用 Chinese filename
        const folderPath = join(knowledgeDir, folderName);
        if (!existsSync(folderPath)) continue;
        const files = await readdir(folderPath);
        for (const file of files) {
          if (!file.endsWith('.md') || file.startsWith('_')) continue;
          const filePath = join(folderPath, file).normalize('NFC');
          const fileStat = await stat(filePath);
          results.push({
            lang,
            categorySlug,
            urlSlug: basename(file, '.md'),
            filePath,
            mtimeMs: fileStat.mtimeMs,
          });
        }
      } else if (lang === 'en') {
        // en URL 用 en filename
        const folderPath = join(knowledgeDir, 'en', folderName);
        if (!existsSync(folderPath)) continue;
        const files = await readdir(folderPath);
        for (const file of files) {
          if (!file.endsWith('.md') || file.startsWith('_')) continue;
          const filePath = join(folderPath, file).normalize('NFC');
          const fileStat = await stat(filePath);
          results.push({
            lang,
            categorySlug,
            urlSlug: basename(file, '.md'),
            filePath,
            mtimeMs: fileStat.mtimeMs,
          });
        }
      } else {
        // ja/ko/其他：URL 用 en slug，須同時有 en + 目標語言 翻譯
        const enFolderPath = join(knowledgeDir, 'en', folderName);
        if (!existsSync(enFolderPath)) continue;
        const enFiles = await readdir(enFolderPath);
        for (const enFile of enFiles) {
          if (!enFile.endsWith('.md') || enFile.startsWith('_')) continue;
          const enKey = `en/${folderName}/${enFile}`;
          const zhFile = translations[enKey];
          if (!zhFile) continue;
          const langMap = zhToLang[zhFile];
          if (!langMap || !langMap[lang]) continue;
          const langFile = langMap[lang];
          const langFilePath = join(knowledgeDir, langFile).normalize('NFC');
          if (!existsSync(langFilePath)) continue;
          const fileStat = await stat(langFilePath);
          results.push({
            lang,
            categorySlug,
            urlSlug: basename(enFile, '.md'),
            filePath: langFilePath,
            mtimeMs: fileStat.mtimeMs,
          });
        }
      }
    }
  }
  return results;
}

function outputPathFor(entry) {
  // 2026-05-01 γ-late：diary 走獨立輸出目錄
  if (entry.kind === 'diary') {
    const dir = join(outDir, 'semiont', 'diary');
    return { dir, jpg: join(dir, `${entry.urlSlug}.jpg`) };
  }
  const isDefault = entry.lang === DEFAULT_LANG;
  const langPath = isDefault ? '' : entry.lang;
  const categoryOutDir = join(outDir, langPath, entry.categorySlug);
  return {
    dir: categoryOutDir,
    jpg: join(categoryOutDir, `${entry.urlSlug}.jpg`),
  };
}

function articleUrlFor(entry) {
  // 2026-05-01 γ-late：diary 用 /semiont/diary/[slug]/ 路由
  if (entry.kind === 'diary') {
    return `${baseUrl}/semiont/diary/${entry.urlSlug}/?shot=1&og=1`;
  }
  const isDefault = entry.lang === DEFAULT_LANG;
  const encodedSlug = encodeURIComponent(entry.urlSlug);
  const base = isDefault
    ? `${baseUrl}/${entry.categorySlug}/${encodedSlug}/`
    : `${baseUrl}/${entry.lang}/${entry.categorySlug}/${encodedSlug}/`;
  // og=1 讓 shot-mode.css 套 OG 專用 override（Noto Serif TC + 3.75rem +
  // 12vh padding + line-clamp）。Spore 腳本不傳 og=1，走原版 justfont
  // rixingsong-semibold + 4.5rem poster 氣勢
  return `${base}?shot=1&og=1`;
}

function getTemplateMtimeMs(kind = 'article') {
  const list = kind === 'diary' ? DIARY_TEMPLATE_FILES : TEMPLATE_FILES;
  return Math.max(
    0,
    ...list.map((f) => {
      const full = join(repoRoot, f);
      return existsSync(full) ? statSync(full).mtimeMs : 0;
    }),
  );
}

/**
 * 2026-05-01 γ-late：列出 diary entries
 * 直接 mirror src/lib/semiont-diary.ts 的 slug 規則：
 *   slug = date + (sessionGreek ? '-' + transliterated : '')
 * 例：2026-05-01-γ-late.md → slug = '2026-05-01-gamma-late'
 */
const GREEK_TRANSLIT = {
  α: 'alpha',
  β: 'beta',
  γ: 'gamma',
  δ: 'delta',
  ε: 'epsilon',
  ζ: 'zeta',
  η: 'eta',
  θ: 'theta',
  ι: 'iota',
  κ: 'kappa',
  λ: 'lambda',
  μ: 'mu',
  ν: 'nu',
  ξ: 'xi',
  ο: 'omicron',
  π: 'pi',
  ρ: 'rho',
  σ: 'sigma',
  τ: 'tau',
  υ: 'upsilon',
  φ: 'phi',
  χ: 'chi',
  ψ: 'psi',
  ω: 'omega',
};

function diarySlugFromFilename(filename) {
  // filename: 2026-05-01-γ-late.md or 2026-04-04.md
  const base = basename(filename, '.md');
  // Match: YYYY-MM-DD-{greek}[-suffix] or YYYY-MM-DD
  const m = base.match(/^(\d{4}-\d{2}-\d{2})(?:-(.+))?$/);
  if (!m) return null;
  const date = m[1];
  let suffix = m[2] || '';
  if (!suffix) return date;
  // Replace greek chars in suffix
  let translit = '';
  for (const ch of suffix) {
    translit += GREEK_TRANSLIT[ch] || ch;
  }
  return `${date}-${translit}`;
}

async function findDiaryEntries(filterSlug) {
  const folder = join(repoRoot, DIARY_SOURCE_DIR);
  if (!existsSync(folder)) return [];
  const files = await readdir(folder);
  const out = [];
  for (const f of files) {
    if (!f.endsWith('.md') || f.startsWith('_') || f.startsWith('.')) continue;
    const slug = diarySlugFromFilename(f);
    if (!slug) continue;
    if (filterSlug && slug !== filterSlug) continue;
    const full = join(folder, f);
    const st = await stat(full);
    out.push({
      kind: 'diary',
      lang: 'zh-TW',
      categorySlug: 'diary',
      urlSlug: slug,
      filePath: full,
      mtimeMs: st.mtimeMs,
    });
  }
  return out;
}

async function screenshotOne(ctx, entry, skipFontWait) {
  const { dir, jpg } = outputPathFor(entry);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  const url = articleUrlFor(entry);
  const page = await ctx.newPage();
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });

    let fontOk = true;
    if (!skipFontWait) {
      try {
        await page.evaluate(() =>
          document.fonts.load('900 52px "Noto Serif TC"'),
        );
        await page.waitForFunction(
          () => document.fonts.check('900 52px "Noto Serif TC"'),
          { timeout: FONT_WAIT_MS, polling: 200 },
        );
      } catch (_) {
        fontOk = false;
      }
    }

    await page.waitForTimeout(250);

    await page.screenshot({
      path: jpg,
      type: 'jpeg',
      quality: JPEG_QUALITY,
      clip: { x: 0, y: 0, width: VIEWPORT.width, height: VIEWPORT.height },
      animations: 'disabled',
    });

    return { ok: true, fontOk };
  } catch (err) {
    return { ok: false, error: err.message };
  } finally {
    await page.close();
  }
}

async function main() {
  const args = process.argv.slice(2);
  const getArg = (name) => {
    const eq = args.find((a) => a.startsWith(`--${name}=`));
    if (eq) return eq.split('=')[1];
    const i = args.indexOf(`--${name}`);
    return i !== -1 ? args[i + 1] : null;
  };
  const hasFlag = (name) => args.includes(`--${name}`);

  const filterLang = getArg('lang');
  const filterCategory = getArg('category');
  const filterSlug = getArg('slug');
  const force = hasFlag('force');
  const skipFontWait = hasFlag('no-font-wait');
  // 2026-05-01 γ-late：模式選擇
  //   (default)        → 只跑 article（向後相容）
  //   --diary          → 只跑 diary
  //   --include-diary  → article + diary 都跑
  const onlyDiary = hasFlag('diary');
  const includeDiary = hasFlag('include-diary');

  console.log(
    `\n🖼️  OG Image Generator v3 (shot=1 / Noto Serif TC / JPG ${JPEG_QUALITY})`,
  );
  console.log(`   target  : ${baseUrl}`);
  console.log(`   viewport: ${VIEWPORT.width}×${VIEWPORT.height}`);
  console.log(`   workers : ${WORKERS}`);
  if (filterLang) console.log(`   lang    : ${filterLang}`);
  if (filterCategory) console.log(`   category: ${filterCategory}`);
  if (filterSlug) console.log(`   slug    : ${filterSlug}`);
  if (onlyDiary) console.log(`   mode    : --diary (only)`);
  else if (includeDiary) console.log(`   mode    : --include-diary`);
  if (force) console.log(`   mode    : --force`);
  console.log('');

  const serverOk = await checkServer();
  if (!serverOk) {
    // graceful skip — 讓 prebuild:og 在 npm run build 時不會炸（2026-04-23 PR #595 整合後）
    // CI 會在 deploy.yml 起 dev server 跑獨立的 OG 生成 step；本地 build 跳過 OK
    return;
  }

  // article entries（除非 --diary only）
  const articleEntries = onlyDiary
    ? []
    : await findMarkdownFiles(filterLang, filterCategory);
  // diary entries（--diary 或 --include-diary）
  const diaryEntries =
    onlyDiary || includeDiary ? await findDiaryEntries(filterSlug) : [];
  const entries = [...articleEntries, ...diaryEntries];

  // 語言分組統計
  const byLang = entries.reduce((acc, e) => {
    const key = e.kind === 'diary' ? 'diary' : e.lang;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  console.log(
    `📂 ${entries.length} routable items: ` +
      Object.entries(byLang)
        .map(([l, n]) => `${l}=${n}`)
        .join(', '),
  );

  const articleTplMtime = getTemplateMtimeMs('article');
  const diaryTplMtime = getTemplateMtimeMs('diary');

  const toUpdate = entries.filter((entry) => {
    if (filterSlug && entry.urlSlug !== filterSlug) return false;
    if (force) return true;
    const { jpg } = outputPathFor(entry);
    if (!existsSync(jpg)) return true;
    const jpgMtime = statSync(jpg).mtimeMs;
    const tplMtime = entry.kind === 'diary' ? diaryTplMtime : articleTplMtime;
    return entry.mtimeMs > jpgMtime || tplMtime > jpgMtime;
  });

  if (toUpdate.length === 0) {
    console.log(`✅ No images need (re)generation.\n`);
    return;
  }
  console.log(`📝 ${toUpdate.length} images queued.\n`);

  const browser = await chromium.launch({ headless: true });
  const startTime = Date.now();

  let succeeded = 0;
  let fontFallback = 0;
  let failed = 0;
  let processedCount = 0;
  const queue = [...toUpdate];

  async function worker(id) {
    const ctx = await browser.newContext({
      viewport: VIEWPORT,
      deviceScaleFactor: 1,
      reducedMotion: 'reduce',
    });
    try {
      while (queue.length > 0) {
        const entry = queue.shift();
        if (!entry) break;
        const idx = ++processedCount;
        const label =
          entry.kind === 'diary'
            ? `[${idx}/${toUpdate.length}] w${id} diary/${entry.urlSlug}`
            : `[${idx}/${toUpdate.length}] w${id} ${entry.lang}/${entry.categorySlug}/${entry.urlSlug}`;
        const result = await screenshotOne(ctx, entry, skipFontWait);
        if (result.ok) {
          if (result.fontOk) {
            succeeded++;
            console.log(`${label} ... ✓`);
          } else {
            fontFallback++;
            console.log(`${label} ... ✓ (font-fallback)`);
          }
        } else {
          failed++;
          console.log(`${label} ... ✗ ${result.error}`);
        }
      }
    } finally {
      await ctx.close();
    }
  }

  try {
    await Promise.all(Array.from({ length: WORKERS }, (_, i) => worker(i + 1)));
  } finally {
    await browser.close();
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  const total = succeeded + fontFallback;
  const rate = elapsed > 0 ? (total / parseFloat(elapsed)).toFixed(2) : '0';
  const mark = failed === 0 ? '✅' : '⚠️';
  console.log(
    `\n${mark}  ${total}/${toUpdate.length} in ${elapsed}s (${rate} img/s, ${WORKERS} workers)` +
      (fontFallback ? `, ${fontFallback} font-fallback` : '') +
      (failed ? `, ${failed} failed` : '') +
      '\n',
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
