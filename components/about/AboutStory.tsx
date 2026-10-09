"use client";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { PhoneFrame, ScreenShot } from "@/components/home/AppTour";
import { PIN, PIN_OFFSET, WHEEL_SPRING, lerp, plateau, smooth, span } from "@/components/home/scroll";
import { LookShot, SceneSlug } from "@/components/story/shared";
import { APP_SHOTS } from "@/lib/app";

type Tag = { label: string; side: "left" | "right"; top: string };
type Look = { id: string; image: string; tags: readonly Tag[] };

function AnswerTag({ p, tag, i }: { p: MotionValue<number>; tag: Tag; i: number }) {
  const pop = useTransform(p, (v) => span(v, 0.84 + i * 0.045, 0.9 + i * 0.045));
  const scale = useTransform(pop, (t) => lerp(0.6, 1, smooth(t)));
  return (
    <motion.span
      aria-hidden
      style={{ top: tag.top, opacity: pop, scale }}
      className={`absolute inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white px-3 py-2 shadow-lift ${
        tag.side === "left" ? "-left-5 md:-left-16" : "-right-5 md:-right-16"
      }`}
    >
      <span className="h-2 w-2 rounded-full bg-gradient-to-r from-brand to-accent" />
      <span className="text-[13px] font-bold text-ink">{tag.label}</span>
      <span className="text-[11px] font-bold text-brand-dark">따라사기 →</span>
    </motion.span>
  );
}

/**
 * 도입 — 출근길에 눈에 들어온 남의 옷. 질문이 화면을 채웠다가, 답(따라사기 태그)이 사진 위에 붙는다.
 * 사진은 답이 붙기 전까지 흐릿하다: 눈에는 들어오지만 어디 것인지 알 수 없는 상태.
 */
export function AboutOpening({ look }: { look: Look }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: PIN_OFFSET });
  const spring = useSpring(scrollYProgress, WHEEL_SPRING);
  const last = useMotionValue(1);
  const p = reduce ? last : spring;

  const s1 = useTransform(p, (v) => 1 - span(v, 0.15, 0.22));
  const y1 = useTransform(p, (v) => -30 * span(v, 0.15, 0.22));
  const quote = useTransform(p, (v) => plateau(v, 0.2, 0.29, 0.45, 0.53));
  const quoteScale = useTransform(p, (v) => lerp(0.72, 1.12, span(v, 0.2, 0.53)));
  const s2 = useTransform(p, (v) => plateau(v, 0.52, 0.6, 0.7, 0.76));
  const y2 = useTransform(p, (v) => lerp(30, 0, span(v, 0.52, 0.6)) - 30 * span(v, 0.7, 0.76));
  const s3 = useTransform(p, (v) => span(v, 0.78, 0.87));
  const y3 = useTransform(p, (v) => lerp(30, 0, span(v, 0.78, 0.87)));
  const hint = useTransform(p, (v) => 1 - span(v, 0, 0.06));

  const clear = useTransform(p, (v) => span(v, 0.7, 0.86));
  const filter = useTransform(
    [clear, quote],
    ([c, q]: number[]) => `blur(${lerp(7, 0, c).toFixed(2)}px) brightness(${(lerp(0.6, 1, c) - q * 0.25).toFixed(3)})`
  );
  const cardRotate = useTransform(p, (v) => lerp(4, -2, v));
  const glow = useTransform(clear, (c) => lerp(0.15, 0.6, c));

  return (
    <section ref={ref} className={`relative bg-ink text-white ${reduce ? "" : "h-[360vh]"}`}>
      <div className={`${PIN} overflow-hidden`}>
        <motion.div
          aria-hidden
          style={{ opacity: glow }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_50%,rgba(139,92,246,0.55),rgba(236,72,153,0.2)_42%,transparent_66%)]"
        />
        <div className="grain absolute inset-0" aria-hidden />

        <div className="wrap relative grid h-full grid-rows-[auto_minmax(0,1fr)] items-center gap-y-4 py-6 md:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] md:grid-rows-1 md:gap-x-10 md:py-0">
          <div className="grid [&>*]:col-start-1 [&>*]:row-start-1">
            <motion.div style={{ opacity: s1, y: y1 }}>
              <SceneSlug className="text-white/60">Scene 01 — 오전 8시 40분 · 출근길 횡단보도</SceneSlug>
              <p className="mt-5 break-keep font-serif text-[clamp(27px,3.8vw,56px)] font-bold leading-[1.18]">
                건너편에 선 사람의 옷이
                <br />
                자꾸 눈에 들어옵니다.
              </p>
            </motion.div>

            <motion.div style={{ opacity: s2, y: y2 }}>
              <SceneSlug className="text-white/60">Scene 02 — 그날 밤 · 검색창 앞</SceneSlug>
              <p className="mt-5 break-keep font-serif text-[clamp(27px,3.8vw,56px)] font-bold leading-[1.18]">
                물어볼 수도 없고,
                <br />
                검색해도 나오지 않습니다.
                <br />
                <span className="text-white/55">영감은 늘 거기서 멈췄어요.</span>
              </p>
            </motion.div>

            <motion.div style={{ opacity: s3, y: y3 }}>
              <SceneSlug className="text-white/60">Scene 03 — 그래서, AURA</SceneSlug>
              <h1 className="mt-5 break-keep font-serif text-[clamp(30px,4.4vw,64px)] font-bold leading-[1.14]">
                그 질문에 답하려고
                <br />
                <span className="bg-gradient-to-r from-brand to-accent bg-clip-text text-transparent">
                  AURA를 만들었습니다.
                </span>
              </h1>
              <p className="mt-5 max-w-xl break-keep text-[clamp(15px,1.6vw,18px)] leading-relaxed text-white/80">
                룩과 실제 구매처를 이어, 영감이 행동으로 이어지게 합니다.
              </p>
            </motion.div>
          </div>

          <div className="flex h-full items-center justify-center">
            <motion.div style={{ rotate: cardRotate }} className="relative">
              <motion.div style={{ filter }}>
                <LookShot
                  src={look.image}
                  alt="길에서 눈에 들어온 룩"
                  className="aspect-[864/1184] h-[min(40svh,340px)] rounded-[26px] md:h-[min(70svh,620px)]"
                />
              </motion.div>
              {look.tags.map((tag, i) => (
                <AnswerTag key={tag.label} p={p} tag={tag} i={i} />
              ))}
            </motion.div>
          </div>
        </div>

        {/* 화면을 채우는 질문 */}
        <motion.p
          aria-hidden={reduce ? true : undefined}
          style={{ opacity: quote, scale: quoteScale }}
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-4 text-center font-serif text-[clamp(44px,11vw,176px)] font-bold leading-none tracking-tight"
        >
          <span>
            “저 옷, 어디 거지
            <span className="bg-gradient-to-r from-brand to-accent bg-clip-text text-transparent">?</span>”
          </span>
        </motion.p>

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

const ROWS = [
  {
    word: "발견",
    en: "Discover",
    line: "좋아하는 스타일과 무드를 고르면, 피드가 내 취향으로 맞춰져요.",
    from: -1,
  },
  {
    word: "신뢰",
    en: "Trust",
    line: "룩과 구매처를 투명하게 잇고, 제휴 링크는 제휴라고 밝힙니다.",
    from: 1,
  },
  {
    word: "구매",
    en: "Shop",
    line: "룩에 쓰인 아이템을 신뢰할 수 있는 구매처에서 바로 만나요.",
    from: -1,
  },
] as const;

function WordRow({ row, i, still }: { row: (typeof ROWS)[number]; i: number; still: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center 0.55"] });
  const p = useSpring(scrollYProgress, WHEEL_SPRING);
  const x = useTransform(p, (v) => (still ? "0vw" : `${lerp(row.from * 26, 0, smooth(v)).toFixed(2)}vw`));
  const opacity = useTransform(p, (v) => (still ? 1 : lerp(0.12, 1, v)));
  const line = useTransform(p, (v) => (still ? 1 : span(v, 0.55, 1)));
  const right = row.from > 0;
  return (
    <div ref={ref} className="border-t border-line py-7 md:py-10">
      <div
        className={`flex flex-col gap-3 md:flex-row md:items-end md:gap-10 ${
          right ? "md:flex-row-reverse md:text-right" : ""
        }`}
      >
        <motion.p
          style={{ x, opacity }}
          className={`font-serif text-[clamp(84px,17vw,240px)] font-bold leading-[0.92] tracking-tight ${
            i === 1 ? "bg-gradient-to-r from-brand to-accent bg-clip-text text-transparent" : "text-navy"
          } ${right ? "self-end md:self-auto" : ""}`}
        >
          {row.word}
        </motion.p>
        <motion.div style={{ opacity: line }} className={`max-w-xs pb-3 md:pb-6 ${right ? "self-end md:self-auto" : ""}`}>
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-brand-dark">
            0{i + 1} — {row.en}
          </p>
          <p className="mt-2 break-keep text-[15px] leading-relaxed text-sub md:text-[17px]">{row.line}</p>
        </motion.div>
      </div>
    </div>
  );
}

/** 발견 · 신뢰 · 구매 — 세 단어가 휠을 따라 양쪽에서 미끄러져 들어온다. */
export function ThreeWords() {
  const reduce = useReducedMotion();
  return (
    <section className="overflow-hidden bg-cream-muted py-16 md:py-24">
      <div className="wrap">
        <span className="eyebrow">How it flows</span>
        <div className="mt-6 border-b border-line">
          {ROWS.map((row, i) => (
            <WordRow key={row.word} row={row} i={i} still={!!reduce} />
          ))}
        </div>
      </div>
    </section>
  );
}

/** 크리에이터 대시보드 화면 — 휠을 따라 살짝 떠오르며 기운다. */
export function CreatorPhone() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const p = useSpring(scrollYProgress, WHEEL_SPRING);
  const y = useTransform(p, (v) => (reduce ? 0 : lerp(70, -70, v)));
  const rotate = useTransform(p, (v) => (reduce ? 0 : lerp(6, -4, v)));
  return (
    <div ref={ref} className="flex justify-center">
      <motion.div style={{ y, rotate }}>
        <PhoneFrame w={250}>
          <ScreenShot shot={APP_SHOTS.creator} label="크리에이터" />
        </PhoneFrame>
      </motion.div>
    </div>
  );
}
