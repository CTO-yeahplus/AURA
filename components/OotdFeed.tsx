"use client";
import { useCallback, useEffect, useState } from "react";
import { sb } from "@/lib/supabaseBrowser";
import { LIVE_CARD_SELECT, mapCardRow, type LiveCardRow } from "@/lib/liveLooks";
import { homeLooks, type Look } from "@/lib/looks";
import { LiveLookGrid } from "./LiveLookCard";

const PAGE = 30;

// 홈피드 전체 룩(무한 로드). 브라우저 anon 클라이언트로 페이지네이션. env 미설정이면 정적 폴백.
export function OotdFeed() {
  const [looks, setLooks] = useState<Look[]>([]);
  const [page, setPage] = useState(0);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

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

  // env 미설정(sb=null)으로 0건이면 정적 큐레이션으로 폴백해 빈 화면 방지.
  const view = looks.length > 0 ? looks : ready && !sb ? homeLooks : looks;

  return (
    <>
      <LiveLookGrid looks={view} />
      {ready && looks.length === 0 && sb ? (
        <p className="mt-6 text-center text-[14px] text-sub">아직 표시할 룩이 없어요.</p>
      ) : null}
      {!done && sb ? (
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
