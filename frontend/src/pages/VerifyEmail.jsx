import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthAPI, PaymentAPI } from "../api";
import { toast } from "../utils/toast";
import useRazorpay from "../hooks/useRazorpay";

export default function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const { openCheckout } = useRazorpay();
  const { state } = useLocation();
  const navigate = useNavigate();

  const email = state?.email;
  const name = state?.name || "Student";
  const mobile = state?.mobile || "";

  if (!email) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-red-600 font-bold">
          ❌ No email provided. Please register again.
        </p>
      </div>
    );
  }

  const verifyAndPay = async (e) => {
    e.preventDefault();
    try {
      // 🔹 1. Verify Email OTP
      const res = await AuthAPI.verifyEmail({ email, otp });

      toast.ok("✅ Email verified. Proceeding to payment...");

      const orderId = res?.order?.id;
      const amountPaise = res?.order?.amount;

      if (!orderId) {
        toast.err("❌ Payment order not created");
        return;
      }

      // 🔹 2. Open Razorpay checkout
      openCheckout({
        orderId,
        amountPaise,
        name,
        email,
        contact: mobile,
        onSuccess: async (rp) => {
          try {
            await PaymentAPI.verify({
              orderId: rp.razorpay_order_id,
              paymentId: rp.razorpay_payment_id,
              signature: rp.razorpay_signature,
            });
            alert(
              "🎉 Payment successful! Your account is now activated. You can login."
            );
            navigate("/login");
          } catch (err) {
            toast.err(err.message);
          }
        },
        onFailure: (err) => toast.err(err),
      });
    } catch (err) {
      toast.err(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdf7f2] px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 border border-red-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Verify Your Email
        </h2>
        <p className="text-gray-600 text-center mb-6">
          An OTP has been sent to <b>{email}</b>. Enter it below to verify your
          email.
        </p>

        <form onSubmit={verifyAndPay} className="space-y-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            required
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-400 focus:border-red-400"
          />
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
          >
            Verify & Pay ₹{100}
          </button>
        </form>
      </div>
    </div>
  );
}
