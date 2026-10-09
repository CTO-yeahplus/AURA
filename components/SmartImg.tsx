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
  fallbackSrc,
}: {
  src?: string;
  alt: string;
  fallbackSrc?: string; // src가 실패하면 한 번 더 시도할 주소(예: 줄인 사진 → 원본)
  className?: string; // object-position 등 추가 클래스
  eager?: boolean; // 첫 화면 이미지는 지연 로드하지 않는다
}) {
  const [state, setState] = useState<"loading" | "ok" | "error">(src ? "loading" : "error");
  const [useFallback, setUseFallback] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  const fail = () => {
    if (fallbackSrc && fallbackSrc !== src && !useFallback) setUseFallback(true);
    else setState("error");
  };
  // 서버 렌더된 이미지는 하이드레이션 전에 로드가 끝나 onLoad를 놓칠 수 있다 → 마운트 때 한 번 확인.
  useEffect(() => {
    const img = ref.current;
    if (!img?.complete) return;
    if (img.naturalWidth > 0) setState("ok");
    else fail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!src || state === "error") return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={useFallback ? fallbackSrc : src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      onLoad={() => setState("ok")}
      onError={fail}
      className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 ease-out group-hover:scale-[1.05] ${
        state === "ok" ? "opacity-100" : "opacity-0"
      } ${className}`}
    />
  );
}
