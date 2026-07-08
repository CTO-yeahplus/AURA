// AURA 랜딩 — 홈피드 라이브 룩(Supabase). 앱 홈피드와 같은 public.looks 를 읽어 auraootd.com에 노출.
// RLS: looks/products/look_products/look_tags 모두 public read. anon 키로 조회 가능(쓰기 불가).
import type { Look } from "./looks";
import { supabase } from "./supabase";

// 카드 그리드용 select(가벼움).
export const LIVE_CARD_SELECT =
  "id, title, caption, media_url, category, look_products(products(title, brand, affiliate_url)), look_tags(tags(name))";

export type LiveCardRow = {
  id: string;
  title: string | null;
  caption: string | null;
  media_url: string | null;
  category: string | null;
  look_products: { products: { title: string | null; brand: string | null; affiliate_url: string | null } | null }[] | null;
  look_tags: { tags: { name: string } | null }[] | null;
};

/** 조인 행 → 랜딩 Look. 서버·클라이언트(무한로드) 공용(순수). */
export function mapCardRow(r: LiveCardRow): Look {
  const tag = (r.look_tags ?? [])
    .map((t) => t?.tags?.name)
    .find((n): n is string => typeof n === "string" && n.length > 0);
  const shops = (r.look_products ?? [])
    .map((lp) => lp?.products)
    .filter((p): p is NonNullable<typeof p> => !!p && typeof p.affiliate_url === "string" && p.affiliate_url.length > 0)
    .slice(0, 6)
    .map((p) => ({ label: p.brand || p.title || "구매처", href: p.affiliate_url as string }));
  return {
    id: r.id,
    title: r.title || r.caption || "오늘의 룩",
    tag: r.category || tag || "OOTD",
    desc: r.caption || "",
    gradient: "from-brand-soft to-accent",
    image: r.media_url || undefined,
    shops,
  };
}

/** 최신 룩 → 랜딩 Look[]. 페이지네이션(range) 지원. 실패/미설정이면 빈 배열(호출부가 정적 폴백). */
export async function getLiveLooks(opts: { limit?: number; offset?: number } = {}): Promise<Look[]> {
  if (!supabase) return [];
  const limit = Math.max(1, Math.min(opts.limit ?? 60, 200));
  const offset = Math.max(0, opts.offset ?? 0);
  const { data, error } = await supabase
    .from("looks")
    .select(LIVE_CARD_SELECT)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);
  if (error || !data) return [];
  return (data as unknown as LiveCardRow[])
    .filter((r) => typeof r.media_url === "string" && r.media_url.length > 0)
    .map(mapCardRow);
}

// ── 상세페이지용(따라사기 상품 전체) ──────────────────────────────────────────
export type LiveProduct = {
  id: string;
  title: string;
  brand: string | null;
  imageUrl: string | null;
  affiliateUrl: string;
  price: number | null;
};
export type LiveLookDetail = {
  id: string;
  title: string;
  caption: string;
  tag: string;
  images: string[]; // 히어로 포함 이미지들
  products: LiveProduct[];
};

type DetailRow = {
  id: string;
  title: string | null;
  caption: string | null;
  media_url: string | null;
  category: string | null;
  images: unknown;
  look_products: { products: { id: string; title: string | null; brand: string | null; image_url: string | null; affiliate_url: string | null; price: number | null } | null }[] | null;
  look_tags: { tags: { name: string } | null }[] | null;
};

/** 룩 1개 상세(따라사기 상품 포함). 없거나 실패면 null. */
export async function getLiveLookDetail(id: string): Promise<LiveLookDetail | null> {
  if (!supabase || !id) return null;
  const { data, error } = await supabase
    .from("looks")
    .select(
      "id, title, caption, media_url, category, images, look_products(products(id, title, brand, image_url, affiliate_url, price)), look_tags(tags(name))"
    )
    .eq("id", id)
    .single();
  if (error || !data) return null;
  const r = data as unknown as DetailRow;
  const tag = (r.look_tags ?? [])
    .map((t) => t?.tags?.name)
    .find((n): n is string => typeof n === "string" && n.length > 0);
  const carousel = Array.isArray(r.images)
    ? (r.images as unknown[]).filter((s): s is string => typeof s === "string" && s.length > 0)
    : [];
  const images = carousel.length > 0 ? carousel : r.media_url ? [r.media_url] : [];
  const products: LiveProduct[] = (r.look_products ?? [])
    .map((lp) => lp?.products)
    .filter((p): p is NonNullable<typeof p> => !!p && typeof p.affiliate_url === "string" && p.affiliate_url.length > 0)
    .map((p) => ({
      id: p.id,
      title: p.title || "상품",
      brand: p.brand,
      imageUrl: p.image_url,
      affiliateUrl: p.affiliate_url as string,
      price: typeof p.price === "number" ? p.price : null,
    }));
  return {
    id: r.id,
    title: r.title || r.caption || "오늘의 룩",
    caption: r.caption || "",
    tag: r.category || tag || "OOTD",
    images,
    products,
  };
}
