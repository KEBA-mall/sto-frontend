// src/app/(main)/page.tsx

import Link from "next/link";
import Image from "next/image"; // Image 컴포넌트가 임포트되어 있는지 확인
import type { Metadata } from "next"; // Metadata 타입 import

export const metadata: Metadata = {
  title: "메인 페이지",
  description: "홈페이지",
};

export default function HomePage() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 p-8 flex flex-col lg:flex-row items-stretch gap-8 border-4 border-sky-500">
        {/* 왼쪽 섹션: 홍보 영상 + 이벤트 안내 (2/3 너비) */}
        <div className="flex flex-col w-full lg:w-2/3 gap-8">
          {/* 홍보 영상 섹션 */}
          {/* h-full을 주어 부모 flex-col의 남은 공간을 채우도록 함 (이벤트 안내가 고정 높이라서) */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center flex-grow border-4 border-yellow-500">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">홍보영상</h2>
            <div className="flex space-x-4">
              {/* 실제 영상 플레이어 또는 썸네일/버튼 영역 */}
              <div className="w-24 h-10 bg-gray-200 rounded"></div>
              <div className="w-24 h-10 bg-gray-200 rounded"></div>
            </div>
          </div>

          {/* 이벤트 안내 섹션 */}
          {/* 고정 높이 유지 */}
          <div className="bg-lime-green rounded-lg shadow-md p-4 flex items-center justify-between h-24 flex-shrink-0 border-4 border-indigo-500">
            <button className="text-white text-3xl font-bold p-2 rounded-full hover:bg-opacity-80 transition-colors duration-200">
              &lt;
            </button>
            <h2 className="text-3xl font-bold text-black">이벤트 안내</h2>
            <button className="text-white text-3xl font-bold p-2 rounded-full hover:bg-opacity-80 transition-colors duration-200">
              &gt;
            </button>
          </div>
        </div>

        {/* 오른쪽 섹션: 투자자 수/누적 투자금 (1/3 너비) */}
        {/* Image 컴포넌트를 배경처럼 사용 */}
        <div className="relative w-full lg:w-1/3 bg-light-lime-green rounded-lg shadow-md p-6 flex flex-col items-center justify-between overflow-hidden border-4 border-black-500">
          {/* chart.png를 배경처럼 사용하는 Image 컴포넌트 */}
          <Image
            src="/chart.png"
            alt="Investment Chart"
            layout="fill" // 부모 요소를 채우도록 설정
            objectFit="cover" // 이미지가 부모를 커버하도록 설정
            quality={100} // 이미지 품질 (0-100)
            className="absolute z-0 opacity-70 rounded-lg" // z-index로 뒤로 보내고 투명도 조절
          />
        </div>
      </div>
      <div className="min-h-screen bg-gray-100 p-8 flex flex-col lg:flex-row items-stretch gap-8">
        컨테이너 하나 더 추가할 수 있나
      </div>
    </>
  );
}
