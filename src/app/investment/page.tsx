// app/investment/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image"; // next/image 컴포넌트 임포트

export const metadata: Metadata = {
  title: "투자 상품 목록",
  description: "Faank의 농산물 투자 상품 목록입니다.",
};

// 하드코딩된 투자 상품 데이터
const investmentProducts = [
  {
    id: "1",
    name: "제주 감귤 농장 투자",
    description: "제주도 감귤 농장에 투자하여 안정적인 수익을 기대하세요.",
    yield: "연 12%",
    period: "6개월",
    imagePath: "/mandarine.jpg",
  },
  {
    id: "2",
    name: "강원도 한우 사육 투자",
    description: "강원도 청정지역 한우 사육 프로젝트에 참여하세요.",
    yield: "연 10%",
    period: "12개월",
    imagePath: "/cow.png",
  },
  {
    id: "3",
    name: "해남 배추 스마트팜 투자",
    description: "첨단 스마트팜 기술로 재배되는 해남 배추에 투자합니다.",
    yield: "연 11.5%",
    period: "9개월",
    imagePath: "/cabbage.png",
  },
];

export default function InvestmentPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <svg
            className="w-6 h-6 text-green-600 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <h1 className="text-2xl font-bold text-gray-800">농산물 투자 상품</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {investmentProducts.map((product) => (
            <Link
              href={`/investment/${product.id}`}
              key={product.id}
              className="block"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                {/* 이미지 컨테이너 크기 고정 및 Image 컴포넌트 수정 */}
                <div className="relative w-full h-90">
                  {" "}
                  {/* 이 div로 이미지 크기를 고정합니다 */}
                  <Image
                    src={product.imagePath}
                    alt={product.name}
                    fill // 부모 컨테이너(상위 div)의 크기를 채우도록 설정
                    objectFit="cover" // 이미지의 가로세로 비율을 유지하면서 컨테이너를 채움
                    className="rounded-t-lg" // 상단 모서리만 둥글게 (옵션)
                  />
                </div>
                <div className="p-5">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {product.name}
                  </h2>
                  <p className="text-gray-600 text-sm mb-3">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-700">
                    <span>
                      수익률:{" "}
                      <span className="font-bold text-green-600">
                        {product.yield}
                      </span>
                    </span>
                    <span>
                      기간: <span className="font-bold">{product.period}</span>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
