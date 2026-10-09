"use client";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { SmartImg } from "@/components/SmartImg";
import { WHEEL_SPRING, clamp01 } from "@/components/home/scroll";
import { SceneSlug } from "@/components/story/shared";
import { hasPartnerLink, linkFor, type CoupangPick } from "@/lib/coupangPicks";

const pad = (n: number) => String(n).padStart(2, "0");

// 도입 화면에 흩어 놓는 상품 컷 — 자리·기울기·휠을 따라 흐르는 속도(클수록 빨리 올라간다).
const SCATTER = [
  { box: "left-[-7%] top-[5%] w-[30vw] max-w-[210px] md:left-[4%] md:top-[11%]", rot: -8, speed: 0.22 },
  { box: "right-[-6%] top-[9%] w-[27vw] max-w-[190px] md:right-[6%] md:top-[8%]", rot: 7, speed: 0.4 },
  { box: "bottom-[5%] left-[1%] w-[26vw] max-w-[170px] md:bottom-[9%] md:left-[13%]", rot: 6, speed: 0.55 },
  { box: "bottom-[7%] right-[-3%] w-[30vw] max-w-[220px] md:bottom-[7%] md:right-[13%]", rot: -5, speed: 0.3 },
  { box: "hidden lg:block left-[28%] bottom-[-4%] w-[130px]", rot: -3, speed: 0.7 },
  { box: "hidden lg:block right-[30%] top-[-3%] w-[140px]", rot: 4, speed: 0.62 },
] as const;

function Scattered({
  scrollY,
  pick,
  i,
  still,
}: {
  scrollY: MotionValue<number>;
  pick: CoupangPick;
  i: number;
  still: boolean;
}) {
  const s = SCATTER[i % SCATTER.length];
  const y = useTransform(scrollY, (v) => (still ? 0 : -v * s.speed));
  const rotate = useTransform(scrollY, (v) => (still ? s.rot : s.rot + v * 0.012 * (i % 2 ? 1 : -1)));
  return (
    <motion.div style={{ y, rotate }} className={`absolute ${s.box}`} aria-hidden>
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.15 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
        className={`relative aspect-[3/4] w-full overflow-hidden rounded-[14px] border-[5px] border-white bg-gradient-to-br shadow-lift ${pick.gradient}`}
      >
        <SmartImg src={pick.image} alt="" eager />
      </motion.div>
    </motion.div>
  );
}

/** 도입 — 옷장 앞의 아침. 상품 컷들이 흩어져 있다가 휠을 내리면 저마다 다른 속도로 흘러 올라간다. */
export function PicksHero({ picks }: { picks: CoupangPick[] }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const fade = useTransform(scrollY, [0, 420], [1, 0]);
  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden bg-cream">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(241,236,251,0.95),transparent_62%)]" />
      {picks.slice(0, SCATTER.length).map((pick, i) => (
        <Scattered key={pick.title} scrollY={scrollY} pick={pick} i={i} still={!!reduce} />
      ))}

      <motion.div style={{ opacity: reduce ? 1 : fade }} className="wrap relative z-10 text-center">
        <SceneSlug className="text-brand-dark">Scene — 토요일 오전 10시 · 옷장 앞</SceneSlug>
        <p className="mx-auto mt-6 max-w-3xl break-keep font-serif text-[clamp(30px,5.4vw,72px)] font-bold leading-[1.14] tracking-tight text-navy">
          입을 건 많은데,
          <br />
          손이 가는 건{" "}
          <span className="bg-gradient-to-r from-brand to-accent bg-clip-text text-transparent">
            늘 하나.
          </span>
        </p>
        <h1 className="mt-7 text-[13px] font-bold uppercase tracking-[0.22em] text-brand-dark">
          AURA Picks — 오늘의 따라사기
        </h1>
        <p className="mx-auto mt-3 max-w-xl break-keep text-[clamp(15px,1.7vw,18px)] text-sub">
          AURA 에디터가 고른 이번 주 패션·뷰티 아이템. 마음에 드는 상품은 쿠팡에서 바로
          만나보세요.
        </p>
        <span className="mt-9 inline-flex flex-col items-center gap-2 text-sub" aria-hidden>
          <span className="flex h-9 w-[22px] justify-center rounded-full border-[1.5px] border-sub/60 pt-1.5">
            <span className="wheel-dot h-1.5 w-1 rounded-full bg-sub" />
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Scroll</span>
        </span>
      </motion.div>
    </section>
  );
}

const TINTS = ["bg-white", "bg-[#F4EEFF]", "bg-[#FFF0F6]", "bg-[#F3EFE6]"];

function StackCard({
  p,
  pick,
  i,
  n,
  still,
}: {
  p: MotionValue<number>;
  pick: CoupangPick;
  i: number;
  n: number;
  still: boolean;
}) {
  // 뒤이어 올라온 카드가 덮는 만큼 살짝 작아지고 어두워진다.
  const over = useTransform(p, (v) => (still ? 0 : Math.max(0, v * (n - 1) - i - 0.45)));
  const covered = useTransform(over, (o) => clamp01(o / 0.55));
  const scale = useTransform(over, (o) => 1 - o * 0.04);
  const shade = useTransform(covered, (c) => c * 0.28);
  const partnerReady = hasPartnerLink(pick);
  return (
    <div
      className="sticky mb-[18svh] last:mb-0"
      style={{ top: `calc(4rem + ${14 + i * 12}px)` }}
    >
      <motion.article
        style={{ scale }}
        className={`relative grid h-[min(calc(100svh-4rem-6.5rem),640px)] origin-top grid-rows-[minmax(0,46%)_minmax(0,1fr)] overflow-hidden rounded-[28px] border border-line shadow-lift md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:grid-rows-1 ${TINTS[i % TINTS.length]}`}
      >
        <div className={`group relative overflow-hidden bg-gradient-to-br ${pick.gradient}`}>
          <motion.div
            initial={still ? false : { scale: 1.18 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <SmartImg src={pick.image} alt={pick.title} />
          </motion.div>
        </div>

        <div className="flex min-h-0 flex-col justify-center p-5 md:p-12">
          <p className="font-serif text-[clamp(15px,1.6vw,20px)] text-brand">
            {pad(i + 1)} <span className="text-hint">/ {pad(n)}</span>
          </p>
          <span className="mt-2 w-fit rounded-full bg-navy px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white md:mt-4">
            {pick.tag}
          </span>
          <h2 className="mt-3 break-keep font-serif text-[clamp(21px,3.2vw,44px)] font-bold leading-[1.16] text-navy md:mt-5">
            {pick.title}
          </h2>
          <p className="mt-2 line-clamp-3 break-keep text-[14px] leading-relaxed text-sub md:mt-4 md:text-[17px]">
            {pick.desc}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2.5 md:mt-8">
            <a href={linkFor(pick)} target="_blank" rel="nofollow sponsored noopener" className="btn">
              쿠팡에서 구매하기 →
            </a>
            {!partnerReady ? (
              <span
                title="파트너스 링크 미연결 — 수수료 미집계"
                className="rounded-full bg-amber-400/90 px-2 py-1 text-[10px] font-bold text-ink"
              >
                제휴 링크 연결 전
              </span>
            ) : null}
          </div>
        </div>

        <motion.div
          aria-hidden
          style={{ opacity: shade }}
          className="pointer-events-none absolute inset-0 bg-navy"
        />
      </motion.article>
    </div>
  );
}

/** 픽 덱 — 카드가 한 장씩 올라와 앞 장 위에 쌓인다. 한 화면에 상품 하나만 크게 본다. */
export function PicksStack({ picks }: { picks: CoupangPick[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80px", "end end"] });
  const p = useSpring(scrollYProgress, WHEEL_SPRING);
  return (
    <div ref={ref} className="relative">
      {picks.map((pick, i) => (
        <StackCard key={pick.title} p={p} pick={pick} i={i} n={picks.length} still={!!reduce} />
      ))}
    </div>
  );
}
