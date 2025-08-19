// lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const API_PREFIX = process.env.NEXT_PUBLIC_API_PREFIX || "/api";

// API 응답 타입 정의 (제네릭 타입을 구체적으로 정의)
export interface ApiResponse<T = Record<string, unknown>> {
  success: boolean;
  message: string;
  data?: T;
}

export interface User {
  user_id: number;
  phone_number: string;
  user_name?: string;
  user_type: string;
  kyc_status: string;
  is_active: boolean;
  created_at: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: User;
}

// API 요청 헬퍼 함수
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${API_PREFIX}${endpoint}`;

  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // 토큰이 있으면 Authorization 헤더 추가
  const token = localStorage.getItem("access_token");
  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: `HTTP Error ${response.status}`,
      }));
      throw new Error(errorData.message || `HTTP Error ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
}

// 인증 관련 API 함수들
export const authAPI = {
  // SMS 인증번호 발송
  sendSMS: async (phoneNumber: string): Promise<ApiResponse> => {
    return apiRequest("/auth/send-sms", {
      method: "POST",
      body: JSON.stringify({ phone_number: phoneNumber }),
    });
  },

  // SMS 인증번호 확인
  verifySMS: async (
    phoneNumber: string,
    verificationCode: string
  ): Promise<ApiResponse> => {
    return apiRequest("/auth/verify-sms", {
      method: "POST",
      body: JSON.stringify({
        phone_number: phoneNumber,
        verification_code: verificationCode,
      }),
    });
  },

  // 회원가입
  register: async (
    phoneNumber: string,
    password: string,
    userName?: string
  ): Promise<LoginResponse> => {
    return apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify({
        phone_number: phoneNumber,
        password: password,
        user_name: userName,
      }),
    });
  },

  // 로그인
  login: async (
    phoneNumber: string,
    password: string
  ): Promise<LoginResponse> => {
    return apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({
        phone_number: phoneNumber,
        password: password,
      }),
    });
  },

  // 현재 사용자 정보 조회
  getCurrentUser: async (): Promise<User> => {
    return apiRequest("/auth/me");
  },

  // 로그아웃
  logout: async (): Promise<ApiResponse> => {
    return apiRequest("/auth/logout", {
      method: "POST",
    });
  },

  // 테스트용
  test: async (): Promise<ApiResponse> => {
    return apiRequest("/auth/test");
  },
};

// 토큰 관리 유틸리티
export const tokenUtils = {
  // 토큰 저장
  setToken: (token: string) => {
    localStorage.setItem("access_token", token);
  },

  // 토큰 가져오기
  getToken: (): string | null => {
    return localStorage.getItem("access_token");
  },

  // 토큰 제거
  removeToken: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_info");
  },

  // 사용자 정보 저장
  setUserInfo: (user: User) => {
    localStorage.setItem("user_info", JSON.stringify(user));
  },

  // 사용자 정보 가져오기
  getUserInfo: (): User | null => {
    const userInfo = localStorage.getItem("user_info");
    return userInfo ? JSON.parse(userInfo) : null;
  },
};

// API 상태 확인
export const checkAPIStatus = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch (error) {
    console.error("API connection failed:", error);
    return false;
  }
};
