// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { QuestionAPI, SubmissionAPI } from "../api.js";
// import { toast } from "../utils/toast.js";

// export default function AttemptExam() {
//   const { examId } = useParams();
//   const nav = useNavigate();
//   const [questions, setQuestions] = useState([]);
//   const [answers, setAnswers] = useState({});

//   useEffect(() => {
//     (async () => {
//       try {
//         setQuestions(await QuestionAPI.listForExam(examId));
//       } catch (e) {
//         toast.err(e);
//       }
//     })();
//   }, [examId]);

//   const submit = async () => {
//     try {
//       const payload = {
//         examId,
//         answers: Object.entries(answers).map(([qid, ans]) => ({
//           questionId: qid,
//           answer: ans,
//         })),
//       };
//       await SubmissionAPI.submit(payload);
//       alert("Submitted. Check your result in submissions.");
//       nav("/student");
//     } catch (e) {
//       toast.err(e);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-gray-100 py-10 px-4">
//       <div className="max-w-3xl mx-auto bg-gray-800 shadow-lg rounded-xl p-8 border border-gray-700">
//         <h3 className="text-2xl font-bold text-blue-400 mb-6 text-center">
//           Attempt Exam
//         </h3>

//         {questions.map((q, idx) => (
//           <div
//             key={q._id}
//             className="mb-6 p-5 border border-gray-700 rounded-lg bg-gray-700/50"
//           >
//             <div className="font-medium text-gray-100 mb-3">
//               <span className="font-bold text-green-400">Q{idx + 1}:</span>{" "}
//               {q.text}{" "}
//               <span className="text-sm text-gray-400">({q.marks} marks)</span>
//             </div>

//             {q.type === "mcq" ? (
//               <div className="space-y-2">
//                 {q.options.map((opt) => (
//                   <label
//                     key={opt}
//                     className="flex items-center space-x-2 cursor-pointer text-gray-200 hover:text-white"
//                   >
//                     <input
//                       type="radio"
//                       name={`q_${q._id}`}
//                       value={opt}
//                       onChange={(e) =>
//                         setAnswers((a) => ({ ...a, [q._id]: e.target.value }))
//                       }
//                       className="text-blue-500 focus:ring-blue-400"
//                     />
//                     <span>{opt}</span>
//                   </label>
//                 ))}
//               </div>
//             ) : (
//               <textarea
//                 onChange={(e) =>
//                   setAnswers((a) => ({ ...a, [q._id]: e.target.value }))
//                 }
//                 className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 mt-2 focus:ring-2 focus:ring-blue-500 outline-none text-gray-100 placeholder-gray-400"
//                 rows={4}
//                 placeholder="Type your answer here..."
//               />
//             )}
//           </div>
//         ))}

//         {questions.length > 0 && (
//           <button
//             onClick={submit}
//             className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition shadow"
//           >
//             Submit Exam
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }














import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { QuestionAPI, SubmissionAPI } from "../api.js";
import { toast } from "../utils/toast.js";
import { Clock, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function AttemptExam() {
  const { examId } = useParams();
  const nav = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 1 hr
  const [warnings, setWarnings] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const deadlineRef = useRef(Date.now() + 60 * 60 * 1000);
  const hasSubmittedRef = useRef(false);
  const intervalRef = useRef(null);

  const warn = (msg) => {
    if (toast?.warn) toast.warn(msg);
    else alert(msg);
  };

  useEffect(() => {
    (async () => { 
      try {
        const list = await QuestionAPI.listForExam(examId);
        setQuestions(list);
      } catch (e) {
        toast.err(e);
      }
    })();
  }, [examId]);

  useEffect(() => {
    deadlineRef.current = Date.now() + 60 * 60 * 1000;
    setTimeLeft(60 * 60);
    setWarnings(0);
    hasSubmittedRef.current = false;
  }, [examId]);

  const safeSubmit = useCallback(async () => {
    if (hasSubmittedRef.current || submitting) return;
    hasSubmittedRef.current = true;
    setSubmitting(true);
    try {
      const payload = {
        examId,
        answers: Object.entries(answers).map(([qid, ans]) => ({
          questionId: qid,
          answer: ans,
        })),
        warnings,
      };
      await SubmissionAPI.submit(payload);
      alert("✅ Submitted! Check your results in Submissions.");
      nav("/student");
    } catch (e) {
      hasSubmittedRef.current = false;
      setSubmitting(false);
      toast.err(e);
    }
  }, [answers, examId, nav, warnings, submitting]);

  useEffect(() => {
    const tick = () => {
      const secs = Math.max(
        0,
        Math.floor((deadlineRef.current - Date.now()) / 1000)
      );
      setTimeLeft(secs);
      if (secs === 0) {
        clearInterval(intervalRef.current);
        safeSubmit();
      }
    };
    tick();
    intervalRef.current = setInterval(tick, 1000);
    return () => clearInterval(intervalRef.current);
  }, [safeSubmit]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setWarnings((prev) => {
          const next = prev + 1;
          if (next === 1) warn("⚠️ Warning: Do not switch windows during the exam.");
          else if (next === 2)
            warn("⚠️ Final Warning: Switching again will auto-submit!");
          else if (next >= 3) safeSubmit();
          return next;
        });
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [safeSubmit]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-[#fdf7f2] py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border p-8">
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-6 flex items-center justify-center gap-2">
          <CheckCircle2 className="w-6 h-6 text-green-600" />
          Attempt Exam
        </h3>

        {/* Timer */}
        <div className="flex justify-center items-center mb-6">
          <Clock
            className={`w-5 h-5 mr-2 ${
              timeLeft <= 5 * 60 ? "text-red-600" : "text-blue-600"
            }`}
          />
          <span
            className={`text-lg font-semibold ${
              timeLeft <= 5 * 60 ? "text-red-600" : "text-blue-600"
            }`}
          >
            Time Left: {formatTime(timeLeft)}
          </span>
        </div>

        {warnings > 0 && (
          <div className="mb-6 flex items-center gap-2 text-yellow-700 bg-yellow-100 px-4 py-2 rounded-lg">
            <AlertTriangle className="w-5 h-5" />
            <span>{warnings} warning(s) issued for tab switching</span>
          </div>
        )}

        {questions.map((q, idx) => (
          <div
            key={q._id}
            className="mb-6 p-5 border rounded-xl bg-gray-50 shadow-sm"
          >
            <div className="font-medium text-gray-800 mb-3">
              <span className="font-bold text-red-700">Q{idx + 1}:</span>{" "}
              {q.text}{" "}
              <span className="text-sm text-gray-500">({q.marks} marks)</span>
            </div>

            {q.type === "mcq" ? (
              <div className="space-y-2">
                {q.options.map((opt) => (
                  <label
                    key={opt}
                    className="flex items-center space-x-2 cursor-pointer text-gray-700 hover:text-gray-900"
                  >
                    <input
                      type="radio"
                      name={`q_${q._id}`}
                      value={opt}
                      onChange={(e) =>
                        setAnswers((a) => ({ ...a, [q._id]: e.target.value }))
                      }
                      className="text-red-700 focus:ring-red-600"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            ) : (
              <textarea
                onChange={(e) =>
                  setAnswers((a) => ({ ...a, [q._id]: e.target.value }))
                }
                className="w-full bg-white border border-gray-300 rounded-lg p-3 mt-2 focus:ring-2 focus:ring-red-600 outline-none text-gray-800 placeholder-gray-400"
                rows={4}
                placeholder="Type your answer here..."
              />
            )}
          </div>
        ))}

        {questions.length > 0 && (
          <button
            onClick={safeSubmit}
            disabled={submitting}
            className={`w-full py-3 rounded-lg transition font-medium ${
              submitting
                ? "bg-gray-600 text-white cursor-not-allowed"
                : "bg-red-700 text-white shadow-md hover:shadow-lg hover:shadow-red-300"
            }`}
          >
            {submitting ? "Submitting..." : "Submit Exam"}
          </button>
        )}
      </div>
    </div>
  );
}
