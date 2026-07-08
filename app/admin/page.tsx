"use client";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { sb, ADMIN_EMAIL } from "@/lib/supabaseBrowser";

type Row = { id: string; title: string | null; caption: string | null; media_url: string | null };

// 관리자 룩 CRUD — cto 세션으로만. 쓰기는 RLS "owner write"(author_id=본인)로 제한 → 시드(cto 소유)만 편집 가능.
export default function AdminPage() {
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [uid, setUid] = useState<string | null>(null);
  const [rows, setRows] = useState<Row[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState({ title: "", caption: "" });
  const [create, setCreate] = useState({ title: "", caption: "", media_url: "" });
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async (authorId: string) => {
    if (!sb) return;
    const { data, error } = await sb
      .from("looks")
      .select("id, title, caption, media_url")
      .eq("author_id", authorId)
      .order("created_at", { ascending: false })
      .limit(300);
    if (error) setMsg(`불러오기 실패: ${error.message}`);
    setRows((data as Row[]) ?? []);
  }, []);

  useEffect(() => {
    if (!sb) {
      setReady(true);
      return;
    }
    sb.auth.getSession().then(({ data }) => {
      const user = data.session?.user;
      setEmail(user?.email ?? null);
      setUid(user?.id ?? null);
      if (user?.email === ADMIN_EMAIL && user.id) load(user.id).finally(() => setReady(true));
      else setReady(true);
    });
  }, [load]);

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
    const { error } = await sb.from("looks").insert({
      author_id: uid,
      type: "image",
      media_url: create.media_url.trim(),
      title: create.title.trim().slice(0, 60) || null,
      caption: create.caption.trim().slice(0, 500) || null,
    });
    setBusy(false);
    if (error) return setMsg(`생성 실패: ${error.message}`);
    setCreate({ title: "", caption: "", media_url: "" });
    if (uid) load(uid);
  }

  async function signOut() {
    await sb?.auth.signOut();
    window.location.href = "/admin/login";
  }

  if (!sb)
    return <Shell><p className="text-sub">Supabase 환경변수가 설정되지 않았습니다.</p></Shell>;
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
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-[28px] font-bold text-navy">룩 관리</h1>
        <button onClick={signOut} className="text-[14px] text-sub underline">로그아웃</button>
      </div>
      {msg ? <p className="mt-2 text-[13px] text-brand">{msg}</p> : null}

      {/* 생성 */}
      <div className="mt-6 rounded-[16px] border border-line bg-white p-5">
        <h2 className="font-serif text-[18px] font-bold text-navy">새 룩</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <input value={create.title} onChange={(e) => setCreate({ ...create, title: e.target.value })} placeholder="제목" className="rounded-lg border border-line px-3 py-2 text-[14px]" />
          <input value={create.media_url} onChange={(e) => setCreate({ ...create, media_url: e.target.value })} placeholder="이미지 URL (필수)" className="rounded-lg border border-line px-3 py-2 text-[14px]" />
        </div>
        <textarea value={create.caption} onChange={(e) => setCreate({ ...create, caption: e.target.value })} placeholder="캡션" className="mt-2 w-full rounded-lg border border-line px-3 py-2 text-[14px]" rows={2} />
        <button onClick={createLook} disabled={busy} className="btn mt-2">추가</button>
      </div>

      {/* 목록 */}
      <p className="mt-6 text-[13px] text-sub">{rows.length}개</p>
      <div className="mt-2 space-y-3">
        {rows.map((r) => (
          <div key={r.id} className="flex gap-3 rounded-[14px] border border-line bg-white p-3">
            {r.media_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={r.media_url} alt="" className="h-20 w-16 shrink-0 rounded-md object-cover" />
            ) : (
              <div className="h-20 w-16 shrink-0 rounded-md bg-line" />
            )}
            <div className="min-w-0 flex-1">
              {editingId === r.id ? (
                <div className="space-y-2">
                  <input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} placeholder="제목" className="w-full rounded-lg border border-line px-3 py-2 text-[14px]" />
                  <textarea value={draft.caption} onChange={(e) => setDraft({ ...draft, caption: e.target.value })} placeholder="캡션" rows={2} className="w-full rounded-lg border border-line px-3 py-2 text-[14px]" />
                  <div className="flex gap-2">
                    <button onClick={() => saveEdit(r.id)} disabled={busy} className="btn text-[13px]">저장</button>
                    <button onClick={() => setEditingId(null)} className="text-[13px] text-sub underline">취소</button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="truncate font-semibold text-navy">{r.title || "(제목 없음)"}</p>
                  <p className="mt-1 line-clamp-2 text-[13px] text-sub">{r.caption || ""}</p>
                  <div className="mt-2 flex gap-3">
                    <button
                      onClick={() => {
                        setEditingId(r.id);
                        setDraft({ title: r.title ?? "", caption: r.caption ?? "" });
                      }}
                      className="text-[13px] font-semibold text-brand"
                    >
                      수정
                    </button>
                    <button onClick={() => del(r.id)} className="text-[13px] font-semibold text-red-500">삭제</button>
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
    <section className="pt-12 pb-24">
      <div className="wrap max-w-2xl">{children}</div>
    </section>
  );
}
