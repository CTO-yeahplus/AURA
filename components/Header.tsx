import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "/ootd", label: "OOTD" },
  { href: "/fashion", label: "패션" },
  { href: "/beauty", label: "뷰티" },
  { href: "/lifestyle", label: "라이프스타일" },
  { href: "/guides", label: "가이드" },
  { href: "/creators", label: "크리에이터" },
  { href: "/picks", label: "Picks" },
  { href: "/about", label: "소개" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-cream/80 backdrop-blur-md backdrop-saturate-150">
      <div className="wrap flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/aura_logo_1k.png" alt="AURA" width={30} height={30} className="rounded-lg" />
          <span className="font-serif text-[22px] font-bold tracking-wide text-ink">AURA</span>
        </Link>
        <nav className="flex items-center gap-5 sm:gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="hidden text-sm font-semibold text-sub transition hover:text-ink sm:block"
            >
              {l.label}
            </Link>
          ))}
          <Link href="/#waitlist" className="btn">
            앱 출시 알림
          </Link>
        </nav>
      </div>
    </header>
  );
}
