// AI 생성 이미지 판별 + 표시 문구 — 웹(auraootd.com)용.
//
// 왜(법적 의무): 「인공지능기본법」(2026.1.22 시행) 제31조 — 생성형 AI 결과물이 **서비스 밖으로 유통**될 때
//   AI 생성 사실을 표시해야 하고, 실제 인물과 구분이 어려운 이미지는 **가시적 표시**가 원칙이다.
//   이 웹사이트(/ootd, /ootd/[id], 링크 미리보기 이미지)는 앱 밖으로 AI 화보가 나가는 실제 경로다.
//
// ⚠️ 앱과 동일 규칙 — aura-app/src/features/media/aiGenerated.ts 의 AI_PATH_PATTERNS와 반드시 함께 수정할 것.
//   · 시드 배치 AI 화보:      <uid>/seed-ai/<ts>-<rand>.<ext>
//   · 앱 AI 화보(seed-generate): <uid>/seed-<ts>-<i>.png

const AI_PATH_PATTERNS: readonly RegExp[] = [
  /\/seed-ai\//i,
  /\/seed-\d{10,}-\d+\.(png|jpe?g|webp)(\?|#|$)/i,
];

export function isAiImage(url: unknown): boolean {
  if (typeof url !== "string" || url.length === 0) return false;
  return AI_PATH_PATTERNS.some((re) => re.test(url));
}

export const AI_BADGE_LABEL = "AI 생성";
export const AI_BADGE_TITLE = "AI로 생성한 이미지입니다. 실제 인물을 촬영한 사진이 아닙니다.";
