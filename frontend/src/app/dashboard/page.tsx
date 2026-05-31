"use client";

import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-10 flex justify-center">
        <div className="bg-white rounded-lg shadow-md p-10 w-full max-w-5xl text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-3">
            Manager Dashboard
          </h1>

          <p className="text-gray-600 mb-10">
            Welcome to the Invoice & Expense Management System dashboard
          </p>

          <div className="flex items-center justify-center gap-10">
            <Link
              href="/dashboard/employees"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-lg w-400px transition"
            >
              <h2 className="text-2xl font-bold mb-2">Manage Employees</h2>
            </Link>
            <Link
              href="/dashboard/profile"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 rounded-lg w-400px transition"
            >
              <h2 className="text-2xl font-bold mb-2">Manager Profile</h2>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
