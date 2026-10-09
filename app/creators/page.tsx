import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { CreatorsOpening } from "@/components/creators/Opening";
import { Ledger } from "@/components/creators/Ledger";
import { Faq, TierStairs } from "@/components/creators/Extras";
import { ScrollProgress } from "@/components/home/ScrollProgress";
import { StoryCta, WordReveal } from "@/components/story/shared";
import { storyLooks } from "@/lib/looks";

export const metadata: Metadata = {
  title: "크리에이터 수익 — 발생·확인·정산",
  description:
    "AURA 크리에이터는 따라사기 링크로 수익을 냅니다. 수익 발생부터 확인, 정산·출금까지의 흐름을 투명하게 안내합니다.",
};

const steps = [
  {
    n: "01",
    t: "룩·따라사기 업로드",
    d: "코디를 올리고 각 아이템에 구매 링크(따라사기)를 연결합니다. 링크는 AURA 계정으로 안전하게 추적됩니다.",
  },
  {
    n: "02",
    t: "팔로워가 구매",
    d: "누군가 그 링크로 상품을 구매하면 제휴 네트워크를 통해 커미션이 AURA로 귀속됩니다.",
  },
  {
    n: "03",
    t: "전환 확인",
    d: "구매는 '예상'으로 잡혔다가 네트워크에서 확정되면 '확정'으로 바뀝니다(반품 시 취소). 출금 가능액은 확정분만 반영됩니다.",
  },
  {
    n: "04",
    t: "커미션 분배",
    d: "확정된 제휴 커미션의 50%(구매액의 약 4%)가 크리에이터 몫으로 적립됩니다. 앱의 '내 정산'에서 확정·예상 수익을 나눠 확인할 수 있어요.",
  },
  {
    n: "05",
    t: "정산·출금",
    d: "월 1회, 최소 출금액(₩10,000) 이상이면 앱에서 출금 신청 → 담당자가 등록된 이메일로 본인확인 서류(신분증·계좌)를 안내 → 확인 후 지급. 지급 시 소득세 원천징수(3.3%)를 공제한 실수령액이 입금됩니다.",
  },
];

// 등급별 수익공유율 — 앱 tier.ts(SSOT)와 동일 수치(받은 저장 수 기준).
// ⚠️ 등급제는 정산 계산에 아직 적용되지 않음(전원 50%) → '준비 중'으로만 표시.
//    앱 settlementGuide.TIER_PROGRAM_LIVE 와 함께 켤 것.
const TIER_PROGRAM_LIVE = false;
const tiers = [
  { name: "Rising", note: "시작 등급", share: "50%" },
  { name: "Silver", note: "저장 300+", share: "55%" },
  { name: "Gold", note: "저장 2,000+", share: "60%" },
  { name: "Diamond", note: "저장 10,000+", share: "70%" },
];

const faqs = [
  {
    q: "누가 수익화에 참여할 수 있나요?",
    a: "수익화(정산)는 만 19세 이상 성인 회원만 참여할 수 있어요. 미성년자도 룩은 자유롭게 올릴 수 있지만 수익 출금은 불가하며, 출금 신청 시 담당자가 이메일로 본인확인 서류를 안내드려요.",
  },
  {
    q: "수익이 바로 안 보여요",
    a: "따라사기 클릭·구매가 제휴 네트워크에 집계되기까지 시차가 있어요. 예상 수익은 앱의 '내 정산'에서 먼저 확인되고, 확정되면 출금 가능액에 반영됩니다.",
  },
  {
    q: "AI 화보로 만든 룩도 수익이 되나요?",
    a: "네. AI 화보에 넣은 따라사기 상품이 팔리면 일반 룩과 동일하게 수익으로 잡힙니다.",
  },
  {
    q: "수익공유율은 어떻게 오르나요?",
    a: "지금은 모든 크리에이터에게 제휴 수수료의 50%가 적용돼요. 받은 저장 수에 따라 최대 70%까지 오르는 등급제는 준비 중이며, 시행 전에 미리 알려드려요.",
  },
];

export default function CreatorsPage() {
  return (
    <>
      <ScrollProgress />

      {/* 도입 — 룩을 올린 저녁에서 수익이 잡힌 다음 달까지, 세 장면 */}
      <CreatorsOpening look={storyLooks.creators} />

      {/* 한 문장 — 어절 단위로 또렷해진다 */}
      <section className="bg-cream py-24 md:py-32">
        <div className="wrap max-w-5xl">
          <span className="eyebrow">For Creators</span>
          <WordReveal
            className="mt-5 font-serif text-[clamp(26px,4.2vw,54px)] font-bold leading-[1.3] tracking-tight text-navy"
            accentLast={3}
            text="누군가의 옷장에 내가 고른 옷이 걸립니다. 그 한 벌이 어디서 와서 어디로 가는지, 숫자 하나 숨기지 않고 보여드릴게요."
          />
        </div>
      </section>

      {/* 수익의 흐름 — 휠 한 단계마다 정산서에 한 줄씩 찍힌다 */}
      <Ledger steps={steps} />

      {/* 등급별 수익공유율 */}
      <TierStairs tiers={tiers} live={TIER_PROGRAM_LIVE} />

      {/* 자주 묻는 질문 */}
      <Faq items={faqs} />

      {/* 참여 자격 */}
      <section className="bg-cream pb-6">
        <div className="wrap">
          <Reveal>
            <div className="grain relative overflow-hidden rounded-[24px] bg-navy p-7 text-white sm:p-10">
              <h2 className="font-serif text-[clamp(22px,3vw,32px)] font-bold">누가 수익을 낼 수 있나요?</h2>
              <p className="mt-3 max-w-2xl break-keep text-[15px] leading-relaxed text-white/85">
                따라사기 상품 업로드는 누구나 할 수 있어요. 다만 <b>수익 적립·정산은 크리에이터</b>에게 열려 있습니다 —
                최상위 멤버십(AURA+ Pro)에 자동으로 부여되며, 파트너십으로 지정된 크리에이터도 포함됩니다.
              </p>
              <ul className="mt-5 space-y-2 break-keep text-[14px] text-white/80">
                <li>· 참여 자격: <b>만 19세 이상 성인</b>(미성년자는 룩 게시는 가능하나 수익화 불가)</li>
                <li>· 커미션 분배: 확정 제휴 커미션의 50%가 크리에이터 몫(등급별 차등은 준비 중)</li>
                <li>· 출금: 월 1회 · 최소 ₩10,000 · 신청 후 담당자가 이메일로 본인확인 서류 안내</li>
                <li>· 세금: 지급 시 3.3% 원천징수(사업소득) 후 실수령</li>
                <li>· 투명성: 확정/예상 수익을 앱의 &lsquo;내 정산&rsquo;에서 상시 확인</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <StoryCta
        title={
          <>
            오늘 입은 옷부터,
            <br />한 장 올려 보세요.
          </>
        }
        body="AURA는 iPhone에서 무료로 받을 수 있어요. 첫 룩을 올리고 따라사기를 연결해 보세요."
      />
    </>
  );
}
