// 읽을거리(글 가이드)의 화면 — lib/articles.ts 의 블록을 그대로 그린다.
// 스크롤 연출(opacity · transform)을 쓰지 않는다: 검색 엔진과 자바스크립트를 끈 독자가 스크롤 없이도 글 전체를 본다.
import Link from "next/link";
import type { ReactNode } from "react";
import { APP_STORE_URL } from "@/lib/app";
import { monthLabel, plain, type Article, type ArticleBlock } from "@/lib/articles";

const SITE = "https://auraootd.com";
/** App Store Connect 캠페인 값 — 이 글에서 넘어간 방문 · 다운로드를 ASC 앱 분석에서 따로 본다(애플이 합계로만 집계). */
const storeUrl = (slug: string) => `${APP_STORE_URL}?pt=121180501&ct=guide-${slug}&mt=8`;

/** **굵게** · [글자](주소) 만 알아듣는다. 안쪽 주소(/…)는 Link, 바깥 주소는 새 창. */
export function Inline({ text }: { text: string }) {
  const out: ReactNode[] = [];
  const re = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) {
      out.push(
        <strong key={m.index} className="font-bold text-navy">
          {m[1]}
        </strong>
      );
    } else if (m[3].startsWith("/")) {
      out.push(
        <Link key={m.index} href={m[3]} className="font-bold text-brand-dark underline underline-offset-4">
          {m[2]}
        </Link>
      );
    } else {
      out.push(
        <a key={m.index} href={m[3]} target="_blank" rel="noopener" className="font-bold text-brand-dark underline underline-offset-4">
          {m[2]}
        </a>
      );
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}

/** 소제목의 닻 — 차례에서 건너뛴다. */
export function headingId(index: number): string {
  return `s-${index + 1}`;
}

function Block({ b, hIndex }: { b: ArticleBlock; hIndex: number }) {
  switch (b.t) {
    case "h2":
      return (
        <h2
          id={headingId(hIndex)}
          className="mt-14 scroll-mt-24 break-keep font-serif text-[clamp(22px,3vw,30px)] font-bold leading-[1.35] tracking-tight text-navy first:mt-0"
        >
          {b.text}
        </h2>
      );
    case "p":
      return (
        <p className="mt-5 break-keep text-[16px] leading-[1.85] text-ink md:text-[17px]">
          <Inline text={b.text} />
        </p>
      );
    case "ul":
    case "ol": {
      const List = b.t === "ul" ? "ul" : "ol";
      return (
        <List
          className={`mt-5 space-y-3 pl-5 text-[16px] leading-[1.8] text-ink marker:text-brand-dark md:text-[17px] ${
            b.t === "ul" ? "list-disc" : "list-decimal marker:font-bold"
          }`}
        >
          {b.items.map((it, i) => (
            <li key={i} className="break-keep pl-1">
              <Inline text={it} />
            </li>
          ))}
        </List>
      );
    }
    case "table":
      return (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-line bg-white">
          <table className="w-full border-collapse text-left text-[14px] leading-[1.6] md:text-[15.5px]">
            <thead>
              <tr className="bg-brand-soft text-navy">
                {b.head.map((h, i) => (
                  <th key={i} scope="col" className="px-3 py-3 font-bold md:px-4">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((row, r) => (
                <tr key={r} className="border-t border-line align-top">
                  {row.map((cell, c) => (
                    <td key={c} className={`break-keep px-3 py-3 text-ink md:px-4 ${c === 1 ? "whitespace-nowrap font-bold text-brand-dark" : ""}`}>
                      <Inline text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "fit":
      return (
        <dl className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line text-[15px] leading-[1.7] md:grid-cols-2 md:text-[15.5px]">
          <div className="bg-white px-5 py-4">
            <dt className="text-xs font-bold tracking-[0.08em] text-brand-dark">잘 맞는 사람</dt>
            <dd className="mt-1.5 break-keep text-ink">
              <Inline text={b.good} />
            </dd>
          </div>
          <div className="bg-white px-5 py-4">
            <dt className="text-xs font-bold tracking-[0.08em] text-sub">알아 둘 점</dt>
            <dd className="mt-1.5 break-keep text-ink">
              <Inline text={b.note} />
            </dd>
          </div>
        </dl>
      );
  }
}

/** 검색 엔진용 구조화 데이터 — 글 · 질문 답 · 경로. 화면에 보이는 글자와 같은 내용만 넣는다. */
function jsonLd(a: Article) {
  const url = `${SITE}/guides/${a.slug}`;
  const org = { "@type": "Organization", name: "AURA", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/aura_logo_1k.png` } };
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Article",
      headline: a.title,
      description: a.description,
      inLanguage: "ko",
      datePublished: a.published_at,
      dateModified: a.updated_at,
      author: org,
      publisher: org,
      mainEntityOfPage: url,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "AURA", item: SITE },
        { "@type": "ListItem", position: 2, name: "스타일 가이드", item: `${SITE}/guides` },
        { "@type": "ListItem", position: 3, name: a.title, item: url },
      ],
    },
  ];
  if (a.faq.length > 0) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: a.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: plain(f.a) },
      })),
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}

export function ArticleText({
  article: a,
  related,
}: {
  article: Article;
  /** 글 끝에 잇는 스타일 가이드(룩 가이드) 몇 편. */
  related: { slug: string; title: string; dek: string }[];
}) {
  const heads = a.blocks.filter((b): b is Extract<ArticleBlock, { t: "h2" }> => b.t === "h2");
  let h = -1;

  return (
    <article className="bg-cream pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(a)) }} />

      {!a.published ? (
        <p className="bg-navy px-6 py-2.5 text-center text-[13px] font-bold text-white">
          초안 미리보기 — 개발 서버에서만 보입니다. 배포본에는 아직 없는 글이에요.
        </p>
      ) : null}

      <header className="wrap max-w-3xl pt-14 md:pt-20">
        <nav aria-label="경로" className="text-[13px] font-bold text-sub">
          <Link href="/guides" className="text-brand-dark underline-offset-4 hover:underline">
            스타일 가이드
          </Link>
          <span className="mx-2 text-hint">/</span>
          <span>읽을거리</span>
        </nav>
        <h1 className="mt-5 break-keep font-serif text-[clamp(30px,5.4vw,50px)] font-bold leading-[1.22] tracking-tight text-navy">
          {a.title}
        </h1>
        <p className="mt-4 text-[13px] font-bold tracking-[0.04em] text-sub">
          {a.category} · <time dateTime={a.updated_at}>{monthLabel(a.updated_at)}</time> · AURA
        </p>

        {a.disclosure ? (
          <p className="mt-7 break-keep rounded-2xl border border-[#e3d9f7] bg-brand-soft px-5 py-4 text-[14px] leading-[1.7] text-navy">
            {a.disclosure}
          </p>
        ) : null}

        <p className="mt-8 break-keep font-serif text-[clamp(18px,2.2vw,22px)] font-bold leading-[1.7] text-navy">
          <Inline text={a.lead} />
        </p>

        {heads.length > 1 ? (
          <nav aria-label="차례" className="mt-9 rounded-2xl border border-line bg-white px-5 py-4">
            <p className="eyebrow">차례</p>
            <ol className="mt-3 space-y-2 text-[15px] leading-[1.6]">
              {heads.map((x, i) => (
                <li key={i} className="break-keep">
                  <a href={`#${headingId(i)}`} className="text-ink underline-offset-4 hover:text-brand-dark hover:underline">
                    {x.text}
                  </a>
                </li>
              ))}
              {a.faq.length > 0 ? (
                <li>
                  <a href="#faq" className="text-ink underline-offset-4 hover:text-brand-dark hover:underline">
                    자주 묻는 질문
                  </a>
                </li>
              ) : null}
            </ol>
          </nav>
        ) : null}
      </header>

      <div className="wrap mt-12 max-w-3xl">
        {a.blocks.map((b, i) => {
          if (b.t === "h2") h += 1;
          return <Block key={i} b={b} hIndex={h} />;
        })}

        {a.faq.length > 0 ? (
          <section aria-labelledby="faq">
            <h2
              id="faq"
              className="mt-14 scroll-mt-24 font-serif text-[clamp(22px,3vw,30px)] font-bold leading-[1.35] tracking-tight text-navy"
            >
              자주 묻는 질문
            </h2>
            <div className="mt-6 divide-y divide-line rounded-2xl border border-line bg-white">
              {a.faq.map((f, i) => (
                <div key={i} className="px-5 py-5">
                  <h3 className="break-keep text-[16.5px] font-bold leading-[1.5] text-navy md:text-[17.5px]">{f.q}</h3>
                  <p className="mt-2 break-keep text-[15.5px] leading-[1.8] text-ink md:text-[16.5px]">
                    <Inline text={f.a} />
                  </p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {/* 글이 끝나는 자리 — 오늘의 룩 · 앱 */}
        <section className="mt-14 rounded-xl2 bg-white px-6 py-8 shadow-soft md:px-9 md:py-10">
          <p className="eyebrow">오늘의 룩</p>
          <p className="mt-3 break-keep font-serif text-[clamp(20px,2.6vw,26px)] font-bold leading-[1.45] text-navy">
            오늘의 룩부터 구경해 보세요.
          </p>
          <p className="mt-2 break-keep text-[15.5px] leading-[1.8] text-ink">{a.outro}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/ootd" className="btn">
              오늘의 룩 보기
            </Link>
            <a href={storeUrl(a.slug)} target="_blank" rel="noopener" className="btn-ghost">
              App Store에서 AURA 받기
            </a>
          </div>
        </section>

        {related.length > 0 ? (
          <section aria-labelledby="more" className="mt-14">
            <h2 id="more" className="font-serif text-[clamp(20px,2.6vw,26px)] font-bold text-navy">
              이어서 볼 스타일 가이드
            </h2>
            <ul className="mt-5 grid gap-3 md:grid-cols-2">
              {related.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={`/guides/${g.slug}`}
                    className="block h-full rounded-2xl border border-line bg-white px-5 py-4 transition-colors hover:border-brand-dark"
                  >
                    <span className="block break-keep text-[15.5px] font-bold leading-[1.5] text-navy">{g.title}</span>
                    <span className="mt-1 block break-keep text-[13.5px] leading-[1.6] text-sub">{g.dek}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </article>
  );
}
