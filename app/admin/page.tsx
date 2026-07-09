"use client";
import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { sb, ADMIN_EMAIL } from "@/lib/supabaseBrowser";

type Row = { id: string; title: string | null; caption: string | null; media_url: string | null };

// 관리자 룩 CRUD — cto 세션으로만. 쓰기는 RLS "owner write"(author_id=본인)로 제한 → 시드(cto 소유)만 편집 가능.
export default function AdminPage() {
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [uid, setUid] = useState<string | null>(null);
  const [rows, setRows] = useState<Row[]>([]);
  const [q, setQ] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState({ title: "", caption: "" });
  const [create, setCreate] = useState({ title: "", caption: "", media_url: "", brand: "", product_url: "" });
  const [showCreate, setShowCreate] = useState(false);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async (authorId: string) => {
    if (!sb) return;
    const { data, error } = await sb
      .from("looks")
      .select("id, title, caption, media_url")
      .eq("author_id", authorId)
      .order("created_at", { ascending: false })
      .limit(1000);
    if (error) setMsg(`불러오기 실패: ${error.message}`);
    setRows((data as Row[]) ?? []);
  }, []);

  useEffect(() => {
    if (!sb) {
      setReady(true);
      return;
    }
    const apply = (session: { user?: { id?: string; email?: string } } | null) => {
      const user = session?.user;
      setEmail(user?.email ?? null);
      setUid(user?.id ?? null);
      if (user?.email === ADMIN_EMAIL && user.id) load(user.id).finally(() => setReady(true));
      else setReady(true);
    };
    sb.auth.getSession().then(({ data }) => apply(data.session));
    const { data: sub } = sb.auth.onAuthStateChange((_e, session) => apply(session));
    return () => sub.subscription.unsubscribe();
  }, [load]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return rows;
    return rows.filter(
      (r) =>
        (r.title ?? "").toLowerCase().includes(term) ||
        (r.caption ?? "").toLowerCase().includes(term)
    );
  }, [rows, q]);

  async function saveEdit(id: string) {
    if (!sb) return;
    setBusy(true);
    const { error } = await sb
      .from("looks")
      .update({ title: draft.title.trim().slice(0, 60), caption: draft.caption.trim().slice(0, 500) })
      .eq("id", id);
    setBusy(false);
    if (error) return setMsg(`저장 실패: ${error.message}`);
    setEditingId(null);
    if (uid) load(uid);
  }

  async function del(id: string) {
    if (!sb || !confirm("이 룩을 삭제할까요? 되돌릴 수 없어요.")) return;
    setBusy(true);
    const { error } = await sb.from("looks").delete().eq("id", id);
    setBusy(false);
    if (error) return setMsg(`삭제 실패: ${error.message}`);
    if (uid) load(uid);
  }

  async function createLook() {
    if (!sb || !uid) return;
    if (!create.media_url.trim()) return setMsg("이미지 URL은 필수입니다.");
    setBusy(true);
    const { data: lk, error } = await sb
      .from("looks")
      .insert({
        author_id: uid,
        type: "image",
        media_url: create.media_url.trim(),
        title: create.title.trim().slice(0, 60) || null,
        caption: create.caption.trim().slice(0, 500) || null,
      })
      .select("id")
      .single();
    if (error || !lk) {
      setBusy(false);
      return setMsg(`생성 실패: ${error?.message ?? "unknown"}`);
    }
    const lookId = (lk as { id: string }).id;
    // 따라사기 링크가 있으면 상품 1개 + 연결 생성(구매 버튼 노출·웹 수익).
    if (create.product_url.trim()) {
      const { data: pr } = await sb
        .from("products")
        .insert({
          title: create.brand.trim() || create.title.trim() || "상품",
          brand: create.brand.trim() || null,
          affiliate_url: create.product_url.trim(),
          currency: "KRW",
        })
        .select("id")
        .single();
      if (pr) await sb.from("look_products").insert({ look_id: lookId, product_id: (pr as { id: string }).id });
    }
    setBusy(false);
    setCreate({ title: "", caption: "", media_url: "", brand: "", product_url: "" });
    setShowCreate(false);
    if (uid) load(uid);
  }

  async function signOut() {
    await sb?.auth.signOut();
    window.location.href = "/admin/login";
  }

  if (!sb) return <Shell><p className="text-sub">Supabase 환경변수가 설정되지 않았습니다.</p></Shell>;
  if (!ready) return <Shell><p className="text-sub">불러오는 중…</p></Shell>;
  if (email !== ADMIN_EMAIL)
    return (
      <Shell>
        <p className="text-sub">관리자 권한이 없습니다{email ? ` (${email})` : ""}.</p>
        <div className="mt-4 flex gap-3">
          <Link href="/admin/login" className="btn">관리자 로그인</Link>
          {email ? <button onClick={signOut} className="text-[14px] text-sub underline">로그아웃</button> : null}
        </div>
      </Shell>
    );

  return (
    <Shell>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-serif text-[28px] font-bold text-navy">룩 관리</h1>
        <div className="flex items-center gap-3">
          <Link href="/admin/guides" className="text-[14px] font-semibold text-brand">가이드 관리 →</Link>
          <button onClick={() => setShowCreate((v) => !v)} className="btn">{showCreate ? "닫기" : "+ 새 룩"}</button>
          <button onClick={signOut} className="text-[14px] text-sub underline">로그아웃</button>
        </div>
      </div>
      {msg ? <p className="mt-2 text-[13px] text-brand">{msg}</p> : null}

      {/* 검색 */}
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="제목·캡션 검색"
        className="mt-4 w-full rounded-lg border border-line px-4 py-2.5 text-[14px] outline-none focus:border-brand"
      />

      {/* 생성(토글) */}
      {showCreate ? (
        <div className="mt-4 rounded-[16px] border border-line bg-white p-5">
          <div className="grid gap-2 sm:grid-cols-2">
            <input value={create.title} onChange={(e) => setCreate({ ...create, title: e.target.value })} placeholder="제목" className="rounded-lg border border-line px-3 py-2 text-[14px]" />
            <input value={create.media_url} onChange={(e) => setCreate({ ...create, media_url: e.target.value })} placeholder="이미지 URL (필수)" className="rounded-lg border border-line px-3 py-2 text-[14px]" />
            <input value={create.brand} onChange={(e) => setCreate({ ...create, brand: e.target.value })} placeholder="브랜드/몰 (선택)" className="rounded-lg border border-line px-3 py-2 text-[14px]" />
            <input value={create.product_url} onChange={(e) => setCreate({ ...create, product_url: e.target.value })} placeholder="따라사기 링크 (선택)" className="rounded-lg border border-line px-3 py-2 text-[14px]" />
          </div>
          <textarea value={create.caption} onChange={(e) => setCreate({ ...create, caption: e.target.value })} placeholder="캡션" className="mt-2 w-full rounded-lg border border-line px-3 py-2 text-[14px]" rows={2} />
          <button onClick={createLook} disabled={busy} className="btn mt-2">추가</button>
        </div>
      ) : null}

      <p className="mt-4 text-[13px] text-sub">
        {q ? `${filtered.length} / ${rows.length}개` : `${rows.length}개`}
      </p>

      {/* 그리드(페이지 폭 최대 활용) */}
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filtered.map((r) => (
          <div key={r.id} className="overflow-hidden rounded-[14px] border border-line bg-white">
            <div className="relative aspect-[3/4] w-full bg-line">
              {r.media_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={r.media_url} alt="" className="h-full w-full object-cover" />
              ) : null}
            </div>
            <div className="p-2.5">
              {editingId === r.id ? (
                <div className="space-y-1.5">
                  <input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} placeholder="제목" className="w-full rounded-md border border-line px-2 py-1.5 text-[13px]" />
                  <textarea value={draft.caption} onChange={(e) => setDraft({ ...draft, caption: e.target.value })} placeholder="캡션" rows={2} className="w-full rounded-md border border-line px-2 py-1.5 text-[13px]" />
                  <div className="flex gap-2">
                    <button onClick={() => saveEdit(r.id)} disabled={busy} className="rounded-md bg-brand px-3 py-1 text-[12px] font-semibold text-white">저장</button>
                    <button onClick={() => setEditingId(null)} className="text-[12px] text-sub underline">취소</button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="truncate text-[13px] font-semibold text-navy">{r.title || "(제목 없음)"}</p>
                  <p className="mt-0.5 line-clamp-2 text-[11px] text-sub">{r.caption || ""}</p>
                  <div className="mt-2 flex gap-3">
                    <button
                      onClick={() => {
                        setEditingId(r.id);
                        setDraft({ title: r.title ?? "", caption: r.caption ?? "" });
                      }}
                      className="text-[12px] font-semibold text-brand"
                    >
                      수정
                    </button>
                    <button onClick={() => del(r.id)} className="text-[12px] font-semibold text-red-500">삭제</button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </Shell>
  );
}

function Shell({ children }: { children: ReactNode }) {
  return (
    <section className="pt-10 pb-24">
      <div className="mx-auto w-[92%] max-w-[1400px]">{children}</div>
    </section>
  );
}
