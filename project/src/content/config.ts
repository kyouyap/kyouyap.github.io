// project/src/content/config.ts
import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    type: z.enum(["personal", "work"]),
    role: z.enum(["lead", "member"]).optional(),
    period: z.string(),
    sortKey: z.string(), // YYYY-MM, used for ordering
    selected: z.boolean().default(false),
    href: z.string().optional(),
    description_ja: z.array(z.string()),
    description_en: z.array(z.string()),
    blurb_ja: z.string(),
    blurb_en: z.string(),
    tags: z.array(z.string()),
  }),
});

export const collections = { projects };
