import Link from "next/link";
import type { Look } from "@/lib/looks";
import { Reveal } from "./Reveal";
import { SmartImg } from "./SmartImg";

// 라이브 룩 카드 — 카드 전체가 상세페이지(/ootd/[id]) 링크. 상세에서 따라사기(웹 수익) 노출.
export function LiveLookCard({ look, delay = 0 }: { look: Look; delay?: number }) {
  const href = look.id ? `/ootd/${look.id}` : "#";
  return (
    <Reveal delay={delay}>
      <Link
        href={href}
        className="group block overflow-hidden rounded-[18px] shadow-soft transition-shadow duration-300 hover:shadow-lift"
      >
        <div className={`relative aspect-[3/4] w-full bg-gradient-to-br ${look.gradient}`}>
          <SmartImg src={look.image} alt={look.title} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/10" />
          <span className="absolute left-3 top-3 rounded-full bg-white/85 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-ink backdrop-blur">
            {look.tag}
          </span>
          <div className="absolute inset-x-0 bottom-0 p-4">
            <h3 className="font-serif text-[20px] leading-tight text-white drop-shadow-sm">
              {look.title}
            </h3>
            {look.shops.length > 0 ? (
              <p className="mt-1 text-[12px] font-semibold text-white/90">
                {look.shops.length}개 따라사기 →
              </p>
            ) : null}
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

export function LiveLookGrid({ looks }: { looks: Look[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
      {looks.map((look, i) => (
        <LiveLookCard key={look.id ?? `${look.title}-${i}`} look={look} delay={(i % 3) * 0.06} />
      ))}
    </div>
  );
}
