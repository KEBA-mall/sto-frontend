// app/investment/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "투자페이지",
  description: "투자 상품 목록 페이지",
};

export default function InvestmentPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-700">
        투자 페이지 - 개발 진행 중입니다.
      </h1>
    </div>
  );
}
