// src/components/layout/Header.tsx

"use client";

import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-200 py-4 px-6 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center">
        <Link
          href="/"
          className="flex items-center text-2xl font-bold text-gray-900 mr-8"
        >
          <Image src="/logo.png" alt="Faank Logo" width={100} height={30} />
        </Link>

        {/* 내비게이션 메뉴 */}
        <nav className="hidden md:flex flex-grow justify-center space-x-8">
          <Link
            href="/about"
            className="text-gray-700 hover:text-green-600 font-medium text-lg transition duration-200"
          >
            서비스 소개
          </Link>
          <Link
            href="/notice"
            className="text-gray-700 hover:text-green-600 font-medium text-lg transition duration-200"
          >
            공지사항
          </Link>
          <Link
            href="/magazine"
            className="text-gray-700 hover:text-green-600 font-medium text-lg transition duration-200"
          >
            매거진
          </Link>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <Link href="/investment/products" passHref>
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 shadow-md">
            농수산물 투자하기
          </button>
        </Link>
        <Link
          href="/auth/login"
          className="text-gray-700 hover:text-green-600 font-medium transition duration-200"
        >
          로그인
        </Link>
        <Link
          href="/auth/register"
          className="text-gray-700 hover:text-green-600 font-medium transition duration-200"
        >
          회원가입
        </Link>
      </div>
      <div className="md:hidden">
        <button className="text-gray-700 focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>
    </header>
  );
}
