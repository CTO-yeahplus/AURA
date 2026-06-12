# auraootd.com 배포 가이드 (Next.js)

이 폴더는 **Next.js 14(App Router) + Tailwind** 프로젝트입니다. Vercel 배포가 가장 매끄럽습니다.

## 로컬 미리보기

```bash
cd landing
npm install        # 최초 1회
npm run dev        # http://localhost:3000
```

## 배포 — Vercel (권장, 무료)

```bash
cd landing
npm install -g vercel   # 최초 1회
vercel                  # 프리뷰 배포(질문은 기본값 Enter)
vercel --prod           # 프로덕션 배포
```

- Vercel이 Next.js를 자동 인식 → 빌드 명령/출력 설정 불필요.
- 배포 후 Vercel 대시보드 → 프로젝트 → **Settings → Domains → `auraootd.com` 추가** →
  도메인 등록업체(가비아/후이즈/Cloudflare 등)에서 안내된 A 레코드 또는 CNAME 입력.
- GitHub에 연결하면 push마다 자동 배포(미리보기 URL + 프로덕션).

> 대안: Netlify/Cloudflare Pages도 Next를 지원하지만, Next는 Vercel이 1순위로 매끄럽습니다.

## 구조

```
landing/
├── app/                 # 라우트(App Router)
│   ├── page.tsx         # 홈(히어로·룩·카테고리·How·대기자)
│   ├── fashion/ beauty/ # 카테고리 룩북
│   ├── about/ disclosure/ privacy/  # 정책·소개
│   ├── layout.tsx       # 공통 레이아웃(헤더/푸터/폰트/메타)
│   ├── robots.ts sitemap.ts
├── components/          # Header·Footer·LookCard·Reveal(모션)·WaitlistForm
├── lib/looks.ts         # 룩 데이터(SSOT) — 여기만 고치면 전 페이지 반영
├── public/aura_logo_1k.png
└── tailwind.config.ts   # 브랜드 컬러(라벤더·크림)·폰트
```

룩을 추가·수정하려면 `lib/looks.ts`만 편집하면 됩니다.

## 배포 후 체크 (애그리게이터 승인 요건)

- [ ] `https://auraootd.com` HTTPS 라이브(비번잠금 없음).
- [ ] 홈/패션/뷰티에 **아웃바운드 구매 링크**(rel="sponsored") 노출.
- [ ] `/privacy`, `/disclosure`, `/about` 접근 가능.
- [ ] 푸터·About에 운영사(YEAHPLUS)·연락처(hello@auraootd.com) 표기.
- [ ] 대기자 폼 동작(formsubmit.co — 첫 제출 시 이메일 인증 필요).

## 정리(선택)

이전 정적 버전 파일(`index.html`·`*.html`·`styles.css` 등)이 폴더에 남아 있다면 Finder에서 삭제해도 됩니다(Next 빌드는 무시함).

## 다음

사이트가 라이브되면 `aura-app/docs/roadmap/aggregator-onboarding.md` 1단계대로
Skimlinks/Sovrn Commerce에 **auraootd.com** 도메인으로 퍼블리셔 신청.
