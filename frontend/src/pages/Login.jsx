// import { useState } from "react";
// import { AuthAPI } from "../api.js";
// import { useAuth } from "../context/AuthContext.jsx";
// import { toast } from "../utils/toast.js";
// import { useNavigate, Link } from "react-router-dom";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { login } = useAuth();
//   const nav = useNavigate();

//   const submit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await AuthAPI.login({ email, password });
//       login(res.token, res.user);
//       toast.ok("Logged in");
//       if (res.user.role === "student") nav("/student");
//       else if (res.user.role === "trainer") nav("/trainer");
//       else nav("/admin");
//     } catch (e) {
//       toast.err(e);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
//       <div className="w-full max-w-md bg-gray-800 border border-gray-700 rounded-lg p-8 shadow-lg">
//         <h2 className="text-2xl font-semibold text-center text-gray-100 mb-6">
//           Welcome Back 👋
//         </h2>

//         <form onSubmit={submit} className="space-y-5">
//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-900 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-900 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full py-2 bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-medium rounded-md hover:opacity-90 transition"
//           >
//             Login
//           </button>
//         </form>

//         <p className="text-center text-sm text-gray-400 mt-5">
//           <Link
//             to="/forgot"
//             className="text-indigo-400 hover:text-indigo-300 font-medium"
//           >
//             Forgot password?
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }







import { useState } from "react";
import { AuthAPI } from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { toast } from "../utils/toast.js";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await AuthAPI.login({ email, password });
      login(res.token, res.user);
      toast.ok("Logged in");
      if (res.user.role === "student") nav("/student");
      else if (res.user.role === "trainer") nav("/trainer");
      else nav("/admin");
    } catch (e) {
      toast.err(e);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdf7f2] px-4">
      <div className="w-full max-w-md bg-white border border-pink-200 rounded-lg p-8 shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Welcome Back 👋
        </h2>

        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-5">
          <Link
            to="/forgot"
            className="text-red-600 hover:text-red-700 font-medium"
          >
            Forgot password?
          </Link>
        </p>
      </div>
    </div>
  );
}

