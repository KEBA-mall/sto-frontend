// app/investment/[id]/page.tsx
import type { Metadata } from "next";

interface InvestmentDetailPageProps {
  params: Promise<{
    id: string; // URL의 [id] 부분에 해당하는 값
  }>;
}

// 메타데이터는 동적으로 생성될 수 있습니다.
export async function generateMetadata({
  params,
}: InvestmentDetailPageProps): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `투자상품 상세: ${id}`,
    description: `투자상품 ID ${id} 상세 정보`,
  };
}

export default async function InvestmentDetailPage({
  params,
}: InvestmentDetailPageProps) {
  const { id } = await params; // params 객체에서 id를 바로 구조 분해 할당

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-700">
        투자상품 상세화면 (ID: {id}) - 개발 진행 중입니다.
      </h1>
    </div>
  );
}
