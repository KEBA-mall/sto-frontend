// app/auth/login/page.tsx
"use client"; // 클라이언트 컴포넌트로 지정

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext"; // useAuth 훅 임포트 경로 수정

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth(); // AuthContext에서 login 함수를 가져옴

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLoginAttempt = () => {
    // 실제로는 여기서 사용자 인증 로직이 들어갑니다.
    // 여기서는 성공했다고 가정하고 모달을 띄웁니다.
    setIsModalOpen(true);
  };

  const handleModalConfirm = () => {
    setIsModalOpen(false); // 모달 닫기
    login(); // 로그인 상태로 변경
    router.push("/"); // 메인 페이지로 이동
  };

  // 모달 컴포넌트 (register/page.tsx에서 가져와서 재사용)
  interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message: string;
    confirmText: string;
  }

  const ServiceNotReadyModal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    message,
    confirmText,
  }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full text-center">
          <p className="text-lg font-semibold mb-6">{message}</p>
          <button
            onClick={onConfirm}
            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors duration-200"
          >
            {confirmText}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md text-center">
        <h1 className="text-xl font-bold text-gray-800 mb-6">
          핸드폰 번호를 입력해주세요
        </h1>
        <div className="mb-6">
          <input
            type="text"
            placeholder="-를 제외하고 입력해주세요."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <button
          onClick={handleLoginAttempt}
          className="w-full bg-gray-600 text-white py-3 rounded-md font-semibold hover:bg-gray-700 transition-colors duration-200"
        >
          다음
        </button>
      </div>
      <ServiceNotReadyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleModalConfirm}
        message="아직 서비스 연동이 되지 않았습니다. 아래의 버튼을 누르면 로그인 상태입니다."
        confirmText="메인페이지로 이동 및 로그인 완료"
      />
    </div>
  );
}
