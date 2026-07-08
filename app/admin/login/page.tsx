"use client";
import { useState } from "react";
import { sb, ADMIN_EMAIL } from "@/lib/supabaseBrowser";

// 관리자 로그인 — 이메일 OTP(6자리 코드). 기존 사용자만(shouldCreateUser:false). 세션은 브라우저에 저장.
export default function AdminLogin() {
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [token, setToken] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  async function sendCode() {
    if (!sb) return setMsg("환경변수(Supabase)가 설정되지 않았습니다.");
    setBusy(true);
    setMsg("");
    const { error } = await sb.auth.signInWithOtp({
      email: email.trim(),
      options: { shouldCreateUser: false },
    });
    setBusy(false);
    if (error) return setMsg(`코드 전송 실패: ${error.message}`);
    setSent(true);
    setMsg("이메일로 보낸 6자리 코드를 입력하세요.");
  }

  async function verify() {
    if (!sb) return;
    setBusy(true);
    setMsg("");
    const { error } = await sb.auth.verifyOtp({
      email: email.trim(),
      token: token.trim(),
      type: "email",
    });
    setBusy(false);
    if (error) return setMsg(`인증 실패: ${error.message}`);
    window.location.href = "/admin";
  }

  return (
    <section className="pt-16 pb-24">
      <div className="wrap max-w-md">
        <h1 className="font-serif text-[28px] font-bold text-navy">관리자 로그인</h1>
        <p className="mt-2 text-[14px] text-sub">이메일로 받은 6자리 코드로 로그인합니다.</p>

        <div className="mt-6 space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@auraootd.com"
            disabled={sent}
            className="w-full rounded-lg border border-line px-4 py-3 text-[15px] outline-none focus:border-brand"
          />
          {!sent ? (
            <button onClick={sendCode} disabled={busy} className="btn w-full justify-center">
              {busy ? "전송 중…" : "코드 받기"}
            </button>
          ) : (
            <>
              <input
                inputMode="numeric"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="6자리 코드"
                className="w-full rounded-lg border border-line px-4 py-3 text-[15px] tracking-[0.3em] outline-none focus:border-brand"
              />
              <button onClick={verify} disabled={busy} className="btn w-full justify-center">
                {busy ? "확인 중…" : "로그인"}
              </button>
              <button
                onClick={() => {
                  setSent(false);
                  setToken("");
                }}
                className="w-full text-[13px] text-sub underline"
              >
                이메일 다시 입력
              </button>
            </>
          )}
          {msg ? <p className="text-[13px] text-sub">{msg}</p> : null}
        </div>
      </div>
    </section>
  );
}
