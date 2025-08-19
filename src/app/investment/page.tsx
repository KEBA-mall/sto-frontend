// src/app/investment/page.tsx (DB 연동 버전)
"use client";

import React from "react";
import Link from "next/link";
import { useProducts } from "@/hooks/useProducts";
import { formatCurrency, formatPercentage } from "@/utils/helpers";

export default function InvestmentPage() {
  const { products, loading, error } = useProducts();

  // 카테고리별 이모지 매핑
  const getCategoryEmoji = (category: string, subcategory?: string) => {
    const emojiMap: { [key: string]: string } = {
      농산물: subcategory?.includes("감귤")
        ? "🍊"
        : subcategory?.includes("배추")
        ? "🥬"
        : subcategory?.includes("고추")
        ? "🌶️"
        : subcategory?.includes("딸기")
        ? "🍓"
        : "🌾",
      축산물: "🐄",
      수산물: "🐟",
    };
    return emojiMap[category] || "🌱";
  };

  // 상태별 스타일 매핑
  const getStatusStyle = (status: string) => {
    const statusMap: { [key: string]: string } = {
      active: "bg-green-100 text-green-800",
      completed: "bg-blue-100 text-blue-800",
      pending: "bg-yellow-100 text-yellow-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return statusMap[status] || "bg-gray-100 text-gray-800";
  };

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      active: "진행중",
      completed: "완료",
      pending: "대기중",
      cancelled: "취소됨",
    };
    return statusMap[status] || status;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-8">
            <svg
              className="w-6 h-6 text-green-600 mr-2 animate-spin"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              ></path>
            </svg>
            <h1 className="text-2xl font-bold text-gray-800">
              농수산물 투자 상품
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 로딩 스켈레톤 */}
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
              >
                <div className="w-full h-60 bg-gray-300"></div>
                <div className="p-5">
                  <div className="h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-3"></div>
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-300 rounded w-20"></div>
                    <div className="h-4 bg-gray-300 rounded w-16"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-8">
            <svg
              className="w-6 h-6 text-red-600 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <h1 className="text-2xl font-bold text-red-800">
              데이터 로딩 실패
            </h1>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h2 className="text-lg font-semibold text-red-800 mb-2">
              투자 상품을 불러올 수 없습니다
            </h2>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              다시 시도
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-8">
            <svg
              className="w-6 h-6 text-green-600 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <h1 className="text-2xl font-bold text-gray-800">
              농수산물 투자 상품
            </h1>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              등록된 투자 상품이 없습니다
            </h2>
            <p className="text-gray-600">
              곧 새로운 투자 상품이 등록될 예정입니다.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <svg
              className="w-6 h-6 text-green-600 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <h1 className="text-2xl font-bold text-gray-800">
              농수산물 투자 상품
            </h1>
          </div>

          <div className="text-sm text-gray-600">
            총{" "}
            <span className="font-semibold text-green-600">
              {products.length}개
            </span>{" "}
            상품
          </div>
        </div>

        {/* 상품 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              href={`/investment/${product.id}`}
              key={product.id}
              className="block hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl">
                {/* 상품 이미지 */}
                <div className="relative w-full h-60 bg-gradient-to-r from-green-100 to-blue-100 flex items-center justify-center">
                  <div className="text-6xl">
                    {getCategoryEmoji(product.category, product.subcategory)}
                  </div>

                  {/* 상태 배지 */}
                  <div
                    className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                      product.status
                    )}`}
                  >
                    {getStatusText(product.status)}
                  </div>
                </div>

                {/* 상품 정보 */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {product.category}
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                      {product.subcategory}
                    </span>
                  </div>

                  <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">
                    {product.name}
                  </h2>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  {/* 진행률 바 */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">진행률</span>
                      <span className="font-medium text-green-600">
                        {formatPercentage(
                          product.currentAmount,
                          product.targetAmount
                        )}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(
                            (product.currentAmount / product.targetAmount) *
                              100,
                            100
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* 투자 정보 */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">목표 금액</span>
                      <span className="font-medium">
                        {formatCurrency(product.targetAmount)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">현재 금액</span>
                      <span className="font-medium text-green-600">
                        {formatCurrency(product.currentAmount)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">예상 수익률</span>
                      <span className="font-bold text-blue-600">
                        {product.expectedReturnRate}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">투자 기간</span>
                      <span className="font-medium">
                        {product.investmentPeriod}개월
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">최소 투자금</span>
                      <span className="font-medium">
                        {formatCurrency(product.minInvestment)}
                      </span>
                    </div>
                  </div>

                  {/* 공급업체 정보 */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        {product.supplierName}
                      </span>
                      <span className="text-gray-500">{product.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 빈 상태일 때 추가 상품 로딩 유도 */}
        {products.length > 0 && products.length % 6 === 0 && (
          <div className="text-center mt-12">
            <button
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
              onClick={() => {
                // 페이지네이션이나 더 보기 기능 구현
                console.log("더 많은 상품 로드");
              }}
            >
              더 많은 상품 보기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
