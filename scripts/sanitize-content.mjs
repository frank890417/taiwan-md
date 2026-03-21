#!/usr/bin/env node
/**
 * sanitize-content.mjs — Build-time DOMPurify sanitization for all Markdown content
 * Runs after sync.sh to sanitize any user-contributed content against XSS
 */
import { readdir, readFile, writeFile } from 'fs/promises';
import { join, resolve } from 'path';
import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';

const window = new JSDOM('').window;
const purify = DOMPurify(window);

// Allow safe HTML subset common in Markdown rendering
const PURIFY_CONFIG = {
  ALLOWED_TAGS: [
    'h1','h2','h3','h4','h5','h6','p','a','ul','ol','li','blockquote',
    'code','pre','em','strong','del','table','thead','tbody','tr','th','td',
    'img','br','hr','sup','sub','details','summary','figure','figcaption',
    'span','div'
  ],
  ALLOWED_ATTR: [
    'href','src','alt','title','class','id','target','rel','width','height',
    'loading','decoding','style','colspan','rowspan','data-pagefind-body',
    'data-pagefind-meta','data-pagefind-ignore','aria-label','role'
  ],
  ALLOW_DATA_ATTR: false,
};

const CONTENT_DIR = resolve(process.cwd(), 'src', 'content');

async function getMarkdownFiles(dir) {
  const files = [];
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        files.push(...await getMarkdownFiles(fullPath));
      } else if (entry.name.endsWith('.md')) {
        files.push(fullPath);
      }
    }
  } catch {
    // Directory doesn't exist, skip
  }
  return files;
}

async function sanitizeFile(filePath) {
  const content = await readFile(filePath, 'utf-8');

  // Split frontmatter from body
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!fmMatch) return false; // No frontmatter, skip

  const [, frontmatter, body] = fmMatch;

  // Sanitize the markdown body — only strip dangerous HTML, preserve markdown syntax
  const sanitized = purify.sanitize(body, PURIFY_CONFIG);

  // Only write if something changed
  if (sanitized !== body) {
    await writeFile(filePath, `---\n${frontmatter}\n---\n${sanitized}`, 'utf-8');
    return true;
  }
  return false;
}

async function main() {
  console.log('🛡️  Sanitizing content with DOMPurify...');

  const files = await getMarkdownFiles(CONTENT_DIR);
  let sanitized = 0;

  for (const file of files) {
    try {
      const changed = await sanitizeFile(file);
      if (changed) {
        sanitized++;
        console.log(`  🔧 Sanitized: ${file.replace(CONTENT_DIR, '')}`);
      }
    } catch (err) {
      console.error(`  ❌ Error processing ${file}: ${err.message}`);
    }
  }

  console.log(`\n✅ Sanitization complete. ${sanitized} files modified out of ${files.length} total.`);
}

main().catch(console.error);
