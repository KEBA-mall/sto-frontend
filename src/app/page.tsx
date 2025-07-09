// src/app/(main)/page.tsx

"use client";

import Link from "next/link";
import Image from "next/image"; // Image 컴포넌트가 임포트되어 있는지 확인

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-theme(spacing.16))] w-screen overflow-hidden">
      <div className="flex flex-col md:flex-row flex-grow h-full bg-white">
        <div className="flex flex-col w-full md:w-7/10 h-full">
          <div className="flex-grow md:h-1/2 bg-gray-50 flex flex-col items-center justify-center p-4 md:p-6 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4 md:mb-8">
              AgriTrade: 농축수산물 디지털 거래소
            </h1>
            <p className="text-base md:text-xl text-gray-700 mb-8 md:mb-12">
              신선한 농축수산물을 지금 바로 만나보세요!
            </p>
            <div className="relative w-full max-w-xl md:max-w-2xl h-40 md:h-64 bg-gray-200 rounded-lg overflow-hidden">
              {/* 이 부분에 Image 컴포넌트를 다시 추가합니다. */}
              <Image
                src="/images/main-banner.jpg" // 이미지 경로를 다시 확인하세요.
                alt="AgriTrade Main Banner"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <p className="text-lg md:text-3xl font-bold p-2 md:p-4">
                  오늘의 특가 상품을 확인하세요!
                </p>
              </div>
            </div>
          </div>

          <div className="flex-grow md:h-1/2 bg-white flex flex-col items-center justify-center p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full max-w-sm md:max-w-4xl">
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-md flex flex-col justify-between h-full">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 md:mb-4">
                  다양한 상품
                </h2>
                <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4 flex-grow">
                  최고 품질의 농산물, 축산물, 수산물을 한 곳에서!
                </p>
                <Link
                  href="/products"
                  className="inline-block bg-green-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg hover:bg-green-700 transition duration-300 self-center text-sm md:text-base" /* 패딩, 폰트 크기 반응형 */
                >
                  상품 보러가기
                </Link>
              </div>
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-md flex flex-col justify-between h-full">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 md:mb-4">
                  판매자 등록
                </h2>
                <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4 flex-grow">
                  당신의 신선한 상품을 AgriTrade에서 판매해보세요!
                </p>
                <Link
                  href="/sell"
                  className="inline-block bg-blue-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg hover:bg-blue-700 transition duration-300 self-center text-sm md:text-base" /* 패딩, 폰트 크기 반응형 */
                >
                  판매자 등록하기
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full md:w-3/10 h-full">
          <div className="flex-grow md:h-1/4 bg-purple-100 flex flex-col items-center justify-center p-4">
            <p className="text-base md:text-lg text-gray-700 text-center mb-2">
              새로운 기능 소개 또는 이벤트 배너
            </p>
            <div className="mt-2 text-center">
              <Image
                src="/chart.png" // 이미지 경로를 다시 확인하세요.
                alt="투자 성장"
                width={100}
                height={100}
                objectFit="contain"
                className="md:w-[150px] md:h-[150px]"
              />
              <p className="text-xl md:text-2xl font-bold text-green-700 mt-2">
                투자 금액 *억
              </p>
            </div>
          </div>
          <div className="flex-grow md:h-3/4 bg-yellow-100 flex items-center justify-center p-4">
            <p className="text-base md:text-lg text-gray-700 text-center">
              인기 상품 슬라이드 또는 뉴스 피드
            </p>
          </div>
        </div>
      </div>

      <div className="w-full bg-gray-100 p-4 md:p-6 flex flex-col items-center overflow-y-auto">
        <div className="w-full max-w-xl md:max-w-7xl">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center">
            <span className="mr-2 text-blue-500">◆</span> 현재 투자 상품
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="relative w-full h-40 md:h-48 bg-gray-100 flex items-center justify-center">
                <Image
                  src="/cabbage.png" // 이미지 경로를 다시 확인하세요.
                  alt="배추밭 투자"
                  width={150}
                  height={150}
                  objectFit="contain"
                  className="md:w-[200px] md:h-[200px]"
                />
              </div>
              <div className="p-3 md:p-4">
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-1 md:mb-2">
                  배추밭 투자
                </h3>
                <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3">
                  신선한 배추 재배에 투자하고 수익을 얻으세요!
                </p>
                <div className="flex justify-between items-center text-xs md:text-sm text-gray-500 mb-1 md:mb-2">
                  <span>1C 금액</span>
                  <span className="font-bold text-gray-700">20,000원~</span>
                </div>
                <div className="flex justify-between items-center text-xs md:text-sm text-gray-500 mb-3 md:mb-4">
                  <span>마감 일자</span>
                  <span className="font-bold text-gray-700">2025.12.31</span>
                </div>
                <button className="w-full bg-green-600 text-white py-1 md:py-2 rounded-lg hover:bg-green-700 transition duration-300 text-sm md:text-base">
                  투자하기
                </button>
              </div>
            </div>
            {/* 추가 상품이 있다면 여기에 계속 추가 */}
          </div>
        </div>
      </div>
    </div>
  );
}
