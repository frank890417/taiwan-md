import { defineCollection, z } from 'astro:content';
import { ALL_LANGUAGE_CODES } from '../config/languages';

// Shared schema for all language collections — they have identical shape.
const articleSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  date: z.date().optional(),
  draft: z.boolean().optional(),
  category: z.string().optional(),
  author: z.string().optional(),
  readingTime: z.number().optional(),
  featured: z.boolean().optional(),
});

// Generate one collection per registered language. Adding a language to
// languages.ts automatically gets a content collection here — no edits needed.
export const collections = Object.fromEntries(
  ALL_LANGUAGE_CODES.map((code) => [
    code,
    defineCollection({ type: 'content', schema: articleSchema }),
  ]),
);
