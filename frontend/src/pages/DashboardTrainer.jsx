import { useEffect, useState } from "react";
import { ExamAPI, QuestionAPI } from "../api.js";
import { toast } from "../utils/toast.js";
import {
  FiPlusCircle,
  FiFileText,
  FiHelpCircle,
  FiEdit,
  FiTrash2,
} from "react-icons/fi";

export default function DashboardTrainer() {
  const [activeTab, setActiveTab] = useState("createExam");

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [durationMins, setDurationMins] = useState(60);
  const [totalMarks, setTotalMarks] = useState(10);

  const [exams, setExams] = useState([]);
  const [examId, setExamId] = useState("");
  const [questions, setQuestions] = useState([]);

  const [qText, setQText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState("");
  const [marks, setMarks] = useState(1);
  const [editingId, setEditingId] = useState(null);

  const refresh = async () => {
    try {
      const data = await ExamAPI.list();
      setExams(data);
    } catch (e) {
      toast.err(e);
    }
  };

  const loadQuestions = async (id) => {
    try {
      setExamId(id);
      const data = await QuestionAPI.listForExam(id);
      setQuestions(data);
    } catch (e) {
      toast.err(e);
    }
  };

  useEffect(() => {
    refresh().catch(toast.err);
  }, []);

  const createExam = async (e) => {
    e.preventDefault();
    try {
      const ex = await ExamAPI.create({
        title,
        subject,
        description,
        durationMins: Number(durationMins),
        totalMarks: Number(totalMarks),
      });
      toast.ok("Exam created");
      setTitle("");
      setSubject("");
      setDescription("");
      setDurationMins(60);
      setTotalMarks(10);
      await refresh();
      setExamId(ex._id);
    } catch (e) {
      toast.err(e);
    }
  };

  const addQuestion = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        examId,
        text: qText,
        type: "mcq",
        options: options.filter(Boolean),
        answer,
        marks: Number(marks),
      };
      await QuestionAPI.add(payload);
      toast.ok("Question added");
      setQText("");
      setOptions(["", "", "", ""]);
      setAnswer("");
      setMarks(1);
      loadQuestions(examId);
    } catch (e) {
      toast.err(e);
    }
  };

  const updateQuestion = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        text: qText,
        options: options.filter(Boolean),
        answer,
        marks: Number(marks),
      };
      await QuestionAPI.update(editingId, payload);
      toast.ok("Question updated");
      setEditingId(null);
      setQText("");
      setOptions(["", "", "", ""]);
      setAnswer("");
      setMarks(1);
      loadQuestions(examId);
    } catch (e) {
      toast.err(e);
    }
  };

  const handleEdit = (q) => {
    setQText(q.text);
    setOptions(q.options);
    setAnswer(q.answer);
    setMarks(q.marks);
    setEditingId(q._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this question?"))
      return;
    try {
      await QuestionAPI.delete(id);
      toast.ok("Question deleted");
      loadQuestions(examId);
    } catch (e) {
      toast.err(e);
    }
  };

  const deleteExam = async (id) => {
    if (!window.confirm("Are you sure you want to delete this exam?")) return;
    try {
      await ExamAPI.delete(id);
      toast.ok("Exam deleted");
      refresh();
    } catch (e) {
      toast.err(e);
    }
  };

  const toggleExam = async (id, isLive) => {
    try {
      await ExamAPI.toggle(id);
      toast.ok(isLive ? "Exam Unlive" : "Exam Live");
      refresh();
    } catch (e) {
      toast.err(e);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#fdf7f2] text-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg border-r border-gray-200 p-6">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Trainer Panel</h2>
        <ul className="space-y-3">
          <li>
            <button
              onClick={() => setActiveTab("createExam")}
              className={`flex items-center gap-2 w-full text-left px-4 py-2 rounded-lg transition 
              ${
                activeTab === "createExam"
                  ? "bg-gray-600 text-white shadow-md"
                  : "hover:bg-gray-100"
              }`}
            >
              <FiPlusCircle /> Create Exam
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("exams")}
              className={`flex items-center gap-2 w-full text-left px-4 py-2 rounded-lg transition 
              ${
                activeTab === "exams"
                  ? "bg-gray-600 text-white shadow-md"
                  : "hover:bg-gray-100"
              }`}
            >
              <FiFileText /> Manage Exams
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("questions")}
              disabled={!examId}
              className={`flex items-center gap-2 w-full text-left px-4 py-2 rounded-lg transition 
              ${
                activeTab === "questions"
                  ? "bg-gray-600 text-white shadow-md"
                  : "hover:bg-gray-100"
              }`}
            >
              <FiHelpCircle /> Manage Questions
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 space-y-6">
        {/* Create Exam */}
        {activeTab === "createExam" && (
          <div className="max-w-lg bg-white shadow-lg rounded-lg border border-gray-200 p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-700">
              Create Exam
            </h3>
            <form onSubmit={createExam} className="space-y-4">
              <input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full border px-3 py-2 rounded-lg"
              />
              <input
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full border px-3 py-2 rounded-lg"
              />
              <input
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border px-3 py-2 rounded-lg"
              />
              <input
                type="number"
                placeholder="Duration (mins)"
                value={durationMins}
                onChange={(e) => setDurationMins(e.target.value)}
                className="w-full border px-3 py-2 rounded-lg"
              />
              <input
                type="number"
                placeholder="Total Marks"
                value={totalMarks}
                onChange={(e) => setTotalMarks(e.target.value)}
                className="w-full border px-3 py-2 rounded-lg"
              />
              <button className="w-full bg-red-700 text-white shadow-md rounded px-4 py-2 hover:shadow-lg hover:shadow-red-300">
                Create Exam
              </button>
            </form>
          </div>
        )}

        {/* Manage Exams */}
        {activeTab === "exams" && (
          <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-700">My Exams</h3>
            <table className="w-full border text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">Title</th>
                  <th className="p-2 border">Subject</th>
                  <th className="p-2 border">Marks</th>
                  <th className="p-2 border">Status</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {exams.map((ex) => (
                  <tr key={ex._id} className="border">
                    <td className="p-2">{ex.title}</td>
                    <td className="p-2">{ex.subject}</td>
                    <td className="p-2">{ex.totalMarks}</td>
                    <td className="p-2">
                      {ex.isLive ? "LIVE ✅" : "Not Live ❌"}
                    </td>
                    <td className="p-2 space-x-2">
                      <button
                        onClick={() => toggleExam(ex._id, ex.isLive)}
                        className=" bg-red-700 text-white shadow-md rounded px-4 py-2 hover:shadow-lg hover:shadow-red-300"
                      >
                        {ex.isLive ? "Unlive" : "Go Live"}
                      </button>
                      <button
                        onClick={() => deleteExam(ex._id)}
                        className="px-3 py-1 bg-red-700 text-white rounded-lg shadow-md hover:shadow-lg hover:shadow-red-300"
                      >
                        <FiTrash2 />
                      </button>
                      <button
                        onClick={() => {
                          setActiveTab("questions");
                          loadQuestions(ex._id);
                        }}
                        className="px-3 py-1 bg-gray-600 text-white rounded-lg shadow-md hover:shadow-lg hover:shadow-gray-400"
                      >
                        Show Questions
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Manage Questions */}
        {activeTab === "questions" && (
          <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-700 mb-4">
              Manage Questions
            </h3>
            <form
              onSubmit={editingId ? updateQuestion : addQuestion}
              className="space-y-3 max-w-lg mb-6"
            >
              <input
                placeholder="Question text"
                value={qText}
                onChange={(e) => setQText(e.target.value)}
                required
                className="w-full border px-3 py-2 rounded-lg"
              />
              {options.map((o, i) => (
                <input
                  key={i}
                  placeholder={`Option ${i + 1}`}
                  value={o}
                  onChange={(e) => {
                    const arr = [...options];
                    arr[i] = e.target.value;
                    setOptions(arr);
                  }}
                  className="w-full border px-3 py-2 rounded-lg"
                />
              ))}
              <select
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                required
                className="w-full border px-3 py-2 rounded-lg"
              >
                <option value="">-- Select correct option --</option>
                {options.filter(Boolean).map((opt, i) => (
                  <option key={i} value={opt}>
                    Option {i + 1}: {opt}
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Marks"
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
                className="w-full border px-3 py-2 rounded-lg"
              />
              <button className="w-full bg-red-700 text-white shadow-md rounded px-4 py-2 hover:shadow-lg hover:shadow-red-300 ">
                {editingId ? "Update Question" : "Add Question"}
              </button>
            </form>

            

            <table className="w-full border-collapse border rounded-lg shadow-md text-sm">
              <thead className="bg-gray-200 text-gray-700 text-left">
                <tr>
                  <th className="p-3 border">Question No</th>
                  <th className="p-3 border">Question</th>
                  <th className="p-3 border">Options</th>
                  <th className="p-3 border">Answer</th>
                  <th className="p-3 border">Marks</th>
                  <th className="p-3 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {questions.map((q, idx) => (
                  <tr
                    key={q._id}
                    className="border hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-3 border text-center font-medium">
                      {idx + 1}
                    </td>
                    <td className="p-3 border w-[30%]">{q.text}</td>
                    <td className="p-3 border">
                      <ul className="list-decimal pl-5 space-y-1 text-gray-700">
                        {q.options.map((o, i) => (
                          <li key={i}>{o}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="p-3 border text-green-600 font-semibold">
                      {q.answer}
                    </td>
                    <td className="p-3 border text-center">{q.marks}</td>
                    <td className="p-3 border text-center space-y-2">
                      <button
                        onClick={() => handleEdit(q)}
                        className="px-3 py-1 bg-gray-600 text-white rounded-lg shadow-md hover:shadow-lg hover:shadow-gray-400 flex items-center gap-1"
                      >
                        <FiEdit /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(q._id)}
                        className="w-full px-3 py-1 bg-red-600 text-white rounded-md shadow hover:bg-red-700 flex items-center justify-center gap-1"
                      >
                        <FiTrash2 /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
