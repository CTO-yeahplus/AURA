import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { LookGrid } from "@/components/LookCard";
import { SmartImg } from "@/components/SmartImg";
import { DisclosureNote } from "@/components/DisclosureNote";
import { WaitlistForm } from "@/components/WaitlistForm";
import { homeLooks, heroImage, spotlightImage } from "@/lib/looks";

const shopCount = homeLooks.reduce((n, l) => n + l.shops.length, 0);
const marquee = [
  "MUSINSA", "29CM", "ZARA", "COS", "OLIVE YOUNG", "SEPHORA", "UNIQLO",
  "SSENSE", "FARFETCH", "W CONCEPT", "REVOLVE", "NET-A-PORTER",
];

export default function Home() {
  return (
    <>
      {/* HERO — 풀블리드 에디토리얼 */}
      <section className="grain relative h-[88vh] min-h-[560px] w-full overflow-hidden bg-navy">
        <div className="absolute inset-0 bg-gradient-to-br from-brand/40 to-accent/40" />
        <SmartImg src={heroImage} alt="AURA editorial" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/40" />

        <div className="relative z-10 flex h-full items-end">
          <div className="wrap pb-16">
            <Reveal>
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/80">
                ISSUE 01 — SS26 · The Edit
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-4 max-w-4xl font-serif text-[clamp(40px,8vw,92px)] font-bold leading-[0.98] tracking-tight text-white">
                오늘의 무드를<br />입는 가장 쉬운 방법.
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-lg text-[clamp(15px,2vw,18px)] text-white/85">
                10–20대를 위한 OOTD 큐레이션. 마음에 드는 룩을 발견하고, 그 자리에서 바로 따라 사세요.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-point-soft px-3 py-1.5 text-xs font-bold text-point">
                <span className="h-2 w-2 animate-pulse rounded-full bg-point" /> 출시 임박 · 웨이트리스트 선착순 혜택
              </span>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="#waitlist" className="btn">앱 출시 알림 받기</Link>
                <Link
                  href="#looks"
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white hover:text-ink"
                >
                  지금 {shopCount}개 룩 쇼핑 →
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ABOUT — 앱 목적 명시(구글 OAuth 브랜드 인증: 홈페이지에 앱 설명 필수).
          중요: Reveal(opacity 애니메이션) 미사용 — 크롤러/리뷰어가 스크롤·JS 없이도 항상
          보이도록 정적 렌더. 히어로 바로 아래(상단)에 배치해 즉시 노출한다. */}
      <section className="border-b border-line bg-white py-12">
        <div className="wrap max-w-3xl">
          <span className="eyebrow">About AURA</span>
          <h2 className="mt-2 font-serif text-[clamp(24px,3.6vw,36px)] font-bold leading-tight text-navy">
            AURA는 어떤 앱인가요?
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-ink">
            AURA는 10–20대 여성을 위한 <b>패션·뷰티 커뮤니티 모바일 앱</b>입니다. 사용자는 매일의
            코디(룩)를 발견하고 공유하며, 마음에 드는 아이템을 연결된 구매처에서 바로 따라 살 수
            있어요. Google 또는 Apple 계정으로 로그인하면 취향 맞춤 피드, 위시리스트, 크리에이터
            기능(따라사기 수익)을 이용할 수 있습니다.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-sub">
            AURA is a fashion &amp; beauty community mobile app for young women (teens–20s). Users
            discover and share daily outfits (&ldquo;looks&rdquo;) and shop the items from linked
            retailers. Signing in with your Google or Apple account unlocks a personalized feed,
            wishlist, and creator features.
          </p>

          {/* 데이터 요청 목적 투명성(구글 브랜드 인증 요건) */}
          <div className="mt-5 rounded-2xl border border-line bg-cream-muted p-5">
            <p className="text-[15px] leading-relaxed text-ink">
              <b>데이터 사용 안내</b> — Google 계정으로 로그인하면 AURA는 <b>이메일 주소</b>와 기본
              프로필 정보(<b>이름·프로필 사진</b>)만 받습니다. 이 정보는 계정 생성·로그인 및 앱 내
              프로필 표시에만 사용하며, 그 외 데이터는 요청하지 않습니다. 자세한 내용은 개인정보
              처리방침을 확인하세요.
            </p>
            <p className="mt-2 text-[14px] leading-relaxed text-sub">
              When you sign in with Google, AURA only requests your <b>email address</b> and basic
              profile info (<b>name, profile picture</b>) to create your account, sign you in, and
              show your profile. We do not request any other data. See our Privacy Policy for
              details.
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-4 text-[14px] font-semibold">
            <Link href="/about" className="text-brand-dark hover:underline">
              더 알아보기 →
            </Link>
            <Link href="/privacy" className="text-sub hover:underline">
              개인정보처리방침
            </Link>
            <Link href="/terms" className="text-sub hover:underline">
              이용약관
            </Link>
          </div>
        </div>
      </section>

      {/* MARQUEE — 입점 브랜드 티커 */}
      <div className="overflow-hidden border-y border-line bg-cream py-4">
        <div className="marquee flex w-max gap-10 whitespace-nowrap">
          {[...marquee, ...marquee].map((m, i) => (
            <span key={i} className="font-serif text-lg tracking-wide text-sub">
              {m} <span className="mx-3 text-brand">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* LOOKS */}
      <section id="looks" className="py-16">
        <div className="wrap">
          <Reveal>
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <span className="eyebrow">Editor&apos;s Picks</span>
                <h2 className="mt-2 font-serif text-[clamp(28px,4.4vw,44px)] leading-tight text-navy">
                  이번 주의 룩
                </h2>
              </div>
              <Link href="/ootd" className="hidden shrink-0 text-sm font-bold text-brand-dark hover:underline sm:block">
                전체 보기 →
              </Link>
            </div>
          </Reveal>
          <LookGrid looks={homeLooks} />
          <div className="mt-8">
            <DisclosureNote />
          </div>
        </div>
      </section>

      {/* SPOTLIGHT — 비대칭 에디토리얼 */}
      <section className="py-8">
        <div className="wrap">
          <Reveal>
            <div className="grid items-stretch gap-0 overflow-hidden rounded-[24px] border border-line bg-white shadow-soft md:grid-cols-2">
              <div className="group relative grain min-h-[340px] overflow-hidden bg-gradient-to-br from-brand to-accent">
                <SmartImg src={spotlightImage} alt="AURA spotlight" />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <span className="eyebrow">The Story</span>
                <h2 className="mt-3 font-serif text-[clamp(24px,3.4vw,38px)] leading-tight text-navy">
                  발견에서 구매까지,<br />끊김 없이.
                </h2>
                <p className="mt-4 text-sub">
                  AURA는 영감을 행동으로 잇습니다. 크리에이터의 룩을 보고, 신뢰할 수 있는 구매처로 바로
                  연결돼요. "저 옷 어디 거지?"는 이제 끝.
                </p>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  <Link href="/ootd" className="chip">OOTD 피드</Link>
                  <Link href="/guides" className="chip">스타일 가이드</Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* HOW */}
      <section className="py-16">
        <div className="wrap">
          <Reveal>
            <div className="mb-8">
              <span className="eyebrow">How AURA works</span>
              <h2 className="mt-2 font-serif text-[clamp(26px,4vw,40px)] text-navy">발견 · 신뢰 · 구매</h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { n: "01", t: "취향 발견", d: "좋아하는 스타일·무드를 고르면 피드가 내 취향으로 맞춰져요." },
              { n: "02", t: "룩 저장·팔로우", d: "마음에 드는 코디를 저장하고 크리에이터를 팔로우하세요." },
              { n: "03", t: "바로 따라 사기", d: "룩에 쓰인 아이템을 신뢰할 수 있는 구매처에서 바로 구매." },
            ].map((f, i) => (
              <Reveal key={f.n} delay={i * 0.08}>
                <div className="h-full rounded-[18px] border border-line bg-white p-7">
                  <span className="font-serif text-3xl text-brand">{f.n}</span>
                  <h3 className="mt-3 text-[17px] font-bold text-ink">{f.t}</h3>
                  <p className="mt-1.5 text-sm text-sub">{f.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WAITLIST */}
      <section id="waitlist" className="pb-16">
        <div className="wrap">
          <Reveal>
            <div className="grain relative overflow-hidden rounded-[28px] bg-gradient-to-br from-navy to-[#4c2e63] px-8 py-14 text-center">
              <h2 className="font-serif text-[clamp(26px,4.4vw,40px)] text-white">
                먼저 입어볼 사람, 여기 모여요
              </h2>
              <p className="mx-auto mt-3 mb-7 max-w-lg text-white/85">
                iOS 베타가 곧 시작돼요. 이메일을 남기면 출시 소식과 얼리 액세스 초대를 보내드릴게요.
              </p>
              <WaitlistForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
