import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "소개",
  description: "AURA와 운영사 YEAHPLUS 소개. 패션·뷰티 OOTD 커뮤니티.",
};

export default function AboutPage() {
  return (
    <article className="wrap max-w-3xl py-14">
      <span className="eyebrow">About</span>
      <h1 className="mt-3 font-serif text-[clamp(28px,5vw,40px)] font-bold text-navy">AURA 소개</h1>

      <div className="mt-6 space-y-5 text-ink [&_h2]:mt-9 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-navy">
        <p>
          <strong>AURA</strong>는 10대 후반부터 20대 후반 여성을 위한 패션·뷰티 OOTD(Outfit of the Day)
          큐레이션 커뮤니티입니다. 매일 올라오는 코디와 뷰티 룩에서 영감을 얻고, 마음에 드는 아이템을
          신뢰할 수 있는 구매처에서 바로 만날 수 있도록 <strong>발견–신뢰–구매</strong>의 흐름을 하나로
          잇습니다.
        </p>
        <h2>우리가 푸는 문제</h2>
        <p>
          예쁜 코디를 봐도 "저 옷 어디 거지?"에서 멈추는 일이 많습니다. AURA는 룩과 실제 구매처를
          연결해, 영감이 행동으로 이어지도록 돕습니다. 크리에이터는 자신의 스타일을 공유하고, 그
          스타일이 만든 구매에 대해 정당하게 보상받습니다.
        </p>
        <h2>크리에이터와 함께</h2>
        <p>
          AURA는 크리에이터가 올린 룩이 발견되고, 신뢰를 얻고, 구매로 이어지면 그 가치를 크리에이터와
          나누는 양면 커뮤니티입니다. 우리는 콘텐츠의 진정성과 구매의 투명성(제휴 고지)을 가장 중요한
          원칙으로 둡니다.
        </p>
        <h2>운영사</h2>
        <p>
          AURA는 <strong>YEAHPLUS</strong>가 만들고 운영합니다.
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>서비스: <a className="text-brand-dark underline" href="https://auraootd.com">auraootd.com</a></li>
          <li>제휴·문의: <a className="text-brand-dark underline" href="mailto:hello@auraootd.com">hello@auraootd.com</a></li>
        </ul>
      </div>

      <div className="mt-9">
        <Link href="/#waitlist" className="btn">앱 출시 알림 받기</Link>
      </div>
    </article>
  );
}
