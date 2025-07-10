// src/components/layout/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-6 text-center mt-auto">
      {" "}
      {/* mt-auto 추가하여 하단에 붙도록 */}
      <p>&copy; 2025 FAANK. All rights reserved.</p>
      <div className="flex justify-center space-x-4 mt-2">
        <Link href="/privacy" className="hover:underline">
          개인정보처리방침
        </Link>
        <Link href="/terms" className="hover:underline">
          이용약관
        </Link>
      </div>
    </footer>
  );
}
