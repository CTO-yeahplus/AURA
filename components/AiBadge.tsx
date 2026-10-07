import { AI_BADGE_LABEL, AI_BADGE_TITLE } from "@/lib/aiGenerated";

/**
 * AI 생성 표시 배지(가시적 표시 — 인공지능기본법 제31조). 이미지 컨테이너(relative) 안에 겹쳐 쓴다.
 * 위치 기본값은 우상단(카드의 태그 칩이 좌상단을 쓰므로 겹치지 않게).
 */
export function AiBadge({ className = "right-3 top-3" }: { className?: string }) {
  return (
    <span
      title={AI_BADGE_TITLE}
      aria-label={AI_BADGE_TITLE}
      className={`absolute z-10 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur ${className}`}
    >
      ✦ {AI_BADGE_LABEL}
    </span>
  );
}
