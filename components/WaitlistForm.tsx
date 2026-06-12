"use client";
import { useState } from "react";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    try {
      // 자체 API 라우트(Resend)로 contact@yeahplus.co.kr에 알림 발송.
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {
      /* 네트워크 실패해도 UX는 완료 처리 — 중복 제출 방지 */
    }
    setDone(true);
  }

  if (done) {
    return (
      <p className="text-base font-semibold text-white">
        신청 완료! 출시 소식을 가장 먼저 보내드릴게요 ✨
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-wrap justify-center gap-2.5">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        className="min-w-[260px] rounded-full px-5 py-3 text-[15px] text-ink outline-none"
      />
      <button type="submit" className="btn">알림 신청</button>
    </form>
  );
}
