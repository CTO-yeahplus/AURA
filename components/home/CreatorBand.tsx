"use client";
import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { WHEEL_SPRING, lerp, span } from "./scroll";

// 수치는 크리에이터 안내(/creators)·이용약관 제5조와 같은 값만 쓴다.
const FACTS = [
  {
    k: "확정 제휴 커미션의 50%",
    d: "내 룩의 따라사기로 구매가 확정되면 절반이 크리에이터 몫으로 적립돼요.",
  },
  {
    k: "월 1회 정산 · 최소 ₩10,000",
    d: "확정·예상 수익은 앱의 ‘내 정산’에서 언제든 나눠 볼 수 있어요.",
  },
  {
    k: "AI 화보 무료 생성 월 10회 · 30회",
    d: "AURA+는 매월 10회, AURA+ Pro는 매월 30회 생성 크레딧이 포함돼요.",
  },
];

function Fact({
  p,
  i,
  fact,
}: {
  p: MotionValue<number>;
  i: number;
  fact: (typeof FACTS)[number];
}) {
  const t = useTransform(p, (v) => span(v, 0.18 + i * 0.12, 0.5 + i * 0.12));
  const x = useTransform(t, (v) => lerp(90 + i * 50, 0, v));
  const opacity = useTransform(t, (v) => lerp(0.25, 1, v));
  return (
    <motion.li style={{ x, opacity }} className="border-t border-white/15 py-5">
      <p className="font-serif text-[clamp(19px,2.2vw,26px)] font-bold text-white">{fact.k}</p>
      <p className="mt-1.5 break-keep text-[14px] leading-relaxed text-white/75">{fact.d}</p>
    </motion.li>
  );
}

/** Creators — 화면에 들어오는 동안 숫자가 0에서 50까지 차오르고, 사실 세 줄이 옆에서 밀려 들어온다. */
export function CreatorBand() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const spring = useSpring(scrollYProgress, WHEEL_SPRING);
  const done = useTransform(scrollYProgress, () => 1);
  const p = reduce ? done : spring;

  const count = useTransform(p, (v) => Math.round(50 * span(v, 0.15, 0.95)));
  const numberY = useTransform(p, (v) => lerp(60, 0, v));
  const glow = useTransform(p, (v) => lerp(0.15, 0.55, v));

  return (
    <section ref={ref} className="grain relative overflow-hidden bg-navy py-20 md:py-28">
      <motion.div
        aria-hidden
        style={{ opacity: glow }}
        className="absolute -left-[10%] top-1/2 h-[70vw] w-[70vw] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.5),rgba(139,92,246,0.25)_45%,transparent_70%)]"
      />
      <div className="wrap relative grid items-center gap-10 md:grid-cols-2 md:gap-14">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-white/70">
            Creators &amp; AURA+
          </span>
          <motion.p
            style={{ y: numberY }}
            className="mt-2 font-serif text-[clamp(110px,20vw,260px)] font-bold leading-none tracking-tight text-white"
            aria-label="50퍼센트"
          >
            <motion.span>{count}</motion.span>
            <span className="bg-gradient-to-r from-brand to-accent bg-clip-text text-transparent">
              %
            </span>
          </motion.p>
          <h2 className="mt-6 font-serif text-[clamp(24px,3.4vw,38px)] leading-tight text-white md:mt-8">
            좋아하는 코디가
            <br />
            수익이 되는 구조.
          </h2>
        </div>

        <div>
          <ul className="border-b border-white/15">
            {FACTS.map((fact, i) => (
              <Fact key={fact.k} p={p} i={i} fact={fact} />
            ))}
          </ul>
          <p className="mt-5 break-keep text-[13px] leading-relaxed text-white/60">
            수익 적립·정산은 만 19세 이상 크리에이터(AURA+ Pro 또는 파트너십 지정)에게 열려 있어요.
          </p>
          <Link
            href="/creators"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-ink"
          >
            크리에이터 수익 구조 보기 →
          </Link>
        </div>
      </div>
    </section>
  );
}
