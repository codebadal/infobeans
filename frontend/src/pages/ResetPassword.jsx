import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AuthAPI } from "../api.js";
import { toast } from "../utils/toast.js";

export default function ResetPassword() {
  const [sp] = useSearchParams();
  const nav = useNavigate();
  const token = sp.get("token") || "";
  const id = sp.get("id") || "";
  const [pw, setPw] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await AuthAPI.reset({ userId: id, token, newPassword: pw });
      toast.ok("Password reset. Please login.");
      nav("/login");
    } catch (e) {
      toast.err(e);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg p-8 shadow-lg">
        <h3 className="text-2xl font-semibold text-center text-gray-900 mb-6">
          Reset Password 🔑
        </h3>

        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-medium rounded-md hover:opacity-90 transition"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
