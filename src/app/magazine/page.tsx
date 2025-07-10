// app/magazine/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "매거진",
  description: "최신 투자 정보 매거진",
};

export default function MagazinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-700">
        매거진 페이지 - 개발 진행 중입니다.
      </h1>
    </div>
  );
}
