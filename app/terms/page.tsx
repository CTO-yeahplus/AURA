import type { Metadata } from "next";
import { LegalArticle } from "@/components/LegalArticle";
import { TERMS } from "@/lib/legalContent";

export const metadata: Metadata = {
  title: "이용약관 / Terms of Service",
  description: "AURA 이용약관. Terms of Service for AURA / auraootd.com (한국어 · English).",
};

export default function TermsPage() {
  return <LegalArticle eyebrow="Terms" titleKo="이용약관" titleEn="Terms of Service" doc={TERMS} />;
}
