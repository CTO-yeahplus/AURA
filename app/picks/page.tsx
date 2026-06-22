import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { SmartImg } from "@/components/SmartImg";
import { DisclosureNote } from "@/components/DisclosureNote";
import {
  coupangPicks,
  hasPartnerLink,
  linkFor,
  COUPANG_PARTNERS_ID,
  type CoupangPick,
} from "@/lib/coupangPicks";

export const metadata: Metadata = {
  title: "AURA PICKS — 오늘의 따라사기",
  description:
    "AURA 에디터가 고른 이번 주 패션·뷰티 아이템. 마음에 드는 상품을 쿠팡에서 바로 만나보세요.",
};

function PickCard({ pick, delay = 0 }: { pick: CoupangPick; delay?: number }) {
  const partnerReady = hasPartnerLink(pick);
  return (
    <Reveal delay={delay}>
      <article className="group relative overflow-hidden rounded-[18px] shadow-soft transition-shadow duration-300 hover:shadow-lift">
        <div className={`relative aspect-[3/4] w-full bg-gradient-to-br ${pick.gradient}`}>
          <SmartImg src={pick.image} alt={pick.title} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/10" />
          <span className="absolute left-3 top-3 rounded-full bg-white/85 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-ink backdrop-blur">
            {pick.tag}
          </span>
          <div className="absolute inset-x-0 bottom-0 p-4">
            <h3 className="font-serif text-[20px] leading-tight text-white drop-shadow-sm">
              {pick.title}
            </h3>
            <p className="mt-1 line-clamp-2 text-[13px] text-white/85">{pick.desc}</p>
            <div className="mt-3 flex items-center gap-2">
              <a
                href={linkFor(pick)}
                target="_blank"
                rel="nofollow sponsored noopener"
                className="inline-block rounded-full border border-white/30 bg-white/90 px-3.5 py-1.5 text-[12px] font-bold text-ink backdrop-blur-md transition hover:bg-white"
              >
                쿠팡에서 구매하기 →
              </a>
              {!partnerReady ? (
                <span
                  title="파트너스 링크 미연결 — 수수료 미집계"
                  className="rounded-full bg-amber-400/90 px-2 py-1 text-[10px] font-bold text-ink"
                >
                  제휴 링크 연결 전
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function PicksPage() {
  return (
    <>
      <section className="pt-14 pb-7">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">AURA Picks</span>
            <h1 className="mt-3 font-serif text-[clamp(30px,5.2vw,50px)] font-bold leading-tight tracking-tight text-navy">
              오늘의 따라사기 ✨
            </h1>
            <p className="mt-3.5 max-w-2xl text-[clamp(15px,2.2vw,19px)] text-sub">
              AURA 에디터가 고른 이번 주 패션·뷰티 아이템. 마음에 드는 상품은 쿠팡에서 바로 만나보세요.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-14">
        <div className="wrap">
          {/* 쿠팡 파트너스 고지 배너(정책상 필수 노출) */}
          <Reveal>
            <p className="mb-6 rounded-2xl border border-[#e3d9f7] bg-brand-soft px-5 py-4 text-[13px] text-navy">
              🛍️ <strong>쿠팡 파트너스 안내.</strong> 이 페이지는 쿠팡 파트너스 활동의 일환으로, 추천
              상품 구매 시 AURA가 이에 따른 일정액의 수수료를 제공받을 수 있습니다. 구매 가격은
              동일합니다.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
            {coupangPicks.map((pick, i) => (
              <PickCard key={pick.title} pick={pick} delay={(i % 3) * 0.06} />
            ))}
          </div>

          <div className="mt-7">
            <DisclosureNote />
          </div>

          <p className="mt-4 text-center text-[12px] text-sub">
            AURA · 패션·뷰티 큐레이션 · 쿠팡 파트너스 ID {COUPANG_PARTNERS_ID}
          </p>
        </div>
      </section>
    </>
  );
}
