"use client";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { APP_SHOTS, SHOT_W, type AppShot } from "@/lib/app";
import {
  HEADER_PX,
  PIN,
  PIN_OFFSET,
  WHEEL_SPRING,
  clamp01,
  lerp,
  span,
  useViewport,
} from "./scroll";

// 앱의 다섯 장면. 문구는 App Store 소개·크리에이터 안내와 같은 사실만 쓴다.
// glow는 그 장면에서 무대 뒤로 번지는 빛(rgb), chips는 폰 옆에 뜨는 한 줄 요약.
const STEPS = [
  {
    key: "발견",
    title: "취향 맞춤 OOTD 피드",
    desc: "또래의 진짜 코디를 넘겨 보며 발견하고 저장해요.",
    shot: APP_SHOTS.feed as AppShot,
    glow: "139,92,246",
    chips: ["취향 맞춤 피드", "또래의 진짜 코디"],
  },
  {
    key: "따라사기",
    title: "룩 속 아이템, 바로 따라사기",
    desc: "룩에 쓰인 아이템을 연결된 판매처에서 바로 만나요. 일부는 제휴 링크예요.",
    shot: APP_SHOTS.buy as AppShot,
    glow: "236,72,153",
    chips: ["룩 속 아이템 연결", "판매처에서 바로 구매"],
  },
  {
    key: "위시 · 컬렉션",
    title: "좋아하는 룩을 나만의 보드로",
    desc: "마음에 든 룩과 아이템을 모아 두고 다시 꺼내 봐요.",
    shot: APP_SHOTS.wish as AppShot,
    glow: "109,40,217",
    chips: ["룩 · 아이템 저장", "나만의 보드"],
  },
  {
    key: "AI 화보",
    title: "내 코디를 AI 화보로",
    desc: "첫 컷은 무료 체험. 결과물에는 ‘AI 생성’ 표시가 붙어요.",
    shot: APP_SHOTS.ai as AppShot,
    glow: "168,85,247",
    chips: ["첫 컷 무료 체험", "‘AI 생성’ 표시"],
  },
  {
    key: "크리에이터",
    title: "내 룩으로 수익화 참여",
    desc: "따라사기로 구매가 확정되면 제휴 커미션의 50%가 크리에이터 몫이에요.",
    shot: APP_SHOTS.creator as AppShot,
    glow: "239,68,68",
    chips: ["확정 커미션의 50%", "월 1회 정산"],
  },
] as const;
const N = STEPS.length;
const FRAME_RATIO = 19.5 / 9; // 폰 화면 세로/가로

const pad = (n: number) => String(n).padStart(2, "0");
const smooth = (t: number) => t * t * (3 - 2 * t);

/** 폰 화면 — 홍보 컷은 crop 좌표로 폰 화면만 잘라 틀에 꽉 채운다. 못 불러오면 장면 이름이 남는다. */
export function ScreenShot({ shot, label }: { shot: AppShot; label: string }) {
  const ref = useRef<HTMLImageElement>(null);
  const [state, setState] = useState<"loading" | "ok" | "error">("loading");
  useEffect(() => {
    const img = ref.current;
    if (img?.complete) setState(img.naturalWidth > 0 ? "ok" : "error");
  }, []);
  const c = shot.crop;
  const place = c
    ? {
        width: `${(SHOT_W / c.w) * 100}%`,
        left: `${(-c.x / c.w) * 100}%`,
        top: `${(-c.y / (c.w * FRAME_RATIO)) * 100}%`,
      }
    : { width: "100%", height: "100%", left: 0, top: 0 };
  return (
    <>
      <span className="absolute inset-0 flex items-center justify-center px-4 text-center font-serif text-[22px] font-bold text-white/90">
        {label}
      </span>
      {state === "error" ? null : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={ref}
          src={shot.src}
          alt={`AURA 앱 화면 — ${label}`}
          loading="lazy"
          onLoad={() => setState("ok")}
          onError={() => setState("error")}
          style={place}
          className={`absolute max-w-none object-cover transition-opacity duration-500 ${
            state === "ok" ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </>
  );
}

/** 폰 틀 — 폭(px)만 받으면 베젤·모서리가 비례해서 그려진다. */
export function PhoneFrame({ w, children }: { w: number; children: React.ReactNode }) {
  const bezel = Math.max(5, w * 0.026);
  return (
    <div
      className="relative bg-[#0c0a12] shadow-[0_40px_90px_rgba(0,0,0,0.55),0_0_0_1.5px_rgba(255,255,255,0.14)]"
      style={{ width: w, padding: bezel, borderRadius: w * 0.17 }}
    >
      <div
        className="relative w-full overflow-hidden bg-gradient-to-br from-brand to-accent"
        style={{ aspectRatio: `9 / 19.5`, borderRadius: w * 0.145 }}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * 무대 위의 폰 한 대. o = (내 순서 − 지금 위치): 0이면 정면, 양수면 오른쪽에서 차례를 기다리고,
 * 음수면 왼쪽으로 돌아 나가며 사라진다.
 */
function StagePhone({
  pos,
  i,
  w,
  desktop,
}: {
  pos: MotionValue<number>;
  i: number;
  w: number;
  desktop: boolean;
}) {
  const step = STEPS[i];
  const o = useTransform(pos, (v) => i - v);
  const gap = desktop ? 0.82 : 0.74;
  const x = useTransform(
    o,
    (d) => `calc(-50% + ${(d >= 0 ? d * w * gap : d * w * 0.9).toFixed(1)}px)`
  );
  const rotateY = useTransform(o, (d) => (d >= 0 ? -Math.min(d, 1.4) * 30 : Math.min(-d, 1) * 36));
  const scale = useTransform(o, (d) => 1 - Math.min(Math.abs(d), 2) * 0.17);
  const opacity = useTransform(o, (d) => {
    if (d < 0) return 1 - clamp01(-d / 0.7);
    return d <= 1 ? lerp(1, 0.42, d) : lerp(0.42, 0, clamp01(d - 1));
  });
  const zIndex = useTransform(o, (d) => Math.round(20 - Math.abs(d) * 5));
  const chip = useTransform(o, (d) => 1 - clamp01(Math.abs(d) * 3.2));
  const chipScale = useTransform(chip, (t) => lerp(0.7, 1, smooth(t)));
  const chipBase =
    "absolute whitespace-nowrap rounded-full bg-white px-3.5 py-2 text-[12px] font-bold text-ink shadow-lift md:text-[13px]";

  return (
    <motion.div
      style={{ x, y: "-50%", rotateY, scale, opacity, zIndex }}
      className="absolute left-1/2 top-1/2"
    >
      <PhoneFrame w={w}>
        <ScreenShot shot={step.shot} label={step.key} />
      </PhoneFrame>
      {/* 정면에 왔을 때만 뜨는 요약 두 줄 */}
      <motion.span
        aria-hidden
        style={{ opacity: chip, scale: chipScale, ...(desktop ? { right: "88%" } : { left: "-14%" }) }}
        className={`${chipBase} top-[20%]`}
      >
        <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-gradient-to-r from-brand to-accent" />
        {step.chips[0]}
      </motion.span>
      <motion.span
        aria-hidden
        style={{ opacity: chip, scale: chipScale, ...(desktop ? { left: "88%" } : { right: "-14%" }) }}
        className={`${chipBase} top-[62%]`}
      >
        <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-gradient-to-r from-brand to-accent" />
        {step.chips[1]}
      </motion.span>
    </motion.div>
  );
}

/**
 * How AURA works — 어두운 무대의 고정 구간. 화면 높이를 거의 다 쓰는 폰이 정면에 서고,
 * 휠 한 단계마다 다음 폰이 오른쪽에서 돌아 들어온다. 왼쪽 글과 무대 뒤 빛이 장면을 따라 바뀐다.
 */
export function AppTour() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { w: vw, h: vh, desktop } = useViewport();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: PIN_OFFSET });
  const p = useSpring(scrollYProgress, WHEEL_SPRING);
  // 장면마다 앞 55%는 정면에 머물고, 나머지 45% 동안 다음 장면으로 넘어간다.
  const pos = useTransform(p, (v) => {
    const f = clamp01(v) * N;
    const k = Math.min(N - 1, Math.floor(f));
    return k + (k < N - 1 ? smooth(span(f - k, 0.55, 1)) : 0);
  });
  const sway = useTransform(p, (v) => lerp(-2.5, 2.5, v));

  useMotionValueEvent(pos, "change", (v) => {
    const next = Math.min(N - 1, Math.max(0, Math.round(v)));
    setActive((cur) => (cur === next ? cur : next));
  });

  // 폰 크기 — 데스크톱은 고정 구간 높이를 거의 다 쓰고, 모바일은 아래 글 자리를 뺀 만큼.
  const phoneH = desktop ? Math.min(vh - 56, 800) : Math.max(300, vh - 268);
  const phoneW = Math.min(phoneH / FRAME_RATIO, vw * (desktop ? 0.3 : 0.62));

  // 단계를 누르면 그 장면이 정면에 서는 스크롤 위치로 간다.
  function goTo(i: number) {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_PX;
    const travel = el.offsetHeight - (window.innerHeight - HEADER_PX);
    window.scrollTo({ top: top + (travel * (i + 0.25)) / N, behavior: "smooth" });
  }

  const heading = (
    <div>
      <span className="text-xs font-bold uppercase tracking-[0.18em] text-white/60">
        How AURA works
      </span>
      <h2 className="mt-1.5 font-serif text-[clamp(20px,2.2vw,28px)] leading-tight text-white/90">
        발견부터 수익까지, 다섯 장면
      </h2>
    </div>
  );

  if (reduce) {
    return (
      <section ref={ref} className="bg-ink py-16 text-white">
        <div className="wrap">
          {heading}
          <ol className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {STEPS.map((s, i) => (
              <li key={s.key}>
                <PhoneFrame w={200}>
                  <ScreenShot shot={s.shot} label={s.key} />
                </PhoneFrame>
                <p className="mt-4 font-serif text-[20px] text-brand">{pad(i + 1)}</p>
                <p className="font-serif text-[18px] font-bold">{s.title}</p>
                <p className="mt-1 break-keep text-[14px] text-white/75">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  const step = STEPS[active];

  return (
    <section
      ref={ref}
      className="relative bg-ink text-white"
      style={{ height: `${N * 90 + 100}vh` }}
    >
      <div className={`${PIN} overflow-hidden`}>
        {/* 무대 뒤 빛 — 장면마다 색이 바뀐다 */}
        {STEPS.map((s, i) => (
          <div
            key={s.key}
            aria-hidden
            className="absolute inset-0 transition-opacity duration-700"
            style={{
              opacity: i === active ? 1 : 0,
              background: `radial-gradient(ellipse at ${desktop ? "66% 52%" : "50% 40%"}, rgba(${s.glow},0.46), transparent 58%)`,
            }}
          />
        ))}
        <div className="grain absolute inset-0" aria-hidden />

        {/* 검색·보조기기용 전체 목록(화면에는 지금 장면만 크게 보인다) */}
        <ol className="sr-only">
          {STEPS.map((s) => (
            <li key={s.key}>
              {s.key} — {s.title}. {s.desc}
            </li>
          ))}
        </ol>

        <div className="wrap relative grid h-full grid-rows-[auto_minmax(0,1fr)_auto] gap-y-1 py-4 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:grid-rows-1 md:items-center md:gap-x-8 md:py-0">
          <div className="md:hidden">{heading}</div>

          {/* 글 — 지금 장면만 크게 */}
          <div className="order-3 md:order-1">
            <div className="hidden md:block">{heading}</div>
            <div className="relative md:mt-8 md:min-h-[23rem]" aria-hidden>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="stroke-text hidden font-serif text-[clamp(96px,11vw,176px)] font-bold leading-none md:block">
                    {pad(active + 1)}
                  </span>
                  <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-white/70 md:mt-6 md:text-[13px]">
                    <span className="md:hidden">{pad(active + 1)} · </span>
                    {step.key}
                  </span>
                  <h3 className="mt-1.5 break-keep font-serif text-[clamp(24px,3.6vw,52px)] font-bold leading-[1.12] md:mt-2.5">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-md break-keep text-[14px] leading-relaxed text-white/75 md:mt-4 md:text-[17px]">
                    {step.desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* 장면 고르기 */}
            <div className="mt-4 flex flex-wrap gap-1.5 md:mt-8 md:gap-2">
              {STEPS.map((s, i) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-current={i === active ? "step" : undefined}
                  className={`rounded-full border px-3 py-1.5 text-[11px] font-bold transition md:px-3.5 md:text-[12px] ${
                    i === active
                      ? "border-transparent bg-gradient-to-r from-brand to-accent text-white"
                      : "border-white/20 text-white/60 hover:border-white/50 hover:text-white"
                  }`}
                >
                  <span className="md:hidden">{pad(i + 1)}</span>
                  <span className="hidden md:inline">
                    {pad(i + 1)} {s.key}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 무대 — 정면의 폰과 오른쪽에서 기다리는 다음 폰들 */}
          <motion.div
            style={{ rotateZ: sway, perspective: 1600 }}
            className="relative order-2 h-full"
          >
            {STEPS.map((s, i) => (
              <StagePhone key={s.key} pos={pos} i={i} w={phoneW} desktop={desktop} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
