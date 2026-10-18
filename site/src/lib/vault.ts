import { getCollection, type CollectionEntry } from 'astro:content';
import type { Course } from '../data/courses';

export type Note = CollectionEntry<'notes'>;
export interface DocPage { id: string; title: string; href: string }

const CASE_ORDER = ['ca-loan-than', 'ca-luong-cuc', 'ca-tram-cam', 'ca-lo-au', 'ca-ocd', 'ca-that'];
const REVIEW_ORDER = ['cheatsheet', 'bai-thi'];
const rank = (list: string[], slug: string) => (list.includes(slug) ? list.indexOf(slug) : 99);

export async function notesOf(courseSlug: string): Promise<Note[]> {
  const all = await getCollection('notes');
  return all.filter((n) => n.data.course.replace(/^PSY-/, '') === courseSlug);
}

// Danh sách trang của một môn theo thứ tự đọc (dùng cho sidebar và Trước/Sau).
export async function courseNav(course: Course, base: string) {
  const root = `${base}/${course.slug}/`;
  const notes = await notesOf(course.slug);
  const page = (n: Note, title = n.data.title): DocPage => ({ id: n.data.slug, title, href: `${root}${n.data.slug}/` });

  const lectures = notes.filter((n) => n.data.type === 'lecture');
  const modules: DocPage[] = [];
  for (const m of course.modules ?? []) {
    const main = lectures.find((n) => n.data.slug === m.id);
    const detail = lectures.find((n) => n.data.slug === `${m.id}-chi-tiet`);
    modules.push(main ? page(main, m.title) : { id: m.id, title: m.title, href: `${root}${m.id}/` });
    if (detail) modules.push(page(detail, `${m.title} (chi tiết)`));
  }
  const cases = notes.filter((n) => n.data.type === 'case-set').sort((a, b) => rank(CASE_ORDER, a.data.slug) - rank(CASE_ORDER, b.data.slug)).map((n) => page(n));
  const quick: DocPage | undefined = course.cards || course.quiz ? { id: 'on-tap', title: 'Ôn tập nhanh', href: `${root}on-tap/` } : undefined;
  const review = [
    ...(quick ? [quick] : []),
    ...notes.filter((n) => n.data.type === 'exam' || n.data.type === 'cheatsheet').sort((a, b) => rank(REVIEW_ORDER, a.data.slug) - rank(REVIEW_ORDER, b.data.slug)).map((n) => page(n))
  ];
  const intro: DocPage = { id: '', title: 'Giới thiệu', href: root };
  return { intro, modules, cases, review, all: [intro, ...modules, ...cases, ...review] };
}
