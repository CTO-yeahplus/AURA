"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** 스크롤 진입 시 부드럽게 떠오르는 래퍼. 세련된 모션의 기본 단위. */
export function Reveal({
  children,
  delay = 0,
  y = 18,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
