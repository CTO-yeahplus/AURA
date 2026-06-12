import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { LookGrid } from "@/components/LookCard";
import { DisclosureNote } from "@/components/DisclosureNote";
import { fashionLooks } from "@/lib/looks";

export const metadata: Metadata = {
  title: "패션 — 데일리·스트릿·오피스 룩",
  description: "발레코어부터 Y2K, 미니멀 오피스룩까지. AURA가 큐레이션한 상황별 패션 코디와 구매처.",
};

const chips = ["Daily", "Street", "Office", "Date", "Night"];

export default function FashionPage() {
  return (
    <>
      <section className="pt-14 pb-7">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">Fashion</span>
            <h1 className="mt-3 font-serif text-[clamp(30px,5.2vw,50px)] font-bold leading-tight tracking-tight text-navy">
              상황별 패션 룩북
            </h1>
            <p className="mt-3.5 max-w-2xl text-[clamp(15px,2.2vw,19px)] text-sub">
              데일리부터 오피스·데이트·나이트까지. 무드에 맞는 코디를 발견하고, 아이템을 바로 구매처에서
              만나보세요.
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
          <LookGrid looks={fashionLooks} />
          <div className="mt-7">
            <DisclosureNote />
          </div>
        </div>
      </section>
    </>
  );
}
