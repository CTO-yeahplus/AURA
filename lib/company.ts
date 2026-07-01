/**
 * lib/company — 사업자(법인) 정보 SSOT. 전자상거래법 표시사항 + PG/본인인증 심사용.
 * 사업자등록증과 정확히 일치해야 함(상호·대표자·번호). 변경 시 이 파일만 수정.
 */
export const COMPANY = {
  name: "주식회사 예아플러스",
  nameEn: "YEAHPLUS Inc.",
  ceo: "고재혁",
  bizNo: "283-88-02519", // 사업자등록번호
  mailOrderNo: "2022-경기파주-2995", // 통신판매업 신고번호
  address: "경기도 파주시 교하로159번길 33, 3층 304호 에이318(목동동, 목동프라자)",
  email: "contact@yeahplus.co.kr",
  domain: "auraootd.com",
};

/** 전자상거래법 표시용 한 줄 요약(푸터). */
export function companyInfoLine(): string {
  return `${COMPANY.name} · 대표 ${COMPANY.ceo} · 사업자등록번호 ${COMPANY.bizNo} · 통신판매업신고 ${COMPANY.mailOrderNo}`;
}
