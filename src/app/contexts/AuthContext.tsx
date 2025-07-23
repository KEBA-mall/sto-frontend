// app/contexts/AuthContext.tsx
"use client";

import React, { useState, createContext, useContext, useEffect } from "react";
import { authAPI, tokenUtils, User } from "@/lib/api";

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (userData: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 초기 로드 시 토큰 확인
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem("access_token");
      if (token) {
        try {
          // 백엔드 /api/auth/me 엔드포인트로 사용자 정보 확인
          const response = await fetch("/api/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
            setIsLoggedIn(true);
          } else {
            // 토큰이 유효하지 않으면 제거
            localStorage.removeItem("access_token");
            localStorage.removeItem("user_info");
          }
        } catch (error) {
          console.error("토큰 검증 실패:", error);
          localStorage.removeItem("access_token");
          localStorage.removeItem("user_info");
        }
      }
    };

    checkAuthStatus();
  }, []);

  const login = (token: string, userData: User) => {
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
        await fetch("/api/auth/logout", {
          method: "POST",
          headers: {
            Authrization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      }
    } catch (error) {
      console.log("로그아웃 API 호출 실패:", error);
    } finally {
      // 로컬 스토리지 정리 및 상태 초기화
      localStorage.removeItem("access_token");
      localStorage.removeItem("user_info");
      setUser(null);
      setIsLoggedIn(false);
    }
  };

  const updateUser = (userData: User) => {
    localStorage.setItem("user_info", JSON.stringify(userData));
    setUser(userData);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, login, logout, updateUser }}
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
