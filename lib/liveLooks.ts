// AURA 랜딩 — 홈피드 라이브 룩(Supabase). 앱 홈피드와 같은 public.looks 를 읽어 auraootd.com에 노출.
// RLS: looks/products/look_products/look_tags 모두 public read. anon 키로 조회 가능(쓰기는 불가).
import type { Look } from "./looks";
import { supabase } from "./supabase";

type LiveRow = {
  id: string;
  title: string | null;
  caption: string | null;
  media_url: string | null;
  category: string | null;
  look_products: { products: { title: string | null; brand: string | null; affiliate_url: string | null } | null }[] | null;
  look_tags: { tags: { name: string } | null }[] | null;
};

/** 최신 룩 N개 → 랜딩 Look[] 매핑. 실패/미설정이면 빈 배열(호출부가 정적 폴백). */
export async function getLiveLooks(limit = 30): Promise<Look[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("looks")
    .select(
      "id, title, caption, media_url, category, look_products(products(title, brand, affiliate_url)), look_tags(tags(name))"
    )
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error || !data) return [];

  const rows = data as unknown as LiveRow[];
  return rows
    .filter((r) => typeof r.media_url === "string" && r.media_url.length > 0)
    .map((r): Look => {
      const tag = (r.look_tags ?? [])
        .map((t) => t?.tags?.name)
        .find((n): n is string => typeof n === "string" && n.length > 0);
      const shops = (r.look_products ?? [])
        .map((lp) => lp?.products)
        .filter((p): p is NonNullable<typeof p> => !!p && typeof p.affiliate_url === "string" && p.affiliate_url.length > 0)
        .slice(0, 4)
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
    });
}
