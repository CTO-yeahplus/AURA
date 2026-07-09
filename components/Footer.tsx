import Image from "next/image";
import Link from "next/link";
import { COMPANY } from "@/lib/company";

export function Footer() {
  return (
    <footer className="mt-10 border-t border-line bg-cream-muted py-10">
      <div className="wrap">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2.5">
              <Image src="/aura_logo_1k.png" alt="AURA" width={26} height={26} className="rounded-lg" />
              <span className="font-serif text-lg font-bold text-ink">AURA</span>
            </Link>
            <p className="mt-3 text-sm text-sub">
              오늘의 룩을 발견하고 바로 따라 사는 패션·뷰티 커뮤니티. Discover &amp; shop your daily look.
            </p>
          </div>
          <div className="flex flex-wrap gap-5 text-sm font-semibold text-sub">
            <Link href="/ootd" className="hover:text-ink">OOTD</Link>
            <Link href="/guides" className="hover:text-ink">스타일 가이드</Link>
            <Link href="/about" className="hover:text-ink">소개</Link>
            <Link href="/disclosure" className="hover:text-ink">제휴 고지</Link>
            <Link href="/privacy" className="hover:text-ink">개인정보처리방침</Link>
            <Link href="/terms" className="hover:text-ink">이용약관</Link>
            <Link href="/community-guidelines" className="hover:text-ink">커뮤니티 가이드라인</Link>
            <a href="mailto:contact@yeahplus.co.kr" className="hover:text-ink">문의</a>
          </div>
        </div>
        {/* 전자상거래법 표시사항(사업자 정보) — PG·본인인증 심사용 상시 표기. */}
        <div className="mt-8 border-t border-line pt-6 text-[12px] leading-relaxed text-hint">
          <p className="font-semibold text-sub">{COMPANY.name}</p>
          <p className="mt-1">
            대표자 {COMPANY.ceo} · 사업자등록번호 {COMPANY.bizNo} · 통신판매업신고번호{" "}
            {COMPANY.mailOrderNo}
          </p>
          <p className="mt-1">주소: {COMPANY.address}</p>
          <p className="mt-1">
            문의:{" "}
            <a href={`mailto:${COMPANY.email}`} className="underline hover:text-ink">
              {COMPANY.email}
            </a>
          </p>
          <p className="mt-3">© 2026 AURA · {COMPANY.name} · {COMPANY.domain}</p>
        </div>
      </div>
    </footer>
  );
}
