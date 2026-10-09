import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { SmartImg } from "@/components/SmartImg";
import { AiBadge } from "@/components/AiBadge";
import { LiveLookGrid } from "@/components/LiveLookCard";
import { isAiImage } from "@/lib/aiGenerated";
import { getLiveLooks } from "@/lib/liveLooks";
import { getMergedGuides } from "@/lib/guidesDb";

export const metadata: Metadata = {
  title: "스타일 가이드 — 홈피드 룩으로 푼 코디 공식",
  description:
    "AURA 홈피드의 룩으로 풀어 쓴 스타일 가이드. 캐주얼·스트릿·러블리·미니멀 코디 공식을 따라 하기 쉽게 정리하고, 아이템 구매처까지 연결했어요.",
};

export const dynamic = "force-dynamic";

export default async function GuidesPage() {
  const [live, guides] = await Promise.all([getLiveLooks({ limit: 12 }), getMergedGuides()]);
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
              앱 홈피드에 올라온 룩을 에디터가 골라 코디 공식으로 풀었어요. 룩마다 쓰인 아이템은
              구매처로 바로 이어집니다.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-14">
        <div className="wrap">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {guides.map((g, i) => (
              <Reveal key={g.slug} delay={(i % 2) * 0.06}>
                {/* 홈피드 화보는 세로 사진 — 사진을 자르지 않도록 세로 표지 + 옆 글 배치 */}
                <Link
                  href={`/guides/${g.slug}`}
                  className="group flex h-full overflow-hidden rounded-[18px] border border-line bg-white shadow-soft transition-shadow duration-300 hover:shadow-lift"
                >
                  <div
                    className={`relative aspect-[3/4] w-[42%] shrink-0 overflow-hidden bg-gradient-to-br ${g.heroGradient}`}
                  >
                    <SmartImg src={g.image} alt={g.title} />
                    {isAiImage(g.image) ? <AiBadge className="left-2.5 top-2.5" /> : null}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-center p-4 sm:p-6">
                    <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-dark sm:text-[11px]">
                      {[g.category, g.updated].filter(Boolean).join(" · ")}
                    </span>
                    <h2 className="mt-2 break-keep font-serif text-[clamp(17px,2vw,24px)] font-bold leading-snug text-navy">
                      {g.title}
                    </h2>
                    <p className="mt-2 line-clamp-3 break-keep text-[13px] text-sub sm:text-[14px]">
                      {g.dek}
                    </p>
                    <span className="mt-3 text-[13px] font-bold text-brand-dark sm:mt-4">
                      룩 {g.sections.length}개 보기 →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {live.length > 0 ? (
        <section className="pb-16">
          <div className="wrap">
            <Reveal>
              <h2 className="font-serif text-[24px] font-bold text-navy">오늘의 룩</h2>
              <p className="mt-2 text-[14px] text-sub">가이드와 함께 보는 실시간 OOTD. 눌러서 아이템까지.</p>
            </Reveal>
            <div className="mt-5">
              <LiveLookGrid looks={live} />
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
