import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { DisclosureNote } from "@/components/DisclosureNote";
import { OotdFeed } from "@/components/OotdFeed";

export const metadata: Metadata = {
  title: "OOTD — 실시간 룩 피드",
  description:
    "AURA 앱 홈피드의 오늘의 룩을 auraootd.com에서 바로 만나보세요. 룩을 눌러 코디의 아이템을 구매처에서 바로 확인.",
};

export default function OotdPage() {
  return (
    <>
      <section className="pt-14 pb-7">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">OOTD · Live</span>
            <h1 className="mt-3 font-serif text-[clamp(30px,5.2vw,50px)] font-bold leading-tight tracking-tight text-navy">
              오늘의 룩, 실시간 피드
            </h1>
            <p className="mt-3.5 max-w-2xl text-[clamp(15px,2.2vw,19px)] text-sub">
              AURA 앱에 올라온 최신 코디 전체를 웹에서 둘러보고, 룩을 눌러 아이템을 구매처에서 만나보세요.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-16">
        <div className="wrap">
          <OotdFeed />
          <div className="mt-8">
            <DisclosureNote />
          </div>
        </div>
      </section>
    </>
  );
}
