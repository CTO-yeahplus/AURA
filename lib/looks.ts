// AURA 랜딩 — 에디토리얼 룩 데이터(SSOT). 각 룩은 아웃바운드 구매처 링크를 가진다(애그리게이터 모니터링).
export type Shop = { label: string; href: string };
export type Look = {
  title: string;
  tag: string;
  desc: string;
  gradient: string; // tailwind gradient classes
  shops: Shop[];
};

export const homeLooks: Look[] = [
  {
    title: "로맨틱 발레코어",
    tag: "Daily · 발레코어",
    desc: "크림 니트 가디건 + 플리츠 스커트. 봄 데이트룩 1순위.",
    gradient: "from-brand-soft to-accent",
    shops: [
      { label: "무신사", href: "https://www.musinsa.com" },
      { label: "29CM", href: "https://www.29cm.co.kr" },
    ],
  },
  {
    title: "물광 데일리 메이크업",
    tag: "Beauty · 글로우",
    desc: "톤업 베이스 + 코랄 블러셔로 만드는 생기 룩.",
    gradient: "from-brand to-indigo-400",
    shops: [
      { label: "올리브영", href: "https://www.oliveyoung.co.kr" },
      { label: "Sephora", href: "https://www.sephora.com" },
    ],
  },
  {
    title: "Y2K 스트릿",
    tag: "Street · Y2K",
    desc: "크롭 후디 + 카고 데님. 페스티벌 시즌 무드.",
    gradient: "from-sky-400 to-emerald-400",
    shops: [
      { label: "ZARA", href: "https://www.zara.com" },
      { label: "H&M", href: "https://www2.hm.com" },
    ],
  },
  {
    title: "미니멀 오피스룩",
    tag: "Office · 미니멀",
    desc: "셋업 블레이저 + 와이드 슬랙스로 완성한 단정한 무드.",
    gradient: "from-amber-400 to-accent",
    shops: [
      { label: "UNIQLO", href: "https://www.uniqlo.com" },
      { label: "COS", href: "https://www.cosstores.com" },
    ],
  },
  {
    title: "페미닌 원피스",
    tag: "Date · 페미닌",
    desc: "플로럴 미디 원피스에 스트랩 슈즈 한 끗.",
    gradient: "from-brand-dark to-rose-500",
    shops: [
      { label: "쿠팡", href: "https://www.coupang.com" },
      { label: "W컨셉", href: "https://www.wconcept.co.kr" },
    ],
  },
  {
    title: "시티 나이트 글램",
    tag: "Night · 글램",
    desc: "새틴 슬립 + 레더 자켓. 저녁 약속용 무드 메이커.",
    gradient: "from-navy to-brand",
    shops: [
      { label: "SSF샵", href: "https://www.ssfshop.com" },
      { label: "Farfetch", href: "https://www.farfetch.com" },
    ],
  },
];

export const fashionLooks: Look[] = [
  { title: "데님 & 화이트 티", tag: "Daily · 캐주얼", desc: "기본의 정석. 슬림 데님에 화이트 티 한 장.", gradient: "from-sky-300 to-brand", shops: [{ label: "UNIQLO", href: "https://www.uniqlo.com" }, { label: "GU", href: "https://www.gu-global.com" }] },
  { title: "오버핏 가디건 룩", tag: "Daily · 코지", desc: "오버사이즈 가디건으로 만드는 포근한 무드.", gradient: "from-amber-200 to-brand-soft", shops: [{ label: "COS", href: "https://www.cosstores.com" }, { label: "ZARA", href: "https://www.zara.com" }] },
  { title: "빈티지 워시 데님", tag: "Street · 빈티지", desc: "워싱 데님 셋업으로 완성하는 레트로 감성.", gradient: "from-indigo-300 to-accent", shops: [{ label: "Revolve", href: "https://www.revolve.com" }, { label: "Urban Outfitters", href: "https://www.urbanoutfitters.com" }] },
  { title: "K-스트릿 레이어드", tag: "Street · K-스타일", desc: "레이어드로 만드는 한국 스트릿 무드.", gradient: "from-rose-300 to-brand", shops: [{ label: "스타일난다", href: "https://www.stylenanda.com" }, { label: "YesStyle", href: "https://www.yesstyle.com" }] },
  { title: "뉴트럴 셋업", tag: "Office · 모던", desc: "뉴트럴 톤 셋업으로 완성한 모던 오피스.", gradient: "from-stone-300 to-navy", shops: [{ label: "W컨셉", href: "https://www.wconcept.co.kr" }, { label: "SSF샵", href: "https://www.ssfshop.com" }] },
  { title: "프레피 베스트 룩", tag: "Office · 프레피", desc: "니트 베스트로 더하는 프레피 무드.", gradient: "from-emerald-300 to-brand-dark", shops: [{ label: "Ralph Lauren", href: "https://www.ralphlauren.com" }, { label: "무신사", href: "https://www.musinsa.com" }] },
  { title: "파스텔 트위드", tag: "Date · 로맨틱", desc: "파스텔 트위드 셋업으로 완성하는 데이트룩.", gradient: "from-pink-200 to-brand", shops: [{ label: "29CM", href: "https://www.29cm.co.kr" }, { label: "Shopbop", href: "https://www.shopbop.com" }] },
  { title: "럭스 이브닝", tag: "Night · 글램", desc: "드레시한 실루엣으로 완성하는 이브닝 룩.", gradient: "from-navy to-rose-500", shops: [{ label: "SSENSE", href: "https://www.ssense.com" }, { label: "Mytheresa", href: "https://www.mytheresa.com" }] },
];

export const beautyLooks: Look[] = [
  { title: "MLBB 립 룩", tag: "Beauty · 립", desc: "내 입술보다 예쁜 자연스러운 MLBB 컬러.", gradient: "from-rose-300 to-accent", shops: [{ label: "Ulta", href: "https://www.ulta.com" }, { label: "Cult Beauty", href: "https://www.cultbeauty.com" }] },
  { title: "웜톤 아이 룩", tag: "Beauty · 아이", desc: "웜톤 코랄·브릭으로 완성하는 데일리 아이.", gradient: "from-amber-300 to-brand", shops: [{ label: "Lookfantastic", href: "https://www.lookfantastic.com" }, { label: "올리브영", href: "https://www.oliveyoung.com" }] },
  { title: "수분 광채 루틴", tag: "Skincare · 수분", desc: "수분 가득 광채 피부를 위한 루틴.", gradient: "from-sky-300 to-emerald-300", shops: [{ label: "YesStyle", href: "https://www.yesstyle.com" }, { label: "Stylevana", href: "https://www.stylevana.com" }] },
  { title: "시카 진정 케어", tag: "Skincare · 진정", desc: "예민한 피부를 위한 시카 진정 케어.", gradient: "from-emerald-300 to-brand-soft", shops: [{ label: "iHerb", href: "https://www.iherb.com" }, { label: "올리브영", href: "https://www.oliveyoung.co.kr" }] },
  { title: "데일리 선케어", tag: "Skincare · 선케어", desc: "매일의 자외선 차단, 가볍게.", gradient: "from-yellow-200 to-accent", shops: [{ label: "Amazon", href: "https://www.amazon.com" }, { label: "Soko Glam", href: "https://www.soko-glam.com" }] },
  { title: "화이트 플로럴 향수", tag: "Fragrance · 플로럴", desc: "은은한 화이트 플로럴 향.", gradient: "from-pink-200 to-brand", shops: [{ label: "Sephora", href: "https://www.sephora.com" }, { label: "Notino", href: "https://www.notino.com" }] },
  { title: "레이어드 바디 미스트", tag: "Body · 데일리", desc: "레이어링으로 완성하는 바디 향.", gradient: "from-violet-300 to-accent", shops: [{ label: "올리브영", href: "https://www.oliveyoung.co.kr" }, { label: "Lookfantastic", href: "https://www.lookfantastic.com" }] },
  { title: "윤기 헤어 케어", tag: "Hair · 케어", desc: "윤기 흐르는 머릿결을 위한 케어.", gradient: "from-stone-300 to-brand-dark", shops: [{ label: "Cult Beauty", href: "https://www.cultbeauty.com" }, { label: "iHerb", href: "https://www.iherb.com" }] },
];
