// src/components/home/BannerSlider.tsx
import React from "react";
import { BANNER_DATA } from "@/data/constants";
import { useCarousel } from "@/hooks/useCarousel";

export default function BannerSlider() {
  const { currentIndex, goToNext, goToPrev, goToIndex } = useCarousel({
    itemCount: BANNER_DATA.length,
    autoSlide: true,
    autoSlideInterval: 5000,
  });

  return (
    <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-12 mb-12 relative overflow-hidden min-h-[400px]">
      <div className="flex items-center justify-center h-full">
        <div
          className="flex transition-transform duration-500 ease-in-out w-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {BANNER_DATA.map((banner) => (
            <div
              key={banner.id}
              className="w-full flex-shrink-0 flex items-center justify-center"
            >
              <div
                className={`text-center p-8 rounded-2xl bg-gradient-to-r ${banner.bgColor} text-white shadow-xl max-w-2xl w-full`}
              >
                <h2 className="text-3xl font-bold mb-4">{banner.title}</h2>
                <p className="text-lg opacity-90">{banner.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 인디케이터 */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
        {BANNER_DATA.map((_, index) => (
          <button
            key={index}
            onClick={() => goToIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex
                ? "bg-green-600"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>

      {/* 네비게이션 버튼 */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl text-gray-400 hover:text-gray-600 transition-colors p-2 bg-white rounded-full shadow-lg"
        aria-label="이전 배너"
      >
        ‹
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl text-gray-400 hover:text-gray-600 transition-colors p-2 bg-white rounded-full shadow-lg"
        aria-label="다음 배너"
      >
        ›
      </button>
    </div>
  );
}
