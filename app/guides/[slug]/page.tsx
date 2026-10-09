import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DisclosureNote } from "@/components/DisclosureNote";
import { ArticleHero, LookNav, LookSection, NextGuide } from "@/components/guides/ArticleStory";
import { ScrollProgress } from "@/components/home/ScrollProgress";
import { StoryCta, WordReveal } from "@/components/story/shared";
import { getMergedGuides } from "@/lib/guidesDb";

// DB 발행 가이드를 반영하기 위해 동적 렌더(관리자 발행 즉시 노출).
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const g = (await getMergedGuides()).find((x) => x.slug === params.slug);
  if (!g) return { title: "스타일 가이드" };
  return {
    title: g.title,
    description: g.dek,
    openGraph: { title: g.title, description: g.dek, type: "article" },
  };
}

export default async function GuideArticle({ params }: { params: { slug: string } }) {
  const guides = await getMergedGuides();
  const index = guides.findIndex((x) => x.slug === params.slug);
  if (index < 0) notFound();
  const g = guides[index];
  const next = guides.length > 1 ? guides[(index + 1) % guides.length] : null;

  return (
    <article className="pb-4">
      <ScrollProgress />

      {/* 머리 — 이 가이드가 어울리는 날의 장면 + 룩 라인업 */}
      <ArticleHero guide={g} />

      {/* 도입 단락 — 어절 단위로 또렷해진다 */}
      {g.intro ? (
        <section className="bg-cream py-16 md:py-24">
          <div className="wrap max-w-4xl">
            <WordReveal
              className="font-serif text-[clamp(19px,2.5vw,32px)] font-bold leading-[1.5] tracking-tight text-navy"
              offset={["start 0.85", "end 0.5"]}
              text={g.intro}
            />
          </div>
        </section>
      ) : null}

      {/* 룩별 스타일링 팁 + 아이템 */}
      <LookNav looks={g.sections.map((s) => s.look)} />
      {g.sections.map((s, i) => (
        <LookSection key={i} s={s} i={i} />
      ))}

      <section className="pt-6">
        <div className="wrap max-w-3xl">
          <DisclosureNote />
        </div>
      </section>

      {next ? (
        <NextGuide guide={{ slug: next.slug, title: next.title, image: next.image, scene: next.scene }} />
      ) : null}

      <StoryCta
        title={
          <>
            더 많은 룩은,
            <br />
            앱에서 매일.
          </>
        }
        body="AURA 앱에서 매일의 코디를 발견하고, 마음에 드는 아이템을 바로 따라 사세요."
      />
    </article>
  );
}
