// // src/components/TaskForm.js
// import React, { useState } from 'react';
// import axios from 'axios';

// const TaskForm = ({ onTaskCreated }) => {
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
//       await axios.post('http://localhost:5000/api/tasks', form);
//       setForm({
//         title: '',
//         description: '',
//         assignedTo: '',
//         status: 'To Do',
//         dueDate: '',
//         priority: 'Medium',
//       });
//       onTaskCreated(); // this will refresh the task list
//     } catch (err) {
//       console.error(err);
//       alert('Failed to create task');
//     }
//   };

//   return (
//     <div className="card p-3 mb-4">
//       <h4>Create Task</h4>
//       <form onSubmit={handleSubmit}>
//         <div className="row">
//           <div className="col-md-6 mb-2">
//             <input
//               name="title"
//               className="form-control"
//               placeholder="Title"
//               value={form.title}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="col-md-6 mb-2">
//             <input
//               name="assignedTo"
//               className="form-control"
//               placeholder="Assigned To"
//               value={form.assignedTo}
//               onChange={handleChange}
//             />
//           </div>
//         </div>
//         <textarea
//           name="description"
//           className="form-control mb-2"
//           placeholder="Description"
//           value={form.description}
//           onChange={handleChange}
//         />
//         <div className="row mb-2">
//           <div className="col-md-4">
//             <select
//               name="status"
//               className="form-control"
//               value={form.status}
//               onChange={handleChange}
//             >
//               <option>To Do</option>
//               <option>In Progress</option>
//               <option>Done</option>
//             </select>
//           </div>
//           <div className="col-md-4">
//             <select
//               name="priority"
//               className="form-control"
//               value={form.priority}
//               onChange={handleChange}
//             >
//               <option>Low</option>
//               <option>Medium</option>
//               <option>High</option>
//             </select>
//           </div>
//           <div className="col-md-4">
//             <input
//               type="date"
//               name="dueDate"
//               className="form-control"
//               value={form.dueDate}
//               onChange={handleChange}
//             />
//           </div>
//         </div>
//         <button className="btn btn-primary">Create Task</button>
//       </form>
//     </div>
//   );
// };

// export default TaskForm;


// src/components/TaskForm.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import { PlusCircle, XCircle } from 'lucide-react';

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
//       await axios.post('http://localhost:5000/api/tasks', form);
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
//       {/* Toggle Button */}
//       <button
//         onClick={() => setShowForm(!showForm)}
//         className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition"
//       >
//         {showForm ? <XCircle size={18} /> : <PlusCircle size={18} />}
//         {showForm ? 'Cancel' : 'Create Task'}
//       </button>

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
      await axios.post('http://localhost:5000/api/tasks', form);
      setForm({
        title: '',
        description: '',
        assignedTo: '',
        status: 'To Do',
        dueDate: '',
        priority: 'Medium',
      });
      setShowForm(false); // close the form
      onTaskCreated(); // refresh list
    } catch (err) {
      console.error(err);
      alert('Failed to create task');
    }
  };

  return (
    <div className="mb-6">
      {/* Centered Toggle Button */}
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition"
        >
          {showForm ? <XCircle size={18} /> : <PlusCircle size={18} />}
          {showForm ? 'Cancel' : 'Create Task'}
        </button>
      </div>

      {/* Task Form */}
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

            <div className="grid sm:grid-cols-3 gap-4">
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option>To Do</option>
                <option>In Progress</option>
                <option>Done</option>
              </select>

              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>

              <input
                name="dueDate"
                type="date"
                value={form.dueDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
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
