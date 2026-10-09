import Link from "next/link";
import { DisclosureNote } from "@/components/DisclosureNote";
import { AppTour } from "@/components/home/AppTour";
import { CreatorBand } from "@/components/home/CreatorBand";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { Manifesto } from "@/components/home/Manifesto";
import { Runway } from "@/components/home/Runway";
import { ScrollProgress } from "@/components/home/ScrollProgress";
import { VelocityMarquee } from "@/components/home/VelocityMarquee";
import { APP_STORE_URL } from "@/lib/app";
import { getLiveLooks } from "@/lib/liveLooks";
import { homeLooks, heroLook } from "@/lib/looks";

// 런웨이는 앱 홈피드의 최신 룩을 그대로 보여 준다 — 10분마다 다시 읽는다.
export const revalidate = 600;

const RUNWAY_SIZE = 12;
const brands = [
  "MUSINSA", "29CM", "ZARA", "COS", "OLIVE YOUNG", "SEPHORA", "UNIQLO",
  "SSENSE", "FARFETCH", "W CONCEPT", "REVOLVE", "NET-A-PORTER",
];
const moods = [
  "#발레코어", "#Y2K", "#미니멀", "#프렌치시크", "#페미닌", "#스트릿",
  "#글로우메이크업", "#오피스룩", "#데이트룩", "#모노톤",
];

export default async function Home() {
  // 라이브 룩이 충분하면 그것을, 아니면(env 미설정·조회 실패) 정적 에디터 룩으로 폴백.
  const liveLooks = await getLiveLooks({ limit: RUNWAY_SIZE });
  const live = liveLooks.length >= 6;
  const looks = live ? liveLooks : homeLooks;

  return (
    <>
      <ScrollProgress />

      {/* HERO — 휠을 내리면 화보가 룩 카드로 접힌다 */}
      <Hero look={heroLook} />

      {/* ABOUT — 앱 목적 명시(구글 OAuth 브랜드 인증: 홈페이지에 앱 설명 필수).
          중요: 스크롤 연출(opacity·transform) 미사용 — 크롤러/리뷰어가 스크롤·JS 없이도 항상
          보이도록 정적 렌더. 히어로 바로 아래에 배치한다. */}
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
            기능(따라사기 수익)을 이용할 수 있습니다. iPhone용 앱은 App Store에서 무료로 받을 수
            있어요.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-sub">
            AURA is a fashion &amp; beauty community mobile app for young women (teens–20s). Users
            discover and share daily outfits (&ldquo;looks&rdquo;) and shop the items from linked
            retailers. Signing in with your Google or Apple account unlocks a personalized feed,
            wishlist, and creator features. The iPhone app is available for free on the App Store.
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
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener"
              className="text-brand-dark hover:underline"
            >
              App Store에서 받기 →
            </a>
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

      {/* MARQUEE — 입점 브랜드·무드 티커(휠 속도에 반응) */}
      <VelocityMarquee brands={brands} moods={moods} />

      {/* THE STORY — 어절 단위로 또렷해지는 문장 */}
      <Manifesto />

      {/* LOOKS — 세로 휠이 가로 런웨이로 */}
      <Runway looks={looks} live={live} />
      <div className="bg-cream pb-14">
        <div className="wrap">
          <DisclosureNote />
        </div>
      </div>

      {/* HOW — 앱 화면이 한 장씩 넘어가는 고정 구간 */}
      <AppTour />

      {/* CREATORS */}
      <CreatorBand />

      {/* DOWNLOAD */}
      <FinalCta />
    </>
  );
}
