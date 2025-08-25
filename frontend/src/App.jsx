import { Routes, Route, Link } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import Protected from "./components/Protected.jsx";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import DashboardStudent from "./pages/DashboardStudent.jsx";
import AttemptExam from "./pages/AttemptExam.jsx";
import DashboardTrainer from "./pages/DashboardTrainer.jsx";
import DashboardAdmin from "./pages/DashboardAdmin.jsx";
import Batches from "./pages/Batches.jsx";
import CommunityInitiatives from "./components/community.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col text-gray-100">
      {/* Navbar edge-to-edge */}
      <NavBar />

      {/* Page content with spacing */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route
            path="/student"
            element={
              <Protected roles={["student"]}>
                <DashboardStudent />
              </Protected>
            }
          />
          <Route
            path="/attempt/:examId"
            element={
              <Protected roles={["student"]}>
                <AttemptExam />
              </Protected>
            }
          />

          <Route
            path="/trainer"
            element={
              <Protected roles={["trainer", "admin"]}>
                <DashboardTrainer />
              </Protected>
            }
          />
          <Route
            path="/admin"
            element={
              <Protected roles={["admin"]}>
                <DashboardAdmin />
              </Protected>
            }
          />
          <Route
            path="/batches"
            element={
              <Protected roles={["trainer", "admin"]}>
                <Batches />
              </Protected>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

function Home() {
  return (
    <div className="flex flex-col items-center text-center space-y-8">
      {/* Full Width Banner Image */}
      <img
        src="/group1.png"
        alt="img1"
        className="w-screen h-[400px] object-cover"
      />

      {/* Info Card */}
      <div className="bg-gray-800 border border-gray-700 shadow-lg rounded-lg p-8 max-w-2xl -mt-20 relative z-10">
        <h2 className="text-3xl font-bold text-gray-100 mb-4">
          InfoBeans Foundation
        </h2>
        <p className="text-gray-300 leading-relaxed">
          We believe in steady contributions to the environment and society that
          we live in. As a global technology leader, InfoBeans is committed to
          increase digital literacy and create a sustainable and self-reliant
          community.
        </p>

        {/* Links */}
        <div className="mt-6 flex justify-center gap-6">
          <Link
            to="/login"
            // style={{backgroundColor:"wheat"}}
            className="px-5 py-2 bg-gradient-to-r from-indigo-500 to-violet-600 
                       text-white rounded-md hover:opacity-90 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-5 py-2 bg-gradient-to-r from-green-500 to-emerald-600 
                       text-white rounded-md hover:opacity-90 transition"
          >
            Register
          </Link>
        </div>
      </div>
      <CommunityInitiatives/>
    </div>
  );
}
