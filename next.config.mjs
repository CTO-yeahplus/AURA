/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /**
   * 앱 공유 링크 착지(2026-10 버그 수정).
   * 앱이 공유하는 링크는 https://auraootd.com/{l,c,u,t,s}/... 형식이다(aura-app/src/features/share/shareHost.ts).
   * 과거엔 타사 도메인(aura.app)으로 나가 링크가 전부 끊겨 있었다. 여기서 실제 페이지로 보낸다.
   *   /l/:id         → /ootd/:id   (룩 상세)
   *   /c /u /t /s    → /ootd       (전용 페이지가 생기기 전까지 OOTD 피드)
   * 쿼리스트링(?ref= 초대자, utm_*)은 Next.js 리다이렉트가 그대로 전달한다.
   * permanent:false(307) — 전용 페이지를 만들면 바로 교체할 수 있게 캐시 고정을 피한다.
   */
  async redirects() {
    return [
      { source: '/l/:id', destination: '/ootd/:id', permanent: false },
      { source: '/c/:path*', destination: '/ootd', permanent: false },
      { source: '/u/:path*', destination: '/ootd', permanent: false },
      { source: '/t/:path*', destination: '/ootd', permanent: false },
      { source: '/s', destination: '/ootd', permanent: false },
    ];
  },
};
export default nextConfig;
