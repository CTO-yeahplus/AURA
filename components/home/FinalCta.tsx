"use client";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { WaitlistForm } from "@/components/WaitlistForm";
import { APP_STORE_URL } from "@/lib/app";
import { WHEEL_SPRING, lerp } from "./scroll";

/**
 * 마지막 장 — 휠을 내리는 동안 카드가 화면 폭까지 펼쳐진다. 앱 다운로드가 주, Android 알림 신청이 부.
 * id="waitlist"는 예전 링크(/#waitlist)가 계속 이 자리로 오도록 남긴다.
 */
export function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const p = useSpring(scrollYProgress, WHEEL_SPRING);
  const scale = useTransform(p, (v) => (reduce ? 1 : lerp(0.86, 1, v)));
  const radius = useTransform(p, (v) => (reduce ? 28 : lerp(56, 28, v)));
  const lift = useTransform(p, (v) => (reduce ? 0 : lerp(40, 0, v)));

  return (
    <section id="waitlist" ref={ref} className="scroll-mt-20 pb-16 pt-16">
      <div className="wrap">
        <motion.div
          style={{ scale, borderRadius: radius }}
          className="grain relative overflow-hidden bg-gradient-to-br from-navy to-[#4c2e63] px-6 py-16 text-center md:px-8 md:py-20"
        >
          <motion.div style={{ y: lift }}>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/70">
              Now on the App Store
            </span>
            <h2 className="mt-4 font-serif text-[clamp(30px,5.4vw,60px)] leading-tight text-white">
              오늘의 무드,
              <br />
              지금 입어 보세요.
            </h2>
            <p className="mx-auto mt-4 max-w-lg break-keep text-white/85">
              AURA는 iPhone에서 무료로 받을 수 있어요. 룩을 발견하고, 그 자리에서 바로 따라 사세요.
            </p>
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-[15px] font-bold text-ink transition hover:scale-[1.03]"
            >
              App Store에서 받기 →
            </a>

            <div className="mx-auto mt-12 max-w-xl border-t border-white/15 pt-8">
              <p className="mb-4 break-keep text-[14px] text-white/80">
                Android는 아직이에요. 이메일을 남기면 출시될 때 알려드릴게요.
              </p>
              <WaitlistForm />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
