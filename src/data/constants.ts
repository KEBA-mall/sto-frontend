// src/data/constants.ts

export interface BannerData {
  id: number;
  title: string;
  subtitle: string;
  bgColor: string;
}

export interface ProductData {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  expectedReturnRate: number;
  emoji: string;
  targetAmount: number;
  currentAmount: number;
  supplierName: string;
}

export const BANNER_DATA: BannerData[] = [
  {
    id: 1,
    title: "농수산물 투자의 새로운 시작",
    subtitle: "FAANK와 함께 안전하고 투명한 투자를 경험하세요",
    bgColor: "from-green-400 to-green-600",
  },
  {
    id: 2,
    title: "블록체인 기반 투명한 운영",
    subtitle: "모든 투자 과정이 투명하게 기록됩니다",
    bgColor: "from-blue-400 to-blue-600",
  },
  {
    id: 3,
    title: "높은 수익률 기대",
    subtitle: "평균 8-12% 연수익률로 안정적인 수익 창출",
    bgColor: "from-purple-400 to-purple-600",
  },
];

export const SAMPLE_PRODUCTS: ProductData[] = [
  {
    id: "1",
    name: "제주 프리미엄 감귤",
    category: "농산물",
    subcategory: "감귤",
    expectedReturnRate: 12,
    emoji: "🍊",
    targetAmount: 50000000,
    currentAmount: 42600000,
    supplierName: "제주감귤농장",
  },
  {
    id: "2",
    name: "강원도 한우 사육",
    category: "축산물",
    subcategory: "한우",
    expectedReturnRate: 10,
    emoji: "🐄",
    targetAmount: 120000000,
    currentAmount: 98200000,
    supplierName: "강원축산협동조합",
  },
  {
    id: "3",
    name: "해남 배추 스마트팜",
    category: "농산물",
    subcategory: "배추",
    expectedReturnRate: 11.5,
    emoji: "🥬",
    targetAmount: 80000000,
    currentAmount: 71200000,
    supplierName: "해남스마트농장",
  },
  {
    id: "4",
    name: "완도 전복 양식",
    category: "수산물",
    subcategory: "전복",
    expectedReturnRate: 13,
    emoji: "🦪",
    targetAmount: 30000000,
    currentAmount: 27800000,
    supplierName: "완도수산협동조합",
  },
  {
    id: "5",
    name: "영양 고추 농장",
    category: "농산물",
    subcategory: "고추",
    expectedReturnRate: 9.5,
    emoji: "🌶️",
    targetAmount: 60000000,
    currentAmount: 53400000,
    supplierName: "영양농업협동조합",
  },
];

export const STATISTICS_DATA = {
  totalUsers: 1247,
  totalInvestors: 892,
  totalInvestmentAmount: 1250000000, // 12.5억원
};
