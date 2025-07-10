// app/contexts/AuthContext.tsx
"use client"; // 클라이언트 컴포넌트로 지정

import { useState, createContext, useContext, useEffect } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // 실제 앱에서는 로컬 스토리지나 쿠키에서 로그인 상태를 로드할 수 있습니다.
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 초기 로드 시 로그인 상태 확인 (예: 토큰 유무)
  useEffect(() => {
    // 여기서는 간단히 false로 시작하지만, 실제로는 토큰 검사 등을 수행
    // const token = localStorage.getItem('authToken');
    // if (token) setIsLoggedIn(true);
  }, []);

  const login = () => {
    setIsLoggedIn(true);
    // 실제 로그인 시 토큰 저장 등의 로직 추가
    // localStorage.setItem('authToken', 'your_auth_token');
  };
  const logout = () => {
    setIsLoggedIn(false);
    // 실제 로그아웃 시 토큰 삭제 등의 로직 추가
    // localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
