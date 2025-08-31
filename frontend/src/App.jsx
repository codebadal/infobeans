// css change -------------------- 


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
import Footer from "./components/footer.jsx";
import About from "./pages/About.jsx";
import GeminiAIComponent from "./pages/ai.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-[#fff8f0] flex flex-col text-gray-800">
      {/* Navbar edge-to-edge */}
      <NavBar />

      {/* Page content with spacing */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* new .............. */}
          <Route path="/verify-email" element={<VerifyEmail />} />  
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/about" element={<About/>}/>
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
        className="w-screen h-[400px] object-cover shadow-md brightness-95 hover:brightness-100 transition duration-500"
      />

      {/* Info Card */}
      <div
        className="bg-white border border-gray-200 shadow-lg rounded-2xl p-10 max-w-2xl -mt-20 relative z-10 
                  transform transition duration-500 hover:scale-105 hover:shadow-xl hover:shadow-red-200"
      >
        <h2 className="text-3xl font-bold text-red-500 mb-4 tracking-wide hover:text-red-600 transition duration-300">
          InfoBeans Foundation
        </h2>
        <p className="text-gray-700 leading-relaxed hover:text-gray-900 transition duration-300">
          We believe in steady contributions to the environment and society that
          we live in. As a global technology leader, InfoBeans is committed to
          increase digital literacy and create a sustainable and self-reliant
          community.
        </p>

        {/* Links */}
        <div className="mt-8 flex justify-center gap-6">
          <Link
            to="/login"
            className="px-6 py-2.5 rounded-md font-medium bg-red-700 text-white shadow-md hover:shadow-lg hover:shadow-red-300 
                   transform hover:-translate-y-1 transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-6 py-2.5 rounded-md font-medium bg-gray-600 text-white shadow-md hover:shadow-lg hover:shadow-gray-400 
                   transform hover:-translate-y-1 transition duration-300"
          >
            Register
          </Link>
        </div>
      </div>

      <CommunityInitiatives />
      <GeminiAIComponent/>
      <Footer />
    </div>
  );
}
