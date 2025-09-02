import { useState } from "react";
import { AuthAPI } from "../api.js";
import { toast } from "../utils/toast.js";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false); // ✅ checkbox state
  const navigate = useNavigate();

  const startRegistration = async (e) => {
    e.preventDefault();
    if (!agree) {
      toast.err("⚠️ Please accept the Terms & Conditions to continue.");
      return;
    }
    try {
      const res = await AuthAPI.register({ name, email, mobile, password });
      toast.ok(res.message || "Registered! Please verify your email.");

      // ✅ OTP verify page pe bhejna with full details
      navigate("/verify-email", { state: { email, name, mobile } });
    } catch (e) {
      toast.err(e.response?.data?.message || e.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdf7f2] px-4">
      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden border border-red-200">
        {/* Left Form Section */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Student Registration
          </h2>
          <form onSubmit={startRegistration} className="space-y-4">
            <input
              type="text"
              pattern="[A-Za-z]+( [A-Za-z]+)*"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-md bg-white border border-gray-300"
            />
            <input
              type="tel"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              maxLength={10}
              minLength={10}
              required
              className="w-full px-4 py-2 rounded-md bg-white border border-gray-300"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-md bg-white border border-gray-300"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              minLength={6}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-md bg-white border border-gray-300"
            />

            {/* ✅ Terms & Conditions Checkbox */}
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-1"
              />
              <p className="text-xs text-gray-700">
                I agree to the <b>Terms & Conditions</b>:
                <ul className="list-disc ml-5 mt-1 space-y-1">
                  <li>
                    After clearing the exam, student must submit required
                    documents (10th, 12th, Income, College Degree, etc.).
                  </li>
                  <li>
                    Admission process will continue only after document
                    verification.
                  </li>
                  <li>
                    Attendance of minimum 75% is mandatory during training.
                  </li>
                  <li>
                    Misconduct or violation of rules may lead to cancellation of
                    admission.
                  </li>
                </ul>
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition disabled:opacity-50"
              disabled={!agree}
            >
              Register
            </button>
          </form>
          <p className="text-xs text-gray-600 mt-4 text-center">
            After registration, verify your email to continue.
          </p>
        </div>

        {/* Right Welcome Section */}
        <div className="w-1/2 bg-white/30 backdrop-blur-md text-gray-800 flex flex-col items-center justify-center p-10">
          <h2 className="text-4xl font-bold mb-4">Welcome</h2>
          <p className="text-center text-lg opacity-90">
            Join our student portal and access exams, results, and more with a
            simple registration process.
          </p>
        </div>
      </div>
    </div>
  );
}
