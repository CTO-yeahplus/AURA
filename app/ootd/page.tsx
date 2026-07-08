import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { LookGrid } from "@/components/LookCard";
import { DisclosureNote } from "@/components/DisclosureNote";
import { getLiveLooks } from "@/lib/liveLooks";
import { homeLooks } from "@/lib/looks";

export const metadata: Metadata = {
  title: "OOTD — 실시간 룩 피드",
  description:
    "AURA 앱 홈피드의 오늘의 룩을 auraootd.com에서 바로 만나보세요. 마음에 드는 코디의 아이템을 구매처에서 바로 확인.",
};

// 매 요청마다 최신 룩(캐시 없이). 트래픽이 늘면 revalidate로 ISR 전환 가능.
export const dynamic = "force-dynamic";

export default async function OotdPage() {
  const live = await getLiveLooks(30);
  // 라이브 룩이 있으면 그것을, 없으면(미설정·장애) 큐레이션 정적 룩으로 폴백 → 페이지는 항상 채워짐.
  const looks = live.length > 0 ? live : homeLooks;

  return (
    <>
      <section className="pt-14 pb-7">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">OOTD · Live</span>
            <h1 className="mt-3 font-serif text-[clamp(30px,5.2vw,50px)] font-bold leading-tight tracking-tight text-navy">
              오늘의 룩, 실시간 피드
            </h1>
            <p className="mt-3.5 max-w-2xl text-[clamp(15px,2.2vw,19px)] text-sub">
              AURA 앱에 올라온 최신 코디를 웹에서 바로 둘러보고, 마음에 드는 아이템을 구매처에서 만나보세요.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-16">
        <div className="wrap">
          <LookGrid looks={looks} />
          <div className="mt-8">
            <DisclosureNote />
          </div>
        </div>
      </section>
    </>
  );
}
