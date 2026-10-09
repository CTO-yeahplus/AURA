"use client";
import { useEffect, useState } from "react";

/** 헤더(sticky h-16) 높이. 고정 구간은 헤더 바로 아래에 붙는다. */
export const HEADER_PX = 64;

/** 고정 구간 공통 클래스 — 헤더 아래에서 화면 한 장을 채운다. */
export const PIN = "sticky top-16 h-[calc(100svh-4rem)]";

/** 고정 구간의 진행도 기준(구간 머리가 헤더 밑에 닿을 때 0, 구간 끝이 화면 끝에 닿을 때 1). */
export const PIN_OFFSET: ["start 64px", "end end"] = ["start 64px", "end end"];

/** 휠 입력을 한 박자 늦게 따라가는 스프링 — 끊기는 휠도 부드럽게 이어진다. */
export const WHEEL_SPRING = { stiffness: 140, damping: 26, mass: 0.35 } as const;

export function clamp01(v: number): number {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

/** v가 [from, to]를 지나는 동안 0→1. */
export function span(v: number, from: number, to: number): number {
  return clamp01((v - from) / (to - from));
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** 화면 크기(고정 구간 안쪽 기준 높이 포함). 서버 렌더는 데스크톱 값으로 시작한다. */
export function useViewport(): { w: number; h: number; desktop: boolean; ready: boolean } {
  const [size, setSize] = useState({ w: 1440, h: 800, ready: false });
  useEffect(() => {
    const read = () =>
      setSize({ w: window.innerWidth, h: window.innerHeight - HEADER_PX, ready: true });
    read();
    window.addEventListener("resize", read);
    return () => window.removeEventListener("resize", read);
  }, []);
  return { ...size, desktop: size.w >= 768 };
}
