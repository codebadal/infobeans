// import React, { useState, useEffect } from "react";

// export default function About() {
//   const images = ["stu/cl2.png","stu/cl3.png", "stu/cl4.png", "stu/cl1.png"];
//   const [current, setCurrent] = useState(0);

//   // Auto play every 3 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [images.length]);

  

//   return (
//     <section className="bg-[#f9f6ef] py-12 px-6 md:px-16">
//       <div className="max-w-5xl mx-auto">
//         {/* Carousel Section */}
//         <div className="relative w-full max-w-4xl mx-auto mb-10">
//           <div className="overflow-hidden relative h-64 md:h-96 rounded-lg">
//             {images.map((src, index) => (
//               <div
//                 key={index}
//                 className={`absolute inset-0 transition-opacity duration-1000 ${
//                   index === current ? "opacity-100" : "opacity-0"
//                 }`}
//               >
//                 <img
//                   src={src}
//                   alt={`Slide ${index + 1}`}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             ))}
//           </div>

         

//           {/* Indicators */}
//           <div className="flex justify-center mt-3 space-x-2">
//             {images.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrent(index)}
//                 className={`w-3 h-3 rounded-full ${
//                   index === current ? "bg-red-600" : "bg-gray-400"
//                 }`}
//               ></button>
//             ))}
//           </div>
//         </div>

//         {/* About Section Content */}

//         {/* 👇 baaki tumhara ITEP aur Key Achievements content yaha daal do */}
//       </div>
//       <section className="bg-[#f9f6ef] py-12 px-6 md:px-16">
//         <div className="max-w-5xl mx-auto">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
//             InfoBeans Foundation
//           </h2>

//           <p className="text-gray-700 text-lg leading-relaxed mb-6">
//             InfoBeans Foundation is the CSR arm of <b>InfoBeans Technologies</b>
//             , headquartered in Indore, Madhya Pradesh. The foundation is
//             dedicated to bridging the digital divide and uplifting
//             underprivileged communities through <b>education</b>,{" "}
//             <b>environmental initiatives</b>, and <b>community support</b>. With
//             a vision to create sustainable impact, it focuses on nurturing
//             talent, protecting nature, and empowering lives.
//           </p>

//           <p className="text-gray-700 text-lg leading-relaxed mb-6">
//             The foundation operates multiple initiatives such as the{" "}
//             <b>Information Technology Excellence Program (ITEP)</b> that
//             provides free, year-long IT training to students, large-scale{" "}
//             <b>afforestation projects</b>, and community-driven programs like{" "}
//             <b>blood donation drives</b> and <b>disaster relief support</b>.
//           </p>

//           <section className="bg-[#f9f6ef] py-12 px-6 md:px-16">
//             <div className="max-w-5xl mx-auto">
//               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
//                 Information Technology Excellence Program{" "}
//                 <span className="text-red-600">(ITEP)</span>
//               </h2>

//               <p className="text-gray-700 text-lg leading-relaxed mb-6">
//                 The <b>Information Technology Excellence Program (ITEP)</b> is a
//                 <b> free, one-year, full-time training program</b> run by{" "}
//                 <b>InfoBeans Foundation</b>. It is designed especially for
//                 underprivileged students to make them employment-ready in the IT
//                 industry by teaching software programming and English language
//                 skills.
//               </p>

//               <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
//                 🎯 Goals
//               </h3>
//               <ul className="list-disc pl-6 space-y-2 text-gray-700 text-lg">
//                 <li>
//                   Provide free training in software programming & English.
//                 </li>
//                 <li>Bridge the digital divide for underprivileged youth.</li>
//                 <li>Build confidence, communication, and life skills.</li>
//               </ul>

//               <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
//                 🖥️ Curriculum
//               </h3>
//               <ul className="list-disc pl-6 space-y-2 text-gray-700 text-lg">
//                 <li>Programming: Java, MySQL, React.js, Angular.js, HTML5</li>
//                 <li>English communication for business & interviews</li>
//                 <li>Computer literacy: Word, Excel, PowerPoint</li>
//                 <li>Hardware basics: Computer & mobile repair (optional)</li>
//               </ul>

//               <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
//                 👨‍🏫 Training Style
//               </h3>
//               <p className="text-gray-700 text-lg leading-relaxed mb-6">
//                 Training is conducted in <b>air-conditioned computer labs</b>{" "}
//                 with genuine software and hardware. Sessions include hands-on
//                 practice, daily English improvement classes, and guidance from
//                 skilled IT professionals.
//               </p>

//               <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
//                 ✅ Selection Process
//               </h3>
//               <ul className="list-disc pl-6 space-y-2 text-gray-700 text-lg">
//                 <li>Written Exam</li>
//                 <li>Personal Interview</li>
//                 <li>Home Visit (to validate economic status)</li>
//               </ul>

//               <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
//                 🏆 Achievements
//               </h3>
//               <ul className="list-disc pl-6 space-y-2 text-gray-700 text-lg">
//                 <li>200+ students trained so far.</li>
//                 <li>
//                   Out of 113 students in first 4 batches →{" "}
//                   <b>106 placed in IT companies</b>.
//                 </li>
//                 <li>3 modern training centers established in Indore.</li>
//               </ul>

//               <p className="text-gray-700 text-lg leading-relaxed mt-8">
//                 👉 <b>ITEP is 100% free</b>, ensuring talented students from
//                 underprivileged backgrounds can build successful IT careers.
//               </p>
//             </div>
//           </section>

//           <h3 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">
//             Key Achievements
//           </h3>
//           <ul className="list-disc pl-6 text-gray-700 space-y-2 text-lg">
//             <li>200+ students trained and placed through the ITEP program.</li>
//             <li>
//               Established 3 training centers in Indore with modern facilities.
//             </li>
//             <li>
//               Planted 5,000+ trees and developed sustainable water projects.
//             </li>
//             <li>
//               Recognized with <b>12A</b> and <b>80G certifications</b> for
//               transparency and compliance.
//             </li>
//           </ul>

//           <p className="text-gray-700 text-lg leading-relaxed mt-8">
//             InfoBeans Foundation continues to scale its reach with the goal of
//             expanding education programs to more cities, restoring the
//             environment, and supporting critical human needs. It envisions a
//             future where every individual has the opportunity to thrive in the
//             digital world.
//           </p>
//         </div>
//       </section>
//     </section>
//   );
// }







import { useState } from "react";
import { FiUsers, FiBook, FiSmile } from "react-icons/fi";
import TrainerCard from "./TrainerCard";
import AboutFoundation from "./AboutFoundation";
import Celebration from "./Celebration";

export default function About() {
  const [activeTab, setActiveTab] = useState("foundation");

  // Trainers data
  const trainers = [
    {
      src: "stu/mern.png",
      name: "Rohit Mehta",
      role: "Technical Trainer - MERN Stack",
      desc: "Expert in MongoDB, Express, React, and Node.js. Passionate about building scalable web apps and guiding learners into full-stack development.",
    },
    {
      src: "stu/java.png",
      name: "Sneha Kapoor",
      role: "Technical Trainer - Java",
      desc: "Specialist in Java, Spring Boot, and backend development. Focused on strong programming foundations and practical projects.",
    },
    {
      src: "stu/softskills.png",
      name: "Amit Verma",
      role: "Soft Skills Trainer - English & Communication",
      desc: "Dedicated to improving communication, public speaking, and personality development for students.",
    },
    {
      src: "stu/director.png",
      name: "Anjali Sharma",
      role: "Director",
      desc: "Leading with vision and commitment to empower students with technical excellence and holistic growth.",
      label: "Our Director",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#fdf7f2] text-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg border-r border-gray-200 p-6">
        <h2 className="text-xl font-bold mb-6 text-gray-800 fixed left-12 top-24">About Us</h2>
        <ul className="space-y-3 fixed top-40">
          <li>
            <button
              onClick={() => setActiveTab("foundation")}
              className={`flex items-center gap-2 w-full text-left px-4 py-2 rounded-lg transition 
                ${
                  activeTab === "foundation"
                    ? "bg-gray-600 text-white shadow-md"
                    : "hover:bg-gray-100"
                }`}
            >
              <FiBook /> About Foundation
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("trainers")}
              className={`flex items-center gap-2 w-full text-left px-4 py-2 rounded-lg transition 
                ${
                  activeTab === "trainers"
                    ? "bg-gray-600 text-white shadow-md"
                    : "hover:bg-gray-100"
                }`}
            >
              <FiUsers /> About Trainers
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("celebrations")}
              className={`flex items-center gap-2 w-full text-left px-4 py-2 rounded-lg transition 
                ${
                  activeTab === "celebrations"
                    ? "bg-gray-600 text-white shadow-md"
                    : "hover:bg-gray-100"
                }`}
            >
              <FiSmile /> Celebrations
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 space-y-6">
        {/* Foundation Section */}
        {activeTab === "foundation" && (
          // <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-6">
          //   <h3 className="text-2xl font-bold mb-4 text-gray-700">
          //     InfoBeans Foundation
          //   </h3>
          //   <p className="text-gray-700 text-lg mb-4 leading-relaxed">
          //     InfoBeans Foundation is the CSR arm of{" "}
          //     <b>InfoBeans Technologies</b>, headquartered in Indore, Madhya
          //     Pradesh. The foundation is dedicated to bridging the digital
          //     divide and uplifting underprivileged communities through{" "}
          //     <b>education</b>, <b>environmental initiatives</b>, and{" "}
          //     <b>community support</b>.
          //   </p>
          // </div>


          <div className="space-y-10">
            <h3 className="text-3xl font-bold text-gray-700 mb-6">
              InfoBeans Foundation
            </h3>
            <AboutFoundation/>
          </div>
        )}

        {/* Trainers Section */}
        {activeTab === "trainers" && (
          <div className="space-y-10">
            <h3 className="text-3xl font-bold text-gray-700 mb-6">
              Meet Our Team
            </h3>
            <TrainerCard/>
          </div>
        )}

        {/* Celebrations Section */}
        {activeTab === "celebrations" && (
          
           <Celebration/>
          
        )}
      </div>
    </div>
  );
}
