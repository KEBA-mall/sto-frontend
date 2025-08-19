// app/contexts/AuthContext.tsx
"use client";

import React, { useState, createContext, useContext, useEffect } from "react";

// User 타입을 직접 정의 (lib/api 의존성 제거)
interface User {
  user_id: number;
  phone_number: string;
  user_name?: string;
  user_type: string;
  kyc_status: string;
  is_active: boolean;
  created_at: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (userData: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // 초기 로드 시 토큰 확인
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (token) {
          // 백엔드 /api/auth/me 엔드포인트로 사용자 정보 확인
          const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            const userData: User = await response.json();
            setUser(userData);
            setIsLoggedIn(true);
            console.log("✅ 토큰 검증 성공, 로그인 상태 복원");
          } else {
            // 토큰이 유효하지 않으면 제거
            console.log("❌ 토큰이 유효하지 않음, 로그아웃 처리");
            localStorage.removeItem("access_token");
            localStorage.removeItem("user_info");
          }
        } else {
          console.log("📝 저장된 토큰이 없음");
        }
      } catch (error) {
        console.error("토큰 검증 실패:", error);
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_info");
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = (token: string, userData: User) => {
    console.log("🔐 로그인 처리:", userData);

    // 토큰과 사용자 정보 저장
    localStorage.setItem("access_token", token);
    localStorage.setItem("user_info", JSON.stringify(userData));

    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (token) {
        // 백엔드 로그아웃 API 호출
        await fetch(`${API_BASE_URL}/api/auth/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log("✅ 백엔드 로그아웃 완료");
      }
    } catch (error) {
      console.log("로그아웃 API 호출 실패:", error);
    } finally {
      // 로컬 스토리지 정리 및 상태 초기화
      localStorage.removeItem("access_token");
      localStorage.removeItem("user_info");
      setUser(null);
      setIsLoggedIn(false);
      console.log("🚪 로그아웃 완료");
    }
  };

  const updateUser = (userData: User) => {
    localStorage.setItem("user_info", JSON.stringify(userData));
    setUser(userData);
    console.log("👤 사용자 정보 업데이트:", userData);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, loading, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
