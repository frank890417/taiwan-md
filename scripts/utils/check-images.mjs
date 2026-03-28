#!/usr/bin/env node
/**
 * Image Health Check for Taiwan.md
 *
 * Scans markdown and Astro files for image references,
 * verifies they exist in public/, and reports missing ones.
 *
 * Usage:
 *   node scripts/check-images.mjs          # human-readable output
 *   node scripts/check-images.mjs --json   # JSON output for CI
 *
 * Exit codes:
 *   0 = all images present
 *   1 = missing images found
 */

import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, relative } from 'path';

const ROOT = new URL('..', import.meta.url).pathname;
const PUBLIC = join(ROOT, 'public');
const jsonMode = process.argv.includes('--json');

// Recursively find files matching extensions
function findFiles(dir, extensions) {
  const results = [];
  if (!existsSync(dir)) return results;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findFiles(full, extensions));
    } else if (extensions.some((ext) => entry.name.endsWith(ext))) {
      results.push(full);
    }
  }
  return results;
}

// Extract image references from a markdown file
function extractFromMarkdown(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const refs = [];

  for (let i = 0; i < lines.length; i++) {
    const imgMatch = lines[i].match(/!\[([^\]]*)\]\(\/images\/([^)]+)\)/);
    if (!imgMatch) continue;

    const alt = imgMatch[1];
    const path = `/images/${imgMatch[2]}`;

    // Look for attribution in the next 2 lines
    let attribution = null;
    for (let j = i + 1; j <= i + 2 && j < lines.length; j++) {
      const attrMatch = lines[j].match(/File:([^)\]]+)/);
      if (attrMatch) {
        attribution = `File:${attrMatch[1]}`;
        break;
      }
    }

    refs.push({
      path,
      alt,
      source: `${relative(ROOT, filePath)}:${i + 1}`,
      attribution,
    });
  }
  return refs;
}

// Extract image references from an Astro file
function extractFromAstro(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const refs = [];

  // Match: cover: '/images/...', src="/images/..."
  const regex = /(?:cover|src)[:=]\s*['"](\/(images\/[^'"]+))['"]/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const path = match[1];
    const lineNum = content.substring(0, match.index).split('\n').length;
    refs.push({
      path,
      alt: '',
      source: `${relative(ROOT, filePath)}:${lineNum}`,
      attribution: null,
    });
  }
  return refs;
}

// Main
const allRefs = [];

// Scan knowledge/**/*.md
for (const f of findFiles(join(ROOT, 'knowledge'), ['.md'])) {
  allRefs.push(...extractFromMarkdown(f));
}

// Scan src/components/**/*.astro
for (const f of findFiles(join(ROOT, 'src', 'components'), ['.astro'])) {
  allRefs.push(...extractFromAstro(f));
}

// Deduplicate by path (keep first occurrence for reporting)
const seen = new Map();
for (const ref of allRefs) {
  if (!seen.has(ref.path)) {
    seen.set(ref.path, ref);
  }
}
const unique = [...seen.values()];

// Check existence
const results = unique.map((ref) => ({
  ...ref,
  exists: existsSync(join(PUBLIC, ref.path)),
}));

const ok = results.filter((r) => r.exists);
const missing = results.filter((r) => !r.exists);

// Output
if (jsonMode) {
  const output = {
    total: results.length,
    ok: ok.length,
    missing: missing.length,
    images: missing.map((r) => ({
      path: r.path,
      alt: r.alt,
      usedIn: r.source,
      attribution: r.attribution || null,
    })),
  };
  console.log(JSON.stringify(output, null, 2));
} else {
  console.log('Image Health Check — taiwan-md');
  console.log('================================');
  console.log(
    `Scanned: ${allRefs.length} references (${results.length} unique)`,
  );
  console.log(`✅ ${ok.length} OK`);
  console.log(`❌ ${missing.length} missing`);

  if (missing.length > 0) {
    console.log('');
    for (const r of missing) {
      console.log(`  ${r.path}`);
      if (r.alt) console.log(`    alt: ${r.alt}`);
      console.log(`    used in: ${r.source}`);
      if (r.attribution) {
        console.log(`    attribution: ${r.attribution} ← can download via API`);
      } else {
        console.log(`    attribution: (none found) ← needs manual sourcing`);
      }
      console.log('');
    }
  } else {
    console.log('\nAll images present!');
  }
}

process.exit(missing.length > 0 ? 1 : 0);
