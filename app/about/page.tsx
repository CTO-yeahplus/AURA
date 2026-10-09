import type { Metadata } from "next";
import Link from "next/link";
import { AboutOpening, CreatorPhone, ThreeWords } from "@/components/about/AboutStory";
import { ScrollProgress } from "@/components/home/ScrollProgress";
import { Reveal } from "@/components/Reveal";
import { StoryCta, WordReveal } from "@/components/story/shared";
import { storyLooks } from "@/lib/looks";

export const metadata: Metadata = {
  title: "소개",
  description: "AURA와 운영사 YEAHPLUS 소개. 패션·뷰티 OOTD 커뮤니티.",
};

export default function AboutPage() {
  return (
    <>
      <ScrollProgress />

      {/* 도입 — 출근길에 눈에 들어온 옷, 화면을 채우는 질문, 그리고 답 */}
      <AboutOpening look={storyLooks.about} />

      {/* 소개 — 어절 단위로 또렷해진다 */}
      <section className="bg-cream py-24 md:py-36">
        <div className="wrap max-w-5xl">
          <span className="eyebrow">About AURA</span>
          <WordReveal
            className="mt-5 font-serif text-[clamp(22px,3.4vw,44px)] font-bold leading-[1.36] tracking-tight text-navy"
            accentLast={4}
            text="AURA는 10대 후반부터 20대 후반 여성을 위한 패션·뷰티 OOTD(Outfit of the Day) 큐레이션 커뮤니티입니다. 매일 올라오는 코디와 뷰티 룩에서 영감을 얻고, 마음에 드는 아이템을 신뢰할 수 있는 구매처에서 바로 만날 수 있도록 발견–신뢰–구매의 흐름을 하나로 잇습니다."
          />
        </div>
      </section>

      {/* 발견 · 신뢰 · 구매 */}
      <ThreeWords />

      {/* 우리가 푸는 문제 */}
      <section className="bg-cream py-20 md:py-28">
        <div className="wrap grid gap-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-16">
          <Reveal>
            <span className="eyebrow">The Problem</span>
            <h2 className="mt-2 break-keep font-serif text-[clamp(26px,3.8vw,46px)] font-bold leading-tight text-navy">
              우리가 푸는 문제
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="break-keep text-[clamp(17px,1.9vw,22px)] leading-[1.75] text-ink">
              예쁜 코디를 봐도 &ldquo;저 옷 어디 거지?&rdquo;에서 멈추는 일이 많습니다. AURA는 룩과
              실제 구매처를 연결해, 영감이 행동으로 이어지도록 돕습니다. 크리에이터는 자신의
              스타일을 공유하고, 그 스타일이 만든 구매에 대해 정당하게 보상받습니다.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 크리에이터와 함께 */}
      <section className="overflow-hidden bg-cream-muted py-20 md:py-28">
        <div className="wrap grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <CreatorPhone />
          <Reveal>
            <span className="eyebrow">With Creators</span>
            <h2 className="mt-2 break-keep font-serif text-[clamp(26px,3.8vw,46px)] font-bold leading-tight text-navy">
              크리에이터와 함께
            </h2>
            <p className="mt-5 break-keep text-[clamp(16px,1.7vw,19px)] leading-[1.75] text-ink">
              AURA는 크리에이터가 올린 룩이 발견되고, 신뢰를 얻고, 구매로 이어지면 그 가치를
              크리에이터와 나누는 양면 커뮤니티입니다.
            </p>
            <Link
              href="/creators"
              className="mt-6 inline-flex items-center gap-2 text-[15px] font-bold text-brand-dark hover:underline"
            >
              크리에이터 수익 구조 보기 →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 원칙 */}
      <section className="grain relative overflow-hidden bg-navy py-24 text-white md:py-36">
        <div className="wrap max-w-5xl">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-white/60">
            Our Principles
          </span>
          <WordReveal
            className="mt-5 font-serif text-[clamp(28px,5vw,68px)] font-bold leading-[1.2] tracking-tight"
            accentLast={2}
            offset={["start 0.85", "end 0.6"]}
            text="만든 것은 만들었다고, 받은 것은 받았다고 말합니다. 콘텐츠의 진정성, 구매의 투명성."
          />
          <p className="mt-8 max-w-2xl break-keep text-[15px] leading-relaxed text-white/75">
            우리는 콘텐츠의 진정성과 구매의 투명성(제휴 고지)을 가장 중요한 원칙으로 둡니다.
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            <Link
              href="/disclosure"
              className="rounded-full border border-white/40 px-5 py-2.5 text-[13px] font-bold transition hover:bg-white hover:text-ink"
            >
              제휴 고지
            </Link>
            <Link
              href="/community-guidelines"
              className="rounded-full border border-white/40 px-5 py-2.5 text-[13px] font-bold transition hover:bg-white hover:text-ink"
            >
              커뮤니티 가이드라인
            </Link>
          </div>
        </div>
      </section>

      {/* 운영사 */}
      <section className="bg-cream pt-20 md:pt-24">
        <div className="wrap grid gap-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-16">
          <Reveal>
            <span className="eyebrow">Who we are</span>
            <h2 className="mt-2 font-serif text-[clamp(26px,3.8vw,46px)] font-bold leading-tight text-navy">
              운영사
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-[clamp(17px,1.9vw,22px)] leading-[1.75] text-ink">
              AURA는 <strong>YEAHPLUS</strong>가 만들고 운영합니다.
            </p>
            <ul className="mt-5 divide-y divide-line border-y border-line text-[15px]">
              <li className="flex justify-between gap-4 py-3.5">
                <span className="text-sub">서비스</span>
                <a className="font-semibold text-brand-dark underline" href="https://auraootd.com">
                  auraootd.com
                </a>
              </li>
              <li className="flex justify-between gap-4 py-3.5">
                <span className="text-sub">제휴·문의</span>
                <a
                  className="font-semibold text-brand-dark underline"
                  href="mailto:contact@yeahplus.co.kr"
                >
                  contact@yeahplus.co.kr
                </a>
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      <StoryCta
        title={
          <>
            오늘 눈에 들어온 그 옷,
            <br />
            이제 물어보지 않아도 됩니다.
          </>
        }
        body="AURA는 iPhone에서 무료로 받을 수 있어요. 룩을 발견하고, 그 자리에서 바로 따라 사세요."
      />
    </>
  );
}
