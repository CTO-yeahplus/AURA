import Image from "next/image";
import Link from "next/link";

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
            <Link href="/fashion" className="hover:text-ink">패션</Link>
            <Link href="/beauty" className="hover:text-ink">뷰티</Link>
            <Link href="/guides" className="hover:text-ink">스타일 가이드</Link>
            <Link href="/about" className="hover:text-ink">소개</Link>
            <Link href="/disclosure" className="hover:text-ink">제휴 고지</Link>
            <Link href="/privacy" className="hover:text-ink">개인정보처리방침</Link>
            <Link href="/terms" className="hover:text-ink">이용약관</Link>
            <Link href="/community-guidelines" className="hover:text-ink">커뮤니티 가이드라인</Link>
            <a href="mailto:contact@yeahplus.co.kr" className="hover:text-ink">문의</a>
          </div>
        </div>
        <p className="mt-6 text-[13px] text-hint">© 2026 AURA · YEAHPLUS · auraootd.com</p>
      </div>
    </footer>
  );
}
