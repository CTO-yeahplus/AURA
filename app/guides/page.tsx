import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { LiveLookGrid } from "@/components/LiveLookCard";
import { GuideChapters, GuidesOpening, type Chapter } from "@/components/guides/GuidesStory";
import { ScrollProgress } from "@/components/home/ScrollProgress";
import { StoryCta, WordReveal } from "@/components/story/shared";
import { getLiveLooks } from "@/lib/liveLooks";
import { getMergedGuides } from "@/lib/guidesDb";

export const metadata: Metadata = {
  title: "스타일 가이드 — 홈피드 룩으로 푼 코디 공식",
  description:
    "AURA 홈피드의 룩으로 풀어 쓴 스타일 가이드. 캐주얼·스트릿·러블리·미니멀 코디 공식을 따라 하기 쉽게 정리하고, 아이템 구매처까지 연결했어요.",
};

export const dynamic = "force-dynamic";

export default async function GuidesPage() {
  const [live, guides] = await Promise.all([getLiveLooks({ limit: 12 }), getMergedGuides()]);

  // 가이드마다: 부채꼴로 펼칠 룩 사진(섹션 사진이 없으면 표지 한 장).
  const chapters: Chapter[] = guides.map((g) => {
    const sectionShots = g.sections.map((s) => s.image).filter((x): x is string => !!x);
    return {
      slug: g.slug,
      title: g.title,
      dek: g.dek,
      category: g.category,
      updated: g.updated,
      scene: g.scene,
      shots: (sectionShots.length > 0 ? sectionShots : g.image ? [g.image] : []).slice(0, 4),
      count: g.sections.length,
    };
  });
  // 도입의 '룩의 벽' — 모든 가이드의 룩 사진.
  const wall = Array.from(
    new Set(guides.flatMap((g) => g.sections.map((s) => s.image).filter((x): x is string => !!x)))
  );
  const lookCount = guides.reduce((n, g) => n + g.sections.length, 0);

  return (
    <>
      <ScrollProgress />

      {/* 도입 — 옷이 가득한 벽 앞의 밤 */}
      <GuidesOpening shots={wall} guideCount={guides.length} lookCount={lookCount} />

      {/* 한 문장 */}
      <section className="bg-cream py-20 md:py-28">
        <div className="wrap max-w-5xl">
          <span className="eyebrow">Guides</span>
          <WordReveal
            className="mt-5 font-serif text-[clamp(24px,4vw,52px)] font-bold leading-[1.3] tracking-tight text-navy"
            accentLast={3}
            text="옷장을 바꾸지 않아도 됩니다. 같은 셔츠, 같은 바지도 어떻게 겹치고 어디서 끊느냐에 따라 전혀 다른 하루가 돼요."
          />
        </div>
      </section>

      {/* 가이드 목차 — 휠 한 단계에 한 편 */}
      <GuideChapters chapters={chapters} />

      {live.length > 0 ? (
        <section className="bg-cream py-16 md:py-20">
          <div className="wrap">
            <Reveal>
              <span className="eyebrow">OOTD · Live</span>
              <h2 className="mt-2 font-serif text-[clamp(24px,3.4vw,40px)] font-bold text-navy">
                오늘의 룩
              </h2>
              <p className="mt-2 text-[14px] text-sub">
                가이드와 함께 보는 실시간 OOTD. 눌러서 아이템까지.
              </p>
            </Reveal>
            <div className="mt-6">
              <LiveLookGrid looks={live} />
            </div>
          </div>
        </section>
      ) : null}

      <StoryCta
        title={
          <>
            내일 아침의 옷은,
            <br />
            오늘 밤 앱에서.
          </>
        }
        body="AURA 앱에서 매일의 코디를 발견하고, 마음에 드는 아이템을 바로 따라 사세요. iPhone에서 무료로 받을 수 있어요."
      />
    </>
  );
}
