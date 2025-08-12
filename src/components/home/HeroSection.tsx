// src/components/home/HeroSection.tsx
import React from "react";
import Link from "next/link";
import { scrollToSection } from "@/utils/helpers";

export default function HeroSection() {
  return (
    <header className="main-header bg-gradient-to-r from-green-600 to-green-700 text-white py-16 px-6 rounded-3xl shadow-2xl mb-12 mx-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6 leading-tight">
          농수산물 투자로
          <br />
          <span className="text-green-200">미래를 만드세요</span>
        </h1>
        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          실제 농수산물을 기반으로 한 안전하고 투명한 투자 플랫폼입니다.
          전문가가 선별한 프리미엄 상품으로 안정적인 수익을 창출하세요.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/investment"
            className="bg-white text-green-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            투자 시작하기
          </Link>
          <button
            onClick={() => scrollToSection("about-section")}
            className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-green-700 transition-all duration-300"
          >
            서비스 소개
          </button>
        </div>
      </div>
    </header>
  );
}
