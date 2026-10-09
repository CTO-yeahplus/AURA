// 홈피드 사진 주소 줄이기 — 원본은 장당 약 2.4MB PNG라, Supabase 이미지 변환(render/image)으로
// 필요한 폭의 WebP(수십 KB)를 받는다. Supabase Storage 공개 주소가 아니면 그대로 돌려준다.
//
// ⚠️ 이미지 변환은 Supabase 요금제의 '원본 이미지 수' 한도에 잡힌다(변환 폭이 달라도 원본 1장은 1장).
//    끄려면 FEED_IMG_RESIZE 를 false 로 — 화면은 원본 주소로 그대로 동작한다.
//    변환 주소가 실패해도 SmartImg가 fallbackSrc(원본)로 다시 받는다.
const FEED_IMG_RESIZE = true;
const OBJECT = "/storage/v1/object/public/";
const RENDER = "/storage/v1/render/image/public/";

export function feedImg(url: string | undefined, width: number): string | undefined {
  if (!FEED_IMG_RESIZE || !url || !url.includes(OBJECT)) return url;
  return `${url.replace(OBJECT, RENDER)}?width=${width}&quality=72`;
}
