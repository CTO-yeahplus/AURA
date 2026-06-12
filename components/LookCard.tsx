import type { Look } from "@/lib/looks";
import { Reveal } from "./Reveal";

export function LookCard({ look, delay = 0 }: { look: Look; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <article className="group flex h-full flex-col overflow-hidden rounded-xl2 border border-line bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift">
        <div className={`relative aspect-[4/5] bg-gradient-to-br ${look.gradient}`}>
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-ink">
            {look.tag}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-4 pb-5">
          <h3 className="font-serif text-lg text-ink">{look.title}</h3>
          <p className="mt-1 mb-4 text-sm text-sub">{look.desc}</p>
          <div className="mt-auto flex flex-wrap gap-2">
            {look.shops.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="sponsored noopener"
                className="rounded-full border-[1.5px] border-brand-soft bg-brand-soft px-3 py-1.5 text-[13px] font-bold text-brand-dark transition hover:border-brand"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function LookGrid({ looks }: { looks: Look[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {looks.map((look, i) => (
        <LookCard key={look.title} look={look} delay={(i % 3) * 0.08} />
      ))}
    </div>
  );
}
