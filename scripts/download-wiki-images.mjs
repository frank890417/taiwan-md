#!/usr/bin/env node
/**
 * Download missing Wikimedia Commons images via MediaWiki API.
 * Usage: node scripts/download-wiki-images.mjs
 */

import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';

const DEST_DIR = 'public/images/wiki';
const MAX_WIDTH = 1024;
const USER_AGENT =
  'taiwan-md-bot/1.0 (https://github.com/frank890417/taiwan-md; open-source project)';

// Hash filename → Wikimedia Commons File: title
const IMAGE_MAP = [
  { hash: '0b2be9fb3977.jpg', file: 'Legislative Yuan Building 20240626.jpg' },
  {
    hash: '18dae3226cf0.jpg',
    file: '7-Eleven_Minyou_Store_and_FamilyMart_Fubei_Store_20240323.jpg',
  },
  { hash: '4eea1b8cf86b.jpg', file: 'Taiwanese_Beef_Noodle_Soup.jpg' },
  { hash: '52c5be9f282c.jpg', file: 'Audrey Tang in 2015 (cropped).jpg' },
  { hash: '5574c67feb12.jpg', file: '228_Incident_h.jpg' },
  { hash: '5be514264de6.jpg', file: 'Taiwanese_beef_noodles.jpg' },
  { hash: '76b17af8726c.jpg', file: 'Taiwan Gay Pride Parade 2016 91.jpg' },
  {
    hash: '9c3e53449201.jpg',
    file: 'Taipei_Taiwan_Presidential-Office-Building-01.jpg',
  },
  { hash: 'aeba97222b07.jpg', file: 'Chiang Kai-shek memorial amk.jpg' },
  { hash: 'b2a91d2ee489.jpg', file: 'ShiLin.jpg' },
  { hash: 'b3f3be4fb2b6.jpg', file: '蔡英文官方元首肖像照.png' },
  {
    hash: 'c1deab8511ba.jpg',
    file: 'Ang Lee - 66ème Festival de Venise (Mostra).jpg',
  },
  {
    hash: 'ddb5b26935ba.jpg',
    file: 'Mayday_on_Mercuries_Life_press_conference_at_Red_House_Theater_20131125.jpg',
  },
  { hash: 'e78df09feea3.jpg', file: 'Taipei_101_2009_amk.jpg' },
  { hash: 'f04323aed8cc.jpg', file: '2021大甲媽祖遶境_02.jpg' },
  { hash: 'f80cd70cdca2.jpg', file: 'ATT 4 Fun in the rain 20120405.jpg' },
  { hash: 'fcb292021fe7.jpg', file: 'Oncorhynchus_masou_formosanus.jpg' },
];

async function getImageUrl(filename) {
  const apiUrl = new URL('https://commons.wikimedia.org/w/api.php');
  apiUrl.searchParams.set('action', 'query');
  apiUrl.searchParams.set('titles', `File:${filename}`);
  apiUrl.searchParams.set('prop', 'imageinfo');
  apiUrl.searchParams.set('iiprop', 'url');
  apiUrl.searchParams.set('iiurlwidth', String(MAX_WIDTH));
  apiUrl.searchParams.set('format', 'json');

  const res = await fetch(apiUrl, {
    headers: { 'User-Agent': USER_AGENT },
  });
  const data = await res.json();
  const pages = data.query.pages;
  const page = Object.values(pages)[0];

  if (!page.imageinfo) return null;

  // Prefer thumburl (resized), fall back to original url
  return page.imageinfo[0].thumburl || page.imageinfo[0].url;
}

async function downloadImage(url, destPath) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': USER_AGENT,
      Referer: 'https://commons.wikimedia.org/',
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  await writeFile(destPath, buffer);
  return buffer.length;
}

async function main() {
  if (!existsSync(DEST_DIR)) await mkdir(DEST_DIR, { recursive: true });

  let downloaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const { hash, file } of IMAGE_MAP) {
    const destPath = join(DEST_DIR, hash);

    if (existsSync(destPath)) {
      console.log(`SKIP: ${hash} (already exists)`);
      skipped++;
      continue;
    }

    try {
      const url = await getImageUrl(file);
      if (!url) {
        console.error(`FAIL: ${hash} — could not resolve File:${file}`);
        failed++;
        continue;
      }

      const size = await downloadImage(url, destPath);
      const kb = (size / 1024).toFixed(0);
      console.log(`OK:   ${hash} ← ${file} (${kb} KB)`);
      downloaded++;

      // Rate limit: 1 second between requests
      await new Promise((r) => setTimeout(r, 1000));
    } catch (err) {
      console.error(`FAIL: ${hash} — ${err.message}`);
      failed++;
    }
  }

  console.log(
    `\nDone: ${downloaded} downloaded, ${skipped} skipped, ${failed} failed`,
  );
}

main();
