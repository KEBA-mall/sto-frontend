// app/notice/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "공지사항",
  description: "공지사항 및 뉴스",
};

export default function NoticePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-700">
        공지사항 페이지 - 개발 진행 중입니다.
      </h1>
    </div>
  );
}
