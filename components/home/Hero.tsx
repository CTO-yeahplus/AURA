"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { AI_BADGE_LABEL, AI_BADGE_TITLE, isAiImage } from "@/lib/aiGenerated";
import { APP_STORE_URL } from "@/lib/app";
import { PIN, PIN_OFFSET, WHEEL_SPRING, lerp, span, useViewport } from "./scroll";

type HeroTag = { label: string; side: "left" | "right"; top: string; at: number };
// 홈피드 룩 한 장(lib/looks.ts heroLook). tags는 그 룩의 따라사기 상품이고, 카드로 접힌 뒤 차례로 붙는다.
type HeroLook = { id: string; image: string; tags: readonly HeroTag[] };

const smooth = (t: number) => t * t * (3 - 2 * t);

function ShopTag({
  p,
  tag,
  desktop,
}: {
  p: MotionValue<number>;
  tag: HeroTag;
  desktop: boolean;
}) {
  const pop = useTransform(p, (v) => span(v, tag.at, tag.at + 0.07));
  const scale = useTransform(pop, (t) => lerp(0.6, 1, smooth(t)));
  // 데스크톱은 카드 가장자리에 걸치고, 모바일은 카드 안쪽에 붙인다.
  const edge = desktop ? "calc(100% - 26px)" : "calc(100% - 132px)";
  const place = tag.side === "left" ? { right: edge } : { left: edge };
  return (
    <motion.span
      style={{ top: tag.top, opacity: pop, scale, ...place }}
      className="absolute inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white px-3 py-2 shadow-lift"
    >
      <span className="h-2 w-2 rounded-full bg-gradient-to-r from-brand to-accent" />
      <span className="text-[13px] font-bold text-ink">{tag.label}</span>
      <span className="text-[11px] font-bold text-brand-dark">따라사기 →</span>
    </motion.span>
  );
}

/**
 * 히어로 — 휠을 내리면 풀블리드 화보가 룩 카드 한 장으로 접히고, 그 위에 따라사기 태그가 붙는다.
 * 진행도 0(첫 화면)은 정적 렌더와 같다: 앱 목적 설명·다운로드 버튼이 스크롤·JS 없이 보인다.
 */
export function Hero({ look }: { look: HeroLook }) {
  const ref = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  // 사진 세로/가로 비(홈피드 화보는 1:1 또는 864×1184). 로드되면 실제 값으로 바꾼다.
  const [ratio, setRatio] = useState(1);
  const [shown, setShown] = useState(false);
  const [broken, setBroken] = useState(false);
  const onImg = (img: HTMLImageElement) => {
    if (img.naturalWidth > 0) {
      setRatio(img.naturalHeight / img.naturalWidth);
      setShown(true);
    } else setBroken(true);
  };
  // 서버 렌더된 이미지는 하이드레이션 전에 로드가 끝나 onLoad를 놓칠 수 있다.
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete) onImg(img);
  }, []);
  const reduce = useReducedMotion();
  const { w, h, desktop, ready } = useViewport();

  const { scrollYProgress } = useScroll({ target: ref, offset: PIN_OFFSET });
  const spring = useSpring(scrollYProgress, WHEEL_SPRING);
  const still = useMotionValue(0);
  const p = reduce ? still : spring;

  // 카드가 접혀 들어갈 자리(고정 구간 안쪽 px).
  const topGap = h * (desktop ? 0.1 : 0.07);
  const bottomGap = h * (desktop ? 0.1 : 0.3);
  const cardH = h - topGap - bottomGap;
  const cardW = Math.min(w * 0.84, cardH * 0.72);
  const sideGap = (w - cardW) / 2;

  const fold = useTransform(p, (v) => smooth(span(v, 0, 0.5)));
  // 사진 상자 — 홈피드 화보는 세로·정사각 사진이라, 넓은 화면에서는 억지로 늘려 덮지 않고
  // 오른쪽에 전신을 세운다(왼쪽은 카피 자리, 사진 왼쪽 끝은 배경으로 스민다). 좁은 화면은 화면을 덮는다.
  // 접히면 카드 자리를 덮는 크기로 줄어들어, 카드에는 룩 전신이 그대로 들어온다.
  const split = desktop && h / ratio < w * 0.8;
  const fullW = split ? h / ratio : Math.max(w, h / ratio);
  const fullH = fullW * ratio;
  const fullX = split ? w - fullW : -(fullW - w) / 2;
  const fullY = -(fullH - h) * 0.2;
  const foldW = Math.max(cardW, cardH / ratio);
  const foldX = sideGap - (foldW - cardW) / 2;
  const foldY = topGap - (foldW * ratio - cardH) / 2;
  const imgScale = useTransform(fold, (t) => lerp(1, foldW / fullW, t));
  const imgX = useTransform(fold, (t) => lerp(fullX, foldX, t));
  const imgY = useTransform(fold, (t) => lerp(fullY, foldY, t));
  // 화보 층을 자르는 틀 — 넓은 화면에서는 사진 왼쪽 끝에서 시작해 카드 자리로 줄어들고,
  // 그 왼쪽 끝은 배경으로 스미다가(마스크) 접히면서 또렷한 카드 모서리가 된다.
  const clipLeft = useTransform(fold, (t) => lerp(split ? fullX : 0, sideGap, t));
  const clipPath = useTransform(
    [fold, clipLeft],
    ([t, left]: number[]) =>
      `inset(${topGap * t}px ${sideGap * t}px ${bottomGap * t}px ${left}px round ${28 * t}px)`
  );
  const edgeFade = useTransform([fold, clipLeft], ([t, left]: number[]) =>
    split
      ? `linear-gradient(to right, rgba(0,0,0,${t}) ${left}px, #000 ${left + fullW * 0.32 * (1 - t) + 0.5}px)`
      : "none"
  );
  // 'AI 생성' 배지 — 화면 모서리에서 카드 모서리로 따라 들어간다.
  const badgeTop = useTransform(fold, (t) => lerp(16, topGap + 12, t));
  const badgeRight = useTransform(fold, (t) => lerp(24, sideGap + 12, t));
  const scrim = useTransform(p, (v) => 1 - span(v, 0, 0.35));

  const copyOpacity = useTransform(p, (v) => 1 - span(v, 0.02, 0.22));
  const copyY = useTransform(p, (v) => -70 * span(v, 0, 0.3));
  const copyEvents = useTransform(p, (v) => (v > 0.2 ? "none" : "auto"));
  const hint = useTransform(p, (v) => 1 - span(v, 0, 0.05));

  const typeOpacity = useTransform(p, (v) => span(v, 0.12, 0.42));
  const rowA = useTransform(p, (v) => `${lerp(6, -24, v)}vw`);
  const rowB = useTransform(p, (v) => `${lerp(-30, -2, v)}vw`);

  const capA = useTransform(p, (v) => span(v, 0.42, 0.54));
  const capAx = useTransform(capA, (t) => lerp(-28, 0, smooth(t)));
  const capB = useTransform(p, (v) => span(v, 0.62, 0.74));
  const capBx = useTransform(capB, (t) => lerp(28, 0, smooth(t)));

  return (
    <section ref={ref} className={`relative bg-ink ${reduce ? "" : "h-[230vh]"}`}>
      <div className={`${PIN} overflow-hidden`}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_45%,rgba(139,92,246,0.34),transparent_65%)]" />

        {/* 배경을 가로지르는 대형 타이포 — 휠 방향대로 서로 엇갈려 흐른다 */}
        <motion.div
          aria-hidden
          style={{ opacity: typeOpacity }}
          className="pointer-events-none absolute inset-0 select-none font-serif font-bold leading-none"
        >
          <motion.span
            style={{ x: rowA }}
            className="stroke-text absolute top-[13%] hidden whitespace-nowrap text-[clamp(72px,15vw,220px)] md:block"
          >
            DISCOVER — DISCOVER — DISCOVER
          </motion.span>
          <motion.span
            style={{ x: rowB }}
            className="stroke-text absolute top-[76%] whitespace-nowrap text-[clamp(64px,15vw,220px)] opacity-50 md:top-[62%] md:opacity-100"
          >
            SHOP THE LOOK — SHOP THE LOOK — SHOP THE LOOK
          </motion.span>
        </motion.div>

        {/* 화보 — clip-path로 풀블리드에서 카드로 접힌다 */}
        <motion.div
          style={ready ? { clipPath, maskImage: edgeFade, WebkitMaskImage: edgeFade } : undefined}
          className="grain absolute inset-0 bg-navy"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand/40 to-accent/40" />
          {broken ? null : (
            // 화면 크기를 재기 전(서버 렌더·JS 없음)에는 CSS만으로 화면을 덮는다.
            <motion.div
              style={
                ready
                  ? { scale: imgScale, x: imgX, y: imgY, width: fullW, height: fullH }
                  : undefined
              }
              className={ready ? "absolute left-0 top-0 origin-top-left" : "absolute inset-0"}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imgRef}
                src={look.image}
                alt="AURA 홈피드 룩"
                onLoad={(e) => onImg(e.currentTarget)}
                onError={() => setBroken(true)}
                className={`h-full w-full object-cover object-[50%_20%] transition-opacity duration-700 ease-out ${
                  shown ? "opacity-100" : "opacity-0"
                }`}
              />
            </motion.div>
          )}
          <motion.div style={{ opacity: scrim }} className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/35" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/10 to-transparent" />
          </motion.div>
        </motion.div>

        {/* AI 생성 표시(가시적 표시 — 인공지능기본법 제31조). 홈피드 화보는 AI 생성물이다. */}
        {isAiImage(look.image) ? (
          <motion.span
            title={AI_BADGE_TITLE}
            aria-label={AI_BADGE_TITLE}
            style={{ top: badgeTop, right: badgeRight }}
            className="absolute z-10 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur"
          >
            ✦ {AI_BADGE_LABEL}
          </motion.span>
        ) : null}

        {/* 따라사기 태그 — 접힌 카드 자리 위에 붙는다 */}
        <div
          aria-hidden
          className="pointer-events-none absolute"
          style={{ top: topGap, left: sideGap, width: cardW, height: cardH }}
        >
          {look.tags.map((tag) => (
            <ShopTag key={tag.label} p={p} tag={tag} desktop={desktop} />
          ))}
        </div>

        {/* 접힌 뒤의 문장 — 데스크톱은 카드 양옆, 모바일은 카드 아래 */}
        <div aria-hidden className="pointer-events-none absolute inset-0 hidden text-white md:block">
          <motion.div
            style={{ opacity: capA, x: capAx, right: w - sideGap + 64 }}
            className="absolute top-[60%] text-right"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/60">
              01 — Discover
            </span>
            <p className="mt-2 font-serif text-[clamp(26px,3vw,44px)] font-bold leading-tight">
              오늘의 룩을
              <br />
              발견하고,
            </p>
          </motion.div>
          <motion.div
            style={{ opacity: capB, x: capBx, left: w - sideGap + 64 }}
            className="absolute top-[18%]"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/60">
              02 — Shop the look
            </span>
            <p className="mt-2 font-serif text-[clamp(26px,3vw,44px)] font-bold leading-tight">
              그 자리에서
              <br />
              <span className="bg-gradient-to-r from-brand to-accent bg-clip-text text-transparent">
                따라 사요.
              </span>
            </p>
          </motion.div>
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-[6%] px-6 text-center font-serif text-[26px] font-bold leading-tight text-white md:hidden"
        >
          <motion.p style={{ opacity: capA }}>오늘의 룩을 발견하고,</motion.p>
          <motion.p
            style={{ opacity: capB }}
            className="bg-gradient-to-r from-brand to-accent bg-clip-text text-transparent"
          >
            그 자리에서 따라 사요.
          </motion.p>
        </div>

        {/* 첫 화면 카피 — 진행도 0에서 그대로 보인다(구글 브랜드 인증: 상단만 봐도 앱 목적이 읽혀야 함) */}
        <motion.div
          style={{ opacity: copyOpacity, y: copyY, pointerEvents: copyEvents }}
          className="relative z-10 flex h-full items-end"
        >
          <div className="wrap pb-14 md:pb-16">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/80">
              ISSUE 02 — FW26 · The Edit
            </span>
            <h1 className="mt-4 max-w-4xl break-keep font-serif text-[clamp(40px,8vw,92px)] font-bold leading-[0.98] tracking-tight text-white">
              오늘의 무드를
              <br />
              입는 가장 쉬운 방법.
            </h1>
            <p className="mt-5 max-w-xl break-keep text-[clamp(15px,2vw,18px)] text-white/85">
              <b>AURA</b>는 10–20대 여성을 위한 <b>패션·뷰티 OOTD 모바일 앱</b>이에요. 마음에 드는
              룩을 발견하고, 그 자리에서 바로 따라 사세요.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-ink">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" /> App Store 출시 ·
              iPhone 무료 다운로드
            </span>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a href={APP_STORE_URL} target="_blank" rel="noopener" className="btn">
                App Store에서 받기
              </a>
              <Link
                href="#looks"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white hover:text-ink"
              >
                지금 올라온 룩 보기 ↓
              </Link>
            </div>
          </div>
        </motion.div>

        {/* 스크롤 안내 */}
        {reduce ? null : (
          <motion.div
            aria-hidden
            style={{ opacity: hint }}
            className="pointer-events-none absolute bottom-7 right-7 z-10 hidden flex-col items-center gap-2 text-white/80 md:flex"
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
