import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { QuestionAPI, SubmissionAPI } from "../api.js";
import { toast } from "../utils/toast.js";

export default function AttemptExam() {
  const { examId } = useParams();
  const nav = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    (async () => {
      try {
        setQuestions(await QuestionAPI.listForExam(examId));
      } catch (e) {
        toast.err(e);
      }
    })();
  }, [examId]);

  const submit = async () => {
    try {
      const payload = {
        examId,
        answers: Object.entries(answers).map(([qid, ans]) => ({
          questionId: qid,
          answer: ans,
        })),
      };
      await SubmissionAPI.submit(payload);
      alert("Submitted. Check your result in submissions.");
      nav("/student");
    } catch (e) {
      toast.err(e);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-gray-800 shadow-lg rounded-xl p-8 border border-gray-700">
        <h3 className="text-2xl font-bold text-blue-400 mb-6 text-center">
          Attempt Exam
        </h3>

        {questions.map((q, idx) => (
          <div
            key={q._id}
            className="mb-6 p-5 border border-gray-700 rounded-lg bg-gray-700/50"
          >
            <div className="font-medium text-gray-100 mb-3">
              <span className="font-bold text-green-400">Q{idx + 1}:</span>{" "}
              {q.text}{" "}
              <span className="text-sm text-gray-400">({q.marks} marks)</span>
            </div>

            {q.type === "mcq" ? (
              <div className="space-y-2">
                {q.options.map((opt) => (
                  <label
                    key={opt}
                    className="flex items-center space-x-2 cursor-pointer text-gray-200 hover:text-white"
                  >
                    <input
                      type="radio"
                      name={`q_${q._id}`}
                      value={opt}
                      onChange={(e) =>
                        setAnswers((a) => ({ ...a, [q._id]: e.target.value }))
                      }
                      className="text-blue-500 focus:ring-blue-400"
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
                className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 mt-2 focus:ring-2 focus:ring-blue-500 outline-none text-gray-100 placeholder-gray-400"
                rows={4}
                placeholder="Type your answer here..."
              />
            )}
          </div>
        ))}

        {questions.length > 0 && (
          <button
            onClick={submit}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition shadow"
          >
            Submit Exam
          </button>
        )}
      </div>
    </div>
  );
}
