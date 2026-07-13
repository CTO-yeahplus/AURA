/**
 * lib/legalContent — AURA 법적 문서(약관·개인정보·커뮤니티 가이드라인) 한/영 구조화 콘텐츠.
 * 스토어 제출용 공개 URL(/privacy · /terms · /community-guidelines)에서 LegalArticle로 렌더.
 * 앱(aura-app/src/features/legal/legalContent.ts)과 의미상 동일하게 유지.
 */
export type Sec = { h: string; p?: string[]; b?: string[] };

export const LEGAL_META = {
  company: "주식회사 예아플러스(YEAHPLUS Inc.)",
  app: "AURA",
  contact: "contact@yeahplus.co.kr",
  effectiveKo: "시행일 2026년 7월 1일 · 최종 수정 2026년 7월 13일",
  effectiveEn: "Effective July 1, 2026 · Last updated July 13, 2026",
};

export const PRIVACY: { ko: Sec[]; en: Sec[] } = {
  ko: [
    {
      h: "",
      p: [
        '주식회사 예아플러스(이하 "회사")는 AURA 서비스(이하 "서비스") 이용자의 개인정보를 소중히 다루며, 「개인정보 보호법」 등 국내 법령과 적용 가능한 해외 법령(GDPR·CCPA 등)을 준수합니다. 본 방침은 auraootd.com 웹사이트 및 AURA 앱에 적용됩니다.',
      ],
    },
    {
      h: "1. 수집하는 개인정보",
      b: [
        "계정: 이메일, 소셜 로그인 식별자(Apple·Google·Kakao), 닉네임·아바타·소개.",
        "활동·콘텐츠: 올린 룩 사진·캡션·태그, 위시·컬렉션·좋아요·댓글·팔로우, 취향 태그.",
        "커머스: 따라사기 클릭·아웃링크 이벤트(어트리뷰션 식별자), 구독 상태·인앱결제(구독·소비성 크레딧) 상태·결제 플랫폼 정보(카드·계좌 번호는 수집하지 않음).",
        "AI 생성·크레딧: 회원이 화보 생성에 사용한 입력 이미지·텍스트, 생성 크레딧의 지급·사용·구매 내역(원장).",
        "자동 수집: 기기 정보(OS·모델, 익명화), 접속·이용 로그, 앱 사용 통계, 오류 로그, 푸시 알림 토큰.",
      ],
    },
    {
      h: "2. 이용 목적",
      b: [
        "회원 인증 및 서비스 제공·운영, 취향 기반 피드·추천 개인화.",
        "따라사기 연결 및 제휴 수익 어트리뷰션·정산.",
        "구독·인앱결제 및 생성 크레딧 지급·차감·부정사용 방지 관리.",
        "안전·신고·콘텐츠 모더레이션 및 부정 이용 방지.",
        "서비스 품질 개선, 오류 분석, 통계, 법령상 의무 이행.",
      ],
    },
    {
      h: "3. 처리위탁 및 제3자 제공",
      p: ["회사는 동의 없이 개인정보를 판매하지 않으며, 서비스 운영을 위해 아래 업체에 처리를 위탁합니다(일부 국외 소재)."],
      b: [
        "Supabase Inc. — 인증·데이터베이스·파일 스토리지(미국 등).",
        "Apple Inc. / Google LLC — 인앱 구독·결제 처리.",
        "푸시·분석·오류 모니터링 제공업체 — 알림 발송, 익명 사용 통계, 크래시 분석.",
        "AI 생성 처리업체(OpenAI·Google 등) — AI 생성 시 입력 이미지·텍스트 처리.",
        "제휴 네트워크(LinkPrice·쿠팡 파트너스 등) — 따라사기 클릭·주문 어트리뷰션(개인식별정보가 아닌 클릭/주문 식별자).",
      ],
    },
    { h: "4. 국외 이전", p: ["글로벌 서비스 제공을 위해 처리업체가 위치한 국가(미국 등)로 개인정보가 이전·저장·처리될 수 있으며, 회사는 적정한 보호조치를 적용합니다."] },
    {
      h: "5. 보유 및 파기",
      b: [
        "회원 탈퇴 시: 법령상 보존 의무가 없는 개인정보는 지체 없이 파기(앱 내 직접 탈퇴 가능).",
        "접속·이용 로그: 관련 법령·보안 목적 범위에서 보관 후 파기.",
        "결제·거래 기록: 전자상거래 등 관련 법령이 정한 기간 보관 가능.",
      ],
    },
    { h: "6. 이용자의 권리", p: ["이용자는 열람·정정·삭제·처리정지·데이터 이동을 요청하고 동의를 철회할 수 있습니다. GDPR·CCPA 대상자는 해당 법령상 권리(접근·삭제·판매 거부 등)를 행사할 수 있습니다."] },
    { h: "7. 아동·청소년 보호", p: ["본 서비스는 만 14세 미만에게 제공되지 않으며, 만 18세 미만에게는 안전 기본값이 적용됩니다."] },
    { h: "8. 안전 조치 및 쿠키", p: ["전송 구간 암호화, 접근 권한 통제, 비밀키 서버 측 분리 보관 등 합리적 보호조치를 적용합니다. 웹사이트는 기능·분석을 위해 쿠키 또는 유사 기술을 사용할 수 있으며 브라우저 설정으로 거부할 수 있습니다."] },
    { h: "9. 보호책임자 및 개정", p: [`개인정보 보호책임자: AURA 개인정보팀 · ${LEGAL_META.contact} · 대한민국. 변경 시 본 페이지 또는 앱 내 공지로 사전 안내합니다.`] },
  ],
  en: [
    {
      h: "",
      p: [
        'YEAHPLUS Inc. ("Company") values the personal data of users of the AURA service ("Service") and complies with Korea\'s Personal Information Protection Act and applicable laws abroad (GDPR, CCPA, etc.). This policy applies to the auraootd.com website and the AURA app.',
      ],
    },
    {
      h: "1. Information We Collect",
      b: [
        "Account: email, social login identifiers (Apple/Google/Kakao), nickname, avatar, bio.",
        "Activity & content: uploaded look photos, captions, tags, wishes, collections, likes, comments, follows, taste tags.",
        "Commerce: shop-the-look click/outlink events (attribution identifiers), subscription and in-app purchase (subscription/consumable credit) status, payment-platform info (we do not collect card or bank numbers).",
        "AI generation & credits: input images/text you provide to the AI photo feature, and grant/use/purchase history of generation credits (ledger).",
        "Automatically collected: device info (OS/model, anonymized), access/usage logs, app analytics, error logs, push notification token.",
      ],
    },
    {
      h: "2. Purpose of Use",
      b: [
        "Authentication, service delivery, and taste-based feed/recommendation personalization.",
        "Shop-the-look routing and affiliate attribution/settlement.",
        "Subscription, in-app purchase, and generation-credit grant/deduction and abuse prevention.",
        "Safety, reporting, content moderation, and abuse prevention.",
        "Quality improvement, error analysis, statistics, and legal compliance.",
      ],
    },
    {
      h: "3. Processing & Third Parties",
      p: ["We do not sell personal data. We entrust processing to the following providers (some located overseas)."],
      b: [
        "Supabase Inc. — authentication, database, file storage (US, etc.).",
        "Apple Inc. / Google LLC — in-app subscription and payment processing.",
        "Push, analytics, and error-monitoring providers — delivery, anonymous usage stats, crash analysis.",
        "AI generation providers (OpenAI, Google, etc.) — processing of input images/text during AI generation.",
        "Affiliate networks (LinkPrice, Coupang Partners, etc.) — click/order attribution (click/order identifiers, not personal identifiers).",
      ],
    },
    { h: "4. International Transfer", p: ["To provide a global service, personal data may be transferred to and processed in countries where our providers operate (e.g., the US), with appropriate safeguards."] },
    {
      h: "5. Retention & Disposal",
      b: [
        "On account deletion: data with no legal retention requirement is deleted promptly (in-app deletion available).",
        "Access/usage logs: retained for security and legal purposes, then deleted.",
        "Payment/transaction records: retained for periods required by applicable law.",
      ],
    },
    { h: "6. Your Rights", p: ["You may request access, correction, deletion, suspension of processing, and data portability, and may withdraw consent. GDPR/CCPA-covered users may exercise their statutory rights (access, deletion, opt-out of sale, etc.)."] },
    { h: "7. Protection of Minors", p: ["The Service is not provided to users under 14; safety defaults apply to users under 18."] },
    { h: "8. Security & Cookies", p: ["We apply reasonable safeguards including in-transit encryption, access controls, and server-side isolation of secrets. The website may use cookies or similar technologies for functionality and analytics, which can be declined via browser settings."] },
    { h: "9. Officer & Changes", p: [`Data Protection Officer: AURA Privacy Team · ${LEGAL_META.contact} · Republic of Korea. Material changes are announced in advance on this page or in the app.`] },
  ],
};

export const TERMS: { ko: Sec[]; en: Sec[] } = {
  ko: [
    { h: "제1조 (목적)", p: ['본 약관은 주식회사 예아플러스(이하 "회사")가 제공하는 패션·뷰티 콘텐츠 및 커머스 연결 서비스 "AURA"(이하 "서비스")의 이용 조건·절차와 회사·회원 간 권리·의무 및 책임을 규정합니다.'] },
    {
      h: "제2조 (정의)",
      b: [
        "룩(Look): 코디·뷰티 사진과 설명·태그·연결 상품의 묶음.",
        "따라사기(아웃링크): 룩에 연결된 외부 판매처로 이동하는 제휴(어필리에이트) 링크.",
        "에셋: 프리셋(LUT)·템플릿·룩북 등 디지털 상품.",
        "AURA+/AURA+ Pro: 자동 갱신 유료 구독 멤버십.",
        "생성 크레딧: AI 화보 생성에 사용하는 크레딧. 소비성 인앱상품으로 구매하는 '구매 크레딧'과 구독에 포함되어 매월 지급되는 '무료 크레딧'으로 구분됩니다.",
        "크리에이터: 따라사기 등으로 수익을 받을 수 있는 자격을 갖춘 회원.",
      ],
    },
    {
      h: "제3조 (서비스 내용)",
      b: [
        "취향 기반 룩 피드·발견, 위시·컬렉션, 검색·태그 탐색.",
        "외부 판매처에서 구매할 수 있는 따라사기 아웃링크(제7조).",
        "AI 화보 이미지·문구 생성 등 제작 보조(생성 크레딧 사용, 제8조).",
        "프리셋·템플릿·룩북 등 1회 결제 영구 이용 상품.",
        "AURA+/AURA+ Pro 구독 혜택과 크리에이터 수익화 자격.",
      ],
    },
    {
      h: "제4조 (회원가입 및 자격)",
      b: [
        "이메일 또는 Apple·Google·Kakao 등으로 가입.",
        "만 14세 미만 가입 불가, 만 18세 미만 안전 기본값 적용.",
        "정확한 정보 제공, 타인 계정·정보 도용 금지.",
        "앱 내 직접 탈퇴 가능(법령상 보존 의무 외 데이터 삭제).",
      ],
    },
    {
      h: "제5조 (구독·인앱결제 및 생성 크레딧)",
      b: [
        "월간·연간 자동 갱신, 결제는 App Store·Google Play 처리.",
        "만료 약 24시간 전 자동 청구, 미해지 시 자동 갱신.",
        "해지·관리·환불은 각 스토어 메뉴/정책에 따름.",
        "업그레이드는 즉시(잔여 비례정산 가능), 다운그레이드는 다음 갱신부터 적용될 수 있음.",
        "에셋 영구 상품은 1회 결제로 계정에서 계속 이용.",
        "생성 크레딧은 소비성 인앱상품으로 충전하며, 구매한 크레딧은 소멸(만료)되지 않습니다(환불 불가, 각 스토어 정책 우선).",
        "AURA+ Pro 구독에는 매월 무료 생성 크레딧이 포함됩니다. 무료 크레딧은 지급된 달에만 사용할 수 있고 미사용분은 매월 초 소멸되며(이월 없음), 생성 시 무료 크레딧이 구매 크레딧보다 먼저 차감됩니다.",
        "신규 회원에게 최초 1회에 한해 무료 체험 크레딧이 제공될 수 있습니다.",
        "가격·구성·크레딧 지급량 변경은 사전 고지 후 차기 결제 주기부터 적용.",
      ],
    },
    {
      h: "제6조 (회원 콘텐츠와 라이선스)",
      b: [
        "회원 콘텐츠의 저작권은 회원에게 귀속.",
        "공개 설정 콘텐츠는 서비스 운영·노출·홍보·기능 제공을 위한 전 세계적·비독점적·무상 이용권을 회사에 부여.",
        "타인의 저작권·초상권·상표권 비침해를 보증.",
        "회사는 신고·심사·법령·약관 위반 시 비노출·삭제 가능.",
      ],
    },
    {
      h: "제7조 (따라사기·제휴 마케팅 고지)",
      b: [
        "따라사기는 제휴 링크이며, 회사는 구매에 대해 수수료를 받을 수 있음.",
        "제휴 수수료는 상품 가격을 인상시키지 않음.",
        "회사는 통신판매중개자로서 통신판매의 당사자가 아니며, 판매·가격·재고·배송·교환·환불·품질·안전 책임은 외부 판매처에 있음.",
        "앱·웹에 표시되는 가격·할인·재고 등 상품 정보는 수집 시점 기준의 참고 정보로 실제 판매처와 다를 수 있으며(수집 지연·오류·품절 등으로 0원 등 부정확하게 표시될 수 있음), 최종 가격·재고·구매 조건은 구매(판매) 사이트에서 직접 확인해야 함. 회사는 표시 정보의 정확성을 보증하지 않음.",
        "외부 판매처 정책 변경·링크 만료·품절·표시 정보와 실제 정보의 차이로 인한 손해에 회사는 책임지지 않음.",
      ],
    },
    {
      h: "제8조 (AI 생성 콘텐츠)",
      b: [
        "일부 콘텐츠는 AI로 생성·보정될 수 있음.",
        "AI 결과물은 실제 제품·인물·사실과 다를 수 있고 정확성을 보증하지 않음.",
        "AI 기능 이용 시 입력 이미지·텍스트가 AI 처리업체로 전송될 수 있음.",
        "AI로 타인의 권리 침해·약관 위반 콘텐츠 생성·게시 금지.",
      ],
    },
    {
      h: "제9조 (크리에이터 수익화)",
      b: [
        "자격을 갖춘 크리에이터(예: AURA+ Pro 또는 파트너십 지정)는 수익화 프로그램에 참여할 수 있음.",
        "따라사기 등으로 발생한 확정 제휴 커미션의 기본 50%가 크리에이터 몫으로 적립되며, 등급(받은 저장 수 기준)에 따라 최대 70%까지 상향됨.",
        "수익은 제휴 네트워크에서 구매가 확정된 후 '확정 수익'이 되며(반품 시 취소), 확정분만 출금 가능액에 반영됨.",
        "출금은 월 1회, 최소 출금액(₩10,000) 이상일 때 신청 가능하며 본인인증(KYC)이 필요함.",
        "지급 시 관련 세법에 따른 원천징수(사업소득 3.3% 등)를 공제한 실수령액이 지급됨.",
        "정산 기준·주기·세금 등 세부 사항은 별도 정책 및 스토어·제휴 네트워크 규정에 따름.",
        "부정 클릭·자전 거래·허위 트래픽 수익은 환수, 자격 제한.",
      ],
    },
    {
      h: "제10조 (금지 행위 및 무관용)",
      p: [
        "금지: 개인정보 무단 수집·이용, 역설계·자동화 수집·운영 방해, 음란·성적·혐오·폭력·괴롭힘·자해 조장 콘텐츠, 가품·위조·불법 상품 홍보·연결, 허위·기만 표시, 스팸·사기, 부정한 구독·수익 취득.",
        "회사는 객관적으로 불쾌하거나 불법적인 콘텐츠·악성 이용자에 무관용 원칙을 적용합니다. 신고 접수 시 24시간 이내 검토·삭제하고 위반 이용자를 제한·정지·차단할 수 있으며, 회원은 앱 내 신고·차단 기능을 사용할 수 있습니다.",
      ],
    },
    {
      h: "제11조 (변경·중단 및 면책)",
      b: [
        "서비스 개선을 위해 기능 변경·일시 중단 가능(중요 변경 사전 고지).",
        "천재지변·불가항력, 회원 귀책, 제3자 서비스(판매처·제휴 네트워크·AI) 장애로 인한 손해에 회사는 책임지지 않음.",
        '서비스는 "있는 그대로" 제공되며 법령 허용 범위에서 보증을 부인.',
      ],
    },
    { h: "제12조 (준거법·분쟁)", p: ["대한민국 법령에 따르며, 분쟁은 회사 소재지 관할 법원을 전속적 합의관할로 합니다. 해외 이용자의 거주지 강행 법령상 권리는 보장됩니다."] },
    { h: "제13조 (문의)", p: [`AURA 운영팀 · ${LEGAL_META.contact} · 대한민국`] },
  ],
  en: [
    { h: "1. Purpose", p: ['These Terms govern use of "AURA" ("Service"), a fashion/beauty content and commerce-connection service by YEAHPLUS Inc. ("Company"), and the rights, obligations, and responsibilities between the Company and users.'] },
    {
      h: "2. Definitions",
      b: [
        "Look: a set of coordi/beauty photos with descriptions, tags, and linked products.",
        "Shop-the-look (outlink): an affiliate link to an external seller linked to a Look.",
        "Asset: digital goods such as presets (LUTs), templates, and lookbooks.",
        "AURA+/AURA+ Pro: auto-renewing paid subscription memberships.",
        "Generation credits: credits used for AI photo generation, comprising 'purchased credits' (a consumable in-app product) and 'free credits' included monthly with subscriptions.",
        "Creator: a member eligible to earn revenue (e.g., via shop-the-look).",
      ],
    },
    {
      h: "3. The Service",
      b: [
        "Taste-based look feed/discovery, wishes/collections, search and tag browsing.",
        "Shop-the-look outlinks to external sellers (Art. 7).",
        "AI-assisted creation such as photo images/captions (uses generation credits, Art. 8).",
        "One-time-purchase, permanent-use assets (presets/templates/lookbooks).",
        "AURA+/AURA+ Pro subscription benefits and creator monetization eligibility.",
      ],
    },
    {
      h: "4. Accounts & Eligibility",
      b: [
        "Sign up via email or Apple/Google/Kakao.",
        "Under-14 may not register; safety defaults apply to under-18.",
        "Provide accurate info; do not misappropriate others' accounts/info.",
        "In-app self-deletion available (data deleted except where legally retained).",
      ],
    },
    {
      h: "5. Subscriptions, IAP & Generation Credits",
      b: [
        "Monthly/annual auto-renewal; billed via App Store/Google Play.",
        "Charged ~24h before period end; renews automatically unless cancelled.",
        "Cancellation, management, and refunds follow each store's menu/policy.",
        "Upgrades apply immediately (possible proration); downgrades may apply at next renewal.",
        "Permanent assets remain usable on your account after a one-time purchase.",
        "Generation credits are topped up via a consumable in-app product; purchased credits do not expire (non-refundable; each store's policy prevails).",
        "AURA+ Pro includes free generation credits each month. Free credits are usable only within the month granted, unused free credits expire at the start of each month (no carryover), and free credits are deducted before purchased credits.",
        "New members may receive a one-time free trial credit.",
        "Changes to price, structure, or credit grant amounts apply from the next billing cycle after prior notice.",
      ],
    },
    {
      h: "6. User Content & License",
      b: [
        "You retain copyright in your content.",
        "For content set to public, you grant the Company a worldwide, non-exclusive, royalty-free license to operate, display, promote, and provide features (thumbnails, recommendations, search).",
        "You warrant your content does not infringe others' copyright, likeness, or trademark rights.",
        "The Company may hide/remove content per reports, review, law, or these Terms.",
      ],
    },
    {
      h: "7. Affiliate / Shop-the-Look Disclosure",
      b: [
        "Shop-the-look links are affiliate links; the Company may earn commissions on resulting purchases.",
        "Commissions do not increase the price you pay.",
        "Sale, price, shipping, exchange, refund, quality, and safety are the responsibility of the external seller; the Company is not a party to the transaction.",
        "The Company is not liable for losses from sellers' policy changes, expired links, or out-of-stock items.",
      ],
    },
    {
      h: "8. AI-Generated Content",
      b: [
        "Some content may be generated or enhanced by AI.",
        "AI outputs may differ from real products/persons/facts and are not warranted for accuracy.",
        "When using AI features, your input images/text may be sent to AI providers.",
        "You may not use AI to create/post content infringing others' rights or violating these Terms.",
      ],
    },
    {
      h: "9. Creator Monetization",
      b: [
        "Eligible creators (e.g., AURA+ Pro or designated partnerships) may join monetization programs.",
        "A base 50% of confirmed affiliate commissions from shop-the-look is credited to the creator, rising up to 70% by tier (based on saves received).",
        "Revenue becomes 'confirmed' after the affiliate network confirms the purchase (cancelled on returns); only confirmed amounts count toward withdrawable balance.",
        "Withdrawals are available once monthly when the balance meets the minimum (KRW 10,000) and require identity verification (KYC).",
        "Payouts are net of withholding required by tax law (e.g., 3.3% business income).",
        "Detailed settlement criteria, cycles, and taxes follow separate policies and store/affiliate-network rules.",
        "Revenue from fraudulent clicks, self-dealing, or fake traffic is clawed back and eligibility restricted.",
      ],
    },
    {
      h: "10. Prohibited Conduct & Zero Tolerance",
      p: [
        "Prohibited: unauthorized collection/use of personal data; reverse engineering, automated scraping, or interference; obscene/sexual/hateful/violent/harassing/self-harm content; promotion or linking of counterfeit or illegal goods; false or deceptive claims; spam/fraud; fraudulent acquisition of subscription/revenue.",
        "The Company enforces a zero-tolerance policy for objectionable or unlawful content and abusive users. Upon a report, content is reviewed and removed within 24 hours and offending users may be restricted, suspended, or banned. Users can use in-app report and block features.",
      ],
    },
    {
      h: "11. Changes, Suspension & Disclaimer",
      b: [
        "Features may change or be suspended for improvement (material changes pre-announced).",
        "The Company is not liable for losses from force majeure, user fault, or third-party (seller/affiliate/AI) failures.",
        'The Service is provided "as is" and warranties are disclaimed to the extent permitted by law.',
      ],
    },
    { h: "12. Governing Law & Disputes", p: ["Governed by the laws of the Republic of Korea; disputes are subject to the exclusive jurisdiction of the court at the Company's location. Mandatory rights under an overseas user's local law are preserved."] },
    { h: "13. Contact", p: [`AURA Team · ${LEGAL_META.contact} · Republic of Korea`] },
  ],
};

export const GUIDELINES: { ko: Sec[]; en: Sec[] } = {
  ko: [
    { h: "함께 지키는 약속", p: ["AURA는 취향이 맞는 또래가 신뢰로 연결되는 곳이에요. 모두가 안전하게 이용하도록 아래를 지켜주세요. 위반 콘텐츠는 신고·자동 필터로 검토되며 정도에 따라 비노출·경고·정지될 수 있어요."] },
    { h: "1. 진정성", b: ["본인의 코디·뷰티를 정직하게 공유해요.", "대가성·협찬은 광고임을 명확히 표기해주세요.", "허위·과장·사칭은 금지예요."] },
    { h: "2. 존중과 안전", b: ["외모 비하·혐오·차별·괴롭힘·위협 금지.", "극단적 다이어트·자해를 조장/미화하는 콘텐츠 금지(필요 시 전문기관 도움을 받아주세요).", "폭력적·위험 행위를 부추기는 콘텐츠 금지."] },
    { h: "3. 성적 콘텐츠 및 청소년 보호", b: ["음란·성적으로 노골적인 콘텐츠 금지.", "미성년자를 성적으로 대상화하거나 위험에 노출하는 콘텐츠·접촉은 무관용으로 즉시 삭제·신고 조치돼요."] },
    { h: "4. 정직한 거래", b: ["가품·위조·불법·금지 품목의 따라사기 금지.", "허위 할인·기만적 상품 정보로 구매를 유도하지 마세요."] },
    { h: "5. 저작권과 권리 존중", b: ["타인의 사진·디자인·브랜드 무단 도용 금지.", "리믹스·참고 시 출처 표기.", "AI 생성물도 타인의 권리를 침해해선 안 돼요."] },
    { h: "6. 스팸·사기·개인정보", b: ["도배·반복 홍보·피싱·사기 링크 금지.", "타인의 개인정보를 동의 없이 게시 금지."] },
    { h: "7. 신고·차단·집행", b: ["부적절한 콘텐츠·이용자는 앱 내 신고·차단으로 알려주세요.", "신고는 24시간 이내 검토되며 비노출·삭제, 경고, 이용 제한, 정지·영구 차단이 단계적으로 이뤄져요.", `이의는 ${LEGAL_META.contact} 로 문의할 수 있어요.`] },
  ],
  en: [
    { h: "Our shared promise", p: ["AURA is where like-minded peers connect through trust. Please follow the rules below so everyone stays safe. Violations are reviewed via reports and automated filters and may be hidden, warned, or suspended depending on severity."] },
    { h: "1. Authenticity", b: ["Share your own coordi/beauty honestly.", "Clearly label sponsored/paid content as advertising.", "No false, exaggerated, or impersonating content."] },
    { h: "2. Respect & Safety", b: ["No body-shaming, hate, discrimination, harassment, or threats.", "No content promoting/glorifying extreme dieting or self-harm (please seek professional help if needed).", "No content encouraging violence or dangerous acts."] },
    { h: "3. Sexual Content & Minor Protection", b: ["No pornographic or sexually explicit content.", "Content sexualizing or endangering minors is removed and reported immediately under zero tolerance."] },
    { h: "4. Honest Commerce", b: ["No shop-the-look links for counterfeit, fake, illegal, or prohibited items.", "Do not lure purchases with fake discounts or deceptive product info."] },
    { h: "5. Copyright & Rights", b: ["No unauthorized use of others' photos, designs, or brands.", "Credit sources when remixing/referencing.", "AI-generated content must not infringe others' rights."] },
    { h: "6. Spam, Fraud & Privacy", b: ["No flooding, repetitive promotion, phishing, or scam links.", "Do not post others' personal info without consent."] },
    { h: "7. Reporting, Blocking & Enforcement", b: ["Report or block inappropriate content/users in the app.", "Reports are reviewed within 24 hours; actions escalate from hide/remove to warning, restriction, suspension, and permanent ban.", `Appeals: ${LEGAL_META.contact}.`] },
  ],
};
