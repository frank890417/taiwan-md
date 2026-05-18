#!/usr/bin/env node
/**
 * cache-county-images.mjs — Cache 22 縣市所有圖片到本地 public/article-images/geography/
 *
 * 補做 REWRITE-PIPELINE §媒體授權 §Step 1.9.2 規定的「熱連結 → 永遠 cache 本地」。
 * 22 縣市 ship 時忘了 cache，本腳本補。
 *
 * 行為：
 * 1. 讀 knowledge/Geography/{縣市}.md
 * 2. 抽出所有 https://upload.wikimedia.org/... URLs
 * 3. 下載到 public/article-images/geography/{slug}-{n}.jpg（n=0 為 hero）
 * 4. 在 markdown 內把 URL 替換成 /article-images/geography/{slug}-{n}.{ext}
 * 5. 同步更新 src/data/counties-22.json
 */
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { dirname, join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..', '..');
const CACHE_DIR = join(REPO_ROOT, 'public', 'article-images', 'geography');

const COUNTIES = [
  '基隆市', '嘉義市', '連江縣', '澎湖縣', '宜蘭縣',
  '苗栗縣', '新竹縣', '嘉義縣', '屏東縣', '花蓮縣',
  '台東縣', '彰化縣', '雲林縣', '金門縣', '南投縣',
  '新竹市', '桃園市', '台南市', '高雄市', '台北市',
  '台中市', '新北市',
];

// Slug 用 ASCII 形（避免檔名中文 URL-encode 問題）
const SLUG_MAP = {
  基隆市: 'keelung', 嘉義市: 'chiayi-city', 連江縣: 'lienchiang',
  澎湖縣: 'penghu', 宜蘭縣: 'yilan', 苗栗縣: 'miaoli',
  新竹縣: 'hsinchu-county', 嘉義縣: 'chiayi-county', 屏東縣: 'pingtung',
  花蓮縣: 'hualien', 台東縣: 'taitung', 彰化縣: 'changhua',
  雲林縣: 'yunlin', 金門縣: 'kinmen', 南投縣: 'nantou',
  新竹市: 'hsinchu-city', 桃園市: 'taoyuan', 台南市: 'tainan',
  高雄市: 'kaohsiung', 台北市: 'taipei', 台中市: 'taichung',
  新北市: 'new-taipei',
};

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Taiwan.md ImageCache/1.0';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function inferExt(url) {
  // Wikimedia thumb URL 結尾通常是 .jpg/.png/.svg
  const u = url.toLowerCase();
  if (u.includes('.svg')) return '.svg';
  if (u.includes('.png')) return '.png';
  if (u.includes('.webp')) return '.webp';
  if (u.includes('.gif')) return '.gif';
  return '.jpg';
}

async function fileExists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

// Wikimedia thumb URL → original URL fallback
// Thumb:    https://upload.wikimedia.org/wikipedia/commons/thumb/X/XY/Name.jpg/1280px-Name.jpg
// Original: https://upload.wikimedia.org/wikipedia/commons/X/XY/Name.jpg
function thumbToOriginal(url) {
  const m = url.match(/^(https:\/\/upload\.wikimedia\.org\/wikipedia\/[a-z]+)\/thumb\/([0-9a-f])\/([0-9a-f]{2})\/([^/]+)\/[^/]+$/);
  if (!m) return null;
  return `${m[1]}/${m[2]}/${m[3]}/${m[4]}`;
}

async function fetchOnce(url) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 30000);
  try {
    const resp = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      headers: { 'User-Agent': UA, Accept: 'image/*' },
      signal: ctrl.signal,
    });
    clearTimeout(timer);
    return resp;
  } catch (e) {
    clearTimeout(timer);
    throw e;
  }
}

async function downloadImage(url, localPath, attempt = 1) {
  try {
    let resp = await fetchOnce(url);
    // Thumb 404 → fallback to original
    if (resp.status === 404 && attempt === 1) {
      const orig = thumbToOriginal(url);
      if (orig) {
        console.log(`     ↻ thumb 404 → fallback original`);
        resp = await fetchOnce(orig);
      }
    }
    if (!resp.ok) {
      if ((resp.status === 429 || resp.status >= 500) && attempt < 5) {
        const backoff = 5000 * attempt;
        console.log(`     ⏸ ${resp.status} retry in ${backoff}ms (attempt ${attempt + 1})`);
        await sleep(backoff);
        return downloadImage(url, localPath, attempt + 1);
      }
      throw new Error(`HTTP ${resp.status}`);
    }
    const buf = Buffer.from(await resp.arrayBuffer());
    await writeFile(localPath, buf);
    return { ok: true, bytes: buf.length };
  } catch (e) {
    if (attempt < 4) {
      await sleep(3000);
      return downloadImage(url, localPath, attempt + 1);
    }
    return { ok: false, err: e.message };
  }
}

async function main() {
  await mkdir(CACHE_DIR, { recursive: true });
  const summary = { total: 0, ok: 0, fail: 0, skip: 0 };
  const remap = {}; // county → [{old: oldUrl, new: localPath}]

  for (const county of COUNTIES) {
    const slug = SLUG_MAP[county];
    const file = join(REPO_ROOT, 'knowledge', 'Geography', `${county}.md`);
    let content;
    try {
      content = await readFile(file, 'utf-8');
    } catch (e) {
      console.warn(`  ⚠️  ${county}: file not found`);
      continue;
    }

    // 抽 URLs。注意順序：frontmatter image: 先（變 hero / -0），然後 markdown ![](), html <img>, css bg
    const urls = [];
    const seen = new Set();
    const heroMatch = content.match(/^image:\s*(https?:\/\/[^\s\n]+)/m);
    if (heroMatch) {
      urls.push({ url: heroMatch[1].trim(), role: 'hero' });
      seen.add(heroMatch[1].trim());
    }
    const mdImgRe = /!\[[^\]]*\]\((https?:\/\/[^\s)]+)\)/g;
    let m;
    while ((m = mdImgRe.exec(content)) !== null) {
      if (!seen.has(m[1])) { urls.push({ url: m[1], role: 'inline' }); seen.add(m[1]); }
    }
    const htmlImgRe = /<img[^>]+src=["'](https?:\/\/[^"']+)["']/g;
    while ((m = htmlImgRe.exec(content)) !== null) {
      if (!seen.has(m[1])) { urls.push({ url: m[1], role: 'inline' }); seen.add(m[1]); }
    }
    const bgRe = /background-image:\s*url\(["']?(https?:\/\/[^)"']+)/g;
    while ((m = bgRe.exec(content)) !== null) {
      if (!seen.has(m[1])) { urls.push({ url: m[1], role: 'inline' }); seen.add(m[1]); }
    }

    console.log(`\n📦 ${county} (${slug}) — ${urls.length} images`);
    remap[county] = [];

    for (let i = 0; i < urls.length; i++) {
      const { url, role } = urls[i];
      const ext = inferExt(url);
      const idx = role === 'hero' ? 'hero' : String(i).padStart(2, '0');
      const fname = `${slug}-${idx}${ext}`;
      const localPath = join(CACHE_DIR, fname);
      const webPath = `/article-images/geography/${fname}`;
      summary.total++;

      if (await fileExists(localPath)) {
        console.log(`   ✓ ${fname} (skip, exists)`);
        summary.skip++;
        remap[county].push({ old: url, new: webPath });
        continue;
      }

      const r = await downloadImage(url, localPath);
      if (r.ok) {
        console.log(`   ✅ ${fname} (${(r.bytes / 1024).toFixed(0)}KB)`);
        summary.ok++;
        remap[county].push({ old: url, new: webPath });
      } else {
        console.log(`   ❌ ${fname} — ${r.err}`);
        summary.fail++;
      }
      await sleep(8000); // Wikimedia 429 兇，需 8s+ 才不被擋
    }

    // Rewrite markdown URLs → local paths
    let newContent = content;
    for (const { old: oldUrl, new: newUrl } of remap[county]) {
      newContent = newContent.split(oldUrl).join(newUrl);
    }
    if (newContent !== content) {
      await writeFile(file, newContent);
      console.log(`   📝 ${county}.md frontmatter + inline URLs rewritten`);
    }
  }

  console.log(`\n=== Summary ===`);
  console.log(`  Total: ${summary.total}`);
  console.log(`  ✅ Downloaded: ${summary.ok}`);
  console.log(`  ⏭️  Skipped (cached): ${summary.skip}`);
  console.log(`  ❌ Failed: ${summary.fail}`);

  // 寫出 remap.json 給後續 counties-22.json 更新用
  await writeFile(
    join(REPO_ROOT, 'public', 'article-images', 'geography', '_remap.json'),
    JSON.stringify(remap, null, 2),
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
