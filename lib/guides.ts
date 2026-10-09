// AURA 랜딩 — 에디토리얼 스타일 가이드(콘텐츠 SSOT).
// 목적: auraootd.com을 "얇은 랜딩"에서 실제 오리지널 콘텐츠 사이트로. 어필리에이트 어그리게이터(Skimlinks/
// Sovrn) 재심사 적합성 + SEO. 각 가이드는 도입부 + 룩별 스타일링 팁 + 따라사기 아이템(아웃링크)을 가진다.
//
// 2026-10: 사진·내용을 전부 앱 홈피드(public.looks)의 실제 룩으로 교체. 섹션 하나 = 홈피드 룩 하나이고,
// 사진(media_url)·아이템(그 룩의 따라사기 상품)은 그 룩에서 가져온 스냅샷, 본문은 그 사진을 보고 쓴 에디토리얼이다.
// 홈피드 사진은 AI 생성 화보라 화면에서 'AI 생성' 배지를 붙인다(lib/aiGenerated.ts).

export type GuideItem = {
  label: string;
  brand: string;
  priceKrw?: number;
  /** 구매처 링크(아웃링크 — rel=sponsored). */
  href: string;
};

export type GuideSection = {
  /** 이 섹션이 다루는 홈피드 룩(public.looks.id) — 있으면 상세(/ootd/[id])로 잇는다. */
  lookId?: string;
  /** 룩 제목. */
  look: string;
  /** 스타일링 팁(에디토리얼 본문, 2~4문장). */
  body: string;
  items: GuideItem[];
  gradient: string; // 섹션 헤더 배경
  image?: string;
};

export type Guide = {
  slug: string;
  category: "Fashion" | "Beauty" | "Lifestyle";
  title: string;
  dek: string; // 부제
  /** 도입 단락(2~3문장). */
  intro: string;
  /** 발행/갱신 표기(콘텐츠 신뢰도). */
  updated: string;
  heroGradient: string;
  image?: string;
  /** 이 가이드가 어울리는 날의 장면 — 때·곳(when)과 한 줄(line). 목록·상세 머리에 쓴다. */
  scene?: { when: string; line: string };
  sections: GuideSection[];
};

export const GUIDES: Guide[] = [
  {
    slug: "modern-casual-look-guide",
    category: "Fashion",
    title: "모던 캐주얼 가이드: 셔츠와 니트로 완성하는 데일리 룩 5",
    dek: "힘 빼고 입어도 정돈돼 보이는, 홈피드에서 고른 캐주얼 공식",
    intro:
      "모던 캐주얼의 핵심은 '단정한 상의 하나와 편한 하의 하나'예요. 셔츠나 카디건처럼 깃과 단추가 있는 상의가 룩의 중심을 잡아 주면, 아래는 와이드 데님이든 롱 스커트든 편하게 풀어도 정돈돼 보입니다. AURA 홈피드에 올라온 룩 가운데 매일 입기 좋은 다섯 가지를 골라 코디 포인트를 정리했어요. 사진은 모두 AI로 생성한 화보이며, 각 룩에 쓰인 아이템은 구매처에서 바로 만나볼 수 있습니다.",
    updated: "2026년 10월",
    scene: { when: "수요일 아침 8시 · 현관 거울 앞", line: "아무 약속 없는 날에도, 단정하고 싶은 마음이 있습니다." },
    heroGradient: "from-brand-soft to-accent",
    image: "https://zofydqjyfzvyusbkllan.supabase.co/storage/v1/object/public/looks/268c3a60-16ad-4287-b6aa-33543261a5fd/seed-ai/1785799602869-xbnrvl.png",
    sections: [
      {
        lookId: "2318ecf1-84b1-48b1-b3ce-ef7941972ef6",
        look: "화이트 셔츠 + 와이드 데님",
        body:
          "반소매 화이트 셔츠에 통이 넉넉한 연청 데님을 맞춘, 가장 기본이 되는 조합이에요. 셔츠 앞자락을 넣어 허리선을 보여 주고, 크림색 니트를 허리에 묶어 상하의 사이에 한 겹을 더했습니다. 니트 매듭이 허리 위치를 올려 줘 와이드 팬츠를 입어도 다리가 길어 보여요. 신발은 낮은 화이트 스니커즈로 가볍게 마무리하세요.",
        gradient: "from-brand-soft to-accent",
        image: "https://zofydqjyfzvyusbkllan.supabase.co/storage/v1/object/public/looks/268c3a60-16ad-4287-b6aa-33543261a5fd/seed-ai/1785799602869-xbnrvl.png",
        items: [
          { label: "써머 필라필 반소매 셔츠", brand: "빈폴 레이디스", priceKrw: 132300, href: "https://s.lotteon.com/PxTgRjGlvo?ch_dtl_no=1044428" },
          { label: "Alexander Wang 로고 디테일 벨트 루프 진", brand: "Farfetch", priceKrw: 848000, href: "https://www.farfetch.com/kr/shopping/women/alexander-wang-logo-detail-belt-loop-jeans-item-37618045.aspx" },
          { label: "W NIKE CORTEZ", brand: "NIKE 나이키", href: "https://al.wconcept.co.kr/6ovsn6" },
        ],
      },
      {
        lookId: "b670cb47-42ce-4b8b-965e-59389380f410",
        look: "배색 카디건 + 플리츠 롱 스커트",
        body:
          "크림 바탕에 검은 선을 두른 집업 카디건은 그 자체로 재킷처럼 단정해요. 여기에 잔주름이 촘촘한 블랙 플리츠 스커트를 더하면 위는 밝고 아래는 어두운 대비가 생겨 실루엣이 또렷해집니다. 스커트가 종아리까지 내려오니, 신발은 구두 대신 화이트 스니커즈로 무게를 덜어 주세요.",
        gradient: "from-accent to-brand-soft",
        image: "https://zofydqjyfzvyusbkllan.supabase.co/storage/v1/object/public/looks/268c3a60-16ad-4287-b6aa-33543261a5fd/seed-ai/1785799533409-e1m7w4.png",
        items: [
          { label: "집업 배색 카디건", brand: "빈폴 레이디스", priceKrw: 265300, href: "https://s.lotteon.com/h2cGZDemg-?ch_dtl_no=1044428" },
          { label: "Weekend Max Mara 플리세 이펙트 미디 스커트", brand: "Farfetch", priceKrw: 370000, href: "https://www.farfetch.com/kr/shopping/women/weekend-max-mara-plisse-effect-midi-skirt-item-36926179.aspx" },
          { label: "NIKE MOON SHOE OG", brand: "NIKE 나이키", href: "https://al.wconcept.co.kr/agh3odp" },
        ],
      },
      {
        lookId: "7e3cbbd5-a088-4e04-a7ba-1207c64569cc",
        look: "크림 카디건 + 플로럴 새틴 스커트",
        body:
          "차분한 크림 카디건에 분홍 꽃무늬 새틴 스커트를 맞춰, 무늬는 하의 한 곳에만 두었어요. 상의를 무지로 눌러 주면 화려한 스커트도 일상복처럼 편하게 입을 수 있습니다. 카디건은 단추를 채워 톱처럼 입고, 흰 스니커즈로 새틴의 광택을 캐주얼하게 풀어 주세요.",
        gradient: "from-brand-soft to-accent",
        image: "https://zofydqjyfzvyusbkllan.supabase.co/storage/v1/object/public/looks/268c3a60-16ad-4287-b6aa-33543261a5fd/seed-ai/1785799561629-bs2yqb.png",
        items: [
          { label: "Cardigan & Sleeveless Top Set", brand: "FRONTROW 프론트로우", href: "https://al.wconcept.co.kr/87cl42" },
          { label: "DELILAH Satin Long Skirt", brand: "Lang&Lu 랭앤루", href: "https://al.wconcept.co.kr/zecbzvd" },
          { label: "NIKE MOON SHOE OG", brand: "NIKE 나이키", href: "https://al.wconcept.co.kr/8mbq0i" },
        ],
      },
      {
        lookId: "e52bccb6-b037-474d-b9fa-42a487d934e9",
        look: "레이스 셔츠 + 배럴 팬츠",
        body:
          "크림색 반소매 셔츠를 네이비 배럴 팬츠 안에 넣어 입고 얇은 벨트로 허리를 잡았어요. 배럴 팬츠는 허벅지에서 넓어졌다가 밑단에서 다시 좁아져, 상의를 넣어 입어야 곡선이 살아납니다. 밝은 상의와 짙은 하의 두 가지 색만 쓰고, 브라운 로퍼로 색을 하나만 더하면 충분해요.",
        gradient: "from-accent to-brand-soft",
        image: "https://zofydqjyfzvyusbkllan.supabase.co/storage/v1/object/public/looks/268c3a60-16ad-4287-b6aa-33543261a5fd/seed-ai/1785799595514-i11jo3.png",
        items: [
          { label: "레이스셔츠", brand: "Jucy Judy 쥬시쥬디", href: "https://al.wconcept.co.kr/i5kym8i" },
          { label: "리넨 혼방 배럴 팬츠", brand: "빈폴 레이디스", priceKrw: 181300, href: "https://s.lotteon.com/ANCAxkIOkr?ch_dtl_no=1044428" },
          { label: "여성 태슬 레더 로퍼", brand: "핏플랍", priceKrw: 199200, href: "https://s.lotteon.com/6ipAWvw9xtr?ch_dtl_no=1044428" },
        ],
      },
      {
        lookId: "0616d0bc-18f9-4268-9955-4a5b4aee3cae",
        look: "스트라이프 폴로 + 연청 데님",
        body:
          "깃이 있는 스트라이프 폴로는 티셔츠만큼 편하면서 한결 단정해 보여요. 연청 와이드 데님과 맞추고 네이비 니트를 허리에 둘러 색을 한 번 눌러 주었습니다. 발등이 드러나는 슬라이드를 신으면 넓은 바짓단 아래가 답답해 보이지 않아요.",
        gradient: "from-brand-soft to-accent",
        image: "https://zofydqjyfzvyusbkllan.supabase.co/storage/v1/object/public/looks/268c3a60-16ad-4287-b6aa-33543261a5fd/seed-ai/1785799579035-8sitvf.png",
        items: [
          { label: "분또 스트라이프 긴소매 폴로 티셔츠 스카이", brand: "빈폴 레이디스", priceKrw: 125300, href: "https://s.lotteon.com/OW-A3q7PCe?ch_dtl_no=1044428" },
          { label: "Alexander Wang 로고 디테일 벨트 루프 진", brand: "Farfetch", priceKrw: 848000, href: "https://www.farfetch.com/kr/shopping/women/alexander-wang-logo-detail-belt-loop-jeans-item-37618045.aspx" },
          { label: "X자 스트랩 크로셰 여성슬라이드 2cm", brand: "바바라", priceKrw: 198000, href: "https://s.lotteon.com/-nZ5NFU9Sn?ch_dtl_no=1044428" },
        ],
      },
    ],
  },
  {
    slug: "street-look-guide",
    category: "Fashion",
    title: "스트릿 가이드: 스커트와 스니커즈로 푸는 거리의 룩 5",
    dek: "편한 신발 하나로 무드를 바꾸는, 홈피드에서 고른 스트릿 코디",
    intro:
      "요즘 스트릿은 헐렁한 옷을 겹치기보다 '단정한 옷을 편한 신발로 푸는' 쪽에 가까워요. 롱 스커트든 데님 쇼츠든 발끝에 스니커즈가 오면 룩 전체가 거리의 무드로 바뀝니다. AURA 홈피드의 스트릿 룩 가운데 따라 입기 쉬운 다섯 가지를 골랐어요. 사진은 모두 AI로 생성한 화보이며, 각 룩에 쓰인 아이템은 구매처에서 바로 만나볼 수 있습니다.",
    updated: "2026년 10월",
    scene: { when: "금요일 저녁 6시 · 퇴근길 골목", line: "오늘은 조금 멀리 돌아서 걷고 싶습니다." },
    heroGradient: "from-accent to-brand-soft",
    image: "https://zofydqjyfzvyusbkllan.supabase.co/storage/v1/object/public/looks/268c3a60-16ad-4287-b6aa-33543261a5fd/seed-ai/1785799507347-zzc1t7.png",
    sections: [
      {
        lookId: "0e416194-7929-48c7-886a-2ae3cb47bcb1",
        look: "스트라이프 티 + 플리츠 롱 스커트",
        body:
          "보트넥 스트라이프 티셔츠를 블랙 플리츠 스커트 안에 넣어 입은 룩이에요. 가로 줄무늬와 세로 주름이 만나 무늬를 더하지 않아도 리듬이 생깁니다. 길고 어두운 스커트 아래에는 색이 들어간 스니커즈를 신어 발끝에 포인트를 주세요. 구두를 신었을 때보다 훨씬 가볍고 활동적으로 보여요.",
        gradient: "from-accent to-brand-soft",
        image: "https://zofydqjyfzvyusbkllan.supabase.co/storage/v1/object/public/looks/268c3a60-16ad-4287-b6aa-33543261a5fd/seed-ai/1785799507347-zzc1t7.png",
        items: [
          { label: "보더 스트라이프 보트넥 루즈핏 티셔츠", brand: "빈폴 레이디스", priceKrw: 83300, href: "https://s.lotteon.com/ele4x-iSOe?ch_dtl_no=1044428" },
          { label: "Weekend Max Mara 플리세 이펙트 미디 스커트", brand: "Farfetch", priceKrw: 370000, href: "https://www.farfetch.com/kr/shopping/women/weekend-max-mara-plisse-effect-midi-skirt-item-36926179.aspx" },
          { label: "버디 메리노울 운동화", brand: "르무통", priceKrw: 149000, href: "https://s.lotteon.com/QxcxE8X3okL?ch_dtl_no=1044428" },
        ],
      },
      {
        lookId: "7929331b-76f0-4eaa-a5ee-5b6e96403b99",
        look: "패턴 니트 + 플로럴 스커트",
        body:
          "네이비 바탕의 패턴 반소매 니트에 파스텔 꽃무늬 스커트를 맞춘, 무늬와 무늬의 조합이에요. 위는 짙고 잔잔하게, 아래는 밝고 큼직하게 두어 두 무늬가 부딪히지 않습니다. 화이트 스니커즈로 색을 정리하고, 챙이 있는 모자 하나를 더하면 휴일의 무드가 완성돼요.",
        gradient: "from-brand-soft to-accent",
        image: "https://zofydqjyfzvyusbkllan.supabase.co/storage/v1/object/public/looks/268c3a60-16ad-4287-b6aa-33543261a5fd/seed-ai/1785799609980-rda0re.png",
        items: [
          { label: "올오버 반소매 스웨터", brand: "빈폴 레이디스", priceKrw: 195300, href: "https://s.lotteon.com/eZvBIxS6Ur?ch_dtl_no=1044428" },
          { label: "La DoubleJ 스워스 핑크 인 러스틱 코튼 펜슬 스커트", brand: "Farfetch", priceKrw: 787000, href: "https://www.farfetch.com/kr/shopping/women/la-doublej-swathe-pink-in-rustic-cotton-pencil-skirt-item-35925940.aspx" },
          { label: "그린위치 플랫폼 스니커즈", brand: "타미힐피거 슈즈", priceKrw: 107400, href: "https://s.lotteon.com/nlJP1cUOPk?ch_dtl_no=1044428" },
        ],
      },
      {
        lookId: "4080bb9f-57b4-4e07-8525-1ffb128269a2",
        look: "스트라이프 폴로 + 데님 쇼츠",
        body:
          "스트라이프 폴로 티셔츠에 데님 쇼츠, 그리고 어깨에 두른 니트. 프레피한 상의를 짧은 하의로 풀어 준 룩이에요. 다리가 많이 드러나는 만큼 검은 양말을 발목 위로 올려 신고 캔버스 스니커즈를 맞추면 비율이 안정됩니다. 어깨의 니트는 색 포인트이자 해가 진 뒤의 겉옷이에요.",
        gradient: "from-accent to-brand-soft",
        image: "https://zofydqjyfzvyusbkllan.supabase.co/storage/v1/object/public/looks/268c3a60-16ad-4287-b6aa-33543261a5fd/seed-ai/1785799432513-0074pd.png",
        items: [
          { label: "분또 스트라이프 긴소매 폴로 티셔츠 스카이", brand: "빈폴 레이디스", priceKrw: 125300, href: "https://s.lotteon.com/OW-A3q7PCe?ch_dtl_no=1044428" },
          { label: "아웃포켓 데님 쇼츠", brand: "빈폴 레이디스", priceKrw: 139300, href: "https://s.lotteon.com/sKZeexyZib?ch_dtl_no=1044428" },
          { label: "릴라 플랫폼 캔버스 스니커즈", brand: "타미힐피거 슈즈", priceKrw: 51600, href: "https://s.lotteon.com/i-LqfbGqSW?ch_dtl_no=1044428" },
        ],
      },
      {
        lookId: "c4a98427-d5da-4af3-a298-40f8efdc3e7f",
        look: "후드 카디건 + 레이스 스커트",
        body:
          "아이보리 후드 카디건과 화이트 레이스 미디 스커트를 같은 톤으로 이어 입었어요. 위아래가 모두 밝고 부드러운 대신, 검은 양말과 캔버스 스니커즈로 아래를 눌러 주는 게 포인트입니다. 여성스러운 소재를 스포티한 발끝으로 받치면 러블리와 스트릿 사이의 균형이 맞아요.",
        gradient: "from-brand-soft to-accent",
        image: "https://zofydqjyfzvyusbkllan.supabase.co/storage/v1/object/public/looks/268c3a60-16ad-4287-b6aa-33543261a5fd/seed-ai/1785799567481-a3irkz.png",
        items: [
          { label: "후드 카디건", brand: "빈폴 레이디스", priceKrw: 321300, href: "https://s.lotteon.com/v3-_9StW0q?ch_dtl_no=1044428" },
          { label: "레이스 미디 스커트", brand: "빈폴 레이디스", priceKrw: 195300, href: "https://s.lotteon.com/FLJjyqY-D4?ch_dtl_no=1044428" },
          { label: "릴라 플랫폼 캔버스 스니커즈", brand: "타미힐피거 슈즈", priceKrw: 51600, href: "https://s.lotteon.com/i-LqfbGqSW?ch_dtl_no=1044428" },
        ],
      },
      {
        lookId: "9a880f70-7a3c-4976-b75e-9784cea6e7f2",
        look: "타이 블라우스 + 데님 미니",
        body:
          "목에 타이가 달린 화이트 블라우스를 데님 미니 스커트 안에 넣어 입은 룩이에요. 블라우스의 단정함과 데님의 거친 밑단이 대비를 이룹니다. 타이는 묶지 않고 길게 늘어뜨려 세로선을 만들고, 검은 캔버스 스니커즈로 마무리하면 저녁 약속에도 어울려요.",
        gradient: "from-accent to-brand-soft",
        image: "https://zofydqjyfzvyusbkllan.supabase.co/storage/v1/object/public/looks/268c3a60-16ad-4287-b6aa-33543261a5fd/seed-ai/1785799482810-vc5j1p.png",
        items: [
          { label: "Collar Silky Blouse", brand: "FRONTROW 프론트로우", href: "https://al.wconcept.co.kr/004xqc" },
          { label: "Miu Miu 언피니시드 컷 미니 스커트", brand: "Farfetch", priceKrw: 1600000, href: "https://www.farfetch.com/kr/shopping/women/miu-miu-raw-cut-mini-skirt-item-24825239.aspx" },
          { label: "릴라 플랫폼 캔버스 스니커즈", brand: "타미힐피거 슈즈", priceKrw: 51600, href: "https://s.lotteon.com/i-LqfbGqSW?ch_dtl_no=1044428" },
        ],
      },
    ],
  },
  {
    slug: "lovely-look-guide",
    category: "Fashion",
    title: "러블리 가이드: 과하지 않게, 한 끗으로 완성하는 룩 5",
    dek: "레이스·러플·리본은 한 군데에만 — 매일 입는 러블리 공식",
    intro:
      "러블리 룩이 부담스러워지는 건 사랑스러운 요소를 한꺼번에 올릴 때예요. 레이스든 러플이든 리본이든 '한 군데에만' 두고 나머지를 담백하게 비우면 매일 입어도 과하지 않습니다. AURA 홈피드의 러블리 룩 다섯 가지에서 그 한 끗을 찾아 정리했어요. 사진은 모두 AI로 생성한 화보이며, 각 룩에 쓰인 아이템은 구매처에서 바로 만나볼 수 있습니다.",
    updated: "2026년 10월",
    scene: { when: "토요일 오후 2시 · 약속 장소 가는 길", line: "거울을 한 번 더 보게 되는 날이 있습니다." },
    heroGradient: "from-brand-soft to-accent",
    image: "https://zofydqjyfzvyusbkllan.supabase.co/storage/v1/object/public/looks/268c3a60-16ad-4287-b6aa-33543261a5fd/seed-ai/1785799335092-l9dmg2.png",
    sections: [
      {
        lookId: "a3fe38c0-cd2d-4072-87f8-71244936e4d4",
        look: "서머 재킷 + 네이비 팬츠",
        body:
          "둥근 단추가 나란히 달린 크림색 반소매 재킷이 주인공이에요. 재킷을 톱처럼 단독으로 입고 네이비 와이드 팬츠 안에 넣으면, 단정하면서도 단추의 귀여움이 살아납니다. 러블리한 요소는 상의 하나로 충분하니 신발은 화이트 스니커즈로, 가방은 작은 블랙으로 담백하게 맞추세요.",
        gradient: "from-brand-soft to-accent",
        image: "https://zofydqjyfzvyusbkllan.supabase.co/storage/v1/object/public/looks/268c3a60-16ad-4287-b6aa-33543261a5fd/seed-ai/1785799335092-l9dmg2.png",
        items: [
          { label: "Verona Summer Jacket", brand: "FRONTROW 프론트로우", href: "https://al.wconcept.co.kr/liuvg5g" },
          { label: "Regular Suit Up Trousers", brand: "ALO YOGA 알로 요가", href: "https://al.wconcept.co.kr/h4dzvq" },
          { label: "NIKE MOON SHOE OG", brand: "NIKE 나이키", href: "https://al.wconcept.co.kr/8mbq0i" },
        ],
      },
      {
        lookId: "f97cdb49-fc14-4cb5-a87f-d456d1baaa12",
        look: "레이스 셔츠 + 스웨이드 미니",
        body:
          "화이트 레이스 셔츠에 브라운 스웨이드 미니 스커트를 맞췄어요. 가볍고 비치는 레이스와 도톰하고 매트한 스웨이드, 두 소재의 온도 차가 이 룩의 포인트입니다. 셔츠는 한쪽만 넣어 입어 자연스럽게 풀고, 가는 끈의 힐 샌들로 다리 선을 길게 이어 주세요.",
        gradient: "from-accent to-brand-soft",
        image: "https://zofydqjyfzvyusbkllan.supabase.co/storage/v1/object/public/looks/268c3a60-16ad-4287-b6aa-33543261a5fd/seed-ai/1783410249981-ntkzex.png",
        items: [
          { label: "레이스셔츠", brand: "Jucy Judy 쥬시쥬디", href: "https://al.wconcept.co.kr/i5kym8i" },
          { label: "인조 스웨이드 스커트", brand: "빈폴 레이디스", priceKrw: 209300, href: "https://s.lotteon.com/6AAsOG3zGK?ch_dtl_no=1044428" },
          { label: "양가죽 스퀘어 힐 샌들 6cm", brand: "바바라", priceKrw: 208000, href: "https://s.lotteon.com/-QF8-tIHyYq?ch_dtl_no=1044428" },
        ],
      },
      {
        lookId: "ab321037-3e8b-4804-bd5d-fa89fe94fbc7",
        look: "러플 티 + 와이드 데님",
        body:
          "몸에 붙는 화이트 러플 티셔츠를 블랙 와이드 데님 안에 넣어 입었어요. 위는 작게, 아래는 넉넉하게 잡은 비율 덕분에 허리가 가늘어 보입니다. 목선이 허전하다면 길이가 다른 목걸이를 겹쳐 보세요. 흑백 두 색뿐인 룩에 그 한 줄이 러블리한 한 끗이 돼요.",
        gradient: "from-brand-soft to-accent",
        image: "https://zofydqjyfzvyusbkllan.supabase.co/storage/v1/object/public/looks/268c3a60-16ad-4287-b6aa-33543261a5fd/seed-ai/1783410297340-larsrn.png",
        items: [
          { label: "러플 디테일 라운드 티셔츠", brand: "빈폴 레이디스", priceKrw: 83300, href: "https://s.lotteon.com/Fw0DR0zN9uc?ch_dtl_no=1044428" },
          { label: "와이드 뒷밴딩 데님 팬츠", brand: "빈폴 레이디스", priceKrw: 167300, href: "https://s.lotteon.com/iS3VscHK73c?ch_dtl_no=1044428" },
          { label: "02 스웨이드", brand: "캐치볼", priceKrw: 99000, href: "https://www.lotteon.com/p/product/LO2634935995?sitmNo=LO2634935995_2634935996&dp_infw_cd=MAT31805" },
        ],
      },
      {
        lookId: "6a6ae9ed-0e3b-4373-9f67-968e438f38fb",
        look: "시어 블라우스 + 리본 슈즈",
        body:
          "앞자락이 비대칭으로 떨어지는 그레이 시어 블라우스에 발목이 드러나는 블랙 팬츠를 맞춘 차분한 룩이에요. 색은 무채색으로 눌렀지만 발끝의 리본 장식 구두가 분위기를 바꿉니다. 바지 길이를 발목 위에서 끊어야 리본이 가려지지 않아요.",
        gradient: "from-accent to-brand-soft",
        image: "https://zofydqjyfzvyusbkllan.supabase.co/storage/v1/object/public/looks/268c3a60-16ad-4287-b6aa-33543261a5fd/seed-ai/1785799405224-3lfj9g.png",
        items: [
          { label: "Sheer Striped Asymmetric Placket Shirt", brand: "LOEUVRE 루에브르", href: "https://al.wconcept.co.kr/nh3hq7" },
          { label: "치노 팬츠", brand: "빈폴 레이디스", priceKrw: 139300, href: "https://s.lotteon.com/N0IuQ_0_rK?ch_dtl_no=1044428" },
          { label: "소가죽 리본 구두 4cm", brand: "바바라", priceKrw: 218000, href: "https://s.lotteon.com/GzZwcuHGpj?ch_dtl_no=1044428" },
        ],
      },
      {
        lookId: "0261d37f-bcaa-496a-ba85-ddc84658a8ff",
        look: "스트라이프 니트 + 플리츠 미니",
        body:
          "하늘색 스트라이프 니트와 카키 플리츠 미니 스커트로 입은 스쿨 룩이에요. 니트는 스커트 위로 살짝 덮이게 내려 입어 상체를 길게 잡고, 스커트 주름은 걸을 때마다 움직이게 둡니다. 신발은 레트로 러너로 골라 달콤함을 한 단계 덜어 주세요.",
        gradient: "from-brand-soft to-accent",
        image: "https://zofydqjyfzvyusbkllan.supabase.co/storage/v1/object/public/looks/268c3a60-16ad-4287-b6aa-33543261a5fd/seed-ai/1785799537847-yqh4v0.png",
        items: [
          { label: "스트라이프 케이블 풀오버", brand: "빈폴 레이디스", priceKrw: 181300, href: "https://s.lotteon.com/hD5YmmWfXiy?ch_dtl_no=1044428" },
          { label: "Miu Miu 포플린 플리츠 미니 스커트", brand: "Farfetch", priceKrw: 2350000, href: "https://www.farfetch.com/kr/shopping/women/miu-miu-poplin-pleated-miniskirt-item-35974743.aspx" },
          { label: "알파클릿 레트로 러너", brand: "타미힐피거 슈즈", priceKrw: 63600, href: "https://s.lotteon.com/EZ0v3G8Qk65?ch_dtl_no=1044428" },
        ],
      },
    ],
  },
  {
    slug: "minimal-white-pants-guide",
    category: "Fashion",
    title: "미니멀 가이드: 화이트 팬츠 한 벌로 입는 네 가지 룩",
    dek: "하의는 그대로, 상의만 바꿔 보는 미니멀 돌려 입기",
    intro:
      "미니멀 옷장은 옷이 적은 옷장이 아니라 '한 벌을 여러 번 입는' 옷장이에요. AURA 홈피드의 미니멀 룩 네 가지는 모두 같은 화이트 카펜터 팬츠에서 출발합니다. 상의의 색과 소재만 바꿨을 뿐인데 무드가 얼마나 달라지는지 비교해 보세요. 사진은 모두 AI로 생성한 화보이며, 각 룩에 쓰인 아이템은 구매처에서 바로 만나볼 수 있습니다.",
    updated: "2026년 10월",
    scene: { when: "월요일 아침 7시 · 옷장 앞", line: "생각이 많은 날엔, 옷이라도 덜어내고 싶습니다." },
    heroGradient: "from-accent to-brand-soft",
    image: "https://zofydqjyfzvyusbkllan.supabase.co/storage/v1/object/public/looks/268c3a60-16ad-4287-b6aa-33543261a5fd/seed-ai/1785799200923-ugcc2b.png",
    sections: [
      {
        lookId: "a579b309-39b6-462e-9b00-525d2bf43f89",
        look: "그레이 퍼프 재킷",
        body:
          "어깨에 볼륨이 들어간 그레이 반소매 재킷을 화이트 팬츠와 맞췄어요. 허리선에서 살짝 퍼지는 재킷 밑단이 상체를 짧게, 다리를 길게 보이게 합니다. 색은 회색과 흰색 둘뿐이니 신발도 굽이 있는 뉴트럴 샌들로 톤을 이어 주세요.",
        gradient: "from-accent to-brand-soft",
        image: "https://zofydqjyfzvyusbkllan.supabase.co/storage/v1/object/public/looks/268c3a60-16ad-4287-b6aa-33543261a5fd/seed-ai/1785799200923-ugcc2b.png",
        items: [
          { label: "플레어 핀턱 퍼프 반팔 카라 자켓", brand: "롯데ON", priceKrw: 62300, href: "https://www.lotteon.com/p/product/LO2673711087?sitmNo=LO2673711087_2673711088&mall_no=1&dp_infw_cd=SCH%255Ecpc_sad%255E%25ED%258C%25A8%25EC%2585%2598&areaCode=AD_SAD&entryPoint=ad&clickId=S146245250829" },
          { label: "데님 카펜터 팬츠", brand: "빈폴 레이디스", priceKrw: 111300, href: "https://s.lotteon.com/9zH8KiQi-0?ch_dtl_no=1044428" },
          { label: "샌들 6cm", brand: "엠미소페", priceKrw: 149000, href: "https://s.lotteon.com/j46qAMNYus?ch_dtl_no=1044428" },
        ],
      },
      {
        lookId: "efb69c47-fa09-4962-aac2-49a6a706470f",
        look: "올 화이트 타이 블라우스",
        body:
          "위아래를 모두 화이트로 맞춘 원 컬러 룩이에요. 같은 흰색이라도 블라우스는 매끈하고 팬츠는 도톰해서 밋밋하지 않습니다. 가는 블랙 벨트 한 줄이 허리 위치를 알려 주고, 길게 늘어뜨린 타이가 세로선을 만들어 줘요.",
        gradient: "from-brand-soft to-accent",
        image: "https://zofydqjyfzvyusbkllan.supabase.co/storage/v1/object/public/looks/268c3a60-16ad-4287-b6aa-33543261a5fd/seed-ai/1783410518884-oat4cq.png",
        items: [
          { label: "Collar Silky Blouse", brand: "FRONTROW 프론트로우", href: "https://al.wconcept.co.kr/004xqc" },
          { label: "데님 카펜터 팬츠", brand: "빈폴 레이디스", priceKrw: 111300, href: "https://s.lotteon.com/9zH8KiQi-0?ch_dtl_no=1044428" },
          { label: "샌들 6cm", brand: "엠미소페", priceKrw: 149000, href: "https://s.lotteon.com/j46qAMNYus?ch_dtl_no=1044428" },
        ],
      },
      {
        lookId: "589586f7-6231-4aa3-85b3-5319592fad0e",
        look: "차콜 드레이프 블라우스",
        body:
          "주름이 흐르는 차콜 블라우스를 올리면 같은 팬츠가 한결 도시적으로 바뀝니다. 짙은 상의와 밝은 하의의 대비가 분명해서 액세서리 없이도 완성돼 보여요. 블라우스 자락은 팬츠 밖으로 자연스럽게 흘려 드레이프를 살리고, 신발은 낮은 러너로 편하게 맞추세요.",
        gradient: "from-accent to-brand-soft",
        image: "https://zofydqjyfzvyusbkllan.supabase.co/storage/v1/object/public/looks/268c3a60-16ad-4287-b6aa-33543261a5fd/seed-ai/1785799251335-3euhgy.png",
        items: [
          { label: "Double Draped Scarf Blouse", brand: "ourcomos 아워코모스", href: "https://al.wconcept.co.kr/tj0eu3" },
          { label: "데님 카펜터 팬츠", brand: "빈폴 레이디스", priceKrw: 111300, href: "https://s.lotteon.com/9zH8KiQi-0?ch_dtl_no=1044428" },
          { label: "알파클릿 레트로 러너", brand: "타미힐피거 슈즈", priceKrw: 63600, href: "https://s.lotteon.com/EZ0v3G8Qk65?ch_dtl_no=1044428" },
        ],
      },
      {
        lookId: "1d4260f8-6a8c-4c7c-baaf-8976cb02697b",
        look: "스트라이프 니트 + 로퍼",
        body:
          "가장 편한 버전은 스트라이프 니트예요. 흰 팬츠가 줄무늬의 바탕색을 이어받아 위아래가 한 벌처럼 이어집니다. 여기에 브라운 태슬 로퍼를 신으면 주말 룩이 출근길에도 어울리는 단정함을 얻어요.",
        gradient: "from-brand-soft to-accent",
        image: "https://zofydqjyfzvyusbkllan.supabase.co/storage/v1/object/public/looks/268c3a60-16ad-4287-b6aa-33543261a5fd/seed-ai/1785799228282-eczhfj.png",
        items: [
          { label: "스트라이프 케이블 풀오버", brand: "빈폴 레이디스", priceKrw: 181300, href: "https://s.lotteon.com/hD5YmmWfXiy?ch_dtl_no=1044428" },
          { label: "데님 카펜터 팬츠", brand: "빈폴 레이디스", priceKrw: 111300, href: "https://s.lotteon.com/9zH8KiQi-0?ch_dtl_no=1044428" },
          { label: "여성 태슬 레더 로퍼", brand: "핏플랍", priceKrw: 199200, href: "https://s.lotteon.com/6ipAWvw9xtr?ch_dtl_no=1044428" },
        ],
      },
    ],
  },
];

export function findGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function guidesByCategory(cat: Guide["category"]): Guide[] {
  return GUIDES.filter((g) => g.category === cat);
}
