// app/auth/login/page.tsx (FastAPI 연동 버전)
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";
import { authAPI } from "@/lib/api";
import Link from "next/link";

// 모달 컴포넌트
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: "success" | "error" | "info";
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  type = "info",
}) => {
  if (!isOpen) return null;

  const bgColor = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  }[type];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <button
          onClick={onClose}
          className={`w-full ${bgColor} text-white px-4 py-2 rounded-md hover:opacity-90 transition-colors`}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: "success" | "error" | "info";
  }>({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
  });

  // 핸드폰 번호 포맷팅
  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/[^\d]/g, "");
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7)
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(
      7,
      11
    )}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted.replace(/-/g, ""));
  };

  // 로그인 처리
  const handleLogin = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      setModal({
        isOpen: true,
        title: "입력 오류",
        message: "올바른 핸드폰 번호를 입력해주세요.",
        type: "error",
      });
      return;
    }

    if (!password || password.length !== 6) {
      setModal({
        isOpen: true,
        title: "입력 오류",
        message: "6자리 비밀번호를 입력해주세요.",
        type: "error",
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await authAPI.login(phoneNumber, password);

      // AuthContext를 통해 로그인 상태 설정
      login(result.access_token, result.user);

      // 메인 페이지로 리다이렉트
      router.push("/");
    } catch (error: any) {
      setModal({
        isOpen: true,
        title: "로그인 실패",
        message:
          error.message || "핸드폰 번호 또는 비밀번호가 올바르지 않습니다.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        {/* 로고 또는 제목 */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Faank</h1>
          <p className="text-gray-600">농축수산물 투자 플랫폼</p>
        </div>

        {/* 로그인 폼 */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              핸드폰 번호
            </label>
            <input
              type="tel"
              placeholder="010-1234-5678"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={formatPhoneNumber(phoneNumber)}
              onChange={handlePhoneChange}
              onKeyPress={handleKeyPress}
              maxLength={13}
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              비밀번호 (6자리)
            </label>
            <input
              type="password"
              placeholder="••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-center text-2xl tracking-wider focus:outline-none focus:ring-2 focus:ring-green-500"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              onKeyPress={handleKeyPress}
              maxLength={6}
              disabled={isLoading}
            />
          </div>
        </div>

        {/* 로그인 버튼 */}
        <button
          onClick={handleLogin}
          disabled={
            isLoading || phoneNumber.length < 10 || password.length !== 6
          }
          className="w-full mt-6 bg-green-500 text-white py-3 rounded-md font-semibold hover:bg-green-600 disabled:bg-gray-400 transition-colors duration-200"
        >
          {isLoading ? "로그인 중..." : "로그인"}
        </button>

        {/* 회원가입 링크 */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            계정이 없으신가요?{" "}
            <Link
              href="/auth/register"
              className="text-green-500 hover:text-green-600 font-medium"
            >
              회원가입
            </Link>
          </p>
        </div>

        {/* 비밀번호 찾기 (향후 구현) */}
        <div className="text-center mt-4">
          <button
            className="text-sm text-gray-500 hover:text-gray-700"
            onClick={() =>
              setModal({
                isOpen: true,
                title: "서비스 준비 중",
                message: "비밀번호 찾기 기능은 준비 중입니다.",
                type: "info",
              })
            }
          >
            비밀번호를 잊으셨나요?
          </button>
        </div>

        {/* API 연결 상태 표시 (개발용) */}
        <div className="text-center mt-4">
          <button
            onClick={async () => {
              try {
                await authAPI.test();
                setModal({
                  isOpen: true,
                  title: "연결 성공",
                  message: "서버와 정상적으로 연결되었습니다.",
                  type: "success",
                });
              } catch (error) {
                setModal({
                  isOpen: true,
                  title: "연결 실패",
                  message: "서버 연결에 실패했습니다.",
                  type: "error",
                });
              }
            }}
            className="text-xs text-gray-400 hover:text-gray-600"
          >
            서버 연결 테스트
          </button>
        </div>
      </div>

      <Modal
        isOpen={modal.isOpen}
        onClose={() => setModal({ ...modal, isOpen: false })}
        title={modal.title}
        message={modal.message}
        type={modal.type}
      />
    </div>
  );
}
