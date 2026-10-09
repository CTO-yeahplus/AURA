import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { DisclosureNote } from "@/components/DisclosureNote";
import { ScrollProgress } from "@/components/home/ScrollProgress";
import { PicksHero, PicksStack } from "@/components/picks/PicksStory";
import { StoryCta, WordReveal } from "@/components/story/shared";
import { coupangPicks, COUPANG_PARTNERS_ID } from "@/lib/coupangPicks";

export const metadata: Metadata = {
  title: "AURA PICKS — 오늘의 따라사기",
  description:
    "AURA 에디터가 고른 이번 주 패션·뷰티 아이템. 마음에 드는 상품을 쿠팡에서 바로 만나보세요.",
};

export default function PicksPage() {
  return (
    <>
      <ScrollProgress />

      {/* 도입 — 옷장 앞의 아침, 흩어진 상품 컷 */}
      <PicksHero picks={coupangPicks} />

      <section className="bg-cream pb-10 pt-16 md:pt-24">
        <div className="wrap">
          <WordReveal
            className="max-w-4xl font-serif text-[clamp(24px,3.8vw,48px)] font-bold leading-[1.3] tracking-tight text-navy"
            accentLast={2}
            text="그래서 많이 고르지 않았어요. 이번 주에 손이 갈 것만, 한 장에 하나씩 꺼내 놓습니다."
          />

          {/* 쿠팡 파트너스 고지 배너(정책상 필수 노출) — 상품보다 먼저 보이게 둔다 */}
          <Reveal>
            <p className="mt-10 rounded-2xl border border-[#e3d9f7] bg-brand-soft px-5 py-4 text-[13px] text-navy">
              🛍️ <strong>쿠팡 파트너스 안내.</strong> 이 페이지는 쿠팡 파트너스 활동의 일환으로, 추천
              상품 구매 시 AURA가 이에 따른 일정액의 수수료를 제공받을 수 있습니다. 구매 가격은
              동일합니다.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 픽 덱 — 카드가 한 장씩 올라와 쌓인다 */}
      <section className="bg-cream pb-14">
        <div className="wrap">
          <PicksStack picks={coupangPicks} />

          <div className="mt-12">
            <DisclosureNote />
          </div>

          <p className="mt-4 text-center text-[12px] text-sub">
            AURA · 패션·뷰티 큐레이션 · 쿠팡 파트너스 ID {COUPANG_PARTNERS_ID}
          </p>
        </div>
      </section>

      <StoryCta
        title={
          <>
            마음에 든 하나를,
            <br />
            룩으로 입어 보세요.
          </>
        }
        body="AURA 앱에서는 매일 올라오는 룩 속 아이템을 바로 따라 살 수 있어요. iPhone에서 무료로 받아 보세요."
      />
    </>
  );
}
