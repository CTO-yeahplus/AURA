import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { SmartImg } from "@/components/SmartImg";
import { DisclosureNote } from "@/components/DisclosureNote";
import { GUIDES, findGuide } from "@/lib/guides";
import { wrapLinkPrice } from "@/lib/linkprice";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const g = findGuide(params.slug);
  if (!g) return { title: "스타일 가이드" };
  return {
    title: g.title,
    description: g.dek,
    openGraph: { title: g.title, description: g.dek, type: "article" },
  };
}

function won(n?: number): string {
  return typeof n === "number" ? `₩${n.toLocaleString("ko-KR")}` : "";
}

export default function GuideArticle({ params }: { params: { slug: string } }) {
  const g = findGuide(params.slug);
  if (!g) notFound();

  return (
    <article className="pb-16">
      {/* 히어로 */}
      <section className="pt-10">
        <div className="wrap">
          <Reveal>
            <Link href="/guides" className="text-sm font-semibold text-sub hover:text-ink">
              ← 스타일 가이드
            </Link>
            <span className="mt-4 block text-[11px] font-bold uppercase tracking-[0.14em] text-brand-dark">
              {g.category} · {g.updated}
            </span>
            <h1 className="mt-2 font-serif text-[clamp(28px,5vw,46px)] font-bold leading-tight tracking-tight text-navy">
              {g.title}
            </h1>
            <p className="mt-3 max-w-2xl text-[clamp(15px,2.2vw,19px)] text-sub">{g.dek}</p>
          </Reveal>
        </div>
      </section>

      <section className="pt-7">
        <div className="wrap">
          <Reveal>
            <div className={`relative aspect-[16/9] w-full overflow-hidden rounded-[18px] bg-gradient-to-br ${g.heroGradient}`}>
              <SmartImg src={g.image} alt={g.title} />
            </div>
            <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-ink">{g.intro}</p>
          </Reveal>
        </div>
      </section>

      {/* 섹션(룩별 스타일링 팁 + 아이템) */}
      {g.sections.map((s, i) => (
        <section key={i} className="pt-10">
          <div className="wrap max-w-2xl">
            <Reveal>
              <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-brand-dark">
                Look {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-1.5 font-serif text-[24px] font-bold text-navy">{s.look}</h2>
              <div className={`mt-4 aspect-[3/2] w-full overflow-hidden rounded-2xl bg-gradient-to-br ${s.gradient}`}>
                <SmartImg src={s.image} alt={s.look} />
              </div>
              <p className="mt-4 text-[16px] leading-relaxed text-ink">{s.body}</p>

              <div className="mt-5 space-y-2.5">
                {s.items.map((item) => (
                  <a
                    key={item.label}
                    href={wrapLinkPrice(item.href)}
                    target="_blank"
                    rel="nofollow sponsored noopener"
                    className="flex items-center justify-between rounded-2xl border border-line bg-white px-4 py-3 transition hover:border-brand-dark"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-[15px] font-semibold text-ink">
                        {item.label}
                      </span>
                      <span className="block text-[13px] text-sub">
                        {[item.brand, won(item.priceKrw)].filter(Boolean).join(" · ")}
                      </span>
                    </span>
                    <span className="ml-3 shrink-0 rounded-full bg-brand-dark px-3.5 py-1.5 text-[13px] font-bold text-white">
                      쇼핑 →
                    </span>
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      <section className="pt-12">
        <div className="wrap max-w-2xl">
          <DisclosureNote />
          <div className="mt-8 rounded-2xl bg-brand-soft p-6 text-center">
            <p className="font-serif text-[20px] font-bold text-navy">더 많은 룩을 앱에서</p>
            <p className="mt-1.5 text-[14px] text-sub">
              AURA 앱에서 매일의 코디를 발견하고, 마음에 드는 아이템을 바로 따라 사세요.
            </p>
            <Link
              href="/#waitlist"
              className="mt-4 inline-block rounded-full bg-brand-dark px-5 py-2.5 text-[14px] font-bold text-white"
            >
              앱 출시 알림 받기
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
