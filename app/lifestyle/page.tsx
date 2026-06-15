import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { LookGrid } from "@/components/LookCard";
import { DisclosureNote } from "@/components/DisclosureNote";
import { lifestyleLooks } from "@/lib/looks";

export const metadata: Metadata = {
  title: "라이프스타일 — 슈즈·액세서리·주얼리",
  description: "스니커즈부터 골드 레이어드 주얼리, 시즌 버킷햇까지. AURA가 큐레이션한 라이프스타일 아이템과 구매처.",
};

const chips = ["Shoes", "Accessories", "Jewelry", "Lifestyle"];

export default function LifestylePage() {
  return (
    <>
      <section className="pt-14 pb-7">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">Lifestyle</span>
            <h1 className="mt-3 font-serif text-[clamp(30px,5.2vw,50px)] font-bold leading-tight tracking-tight text-navy">
              슈즈 &amp; 액세서리 큐레이션
            </h1>
            <p className="mt-3.5 max-w-2xl text-[clamp(15px,2.2vw,19px)] text-sub">
              스니커즈·샌들부터 레이어드 주얼리, 시즌 백까지. 룩을 완성하는 라이프스타일 아이템을 발견하고
              바로 구매처에서 만나보세요.
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
          <LookGrid looks={lifestyleLooks} />
          <div className="mt-7">
            <DisclosureNote />
          </div>
        </div>
      </section>
    </>
  );
}
