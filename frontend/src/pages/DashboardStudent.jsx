// import { useEffect, useState } from 'react';
// import { ExamAPI, SubmissionAPI } from '../api.js';
// import { Link } from 'react-router-dom';
// import { toast } from '../utils/toast.js';

// export default function DashboardStudent() {
//   const [exams, setExams] = useState([]);
//   const [subs, setSubs] = useState([]);

//   useEffect(() => {
//     (async () => {
//       try {
//         const allExams = await ExamAPI.list();
//         // Only show exams that are LIVE
//         setExams(allExams.filter(ex => ex.isLive));
//         setSubs(await SubmissionAPI.mine());
//       } catch (e) {
//         toast.err(e);
//       }
//     })();
//   }, []);


//   return (
//     <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
//       {/* Available Exams */}
//       <div className="max-w-4xl mx-auto mb-10">
//         <h3 className="text-2xl font-bold text-blue-400 mb-4">
//           📘 Available Exams
//         </h3>
//         {exams.length === 0 ? (
//           <p className="text-gray-400">No live exams available right now.</p>
//         ) : (
//           <ul className="space-y-4">
//             {exams.map((e) => (
//               <li
//                 key={e._id}
//                 className="bg-gray-800 border border-gray-700 rounded-lg p-5 flex flex-col md:flex-row md:items-center md:justify-between hover:bg-gray-750 transition"
//               >
//                 <div>
//                   <p className="text-lg font-semibold text-gray-100">
//                     {e.title}
//                   </p>
//                   <p className="text-sm text-gray-400">
//                     {e.subject} • Total Marks:{" "}
//                     <span className="text-green-400">{e.totalMarks}</span>
//                   </p>
//                 </div>
                
                
//                 <Link
//                   to={`/attempt/${e._id}`}
//                   className="mt-3 md:mt-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition"
//                 >
//                   Attempt
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* Submissions */}
//       <div className="max-w-4xl mx-auto">
//         <h3 className="text-2xl font-bold text-green-400 mb-4">
//           📝 My Submissions
//         </h3>
//         {subs.length === 0 ? (
//           <p className="text-gray-400">You haven’t attempted any exams yet.</p>
//         ) : (
//           <ul className="space-y-4">
//             {subs.map((s) => (
//               <li
//                 key={s._id}
//                 className="bg-gray-800 border border-gray-700 rounded-lg p-5 flex flex-col md:flex-row md:items-center md:justify-between"
//               >
//                 <div>
//                   <p className="text-lg font-semibold text-gray-100">
//                     {s.exam?.title || "Unknown Exam"}
//                   </p>
//                   <p className="text-sm text-gray-400">
//                     Score:{" "}
//                     <span className="text-yellow-400">{s.totalScore}</span>
//                   </p>
//                 </div>
//                 <span
//                   className={`mt-3 md:mt-0 px-4 py-1 rounded-full text-sm font-medium ${
//                     s.isPass
//                       ? "bg-green-600 text-white"
//                       : "bg-red-600 text-white"
//                   }`}
//                 >
//                   {s.isPass ? "PASS" : "FAIL"}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }













import { useEffect, useState } from "react";
import { ExamAPI, SubmissionAPI } from "../api.js";
import { Link } from "react-router-dom";
import { toast } from "../utils/toast.js";
import { FiBookOpen, FiCheckCircle, FiXCircle } from "react-icons/fi";

export default function DashboardStudent() {
  const [exams, setExams] = useState([]);
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const allExams = await ExamAPI.list();
        setExams(allExams.filter((ex) => ex.isLive));
        setSubs(await SubmissionAPI.mine());
      } catch (e) {
        toast.err(e);
      }
    })();
  }, []);

  const attemptedExamIds = new Set(subs.map((s) => s.exam?._id));

  return (
    <div className="min-h-screen bg-[#fdf7f2] text-gray-800 p-6">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Available Exams */}
        <div>
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <FiBookOpen /> Available Exams
          </h3>
          <div className="space-y-4">
            {exams.length === 0 ? (
              <p className="text-gray-500 italic">No live exams available right now.</p>
            ) : (
              exams.map((e) => {
                const alreadyAttempted = attemptedExamIds.has(e._id);
                return (
                  <div
                    key={e._id}
                    className="bg-white border border-gray-200 rounded-lg shadow-md p-5 hover:shadow-lg transition"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="text-lg font-semibold">{e.title}</p>
                        <p className="text-sm text-gray-500">
                          {e.subject} • Total Marks:{" "}
                          <span className="text-red-700 font-medium">{e.totalMarks}</span>
                        </p>
                      </div>

                      {alreadyAttempted ? (
                        <button
                          disabled
                          className="mt-3 md:mt-0 px-5 py-2 rounded bg-gray-400 text-white cursor-not-allowed"
                        >
                          Already Attempted
                        </button>
                      ) : (
                        <Link
                          to={`/attempt/${e._id}`}
                          className="mt-3 md:mt-0 px-5 py-2 rounded bg-red-700 text-white shadow-md hover:shadow-lg hover:shadow-red-300"
                        >
                          Attempt
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Submissions */}
        <div>
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <FiCheckCircle /> My Submissions
          </h3>
          <div className="space-y-4">
            {subs.length === 0 ? (
              <p className="text-gray-500 italic">You haven’t attempted any exams yet.</p>
            ) : (
              subs.map((s) => (
                <div
                  key={s._id}
                  className="bg-white border border-gray-200 rounded-lg shadow-md p-5 flex flex-col md:flex-row md:items-center md:justify-between hover:shadow-lg transition"
                >
                  <div>
                    <p className="text-lg font-semibold">
                      {s.exam?.title || "Unknown Exam"}
                    </p>
                    <p className="text-sm text-gray-500">
                      Score:{" "}
                      <span className="text-red-700 font-medium">{s.totalScore}</span>
                    </p>
                  </div>
                  <span
                    className={`mt-3 md:mt-0 px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${
                      s.isPass
                        ? "bg-gray-600 text-white"
                        : "bg-red-700 text-white"
                    }`}
                  >
                    {s.isPass ? (
                      <>
                        <FiCheckCircle /> PASS
                      </>
                    ) : (
                      <>
                        <FiXCircle /> FAIL
                      </>
                    )}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
