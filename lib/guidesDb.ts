// AURA 랜딩 — 가이드 CMS 읽기(Supabase). 관리자가 어드민에서 작성한 가이드를 발행본만 노출.
// 기존 정적 가이드(lib/guides.ts)와 병합(슬러그 중복 시 DB 우선). RLS: 발행본 public read.
import type { Guide, GuideSection, GuideItem } from "./guides";
import { GUIDES } from "./guides";
import { supabase } from "./supabase";

type RawItem = { label?: unknown; brand?: unknown; priceKrw?: unknown; href?: unknown };
type RawSection = { look?: unknown; body?: unknown; image?: unknown; items?: unknown };
type GuideRow = {
  slug: string;
  category: string | null;
  title: string;
  dek: string | null;
  intro: string | null;
  updated: string | null;
  cover_image: string | null;
  sections: unknown;
};

const HERO = "from-brand-soft to-accent";
const SECTION_GRADS = ["from-brand-soft to-accent", "from-accent to-brand-soft"];

function str(v: unknown): string {
  return typeof v === "string" ? v : "";
}
function num(v: unknown): number | undefined {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? Math.round(n) : undefined;
}

function mapItem(r: RawItem): GuideItem | null {
  const href = str(r?.href).trim();
  const label = str(r?.label).trim();
  if (!href || !label) return null;
  return { label, brand: str(r?.brand).trim(), priceKrw: num(r?.priceKrw), href };
}

function mapSection(r: RawSection, i: number): GuideSection {
  const items = Array.isArray(r?.items)
    ? (r.items as RawItem[]).map(mapItem).filter((x): x is GuideItem => !!x)
    : [];
  return {
    look: str(r?.look).trim() || `Look ${i + 1}`,
    body: str(r?.body).trim(),
    image: str(r?.image).trim() || undefined,
    gradient: SECTION_GRADS[i % SECTION_GRADS.length],
    items,
  };
}

function rowToGuide(r: GuideRow): Guide {
  const sections = Array.isArray(r.sections) ? (r.sections as RawSection[]).map(mapSection) : [];
  const category = (["Fashion", "Beauty", "Lifestyle"] as const).includes(
    (r.category ?? "") as "Fashion" | "Beauty" | "Lifestyle"
  )
    ? (r.category as Guide["category"])
    : "Fashion";
  return {
    slug: r.slug,
    category,
    title: r.title,
    dek: r.dek ?? "",
    intro: r.intro ?? "",
    updated: r.updated ?? "",
    heroGradient: HERO,
    image: r.cover_image ?? undefined,
    sections,
  };
}

const SELECT = "slug, category, title, dek, intro, updated, cover_image, sections";

/** 발행된 DB 가이드(최신순). 실패/미설정이면 빈 배열. */
export async function getPublishedDbGuides(): Promise<Guide[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("guides")
    .select(SELECT)
    .eq("published", true)
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return (data as unknown as GuideRow[]).map(rowToGuide);
}

/** DB 발행본 + 정적 가이드 병합(슬러그 중복 시 DB 우선). DB가 앞. */
export async function getMergedGuides(): Promise<Guide[]> {
  const db = await getPublishedDbGuides();
  const dbSlugs = new Set(db.map((g) => g.slug));
  const staticOnly = GUIDES.filter((g) => !dbSlugs.has(g.slug));
  return [...db, ...staticOnly];
}

/** 병합 가이드 1개 조회(슬러그). */
export async function findMergedGuide(slug: string): Promise<Guide | undefined> {
  const all = await getMergedGuides();
  return all.find((g) => g.slug === slug);
}
