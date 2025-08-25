// import { useEffect, useState } from "react";
// import { AdminAPI } from "../api.js";
// import { toast } from "../utils/toast.js";

// export default function DashboardAdmin() {
//   const [activeTab, setActiveTab] = useState("admins");
//   const [users, setUsers] = useState([]);
//   const [form, setForm] = useState({ name: "", email: "", mobile: "", password: "Pass@123" });
//   const [edit, setEdit] = useState(null);

//   // Load all users
//   const load = async () => {
//     try {
//       const res = await AdminAPI.listUsers();
//       setUsers(res);
//     } catch (e) { toast.err(e); }
//   };

//   useEffect(() => { load(); }, []);

//   // Create user
//   const create = async (role) => {
//     try {
//       await AdminAPI.createUser({ ...form, role });
//       toast.ok(`${role} created`);
//       setForm({ name: "", email: "", mobile: "", password: "Pass@123" });
//       load();
//     } catch (e) { toast.err(e); }
//   };

//   // Update user
//   const update = async (e) => {
//     e.preventDefault();
//     try {
//       await AdminAPI.updateUser(edit._id, {
//         name: edit.name,
//         mobile: edit.mobile,
//         role: edit.role,
//         status: edit.status,
//       });
//       toast.ok("Updated");
//       setEdit(null);
//       load();
//     } catch (e) { toast.err(e); }
//   };

//   // Delete user
//   const del = async (id) => {
//     if (!confirm("Delete user?")) return;
//     try { await AdminAPI.deleteUser(id); toast.ok("Deleted"); load(); }
//     catch (e) { toast.err(e); }
//   };

//   // Filtered lists
//   const admins = users.filter((u) => u.role === "admin");
//   const students = users.filter((u) => u.role === "student");
//   const trainers = users.filter((u) => u.role === "trainer");

//   // Table renderer
//   const renderTable = (list, label) => (
//     <div>
//       <h3 className="text-xl font-bold mb-4">{label} Table</h3>
//       <div className="overflow-x-auto bg-gray-800 shadow-lg rounded-lg">
//         <table className="min-w-full divide-y divide-gray-700 text-sm">
//           <thead className="bg-gray-700 text-gray-300">
//             <tr>
//               <th className="px-4 py-2 text-left">Name</th>
//               <th className="px-4 py-2 text-left">Email</th>
//               <th className="px-4 py-2 text-left">Role</th>
//               <th className="px-4 py-2 text-left">Status</th>
//               <th className="px-4 py-2 text-left">Mobile</th>
//               <th className="px-4 py-2 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-700">
//             {list.map((u) => (
//               <tr key={u._id} className="hover:bg-gray-700 transition">
//                 <td className="px-4 py-2">{u.name}</td>
//                 <td className="px-4 py-2">{u.email}</td>
//                 <td className="px-4 py-2 capitalize">{u.role}</td>
//                 <td className="px-4 py-2">{u.status}</td>
//                 <td className="px-4 py-2">{u.mobile}</td>
//                 <td className="px-4 py-2 space-x-2">
//                   <button
//                     onClick={() => setEdit(u)}
//                     className="px-3 py-1 text-xs bg-indigo-600 hover:bg-indigo-700 text-white rounded"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => del(u._id)}
//                     className="px-3 py-1 text-xs bg-red-600 hover:bg-red-700 text-white rounded"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {list.length === 0 && (
//               <tr>
//                 <td colSpan={6} className="text-center py-4 text-gray-400 italic">
//                   No users found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );

//   // Create form renderer
//   const renderCreateForm = (role, label) => (
//     <div className="bg-gray-800 shadow-lg rounded-lg p-6 max-w-md">
//       <h3 className="text-lg font-semibold mb-4">➕ Create {label}</h3>
//       <form
//         onSubmit={(e) => { e.preventDefault(); create(role); }}
//         className="space-y-3"
//       >
//         <input placeholder="Name"
//           className="bg-gray-900 border border-gray-700 px-3 py-2 rounded w-full"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//           required
//         />
//         <input placeholder="Email"
//           className="bg-gray-900 border border-gray-700 px-3 py-2 rounded w-full"
//           value={form.email}
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//           required
//         />
//         <input placeholder="Mobile"
//           className="bg-gray-900 border border-gray-700 px-3 py-2 rounded w-full"
//           value={form.mobile}
//           onChange={(e) => setForm({ ...form, mobile: e.target.value })}
//           required
//         />
//         <input placeholder="Password"
//           className="bg-gray-900 border border-gray-700 px-3 py-2 rounded w-full"
//           value={form.password}
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//         />
//         <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
//           Create
//         </button>
//       </form>
//     </div>
//   );

//   return (
//     <div className="flex min-h-screen bg-gray-900 text-gray-200">
//       {/* Sidebar */}
//       <aside className="w-64 bg-gray-800 p-5 hidden md:block">
//         <h2 className="text-xl font-bold mb-6">⚙️ Admin Dashboard</h2>
//         <nav className="space-y-2">
//           <button onClick={() => setActiveTab("admins")}
//             className={`w-full text-left px-3 py-2 rounded-lg ${activeTab === "admins" ? "bg-indigo-600 text-white" : "hover:bg-gray-700"}`}>
//             🛠 Admins Table
//           </button>
//           <button onClick={() => setActiveTab("students")}
//             className={`w-full text-left px-3 py-2 rounded-lg ${activeTab === "students" ? "bg-indigo-600 text-white" : "hover:bg-gray-700"}`}>
//             🎓 Students Table
//           </button>
//           <button onClick={() => setActiveTab("trainers")}
//             className={`w-full text-left px-3 py-2 rounded-lg ${activeTab === "trainers" ? "bg-indigo-600 text-white" : "hover:bg-gray-700"}`}>
//             🏋️ Trainers Table
//           </button>
//           <button onClick={() => setActiveTab("createStudent")}
//             className={`w-full text-left px-3 py-2 rounded-lg ${activeTab === "createStudent" ? "bg-indigo-600 text-white" : "hover:bg-gray-700"}`}>
//             ➕ Create Student
//           </button>
//           <button onClick={() => setActiveTab("createTrainer")}
//             className={`w-full text-left px-3 py-2 rounded-lg ${activeTab === "createTrainer" ? "bg-indigo-600 text-white" : "hover:bg-gray-700"}`}>
//             ➕ Create Trainer
//           </button>
//           <button onClick={() => setActiveTab("createAdmin")}
//             className={`w-full text-left px-3 py-2 rounded-lg ${activeTab === "createAdmin" ? "bg-indigo-600 text-white" : "hover:bg-gray-700"}`}>
//             ➕ Create Admin
//           </button>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6 space-y-6">
//         {activeTab === "admins" && renderTable(admins, "Admins")}
//         {activeTab === "students" && renderTable(students, "Students")}
//         {activeTab === "trainers" && renderTable(trainers, "Trainers")}
//         {activeTab === "createStudent" && renderCreateForm("student", "Student")}
//         {activeTab === "createTrainer" && renderCreateForm("trainer", "Trainer")}
//         {activeTab === "createAdmin" && renderCreateForm("admin", "Admin")}

//         {/* Edit Form */}
//         {edit && (
//           <form onSubmit={update} className="bg-gray-800 shadow-lg rounded-lg p-6 mt-6 space-y-3 max-w-md">
//             <h4 className="text-lg font-semibold">✏️ Edit User</h4>
//             <input className="bg-gray-900 border border-gray-700 px-3 py-2 rounded w-full"
//               value={edit.name} onChange={(e) => setEdit({ ...edit, name: e.target.value })} />
//             <input className="bg-gray-900 border border-gray-700 px-3 py-2 rounded w-full"
//               value={edit.mobile} onChange={(e) => setEdit({ ...edit, mobile: e.target.value })} />
//             <select className="bg-gray-900 border border-gray-700 px-3 py-2 rounded w-full"
//               value={edit.role} onChange={(e) => setEdit({ ...edit, role: e.target.value })}>
//               <option value="student">student</option>
//               <option value="trainer">trainer</option>
//               <option value="admin">admin</option>
//             </select>
//             <select className="bg-gray-900 border border-gray-700 px-3 py-2 rounded w-full"
//               value={edit.status} onChange={(e) => setEdit({ ...edit, status: e.target.value })}>
//               <option value="pending">pending</option>
//               <option value="active">active</option>
//               <option value="blocked">blocked</option>
//             </select>
//             <div className="flex space-x-3">
//               <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded">Save</button>
//               <button type="button" onClick={() => setEdit(null)} className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded text-white">Cancel</button>
//             </div>
//           </form>
//         )}
//       </main>
//     </div>
//   );
// }



















import { useEffect, useState } from "react";
import { AdminAPI } from "../api.js";
import { toast } from "../utils/toast.js";

export default function DashboardAdmin() {
  const [activeTab, setActiveTab] = useState("admins");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", mobile: "", password: "Pass@123" });
  const [edit, setEdit] = useState(null);

  // Load all users
  const load = async () => {
    try {
      const res = await AdminAPI.listUsers();
      setUsers(res);
    } catch (e) { toast.err(e); }
  };

  useEffect(() => { load(); }, []);

  // Create user
  const create = async (role) => {
    try {
      await AdminAPI.createUser({ ...form, role });
      toast.ok(`${role} created`);
      setForm({ name: "", email: "", mobile: "", password: "Pass@123" });
      load();
    } catch (e) { toast.err(e); }
  };

  // Update user
  const update = async (e) => {
    e.preventDefault();
    try {
      await AdminAPI.updateUser(edit._id, {
        name: edit.name,
        mobile: edit.mobile,
        role: edit.role,
        status: edit.status,
      });
      toast.ok("Updated");
      setEdit(null);
      load();
    } catch (e) { toast.err(e); }
  };

  // Delete user
  const del = async (id) => {
    if (!confirm("Delete user?")) return;
    try { await AdminAPI.deleteUser(id); toast.ok("Deleted"); load(); }
    catch (e) { toast.err(e); }
  };

  // Filtered lists
  const admins = users.filter((u) => u.role === "admin");
  const students = users.filter((u) => u.role === "student");
  const trainers = users.filter((u) => u.role === "trainer");

  // Table renderer
  const renderTable = (list, label) => (
    <div>
      <h3 className="text-xl font-bold mb-4">{label} Table</h3>
      <div className="overflow-x-auto bg-gray-800 shadow-lg rounded-lg">
        <table className="min-w-full divide-y divide-gray-700 text-sm">
          <thead className="bg-gray-700 text-gray-300">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Mobile</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {list.map((u) => (
              <tr key={u._id} className="hover:bg-gray-700 transition">
                <td className="px-4 py-2">{u.name}</td>
                <td className="px-4 py-2">{u.email}</td>
                <td className="px-4 py-2 capitalize">{u.role}</td>
                <td className="px-4 py-2">{u.status}</td>
                <td className="px-4 py-2">{u.mobile}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => setEdit(u)}
                    className="px-3 py-1 text-xs bg-indigo-600 hover:bg-indigo-700 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => del(u._id)}
                    className="px-3 py-1 text-xs bg-red-600 hover:bg-red-700 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {list.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-400 italic">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Create form renderer
  const renderCreateForm = (role, label) => (
    <div className="bg-gray-800 shadow-lg rounded-lg p-6 max-w-md mx-auto">
      <h3 className="text-lg font-semibold mb-4">➕ Create {label}</h3>
      <form
        onSubmit={(e) => { e.preventDefault(); create(role); }}
        className="space-y-3"
      >
        <input placeholder="Name"
          className="bg-gray-900 border border-gray-700 px-3 py-2 rounded w-full"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input placeholder="Email"
          className="bg-gray-900 border border-gray-700 px-3 py-2 rounded w-full"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input placeholder="Mobile"
          className="bg-gray-900 border border-gray-700 px-3 py-2 rounded w-full"
          value={form.mobile}
          onChange={(e) => setForm({ ...form, mobile: e.target.value })}
          required
        />
        <input placeholder="Password"
          className="bg-gray-900 border border-gray-700 px-3 py-2 rounded w-full"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
          Create
        </button>
      </form>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-200">
      {/* Sidebar */}
      <aside
        className={`fixed z-40 inset-y-0 left-0 w-64 bg-gray-800 border-r border-gray-700 p-5 transform transition-transform md:relative md:translate-x-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <h2 className="text-xl font-bold mb-6">⚙️ Admin Dashboard</h2>
        <nav className="space-y-2">
          <button onClick={() => { setActiveTab("admins"); setSidebarOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg ${activeTab === "admins" ? "bg-indigo-600 text-white" : "hover:bg-gray-700"}`}>
            🛠 Admins Table
          </button>
          <button onClick={() => { setActiveTab("students"); setSidebarOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg ${activeTab === "students" ? "bg-indigo-600 text-white" : "hover:bg-gray-700"}`}>
            🎓 Students Table
          </button>
          <button onClick={() => { setActiveTab("trainers"); setSidebarOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg ${activeTab === "trainers" ? "bg-indigo-600 text-white" : "hover:bg-gray-700"}`}>
            🏋️ Trainers Table
          </button>
          <button onClick={() => { setActiveTab("createStudent"); setSidebarOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg ${activeTab === "createStudent" ? "bg-indigo-600 text-white" : "hover:bg-gray-700"}`}>
            ➕ Create Student
          </button>
          <button onClick={() => { setActiveTab("createTrainer"); setSidebarOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg ${activeTab === "createTrainer" ? "bg-indigo-600 text-white" : "hover:bg-gray-700"}`}>
            ➕ Create Trainer
          </button>
          <button onClick={() => { setActiveTab("createAdmin"); setSidebarOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg ${activeTab === "createAdmin" ? "bg-indigo-600 text-white" : "hover:bg-gray-700"}`}>
            ➕ Create Admin
          </button>
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
      <main className="flex-1 p-6 ml-0 md:ml-64 space-y-6">
        {/* Hamburger for mobile */}
        <button
          className="md:hidden mb-4 bg-gray-800 px-3 py-2 rounded shadow"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰ Menu
        </button>

        {activeTab === "admins" && renderTable(admins, "Admins")}
        {activeTab === "students" && renderTable(students, "Students")}
        {activeTab === "trainers" && renderTable(trainers, "Trainers")}
        {activeTab === "createStudent" && renderCreateForm("student", "Student")}
        {activeTab === "createTrainer" && renderCreateForm("trainer", "Trainer")}
        {activeTab === "createAdmin" && renderCreateForm("admin", "Admin")}

        {/* Edit Form */}
        {edit && (
          <form onSubmit={update} className="bg-gray-800 shadow-lg rounded-lg p-6 mt-6 space-y-3 max-w-md mx-auto">
            <h4 className="text-lg font-semibold">✏️ Edit User</h4>
            <input className="bg-gray-900 border border-gray-700 px-3 py-2 rounded w-full"
              value={edit.name} onChange={(e) => setEdit({ ...edit, name: e.target.value })} />
            <input className="bg-gray-900 border border-gray-700 px-3 py-2 rounded w-full"
              value={edit.mobile} onChange={(e) => setEdit({ ...edit, mobile: e.target.value })} />
            <select className="bg-gray-900 border border-gray-700 px-3 py-2 rounded w-full"
              value={edit.role} onChange={(e) => setEdit({ ...edit, role: e.target.value })}>
              <option value="student">student</option>
              <option value="trainer">trainer</option>
              <option value="admin">admin</option>
            </select>
            <select className="bg-gray-900 border border-gray-700 px-3 py-2 rounded w-full"
              value={edit.status} onChange={(e) => setEdit({ ...edit, status: e.target.value })}>
              <option value="pending">pending</option>
              <option value="active">active</option>
              <option value="blocked">blocked</option>
            </select>
            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded">Save</button>
              <button type="button" onClick={() => setEdit(null)} className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded text-white">Cancel</button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
