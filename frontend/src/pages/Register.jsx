// import { useState } from "react";
// import { AuthAPI, PaymentAPI } from "../api.js";
// import { toast } from "../utils/toast.js";
// import useRazorpay from "../hooks/useRazorpay.js";

// export default function Register() {
//   const [name, setName] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { openCheckout } = useRazorpay();

//   const startRegistration = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await AuthAPI.register({ name, email, mobile, password });

//       const orderId = res?.order?.id;
//       const amountPaise = res?.order?.amount;
//       if (!orderId) {
//         toast.err("Order not created");
//         return;
//       }

//       openCheckout({
//         orderId,
//         amountPaise,
//         name,
//         email,
//         contact: mobile,
//         onSuccess: async (rp) => {
//           try {
//             await PaymentAPI.verify({
//               orderId: rp.razorpay_order_id,
//               paymentId: rp.razorpay_payment_id,
//               signature: rp.razorpay_signature,
//             });
//             alert("✅ Payment successful. Your account is activated. You can now login.");
//           } catch (e) {
//             toast.err(e);
//           }
//         },
//         onFailure: (err) => toast.err(err),
//       });
//     } catch (e) {
//       toast.err(e);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4"
//     style={{ backgroundImage: "url('/rbg.png')" }}
//     >
//       <div className="flex w-full max-w-4xl bg-gray-800 rounded-lg shadow-2xl overflow-hidden border border-gray-700">

//         {/* Left Form Section */}
//         <div className="w-1/2 p-10 flex flex-col justify-center">
//           <h2 className="text-3xl font-bold text-gray-100 mb-6 text-center">
//             Student Registration
//           </h2>
//           <form onSubmit={startRegistration} className="space-y-4">
//             <input
//               type="text"
//               placeholder="Full Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//               className="w-full px-4 py-2 rounded-md bg-gray-900 border border-gray-600
//                          text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
//             />
//             <input
//               type="tel"
//               placeholder="Mobile Number"
//               value={mobile}
//               onChange={(e) => setMobile(e.target.value)}
//               maxLength={10}
//               minLength={10}
//               required
//               className="w-full px-4 py-2 rounded-md bg-gray-900 border border-gray-600
//                          text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full px-4 py-2 rounded-md bg-gray-900 border border-gray-600
//                          text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               minLength={6}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full px-4 py-2 rounded-md bg-gray-900 border border-gray-600
//                          text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
//             />
//             <button
//               type="submit"
//               className="w-full bg-gradient-to-r from-indigo-500 to-violet-500
//                          text-white py-2 rounded-md hover:opacity-90 transition"
//             >
//               Register & Pay ₹100
//             </button>
//           </form>
//           <p className="text-xs text-gray-400 mt-4 text-center">
//             After successful payment, your account becomes <b className="text-indigo-400">active</b>.
//           </p>
//         </div>

//         {/* Right Welcome Section */}
//         <div className="w-1/2 bg-gradient-to-br from-indigo-600 to-violet-700
//                         text-white flex flex-col items-center justify-center p-10"
//                         style={{ backgroundImage: "url('/rbg.png')" }}
//                         >
//           <h2 className="text-4xl font-bold mb-4">Welcome</h2>
//           <p className="text-center text-lg opacity-90">
//             Join our student portal and access exams, results, and more with a
//             simple registration process.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { AuthAPI, PaymentAPI } from "../api.js";
import { toast } from "../utils/toast.js";
import useRazorpay from "../hooks/useRazorpay.js";

export default function Register() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { openCheckout } = useRazorpay();

  const startRegistration = async (e) => {
    e.preventDefault();
    try {
      const res = await AuthAPI.register({ name, email, mobile, password });

      const orderId = res?.order?.id;
      const amountPaise = res?.order?.amount;
      if (!orderId) {
        toast.err("Order not created");
        return;
      }

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
              "✅ Payment successful. Your account is activated. You can now login."
            );
          } catch (e) {
            toast.err(e);
          }
        },
        onFailure: (err) => toast.err(err),
      });
    } catch (e) {
      toast.err(e);
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
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-md bg-white border border-gray-300 
                         text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-red-400 focus:border-red-400"
            />
            <input
              type="tel"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              maxLength={10}
              minLength={10}
              required
              className="w-full px-4 py-2 rounded-md bg-white border border-gray-300 
                         text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-red-400 focus:border-red-400"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-md bg-white border border-gray-300 
                         text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-red-400 focus:border-red-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              minLength={6}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-md bg-white border border-gray-300 
                         text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-red-400 focus:border-red-400"
            />
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
            >
              Register & Pay ₹100
            </button>
          </form>
          <p className="text-xs text-gray-600 mt-4 text-center">
            After successful payment, your account becomes{" "}
            <b className="text-red-600">active</b>.
          </p>
        </div>

        {/* Right Welcome Section */}
        <div
          className="w-1/2 bg-white/30 backdrop-blur-md 
                text-gray-800 flex flex-col items-center justify-center p-10"
        >
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
