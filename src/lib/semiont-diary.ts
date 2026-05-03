/**
 * semiont-diary.ts — Parser for Semiont diary entries
 *
 * Reads diary files from docs/semiont/diary/*.md at build time.
 * These files have NO YAML frontmatter; metadata lives in the
 * H1 line and subsequent blockquotes.
 */

import { readdir, readFile, stat } from 'node:fs/promises';
import { resolve, join, basename } from 'node:path';
import { marked } from 'marked';

// ── Types ──────────────────────────────────────────────

export interface DiaryEntry {
  /** ISO date string, e.g. "2026-04-12" */
  date: string;
  /** Greek session letter with optional suffix, e.g. "ζ+" or "α" or "" */
  sessionGreek: string;
  /** URL-safe slug, e.g. "2026-04-12-zeta-plus" */
  slug: string;
  /** Original filename, e.g. "2026-04-12-ζ2.md" */
  filename: string;
  /** Diary title extracted from H1, e.g. "我寫下的每一條規則都是我先違反過的" */
  title: string;
  /** First blockquote line, e.g. "session ζ+ 反芻" */
  sessionMeta: string;
  /** Extracted duration if present, e.g. "2 小時 21 分鐘" */
  duration?: string;
  /** Extracted trigger if present */
  trigger?: string;
  /** Raw markdown body (everything after H1 + metadata block) */
  bodyMarkdown: string;
  /** Rendered HTML */
  bodyHtml: string;
  /** Plain text excerpt (~120 chars) */
  excerpt: string;
  /** Chinese character count */
  wordCount: number;
  /** Extracted h2/h3 headings for TOC */
  headings: { level: number; text: string; id: string }[];
  /** File mtime ms (CI git-restore-mtime → commit time)，作為 named session 的 sort tie-breaker */
  mtimeMs: number;
}

// ── Greek letter handling ──────────────────────────────

const GREEK_MAP: Record<string, { latin: string; order: number }> = {
  α: { latin: 'alpha', order: 1 },
  β: { latin: 'beta', order: 2 },
  γ: { latin: 'gamma', order: 3 },
  δ: { latin: 'delta', order: 4 },
  ε: { latin: 'epsilon', order: 5 },
  ζ: { latin: 'zeta', order: 6 },
  η: { latin: 'eta', order: 7 },
  θ: { latin: 'theta', order: 8 },
  ι: { latin: 'iota', order: 9 },
  κ: { latin: 'kappa', order: 10 },
  λ: { latin: 'lambda', order: 11 },
  μ: { latin: 'mu', order: 12 },
};

function transliterateGreek(greek: string): string {
  if (!greek) return '';
  // Handle compound suffixes like "ζ+" or "ζ2"
  const base = greek.charAt(0);
  const suffix = greek.slice(1);
  const entry = GREEK_MAP[base];
  if (!entry) return greek.toLowerCase();
  const latinSuffix = suffix.replace(/\+/g, '-plus').replace(/\s/g, '');
  return entry.latin + latinSuffix;
}

function greekOrder(greek: string): number {
  if (!greek) return 0;
  const base = greek.charAt(0);
  const suffix = greek.slice(1);
  const entry = GREEK_MAP[base];
  const baseOrder = entry ? entry.order * 100 : 0;
  // "+" sorts after bare letter, numbers sort by value
  if (suffix === '+') return baseOrder + 50;
  const num = parseInt(suffix, 10);
  if (!isNaN(num)) return baseOrder + num;
  return baseOrder;
}

// ── Filename parsing ───────────────────────────────────

interface FilenameParts {
  date: string;
  sessionGreek: string;
}

function parseFilename(filename: string): FilenameParts | null {
  // Match patterns: 2026-04-12.md, 2026-04-12-ζ.md, 2026-04-12-ζ2.md, 2026-04-12-ζ+.md
  const name = basename(filename, '.md');
  const dateMatch = name.match(/^(\d{4}-\d{2}-\d{2})(?:-(.+))?$/);
  if (!dateMatch) return null;
  return {
    date: dateMatch[1],
    sessionGreek: dateMatch[2] || '',
  };
}

// ── Content parsing ────────────────────────────────────

function parseContent(raw: string): {
  title: string;
  sessionMeta: string;
  duration?: string;
  trigger?: string;
  bodyMarkdown: string;
} {
  const lines = raw.split('\n');
  let title = '';
  let sessionMeta = '';
  let duration: string | undefined;
  let trigger: string | undefined;
  let bodyStartIndex = 0;

  // Parse H1: # YYYY-MM-DD [session] — Title
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('# ')) {
      const h1Match = line.match(
        /^#\s+\d{4}-\d{2}-\d{2}\s*([^—]*?)\s*—\s*(.+)$/,
      );
      if (h1Match) {
        title = h1Match[2].trim();
      } else {
        // Fallback: use everything after "# "
        title = line.slice(2).trim();
      }
      bodyStartIndex = i + 1;
      break;
    }
  }

  // Scan blockquotes immediately after H1
  let blockquoteEnd = bodyStartIndex;
  const blockquoteLines: string[] = [];
  for (let i = bodyStartIndex; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('>')) {
      blockquoteLines.push(line.slice(1).trim());
      blockquoteEnd = i + 1;
    } else if (line.trim() === '') {
      // Allow blank lines within the blockquote block
      if (i + 1 < lines.length && lines[i + 1].startsWith('>')) {
        blockquoteEnd = i + 1;
        continue;
      }
      break;
    } else {
      break;
    }
  }

  if (blockquoteLines.length > 0) {
    sessionMeta = blockquoteLines[0];
    for (const bql of blockquoteLines) {
      // Duration: **Session 精確跨度**：... or Session span: ...
      const durMatch = bql.match(
        /(?:精確跨度|Session span)[：:]\s*(.+?)(?:\s*Asia|\s*\(|$)/i,
      );
      if (durMatch) {
        // Extract just the duration part
        const durPart = durMatch[1].match(/\*\*(.+?)\*\*/);
        duration = durPart
          ? durPart[1]
          : durMatch[1].replace(/\*\*/g, '').trim();
      }
      // Trigger
      const trigMatch = bql.match(/觸發[：:]\s*(.+)/);
      if (trigMatch) trigger = trigMatch[1].trim();
    }
  }

  // Skip the "---" separator right after blockquotes
  let realBodyStart = blockquoteEnd;
  for (let i = blockquoteEnd; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (trimmed === '' || trimmed === '---') {
      realBodyStart = i + 1;
    } else {
      realBodyStart = i;
      break;
    }
  }

  const bodyMarkdown = lines.slice(realBodyStart).join('\n');
  return { title, sessionMeta, duration, trigger, bodyMarkdown };
}

// ── Markdown rendering ─────────────────────────────────

function createRenderer(): marked.Renderer {
  const renderer = new marked.Renderer();

  renderer.heading = ({ text, depth }) => {
    const id = text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\u4e00-\u9fff-]/g, '')
      .slice(0, 60);
    return `<h${depth} id="${id}">${text}</h${depth}>\n`;
  };

  renderer.link = ({ href, title, text }) => {
    const isExternal =
      href?.startsWith('http://') || href?.startsWith('https://');
    const titleAttr = title ? ` title="${title}"` : '';
    const targetAttr = isExternal
      ? ' target="_blank" rel="noopener noreferrer"'
      : '';
    return `<a href="${href}"${titleAttr}${targetAttr}>${text}</a>`;
  };

  return renderer;
}

function extractHeadings(
  html: string,
): { level: number; text: string; id: string }[] {
  const headings: { level: number; text: string; id: string }[] = [];
  const regex = /<h([23])[^>]*(?:id="([^"]*)")?[^>]*>(.*?)<\/h\1>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const level = parseInt(match[1]);
    const existingId = match[2];
    const rawText = match[3].replace(/<[^>]+>/g, '').trim();
    const id =
      existingId ||
      rawText
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\u4e00-\u9fff-]/g, '')
        .slice(0, 60);
    if (rawText) headings.push({ id, text: rawText, level });
  }
  return headings;
}

function makeExcerpt(markdown: string, maxLen = 120): string {
  // Strip markdown formatting, take first N chars
  const plain = markdown
    .replace(/^#+\s+.*/gm, '') // headings
    .replace(/\*\*(.+?)\*\*/g, '$1') // bold
    .replace(/\*(.+?)\*/g, '$1') // italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links
    .replace(/`[^`]+`/g, '') // inline code
    .replace(/^>\s+/gm, '') // blockquotes
    .replace(/^[-*]\s+/gm, '') // list items
    .replace(/\n{2,}/g, '\n')
    .trim();

  const firstParagraph =
    plain.split('\n').find((l) => l.trim().length > 20) || plain;
  if (firstParagraph.length <= maxLen) return firstParagraph;
  return (
    firstParagraph.slice(0, maxLen).replace(/[，。、；：！？\s]+$/, '') + '⋯'
  );
}

function countWords(markdown: string): number {
  const plain = markdown
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[#*_>`\-|]/g, '')
    .replace(/\n/g, '');
  return plain.length;
}

// ── Public API ─────────────────────────────────────────

const DIARY_DIR = resolve(process.cwd(), 'docs/semiont/diary');

export async function getAllDiaryEntries(): Promise<DiaryEntry[]> {
  const renderer = createRenderer();
  const files = await readdir(DIARY_DIR);
  const mdFiles = files
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.normalize('NFC'));

  const entries: DiaryEntry[] = [];

  for (const file of mdFiles) {
    const parts = parseFilename(file);
    if (!parts) continue;

    const filePath = join(DIARY_DIR, file);
    const raw = await readFile(filePath, 'utf-8');
    const { title, sessionMeta, duration, trigger, bodyMarkdown } =
      parseContent(raw);

    if (!title) continue; // Skip files that don't parse

    const fileStat = await stat(filePath);

    const bodyHtml = marked.parse(bodyMarkdown, {
      renderer,
      breaks: true,
    }) as string;
    const headings = extractHeadings(bodyHtml);
    const excerpt = makeExcerpt(bodyMarkdown);
    const wordCount = countWords(bodyMarkdown);
    const slug =
      parts.date +
      (parts.sessionGreek ? '-' + transliterateGreek(parts.sessionGreek) : '');

    entries.push({
      date: parts.date,
      sessionGreek: parts.sessionGreek,
      slug,
      filename: file,
      title,
      sessionMeta,
      duration,
      trigger,
      bodyMarkdown,
      bodyHtml,
      excerpt,
      wordCount,
      headings,
      mtimeMs: fileStat.mtimeMs,
    });
  }

  // Sort: newest first, within same date by Greek order descending,
  // then by file mtime descending (named sessions like "musing-chaplygin"
  // 全部 fall through greekOrder=0 → 此 tie-breaker 還原 chronological commit
  // 順序。CI 用 git-restore-mtime-action 已把 mtime 還原為 commit time）
  entries.sort((a, b) => {
    const dateCmp = b.date.localeCompare(a.date);
    if (dateCmp !== 0) return dateCmp;
    const greekCmp = greekOrder(b.sessionGreek) - greekOrder(a.sessionGreek);
    if (greekCmp !== 0) return greekCmp;
    return b.mtimeMs - a.mtimeMs;
  });

  return entries;
}

export function generateSlug(date: string, sessionGreek: string): string {
  return date + (sessionGreek ? '-' + transliterateGreek(sessionGreek) : '');
}

export function estimateReadingTime(wordCount: number): number {
  // Chinese reading speed ~400-500 chars/min
  return Math.max(1, Math.ceil(wordCount / 450));
}
