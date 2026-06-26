import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { SmartImg } from "@/components/SmartImg";
import { GUIDES } from "@/lib/guides";

export const metadata: Metadata = {
  title: "스타일 가이드 — 코디·뷰티 큐레이션",
  description:
    "AURA 에디터의 패션·뷰티 스타일 가이드. 계절별 코디법과 메이크업 루틴을 따라 하기 쉽게 정리하고, 아이템 구매처까지 연결했어요.",
};

export default function GuidesPage() {
  return (
    <>
      <section className="pt-14 pb-7">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">Guides</span>
            <h1 className="mt-3 font-serif text-[clamp(30px,5.2vw,50px)] font-bold leading-tight tracking-tight text-navy">
              스타일 가이드
            </h1>
            <p className="mt-3.5 max-w-2xl text-[clamp(15px,2.2vw,19px)] text-sub">
              계절별 코디법부터 데일리 메이크업 루틴까지. 따라 하기 쉬운 큐레이션과 아이템 구매처를
              한 곳에 모았어요.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-14">
        <div className="wrap">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {GUIDES.map((g, i) => (
              <Reveal key={g.slug} delay={(i % 2) * 0.06}>
                <Link
                  href={`/guides/${g.slug}`}
                  className="group block overflow-hidden rounded-[18px] shadow-soft transition-shadow duration-300 hover:shadow-lift"
                >
                  <div className={`relative aspect-[16/10] w-full bg-gradient-to-br ${g.heroGradient}`}>
                    <SmartImg src={g.image} alt={g.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/0" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <span className="rounded-full bg-white/85 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-ink backdrop-blur">
                        {g.category}
                      </span>
                      <h2 className="mt-2.5 font-serif text-[22px] font-bold leading-tight text-white drop-shadow-sm">
                        {g.title}
                      </h2>
                      <p className="mt-1 line-clamp-2 text-[13px] text-white/85">{g.dek}</p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
