// // src/components/TaskList.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const TaskList = ({ refresh }) => {
//   const [tasks, setTasks] = useState([]);

//   // Fetch tasks from backend
//   const fetchTasks = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/tasks');
//       setTasks(res.data);
//     } catch (err) {
//       console.error(err);
//       alert('Failed to load tasks');
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, [refresh]);

//   return (
//     <div className="card p-3">
//       <h4>Task List</h4>
//       {tasks.length === 0 ? (
//         <p>No tasks found.</p>
//       ) : (
//         <table className="table table-bordered mt-3">
//           <thead className="thead-light">
//             <tr>
//               <th>Title</th>
//               <th>Assigned To</th>
//               <th>Status</th>
//               <th>Priority</th>
//               <th>Due Date</th>
//               <th>Description</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tasks.map((task) => (
//               <tr key={task._id}>
//                 <td>{task.title}</td>
//                 <td>{task.assignedTo}</td>
//                 <td>{task.status}</td>
//                 <td>{task.priority}</td>
//                 <td>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}</td>
//                 <td>{task.description}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default TaskList;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const TaskList = ({ refresh }) => {
//   const [tasks, setTasks] = useState([]);
//   const [statusFilter, setStatusFilter] = useState('');
//   const [assigneeFilter, setAssigneeFilter] = useState('');

//   // Fetch tasks from backend
//   const fetchTasks = async () => {
//     try {
//       const query = [];
//       if (statusFilter) query.push(`status=${statusFilter}`);
//       if (assigneeFilter) query.push(`assignedTo=${assigneeFilter}`);
//       const queryStr = query.length > 0 ? `?${query.join('&')}` : '';

//       const res = await axios.get(`http://localhost:5000/api/tasks${queryStr}`);
//       setTasks(res.data);
//     } catch (err) {
//       console.error(err);
//       alert('Failed to load tasks');
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, [refresh, statusFilter, assigneeFilter]);

//   const handleDelete = async (id) => {
//     if (!window.confirm('Delete this task?')) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/tasks/${id}`);
//       fetchTasks();
//     } catch (err) {
//       console.error(err);
//       alert('Delete failed');
//     }
//   };

//   const handleStatusChange = async (id, newStatus) => {
//     try {
//       await axios.patch(`http://localhost:5000/api/tasks/${id}`, { status: newStatus });
//       fetchTasks();
//     } catch (err) {
//       console.error(err);
//       alert('Status update failed');
//     }
//   };

//   return (
//     <div className="card p-3">
//       <h4>Task List</h4>

//       {/* Filters */}
//       <div className="row mb-3">
//         <div className="col-md-6">
//           <input
//             placeholder="Filter by assignee"
//             className="form-control"
//             value={assigneeFilter}
//             onChange={(e) => setAssigneeFilter(e.target.value)}
//           />
//         </div>
//         <div className="col-md-6">
//           <select
//             className="form-control"
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//           >
//             <option value="">All Statuses</option>
//             <option>To Do</option>
//             <option>In Progress</option>
//             <option>Done</option>
//           </select>
//         </div>
//       </div>

//       {/* Task Table */}
//       {tasks.length === 0 ? (
//         <p>No tasks found.</p>
//       ) : (
//         <table className="table table-bordered">
//           <thead className="thead-light">
//             <tr>
//               <th>Title</th>
//               <th>Assigned To</th>
//               <th>Status</th>
//               <th>Priority</th>
//               <th>Due Date</th>
//               <th>Description</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tasks.map((task) => (
//               <tr key={task._id}>
//                 <td>{task.title}</td>
//                 <td>{task.assignedTo}</td>
//                 <td>
//                   <select
//                     className="form-control"
//                     value={task.status}
//                     onChange={(e) => handleStatusChange(task._id, e.target.value)}
//                   >
//                     <option>To Do</option>
//                     <option>In Progress</option>
//                     <option>Done</option>
//                   </select>
//                 </td>
//                 <td>{task.priority}</td>
//                 <td>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}</td>
//                 <td>{task.description}</td>
//                 <td>
//                   <button
//                     className="btn btn-sm btn-danger"
//                     onClick={() => handleDelete(task._id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default TaskList;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const TaskList = ({ refresh }) => {
//   const [tasks, setTasks] = useState([]);
//   const [filteredTasks, setFilteredTasks] = useState([]);
//   const [statusFilter, setStatusFilter] = useState('');
//   const [searchText, setSearchText] = useState('');
//   const [sortBy, setSortBy] = useState('');
//   const [statusCounts, setStatusCounts] = useState({
//     todo: 0,
//     inprogress: 0,
//     done: 0,
//   });

//   const fetchTasks = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/tasks');
//       setTasks(res.data);
//     } catch (err) {
//       console.error(err);
//       alert('Failed to load tasks');
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, [refresh]);

//   useEffect(() => {
//     let filtered = tasks;

//     if (statusFilter) {
//       filtered = filtered.filter(task => task.status === statusFilter);
//     }

//     if (searchText) {
//       const text = searchText.toLowerCase();
//       filtered = filtered.filter(
//         task =>
//           task.assignedTo?.toLowerCase().includes(text) ||
//           task.title?.toLowerCase().includes(text)
//       );
//     }

//     // Sort
//     if (sortBy === 'dueDate') {
//       filtered = [...filtered].sort(
//         (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
//       );
//     } else if (sortBy === 'priority') {
//       const priorityOrder = { High: 1, Medium: 2, Low: 3 };
//       filtered = [...filtered].sort(
//         (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
//       );
//     }

//     setFilteredTasks(filtered);

//     const todo = filtered.filter(t => t.status === 'To Do').length;
//     const inprogress = filtered.filter(t => t.status === 'In Progress').length;
//     const done = filtered.filter(t => t.status === 'Done').length;

//     setStatusCounts({ todo, inprogress, done });
//   }, [tasks, statusFilter, searchText, sortBy]);

//   const handleDelete = async (id) => {
//     if (!window.confirm('Delete this task?')) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/tasks/${id}`);
//       fetchTasks();
//     } catch (err) {
//       console.error(err);
//       alert('Delete failed');
//     }
//   };

//   const handleStatusChange = async (id, newStatus) => {
//     try {
//       await axios.patch(`http://localhost:5000/api/tasks/${id}`, { status: newStatus });
//       fetchTasks();
//     } catch (err) {
//       console.error(err);
//       alert('Status update failed');
//     }
//   };

//   const getPriorityBadge = (priority) => {
//     switch (priority) {
//       case 'High':
//         return <span className="badge bg-danger">{priority}</span>;
//       case 'Medium':
//         return <span className="badge bg-warning text-dark">{priority}</span>;
//       case 'Low':
//         return <span className="badge bg-success">{priority}</span>;
//       default:
//         return priority;
//     }
//   };

//   return (
//     <div className="card p-3">
//       <h4>Task List</h4>

//       {/* Filters */}
//       <div className="row mb-3">
//         <div className="col-md-4">
//           <input
//             placeholder="Search by title or assignee"
//             className="form-control"
//             value={searchText}
//             onChange={(e) => setSearchText(e.target.value)}
//           />
//         </div>
//         <div className="col-md-4">
//           <select
//             className="form-control"
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//           >
//             <option value="">All Statuses</option>
//             <option>To Do</option>
//             <option>In Progress</option>
//             <option>Done</option>
//           </select>
//         </div>
//         <div className="col-md-4">
//           <select
//             className="form-control"
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//           >
//             <option value="">Sort By</option>
//             <option value="dueDate">Due Date</option>
//             <option value="priority">Priority</option>
//           </select>
//         </div>
//       </div>

//       {/* Dashboard */}
//       <div className="mb-3 d-flex gap-3 flex-wrap">
//         <span className="badge bg-secondary p-2">🟦 To Do: {statusCounts.todo}</span>
//         <span className="badge bg-warning text-dark p-2">🟨 In Progress: {statusCounts.inprogress}</span>
//         <span className="badge bg-success p-2">🟩 Done: {statusCounts.done}</span>
//       </div>

//       {/* Task Table */}
//       {filteredTasks.length === 0 ? (
//         <p>No tasks found.</p>
//       ) : (
//         <table className="table table-bordered">
//           <thead className="thead-light">
//             <tr>
//               <th>Title</th>
//               <th>Assigned To</th>
//               <th>Status</th>
//               <th>Priority</th>
//               <th>Due Date</th>
//               <th>Description</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredTasks.map((task) => (
//               <tr
//                 key={task._id}
//                 className={task.status === 'Done' ? 'table-success text-muted' : ''}
//                 style={{
//                   textDecoration: task.status === 'Done' ? 'line-through' : 'none'
//                 }}
//               >
//                 <td>{task.title}</td>
//                 <td>{task.assignedTo}</td>
//                 <td>
//                   <select
//                     className="form-control"
//                     value={task.status}
//                     onChange={(e) => handleStatusChange(task._id, e.target.value)}
//                   >
//                     <option>To Do</option>
//                     <option>In Progress</option>
//                     <option>Done</option>
//                   </select>
//                 </td>
//                 <td>{getPriorityBadge(task.priority)}</td>
//                 <td>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}</td>
//                 <td>{task.description}</td>
//                 <td>
//                   <button
//                     className="btn btn-sm btn-danger"
//                     onClick={() => handleDelete(task._id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default TaskList;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const TaskList = ({ refresh, searchText }) => {
//   const [tasks, setTasks] = useState([]);
//   const [filteredTasks, setFilteredTasks] = useState([]);
//   const [statusFilter, setStatusFilter] = useState('');
//   const [sortBy, setSortBy] = useState('');
//   const [statusCounts, setStatusCounts] = useState({
//     todo: 0,
//     inprogress: 0,
//     done: 0,
//   });

//   const fetchTasks = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/tasks');
//       setTasks(res.data);
//     } catch (err) {
//       console.error(err);
//       alert('Failed to load tasks');
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, [refresh]);

//   useEffect(() => {
//     let filtered = tasks;

//     if (statusFilter) {
//       filtered = filtered.filter(task => task.status === statusFilter);
//     }

//     if (searchText) {
//       const text = searchText.toLowerCase();
//       filtered = filtered.filter(
//         task =>
//           task.assignedTo?.toLowerCase().includes(text) ||
//           task.title?.toLowerCase().includes(text)
//       );
//     }

//     if (sortBy === 'dueDate') {
//       filtered = [...filtered].sort(
//         (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
//       );
//     } else if (sortBy === 'priority') {
//       const priorityOrder = { High: 1, Medium: 2, Low: 3 };
//       filtered = [...filtered].sort(
//         (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
//       );
//     }

//     setFilteredTasks(filtered);

//     const todo = filtered.filter(t => t.status === 'To Do').length;
//     const inprogress = filtered.filter(t => t.status === 'In Progress').length;
//     const done = filtered.filter(t => t.status === 'Done').length;

//     setStatusCounts({ todo, inprogress, done });
//   }, [tasks, statusFilter, searchText, sortBy]);

//   const handleDelete = async (id) => {
//     if (!window.confirm('Delete this task?')) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/tasks/${id}`);
//       fetchTasks();
//     } catch (err) {
//       console.error(err);
//       alert('Delete failed');
//     }
//   };

//   const handleStatusChange = async (id, newStatus) => {
//     try {
//       await axios.patch(`http://localhost:5000/api/tasks/${id}`, { status: newStatus });
//       fetchTasks();
//     } catch (err) {
//       console.error(err);
//       alert('Status update failed');
//     }
//   };

//   const getPriorityBadge = (priority) => {
//     switch (priority) {
//       case 'High':
//         return <span className="badge bg-danger">{priority}</span>;
//       case 'Medium':
//         return <span className="badge bg-warning text-dark">{priority}</span>;
//       case 'Low':
//         return <span className="badge bg-success">{priority}</span>;
//       default:
//         return priority;
//     }
//   };

//   return (
//     <div className="card p-3">
//       <h4>Task List</h4>

//       {/* Filters */}
//       <div className="row mb-3">
//         <div className="col-md-6">
//           <select
//             className="form-control"
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//           >
//             <option value="">All Statuses</option>
//             <option>To Do</option>
//             <option>In Progress</option>
//             <option>Done</option>
//           </select>
//         </div>
//         <div className="col-md-6">
//           <select
//             className="form-control"
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//           >
//             <option value="">Sort By</option>
//             <option value="dueDate">Due Date</option>
//             <option value="priority">Priority</option>
//           </select>
//         </div>
//       </div>

//       {/* Dashboard */}
//       <div className="mb-3 d-flex gap-3 flex-wrap">
//         <span className="badge bg-secondary p-2">🟦 To Do: {statusCounts.todo}</span>
//         <span className="badge bg-warning text-dark p-2">🟨 In Progress: {statusCounts.inprogress}</span>
//         <span className="badge bg-success p-2">🟩 Done: {statusCounts.done}</span>
//       </div>

//       {/* Task Table */}
//       {filteredTasks.length === 0 ? (
//         <p>No tasks found.</p>
//       ) : (
//         <table className="table table-bordered">
//           <thead className="thead-light">
//             <tr>
//               <th>Title</th>
//               <th>Assigned To</th>
//               <th>Status</th>
//               <th>Priority</th>
//               <th>Due Date</th>
//               <th>Description</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredTasks.map((task) => (
//               <tr
//                 key={task._id}
//                 className={task.status === 'Done' ? 'table-success text-muted' : ''}
//                 style={{
//                   textDecoration: task.status === 'Done' ? 'line-through' : 'none'
//                 }}
//               >
//                 <td>{task.title}</td>
//                 <td>{task.assignedTo}</td>
//                 <td>
//                   <select
//                     className="form-control"
//                     value={task.status}
//                     onChange={(e) => handleStatusChange(task._id, e.target.value)}
//                   >
//                     <option>To Do</option>
//                     <option>In Progress</option>
//                     <option>Done</option>
//                   </select>
//                 </td>
//                 <td>{getPriorityBadge(task.priority)}</td>
//                 <td>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}</td>
//                 <td>{task.description}</td>
//                 <td>
//                   <button
//                     className="btn btn-sm btn-danger"
//                     onClick={() => handleDelete(task._id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default TaskList;


// src/components/TaskList.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Trash2, Pin, Filter, SortAsc } from 'lucide-react';

// const TaskList = ({ refresh, searchText }) => {
//   const [tasks, setTasks] = useState([]);
//   const [filteredTasks, setFilteredTasks] = useState([]);
//   const [statusFilter, setStatusFilter] = useState('');
//   const [sortBy, setSortBy] = useState('');
//   const [statusCounts, setStatusCounts] = useState({
//     todo: 0,
//     inprogress: 0,
//     done: 0,
//   });

//   const fetchTasks = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/tasks');
//       setTasks(res.data);
//     } catch (err) {
//       console.error(err);
//       alert('Failed to load tasks');
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, [refresh]);

//   useEffect(() => {
//     let filtered = tasks;

//     if (statusFilter) {
//       filtered = filtered.filter(task => task.status === statusFilter);
//     }

//     if (searchText) {
//       const text = searchText.toLowerCase();
//       filtered = filtered.filter(
//         task =>
//           task.assignedTo?.toLowerCase().includes(text) ||
//           task.title?.toLowerCase().includes(text)
//       );
//     }

//     if (sortBy === 'dueDate') {
//       filtered = [...filtered].sort(
//         (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
//       );
//     } else if (sortBy === 'priority') {
//       const priorityOrder = { High: 1, Medium: 2, Low: 3 };
//       filtered = [...filtered].sort(
//         (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
//       );
//     }

//     setFilteredTasks(filtered);

//     const todo = filtered.filter(t => t.status === 'To Do').length;
//     const inprogress = filtered.filter(t => t.status === 'In Progress').length;
//     const done = filtered.filter(t => t.status === 'Done').length;

//     setStatusCounts({ todo, inprogress, done });
//   }, [tasks, statusFilter, searchText, sortBy]);

//   const handleDelete = async (id) => {
//     if (!window.confirm('Delete this task?')) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/tasks/${id}`);
//       fetchTasks();
//     } catch (err) {
//       console.error(err);
//       alert('Delete failed');
//     }
//   };

//   const handleStatusChange = async (id, newStatus) => {
//     try {
//       await axios.patch(`http://localhost:5000/api/tasks/${id}`, { status: newStatus });
//       fetchTasks();
//     } catch (err) {
//       console.error(err);
//       alert('Status update failed');
//     }
//   };

//   const getPriorityBadge = (priority) => {
//     const base = 'px-2 py-1 rounded-full text-xs font-medium';
//     switch (priority) {
//       case 'High':
//         return <span className={`${base} bg-red-100 text-red-600`}>High</span>;
//       case 'Medium':
//         return <span className={`${base} bg-yellow-100 text-yellow-700`}>Medium</span>;
//       case 'Low':
//         return <span className={`${base} bg-green-100 text-green-700`}>Low</span>;
//       default:
//         return priority;
//     }
//   };

//   return (
//     <div className="bg-white shadow-md rounded-lg p-6">
//       <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-3">
//         <h3 className="text-xl font-semibold text-gray-800">📋 Task Dashboard</h3>
//         <div className="flex flex-wrap gap-3 text-sm font-medium">
//           <span className="bg-gray-100 px-3 py-1 rounded-full">🟦 To Do: {statusCounts.todo}</span>
//           <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">🟨 In Progress: {statusCounts.inprogress}</span>
//           <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">🟩 Done: {statusCounts.done}</span>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
//         <div className="flex items-center gap-2">
//           <Filter className="text-gray-500" size={18} />
//           <select
//             className="w-full px-3 py-2 border border-gray-300 rounded-md"
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//           >
//             <option value="">All Statuses</option>
//             <option>To Do</option>
//             <option>In Progress</option>
//             <option>Done</option>
//           </select>
//         </div>
//         <div className="flex items-center gap-2">
//           <SortAsc className="text-gray-500" size={18} />
//           <select
//             className="w-full px-3 py-2 border border-gray-300 rounded-md"
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//           >
//             <option value="">Sort By</option>
//             <option value="dueDate">Due Date</option>
//             <option value="priority">Priority</option>
//           </select>
//         </div>
//       </div>

//       {/* Task Table */}
//       <div className="overflow-x-auto">
//         {filteredTasks.length === 0 ? (
//           <p className="text-gray-500">No tasks found.</p>
//         ) : (
//           <table className="w-full table-auto border border-gray-200 rounded-md text-sm">
//             <thead>
//               <tr className="bg-gray-100 text-left">
//                 <th className="px-3 py-2">📌</th>
//                 <th className="px-3 py-2">Title</th>
//                 <th className="px-3 py-2">Assigned To</th>
//                 <th className="px-3 py-2">Status</th>
//                 <th className="px-3 py-2">Priority</th>
//                 <th className="px-3 py-2">Due Date</th>
//                 <th className="px-3 py-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredTasks.map((task) => (
//                 <tr
//                   key={task._id}
//                   className={`border-t ${
//                     task.status === 'Done' ? 'bg-green-50 text-gray-500 line-through' : ''
//                   }`}
//                 >
//                   <td className="px-3 py-2"><Pin size={16} className="text-gray-400" /></td>
//                   <td className="px-3 py-2">{task.title}</td>
//                   <td className="px-3 py-2">{task.assignedTo}</td>
//                   <td className="px-3 py-2">
//                     <select
//                       className="bg-white border border-gray-300 rounded-md px-2 py-1"
//                       value={task.status}
//                       onChange={(e) => handleStatusChange(task._id, e.target.value)}
//                     >
//                       <option>To Do</option>
//                       <option>In Progress</option>
//                       <option>Done</option>
//                     </select>
//                   </td>
//                   <td className="px-3 py-2">{getPriorityBadge(task.priority)}</td>
//                   <td className="px-3 py-2">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}</td>
//                   <td className="px-3 py-2">
//                     <button
//                       className="text-red-500 hover:text-red-700"
//                       onClick={() => handleDelete(task._id)}
//                     >
//                       <Trash2 size={18} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TaskList;












// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//   Trash2,
//   Pin,
//   PinOff,
//   Filter,
//   SortAsc,
//   MoreVertical
// } from 'lucide-react';

// const TaskList = ({ refresh, searchText }) => {
//   const [tasks, setTasks] = useState([]);
//   const [filteredTasks, setFilteredTasks] = useState([]);
//   const [statusFilter, setStatusFilter] = useState('');
//   const [sortBy, setSortBy] = useState('');
//   const [pinned, setPinned] = useState({}); // store pinned status locally
//   const [statusCounts, setStatusCounts] = useState({
//     todo: 0,
//     inprogress: 0,
//     done: 0,
//   });

//   const fetchTasks = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/tasks');
//       setTasks(res.data);
//     } catch (err) {
//       console.error(err);
//       alert('Failed to load tasks');
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, [refresh]);

//   useEffect(() => {
//     let filtered = tasks.map(task => ({
//       ...task,
//       isPinned: pinned[task._id] || false,
//     }));

//     if (statusFilter) {
//       filtered = filtered.filter(task => task.status === statusFilter);
//     }

//     if (searchText) {
//       const text = searchText.toLowerCase();
//       filtered = filtered.filter(
//         task =>
//           task.assignedTo?.toLowerCase().includes(text) ||
//           task.title?.toLowerCase().includes(text)
//       );
//     }

//     if (sortBy === 'dueDate') {
//       filtered = [...filtered].sort(
//         (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
//       );
//     } else if (sortBy === 'priority') {
//       const priorityOrder = { High: 1, Medium: 2, Low: 3 };
//       filtered = [...filtered].sort(
//         (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
//       );
//     }

//     // Pinned tasks first
//     filtered = filtered.sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));

//     setFilteredTasks(filtered);

//     const todo = filtered.filter(t => t.status === 'To Do').length;
//     const inprogress = filtered.filter(t => t.status === 'In Progress').length;
//     const done = filtered.filter(t => t.status === 'Done').length;

//     setStatusCounts({ todo, inprogress, done });
//   }, [tasks, statusFilter, searchText, sortBy, pinned]);

//   const handleDelete = async (id) => {
//     if (!window.confirm('Delete this task?')) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/tasks/${id}`);
//       fetchTasks();
//     } catch (err) {
//       console.error(err);
//       alert('Delete failed');
//     }
//   };

//   const handleStatusChange = async (id, newStatus) => {
//     try {
//       await axios.patch(`http://localhost:5000/api/tasks/${id}`, { status: newStatus });
//       fetchTasks();
//     } catch (err) {
//       console.error(err);
//       alert('Status update failed');
//     }
//   };

//   const togglePin = (id) => {
//     setPinned(prev => ({ ...prev, [id]: !prev[id] }));
//   };

//   const getPriorityBadge = (priority) => {
//     const base = 'px-2 py-1 rounded-full text-xs font-semibold';
//     switch (priority) {
//       case 'High':
//         return <span className={`${base} bg-red-100 text-red-600`}>High</span>;
//       case 'Medium':
//         return <span className={`${base} bg-yellow-100 text-yellow-700`}>Medium</span>;
//       case 'Low':
//         return <span className={`${base} bg-green-100 text-green-700`}>Low</span>;
//       default:
//         return priority;
//     }
//   };

//   return (
//     <div className="bg-white shadow-md rounded-lg p-6">
//       {/* Dashboard */}
//       <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-3">
//         <h3 className="text-xl font-semibold text-gray-800">📋 Task Board</h3>
//         <div className="flex flex-wrap gap-3 text-sm font-medium">
//           <span className="bg-gray-100 px-3 py-1 rounded-full">🟦 To Do: {statusCounts.todo}</span>
//           <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">🟨 In Progress: {statusCounts.inprogress}</span>
//           <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">🟩 Done: {statusCounts.done}</span>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
//         <div className="flex items-center gap-2">
//           <Filter size={18} className="text-gray-500" />
//           <select
//             className="w-full px-3 py-2 border border-gray-300 rounded-md"
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//           >
//             <option value="">All Statuses</option>
//             <option>To Do</option>
//             <option>In Progress</option>
//             <option>Done</option>
//           </select>
//         </div>
//         <div className="flex items-center gap-2">
//           <SortAsc size={18} className="text-gray-500" />
//           <select
//             className="w-full px-3 py-2 border border-gray-300 rounded-md"
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//           >
//             <option value="">Sort By</option>
//             <option value="dueDate">Due Date</option>
//             <option value="priority">Priority</option>
//           </select>
//         </div>
//       </div>

//       {/* Cards */}
//       <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//         {filteredTasks.length === 0 ? (
//           <p className="text-gray-500 col-span-full">No tasks found.</p>
//         ) : (
//           filteredTasks.map(task => (
//             <div
//               key={task._id}
//               className={`relative bg-gray-50 rounded-lg border border-gray-200 p-4 shadow-sm ${
//                 task.status === 'Done' ? 'opacity-70 line-through' : ''
//               }`}
//             >
//               {/* Pin icon */}
//               <button
//                 className="absolute top-2 right-2 text-gray-400 hover:text-yellow-500"
//                 onClick={() => togglePin(task._id)}
//               >
//                 {pinned[task._id] ? <Pin fill="currentColor" size={18} /> : <PinOff size={18} />}
//               </button>

//               <h4 className="text-lg font-semibold text-gray-800 mb-1">{task.title}</h4>
//               <p className="text-sm text-gray-600 mb-2">{task.description}</p>

//               <div className="flex justify-between text-sm text-gray-500 mb-2">
//                 <span>👤 {task.assignedTo || 'Unassigned'}</span>
//                 <span>📅 {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No date'}</span>
//               </div>

//               <div className="flex items-center justify-between mt-2">
//                 <div className="flex gap-2 items-center">
//                   <select
//                     className="px-2 py-1 rounded-md border border-gray-300 text-sm"
//                     value={task.status}
//                     onChange={(e) => handleStatusChange(task._id, e.target.value)}
//                   >
//                     <option>To Do</option>
//                     <option>In Progress</option>
//                     <option>Done</option>
//                   </select>
//                   {getPriorityBadge(task.priority)}
//                 </div>
//                 <button
//                   onClick={() => handleDelete(task._id)}
//                   className="text-red-500 hover:text-red-700"
//                 >
//                   <Trash2 size={18} />
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default TaskList;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//   Trash2,
//   Pin,
//   PinOff,
//   Filter,
//   SortAsc,
//   X,
//   Calendar,
//   User,
//   Flag
// } from 'lucide-react';

// const TaskList = ({ refresh, searchText }) => {
//   const [tasks, setTasks] = useState([]);
//   const [filteredTasks, setFilteredTasks] = useState([]);
//   const [statusFilter, setStatusFilter] = useState('');
//   const [sortBy, setSortBy] = useState('');
//   const [pinned, setPinned] = useState({});
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [statusCounts, setStatusCounts] = useState({
//     todo: 0,
//     inprogress: 0,
//     done: 0,
//   });

//   const fetchTasks = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get('http://localhost:5000/api/tasks');
//       setTasks(res.data);
//     } catch (err) {
//       console.error(err);
//       alert('Failed to load tasks');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, [refresh]);

//   useEffect(() => {
//     let filtered = tasks.map(task => ({
//       ...task,
//       isPinned: pinned[task._id] || false,
//     }));

//     if (statusFilter) {
//       filtered = filtered.filter(task => task.status === statusFilter);
//     }

//     if (searchText) {
//       const text = searchText.toLowerCase();
//       filtered = filtered.filter(
//         task =>
//           task.assignedTo?.toLowerCase().includes(text) ||
//           task.title?.toLowerCase().includes(text)
//       );
//     }

//     if (sortBy === 'dueDate') {
//       filtered = [...filtered].sort(
//         (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
//       );
//     } else if (sortBy === 'priority') {
//       const priorityOrder = { High: 1, Medium: 2, Low: 3 };
//       filtered = [...filtered].sort(
//         (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
//       );
//     }

//     filtered = filtered.sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));

//     setFilteredTasks(filtered);

//     const todo = filtered.filter(t => t.status === 'To Do').length;
//     const inprogress = filtered.filter(t => t.status === 'In Progress').length;
//     const done = filtered.filter(t => t.status === 'Done').length;

//     setStatusCounts({ todo, inprogress, done });
//   }, [tasks, statusFilter, searchText, sortBy, pinned]);

//   const handleDelete = async (id) => {
//     if (!window.confirm('Delete this task?')) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/tasks/${id}`);
//       fetchTasks();
//     } catch (err) {
//       console.error(err);
//       alert('Delete failed');
//     }
//   };

//   const handleStatusChange = async (id, newStatus) => {
//     try {
//       await axios.patch(`http://localhost:5000/api/tasks/${id}`, { status: newStatus });
//       fetchTasks();
//     } catch (err) {
//       console.error(err);
//       alert('Status update failed');
//     }
//   };

//   const togglePin = (id) => {
//     setPinned(prev => ({ ...prev, [id]: !prev[id] }));
//   };

//   const handleCardDoubleClick = (task) => {
//     setSelectedTask(task);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedTask(null);
//   };

//   const getPriorityBadge = (priority) => {
//     const base = 'px-2 sm:px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1';
//     switch (priority) {
//       case 'High':
//         return <span className={`${base} bg-red-50 text-red-600 border border-red-200`}><Flag size={10} className="hidden sm:block" />High</span>;
//       case 'Medium':
//         return <span className={`${base} bg-yellow-50 text-yellow-700 border border-yellow-200`}><Flag size={10} className="hidden sm:block" />Medium</span>;
//       case 'Low':
//         return <span className={`${base} bg-green-50 text-green-700 border border-green-200`}><Flag size={10} className="hidden sm:block" />Low</span>;
//       default:
//         return priority;
//     }
//   };

//   const getStatusBadge = (status) => {
//     const base = 'px-2 sm:px-3 py-1 rounded-full text-xs font-medium';
//     switch (status) {
//       case 'To Do':
//         return <span className={`${base} bg-blue-50 text-blue-600 border border-blue-200`}>To Do</span>;
//       case 'In Progress':
//         return <span className={`${base} bg-orange-50 text-orange-600 border border-orange-200`}>In Progress</span>;
//       case 'Done':
//         return <span className={`${base} bg-green-50 text-green-600 border border-green-200`}>Done</span>;
//       default:
//         return status;
//     }
//   };

//   if (loading) {
//     return (
//       <div className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen p-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="bg-white rounded-2xl p-6 mb-6 border-0">
//             <div className="animate-pulse">
//               <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
//               <div className="flex gap-4">
//                 <div className="h-10 bg-gray-200 rounded w-24"></div>
//                 <div className="h-10 bg-gray-200 rounded w-24"></div>
//                 <div className="h-10 bg-gray-200 rounded w-24"></div>
//               </div>
//             </div>
//           </div>
//           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//             {[...Array(8)].map((_, i) => (
//               <div key={i} className="bg-white rounded-2xl p-6 border-0">
//                 <div className="animate-pulse">
//                   <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
//                   <div className="h-3 bg-gray-200 rounded w-full mb-4"></div>
//                   <div className="h-3 bg-gray-200 rounded w-1/2"></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen p-6">
//         <div className="max-w-7xl mx-auto">
//           {/* Header Section */}
//           <div className="bg-white rounded-2xl p-6 mb-6 border-0">
//             <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
//                   <span className="text-white text-lg">📋</span>
//                 </div>
//                 <h1 className="text-2xl font-bold text-gray-900">Task Board</h1>
//               </div>
              
//               <div className="flex flex-wrap gap-3">
//                 <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-xl border border-blue-200">
//                   <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
//                   <span className="text-sm font-medium text-blue-700">To Do: {statusCounts.todo}</span>
//                 </div>
//                 <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-xl border border-orange-200">
//                   <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
//                   <span className="text-sm font-medium text-orange-700">In Progress: {statusCounts.inprogress}</span>
//                 </div>
//                 <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-xl border border-green-200">
//                   <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//                   <span className="text-sm font-medium text-green-700">Done: {statusCounts.done}</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Filters Section */}
//           <div className="bg-white rounded-2xl p-6 mb-6 border-0">
//             <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
//               <div className="relative">
//                 <Filter size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 <select
//                   className="w-full pl-10 pr-4 py-3 bg-gray-50 border-0 rounded-xl text-sm font-medium text-gray-700 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
//                   value={statusFilter}
//                   onChange={(e) => setStatusFilter(e.target.value)}
//                 >
//                   <option value="">All Statuses</option>
//                   <option>To Do</option>
//                   <option>In Progress</option>
//                   <option>Done</option>
//                 </select>
//               </div>
              
//               <div className="relative">
//                 <SortAsc size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 <select
//                   className="w-full pl-10 pr-4 py-3 bg-gray-50 border-0 rounded-xl text-sm font-medium text-gray-700 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value)}
//                 >
//                   <option value="">Sort By</option>
//                   <option value="dueDate">Due Date</option>
//                   <option value="priority">Priority</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Cards Grid */}
//           <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//             {filteredTasks.length === 0 ? (
//               <div className="col-span-full text-center py-12">
//                 <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <span className="text-gray-400 text-2xl">📝</span>
//                 </div>
//                 <p className="text-gray-500 text-lg">No tasks found</p>
//               </div>
//             ) : (
//               filteredTasks.map(task => (
//                 <div
//                   key={task._id}
//                   className={`group relative bg-white rounded-2xl p-6 border-0 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 ${
//                     task.status === 'Done' ? 'opacity-60' : ''
//                   } ${task.isPinned ? 'ring-2 ring-yellow-300' : ''}`}
//                   onDoubleClick={() => handleCardDoubleClick(task)}
//                 >
//                   {/* Pin Button - Always Visible */}
//                   <button
//                     className="absolute top-4 right-4 p-2 transition-all duration-200"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       togglePin(task._id);
//                     }}
//                   >
//                     {task.isPinned ? (
//                       <Pin size={16} className="text-yellow-500 fill-current" />
//                     ) : (
//                       <PinOff size={16} className="text-gray-400 hover:text-yellow-500" />
//                     )}
//                   </button>

//                   {/* Task Content */}
//                   <div className="space-y-4">
//                     <div>
//                       <h3 className={`text-lg font-semibold text-gray-900 mb-2 pr-8 ${task.status === 'Done' ? 'line-through' : ''}`}>
//                         {task.title}
//                       </h3>
//                       <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 pr-8">
//                         {task.description}
//                       </p>
//                     </div>

//                     <div className="space-y-3">
//                       <div className="flex items-center gap-2 text-sm text-gray-600">
//                         <User size={14} />
//                         <span>{task.assignedTo || 'Unassigned'}</span>
//                       </div>
                      
//                       <div className="flex items-center gap-2 text-sm text-gray-600">
//                         <Calendar size={14} />
//                         <span>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No date'}</span>
//                       </div>
//                     </div>

//                     <div className="flex items-center justify-between pt-3 border-t border-gray-100">
//                       <div className="flex flex-wrap gap-1 sm:gap-2">
//                         {getStatusBadge(task.status)}
//                         {getPriorityBadge(task.priority)}
//                       </div>
                      
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleDelete(task._id);
//                         }}
//                         className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
//                       >
//                         <Trash2 size={16} />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </div>

//         {/* Modal */}
//         {isModalOpen && selectedTask && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//             <div className="bg-white rounded-2xl p-4 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto mx-4">
//               <div className="flex justify-between items-start mb-6">
//                 <h2 className="text-xl sm:text-2xl font-bold text-gray-900 pr-4">Task Details</h2>
//                 <button
//                   onClick={closeModal}
//                   className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex-shrink-0"
//                 >
//                   <X size={20} />
//                 </button>
//               </div>

//               <div className="space-y-6">
//                 <div>
//                   <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
//                     {selectedTask.title}
//                   </h3>
//                   <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
//                     {selectedTask.description}
//                   </p>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Assigned To</label>
//                       <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
//                         <User size={18} className="text-gray-500 flex-shrink-0" />
//                         <span className="font-medium text-sm sm:text-base">{selectedTask.assignedTo || 'Unassigned'}</span>
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
//                       <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
//                         <Calendar size={18} className="text-gray-500 flex-shrink-0" />
//                         <span className="font-medium text-sm sm:text-base">
//                           {selectedTask.dueDate ? new Date(selectedTask.dueDate).toLocaleDateString() : 'No date set'}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
//                       <div className="p-3 bg-gray-50 rounded-xl">
//                         <select
//                           className="w-full bg-transparent text-sm font-medium focus:outline-none"
//                           value={selectedTask.status}
//                           onChange={(e) => {
//                             handleStatusChange(selectedTask._id, e.target.value);
//                             setSelectedTask({...selectedTask, status: e.target.value});
//                           }}
//                         >
//                           <option>To Do</option>
//                           <option>In Progress</option>
//                           <option>Done</option>
//                         </select>
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
//                       <div className="p-3 bg-gray-50 rounded-xl">
//                         {getPriorityBadge(selectedTask.priority)}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200">
//                   <button
//                     onClick={closeModal}
//                     className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200 order-2 sm:order-1"
//                   >
//                     Close
//                   </button>
//                   <button
//                     onClick={() => {
//                       handleDelete(selectedTask._id);
//                       closeModal();
//                     }}
//                     className="px-6 py-2 bg-red-500 text-white hover:bg-red-600 rounded-lg transition-colors duration-200 order-1 sm:order-2"
//                   >
//                     Delete Task
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//     </>
//   );
// };

// export default TaskList;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Trash2,
  Pin,
  PinOff,
  Filter,
  SortAsc,
  X,
  Calendar,
  User,
  Flag,
  Edit3,
  Save
} from 'lucide-react';
const url="https://streamsyncbackend-9m1g.onrender.com";

const TaskList = ({ refresh, searchText }) => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [pinned, setPinned] = useState({});
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [statusCounts, setStatusCounts] = useState({
    todo: 0,
    inprogress: 0,
    done: 0,
  });
  
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${url}/api/tasks`);
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [refresh]);

  useEffect(() => {
    let filtered = tasks.map(task => ({
      ...task,
      isPinned: pinned[task._id] || false,
    }));

    if (statusFilter) {
      filtered = filtered.filter(task => task.status === statusFilter);
    }

    if (searchText) {
      const text = searchText.toLowerCase();
      filtered = filtered.filter(
        task =>
          task.assignedTo?.toLowerCase().includes(text) ||
          task.title?.toLowerCase().includes(text)
      );
    }

    if (sortBy === 'dueDate') {
      filtered = [...filtered].sort(
        (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
      );
    } else if (sortBy === 'priority') {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      filtered = [...filtered].sort(
        (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
      );
    }

    filtered = filtered.sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));

    setFilteredTasks(filtered);

    const todo = filtered.filter(t => t.status === 'To Do').length;
    const inprogress = filtered.filter(t => t.status === 'In Progress').length;
    const done = filtered.filter(t => t.status === 'Done').length;

    setStatusCounts({ todo, inprogress, done });
  }, [tasks, statusFilter, searchText, sortBy, pinned]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await axios.delete(`${url}/api/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(`${url}/api/tasks/${id}`, { status: newStatus });
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert('Status update failed');
    }
  };

  const handleEdit = async () => {
    try {
      const updatedTask = await axios.put(`${url}/api/tasks/${selectedTask._id}`, editForm);
      setSelectedTask(updatedTask.data);
      setIsEditing(false);
      fetchTasks();
      alert('Task updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to update task');
    }
  };

  const togglePin = (id) => {
    setPinned(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCardDoubleClick = (task) => {
    setSelectedTask(task);
    setEditForm({
      title: task.title,
      description: task.description,
      assignedTo: task.assignedTo,
      status: task.status,
      dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
      priority: task.priority
    });
    setIsModalOpen(true);
    setIsEditing(true); // Start directly in edit mode
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
    setIsEditing(false);
    setEditForm({});
  };

  const startEditing = () => {
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditForm({
      title: selectedTask.title,
      description: selectedTask.description,
      assignedTo: selectedTask.assignedTo,
      status: selectedTask.status,
      dueDate: selectedTask.dueDate ? selectedTask.dueDate.split('T')[0] : '',
      priority: selectedTask.priority
    });
  };

  const handleFormChange = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const getPriorityBadge = (priority) => {
    const base = 'px-2 sm:px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1';
    switch (priority) {
      case 'High':
        return <span className={`${base} bg-red-50 text-red-600 border border-red-200`}><Flag size={10} className="hidden sm:block" />High</span>;
      case 'Medium':
        return <span className={`${base} bg-yellow-50 text-yellow-700 border border-yellow-200`}><Flag size={10} className="hidden sm:block" />Medium</span>;
      case 'Low':
        return <span className={`${base} bg-green-50 text-green-700 border border-green-200`}><Flag size={10} className="hidden sm:block" />Low</span>;
      default:
        return priority;
    }
  };

  const getStatusBadge = (status) => {
    const base = 'px-2 sm:px-3 py-1 rounded-full text-xs font-medium';
    switch (status) {
      case 'To Do':
        return <span className={`${base} bg-blue-50 text-blue-600 border border-blue-200`}>To Do</span>;
      case 'In Progress':
        return <span className={`${base} bg-orange-50 text-orange-600 border border-orange-200`}>In Progress</span>;
      case 'Done':
        return <span className={`${base} bg-green-50 text-green-600 border border-green-200`}>Done</span>;
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen p-6" style={{ background: '#F0F9FF' }}>
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl p-6 mb-6 border-0">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="flex gap-4">
                <div className="h-10 bg-gray-200 rounded w-24"></div>
                <div className="h-10 bg-gray-200 rounded w-24"></div>
                <div className="h-10 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border-0">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-full mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen p-6" style={{ background: '#F0F9FF' }}>
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="bg-white rounded-2xl p-6 mb-6 border-0">
            <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-lg">📋</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Task Board</h1>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-xl border border-blue-200">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-blue-700">To Do: {statusCounts.todo}</span>
                </div>
                <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-xl border border-orange-200">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm font-medium text-orange-700">In Progress: {statusCounts.inprogress}</span>
                </div>
                <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-xl border border-green-200">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-700">Done: {statusCounts.done}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Filters Section */}
          <div className="bg-white rounded-2xl p-6 mb-6 border-0">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="relative">
                <Filter size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border-0 rounded-xl text-sm font-medium text-gray-700 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">All Status</option>
                  <option>To Do</option>
                  <option>In Progress</option>
                  <option>Done</option>
                </select>
              </div>
              
              <div className="relative">
                <SortAsc size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border-0 rounded-xl text-sm font-medium text-gray-700 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="">Sort By</option>
                  <option value="dueDate">Due Date</option>
                  <option value="priority">Priority</option>
                </select>
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredTasks.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-gray-400 text-2xl">📝</span>
                </div>
                <p className="text-gray-500 text-lg">No tasks found</p>
              </div>
            ) : (
              filteredTasks.map(task => (
                <div
                  key={task._id}
                  className={`relative bg-white rounded-2xl p-6 border-0 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 ${
                    task.status === 'Done' ? 'opacity-60' : ''
                  } ${task.isPinned ? 'ring-2 ring-yellow-300' : ''}`}
                  onDoubleClick={() => handleCardDoubleClick(task)}
                >
                  {/* Double-click hint - Always visible */}
                  <div className="absolute bottom-2 right-2">
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">Double click to edit</span>
                  </div>
                  
                  {/* Pin Button - Always Visible */}
                  <button
                    className="absolute top-4 right-4 p-2 transition-all duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePin(task._id);
                    }}
                  >
                    {task.isPinned ? (
                      <Pin size={16} className="text-yellow-500 fill-current" />
                    ) : (
                      <PinOff size={16} className="text-gray-400 hover:text-yellow-500" />
                    )}
                  </button>

                  {/* Task Content */}
                  <div className="space-y-4">
                    <div>
                      <h3 className={`text-lg font-semibold text-gray-900 mb-2 pr-8 ${task.status === 'Done' ? 'line-through' : ''}`}>
                        {task.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 pr-8">
                        {task.description}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User size={14} />
                        <span>{task.assignedTo || 'Unassigned'}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar size={14} />
                        <span>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No date'}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {getStatusBadge(task.status)}
                        {getPriorityBadge(task.priority)}
                      </div>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(task._id);
                        }}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

        {/* Modal */}
        {isModalOpen && selectedTask && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-40 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-4 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto mx-4">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 pr-4">
                  Edit Task
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex-shrink-0"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => handleFormChange('title', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  
                  <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">Description</label>
                  <textarea
                    value={editForm.description}
                    onChange={(e) => handleFormChange('description', e.target.value)}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Assigned To</label>
                      <input
                        type="text"
                        value={editForm.assignedTo}
                        onChange={(e) => handleFormChange('assignedTo', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                      <input
                        type="date"
                        value={editForm.dueDate}
                        onChange={(e) => handleFormChange('dueDate', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <select
                        value={editForm.status}
                        onChange={(e) => handleFormChange('status', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option>To Do</option>
                        <option>In Progress</option>
                        <option>Done</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                      <select
                        value={editForm.priority}
                        onChange={(e) => handleFormChange('priority', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200">
                  <button
                    onClick={cancelEditing}
                    className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200 order-2 sm:order-1"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleEdit}
                    className="px-6 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg transition-colors duration-200 order-1 sm:order-2 flex items-center gap-2"
                  >
                    <Save size={16} />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default TaskList;