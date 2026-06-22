import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#8B5CF6", dark: "#6D28D9", soft: "#F1ECFB" },
        accent: "#EC4899",
        point: { DEFAULT: "#EF4444", soft: "#FEE2E2" }, // 포인트 레드 — 세일·핫·긴급 강조
        ink: "#241F2E",
        navy: "#2E2640",
        sub: "#6E6878",
        hint: "#A8A2B0",
        line: "#E7E1D6",
        cream: { DEFAULT: "#FAF7F1", muted: "#F1ECE3" },
      },
      fontFamily: {
        serif: ['"Playfair Display"', "Georgia", "serif"],
        sans: ['"Pretendard"', '"Noto Sans KR"', "-apple-system", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px rgba(46, 38, 64, 0.08)",
        lift: "0 20px 50px rgba(46, 38, 64, 0.14)",
      },
      borderRadius: { xl2: "20px" },
      keyframes: {
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: { floaty: "floaty 6s ease-in-out infinite" },
    },
  },
  plugins: [],
};
export default config;
