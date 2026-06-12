import Link from "next/link";

export function DisclosureNote() {
  return (
    <p className="rounded-2xl border border-[#e3d9f7] bg-brand-soft px-5 py-4 text-[13px] text-navy">
      <strong>제휴(어필리에이트) 안내.</strong> AURA의 구매 링크 중 일부는 제휴 링크예요. 링크를 통해
      구매가 일어나면 AURA가 일정 수수료를 받을 수 있어요. 구매 가격은 동일하며, 수수료는 서비스 운영과
      크리에이터 정산에 쓰입니다. 자세한 내용은{" "}
      <Link href="/disclosure" className="font-bold text-brand-dark underline">
        제휴 고지
      </Link>
      를 확인하세요.
    </p>
  );
}
