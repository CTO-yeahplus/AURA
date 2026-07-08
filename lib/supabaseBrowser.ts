"use client";
// AURA 랜딩 — 브라우저 Supabase 클라이언트(관리자 인증·CRUD 전용). anon 키 + 세션 유지(localStorage).
// service_role은 절대 사용하지 않는다. 쓰기 권한은 로그인 사용자 세션 + RLS("owner write")로만 제한된다.
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const sb: SupabaseClient | null = url && anon ? createClient(url, anon) : null;

/** 관리자 이메일(이 계정만 관리자 UI 노출). 실제 쓰기 보호는 RLS가 최종 강제. */
export const ADMIN_EMAIL = "cto@yeahplus.co.kr";
