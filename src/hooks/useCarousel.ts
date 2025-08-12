// src/hooks/useCarousel.ts
import { useState, useEffect } from "react";

interface UseCarouselProps {
  itemCount: number;
  autoSlide?: boolean;
  autoSlideInterval?: number;
}

export const useCarousel = ({
  itemCount,
  autoSlide = false,
  autoSlideInterval = 5000,
}: UseCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 자동 슬라이드
  useEffect(() => {
    if (!autoSlide || itemCount <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % itemCount);
    }, autoSlideInterval);

    return () => clearInterval(timer);
  }, [autoSlide, autoSlideInterval, itemCount]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % itemCount);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + itemCount) % itemCount);
  };

  const goToIndex = (index: number) => {
    if (index >= 0 && index < itemCount) {
      setCurrentIndex(index);
    }
  };

  return {
    currentIndex,
    goToNext,
    goToPrev,
    goToIndex,
  };
};
