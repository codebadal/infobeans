// import { useEffect, useState } from "react";
// import { ExamAPI, QuestionAPI } from "../api.js";
// import { toast } from "../utils/toast.js";

// export default function DashboardTrainer() {
//   // Sidebar tab
//   const [activeTab, setActiveTab] = useState("createExam");

//   // Exam form state
//   const [title, setTitle] = useState("");
//   const [subject, setSubject] = useState("");
//   const [description, setDescription] = useState("");
//   const [durationMins, setDurationMins] = useState(60);
//   const [totalMarks, setTotalMarks] = useState(10);

//   // Data state
//   const [exams, setExams] = useState([]);
//   const [examId, setExamId] = useState("");
//   const [questions, setQuestions] = useState([]);

//   // Question form state
//   const [qText, setQText] = useState("");
//   const [options, setOptions] = useState(["", "", "", ""]);
//   const [answer, setAnswer] = useState("");
//   const [marks, setMarks] = useState(1);
//   const [editingId, setEditingId] = useState(null);

//   // Fetch exams
//   const refresh = async () => {
//     try {
//       const data = await ExamAPI.list();
//       setExams(data);
//     } catch (e) {
//       toast.err(e);
//     }
//   };

//   const loadQuestions = async (id) => {
//     try {
//       setExamId(id);
//       const data = await QuestionAPI.listForExam(id);
//       setQuestions(data);
//     } catch (e) {
//       toast.err(e);
//     }
//   };

//   useEffect(() => {
//     refresh().catch(toast.err);
//   }, []);

//   // Create exam
//   const createExam = async (e) => {
//     e.preventDefault();
//     try {
//       const ex = await ExamAPI.create({
//         title,
//         subject,
//         description,
//         durationMins: Number(durationMins),
//         totalMarks: Number(totalMarks),
//       });
//       toast.ok("Exam created");
//       setTitle("");
//       setSubject("");
//       setDescription("");
//       setDurationMins(60);
//       setTotalMarks(10);
//       await refresh();
//       setExamId(ex._id);
//     } catch (e) {
//       toast.err(e);
//     }
//   };

//   // Add question
//   const addQuestion = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = {
//         examId,
//         text: qText,
//         type: "mcq",
//         options: options.filter(Boolean),
//         answer,
//         marks: Number(marks),
//       };
//       await QuestionAPI.add(payload);
//       toast.ok("Question added");
//       setQText("");
//       setOptions(["", "", "", ""]);
//       setAnswer("");
//       setMarks(1);
//       loadQuestions(examId);
//     } catch (e) {
//       toast.err(e);
//     }
//   };

//   // Update question
//   const updateQuestion = async (e) => {
//     e.preventDefault();
//     try {
//       await QuestionAPI.update(editingId, {
//         text: qText,
//         options: options.filter(Boolean),
//         answer,
//         marks: Number(marks),
//       });
//       toast.ok("Question updated");
//       setEditingId(null);
//       setQText("");
//       setOptions(["", "", "", ""]);
//       setAnswer("");
//       setMarks(1);
//       loadQuestions(examId);
//     } catch (e) {
//       toast.err(e);
//     }
//   };

//   // Edit question (prefill form)
//   const handleEdit = (q) => {
//     setQText(q.text);
//     setOptions(q.options);
//     setAnswer(q.answer);
//     setMarks(q.marks);
//     setEditingId(q._id);
//   };

//   // Delete question
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this question?")) return;
//     try {
//       await QuestionAPI.delete(id);
//       toast.ok("Question deleted");
//       loadQuestions(examId);
//     } catch (e) {
//       toast.err(e);
//     }
//   };

//   // Delete exam
//   const deleteExam = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this exam?")) return;
//     try {
//       await ExamAPI.delete(id);
//       toast.ok("Exam deleted");
//       refresh();
//     } catch (e) {
//       toast.err(e);
//     }
//   };

//   // Toggle live/unlive
//   const toggleExam = async (id, isLive) => {
//     try {
//       await ExamAPI.toggle(id);
//       toast.ok(isLive ? "Exam Unlive" : "Exam Live");
//       refresh();
//     } catch (e) {
//       toast.err(e);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-900 text-gray-100">
//       {/* Sidebar */}
//       <div className="w-64 bg-gray-800 p-6 border-r border-gray-700">
//         <h2 className="text-xl font-bold mb-6 text-green-400">Trainer Panel</h2>
//         <ul className="space-y-3">
//           <li>
//             <button
//               onClick={() => setActiveTab("createExam")}
//               className={`w-full text-left px-4 py-2 rounded ${
//                 activeTab === "createExam" ? "bg-green-600" : "bg-gray-700"
//               }`}
//             >
//               ➕ Create Exam
//             </button>
//           </li>
//           <li>
//             <button
//               onClick={() => setActiveTab("exams")}
//               className={`w-full text-left px-4 py-2 rounded ${
//                 activeTab === "exams" ? "bg-green-600" : "bg-gray-700"
//               }`}
//             >
//               📋 Manage Exams
//             </button>
//           </li>
//           <li>
//             <button
//               onClick={() => setActiveTab("questions")}
//               className={`w-full text-left px-4 py-2 rounded ${
//                 activeTab === "questions" ? "bg-green-600" : "bg-gray-700"
//               }`}
//               disabled={!examId}
//             >
//               ❓ Manage Questions
//             </button>
//           </li>
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-8">
//         {/* Create Exam */}
//         {activeTab === "createExam" && (
//           <div className="max-w-lg bg-gray-800 p-6 rounded-xl border border-gray-700">
//             <h3 className="text-xl font-bold mb-4 text-green-400">
//               Create Exam
//             </h3>
//             <form onSubmit={createExam} className="space-y-4">
//               <input
//                 placeholder="Title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 required
//                 className="w-full bg-gray-700 border px-3 py-2 rounded"
//               />
//               <input
//                 placeholder="Subject"
//                 value={subject}
//                 onChange={(e) => setSubject(e.target.value)}
//                 className="w-full bg-gray-700 border px-3 py-2 rounded"
//               />
//               <input
//                 placeholder="Description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 className="w-full bg-gray-700 border px-3 py-2 rounded"
//               />
//               <input
//                 placeholder="Duration (mins)"
//                 type="number"
//                 value={durationMins}
//                 onChange={(e) => setDurationMins(e.target.value)}
//                 className="w-full bg-gray-700 border px-3 py-2 rounded"
//               />
//               <input
//                 placeholder="Total Marks"
//                 type="number"
//                 value={totalMarks}
//                 onChange={(e) => setTotalMarks(e.target.value)}
//                 className="w-full bg-gray-700 border px-3 py-2 rounded"
//               />
//               <button className="w-full bg-green-600 py-2 rounded">
//                 Create Exam
//               </button>
//             </form>
//           </div>
//         )}

//         {/* Manage Exams */}
//         {activeTab === "exams" && (
//           <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
//             <h3 className="text-xl font-bold mb-4 text-yellow-400">My Exams</h3>
//             <table className="w-full border border-gray-700 text-sm">
//               <thead className="bg-gray-700">
//                 <tr>
//                   <th className="p-2 border">Title</th>
//                   <th className="p-2 border">Subject</th>
//                   <th className="p-2 border">Marks</th>
//                   <th className="p-2 border">Status</th>
//                   <th className="p-2 border">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {exams.map((ex) => (
//                   <tr key={ex._id} className="border">
//                     <td className="p-2">{ex.title}</td>
//                     <td className="p-2">{ex.subject}</td>
//                     <td className="p-2">{ex.totalMarks}</td>
//                     <td className="p-2">
//                       {ex.isLive ? "LIVE ✅" : "Not Live ❌"}
//                     </td>
//                     <td className="p-2 space-x-2">
//                       <button
//                         onClick={() => toggleExam(ex._id, ex.isLive)}
//                         className="px-2 py-1 bg-blue-600 rounded"
//                       >
//                         {ex.isLive ? "Unlive" : "Go Live"}
//                       </button>
//                       <button
//                         onClick={() => deleteExam(ex._id)}
//                         className="px-2 py-1 bg-red-600 rounded"
//                       >
//                         Delete
//                       </button>
//                       <button
//                         onClick={() => {
//                           setActiveTab("questions");
//                           loadQuestions(ex._id);
//                         }}
//                         className="px-2 py-1 bg-purple-600 rounded"
//                       >
//                         Show Questions
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Manage Questions */}
//         {activeTab === "questions" && (
//           <div>
//             <h3 className="text-2xl font-bold text-purple-400 mb-4">
//               ❓ Manage Questions
//             </h3>

//             {/* Add / Edit Question Form */}
//             <form
//               onSubmit={editingId ? updateQuestion : addQuestion}
//               className="space-y-3 max-w-lg mb-6"
//             >
//               <input
//                 placeholder="Question text"
//                 value={qText}
//                 onChange={(e) => setQText(e.target.value)}
//                 required
//                 className="w-full bg-gray-700 border px-3 py-2 rounded"
//               />
//               {options.map((o, i) => (
//                 <input
//                   key={i}
//                   placeholder={`Option ${i + 1}`}
//                   value={o}
//                   onChange={(e) => {
//                     const arr = [...options];
//                     arr[i] = e.target.value;
//                     setOptions(arr);
//                   }}
//                   className="w-full bg-gray-700 border px-3 py-2 rounded"
//                 />
//               ))}
//               <select
//                 value={answer}
//                 onChange={(e) => setAnswer(e.target.value)}
//                 required
//                 className="w-full bg-gray-700 border px-3 py-2 rounded"
//               >
//                 <option value="">-- Select correct option --</option>
//                 {options.filter(Boolean).map((opt, i) => (
//                   <option key={i} value={opt}>
//                     Option {i + 1}: {opt}
//                   </option>
//                 ))}
//               </select>
//               <input
//                 placeholder="Marks"
//                 type="number"
//                 value={marks}
//                 onChange={(e) => setMarks(e.target.value)}
//                 className="w-full bg-gray-700 border px-3 py-2 rounded"
//               />
//               <button className="w-full bg-purple-600 py-2 rounded text-white">
//                 {editingId ? "Update Question" : "Add Question"}
//               </button>
//             </form>

//             {/* Questions Table */}
//             <table className="w-full border border-gray-700 text-sm">
//               <thead className="bg-gray-700">
//                 <tr>
//                   <th className="p-2 border">Question</th>
//                   <th className="p-2 border">Options</th>
//                   <th className="p-2 border">Answer</th>
//                   <th className="p-2 border">Marks</th>
//                   <th className="p-2 border">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {questions.map((q) => (
//                   <tr key={q._id} className="border">
//                     <td className="p-2">{q.text}</td>
//                     <td className="p-2">
//                       <ul className="list-disc ml-4">
//                         {q.options.map((o, i) => (
//                           <li key={i}>{o}</li>
//                         ))}
//                       </ul>
//                     </td>
//                     <td className="p-2 text-green-400">{q.answer}</td>
//                     <td className="p-2">{q.marks}</td>
//                     <td className="p-2 space-x-2">
//                       <button
//                         onClick={() => handleEdit(q)}
//                         className="px-2 py-1 bg-yellow-600 rounded"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(q._id)}
//                         className="px-2 py-1 bg-red-600 rounded"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }












import { useEffect, useState } from "react";
import { ExamAPI, QuestionAPI } from "../api.js";
import { toast } from "../utils/toast.js";
import { FiPlusCircle, FiFileText, FiHelpCircle, FiEdit, FiTrash2 } from "react-icons/fi";

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
      setTitle(""); setSubject(""); setDescription("");
      setDurationMins(60); setTotalMarks(10);
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
      setQText(""); setOptions(["", "", "", ""]);
      setAnswer(""); setMarks(1);
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
      }
      await QuestionAPI.update(editingId, payload);
      toast.ok("Question updated");
      setEditingId(null); setQText("");
      setOptions(["", "", "", ""]); setAnswer(""); setMarks(1);
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
    if (!window.confirm("Are you sure you want to delete this question?")) return;
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
              ${activeTab === "createExam" ? "bg-gray-600 text-white shadow-md" : "hover:bg-gray-100"}`}
            >
              <FiPlusCircle /> Create Exam
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("exams")}
              className={`flex items-center gap-2 w-full text-left px-4 py-2 rounded-lg transition 
              ${activeTab === "exams" ? "bg-gray-600 text-white shadow-md" : "hover:bg-gray-100"}`}
            >
              <FiFileText /> Manage Exams
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("questions")}
              disabled={!examId}
              className={`flex items-center gap-2 w-full text-left px-4 py-2 rounded-lg transition 
              ${activeTab === "questions" ? "bg-gray-600 text-white shadow-md" : "hover:bg-gray-100"}`}
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
            <h3 className="text-xl font-bold mb-4 text-gray-700">Create Exam</h3>
            <form onSubmit={createExam} className="space-y-4">
              <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}
                required className="w-full border px-3 py-2 rounded-lg" />
              <input placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)}
                className="w-full border px-3 py-2 rounded-lg" />
              <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}
                className="w-full border px-3 py-2 rounded-lg" />
              <input type="number" placeholder="Duration (mins)" value={durationMins} 
                onChange={(e) => setDurationMins(e.target.value)} className="w-full border px-3 py-2 rounded-lg" />
              <input type="number" placeholder="Total Marks" value={totalMarks} 
                onChange={(e) => setTotalMarks(e.target.value)} className="w-full border px-3 py-2 rounded-lg" />
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
                    <td className="p-2">{ex.isLive ? "LIVE ✅" : "Not Live ❌"}</td>
                    <td className="p-2 space-x-2">
                      <button onClick={() => toggleExam(ex._id, ex.isLive)}
                        className=" bg-red-700 text-white shadow-md rounded px-4 py-2 hover:shadow-lg hover:shadow-red-300">
                        {ex.isLive ? "Unlive" : "Go Live"}
                      </button>
                      <button onClick={() => deleteExam(ex._id)}
                        className="px-3 py-1 bg-red-700 text-white rounded-lg shadow-md hover:shadow-lg hover:shadow-red-300">
                        <FiTrash2 />
                      </button>
                      <button onClick={() => { setActiveTab("questions"); loadQuestions(ex._id); }}
                        className="px-3 py-1 bg-gray-600 text-white rounded-lg shadow-md hover:shadow-lg hover:shadow-gray-400">
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
            <h3 className="text-xl font-bold text-gray-700 mb-4">Manage Questions</h3>
            <form onSubmit={editingId ? updateQuestion : addQuestion} className="space-y-3 max-w-lg mb-6">
              <input placeholder="Question text" value={qText} onChange={(e) => setQText(e.target.value)}
                required className="w-full border px-3 py-2 rounded-lg" />
              {options.map((o, i) => (
                <input key={i} placeholder={`Option ${i + 1}`} value={o}
                  onChange={(e) => {
                    const arr = [...options]; arr[i] = e.target.value; setOptions(arr);
                  }}
                  className="w-full border px-3 py-2 rounded-lg" />
              ))}
              <select value={answer} onChange={(e) => setAnswer(e.target.value)}
                required className="w-full border px-3 py-2 rounded-lg">
                <option value="">-- Select correct option --</option>
                {options.filter(Boolean).map((opt, i) => (
                  <option key={i} value={opt}>Option {i + 1}: {opt}</option>
                ))}
              </select>
              <input type="number" placeholder="Marks" value={marks}
                onChange={(e) => setMarks(e.target.value)} className="w-full border px-3 py-2 rounded-lg" />
              <button className="w-full bg-red-700 text-white shadow-md rounded px-4 py-2 hover:shadow-lg hover:shadow-red-300 ">
                {editingId ? "Update Question" : "Add Question"}
              </button>
            </form>

            <table className="w-full border text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">Question</th>
                  <th className="p-2 border">Options</th>
                  <th className="p-2 border">Answer</th>
                  <th className="p-2 border">Marks</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {questions.map((q) => (
                  <tr key={q._id} className="border">
                    <td className="p-2">{q.text}</td>
                    <td className="p-2">
                      <ul className="list-disc ml-4">{q.options.map((o, i) => (<li key={i}>{o}</li>))}</ul>
                    </td>
                    <td className="p-2 text-green-600 font-semibold">{q.answer}</td>
                    <td className="p-2">{q.marks}</td>
                    <td className="p-2 space-x-2">
                      <button onClick={() => handleEdit(q)}
                        className="px-3 py-1 bg-gray-600 text-white rounded-lg shadow-md hover:shadow-lg hover:shadow-gray-400 flex items-center gap-1">
                        <FiEdit /> Edit
                      </button>
                      <button onClick={() => handleDelete(q._id)}
                        className="px-3 py-1 bg-red-700 text-white rounded-lg shadow-md hover:shadow-lg hover:shadow-red-300 flex items-center gap-1">
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
