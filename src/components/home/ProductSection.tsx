// src/components/home/ProductSection.tsx
"use client";

import React from "react";
import { SAMPLE_PRODUCTS } from "@/data/constants";
import { useCarousel } from "@/hooks/useCarousel";
import { formatCurrency, formatPercentage } from "@/utils/helpers";

export default function ProductSection() {
  const { currentIndex, goToNext, goToPrev, goToIndex } = useCarousel({
    itemCount: SAMPLE_PRODUCTS.length,
    autoSlide: false,
  });

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
        인기 투자 상품 TOP5
      </h2>

      {/* 상단 캐러셀 */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-8 mb-8 relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out gap-8"
          style={{ transform: `translateX(-${currentIndex * 200}px)` }}
        >
          {SAMPLE_PRODUCTS.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center gap-4 min-w-[200px] flex-shrink-0"
            >
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-2xl shadow-lg">
                {item.emoji}
              </div>
              <div className="text-sm font-semibold text-gray-700 text-center">
                {item.name}
              </div>
              <div className="text-xs text-gray-500">
                {item.category} • {item.subcategory}
              </div>
              <div className="text-xs text-green-600 font-medium">
                {item.expectedReturnRate}% 수익률
              </div>
              <div className="text-xs text-blue-600 font-medium">
                {formatPercentage(item.currentAmount, item.targetAmount)} 달성
              </div>
            </div>
          ))}
        </div>

        {/* 투자 상품 캐러셀 인디케이터 */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {SAMPLE_PRODUCTS.map((_, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex
                  ? "bg-green-600"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* 캐러셀 네비게이션 버튼 */}
        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl text-gray-400 hover:text-gray-600 transition-colors p-2 bg-white rounded-full shadow-lg"
        >
          ‹
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl text-gray-400 hover:text-gray-600 transition-colors p-2 bg-white rounded-full shadow-lg"
        >
          ›
        </button>
      </div>

      {/* 하단 상세 데이터 테이블 */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200">
        <div className="grid grid-cols-6 border-b border-gray-200">
          <div className="bg-gray-50 p-4 font-bold text-gray-900 border-r border-gray-200">
            구분
          </div>
          {[1, 2, 3, 4, 5].map((num) => (
            <div
              key={num}
              className="bg-gray-50 p-4 font-bold text-gray-900 text-center border-r border-gray-200 last:border-r-0"
            >
              {num}번
            </div>
          ))}
        </div>

        {[
          {
            label: "상품명",
            values: SAMPLE_PRODUCTS.slice(0, 5).map((p) => p.name),
          },
          {
            label: "카테고리",
            values: SAMPLE_PRODUCTS.slice(0, 5).map((p) => p.category),
          },
          {
            label: "목표 금액",
            values: SAMPLE_PRODUCTS.slice(0, 5).map((p) =>
              formatCurrency(p.targetAmount)
            ),
          },
          {
            label: "현재 금액",
            values: SAMPLE_PRODUCTS.slice(0, 5).map((p) =>
              formatCurrency(p.currentAmount)
            ),
          },
          {
            label: "진행률",
            values: SAMPLE_PRODUCTS.slice(0, 5).map((p) =>
              formatPercentage(p.currentAmount, p.targetAmount)
            ),
          },
          {
            label: "예상 수익률",
            values: SAMPLE_PRODUCTS.slice(0, 5).map(
              (p) => `${p.expectedReturnRate}%`
            ),
          },
          {
            label: "공급업체",
            values: SAMPLE_PRODUCTS.slice(0, 5).map((p) => p.supplierName),
          },
          {
            label: "상태",
            values: ["진행중", "진행중", "진행중", "진행중", "진행중"],
          },
        ].map((row, index) => (
          <div
            key={index}
            className="grid grid-cols-6 border-b border-gray-200 last:border-b-0"
          >
            <div className="bg-gray-50 p-4 font-semibold text-gray-900 border-r border-gray-200 text-sm">
              {row.label}
            </div>
            {row.values.map((value, valueIndex) => (
              <div
                key={valueIndex}
                className="p-4 text-center border-r border-gray-200 last:border-r-0 text-sm font-medium text-gray-800"
              >
                {value}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
