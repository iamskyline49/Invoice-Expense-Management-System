"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import api from "../../services/api";

export default function ProfilePage() {
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [socialLink, setSocialLink] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");
  const getProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/manager/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setName(response.data.data.name);
      setUsername(response.data.data.username);
      setEmail(response.data.data.email);
      setSocialLink(response.data.data.socialLink);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    try {
      const token = localStorage.getItem("token");
      const requestData: any = {
        name,
        username,
        email,
        currentPassword,
        socialLink,
      };

      if (newPassword.trim() !== "") {
        requestData.newPassword = newPassword;
      }

      await api.put("/manager/profile", requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess("Profile updated successfully");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Update failed");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-20 text-2xl text-black">Loading...</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex items-center justify-center min-h-[85vh]">
        <form
          onSubmit={updateProfile}
          className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
        >
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
            Manager Profile
          </h1>

          <div className="mb-4">
            <label className="block mb-2 font-medium text-black">
              Username
            </label>

            <div className="w-full border border-gray-300 p-3 rounded-lg bg-gray-100 text-black cursor-not-allowed">
              {username}
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium text-black">Name</label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg text-black"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium text-black">Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg text-black"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium text-black">
              Current Password
            </label>

            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg text-black"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium text-black">
              New Password
            </label>

            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Leave empty if not changing password"
              className="w-full border border-gray-300 p-3 rounded-lg text-black"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-medium text-black">
              Social Link
            </label>

            <input
              type="text"
              value={socialLink}
              onChange={(e) => setSocialLink(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg text-black"
            />
          </div>

          {success && (
            <div className="bg-green-100 text-green-600 border border-green-300 p-3 rounded-lg mb-4 text-center">
              {success}
            </div>
          )}

          {error && (
            <div className="bg-red-100 text-red-600 border border-red-300 p-3 rounded-lg mb-4 text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}
