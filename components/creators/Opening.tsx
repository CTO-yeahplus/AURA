"use client";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { PIN, PIN_OFFSET, WHEEL_SPRING, lerp, plateau, smooth, span } from "@/components/home/scroll";
import { LookShot, SceneSlug } from "@/components/story/shared";

type Look = { id: string; image: string; item: string };

/**
 * 도입 — 세 장면이 휠을 따라 넘어간다: 룩을 올린 저녁 → 누군가 따라 산 오후 → 수익이 잡힌 다음 달.
 * 오른쪽의 룩 카드 한 장이 세 장면을 관통하고, 그 위에 태그와 알림이 차례로 붙는다.
 */
export function CreatorsOpening({ look }: { look: Look }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: PIN_OFFSET });
  const spring = useSpring(scrollYProgress, WHEEL_SPRING);
  const last = useMotionValue(1);
  const p = reduce ? last : spring; // 동작 줄이기: 마지막 장면을 그대로 보여 준다

  const s1 = useTransform(p, (v) => 1 - span(v, 0.2, 0.28));
  const s2 = useTransform(p, (v) => plateau(v, 0.3, 0.38, 0.56, 0.64));
  const s3 = useTransform(p, (v) => span(v, 0.68, 0.78));
  const y1 = useTransform(p, (v) => -30 * span(v, 0.2, 0.28));
  const y2 = useTransform(p, (v) => lerp(30, 0, span(v, 0.3, 0.38)) - 30 * span(v, 0.56, 0.64));
  const y3 = useTransform(p, (v) => lerp(30, 0, span(v, 0.68, 0.78)));
  const hint = useTransform(p, (v) => 1 - span(v, 0, 0.06));

  const cardRotate = useTransform(p, (v) => lerp(-5, 3, v));
  const cardY = useTransform(p, (v) => lerp(24, -12, v));
  const tag = useTransform(p, (v) => span(v, 0.32, 0.4));
  const tagScale = useTransform(tag, (t) => lerp(0.6, 1, smooth(t)));
  const toastA = useTransform(p, (v) => span(v, 0.42, 0.52));
  const toastAx = useTransform(toastA, (t) => lerp(50, 0, smooth(t)));
  const toastB = useTransform(p, (v) => span(v, 0.74, 0.84));
  const toastBx = useTransform(toastB, (t) => lerp(50, 0, smooth(t)));
  const glow = useTransform(p, (v) => lerp(0.25, 0.6, span(v, 0.6, 0.85)));

  const toast =
    "absolute flex items-center gap-2.5 whitespace-nowrap rounded-2xl bg-white px-3.5 py-2.5 text-left shadow-lift";

  return (
    <section ref={ref} className={`relative bg-ink text-white ${reduce ? "" : "h-[320vh]"}`}>
      <div className={`${PIN} overflow-hidden`}>
        <motion.div
          aria-hidden
          style={{ opacity: glow }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(236,72,153,0.5),rgba(139,92,246,0.22)_40%,transparent_66%)]"
        />
        <div className="grain absolute inset-0" aria-hidden />

        <div className="wrap relative grid h-full grid-rows-[auto_minmax(0,1fr)] items-center gap-y-4 py-6 md:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] md:grid-rows-1 md:gap-x-10 md:py-0">
          {/* 세 장면의 글 — 같은 자리에 겹쳐 두고 휠에 따라 바꾼다 */}
          <div className="grid [&>*]:col-start-1 [&>*]:row-start-1">
            <motion.div style={{ opacity: s1, y: y1 }}>
              <SceneSlug className="text-white/60">Scene 01 — 일요일 저녁 6시 · 집 앞 골목</SceneSlug>
              <p className="mt-5 break-keep font-serif text-[clamp(27px,3.8vw,56px)] font-bold leading-[1.18]">
                오늘 입은 옷이
                <br />
                마음에 들어서,
                <br />한 장 찍어 올렸습니다.
              </p>
            </motion.div>

            <motion.div style={{ opacity: s2, y: y2 }}>
              <SceneSlug className="text-white/60">Scene 02 — 화요일 오후 3시 · 어딘가</SceneSlug>
              <p className="mt-5 break-keep font-serif text-[clamp(27px,3.8vw,56px)] font-bold leading-[1.18]">
                얼굴도 모르는
                <br />
                누군가가 그 셔츠를
                <br />
                <span className="bg-gradient-to-r from-brand to-accent bg-clip-text text-transparent">
                  따라 샀습니다.
                </span>
              </p>
            </motion.div>

            <motion.div style={{ opacity: s3, y: y3 }}>
              <SceneSlug className="text-white/60">Scene 03 — 그리고 다음 달</SceneSlug>
              <h1 className="mt-5 break-keep font-serif text-[clamp(30px,4.8vw,68px)] font-bold leading-[1.14]">
                좋아서 올린 룩이
                <br />
                <span className="bg-gradient-to-r from-brand to-accent bg-clip-text text-transparent">
                  수익이 됩니다.
                </span>
              </h1>
              <p className="mt-5 max-w-xl break-keep text-[clamp(15px,1.6vw,18px)] leading-relaxed text-white/80">
                좋아하는 코디를 올리고, 따라사기 링크로 수익을 냅니다. 발생부터 정산까지 모든 단계를
                투명하게 보여드려요.
              </p>
            </motion.div>
          </div>

          {/* 세 장면을 관통하는 룩 카드 */}
          <div className="flex h-full items-center justify-center">
            <motion.div style={{ rotate: cardRotate, y: cardY }} className="relative">
              <LookShot
                src={look.image}
                alt="크리에이터가 올린 룩"
                className="aspect-[864/1184] h-[min(40svh,340px)] rounded-[26px] md:h-[min(70svh,620px)]"
              >
                <motion.span
                  style={{ opacity: s1 }}
                  className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-ink"
                >
                  방금 올린 룩
                </motion.span>
              </LookShot>

              <motion.span
                aria-hidden
                style={{ opacity: tag, scale: tagScale }}
                className="absolute -left-6 top-[36%] inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white px-3 py-2 shadow-lift md:-left-14"
              >
                <span className="h-2 w-2 rounded-full bg-gradient-to-r from-brand to-accent" />
                <span className="text-[13px] font-bold text-ink">{look.item}</span>
                <span className="text-[11px] font-bold text-brand-dark">따라사기 →</span>
              </motion.span>

              <motion.div
                aria-hidden
                style={{ opacity: toastA, x: toastAx }}
                className={`${toast} -right-3 bottom-[24%] md:-right-16`}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-brand to-accent text-[14px] text-white">
                  ♥
                </span>
                <span>
                  <span className="block text-[13px] font-bold text-ink">누군가 이 룩을 따라 샀어요</span>
                  <span className="block text-[11px] text-sub">방금 전 · 따라사기</span>
                </span>
              </motion.div>

              <motion.div
                aria-hidden
                style={{ opacity: toastB, x: toastBx }}
                className={`${toast} -right-1 bottom-[7%] md:-right-8`}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy text-[13px] font-bold text-white">
                  ₩
                </span>
                <span>
                  <span className="block text-[13px] font-bold text-ink">내 정산에 수익이 잡혔어요</span>
                  <span className="block text-[11px] text-sub">예상 → 확정되면 출금 가능</span>
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {reduce ? null : (
          <motion.div
            aria-hidden
            style={{ opacity: hint }}
            className="pointer-events-none absolute bottom-7 right-7 hidden flex-col items-center gap-2 text-white/80 md:flex"
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
