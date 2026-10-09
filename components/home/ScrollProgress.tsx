"use client";
import { motion, useScroll, useSpring } from "framer-motion";

/** 화면 맨 위의 진행선 — 페이지를 얼마나 내려왔는지 휠에 맞춰 차오른다. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 30 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-40 h-[3px] origin-left bg-gradient-to-r from-brand to-accent"
    />
  );
}
