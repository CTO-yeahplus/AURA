// AURA 랜딩 — LinkPrice 딥링크 래퍼(웹 수익화). 앱(src/features/shop/linkpriceWrap.ts)과 동형 규약.
//
// 커버 머천트(도메인) 아웃링크를 click.linkprice.com 딥링크로 감싸 AURA 매체 계정(AID)으로 커미션 귀속.
// 매체ID는 publishable(모든 아웃링크에 노출) — env(NEXT_PUBLIC_LINKPRICE_AID) 우선, 없으면 상수 폴백.
// 미커버 도메인(쿠팡·올리브영 등)은 원본 그대로 반환(쿠팡은 별도 파트너스 링크 체계).

const LINKPRICE_AID = process.env.NEXT_PUBLIC_LINKPRICE_AID ?? "A100702899";
const CLICK_BASE = "https://click.linkprice.com/click.php";

// 출처: docs/Linkprice_DetailMerchantList_20260622 승인 머천트 76(2026-06-22). 앱 맵과 1:1.
const MERCHANT_BY_HOST: Readonly<Record<string, string>> = {
  "60saju.com": "60saju",
  "agoda.com": "agoda",
  "airalo.com": "airalo",
  "allcredit.co.kr": "allcredit",
  "antonioli.eu": "antonioli",
  "appstory.co.kr": "cappstory",
  "arket.com": "arket",
  "ashford.com": "ashford1",
  "auction.co.kr": "auction",
  "babybjorn.kr": "babybjorn",
  "barobill.co.kr": "barobill",
  "benettonmall.com": "benetton1",
  "boribori.co.kr": "boribori",
  "charleskeith.com": "charlesnk",
  "cjthemarket.com": "cjbrand",
  "clubclio.co.kr": "clubclio",
  "credit.co.kr": "mycredit1",
  "e-himart.co.kr": "himart",
  "emart.ssg.com": "emart",
  "expressvpn.com": "exvpn",
  "eyoumall.co.kr": "eyoumall",
  "fanatical.com": "fanatical",
  "farfetch.com": "farfetch",
  "finishline.com": "finishline",
  "gmarket.co.kr": "gmarket",
  "gocity.com": "gocity",
  "gongyoungshop.kr": "gongyoung",
  "hbx.com": "hbx",
  "hfashionmall.com": "hfashion",
  "hmall.com": "hmall",
  "hotelscombined.co.kr": "hcombine2",
  "iherb.com": "iherb",
  "jejupass.com": "jejupass",
  "jestina.co.kr": "jestina",
  "joseph-fashion.com": "joseph",
  "kkday.com": "kkday",
  "klook.com": "klook",
  "kyobobook.co.kr": "kbbook",
  "lenovo.com": "lenovo",
  "lensbank.com": "lensbank",
  "lotteimall.com": "woori",
  "lotteon.com": "lotteon",
  "marshallheadphones.com": "marshall",
  "misope.co.kr": "misope",
  "modaoperandi.com": "operandi",
  "momq.co.kr": "momq",
  "mootoon.co.kr": "mootoon",
  "myrealtrip.com": "myrealtrip",
  "nordvpn.com": "nordvpn2",
  "nsmall.com": "nsseshop",
  "posty.kr": "posty",
  "pulmuone.co.kr": "pulmuone",
  "qtoon.co.kr": "qtoon",
  "raileurope.co.kr": "re4akor",
  "refurlab.com": "refurlab",
  "rentalcars.com": "rentalcars",
  "shein.com": "shein",
  "signgate.com": "signgate",
  "snaps.com": "snaps",
  "soomgo.com": "soomgo",
  "stockx.com": "stockx",
  "stories.com": "stories",
  "surfshark.com": "surfshark",
  "theoutnet.com": "outnet",
  "thirtymall.com": "thirtymall",
  "travel.rakuten.com": "rakutentr",
  "tstation.com": "tstation",
  "ttang.com": "072com",
  "udemy.com": "udemy",
  "usimsa.com": "usimsa",
  "wconcept.co.kr": "wconcept",
  "wellife.co.kr": "dswellife",
  "woot.com": "woot",
  "yanolja.com": "yanolja",
  "yes24.com": "yes24",
  "ypbooks.co.kr": "ypbooks",
};

function normalizeHost(h: string): string {
  const host = h.toLowerCase();
  return host.startsWith("www.") ? host.slice(4) : host;
}

/** 호스트 → 머천트 코드(등록 도메인 단위 매칭). 미상은 null. */
export function linkpriceMerchantForHost(host: string | null | undefined): string | null {
  if (typeof host !== "string" || !host) return null;
  const h = normalizeHost(host);
  for (const dom of Object.keys(MERCHANT_BY_HOST)) {
    if (h === dom || h.endsWith("." + dom)) return MERCHANT_BY_HOST[dom];
  }
  return null;
}

/**
 * 목적지 URL → LinkPrice 딥링크(커버 머천트면). 미커버/손상은 **원본 URL 그대로** 반환(아웃링크 보존).
 */
export function wrapLinkPrice(targetUrl: string): string {
  if (typeof targetUrl !== "string" || !/^https?:\/\//i.test(targetUrl)) return targetUrl;
  let host: string;
  try {
    host = new URL(targetUrl).hostname;
  } catch {
    return targetUrl;
  }
  const merchant = linkpriceMerchantForHost(host);
  if (!merchant) return targetUrl;
  const qs =
    `m=${encodeURIComponent(merchant)}` +
    `&a=${encodeURIComponent(LINKPRICE_AID)}` +
    `&l=9999&l_cd1=3&l_cd2=0` +
    `&tu=${encodeURIComponent(targetUrl)}`;
  return `${CLICK_BASE}?${qs}`;
}

/** 커버 머천트(LinkPrice 수익화)인지 — 배지/표시용. */
export function isMonetized(targetUrl: string): boolean {
  try {
    return linkpriceMerchantForHost(new URL(targetUrl).hostname) !== null;
  } catch {
    return false;
  }
}
