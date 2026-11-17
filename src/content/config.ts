import { defineCollection } from 'astro:content';
import { ALL_LANGUAGE_CODES } from '../config/languages';
import { z } from 'astro/zod';

// Shared schema for all language collections — they have identical shape.
const articleSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  date: z.date().optional(),
  // 2026-06-07 SEO freshness: explicit "last meaningful edit" override. Set by
  // EVOLVE-PIPELINE on a substantive rewrite. When absent, dateModified falls
  // back to git last-meaningful-commit (content-dates.json) → frontmatter.date.
  modified: z.date().optional(),
  draft: z.boolean().optional(),
  category: z.string().optional(),
  author: z.string().optional(),
  readingTime: z.number().optional(),
  featured: z.boolean().optional(),
  // 2026-08-04 查證狀態分層（reports/design-curation-tier-2026-08-04.md）：
  // 'verified' = 走過 REWRITE/FACTCHECK 深度查證；'incubating' = 社群貢獻待深度查證
  // （文章頁顯示 🌱 進化中說明條）；缺省 = 一般文章，維持現狀。
  curation: z.enum(['verified', 'incubating']).optional(),
  // 2026-11-04 全站普查 §五.5：incubating 的說明條種類。'unverified' = 待查證（預設，
  // 缺欄位的舊文也當這個）；'thin' = 待擴寫（腳註與引用都在，只是內容單薄）。
  curationReason: z.enum(['unverified', 'thin']).optional(),
  // 免疫器官既有欄位（dashboard human-reviewed% 資料源）；進 schema 讓 template
  // 能讀（zod 會 strip 未宣告欄位）——🔎 徽章條件之一。歷史檔存在字串
  // 'true'/'false' 變體（~148 檔），寬容收下並統一轉 boolean。
  lastHumanReview: z
    .union([z.boolean(), z.string()])
    .optional()
    .transform((v) => v === true || v === 'true'),
});

// Generate one collection per registered language. Adding a language to
// languages.ts automatically gets a content collection here — no edits needed.
export const collections = Object.fromEntries(
  ALL_LANGUAGE_CODES.map((code) => [
    code,
    defineCollection({ type: 'content', schema: articleSchema }),
  ]),
);
