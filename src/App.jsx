// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

// function App() {
  

//   return (
    
      
// }

// export default App

// src/App.js
// import React from 'react';
// import TaskForm from './TaskForm';

// function App() {
//   const handleTaskCreated = () => {
//     alert("Task created (you can later refresh task list here)");
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="text-center mb-4">Collaborative Task Manager</h2>
//       <TaskForm onTaskCreated={handleTaskCreated} />
//     </div>
//   );
// }

// export default App;



// src/App.js
// import React, { useState } from 'react';
// import TaskForm from './TaskForm';
// import TaskList from './TaskList';

// function App() {
//   const [refresh, setRefresh] = useState(false);

//   const handleTaskCreated = () => {
//     setRefresh(!refresh); // toggle to refresh TaskList
//   };

//   return (
//     <div>
//       <TaskForm onTaskCreated={handleTaskCreated} />
//       <TaskList refresh={refresh} />
//     </div>
//   );
// }

// export default App;


// src/App.js
// import React, { useState } from 'react';
// import TaskForm from './TaskForm';
// import TaskList from './TaskList';
// import Navbar from './Navbar';

// function App() {
//   const [refresh, setRefresh] = useState(false);
//   const [searchText, setSearchText] = useState('');

//   const handleTaskCreated = () => {
//     setRefresh(!refresh);
//   };

//   return (
//     <div>
//       <Navbar searchText={searchText} setSearchText={setSearchText} />

//       <div className="container mt-4">
//         <TaskForm onTaskCreated={handleTaskCreated} />
//         <TaskList refresh={refresh} searchText={searchText} />
//       </div>
//     </div>
//   );
// }

// export default App;


import React, { useState } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import Navbar from './Navbar';

function App() {
  const [refresh, setRefresh] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleTaskCreated = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="min-h-screen bg-[#F0F9FF]">
      <Navbar searchText={searchText} setSearchText={setSearchText} />

      <div className="max-w-6xl mx-auto px-4 py-6">
        <TaskForm onTaskCreated={handleTaskCreated} />
        <TaskList refresh={refresh} searchText={searchText} />
      </div>
    </div>
  );
}

export default App;
