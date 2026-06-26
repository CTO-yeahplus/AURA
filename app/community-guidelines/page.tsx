import type { Metadata } from "next";
import { LegalArticle } from "@/components/LegalArticle";
import { GUIDELINES } from "@/lib/legalContent";

export const metadata: Metadata = {
  title: "커뮤니티 가이드라인 / Community Guidelines",
  description: "AURA 커뮤니티 가이드라인. Community Guidelines for AURA (한국어 · English).",
};

export default function CommunityGuidelinesPage() {
  return (
    <LegalArticle
      eyebrow="Community"
      titleKo="커뮤니티 가이드라인"
      titleEn="Community Guidelines"
      doc={GUIDELINES}
    />
  );
}
