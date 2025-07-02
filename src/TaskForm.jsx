


// import React, { useState } from 'react';
// import axios from 'axios';
// import { PlusCircle, XCircle } from 'lucide-react';
// const url="https://changenetworktaskmana.onrender.com";
// const TaskForm = ({ onTaskCreated }) => {
//   const [showForm, setShowForm] = useState(false);
//   const [form, setForm] = useState({
//     title: '',
//     description: '',
//     assignedTo: '',
//     status: 'To Do',
//     dueDate: '',
//     priority: 'Medium',
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(`${url}/api/tasks`, form);
//       setForm({
//         title: '',
//         description: '',
//         assignedTo: '',
//         status: 'To Do',
//         dueDate: '',
//         priority: 'Medium',
//       });
//       setShowForm(false); // close the form
//       onTaskCreated(); // refresh list
//     } catch (err) {
//       console.error(err);
//       alert('Failed to create task');
//     }
//   };

//   return (
//     <div className="mb-6">
//       {/* Centered Toggle Button */}
//       <div className="flex justify-center mb-4">
//         <button
//           onClick={() => setShowForm(!showForm)}
//           className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition"
//         >
//           {showForm ? <XCircle size={18} /> : <PlusCircle size={18} />}
//           {showForm ? 'Cancel' : 'Create Task'}
//         </button>
//       </div>

//       {/* Task Form */}
//       {showForm && (
//         <div className="mt-4 bg-white shadow-md rounded-lg p-6">
//           <h3 className="text-lg font-semibold mb-4 text-gray-800">New Task</h3>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="grid sm:grid-cols-2 gap-4">
//               <input
//                 name="title"
//                 type="text"
//                 placeholder="Title"
//                 value={form.title}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
//               />
//               <input
//                 name="assignedTo"
//                 type="text"
//                 placeholder="Assigned To"
//                 value={form.assignedTo}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
//               />
//             </div>

//             <textarea
//               name="description"
//               placeholder="Description"
//               value={form.description}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
//             />

//             <div className="grid sm:grid-cols-3 gap-4">
//               <select
//                 name="status"
//                 value={form.status}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md"
//               >
//                 <option>To Do</option>
//                 <option>In Progress</option>
//                 <option>Done</option>
//               </select>

//               <select
//                 name="priority"
//                 value={form.priority}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md"
//               >
//                 <option>Low</option>
//                 <option>Medium</option>
//                 <option>High</option>
//               </select>

//               <input
//                 name="dueDate"
//                 type="date"
//                 value={form.dueDate}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md"
//               />
//             </div>

//             <button
//               type="submit"
//               className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition"
//             >
//               Save Task
//             </button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TaskForm;


import React, { useState } from 'react';
import axios from 'axios';
import { PlusCircle, XCircle } from 'lucide-react';
const url="https://changenetworktaskmana.onrender.com";
const TaskForm = ({ onTaskCreated }) => {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    assignedTo: '',
    status: 'To Do',
    dueDate: '',
    priority: 'Medium',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${url}/api/tasks`, form);
      setForm({
        title: '',
        description: '',
        assignedTo: '',
        status: 'To Do',
        dueDate: '',
        priority: 'Medium',
      });
      setShowForm(false); 
      onTaskCreated(); 
    } catch (err) {
      console.error(err);
      alert('Failed to create task');
    }
  };

  return (
    <div className="mb-6">
     
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition"
        >
          {showForm ? <XCircle size={18} /> : <PlusCircle size={18} />}
          {showForm ? 'Cancel' : 'Create Task'}
        </button>
      </div>

      {showForm && (
        <div className="mt-4 bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">New Task</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                name="title"
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
              />
              <input
                name="assignedTo"
                type="text"
                placeholder="Assigned To"
                value={form.assignedTo}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
              />
            </div>

            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
            />

            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 text-gray-500 appearance-none"
              >
                <option>To Do</option>
                <option>In Progress</option>
                <option>Done</option>
              </select>

              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 text-gray-500 appearance-none"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>

              <div className="relative">
                <input
                  name="dueDate"
                  type="date"
                  value={form.dueDate}
                  onChange={handleChange}
                  placeholder="Due Date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 text-gray-700"
                />
                
                {!form.dueDate && (
                  <label className="absolute left-3 top-2 text-gray-400 pointer-events-none text-sm">
                    Due Date
                  </label>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition"
            >
              Save Task
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TaskForm;