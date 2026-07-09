import { redirect } from "next/navigation";

// 라이프스타일 페이지는 OOTD 피드와 콘텐츠가 중복되어 통합됨(중복 콘텐츠 SEO 방지). /ootd로 리다이렉트.
export default function LifestylePage() {
  redirect("/ootd");
}
