"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");

    router.push("/login");
  };

  return (
    <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">
        Invoice & Expense Management System
      </h1>
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="bg-gray-700 text-white px-5 py-2 rounded-lg hover:bg-gray-800"
        >
          Homepage
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="bg-gray-700 text-white px-5 py-2 rounded-lg hover:bg-gray-800"
          >
            Dashboard
          </Link>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
