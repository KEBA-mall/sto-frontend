// src/app/page.tsx
"use client";

import React from "react";
import HeroSection from "@/components/home/HeroSection";
import BannerSlider from "@/components/home/BannerSlider";
import ProductSection from "@/components/home/ProductSection";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { SAMPLE_PRODUCTS, STATISTICS_DATA } from "@/data/constants";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <BannerSlider />

        {/* 3개 정보 카드 - 여기서 직접 구현 (간단하므로) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-100 hover:shadow-xl transition-shadow">
            <div className="text-xl font-bold text-green-800 leading-relaxed">
              <span>실제로 </span>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                만져보고
              </span>
              <br />
              <span>먹어본 상품이,</span>
              <br />
              <span>내 수익의 </span>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                기반이 됩니다.
              </span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 shadow-lg border border-orange-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🔥</span>
              <span className="text-sm font-semibold text-orange-700">
                실시간 인기 투자 상품
              </span>
            </div>
            <div className="text-xl font-bold text-gray-800 mb-2">
              {SAMPLE_PRODUCTS[0].name}
            </div>
            <div className="text-gray-600">
              {SAMPLE_PRODUCTS[0].supplierName}
            </div>
            <div className="text-sm text-orange-600 font-medium mt-2">
              {(
                (SAMPLE_PRODUCTS[0].currentAmount /
                  SAMPLE_PRODUCTS[0].targetAmount) *
                100
              ).toFixed(1)}
              % 진행률
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {SAMPLE_PRODUCTS[0].expectedReturnRate}% 예상 수익률
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-lg border border-blue-200 hover:shadow-xl transition-shadow">
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-blue-700">
                    누적 회원 수
                  </span>
                  <span className="text-lg font-bold text-gray-800">
                    {STATISTICS_DATA.totalUsers.toLocaleString()}명
                  </span>
                </div>
                <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full transition-all duration-500"
                    style={{ width: "62%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-blue-700">
                    투자자 수
                  </span>
                  <span className="text-lg font-bold text-gray-800">
                    {STATISTICS_DATA.totalInvestors.toLocaleString()}명
                  </span>
                </div>
                <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full transition-all duration-500"
                    style={{ width: "71%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-blue-700">
                    누적 투자금
                  </span>
                  <span className="text-lg font-bold text-gray-800">
                    {(
                      STATISTICS_DATA.totalInvestmentAmount / 100000000
                    ).toFixed(1)}
                    억원
                  </span>
                </div>
                <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full transition-all duration-500"
                    style={{ width: "83%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 투자 상품 섹션 - 복잡하므로 컴포넌트 분리 */}
        <ProductSection />

        {/* 서비스 소개 - 여기서 직접 구현 */}
        <section id="about-section" className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              왜 FAANK인가요?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              실제 농수산물을 기반으로 한 투자로 안전하고 투명한 수익을
              창출합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "안전한 투자",
                desc: "실제 농수산물을 담보로 한 투자로 원금 보장과 안정적인 수익을 제공합니다.",
                icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
              },
              {
                title: "투명한 운영",
                desc: "모든 투자 과정이 블록체인으로 기록되어 투명하고 신뢰할 수 있는 운영을 보장합니다.",
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
              },
              {
                title: "높은 수익률",
                desc: "평균 8-12%의 연 수익률로 일반 예금보다 높은 수익을 제공합니다.",
                icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1",
              },
            ].map((card, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-500 rounded-xl flex items-center justify-center mb-6">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d={card.icon}
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {card.title}
                </h3>
                <p className="text-gray-600">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 매거진 & 공지사항 - 간단하므로 여기서 구현 */}
        <section className="py-16 border-b border-gray-200">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">매거진</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "이달의 투자 트렌드",
                desc: "최신 농수산물 투자 트렌드와 시장 소식을 확인하세요",
              },
              {
                title: "성공 투자 사례",
                desc: "실제 투자 성공 스토리와 전문가 인터뷰",
              },
            ].map((item, index) => (
              <Link key={index} href="/magazine" className="block">
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 shadow-lg border border-purple-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="font-semibold text-xl mb-4 text-purple-800">
                    {item.title}
                  </div>
                  <div className="text-gray-700">{item.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="py-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">공지사항</h2>
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <ul className="space-y-4 text-lg text-gray-700">
              {[
                "2025-01-15 신규 투자 상품 오픈 안내",
                "2025-01-10 서비스 업데이트 안내",
                "2025-01-05 투자 가이드 업데이트",
              ].map((notice, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  <Link
                    href="/notice"
                    className="hover:text-green-600 transition-colors"
                  >
                    {notice}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <ScrollToTop />
    </>
  );
}
