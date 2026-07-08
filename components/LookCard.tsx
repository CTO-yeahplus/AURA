import type { Look } from "@/lib/looks";
import { wrapLinkPrice } from "@/lib/linkprice";
import { Reveal } from "./Reveal";
import { SmartImg } from "./SmartImg";

export function LookCard({ look, delay = 0 }: { look: Look; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <article className="group relative overflow-hidden rounded-[18px] shadow-soft transition-shadow duration-300 hover:shadow-lift">
        {/* 이미지(또는 그라데이션 폴백) */}
        <div className={`relative aspect-[3/4] w-full bg-gradient-to-br ${look.gradient}`}>
          <SmartImg src={look.image} alt={look.title} />
          {/* 스크림: 캡션 가독성 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/10" />
          {/* 카테고리 칩 */}
          <span className="absolute left-3 top-3 rounded-full bg-white/85 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-ink backdrop-blur">
            {look.tag}
          </span>
          {/* 캡션 + 샵 */}
          <div className="absolute inset-x-0 bottom-0 p-4">
            <h3 className="font-serif text-[20px] leading-tight text-white drop-shadow-sm">
              {look.title}
            </h3>
            <p className="mt-1 line-clamp-2 text-[13px] text-white/85">{look.desc}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {look.shops.map((s) => (
                <a
                  key={s.href}
                  href={wrapLinkPrice(s.href)}
                  target="_blank"
                  rel="sponsored noopener"
                  className="rounded-full border border-white/30 bg-white/15 px-2.5 py-1 text-[12px] font-semibold text-white backdrop-blur-md transition hover:bg-white hover:text-ink"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function LookGrid({ looks }: { looks: Look[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
      {looks.map((look, i) => (
        <LookCard key={look.id ?? `${look.title}-${i}`} look={look} delay={(i % 3) * 0.06} />
      ))}
    </div>
  );
}
