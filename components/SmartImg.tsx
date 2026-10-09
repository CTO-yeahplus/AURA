"use client";
import { useEffect, useRef, useState } from "react";

/**
 * 에디토리얼 사진 — 로드되면 페이드인, 실패하면 숨겨 부모의 그라데이션이 드러나게(견고한 폴백).
 * 외부 사진(Unsplash)을 자체 화보로 교체하기 전까지의 안전장치.
 */
export function SmartImg({
  src,
  alt,
  className = "",
  eager = false,
}: {
  src?: string;
  alt: string;
  className?: string; // object-position 등 추가 클래스
  eager?: boolean; // 첫 화면 이미지는 지연 로드하지 않는다
}) {
  const [state, setState] = useState<"loading" | "ok" | "error">(src ? "loading" : "error");
  const ref = useRef<HTMLImageElement>(null);
  // 서버 렌더된 이미지는 하이드레이션 전에 로드가 끝나 onLoad를 놓칠 수 있다 → 마운트 때 한 번 확인.
  useEffect(() => {
    const img = ref.current;
    if (img?.complete) setState(img.naturalWidth > 0 ? "ok" : "error");
  }, []);
  if (!src || state === "error") return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      onLoad={() => setState("ok")}
      onError={() => setState("error")}
      className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 ease-out group-hover:scale-[1.05] ${
        state === "ok" ? "opacity-100" : "opacity-0"
      } ${className}`}
    />
  );
}
