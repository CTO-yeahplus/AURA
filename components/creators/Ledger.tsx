"use client";
import { useRef, useState, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  PIN,
  PIN_OFFSET,
  WHEEL_SPRING,
  lerp,
  scrollToStep,
  smooth,
  span,
} from "@/components/home/scroll";

export type FlowStep = { n: string; t: string; d: string };

// 정산서 예시 숫자 — 크리에이터 안내의 비율만 쓴다: 크리에이터 몫 = 구매액의 약 4%(확정 커미션의 50%),
// 지급 시 원천징수 3.3%. 금액 자체는 이해를 돕기 위한 가정이다.
const SALES = 500_000;
const SHARE = SALES * 0.04;
const TAX = SHARE * 0.033;
const NET = SHARE - TAX;

const won = (n: number, unit: number) =>
  `₩${(Math.round(n / unit) * unit).toLocaleString("ko-KR")}`;

/** 정산서 한 줄 — 제 단계가 되면 찍혀 나온다. */
function Row({
  f,
  i,
  label,
  note,
  children,
}: {
  f: MotionValue<number>;
  i: number;
  label: string;
  note?: string;
  children: ReactNode;
}) {
  const t = useTransform(f, (v) => (i === 0 ? 1 : span(v, i - 0.05, i + 0.3)));
  const y = useTransform(t, (v) => lerp(10, 0, smooth(v)));
  return (
    <motion.div style={{ opacity: t, y }} className="py-2.5">
      <div className="flex items-baseline gap-2">
        <span className="font-mono text-[11px] text-hint">{String(i + 1).padStart(2, "0")}</span>
        <span className="text-[14px] font-semibold text-ink">{label}</span>
        <span aria-hidden className="mb-1 flex-1 border-b border-dotted border-line" />
        <span className="font-mono text-[14px] font-bold tabular-nums text-ink">{children}</span>
      </div>
      {note ? <p className="pl-6 text-[11px] text-sub">{note}</p> : null}
    </motion.div>
  );
}

/**
 * 수익의 흐름 — 고정 구간. 휠 한 단계마다 왼쪽 설명이 넘어가고, 오른쪽 정산서에 한 줄씩 찍혀
 * 마지막에 실수령액과 지급 도장이 남는다.
 */
export function Ledger({ steps }: { steps: FlowStep[] }) {
  const N = steps.length;
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: PIN_OFFSET });
  const spring = useSpring(scrollYProgress, WHEEL_SPRING);
  const last = useMotionValue(1);
  const p = reduce ? last : spring;
  const f = useTransform(p, (v) => v * N); // 0 ~ N

  useMotionValueEvent(f, "change", (v) => {
    const next = Math.min(N - 1, Math.max(0, Math.floor(v + 0.02)));
    setActive((cur) => (cur === next ? cur : next));
  });

  const sales = useTransform(f, (v) => won(SALES * span(v, 1.05, 1.55), 1000));
  const share = useTransform(f, (v) => won(SHARE * span(v, 3.05, 3.55), 100));
  const tax = useTransform(f, (v) => `−${won(TAX * span(v, 4.05, 4.4), 10)}`);
  const net = useTransform(f, (v) => won(NET * span(v, 4.4, 4.78), 10));
  const check = useTransform(f, (v) => span(v, 0.1, 0.5));
  const pending = useTransform(f, (v) => 1 - span(v, 2.45, 2.65));
  const confirmed = useTransform(f, (v) => span(v, 2.5, 2.75));
  const total = useTransform(f, (v) => span(v, 4.35, 4.6));
  const stamp = useTransform(f, (v) => span(v, 4.8, 4.93));
  const stampScale = useTransform(stamp, (t) => lerp(1.7, 1, smooth(t)));
  const paperRotate = useTransform(p, (v) => lerp(-2.5, 1.5, v));
  const paperY = useTransform(p, (v) => lerp(18, -8, v));
  const fill = useTransform(p, (v) => Math.min(1, v * 1.02));

  const heading = (
    <div>
      <span className="eyebrow">The Flow</span>
      <h2 className="mt-2 break-keep font-serif text-[clamp(24px,3.4vw,40px)] leading-tight text-navy">
        크리에이터 수익, 이렇게 흐릅니다
      </h2>
    </div>
  );

  const receipt = (
    <motion.div
      style={reduce ? undefined : { rotate: paperRotate, y: paperY }}
      className="relative w-full max-w-[380px]"
    >
      <div className="relative rounded-t-[10px] bg-white px-5 pb-5 pt-5 shadow-lift md:px-6">
        <div className="flex items-end justify-between border-b border-dashed border-line pb-3">
          <div>
            <p className="font-serif text-[20px] font-bold text-navy">내 정산</p>
            <p className="text-[11px] text-sub">AURA · 이번 달</p>
          </div>
          <span className="rounded-full bg-brand-soft px-2.5 py-1 text-[10px] font-bold text-brand-dark">
            예시
          </span>
        </div>

        <Row f={f} i={0} label="룩 · 따라사기 업로드">
          <motion.span style={{ opacity: check }} className="text-emerald-600">
            ✓
          </motion.span>
        </Row>
        <Row f={f} i={1} label="팔로워 구매">
          <motion.span>{sales}</motion.span>
        </Row>
        <Row f={f} i={2} label="전환 확인">
          <span className="relative inline-block h-[22px] w-[52px] align-middle">
            <motion.span
              style={{ opacity: pending }}
              className="absolute inset-0 flex items-center justify-center rounded-full bg-amber-100 font-sans text-[11px] text-amber-700"
            >
              예상
            </motion.span>
            <motion.span
              style={{ opacity: confirmed }}
              className="absolute inset-0 flex items-center justify-center rounded-full bg-emerald-100 font-sans text-[11px] text-emerald-700"
            >
              확정
            </motion.span>
          </span>
        </Row>
        <Row f={f} i={3} label="크리에이터 몫 50%" note="구매액의 약 4%">
          <motion.span>{share}</motion.span>
        </Row>
        <Row f={f} i={4} label="원천징수 3.3%">
          <motion.span>{tax}</motion.span>
        </Row>

        <motion.div
          style={{ opacity: total }}
          className="mt-2 flex items-baseline justify-between border-t border-dashed border-line pt-3.5"
        >
          <span className="text-[14px] font-bold text-ink">실수령</span>
          <motion.span className="bg-gradient-to-r from-brand to-accent bg-clip-text font-mono text-[26px] font-bold tabular-nums text-transparent">
            {net}
          </motion.span>
        </motion.div>

        <motion.span
          aria-hidden
          style={{ opacity: stamp, scale: stampScale }}
          className="absolute bottom-3.5 left-[30%] -rotate-[12deg] bg-white/80 rounded-md border-[3px] border-point px-2.5 py-1 text-[13px] font-bold tracking-[0.2em] text-point"
        >
          지급 완료
        </motion.span>
      </div>
      <div aria-hidden className="receipt-edge h-[6px] w-full" />
      <p className="mt-3 break-keep text-[11px] leading-relaxed text-sub">
        이해를 돕기 위한 예시예요. 실제 수수료율은 판매처·상품에 따라 다르고, 출금 가능액에는
        확정분만 반영됩니다.
      </p>
    </motion.div>
  );

  if (reduce) {
    return (
      <section ref={ref} className="bg-cream py-16">
        <div className="wrap grid gap-10 md:grid-cols-2">
          <div>
            {heading}
            <ol className="mt-6 space-y-5">
              {steps.map((s) => (
                <li key={s.n}>
                  <p className="font-serif text-[20px] font-bold text-navy">
                    <span className="mr-2 text-brand">{s.n}</span>
                    {s.t}
                  </p>
                  <p className="mt-1 break-keep text-[14px] leading-relaxed text-sub">{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
          {receipt}
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative bg-cream" style={{ height: `${N * 85 + 100}vh` }}>
      <div className={`${PIN} overflow-hidden`}>
        <div className="wrap grid h-full grid-rows-[auto_auto_minmax(0,1fr)] items-center gap-y-3 py-4 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:grid-rows-1 md:gap-x-14 md:py-0">
          <div className="md:hidden">{heading}</div>

          {/* 정산서 */}
          <div className="order-2 flex justify-center md:order-2">{receipt}</div>

          {/* 단계 설명 */}
          <div className="order-3 self-start md:order-1 md:self-center">
            <div className="hidden md:block">{heading}</div>
            <div className="relative md:mt-7 md:pl-7">
              {/* 진행선(데스크톱) */}
              <div aria-hidden className="absolute bottom-2 left-0 top-2 hidden w-[2px] bg-line md:block">
                <motion.div
                  style={{ scaleY: fill }}
                  className="h-full w-full origin-top bg-gradient-to-b from-brand to-accent"
                />
              </div>
              <ol>
                {steps.map((s, i) => {
                  const on = i === active;
                  return (
                    <li key={s.n} className={on ? "" : "hidden md:block"}>
                      <button
                        type="button"
                        onClick={() => scrollToStep(ref.current, i, N)}
                        aria-current={on ? "step" : undefined}
                        className={`block w-full py-2 text-left transition-opacity duration-300 md:py-2.5 ${
                          on ? "opacity-100" : "opacity-40 hover:opacity-75"
                        }`}
                      >
                        <span className="flex items-baseline gap-3">
                          <span
                            className={`font-serif text-[20px] md:text-[24px] ${
                              on ? "text-brand" : "text-sub"
                            }`}
                          >
                            {s.n}
                          </span>
                          <span className="break-keep font-serif text-[19px] font-bold text-navy md:text-[23px]">
                            {s.t}
                          </span>
                        </span>
                        <span
                          className={`grid transition-[grid-template-rows] duration-300 ${
                            on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                          }`}
                        >
                          <span className="overflow-hidden">
                            <span className="block break-keep pt-1.5 text-[14px] leading-relaxed text-sub md:pl-10 md:text-[15px]">
                              {s.d}
                            </span>
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
            {/* 단계 점(모바일) */}
            <div className="mt-2 flex gap-1.5 md:hidden">
              {steps.map((s, i) => (
                <button
                  key={s.n}
                  type="button"
                  aria-label={`${s.n} ${s.t}`}
                  onClick={() => scrollToStep(ref.current, i, N)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === active ? "w-7 bg-gradient-to-r from-brand to-accent" : "w-1.5 bg-line"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
