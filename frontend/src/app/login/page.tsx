"use client";

import { useState } from "react";
import axios from "axios";
import api from "../services/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const router = useRouter();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError("All fields are required");
      setSuccess("");
      return;
    }

    setError("");
    setSuccess("");

    try {
      const response = await api.post("/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", response.data.access_token);
      setSuccess("Login successful");
      router.push("/dashboard");
    } catch (error: any) {
      setError(error.response?.data?.message || "Login failed");

      setSuccess("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Manager Login
        </h1>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-2 font-medium text-black">
              Username
            </label>

            <input
              type="text"
              placeholder="Enter username"
              className="w-full border border-gray-300 p-3 rounded-lg text-black placeholder-gray-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium text-black">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              className="w-full border border-gray-300 p-3 rounded-lg text-black placeholder-gray-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {success && (
            <div className="bg-green-100 text-green-600 border border-green-300 p-3 rounded-lg mb-4 text-sm">
              {success}
            </div>
          )}

          {error && (
            <div className="bg-red-100 text-red-600 border border-red-300 p-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="w-full mt-4 text-black p-3 rounded-lg hover:bg-blue-600"
          >
            Back to Home Page
          </button>
        </form>
      </div>
    </div>
  );
}
