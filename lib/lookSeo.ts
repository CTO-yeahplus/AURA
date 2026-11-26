// 룩 상세(/ootd/<id>)의 검색용 제목·설명·요약 문장.
//
// 왜: 시드 룩은 제목·설명이 템플릿("캐주얼 코디 픽", "오늘 이대로 입어도 좋은 캐주얼 · 겨울.")이라
//   페이지끼리 거의 같았고, Google이 서로를 중복으로 묶어 우리가 지정한 대표 주소 대신 다른 룩을 골랐다
//   (Search Console '중복 페이지, Google에서 사용자와 다른 표준을 선택함', 2026-11).
//   룩마다 반드시 다른 것은 '어떤 상품을 조합했는가'이므로, 상품명에서 아이템 이름(터틀넥 · 슬랙스 · 롱부츠)과
//   브랜드를 뽑아 제목·설명·본문에 넣어 페이지마다 다르게 만든다.

type ProductLike = { title: string; brand: string | null };
type LookLike = { title: string; caption: string; products: ProductLike[] };

// 상품명 → 아이템 이름. 위에서부터 처음 맞는 것을 쓴다(순서가 중요):
//   신발의 '부츠컷'·외투의 '니트 카라 패딩'처럼 다른 갈래 단어가 섞인 이름이 있어 외투 → 신발 → 원피스 → 하의 → 상의 순.
const ITEM_WORDS: readonly [RegExp, string][] = [
  // 외투
  [/무스탕|shearling/i, "무스탕"],
  [/패딩|다운|puffer|\bdown\b|\bPD\b/i, "패딩"],
  [/트렌치/, "트렌치코트"],
  [/코트|\bcoat\b/i, "코트"],
  [/가디건|cardigan/i, "가디건"],
  [/블레이저|blazer/i, "블레이저"],
  [/자켓|재킷|jacket/i, "재킷"],
  [/점퍼|블루종|jumper/i, "점퍼"],
  [/베스트|조끼|\bvest\b/i, "베스트"],
  // 하의 중 신발 단어가 섞이는 것
  [/부츠컷|bootcut/i, "부츠컷 팬츠"],
  // 신발
  [/양털\s*부츠|어그/, "양털부츠"],
  [/롱\s*부츠/, "롱부츠"],
  [/앵클\s*부츠/, "앵클부츠"],
  [/부츠|\bboots?\b/i, "부츠"],
  [/로퍼|loafer/i, "로퍼"],
  [/스니커즈|sneaker/i, "스니커즈"],
  [/메리제인/, "메리제인"],
  [/샌들|sandal/i, "샌들"],
  [/뮬|\bmule/i, "뮬"],
  [/플랫|\bflat/i, "플랫슈즈"],
  [/힐|\bheel/i, "힐"],
  // 원피스
  [/원피스|드레스|\bdress\b/i, "원피스"],
  // 하의
  [/미디\s*스커트/, "미디스커트"],
  [/미니\s*스커트/, "미니스커트"],
  [/스커트|skirt/i, "스커트"],
  [/데님|청바지|jeans|denim/i, "데님 팬츠"],
  [/슬랙스|slacks/i, "슬랙스"],
  [/조거|jogger/i, "조거팬츠"],
  [/반바지|쇼츠|shorts/i, "쇼츠"],
  [/팬츠|바지|pants|trousers/i, "팬츠"],
  // 상의
  [/터틀넥|롤넥|폴라|turtleneck/i, "터틀넥"],
  [/니트|knit|스웨터|sweater/i, "니트"],
  [/맨투맨|스웻|sweatshirt/i, "맨투맨"],
  [/후드|hood/i, "후드"],
  [/블라우스|blouse/i, "블라우스"],
  [/티셔츠|반팔|t-shirt|\btee\b/i, "티셔츠"],
  [/셔츠|shirt/i, "셔츠"],
  [/나시|민소매|탑|\btop\b/i, "탑"],
  // 악세사리
  [/가방|백팩|숄더백|토트백|크로스백|\bbag\b/i, "가방"],
  [/머플러|목도리|scarf/i, "머플러"],
  [/비니|모자|beanie|\bcap\b/i, "모자"],
];

/** 상품명 → 아이템 이름(터틀넥 · 슬랙스 · 롱부츠). 모르는 이름이면 null. */
export function itemName(productTitle: string): string | null {
  for (const [re, label] of ITEM_WORDS) if (re.test(productTitle)) return label;
  return null;
}

/** "WAAR FOR WOMEN 와르 포 우먼" → "와르 포 우먼". 한글 표기가 있으면 그것을, 없으면 그대로. */
export function shortBrand(brand: string | null): string {
  const b = (brand ?? "").trim();
  const m = b.match(/^[^가-힣]+\s+([가-힣].*)$/);
  return (m ? m[1] : b).trim();
}

function uniq(xs: string[]): string[] {
  return [...new Set(xs.filter((x) => x.length > 0))];
}

/** 조사 '(으)로' — 받침이 있으면(ㄹ 제외) '으로'. 한글로 끝나지 않으면 '로'. */
function ro(word: string): string {
  const code = word.charCodeAt(word.length - 1) - 0xac00;
  if (code < 0 || code > 11171) return "로";
  const jong = code % 28;
  return jong === 0 || jong === 8 ? "로" : "으로";
}

function clip(s: string, max: number): string {
  return s.length <= max ? s : `${s.slice(0, max - 1).trimEnd()}…`;
}

/** 이 룩을 이루는 상품의 '브랜드 아이템' 목록(최대 5개). 예: "지오다노 터틀넥". */
function brandItems(look: LookLike): string[] {
  return uniq(
    look.products.slice(0, 5).map((p) => {
      const item = itemName(p.title) ?? p.title;
      const brand = shortBrand(p.brand);
      return brand ? `${brand} ${item}` : item;
    })
  );
}

/** 룩 상세 페이지의 제목·설명·본문 요약. 상품이 없으면 원래 제목·설명을 그대로 쓴다. */
export function lookSeo(look: LookLike): { title: string; description: string; summary: string | null } {
  const items = uniq(look.products.map((p) => itemName(p.title) ?? "")).slice(0, 3);
  // 아이템 이름을 2개 이상 못 뽑으면 브랜드로 구분한다.
  const parts = items.length >= 2 ? items : uniq(look.products.map((p) => shortBrand(p.brand))).slice(0, 3);
  const suffix = look.title.includes("코디") ? "" : " 코디";
  const title = parts.length > 0 ? `${look.title}: ${parts.join(" · ")}${suffix}` : look.title;

  const bi = brandItems(look);
  const last = bi[bi.length - 1] ?? "";
  const summary = bi.length > 0 ? `${bi.join(", ")}${ro(last)} 완성한 코디예요.` : null;
  const description = clip(
    [look.caption, summary, "아이템마다 구매처를 바로 확인할 수 있어요."].filter(Boolean).join(" ") ||
      "AURA 오늘의 룩과 따라사기 아이템.",
    155
  );
  return { title, description, summary };
}
