// src/utils/helpers.ts

export const scrollToSection = (id: string) => {
  if (typeof window !== "undefined") {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }
};

export const formatCurrency = (amount: number): string => {
  if (amount >= 100000000) {
    return `${(amount / 100000000).toFixed(1)}억원`;
  } else if (amount >= 10000) {
    return `${(amount / 10000).toFixed(0)}만원`;
  } else if (amount >= 1000) {
    return `${(amount / 1000).toFixed(0)}천원`;
  }
  return `${amount}원`;
};

export const formatPercentage = (current: number, target: number): string => {
  return `${((current / target) * 100).toFixed(1)}%`;
};

export const formatNumber = (num: number): string => {
  return num.toLocaleString();
};
