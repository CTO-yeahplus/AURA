"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { AiBadge } from "@/components/AiBadge";
import { WHEEL_SPRING, lerp, smooth, span } from "@/components/home/scroll";
import { SceneSlug } from "@/components/story/shared";
import { isAiImage } from "@/lib/aiGenerated";
import type { Guide, GuideSection } from "@/lib/guides";
import { wrapLinkPrice } from "@/lib/linkprice";
import { LookImg } from "./GuidesStory";

const pad = (n: number) => String(n).padStart(2, "0");
const won = (n?: number) => (typeof n === "number" ? `₩${n.toLocaleString("ko-KR")}` : "");

type Shot = { src: string; look: string; n: number };

function Strip({ scrollY, shot, i, still }: { scrollY: MotionValue<number>; shot: Shot; i: number; still: boolean }) {
  // 처음엔 높낮이가 엇갈려 서 있다가, 휠을 내리면 한 줄로 맞춰 선다.
  const from = i % 2 === 0 ? 46 : -30;
  const y = useTransform(scrollY, (v) => (still ? 0 : lerp(from, 0, smooth(span(v, 0, 380)))));
  const zoom = useTransform(scrollY, (v) => (still ? 1 : lerp(1.16, 1, span(v, 0, 520))));
  return (
    <motion.a
      href={`#look-${shot.n}`}
      aria-label={`Look ${shot.n} — ${shot.look}`}
      style={{ y }}
      className={`group relative h-full min-w-0 flex-1 overflow-hidden rounded-[18px] bg-gradient-to-br from-brand to-accent transition-[flex-grow] duration-500 ease-out hover:flex-[1.7] ${
        i >= 3 ? "hidden sm:block" : ""
      }`}
    >
      <motion.div style={{ scale: zoom }} className="absolute inset-0">
        <LookImg src={shot.src} alt={shot.look} width={600} eager />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      {isAiImage(shot.src) ? <AiBadge className="right-2 top-2" /> : null}
      <span className="absolute inset-x-3 bottom-3 text-white">
        <span className="block font-serif text-[15px]">{pad(shot.n)}</span>
        <span className="block truncate text-[12px] font-semibold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {shot.look}
        </span>
      </span>
    </motion.a>
  );
}

/**
 * 가이드 머리 — 이 가이드가 어울리는 날의 장면으로 열고, 룩들이 엇갈린 높이로 서 있다가
 * 휠을 내리면 한 줄로 맞춰 선다. 사진에 마우스를 올리면 그 장이 넓어진다.
 */
export function ArticleHero({ guide }: { guide: Guide }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const shots: Shot[] = guide.sections
    .map((s, i) => ({ src: s.image, look: s.look, n: i + 1 }))
    .filter((x): x is Shot => !!x.src)
    .slice(0, 5);
  const lineup = shots.length >= 3 ? shots : null;

  return (
    <section className="grain relative overflow-hidden bg-ink pb-14 pt-9 text-white md:pb-20">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(139,92,246,0.42),transparent_60%)]"
      />
      <div className="wrap relative">
        <Link href="/guides" className="text-sm font-semibold text-white/60 hover:text-white">
          ← 스타일 가이드
        </Link>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {guide.scene ? (
            <>
              <SceneSlug className="mt-8 text-white/60">Scene — {guide.scene.when}</SceneSlug>
              <p className="mt-4 max-w-3xl break-keep font-serif text-[clamp(22px,3.2vw,40px)] leading-snug text-white/85">
                {guide.scene.line}
              </p>
            </>
          ) : null}
          <span className="mt-8 block text-[11px] font-bold uppercase tracking-[0.14em] text-white/55">
            {[guide.category, guide.updated].filter(Boolean).join(" · ")}
          </span>
          <h1 className="mt-2 max-w-4xl break-keep font-serif text-[clamp(28px,5vw,62px)] font-bold leading-[1.14] tracking-tight">
            {guide.title}
          </h1>
          <p className="mt-3 max-w-2xl break-keep text-[clamp(15px,1.8vw,19px)] text-white/75">
            {guide.dek}
          </p>
        </motion.div>

        {lineup ? (
          <div className="mt-12 flex h-[min(48svh,420px)] gap-1.5 sm:gap-2.5 md:mt-16 md:h-[min(62svh,560px)]">
            {lineup.map((shot, i) => (
              <Strip key={shot.n} scrollY={scrollY} shot={shot} i={i} still={!!reduce} />
            ))}
          </div>
        ) : guide.image ? (
          <div className="relative mt-12 aspect-[16/9] w-full overflow-hidden rounded-[18px] bg-gradient-to-br from-brand to-accent">
            <LookImg src={guide.image} alt={guide.title} width={1200} eager />
            {isAiImage(guide.image) ? <AiBadge className="left-3 top-3" /> : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}

/** 룩 한 벌 — 사진과 글이 휠을 따라 서로 다른 속도로 지나가고, 아이템은 한 줄씩 밀려 들어온다. */
export function LookSection({ s, i }: { s: GuideSection; i: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const p = useSpring(scrollYProgress, WHEEL_SPRING);
  const flip = i % 2 === 1;
  const imgY = useTransform(p, (v) => (reduce ? 0 : lerp(60, -60, v)));
  const imgRotate = useTransform(p, (v) => (reduce ? 0 : lerp(flip ? 3 : -3, 0, smooth(span(v, 0.1, 0.5)))));
  const numY = useTransform(p, (v) => (reduce ? 0 : lerp(-70, 70, v)));
  const textY = useTransform(p, (v) => (reduce ? 0 : lerp(-24, 24, v)));

  return (
    <section ref={ref} id={`look-${i + 1}`} className="scroll-mt-20 overflow-hidden py-12 md:py-24">
      <div className="wrap grid grid-cols-[minmax(0,1fr)] items-center gap-8 md:grid-cols-2 md:gap-16">
        <div className={`relative ${flip ? "md:order-2" : ""}`}>
          {/* 사진 뒤로 지나가는 큰 숫자 */}
          <motion.span
            aria-hidden
            style={{ y: numY }}
            className={`absolute -top-10 font-serif text-[clamp(110px,17vw,250px)] font-bold leading-none text-brand/15 ${
              flip ? "-right-3 md:-right-10" : "-left-3 md:-left-10"
            }`}
          >
            {pad(i + 1)}
          </motion.span>
          <motion.div
            style={{ y: imgY, rotate: imgRotate }}
            className={`group relative mx-auto aspect-[3/4] w-full max-w-[460px] overflow-hidden rounded-[24px] bg-gradient-to-br shadow-lift ${s.gradient}`}
          >
            <LookImg src={s.image} alt={s.look} width={900} />
            {isAiImage(s.image) ? <AiBadge /> : null}
          </motion.div>
        </div>

        <motion.div style={{ y: textY }}>
          <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-brand-dark">
            Look {pad(i + 1)}
          </span>
          <h2 className="mt-1.5 break-keep font-serif text-[clamp(24px,3.4vw,42px)] font-bold leading-tight text-navy">
            {s.look}
          </h2>
          <p className="mt-4 break-keep text-[16px] leading-[1.8] text-ink md:text-[17px]">{s.body}</p>

          <div className="mt-6 space-y-2.5">
            {s.items.map((item, k) => (
              <motion.a
                key={item.label}
                href={wrapLinkPrice(item.href)}
                target="_blank"
                rel="nofollow sponsored noopener"
                initial={reduce ? false : { opacity: 0, x: 36 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: k * 0.09, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center justify-between rounded-2xl border border-line bg-white px-4 py-3 transition-colors hover:border-brand-dark"
              >
                <span className="min-w-0">
                  <span className="block truncate text-[15px] font-semibold text-ink">{item.label}</span>
                  <span className="block truncate text-[13px] text-sub">
                    {[item.brand, won(item.priceKrw)].filter(Boolean).join(" · ")}
                  </span>
                </span>
                <span className="ml-3 shrink-0 rounded-full bg-brand-dark px-3.5 py-1.5 text-[13px] font-bold text-white">
                  쇼핑 →
                </span>
              </motion.a>
            ))}
          </div>

          {s.lookId ? (
            <Link
              href={`/ootd/${s.lookId}`}
              className="mt-4 inline-block text-[13px] font-bold text-brand-dark hover:underline"
            >
              이 룩을 피드에서 보기 →
            </Link>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}

/** 옆 길잡이 — 지금 읽는 룩에 불이 들어오고, 누르면 그 룩으로 간다(데스크톱). */
export function LookNav({ looks }: { looks: string[] }) {
  const [active, setActive] = useState(-1);
  useEffect(() => {
    const read = () => {
      let cur = -1;
      looks.forEach((_, i) => {
        const el = document.getElementById(`look-${i + 1}`);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.55) cur = i;
      });
      const lastEl = document.getElementById(`look-${looks.length}`);
      if (lastEl && lastEl.getBoundingClientRect().bottom < window.innerHeight * 0.25) cur = -1;
      setActive((a) => (a === cur ? a : cur));
    };
    read();
    window.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read);
    return () => {
      window.removeEventListener("scroll", read);
      window.removeEventListener("resize", read);
    };
  }, [looks]);

  return (
    <nav
      aria-label="룩 바로 가기"
      className={`fixed right-5 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-end gap-3 transition-opacity duration-300 xl:flex ${
        active >= 0 ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      {looks.map((look, i) => (
        <a key={i} href={`#look-${i + 1}`} className="group flex items-center gap-2.5">
          <span
            className={`max-w-[11rem] truncate rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-ink shadow-soft transition-opacity duration-200 ${
              i === active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}
          >
            {pad(i + 1)} {look}
          </span>
          <span
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === active ? "w-7 bg-gradient-to-r from-brand to-accent" : "w-2.5 bg-black/20 group-hover:bg-brand"
            }`}
          />
        </a>
      ))}
    </nav>
  );
}

/** 다음 가이드 — 휠을 내리는 동안 펼쳐지는 다음 장. */
export function NextGuide({ guide }: { guide: Pick<Guide, "slug" | "title" | "image" | "scene"> }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const p = useSpring(scrollYProgress, WHEEL_SPRING);
  const scale = useTransform(p, (v) => (reduce ? 1 : lerp(0.88, 1, v)));
  const imgX = useTransform(p, (v) => (reduce ? "0%" : `${lerp(18, 0, smooth(v)).toFixed(2)}%`));
  return (
    <section ref={ref} className="pt-16">
      <div className="wrap">
        <motion.div style={{ scale }}>
          <Link
            href={`/guides/${guide.slug}`}
            className="group relative grid overflow-hidden rounded-[28px] bg-navy text-white md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]"
          >
            <div className="grain relative flex flex-col justify-center p-7 md:p-14">
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/60">
                다음 가이드
              </span>
              {guide.scene ? (
                <p className="mt-4 break-keep font-serif text-[clamp(16px,1.9vw,22px)] text-white/70">
                  {guide.scene.line}
                </p>
              ) : null}
              <h2 className="mt-3 break-keep font-serif text-[clamp(24px,3.6vw,46px)] font-bold leading-[1.16]">
                {guide.title}
              </h2>
              <span className="mt-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-brand to-accent text-lg transition-transform group-hover:translate-x-2">
                →
              </span>
            </div>
            <div className="relative min-h-[240px] overflow-hidden bg-gradient-to-br from-brand to-accent md:min-h-[420px]">
              <motion.div style={{ x: imgX }} className="absolute -inset-x-[10%] inset-y-0">
                <LookImg src={guide.image} alt={guide.title} width={900} />
              </motion.div>
              {isAiImage(guide.image) ? <AiBadge /> : null}
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
