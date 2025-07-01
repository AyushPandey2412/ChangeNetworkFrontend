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
//   Flag,
//   Edit3,
//   Save
// } from 'lucide-react';
// const url="https://changenetworktaskmana.onrender.com";

// const TaskList = ({ refresh, searchText }) => {
//   const [tasks, setTasks] = useState([]);
//   const [filteredTasks, setFilteredTasks] = useState([]);
//   const [statusFilter, setStatusFilter] = useState('');
//   const [sortBy, setSortBy] = useState('');
//   const [pinned, setPinned] = useState({});
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editForm, setEditForm] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [statusCounts, setStatusCounts] = useState({
//     todo: 0,
//     inprogress: 0,
//     done: 0,
//   });
  
//   const fetchTasks = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`${url}/api/tasks`);
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
//       await axios.delete(`${url}/api/tasks/${id}`);
//       fetchTasks();
//     } catch (err) {
//       console.error(err);
//       alert('Delete failed');
//     }
//   };

//   const handleStatusChange = async (id, newStatus) => {
//     try {
//       await axios.patch(`${url}/api/tasks/${id}`, { status: newStatus });
//       fetchTasks();
//     } catch (err) {
//       console.error(err);
//       alert('Status update failed');
//     }
//   };

//   const handleEdit = async () => {
//     try {
//       const updatedTask = await axios.put(`${url}/api/tasks/${selectedTask._id}`, editForm);
//       setSelectedTask(updatedTask.data);
//       setIsEditing(false);
//       fetchTasks();
//       alert('Task updated successfully!');
//     } catch (err) {
//       console.error(err);
//       alert('Failed to update task');
//     }
//   };

//   const togglePin = (id) => {
//     setPinned(prev => ({ ...prev, [id]: !prev[id] }));
//   };

//   const handleCardDoubleClick = (task) => {
//     setSelectedTask(task);
//     setEditForm({
//       title: task.title,
//       description: task.description,
//       assignedTo: task.assignedTo,
//       status: task.status,
//       dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
//       priority: task.priority
//     });
//     setIsModalOpen(true);
//     setIsEditing(true); // Start directly in edit mode
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedTask(null);
//     setIsEditing(false);
//     setEditForm({});
//   };

//   const startEditing = () => {
//     setIsEditing(true);
//   };

//   const cancelEditing = () => {
//     setIsEditing(false);
//     setEditForm({
//       title: selectedTask.title,
//       description: selectedTask.description,
//       assignedTo: selectedTask.assignedTo,
//       status: selectedTask.status,
//       dueDate: selectedTask.dueDate ? selectedTask.dueDate.split('T')[0] : '',
//       priority: selectedTask.priority
//     });
//   };

//   const handleFormChange = (field, value) => {
//     setEditForm(prev => ({ ...prev, [field]: value }));
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
//       <div className="min-h-screen p-6" style={{ background: '#F0F9FF' }}>
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
//       <div className="min-h-screen p-6" style={{ background: '#F0F9FF' }}>
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
//                   className={`relative bg-white rounded-2xl p-6 border-0 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 ${
//                     task.status === 'Done' ? 'opacity-60' : ''
//                   } ${task.isPinned ? 'ring-2 ring-yellow-300' : ''}`}
//                   onDoubleClick={() => handleCardDoubleClick(task)}
//                 >
//                   {/* Double-click hint - Always visible */}
//                   <div className="absolute bottom-2 right-2">
//                     <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">Double click to edit</span>
//                   </div>
                  
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
//           <div className="fixed inset-0 bg-gray-900 bg-opacity-40 flex items-center justify-center p-4 z-50">
//             <div className="bg-white rounded-2xl p-4 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto mx-4">
//               <div className="flex justify-between items-start mb-6">
//                 <h2 className="text-xl sm:text-2xl font-bold text-gray-900 pr-4">
//                   Edit Task
//                 </h2>
//                 <div className="flex gap-2">
//                   <button
//                     onClick={closeModal}
//                     className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex-shrink-0"
//                   >
//                     <X size={20} />
//                   </button>
//                 </div>
//               </div>

//               <div className="space-y-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
//                   <input
//                     type="text"
//                     value={editForm.title}
//                     onChange={(e) => handleFormChange('title', e.target.value)}
//                     className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
                  
//                   <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">Description</label>
//                   <textarea
//                     value={editForm.description}
//                     onChange={(e) => handleFormChange('description', e.target.value)}
//                     rows={4}
//                     className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Assigned To</label>
//                       <input
//                         type="text"
//                         value={editForm.assignedTo}
//                         onChange={(e) => handleFormChange('assignedTo', e.target.value)}
//                         className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
//                       <input
//                         type="date"
//                         value={editForm.dueDate}
//                         onChange={(e) => handleFormChange('dueDate', e.target.value)}
//                         className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       />
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
//                       <select
//                         value={editForm.status}
//                         onChange={(e) => handleFormChange('status', e.target.value)}
//                         className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       >
//                         <option>To Do</option>
//                         <option>In Progress</option>
//                         <option>Done</option>
//                       </select>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
//                       <select
//                         value={editForm.priority}
//                         onChange={(e) => handleFormChange('priority', e.target.value)}
//                         className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       >
//                         <option>High</option>
//                         <option>Medium</option>
//                         <option>Low</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200">
//                   <button
//                     onClick={cancelEditing}
//                     className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200 order-2 sm:order-1"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleEdit}
//                     className="px-6 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg transition-colors duration-200 order-1 sm:order-2 flex items-center gap-2"
//                   >
//                     <Save size={16} />
//                     Save Changes
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















// added in github












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
//   Flag,
//   Edit3,
//   Save
// } from 'lucide-react';
// const url="https://changenetworktaskmana.onrender.com";

// const TaskList = ({ refresh, searchText }) => {
//   const [tasks, setTasks] = useState([]);
//   const [filteredTasks, setFilteredTasks] = useState([]);
//   const [statusFilter, setStatusFilter] = useState('');
//   const [sortBy, setSortBy] = useState('');
//   const [pinned, setPinned] = useState({});
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editForm, setEditForm] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [statusCounts, setStatusCounts] = useState({
//     todo: 0,
//     inprogress: 0,
//     done: 0,
//   });

//   // Dynamic header content that changes every 3 seconds
//   const [headerIndex, setHeaderIndex] = useState(0);
//   const headerOptions = [
//     { title: "Task Dashboard", icon: "📊", gradient: "from-blue-500 to-purple-600" },
//     { title: "Project Hub", icon: "🚀", gradient: "from-purple-500 to-pink-600" },
//     { title: "Work Center", icon: "💼", gradient: "from-green-500 to-blue-600" },
//     { title: "Activity Board", icon: "⚡", gradient: "from-orange-500 to-red-600" },
//     { title: "Task Manager", icon: "✅", gradient: "from-cyan-500 to-teal-600" },
//     { title: "Progress Tracker", icon: "📈", gradient: "from-indigo-500 to-purple-600" }
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setHeaderIndex(prev => (prev + 1) % headerOptions.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);
  
//   const fetchTasks = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`${url}/api/tasks`);
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
//       await axios.delete(`${url}/api/tasks/${id}`);
//       fetchTasks();
//     } catch (err) {
//       console.error(err);
//       alert('Delete failed');
//     }
//   };

//   const handleStatusChange = async (id, newStatus) => {
//     try {
//       await axios.patch(`${url}/api/tasks/${id}`, { status: newStatus });
//       fetchTasks();
//     } catch (err) {
//       console.error(err);
//       alert('Status update failed');
//     }
//   };

//   const handleEdit = async () => {
//     try {
//       const updatedTask = await axios.put(`${url}/api/tasks/${selectedTask._id}`, editForm);
//       setSelectedTask(updatedTask.data);
//       setIsEditing(false);
//       fetchTasks();
//       alert('Task updated successfully!');
//     } catch (err) {
//       console.error(err);
//       alert('Failed to update task');
//     }
//   };

//   const togglePin = (id) => {
//     setPinned(prev => ({ ...prev, [id]: !prev[id] }));
//   };

//   const handleCardDoubleClick = (task) => {
//     setSelectedTask(task);
//     setEditForm({
//       title: task.title,
//       description: task.description,
//       assignedTo: task.assignedTo,
//       status: task.status,
//       dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
//       priority: task.priority
//     });
//     setIsModalOpen(true);
//     setIsEditing(true); // Start directly in edit mode
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedTask(null);
//     setIsEditing(false);
//     setEditForm({});
//   };

//   const startEditing = () => {
//     setIsEditing(true);
//   };

//   const cancelEditing = () => {
//     setIsEditing(false);
//     setEditForm({
//       title: selectedTask.title,
//       description: selectedTask.description,
//       assignedTo: selectedTask.assignedTo,
//       status: selectedTask.status,
//       dueDate: selectedTask.dueDate ? selectedTask.dueDate.split('T')[0] : '',
//       priority: selectedTask.priority
//     });
//   };

//   const handleFormChange = (field, value) => {
//     setEditForm(prev => ({ ...prev, [field]: value }));
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

//   const currentHeader = headerOptions[headerIndex];

//   if (loading) {
//     return (
//       <div className="min-h-screen p-6" style={{ background: '#F0F9FF' }}>
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
//       <div className="min-h-screen p-6" style={{ background: '#F0F9FF' }}>
//         <div className="max-w-7xl mx-auto">
//           {/* Dynamic Header Section */}
//           <div className="bg-white rounded-2xl p-6 mb-6 border-0">
//             <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
//               <div className="flex items-center gap-3">
//                 <div className={`w-10 h-10 bg-gradient-to-r ${currentHeader.gradient} rounded-xl flex items-center justify-center transition-all duration-500 transform`}>
//                   <span className="text-white text-lg">{currentHeader.icon}</span>
//                 </div>
//                 <h1 className="text-2xl font-bold text-gray-900 transition-all duration-500">
//                   {currentHeader.title}
//                 </h1>
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
//                   className={`relative bg-white rounded-2xl p-6 border-0 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 ${
//                     task.status === 'Done' ? 'opacity-60' : ''
//                   } ${task.isPinned ? 'ring-2 ring-yellow-300' : ''}`}
//                   onDoubleClick={() => handleCardDoubleClick(task)}
//                 >
//                   {/* Smaller double-click hint */}
//                   <div className="absolute bottom-1 right-1">
//                     <span className="text-xs text-gray-300 bg-gray-50 px-1.5 py-0.5 rounded text-xs">Double click to edit</span>
//                   </div>
                  
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
//           <div className="fixed inset-0 bg-gray-900 bg-opacity-40 flex items-center justify-center p-4 z-50">
//             <div className="bg-white rounded-2xl p-4 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto mx-4">
//               <div className="flex justify-between items-start mb-6">
//                 <h2 className="text-xl sm:text-2xl font-bold text-gray-900 pr-4">
//                   Edit Task
//                 </h2>
//                 <div className="flex gap-2">
//                   <button
//                     onClick={closeModal}
//                     className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex-shrink-0"
//                   >
//                     <X size={20} />
//                   </button>
//                 </div>
//               </div>

//               <div className="space-y-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
//                   <input
//                     type="text"
//                     value={editForm.title}
//                     onChange={(e) => handleFormChange('title', e.target.value)}
//                     className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
                  
//                   <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">Description</label>
//                   <textarea
//                     value={editForm.description}
//                     onChange={(e) => handleFormChange('description', e.target.value)}
//                     rows={4}
//                     className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Assigned To</label>
//                       <input
//                         type="text"
//                         value={editForm.assignedTo}
//                         onChange={(e) => handleFormChange('assignedTo', e.target.value)}
//                         className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
//                       <input
//                         type="date"
//                         value={editForm.dueDate}
//                         onChange={(e) => handleFormChange('dueDate', e.target.value)}
//                         className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       />
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
//                       <select
//                         value={editForm.status}
//                         onChange={(e) => handleFormChange('status', e.target.value)}
//                         className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       >
//                         <option>To Do</option>
//                         <option>In Progress</option>
//                         <option>Done</option>
//                       </select>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
//                       <select
//                         value={editForm.priority}
//                         onChange={(e) => handleFormChange('priority', e.target.value)}
//                         className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       >
//                         <option>High</option>
//                         <option>Medium</option>
//                         <option>Low</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200">
//                   <button
//                     onClick={cancelEditing}
//                     className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200 order-2 sm:order-1"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleEdit}
//                     className="px-6 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg transition-colors duration-200 order-1 sm:order-2 flex items-center gap-2"
//                   >
//                     <Save size={16} />
//                     Save Changes
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


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//   Trash2,
//   Pin,
//   PinOff,
//   Filter,
//   SortAsc,
//   Calendar,
//   User,
//   Flag,
//   Edit3,
//   Check,
//   X
// } from 'lucide-react';

// const url = "https://changenetworktaskmana.onrender.com";

// const TaskList = ({ refresh, searchText }) => {
//   const [tasks, setTasks] = useState([]);
//   const [filteredTasks, setFilteredTasks] = useState([]);
//   const [statusFilter, setStatusFilter] = useState('');
//   const [sortBy, setSortBy] = useState('');
//   const [pinned, setPinned] = useState({});
//   const [editingTask, setEditingTask] = useState(null);
//   const [editForm, setEditForm] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [statusCounts, setStatusCounts] = useState({
//     todo: 0,
//     inprogress: 0,
//     done: 0,
//   });

//   // More dynamic header content with simple text
//   const [headerIndex, setHeaderIndex] = useState(0);
//   const headerOptions = [
//     { title: "Task Dashboard", subtitle: "Organize your workflow" },
//     { title: "Project Center", subtitle: "Track your progress" },
//     { title: "Work Manager", subtitle: "Stay productive daily" },
//     { title: "Team Tasks", subtitle: "Collaborate effectively" },
//     { title: "Activity Hub", subtitle: "Monitor all projects" },
//     { title: "Task Tracker", subtitle: "Complete goals faster" },
//     { title: "Work Board", subtitle: "Manage priorities" },
//     { title: "Daily Planner", subtitle: "Schedule your tasks" }
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setHeaderIndex(prev => (prev + 1) % headerOptions.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, []);
  
//   const fetchTasks = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`${url}/api/tasks`);
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
//       await axios.delete(`${url}/api/tasks/${id}`);
//       fetchTasks();
//     } catch (err) {
//       console.error(err);
//       alert('Delete failed');
//     }
//   };

//   const handleEdit = async (taskId) => {
//     try {
//       await axios.put(`${url}/api/tasks/${taskId}`, editForm);
//       setEditingTask(null);
//       setEditForm({});
//       fetchTasks();
//     } catch (err) {
//       console.error(err);
//       alert('Failed to update task');
//     }
//   };

//   const startEditing = (task) => {
//     setEditingTask(task._id);
//     setEditForm({
//       title: task.title,
//       description: task.description,
//       assignedTo: task.assignedTo,
//       status: task.status,
//       dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
//       priority: task.priority
//     });
//   };

//   const cancelEditing = () => {
//     setEditingTask(null);
//     setEditForm({});
//   };

//   const togglePin = (id) => {
//     setPinned(prev => ({ ...prev, [id]: !prev[id] }));
//   };

//   const handleFormChange = (field, value) => {
//     setEditForm(prev => ({ ...prev, [field]: value }));
//   };

//   const getPriorityBadge = (priority) => {
//     const base = 'px-2 py-1 rounded-lg text-xs font-medium inline-flex items-center gap-1';
//     switch (priority) {
//       case 'High':
//         return <span className={`${base} bg-red-100 text-red-700`}>High</span>;
//       case 'Medium':
//         return <span className={`${base} bg-yellow-100 text-yellow-700`}>Med</span>;
//       case 'Low':
//         return <span className={`${base} bg-green-100 text-green-700`}>Low</span>;
//       default:
//         return priority;
//     }
//   };

//   const getStatusBadge = (status) => {
//     const base = 'px-2 py-1 rounded-lg text-xs font-medium';
//     switch (status) {
//       case 'To Do':
//         return <span className={`${base} bg-blue-100 text-blue-700`}>To Do</span>;
//       case 'In Progress':
//         return <span className={`${base} bg-orange-100 text-orange-700`}>Progress</span>;
//       case 'Done':
//         return <span className={`${base} bg-green-100 text-green-700`}>Done</span>;
//       default:
//         return status;
//     }
//   };

//   const currentHeader = headerOptions[headerIndex];

//   if (loading) {
//     return (
//       <div className="min-h-screen p-3 sm:p-6 bg-gray-50">
//         <div className="max-w-7xl mx-auto">
//           <div className="bg-white rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
//             <div className="animate-pulse">
//               <div className="h-6 sm:h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
//               <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
//               <div className="flex flex-wrap gap-2 sm:gap-4">
//                 <div className="h-8 sm:h-10 bg-gray-200 rounded w-16 sm:w-24"></div>
//                 <div className="h-8 sm:h-10 bg-gray-200 rounded w-20 sm:w-24"></div>
//                 <div className="h-8 sm:h-10 bg-gray-200 rounded w-16 sm:w-24"></div>
//               </div>
//             </div>
//           </div>
//           <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//             {[...Array(6)].map((_, i) => (
//               <div key={i} className="bg-white rounded-xl p-4 sm:p-6">
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
//     <div className="min-h-screen p-3 sm:p-6 bg-gray-50">
//       <div className="max-w-7xl mx-auto">
//         {/* Dynamic Header Section */}
//         <div className="bg-white rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-sm">
//           <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 sm:gap-4">
//             <div>
//               <h1 className="text-xl sm:text-2xl font-bold text-gray-900 transition-all duration-500">
//                 {currentHeader.title}
//               </h1>
//               <p className="text-sm text-gray-600 mt-1">
//                 {currentHeader.subtitle}
//               </p>
//             </div>
            
//             <div className="flex flex-wrap gap-2 sm:gap-3">
//               <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg">
//                 <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                 <span className="text-xs sm:text-sm font-medium text-blue-700">To Do: {statusCounts.todo}</span>
//               </div>
//               <div className="flex items-center gap-2 bg-orange-50 px-3 py-2 rounded-lg">
//                 <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
//                 <span className="text-xs sm:text-sm font-medium text-orange-700">Progress: {statusCounts.inprogress}</span>
//               </div>
//               <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg">
//                 <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                 <span className="text-xs sm:text-sm font-medium text-green-700">Done: {statusCounts.done}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Filters Section */}
//         <div className="bg-white rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-sm">
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//             <div className="relative">
//               <Filter size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <select
//                 className="w-full pl-9 pr-4 py-2.5 sm:py-3 bg-gray-50 border-0 rounded-lg text-sm font-medium text-gray-700 focus:ring-2 focus:ring-blue-500 focus:bg-white"
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//               >
//                 <option value="">All Statuses</option>
//                 <option>To Do</option>
//                 <option>In Progress</option>
//                 <option>Done</option>
//               </select>
//             </div>
            
//             <div className="relative">
//               <SortAsc size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <select
//                 className="w-full pl-9 pr-4 py-2.5 sm:py-3 bg-gray-50 border-0 rounded-lg text-sm font-medium text-gray-700 focus:ring-2 focus:ring-blue-500 focus:bg-white"
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//               >
//                 <option value="">Sort By</option>
//                 <option value="dueDate">Due Date</option>
//                 <option value="priority">Priority</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Cards Grid */}
//         <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//           {filteredTasks.length === 0 ? (
//             <div className="col-span-full text-center py-12">
//               <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <span className="text-gray-400 text-xl">📝</span>
//               </div>
//               <p className="text-gray-500">No tasks found</p>
//             </div>
//           ) : (
//             filteredTasks.map(task => (
//               <div
//                 key={task._id}
//                 className={`bg-white rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200 ${
//                   task.status === 'Done' ? 'opacity-60' : ''
//                 } ${task.isPinned ? 'ring-2 ring-blue-200' : ''}`}
//               >
//                 {editingTask === task._id ? (
//                   // Edit Mode
//                   <div className="space-y-3">
//                     <input
//                       type="text"
//                       value={editForm.title}
//                       onChange={(e) => handleFormChange('title', e.target.value)}
//                       className="w-full p-2 border border-gray-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Task title"
//                     />
                    
//                     <textarea
//                       value={editForm.description}
//                       onChange={(e) => handleFormChange('description', e.target.value)}
//                       rows={2}
//                       className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Description"
//                     />
                    
//                     <div className="grid grid-cols-2 gap-2">
//                       <input
//                         type="text"
//                         value={editForm.assignedTo}
//                         onChange={(e) => handleFormChange('assignedTo', e.target.value)}
//                         className="p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                         placeholder="Assigned to"
//                       />
                      
//                       <input
//                         type="date"
//                         value={editForm.dueDate}
//                         onChange={(e) => handleFormChange('dueDate', e.target.value)}
//                         className="p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       />
//                     </div>
                    
//                     <div className="grid grid-cols-2 gap-2">
//                       <select
//                         value={editForm.status}
//                         onChange={(e) => handleFormChange('status', e.target.value)}
//                         className="p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       >
//                         <option>To Do</option>
//                         <option>In Progress</option>
//                         <option>Done</option>
//                       </select>
                      
//                       <select
//                         value={editForm.priority}
//                         onChange={(e) => handleFormChange('priority', e.target.value)}
//                         className="p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       >
//                         <option>High</option>
//                         <option>Medium</option>
//                         <option>Low</option>
//                       </select>
//                     </div>
                    
//                     <div className="flex justify-end gap-2 pt-2">
//                       <button
//                         onClick={cancelEditing}
//                         className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
//                       >
//                         <X size={16} />
//                       </button>
//                       <button
//                         onClick={() => handleEdit(task._id)}
//                         className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
//                       >
//                         <Check size={16} />
//                       </button>
//                     </div>
//                   </div>
//                 ) : (
//                   // View Mode
//                   <div className="space-y-3">
//                     <div className="flex justify-between items-start">
//                       <h3 className={`text-base sm:text-lg font-semibold text-gray-900 ${task.status === 'Done' ? 'line-through' : ''} pr-2`}>
//                         {task.title}
//                       </h3>
//                       <div className="flex gap-1">
//                         <button
//                           onClick={() => togglePin(task._id)}
//                           className="p-1.5 transition-colors"
//                         >
//                           {task.isPinned ? (
//                             <Pin size={14} className="text-blue-500" />
//                           ) : (
//                             <PinOff size={14} className="text-gray-400 hover:text-blue-500" />
//                           )}
//                         </button>
//                         <button
//                           onClick={() => startEditing(task)}
//                           className="p-1.5 text-gray-400 hover:text-blue-500 transition-colors"
//                         >
//                           <Edit3 size={14} />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(task._id)}
//                           className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
//                         >
//                           <Trash2 size={14} />
//                         </button>
//                       </div>
//                     </div>
                    
//                     <p className="text-gray-600 text-sm leading-relaxed">
//                       {task.description}
//                     </p>

//                     <div className="space-y-2">
//                       <div className="flex items-center gap-2 text-sm text-gray-600">
//                         <User size={12} />
//                         <span className="truncate">{task.assignedTo || 'Unassigned'}</span>
//                       </div>
                      
//                       <div className="flex items-center gap-2 text-sm text-gray-600">
//                         <Calendar size={12} />
//                         <span>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No date'}</span>
//                       </div>
//                     </div>

//                     <div className="flex items-center justify-between pt-2 border-t border-gray-100">
//                       <div className="flex gap-1.5">
//                         {getStatusBadge(task.status)}
//                         {getPriorityBadge(task.priority)}
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TaskList;



















// perrfect


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//   Trash2,
//   Pin,
//   PinOff,
//   Filter,
//   SortAsc,
//   Calendar,
//   User,
//   Flag,
//   Edit3,
//   Check,
//   X
// } from 'lucide-react';

// const url = "https://changenetworktaskmana.onrender.com";

// const TaskList = ({ refresh, searchText }) => {
//   const [tasks, setTasks] = useState([]);
//   const [filteredTasks, setFilteredTasks] = useState([]);
//   const [statusFilter, setStatusFilter] = useState('');
//   const [sortBy, setSortBy] = useState('');
//   const [pinned, setPinned] = useState({});
//   const [editingTask, setEditingTask] = useState(null);
//   const [editForm, setEditForm] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [statusCounts, setStatusCounts] = useState({
//     todo: 0,
//     inprogress: 0,
//     done: 0,
//   });

//   // More dynamic header content with simple text
//   const [headerIndex, setHeaderIndex] = useState(0);
//   const headerOptions = [
//     { title: "Task Dashboard", subtitle: "Organize your workflow" },
//     { title: "Project Center", subtitle: "Track your progress" },
//     { title: "Work Manager", subtitle: "Stay productive daily" },
//     { title: "Team Tasks", subtitle: "Collaborate effectively" },
//     { title: "Activity Hub", subtitle: "Monitor all projects" },
//     { title: "Task Tracker", subtitle: "Complete goals faster" },
//     { title: "Work Board", subtitle: "Manage priorities" },
//     { title: "Daily Planner", subtitle: "Schedule your tasks" }
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setHeaderIndex(prev => (prev + 1) % headerOptions.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, []);
  
//   const fetchTasks = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`${url}/api/tasks`);
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
//       await axios.delete(`${url}/api/tasks/${id}`);
//       fetchTasks();
//     } catch (err) {
//       console.error(err);
//       alert('Delete failed');
//     }
//   };

//   const handleEdit = async (taskId) => {
//     try {
//       await axios.put(`${url}/api/tasks/${taskId}`, editForm);
//       setEditingTask(null);
//       setEditForm({});
//       fetchTasks();
//     } catch (err) {
//       console.error(err);
//       alert('Failed to update task');
//     }
//   };

//   const startEditing = (task) => {
//     setEditingTask(task._id);
//     setEditForm({
//       title: task.title,
//       description: task.description,
//       assignedTo: task.assignedTo,
//       status: task.status,
//       dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
//       priority: task.priority
//     });
//   };

//   const cancelEditing = () => {
//     setEditingTask(null);
//     setEditForm({});
//   };

//   const togglePin = (id) => {
//     setPinned(prev => ({ ...prev, [id]: !prev[id] }));
//   };

//   const handleFormChange = (field, value) => {
//     setEditForm(prev => ({ ...prev, [field]: value }));
//   };

//   const getPriorityBadge = (priority) => {
//     const base = 'px-2 py-1 rounded-lg text-xs font-medium inline-flex items-center gap-1';
//     switch (priority) {
//       case 'High':
//         return <span className={`${base} bg-red-100 text-red-700`}>High</span>;
//       case 'Medium':
//         return <span className={`${base} bg-yellow-100 text-yellow-700`}>Med</span>;
//       case 'Low':
//         return <span className={`${base} bg-green-100 text-green-700`}>Low</span>;
//       default:
//         return priority;
//     }
//   };

//   const getStatusBadge = (status) => {
//     const base = 'px-2 py-1 rounded-lg text-xs font-medium';
//     switch (status) {
//       case 'To Do':
//         return <span className={`${base} bg-blue-100 text-blue-700`}>To Do</span>;
//       case 'In Progress':
//         return <span className={`${base} bg-orange-100 text-orange-700`}>Progress</span>;
//       case 'Done':
//         return <span className={`${base} bg-green-100 text-green-700`}>Done</span>;
//       default:
//         return status;
//     }
//   };

//   const currentHeader = headerOptions[headerIndex];

//   if (loading) {
//     return (
//       <div className="min-h-screen p-3 sm:p-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="bg-white rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
//             <div className="animate-pulse">
//               <div className="h-6 sm:h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
//               <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
//               <div className="flex flex-wrap gap-2 sm:gap-4">
//                 <div className="h-8 sm:h-10 bg-gray-200 rounded w-16 sm:w-24"></div>
//                 <div className="h-8 sm:h-10 bg-gray-200 rounded w-20 sm:w-24"></div>
//                 <div className="h-8 sm:h-10 bg-gray-200 rounded w-16 sm:w-24"></div>
//               </div>
//             </div>
//           </div>
//           <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//             {[...Array(6)].map((_, i) => (
//               <div key={i} className="bg-white rounded-xl p-4 sm:p-6">
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
//     <div className="min-h-screen p-3 sm:p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Dynamic Header Section */}
//         <div className="bg-white rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-sm">
//           <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 sm:gap-4">
//             <div>
//               <h1 className="text-xl sm:text-2xl font-bold text-green-600 transition-all duration-500">
//                 {currentHeader.title}
//               </h1>
//               <p className="text-sm text-gray-600 mt-1">
//                 {currentHeader.subtitle}
//               </p>
//             </div>
            
//             <div className="flex flex-wrap gap-2 sm:gap-3">
//               <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg">
//                 <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                 <span className="text-xs sm:text-sm font-medium text-blue-700">To Do: {statusCounts.todo}</span>
//               </div>
//               <div className="flex items-center gap-2 bg-orange-50 px-3 py-2 rounded-lg">
//                 <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
//                 <span className="text-xs sm:text-sm font-medium text-orange-700">Progress: {statusCounts.inprogress}</span>
//               </div>
//               <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg">
//                 <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                 <span className="text-xs sm:text-sm font-medium text-green-700">Done: {statusCounts.done}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Filters Section */}
//         <div className="bg-white rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-sm">
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//             <div className="relative">
//               <Filter size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <select
//                 className="w-full pl-9 pr-4 py-2.5 sm:py-3 bg-gray-50 border-0 rounded-lg text-sm font-medium text-gray-700 focus:ring-2 focus:ring-blue-500 focus:bg-white"
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//               >
//                 <option value="">All Status</option>
//                 <option>To Do</option>
//                 <option>In Progress</option>
//                 <option>Done</option>
//               </select>
//             </div>
            
//             <div className="relative">
//               <SortAsc size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <select
//                 className="w-full pl-9 pr-4 py-2.5 sm:py-3 bg-gray-50 border-0 rounded-lg text-sm font-medium text-gray-700 focus:ring-2 focus:ring-blue-500 focus:bg-white"
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//               >
//                 <option value="">Sort By</option>
//                 <option value="dueDate">Due Date</option>
//                 <option value="priority">Priority</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Cards Grid */}
//         <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//           {filteredTasks.length === 0 ? (
//             <div className="col-span-full text-center py-12">
//               <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <span className="text-gray-400 text-xl">📝</span>
//               </div>
//               <p className="text-gray-500">No tasks found</p>
//             </div>
//           ) : (
//             filteredTasks.map(task => (
//               <div
//                 key={task._id}
//                 className={`bg-white rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200 ${
//                   task.status === 'Done' ? 'opacity-60' : ''
//                 } ${task.isPinned ? 'ring-2 ring-blue-200' : ''}`}
//               >
//                 {editingTask === task._id ? (
//                   // Edit Mode
//                   <div className="space-y-3">
//                     <input
//                       type="text"
//                       value={editForm.title}
//                       onChange={(e) => handleFormChange('title', e.target.value)}
//                       className="w-full p-2 border border-gray-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Task title"
//                     />
                    
//                     <textarea
//                       value={editForm.description}
//                       onChange={(e) => handleFormChange('description', e.target.value)}
//                       rows={2}
//                       className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Description"
//                     />
                    
//                     <div className="grid grid-cols-2 gap-2">
//                       <input
//                         type="text"
//                         value={editForm.assignedTo}
//                         onChange={(e) => handleFormChange('assignedTo', e.target.value)}
//                         className="p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                         placeholder="Assigned to"
//                       />
                      
//                       <input
//                         type="date"
//                         value={editForm.dueDate}
//                         onChange={(e) => handleFormChange('dueDate', e.target.value)}
//                         className="p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       />
//                     </div>
                    
//                     <div className="grid grid-cols-2 gap-2">
//                       <select
//                         value={editForm.status}
//                         onChange={(e) => handleFormChange('status', e.target.value)}
//                         className="p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       >
//                         <option>To Do</option>
//                         <option>In Progress</option>
//                         <option>Done</option>
//                       </select>
                      
//                       <select
//                         value={editForm.priority}
//                         onChange={(e) => handleFormChange('priority', e.target.value)}
//                         className="p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       >
//                         <option>High</option>
//                         <option>Medium</option>
//                         <option>Low</option>
//                       </select>
//                     </div>
                    
//                     <div className="flex justify-end gap-2 pt-2">
//                       <button
//                         onClick={cancelEditing}
//                         className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
//                       >
//                         <X size={16} />
//                       </button>
//                       <button
//                         onClick={() => handleEdit(task._id)}
//                         className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
//                       >
//                         <Check size={16} />
//                       </button>
//                     </div>
//                   </div>
//                 ) : (
//                   // View Mode
//                   <div className="space-y-3">
//                     <div className="flex justify-between items-start">
//                       <h3 className={`text-base sm:text-lg font-semibold text-gray-900 ${task.status === 'Done' ? 'line-through' : ''} pr-2`}>
//                         {task.title}
//                       </h3>
//                       <div className="flex gap-1">
//                         <button
//                           onClick={() => togglePin(task._id)}
//                           className="p-1.5 transition-colors"
//                         >
//                           {task.isPinned ? (
//                             <Pin size={14} className="text-blue-500" />
//                           ) : (
//                             <PinOff size={14} className="text-gray-400 hover:text-blue-500" />
//                           )}
//                         </button>
//                         <button
//                           onClick={() => startEditing(task)}
//                           className="p-1.5 text-gray-400 hover:text-blue-500 transition-colors"
//                         >
//                           <Edit3 size={14} />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(task._id)}
//                           className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
//                         >
//                           <Trash2 size={14} />
//                         </button>
//                       </div>
//                     </div>
                    
//                     <p className="text-gray-600 text-sm leading-relaxed">
//                       {task.description}
//                     </p>

//                     <div className="space-y-2">
//                       <div className="flex items-center gap-2 text-sm text-gray-600">
//                         <User size={12} />
//                         <span className="truncate">{task.assignedTo || 'Unassigned'}</span>
//                       </div>
                      
//                       <div className="flex items-center gap-2 text-sm text-gray-600">
//                         <Calendar size={12} />
//                         <span>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No date'}</span>
//                       </div>
//                     </div>

//                     <div className="flex items-center justify-between pt-2 border-t border-gray-100">
//                       <div className="flex gap-1.5">
//                         {getStatusBadge(task.status)}
//                         {getPriorityBadge(task.priority)}
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))
//           )}
//         </div>
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
//   Calendar,
//   User,
//   Flag,
//   Edit3,
//   Check,
//   X,
//   ClipboardList,
//   Search,
//   FileText
// } from 'lucide-react';

// const url = "https://changenetworktaskmana.onrender.com";

// const TaskList = ({ refresh, searchText }) => {
//   const [tasks, setTasks] = useState([]);
//   const [filteredTasks, setFilteredTasks] = useState([]);
//   const [statusFilter, setStatusFilter] = useState('');
//   const [sortBy, setSortBy] = useState('');
//   const [pinned, setPinned] = useState({});
//   const [editingTask, setEditingTask] = useState(null);
//   const [editForm, setEditForm] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [statusCounts, setStatusCounts] = useState({
//     todo: 0,
//     inprogress: 0,
//     done: 0,
//   });

//   // More dynamic header content with simple text
//   const [headerIndex, setHeaderIndex] = useState(0);
//   const headerOptions = [
//     { title: "Task Dashboard", subtitle: "Organize your workflow" },
//     { title: "Project Center", subtitle: "Track your progress" },
//     { title: "Work Manager", subtitle: "Stay productive daily" },
//     { title: "Team Tasks", subtitle: "Collaborate effectively" },
//     { title: "Activity Hub", subtitle: "Monitor all projects" },
//     { title: "Task Tracker", subtitle: "Complete goals faster" },
//     { title: "Work Board", subtitle: "Manage priorities" },
//     { title: "Daily Planner", subtitle: "Schedule your tasks" }
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setHeaderIndex(prev => (prev + 1) % headerOptions.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, []);
  
//   const fetchTasks = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`${url}/api/tasks`);
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
//       await axios.delete(`${url}/api/tasks/${id}`);
//       fetchTasks();
//     } catch (err) {
//       console.error(err);
//       alert('Delete failed');
//     }
//   };

//   const handleEdit = async (taskId) => {
//     try {
//       await axios.put(`${url}/api/tasks/${taskId}`, editForm);
//       setEditingTask(null);
//       setEditForm({});
//       fetchTasks();
//     } catch (err) {
//       console.error(err);
//       alert('Failed to update task');
//     }
//   };

//   const startEditing = (task) => {
//     setEditingTask(task._id);
//     setEditForm({
//       title: task.title,
//       description: task.description,
//       assignedTo: task.assignedTo,
//       status: task.status,
//       dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
//       priority: task.priority
//     });
//   };

//   const cancelEditing = () => {
//     setEditingTask(null);
//     setEditForm({});
//   };

//   const togglePin = (id) => {
//     setPinned(prev => ({ ...prev, [id]: !prev[id] }));
//   };

//   const handleFormChange = (field, value) => {
//     setEditForm(prev => ({ ...prev, [field]: value }));
//   };

//   const getPriorityBadge = (priority) => {
//     const base = 'px-2 py-1 rounded-lg text-xs font-medium inline-flex items-center gap-1';
//     switch (priority) {
//       case 'High':
//         return <span className={`${base} bg-red-100 text-red-700`}>High</span>;
//       case 'Medium':
//         return <span className={`${base} bg-yellow-100 text-yellow-700`}>Med</span>;
//       case 'Low':
//         return <span className={`${base} bg-green-100 text-green-700`}>Low</span>;
//       default:
//         return priority;
//     }
//   };

//   const getStatusBadge = (status) => {
//     const base = 'px-2 py-1 rounded-lg text-xs font-medium';
//     switch (status) {
//       case 'To Do':
//         return <span className={`${base} bg-blue-100 text-blue-700`}>To Do</span>;
//       case 'In Progress':
//         return <span className={`${base} bg-orange-100 text-orange-700`}>Progress</span>;
//       case 'Done':
//         return <span className={`${base} bg-green-100 text-green-700`}>Done</span>;
//       default:
//         return status;
//     }
//   };

//   // Function to determine empty state content based on filters
//   const getEmptyStateContent = () => {
//     if (searchText) {
//       return {
//         icon: <Search size={48} className="text-blue-400" />,
//         title: "No matching tasks found",
//         subtitle: `No tasks match "${searchText}"`,
//         suggestion: "Try adjusting your search terms or filters"
//       };
//     } else if (statusFilter) {
//       return {
//         icon: <Filter size={48} className="text-purple-400" />,
//         title: `No ${statusFilter.toLowerCase()} tasks`,
//         subtitle: `You don't have any tasks with "${statusFilter}" status`,
//         suggestion: "Try selecting a different status filter"
//       };
//     } else if (tasks.length === 0) {
//       return {
//         icon: <ClipboardList size={48} className="text-green-400" />,
//         title: "No tasks yet",
//         subtitle: "You haven't created any tasks yet",
//         suggestion: "Create your first task to get started!"
//       };
//     } else {
//       return {
//         icon: <FileText size={48} className="text-gray-400" />,
//         title: "No tasks found",
//         subtitle: "All tasks are filtered out",
//         suggestion: "Try adjusting your filters to see more tasks"
//       };
//     }
//   };

//   const currentHeader = headerOptions[headerIndex];
//   const emptyState = getEmptyStateContent();

//   if (loading) {
//     return (
//       <div className="min-h-screen p-3 sm:p-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="bg-white rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
//             <div className="animate-pulse">
//               <div className="h-6 sm:h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
//               <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
//               <div className="flex flex-wrap gap-2 sm:gap-4">
//                 <div className="h-8 sm:h-10 bg-gray-200 rounded w-16 sm:w-24"></div>
//                 <div className="h-8 sm:h-10 bg-gray-200 rounded w-20 sm:w-24"></div>
//                 <div className="h-8 sm:h-10 bg-gray-200 rounded w-16 sm:w-24"></div>
//               </div>
//             </div>
//           </div>
//           <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//             {[...Array(6)].map((_, i) => (
//               <div key={i} className="bg-white rounded-xl p-4 sm:p-6">
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
//     <div className="min-h-screen p-3 sm:p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Dynamic Header Section */}
//         <div className="bg-white rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-sm">
//           <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 sm:gap-4">
//             <div>
//               <h1 className="text-xl sm:text-2xl font-bold text-green-600 transition-all duration-500">
//                 {currentHeader.title}
//               </h1>
//               <p className="text-sm text-gray-600 mt-1">
//                 {currentHeader.subtitle}
//               </p>
//             </div>
            
//             <div className="flex flex-wrap gap-2 sm:gap-3">
//               <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg">
//                 <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                 <span className="text-xs sm:text-sm font-medium text-blue-700">To Do: {statusCounts.todo}</span>
//               </div>
//               <div className="flex items-center gap-2 bg-orange-50 px-3 py-2 rounded-lg">
//                 <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
//                 <span className="text-xs sm:text-sm font-medium text-orange-700">Progress: {statusCounts.inprogress}</span>
//               </div>
//               <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg">
//                 <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                 <span className="text-xs sm:text-sm font-medium text-green-700">Done: {statusCounts.done}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Filters Section */}
//         <div className="bg-white rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-sm">
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//             <div className="relative">
//               <Filter size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <select
//                 className="w-full pl-9 pr-4 py-2.5 sm:py-3 bg-gray-50 border-0 rounded-lg text-sm font-medium text-gray-700 focus:ring-2 focus:ring-blue-500 focus:bg-white"
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//               >
//                 <option value="">All Status</option>
//                 <option>To Do</option>
//                 <option>In Progress</option>
//                 <option>Done</option>
//               </select>
//             </div>
            
//             <div className="relative">
//               <SortAsc size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <select
//                 className="w-full pl-9 pr-4 py-2.5 sm:py-3 bg-gray-50 border-0 rounded-lg text-sm font-medium text-gray-700 focus:ring-2 focus:ring-blue-500 focus:bg-white"
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//               >
//                 <option value="">Sort By</option>
//                 <option value="dueDate">Due Date</option>
//                 <option value="priority">Priority</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Cards Grid */}
//         <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//           {filteredTasks.length === 0 ? (
//             <div className="col-span-full">
//               <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 sm:p-12 text-center border-2 border-dashed border-gray-200">
//                 <div className="flex flex-col items-center space-y-4">
//                   <div className="bg-white rounded-full p-4 shadow-sm">
//                     {emptyState.icon}
//                   </div>
//                   <div className="space-y-2">
//                     <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
//                       {emptyState.title}
//                     </h3>
//                     <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto">
//                       {emptyState.subtitle}
//                     </p>
//                     <p className="text-gray-500 text-xs sm:text-sm font-medium">
//                       {emptyState.suggestion}
//                     </p>
//                   </div>
//                   {tasks.length === 0 && (
//                     <div className="pt-4">
//                       <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-medium">
//                         <ClipboardList size={16} />
//                         Ready to organize your work!
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ) : (
//             filteredTasks.map(task => (
//               <div
//                 key={task._id}
//                 className={`bg-white rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200 ${
//                   task.status === 'Done' ? 'opacity-60' : ''
//                 } ${task.isPinned ? 'ring-2 ring-blue-200' : ''}`}
//               >
//                 {editingTask === task._id ? (
//                   // Edit Mode
//                   <div className="space-y-3">
//                     <input
//                       type="text"
//                       value={editForm.title}
//                       onChange={(e) => handleFormChange('title', e.target.value)}
//                       className="w-full p-2 border border-gray-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Task title"
//                     />
                    
//                     <textarea
//                       value={editForm.description}
//                       onChange={(e) => handleFormChange('description', e.target.value)}
//                       rows={2}
//                       className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Description"
//                     />
                    
//                     <div className="grid grid-cols-2 gap-2">
//                       <input
//                         type="text"
//                         value={editForm.assignedTo}
//                         onChange={(e) => handleFormChange('assignedTo', e.target.value)}
//                         className="p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                         placeholder="Assigned to"
//                       />
                      
//                       <input
//                         type="date"
//                         value={editForm.dueDate}
//                         onChange={(e) => handleFormChange('dueDate', e.target.value)}
//                         className="p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       />
//                     </div>
                    
//                     <div className="grid grid-cols-2 gap-2">
//                       <select
//                         value={editForm.status}
//                         onChange={(e) => handleFormChange('status', e.target.value)}
//                         className="p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       >
//                         <option>To Do</option>
//                         <option>In Progress</option>
//                         <option>Done</option>
//                       </select>
                      
//                       <select
//                         value={editForm.priority}
//                         onChange={(e) => handleFormChange('priority', e.target.value)}
//                         className="p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       >
//                         <option>High</option>
//                         <option>Medium</option>
//                         <option>Low</option>
//                       </select>
//                     </div>
                    
//                     <div className="flex justify-end gap-2 pt-2">
//                       <button
//                         onClick={cancelEditing}
//                         className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
//                       >
//                         <X size={16} />
//                       </button>
//                       <button
//                         onClick={() => handleEdit(task._id)}
//                         className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
//                       >
//                         <Check size={16} />
//                       </button>
//                     </div>
//                   </div>
//                 ) : (
//                   // View Mode
//                   <div className="space-y-3">
//                     <div className="flex justify-between items-start">
//                       <h3 className={`text-base sm:text-lg font-semibold text-gray-900 ${task.status === 'Done' ? 'line-through' : ''} pr-2`}>
//                         {task.title}
//                       </h3>
//                       <div className="flex gap-1">
//                         <button
//                           onClick={() => togglePin(task._id)}
//                           className="p-1.5 transition-colors"
//                         >
//                           {task.isPinned ? (
//                             <Pin size={14} className="text-blue-500" />
//                           ) : (
//                             <PinOff size={14} className="text-gray-400 hover:text-blue-500" />
//                           )}
//                         </button>
//                         <button
//                           onClick={() => startEditing(task)}
//                           className="p-1.5 text-gray-400 hover:text-blue-500 transition-colors"
//                         >
//                           <Edit3 size={14} />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(task._id)}
//                           className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
//                         >
//                           <Trash2 size={14} />
//                         </button>
//                       </div>
//                     </div>
                    
//                     <p className="text-gray-600 text-sm leading-relaxed">
//                       {task.description}
//                     </p>

//                     <div className="space-y-2">
//                       <div className="flex items-center gap-2 text-sm text-gray-600">
//                         <User size={12} />
//                         <span className="truncate">{task.assignedTo || 'Unassigned'}</span>
//                       </div>
                      
//                       <div className="flex items-center gap-2 text-sm text-gray-600">
//                         <Calendar size={12} />
//                         <span>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No date'}</span>
//                       </div>
//                     </div>

//                     <div className="flex items-center justify-between pt-2 border-t border-gray-100">
//                       <div className="flex gap-1.5">
//                         {getStatusBadge(task.status)}
//                         {getPriorityBadge(task.priority)}
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
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
  Calendar,
  User,
  Flag,
  Edit3,
  Check,
  X,
  ClipboardList,
  Search,
  FileText
} from 'lucide-react';

const url = "https://changenetworktaskmana.onrender.com";

const TaskList = ({ refresh, searchText }) => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [pinned, setPinned] = useState({});
  const [editingTask, setEditingTask] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [statusCounts, setStatusCounts] = useState({
    todo: 0,
    inprogress: 0,
    done: 0,
  });

  // More dynamic header content with simple text
  const [headerIndex, setHeaderIndex] = useState(0);
  const headerOptions = [
    { title: "Task Dashboard", subtitle: "Organize your workflow" },
    { title: "Project Center", subtitle: "Track your progress" },
    { title: "Work Manager", subtitle: "Stay productive daily" },
    { title: "Team Tasks", subtitle: "Collaborate effectively" },
    { title: "Activity Hub", subtitle: "Monitor all projects" },
    { title: "Task Tracker", subtitle: "Complete goals faster" },
    { title: "Work Board", subtitle: "Manage priorities" },
    { title: "Daily Planner", subtitle: "Schedule your tasks" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setHeaderIndex(prev => (prev + 1) % headerOptions.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  
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

  const handleEdit = async (taskId) => {
    try {
      await axios.put(`${url}/api/tasks/${taskId}`, editForm);
      setEditingTask(null);
      setEditForm({});
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert('Failed to update task');
    }
  };

  const startEditing = (task) => {
    setEditingTask(task._id);
    setEditForm({
      title: task.title,
      description: task.description,
      assignedTo: task.assignedTo,
      status: task.status,
      dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
      priority: task.priority
    });
  };

  const cancelEditing = () => {
    setEditingTask(null);
    setEditForm({});
  };

  const togglePin = (id) => {
    setPinned(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleFormChange = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const getPriorityBadge = (priority) => {
    const base = 'px-2 py-1 rounded-lg text-xs font-medium inline-flex items-center gap-1';
    switch (priority) {
      case 'High':
        return <span className={`${base} bg-red-100 text-red-700`}>High</span>;
      case 'Medium':
        return <span className={`${base} bg-yellow-100 text-yellow-700`}>Med</span>;
      case 'Low':
        return <span className={`${base} bg-green-100 text-green-700`}>Low</span>;
      default:
        return priority;
    }
  };

  const getStatusBadge = (status) => {
    const base = 'px-2 py-1 rounded-lg text-xs font-medium';
    switch (status) {
      case 'To Do':
        return <span className={`${base} bg-blue-100 text-blue-700`}>To Do</span>;
      case 'In Progress':
        return <span className={`${base} bg-orange-100 text-orange-700`}>Progress</span>;
      case 'Done':
        return <span className={`${base} bg-green-100 text-green-700`}>Done</span>;
      default:
        return status;
    }
  };

  // Function to determine empty state content based on filters
  const getEmptyStateContent = () => {
    if (searchText) {
      return {
        icon: <Search size={48} className="text-blue-400" />,
        title: "No matching tasks found",
        subtitle: `No tasks match "${searchText}"`,
        suggestion: "Try adjusting your search terms or filters"
      };
    } else if (statusFilter) {
      return {
        icon: <Filter size={48} className="text-purple-400" />,
        title: `No ${statusFilter.toLowerCase()} tasks`,
        subtitle: `You don't have any tasks with "${statusFilter}" status`,
        suggestion: "Try selecting a different status filter"
      };
    } else if (tasks.length === 0) {
      return {
        icon: <ClipboardList size={48} className="text-green-400" />,
        title: "No tasks yet",
        subtitle: "You haven't created any tasks yet",
        suggestion: "Create your first task to get started!"
      };
    } else {
      return {
        icon: <FileText size={48} className="text-gray-400" />,
        title: "No tasks found",
        subtitle: "All tasks are filtered out",
        suggestion: "Try adjusting your filters to see more tasks"
      };
    }
  };

  const currentHeader = headerOptions[headerIndex];
  const emptyState = getEmptyStateContent();

  if (loading) {
    return (
      <div className="min-h-screen p-3 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
            <div className="animate-pulse">
              <div className="h-6 sm:h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="flex flex-wrap gap-2 sm:gap-4">
                <div className="h-8 sm:h-10 bg-gray-200 rounded w-16 sm:w-24"></div>
                <div className="h-8 sm:h-10 bg-gray-200 rounded w-20 sm:w-24"></div>
                <div className="h-8 sm:h-10 bg-gray-200 rounded w-16 sm:w-24"></div>
              </div>
            </div>
          </div>
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-4 sm:p-6">
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
    <div className="min-h-screen p-3 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Dynamic Header Section */}
        <div className="bg-white rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 sm:gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-green-600 transition-all duration-500">
                {currentHeader.title}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {currentHeader.subtitle}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-xs sm:text-sm font-medium text-blue-700">To Do: {statusCounts.todo}</span>
              </div>
              <div className="flex items-center gap-2 bg-orange-50 px-3 py-2 rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-xs sm:text-sm font-medium text-orange-700">Progress: {statusCounts.inprogress}</span>
              </div>
              <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs sm:text-sm font-medium text-green-700">Done: {statusCounts.done}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="relative">
              <Filter size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                className="w-full pl-9 pr-4 py-2.5 sm:py-3 bg-gray-50 border-0 rounded-lg text-sm font-medium text-gray-700 focus:ring-2 focus:ring-blue-500 focus:bg-white"
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
              <SortAsc size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                className="w-full pl-9 pr-4 py-2.5 sm:py-3 bg-gray-50 border-0 rounded-lg text-sm font-medium text-gray-700 focus:ring-2 focus:ring-blue-500 focus:bg-white"
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
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTasks.length === 0 ? (
            <div className="col-span-full">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 sm:p-12 text-center border-2 border-dashed border-gray-200">
                <div className="flex flex-col items-center space-y-4">
                  <div className="bg-white rounded-full p-4 shadow-sm">
                    {emptyState.icon}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                      {emptyState.title}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto">
                      {emptyState.subtitle}
                    </p>
                    <p className="text-gray-500 text-xs sm:text-sm font-medium">
                      {emptyState.suggestion}
                    </p>
                  </div>
                  {tasks.length === 0 && (
                    <div className="pt-4">
                      <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-medium">
                        <ClipboardList size={16} />
                        Ready to organize your work!
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            filteredTasks.map(task => (
              <div
                key={task._id}
                className={`bg-white rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200 ${
                  task.status === 'Done' ? 'opacity-60' : ''
                } ${task.isPinned ? 'ring-2 ring-blue-200' : ''}`}
              >
                {editingTask === task._id ? (
                  // Edit Mode
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => handleFormChange('title', e.target.value)}
                      className="w-full p-2 border border-gray-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Task title"
                    />
                    
                    <textarea
                      value={editForm.description}
                      onChange={(e) => handleFormChange('description', e.target.value)}
                      rows={2}
                      className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Description"
                    />
                    
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={editForm.assignedTo}
                        onChange={(e) => handleFormChange('assignedTo', e.target.value)}
                        className="p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Assigned to"
                      />
                      
                      <input
                        type="date"
                        value={editForm.dueDate}
                        onChange={(e) => handleFormChange('dueDate', e.target.value)}
                        className="p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={editForm.status}
                        onChange={(e) => handleFormChange('status', e.target.value)}
                        className="p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option>To Do</option>
                        <option>In Progress</option>
                        <option>Done</option>
                      </select>
                      
                      <select
                        value={editForm.priority}
                        onChange={(e) => handleFormChange('priority', e.target.value)}
                        className="p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                      </select>
                    </div>
                    
                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        onClick={cancelEditing}
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <X size={16} />
                      </button>
                      <button
                        onClick={() => handleEdit(task._id)}
                        className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
                      >
                        <Check size={16} />
                      </button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className={`text-base sm:text-lg font-semibold text-gray-900 ${task.status === 'Done' ? 'line-through' : ''} pr-2`}>
                        {task.title}
                      </h3>
                      <div className="flex gap-1">
                        <button
                          onClick={() => togglePin(task._id)}
                          className="p-1.5 transition-colors"
                        >
                          {task.isPinned ? (
                            <Pin size={14} className="text-blue-500" />
                          ) : (
                            <PinOff size={14} className="text-gray-400 hover:text-blue-500" />
                          )}
                        </button>
                        <button
                          onClick={() => startEditing(task)}
                          className="p-1.5 text-gray-400 hover:text-blue-500 transition-colors"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(task._id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {task.description}
                    </p>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User size={12} />
                        <span className="truncate">{task.assignedTo || 'Unassigned'}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar size={12} />
                        <span>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No date'}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <div className="flex gap-1.5">
                        {getStatusBadge(task.status)}
                        {getPriorityBadge(task.priority)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;