"use client";
import { useState } from "react";

/**
 * 에디토리얼 사진 — 로드되면 페이드인, 실패하면 숨겨 부모의 그라데이션이 드러나게(견고한 폴백).
 * 외부 사진(Unsplash)을 자체 화보로 교체하기 전까지의 안전장치.
 */
export function SmartImg({ src, alt }: { src?: string; alt: string }) {
  const [state, setState] = useState<"loading" | "ok" | "error">(src ? "loading" : "error");
  if (!src || state === "error") return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onLoad={() => setState("ok")}
      onError={() => setState("error")}
      className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 ease-out group-hover:scale-[1.05] ${
        state === "ok" ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
