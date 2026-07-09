"use client";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { sb, ADMIN_EMAIL } from "@/lib/supabaseBrowser";

type ItemForm = { label: string; brand: string; priceKrw: string; href: string };
type SectionForm = { look: string; body: string; image: string; items: ItemForm[] };
type GuideForm = {
  id?: string;
  slug: string;
  category: string;
  title: string;
  dek: string;
  intro: string;
  updated: string;
  cover_image: string;
  published: boolean;
  sections: SectionForm[];
};
type ListRow = { id: string; slug: string; title: string; category: string; published: boolean };

const CATS = ["Fashion", "Beauty", "Lifestyle"];
const emptyItem = (): ItemForm => ({ label: "", brand: "", priceKrw: "", href: "" });
const emptySection = (): SectionForm => ({ look: "", body: "", image: "", items: [emptyItem()] });
const emptyForm = (): GuideForm => ({
  slug: "",
  category: "Fashion",
  title: "",
  dek: "",
  intro: "",
  updated: "",
  cover_image: "",
  published: false,
  sections: [emptySection()],
});

const input = "w-full rounded-lg border border-line px-3 py-2 text-[14px] outline-none focus:border-brand";

export default function AdminGuidesPage() {
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [rows, setRows] = useState<ListRow[]>([]);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<GuideForm>(emptyForm());
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    if (!sb) return;
    const { data, error } = await sb
      .from("guides")
      .select("id, slug, title, category, published")
      .order("created_at", { ascending: false });
    if (error) setMsg(`불러오기 실패: ${error.message}`);
    setRows((data as ListRow[]) ?? []);
  }, []);

  useEffect(() => {
    if (!sb) {
      setReady(true);
      return;
    }
    const apply = (session: { user?: { email?: string } } | null) => {
      const e = session?.user?.email ?? null;
      setEmail(e);
      if (e === ADMIN_EMAIL) load().finally(() => setReady(true));
      else setReady(true);
    };
    sb.auth.getSession().then(({ data }) => apply(data.session));
    const { data: sub } = sb.auth.onAuthStateChange((_ev, session) => apply(session));
    return () => sub.subscription.unsubscribe();
  }, [load]);

  function startNew() {
    setForm(emptyForm());
    setEditing(true);
    setMsg("");
  }

  async function startEdit(id: string) {
    if (!sb) return;
    const { data, error } = await sb.from("guides").select("*").eq("id", id).single();
    if (error || !data) return setMsg(`불러오기 실패: ${error?.message ?? "없음"}`);
    const r = data as Record<string, unknown>;
    const secs = Array.isArray(r.sections) ? (r.sections as Record<string, unknown>[]) : [];
    setForm({
      id: String(r.id),
      slug: String(r.slug ?? ""),
      category: String(r.category ?? "Fashion"),
      title: String(r.title ?? ""),
      dek: String(r.dek ?? ""),
      intro: String(r.intro ?? ""),
      updated: String(r.updated ?? ""),
      cover_image: String(r.cover_image ?? ""),
      published: !!r.published,
      sections:
        secs.length > 0
          ? secs.map((s) => ({
              look: String(s.look ?? ""),
              body: String(s.body ?? ""),
              image: String(s.image ?? ""),
              items: Array.isArray(s.items)
                ? (s.items as Record<string, unknown>[]).map((it) => ({
                    label: String(it.label ?? ""),
                    brand: String(it.brand ?? ""),
                    priceKrw: it.priceKrw != null ? String(it.priceKrw) : "",
                    href: String(it.href ?? ""),
                  }))
                : [emptyItem()],
            }))
          : [emptySection()],
    });
    setEditing(true);
    setMsg("");
  }

  async function save() {
    if (!sb) return;
    if (!form.slug.trim() || !form.title.trim()) return setMsg("슬러그와 제목은 필수입니다.");
    setBusy(true);
    const payload = {
      slug: form.slug.trim(),
      category: form.category,
      title: form.title.trim(),
      dek: form.dek.trim() || null,
      intro: form.intro.trim() || null,
      updated: form.updated.trim() || null,
      cover_image: form.cover_image.trim() || null,
      published: form.published,
      sections: form.sections
        .filter((s) => s.look.trim() || s.body.trim())
        .map((s) => ({
          look: s.look.trim(),
          body: s.body.trim(),
          image: s.image.trim() || undefined,
          items: s.items
            .filter((it) => it.href.trim() && it.label.trim())
            .map((it) => ({
              label: it.label.trim(),
              brand: it.brand.trim() || undefined,
              priceKrw: it.priceKrw.trim() ? Number(it.priceKrw.replace(/[^\d]/g, "")) || undefined : undefined,
              href: it.href.trim(),
            })),
        })),
      updated_at: new Date().toISOString(),
    };
    const res = form.id
      ? await sb.from("guides").update(payload).eq("id", form.id)
      : await sb.from("guides").insert(payload);
    setBusy(false);
    if (res.error) return setMsg(`저장 실패: ${res.error.message}`);
    setEditing(false);
    setForm(emptyForm());
    setMsg("저장됐어요.");
    load();
  }

  async function del(id: string) {
    if (!sb || !confirm("이 가이드를 삭제할까요? 되돌릴 수 없어요.")) return;
    const { error } = await sb.from("guides").delete().eq("id", id);
    if (error) return setMsg(`삭제 실패: ${error.message}`);
    load();
  }

  // ── 섹션·아이템 편집 헬퍼 ──
  const setSec = (i: number, patch: Partial<SectionForm>) =>
    setForm((f) => ({ ...f, sections: f.sections.map((s, k) => (k === i ? { ...s, ...patch } : s)) }));
  const setItem = (si: number, ii: number, patch: Partial<ItemForm>) =>
    setForm((f) => ({
      ...f,
      sections: f.sections.map((s, k) =>
        k === si ? { ...s, items: s.items.map((it, j) => (j === ii ? { ...it, ...patch } : it)) } : s
      ),
    }));

  if (!sb) return <Shell><p className="text-sub">Supabase 환경변수가 설정되지 않았습니다.</p></Shell>;
  if (!ready) return <Shell><p className="text-sub">불러오는 중…</p></Shell>;
  if (email !== ADMIN_EMAIL)
    return (
      <Shell>
        <p className="text-sub">관리자 권한이 없습니다{email ? ` (${email})` : ""}.</p>
        <Link href="/admin/login" className="btn mt-4 inline-block">관리자 로그인</Link>
      </Shell>
    );

  return (
    <Shell>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-serif text-[28px] font-bold text-navy">가이드 관리</h1>
        <div className="flex items-center gap-3">
          <Link href="/admin" className="text-[14px] text-sub underline">← 룩 관리</Link>
          {!editing ? <button onClick={startNew} className="btn">+ 새 가이드</button> : null}
        </div>
      </div>
      {msg ? <p className="mt-2 text-[13px] text-brand">{msg}</p> : null}

      {editing ? (
        <div className="mt-5 space-y-4 rounded-[16px] border border-line bg-white p-5">
          <div className="grid gap-2 sm:grid-cols-2">
            <input className={input} placeholder="슬러그 (예: summer-office-look)" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
            <select className={input} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {CATS.map((cc) => <option key={cc} value={cc}>{cc}</option>)}
            </select>
          </div>
          <input className={input} placeholder="제목" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <input className={input} placeholder="부제(dek)" value={form.dek} onChange={(e) => setForm({ ...form, dek: e.target.value })} />
          <textarea className={input} rows={3} placeholder="도입 단락(intro)" value={form.intro} onChange={(e) => setForm({ ...form, intro: e.target.value })} />
          <div className="grid gap-2 sm:grid-cols-2">
            <input className={input} placeholder="갱신 표기 (예: 2026년 7월)" value={form.updated} onChange={(e) => setForm({ ...form, updated: e.target.value })} />
            <input className={input} placeholder="커버 이미지 URL" value={form.cover_image} onChange={(e) => setForm({ ...form, cover_image: e.target.value })} />
          </div>

          {/* 섹션 빌더 */}
          <div className="space-y-4">
            {form.sections.map((s, si) => (
              <div key={si} className="rounded-[12px] border border-line bg-cream/40 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-bold uppercase tracking-wider text-brand-dark">Look {si + 1}</span>
                  <button onClick={() => setForm((f) => ({ ...f, sections: f.sections.filter((_, k) => k !== si) }))} className="text-[12px] text-red-500">섹션 삭제</button>
                </div>
                <input className={`${input} mt-2`} placeholder="룩 제목" value={s.look} onChange={(e) => setSec(si, { look: e.target.value })} />
                <textarea className={`${input} mt-2`} rows={3} placeholder="스타일링 본문(2~4문장)" value={s.body} onChange={(e) => setSec(si, { body: e.target.value })} />
                <input className={`${input} mt-2`} placeholder="섹션 이미지 URL(선택)" value={s.image} onChange={(e) => setSec(si, { image: e.target.value })} />

                <div className="mt-3 space-y-2">
                  {s.items.map((it, ii) => (
                    <div key={ii} className="grid gap-2 sm:grid-cols-4">
                      <input className={input} placeholder="아이템명" value={it.label} onChange={(e) => setItem(si, ii, { label: e.target.value })} />
                      <input className={input} placeholder="브랜드/몰" value={it.brand} onChange={(e) => setItem(si, ii, { brand: e.target.value })} />
                      <input className={input} placeholder="가격(원)" value={it.priceKrw} onChange={(e) => setItem(si, ii, { priceKrw: e.target.value })} />
                      <div className="flex gap-1">
                        <input className={input} placeholder="구매 링크(https://)" value={it.href} onChange={(e) => setItem(si, ii, { href: e.target.value })} />
                        <button onClick={() => setSec(si, { items: s.items.filter((_, j) => j !== ii) })} className="shrink-0 px-2 text-[13px] text-red-500">✕</button>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => setSec(si, { items: [...s.items, emptyItem()] })} className="text-[13px] font-semibold text-brand">+ 아이템</button>
                </div>
              </div>
            ))}
            <button onClick={() => setForm((f) => ({ ...f, sections: [...f.sections, emptySection()] }))} className="text-[14px] font-semibold text-brand">+ 섹션(룩) 추가</button>
          </div>

          <label className="flex items-center gap-2 text-[14px] text-ink">
            <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
            발행(체크 시 auraootd.com/guides에 노출)
          </label>

          <div className="flex gap-3">
            <button onClick={save} disabled={busy} className="btn">{busy ? "저장 중…" : "저장"}</button>
            <button onClick={() => { setEditing(false); setForm(emptyForm()); }} className="text-[14px] text-sub underline">취소</button>
          </div>
        </div>
      ) : (
        <div className="mt-5 space-y-2">
          {rows.length === 0 ? <p className="text-[14px] text-sub">아직 가이드가 없어요. 새 가이드를 작성해보세요.</p> : null}
          {rows.map((r) => (
            <div key={r.id} className="flex items-center justify-between rounded-[12px] border border-line bg-white px-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-[15px] font-semibold text-navy">{r.title}</p>
                <p className="text-[12px] text-sub">{r.category} · /{r.slug} · {r.published ? "발행" : "초안"}</p>
              </div>
              <div className="flex shrink-0 gap-3">
                <button onClick={() => startEdit(r.id)} className="text-[13px] font-semibold text-brand">수정</button>
                <button onClick={() => del(r.id)} className="text-[13px] font-semibold text-red-500">삭제</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Shell>
  );
}

function Shell({ children }: { children: ReactNode }) {
  return (
    <section className="pt-10 pb-24">
      <div className="mx-auto w-[92%] max-w-[1000px]">{children}</div>
    </section>
  );
}
