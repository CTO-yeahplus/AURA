"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { AiBadge } from "@/components/AiBadge";
import { SmartImg } from "@/components/SmartImg";
import {
  PIN,
  PIN_OFFSET,
  WHEEL_SPRING,
  clamp01,
  lerp,
  plateau,
  smooth,
  span,
} from "@/components/home/scroll";
import { SceneSlug } from "@/components/story/shared";
import { isAiImage } from "@/lib/aiGenerated";
import { feedImg } from "@/lib/feedImage";

const pad = (n: number) => String(n).padStart(2, "0");

/** 줄인 주소로 받고, 실패하면 원본으로 — 가이드 화면의 룩 사진 공통. */
export function LookImg({ src, alt, width, eager }: { src?: string; alt: string; width: number; eager?: boolean }) {
  return <SmartImg src={feedImg(src, width)} fallbackSrc={src} alt={alt} eager={eager} />;
}

function WallColumn({ p, i, shots }: { p: MotionValue<number>; i: number; shots: string[] }) {
  // 옷걸이처럼 줄지어 선 룩 — 이웃한 줄끼리 반대로 흐른다.
  const y = useTransform(p, (v) => `${(i % 2 === 0 ? lerp(-2, -26, v) : lerp(-26, -2, v)).toFixed(2)}%`);
  return (
    <motion.div style={{ y }} className="flex w-[38vw] flex-none flex-col gap-3 md:w-[17vw] md:gap-5">
      {shots.map((src, k) => (
        <div
          key={`${src}-${k}`}
          className="relative aspect-[3/4] w-full overflow-hidden rounded-[14px] bg-gradient-to-br from-brand to-accent"
        >
          <LookImg src={src} alt="" width={480} eager />
          {isAiImage(src) ? <AiBadge className="right-2 top-2" /> : null}
        </div>
      ))}
    </motion.div>
  );
}

/**
 * 도입 — 옷이 가득 걸린 벽 앞의 밤. 휠을 내리면 룩의 벽이 엇갈려 흐르고,
 * "입을 옷이 없다"는 문장이 "입는 법부터 정리했다"로 넘어간다.
 */
export function GuidesOpening({
  shots,
  guideCount,
  lookCount,
}: {
  shots: string[];
  guideCount: number;
  lookCount: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: PIN_OFFSET });
  const spring = useSpring(scrollYProgress, WHEEL_SPRING);
  const last = useMotionValue(1);
  const p = reduce ? last : spring;

  const s1 = useTransform(p, (v) => 1 - span(v, 0.32, 0.42));
  const y1 = useTransform(p, (v) => -30 * span(v, 0.32, 0.42));
  const s2 = useTransform(p, (v) => span(v, 0.48, 0.6));
  const y2 = useTransform(p, (v) => lerp(30, 0, span(v, 0.48, 0.6)));
  const wall = useTransform(p, (v) => lerp(0.5, 0.85, plateau(v, 0.05, 0.3, 0.8, 1.2)));
  const wallScale = useTransform(p, (v) => lerp(1.12, 1, v));
  const hint = useTransform(p, (v) => 1 - span(v, 0, 0.06));

  // 다섯 줄에 고루 나눠 건다(사진이 적으면 되풀이).
  const COLS = 5;
  const PER = 6;
  const columns = Array.from({ length: COLS }, (_, c) =>
    Array.from({ length: PER }, (_, k) => shots[(c + k * COLS) % Math.max(1, shots.length)]).filter(Boolean)
  );

  return (
    <section ref={ref} className={`relative bg-ink text-white ${reduce ? "" : "h-[260vh]"}`}>
      <div className={`${PIN} overflow-hidden`}>
        <motion.div
          aria-hidden
          style={{ opacity: wall, scale: wallScale }}
          className="absolute -inset-[14%] flex -rotate-[8deg] justify-center gap-3 md:gap-5"
        >
          {columns.map((col, i) => (
            <WallColumn key={i} p={p} i={i} shots={col} />
          ))}
        </motion.div>
        {/* 글자 자리만 어둡게 눌러 준다 */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(36,31,46,0.94)_0%,rgba(36,31,46,0.78)_34%,rgba(36,31,46,0.3)_72%,rgba(36,31,46,0.55)_100%)]" />
        <div className="grain absolute inset-0" aria-hidden />

        <div className="wrap relative grid h-full place-items-center text-center [&>*]:col-start-1 [&>*]:row-start-1">
          <motion.div style={{ opacity: s1, y: y1 }}>
            <SceneSlug className="text-white/65">Scene — 일요일 밤 11시 · 옷장 앞</SceneSlug>
            <p className="mt-6 break-keep font-serif text-[clamp(30px,5.4vw,76px)] font-bold leading-[1.14] tracking-tight">
              옷은 이렇게 많은데,
              <br />
              내일 입을 옷이 없습니다.
            </p>
          </motion.div>

          <motion.div style={{ opacity: s2, y: y2 }}>
            <SceneSlug className="text-white/65">그래서 · AURA 스타일 가이드</SceneSlug>
            <h1 className="mt-6 break-keep font-serif text-[clamp(32px,5.8vw,82px)] font-bold leading-[1.12] tracking-tight">
              옷을 더 사기 전에,
              <br />
              <span className="bg-gradient-to-r from-brand to-accent bg-clip-text text-transparent">
                입는 법부터.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl break-keep text-[clamp(15px,1.7vw,19px)] leading-relaxed text-white/80">
              앱 홈피드에 올라온 룩을 에디터가 골라 코디 공식으로 풀었어요. {guideCount}가지 무드,{" "}
              {lookCount}벌의 룩.
            </p>
          </motion.div>
        </div>

        {reduce ? null : (
          <motion.div
            aria-hidden
            style={{ opacity: hint }}
            className="pointer-events-none absolute bottom-7 right-7 hidden flex-col items-center gap-2 text-white/80 md:flex"
          >
            <span className="flex h-9 w-[22px] justify-center rounded-full border-[1.5px] border-white/70 pt-1.5">
              <span className="wheel-dot h-1.5 w-1 rounded-full bg-white" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Scroll</span>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export type Chapter = {
  slug: string;
  title: string;
  dek: string;
  category: string;
  updated: string;
  scene?: { when: string; line: string };
  shots: string[]; // 부채꼴로 펼칠 룩 사진(최대 4)
  count: number; // 룩 수
};

const TINTS = ["#FAF7F1", "#F1EAFD", "#FFEEF5", "#F1ECE3"];

/** 한 가이드의 룩들 — 정면에 오면 부채꼴로 펼쳐지고, 차례가 지나면 접히며 위로 빠진다. */
function Fan({ pos, i, chapter }: { pos: MotionValue<number>; i: number; chapter: Chapter }) {
  const o = useTransform(pos, (v) => i - v);
  const y = useTransform(o, (d) => `calc(-50% + ${(d * 105).toFixed(1)}%)`);
  const opacity = useTransform(o, (d) => 1 - clamp01(Math.abs(d) * 1.5 - 0.25));
  const spread = useTransform(o, (d) => smooth(1 - clamp01(Math.abs(d) * 1.9)));
  const n = chapter.shots.length;
  return (
    <motion.div style={{ x: "-50%", y, opacity }} className="absolute left-1/2 top-1/2 md:left-[54%]">
      <Link
        href={`/guides/${chapter.slug}`}
        aria-label={`${chapter.title} — 가이드 보기`}
        className="relative block aspect-[3/4] h-[min(32svh,270px)] transition-transform duration-300 hover:-translate-y-2 md:h-[min(54svh,440px)]"
      >
        {chapter.shots.map((src, k) => (
          <FanCard key={src} spread={spread} k={k} n={n} src={src} />
        ))}
      </Link>
    </motion.div>
  );
}

function FanCard({
  spread,
  k,
  n,
  src,
}: {
  spread: MotionValue<number>;
  k: number;
  n: number;
  src: string;
}) {
  const c = k - (n - 1) / 2; // 가운데에서 얼마나 떨어진 장인지
  const rotate = useTransform(spread, (s) => c * (2 + 8 * s));
  const x = useTransform(spread, (s) => `${(c * 26 * s).toFixed(2)}%`);
  const y = useTransform(spread, (s) => Math.abs(c) * 16 * s);
  return (
    <motion.div
      style={{ rotate, x, y, zIndex: 10 - Math.round(Math.abs(c) * 2) }}
      className="absolute inset-0 overflow-hidden rounded-[20px] border-[5px] border-white bg-gradient-to-br from-brand to-accent shadow-lift"
    >
      <LookImg src={src} alt="" width={600} />
      {isAiImage(src) ? <AiBadge className="right-2 top-2" /> : null}
    </motion.div>
  );
}

/**
 * 가이드 목차 — 고정 구간. 휠 한 단계에 가이드 한 편: 그 편이 어울리는 날의 장면과 제목이 왼쪽에,
 * 그 편의 룩들이 오른쪽에 부채꼴로 펼쳐진다. 배경색도 편마다 바뀐다.
 */
export function GuideChapters({ chapters }: { chapters: Chapter[] }) {
  const N = chapters.length;
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: PIN_OFFSET });
  const p = useSpring(scrollYProgress, WHEEL_SPRING);
  // 편마다 앞 60%는 머물고, 나머지 동안 다음 편으로 넘어간다.
  const pos = useTransform(p, (v) => {
    const f = clamp01(v) * N;
    const k = Math.min(N - 1, Math.floor(f));
    return k + (k < N - 1 ? smooth(span(f - k, 0.6, 1)) : 0);
  });
  const fill = useTransform(p, (v) => clamp01(v));

  useMotionValueEvent(pos, "change", (v) => {
    const next = Math.min(N - 1, Math.max(0, Math.round(v)));
    setActive((cur) => (cur === next ? cur : next));
  });

  if (N === 0) return null;

  if (reduce) {
    return (
      <section ref={ref} className="bg-cream py-16">
        <div className="wrap grid gap-5 sm:grid-cols-2">
          {chapters.map((c, i) => (
            <Link
              key={c.slug}
              href={`/guides/${c.slug}`}
              className="group flex overflow-hidden rounded-[18px] border border-line bg-white shadow-soft"
            >
              <div className="relative aspect-[3/4] w-[42%] shrink-0 overflow-hidden bg-gradient-to-br from-brand to-accent">
                <LookImg src={c.shots[0]} alt={c.title} width={600} />
                {isAiImage(c.shots[0]) ? <AiBadge className="left-2.5 top-2.5" /> : null}
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-center p-5">
                <span className="font-serif text-[20px] text-brand">{pad(i + 1)}</span>
                <h2 className="mt-1 break-keep font-serif text-[20px] font-bold leading-snug text-navy">
                  {c.title}
                </h2>
                <p className="mt-2 break-keep text-[14px] text-sub">{c.dek}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    );
  }

  const cur = chapters[active];

  return (
    <section ref={ref} className="relative" style={{ height: `${N * 95 + 70}vh` }}>
      <div className={`${PIN} overflow-hidden`}>
        {/* 편마다 바뀌는 지면 색 */}
        {chapters.map((c, i) => (
          <div
            key={c.slug}
            aria-hidden
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === active ? 1 : 0, backgroundColor: TINTS[i % TINTS.length] }}
          />
        ))}

        <div className="wrap relative grid h-full grid-rows-[minmax(0,0.82fr)_minmax(0,1fr)] gap-y-2 py-4 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:grid-rows-1 md:items-center md:gap-x-12 md:py-0">
          {/* 룩의 부채 */}
          <div className="relative order-1 h-full md:order-2">
            {chapters.map((c, i) => (
              <Fan key={c.slug} pos={pos} i={i} chapter={c} />
            ))}
          </div>

          {/* 글 */}
          <div className="order-2 flex min-h-0 flex-col justify-start md:order-1 md:justify-center">
            <div className="md:min-h-[25rem]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={cur.slug}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="font-serif text-[clamp(40px,8vw,128px)] font-bold leading-[0.9] text-brand/25">
                    {pad(active + 1)}
                  </p>
                  {cur.scene ? (
                    <>
                      <SceneSlug className="mt-3 text-brand-dark md:mt-5">{cur.scene.when}</SceneSlug>
                      <p className="mt-2 break-keep font-serif text-[clamp(16px,1.9vw,24px)] leading-snug text-sub md:mt-3">
                        {cur.scene.line}
                      </p>
                    </>
                  ) : null}
                  <h2 className="mt-3 break-keep font-serif text-[clamp(22px,2.8vw,38px)] font-bold leading-[1.18] text-navy md:mt-5">
                    <Link href={`/guides/${cur.slug}`} className="hover:underline">
                      {cur.title}
                    </Link>
                  </h2>
                  <p className="mt-2 line-clamp-2 break-keep text-[14px] text-sub md:mt-3 md:text-[16px]">
                    {cur.dek}
                  </p>
                  <Link href={`/guides/${cur.slug}`} className="btn mt-4 md:mt-7">
                    룩 {cur.count}개 보기 →
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* 목차 — 모든 편이 늘 링크로 놓여 있다 */}
            <nav aria-label="가이드 목차" className="mt-4 md:mt-8">
              <div className="h-[2px] w-full overflow-hidden rounded-full bg-black/10">
                <motion.div
                  style={{ scaleX: fill }}
                  className="h-full origin-left bg-gradient-to-r from-brand to-accent"
                />
              </div>
              <ol className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
                {chapters.map((c, i) => (
                  <li key={c.slug}>
                    <Link
                      href={`/guides/${c.slug}`}
                      aria-current={i === active ? "true" : undefined}
                      className={`text-[12px] font-bold transition-colors md:text-[13px] ${
                        i === active ? "text-brand-dark" : "text-sub/70 hover:text-ink"
                      }`}
                    >
                      {pad(i + 1)} {c.title.split(":")[0]}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
