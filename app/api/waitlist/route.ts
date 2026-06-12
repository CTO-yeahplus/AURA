import { NextResponse } from "next/server";
import { Resend } from "resend";

// 대기자 신청 수신 — Resend로 contact@yeahplus.co.kr에 알림 발송.
// 발신: AURA <hello@auraootd.com> (Resend에서 auraootd.com 도메인 인증됨).
// 시크릿: RESEND_API_KEY (앱 미포함 — Vercel 환경변수). 키 미설정 시 503으로 안전 처리.
export const runtime = "nodejs";

const TO = "contact@yeahplus.co.kr";
const FROM = "AURA <hello@auraootd.com>";

function isEmail(v: unknown): v is string {
  return typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

export async function POST(req: Request) {
  let body: { email?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "bad_json" }, { status: 400 });
  }
  const email = String(body.email ?? "").trim();
  if (!isEmail(email)) {
    return NextResponse.json({ ok: false, reason: "invalid_email" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // 키 미설정(로컬/미배포) — 폼은 성공처럼 보이되 서버는 미발송을 알린다.
    return NextResponse.json({ ok: false, reason: "not_configured" }, { status: 503 });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM,
      to: [TO],
      replyTo: email,
      subject: `[AURA] 새 대기자 신청: ${email}`,
      text: `AURA 출시 대기자 신청이 접수됐어요.\n\n이메일: ${email}\n시각: ${new Date().toISOString()}`,
    });
    if (error) {
      return NextResponse.json({ ok: false, reason: "send_failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, reason: "send_failed" }, { status: 502 });
  }
}
