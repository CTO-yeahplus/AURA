"use client";
import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { AiBadge } from "@/components/AiBadge";
import { SmartImg } from "@/components/SmartImg";
import { WHEEL_SPRING, lerp } from "@/components/home/scroll";
import { isAiImage } from "@/lib/aiGenerated";
import { APP_STORE_URL } from "@/lib/app";

type ScrollOffset = NonNullable<Parameters<typeof useScroll>[0]>["offset"];

/** 장면 머리 — 때·곳을 먼저 적는 한 줄(시나리오의 씬 헤딩처럼). */
export function SceneSlug({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] ${className}`}
    >
      <span aria-hidden className="h-px w-8 bg-current opacity-50" />
      {children}
    </span>
  );
}

function Word({
  p,
  i,
  n,
  accent,
  children,
}: {
  p: MotionValue<number>;
  i: number;
  n: number;
  accent: boolean;
  children: string;
}) {
  const opacity = useTransform(p, [i / n, i / n + 1.6 / n], [0.16, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={
        accent ? "bg-gradient-to-r from-brand to-accent bg-clip-text text-transparent" : undefined
      }
    >
      {children}{" "}
    </motion.span>
  );
}

/** 휠을 내리는 만큼 한 어절씩 또렷해지는 문장. accentLast는 끝에서 몇 어절을 브랜드 색으로 칠할지. */
export function WordReveal({
  text,
  className = "",
  accentLast = 0,
  offset = ["start 0.82", "end 0.55"],
}: {
  text: string;
  className?: string;
  accentLast?: number;
  offset?: ScrollOffset;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset });
  const words = text.split(" ");
  return (
    <p ref={ref} className={`break-keep ${className}`}>
      {words.map((word, i) => (
        <Word key={i} p={scrollYProgress} i={i} n={words.length} accent={i >= words.length - accentLast}>
          {word}
        </Word>
      ))}
    </p>
  );
}

/** 홈피드 룩 사진 한 장 — 실패하면 그라데이션이 남고, AI 화보면 배지가 붙는다. */
export function LookShot({
  src,
  alt,
  className = "",
  badgeClassName,
  children,
}: {
  src: string;
  alt: string;
  className?: string;
  badgeClassName?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-brand to-accent shadow-[0_40px_90px_rgba(0,0,0,0.45)] ${className}`}
    >
      <SmartImg src={src} alt={alt} eager />
      {isAiImage(src) ? <AiBadge className={badgeClassName} /> : null}
      {children}
    </div>
  );
}

/** 마지막 장 — 휠을 내리는 동안 펼쳐지는 다운로드 카드. */
export function StoryCta({
  eyebrow = "Now on the App Store",
  title,
  body,
}: {
  eyebrow?: string;
  title: ReactNode;
  body: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const p = useSpring(scrollYProgress, WHEEL_SPRING);
  const scale = useTransform(p, (v) => (reduce ? 1 : lerp(0.86, 1, v)));
  const radius = useTransform(p, (v) => (reduce ? 28 : lerp(56, 28, v)));
  return (
    <section ref={ref} className="py-16">
      <div className="wrap">
        <motion.div
          style={{ scale, borderRadius: radius }}
          className="grain relative overflow-hidden bg-gradient-to-br from-navy to-[#4c2e63] px-6 py-16 text-center md:py-20"
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/70">
            {eyebrow}
          </span>
          <h2 className="mt-4 break-keep font-serif text-[clamp(28px,5vw,56px)] leading-tight text-white">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-lg break-keep text-white/85">{body}</p>
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-[15px] font-bold text-ink transition hover:scale-[1.03]"
          >
            App Store에서 받기 →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
