import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SmartImg } from "@/components/SmartImg";
import { DisclosureNote } from "@/components/DisclosureNote";
import { getLiveLookDetail } from "@/lib/liveLooks";
import { wrapLinkPrice } from "@/lib/linkprice";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const look = await getLiveLookDetail(params.id);
  return {
    title: look ? `${look.title} — OOTD` : "OOTD",
    description: look?.caption || "AURA 오늘의 룩과 따라사기 아이템.",
  };
}

export default async function LookDetailPage({ params }: { params: { id: string } }) {
  const look = await getLiveLookDetail(params.id);
  if (!look) notFound();

  return (
    <section className="pt-8 pb-20">
      <div className="wrap max-w-3xl">
        <Link href="/ootd" className="text-[13px] font-semibold text-sub hover:text-ink">
          ← 피드로
        </Link>

        {/* 히어로 이미지(들) */}
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {look.images.slice(0, 4).map((src, i) => (
            <div
              key={i}
              className="relative aspect-[3/4] w-full overflow-hidden rounded-[16px] bg-line"
            >
              <SmartImg src={src} alt={look.title} />
            </div>
          ))}
        </div>

        <h1 className="mt-6 font-serif text-[26px] font-bold leading-tight text-navy">
          {look.title}
        </h1>
        {look.caption ? <p className="mt-2 text-[15px] text-sub">{look.caption}</p> : null}

        {/* 따라사기 — 클릭 시 LinkPrice 래핑 아웃링크(웹 어필리에이트 수익) */}
        <h2 className="mt-9 font-serif text-[20px] font-bold text-navy">따라사기</h2>
        <div className="mt-3 space-y-3">
          {look.products.length === 0 ? (
            <p className="text-[14px] text-sub">연결된 상품이 없어요.</p>
          ) : (
            look.products.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-3 rounded-[14px] border border-line bg-white p-3"
              >
                {p.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.imageUrl}
                    alt=""
                    className="h-16 w-14 shrink-0 rounded-md object-cover"
                  />
                ) : null}
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] text-sub">{p.brand ?? ""}</p>
                  <p className="truncate font-semibold text-navy">{p.title}</p>
                  {p.price ? (
                    <p className="text-[13px] text-sub">₩{p.price.toLocaleString()}</p>
                  ) : null}
                </div>
                <a
                  href={wrapLinkPrice(p.affiliateUrl)}
                  target="_blank"
                  rel="sponsored noopener"
                  className="btn shrink-0"
                >
                  구매
                </a>
              </div>
            ))
          )}
        </div>

        <div className="mt-9">
          <DisclosureNote />
        </div>
      </div>
    </section>
  );
}
