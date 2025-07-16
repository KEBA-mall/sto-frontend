// app/auth/register/page.tsx
"use client"; // 클라이언트 컴포넌트로 지정

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext"; // useAuth 훅 임포트 경로 수정

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// SMS 인증번호 발송

// 회원가입 단계 타입
type RegisterStep = "phone" | "verification" | "password";

// 모달 컴포넌트
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  confirmText?: string;
  onConfirm?: () => void;
  type?: "success" | "error" | "info";
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  confirmText = "확인",
  onConfirm,
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
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
          >
            취소
          </button>
          {onConfirm && (
            <button
              onClick={onConfirm}
              className={`flex-1 ${bgColor} text-white px-4 py-2 rounded-md hover:opacity-90 transition-colors`}
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// 회원가입 페이지 컴포넌트
export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth(); // AuthContext에서 login 함수를 가져옴

  const [step, setStep] = useState<RegisterStep>("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: "success" | "error" | "info";
    onConfirm?: () => void;
  }>({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
  });

  // SMS 인증번호 발송 (실제로는 SMS API 연동)
  const sendVerificationCode = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      setModal({
        isOpen: true,
        title: "입력 오류",
        message: "올바른 핸도픈 번호를 입력해주세요.",
        type: "error",
      });
      return;
    }

    setIsLoading(true);

    // 실제 SMS 발송 로직 (지금은 시뮬레이션)
    setTimeout(() => {
      setIsLoading(false);
      setStep("verification");
      setModal({
        isOpen: true,
        title: "인증번호 발송",
        message: `${phoneNumber}로 인증번호를 발송했습니다.`,
        type: "success",
      });
    }, 1000);
  };

  // 인증번호 확인
  const verifyCode = () => {
    if (verificationCode !== "123456") {
      //실제로는 서버에서 검증
      setModal({
        isOpen: true,
        title: "인증 실패",
        message: "인증번호가 올바르지 않습니다.",
        type: "error",
      });
      return;
    }
    setStep("password");
  };

  // 회원가입 완료
  const completeRegistration = async () => {
    if (password.length !== 6) {
      setModal({
        isOpen: true,
        title: "비밀번호 오류",
        message: "비밀번호는 6자리로 입력해주세요.",
        type: "error",
      });
      return;
    }

    if (password !== confirmPassword) {
      setModal({
        isOpen: true,
        title: "비밀번호 불일치",
        message: "비밀번호가 일치하지 않습니다.",
        type: "error",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Firebase Auth로 계정 생성 (이메일 대신 폰번호@farmtoken.com 사용)
      const email = `${phoneNumber}@farmtoken.com`;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Firestore에 사용자 정보 저장
      await setDoc(doc(db, "users", userCredential.user.uid), {
        phoneNumber,
        createdAt: new Date().toISOString(),
        userType: "customer",
        kycStatus: "pending",
      });

      setModal({
        isOpen: true,
        title: "회원가입 완료",
        message: "회원가입이 완료되었습니다!",
        type: "success",
        onConfirm: () => {
          login(); // AuthContext의 로그인 상태 변경
          router.push("/");
        },
      });
    } catch (error: any) {
      setModal({
        isOpen: true,
        title: "회원가입 실패",
        message: error.message || "회원가입 중 오류가 발생했습니다.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        {/* 단계 표시 */}
        <div className="flex justify-between mb-6">
          {["phone", "verification", "password"].map((s, index) => (
            <div
              key={s}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step === s
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 text-gray-500"
              }`}
            >
              {index + 1}
            </div>
          ))}
        </div>

        {/* 핸드폰 번호 입력 */}
        {step === "phone" && (
          <div className="text-center">
            <h1 className="text-xl font-bold text-gray-800 mb-6">
              핸드폰 번호를 입력해주세요
            </h1>
            <div className="mb-6">
              <input
                type="tel"
                placeholder="010-1234-5678"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={formatPhoneNumber(phoneNumber)}
                onChange={handlePhoneChange}
                maxLength={13}
              />
            </div>
            <button
              onClick={sendVerificationCode}
              disabled={isLoading || phoneNumber.length < 10}
              className="w-full bg-green-500 text-white py-3 rounded-md font-semibold hover:bg-green-600 disabled:bg-gray-400 transition-colors duration-200"
            >
              {isLoading ? "발송 중..." : "인증번호 받기"}
            </button>
          </div>
        )}

        {/* 인증번호 입력 */}
        {step === "verification" && (
          <div className="text-center">
            <h1 className="text-xl font-bold text-gray-800 mb-2">
              인증번호를 입력해주세요
            </h1>
            <p className="text-gray-600 mb-6 text-sm">
              {formatPhoneNumber(phoneNumber)}로 발송된 6자리 번호
            </p>
            <div className="mb-6">
              <input
                type="text"
                placeholder="123456"
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-center text-2xl tracking-wider focus:outline-none focus:ring-2 focus:ring-green-500"
                value={verificationCode}
                onChange={(e) =>
                  setVerificationCode(
                    e.target.value.replace(/\D/g, "").slice(0, 6)
                  )
                }
                maxLength={6}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setStep("phone")}
                className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-md font-semibold hover:bg-gray-400 transition-colors duration-200"
              >
                이전
              </button>
              <button
                onClick={verifyCode}
                disabled={verificationCode.length !== 6}
                className="flex-1 bg-green-500 text-white py-3 rounded-md font-semibold hover:bg-green-600 disabled:bg-gray-400 transition-colors duration-200"
              >
                확인
              </button>
            </div>
          </div>
        )}

        {/* 비밀번호 설정 */}
        {step === "password" && (
          <div className="text-center">
            <h1 className="text-xl font-bold text-gray-800 mb-6">
              6자리 비밀번호를 설정해주세요
            </h1>
            <div className="mb-4">
              <input
                type="password"
                placeholder="6자리 숫자"
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-center text-2xl tracking-wider focus:outline-none focus:ring-2 focus:ring-green-500"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                maxLength={6}
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                placeholder="비밀번호 확인"
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-center text-2xl tracking-wider focus:outline-none focus:ring-2 focus:ring-green-500"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value.replace(/\D/g, "").slice(0, 6)
                  )
                }
                maxLength={6}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setStep("verification")}
                className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-md font-semibold hover:bg-gray-400 transition-colors duration-200"
              >
                이전
              </button>
              <button
                onClick={completeRegistration}
                disabled={
                  isLoading ||
                  password.length !== 6 ||
                  password !== confirmPassword
                }
                className="flex-1 bg-green-500 text-white py-3 rounded-md font-semibold hover:bg-green-600 disabled:bg-gray-400 transition-colors duration-200"
              >
                {isLoading ? "처리 중..." : "완료"}
              </button>
            </div>
          </div>
        )}
      </div>

      <Modal
        isOpen={modal.isOpen}
        onClose={() => setModal({ ...modal, isOpen: false })}
        title={modal.title}
        message={modal.message}
        type={modal.type}
        onConfirm={modal.onConfirm}
      />
    </div>
  );
}
