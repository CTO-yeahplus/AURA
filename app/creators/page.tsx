import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";

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
      <section className="pt-14 pb-7">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">Creators</span>
            <h1 className="mt-3 font-serif text-[clamp(30px,5.2vw,50px)] font-bold leading-tight tracking-tight text-navy">
              크리에이터 수익, 이렇게 흐릅니다
            </h1>
            <p className="mt-3.5 max-w-2xl text-[clamp(15px,2.2vw,19px)] text-sub">
              좋아하는 코디를 올리고, 따라사기 링크로 수익을 냅니다. 발생부터 정산까지 모든 단계를 투명하게 보여드려요.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-6">
        <div className="wrap grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={(i % 3) * 0.06}>
              <div className="h-full rounded-[18px] border border-line bg-white p-6 shadow-soft">
                <span className="font-serif text-[28px] font-bold text-brand">{s.n}</span>
                <h3 className="mt-2 font-serif text-[20px] font-bold text-navy">{s.t}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-sub">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="pb-6">
        <div className="wrap">
          <Reveal>
            <h2 className="font-serif text-[24px] font-bold text-navy">
              등급별 수익공유율{TIER_PROGRAM_LIVE ? "" : " (준비 중)"}
            </h2>
            <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-sub">
              {TIER_PROGRAM_LIVE
                ? "받은 저장 수가 쌓일수록 등급이 올라가고, 등급이 높을수록 확정 커미션에서 크리에이터가 가져가는 비율이 커집니다."
                : "지금은 모든 크리에이터에게 50%가 적용돼요. 아래 등급제는 준비 중이며, 시행 전에 미리 알려드려요."}
            </p>
            <div className="mt-5 overflow-hidden rounded-[18px] border border-line bg-white shadow-soft">
              {tiers.map((t, i) => (
                <div
                  key={t.name}
                  className={`flex items-center px-6 py-4 ${i < tiers.length - 1 ? "border-b border-line" : ""}`}
                >
                  <span className="w-24 font-serif text-[17px] font-bold text-navy">{t.name}</span>
                  <span className="flex-1 text-[13px] text-sub">{t.note}</span>
                  <span className="text-[18px] font-bold text-brand">{t.share}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-6">
        <div className="wrap">
          <Reveal>
            <h2 className="font-serif text-[24px] font-bold text-navy">자주 묻는 질문</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {faqs.map((f, i) => (
                <Reveal key={f.q} delay={(i % 3) * 0.06}>
                  <div className="h-full rounded-[18px] border border-line bg-white p-6 shadow-soft">
                    <h3 className="text-[15px] font-bold text-navy">Q. {f.q}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-sub">{f.a}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-16">
        <div className="wrap">
          <Reveal>
            <div className="rounded-[18px] bg-navy p-7 text-white sm:p-9">
              <h2 className="font-serif text-[24px] font-bold">누가 수익을 낼 수 있나요?</h2>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/85">
                따라사기 상품 업로드는 누구나 할 수 있어요. 다만 <b>수익 적립·정산은 크리에이터</b>에게 열려 있습니다 —
                최상위 멤버십(AURA+ Pro)에 자동으로 부여되며, 파트너십으로 지정된 크리에이터도 포함됩니다.
              </p>
              <ul className="mt-5 space-y-2 text-[14px] text-white/80">
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
    </>
  );
}
