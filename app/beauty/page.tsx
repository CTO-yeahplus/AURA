import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { LookGrid } from "@/components/LookCard";
import { DisclosureNote } from "@/components/DisclosureNote";
import { beautyLooks } from "@/lib/looks";

export const metadata: Metadata = {
  title: "뷰티 — 메이크업·스킨케어·향수",
  description: "물광 메이크업부터 시카 진정 케어, 향수까지. AURA가 큐레이션한 뷰티 룩과 구매처.",
};

const chips = ["Makeup", "Skincare", "Fragrance", "Body", "Hair"];

export default function BeautyPage() {
  return (
    <>
      <section className="pt-14 pb-7">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">Beauty</span>
            <h1 className="mt-3 font-serif text-[clamp(30px,5.2vw,50px)] font-bold leading-tight tracking-tight text-navy">
              오늘의 뷰티 룩
            </h1>
            <p className="mt-3.5 max-w-2xl text-[clamp(15px,2.2vw,19px)] text-sub">
              데일리 메이크업부터 스킨케어 루틴, 향수까지. 따라 하기 쉬운 뷰티 큐레이션과 아이템을
              모았어요.
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {chips.map((c) => (
                <span key={c} className="chip">{c}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
      <section className="pb-14">
        <div className="wrap">
          <LookGrid looks={beautyLooks} />
          <div className="mt-7">
            <DisclosureNote />
          </div>
        </div>
      </section>
    </>
  );
}
