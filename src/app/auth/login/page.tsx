// app/login/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "로그인",
  description: "로그인 페이지",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-700">
        로그인 페이지 - 개발 진행 중입니다.
      </h1>
    </div>
  );
}
