import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Nội dung các môn lấy từ vault Obsidian (đồng bộ vào ../vault bằng scripts/sync-vault.sh).
const notes = defineCollection({
  loader: glob({
    pattern: ['**/*.md', '!**/_Course.md'],
    base: '../vault/10-Courses',
    generateId: ({ entry }) => entry.replace(/\.md$/, '')
  }),
  schema: z.object({
    type: z.enum(['lecture', 'case-set', 'exam', 'cheatsheet']),
    course: z.string(),
    title: z.string(),
    slug: z.string(),
    order: z.number().optional(),
    status: z.string().optional(),
    source: z.string().optional(),
    tags: z.array(z.string()).optional()
  })
});

export const collections = { notes };
