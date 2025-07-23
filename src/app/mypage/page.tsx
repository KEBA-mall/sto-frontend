// app/mypage/page.tsx
"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MyPage() {
  const { isLoggedIn, user, logout } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 로그인하지 않은 사용자는 로그인 페이지로 리다이렉트
    if (!isLoggedIn) {
      router.push("/auth/login");
      return;
    }
    setIsLoading(false);
  }, [isLoggedIn, router]);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  // 로딩 중이거나 사용자 정보가 없으면 로딩 표시
  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  // KYC 상태 한글 변환
  const getKycStatusText = (status: string) => {
    switch (status) {
      case "verified":
        return "인증 완료";
      case "pending":
        return "인증 대기";
      case "rejected":
        return "인증 실패";
      default:
        return "알 수 없음";
    }
  };

  // 사용자 타입 한글 변환
  const getUserTypeText = (type: string) => {
    switch (type) {
      case "customer":
        return "일반 회원";
      case "admin":
        return "관리자";
      case "seller":
        return "판매자";
      default:
        return "알 수 없음";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* 헤더 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">마이페이지</h1>
              <p className="text-gray-600 mt-1">
                회원 정보 및 설정을 관리합니다
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
            >
              로그아웃
            </button>
          </div>
        </div>

        {/* 사용자 정보 카드 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            회원 정보
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 기본 정보 */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  사용자명
                </label>
                <p className="text-lg text-gray-800 font-semibold">
                  {user.user_name}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  핸드폰 번호
                </label>
                <p className="text-lg text-gray-800">
                  {user.phone_number.replace(
                    /(\d{3})(\d{4})(\d{4})/,
                    "$1-$2-$3"
                  )}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  회원 유형
                </label>
                <p className="text-lg text-gray-800">
                  {getUserTypeText(user.user_type)}
                </p>
              </div>
            </div>

            {/* 상태 정보 */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  KYC 인증 상태
                </label>
                <span
                  className={`inline-flex px-3 py-1 rounded-full text-sm font-medium`}
                >
                  {getKycStatusText(user.kyc_status)}
                </span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  계정 상태
                </label>
                <span
                  className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                    user.is_active
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {user.is_active ? "활성" : "비활성"}
                </span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  가입일
                </label>
                <p className="text-lg text-gray-800">
                  {new Date(user.created_at).toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 기능 메뉴 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 투자 내역 */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  투자 내역
                </h3>
                <p className="text-gray-600 text-sm">
                  나의 투자 현황을 확인하세요
                </p>
              </div>
            </div>
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-md transition-colors duration-200">
              준비 중
            </button>
          </div>

          {/* 보유 자산 */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  보유 자산
                </h3>
                <p className="text-gray-600 text-sm">
                  STO 토큰 및 자산을 관리하세요
                </p>
              </div>
            </div>
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-md transition-colors duration-200">
              준비 중
            </button>
          </div>

          {/* 설정 */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  계정 설정
                </h3>
                <p className="text-gray-600 text-sm">
                  비밀번호 변경 및 기타 설정
                </p>
              </div>
            </div>
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-md transition-colors duration-200">
              준비 중
            </button>
          </div>
        </div>

        {/* 디버깅 정보 (개발 중에만 표시) */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-3">
            개발자 정보 (개발 중)
          </h3>
          <details className="text-sm">
            <summary className="cursor-pointer text-yellow-700 font-medium mb-2">
              사용자 정보 JSON 보기
            </summary>
            <pre className="bg-yellow-100 p-3 rounded text-xs overflow-auto">
              {JSON.stringify(user, null, 2)}
            </pre>
          </details>
        </div>
      </div>
    </div>
  );
}
