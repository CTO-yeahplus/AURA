// AURA 랜딩 — 쿠팡 파트너스 PICKS 데이터(SSOT).
// 목적: 쿠팡 파트너스 "최종 승인"용 채널 페이지(/picks)에 노출할 실제 추천 상품.
// 파트너스 ID: AF4955643
//
// ▶ 두 종류의 링크
//   productUrl  : 쿠팡 일반 상품 URL(상품 식별용·원본). 수수료 귀속 ❌
//   partnerUrl  : 쿠팡 파트너스 링크(https://link.coupang.com/a/XXXXXX). 수수료 귀속 ✅
//
// ▶ 운영(승인 전, 지금)
//   1) 쿠팡 파트너스 대시보드 → 간편 링크 생성기에 각 productUrl 을 붙여 파트너스 링크를 만든다.
//   2) 생성된 https://link.coupang.com/a/XXXXXX 를 아래 각 항목 partnerUrl 에 채운다.
//   3) partnerUrl 이 채워지면 카드 버튼이 그 링크로 연결(수수료 귀속). 비어 있으면 productUrl 로
//      폴백되지만 이 경우 수수료는 잡히지 않는다(승인 실적 미집계) — 반드시 partnerUrl 을 채울 것.
//   4) 누적 실적 15만 원 + 활동 스크린샷 → 자동 최종 승인 → API 키 → affiliate-deeplink Edge 자동화.
//
// 이미지: /public 에 업로드한 실제 상품 컷(같은 상품의 이미지·링크 1:1 매칭).

export const COUPANG_PARTNERS_ID = "AF4955643";

export type CoupangPick = {
  title: string;
  tag: string; // 카테고리 칩
  desc: string;
  image?: string; // /public 경로(없으면 그라데이션 폴백)
  gradient: string; // 이미지 로드 실패 시 폴백 배경(tailwind)
  productUrl: string; // 쿠팡 일반 상품 URL(상품 식별·폴백)
  partnerUrl?: string; // ← 쿠팡 파트너스 링크(link.coupang.com/a/...)로 채울 것
};

/** 파트너스 링크(수수료 귀속)인지. 비어 있으면 false → productUrl 폴백(귀속 안 됨). */
export function hasPartnerLink(p: CoupangPick): boolean {
  return typeof p.partnerUrl === "string" && /^https:\/\/link\.coupang\.com\/a\//.test(p.partnerUrl);
}

/** 카드 버튼이 실제로 열 링크. 파트너스 링크 우선, 없으면 일반 상품 URL. */
export function linkFor(p: CoupangPick): string {
  return hasPartnerLink(p) ? (p.partnerUrl as string) : p.productUrl;
}

export const coupangPicks: CoupangPick[] = [
  {
    title: "데일리 톤업 선크림 SPF50+",
    tag: "Beauty · 선케어",
    desc: "백탁 없이 가볍게 발리는 데일리 톤업 선크림. 여름 필수템.",
    image: "/01.png",
    gradient: "from-brand-soft to-accent",
    productUrl:
      "https://www.coupang.com/vp/products/7958430889?itemId=21998944974&vendorItemId=89046493988",
    partnerUrl: "https://link.coupang.com/a/eMyJSDOJ0m",
  },
  {
    title: "오버핏 코튼 셔츠",
    tag: "Fashion · 데일리",
    desc: "청바지·슬랙스 다 잘 어울리는 베이식 오버핏 셔츠. 사계절 데일리.",
    image: "/02.png",
    gradient: "from-accent to-brand-soft",
    productUrl:
      "https://www.coupang.com/vp/products/6718966785?itemId=15621959070&vendorItemId=82839571810",
    partnerUrl: "https://link.coupang.com/a/eMyQueeTzE",
  },
  {
    title: "글로우 쿠션 팩트",
    tag: "Beauty · 메이크업",
    desc: "밀착력 좋은 데일리 쿠션 팩트. 자연스러운 광채 마무리.",
    image: "/03.png",
    gradient: "from-brand-soft to-accent",
    productUrl:
      "https://www.coupang.com/vp/products/8814047755?itemId=25680254315&vendorItemId=92669612948",
    partnerUrl: "https://link.coupang.com/a/eMySMYnSfI",
  },
  {
    title: "캔버스 에코 숄더백",
    tag: "Fashion · 가방",
    desc: "데일리룩 포인트 가방. 가볍고 수납 넉넉한 캔버스 숄더백.",
    image: "/04.png",
    gradient: "from-accent to-brand-soft",
    productUrl:
      "https://www.coupang.com/vp/products/9394445169?itemId=27899792156&vendorItemId=94858638648",
    partnerUrl: "https://link.coupang.com/a/eMyUGy7ptc",
  },
  {
    title: "퓨어베리 수분 진정 토너 패드",
    tag: "Beauty · 스킨케어",
    desc: "자극 없이 매일 쓰는 수분·진정 토너 패드. 환절기 트러블 케어.",
    image: "/05.png",
    gradient: "from-brand-soft to-accent",
    productUrl:
      "https://www.coupang.com/vp/products/9592521081?itemId=28635574694&vendorItemId=95578481394",
    partnerUrl: "https://link.coupang.com/a/eMyXqiex52",
  },
  {
    title: "플리츠 미디 스커트",
    tag: "Fashion · 발레코어",
    desc: "봄·여름 데이트룩 1순위. 니트와도, 셔츠와도 잘 어울려요.",
    image: "/06.png",
    gradient: "from-accent to-brand-soft",
    productUrl:
      "https://www.coupang.com/vp/products/8790303486?itemId=25584266865&vendorItemId=94012102959",
    partnerUrl: "https://link.coupang.com/a/eMyZpHDZL2",
  },
];
