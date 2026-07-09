"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { sb } from "@/lib/supabaseBrowser";
import { LIVE_CARD_SELECT, mapCardRow, type LiveCardRow } from "@/lib/liveLooks";
import { homeLooks, type Look } from "@/lib/looks";
import { LiveLookGrid } from "./LiveLookCard";

const PAGE = 30;

// 홈피드 전체 룩(무한 로드) + 실시간 검색. 브라우저 anon 클라이언트로 페이지네이션.
// 검색은 로드된 룩을 클라이언트에서 즉시 필터(해시태그·키워드·브랜드). 검색 중이면 나머지 페이지를 자동 로드해
// 전체 카탈로그를 대상으로 검색되게 한다. env 미설정이면 정적 폴백.
export function OotdFeed() {
  const [looks, setLooks] = useState<Look[]>([]);
  const [page, setPage] = useState(0);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [query, setQuery] = useState("");

  const load = useCallback(async (p: number) => {
    if (!sb) {
      setReady(true);
      return;
    }
    setLoading(true);
    const { data } = await sb
      .from("looks")
      .select(LIVE_CARD_SELECT)
      .order("created_at", { ascending: false })
      .range(p * PAGE, p * PAGE + PAGE - 1);
    const rows = ((data as unknown as LiveCardRow[]) ?? []).filter(
      (r) => typeof r.media_url === "string" && r.media_url.length > 0
    );
    const mapped = rows.map(mapCardRow);
    setLooks((prev) => {
      const seen = new Set(prev.map((x) => x.id));
      return [...prev, ...mapped.filter((m) => !seen.has(m.id))];
    });
    if (mapped.length < PAGE) setDone(true);
    setLoading(false);
    setReady(true);
  }, []);

  useEffect(() => {
    load(0);
  }, [load]);

  // 검색어 토큰(해시태그 '#' 제거, 공백 분리). 모든 토큰이 포함된 룩만 매칭.
  const tokens = useMemo(
    () =>
      query
        .replace(/#/g, " ")
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean),
    [query]
  );

  // 검색 중이면 남은 페이지를 자동 로드해 전체를 대상으로 검색되게 한다.
  useEffect(() => {
    if (tokens.length > 0 && sb && !done && !loading) {
      const np = page + 1;
      setPage(np);
      load(np);
    }
  }, [tokens.length, done, loading, page, load]);

  // env 미설정(sb=null)으로 0건이면 정적 큐레이션으로 폴백해 빈 화면 방지.
  const base = looks.length > 0 ? looks : ready && !sb ? homeLooks : looks;
  const view = useMemo(
    () =>
      tokens.length === 0
        ? base
        : base.filter((l) => l.keywords && tokens.every((t) => l.keywords!.includes(t))),
    [base, tokens]
  );

  return (
    <>
      <div className="mb-7">
        <div className="relative max-w-md">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="해시태그·키워드로 검색 (예: y2k, 미니멀, 원피스)"
            aria-label="룩 검색"
            className="w-full rounded-full border border-line bg-white px-5 py-3 text-[15px] text-ink outline-none transition focus:border-brand-dark"
          />
        </div>
        {tokens.length > 0 ? (
          <p className="mt-2 text-[13px] text-sub">
            {loading ? "검색 중…" : `‘${query.trim()}’ 검색 결과 ${view.length}개`}
          </p>
        ) : null}
      </div>

      <LiveLookGrid looks={view} />

      {ready && view.length === 0 && sb ? (
        <p className="mt-6 text-center text-[14px] text-sub">
          {tokens.length > 0 ? "검색 결과가 없어요. 다른 키워드로 찾아보세요." : "아직 표시할 룩이 없어요."}
        </p>
      ) : null}

      {/* 검색 중엔 자동 로드하므로 '더 보기'는 검색어가 없을 때만 노출. */}
      {!done && sb && tokens.length === 0 ? (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => {
              const np = page + 1;
              setPage(np);
              load(np);
            }}
            disabled={loading}
            className="btn"
          >
            {loading ? "불러오는 중…" : "더 보기"}
          </button>
        </div>
      ) : null}
    </>
  );
}
