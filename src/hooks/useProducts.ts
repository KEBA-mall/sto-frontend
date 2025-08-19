// src/hooks/useProducts.ts
import { useState, useEffect, useCallback } from "react";

// Product 타입 정의
export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  minInvestment: number;
  expectedReturnRate: number;
  investmentPeriod: number;
  fundingStartDate: string;
  fundingEndDate: string;
  status: "active" | "completed" | "pending" | "cancelled";
  riskLevel: "low" | "medium" | "high";
  images: string[];
  supplierName: string;
  location: string;
  supplierContact: string;
  createdAt: string;
  updatedAt?: string;
  isFeatured: boolean;
  viewCount: number;
}

// API 응답 타입
interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  per_page: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// 전체 상품 조회 훅
export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/api/products/`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ProductsResponse = await response.json();
      setProducts(data.products || []);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "상품을 불러오는데 실패했습니다.";
      setError(errorMessage);
      setProducts([]); // 에러시 빈 배열로 fallback
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
  };
};

// TOP 상품 조회 훅
export const useTopProducts = (limit: number = 5) => {
  const [topProducts, setTopProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTopProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${API_BASE_URL}/api/products/top?limit=${limit}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Product[] = await response.json();
      setTopProducts(data || []);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "인기 상품을 불러오는데 실패했습니다.";
      setError(errorMessage);
      setTopProducts([]);
      console.error("Error fetching top products:", err);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchTopProducts();
  }, [fetchTopProducts]);

  return {
    topProducts,
    loading,
    error,
    refetch: fetchTopProducts,
  };
};

// 인기 상품 조회 훅
export const usePopularProduct = () => {
  const [popularProduct, setPopularProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPopularProduct = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/api/products/popular`);

      if (!response.ok) {
        if (response.status === 404) {
          setPopularProduct(null);
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Product = await response.json();
      setPopularProduct(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "인기 상품을 불러오는데 실패했습니다.";
      setError(errorMessage);
      setPopularProduct(null);
      console.error("Error fetching popular product:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPopularProduct();
  }, [fetchPopularProduct]);

  return {
    popularProduct,
    loading,
    error,
    refetch: fetchPopularProduct,
  };
};

// 특정 상품 조회 훅
export const useProduct = (productId: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = useCallback(async () => {
    if (!productId) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/api/products/${productId}`);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("상품을 찾을 수 없습니다.");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Product = await response.json();
      setProduct(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "상품을 불러오는데 실패했습니다.";
      setError(errorMessage);
      setProduct(null);
      console.error("Error fetching product:", err);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return {
    product,
    loading,
    error,
    refetch: fetchProduct,
  };
};

// 상품 검색 훅
export const useSearchProducts = () => {
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchProducts = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${API_BASE_URL}/api/products/search?q=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Product[] = await response.json();
      setSearchResults(data || []);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "검색에 실패했습니다.";
      setError(errorMessage);
      setSearchResults([]);
      console.error("Error searching products:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    searchResults,
    loading,
    error,
    searchProducts,
  };
};
