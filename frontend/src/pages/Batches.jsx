// import { useEffect, useState } from 'react';
// import { BatchAPI, AdminAPI } from '../api.js';
// import { toast } from '../utils/toast.js';

// export default function Batches() {
//   const [name, setName] = useState('');
//   const [subject, setSubject] = useState('');
//   const [capacity, setCapacity] = useState(30);
//   const [trainerId, setTrainerId] = useState('');
//   const [batches, setBatches] = useState([]);

//   const [students, setStudents] = useState([]);
//   const [studentId, setStudentId] = useState('');
//   const [batchId, setBatchId] = useState('');

//   const load = async () => {
//     try {
//       setBatches(await BatchAPI.list());
//       setStudents(await AdminAPI.listUsers('student'));
//     } catch (e) {
//       toast.err(e);
//     }
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   const create = async (e) => {
//     e.preventDefault();
//     try {
//       await BatchAPI.create({
//         name,
//         subject,
//         capacity: Number(capacity),
//         trainerId: trainerId || undefined,
//       });
//       toast.ok('Batch created');
//       setName('');
//       setSubject('');
//       setCapacity(30);
//       setTrainerId('');
//       load();
//     } catch (e) {
//       toast.err(e);
//     }
//   };

//   const assign = async (e) => {
//     e.preventDefault();
//     try {
//       await BatchAPI.assign({ batchId, studentId });
//       toast.ok('Assigned');
//       setStudentId('');
//       setBatchId('');
//       load();
//     } catch (e) {
//       toast.err(e);
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-900 min-h-screen text-gray-100">
//       <div className="grid md:grid-cols-2 gap-6">
        
//         {/* Create Batch */}
//         <div className="bg-gray-800 shadow-lg rounded-xl p-6 border border-gray-700">
//           <h3 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">
//             Create Batch
//           </h3>
//           <form onSubmit={create} className="space-y-4">
//             <div>
//               <label className="block text-gray-300 text-sm mb-1">Batch Name</label>
//               <input
//                 placeholder="Enter batch name"
//                 className="bg-gray-900 border border-gray-700 px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-green-500 focus:outline-none text-gray-100"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-gray-300 text-sm mb-1">Subject</label>
//               <input
//                 placeholder="Enter subject"
//                 className="bg-gray-900 border border-gray-700 px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-green-500 focus:outline-none text-gray-100"
//                 value={subject}
//                 onChange={(e) => setSubject(e.target.value)}
//               />
//             </div>
//             <div>
//               <label className="block text-gray-300 text-sm mb-1">Capacity</label>
//               <input
//                 type="number"
//                 className="bg-gray-900 border border-gray-700 px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-green-500 focus:outline-none text-gray-100"
//                 value={capacity}
//                 onChange={(e) => setCapacity(e.target.value)}
//               />
//             </div>
//             <div>
//               <label className="block text-gray-300 text-sm mb-1">Trainer ID (optional)</label>
//               <input
//                 className="bg-gray-900 border border-gray-700 px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-green-500 focus:outline-none text-gray-100"
//                 value={trainerId}
//                 onChange={(e) => setTrainerId(e.target.value)}
//               />
//             </div>
//             <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition shadow">
//               Create
//             </button>
//           </form>
//         </div>

//         {/* Assign Student */}
//         <div className="bg-gray-800 shadow-lg rounded-xl p-6 border border-gray-700">
//           <h3 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">
//             Assign Student
//           </h3>
//           <form onSubmit={assign} className="space-y-4">
//             <div>
//               <label className="block text-gray-300 text-sm mb-1">Select Batch</label>
//               <select
//                 value={batchId}
//                 onChange={(e) => setBatchId(e.target.value)}
//                 required
//                 className="bg-gray-900 border border-gray-700 px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-100"
//               >
//                 <option value="">-- choose batch --</option>
//                 {batches.map((b) => (
//                   <option key={b._id} value={b._id}>
//                     {b.name} ({b.subject})
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-gray-300 text-sm mb-1">Select Student</label>
//               <select
//                 value={studentId}
//                 onChange={(e) => setStudentId(e.target.value)}
//                 required
//                 className="bg-gray-900 border border-gray-700 px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-100"
//               >
//                 <option value="">-- choose student --</option>
//                 {students.map((s) => (
//                   <option key={s._id} value={s._id}>
//                     {s.name} ({s.email})
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition shadow">
//               Assign
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* List Batches */}
//       <div className="bg-gray-800 shadow-lg rounded-xl p-6 mt-8 border border-gray-700">
//         <h3 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">
//           All Batches
//         </h3>
//         {batches.length === 0 ? (
//           <p className="text-gray-400">No batches created yet.</p>
//         ) : (
//           <ul className="space-y-3">
//             {batches.map((b) => (
//               <li
//                 key={b._id}
//                 className="p-4 border border-gray-700 rounded-lg hover:bg-gray-700 transition"
//               >
//                 <p className="font-semibold text-lg text-white">{b.name}</p>
//                 <p className="text-sm text-gray-300">
//                   Subject: <span className="font-medium">{b.subject}</span>
//                 </p>
//                 <p className="text-sm text-gray-300">
//                   Capacity:{" "}
//                   <span className="font-medium">{b.capacity}</span> | Trainer:{" "}
//                   <span className="font-medium">{b.trainer?.name || "-"}</span> | Students:{" "}
//                   <span className="font-medium">{b.students?.length || 0}</span>
//                 </p>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }




























import { useEffect, useState } from "react";
import { BatchAPI, AdminAPI } from "../api.js";
import { toast } from "../utils/toast.js";
import { FaBook, FaPlus, FaUsers, FaBars } from "react-icons/fa";
import { MdOutlineList } from "react-icons/md";

export default function Batches() {
  const [activeTab, setActiveTab] = useState("create");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [capacity, setCapacity] = useState(30);
  const [trainerId, setTrainerId] = useState("");
  const [batches, setBatches] = useState([]);

  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [batchId, setBatchId] = useState("");
  const [expandedBatch, setExpandedBatch] = useState(null);

  const load = async () => {
    try {
      setBatches(await BatchAPI.list());
      setStudents(await AdminAPI.listUsers("student"));
    } catch (e) {
      toast.err(e);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const create = async (e) => {
    e.preventDefault();
    try {
      await BatchAPI.create({
        name,
        subject,
        capacity: Number(capacity),
        trainerId: trainerId || undefined,
      });
      toast.ok("Batch created");
      setName("");
      setSubject("");
      setCapacity(30);
      setTrainerId("");
      load();
    } catch (e) {
      toast.err(e);
    }
  };

  const assign = async (e) => {
    e.preventDefault();
    const alreadyAssigned = batches.some((b) =>
      b.students?.some((s) => s._id === studentId)
    );
    if (alreadyAssigned) return toast.err("This student is already in a batch.");
    try {
      await BatchAPI.assign({ batchId, studentId });
      toast.ok("Assigned");
      setStudentId("");
      setBatchId("");
      load();
    } catch (e) {
      toast.err(e);
    }
  };

  const removeStudent = async (batchId, studentId) => {
    if (!confirm("Remove this student from batch?")) return;
    try {
      await BatchAPI.removeStudent({ batchId, studentId });
      toast.ok("Removed");
      load();
    } catch (e) {
      toast.err(e);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#fdf7f2] text-gray-900">
      {/* Sidebar */}
      <aside
        className={`fixed z-40 inset-y-0 left-0 w-64 bg-gray-200 border-r border-gray-300 p-4 transform transition-transform md:relative md:translate-x-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
          <FaBook /> Batch Panel
        </h2>
        <nav className="space-y-3">
          {[
            { key: "create", label: "Create Batch", icon: <FaPlus /> },
            { key: "assign", label: "Assign Student", icon: <FaUsers /> },
            { key: "list", label: "View Batches", icon: <MdOutlineList /> },
          ].map((opt) => (
            <button
              key={opt.key}
              onClick={() => {
                setActiveTab(opt.key);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-4 py-2 rounded transition ${
                activeTab === opt.key
                  ? "bg-gray-600 text-white shadow-md hover:shadow-lg hover:shadow-gray-400"
                  : "hover:bg-gray-300"
              }`}
            >
              {opt.icon} {opt.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 ml-0 md:ml-64 w-full">
        {/* Hamburger button (mobile only) */}
        <button
          className="md:hidden mb-4 bg-gray-600 text-white px-3 py-2 rounded shadow-md hover:shadow-lg hover:shadow-gray-400"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FaBars />
        </button>

        {/* Create Batch */}
        {activeTab === "create" && (
          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 max-w-lg mx-auto">
            <h3 className="text-2xl font-semibold mb-4 border-b border-gray-300 pb-2">
              Create Batch
            </h3>
            <form onSubmit={create} className="space-y-4">
              <input
                placeholder="Batch Name"
                className="w-full bg-gray-100 border border-gray-300 px-3 py-2 rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                placeholder="Subject"
                className="w-full bg-gray-100 border border-gray-300 px-3 py-2 rounded"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <input
                type="number"
                placeholder="Capacity"
                className="w-full bg-gray-100 border border-gray-300 px-3 py-2 rounded"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
              />
              <input
                placeholder="Trainer ID (optional)"
                className="w-full bg-gray-100 border border-gray-300 px-3 py-2 rounded"
                value={trainerId}
                onChange={(e) => setTrainerId(e.target.value)}
              />
              <button className="w-full bg-red-700 text-white shadow-md hover:shadow-lg hover:shadow-red-300 px-4 py-2 rounded">
                Create
              </button>
            </form>
          </div>
        )}

        {/* Assign Student */}
        {activeTab === "assign" && (
          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 max-w-lg mx-auto">
            <h3 className="text-2xl font-semibold mb-4 border-b border-gray-300 pb-2">
              Assign Student
            </h3>
            <form onSubmit={assign} className="space-y-4">
              <select
                value={batchId}
                onChange={(e) => setBatchId(e.target.value)}
                required
                className="w-full bg-gray-100 border border-gray-300 px-3 py-2 rounded"
              >
                <option value="">-- choose batch --</option>
                {batches.map((b) => (
                  <option key={b._id} value={b._id}>
                    {b.name} ({b.subject})
                  </option>
                ))}
              </select>
              <select
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                required
                className="w-full bg-gray-100 border border-gray-300 px-3 py-2 rounded"
              >
                <option value="">-- choose student --</option>
                {students.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name} ({s.email})
                  </option>
                ))}
              </select>
              <button className="w-full bg-red-700 text-white shadow-md hover:shadow-lg hover:shadow-red-300 px-4 py-2 rounded">
                Assign
              </button>
            </form>
          </div>
        )}

        {/* List Batches */}
        {activeTab === "list" && (
          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
            <h3 className="text-2xl font-semibold mb-4 border-b border-gray-300 pb-2">
              All Batches
            </h3>
            {batches.length === 0 ? (
              <p className="text-gray-500">No batches created yet.</p>
            ) : (
              <ul className="space-y-3">
                {batches.map((b) => (
                  <li
                    key={b._id}
                    className="p-4 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                  >
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() =>
                        setExpandedBatch(expandedBatch === b._id ? null : b._id)
                      }
                    >
                      <div>
                        <p className="font-semibold text-lg">{b.name}</p>
                        <p className="text-sm">
                          Subject: {b.subject || "-"} | Capacity: {b.capacity}
                        </p>
                        <p className="text-sm">
                          Trainer: {b.trainer?.name || "-"} | Students:{" "}
                          {b.students?.length || 0}
                        </p>
                      </div>
                      <span className="text-gray-500">
                        {expandedBatch === b._id ? "▲" : "▼"}
                      </span>
                    </div>

                    {expandedBatch === b._id && (
                      <div className="mt-4 bg-gray-50 p-4 rounded overflow-x-auto">
                        {b.students?.length > 0 ? (
                          <table className="min-w-full text-sm">
                            <thead className="border-b border-gray-300">
                              <tr>
                                <th className="px-3 py-2 text-left">Name</th>
                                <th className="px-3 py-2 text-left">Email</th>
                                <th className="px-3 py-2 text-left">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {b.students.map((s) => (
                                <tr
                                  key={s._id}
                                  className="border-b border-gray-200"
                                >
                                  <td className="px-3 py-2">{s.name}</td>
                                  <td className="px-3 py-2">{s.email}</td>
                                  <td className="px-3 py-2">
                                    <button
                                      onClick={() =>
                                        removeStudent(b._id, s._id)
                                      }
                                      className="px-3 py-1 text-xs bg-red-700 text-white rounded shadow-md hover:shadow-lg hover:shadow-red-300"
                                    >
                                      Remove
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        ) : (
                          <p className="text-gray-500">No students assigned.</p>
                        )}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
