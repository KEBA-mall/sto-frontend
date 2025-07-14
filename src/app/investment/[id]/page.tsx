// app/investment/[id]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

// 하드코딩된 투자 상품 데이터 (실제 앱에서는 DB 또는 API에서 가져옵니다)
// app/investment/page.tsx의 데이터와 연동될 수 있도록 확장
const investmentProducts = [
  {
    id: "1",
    name: "제주 감귤 농장 투자",
    description: "제주도 감귤 농장에 투자하여 안정적인 수익을 기대하세요.",
    yield: "연 12%",
    period: "6개월",
    imagePath: "/mandarine.jpg",
    details: {
      recruitmentPeriod: "25.07.00(월) - 25.07.00(일)",
      oneCAmount: "00,000원",
      remainingQuantity: "00,000C",
      totalRecruitmentAmount: "000,000,000원",
      transactionFinancialInstitution: "신한투자증권",
      nhBank: "NH농협은행",
      recruitmentMethod: "일반(비례, 균등, 추첨)",
      rightsStructure: "공유지분권",
      reproductionAndTrading: "재배 및 경매",
      paymentDueDate: "25.00.00(금)",
      applicationAnnouncementDate: "25.00.00(목)",
      allocationAnnouncementDate: "25.00.00(금)",
      allocationStandardDate: "25.00.00(목)",
    },
  },
  {
    id: "2",
    name: "강원도 한우 사육 투자",
    description: "강원도 청정지역 한우 사육 프로젝트에 참여하세요.",
    yield: "연 10%",
    period: "12개월",
    imagePath: "/cow.png",
    details: {
      recruitmentPeriod: "25.07.00(월) - 25.07.00(일)",
      oneCAmount: "00,000원",
      remainingQuantity: "00,000C",
      totalRecruitmentAmount: "000,000,000원",
      transactionFinancialInstitution: "신한투자증권",
      nhBank: "NH농협은행",
      recruitmentMethod: "일반(비례, 균등, 추첨)",
      rightsStructure: "공유지분권",
      reproductionAndTrading: "재배 및 경매",
      paymentDueDate: "25.00.00(금)",
      applicationAnnouncementDate: "25.00.00(목)",
      allocationAnnouncementDate: "25.00.00(금)",
      allocationStandardDate: "25.00.00(목)",
    },
  },
  {
    id: "3",
    name: "해남 배추 스마트팜 투자",
    description: "첨단 스마트팜 기술로 재배되는 해남 배추에 투자합니다.",
    yield: "연 11.5%",
    period: "9개월",
    imagePath: "/cabbage.png",
    details: {
      recruitmentPeriod: "25.07.00(월) - 25.07.00(일)",
      oneCAmount: "00,000원",
      remainingQuantity: "00,000C",
      totalRecruitmentAmount: "000,000,000원",
      transactionFinancialInstitution: "신한투자증권",
      nhBank: "NH농협은행",
      recruitmentMethod: "일반(비례, 균등, 추첨)",
      rightsStructure: "공유지분권",
      reproductionAndTrading: "재배 및 경매",
      paymentDueDate: "25.00.00(금)",
      applicationAnnouncementDate: "25.00.00(목)",
      allocationAnnouncementDate: "25.00.00(금)",
      allocationStandardDate: "25.00.00(목)",
    },
  },
];

interface InvestmentDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

// 메타데이터는 동적으로 생성될 수 있습니다.
export async function generateMetadata({
  params,
}: InvestmentDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = investmentProducts.find((p) => p.id === id);

  return {
    title: product ? `투자상품 상세: ${product.name}` : "투자상품 상세",
    description: product ? product.description : `투자상품 ID ${id} 상세 정보`,
  };
}

export default async function InvestmentDetailPage({
  params,
}: InvestmentDetailPageProps) {
  const { id } = await params;

  const product = investmentProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">
            상품을 찾을 수 없습니다.
          </h1>
          <p className="text-lg text-gray-700">
            잘못된 접근이거나 상품이 존재하지 않습니다.
          </p>
          <Link
            href="/investment"
            className="mt-8 inline-block bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors duration-200"
          >
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-xl font-semibold text-gray-700 mb-8">
          투자시스템 - 상품상세
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 왼쪽 섹션 */}
          <div className="flex flex-col gap-8">
            {/* 왼쪽 상단: 이미지 */}
            <div className="relative w-full h-96 bg-gray-200 rounded-lg overflow-hidden shadow-sm">
              <Image
                src={product.imagePath}
                alt={product.name}
                fill
                objectFit="cover"
                className="rounded-lg"
              />
            </div>

            {/* 왼쪽 하단: 예상 수익 전망 컨테이너 (빈 컨테이너) */}
            <div className="bg-gray-200 rounded-lg p-6 h-auto min-h-[250px] shadow-sm flex flex-col justify-between">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                예상 수익 전망
              </h2>
              <div className="grid grid-cols-2 gap-4 text-gray-700">
                <div>
                  <h3 className="font-semibold text-lg mb-2">경매 실적</h3>
                  <p className="text-3xl font-bold text-green-600">9,999만원</p>
                  <p className="text-sm text-gray-500 mt-2">
                    ✅ 전국 평균보다 10% 비싸게 판매
                  </p>
                  <p className="text-sm text-gray-500">
                    2024년 국내 프리미엄 등급 평균
                  </p>
                  <div className="mt-4 p-2 bg-gray-300 rounded">000만원</div>
                  <div className="mt-2 p-2 bg-gray-300 rounded">
                    Faank 프리미엄 평균
                  </div>
                  <div className="mt-2 p-2 bg-gray-300 rounded">0,000만원</div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">목표 수익</h3>
                  <p className="text-sm text-gray-500">
                    농수산물 프리미엄 등급 000% 기대
                  </p>
                  <p className="text-2xl font-bold text-gray-800">000~00만원</p>
                  <p className="text-sm text-gray-500 mt-2">
                    ✅ 최대 0%~00% 수익 목표
                  </p>
                  <div className="mt-4 bg-gray-300 h-24 rounded flex items-center justify-center text-gray-600 font-bold">
                    마우스 갖다대면 팝업
                  </div>
                  <div className="mt-2 p-2 bg-gray-300 rounded">
                    최근 3년 판매 금액
                  </div>
                  <div className="mt-2 p-2 bg-gray-300 rounded">
                    0,00-00만원
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <h3 className="text-xl font-bold text-red-600">
                  실시간 타이머
                </h3>
                <p className="text-4xl font-bold text-gray-800 mt-2">
                  7일 00 : 00 : 00
                </p>
                <div className="flex justify-center items-center mt-4 space-x-2">
                  <div className="w-full bg-gray-300 rounded-full h-2.5">
                    <div
                      className="bg-green-500 h-2.5 rounded-full"
                      style={{ width: "70%" }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold">70%</span>
                  <span className="text-xs text-gray-500">9999명 투자</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">00,000 / 99,999C</p>
                <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 shadow-md">
                  농수산물 투자하기
                </button>
                <div className="mt-4 space-y-2 text-left text-gray-700">
                  <div className="flex items-center justify-between p-2 bg-gray-100 rounded-md">
                    <span>투자 설명서</span>
                    <span className="font-bold">&gt;</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-100 rounded-md">
                    <span>투자 유의사항</span>
                    <span className="font-bold">&gt;</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽 섹션: 상품 정보 */}
          <div className="bg-white rounded-lg p-6 shadow-sm flex flex-col justify-between">
            {" "}
            {/* flex-col과 justify-between 추가 */}
            <div>
              {" "}
              {/* 기존 상품 정보 항목들을 묶는 div */}
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                상품 정보
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="font-semibold text-gray-700">모집기간</span>
                  <span className="text-gray-900">
                    {product.details.recruitmentPeriod}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="font-semibold text-gray-700">1C 금액</span>
                  <span className="text-gray-900">
                    {product.details.oneCAmount}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="font-semibold text-gray-700">잔여수량</span>
                  <span className="text-gray-900">
                    {product.details.remainingQuantity}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="font-semibold text-gray-700">모집총액</span>
                  <span className="text-gray-900">
                    {product.details.totalRecruitmentAmount}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="font-semibold text-gray-700">
                    거래 금융기관
                  </span>
                  <span className="text-gray-900 flex flex-col items-end">
                    <span>
                      {product.details.transactionFinancialInstitution}
                    </span>
                    <span>{product.details.nhBank}</span>
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="font-semibold text-gray-700">모집방법</span>
                  <span className="text-gray-900">
                    {product.details.recruitmentMethod}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="font-semibold text-gray-700">권리구조</span>
                  <span className="text-gray-900">
                    {product.details.rightsStructure}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="font-semibold text-gray-700">
                    재배 및 경매
                  </span>
                  <span className="text-gray-900">
                    {product.details.reproductionAndTrading}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="font-semibold text-gray-700">납입기일</span>
                  <span className="text-gray-900">
                    {product.details.paymentDueDate}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="font-semibold text-gray-700">
                    청약공고일
                  </span>
                  <span className="text-gray-900">
                    {product.details.applicationAnnouncementDate}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="font-semibold text-gray-700">
                    배정공고일
                  </span>
                  <span className="text-gray-900">
                    {product.details.allocationAnnouncementDate}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  {" "}
                  {/* 마지막 항목은 border-b 없음 */}
                  <span className="font-semibold text-gray-700">
                    배정기준일
                  </span>
                  <span className="text-gray-900">
                    {product.details.allocationStandardDate}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 유의사항 */}
        <div className="mt-12 text-sm text-gray-600 space-y-2">
          <p>
            • 이 자료는 농산물 상품 출시 시점까지 Faank가 아는 모든 농산물
            디지털화된 데이터 및 KOSIS 통계와 비교하여 계산한 것입니다.
          </p>
          <p>
            • 단, Faank 과거 실적에 따라 수익률을 보장하지 않으며, 농수산물 시장
            상황에 따라 판매에 의한 수익 손실이 발생할 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
