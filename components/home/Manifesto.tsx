"use client";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

const TEXT =
  "예쁜 코디를 봐도 “저 옷 어디 거지?”에서 멈춘 적 있죠. AURA는 영감을 행동으로 잇습니다. 룩을 발견하고, 신뢰할 수 있는 구매처에서, 그 자리에서 바로 따라 사요.";
const WORDS = TEXT.split(" ");
// 강조할 마지막 구절(브랜드 그라데이션).
const ACCENT_FROM = WORDS.length - 4;

function Word({
  p,
  i,
  children,
}: {
  p: MotionValue<number>;
  i: number;
  children: string;
}) {
  const from = i / WORDS.length;
  const opacity = useTransform(p, [from, from + 1.6 / WORDS.length], [0.16, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={
        i >= ACCENT_FROM
          ? "bg-gradient-to-r from-brand to-accent bg-clip-text text-transparent"
          : undefined
      }
    >
      {children}{" "}
    </motion.span>
  );
}

/** The Story — 휠을 내리는 만큼 문장이 한 어절씩 또렷해진다. */
export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.82", "end 0.55"] });

  return (
    <section className="bg-cream py-24 md:py-36">
      <div className="wrap max-w-5xl">
        <span className="eyebrow">The Story</span>
        <div ref={ref}>
          <p className="mt-5 break-keep font-serif text-[clamp(26px,4.4vw,56px)] font-bold leading-[1.28] tracking-tight text-navy">
            {WORDS.map((word, i) => (
              <Word key={i} p={scrollYProgress} i={i}>
                {word}
              </Word>
            ))}
          </p>
        </div>
        <div className="mt-9 flex flex-wrap gap-2.5">
          <Link href="/ootd" className="chip">
            OOTD 피드
          </Link>
          <Link href="/guides" className="chip">
            스타일 가이드
          </Link>
        </div>
      </div>
    </section>
  );
}
