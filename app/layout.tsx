import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://auraootd.com"),
  title: {
    default: "AURA — 오늘의 룩을 발견하고, 바로 따라 사는 패션·뷰티 커뮤니티",
    template: "%s — AURA",
  },
  description:
    "AURA는 10–20대 여성을 위한 OOTD 패션·뷰티 큐레이션 커뮤니티입니다. 매일의 룩을 발견하고, 마음에 드는 아이템을 바로 구매처에서 만나보세요.",
  openGraph: {
    title: "AURA — Discover & Shop Your Daily Look",
    description: "패션·뷰티 OOTD를 발견하고 바로 따라 사는 커뮤니티. auraootd.com",
    url: "https://auraootd.com",
    siteName: "AURA",
    type: "website",
  },
  icons: { icon: "/aura_logo_1k.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Noto+Sans+KR:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
