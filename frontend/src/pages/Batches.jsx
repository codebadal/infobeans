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




























import { useEffect, useState } from 'react';
import { BatchAPI, AdminAPI } from '../api.js';
import { toast } from '../utils/toast.js';

export default function Batches() {
  const [activeTab, setActiveTab] = useState('create');
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile sidebar toggle

  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [capacity, setCapacity] = useState(30);
  const [trainerId, setTrainerId] = useState('');
  const [batches, setBatches] = useState([]);

  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [batchId, setBatchId] = useState('');
  const [expandedBatch, setExpandedBatch] = useState(null);

  const load = async () => {
    try {
      setBatches(await BatchAPI.list());
      setStudents(await AdminAPI.listUsers('student'));
    } catch (e) { toast.err(e); }
  };

  useEffect(() => { load(); }, []);

  const create = async (e) => {
    e.preventDefault();
    try {
      await BatchAPI.create({ name, subject, capacity: Number(capacity), trainerId: trainerId || undefined });
      toast.ok('Batch created');
      setName(''); setSubject(''); setCapacity(30); setTrainerId('');
      load();
    } catch (e) { toast.err(e); }
  };

  const assign = async (e) => {
    e.preventDefault();
    const alreadyAssigned = batches.some(b => b.students?.some(s => s._id === studentId));
    if (alreadyAssigned) return toast.err("This student is already in a batch.");
    try {
      await BatchAPI.assign({ batchId, studentId });
      toast.ok('Assigned');
      setStudentId(''); setBatchId('');
      load();
    } catch (e) { toast.err(e); }
  };

  const removeStudent = async (batchId, studentId) => {
    if (!confirm("Remove this student from batch?")) return;
    try {
      await BatchAPI.removeStudent({ batchId, studentId });
      toast.ok("Removed");
      load();
    } catch (e) { toast.err(e); }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <aside className={`fixed z-40 inset-y-0 left-0 w-64 bg-gray-800 border-r border-gray-700 p-4 transform transition-transform md:relative md:translate-x-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <h2 className="text-xl font-bold text-white mb-6">📚 Batch Panel</h2>
        <nav className="space-y-3">
          {[
            {key:"create", label:"➕ Create Batch", color:"bg-green-600"},
            {key:"assign", label:"👥 Assign Student", color:"bg-blue-600"},
            {key:"list", label:"📋 View Batches", color:"bg-yellow-600"}
          ].map(opt => (
            <button
              key={opt.key}
              onClick={() => { setActiveTab(opt.key); setSidebarOpen(false); }}
              className={`w-full text-left px-4 py-2 rounded transition
                ${activeTab===opt.key ? opt.color : "hover:bg-gray-700"}`}
            >
              {opt.label}
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
          className="md:hidden mb-4 bg-gray-800 px-3 py-2 rounded shadow"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰ Menu
        </button>

        {activeTab === 'create' && (
          <div className="bg-gray-800 shadow-lg rounded-xl p-6 border border-gray-700 max-w-lg mx-auto">
            <h3 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">Create Batch</h3>
            <form onSubmit={create} className="space-y-4">
              <input placeholder="Batch Name" className="w-full bg-gray-900 border border-gray-700 px-3 py-2 rounded" value={name} onChange={e=>setName(e.target.value)} required/>
              <input placeholder="Subject" className="w-full bg-gray-900 border border-gray-700 px-3 py-2 rounded" value={subject} onChange={e=>setSubject(e.target.value)} />
              <input type="number" placeholder="Capacity" className="w-full bg-gray-900 border border-gray-700 px-3 py-2 rounded" value={capacity} onChange={e=>setCapacity(e.target.value)} />
              <input placeholder="Trainer ID (optional)" className="w-full bg-gray-900 border border-gray-700 px-3 py-2 rounded" value={trainerId} onChange={e=>setTrainerId(e.target.value)} />
              <button className="w-full bg-green-600 hover:bg-green-700 px-4 py-2 rounded">Create</button>
            </form>
          </div>
        )}

        {activeTab === 'assign' && (
          <div className="bg-gray-800 shadow-lg rounded-xl p-6 border border-gray-700 max-w-lg mx-auto">
            <h3 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">Assign Student</h3>
            <form onSubmit={assign} className="space-y-4">
              <select value={batchId} onChange={e=>setBatchId(e.target.value)} required className="w-full bg-gray-900 border border-gray-700 px-3 py-2 rounded">
                <option value="">-- choose batch --</option>
                {batches.map(b=> <option key={b._id} value={b._id}>{b.name} ({b.subject})</option>)}
              </select>
              <select value={studentId} onChange={e=>setStudentId(e.target.value)} required className="w-full bg-gray-900 border border-gray-700 px-3 py-2 rounded">
                <option value="">-- choose student --</option>
                {students.map(s=> <option key={s._id} value={s._id}>{s.name} ({s.email})</option>)}
              </select>
              <button className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">Assign</button>
            </form>
          </div>
        )}

        {activeTab === 'list' && (
          <div className="bg-gray-800 shadow-lg rounded-xl p-6 border border-gray-700">
            <h3 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">All Batches</h3>
            {batches.length === 0 ? <p className="text-gray-400">No batches created yet.</p> : (
              <ul className="space-y-3">
                {batches.map(b=>(
                  <li key={b._id} className="p-4 border border-gray-700 rounded-lg hover:bg-gray-700 transition">
                    <div 
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => setExpandedBatch(expandedBatch === b._id ? null : b._id)}
                    >
                      <div>
                        <p className="font-semibold text-lg">{b.name}</p>
                        <p className="text-sm">Subject: {b.subject || "-"} | Capacity: {b.capacity}</p>
                        <p className="text-sm">Trainer: {b.trainer?.name || "-"} | Students: {b.students?.length || 0}</p>
                      </div>
                      <span className="text-gray-400">{expandedBatch === b._id ? "▲" : "▼"}</span>
                    </div>

                    {expandedBatch === b._id && (
                      <div className="mt-4 bg-gray-900 p-4 rounded overflow-x-auto">
                        {b.students?.length > 0 ? (
                          <table className="min-w-full text-sm">
                            <thead className="border-b border-gray-700">
                              <tr>
                                <th className="px-3 py-2 text-left">Name</th>
                                <th className="px-3 py-2 text-left">Email</th>
                                <th className="px-3 py-2 text-left">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {b.students.map(s => (
                                <tr key={s._id} className="border-b border-gray-800">
                                  <td className="px-3 py-2">{s.name}</td>
                                  <td className="px-3 py-2">{s.email}</td>
                                  <td className="px-3 py-2">
                                    <button 
                                      onClick={() => removeStudent(b._id, s._id)} 
                                      className="px-3 py-1 text-xs bg-red-600 hover:bg-red-700 text-white rounded"
                                    >
                                      Remove
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        ) : (
                          <p className="text-gray-400">No students assigned.</p>
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
