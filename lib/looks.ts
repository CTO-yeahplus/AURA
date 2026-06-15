// AURA 랜딩 — 에디토리얼 룩 데이터(SSOT). 각 룩은 아웃바운드 구매처 링크를 가진다(애그리게이터 모니터링).
export type Shop = { label: string; href: string };
export type Look = {
  title: string;
  tag: string;
  desc: string;
  gradient: string; // tailwind gradient classes (이미지 로드 실패 시 폴백 배경)
  shops: Shop[];
  image?: string; // 에디토리얼 사진(아래 attachImages로 자동 주입)
};

// 검증된 Unsplash 에디토리얼 사진 풀(패션·뷰티·라이프스타일). 실제 닿는 ID만 큐레이션.
// 자체 화보로 교체 전까지의 플레이스홀더. 로드 실패 시 SmartImg가 그라데이션으로 폴백.
const PHOTO_POOL: readonly string[] = [
  "1483985988355-763728e1935b",
  "1469334031218-e382a71b716b",
  "1487222477894-8943e31ef7b2",
  "1496747611176-843222e1e57c",
  "1539109136881-3be0616acf4b",
  "1492707892479-7bc8d5a4ee93",
  "1485462537746-965f33f7f6a7",
  "1483118714900-540cf339fd46",
  "1485968579580-b6d095142e6e",
  "1509631179647-0177331693ae",
  "1496217590455-aa63a8350eea",
  "1457972729786-0411a3b2b626",
  "1522335789203-aabd1fc54bc9",
  "1503236823255-94609f598e71",
  "1512496015851-a90fb38ba796",
  "1584917865442-de89df76afd3",
];

function photo(id: string): string {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=70`;
}

/** 룩 배열에 사진을 순환 주입(카테고리별 offset으로 시퀀스 차별화). */
function attachImages(looks: Look[], offset: number): Look[] {
  return looks.map((l, i) => ({
    ...l,
    image: photo(PHOTO_POOL[(offset + i) % PHOTO_POOL.length]),
  }));
}

/** 히어로/스포트라이트용 대표 컷. */
export const heroImage = photo("1483985988355-763728e1935b");
export const spotlightImage = photo("1469334031218-e382a71b716b");

const homeLooksRaw: Look[] = [
  {
    title: "로맨틱 발레코어",
    tag: "Daily · 발레코어",
    desc: "크림 니트 가디건 + 플리츠 스커트. 봄 데이트룩 1순위.",
    gradient: "from-brand-soft to-accent",
    shops: [
      { label: "무신사", href: "https://www.musinsa.com" },
      { label: "29CM", href: "https://www.29cm.co.kr" },
      { label: "Shopbop", href: "https://www.shopbop.com" },
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
      { label: "Lookfantastic", href: "https://www.lookfantastic.com" },
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
      { label: "ASOS", href: "https://www.asos.com" },
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
      { label: "Nordstrom", href: "https://www.nordstrom.com" },
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
      { label: "Revolve", href: "https://www.revolve.com" },
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
      { label: "Net-a-Porter", href: "https://www.net-a-porter.com" },
    ],
  },
  {
    title: "코튼 캐주얼 데이",
    tag: "Daily · 캐주얼",
    desc: "린넨 셔츠 + 와이드 숏츠. 주말 나들이 정답 코디.",
    gradient: "from-lime-200 to-sky-300",
    shops: [
      { label: "GU", href: "https://www.gu-global.com" },
      { label: "무신사", href: "https://www.musinsa.com" },
      { label: "Urban Outfitters", href: "https://www.urbanoutfitters.com" },
    ],
  },
  {
    title: "모노톤 스트릿 엣지",
    tag: "Street · 모노톤",
    desc: "블랙 온 블랙 레이어드로 만드는 시크한 스트릿.",
    gradient: "from-slate-400 to-navy",
    shops: [
      { label: "스타일난다", href: "https://www.stylenanda.com" },
      { label: "YesStyle", href: "https://www.yesstyle.com" },
      { label: "SSENSE", href: "https://www.ssense.com" },
    ],
  },
  {
    title: "프렌치 시크 카페룩",
    tag: "Daily · 프렌치",
    desc: "스트라이프 마린 탑 + 버뮤다 팬츠. 봄 파리지앵 무드.",
    gradient: "from-blue-200 to-rose-200",
    shops: [
      { label: "Sézane", href: "https://www.sezane.com" },
      { label: "& Other Stories", href: "https://www.stories.com" },
      { label: "29CM", href: "https://www.29cm.co.kr" },
    ],
  },
  {
    title: "글로시 스킨 + 립 콤보",
    tag: "Beauty · 올인원",
    desc: "글로시 스킨 + 딥 레드 립으로 완성하는 파워풀 뷰티.",
    gradient: "from-red-300 to-brand-dark",
    shops: [
      { label: "Ulta", href: "https://www.ulta.com" },
      { label: "Cult Beauty", href: "https://www.cultbeauty.com" },
      { label: "Sephora", href: "https://www.sephora.com" },
    ],
  },
];

const fashionLooksRaw: Look[] = [
  { title: "데님 & 화이트 티", tag: "Daily · 캐주얼", desc: "기본의 정석. 슬림 데님에 화이트 티 한 장.", gradient: "from-sky-300 to-brand", shops: [{ label: "UNIQLO", href: "https://www.uniqlo.com" }, { label: "GU", href: "https://www.gu-global.com" }, { label: "ASOS", href: "https://www.asos.com" }] },
  { title: "오버핏 가디건 룩", tag: "Daily · 코지", desc: "오버사이즈 가디건으로 만드는 포근한 무드.", gradient: "from-amber-200 to-brand-soft", shops: [{ label: "COS", href: "https://www.cosstores.com" }, { label: "ZARA", href: "https://www.zara.com" }, { label: "Mango", href: "https://shop.mango.com" }] },
  { title: "린넨 서머룩", tag: "Daily · 리조트", desc: "크림 린넨 셋업으로 완성하는 여름 리조트 무드.", gradient: "from-yellow-100 to-lime-200", shops: [{ label: "& Other Stories", href: "https://www.stories.com" }, { label: "W컨셉", href: "https://www.wconcept.co.kr" }, { label: "Revolve", href: "https://www.revolve.com" }] },
  { title: "빈티지 워시 데님", tag: "Street · 빈티지", desc: "워싱 데님 셋업으로 완성하는 레트로 감성.", gradient: "from-indigo-300 to-accent", shops: [{ label: "Revolve", href: "https://www.revolve.com" }, { label: "Urban Outfitters", href: "https://www.urbanoutfitters.com" }, { label: "Free People", href: "https://www.freepeople.com" }] },
  { title: "K-스트릿 레이어드", tag: "Street · K-스타일", desc: "레이어드로 만드는 한국 스트릿 무드.", gradient: "from-rose-300 to-brand", shops: [{ label: "스타일난다", href: "https://www.stylenanda.com" }, { label: "YesStyle", href: "https://www.yesstyle.com" }, { label: "무신사", href: "https://www.musinsa.com" }] },
  { title: "보헤미안 맥시", tag: "Street · 보헤미안", desc: "플로럴 맥시 원피스와 레이스업 샌들로 완성하는 보헤미안 룩.", gradient: "from-orange-200 to-rose-300", shops: [{ label: "Free People", href: "https://www.freepeople.com" }, { label: "Anthropologie", href: "https://www.anthropologie.com" }, { label: "ASOS", href: "https://www.asos.com" }] },
  { title: "뉴트럴 셋업", tag: "Office · 모던", desc: "뉴트럴 톤 셋업으로 완성한 모던 오피스.", gradient: "from-stone-300 to-navy", shops: [{ label: "W컨셉", href: "https://www.wconcept.co.kr" }, { label: "SSF샵", href: "https://www.ssfshop.com" }, { label: "COS", href: "https://www.cosstores.com" }] },
  { title: "프레피 베스트 룩", tag: "Office · 프레피", desc: "니트 베스트로 더하는 프레피 무드.", gradient: "from-emerald-300 to-brand-dark", shops: [{ label: "Ralph Lauren", href: "https://www.ralphlauren.com" }, { label: "무신사", href: "https://www.musinsa.com" }, { label: "Nordstrom", href: "https://www.nordstrom.com" }] },
  { title: "파워 수트 룩", tag: "Office · 파워", desc: "더블 브레스티드 수트로 완성하는 파워풀 오피스 룩.", gradient: "from-stone-400 to-slate-600", shops: [{ label: "ZARA", href: "https://www.zara.com" }, { label: "Mango", href: "https://shop.mango.com" }, { label: "Reiss", href: "https://www.reiss.com" }] },
  { title: "파스텔 트위드", tag: "Date · 로맨틱", desc: "파스텔 트위드 셋업으로 완성하는 데이트룩.", gradient: "from-pink-200 to-brand", shops: [{ label: "29CM", href: "https://www.29cm.co.kr" }, { label: "Shopbop", href: "https://www.shopbop.com" }, { label: "Sézane", href: "https://www.sezane.com" }] },
  { title: "실크 미디 스커트", tag: "Date · 우아함", desc: "실크 미디 스커트 + 슬리브리스 탑으로 완성하는 우아한 데이트룩.", gradient: "from-rose-200 to-violet-300", shops: [{ label: "& Other Stories", href: "https://www.stories.com" }, { label: "Anthropologie", href: "https://www.anthropologie.com" }, { label: "Net-a-Porter", href: "https://www.net-a-porter.com" }] },
  { title: "시퀀 나이트 아웃", tag: "Night · 파티", desc: "미니 시퀀 스커트로 파티 레디 룩.", gradient: "from-yellow-300 to-rose-400", shops: [{ label: "ASOS", href: "https://www.asos.com" }, { label: "PrettyLittleThing", href: "https://www.prettylittlething.com" }, { label: "Boohoo", href: "https://www.boohoo.com" }] },
  { title: "럭스 이브닝", tag: "Night · 글램", desc: "드레시한 실루엣으로 완성하는 이브닝 룩.", gradient: "from-navy to-rose-500", shops: [{ label: "SSENSE", href: "https://www.ssense.com" }, { label: "Mytheresa", href: "https://www.mytheresa.com" }, { label: "Farfetch", href: "https://www.farfetch.com" }] },
  { title: "쉬폰 미드나잇", tag: "Night · 소피스티케이티드", desc: "쉬폰 레이어드 드레스로 완성하는 소피스티케이티드 나이트룩.", gradient: "from-violet-400 to-navy", shops: [{ label: "Reiss", href: "https://www.reiss.com" }, { label: "LK Bennett", href: "https://www.lkbennett.com" }, { label: "Nordstrom", href: "https://www.nordstrom.com" }] },
];

const beautyLooksRaw: Look[] = [
  { title: "MLBB 립 룩", tag: "Beauty · 립", desc: "내 입술보다 예쁜 자연스러운 MLBB 컬러.", gradient: "from-rose-300 to-accent", shops: [{ label: "Ulta", href: "https://www.ulta.com" }, { label: "Cult Beauty", href: "https://www.cultbeauty.com" }, { label: "Sephora", href: "https://www.sephora.com" }] },
  { title: "웜톤 아이 룩", tag: "Beauty · 아이", desc: "웜톤 코랄·브릭으로 완성하는 데일리 아이.", gradient: "from-amber-300 to-brand", shops: [{ label: "Lookfantastic", href: "https://www.lookfantastic.com" }, { label: "올리브영", href: "https://www.oliveyoung.co.kr" }, { label: "Beautylish", href: "https://www.beautylish.com" }] },
  { title: "쿨톤 스모키 아이", tag: "Beauty · 아이", desc: "그레이·딥 네이비 계열 스모키로 만드는 강렬한 아이 메이크업.", gradient: "from-slate-400 to-violet-500", shops: [{ label: "Sephora", href: "https://www.sephora.com" }, { label: "Cult Beauty", href: "https://www.cultbeauty.com" }, { label: "Space NK", href: "https://www.spacenk.com" }] },
  { title: "수분 광채 루틴", tag: "Skincare · 수분", desc: "수분 가득 광채 피부를 위한 루틴.", gradient: "from-sky-300 to-emerald-300", shops: [{ label: "YesStyle", href: "https://www.yesstyle.com" }, { label: "Stylevana", href: "https://www.stylevana.com" }, { label: "Soko Glam", href: "https://www.sokoglam.com" }] },
  { title: "레티놀 안티에이징", tag: "Skincare · 안티에이징", desc: "레티놀로 시작하는 스마트한 안티에이징 루틴.", gradient: "from-amber-200 to-rose-300", shops: [{ label: "Dermstore", href: "https://www.dermstore.com" }, { label: "Lookfantastic", href: "https://www.lookfantastic.com" }, { label: "Space NK", href: "https://www.spacenk.com" }] },
  { title: "시카 진정 케어", tag: "Skincare · 진정", desc: "예민한 피부를 위한 시카 진정 케어.", gradient: "from-emerald-300 to-brand-soft", shops: [{ label: "iHerb", href: "https://www.iherb.com" }, { label: "올리브영", href: "https://www.oliveyoung.co.kr" }, { label: "YesStyle", href: "https://www.yesstyle.com" }] },
  { title: "데일리 선케어", tag: "Skincare · 선케어", desc: "매일의 자외선 차단, 가볍게.", gradient: "from-yellow-200 to-accent", shops: [{ label: "Amazon", href: "https://www.amazon.com" }, { label: "Soko Glam", href: "https://www.sokoglam.com" }, { label: "Stylevana", href: "https://www.stylevana.com" }] },
  { title: "글로시 립글로스 룩", tag: "Beauty · 립", desc: "플럼핑 립글로스로 완성하는 볼륨 입술 메이크업.", gradient: "from-rose-200 to-pink-400", shops: [{ label: "Ulta", href: "https://www.ulta.com" }, { label: "Beautylish", href: "https://www.beautylish.com" }, { label: "Cult Beauty", href: "https://www.cultbeauty.com" }] },
  { title: "화이트 플로럴 향수", tag: "Fragrance · 플로럴", desc: "은은한 화이트 플로럴 향.", gradient: "from-pink-200 to-brand", shops: [{ label: "Sephora", href: "https://www.sephora.com" }, { label: "Notino", href: "https://www.notino.com" }, { label: "Beautylish", href: "https://www.beautylish.com" }] },
  { title: "우디 머스크 향수", tag: "Fragrance · 머스크", desc: "우디 베이스에 머스크가 더해지는 세련된 시그니처 향.", gradient: "from-stone-300 to-amber-400", shops: [{ label: "Notino", href: "https://www.notino.com" }, { label: "Beautylish", href: "https://www.beautylish.com" }, { label: "Sephora", href: "https://www.sephora.com" }] },
  { title: "레이어드 바디 미스트", tag: "Body · 데일리", desc: "레이어링으로 완성하는 바디 향.", gradient: "from-violet-300 to-accent", shops: [{ label: "올리브영", href: "https://www.oliveyoung.co.kr" }, { label: "Lookfantastic", href: "https://www.lookfantastic.com" }, { label: "Bath & Body Works", href: "https://www.bathandbodyworks.com" }] },
  { title: "딥 컨디셔닝 헤어 마스크", tag: "Hair · 트리트먼트", desc: "손상 모발에 깊은 영양을 주는 헤어 마스크 루틴.", gradient: "from-amber-200 to-brand-soft", shops: [{ label: "Cult Beauty", href: "https://www.cultbeauty.com" }, { label: "Lookfantastic", href: "https://www.lookfantastic.com" }, { label: "iHerb", href: "https://www.iherb.com" }] },
  { title: "윤기 헤어 케어", tag: "Hair · 케어", desc: "윤기 흐르는 머릿결을 위한 케어.", gradient: "from-stone-300 to-brand-dark", shops: [{ label: "Cult Beauty", href: "https://www.cultbeauty.com" }, { label: "iHerb", href: "https://www.iherb.com" }, { label: "Dermstore", href: "https://www.dermstore.com" }] },
  { title: "K-뷰티 더블 클렌징", tag: "Skincare · 클렌징", desc: "오일 클렌저 + 폼 클렌저 더블 클렌징으로 완성하는 K-뷰티 기초.", gradient: "from-sky-200 to-emerald-200", shops: [{ label: "Soko Glam", href: "https://www.sokoglam.com" }, { label: "YesStyle", href: "https://www.yesstyle.com" }, { label: "Stylevana", href: "https://www.stylevana.com" }] },
];

const lifestyleLooksRaw: Look[] = [
  { title: "미니멀 크로스백", tag: "Accessories · 백", desc: "미니멀한 레더 크로스백 하나로 룩 완성.", gradient: "from-stone-300 to-amber-300", shops: [{ label: "Mango", href: "https://shop.mango.com" }, { label: "& Other Stories", href: "https://www.stories.com" }, { label: "Net-a-Porter", href: "https://www.net-a-porter.com" }] },
  { title: "버킷햇 여름 룩", tag: "Accessories · 모자", desc: "버킷햇으로 완성하는 여름 시즌 포인트 아이템.", gradient: "from-lime-200 to-sky-300", shops: [{ label: "ASOS", href: "https://www.asos.com" }, { label: "Urban Outfitters", href: "https://www.urbanoutfitters.com" }, { label: "무신사", href: "https://www.musinsa.com" }] },
  { title: "클라우드 스니커즈", tag: "Shoes · 스니커즈", desc: "온러닝 클라우드 계열 편안한 스니커즈 데일리 룩.", gradient: "from-sky-200 to-slate-300", shops: [{ label: "On Running", href: "https://www.on-running.com" }, { label: "Zappos", href: "https://www.zappos.com" }, { label: "Foot Locker", href: "https://www.footlocker.com" }] },
  { title: "메리제인 플랫 슈즈", tag: "Shoes · 플랫", desc: "레트로 무드의 메리제인 플랫으로 완성하는 페미닌 코디.", gradient: "from-rose-200 to-brand", shops: [{ label: "& Other Stories", href: "https://www.stories.com" }, { label: "Schuh", href: "https://www.schuh.co.uk" }, { label: "29CM", href: "https://www.29cm.co.kr" }] },
  { title: "스트랩 뮬 샌들", tag: "Shoes · 샌들", desc: "미니멀 스트랩 뮬로 완성하는 시크한 여름 슈즈.", gradient: "from-amber-200 to-rose-200", shops: [{ label: "Mango", href: "https://shop.mango.com" }, { label: "ZARA", href: "https://www.zara.com" }, { label: "Revolve", href: "https://www.revolve.com" }] },
  { title: "골드 레이어드 목걸이", tag: "Accessories · 주얼리", desc: "골드 레이어드 목걸이로 완성하는 미니멀 주얼리 룩.", gradient: "from-yellow-200 to-amber-300", shops: [{ label: "Mejuri", href: "https://mejuri.com" }, { label: "Missoma", href: "https://www.missoma.com" }, { label: "Astrid & Miyu", href: "https://www.astridandmiyu.com" }] },
  { title: "실버 귀걸이 포인트", tag: "Accessories · 주얼리", desc: "실버 후프 귀걸이로 완성하는 쿨한 포인트 주얼리.", gradient: "from-slate-300 to-brand", shops: [{ label: "Mejuri", href: "https://mejuri.com" }, { label: "Pandora", href: "https://www.pandora.net" }, { label: "Missoma", href: "https://www.missoma.com" }] },
  { title: "웰니스 텀블러 굿즈", tag: "Lifestyle · 웰니스", desc: "스탠리·하이드로플라스크 텀블러로 완성하는 웰니스 라이프.", gradient: "from-teal-300 to-sky-400", shops: [{ label: "Amazon", href: "https://www.amazon.com" }, { label: "iHerb", href: "https://www.iherb.com" }, { label: "Urban Outfitters", href: "https://www.urbanoutfitters.com" }] },
];

// 카테고리별 offset으로 사진 시퀀스를 다르게 주입(같은 컷 반복 최소화).
export const homeLooks: Look[] = attachImages(homeLooksRaw, 0);
export const fashionLooks: Look[] = attachImages(fashionLooksRaw, 1);
export const beautyLooks: Look[] = attachImages(beautyLooksRaw, 11);
export const lifestyleLooks: Look[] = attachImages(lifestyleLooksRaw, 9);
