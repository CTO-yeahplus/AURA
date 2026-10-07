import { ImageResponse } from "next/og";
import { getLiveLookDetail } from "@/lib/liveLooks";
import { AI_BADGE_LABEL, isAiImage } from "@/lib/aiGenerated";

/**
 * 룩 공유 링크 미리보기 이미지(og:image) — 카카오톡·iMessage·인스타 DM에서 링크를 붙이면 보이는 그림.
 *
 * 왜: 앱의 룩 공유 링크(https://auraootd.com/l/<id> → /ootd/<id>)가 퍼질 때, 미리보기 이미지가 곧
 *   **AI 화보가 서비스 밖으로 나가는 형태**다. 인공지능기본법 제31조(실제 인물과 구분이 어려운 이미지 =
 *   가시적 표시)에 맞춰, AI 화보라면 'AI 생성' 표시를 **이미지 픽셀 자체에 합성**한다(메타데이터만으로는 부족).
 *   동시에 링크 미리보기가 생겨 공유 클릭률(K-factor)도 오른다.
 *
 * 구성(1200×630): 왼쪽 3:4 룩 사진(+AI 표시) · 오른쪽 AURA 브랜드 패널(제목 · AI 고지 문구).
 * 견고성: 이미지가 satori 미지원 형식(webp 등)이거나 실패하면 사진 없이 브랜드 카드로 폴백.
 *   한글 폰트는 Google Fonts 서브셋을 받아 쓰고, 실패하면 영문 라벨로 폴백(깨진 글자 방지).
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "AURA OOTD";

const IMG_W = 472; // 630 × 3/4

async function loadKoreanFont(text: string): Promise<ArrayBuffer | null> {
  try {
    const url = `https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@700&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(url)).text();
    const m = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
    if (!m) return null;
    const res = await fetch(m[1]);
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

async function loadImageDataUrl(src: string): Promise<string | null> {
  try {
    const res = await fetch(src);
    if (!res.ok) return null;
    const type = (res.headers.get("content-type") || "").split(";")[0];
    if (!/^image\/(png|jpe?g|gif)$/.test(type)) return null; // satori 지원 형식만
    const b64 = Buffer.from(await res.arrayBuffer()).toString("base64");
    return `data:${type};base64,${b64}`;
  } catch {
    return null;
  }
}

export default async function Image({ params }: { params: { id: string } }) {
  const look = await getLiveLookDetail(params.id);
  const title = (look?.title || "오늘의 룩").slice(0, 36);
  const cover = look?.images?.[0];
  const ai = !!cover && isAiImage(cover);

  const notice = "생성형 AI로 만든 이미지 · 실제 인물 사진이 아닙니다";
  const [font, photo] = await Promise.all([
    loadKoreanFont(`AURA OOTD ${AI_BADGE_LABEL} ${notice} ${title}`),
    cover ? loadImageDataUrl(cover) : Promise.resolve(null),
  ]);
  // 한글 폰트를 못 받으면 한글이 깨지므로 영문으로 폴백(표시 의무는 'AI-GENERATED'로도 충족).
  const label = font ? AI_BADGE_LABEL : "AI-GENERATED";
  const noticeText = font ? notice : "Created with generative AI. Not a photo of a real person.";
  const titleText = font ? title : "AURA OOTD";

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#14121A" }}>
        {/* 왼쪽: 룩 사진 + (AI면) 합성 표시 */}
        <div style={{ width: IMG_W, height: 630, display: "flex", position: "relative", background: "#2A2533" }}>
          {photo ? (
            // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
            <img src={photo} width={IMG_W} height={630} style={{ objectFit: "cover" }} />
          ) : null}
          {ai ? (
            <div
              style={{
                position: "absolute",
                left: 20,
                bottom: 20,
                display: "flex",
                padding: "10px 18px",
                borderRadius: 999,
                background: "rgba(0,0,0,0.72)",
                color: "#FFFFFF",
                fontSize: 30,
                fontWeight: 700,
              }}
            >
              {label}
            </div>
          ) : null}
        </div>

        {/* 오른쪽: 브랜드 패널 */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 64px",
            color: "#F3F0F7",
          }}
        >
          <div style={{ display: "flex", fontSize: 28, letterSpacing: 6, color: "#8B5CF6", fontWeight: 700 }}>
            AURA OOTD
          </div>
          <div style={{ display: "flex", fontSize: 54, fontWeight: 700, lineHeight: 1.2, marginTop: 20 }}>
            {titleText}
          </div>
          {ai ? (
            <div style={{ display: "flex", fontSize: 24, color: "#AEA9B8", marginTop: 28 }}>{noticeText}</div>
          ) : null}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: font ? [{ name: "Noto Sans KR", data: font, weight: 700, style: "normal" }] : undefined,
    }
  );
}
