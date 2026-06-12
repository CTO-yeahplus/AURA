import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { LookGrid } from "@/components/LookCard";
import { DisclosureNote } from "@/components/DisclosureNote";
import { WaitlistForm } from "@/components/WaitlistForm";
import { homeLooks } from "@/lib/looks";

const shopCount = homeLooks.reduce((n, l) => n + l.shops.length, 0);

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gradient-to-br from-brand-soft to-accent/40 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 top-40 h-80 w-80 rounded-full bg-gradient-to-br from-brand/30 to-sky-200/40 blur-3xl" />
        <div className="wrap relative pt-20 pb-16">
          <Reveal>
            <span className="eyebrow">Outfit of the day · 글로벌 패션·뷰티 커뮤니티</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-3 max-w-3xl font-serif text-[clamp(36px,6.4vw,64px)] font-bold leading-[1.06] tracking-tight text-navy">
              오늘의 룩을 발견하고,
              <br />
              바로 따라 사세요.
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 max-w-xl text-[clamp(16px,2.4vw,20px)] text-sub">
              AURA는 10–20대 여성을 위한 OOTD 큐레이션 커뮤니티예요. 매일 올라오는 코디와 뷰티 룩에서
              영감을 얻고, 마음에 드는 아이템을 신뢰할 수 있는 구매처에서 바로 만나보세요.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="#waitlist" className="btn">앱 출시 알림 받기</Link>
              <Link href="#looks" className="btn-ghost">에디터스 룩 보기</Link>
            </div>
            <p className="mt-3.5 text-[13px] text-hint">
              iOS 먼저 출시 · Android 준비 중 · 한국에서 시작해 글로벌로
            </p>
          </Reveal>

          {/* Shop anchor (스크롤 없이 구매 링크 인지) */}
          <Reveal delay={0.24}>
            <Link
              href="#looks"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink shadow-soft transition hover:border-brand"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-accent" />
              지금 {shopCount}개 아이템 따라사기 →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* LOOKS */}
      <section id="looks" className="py-14">
        <div className="wrap">
          <Reveal>
            <div className="mb-7">
              <span className="eyebrow">Editor&apos;s Picks</span>
              <h2 className="mt-2 font-serif text-[clamp(26px,4vw,38px)] text-navy">이번 주의 룩</h2>
              <p className="mt-2 max-w-xl text-sub">
                AURA 에디터가 고른 코디예요. 각 룩의 아이템은 구매처 링크로 바로 확인할 수 있어요. (구매
                링크는 제휴 링크로, 가격은 동일합니다.)
              </p>
            </div>
          </Reveal>
          <LookGrid looks={homeLooks} />
          <div className="mt-7">
            <DisclosureNote />
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="bg-cream-muted py-14">
        <div className="wrap">
          <Reveal>
            <div className="mb-7">
              <span className="eyebrow">Browse by category</span>
              <h2 className="mt-2 font-serif text-[clamp(26px,4vw,38px)] text-navy">카테고리로 둘러보기</h2>
              <p className="mt-2 text-sub">무드와 상황에 맞는 룩북을 더 깊게 탐색해보세요.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[
              { href: "/fashion", title: "패션", desc: "발레코어부터 Y2K, 오피스룩까지 — 상황별 코디 큐레이션.", grad: "from-brand to-accent" },
              { href: "/beauty", title: "뷰티", desc: "데일리 메이크업·스킨케어·향수 — 오늘의 뷰티 룩.", grad: "from-sky-400 to-brand" },
            ].map((c, i) => (
              <Reveal key={c.href} delay={i * 0.08}>
                <Link
                  href={c.href}
                  className="group block rounded-xl2 border border-line bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:border-brand hover:shadow-lift"
                >
                  <div className={`mb-3.5 h-10 w-10 rounded-xl bg-gradient-to-br ${c.grad}`} />
                  <h3 className="font-serif text-xl text-ink">{c.title}</h3>
                  <p className="mt-1.5 text-sm text-sub">{c.desc}</p>
                  <span className="mt-3 inline-block text-[13px] font-bold text-brand-dark">
                    더 보기 →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW */}
      <section className="py-14">
        <div className="wrap">
          <Reveal>
            <div className="mb-7">
              <span className="eyebrow">How AURA works</span>
              <h2 className="mt-2 font-serif text-[clamp(26px,4vw,38px)] text-navy">발견 · 신뢰 · 구매</h2>
              <p className="mt-2 text-sub">좋아할 만한 룩을 먼저 보여주고, 신뢰할 수 있는 구매처로 연결해요.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { t: "① 취향 발견", d: "좋아하는 스타일·무드를 고르면, 매일의 피드가 내 취향으로 맞춰져요." },
              { t: "② 룩 저장·팔로우", d: "마음에 드는 코디를 저장하고, 좋아하는 크리에이터를 팔로우하세요." },
              { t: "③ 바로 따라 사기", d: "룩에 쓰인 아이템을 신뢰할 수 있는 구매처에서 바로 확인하고 구매해요." },
            ].map((f, i) => (
              <Reveal key={f.t} delay={i * 0.08}>
                <div className="h-full rounded-xl2 border border-line bg-white p-6">
                  <div className="mb-3.5 h-9 w-9 rounded-xl bg-gradient-to-br from-brand to-accent" />
                  <h3 className="text-[17px] font-bold text-ink">{f.t}</h3>
                  <p className="mt-1.5 text-sm text-sub">{f.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WAITLIST */}
      <section id="waitlist" className="py-14">
        <div className="wrap">
          <Reveal>
            <div className="rounded-[24px] bg-gradient-to-br from-navy to-[#4c2e63] px-8 py-12 text-center">
              <h2 className="font-serif text-[clamp(24px,4vw,34px)] text-white">
                앱 출시 알림을 가장 먼저 받아보세요
              </h2>
              <p className="mx-auto mt-2.5 mb-6 max-w-lg text-white/85">
                iOS 베타가 곧 시작돼요. 이메일을 남기면 출시 소식과 얼리 액세스 초대를 보내드릴게요.
              </p>
              <WaitlistForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
