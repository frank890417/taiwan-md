import { defineCollection, z } from 'astro:content';

const zhTWCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    date: z.date().optional(),
    draft: z.boolean().optional(),
    category: z.string().optional(),
    author: z.string().optional(),
    readingTime: z.number().optional(),
    featured: z.boolean().optional(),
  }),
});

const enCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    date: z.date().optional(),
    draft: z.boolean().optional(),
    category: z.string().optional(),
    author: z.string().optional(),
    readingTime: z.number().optional(),
    featured: z.boolean().optional(),
  }),
});

export const collections = {
  'zh-TW': zhTWCollection,
  en: enCollection,
};
