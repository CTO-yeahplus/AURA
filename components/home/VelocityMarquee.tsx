"use client";
import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

function wrap(min: number, max: number, v: number): number {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

/** 한 줄 — 평소엔 baseVelocity(%/초)로 흐르다, 휠을 굴리면 그 속도·방향을 따라간다. */
function Row({
  items,
  baseVelocity,
  className,
}: {
  items: readonly string[];
  baseVelocity: number;
  className: string;
}) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [0, 1000], [0, 4], { clamp: false });
  const skewX = useTransform(velocity, [-2400, 2400], [10, -10]);
  // 같은 목록을 두 번 이어 붙였으므로 -50%~0% 사이를 돌면 끊김이 없다.
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const b = boost.get();
    if (b < 0) dir.current = -1;
    else if (b > 0) dir.current = 1;
    const step = dir.current * baseVelocity * (Math.min(delta, 64) / 1000);
    baseX.set(baseX.get() + step + step * Math.abs(b));
  });

  return (
    <motion.div style={{ x, skewX: reduce ? 0 : skewX }} className="flex w-max whitespace-nowrap">
      {[0, 1].map((dup) => (
        <div key={dup} aria-hidden={dup === 1} className="flex">
          {items.map((m) => (
            <span key={m} className={className}>
              {m} <span className="mx-4 text-brand">✦</span>
            </span>
          ))}
        </div>
      ))}
    </motion.div>
  );
}

/** 입점 브랜드·무드 티커 — 두 줄이 반대로 흐르고, 휠 속도에 맞춰 빨라지고 기운다. */
export function VelocityMarquee({
  brands,
  moods,
}: {
  brands: readonly string[];
  moods: readonly string[];
}) {
  return (
    <div className="overflow-hidden border-y border-line bg-cream py-5">
      <Row
        items={brands}
        baseVelocity={-1.6}
        className="pr-2 font-serif text-[clamp(20px,2.6vw,30px)] tracking-wide text-sub"
      />
      <div className="mt-2.5">
        <Row
          items={moods}
          baseVelocity={1.6}
          className="pr-2 text-[clamp(13px,1.5vw,16px)] font-bold tracking-wide text-brand-dark/70"
        />
      </div>
    </div>
  );
}
