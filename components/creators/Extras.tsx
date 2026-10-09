"use client";
import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { WHEEL_SPRING, smooth, span } from "@/components/home/scroll";

export type Tier = { name: string; note: string; share: string };

function TierBar({
  p,
  i,
  tier,
  live,
}: {
  p: MotionValue<number>;
  i: number;
  tier: Tier;
  live: boolean;
}) {
  const pct = parseInt(tier.share, 10);
  const t = useTransform(p, (v) => smooth(span(v, 0.1 + i * 0.14, 0.5 + i * 0.14)));
  const count = useTransform(t, (v) => `${Math.round(pct * v)}%`);
  // 지금 실제로 적용되는 것은 첫 등급(전원 50%)뿐 — 나머지는 준비 중이라 점선으로만 그린다.
  const now = live || i === 0;
  return (
    <div className="flex h-full flex-1 flex-col justify-end">
      <motion.span className="mb-2 text-center font-serif text-[clamp(22px,3.4vw,40px)] font-bold text-navy">
        {count}
      </motion.span>
      <motion.div
        style={{ scaleY: t, height: `${(pct / 70) * 72}%` }}
        className={`origin-bottom rounded-t-[16px] ${
          now
            ? "bg-gradient-to-t from-brand to-accent"
            : "border-2 border-b-0 border-dashed border-brand/50 bg-brand-soft/70"
        }`}
      />
      <div className="border-t-2 border-navy pt-3 text-center">
        <p className="font-serif text-[clamp(15px,1.8vw,20px)] font-bold text-navy">{tier.name}</p>
        <p className="text-[11px] text-sub md:text-[13px]">{tier.note}</p>
        <span
          className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold md:text-[11px] ${
            now ? "bg-navy text-white" : "bg-white text-sub"
          }`}
        >
          {now ? (live ? "적용 중" : "지금 모두에게 적용") : "준비 중"}
        </span>
      </div>
    </div>
  );
}

/** 등급별 수익공유율 — 화면에 들어오는 동안 계단이 하나씩 올라간다. */
export function TierStairs({ tiers, live }: { tiers: Tier[]; live: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.75"] });
  const spring = useSpring(scrollYProgress, WHEEL_SPRING);
  const done = useMotionValue(1);
  const p = reduce ? done : spring;
  return (
    <section className="bg-cream-muted py-20 md:py-28">
      <div className="wrap">
        <span className="eyebrow">Tiers</span>
        <h2 className="mt-2 font-serif text-[clamp(24px,3.4vw,40px)] leading-tight text-navy">
          등급별 수익공유율{live ? "" : " (준비 중)"}
        </h2>
        <p className="mt-3 max-w-2xl break-keep text-[15px] leading-relaxed text-sub">
          {live
            ? "받은 저장 수가 쌓일수록 등급이 올라가고, 등급이 높을수록 확정 커미션에서 크리에이터가 가져가는 비율이 커집니다."
            : "지금은 모든 크리에이터에게 50%가 적용돼요. 아래 등급제는 준비 중이며, 시행 전에 미리 알려드려요."}
        </p>
        <div ref={ref} className="mt-10 flex h-[min(52svh,380px)] items-end gap-2 md:gap-5">
          {tiers.map((tier, i) => (
            <TierBar key={tier.name} p={p} i={i} tier={tier} live={live} />
          ))}
        </div>
      </div>
    </section>
  );
}

export type FaqItem = { q: string; a: string };

/** 자주 묻는 질문 — 누르면 펼쳐진다. 답은 접혀 있어도 문서에 그대로 들어 있다. */
export function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState(0);
  return (
    <section className="bg-cream py-20 md:py-24">
      <div className="wrap grid gap-8 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] md:gap-14">
        <div>
          <span className="eyebrow">FAQ</span>
          <h2 className="mt-2 font-serif text-[clamp(24px,3.4vw,40px)] leading-tight text-navy">
            자주 묻는 질문
          </h2>
        </div>
        <div className="border-t border-line">
          {items.map((f, i) => {
            const on = i === open;
            return (
              <div key={f.q} className="border-b border-line">
                <button
                  type="button"
                  aria-expanded={on}
                  onClick={() => setOpen(on ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="break-keep font-serif text-[clamp(17px,2vw,22px)] font-bold text-navy">
                    {f.q}
                  </span>
                  <span
                    aria-hidden
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-[18px] text-brand-dark transition-transform duration-300 ${
                      on ? "rotate-45 bg-brand-soft" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ${
                    on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="break-keep pb-6 pr-10 text-[15px] leading-relaxed text-sub">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
