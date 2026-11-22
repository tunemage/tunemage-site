import { getCollection } from 'astro:content';

export async function getProfile() {
  const [entry] = await getCollection('profile');
  if (!entry) throw new Error('content/site.yml が必要です。');
  return entry.data;
}

export async function getMusic() {
  const tracks = await getCollection('music');
  const slugs = new Set<string>();
  for (const { data, id } of tracks) {
    if (slugs.has(data.slug)) throw new Error(`楽曲スラッグが重複しています: ${data.slug} (${id})`);
    slugs.add(data.slug);
  }
  return tracks.sort((a, b) =>
    a.data.order - b.data.order || b.data.date.localeCompare(a.data.date) || a.data.slug.localeCompare(b.data.slug)
  );
}

export function getLive() {
  return getCollection('live');
}

export const href = (path = '') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
export const jstToday = () => new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Tokyo' }).format(new Date());
export const displayDate = (date: string) => date.replaceAll('-', '.');

export function serviceLinks(data: { suno: string; youtube: string; spotify: string; other: string; x?: string }) {
  return [
    ['Suno', data.suno], ['YouTube', data.youtube], ['Spotify', data.spotify],
    ['X', data.x], ['その他の配信先', data.other],
  ].filter(([, url]) => url);
}
