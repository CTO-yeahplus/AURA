import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "제휴(어필리에이트) 고지",
  description: "AURA의 제휴(어필리에이트) 링크 정책 및 광고 고지. Affiliate disclosure.",
};

export default function DisclosurePage() {
  return (
    <article className="wrap max-w-3xl py-14">
      <span className="eyebrow">Affiliate Disclosure</span>
      <h1 className="mt-3 font-serif text-[clamp(28px,5vw,40px)] font-bold text-navy">제휴(어필리에이트) 고지</h1>
      <p className="mt-2 text-sm text-hint">최종 업데이트: 2026년 7월</p>

      <div className="mt-6 space-y-5 text-ink [&_h2]:mt-9 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-navy">
        <p>
          AURA(auraootd.com, 운영사 YEAHPLUS)는 패션·뷰티 룩과 실제 구매처를 연결하는 커뮤니티입니다.
          본 사이트와 앱의 일부 구매 링크는 <strong>제휴(어필리에이트) 링크</strong>입니다.
        </p>
        <h2>제휴 링크란</h2>
        <p>
          제휴 링크를 통해 방문·구매가 일어나면, 해당 판매자 또는 제휴 네트워크로부터 AURA가 일정 수수료를
          받을 수 있습니다. 이 과정에서 <strong>구매 가격은 동일</strong>하며, 이용자에게 추가 비용이
          발생하지 않습니다. 수수료는 서비스 운영과 크리에이터 정산에 사용됩니다.
        </p>
        <h2>투명성 원칙</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>제휴 링크가 포함된 영역에는 본 고지 또는 동등한 안내를 함께 표기합니다.</li>
          <li>수수료 수취 여부가 콘텐츠(룩·추천)의 진정성에 영향을 주지 않도록 합니다.</li>
          <li>표시 가격·혜택은 판매자 정책을 따르며, 최종 가격·재고는 구매처에서 확인해야 합니다.</li>
        </ul>
        <h2>가격 정보 정확성</h2>
        <p>
          AURA에 표시되는 가격·할인·재고 등 상품 정보는 <strong>수집 시점 기준의 참고 정보</strong>이며,
          실제 판매처가 제공하는 정보와 다를 수 있습니다. 수집 지연·오류·품절 등으로 가격이 부정확하게
          (예: 0원으로) 표시될 수 있으므로, <strong>최종 가격·재고·구매 조건은 반드시 구매(판매)
          사이트에서 직접 확인</strong>하시기 바랍니다. AURA는 <strong>통신판매중개자</strong>로서 통신판매의
          당사자가 아니며, 표시 정보의 정확성을 보증하지 않습니다.
        </p>
        <h2>제휴 네트워크</h2>
        <p>
          AURA는 직접 제휴 및 제휴 애그리게이터 네트워크(예: Sovrn Commerce, Skimlinks 등)를 통해 다양한
          판매자와 연결될 수 있습니다. 각 판매자/네트워크의 약관이 적용됩니다.
        </p>
        <h2>문의</h2>
        <p>
          제휴·광고·정정 요청은{" "}
          <a className="text-brand-dark underline" href="mailto:contact@yeahplus.co.kr">contact@yeahplus.co.kr</a>
          로 연락주세요.
        </p>
      </div>
    </article>
  );
}
