import type { Sec } from "@/lib/legalContent";
import { LEGAL_META } from "@/lib/legalContent";

function Sections({ sections }: { sections: Sec[] }) {
  return (
    <div className="space-y-5 text-ink [&_h2]:mt-9 [&_h2]:font-serif [&_h2]:text-xl [&_h2]:text-navy [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
      {sections.map((s, i) => (
        <section key={i}>
          {s.h ? <h2>{s.h}</h2> : null}
          {s.p?.map((para, j) => (
            <p key={`p${j}`}>{para}</p>
          ))}
          {s.b ? (
            <ul>
              {s.b.map((b, j) => (
                <li key={`b${j}`}>{b}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
    </div>
  );
}

/** 한/영 법적 문서 페이지(약관·개인정보·가이드라인 공용). */
export function LegalArticle({
  eyebrow,
  titleKo,
  titleEn,
  doc,
}: {
  eyebrow: string;
  titleKo: string;
  titleEn: string;
  doc: { ko: Sec[]; en: Sec[] };
}) {
  return (
    <article className="wrap max-w-3xl py-14">
      <span className="eyebrow">{eyebrow}</span>
      <h1 className="mt-3 font-serif text-[clamp(28px,5vw,40px)] font-bold text-navy">{titleKo}</h1>
      <p className="mt-2 text-sm text-hint">
        {LEGAL_META.company} · {LEGAL_META.app} · {LEGAL_META.effectiveKo}
      </p>
      <div className="mt-6">
        <Sections sections={doc.ko} />
      </div>

      <hr className="my-12 border-line" />

      <h2 className="font-serif text-2xl font-bold text-navy">{titleEn} (English)</h2>
      <p className="mt-1 text-sm text-hint">{LEGAL_META.effectiveEn}</p>
      <div className="mt-5">
        <Sections sections={doc.en} />
      </div>
    </article>
  );
}
