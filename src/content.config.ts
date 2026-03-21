import { defineCollection, z } from 'astro:content';

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
});

// 中文內容 collection
const zhTWCollection = defineCollection({
  type: 'content',
  schema: baseContentSchema.extend({
    originalTitle: z.string().optional(),
    alternativeNames: z.array(z.string()).optional().default([]),
  }),
});

// 英文內容 collection
const enCollection = defineCollection({
  type: 'content',
  schema: baseContentSchema.extend({
    chineseTitle: z.string().optional(),
    translationStatus: z.enum(['complete', 'partial', 'planned']).optional().default('complete'),
  }),
});

// 西班牙文內容 collection
const esCollection = defineCollection({
  type: 'content',
  schema: baseContentSchema.extend({
    chineseTitle: z.string().optional(),
    englishTitle: z.string().optional(),
    translationStatus: z.enum(['complete', 'partial', 'planned']).optional().default('complete'),
  }),
});

// 導出 collections
export const collections = {
  'zh-TW': zhTWCollection,
  'en': enCollection,
  'es': esCollection,
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

export type EsContent = z.infer<typeof baseContentSchema> & {
  chineseTitle?: string;
  englishTitle?: string;
  translationStatus?: 'complete' | 'partial' | 'planned';
};
