import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

// 定義通用的 content collection schema
const baseContentSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  author: z.string().optional().default('Taiwan.md Contributors'),
  difficulty: z
    .enum(['beginner', 'intermediate', 'advanced'])
    .optional()
    .default('beginner'),
  readingTime: z.number().optional().default(5),
  featured: z.boolean().optional().default(false),
  status: z
    .enum(['draft', 'published', 'archived'])
    .optional()
    .default('published'),
  lastUpdated: z.coerce.date().optional(),
  relatedTopics: z.array(z.string()).optional().default([]),
  sources: z.array(z.string()).optional().default([]),
  subcategory: z.string().optional().default(''),
});

// 中文內容 collection
const zhTWCollection = defineCollection({
  type: 'content',
  schema: baseContentSchema.extend({
    // 中文特有欄位
    originalTitle: z.string().optional(), // 原始中文標題
    alternativeNames: z.array(z.string()).optional().default([]), // 別名
  }),
});

// 英文內容 collection
const enCollection = defineCollection({
  type: 'content',
  schema: baseContentSchema.extend({
    // 英文特有欄位
    chineseTitle: z.string().optional(), // 對應中文標題
    translationStatus: z
      .enum(['complete', 'partial', 'planned'])
      .optional()
      .default('complete'),
  }),
});

// 導出 collections
export const collections = {
  'zh-TW': zhTWCollection,
  en: enCollection,
};

// Type exports for TypeScript support
export type ZhTWContent = z.infer<typeof baseContentSchema> & {
  originalTitle?: string;
  alternativeNames?: string[];
};

export type EnContent = z.infer<typeof baseContentSchema> & {
  chineseTitle?: string;
  translationStatus?: 'complete' | 'partial' | 'planned';
};
