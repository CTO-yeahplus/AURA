import type { Metadata } from "next";
import { LegalArticle } from "@/components/LegalArticle";
import { PRIVACY } from "@/lib/legalContent";

export const metadata: Metadata = {
  title: "개인정보처리방침 / Privacy Policy",
  description: "AURA 개인정보처리방침. Privacy Policy for AURA / auraootd.com (한국어 · English).",
};

export default function PrivacyPage() {
  return (
    <LegalArticle eyebrow="Privacy" titleKo="개인정보처리방침" titleEn="Privacy Policy" doc={PRIVACY} />
  );
}
