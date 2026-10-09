import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AiBadge } from "@/components/AiBadge";
import { Reveal } from "@/components/Reveal";
import { SmartImg } from "@/components/SmartImg";
import { DisclosureNote } from "@/components/DisclosureNote";
import { isAiImage } from "@/lib/aiGenerated";
import { findMergedGuide } from "@/lib/guidesDb";
import { wrapLinkPrice } from "@/lib/linkprice";
import { APP_STORE_URL } from "@/lib/app";

// DB 발행 가이드를 반영하기 위해 동적 렌더(관리자 발행 즉시 노출).
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const g = await findMergedGuide(params.slug);
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

export default async function GuideArticle({ params }: { params: { slug: string } }) {
  const g = await findMergedGuide(params.slug);
  if (!g) notFound();

  // 룩 사진이 셋 이상이면 표지 대신 룩들을 나란히 세운다(세로 사진을 가로 띠로 자르지 않기 위해).
  const lookShots = g.sections
    .map((s, i) => ({ src: s.image, look: s.look, n: i + 1 }))
    .filter((x): x is { src: string; look: string; n: number } => !!x.src);
  const lineup = lookShots.length >= 3 ? lookShots.slice(0, 5) : null;

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
            {lineup ? (
              <div className="relative flex gap-1.5 overflow-hidden rounded-[18px] sm:gap-2">
                {lineup.map((x, i) => (
                  <a
                    key={x.n}
                    href={`#look-${x.n}`}
                    aria-label={`Look ${x.n} — ${x.look}`}
                    className={`group relative aspect-[3/4] flex-1 overflow-hidden bg-gradient-to-br ${g.heroGradient} ${
                      i >= 3 ? "hidden sm:block" : ""
                    }`}
                  >
                    <SmartImg src={x.src} alt={x.look} />
                    <span className="absolute bottom-2 left-2.5 font-serif text-[13px] text-white drop-shadow">
                      {String(x.n).padStart(2, "0")}
                    </span>
                  </a>
                ))}
                {lineup.some((x) => isAiImage(x.src)) ? <AiBadge className="left-3 top-3" /> : null}
              </div>
            ) : (
              <div className={`group relative aspect-[16/9] w-full overflow-hidden rounded-[18px] bg-gradient-to-br ${g.heroGradient}`}>
                <SmartImg src={g.image} alt={g.title} />
                {isAiImage(g.image) ? <AiBadge className="left-3 top-3" /> : null}
              </div>
            )}
            <p className="mt-6 max-w-2xl break-keep text-[16px] leading-relaxed text-ink">{g.intro}</p>
          </Reveal>
        </div>
      </section>

      {/* 섹션(룩별 스타일링 팁 + 아이템) */}
      {g.sections.map((s, i) => (
        <section key={i} id={`look-${i + 1}`} className="scroll-mt-20 pt-12">
          <div className="wrap max-w-4xl">
            <Reveal>
              {/* 세로 사진 + 옆 글. 짝수 번째는 좌우를 바꿔 지면에 리듬을 준다. */}
              <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-6 sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] sm:gap-10">
                <div
                  className={`group relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-gradient-to-br ${s.gradient} ${
                    i % 2 === 1 ? "sm:order-2" : ""
                  }`}
                >
                  <SmartImg src={s.image} alt={s.look} />
                  {isAiImage(s.image) ? <AiBadge /> : null}
                </div>

                <div>
                  <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-brand-dark">
                    Look {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="mt-1.5 break-keep font-serif text-[clamp(22px,2.6vw,28px)] font-bold text-navy">
                    {s.look}
                  </h2>
                  <p className="mt-3 break-keep text-[16px] leading-relaxed text-ink">{s.body}</p>

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
                          <span className="block truncate text-[13px] text-sub">
                            {[item.brand, won(item.priceKrw)].filter(Boolean).join(" · ")}
                          </span>
                        </span>
                        <span className="ml-3 shrink-0 rounded-full bg-brand-dark px-3.5 py-1.5 text-[13px] font-bold text-white">
                          쇼핑 →
                        </span>
                      </a>
                    ))}
                  </div>

                  {s.lookId ? (
                    <Link
                      href={`/ootd/${s.lookId}`}
                      className="mt-4 inline-block text-[13px] font-bold text-brand-dark hover:underline"
                    >
                      이 룩을 피드에서 보기 →
                    </Link>
                  ) : null}
                </div>
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
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener"
              className="mt-4 inline-block rounded-full bg-brand-dark px-5 py-2.5 text-[14px] font-bold text-white"
            >
              App Store에서 받기
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}
