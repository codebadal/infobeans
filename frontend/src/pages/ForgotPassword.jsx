// import { useState } from 'react';
// import { AuthAPI } from '../api.js';
// import { toast } from '../utils/toast.js';

// export default function ForgotPassword() {
//   const [email, setEmail] = useState('');

//   const submit = async (e) => {
//     e.preventDefault();
//     try {
//       await AuthAPI.forgot({ email });
//       toast.ok('If account exists, reset link will be sent to email.');
//     } catch (e) {
//       toast.err(e);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-900">
//       <div className="bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md border border-gray-700">
//         <h3 className="text-2xl font-semibold text-center mb-6 text-gray-100">
//           Forgot Password
//         </h3>

//         <form onSubmit={submit} className="space-y-4">
//           <input
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="w-full px-4 py-2 rounded bg-gray-900 border border-gray-600 
//                        text-gray-100 placeholder-gray-400 
//                        focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />

//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r from-indigo-500 to-violet-500 
//                        text-white py-2 rounded-md hover:opacity-90 transition"
//           >
//             Send Reset Email
//           </button>
//         </form>

//         <p className="text-sm text-gray-400 text-center mt-4">
//           Remember your password?{" "}
//           <a href="/login" className="text-indigo-400 hover:text-indigo-300 underline">
//             Login
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }






import { useState } from 'react';
import { AuthAPI } from '../api.js';
import { toast } from '../utils/toast.js';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [pw, setPw] = useState('');

  const sendOTP = async (e) => {
    e.preventDefault();
    try {
      await AuthAPI.forgot({ email }); // backend sends OTP
      toast.ok('If account exists, OTP will be sent to your email.');
      setOtpSent(true);
    } catch (e) {
      toast.err(e);
    }
  };

  const resetWithOTP = async (e) => {
    e.preventDefault();
    try {
      await AuthAPI.resetWithOTP({ email, otp, newPassword: pw });
      toast.ok('Password reset successful. Please login.');
      window.location.href = '/login';
    } catch (e) {
      toast.err(e);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md border border-gray-700">
        <h3 className="text-2xl font-semibold text-center mb-6 text-gray-100">
          Forgot Password
        </h3>

        {!otpSent ? (
          <form onSubmit={sendOTP} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded bg-gray-900 border border-gray-600 
                        text-gray-100 placeholder-gray-400 
                        focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-violet-500 
                        text-white py-2 rounded-md hover:opacity-90 transition"
            >
              Send OTP
            </button>
          </form>
        ) : (
          <form onSubmit={resetWithOTP} className="space-y-4">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full px-4 py-2 rounded bg-gray-900 border border-gray-600 text-gray-100"
            />
            <input
              type="password"
              placeholder="Enter new password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              required
              className="w-full px-4 py-2 rounded bg-gray-900 border border-gray-600 text-gray-100"
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white py-2 rounded-md hover:opacity-90 transition"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
