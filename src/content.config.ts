import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const date = z.union([z.string(), z.date()]).transform((value) =>
  typeof value === 'string' ? value : value.toISOString().slice(0, 10)
).pipe(z.iso.date());
const text = z.string().nullish().transform((value) => value ?? '');
const url = text.pipe(z.union([z.literal(''), z.url({ protocol: /^https?$/ })]));
const image = text.refine((value) => !value || (
  /^\/media\/[^\\?#]+\.(avif|gif|jpe?g|png|webp|svg)$/i.test(value) &&
  !value.split('/').some((segment) => segment === '..')
), '画像はCMSのメディアから選択してください。');
const links = { suno: url, youtube: url, spotify: url, other: url };

const profile = defineCollection({
  loader: glob({ pattern: 'site.yml', base: './content' }),
  schema: z.object({
    name: z.string().min(1), tagline: text, bio: text, hero: image, heroAlt: text,
    activities: z.array(z.string()).nullish().transform((value) => value ?? []),
    ...links, x: url,
    contact: text.pipe(z.union([z.literal(''), z.email(), z.url({ protocol: /^https?$/ })])),
    contactNote: text, sample: z.boolean().default(false),
  }),
});
const music = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/music' }),
  schema: z.object({
    title: z.string().min(1), slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    date, cover: image, coverAlt: text, summary: text, lyrics: text,
    stylePrompt: text, extraPrompt: text, showPrompts: z.boolean().default(false),
    featured: z.boolean().default(false), order: z.number().int().nullish().transform((value) => value ?? 100),
    suno: text, youtube: text, spotify: text, other: text, sample: z.boolean().default(false),
  }),
});
const live = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/live' }),
  schema: z.object({
    title: z.string().min(1), date, venue: z.string().min(1), image, imageAlt: text,
    url, sample: z.boolean().default(false),
  }),
});

export const collections = { profile, music, live };
