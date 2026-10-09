/**
 * lib/app — 앱 스토어 정보 SSOT. 2026-08-03 App Store 출시(스토어 표기명 'AURA FASHION').
 * 다운로드 버튼·스마트 앱 배너·앱 화면 이미지가 전부 여기를 본다.
 */
export const APP_STORE_ID = "6778205571";
export const APP_STORE_URL = `https://apps.apple.com/kr/app/aura-fashion/id${APP_STORE_ID}`;

// App Store에 올라간 스크린샷(자사 앱 화면). 스토어에서 교체하면 주소가 바뀔 수 있어
// 화면이 로드 실패 시 그라데이션 폴백으로 내려간다.
// 받아 오는 크기는 1200×2596 고정 — 아래 crop 좌표가 이 크기 기준이다.
export const SHOT_W = 1200;
function shot(path: string): string {
  return `https://is1-ssl.mzstatic.com/image/thumb/${path}/1200x2600bb.jpg`;
}

/**
 * crop — 스토어용 홍보 컷(제목 + 폰 목업)에서 폰 화면만 잘라 쓰기 위한 좌표(화면 왼쪽 위 x·y, 화면 폭 w).
 * 높이는 폰 틀 비율(9:19.5)로 정해진다. crop이 없으면 화면 캡처 원본이라 통째로 쓴다.
 */
export type AppShot = { src: string; crop?: { x: number; y: number; w: number } };

export const APP_SHOTS = {
  feed: { src: shot("PurpleSource211/v4/93/3f/1e/933f1ee9-479d-91b6-0238-5409fc4be7bb/IMG_1136.PNG") },
  buy: {
    src: shot("PurpleSource211/v4/30/a4/74/30a474dc-5358-4fe0-3d7b-98367878e589/aura_buying.png"),
    crop: { x: 170, y: 629, w: 861 },
  },
  wish: {
    src: shot("PurpleSource221/v4/7d/f1/29/7df129f9-c643-019b-d22e-9a2d2fbe41f0/aura_wish.png"),
    crop: { x: 163, y: 592, w: 869 },
  },
  ai: {
    src: shot("PurpleSource221/v4/be/20/66/be2066f3-6496-065d-61b6-43ceea3c5df8/aura_ai.png"),
    crop: { x: 168, y: 611, w: 875 },
  },
  creator: {
    src: shot("PurpleSource211/v4/93/73/32/937332c0-ed1e-3452-7bc7-17e8900f3b9e/aura_monetize.png"),
    crop: { x: 174, y: 594, w: 860 },
  },
} satisfies Record<string, AppShot>;
