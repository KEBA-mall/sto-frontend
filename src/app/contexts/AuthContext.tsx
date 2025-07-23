// app/contexts/AuthContext.tsx
"use client"; // 클라이언트 컴포넌트로 지정

import React, { useState, createContext, useContext, useEffect } from "react";
import { authAPI, tokenUtils, User } from "@/lib/api";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 초기 인증 상태 확인
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = tokenUtils.getToken();
        const savedUser = tokenUtils.getUserInfo();

        if (token && savedUser) {
          // 저장된 토큰으로 사용자 정보 재검증
          try {
            const currentUser = await authAPI.getCurrentUser();
            setUser(currentUser);
            setIsAuthenticated(true);
            tokenUtils.setUserInfo(currentUser); // 최신정보로 업데이트
          } catch (error) {
            // 토큰이 만료되었거나 유효하지 않음
            console.error("Token validation failed:", error);
            tokenUtils.removeToken();
            setUser(null);
            setIsAuthenticated(false);
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        tokenUtils.removeToken();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = (token: string, userData: User) => {
    tokenUtils.setToken(token);
    tokenUtils.setUserInfo(userData);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      // 서버에 로그아웃 요청
      await authAPI.logout();
    } catch (error) {
      console.error("Logout API failed:", error);
    } finally {
      // 로컬 상태 정리
      tokenUtils.removeToken();
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, isLoading }}
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
