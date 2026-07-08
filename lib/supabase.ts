// AURA 랜딩 — Supabase 읽기 클라이언트(서버). 공개 읽기(RLS using(true))인 looks/products만 조회.
// anon 키는 publishable(공개용). env 미설정이면 null → 호출부가 정적 폴백.
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabase = url && anon ? createClient(url, anon, { auth: { persistSession: false } }) : null;
