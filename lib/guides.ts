// AURA 랜딩 — 에디토리얼 스타일 가이드(콘텐츠 SSOT).
// 목적: auraootd.com을 "얇은 랜딩"에서 실제 오리지널 콘텐츠 사이트로. 어필리에이트 어그리게이터(Skimlinks/
// Sovrn) 재심사 적합성 + SEO. 각 가이드는 도입부 + 룩별 스타일링 팁 + 따라사기 아이템(아웃링크)을 가진다.

export type GuideItem = {
  label: string;
  brand: string;
  priceKrw?: number;
  /** 구매처 링크(아웃링크 — rel=sponsored). */
  href: string;
};

export type GuideSection = {
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
  sections: GuideSection[];
};

function photo(id: string): string {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=70`;
}

export const GUIDES: Guide[] = [
  {
    slug: "winter-coordi-guide",
    category: "Fashion",
    title: "겨울 코디 가이드: 레이어드로 완성하는 데일리 룩 5",
    dek: "추위는 막고 비율은 살리는, 따라 하기 쉬운 겨울 코디 공식",
    intro:
      "겨울 코디의 핵심은 '부피와 실루엣의 균형'이에요. 두꺼운 아우터 안에 무엇을, 어떻게 레이어드하느냐에 따라 같은 옷도 완전히 다른 무드가 됩니다. AURA 에디터가 매일 입기 좋은 겨울 룩 다섯 가지를 코디 팁과 함께 정리했어요. 각 아이템은 바로 구매처에서 만나볼 수 있습니다.",
    updated: "2026년 6월",
    heroGradient: "from-brand-soft to-accent",
    image: photo("1483985988355-763728e1935b"),
    sections: [
      {
        look: "데일리 캐주얼 코트 룩",
        body:
          "오버사이즈 코트는 안에 니트를 레이어드해 부피를 살리고, 하의는 슬림하게 떨어뜨려 실루엣 균형을 잡으세요. 머플러는 코트 안쪽으로 넣어 포인트만 살짝 주면 깔끔합니다. 발목이 드러나는 길이의 팬츠에 첼시 부츠를 매치하면 다리가 길어 보여요.",
        gradient: "from-brand-soft to-accent",
        image: photo("1539109136881-3be0616acf4b"),
        items: [
          { label: "오버핏 울 코트", brand: "W컨셉", priceKrw: 139000, href: "https://www.wconcept.co.kr/Product/301010101" },
          { label: "크림 라운드 니트", brand: "G마켓", priceKrw: 32900, href: "https://item.gmarket.co.kr/Item?goodscode=2010101010" },
          { label: "첼시 앵클 부츠", brand: "W컨셉", priceKrw: 89000, href: "https://www.wconcept.co.kr/Product/301010102" },
        ],
      },
      {
        look: "레이어드 니트 스타일",
        body:
          "얇은 터틀넥 위에 카디건을 겹쳐 톤온톤으로 연출해 보세요. 같은 계열 색을 명도만 다르게 쓰면 한결 세련돼 보입니다. 니트 소재가 겹칠 땐 안쪽은 얇고 매끈하게, 바깥은 도톰하게 두어 부피감을 조절하는 게 포인트예요.",
        gradient: "from-accent to-brand-soft",
        image: photo("1485968579580-b6d095142e6e"),
        items: [
          { label: "베이직 터틀넥", brand: "G마켓", priceKrw: 19900, href: "https://item.gmarket.co.kr/Item?goodscode=2010101011" },
          { label: "울 블렌드 카디건", brand: "W컨셉", priceKrw: 78000, href: "https://www.wconcept.co.kr/Product/301010103" },
        ],
      },
      {
        look: "미니멀 모노톤 코디",
        body:
          "블랙·그레이·화이트 세 가지 색 안에서 소재 대비(니트·레더·울)로 단조로움을 깨면 미니멀해도 지루하지 않아요. 레더 자켓처럼 광택이 있는 소재 하나만 섞어도 전체 룩에 입체감이 생깁니다.",
        gradient: "from-brand-soft to-accent",
        image: photo("1483118714900-540cf339fd46"),
        items: [
          { label: "레더 자켓", brand: "W컨셉", priceKrw: 159000, href: "https://www.wconcept.co.kr/Product/301010104" },
          { label: "와이드 슬랙스", brand: "G마켓", priceKrw: 39900, href: "https://item.gmarket.co.kr/Item?goodscode=2010101012" },
        ],
      },
      {
        look: "포인트 머플러 활용법",
        body:
          "무채색 코디엔 채도 높은 머플러 하나로 포인트를 주세요. 묶지 말고 길게 늘어뜨리면 세로선이 강조돼 키가 커 보입니다. 코트와 머플러 색을 보색으로 매치하면 사진에서 훨씬 화사하게 나와요.",
        gradient: "from-accent to-brand-soft",
        image: photo("1509631179647-0177331693ae"),
        items: [
          { label: "램스울 머플러", brand: "W컨셉", priceKrw: 45000, href: "https://www.wconcept.co.kr/Product/301010105" },
          { label: "핸드메이드 코트", brand: "W컨셉", priceKrw: 219000, href: "https://www.wconcept.co.kr/Product/301010106" },
        ],
      },
      {
        look: "겨울 데이트 룩",
        body:
          "니트 원피스에 롱부츠로 다리 라인을 길게 강조하세요. 코트는 입지 말고 어깨에 살짝 걸쳐 무드를 더하면 데이트룩으로 완벽합니다. 가방은 작고 구조감 있는 것으로 골라 전체 실루엣을 정돈해 주세요.",
        gradient: "from-brand-soft to-accent",
        image: photo("1496217590455-aa63a8350eea"),
        items: [
          { label: "니트 원피스", brand: "W컨셉", priceKrw: 69000, href: "https://www.wconcept.co.kr/Product/301010107" },
          { label: "롱 부츠", brand: "G마켓", priceKrw: 79000, href: "https://item.gmarket.co.kr/Item?goodscode=2010101013" },
        ],
      },
    ],
  },
  {
    slug: "daily-office-look-guide",
    category: "Fashion",
    title: "데일리 오피스룩 가이드: 단정하면서 편한 출근 코디 5",
    dek: "정장은 부담스럽고 캐주얼은 어정쩡할 때, 딱 맞는 세미 오피스 공식",
    intro:
      "매일 입는 출근룩일수록 '단정함과 편안함'의 균형이 중요해요. 너무 격식 차리면 부담스럽고, 너무 풀어지면 신뢰감이 떨어집니다. AURA가 어떤 회사 분위기에도 무난하게 어울리는 세미 오피스 코디 다섯 가지를 정리했어요.",
    updated: "2026년 6월",
    heroGradient: "from-accent to-brand-soft",
    image: photo("1487222477894-8943e31ef7b2"),
    sections: [
      {
        look: "깔끔한 셋업 정장 룩",
        body:
          "셋업은 같은 원단의 상하의로 통일감을 주는 게 기본이에요. 안에 실크 블라우스를 넣어 딱딱함을 덜고, 굽이 낮은 펌프스로 마무리하면 하루 종일 편하면서도 프로페셔널해 보입니다.",
        gradient: "from-accent to-brand-soft",
        image: photo("1496747611176-843222e1e57c"),
        items: [
          { label: "테일러드 셋업", brand: "W컨셉", priceKrw: 159000, href: "https://www.wconcept.co.kr/Product/302010101" },
          { label: "실크 블라우스", brand: "G마켓", priceKrw: 49000, href: "https://item.gmarket.co.kr/Item?goodscode=2020101010" },
        ],
      },
      {
        look: "니트 + 슬랙스 세미캐주얼",
        body:
          "폭이 있는 슬랙스에 슬림한 니트를 매치해 상하 볼륨을 대비시키면 비율이 살아납니다. 허리선에 얇은 벨트를 더하면 라인이 한층 또렷해져요. 색은 톤다운된 뉴트럴 컬러로 맞추면 실패가 없습니다.",
        gradient: "from-brand-soft to-accent",
        image: photo("1469334031218-e382a71b716b"),
        items: [
          { label: "슬림 골지 니트", brand: "G마켓", priceKrw: 29900, href: "https://item.gmarket.co.kr/Item?goodscode=2020101011" },
          { label: "와이드 슬랙스", brand: "W컨셉", priceKrw: 59000, href: "https://www.wconcept.co.kr/Product/302010102" },
        ],
      },
      {
        look: "블레이저 레이어드",
        body:
          "오버사이즈 블레이저는 소매를 한 번 접어 손목을 보이게 하면 답답하지 않아요. 안엔 베이직 티셔츠로 힘을 빼고, 하의만 깔끔하게 잡아주면 격식과 편안함을 동시에 챙길 수 있습니다.",
        gradient: "from-accent to-brand-soft",
        image: photo("1457972729786-0411a3b2b626"),
        items: [
          { label: "오버핏 블레이저", brand: "W컨셉", priceKrw: 119000, href: "https://www.wconcept.co.kr/Product/302010103" },
          { label: "코튼 베이직 티", brand: "G마켓", priceKrw: 15900, href: "https://item.gmarket.co.kr/Item?goodscode=2020101012" },
        ],
      },
      {
        look: "셔츠 원피스 한 벌 룩",
        body:
          "고민될 땐 한 벌로 끝나는 셔츠 원피스가 정답이에요. 벨트로 허리만 잡아주면 단정하면서 편한 데일리 오피스룩이 완성됩니다. 봄·가을 간절기에 특히 활용도가 높아요.",
        gradient: "from-brand-soft to-accent",
        image: photo("1522335789203-aabd1fc54bc9"),
        items: [
          { label: "셔츠 원피스", brand: "W컨셉", priceKrw: 89000, href: "https://www.wconcept.co.kr/Product/302010104" },
          { label: "레더 벨트", brand: "G마켓", priceKrw: 19900, href: "https://item.gmarket.co.kr/Item?goodscode=2020101013" },
        ],
      },
      {
        look: "금요일 캐주얼 데이",
        body:
          "데님에 니트로 힘을 빼되, 구조감 있는 가방과 로퍼로 오피스 무드는 유지하세요. 캐주얼 데이라도 신발과 가방만 단정하면 전체 룩이 흐트러지지 않습니다.",
        gradient: "from-accent to-brand-soft",
        image: photo("1503236823255-94609f598e71"),
        items: [
          { label: "스트레이트 데님", brand: "G마켓", priceKrw: 42000, href: "https://item.gmarket.co.kr/Item?goodscode=2020101014" },
          { label: "클래식 로퍼", brand: "W컨셉", priceKrw: 79000, href: "https://www.wconcept.co.kr/Product/302010105" },
        ],
      },
    ],
  },
  {
    slug: "spring-date-look-guide",
    category: "Fashion",
    title: "봄 데이트룩 가이드: 러블리하게, 부담 없이 5",
    dek: "화사한 봄날에 어울리는 데이트 코디와 스타일링 팁",
    intro:
      "봄 데이트룩의 키워드는 '화사함과 가벼움'이에요. 무거운 겨울 옷을 벗고 파스텔·플로럴로 분위기를 환기하되, 과하지 않게 한 끗만 더하는 게 포인트입니다. AURA가 봄에 입기 좋은 데이트 코디 다섯 가지를 모았어요.",
    updated: "2026년 6월",
    heroGradient: "from-brand-soft to-accent",
    image: photo("1492707892479-7bc8d5a4ee93"),
    sections: [
      {
        look: "플로럴 원피스 룩",
        body:
          "잔잔한 플로럴 원피스엔 가디건을 어깨에 걸쳐 러블리함을 더하세요. 신발은 메리제인이나 발레플랫으로 골라 발끝까지 사랑스럽게 마무리하면 봄 데이트룩으로 완벽합니다.",
        gradient: "from-brand-soft to-accent",
        image: photo("1485462537746-965f33f7f6a7"),
        items: [
          { label: "플로럴 미디 원피스", brand: "W컨셉", priceKrw: 79000, href: "https://www.wconcept.co.kr/Product/303010101" },
          { label: "메리제인 플랫", brand: "G마켓", priceKrw: 35900, href: "https://item.gmarket.co.kr/Item?goodscode=2030101010" },
        ],
      },
      {
        look: "파스텔 가디건 코디",
        body:
          "파스텔 가디건은 화이트·아이보리 하의와 매치해 화사하게 연출하세요. 단추는 위쪽만 잠가 레이어링 느낌을 주면 한층 멋스럽습니다. 채도가 낮은 파스텔끼리 매치하면 어디에도 무난하게 어울려요.",
        gradient: "from-accent to-brand-soft",
        image: photo("1512496015851-a90fb38ba796"),
        items: [
          { label: "파스텔 크롭 가디건", brand: "W컨셉", priceKrw: 49000, href: "https://www.wconcept.co.kr/Product/303010102" },
          { label: "플리츠 미디 스커트", brand: "G마켓", priceKrw: 32900, href: "https://item.gmarket.co.kr/Item?goodscode=2030101011" },
        ],
      },
      {
        look: "데님 + 블라우스 룩",
        body:
          "볼륨 있는 블라우스는 하이웨이스트 데님에 넣어 입어 비율을 살리세요. 봄 데일리의 정석 같은 조합으로, 가볍게 산책하는 데이트에 잘 어울립니다.",
        gradient: "from-brand-soft to-accent",
        image: photo("1469334031218-e382a71b716b"),
        items: [
          { label: "퍼프 블라우스", brand: "W컨셉", priceKrw: 45000, href: "https://www.wconcept.co.kr/Product/303010103" },
          { label: "하이웨이스트 데님", brand: "G마켓", priceKrw: 39900, href: "https://item.gmarket.co.kr/Item?goodscode=2030101012" },
        ],
      },
      {
        look: "미니 스커트 봄 룩",
        body:
          "미니 스커트엔 발목 양말과 로퍼로 레트로 무드를 더해 보세요. 상의는 크롭 니트로 다리 라인을 강조하면 발랄하면서도 비율이 좋아 보입니다.",
        gradient: "from-accent to-brand-soft",
        image: photo("1539109136881-3be0616acf4b"),
        items: [
          { label: "크롭 니트", brand: "G마켓", priceKrw: 24900, href: "https://item.gmarket.co.kr/Item?goodscode=2030101013" },
          { label: "A라인 미니 스커트", brand: "W컨셉", priceKrw: 38000, href: "https://www.wconcept.co.kr/Product/303010104" },
        ],
      },
      {
        look: "벚꽃 피크닉 룩",
        body:
          "피크닉엔 편한 코튼 원피스와 캔버스 백이 제격이에요. 카디건 한 장을 챙겨 일교차에 대비하면 해 질 녘까지 편하게 즐길 수 있습니다.",
        gradient: "from-brand-soft to-accent",
        image: photo("1496747611176-843222e1e57c"),
        items: [
          { label: "코튼 셔츠 원피스", brand: "W컨셉", priceKrw: 59000, href: "https://www.wconcept.co.kr/Product/303010105" },
          { label: "캔버스 토트백", brand: "G마켓", priceKrw: 22900, href: "https://item.gmarket.co.kr/Item?goodscode=2030101014" },
        ],
      },
    ],
  },
  {
    slug: "daily-base-makeup-guide",
    category: "Beauty",
    title: "데일리 베이스 메이크업 가이드: 물광 피부 만드는 4단계",
    dek: "두껍지 않게, 무너지지 않게 — 매일 쓰는 베이스 루틴",
    intro:
      "좋은 베이스는 '얇게 발리고 오래 가는 것'이에요. 두껍게 덮을수록 시간이 지나면 무너지기 쉽습니다. 피부 결을 정돈하는 스킨케어부터 톤업, 픽싱까지 — 매일 따라 하기 좋은 물광 베이스 4단계를 정리했어요.",
    updated: "2026년 6월",
    heroGradient: "from-brand-soft to-accent",
    image: photo("1522335789203-aabd1fc54bc9"),
    sections: [
      {
        look: "1단계 — 수분 진정 토너 패드",
        body:
          "메이크업 전 피부 결을 정돈하는 게 물광의 시작이에요. 자극 없는 토너 패드로 가볍게 닦아내듯 정리하면 이후 베이스가 훨씬 매끈하게 밀착됩니다.",
        gradient: "from-brand-soft to-accent",
        image: photo("1496217590455-aa63a8350eea"),
        items: [
          { label: "수분 진정 토너 패드", brand: "G마켓", priceKrw: 16900, href: "https://item.gmarket.co.kr/Item?goodscode=2040101010" },
        ],
      },
      {
        look: "2단계 — 톤업 선크림",
        body:
          "백탁 없이 가볍게 발리는 톤업 선크림으로 자외선 차단과 톤 보정을 한 번에 하세요. 너무 많이 바르면 밀리기 쉬우니 한 번에 펌핑 한 번, 얇게 펴 바르는 게 핵심입니다.",
        gradient: "from-accent to-brand-soft",
        image: photo("1457972729786-0411a3b2b626"),
        items: [
          { label: "데일리 톤업 선크림 SPF50+", brand: "G마켓", priceKrw: 19900, href: "https://item.gmarket.co.kr/Item?goodscode=2040101011" },
        ],
      },
      {
        look: "3단계 — 글로우 쿠션",
        body:
          "쿠션은 얼굴 안쪽에서 바깥으로 펴 발라 자연스러운 광채를 살리세요. 잡티가 신경 쓰이는 부위만 한 번 더 톡톡 얹으면 두껍지 않게 커버됩니다.",
        gradient: "from-brand-soft to-accent",
        image: photo("1584917865442-de89df76afd3"),
        items: [
          { label: "글로우 쿠션 팩트", brand: "클리오", priceKrw: 24000, href: "https://clubclio.co.kr/product/detail.html?product_no=1001" },
        ],
      },
      {
        look: "4단계 — 립 앤 치크 틴트",
        body:
          "마지막으로 립과 볼에 같은 틴트를 소량 발라 혈색을 더하면 생기 있는 데일리 메이크업이 완성돼요. 하나로 두 곳을 마무리하면 통일감도 좋고 휴대도 간편합니다.",
        gradient: "from-accent to-brand-soft",
        image: photo("1512496015851-a90fb38ba796"),
        items: [
          { label: "립 앤 치크 멀티 틴트", brand: "클리오", priceKrw: 12900, href: "https://clubclio.co.kr/product/detail.html?product_no=1002" },
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
