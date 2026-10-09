"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from "framer-motion";
import { AiBadge } from "@/components/AiBadge";
import { SmartImg } from "@/components/SmartImg";
import { isAiImage } from "@/lib/aiGenerated";
import { wrapLinkPrice } from "@/lib/linkprice";
import type { Look } from "@/lib/looks";
import { PIN, PIN_OFFSET, WHEEL_SPRING } from "./scroll";

const pad = (n: number) => String(n).padStart(2, "0");

function RunwayCard({
  look,
  index,
  drift,
  fluid,
}: {
  look: Look;
  index: number;
  drift: MotionValue<string>;
  fluid: boolean; // 그리드 폴백에서는 칸 너비를 따른다
}) {
  const size = fluid ? "w-full" : "h-[min(62svh,560px)] flex-none";
  return (
    <article
      className={`group relative aspect-[3/4] overflow-hidden rounded-[22px] bg-gradient-to-br shadow-soft transition-shadow duration-300 hover:shadow-lift ${look.gradient} ${size}`}
    >
      {/* 사진은 카드보다 넓게 깔고, 트랙과 반대로 살짝 밀어 깊이를 만든다 */}
      <motion.div style={{ x: drift }} className="absolute inset-y-0 -inset-x-[9%]">
        <SmartImg src={look.image} alt={look.title} />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/15" />
      <span className="absolute left-3 top-3 rounded-full bg-white/85 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-ink backdrop-blur">
        {look.tag}
      </span>
      {isAiImage(look.image) ? <AiBadge /> : null}
      <div className="absolute inset-x-0 bottom-0 p-4">
        <span className="font-serif text-[13px] text-white/60">{pad(index + 1)}</span>
        <h3 className="font-serif text-[20px] leading-tight text-white drop-shadow-sm">
          {look.id ? (
            // 라이브 룩은 카드 전체가 상세(/ootd/[id])로 간다. 아래 구매처 칩만 그 위로 올라온다.
            <Link href={`/ootd/${look.id}`} className="after:absolute after:inset-0">
              {look.title}
            </Link>
          ) : (
            look.title
          )}
        </h3>
        {look.desc ? (
          <p className="mt-1 line-clamp-2 text-[13px] text-white/85">{look.desc}</p>
        ) : null}
        {look.shops.length > 0 ? (
          <div className="relative z-10 mt-3 flex flex-wrap gap-1.5">
            {look.shops.slice(0, 3).map((s) => (
              <a
                key={s.href}
                href={wrapLinkPrice(s.href)}
                target="_blank"
                rel="sponsored noopener"
                className="max-w-[9.5rem] truncate rounded-full border border-white/30 bg-white/15 px-2.5 py-1 text-[12px] font-semibold text-white backdrop-blur-md transition hover:bg-white hover:text-ink"
              >
                {s.label}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}

/**
 * 런웨이 — 세로 휠이 가로 이동으로 바뀌는 고정 구간. 트랙 길이만큼 구간 높이를 늘려 1:1로 움직인다.
 * 라이브 룩(앱 홈피드)이 있으면 그것을, 없으면 정적 에디터 룩을 보여 준다.
 */
export function Runway({ looks, live }: { looks: Look[]; live: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [travel, setTravel] = useState(0);
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => setTravel(Math.max(0, track.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [reduce]);

  const { scrollYProgress, scrollY } = useScroll({ target: sectionRef, offset: PIN_OFFSET });
  const p = useSpring(scrollYProgress, WHEEL_SPRING);
  const x = useTransform(p, (v) => -travel * v);
  const drift = useTransform(p, (v) => `${(v - 0.5) * 12}%`);
  const still = useMotionValue("0%");
  // 휠을 세게 굴리면 트랙이 진행 방향으로 살짝 눕는다.
  const lean = useSpring(useTransform(useVelocity(scrollY), [-3000, 3000], [5, -5]), {
    stiffness: 200,
    damping: 30,
  });

  useMotionValueEvent(p, "change", (v) => {
    const next = Math.min(looks.length, Math.max(1, Math.round(v * (looks.length - 1)) + 1));
    setCurrent((cur) => (cur === next ? cur : next));
  });

  const heading = (
    <div>
      <span className="eyebrow inline-flex items-center gap-2">
        {live ? <span className="h-2 w-2 animate-pulse rounded-full bg-point" /> : null}
        {live ? "Now on AURA · Live" : "Editor's Picks"}
      </span>
      <h2 className="mt-2 font-serif text-[clamp(26px,4.2vw,44px)] leading-tight text-navy">
        {live ? "지금 앱에 올라온 룩" : "이번 주의 룩"}
      </h2>
    </div>
  );

  if (reduce) {
    return (
      <section id="looks" ref={sectionRef} className="scroll-mt-16 py-16">
        <div className="wrap">
          <div className="mb-8 flex items-end justify-between gap-4">
            {heading}
            <Link href="/ootd" className="shrink-0 text-sm font-bold text-brand-dark hover:underline">
              전체 보기 →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
            {looks.map((look, i) => (
              <RunwayCard key={look.id ?? look.title} look={look} index={i} drift={still} fluid />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="looks"
      ref={sectionRef}
      className="relative scroll-mt-16 bg-cream"
      style={{ height: `calc(100svh - 4rem + ${travel}px)` }}
    >
      <div className={`${PIN} flex flex-col justify-center overflow-hidden`}>
        <div className="wrap flex items-end justify-between gap-4">
          {heading}
          <div className="shrink-0 text-right">
            <p className="font-serif text-[clamp(22px,3vw,34px)] leading-none text-navy">
              {pad(current)}
              <span className="text-hint"> / {pad(looks.length)}</span>
            </p>
            <p className="mt-1.5 hidden text-[12px] font-semibold text-sub sm:block">
              휠을 내리면 옆으로 넘어가요 →
            </p>
          </div>
        </div>

        <motion.div
          ref={trackRef}
          style={{ x, skewX: lean }}
          className="mt-6 flex w-max gap-4 pl-6 pr-6 sm:gap-5 min-[1152px]:pl-[calc((100vw-72rem)/2+1.5rem)]"
        >
          {looks.map((look, i) => (
            <RunwayCard
              key={look.id ?? look.title}
              look={look}
              index={i}
              drift={drift}
              fluid={false}
            />
          ))}
          <Link
            href="/ootd"
            className="group flex aspect-[3/4] h-[min(62svh,560px)] flex-none flex-col justify-between rounded-[22px] bg-navy p-6 text-white transition hover:bg-ink"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/60">
              OOTD · Live
            </span>
            <span>
              <span className="block font-serif text-[clamp(26px,3vw,36px)] leading-tight">
                전체 피드
                <br />
                보러 가기
              </span>
              <span className="mt-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-brand to-accent text-lg transition-transform group-hover:translate-x-1.5">
                →
              </span>
            </span>
          </Link>
        </motion.div>

        {/* 진행선 */}
        <div className="wrap mt-6">
          <div className="h-[2px] w-full overflow-hidden rounded-full bg-line">
            <motion.div
              style={{ scaleX: p }}
              className="h-full origin-left bg-gradient-to-r from-brand to-accent"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
